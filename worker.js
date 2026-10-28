/* Optional but recommended: Cloudflare Worker that hides your Gemini key.
   1. Cloudflare dashboard -> Workers & Pages -> Create -> paste this file.
   2. Settings -> Variables and Secrets -> add secret GEMINI_API_KEY.
   3. (Optional) edit ALLOWED_ORIGIN below to your site URL.
   4. Put the worker URL in config.js as PROXY_URL. */
const ALLOWED_ORIGIN = 'https://yashh-rajj.github.io';
const MODEL = 'gemini-2.5-flash';

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    const body = await request.text();
    if (body.length > 20000) return new Response('Too large', { status: 413, headers: cors });

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY }, body }
    );
    return new Response(r.body, { status: r.status, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
};
