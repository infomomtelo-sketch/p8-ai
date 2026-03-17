export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const message = (body.message || "").trim();
    const flow = body.flow || null;
    const flowState = body.flowState || {};

    if (flow === "listing") {
      return await handleListingFlow(message, flowState, env);
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
- Prefer short, actionable answers.
- When useful, include actions in square brackets:
[Start Listing]
[Estimate ROI]
[Analyze Listing]
[Browse Rentals]
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
    return json({ reply: "Server error connecting to AI." }, 500);
  }
}

async function handleListingFlow(message, state, env) {
  const answers = state.answers || {};
  let step = state.step || 1;

  if (message === "__start__") {
    step = 1;
  }

  if (step === 1) {
    const propertyType = normalizePropertyType(message);

    if (message !== "__start__" && propertyType) {
      answers.propertyType = propertyType;
      return json({
        reply: `
Got it — **${propertyType}**.

Step 2 of 10: Where is it located?

Type the city or full address.
        `.trim(),
        flow: "listing",
        flowState: { step: 2, answers }
      });
    }

    return json({
      reply: `
Step 1 of 10: What type of rental is this?

[Private room]
[Apartment]
[House]
[Studio / ADU]
      `.trim(),
      flow: "listing",
      flowState: { step: 1, answers }
    });
  }

  if (step === 2) {
    if (!message || message === "__start__") {
      return json({
        reply: "Please enter the city or full address.",
        flow: "listing",
        flowState: { step: 2, answers }
      });
    }

    answers.location = message;

    return json({
      reply: `
Got it — **${message}**.

Step 3 of 10: Is this the entire place or a room?

[Entire place]
[Private room]
[Shared room]
      `.trim(),
      flow: "listing",
      flowState: { step: 3, answers }
    });
  }

  if (step === 3) {
    const occupancyType = normalizeOccupancyType(message);

    if (!occupancyType) {
      return json({
        reply: `
Step 3 of 10: Is this the entire place or a room?

[Entire place]
[Private room]
[Shared room]
        `.trim(),
        flow: "listing",
        flowState: { step: 3, answers }
      });
    }

    answers.occupancyType = occupancyType;

    return json({
      reply: `
Got it — **${occupancyType}**.

Step 4 of 10: Is it furnished?

[Yes]
[No]
      `.trim(),
      flow: "listing",
      flowState: { step: 4, answers }
    });
  }

  if (step === 4) {
    const furnished = normalizeYesNo(message);

    if (!furnished) {
      return json({
        reply: `
Step 4 of 10: Is it furnished?

[Yes]
[No]
        `.trim(),
        flow: "listing",
        flowState: { step: 4, answers }
      });
    }

    answers.furnished = furnished;

    return json({
      reply: `
Got it — **${furnished}**.

Step 5 of 10: How many bedrooms?

Type a number like:
1
2
3
      `.trim(),
      flow: "listing",
      flowState: { step: 5, answers }
    });
  }

  if (step === 5) {
    const bedrooms = normalizeNumber(message);

    if (!bedrooms) {
      return json({
        reply: "Please enter the number of bedrooms, like 1 or 2.",
        flow: "listing",
        flowState: { step: 5, answers }
      });
    }

    answers.bedrooms = bedrooms;

    return json({
      reply: `
Got it — **${bedrooms} bedroom${bedrooms > 1 ? "s" : ""}**.

Step 6 of 10: How many bathrooms?

Type a number like:
1
1.5
2
      `.trim(),
      flow: "listing",
      flowState: { step: 6, answers }
    });
  }

  if (step === 6) {
    const bathrooms = normalizeDecimal(message);

    if (!bathrooms) {
      return json({
        reply: "Please enter the number of bathrooms, like 1, 1.5, or 2.",
        flow: "listing",
        flowState: { step: 6, answers }
      });
    }

    answers.bathrooms = bathrooms;

    return json({
      reply: `
Got it — **${bathrooms} bathroom${Number(bathrooms) > 1 ? "s" : ""}**.

Step 7 of 10: Which amenities should we include?

You can tap one of these or type your own:
[Parking]
[Laundry]
[Wi-Fi]
[Air conditioning]
[Kitchen]
[Done]
      `.trim(),
      flow: "listing",
      flowState: {
        step: 7,
        answers: {
          ...answers,
          amenities: answers.amenities || []
        }
      }
    });
  }

  if (step === 7) {
    const amenities = answers.amenities || [];
    const amenity = normalizeAmenity(message);

    if (amenity === "__done__") {
      answers.amenities = amenities;

      return json({
        reply: `
Got it — **${amenities.length ? amenities.join(", ") : "no amenities selected yet"}**.

Step 8 of 10: What monthly rent are you thinking?

Type a number like:
1200
        `.trim(),
        flow: "listing",
        flowState: { step: 8, answers }
      });
    }

    if (!amenity) {
      return json({
        reply: `
Choose an amenity or tap done.

Selected so far: **${amenities.length ? amenities.join(", ") : "none"}**

[Parking]
[Laundry]
[Wi-Fi]
[Air conditioning]
[Kitchen]
[Done]
        `.trim(),
        flow: "listing",
        flowState: { step: 7, answers: { ...answers, amenities } }
      });
    }

    if (!amenities.includes(amenity)) {
      amenities.push(amenity);
    }

    return json({
      reply: `
Added **${amenity}**.

Selected so far: **${amenities.join(", ")}**

[Parking]
[Laundry]
[Wi-Fi]
[Air conditioning]
[Kitchen]
[Done]
      `.trim(),
      flow: "listing",
      flowState: { step: 7, answers: { ...answers, amenities } }
    });
  }

  if (step === 8) {
    const rent = normalizeRent(message);

    if (!rent) {
      return json({
        reply: "Please enter a monthly rent amount like 1200.",
        flow: "listing",
        flowState: { step: 8, answers }
      });
    }

    answers.rent = rent;

    const pricingReply = await getPricingCheck(answers, env);

    return json({
      reply: `
Step 9 of 10: Pricing check

${pricingReply}

[Keep current price]
[Optimize price]
      `.trim(),
      flow: "listing",
      flowState: { step: 9, answers }
    });
  }

  if (step === 9) {
    const pricingDecision = normalizePricingDecision(message);

    if (!pricingDecision) {
      return json({
        reply: `
Step 9 of 10: Do you want to keep this price or optimize it?

[Keep current price]
[Optimize price]
        `.trim(),
        flow: "listing",
        flowState: { step: 9, answers }
      });
    }

    answers.pricingDecision = pricingDecision;

    const title = buildListingTitle(answers);
    const description = buildListingDescription(answers);
    const summary = buildListingSummary(answers);

    return json({
      reply: `
Step 10 of 10: Your draft is ready

**Suggested title**  
${title}

**Suggested description**  
${description}

**Listing summary**  
${summary}

**Next actions**  
[Publish listing]
[Analyze Listing]
[Estimate ROI]
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

async function getPricingCheck(answers, env) {
  try {
    const prompt = `
Give a short pricing check for this rental.

Property type: ${answers.propertyType}
Occupancy: ${answers.occupancyType}
Location: ${answers.location}
Furnished: ${answers.furnished}
Bedrooms: ${answers.bedrooms}
Bathrooms: ${answers.bathrooms}
Amenities: ${(answers.amenities || []).join(", ") || "None"}
Proposed rent: $${answers.rent}/month

Respond in 3 short lines:
1. whether the price seems low / fair / high
2. a simple competitive range
3. one practical note
    `.trim();

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
            content: "You are a rental pricing assistant. Be concise and practical."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || `Your proposed price is $${answers.rent}/month.`;
  } catch {
    return `Your proposed price is $${answers.rent}/month. We can refine it after publishing.`;
  }
}

function normalizePropertyType(input) {
  const text = (input || "").trim().toLowerCase();
  if (!text) return null;
  if (text.includes("private room") || text === "room") return "Private room";
  if (text.includes("apartment")) return "Apartment";
  if (text.includes("house")) return "House";
  if (text.includes("studio") || text.includes("adu")) return "Studio / ADU";
  return null;
}

function normalizeOccupancyType(input) {
  const text = (input || "").trim().toLowerCase();
  if (!text) return null;
  if (text.includes("entire")) return "Entire place";
  if (text.includes("private room")) return "Private room";
  if (text.includes("shared room")) return "Shared room";
  return null;
}

function normalizeYesNo(input) {
  const text = (input || "").trim().toLowerCase();
  if (["yes", "y"].includes(text)) return "Yes";
  if (["no", "n"].includes(text)) return "No";
  return null;
}

function normalizeNumber(input) {
  const n = parseInt((input || "").replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function normalizeDecimal(input) {
  const cleaned = (input || "").replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function normalizeRent(input) {
  const digits = (input || "").replace(/[^0-9]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function normalizeAmenity(input) {
  const text = (input || "").trim().toLowerCase();
  if (!text) return null;
  if (text === "done") return "__done__";
  if (text.includes("parking")) return "Parking";
  if (text.includes("laundry")) return "Laundry";
  if (text.includes("wi-fi") || text.includes("wifi")) return "Wi-Fi";
  if (text.includes("air")) return "Air conditioning";
  if (text.includes("kitchen")) return "Kitchen";
  return input.trim();
}

function normalizePricingDecision(input) {
  const text = (input || "").trim().toLowerCase();
  if (text.includes("keep")) return "Keep current price";
  if (text.includes("optimize")) return "Optimize price";
  return null;
}

function buildListingTitle(answers) {
  const furnishedText = answers.furnished === "Yes" ? "Furnished " : "";
  return `${furnishedText}${answers.propertyType} in ${answers.location} – $${answers.rent}/month`;
}

function buildListingDescription(answers) {
  const amenitiesText = (answers.amenities || []).length
    ? `Features include ${answers.amenities.join(", ").toLowerCase()}.`
    : "";

  const furnishedSentence =
    answers.furnished === "Yes"
      ? "This rental is furnished and ready for move-in."
      : "This rental offers a clean and practical setup for the right renter.";

  return `${furnishedSentence} Located in ${answers.location}, this ${answers.propertyType.toLowerCase()} offers ${answers.bedrooms} bedroom${answers.bedrooms > 1 ? "s" : ""} and ${answers.bathrooms} bathroom${Number(answers.bathrooms) > 1 ? "s" : ""}. ${amenitiesText} Offered at $${answers.rent} per month.`;
}

function buildListingSummary(answers) {
  return [
    `Type: ${answers.propertyType}`,
    `Occupancy: ${answers.occupancyType}`,
    `Location: ${answers.location}`,
    `Furnished: ${answers.furnished}`,
    `Bedrooms: ${answers.bedrooms}`,
    `Bathrooms: ${answers.bathrooms}`,
    `Amenities: ${(answers.amenities || []).join(", ") || "None"}`,
    `Rent: $${answers.rent}/month`,
    `Pricing decision: ${answers.pricingDecision}`
  ].join("\n");
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
