export async function onRequestPost(context) {
  const { request, env } = context;

  const body = await request.json();
  const userMessage = body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are P8 AI, a rental business assistant helping with listings, pricing, ROI, and operations."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();

  return new Response(JSON.stringify({
    reply: data.choices[0].message.content
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
