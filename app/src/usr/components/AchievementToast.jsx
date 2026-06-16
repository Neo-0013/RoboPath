/* AchievementToast.jsx */
import { useEffect } from 'react';
import { ACHIEVEMENTS } from '../../var/achievements';

export default function AchievementToast({ achievementId, onDismiss }) {
  const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
  useEffect(() => {
    const t = setTimeout(onDismiss, 4500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  if (!ach) return null;
  return (
    <div className="achievement-toast" onClick={onDismiss} style={{ cursor: 'pointer' }}>
      <div className="achievement-icon">{ach.icon}</div>
      <div>
        <div style={{ fontSize: '0.65rem', color: 'var(--orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
          Achievement Unlocked!
        </div>
        <div className="achievement-title">{ach.title}</div>
        <div className="achievement-desc">{ach.desc}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--amber)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
          +{ach.xp} XP
        </div>
      </div>
    </div>
  );
}
