export async function onRequestPost(context) {

  try {

    const { request, env } = context;
    const body = await request.json();
    const message = body.message || "";

    const systemPrompt = `
You are P8-AI, assistant for the ProrAI8 platform.

Focus on:
- marketing automation
- rental management
- property listings
- inspections
- business workflows
- ROI analysis

Help users operate their business.
Avoid behaving like a generic unlimited chatbot.
Keep answers concise and practical.
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
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ]
        })
      }
    );

    const data = await openaiResponse.json();

    console.log("OpenAI response:", data);

    let reply = "";

    if (data.output_text) {
      reply = data.output_text;
    } else if (data.output && data.output.length) {
      reply = data.output[0].content[0].text;
    } else if (data.error) {
      reply = "OpenAI error: " + data.error.message;
    } else {
      reply = "P8 AI could not generate a response.";
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        reply: "P8 AI server error."
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  }

}
