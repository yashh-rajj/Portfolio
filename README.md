# Yash – Portfolio Website

A responsive, interactive portfolio for a first-year B.Tech AI & ML student at KIET, Ghaziabad. Built with plain HTML, CSS and JavaScript, with no frameworks or build step.

## Features

- **Live perceptron demo** in the hero: click the plot to add blue or orange points and watch a simple neural network retrain in real time
- **Animations**: line-by-line headline entrance, typing effect for roles, scroll-reveal sections, self-drawing heading underlines, scroll progress bar, and a background grid that drifts with the mouse
- **Interactive sections**: expandable skill cards, project filter chips (All / Python / Web), and a contact form that validates input and opens an email
- **Personal AI chatbot**: a floating chat assistant (powered by the Gemini API) that introduces itself as Yashraj's personal AI assistant and answers questions about his skills and projects
- **Light and dark theme** with a toggle that remembers your choice
- **Fully responsive** layout with a hamburger menu on mobile
- **Accessible**: keyboard focus styles, ARIA labels, and animations switched off for visitors who prefer reduced motion

## Project structure

```
yash-portfolio/
├── index.html   # page structure and content
├── style.css    # design, layout, themes, animations
├── script.js    # interactivity, perceptron demo, theme, form
├── chatbot.js   # chat widget + assistant personality (system prompt)
├── chatbot.css  # chat widget styles (follows light/dark theme)
├── config.js    # your Gemini key / proxy URL / model name
├── worker.js    # optional Cloudflare Worker to keep the key secret
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

## Chatbot setup

1. Get a free key at [Google AI Studio](https://aistudio.google.com/apikey).
2. Open `config.js` and replace `PASTE_YOUR_GEMINI_API_KEY_HERE` with it.
3. Reload the page and click the chat bubble.

### Keep your key safe

A static site cannot hide a key: anyone can read `config.js` in the browser. Pick one:

- **Restrict the key** (quick): in Google Cloud Console -> APIs & Services -> Credentials, open the key, set *Website restrictions* to `https://yashh-rajj.github.io/*`, and limit it to the *Generative Language API*. Set a low quota.
- **Use the proxy** (best): deploy `worker.js` to Cloudflare Workers, store the key as the secret `GEMINI_API_KEY`, then put the worker URL in `PROXY_URL` and clear the key in `config.js`.

To change what the assistant knows or how it talks, edit `SYSTEM_PROMPT` in `chatbot.js`.

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
