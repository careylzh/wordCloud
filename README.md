# wordCloud

A lightweight word cloud app for GitHub Pages.

## Features

- Add words through the text field or by pressing Enter
- Word size scales with frequency
- Insignificant filler words appear muted in gray
- More significant repeated words appear bold in black
- Typography tuned to an editorial serif look inspired by the provided reference

## Local preview

Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Deploy to GitHub Pages

1. Create a GitHub repo named `wordCloud`
2. Push this folder to the `main` branch
3. In GitHub, open **Settings → Pages**
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Save, then wait for Pages to publish

Your site will appear at something like:

`https://<your-github-username>.github.io/wordCloud/`
