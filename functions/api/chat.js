export async function onRequestPost(context) {
  const { request } = context;

  const body = await request.json();
  const message = body.message;

  const response = await fetch("https://p8-ai.infomomtelo.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
