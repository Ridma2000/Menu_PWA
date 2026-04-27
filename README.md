# [Your Restaurant Name] Menu

A mobile-first restaurant digital menu Progressive Web App built with React, TypeScript, Vite, Tailwind CSS, and `vite-plugin-pwa`.

## Features

- Home/welcome section with restaurant details
- Food categories and category filtering
- Menu item listing with search
- Item detail modal
- Cart with quantity controls, removal, and total price
- WhatsApp order button with a formatted cart message
- Contact/location section
- Frontend owner tools for editing menu items and categories
- PWA manifest, service worker, app shell precaching, and runtime caching for menu photos
- Placeholder install icons in `public/icons`

## Project Structure

```text
restaurant-menu-pwa/
  public/
    favicon.svg
    icons/
      icon-192.svg
      icon-512.svg
      maskable-icon.svg
  src/
    components/
      CartPanel.tsx
      ContactSection.tsx
      Header.tsx
      Hero.tsx
      ItemDetailsModal.tsx
      MenuCard.tsx
      OwnerMenuManager.tsx
      PWAInstallPrompt.tsx
      SearchFilter.tsx
      TagPill.tsx
    data/
      menu.ts
      restaurant.ts
    types/
      menu.ts
    utils/
      currency.ts
      menuStorage.ts
      order.ts
    App.tsx
    main.tsx
    index.css
  vite.config.ts
  tailwind.config.js
  postcss.config.js
```

## Edit Menu Items

### From the Frontend

Open the app and click the settings icon in the header, or scroll to the
Owner Tools section.

Before saving changes, enter the owner verification details:

```text
Email: ridma@gmail.com
Contact number: 0713464048
```

The save, edit, delete, availability, category, and reset controls stay locked
until both values match.

From there you can:

- Add a new category
- Rename a category
- Delete an empty category
- Add a new menu item
- Edit an existing menu item
- Change item price, description, category, image URL, tags, and availability
- Delete menu items
- Reset back to the original sample menu

These frontend edits are stored in browser `localStorage`. That means they stay
after refreshes on the same browser, but they are not shared with other devices
and they are not permanent database records.

For a real restaurant where staff need shared updates, connect the owner tools to
a backend, CMS, Google Sheet, Airtable, Firebase, Supabase, or another database.
This frontend check is only a convenience gate; production access control should
be handled on a backend.

### From the Source Data

Change menu data in:

```text
src/data/menu.ts
```

Each item has:

- `name`
- `category`
- `description`
- `price`
- `image`
- `available`
- `tags` such as `spicy`, `vegetarian`, or `popular`

Add or rename starter categories in `defaultMenuCategories`.

The current source exports are `defaultMenuCategories` and `defaultMenuItems`.
They are used as the starter menu and as the reset data for the frontend owner
tools.

## Edit Restaurant Details

Change placeholder restaurant information in:

```text
src/data/restaurant.ts
```

Set the WhatsApp value to digits with country code, for example:

```ts
whatsapp: '+94770000000'
```

The WhatsApp order URL removes non-digits automatically.

## Replace PWA Icons

The current icons are placeholder SVG files:

```text
public/favicon.svg
public/icons/icon-192.svg
public/icons/icon-512.svg
public/icons/maskable-icon.svg
```

Replace them with your restaurant logo or PNG/SVG production icons. If you change filenames, update the `manifest.icons` section in `vite.config.ts`.

## Run Locally

```bash
npm install
npm run dev
```

Build and preview production output:

```bash
npm run build
npm run preview
```

## Test the PWA

1. Run `npm run build`.
2. Run `npm run preview`.
3. Open the preview URL in Chrome or Edge.
4. Open DevTools, then Application.
5. Check Manifest for app name, theme color, and icons.
6. Check Service Workers for an active worker.
7. Use Lighthouse PWA checks.
8. Test offline behavior by enabling Offline in DevTools Network and refreshing the preview page.

Install prompts are browser-controlled. The in-app install banner appears only when the browser fires `beforeinstallprompt`.

## Deploy

Deploy the generated `dist` folder after running:

```bash
npm run build
```

Common static hosting options:

- Vercel: import the repo, use build command `npm run build`, output directory `dist`
- Netlify: build command `npm run build`, publish directory `dist`
- GitHub Pages: build with Vite and publish `dist`
- Any static host: upload the contents of `dist`

For a subpath deployment, set Vite `base` in `vite.config.ts` and rebuild.
