"use client";

import { useState } from "react";

export default function PayPage() {
  const [form, setForm] = useState({
    paymentType: "Rent",
    amount: "",
    unit: "",
    fullName: "",
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
            <div style={styles.eyebrow}>RUNP8 / PAY</div>
            <h1 style={styles.title}>Payments</h1>
            <p style={styles.sub}>Use this page for rent, deposit, and fees.</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={styles.card}>
            <label style={styles.label}>Payment type</label>
            <select name="paymentType" value={form.paymentType} onChange={updateField} style={styles.input}>
              <option>Rent</option>
              <option>Deposit</option>
              <option>Fee</option>
            </select>

            <label style={styles.label}>Amount</label>
            <input name="amount" value={form.amount} onChange={updateField} style={styles.input} placeholder="$1,200" />

            <label style={styles.label}>Unit / Property</label>
            <input name="unit" value={form.unit} onChange={updateField} style={styles.input} placeholder="Room 1A / Studio 101" />

            <label style={styles.label}>Full name</label>
            <input name="fullName" value={form.fullName} onChange={updateField} style={styles.input} placeholder="Your full name" />

            <button type="submit" style={styles.primaryBtn}>Continue payment</button>
          </form>
        ) : (
          <div style={styles.card}>
            <h2 style={styles.successTitle}>Payment request prepared</h2>
            <p style={styles.text}>Connect this next to your real payment processor or bank flow.</p>
            <div style={styles.summary}>
              <div><strong>Type:</strong> {form.paymentType}</div>
              <div><strong>Amount:</strong> {form.amount}</div>
              <div><strong>Unit:</strong> {form.unit}</div>
              <div><strong>Name:</strong> {form.fullName}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = sharedStyles();
