"use client";

import { useState } from "react";

export default function ApplyPage() {
  const [form, setForm] = useState({
    fullName: "",
    moveInDate: "",
    monthlyIncome: "",
    occupants: "",
    pets: "",
    creditRange: "",
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
            <div style={styles.eyebrow}>RUNP8 / APPLY</div>
            <h1 style={styles.title}>Rental application</h1>
            <p style={styles.sub}>Complete the basic prescreen before background check and review.</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={styles.card}>
            <label style={styles.label}>Full name</label>
            <input name="fullName" value={form.fullName} onChange={updateField} style={styles.input} placeholder="Your full name" />

            <label style={styles.label}>Desired move-in date</label>
            <input name="moveInDate" value={form.moveInDate} onChange={updateField} style={styles.input} placeholder="April 15, 2026" />

            <label style={styles.label}>Monthly income</label>
            <input name="monthlyIncome" value={form.monthlyIncome} onChange={updateField} style={styles.input} placeholder="$4,500" />

            <label style={styles.label}>Number of occupants</label>
            <input name="occupants" value={form.occupants} onChange={updateField} style={styles.input} placeholder="2" />

            <label style={styles.label}>Pets</label>
            <input name="pets" value={form.pets} onChange={updateField} style={styles.input} placeholder="No / Yes, one cat" />

            <label style={styles.label}>Estimated credit range</label>
            <input name="creditRange" value={form.creditRange} onChange={updateField} style={styles.input} placeholder="650-700 or skip" />

            <button type="submit" style={styles.primaryBtn}>Submit application</button>
          </form>
        ) : (
          <div style={styles.card}>
            <h2 style={styles.successTitle}>Application submitted</h2>
            <p style={styles.text}>Next step: background check and operator review.</p>

            <div style={styles.summary}>
              <div><strong>Name:</strong> {form.fullName}</div>
              <div><strong>Move-in date:</strong> {form.moveInDate}</div>
              <div><strong>Income:</strong> {form.monthlyIncome}</div>
              <div><strong>Occupants:</strong> {form.occupants}</div>
              <div><strong>Pets:</strong> {form.pets}</div>
              <div><strong>Credit:</strong> {form.creditRange}</div>
            </div>

            <div style={styles.noticeBox}>
              Background check link and approval decision can connect here later.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = sharedStyles();
