/* Roadmap.jsx — 5-Phase accordion + Lane selector */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { PHASES } from '../../var/roadmap';
import { LANES } from '../../etc/constants';
import { ChevronDown, ChevronRight, Target } from 'lucide-react';

export default function Roadmap() {
  const { state, updateState, getPhaseProgress } = useApp();
  const [open, setOpen] = useState(0);
  const lane = state?.selectedLane || 'A';

  function setLane(l) { updateState(s => ({ ...s, selectedLane: l })); }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">🗺️ The Mission Map</h1>
        <p className="page-subtitle">5 phases • 24 months • Full-stack robotics engineering</p>
      </div>

      {/* Phase overview bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: 'var(--bg-surface)', borderRadius: 12, padding: 8, border: '1px solid var(--border-subtle)', overflowX: 'auto' }}>
        {PHASES.map(p => {
          const prog = getPhaseProgress(p.id);
          return (
            <div key={p.id} onClick={() => setOpen(p.id)}
              style={{ flex: 1, minWidth: 80, padding: '8px 6px', borderRadius: 8, cursor: 'pointer', border: open === p.id ? `1px solid ${p.color}44` : '1px solid transparent', background: open === p.id ? `${p.color}15` : 'transparent', transition: 'all 0.2s', textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{p.icon}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: p.color, marginBottom: 4 }}>Phase {p.id}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{p.months}mo</div>
              <div style={{ height: 3, background: 'var(--bg-elevated)', borderRadius: 99, marginTop: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${prog}%`, background: p.color, borderRadius: 99 }} />
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 3 }}>{prog}%</div>
            </div>
          );
        })}
      </div>

      {/* Phase 4 Lane Selector */}
      {open === 4 && (
        <div className="card" style={{ marginBottom: 20, borderColor: 'rgba(230,81,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Target size={16} color="var(--orange)" />
            <h4 style={{ fontSize: '0.9rem' }}>Select Your Specialization Lane</h4>
          </div>
          <div className="grid-4" style={{ gap: 8 }}>
            {LANES.map(l => (
              <div key={l.id} onClick={() => setLane(l.id)}
                style={{ padding: '12px 10px', borderRadius: 10, border: lane === l.id ? '1px solid var(--orange-border)' : '1px solid var(--border-subtle)', background: lane === l.id ? 'var(--orange-dim)' : 'var(--bg-elevated)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{l.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: lane === l.id ? 'var(--orange)' : 'var(--text-primary)' }}>Lane {l.id}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 3 }}>{l.label}</div>
              </div>
            ))}
          </div>
          {lane && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--orange-dim)', borderRadius: 8, border: '1px solid var(--orange-border)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--orange)' }}>Lane {lane} Companies:</strong> {LANES.find(l => l.id === lane)?.companies}
            </div>
          )}
        </div>
      )}

      {/* Phase Accordions */}
      {PHASES.map(phase => {
        const isOpen = open === phase.id;
        const topics = phase.id === 4
          ? (Array.isArray(phase.topics[lane]) ? phase.topics[lane] : phase.topics.A)
          : phase.topics;

        return (
          <div key={phase.id} className={`phase-card ${isOpen ? 'active' : ''}`} style={{ borderLeftColor: phase.color, borderLeftWidth: 3 }}>
            <div className="phase-card-header" onClick={() => setOpen(isOpen ? -1 : phase.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '1.6rem' }}>{phase.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: phase.color }}>Phase {phase.id} — {phase.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Month {phase.months} • {phase.tagline}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: phase.color, fontFamily: 'var(--font-mono)' }}>{getPhaseProgress(phase.id)}%</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>complete</div>
                </div>
                {isOpen ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
              </div>
            </div>

            {isOpen && (
              <div className="phase-card-body">
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    {phase.id === 4 ? `Lane ${lane} Topics` : 'Core Topics'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {topics.map((t, i) => (
                      <span key={i} className={`badge badge-phase-${phase.id}`} style={{ fontSize: '0.75rem', padding: '4px 12px' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Phase-specific outcome */}
                <div style={{ padding: '12px 16px', background: `${phase.color}10`, border: `1px solid ${phase.color}30`, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: phase.color, marginBottom: 6 }}>🎯 Phase Outcome</div>
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>
                    {phase.id === 0 && 'You can SSH into a robot, write OOP Python, use Git branches, and are no longer afraid of math equations.'}
                    {phase.id === 1 && 'You can implement kinematics from scratch, tune a PID controller, run Nav2 autonomous navigation, and integrate a camera + YOLO pipeline into ROS2.'}
                    {phase.id === 2 && 'You can build complete Gazebo worlds, run multi-robot simulations, and explain what a digital twin is from experience, not theory.'}
                    {phase.id === 3 && 'You have a physical robot that maps, localizes, and navigates autonomously. You designed it, printed it, wired it, and deployed ROS2 on it.'}
                    {phase.id === 4 && `You are a specialist in ${LANES.find(l => l.id === lane)?.label}. You have a capstone project proving deep expertise in this lane.`}
                    {phase.id === 5 && 'You have multiple income streams active: full-time job + freelance + content or consulting. You have escaped the rat race.'}
                  </p>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                    <span>Phase Progress</span>
                    <span>{getPhaseProgress(phase.id)}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${getPhaseProgress(phase.id)}%`, background: `linear-gradient(90deg, ${phase.color}88, ${phase.color})` }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
