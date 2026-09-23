"use client";

/**
 * Infinite horizontal ticker. The items are rendered twice and the track is
 * translated by exactly -50%, so the loop point lands on an identical frame.
 */
export default function Marquee({
  items,
  duration = 34,
  className,
}: {
  items: string[];
  duration?: number;
  className?: string;
}) {
  const sequence = (key: string) => (
    <div className="flex shrink-0 items-center" key={key}>
      {items.map((item, index) => (
        <span key={`${key}-${item}-${index}`} className="flex items-center">
          <span className="font-display whitespace-nowrap px-6 text-[clamp(1.75rem,5vw,4rem)] leading-none tracking-tight text-paper/90">
            {item}
          </span>
          <span aria-hidden="true" className="text-accent text-[clamp(1rem,2vw,1.5rem)]">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden py-6 ${className ?? ""}`}
      aria-hidden="true"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
    >
      <div className="marquee-track" style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
        {sequence("a")}
        {sequence("b")}
      </div>
    </div>
  );
}
