# Do Well Studio — project progress

**Updated:** October 4, 2026

## Current state

The project is a local Next.js website served at `http://127.0.0.1:3010`. The same server handles the public pages and the `/api/leads` and `/api/health` endpoints. `Start Do Well Studio.bat` launches it locally.

The site presents Do Well as a Jubilee Hills wellness studio built around strength, mindfulness and recovery. Its main conversion is a studio visit request, with WhatsApp as a direct follow-up route.

## Implemented

- Homepage with a cinematic opening, three brand pillars, an interactive “how do you want to feel?” guide, all eight named experiences, studio story and visit invitation.
- Classes catalogue with filters and six class detail pages. Do Reset and Do Complete lead to their dedicated Recovery and Membership pages; the older class URLs redirect there.
- Programme-based Schedule guide with verified class names, formats, levels and published durations. Live times are requested from the studio rather than invented.
- Do Complete Membership, coaching approach and contact pages with Do Well-specific information and direct enquiries.
- Do Reset overview and sauna, cold plunge and red-light detail pages, with direct links between them and cautious safety wording.
- Journal index and four short articles connected to relevant practices.
- Visit request form with validation, consent, local lead storage and saved/error states; persistent WhatsApp contact widget.
- Responsive navigation, reduced-motion support, metadata and sitemap entries for the public content.

## Verification on October 4

- `npx tsc --noEmit` passed.
- `npm run build` passed and generated 35 static pages.
- Desktop and 390px mobile render checks covered the homepage guide, Schedule, Membership, Journal, Coaches and Contact. The checked mobile pages had no horizontal overflow.
- The interactive homepage guide changed the selected experience in the browser. Key routes returned 200; the old Do Reset and Do Complete class URLs returned redirects as intended.

## Before public launch

- The studio should approve the copy, address, phone number, photographs and every operational detail. Current programme times, prices, coach identities, age suitability and recovery protocols are not published as facts without confirmation.
- Editorial imagery is illustrative. Replace it with approved Do Well photography where available.
- Local lead files are not suitable as a shared production CRM. Connect durable lead storage and staff notifications before accepting production enquiries.
- CMS, analytics, consent setup, production deployment and monitoring still require configuration.

See `README.md` for local startup instructions.
