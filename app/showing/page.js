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

const styles = sharedStyles();
