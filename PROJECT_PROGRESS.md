# Do Well Studio — Project Progress Report

**Snapshot date:** October 3, 2026

## Current state

The project is configured as a local Next.js app and is running at `http://127.0.0.1:3010`. Dependencies are installed. The in-app browser is currently on the Recovery page.

Recent setup fixes restored the intended routes: `/` now redirects to `/experience`, and `/classes` renders the existing class browser instead of a class-detail page with no slug. The Classes page was observed rendering all eight listed experiences.

Current checks observed: `/` redirects (307), `/experience`, `/classes`, `/recovery`, and `/story` return 200, and `/api/health` returns 200. A production build and automated checks have not been run.

## What is implemented

- Marketing pages for Experience, Classes, Recovery, Our Story, and Visit.
- A catalogue of eight experiences, category filters, and dynamic class-detail routes.
- Visit-request form with client/server validation, consent capture, duplicate-request handling, and clear saved/error states.
- `POST /api/leads` stores requests as JSON files under `data/leads`; `GET /api/health` provides a health check.
- Shared navigation, responsive styling, scroll/reveal motion, studio contact links, and a Windows launcher on port 3010.

## Main gaps and risks

- Leads are saved on the local filesystem only. There is no staff notification, admin inbox, CRM, or durable shared database, so this needs a production storage and follow-up plan before deployment.
- The site requests a visit but does not check availability or confirm an appointment; the page directs visitors to WhatsApp for confirmation.
- The visit form collects phone/email and consent, but there is no privacy page in the current route set. Confirm the consent wording and publish appropriate privacy information before collecting real leads.
- The project pins Next.js 15.2.4. npm emitted a security warning for this version referencing CVE-2025-66478; move to a patched compatible release before exposing the site publicly.
- Business details such as address, phone/WhatsApp, operating hours, class descriptions, and any prices or membership claims should be checked with the studio.
- Most editorial imagery is loaded from Unsplash at runtime. Confirm asset suitability and plan for reliable, performant production image delivery.
- No README or deployment guide is present. The declared lint command and production build have not been verified in this snapshot.

## Recommended next steps

1. Confirm the intended first release: information and visit requests, or real-time scheduling and booking.
2. Upgrade Next.js to a patched compatible release and verify dependency/security status.
3. Choose durable lead storage and a staff follow-up path; add appropriate access controls, retention, and spam protection.
4. Confirm studio content and contact details, then add privacy information for the lead form.
5. Run the production build and a focused review of the main pages, mobile layout, navigation, and visit-request flow.
6. Select the hosting target, configure production startup and health checks, and document setup/deployment in a README.

## Useful local commands

```powershell
npm install
npm run dev
npm run build
```

The Windows launcher Start Do Well Studio.bat restarts only this project's local Next.js server, waits for both the frontend and API health check, then opens the site. See README.md for current local-run instructions.
