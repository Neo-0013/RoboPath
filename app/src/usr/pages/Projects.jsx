/* Projects.jsx — The Forge */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { PROJECT_STATUSES } from '../../var/projects';
import { PHASES } from '../../var/roadmap';
import { GitBranch, ExternalLink, Zap, CheckCircle, Clock, Rocket } from 'lucide-react';

const PHASE_COLORS = { 0: '#546e7a', 1: '#1565c0', 2: '#6a1b9a', 3: '#bf360c', 4: '#e65100' };

function StatusPipeline({ statusIndex, onChange }) {
  return (
    <div className="pipeline" style={{ marginBottom: 14 }}>
      {PROJECT_STATUSES.map((s, i) => (
        <div key={s} className={`pipeline-step ${i === statusIndex ? 'active' : i < statusIndex ? 'done' : ''}`}
          onClick={() => onChange(i)} title={`Set to: ${s}`}>
          {i < statusIndex ? '✓ ' : ''}{s}
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const { state, updateProject, unlockAchievement } = useApp();
  const [expanded, setExpanded] = useState(null);
  const [editGithub, setEditGithub] = useState({});
  const [editNotes, setEditNotes] = useState({});

  const projects = state?.projects || [];
  const deployed = projects.filter(p => p.statusIndex === 4).length;
  const inProgress = projects.filter(p => p.statusIndex > 0 && p.statusIndex < 4).length;

  function handleStatusChange(projectId, newIdx) {
    updateProject(projectId, { statusIndex: newIdx, ...(newIdx === 4 ? { deployedAt: new Date().toISOString() } : {}), ...(newIdx === 1 && !projects.find(p=>p.id===projectId)?.startedAt ? { startedAt: new Date().toISOString() } : {}) });
    if (newIdx === 4) unlockAchievement('capstone_deployed');
    if (newIdx === 1) unlockAchievement('capstone_started');
  }

  function saveGithub(id) {
    updateProject(id, { githubUrl: editGithub[id] });
    if (editGithub[id]) unlockAchievement('github_push');
  }

  function saveNotes(id) { updateProject(id, { notes: editNotes[id] }); }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">🔧 The Forge</h1>
        <p className="page-subtitle">5 portfolio projects • Track each through the build pipeline</p>
      </div>

      {/* Stats */}
      <div className="grid-3 stagger-children" style={{ marginBottom: 32 }}>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--orange)' }}><Rocket size={20} /></div>
          <div className="stat-value text-orange">{deployed}</div>
          <div className="stat-label">Deployed</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--steel)' }}><Clock size={20} /></div>
          <div className="stat-value text-steel">{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--amber)' }}><Zap size={20} /></div>
          <div className="stat-value text-amber">{projects.reduce((s, p) => p.statusIndex === 4 ? s + p.xp : s, 0).toLocaleString()}</div>
          <div className="stat-label">XP Earned from Projects</div>
        </div>
      </div>

      {/* Project Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {projects.map(proj => {
          const color = PHASE_COLORS[proj.phase] || 'var(--orange)';
          const isExpanded = expanded === proj.id;
          const statusLabel = PROJECT_STATUSES[proj.statusIndex] || 'Planning';

          return (
            <div key={proj.id} className="card" style={{ borderLeftColor: color, borderLeftWidth: 3, padding: 0 }}>
              {/* Header */}
              <div style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}
                onClick={() => setExpanded(isExpanded ? null : proj.id)}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  {proj.statusIndex === 4 ? '🚀' : proj.statusIndex > 0 ? '⚙️' : '📋'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{proj.title}</span>
                    <span className={`badge badge-phase-${proj.phase}`}>Phase {proj.phase}</span>
                    {proj.statusIndex === 4 && <span className="badge badge-green"><CheckCircle size={10} /> Deployed</span>}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{proj.subtitle}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color, marginBottom: 2 }}>{statusLabel}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>+{proj.xp.toLocaleString()} XP</div>
                </div>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '16px 20px' }}>
                  <p style={{ fontSize: '0.875rem', marginBottom: 16 }}>{proj.description}</p>

                  {/* Pipeline */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Build Pipeline</div>
                    <StatusPipeline statusIndex={proj.statusIndex} onChange={(i) => handleStatusChange(proj.id, i)} />
                  </div>

                  {/* Skills */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Skills Demonstrated</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {proj.skills.map(s => <span key={s} className="badge badge-muted">{s}</span>)}
                    </div>
                  </div>

                  {/* GitHub URL */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>GitHub Repository</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input className="form-input" style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
                        placeholder="https://github.com/Neo-0013/..."
                        defaultValue={proj.githubUrl}
                        onChange={e => setEditGithub(g => ({ ...g, [proj.id]: e.target.value }))}
                      />
                      <button className="btn btn-secondary btn-sm" onClick={() => saveGithub(proj.id)}><GitBranch size={14} />Save</button>
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="btn btn-steel btn-sm"><ExternalLink size={14} /></a>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Build Notes</div>
                    <textarea className="journal-textarea" style={{ minHeight: 100, fontSize: '0.85rem' }}
                      placeholder="Document your build process, issues encountered, solutions found..."
                      defaultValue={proj.notes}
                      onChange={e => setEditNotes(n => ({ ...n, [proj.id]: e.target.value }))}
                    />
                    <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }} onClick={() => saveNotes(proj.id)}>Save Notes</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
