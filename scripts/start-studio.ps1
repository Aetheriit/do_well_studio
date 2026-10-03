param(
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'

$projectRoot = [System.IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot)).TrimEnd('\')
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

function Test-IsStudioServer($ProcessInfo) {
    if ($ProcessInfo.Name -ne 'node.exe' -or [string]::IsNullOrWhiteSpace($ProcessInfo.CommandLine)) {
        return $false
    }
    $commandLine = [string]$ProcessInfo.CommandLine
    if ($commandLine.IndexOf($projectRoot, [System.StringComparison]::OrdinalIgnoreCase) -lt 0) {
        return $false
    }
    return $commandLine -match '(?i)next[\\/]dist[\\/]bin[\\/]next(?:\.js)?\W+(?:dev|start)\b' -or
           $commandLine -match '(?i)next[\\/]dist[\\/]server[\\/]lib[\\/]start-server\.js'
}

function Stop-StudioServers {
    # Verify process command lines before stopping anything on this computer.
    $snapshot = @(Get-CimInstance Win32_Process -ErrorAction Stop)
    $roots = @($snapshot | Where-Object { Test-IsStudioServer $_ })
    $stopped = New-Object 'System.Collections.Generic.HashSet[int]'

    foreach ($root in $roots) {
        $queue = New-Object 'System.Collections.Generic.Queue[int]'
        $tree = New-Object 'System.Collections.Generic.List[int]'
        $queue.Enqueue([int]$root.ProcessId)

        while ($queue.Count -gt 0) {
            $currentId = $queue.Dequeue()
            if ($tree.Contains($currentId)) { continue }
            $tree.Add($currentId)
            foreach ($child in $snapshot | Where-Object { $_.ParentProcessId -eq $currentId }) {
                $queue.Enqueue([int]$child.ProcessId)
            }
        }

        for ($index = $tree.Count - 1; $index -ge 0; $index--) {
            $processId = $tree[$index]
            if (-not $stopped.Add($processId)) { continue }
            $running = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($null -ne $running) {
                Stop-Process -Id $processId -Force -ErrorAction Stop
                Write-StartupLog "Stopped this project's existing server process $processId."
            }
        }
    }

    $releaseDeadline = (Get-Date).AddSeconds(12)
    while ((Test-StudioPort) -and (Get-Date) -lt $releaseDeadline) {
        Start-Sleep -Milliseconds 250
    }
    if (Test-StudioPort) {
        throw "Port $studioPort is still in use. Its owner could not be verified as this project, so it was left running."
    }
}

try {
    # One launch owns the restart; an overlapping double-click does not race it.
    $launcherMutex = New-Object System.Threading.Mutex($false, 'Local\DoWellStudio-3010-Startup')
    try {
        $ownsMutex = $launcherMutex.WaitOne(0)
    } catch [System.Threading.AbandonedMutexException] {
        $ownsMutex = $true
    }
    if (-not $ownsMutex) { exit 0 }

    Set-Location -LiteralPath $projectRoot
    Write-StartupLog 'Opening Do Well Studio.'

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
        Write-StartupLog 'Installing project dependencies for the first run.'
        try {
            $ErrorActionPreference = 'Continue'
            & $npmCommand.Source install --no-audit --no-fund >> $startupLog 2>&1
            $installExitCode = $LASTEXITCODE
        } finally {
            $ErrorActionPreference = 'Stop'
        }
        if ($installExitCode -ne 0 -or -not (Test-Path -LiteralPath $nextBinary)) {
            throw 'Project dependencies could not be installed. Check do-well-startup.log for details.'
        }
    }

    Stop-StudioServers

    Write-StartupLog "Starting the website and API together on $studioUrl."
    $serverArgs = @(('"' + $nextBinary + '"'), 'dev', '--hostname', '127.0.0.1', '--port', "$studioPort")
    $serverProcess = Start-Process -FilePath $nodeCommand.Source -ArgumentList $serverArgs -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput $outputLog -RedirectStandardError $errorLog

    $readyDeadline = (Get-Date).AddSeconds(150)
    do {
        if ($serverProcess.HasExited) {
            throw 'The website server stopped during startup. Check do-well-server-error.log in the project folder.'
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

    throw 'The website did not become ready within 150 seconds. Check do-well-server.log and do-well-server-error.log in the project folder.'
} catch {
    $message = $_.Exception.Message
    try { Write-StartupLog "Startup failed: $message" } catch { }
    if ($NoBrowser) {
        [Console]::Error.WriteLine("Do Well Studio could not open: $message")
        exit 1
    }
    Add-Type -AssemblyName System.Windows.Forms
    [void][System.Windows.Forms.MessageBox]::Show(
        ($message + [Environment]::NewLine + [Environment]::NewLine + 'Project folder: ' + $projectRoot),
        'Do Well Studio could not open',
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Error
    )
    exit 1
} finally {
    if ($ownsMutex -and $null -ne $launcherMutex) { $launcherMutex.ReleaseMutex() }
    if ($null -ne $launcherMutex) { $launcherMutex.Dispose() }
}
