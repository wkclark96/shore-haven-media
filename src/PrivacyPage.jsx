import { marked } from "marked";
import privacy from "./data/privacy.json";

/* ─── PALETTE ─── */
const NAVY  = "#131D36";
const DARK  = "#0E1623";
const TEAL  = "#2D8F8F";
const TEALT = "#3AAFAF";
const WHITE = "#F4F7FA";
const GREY  = "#8995AA";

function Compass({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      <circle cx="100" cy="100" r="91" fill="none" stroke={TEAL} strokeWidth="1.5" opacity="0.35" />
      <circle cx="100" cy="100" r="80" fill="#1B2B4A" stroke={TEAL} strokeWidth="0.8" opacity="0.55" />
      <polygon points="100,22 107,96 100,89 93,96" fill={WHITE} />
      <polygon points="100,178 107,104 100,111 93,104" fill={GREY} />
      <polygon points="178,100 104,93 111,100 104,107" fill={WHITE} />
      <polygon points="22,100 96,93 89,100 96,107" fill={GREY} />
      <polygon points="163,37 108,92 104,84 112,84" fill={TEAL} opacity="0.9" />
      <polygon points="37,37 92,92 84,88 88,80" fill={TEAL} opacity="0.65" />
      <polygon points="163,163 108,108 112,116 104,116" fill={TEAL} opacity="0.65" />
      <polygon points="37,163 92,108 84,112 88,120" fill={TEAL} opacity="0.9" />
      <circle cx="100" cy="100" r="9" fill={TEAL} />
      <circle cx="100" cy="100" r="4" fill={WHITE} />
    </svg>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Raleway:wght@300;400;500&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: ${NAVY}; color: ${WHITE}; font-family: 'Raleway', sans-serif; -webkit-font-smoothing: antialiased; }
  a:focus-visible { outline: 2px solid ${TEALT}; outline-offset: 3px; }

  .legal-header { border-bottom: 1px solid rgba(244,247,250,.07); }
  .legal-header-inner { max-width: 820px; margin: 0 auto; padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; }
  .legal-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; color: ${WHITE}; }
  .legal-brand .nm { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 500; letter-spacing: 4px; text-transform: uppercase; }
  .legal-back { font-family: 'Raleway', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${TEALT}; text-decoration: none; }
  .legal-back:hover { color: ${WHITE}; }

  .legal-wrap { max-width: 820px; margin: 0 auto; padding: 72px 32px 96px; }
  .legal-wrap h1 { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; letter-spacing: 2px; margin-bottom: 10px; }
  .legal-updated { font-family: 'Raleway', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: ${GREY}; margin-bottom: 14px; }
  .legal-rule { width: 40px; height: 1px; background: ${TEAL}; margin-bottom: 40px; }

  .legal-content h2 { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; letter-spacing: .5px; color: ${WHITE}; margin: 40px 0 14px; }
  .legal-content p { font-family: 'Raleway', sans-serif; font-weight: 300; font-size: 15px; line-height: 1.85; color: ${GREY}; margin-bottom: 16px; }
  .legal-content ul { margin: 0 0 16px 22px; }
  .legal-content li { font-family: 'Raleway', sans-serif; font-weight: 300; font-size: 15px; line-height: 1.8; color: ${GREY}; margin-bottom: 8px; }
  .legal-content strong { color: ${WHITE}; font-weight: 500; }
  .legal-content a { color: ${TEALT}; text-decoration: underline; }
  .legal-content a:hover { color: ${WHITE}; }

  .legal-footer { border-top: 1px solid rgba(244,247,250,.07); background: ${DARK}; }
  .legal-footer-inner { max-width: 820px; margin: 0 auto; padding: 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .legal-footer-inner span { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 4px; text-transform: uppercase; }
  .legal-footer-inner a { font-family: 'Raleway', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${GREY}; text-decoration: none; }
  .legal-footer-inner a:hover { color: ${WHITE}; }

  @media (max-width: 600px) {
    .legal-wrap { padding: 48px 22px 72px; }
    .legal-wrap h1 { font-size: 38px; }
  }
`;

export default function PrivacyPage() {
  const html = marked.parse(privacy.body || "");
  return (
    <>
      <style>{CSS}</style>

      <header className="legal-header">
        <div className="legal-header-inner">
          <a href="/" className="legal-brand" aria-label="Shore Haven Media — home">
            <Compass size={28} />
            <span className="nm">Shore Haven Media</span>
          </a>
          <a href="/" className="legal-back">← Back to site</a>
        </div>
      </header>

      <main className="legal-wrap">
        <h1>{privacy.title}</h1>
        <p className="legal-updated">Last updated: {privacy.updated}</p>
        <div className="legal-rule" aria-hidden="true" />
        <div className="legal-content" dangerouslySetInnerHTML={{ __html: html }} />
      </main>

      <footer className="legal-footer">
        <div className="legal-footer-inner">
          <span>Shore Haven Media</span>
          <a href="/">Return Home</a>
        </div>
      </footer>
    </>
  );
}
