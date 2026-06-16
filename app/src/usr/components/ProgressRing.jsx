/* ProgressRing.jsx */
export default function ProgressRing({ value = 0, size = 80, color = 'var(--orange)', label = '', sublabel = '' }) {
  const radius = (size - 12) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--bg-elevated)" strokeWidth={6} />
          <circle
            cx={size/2} cy={size/2} r={radius} fill="none"
            stroke={color} strokeWidth={6}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 6px ${color}44)` }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: size > 70 ? '0.65rem' : '0.55rem', color }}>{sublabel}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: size > 70 ? '0.9rem' : '0.75rem', color: 'var(--text-primary)' }}>
            {value}%
          </span>
        </div>
      </div>
      {label && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>}
    </div>
  );
}
