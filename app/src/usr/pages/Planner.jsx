/* Planner.jsx — Sprint Board (Kanban) */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { MONTHS, MONTH_TASKS } from '../../var/roadmap';
import { Check, Zap } from 'lucide-react';

export default function Planner() {
  const { state, toggleTask, getCurrentMonth } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(Math.max(1, getCurrentMonth()));
  if (!state) return null;

  const monthData = MONTHS[selectedMonth - 1];
  const tasks = MONTH_TASKS[selectedMonth] || [];
  const todo = tasks.filter(t => !state.taskStatus[t.id]);
  const done = tasks.filter(t => state.taskStatus[t.id]);
  const monthXP = tasks.reduce((s, t) => s + t.xp, 0);
  const earnedXP = done.reduce((s, t) => s + t.xp, 0);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">📅 Sprint Board</h1>
        <p className="page-subtitle">Monthly tasks • Track progress • Earn XP</p>
      </div>

      {/* Month selector */}
      <div className="card" style={{ marginBottom: 24, padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Select Month</h3>
          <span className={`badge badge-phase-${monthData?.phase}`}>Phase {monthData?.phase} — {monthData?.phaseLabel}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {MONTHS.map(m => (
            <button key={m.id} onClick={() => setSelectedMonth(m.id)}
              className={`btn btn-sm ${selectedMonth === m.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem', minWidth: 48,
                ...(selectedMonth !== m.id ? { borderColor: `${m.phaseColor}40`, color: 'var(--text-muted)' } : {}) }}>
              M{m.id}
            </button>
          ))}
        </div>
      </div>

      {/* XP progress */}
      <div className="card" style={{ marginBottom: 24, padding: '14px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Month {selectedMonth} XP Progress</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--amber)' }}>
            <Zap size={12} style={{ display: 'inline', marginRight: 4 }} />{earnedXP} / {monthXP} XP
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${monthXP ? Math.round(earnedXP/monthXP*100) : 0}%` }} />
        </div>
      </div>

      {/* Kanban */}
      <div className="grid-2" style={{ gap: 20 }}>
        {/* To Do */}
        <div className="kanban-col">
          <div className="kanban-col-header">
            <span style={{ color: 'var(--text-muted)' }}>📋 To Do</span>
            <span className="badge badge-muted">{todo.length}</span>
          </div>
          {todo.map(task => (
            <div key={task.id} className="kanban-card" onClick={() => toggleTask(task.id, task.xp)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1, fontSize: '0.85rem', lineHeight: 1.5 }}>{task.text}</div>
                <div style={{ width: 20, height: 20, borderRadius: 4, border: '2px solid var(--border-dim)', flexShrink: 0, marginTop: 2 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                <Zap size={10} color="var(--amber)" />
                <span style={{ fontSize: '0.7rem', color: 'var(--amber)', fontFamily: 'var(--font-mono)' }}>{task.xp} XP</span>
              </div>
            </div>
          ))}
          {todo.length === 0 && (
            <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              ✅ All tasks done!
            </div>
          )}
        </div>

        {/* Done */}
        <div className="kanban-col" style={{ borderColor: 'rgba(0,230,118,0.2)' }}>
          <div className="kanban-col-header">
            <span style={{ color: 'var(--green)' }}>✅ Completed</span>
            <span className="badge badge-green">{done.length}</span>
          </div>
          {done.map(task => (
            <div key={task.id} className="kanban-card" onClick={() => toggleTask(task.id, task.xp)}
              style={{ borderColor: 'rgba(0,230,118,0.2)', opacity: 0.85 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1, fontSize: '0.85rem', lineHeight: 1.5, textDecoration: 'line-through', color: 'var(--text-muted)' }}>{task.text}</div>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: 'var(--green)', border: '2px solid var(--green)', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={12} color="#000" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                <Zap size={10} color="var(--green)" />
                <span style={{ fontSize: '0.7rem', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>+{task.xp} XP earned</span>
              </div>
            </div>
          ))}
          {done.length === 0 && (
            <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              Complete tasks to move them here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
