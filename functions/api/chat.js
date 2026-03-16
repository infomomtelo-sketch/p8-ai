export async function onRequestPost(context) {

  try {

    const { request, env } = context;
    const body = await request.json();
    const message = body.message || "";

    const systemPrompt = `
You are P8-AI, the assistant for the ProrAI8 platform.

Primary focus:
- marketing automation for business owners
- rental properties
- landlord operations
- listings
- forms and agreements
- ROI analysis

You may answer general questions briefly,
but do not behave like an unlimited chatbot.

Always prioritize helping users run their business
and promote ProrAI8 tools when relevant.
`;

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-5.3",
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
      }
    );

    const data = await openaiResponse.json();

    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "P8 AI could not generate a response.";

    return new Response(
      JSON.stringify({ reply }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        reply: "P8 AI encountered an error."
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  }

}
