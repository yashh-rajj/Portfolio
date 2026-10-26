# Yash – Portfolio Website

A responsive, interactive portfolio for a first-year B.Tech AI & ML student at KIET, Ghaziabad. Built with plain HTML, CSS and JavaScript, with no frameworks or build step.

## Features

- **Live perceptron demo** in the hero: click the plot to add blue or orange points and watch a simple neural network retrain in real time
- **Animations**: line-by-line headline entrance, typing effect for roles, scroll-reveal sections, self-drawing heading underlines, scroll progress bar, and a background grid that drifts with the mouse
- **Interactive sections**: expandable skill cards, project filter chips (All / Python / Web), and a contact form that validates input and opens an email
- **Light and dark theme** with a toggle that remembers your choice
- **Fully responsive** layout with a hamburger menu on mobile
- **Accessible**: keyboard focus styles, ARIA labels, and animations switched off for visitors who prefer reduced motion

## Project structure

```
yash-portfolio/
├── index.html   # page structure and content
├── style.css    # design, layout, themes, animations
├── script.js    # interactivity, perceptron demo, theme, form
└── README.md
```

## Run locally

1. Download or clone this folder.
2. Open `index.html` in any modern browser.

An internet connection is needed once to load the Google Fonts (Bricolage Grotesque and Figtree).

## Customize

| What to change | Where |
| --- | --- |
| Name, intro, About text | `index.html` |
| Skills and project cards | `index.html` (`#skills`, `#projects`) |
| GitHub and project links | `index.html` (replace the `#` links) |
| Email that receives messages | `script.js` (the `EMAIL` constant) |
| Typing-effect phrases | `script.js` (the `roles` array) |
| Colours and fonts | `style.css` (CSS variables at the top) |

## Deploy for free

**GitHub Pages**

1. Push the files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Branch**, choose `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

**Netlify or Vercel**: drag and drop the folder, or connect the repository. No build settings are needed.

## Built with

- HTML5
- CSS3 (custom properties, grid, flexbox, keyframe animations)
- Vanilla JavaScript (Canvas API, IntersectionObserver)

## Author

**Yash**, B.Tech AI & ML, KIET Ghaziabad

## License

Free to use and adapt for your own portfolio.
