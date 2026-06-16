/* Dashboard.jsx — Mission Control */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../proc/AppContext';
import { PHASES, MONTHS } from '../../var/roadmap';
import { getEngineerRank, DAILY_CONCEPTS } from '../../etc/constants';
import ProgressRing from '../components/ProgressRing';
import { Zap, Target, TrendingUp, DollarSign, ArrowRight, Wrench, Cpu, MonitorPlay, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

function DailyConcept() {
  const today = new Date().toISOString().split('T')[0];
  const idx = Math.floor(new Date(today).getTime() / 86400000) % DAILY_CONCEPTS.length;
  const q = DAILY_CONCEPTS[idx];
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="card" style={{ borderColor: 'var(--orange-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Target size={16} color="var(--orange)" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Daily Concept</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>+25 XP • Resets midnight</div>
        </div>
        <span className="badge badge-orange" style={{ marginLeft: 'auto' }}>{q.concept}</span>
      </div>
      <p style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: 14 }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {q.options.map((opt, i) => {
          let bg = 'var(--bg-elevated)';
          let border = 'var(--border-subtle)';
          let color = 'var(--text-secondary)';
          if (submitted && i === q.answer) { bg = 'var(--green-dim)'; border = 'rgba(0,230,118,0.3)'; color = 'var(--green)'; }
          else if (submitted && i === selected) { bg = 'var(--red-dim)'; border = 'rgba(255,82,82,0.3)'; color = 'var(--red)'; }
          else if (!submitted && i === selected) { bg = 'var(--orange-dim)'; border = 'var(--orange-border)'; color = 'var(--orange)'; }
          return (
            <div key={i} onClick={() => !submitted && setSelected(i)}
              style={{ padding: '9px 12px', borderRadius: 8, border: `1px solid ${border}`, background: bg, color, fontSize: '0.85rem', cursor: submitted ? 'default' : 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.75rem', opacity: 0.6 }}>{String.fromCharCode(65+i)}.</span>
              {opt}
            </div>
          );
        })}
      </div>
      {!submitted ? (
        <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={() => setSubmitted(true)} disabled={selected === null}>
          Submit Answer
        </button>
      ) : (
        <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: selected === q.answer ? 'var(--green-dim)' : 'var(--red-dim)', color: selected === q.answer ? 'var(--green)' : 'var(--red)', fontWeight: 600, fontSize: '0.85rem' }}>
          {selected === q.answer ? '🎉 Correct! +25 XP' : `❌ Answer: ${q.options[q.answer]}`}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { state, getPhaseProgress, getCurrentMonth } = useApp();
  if (!state) return null;

  const xp = state.totalXP || 0;
  const rank = getEngineerRank(xp);
  const streak = state.streak || 0;
  const currentMonth = getCurrentMonth();
  const startDate = new Date(state.startDate);
  const today = new Date();
  const hasStarted = today >= startDate;
  const daysLeft = Math.max(0, Math.floor((startDate - today) / 86400000));

  const totalIncome = (state.incomeLog || []).reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const deployedProjects = (state.projects || []).filter(p => p.statusIndex === 4).length;

  const heatmap = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(today.getTime() - (27 - i) * 86400000).toISOString().split('T')[0];
    return { date: d, active: !!(state.activityLog || {})[d] };
  });

  const currentMonthData = MONTHS[Math.max(0, currentMonth - 1)];
  const nextMonthData = MONTHS[Math.min(23, currentMonth)];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 className="page-title">
          {hasStarted ? `Month ${currentMonth} — ${currentMonthData?.phaseLabel}` : 'Mission Briefing'}
        </h1>
        <p className="page-subtitle">
          {hasStarted
            ? `Day ${Math.floor((today - startDate) / 86400000) + 1} of your 24-month engineering journey`
            : `Roadmap starts in ${daysLeft} days`}
        </p>
      </div>

      {/* Pre-start banner */}
      {!hasStarted && (
        <div style={{ background: 'var(--orange-dim)', border: '1px solid var(--orange-border)', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <AlertTriangle size={20} color="var(--orange)" />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--orange)' }}>📐 Pre-Mission Phase Active</div>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Use this time to set up your tools and review the roadmap. You have {daysLeft} days before launch.
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid-4 stagger-children" style={{ marginBottom: 32 }}>
        <div className="card stat-card card-sm">
          <div style={{ color: 'var(--orange)' }}><Zap size={20} /></div>
          <div className="stat-value text-orange">{xp.toLocaleString()}</div>
          <div className="stat-label">Total XP</div>
          <div className="stat-change positive">{rank.icon} {rank.name}</div>
        </div>
        <div className="card stat-card card-sm">
          <div style={{ fontSize: '1.2rem' }}>{streak >= 7 ? '🔥' : '⚡'}</div>
          <div className="stat-value text-amber">{streak}</div>
          <div className="stat-label">Build Streak</div>
          <div className="stat-change positive">{streak >= 30 ? 'Unstoppable!' : streak >= 7 ? 'On fire!' : streak >= 1 ? 'Going!' : 'Start today'}</div>
        </div>
        <div className="card stat-card card-sm">
          <div style={{ color: 'var(--green)' }}><CheckCircle size={20} /></div>
          <div className="stat-value text-green">{deployedProjects}</div>
          <div className="stat-label">Deployed</div>
          <div className="stat-change">{5 - deployedProjects} projects remaining</div>
        </div>
        <div className="card stat-card card-sm">
          <div style={{ color: 'var(--amber)' }}><DollarSign size={20} /></div>
          <div className="stat-value text-amber">₹{totalIncome.toLocaleString('en-IN')}</div>
          <div className="stat-label">Revenue</div>
          <div className="stat-change positive">{(state.incomeLog || []).length} entries</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 32, gap: 24 }}>
        {/* Phase Progress Rings */}
        <div className="card">
          <h3 style={{ marginBottom: 24, fontSize: '1rem', fontWeight: 700 }}>Phase Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            {PHASES.map(p => (
              <ProgressRing
                key={p.id}
                value={getPhaseProgress(p.id)}
                size={75}
                color={p.color}
                label={`Phase ${p.id}`}
                sublabel={p.icon}
              />
            ))}
          </div>
        </div>
        {/* Daily Concept */}
        <DailyConcept />
      </div>

      {/* Activity Heatmap */}
      <div className="card" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Build Activity (Last 28 Days)</h3>
          <span className="badge badge-orange">🔥 {streak} day streak</span>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {heatmap.map((d, i) => (
            <div key={i} className={`heatmap-cell ${d.active ? 'level-4' : ''}`} title={d.date} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 10 }}>
          <span className="heatmap-cell" /><span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>No session</span>
          <span className="heatmap-cell level-4" style={{ marginLeft: 8 }} /><span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Active build day</span>
        </div>
      </div>

      {/* Current + Next Mission */}
      {hasStarted && (
        <div className="grid-2" style={{ gap: 24, marginBottom: 32 }}>
          {currentMonthData && (
            <div className="card card-glow">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="badge badge-orange">▶ Current</span>
                <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>Month {currentMonthData.id}</span>
              </div>
              <h4 style={{ marginBottom: 8 }}>{currentMonthData.phaseLabel}</h4>
              <p className="text-sm" style={{ marginBottom: 16 }}>Focus: {currentMonthData.focus}</p>
              <span className={`badge badge-phase-${currentMonthData.phase}`}>Phase {currentMonthData.phase}</span>
              <Link to="/planner" className="btn btn-primary btn-sm" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
                Open Sprint Board <ArrowRight size={14} />
              </Link>
            </div>
          )}
          {nextMonthData && currentMonth < 24 && (
            <div className="card" style={{ opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="badge badge-muted">↑ Up Next</span>
                <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>Month {nextMonthData.id}</span>
              </div>
              <h4 style={{ marginBottom: 8 }}>{nextMonthData.phaseLabel}</h4>
              <p className="text-sm" style={{ marginBottom: 16 }}>Focus: {nextMonthData.focus}</p>
              <span className={`badge badge-phase-${nextMonthData.phase}`}>Phase {nextMonthData.phase}</span>
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid-4 stagger-children">
        {[
          { to: '/projects',   icon: <Wrench size={24} color="var(--orange)" />, label: 'The Forge',    sub: '5 portfolio projects' },
          { to: '/hardware',   icon: <Cpu size={24} color="var(--steel)" />,     label: 'The Lab',     sub: 'BOM & build log' },
          { to: '/simulation', icon: <MonitorPlay size={24} color="var(--purple)" />, label: 'Sim Lab', sub: 'Gazebo & Isaac' },
          { to: '/resources',  icon: <BookOpen size={24} color="var(--green)" />,label: 'Library',     sub: 'All resources' },
        ].map(({ to, icon, label, sub }) => (
          <Link key={to} to={to} style={{ textDecoration: 'none' }}>
            <div className="card card-sm" style={{ cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
