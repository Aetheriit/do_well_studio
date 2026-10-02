param(
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$studioPort = 3010
$studioUrl = "http://127.0.0.1:$studioPort"
$startupLog = Join-Path $projectRoot 'do-well-startup.log'
$outputLog = Join-Path $projectRoot 'do-well-server.log'
$errorLog = Join-Path $projectRoot 'do-well-server-error.log'
$launcherMutex = $null
$ownsMutex = $false

function Write-StartupLog([string]$Message) {
    Add-Content -LiteralPath $startupLog -Value ("[{0}] {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Message) -Encoding UTF8
}

function Test-StudioHealth {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri "$studioUrl/api/health" -TimeoutSec 4 -MaximumRedirection 0
        $health = $response.Content | ConvertFrom-Json
        return $response.StatusCode -eq 200 -and $health.status -eq 'ok' -and $health.service -eq 'Do Well Studio'
    } catch {
        return $false
    }
}

function Test-StudioPort {
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $connection = $client.ConnectAsync('127.0.0.1', $studioPort)
        return $connection.Wait(500) -and $client.Connected
    } catch {
        return $false
    } finally {
        $client.Dispose()
    }
}

function Test-FrontendReady {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $studioUrl -TimeoutSec 10
        return $response.StatusCode -eq 200
    } catch {
        return $false
    }
}

try {
    # A second click leaves the first launcher responsible for opening the browser.
    $launcherMutex = New-Object System.Threading.Mutex($false, 'Local\DoWellStudio-3010-Startup')
    try {
        $ownsMutex = $launcherMutex.WaitOne(0)
    } catch [System.Threading.AbandonedMutexException] {
        $ownsMutex = $true
    }
    if (-not $ownsMutex) { exit 0 }

    Set-Location -LiteralPath $projectRoot
    Write-StartupLog 'Opening Do Well Studio.'
    $serverProcess = $null
    $studioAlreadyRunning = Test-StudioHealth

    if (-not $studioAlreadyRunning -and (Test-StudioPort)) {
        # Allow an existing dev server a moment to compile its health endpoint.
        foreach ($attempt in 1..3) {
            if (Test-StudioHealth) {
                $studioAlreadyRunning = $true
                break
            }
            Start-Sleep -Milliseconds 500
        }
        if (-not $studioAlreadyRunning) {
            throw "Port $studioPort is already in use, but it did not respond as Do Well Studio. Close the app using this port, then double-click Start Do Well Studio again. No existing process has been stopped."
        }
    }

    if (-not $studioAlreadyRunning) {
        $nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
        $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
        if (-not $nodeCommand -or -not $npmCommand) {
            throw 'Node.js and npm are required. Install the current Node.js LTS release from https://nodejs.org, then double-click Start Do Well Studio again.'
        }

        $nodeVersion = (& $nodeCommand.Source --version).TrimStart('v')
        if ([version]$nodeVersion -lt [version]'18.18.0') {
            throw "This project needs Node.js 18.18 or newer. Your version is $nodeVersion. Install the current Node.js LTS release from https://nodejs.org and try again."
        }

        $nextBinary = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
        if (-not (Test-Path -LiteralPath $nextBinary)) {
            Write-StartupLog 'Installing project dependencies for the first run. This needs an internet connection.'
            try {
                # npm can write progress to stderr without indicating failure.
                $ErrorActionPreference = 'Continue'
                & $npmCommand.Source install --no-audit --no-fund >> $startupLog 2>&1
                $installExitCode = $LASTEXITCODE
            } finally {
                $ErrorActionPreference = 'Stop'
            }
            if ($installExitCode -ne 0 -or -not (Test-Path -LiteralPath $nextBinary)) {
                throw 'The project dependencies could not be installed. Check your internet connection, then try again. Installation details are in do-well-startup.log.'
            }
        }

        Write-StartupLog "Starting the website and API on $studioUrl."
        $serverProcess = Start-Process -FilePath $nodeCommand.Source `
            -ArgumentList @(('"' + $nextBinary + '"'), 'dev', '--hostname', '127.0.0.1', '--port', "$studioPort") `
            -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru `
            -RedirectStandardOutput $outputLog -RedirectStandardError $errorLog
    } else {
        Write-StartupLog 'Using the existing Do Well Studio server.'
    }

    $readyDeadline = (Get-Date).AddSeconds(150)
    do {
        if ($null -ne $serverProcess -and $serverProcess.HasExited) {
            throw 'The website server stopped during startup. Open do-well-server-error.log in the project folder for details, then try again.'
        }
        if ((Test-StudioHealth) -and (Test-FrontendReady)) {
            Write-StartupLog 'The website and API are ready.'
            if (-not $NoBrowser) {
                Write-StartupLog 'Opening the browser.'
                Start-Process -FilePath $studioUrl
            }
            exit 0
        }
        Start-Sleep -Milliseconds 750
    } while ((Get-Date) -lt $readyDeadline)

    throw "The website did not become ready within 150 seconds. Check do-well-server.log and do-well-server-error.log in the project folder. If compilation is still running, wait briefly and double-click Start Do Well Studio again."
} catch {
    $message = $_.Exception.Message
    try { Write-StartupLog "Startup failed: $message" } catch { }
    if ($NoBrowser) {
        [Console]::Error.WriteLine("Do Well Studio could not open: $message")
        exit 1
    }
    Add-Type -AssemblyName System.Windows.Forms
    [void][System.Windows.Forms.MessageBox]::Show(
        "$message`r`n`r`nProject folder: $projectRoot",
        'Do Well Studio could not open',
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Error
    )
    exit 1
} finally {
    if ($ownsMutex -and $null -ne $launcherMutex) { $launcherMutex.ReleaseMutex() }
    if ($null -ne $launcherMutex) { $launcherMutex.Dispose() }
}
