const inboxItems = [
  {
    type: "Showing request",
    name: "John Doe",
    details: "Move-in date: April 15, 2026 | Property: Studio 101",
    suggestion:
      "Suggested reply: Thanks for your interest. Please complete quick approval so we can confirm available showing times Friday through Sunday.",
    status: "Needs review",
  },
  {
    type: "Application",
    name: "Maria Santos",
    details: "Income: $5,200 | Occupants: 2 | Pets: No",
    suggestion:
      "Suggested action: Move to background check and review supporting documents before final approval.",
    status: "Prescreen passed",
  },
  {
    type: "Support request",
    name: "Chris Ledger",
    details: "Issue: Repair | Unit: Room 1A | Report: Sink leak",
    suggestion:
      "Suggested action: Mark as maintenance, confirm urgency, and assign repair follow-up.",
    status: "Open",
  },
];

export default function CabinetPage() {
  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <header style={styles.top}>
          <div>
            <div style={styles.eyebrow}>RUNP8 / CABINET</div>
            <h1 style={styles.title}>Operator inbox</h1>
            <p style={styles.sub}>
              Internal review for inquiries, applications, showings, support, and suggested next actions.
            </p>
          </div>
        </header>

        <section style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>12</div>
            <div style={styles.statLabel}>Open items</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>5</div>
            <div style={styles.statLabel}>Pending review</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>3</div>
            <div style={styles.statLabel}>Showing requests</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>4</div>
            <div style={styles.statLabel}>Support requests</div>
          </div>
        </section>

        <section style={styles.listWrap}>
          {inboxItems.map((item, index) => (
            <div key={index} style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <div>
                  <div style={styles.itemType}>{item.type}</div>
                  <div style={styles.itemName}>{item.name}</div>
                </div>
                <div style={styles.status}>{item.status}</div>
              </div>

              <div style={styles.itemDetails}>{item.details}</div>

              <div style={styles.suggestionBox}>
                <div style={styles.suggestionTitle}>P8 suggestion</div>
                <div style={styles.suggestionText}>{item.suggestion}</div>
              </div>

              <div style={styles.rowBtns}>
                <button style={styles.primaryBtn}>Approve / Continue</button>
                <button style={styles.secondaryBtn}>Edit Reply</button>
                <button style={styles.ghostBtn}>Archive</button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#08111f",
    color: "#fff",
    padding: "28px 18px",
  },
  wrap: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  top: {
    marginBottom: "24px",
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
    fontSize: "40px",
    lineHeight: 1.08,
  },
  sub: {
    color: "#cbd5e1",
    fontSize: "16px",
    margin: 0,
    maxWidth: "800px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "22px",
  },
  statCard: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "18px",
    padding: "18px",
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: 800,
  },
  statLabel: {
    color: "#cbd5e1",
    marginTop: "6px",
  },
  listWrap: {
    display: "grid",
    gap: "16px",
  },
  itemCard: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "20px",
    padding: "20px",
  },
  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemType: {
    color: "#93c5fd",
    fontSize: "13px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  itemName: {
    fontSize: "22px",
    fontWeight: 700,
  },
  status: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#172036",
    color: "#bfdbfe",
    fontWeight: 700,
    fontSize: "13px",
  },
  itemDetails: {
    marginTop: "14px",
    color: "#dbeafe",
  },
  suggestionBox: {
    marginTop: "16px",
    background: "#0f172a",
    border: "1px solid #23304a",
    borderRadius: "16px",
    padding: "16px",
  },
  suggestionTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#93c5fd",
    marginBottom: "8px",
  },
  suggestionText: {
    color: "#e5e7eb",
    lineHeight: 1.55,
  },
  rowBtns: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "16px",
  },
  primaryBtn: {
    border: "none",
    background: "#2563eb",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
  },
  ghostBtn: {
    border: "1px solid #334155",
    background: "transparent",
    color: "#cbd5e1",
    padding: "12px 16px",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
};
