/* Simulation.jsx — Sim Lab */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { Plus, Play, Clock, Cpu } from 'lucide-react';

const SIM_RESULTS = ['Success ✅', 'Partial ⚠️', 'Failed ❌', 'Ongoing 🔄'];
const SIM_WORLDS  = ['TurtleBot3 World', 'Warehouse World', 'Hospital Corridor', 'Outdoor Garden', 'Custom World'];
const SIM_ROBOTS  = ['TurtleBot3 Waffle', 'Custom Diff-Drive', 'UR5 Arm', 'Drone (PX4)', 'Custom AMR'];

export default function Simulation() {
  const { state, addSimLog } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    world: 'TurtleBot3 World', robot: 'TurtleBot3 Waffle',
    duration: '', result: 'Success ✅', rtf: '', fps: '',
    notes: '',
  });

  const logs = state?.simLogs || [];

  function handleAdd() {
    if (!form.notes.trim() && !form.duration) return;
    addSimLog({ ...form, date: new Date().toISOString() });
    setForm({ world: 'TurtleBot3 World', robot: 'TurtleBot3 Waffle', duration: '', result: 'Success ✅', rtf: '', fps: '', notes: '' });
    setShowAdd(false);
  }

  // Nav2 config profiles
  const [nav2Profiles] = useState([
    { name: 'Default Nav2 Config', notes: 'Out-of-box TurtleBot3 params', planner: 'NavFn', controller: 'DWB', costmapInflation: 0.55 },
    { name: 'Tight Spaces Config', notes: 'Narrow corridors, smaller footprint', planner: 'Smac 2D', controller: 'RPP', costmapInflation: 0.35 },
  ]);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">🖥️ Sim Lab</h1>
        <p className="page-subtitle">Log Gazebo / Isaac Sim runs • Track Nav2 configs • Measure performance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid-3 stagger-children" style={{ marginBottom: 32 }}>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--orange)' }}><Play size={20} /></div>
          <div className="stat-value text-orange">{logs.length}</div>
          <div className="stat-label">Sim Runs Logged</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--green)' }}><Clock size={20} /></div>
          <div className="stat-value text-green">{logs.filter(l => l.result?.includes('✅')).length}</div>
          <div className="stat-label">Successful Runs</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--steel)' }}><Cpu size={20} /></div>
          <div className="stat-value text-steel">{new Set(logs.map(l => l.world)).size}</div>
          <div className="stat-label">Unique Worlds</div>
        </div>
      </div>

      {/* Sim Run Log */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Simulation Run Log</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(s => !s)}>
            <Plus size={14} />{showAdd ? 'Cancel' : 'Log Run'}
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: 16, marginBottom: 16, border: '1px solid var(--orange-border)' }}>
            <div className="grid-2" style={{ gap: 10, marginBottom: 10 }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>World / Environment</label>
                <select className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.world} onChange={e => setForm(f => ({ ...f, world: e.target.value }))}>
                  {SIM_WORLDS.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Robot</label>
                <select className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.robot} onChange={e => setForm(f => ({ ...f, robot: e.target.value }))}>
                  {SIM_ROBOTS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Duration (mins)</label>
                <input className="form-input" type="number" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 45" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Result</label>
                <select className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))}>
                  {SIM_RESULTS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>RTF (Real-Time Factor)</label>
                <input className="form-input" type="number" step="0.1" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.rtf} onChange={e => setForm(f => ({ ...f, rtf: e.target.value }))} placeholder="e.g. 0.9" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Avg FPS</label>
                <input className="form-input" type="number" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.fps} onChange={e => setForm(f => ({ ...f, fps: e.target.value }))} placeholder="e.g. 30" />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Notes / Observations</label>
              <textarea className="journal-textarea" style={{ minHeight: 80, fontSize: '0.85rem' }}
                value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="What did you test? What worked? What failed? Navigation issues?" />
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Save Run</button>
          </div>
        )}

        {logs.length === 0 && !showAdd ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🖥️</div>
            <div style={{ fontSize: '0.875rem', marginBottom: 6 }}>No simulation runs logged yet.</div>
            <div style={{ fontSize: '0.78rem' }}>Launch Gazebo, run a session, then log it here!</div>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 100px 60px 60px', gap: 12, padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 6 }}>
              {['World', 'Robot', 'Duration', 'Result', 'RTF', 'FPS'].map(h => (
                <div key={h} style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{h}</div>
              ))}
            </div>
            {logs.map((log, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 100px 60px 60px', gap: 12, padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center', transition: 'background 0.15s', borderRadius: 6 }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,43,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{log.world}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{log.robot}</div>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{log.duration ? `${log.duration}m` : '—'}</div>
                <div style={{ fontSize: '0.8rem' }}>{log.result}</div>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--steel)' }}>{log.rtf || '—'}</div>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>{log.fps || '—'}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Nav2 Config Profiles */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>🧭 Nav2 Config Reference</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {nav2Profiles.map((p, i) => (
            <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge badge-orange">Planner: {p.planner}</span>
                  <span className="badge badge-steel">Controller: {p.controller}</span>
                  <span className="badge badge-muted">Inflation: {p.costmapInflation}m</span>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', margin: 0 }}>{p.notes}</p>
            </div>
          ))}
          <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            More Nav2 config management coming in future updates.
          </div>
        </div>
      </div>
    </div>
  );
}
