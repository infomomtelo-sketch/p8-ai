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
