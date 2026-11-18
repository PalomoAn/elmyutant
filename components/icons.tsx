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