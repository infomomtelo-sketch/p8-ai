"use client";

import { useEffect, useRef, useState } from "react";

export default function HouseholdPage() {
  const [messages, setMessages] = useState([
    { type: "ai", text: "What do you need?" },
    {
      type: "options",
      options: [
        { label: "List property", flow: "list" },
        { label: "Find rental", flow: "rental" },
        { label: "Schedule showing", flow: "showing" },
        { label: "Start application", flow: "application" },
        { label: "Pay rent", flow: "payment" },
        { label: "Repairs / move-in", flow: "help" },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [flow, setFlow] = useState(null);
  const [step, setStep] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (text, type = "ai") => {
    setMessages((prev) => [...prev, { type, text }]);
  };

  const addOptions = (options) => {
    setMessages((prev) => [...prev, { type: "options", options }]);
  };

  const resetToMain = () => {
    setFlow(null);
    setStep(null);
    addMessage("What do you need?");
    addOptions([
      { label: "List property", flow: "list" },
      { label: "Find rental", flow: "rental" },
      { label: "Schedule showing", flow: "showing" },
      { label: "Start application", flow: "application" },
      { label: "Pay rent", flow: "payment" },
      { label: "Repairs / move-in", flow: "help" },
    ]);
  };

  const showNextSteps = () => {
    addMessage("What would you like to do next?");
    addOptions([
      { label: "Find rental", flow: "rental" },
      { label: "List property", flow: "list" },
      { label: "Pay rent", flow: "payment" },
      { label: "Main menu", action: "main" },
    ]);
  };

  const startAction = (type) => {
    const labelMap = {
      list: "List property",
      rental: "Find rental",
      showing: "Schedule showing",
      application: "Start application",
      payment: "Pay rent",
      help: "Repairs / move-in",
    };

    addMessage(labelMap[type] || type, "user");

    if (type === "list") {
      setFlow("listing");
      setStep("type");
      addMessage("Property type?");
      addOptions([
        { label: "House" },
        { label: "Apartment" },
        { label: "Studio" },
        { label: "Room" },
        { label: "Back" },
      ]);
      return;
    }

    if (type === "rental") {
      setFlow("rental");
      setStep("start");
      addMessage("How would you like to start?");
      addOptions([
        { label: "Location" },
        { label: "Budget" },
        { label: "Move-in" },
        { label: "Bedrooms" },
        { label: "Back" },
      ]);
      return;
    }

    if (type === "showing") {
      setFlow("showing");
      setStep("day");
      addMessage("Choose a day.");
      addOptions([
        { label: "Friday" },
        { label: "Saturday" },
        { label: "Sunday" },
        { label: "Back" },
      ]);
      return;
    }

    if (type === "application") {
      setFlow("application");
      setStep("start");
      addMessage("Start with?");
      addOptions([
        { label: "Move-in date" },
        { label: "Income" },
        { label: "Occupants" },
        { label: "Pets" },
        { label: "Back" },
      ]);
      return;
    }

    if (type === "payment") {
      setFlow("payment");
      setStep("method");
      addMessage("Payment method?");
      addOptions([
        { label: "Credit card" },
        { label: "Debit card" },
        { label: "Bank transfer" },
        { label: "Back" },
      ]);
      return;
    }

    if (type === "help") {
      setFlow("help");
      setStep("type");
      addMessage("What do you need help with?");
      addOptions([
        { label: "Move-in" },
        { label: "Move-out" },
        { label: "Repairs" },
        { label: "Back" },
      ]);
    }
  };

  const handleOption = (option) => {
    if (option.action === "main") {
      addMessage(option.label, "user");
      resetToMain();
      return;
    }

    if (option.flow) {
      startAction(option.flow);
      return;
    }

    if (option.label === "Back") {
      addMessage("Back", "user");
      resetToMain();
      return;
    }

    addMessage(option.label, "user");

    // LISTING FLOW
    if (flow === "listing") {
      if (step === "type") {
        setStep("bedrooms");
        addMessage("Bedrooms?");
        addOptions([
          { label: "Studio" },
          { label: "1" },
          { label: "2" },
          { label: "3+" },
          { label: "Back" },
        ]);
        return;
      }

      if (step === "bedrooms") {
        setStep("rent");
        addMessage("Rent range?");
        addOptions([
          { label: "$1k–$2k" },
          { label: "$2k–$3k" },
          { label: "$3k+" },
          { label: "Back" },
        ]);
        return;
      }

      if (step === "rent") {
        setFlow(null);
        setStep(null);
        addMessage("Listing ready.");
        addOptions([
          { label: "Add photos" },
          { label: "Finish later" },
        ]);
        showNextSteps();
        return;
      }
    }

    // RENTAL FLOW
    if (flow === "rental") {
      if (step === "start") {
        setStep("next");
        addMessage("Here are your next options.");
        addOptions([
          { label: "View listings" },
          { label: "Schedule showing", flow: "showing" },
          { label: "Start application", flow: "application" },
          { label: "Back" },
        ]);
        return;
      }

      if (step === "next") {
        setFlow(null);
        setStep(null);
        addMessage("Rental step saved.");
        showNextSteps();
        return;
      }
    }

    // SHOWING FLOW
    if (flow === "showing") {
      if (step === "day") {
        setStep("time");
        addMessage("Choose a time.");
        addOptions([
          { label: "10:00 AM" },
          { label: "1:00 PM" },
          { label: "4:00 PM" },
          { label: "Back" },
        ]);
        return;
      }

      if (step === "time") {
        setFlow(null);
        setStep(null);
        addMessage("Showing scheduled.");
        addOptions([
          { label: "Start application", flow: "application" },
          { label: "Find rental", flow: "rental" },
        ]);
        showNextSteps();
        return;
      }
    }

    // APPLICATION FLOW
    if (flow === "application") {
      if (step === "start") {
        setFlow(null);
        setStep(null);
        addMessage("Application step saved.");
        addOptions([
          { label: "Continue application" },
          { label: "Schedule showing", flow: "showing" },
        ]);
        showNextSteps();
        return;
      }
    }

    // PAYMENT FLOW
    if (flow === "payment") {
      if (step === "method") {
        setStep("invoice");
        addMessage("Need receipt?");
        addOptions([
          { label: "Yes" },
          { label: "No" },
          { label: "Back" },
        ]);
        return;
      }

      if (step === "invoice") {
        if (option.label === "Yes") {
          setStep("delivery");
          addMessage("Send via?");
          addOptions([
            { label: "Email" },
            { label: "Text" },
            { label: "Back" },
          ]);
        } else {
          setFlow(null);
          setStep(null);
          addMessage("Payment step complete.");
          showNextSteps();
        }
        return;
      }

      if (step === "delivery") {
        setFlow(null);
        setStep(null);
        addMessage("Enter contact.");
        showNextSteps();
        return;
      }
    }

    // HELP FLOW
    if (flow === "help") {
      if (step === "type") {
        setFlow(null);
        setStep(null);
        addMessage("Support request started.");
        addOptions([
          { label: "Repairs / move-in" },
          { label: "Main menu", action: "main" },
        ]);
        return;
      }
    }
  };

  const detectIntent = (text) => {
    const t = text.toLowerCase();

    if (t.includes("pay")) return "payment";
    if (t.includes("rent") || t.includes("place") || t.includes("rental")) return "rental";
    if (t.includes("list") || t.includes("property") || t.includes("owner")) return "list";
    if (t.includes("show") || t.includes("showing")) return "showing";
    if (t.includes("apply") || t.includes("application")) return "application";
    if (t.includes("repair") || t.includes("move in") || t.includes("move-out") || t.includes("move out")) return "help";

    return null;
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    addMessage(text, "user");
    setInputValue("");

    const detected = detectIntent(text);
    if (detected) {
      startAction(detected);
      return;
    }

    addMessage("Choose an option below or type what you need.");
    addOptions([
      { label: "List property", flow: "list" },
      { label: "Find rental", flow: "rental" },
      { label: "Schedule showing", flow: "showing" },
      { label: "Start application", flow: "application" },
      { label: "Pay rent", flow: "payment" },
      { label: "Repairs / move-in", flow: "help" },
    ]);
  };

  return (
    <div style={page}>
      <div style={topSection}>
        <h2 style={title}>What do you need?</h2>

        <div style={roleCards}>
          <div style={card} onClick={() => startAction("list")}>
            <div style={emoji}>🏠</div>
            <div style={cardTitle}>List property</div>
            <div style={cardSub}>Owner</div>
          </div>

          <div style={card} onClick={() => startAction("rental")}>
            <div style={emoji}>🧳</div>
            <div style={cardTitle}>Find rental</div>
            <div style={cardSub}>Renter</div>
          </div>
        </div>

        <div style={quickActions}>
          <button style={smallBtn} onClick={() => startAction("showing")}>
            Showing
          </button>
          <button style={smallBtn} onClick={() => startAction("application")}>
            Apply
          </button>
          <button style={smallBtn} onClick={() => startAction("payment")}>
            Pay
          </button>
          <button style={smallBtn} onClick={() => startAction("help")}>
            Help
          </button>
        </div>
      </div>

      <div style={messagesWrap}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            {msg.type !== "options" && (
              <div style={msg.type === "user" ? userMsg : aiMsg}>{msg.text}</div>
            )}

            {msg.type === "options" && (
              <div style={choicesWrap}>
                {msg.options.map((opt, idx) => (
                  <button
                    key={idx}
                    style={choiceBtn}
                    onClick={() => handleOption(opt)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={inputWrap}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type here..."
          style={input}
        />
      </div>
    </div>
  );
}

const page = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  background: "#f8fafc",
};

const topSection = {
  padding: "14px 14px 10px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
};

const title = {
  margin: "0 0 12px",
  fontSize: 22,
  color: "#0f172a",
};

const roleCards = {
  display: "flex",
  gap: 10,
};

const card = {
  flex: 1,
  padding: 16,
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  background: "#f8fafc",
  textAlign: "center",
  cursor: "pointer",
};

const emoji = {
  fontSize: 28,
  marginBottom: 6,
};

const cardTitle = {
  fontSize: 15,
  fontWeight: 700,
  color: "#0f172a",
};

const cardSub = {
  fontSize: 12,
  color: "#64748b",
  marginTop: 4,
};

const quickActions = {
  display: "flex",
  gap: 8,
  marginTop: 10,
};

const smallBtn = {
  flex: 1,
  padding: "10px 8px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#f8fafc",
  fontSize: 13,
  cursor: "pointer",
};

const messagesWrap = {
  flex: 1,
  overflowY: "auto",
  padding: 10,
};

const aiMsg = {
  background: "#ffffff",
  color: "#0f172a",
  padding: 10,
  borderRadius: 14,
  border: "1px solid #e5e7eb",
  maxWidth: "82%",
  lineHeight: 1.4,
};

const userMsg = {
  background: "#2563eb",
  color: "#ffffff",
  padding: 10,
  borderRadius: 14,
  maxWidth: "82%",
  marginLeft: "auto",
  lineHeight: 1.4,
};

const choicesWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
};

const choiceBtn = {
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid #dbe4ee",
  background: "#ffffff",
  color: "#0f172a",
  cursor: "pointer",
  fontSize: 13,
};

const inputWrap = {
  padding: 10,
  borderTop: "1px solid #e5e7eb",
  background: "#ffffff",
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: 14,
};
