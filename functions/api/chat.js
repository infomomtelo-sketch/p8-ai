export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const message = (body.message || "").trim();
    const flow = body.flow || null;
    const flowState = body.flowState || {};

    if (flow === "listing") {
      return handleListingFlow(message, flowState);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-5",
        messages: [
          {
            role: "system",
            content: `
You are P8 AI, a business operator assistant.

Rules:
- Be concise, practical, and clear.
- When useful, include actions in square brackets:
[Start Listing]
[Estimate ROI]
[Analyze Listing]
[Browse Rentals]
- Avoid asking too many questions at once.
- Prefer short, actionable answers.
            `.trim()
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response from AI.";

    return json({
      reply,
      flow: null,
      flowState: {}
    });

  } catch (err) {
    return json({
      reply: "Server error connecting to AI."
    }, 500);
  }
}

function handleListingFlow(message, state) {
  const step = state.step || 1;
  const answers = state.answers || {};

  if (step === 1) {
    const propertyType = normalizePropertyType(message);

    if (!propertyType) {
      return json({
        reply: `
Step 1 of 4: What type of rental is this?

[Private room]
[Apartment]
[House]
[Studio / ADU]
        `.trim(),
        flow: "listing",
        flowState: {
          step: 1,
          answers
        }
      });
    }

    answers.propertyType = propertyType;

    return json({
      reply: `
Got it — **${propertyType}**.

Step 2 of 4: Where is it located?

Type the city or the full address.
      `.trim(),
      flow: "listing",
      flowState: {
        step: 2,
        answers
      }
    });
  }

  if (step === 2) {
    if (!message || message.length < 2) {
      return json({
        reply: "Please enter the city or full address for this rental.",
        flow: "listing",
        flowState: {
          step: 2,
          answers
        }
      });
    }

    answers.location = message;

    return json({
      reply: `
Got it — **${message}**.

Step 3 of 4: Is it furnished?

[Yes]
[No]
      `.trim(),
      flow: "listing",
      flowState: {
        step: 3,
        answers
      }
    });
  }

  if (step === 3) {
    const furnished = normalizeYesNo(message);

    if (!furnished) {
      return json({
        reply: `
Step 3 of 4: Is it furnished?

[Yes]
[No]
        `.trim(),
        flow: "listing",
        flowState: {
          step: 3,
          answers
        }
      });
    }

    answers.furnished = furnished;

    return json({
      reply: `
Got it — **${furnished}**.

Step 4 of 4: What monthly rent are you thinking?

Type a number like:
1200
        `.trim(),
        flow: "listing",
        flowState: {
          step: 4,
          answers
        }
      });
  }

  if (step === 4) {
    const rent = normalizeRent(message);

    if (!rent) {
      return json({
        reply: "Please enter a monthly rent amount like 1200.",
        flow: "listing",
        flowState: {
          step: 4,
          answers
        }
      });
    }

    answers.rent = rent;

    const title = buildListingTitle(answers);
    const description = buildListingDescription(answers);

    return json({
      reply: `
Your listing draft is ready.

**Suggested title**
${title}

**Suggested description**
${description}

**Next actions**
[Analyze Listing]
[Estimate ROI]
[Start Listing]
      `.trim(),
      flow: null,
      flowState: {}
    });
  }

  return json({
    reply: "Listing flow reset. [Start Listing]",
    flow: null,
    flowState: {}
  });
}

function normalizePropertyType(input) {
  const text = (input || "").trim().toLowerCase();

  if (!text) return null;
  if (text.includes("private room") || text === "room") return "Private room";
  if (text.includes("apartment")) return "Apartment";
  if (text.includes("house")) return "House";
  if (text.includes("studio") || text.includes("adu")) return "Studio / ADU";

  if (text === "a") return "Private room";
  if (text === "b") return "Apartment";
  if (text === "c") return "House";
  if (text === "d") return "Studio / ADU";

  return null;
}

function normalizeYesNo(input) {
  const text = (input || "").trim().toLowerCase();

  if (["yes", "y", "furnished"].includes(text)) return "Yes";
  if (["no", "n", "not furnished"].includes(text)) return "No";

  return null;
}

function normalizeRent(input) {
  const digits = (input || "").replace(/[^0-9]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function buildListingTitle(answers) {
  const furnishedText = answers.furnished === "Yes" ? "Furnished " : "";
  return `${furnishedText}${answers.propertyType} in ${answers.location} – $${answers.rent}/month`;
}

function buildListingDescription(answers) {
  const furnishedSentence =
    answers.furnished === "Yes"
      ? "This rental is furnished and ready for move-in."
      : "This rental offers a clean and practical setup for the right renter.";

  return `${furnishedSentence} Located in ${answers.location}, this ${answers.propertyType.toLowerCase()} is offered at $${answers.rent} per month. Ideal for renters looking for a convenient and well-positioned home base.`;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
