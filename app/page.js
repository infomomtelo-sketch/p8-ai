import Link from "next/link";

const actions = [
  { title: "Find a place", href: "/showing", desc: "Browse the next step and schedule interest fast." },
  { title: "Schedule showing", href: "/showing", desc: "Request a showing in a few simple steps." },
  { title: "Apply", href: "/apply", desc: "Complete the rental application flow." },
  { title: "Pay rent", href: "/pay", desc: "Rent, deposit, and fee payment entry." },
  { title: "Get help", href: "/help", desc: "Repairs, move-in help, and support requests." },
];

export default function HomePage() {
  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <header style={styles.hero}>
          <div style={styles.badge}>RUNP8</div>
          <h1 style={styles.h1}>Rental management that moves people forward</h1>
          <p style={styles.sub}>
            Choose what you need and continue with a clear step-by-step flow.
          </p>
        </header>

        <section style={styles.grid}>
          {actions.map((item) => (
            <Link key={item.href} href={item.href} style={styles.card}>
              <div style={styles.cardTitle}>{item.title}</div>
              <div style={styles.cardDesc}>{item.desc}</div>
              <div style={styles.cardLink}>Open</div>
            </Link>
          ))}
        </section>

        <section style={styles.footerBox}>
          <div style={styles.footerTitle}>For operators</div>
          <p style={styles.footerText}>
            Internal review, suggested replies, screening, and workflow control live in the cabinet.
          </p>
          <Link href="/cabinet" style={styles.secondaryBtn}>
            Open Cabinet
          </Link>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1120",
    color: "#fff",
    padding: "32px 18px",
  },
  wrap: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  hero: {
    marginBottom: "28px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#172036",
    color: "#93c5fd",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    marginBottom: "14px",
  },
  h1: {
    fontSize: "42px",
    lineHeight: 1.08,
    margin: "0 0 12px",
    maxWidth: "760px",
  },
  sub: {
    color: "#cbd5e1",
    fontSize: "17px",
    margin: 0,
    maxWidth: "700px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  card: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "20px",
    padding: "20px",
    textDecoration: "none",
    color: "#fff",
    display: "block",
    boxShadow: "0 14px 30px rgba(0,0,0,0.22)",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "10px",
  },
  cardDesc: {
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: 1.5,
    minHeight: "42px",
  },
  cardLink: {
    marginTop: "16px",
    color: "#93c5fd",
    fontWeight: 700,
  },
  footerBox: {
    marginTop: "26px",
    padding: "22px",
    background: "#0f172a",
    border: "1px solid #1f2937",
    borderRadius: "20px",
  },
  footerTitle: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "8px",
  },
  footerText: {
    color: "#cbd5e1",
    marginTop: 0,
    marginBottom: "14px",
  },
  secondaryBtn: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "#1d4ed8",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
  },
};
