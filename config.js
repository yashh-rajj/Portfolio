/* ------------------------------------------------------------------
   Chatbot settings
   ------------------------------------------------------------------
   Option A (quick, works on GitHub Pages):
     Paste your Gemini key below. NOTE: on a static site this key is
     visible to anyone who opens DevTools. Protect it by restricting it
     to your site's URL (see README -> "Keep your key safe").

   Option B (recommended, key stays secret):
     Deploy worker.js (Cloudflare Workers, free), then put its URL in
     PROXY_URL and leave GEMINI_API_KEY empty.
------------------------------------------------------------------- */
window.CHATBOT_CONFIG = {
  GEMINI_API_KEY: 'AQ.Ab8RN6KtUE926beya6IgGzwQ0ghwvd9iUEZYVSiocv0idRM2Vg',
  MODEL: 'gemini-2.5-flash',   // change here if Google retires this model name
  PROXY_URL: ''                // e.g. 'https://portfolio-chat.yourname.workers.dev'
};
