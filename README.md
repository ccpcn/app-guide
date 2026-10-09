# NHS App Patient Quick Guide — Version 5

A mobile-first, single-page React/Vite informational guide based on the supplied NHS App leaflet and mobile layout reference.

## Start locally

```bash
npm install
npm run dev
```

To produce a static build:

```bash
npm run build
npm run preview
```

## Replace the artwork and logos

- Hero illustration: `public/images/nhs-app-hero.png` (replace with your own image using the same filename).
- Organisation branding: `public/images/che-central-camden.svg` (currently a **text-only placeholder**, not an official approved logo). Replace it with your approved artwork, or change the path in `src/main.jsx`.

## Features

- Single scrolling page with eight accessible expandable sections
- Expand all / Close all
- Direct links such as `/#prescriptions` or `/?lang=bn#prescriptions`
- NHS login link within Getting Started
- Device-sensitive download link: iOS → App Store, Android → Play Store, other → NHS download page
- Always-visible alternative link to official NHS download page
- English content and *draft UI-only* Bengali/Arabic translations
- NHS App video-guide links and safety footer

## Before patient publication

- Obtain sign-off for all wording, branding and links from the relevant NHS/CHE stakeholders.
- Verify the current NHS App screens and the app-store listings on representative devices.
- Translate **all** patient instructions and review translations with qualified language reviewers; currently the detailed instructions and feature labels remain English in non-English modes.
- Test keyboard, VoiceOver, TalkBack, zoom/reflow, screen readers and WCAG 2.2 AA requirements. The code has not been certified compliant.
- Consider whether an accessibility statement, privacy statement, and approved NHS domain/hosting are required.
- Check app-store links periodically; user-agent detection is best effort.
