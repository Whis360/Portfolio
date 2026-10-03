# Portfolio

Personal portfolio of **Wisdom Nwaka** — a hand-coded, responsive single-page site.

**Live:** https://whis360.github.io/Portfolio/

## Sections

- **Home** — short intro with a call-to-action
- **Services** — what I offer (web design, development, React, and more)
- **Projects** — real projects with screenshots and links to the code
- **Contact** — email + GitHub

## Built with

- Semantic **HTML5** — one page, no framework
- Modern **CSS** — grid, flexbox, `clamp()`, custom properties, scroll-driven nav states
- Vanilla **JavaScript** — mobile menu, scroll-reveal animations and scrollspy,
  all progressive enhancement (the page works with JS disabled)
- [Font Awesome](https://fontawesome.com/) icons, self-hosted (no CDN dependency)

## Run it locally

Any static file server works:

```bash
npx http-server . -c-1
# or
python -m http.server 8080
```

Then open the printed URL in your browser. (Opening `index.html` directly also works.)

## Deploy

The site is plain static files, served via **GitHub Pages** from the `main` branch
(root). Any push to `main` updates the live site within a minute or two.

## Project structure

```
index.html          # the whole page
css/style.css       # styles (layout, components, responsive rules)
css/all.min.css     # Font Awesome (self-hosted)
webfonts/           # Font Awesome font files
js/main.js          # menu toggle, scroll-reveal, scrollspy
img/                # logo, hero illustration, project screenshots
```
