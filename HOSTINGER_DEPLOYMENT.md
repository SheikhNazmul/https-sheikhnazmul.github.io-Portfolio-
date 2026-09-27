# Hostinger Deployment Guide

This document provides a step-by-step walkthrough for deploying Sheikh Nazmul Islam's AI Engineer Portfolio to Hostinger.

---

## Deployment Options

### Option A: Static Export (Recommended for 100% Reliability & Zero Server Overhead)
This project is configured with `output: 'export'` in `next.config.ts`. Running `npm run build` compiles your portfolio into pure HTML/CSS/JS files in the `out/` folder.

#### Steps for Hostinger Shared/Cloud Hosting (hPanel):
1. **Build Production Files**:
   Run local command:
   ```bash
   npm run build
   ```
   This creates an `out` folder in your project root containing all production files.

2. **Access Hostinger hPanel**:
   - Log in to your Hostinger dashboard.
   - Go to **Websites** -> Select your domain -> Open **File Manager**.

3. **Upload Content to `public_html`**:
   - Navigate to `public_html` (or subfolder if hosting in a directory).
   - Compress the contents of the local `out/` folder into a `.zip` file.
   - Upload the `.zip` file to `public_html` in Hostinger File Manager.
   - Extract the zip archive directly into `public_html`. Ensure `.htaccess` (included in `public/.htaccess`) is extracted to prevent subfolder 404 errors.

4. **Verify Route Resolution**:
   - Direct visits to `yourdomain.com/` and `yourdomain.com/projects/ml-prediction-fastapi/` will render seamlessly without 404 errors due to the included `.htaccess` rewrite rules.

---

### Option B: Node.js Hostinger Deployment (If Hostinger VPS or Node.js App Runner is used)
1. Set up a Node.js web app in Hostinger hPanel (Node.js version 18+ or 20+).
2. Change `next.config.ts` by temporarily commenting out `output: 'export'`.
3. Upload project source files (excluding `node_modules` and `.next`).
4. Run `npm install` and `npm run build` in Hostinger SSH/Terminal.
5. Set entry point to `npm start`.

---

## Domain & SSL Configuration
1. In Hostinger hPanel, navigate to **SSL**.
2. Click **Install SSL** (Free Let's Encrypt SSL) for your custom domain.
3. Force HTTPS redirect in Hostinger SSL settings.

---

## Updating Content Later
- When you add new YouTube project videos or live URLs, edit `lib/projects.ts`.
- Run `npm run build` locally.
- Re-upload the generated `out/` folder to `public_html`.
