"use client";

import { useState } from "react";

export default function ShowingPage() {
  const [form, setForm] = useState({
    property: "",
    moveInDate: "",
    fullName: "",
    phone: "",
    email: "",
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
            <div style={styles.eyebrow}>RUNP8 / SHOWING</div>
            <h1 style={styles.title}>Schedule a showing</h1>
            <p style={styles.sub}>Start here and we’ll guide the request into the next approval step.</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={styles.card}>
            <label style={styles.label}>Property</label>
            <input name="property" value={form.property} onChange={updateField} style={styles.input} placeholder="123 Main St / Room A / Studio" />

            <label style={styles.label}>Desired move-in date</label>
            <input name="moveInDate" value={form.moveInDate} onChange={updateField} style={styles.input} placeholder="April 15, 2026" />

            <label style={styles.label}>Full name</label>
            <input name="fullName" value={form.fullName} onChange={updateField} style={styles.input} placeholder="Your full name" />

            <label style={styles.label}>Phone</label>
            <input name="phone" value={form.phone} onChange={updateField} style={styles.input} placeholder="(555) 555-5555" />

            <label style={styles.label}>Email</label>
            <input name="email" value={form.email} onChange={updateField} style={styles.input} placeholder="you@example.com" />

            <button type="submit" style={styles.primaryBtn}>Submit showing request</button>
          </form>
        ) : (
          <div style={styles.card}>
            <h2 style={styles.successTitle}>Showing request received</h2>
            <p style={styles.text}>Next step: review and approval before scheduling is confirmed.</p>
            <div style={styles.summary}>
              <div><strong>Property:</strong> {form.property}</div>
              <div><strong>Move-in date:</strong> {form.moveInDate}</div>
              <div><strong>Name:</strong> {form.fullName}</div>
              <div><strong>Phone:</strong> {form.phone}</div>
              <div><strong>Email:</strong> {form.email}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

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
const styles = sharedStyles();
