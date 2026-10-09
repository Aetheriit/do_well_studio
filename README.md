# Do Well Studio — local run

Double-click **Start Do Well Studio.bat** in this folder. It starts the Next.js application at [http://127.0.0.1:3010](http://127.0.0.1:3010) and opens that address in your default browser. The same local server runs the website and its API, including /api/health and /api/leads.

The launcher checks for existing Next.js server processes from this exact project folder, force-stops them, waits for port 3010 to clear, then starts a fresh instance. It will not stop an unrelated program that happens to use port 3010; in that case it shows an error.

Node.js 18.18 or newer and npm are required. If dependencies are missing, the launcher runs npm install on the first start. Later starts use the installed local packages. No CMS, CRM, or hosted service is required to open the local website.

Local development uses .next-dev, while npm run build uses .next, so a production build does not overwrite the running preview's compiled files. The production directory matches Vercel's default Next.js output directory. Visit requests made locally are stored under data/leads.

If startup fails, read do-well-startup.log, do-well-server.log, and do-well-server-error.log in this folder. To start without opening a browser, run:

    powershell.exe -NoProfile -ExecutionPolicy RemoteSigned -File scripts\start-studio.ps1 -NoBrowser

## ThreeUI Animated Top Dock

The exact ThreeUI Command Bar (`modern`) integration is available at [http://127.0.0.1:3010/animated-top-dock](http://127.0.0.1:3010/animated-top-dock). It is intentionally isolated from the studio's working navigation because the authored component contains its own Lumina demo wordmark and action buttons. The page uses the published `@designcodeio/threeui` component subpath and stylesheet with the specified `modern` props. The required Fragment Mono font is retained byte-for-byte at `src/shaders/fonts/fragment-mono.woff2`; the package stylesheet also embeds those same verified font bytes.
