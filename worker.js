/* Cloudflare Worker: paste your Gemini key directly below, no secrets or
   settings needed.
   1. Cloudflare dashboard -> Workers & Pages -> Create -> Hello World.
   2. Click Edit code, delete everything, paste this whole file.
   3. Replace PASTE_YOUR_GEMINI_API_KEY_HERE below with your key, then Deploy.
   4. Copy the worker URL into config.js as PROXY_URL
      (and clear GEMINI_API_KEY there). */
const GEMINI_API_KEY = 'AQ.Ab8RN6KtUE926beya6IgGzwQ0ghwvd9iUEZYVSiocv0idRM2Vg';
const MODEL = 'gemini-2.5-flash';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: CORS });

    const body = await request.text();
    if (body.length > 20000) return new Response('Too large', { status: 413, headers: CORS });

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
        body
      }
    );
    return new Response(r.body, { status: r.status, headers: { ...CORS, 'Content-Type': 'application/json' } });
  }
};
