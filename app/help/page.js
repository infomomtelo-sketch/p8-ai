"use client";

import { useState } from "react";

export default function HelpPage() {
  const [form, setForm] = useState({
    issueType: "Repair",
    property: "",
    fullName: "",
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function updateField(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.top}>
          <div>
            <div style={styles.eyebrow}>RUNP8 / HELP</div>
            <h1 style={styles.title}>Support and maintenance</h1>
            <p style={styles.sub}>Use this for repairs, move-in help, move-out help, and general support.</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={styles.card}>
            <label style={styles.label}>Issue type</label>
            <select name="issueType" value={form.issueType} onChange={updateField} style={styles.input}>
              <option>Repair</option>
              <option>Move-in help</option>
              <option>Move-out help</option>
              <option>General support</option>
            </select>

            <label style={styles.label}>Property / unit</label>
            <input name="property" value={form.property} onChange={updateField} style={styles.input} placeholder="Room 101 / Unit B / Address" />

            <label style={styles.label}>Full name</label>
            <input name="fullName" value={form.fullName} onChange={updateField} style={styles.input} placeholder="Your full name" />

            <label style={styles.label}>Details</label>
            <textarea name="details" value={form.details} onChange={updateField} style={styles.textarea} placeholder="Describe the issue clearly..." />

            <button type="submit" style={styles.primaryBtn}>Submit help request</button>
          </form>
        ) : (
          <div style={styles.card}>
            <h2 style={styles.successTitle}>Help request submitted</h2>
            <p style={styles.text}>This request can now route to your cabinet for review and action.</p>
            <div style={styles.summary}>
              <div><strong>Type:</strong> {form.issueType}</div>
              <div><strong>Property:</strong> {form.property}</div>
              <div><strong>Name:</strong> {form.fullName}</div>
              <div><strong>Details:</strong> {form.details}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = sharedStyles();
function sharedStyles() {
  return {
    page: {
      minHeight: "100vh",
      background: "#0b1120",
      color: "#fff",
      padding: "28px 18px",
    },
    wrap: {
      maxWidth: "760px",
      margin: "0 auto",
    },
    top: {
      marginBottom: "20px",
    },
    eyebrow: {
      color: "#93c5fd",
      fontWeight: 700,
      fontSize: "12px",
      letterSpacing: "0.14em",
      marginBottom: "8px",
    },
    title: {
      margin: "0 0 10px",
      fontSize: "38px",
      lineHeight: 1.08,
    },
    sub: {
      color: "#cbd5e1",
      margin: 0,
      fontSize: "16px",
    },
    card: {
      background: "#111827",
      border: "1px solid #1f2937",
      borderRadius: "20px",
      padding: "22px",
      boxShadow: "0 14px 30px rgba(0,0,0,0.22)",
    },
    label: {
      display: "block",
      marginTop: "14px",
      marginBottom: "8px",
      color: "#dbeafe",
      fontWeight: 600,
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "14px",
      border: "1px solid #334155",
      background: "#0f172a",
      color: "#fff",
      outline: "none",
      fontSize: "15px",
    },
    textarea: {
      width: "100%",
      minHeight: "140px",
      padding: "14px 16px",
      borderRadius: "14px",
      border: "1px solid #334155",
      background: "#0f172a",
      color: "#fff",
      outline: "none",
      fontSize: "15px",
      resize: "vertical",
    },
    primaryBtn: {
      width: "100%",
      marginTop: "18px",
      padding: "14px 18px",
      borderRadius: "14px",
      border: "none",
      background: "#2563eb",
      color: "#fff",
      fontWeight: 800,
      cursor: "pointer",
      fontSize: "15px",
    },
    successTitle: {
      marginTop: 0,
      marginBottom: "10px",
      fontSize: "28px",
    },
    text: {
      color: "#cbd5e1",
      lineHeight: 1.6,
    },
    summary: {
      marginTop: "16px",
      display: "grid",
      gap: "10px",
      background: "#0f172a",
      border: "1px solid #1f2937",
      borderRadius: "16px",
      padding: "16px",
      color: "#e5e7eb",
    },
    noticeBox: {
      marginTop: "16px",
      padding: "14px 16px",
      borderRadius: "14px",
      background: "#172036",
      color: "#dbeafe",
      border: "1px solid #23304a",
    },
  };
}
