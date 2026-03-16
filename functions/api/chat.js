export async function onRequestPost(context) {

  const { request, env } = context;
  const body = await request.json();
  const message = body.message || "";

  const systemPrompt = `
You are P8-AI, the assistant for the ProrAI8 platform.

Primary focus:
- rental properties
- landlord operations
- tenant questions
- ROI and investment analysis

You may answer light general questions briefly,
but avoid acting like a general unlimited chatbot.
Keep responses practical and concise.
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL,
      max_output_tokens: 200,
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

  return new Response(JSON.stringify({
    reply: data.output_text
  }), {
    headers: { "Content-Type": "application/json" }
  });

}
