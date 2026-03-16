export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    if (request.method !== "POST") {
      return json(
        { reply: "Method not allowed." },
        405
      );
    }

    const body = await request.json();
    const message = (body?.message || "").trim();

    if (!message) {
      return json(
        { reply: "Please enter a message." },
        400
      );
    }

    if (!env.OPENAI_API_KEY) {
      return json(
        { reply: "Missing OPENAI_API_KEY in Cloudflare environment variables." },
        500
      );
    }

    if (!env.OPENAI_MODEL) {
      return json(
        { reply: "Missing OPENAI_MODEL in Cloudflare environment variables." },
        500
      );
    }

    const systemPrompt = `
You are P8 AI for ProAI8.

Role:
- complete manager for business owners
- strongest at marketing automation, rentals, listings, forms, agreements, inspections, ROI, and business workflows
- helpful, practical, concise, and action-oriented
- do not behave like an unlimited generic chatbot

Behavior:
- answer clearly and briefly
- prioritize business usefulness
- when relevant, naturally guide users toward ProAI8 tools like listings, rentals, forms, agreements, inspection, and ROI
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 250,
        temperature: 0.6
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const apiMessage =
        data?.error?.message ||
        "OpenAI request failed.";

      return json(
        {
          reply: `OpenAI error: ${apiMessage}`
        },
        response.status
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No response returned.";

    return json({ reply }, 200);

  } catch (error) {
    return json(
      {
        reply: `Server error: ${error?.message || "Unknown error"}`
      },
      500
    );
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}
