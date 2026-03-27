"use client";

import { useEffect, useRef, useState } from "react";

export default function HouseholdPage() {
  const [messages, setMessages] = useState([]);
  const [flow, setFlow] = useState("entry");
  const [form, setForm] = useState({
    moveInDate: "",
    monthlyIncome: "",
    occupants: "",
    pets: "",
    creditRange: "",
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    startFlow();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function startFlow() {
    setFlow("entry");
    setForm({
      moveInDate: "",
      monthlyIncome: "",
      occupants: "",
      pets: "",
      creditRange: "",
    });

    setMessages([
      {
        type: "ai",
        text:
          "Welcome to RunP8. I’ll guide you through the rental process step by step.",
      },
      {
        type: "ai",
        text:
          "To move forward, I’ll guide you through a quick approval process. This helps protect all tenants and keeps the process organized.",
      },
      {
        type: "ai",
        text: "What would you like to do?",
        options: [
          { label: "Start Approval", action: "start_approval" },
          { label: "Ask a Question First", action: "ask_question" },
        ],
      },
    ]);
  }

  function addMessage(type, text, options = null) {
    setMessages((prev) => [...prev, { type, text, options }]);
  }

  function handleOption(action) {
    switch (action) {
      case "start_approval":
        setFlow("prescreen_move_in");
        addMessage("user", "Start Approval");
        addMessage("ai", "Let’s begin.");
        addMessage("ai", "What is your desired move-in date?");
        break;

      case "ask_question":
        addMessage("user", "Ask a Question First");
        addMessage(
          "ai",
          "I can help with basic property questions, but approval is required before scheduling a showing or moving forward with lease steps."
        );
        addMessage("ai", "What would you like to do next?", [
          { label: "Start Approval", action: "start_approval" },
          { label: "Restart", action: "restart_flow" },
        ]);
        break;

      case "submit_background":
        setFlow("background_pending");
        addMessage("user", "Continue to Background Check");
        addMessage(
          "ai",
          "To continue, please complete a quick background check."
        );
        addMessage(
          "ai",
          "Once completed, your application can move to review."
        );
        addMessage("ai", "Choose the next step:", [
          { label: "Mark as Background Check Completed", action: "mark_bg_done" },
          { label: "Restart", action: "restart_flow" },
        ]);
        break;

      case "mark_bg_done":
        setFlow("approved");
        addMessage("user", "Background Check Completed");
        addMessage("ai", "You’re approved ✅");
        addMessage("ai", "Here are your next steps:", [
          { label: "Schedule Showing", action: "schedule_showing" },
          { label: "Move In Now", action: "move_in_now" },
          { label: "P8 Helpers", action: "p8_helpers" },
        ]);
        break;

      case "schedule_showing":
        addMessage("user", "Schedule Showing");
        addMessage(
          "ai",
          "Available showing days: Friday, Saturday, and Sunday."
        );
        addMessage("ai", "Please choose a time window:", [
          { label: "Friday - 10:00 AM", action: "showing_selected" },
          { label: "Saturday - 1:00 PM", action: "showing_selected" },
          { label: "Sunday - 3:00 PM", action: "showing_selected" },
        ]);
        break;

      case "showing_selected":
        addMessage("user", "Selected a showing time");
        addMessage(
          "ai",
          "Your showing request has been recorded. Next, we can continue with move-in steps whenever you’re ready."
        );
        addMessage("ai", "Choose the next step:", [
          { label: "Move In Now", action: "move_in_now" },
          { label: "P8 Helpers", action: "p8_helpers" },
          { label: "Restart", action: "restart_flow" },
        ]);
        break;

      case "move_in_now":
        addMessage("user", "Move In Now");
        addMessage(
          "ai",
          "To move in, the next steps are: payment, lease review, and contract signing."
        );
        addMessage("ai", "Choose what you want to do next:", [
          { label: "Payment", action: "payment_step" },
          { label: "Review Contract", action: "contract_step" },
          { label: "Restart", action: "restart_flow" },
        ]);
        break;

      case "payment_step":
        addMessage("user", "Payment");
        addMessage(
          "ai",
          "Payment step will connect to your deposit and move-in payment page later."
        );
        addMessage("ai", "Choose the next step:", [
          { label: "Review Contract", action: "contract_step" },
          { label: "P8 Helpers", action: "p8_helpers" },
          { label: "Restart", action: "restart_flow" },
        ]);
        break;

      case "contract_step":
        addMessage("user", "Review Contract");
        addMessage(
          "ai",
          "Contract review step will connect to your lease agreement page later."
        );
        addMessage("ai", "Choose the next step:", [
          { label: "Payment", action: "payment_step" },
          { label: "P8 Helpers", action: "p8_helpers" },
          { label: "Restart", action: "restart_flow" },
        ]);
        break;

      case "p8_helpers":
        addMessage("user", "P8 Helpers");
        addMessage(
          "ai",
          "P8 Helpers can assist with move-in help, repairs, utility setup, and support services."
        );
        addMessage("ai", "Choose the next step:", [
          { label: "Move In Now", action: "move_in_now" },
          { label: "Schedule Showing", action: "schedule_showing" },
          { label: "Restart", action: "restart_flow" },
        ]);
        break;

      case "restart_flow":
        startFlow();
        break;

      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const value = e.target.answer.value.trim();
    if (!value) return;

    addMessage("user", value);
    e.target.reset();

    if (flow === "prescreen_move_in") {
      setForm((prev) => ({ ...prev, moveInDate: value }));
      setFlow("prescreen_income");
      addMessage("ai", "What is your monthly income?");
      return;
    }

    if (flow === "prescreen_income") {
      setForm((prev) => ({ ...prev, monthlyIncome: value }));
      setFlow("prescreen_occupants");
      addMessage("ai", "How many occupants will live in the property?");
      return;
    }

    if (flow === "prescreen_occupants") {
      setForm((prev) => ({ ...prev, occupants: value }));
      setFlow("prescreen_pets");
      addMessage("ai", "Do you have pets? Please answer yes or no.");
      return;
    }

    if (flow === "prescreen_pets") {
      setForm((prev) => ({ ...prev, pets: value }));
      setFlow("prescreen_credit");
      addMessage(
        "ai",
        "What is your estimated credit range? Example: 650-700. You may also type skip."
      );
      return;
    }

    if (flow === "prescreen_credit") {
      const updatedForm = { ...form, creditRange: value };
      setForm(updatedForm);
      setFlow("prescreen_complete");

      addMessage("ai", "Thank you. Here is your prescreen summary:");
      addMessage(
        "ai",
        `Move-in date: ${updatedForm.moveInDate}
Monthly income: ${updatedForm.monthlyIncome}
Occupants: ${updatedForm.occupants}
Pets: ${updatedForm.pets}
Credit range: ${updatedForm.creditRange}`
      );

      addMessage(
        "ai",
        "The next step is background check and application review."
      );
      addMessage("ai", "Choose the next step:", [
        { label: "Continue to Background Check", action: "submit_background" },
        { label: "Restart", action: "restart_flow" },
      ]);
      return;
    }

    addMessage(
      "ai",
      "Please use the available buttons so the system stays organized."
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <div>
            <div style={styles.eyebrow}>RUNP8</div>
            <h1 style={styles.title}>Rental Z-Flow</h1>
            <p style={styles.subtitle}>
              Guided approval, showing, move-in, and support flow.
            </p>
          </div>
          <button style={styles.restartBtn} onClick={() => handleOption("restart_flow")}>
            Restart
          </button>
        </div>

        <div style={styles.chatCard}>
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.bubble,
                    ...(msg.type === "user" ? styles.userBubble : styles.aiBubble),
                  }}
                >
                  <div style={styles.messageText}>
                    {msg.text.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>

                  {msg.options && (
                    <div style={styles.optionsWrap}>
                      {msg.options.map((option, i) => (
                        <button
                          key={i}
                          style={styles.optionBtn}
                          onClick={() => handleOption(option.action)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} style={styles.inputBar}>
            <input
              name="answer"
              placeholder="Type here when the system asks for an answer..."
              style={styles.input}
              autoComplete="off"
            />
            <button type="submit" style={styles.sendBtn}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1120",
    color: "#ffffff",
    padding: "24px 16px",
  },
  shell: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  eyebrow: {
    fontSize: "12px",
    letterSpacing: "0.14em",
    color: "#93c5fd",
    marginBottom: "8px",
    fontWeight: 700,
  },
  title: {
    margin: 0,
    fontSize: "34px",
    lineHeight: 1.1,
  },
  subtitle: {
    marginTop: "8px",
    marginBottom: 0,
    color: "#cbd5e1",
    fontSize: "15px",
  },
  restartBtn: {
    background: "#1e293b",
    color: "#fff",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "12px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
  chatCard: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  },
  messages: {
    padding: "18px",
    minHeight: "65vh",
    maxHeight: "70vh",
    overflowY: "auto",
  },
  messageRow: {
    display: "flex",
    marginBottom: "14px",
  },
  bubble: {
    maxWidth: "80%",
    padding: "14px 16px",
    borderRadius: "18px",
    lineHeight: 1.5,
    fontSize: "15px",
    whiteSpace: "pre-wrap",
  },
  aiBubble: {
    background: "#1e293b",
    color: "#f8fafc",
    borderTopLeftRadius: "8px",
  },
  userBubble: {
    background: "#2563eb",
    color: "#ffffff",
    borderTopRightRadius: "8px",
  },
  messageText: {
    marginBottom: "4px",
  },
  optionsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "12px",
  },
  optionBtn: {
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600,
  },
  inputBar: {
    borderTop: "1px solid #1f2937",
    padding: "14px",
    display: "flex",
    gap: "10px",
    background: "#0f172a",
  },
  input: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #334155",
    background: "#111827",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
  },
  sendBtn: {
    padding: "14px 18px",
    borderRadius: "14px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
