/* Settings.jsx */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { LANES } from '../../etc/constants';
import { Shield, AlertTriangle, Save, RotateCcw } from 'lucide-react';

export default function Settings() {
  const { state, updateState, resetData } = useApp();
  const [startDate, setStartDate] = useState(state?.startDate || '');
  const [confirmReset, setConfirmReset] = useState(false);

  function saveStartDate() {
    updateState(s => ({ ...s, startDate }));
  }

  function setLane(l) {
    updateState(s => ({ ...s, selectedLane: l }));
  }

  const totalTasks = Object.keys(state?.taskStatus || {}).length;
  const doneTasks = Object.values(state?.taskStatus || {}).filter(Boolean).length;
  const journalEntries = Object.keys(state?.journal || {}).length;
  const simRuns = (state?.simLogs || []).length;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">⚙️ Settings</h1>
        <p className="page-subtitle">Configure your roadmap and manage your data</p>
      </div>

      {/* Start Date */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>📅 Roadmap Start Date</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label">Start Date</label>
            <input className="form-input" type="date"
              value={startDate} onChange={e => setStartDate(e.target.value)} />
            <p className="form-hint">This determines which month you're currently in.</p>
          </div>
          <button className="btn btn-primary" onClick={saveStartDate}><Save size={16} />Save</button>
        </div>
      </div>

      {/* Lane Selection */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>🎯 Specialization Lane (Phase 4)</h3>
        <div className="grid-4" style={{ gap: 10 }}>
          {LANES.map(l => (
            <div key={l.id} onClick={() => setLane(l.id)}
              style={{ padding: '14px 12px', borderRadius: 10, border: state?.selectedLane === l.id ? '1px solid var(--orange-border)' : '1px solid var(--border-subtle)', background: state?.selectedLane === l.id ? 'var(--orange-dim)' : 'var(--bg-elevated)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{l.icon}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: state?.selectedLane === l.id ? 'var(--orange)' : 'var(--text-primary)', marginBottom: 3 }}>Lane {l.id}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{l.label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.8rem', marginTop: 12 }}>
          Currently selected: <strong style={{ color: 'var(--orange)' }}>Lane {state?.selectedLane} — {LANES.find(l => l.id === state?.selectedLane)?.label}</strong>
        </p>
      </div>

      {/* Data Stats */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>📊 Your Data</h3>
        <div className="grid-4">
          {[
            { label: 'Tasks Completed', value: `${doneTasks}/${totalTasks}`, color: 'var(--green)' },
            { label: 'Journal Entries', value: journalEntries, color: 'var(--steel)' },
            { label: 'Sim Runs Logged', value: simRuns, color: 'var(--purple)' },
            { label: 'Total XP', value: (state?.totalXP || 0).toLocaleString(), color: 'var(--orange)' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 10px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--green-dim)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Shield size={16} color="var(--green)" />
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            All data is encrypted with <strong style={{ color: 'var(--green)' }}>AES-GCM-256</strong> using PBKDF2 key derivation (600,000 iterations, SHA-256). Your master password is never stored.
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ borderColor: 'rgba(255,82,82,0.2)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: 'var(--red)' }}>⚠️ Danger Zone</h3>
        <p style={{ fontSize: '0.85rem', marginBottom: 16 }}>
          Resetting will permanently delete all your encrypted progress data including tasks, journal entries, sim logs, BOM data, and income records. This cannot be undone.
        </p>
        {!confirmReset ? (
          <button className="btn btn-danger btn-sm" onClick={() => setConfirmReset(true)}>
            <RotateCcw size={14} />Reset All Data
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--red)', fontSize: '0.85rem' }}>
              <AlertTriangle size={16} />Are you absolutely sure? This is permanent.
            </div>
            <button className="btn btn-danger btn-sm" onClick={resetData}>Yes, Delete Everything</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
