import { useState, useEffect, useRef } from "react";

/* ─── PALETTE (pulled from logo) ─────────────────────────────────── */
const NAVY  = "#131D36";
const NAVY2 = "#1B2B4A";
const NAVY3 = "#101828";
const DARK  = "#0E1623";
const TEAL  = "#2D8F8F";
const WHITE = "#F4F7FA";
const GREY  = "#8995AA";

/* ─── DATA ───────────────────────────────────────────────────────── */
const SERVICES = [
  { n: "01", title: "Brand Strategy & Positioning",  desc: "Build a brand that stands for something. We craft clear, compelling positioning that distinguishes you and resonates deeply with the right audience." },
  { n: "02", title: "Customer Research & Alignment", desc: "Deep-dive insights that connect your marketing to real customer needs, behaviors, and motivations — so every message lands." },
  { n: "03", title: "Social Media",                  desc: "Consistent, on-brand presence that builds community, drives engagement, and keeps your brand top of mind across every platform." },
  { n: "04", title: "Content Creation",              desc: "Compelling content that tells your story across every format — written, visual, and video — crafted to convert and resonate." },
  { n: "05", title: "Meta Ads",                      desc: "Performance-driven campaigns on Facebook and Instagram, built to scale and deliver measurable return on every dollar spent." },
  { n: "06", title: "Growth Strategy",               desc: "Data-informed roadmaps that identify your biggest levers and put a concrete, executable plan behind each one." },
  { n: "07", title: "Full Stack Marketing",          desc: "End-to-end marketing ownership — strategy through execution — so you can focus on running your business while we navigate your growth." },
];

const WORK = [
  { cat: "Brand Identity",  client: "Restaurant Group",  desc: "Repositioned a multi-unit restaurant group around a distinct culinary identity, driving regional recognition and earned media coverage.", stat: "+240%", label: "Brand Recognition" },
  { cat: "Paid Media",      client: "E-Commerce Brand",  desc: "Built and scaled Meta ad campaigns from zero, establishing consistent ROAS and profitable acquisition channels within 60 days.",         stat: "3.2×",  label: "Return on Ad Spend" },
  { cat: "Social Strategy", client: "Boutique Hotel",    desc: "Developed a content and community strategy that transformed dormant social channels into a primary booking driver.",                     stat: "+180%", label: "Organic Reach" },
];

/* ─── COMPASS SVG (matches logo palette) ────────────────────────── */
function Compass({ size = 100, dim = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ flexShrink: 0, opacity: dim ? 1 : 1 }}>
      <circle cx="100" cy="100" r="91" fill="none" stroke={TEAL} strokeWidth="1.5" opacity="0.35" />
      <circle cx="100" cy="100" r="80" fill={NAVY2} stroke={TEAL} strokeWidth="0.8" opacity="0.55" />
      {/* N */}<polygon points="100,22 107,96 100,89 93,96" fill={WHITE} />
      {/* S */}<polygon points="100,178 107,104 100,111 93,104" fill={GREY} />
      {/* E */}<polygon points="178,100 104,93 111,100 104,107" fill={WHITE} />
      {/* W */}<polygon points="22,100 96,93 89,100 96,107" fill={GREY} />
      {/* NE */}<polygon points="163,37 108,92 104,84 112,84" fill={TEAL} opacity="0.9" />
      {/* NW */}<polygon points="37,37 92,92 84,88 88,80" fill={TEAL} opacity="0.65" />
      {/* SE */}<polygon points="163,163 108,108 112,116 104,116" fill={TEAL} opacity="0.65" />
      {/* SW */}<polygon points="37,163 92,108 84,112 88,120" fill={TEAL} opacity="0.9" />
      <circle cx="100" cy="100" r="9" fill={TEAL} />
      <circle cx="100" cy="100" r="4" fill={WHITE} />
      <text x="100" y="9"   textAnchor="middle" fill={WHITE} fontSize="11" fontFamily="serif" fontWeight="500">N</text>
      <text x="100" y="197" textAnchor="middle" fill={GREY}  fontSize="11" fontFamily="serif" fontWeight="500">S</text>
      <text x="196" y="104" textAnchor="middle" fill={WHITE} fontSize="11" fontFamily="serif" fontWeight="500">E</text>
      <text x="4"   y="104" textAnchor="middle" fill={GREY}  fontSize="11" fontFamily="serif" fontWeight="500">W</text>
    </svg>
  );
}

/* ─── FADE-IN ON SCROLL ──────────────────────────────────────────── */
function useFade(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, vis };
}

/* ─── CONTACT FORM (Netlify-compatible) ──────────────────────────── */
function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", company: "", message: "" });
  const [st, setSt] = useState("idle"); // idle | sending | sent | err
  const ch = e => setF(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!f.name || !f.email || !f.message) return;
    setSt("sending");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", ...f }).toString(),
      });
      setSt("sent");
      setF({ name: "", email: "", company: "", message: "" });
    } catch { setSt("err"); }
  };

  const inp = {
    background: "rgba(244,247,250,0.04)", border: "1px solid rgba(244,247,250,0.12)",
    borderRadius: "2px", color: WHITE, fontFamily: "'Raleway',sans-serif",
    fontWeight: 300, fontSize: "14px", letterSpacing: "0.4px",
    padding: "14px 18px", outline: "none", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <input name="name"  placeholder="Your Name"     value={f.name}    onChange={ch} style={inp} />
        <input name="email" placeholder="Email Address" value={f.email}   onChange={ch} style={inp} type="email" />
      </div>
      <input name="company" placeholder="Company (optional)" value={f.company} onChange={ch} style={inp} />
      <textarea name="message" placeholder="Tell us about your project…" rows={5} value={f.message} onChange={ch} style={{ ...inp, resize: "vertical" }} />
      <button
        onClick={submit}
        disabled={st === "sending" || st === "sent"}
        style={{
          alignSelf: "flex-start", background: "transparent",
          border: `1px solid ${TEAL}`, borderRadius: "2px", color: TEAL,
          cursor: st === "sent" ? "default" : "pointer",
          fontFamily: "'Raleway',sans-serif", fontWeight: 400,
          fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
          padding: "15px 32px", transition: "all 0.3s",
        }}
        className="btn-teal"
      >
        {st === "sending" ? "Sending…" : st === "sent" ? "✓  Sent — We'll be in touch" : "Send Message"}
      </button>
      {st === "err" && <p style={{ color: "#E07070", fontSize: "13px", fontFamily: "'Raleway',sans-serif", fontWeight: 300 }}>Something went wrong — please try again.</p>}
    </div>
  );
}

/* ─── GLOBAL CSS ─────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@200;300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: ${NAVY}; color: ${WHITE}; font-family: 'Raleway', sans-serif; -webkit-font-smoothing: antialiased; }

  @keyframes fadeUp  { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes rotateWm { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
  @keyframes linePulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }

  .fu { opacity: 0; transform: translateY(22px); transition: opacity .95s ease, transform .95s ease; }
  .fu.on { opacity: 1; transform: translateY(0); }

  /* Nav links */
  .nl { color: rgba(244,247,250,.5); text-decoration: none; font-family: 'Raleway',sans-serif; font-weight: 400; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; transition: color .3s; cursor: pointer; }
  .nl:hover { color: ${WHITE}; }

  /* Buttons */
  .btn-solid:hover  { background: ${TEAL} !important; color: ${NAVY} !important; }
  .btn-ghost:hover  { background: rgba(244,247,250,.06) !important; }
  .btn-teal:hover:not(:disabled) { background: rgba(45,143,143,.12) !important; }

  /* Cards */
  .svc-card:hover { background: rgba(45,143,143,.045) !important; border-color: rgba(45,143,143,.22) !important; }
  .work-card:hover .work-stat { color: ${TEAL} !important; }

  /* Form focus */
  input:focus, textarea:focus { border-color: rgba(45,143,143,.42) !important; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${TEAL}; border-radius: 2px; }

  /* Mobile */
  @media (max-width: 768px) {
    .hero-h { font-size: 50px !important; letter-spacing: 8px !important; }
    .sg { grid-template-columns: 1fr !important; }
    .wg { grid-template-columns: 1fr !important; }
    .cg { grid-template-columns: 1fr !important; gap: 48px !important; }
    .nd { display: none !important; }
    .nav-inner { padding: 18px 24px !important; }
    .sec { padding: 80px 24px !important; }
    footer { padding: 36px 24px !important; flex-direction: column; align-items: flex-start !important; gap: 20px !important; }
  }
`;

/* ─── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const f1 = useFade(0);
  const f2 = useFade(80);
  const f3 = useFade(0);
  const f4 = useFade(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const NAV = [["services", "Services"], ["work", "Work"], ["book", "Book a Call"], ["contact", "Contact"]];

  return (
    <>
      <style>{CSS}</style>

      {/* ──── NAVIGATION ──── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(11,16,28,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(244,247,250,.07)" : "none",
        transition: "all .45s ease",
      }}>
        <div className="nav-inner" style={{ padding: "22px 64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div onClick={() => go("hero")} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <Compass size={30} />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "15px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase" }}>Shore Haven</div>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "8px", fontWeight: 300, letterSpacing: "3.5px", color: GREY, textTransform: "uppercase", marginTop: "1px" }}>Media</div>
            </div>
          </div>
          {/* Desktop nav */}
          <div className="nd" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {NAV.map(([id, lbl]) => <span key={id} className="nl" onClick={() => go(id)}>{lbl}</span>)}
          </div>
        </div>
      </nav>

      {/* ──── HERO ──── */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "130px 40px 110px",
        position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse 90% 80% at 50% 38%, ${NAVY2} 0%, ${NAVY} 72%)`,
      }}>
        {/* Rotating watermark compass */}
        <div style={{ position: "absolute", top: "50%", left: "50%", animation: "rotateWm 90s linear infinite", pointerEvents: "none", opacity: 0.038 }}>
          <Compass size={700} />
        </div>
        {/* Subtle grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.022,
          background: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(244,247,250,.7) 79px,rgba(244,247,250,.7) 80px), repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(244,247,250,.7) 79px,rgba(244,247,250,.7) 80px)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ animation: "fadeUp 1.1s ease both" }}>
            {/*
              DEPLOY NOTE: Replace <Compass> below with:
              <img src="/logo.png" alt="Shore Haven Media" style={{ width: 108, height: 108 }} />
            */}
            <Compass size={108} />
          </div>

          <h1 className="hero-h" style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: "76px", fontWeight: 300,
            letterSpacing: "14px", textTransform: "uppercase", marginTop: "32px", lineHeight: 1.06,
            animation: "fadeUp 1.2s .2s ease both",
          }}>
            Shore Haven<br />Media
          </h1>

          <div style={{
            width: "56px", height: "1px",
            background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
            margin: "28px auto", animation: "fadeUp .8s .42s ease both",
          }} />

          <p style={{
            fontFamily: "'Raleway',sans-serif", fontWeight: 200,
            fontSize: "12px", letterSpacing: "5.5px", textTransform: "uppercase",
            color: GREY, marginBottom: "52px",
            animation: "fadeUp 1s .55s ease both",
          }}>
            Navigating Your Business to Success
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 1s .7s ease both" }}>
            <button className="btn-solid" onClick={() => go("services")} style={{
              background: TEAL, border: `1px solid ${TEAL}`, borderRadius: "2px",
              color: NAVY, cursor: "pointer",
              fontFamily: "'Raleway',sans-serif", fontWeight: 500,
              fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
              padding: "16px 36px", transition: "all .3s",
            }}>Our Services</button>
            <button className="btn-ghost" onClick={() => go("book")} style={{
              background: "transparent", border: "1px solid rgba(244,247,250,.22)", borderRadius: "2px",
              color: WHITE, cursor: "pointer",
              fontFamily: "'Raleway',sans-serif", fontWeight: 400,
              fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
              padding: "16px 36px", transition: "all .3s",
            }}>Book a Call</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "9px",
          opacity: 0.28, animation: "fadeUp 1s 1.5s ease both",
        }}>
          <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "38px", background: `linear-gradient(to bottom, rgba(244,247,250,.7), transparent)`, animation: "linePulse 2.5s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ──── SERVICES ──── */}
      <section id="services" className="sec" style={{ padding: "120px 60px", background: NAVY }}>
        <div ref={f1.ref} className={`fu ${f1.vis ? "on" : ""}`} style={{ maxWidth: "1120px", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ marginBottom: "68px" }}>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 400, fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: TEAL, marginBottom: "14px" }}>
              What We Do
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "50px", fontWeight: 300, letterSpacing: "2px" }}>
              Our Services
            </h2>
            <div style={{ width: "36px", height: "1px", background: TEAL, marginTop: "20px" }} />
          </div>

          {/* Grid — last card spans full width as the signature service */}
          <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(244,247,250,.07)" }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-card" style={{
                padding: "44px 48px", background: NAVY,
                border: "1px solid transparent",
                transition: "all .3s",
                gridColumn: i === 6 ? "1 / -1" : "auto",
              }}>
                <div style={{ display: "flex", gap: "22px", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "13px", fontWeight: 400, color: TEAL, letterSpacing: "2px", marginTop: "5px", minWidth: "26px" }}>
                    {s.n}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 500, letterSpacing: "0.5px", marginBottom: "12px" }}>
                      {s.title}
                    </h3>
                    <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "1.85", color: GREY, maxWidth: i === 6 ? "700px" : "none" }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── SELECTED WORK ──── */}
      <section id="work" className="sec" style={{ padding: "120px 60px", background: NAVY3 }}>
        <div ref={f2.ref} className={`fu ${f2.vis ? "on" : ""}`} style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ marginBottom: "68px" }}>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 400, fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: TEAL, marginBottom: "14px" }}>
              Case Studies
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "50px", fontWeight: 300, letterSpacing: "2px" }}>
              Selected Work
            </h2>
            <div style={{ width: "36px", height: "1px", background: TEAL, marginTop: "20px" }} />
          </div>

          <div className="wg" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {WORK.map((w, i) => (
              <div key={i} className="work-card" style={{
                padding: "44px 36px",
                border: "1px solid rgba(244,247,250,.08)",
                borderRadius: "2px",
                background: "rgba(255,255,255,.01)",
                transition: "all .3s",
              }}>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: TEAL, marginBottom: "22px" }}>
                  {w.cat}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "25px", fontWeight: 400, letterSpacing: "0.5px", marginBottom: "16px" }}>
                  {w.client}
                </h3>
                <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "1.85", color: GREY, marginBottom: "36px" }}>
                  {w.desc}
                </p>
                <div className="work-stat" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "46px", fontWeight: 300, lineHeight: 1, transition: "color .3s" }}>
                  {w.stat}
                </div>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: GREY, marginTop: "9px" }}>
                  {w.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── BOOK A CALL ──── */}
      <section id="book" className="sec" style={{
        padding: "120px 60px",
        background: `linear-gradient(140deg, ${NAVY2} 0%, ${NAVY} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative compass right-side */}
        <div style={{ position: "absolute", right: "-110px", top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none" }}>
          <Compass size={540} />
        </div>

        <div ref={f3.ref} className={`fu ${f3.vis ? "on" : ""}`} style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 400, fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: TEAL, marginBottom: "14px" }}>
            Let's Connect
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "54px", fontWeight: 300, letterSpacing: "2px", marginBottom: "18px" }}>
            Book a Discovery Call
          </h2>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: "1.95", color: GREY, maxWidth: "460px", margin: "0 auto 52px" }}>
            Ready to navigate your next chapter? Let's talk about where you are, where you're headed, and how we get you there.
          </p>

          {/*
            DEPLOY NOTE: Replace this placeholder block with your Calendly embed:
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/YOUR_USERNAME"
              style={{ minWidth: "320px", height: "700px" }}
            />
            Then add this script to your index.html <head>:
            <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
          */}
          <div style={{
            border: "1px solid rgba(244,247,250,.1)", borderRadius: "3px",
            padding: "72px 40px", background: "rgba(244,247,250,.02)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "18px",
          }}>
            <Compass size={52} />
            <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: "13px", color: GREY, letterSpacing: "0.5px" }}>
              Add your Calendly link to activate scheduling
            </p>
            <a
              href="https://calendly.com/YOUR_LINK"
              target="_blank"
              rel="noreferrer"
              className="btn-solid"
              style={{
                display: "inline-block", marginTop: "8px",
                background: TEAL, border: `1px solid ${TEAL}`, borderRadius: "2px",
                color: NAVY, textDecoration: "none",
                fontFamily: "'Raleway',sans-serif", fontWeight: 500,
                fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
                padding: "16px 36px", transition: "all .3s",
              }}
            >
              Schedule Time →
            </a>
          </div>
        </div>
      </section>

      {/* ──── CONTACT ──── */}
      <section id="contact" className="sec" style={{ padding: "120px 60px", background: NAVY }}>
        {/*
          NETLIFY FORMS — add this hidden form to your public/index.html:
          <form name="contact" netlify netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="text" name="company" />
            <textarea name="message"></textarea>
          </form>
        */}
        <div ref={f4.ref} className={`fu ${f4.vis ? "on" : ""}`} style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div className="cg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 400, fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: TEAL, marginBottom: "14px" }}>
                Get in Touch
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "50px", fontWeight: 300, letterSpacing: "2px", marginBottom: "24px", lineHeight: 1.1 }}>
                Start the<br />Conversation
              </h2>
              <div style={{ width: "36px", height: "1px", background: TEAL, marginBottom: "32px" }} />
              <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: "1.9", color: GREY }}>
                Whether you're starting from scratch or ready to scale, we'd love to hear about your business and explore what's possible together.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ──── FOOTER ──── */}
      <footer style={{
        padding: "44px 64px",
        background: DARK,
        borderTop: "1px solid rgba(244,247,250,.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Compass size={26} />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase" }}>
            Shore Haven Media
          </span>
        </div>
        <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: "11px", color: GREY, letterSpacing: "0.5px" }}>
          © {new Date().getFullYear()} Shore Haven Media. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "28px" }}>
          {NAV.map(([id, lbl]) => <span key={id} className="nl" onClick={() => go(id)} style={{ fontSize: "11px" }}>{lbl}</span>)}
        </div>
      </footer>
    </>
  );
}
