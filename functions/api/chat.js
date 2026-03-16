export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    if (request.method !== "POST") {
      return json({ reply: "Method not allowed" }, 405);
    }

    const body = await request.json();
    const message = body.message?.trim();

    if (!message) {
      return json({ reply: "Please enter a message." }, 400);
    }

    if (!env.OPENAI_API_KEY) {
      return json({
        reply: "Missing OPENAI_API_KEY in Cloudflare environment."
      }, 500);
    }

    if (!env.OPENAI_MODEL) {
      return json({
        reply: "Missing OPENAI_MODEL in Cloudflare environment."
      }, 500);
    }

    // 🧠 System Prompt (P8 AI personality)
    const systemPrompt = `
You are P8 AI for ProAI8.

You help users manage:
- rentals
- listings
- marketing
- inspections
- ROI
- business workflows

Keep responses:
- clear
- practical
- step-by-step when needed
- business-focused
`;

    // 🚀 NEW OpenAI API (RESPONSES endpoint)
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL,
        input: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // ❌ Handle API errors
    if (!response.ok) {
      return json({
        reply: "OpenAI error: " + (data.error?.message || "Request failed")
      }, 500);
    }

    // ✅ Extract response (NEW format)
    const reply =
      data?.output?.[0]?.content?.[0]?.text ||
      "No response returned.";

    return json({ reply }, 200);

  } catch (error) {
    return json({
      reply: "Server error: " + (error.message || "Unknown error")
    }, 500);
  }
}

// helper
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}
