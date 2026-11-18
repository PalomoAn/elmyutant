export default function Marquee({ items }: { items: string[] }) {
  const content = items.map((s) => (
    <span key={s} className="mq-item">
      {s}
      <b>†</b>
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}