// Inline SVG car so the project has zero image dependencies.
function Wheel({ cx }) {
  return (
    <g transform={`translate(${cx} 168)`}>
      <g className="wheel">
        <circle r="30" fill="#0E1620" />
        <circle r="17" fill="#C9D6DC" />
        {[0, 60, 120].map((a) => (
          <rect key={a} x="-2" y="-17" width="4" height="34" fill="#0E1620" transform={`rotate(${a})`} />
        ))}
        <circle r="5" fill="#0E1620" />
      </g>
    </g>
  );
}

export default function Car() {
  return (
    <svg viewBox="0 0 560 210" className="w-full h-auto" role="img" aria-label="Coral sports car">
      <ellipse cx="280" cy="200" rx="230" ry="9" fill="#000" opacity=".25" />
      <path d="M20 150 Q22 118 70 112 L150 106 Q195 48 265 46 L345 48 Q410 56 440 104 L512 116 Q544 124 542 152 L536 168 L20 168 Z" fill="#FF5A36" />
      <path d="M170 104 Q205 62 262 60 L296 61 L296 104 Z" fill="#DCEBF1" />
      <path d="M308 61 L345 62 Q392 70 415 104 L308 104 Z" fill="#DCEBF1" />
      <rect x="296" y="60" width="12" height="46" fill="#FF5A36" />
      <path d="M20 150 L536 150" stroke="#C93E20" strokeWidth="3" />
      <rect x="500" y="124" width="34" height="10" rx="5" fill="#F6D743" />
      <rect x="24" y="126" width="22" height="9" rx="4" fill="#8B1E0C" />
      <Wheel cx={130} />
      <Wheel cx={430} />
    </svg>
  );
}
