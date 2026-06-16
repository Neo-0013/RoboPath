/* Income.jsx — Revenue Streams */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { Plus, DollarSign, TrendingUp, Briefcase, BookOpen, Wrench } from 'lucide-react';

const CATEGORIES = ['Job', 'Freelance', 'Content', 'Consulting'];
const CAT_ICONS = { Job: '🏢', Freelance: '💻', Content: '📺', Consulting: '🎯' };
const CAT_COLORS = { Job: 'var(--steel)', Freelance: 'var(--orange)', Content: 'var(--purple)', Consulting: 'var(--green)' };

const RATE_CARDS = [
  { service: 'ROS2 Node Development', category: 'Freelance', rate: '₹2,000–5,000/hr' },
  { service: 'Gazebo Simulation Build', category: 'Freelance', rate: '₹50,000–2,00,000/project' },
  { service: 'URDF/Xacro Modeling', category: 'Freelance', rate: '₹15,000–50,000/robot' },
  { service: 'Nav2 Deployment & Tuning', category: 'Freelance', rate: '₹1,00,000–3,00,000/engagement' },
  { service: 'micro-ROS Firmware', category: 'Freelance', rate: '₹30,000–1,00,000/project' },
  { service: 'Technical Blog Post', category: 'Content', rate: '₹5,000–25,000/article' },
  { service: 'Robotics Workshop (2-day)', category: 'Consulting', rate: '₹50,000–1,50,000' },
  { service: 'System Architecture Review', category: 'Consulting', rate: '₹1,00,000–3,00,000' },
];

export default function Income() {
  const { state, addIncome, unlockAchievement } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], amount: '', category: 'Freelance', source: '', notes: '' });

  const entries = state?.incomeLog || [];
  const filtered = filter === 'All' ? entries : entries.filter(e => e.category === filter);
  const total = entries.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const byCategory = {};
  CATEGORIES.forEach(c => { byCategory[c] = entries.filter(e => e.category === c).reduce((s, e) => s + (Number(e.amount) || 0), 0); });

  function handleAdd() {
    if (!form.amount || !form.source) return;
    addIncome({ ...form, amount: Number(form.amount), id: Date.now() });
    unlockAchievement('first_income');
    setForm({ date: new Date().toISOString().split('T')[0], amount: '', category: 'Freelance', source: '', notes: '' });
    setShowAdd(false);
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">💰 Revenue Streams</h1>
        <p className="page-subtitle">Track all income from your robotics career</p>
      </div>

      {/* Total + Category breakdown */}
      <div className="grid-4 stagger-children" style={{ marginBottom: 32 }}>
        <div className="card card-sm stat-card card-glow">
          <div style={{ color: 'var(--orange)' }}><DollarSign size={20} /></div>
          <div className="stat-value text-orange">₹{total.toLocaleString('en-IN')}</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-change positive">{entries.length} entries</div>
        </div>
        {CATEGORIES.map(c => (
          <div key={c} className="card card-sm stat-card">
            <div style={{ fontSize: '1.2rem' }}>{CAT_ICONS[c]}</div>
            <div className="stat-value" style={{ color: CAT_COLORS[c] }}>₹{byCategory[c].toLocaleString('en-IN')}</div>
            <div className="stat-label">{c}</div>
            <div className="stat-change">{entries.filter(e => e.category === c).length} entries</div>
          </div>
        ))}
      </div>

      {/* Log */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Income Log</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {['All', ...CATEGORIES].map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`btn btn-sm ${filter === c ? 'btn-primary' : 'btn-ghost'}`} style={{ fontSize: '0.72rem', padding: '4px 10px' }}>{c}</button>
            ))}
            <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(s => !s)}><Plus size={14} />Add</button>
          </div>
        </div>

        {showAdd && (
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: 16, marginBottom: 16, border: '1px solid var(--orange-border)' }}>
            <div className="grid-2" style={{ gap: 10, marginBottom: 10 }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Date</label>
                <input className="form-input" type="date" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Amount (₹)</label>
                <input className="form-input" type="number" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="e.g. 50000" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Category</label>
                <select className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Source / Client</label>
                <input className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} placeholder="e.g. Robotics startup, Upwork" />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Notes</label>
              <input className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Project description..." />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={handleAdd}>Log Income</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>💰</div>
            <div style={{ fontSize: '0.875rem' }}>No income logged yet.</div>
            <div style={{ fontSize: '0.78rem' }}>Log your first client payment when it arrives!</div>
          </div>
        ) : filtered.map((e, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.3rem' }}>{CAT_ICONS[e.category]}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{e.source}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{e.date} • {e.category} {e.notes && `• ${e.notes}`}</div>
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-mono)', color: CAT_COLORS[e.category] }}>
              +₹{Number(e.amount).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Rate Cards */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>📋 Service Rate Reference</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {RATE_CARDS.map((r, i) => (
            <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>{r.service}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge badge-${r.category === 'Freelance' ? 'orange' : r.category === 'Content' ? 'purple' : 'green'}`} style={{ fontSize: '0.65rem' }}>{r.category}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--amber)', fontWeight: 700 }}>{r.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
