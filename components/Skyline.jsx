// Seeded skyline: identical on server and client (no hydration mismatch).
function build(seed, minH, maxH) {
  let x = 0, r = seed;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const rects = [];
  while (x < 1900) {
    const w = 30 + rnd() * 70, h = minH + rnd() * (maxH - minH);
    rects.push({ x: +x.toFixed(1), y: +(200 - h).toFixed(1), w: +w.toFixed(1), h: +h.toFixed(1) });
    x += w + rnd() * 8;
  }
  return rects;
}

export default function Skyline({ className, fill, seed, minH, maxH }) {
  const rects = build(seed, minH, maxH);
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 1900 200" preserveAspectRatio="none" className="block h-full w-full">
        {rects.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={fill} />
        ))}
      </svg>
    </div>
  );
}
