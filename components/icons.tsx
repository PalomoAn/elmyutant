const K = { stroke: "#0b0610", strokeWidth: 2 };

export function BlogIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="2" width="20" height="28" fill="#eadfcb" {...K} />
      <path d="M10 11h12M10 16h12M10 21h12M10 26h7" stroke="#0b0610" strokeWidth="2" />
      <rect x="6" y="2" width="20" height="5" fill="#b0123a" {...K} />
    </svg>
  );
}

export function ArtIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M2 8h11l3 3h14v18H2z" fill="#eadfcb" {...K} />
      <path d="M2 13h28" stroke="#0b0610" strokeWidth="2" />
    </svg>
  );
}

export function FilmsIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="6" width="28" height="20" fill="#eadfcb" {...K} />
      <rect x="6" y="9" width="20" height="7" fill="#f7f1e6" {...K} />
      <circle cx="11" cy="21" r="2.5" fill="#0b0610" />
      <circle cx="21" cy="21" r="2.5" fill="#0b0610" />
      <path d="M8 12h16" stroke="#b0123a" strokeWidth="2" />
    </svg>
  );
}

export function WorkIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="9" y="9" width="14" height="14" fill="#eadfcb" stroke="#0b0610" strokeWidth="2" />
      <rect x="13" y="13" width="6" height="6" fill="#b0123a" />
      <path
        d="M12 3v6M16 3v6M20 3v6M12 23v6M16 23v6M20 23v6M3 12h6M3 16h6M3 20h6M23 12h6M23 16h6M23 20h6"
        stroke="#eadfcb"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CandleIcon() {
  return (
    <svg className="candle" viewBox="0 0 16 28" aria-hidden="true">
      <g className="flame">
        <path d="M8 1C11 6 12 8 12 10A4 4 0 0 1 4 10C4 8 5 6 8 1Z" fill="#ffc83d" />
        <path d="M8 5C9.5 8 10 9 10 10.5A2 2 0 0 1 6 10.5C6 9 6.5 8 8 5Z" fill="#ff5d8f" />
      </g>
      <rect x="7.4" y="14" width="1.2" height="3" fill="#eadfcb" />
      <rect x="4" y="17" width="8" height="10" fill="#eadfcb" />
      <rect x="4" y="17" width="2" height="10" fill="#b9ae9a" />
      <rect x="3" y="26" width="10" height="2" fill="#6a4680" />
    </svg>
  );
}

export function WelcomeIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M3 3h21l5 5v21H3z" fill="#eadfcb" stroke="#0b0610" strokeWidth="2" />
      <rect x="8" y="3" width="14" height="9" fill="#0b0610" />
      <rect x="17" y="5" width="3" height="5" fill="#eadfcb" />
      <rect x="7" y="17" width="18" height="12" fill="#f7f1e6" stroke="#0b0610" strokeWidth="2" />
      <path d="M10 21h12M10 25h8" stroke="#b0123a" strokeWidth="2" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="4" width="26" height="24" fill="#eadfcb" stroke="#0b0610" strokeWidth="2" />
      <path d="M8 10h16M8 16h16M8 22h16" stroke="#0b0610" strokeWidth="2" />
      <rect x="11" y="7" width="4" height="6" fill="#b0123a" stroke="#0b0610" strokeWidth="2" />
      <rect x="18" y="13" width="4" height="6" fill="#b0123a" stroke="#0b0610" strokeWidth="2" />
      <rect x="10" y="19" width="4" height="6" fill="#b0123a" stroke="#0b0610" strokeWidth="2" />
    </svg>
  );
}