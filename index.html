"use client";
import { useState, useRef, useEffect } from "react";

export default function HouseholdPage() {
  const [messages, setMessages] = useState([
    { type: "ai", text: "What do you need?" }
  ]);

  const [flow, setFlow] = useState(null);
  const [step, setStep] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (text, type = "ai") => {
    setMessages(prev => [...prev.slice(-20), { type, text }]);
  };

  const addOptions = (options) => {
    setMessages(prev => [...prev.slice(-20), { type: "options", options }]);
  };

  const resetToMain = () => {
    setFlow(null);
    setStep(null);
    addMessage("What do you need?");
  };

  // ===== START ACTION =====
  const startAction = (type) => {
    addMessage(
      type === "list"
        ? "List property"
        : type === "rental"
        ? "Find rental"
        : type === "payment"
        ? "Pay rent"
        : type,
      "user"
    );

    if (type === "list") {
      setFlow("listing");
      setStep("type");

      addMessage("Property type?");
      addOptions([
        { label: "House" },
        { label: "Apartment" },
        { label: "Studio" },
        { label: "Room" },
        { label: "Back" }
      ]);
    }

    if (type === "rental") {
      addMessage("Start with?");
      addOptions([
        { label: "Location" },
        { label: "Budget" },
        { label: "Move-in" },
        { label: "Bedrooms" },
        { label: "Back" }
      ]);
    }

    if (type === "payment") {
      setFlow("payment");
      setStep("method");

      addMessage("Payment method?");
      addOptions([
        { label: "Credit card" },
        { label: "Debit card" },
        { label: "Bank transfer" },
        { label: "Back" }
      ]);
    }
  };

  // ===== HANDLE OPTION =====
  const handleOption = (option) => {
    if (option.label === "Back") {
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
          { label: "Back" }
        ]);
      } else if (step === "bedrooms") {
        setStep("rent");
        addMessage("Rent range?");
        addOptions([
          { label: "$1k–$2k" },
          { label: "$2k–$3k" },
          { label: "$3k+" },
          { label: "Back" }
        ]);
      } else if (step === "rent") {
        setFlow(null);
        addMessage("Listing ready.");
        addOptions([
          { label: "Add photos" },
          { label: "Finish later" },
          { label: "Back" }
        ]);
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
          { label: "Back" }
        ]);
      } else if (step === "invoice") {
        if (option.label === "Yes") {
          setStep("delivery");
          addMessage("Send via?");
          addOptions([
            { label: "Email" },
            { label: "Text" },
            { label: "Back" }
          ]);
        } else {
          setFlow(null);
          addMessage("Done.");
        }
      } else if (step === "delivery") {
        setFlow(null);
        addMessage("Enter contact.");
      }
    }
  };

  // ===== INPUT =====
  const sendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, "user");
    setInputValue("");

    addMessage("Choose an option or continue.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

      {/* TOP ACTIONS */}
      <div style={{ padding: 14 }}>
        <h2>What do you need?</h2>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={card} onClick={() => startAction("list")}>
            🏠<div>List</div>
          </div>

          <div style={card} onClick={() => startAction("rental")}>
            🧳<div>Rent</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button style={btn} onClick={() => startAction("payment")}>Pay</button>
          <button style={btn}>Repairs</button>
        </div>
      </div>

      {/* CHAT */}
      <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type !== "options" && (
              <div style={msg.type === "user" ? userMsg : aiMsg}>
                {msg.text}
              </div>
            )}

            {msg.type === "options" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {msg.options.map((opt, idx) => (
                  <button key={idx} style={choice} onClick={() => handleOption(opt)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div style={inputWrap}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type..."
          style={input}
        />
      </div>
    </div>
  );
}

/* STYLES */
const card = {
  flex: 1,
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: 12,
  textAlign: "center",
  cursor: "pointer"
};

const btn = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#f5f5f5"
};

const aiMsg = {
  background: "#f1f5f9",
  padding: 10,
  borderRadius: 12,
  marginBottom: 6,
  maxWidth: "80%"
};

const userMsg = {
  background: "#2563eb",
  color: "white",
  padding: 10,
  borderRadius: 12,
  marginBottom: 6,
  alignSelf: "flex-end",
  maxWidth: "80%"
};

const choice = {
  padding: "8px 12px",
  borderRadius: 20,
  border: "1px solid #ddd",
  background: "#f8fafc"
};

const inputWrap = {
  borderTop: "1px solid #ddd",
  padding: 10,
  background: "white"
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ddd"
};
