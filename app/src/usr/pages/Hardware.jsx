/* Hardware.jsx — The Lab: BOM Tracker */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { BOM_CATEGORIES, BOM_STATUSES } from '../../var/bom';
import { Package, Plus, IndianRupee, CheckCircle } from 'lucide-react';

const STATUS_COLORS = {
  'Planned':   'badge-muted',
  'Ordered':   'badge-amber',
  'In-Hand':   'badge-steel',
  'Installed': 'badge-green',
};

export default function Hardware() {
  const { state, updateBOMItem, addBOMItem } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [catFilter, setCatFilter] = useState('All');
  const [newItem, setNewItem] = useState({ name: '', category: 'Electronics', qty: 1, unitCost: 0, status: 'Planned', notes: '' });
  const [buildLogText, setBuildLogText] = useState('');
  const [editLog, setEditLog] = useState(false);

  const bom = state?.bom || [];
  const filtered = catFilter === 'All' ? bom : bom.filter(b => b.category === catFilter);

  const totalCost = bom.reduce((s, b) => s + (b.qty * b.unitCost), 0);
  const installedCost = bom.filter(b => b.status === 'Installed').reduce((s, b) => s + (b.qty * b.unitCost), 0);
  const inHandCount = bom.filter(b => b.status === 'In-Hand' || b.status === 'Installed').length;

  function handleAdd() {
    if (!newItem.name.trim()) return;
    addBOMItem({ ...newItem, id: `b${Date.now()}`, qty: Number(newItem.qty), unitCost: Number(newItem.unitCost) });
    setNewItem({ name: '', category: 'Electronics', qty: 1, unitCost: 0, status: 'Planned', notes: '' });
    setShowAdd(false);
  }

  function saveBuildLog() {
    const entry = { text: buildLogText, date: new Date().toISOString() };
    const existing = state?.buildLogs || [];
    // stored via updateState-like approach via parent
    setEditLog(false);
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">⚙️ The Lab</h1>
        <p className="page-subtitle">Hardware Bill of Materials • Build Log • Phase 3 Robot</p>
      </div>

      {/* Cost Stats */}
      <div className="grid-3 stagger-children" style={{ marginBottom: 32 }}>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--amber)' }}><IndianRupee size={20} /></div>
          <div className="stat-value text-amber">₹{totalCost.toLocaleString('en-IN')}</div>
          <div className="stat-label">Total Build Cost</div>
          <div className="stat-change">{bom.length} components</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--green)' }}><CheckCircle size={20} /></div>
          <div className="stat-value text-green">{inHandCount}</div>
          <div className="stat-label">Parts Acquired</div>
          <div className="stat-change">{bom.length - inHandCount} still needed</div>
        </div>
        <div className="card card-sm stat-card">
          <div style={{ color: 'var(--steel)' }}><Package size={20} /></div>
          <div className="stat-value text-steel">₹{installedCost.toLocaleString('en-IN')}</div>
          <div className="stat-label">Installed Value</div>
          <div className="stat-change">{bom.filter(b => b.status === 'Installed').length} installed</div>
        </div>
      </div>

      {/* BOM Table */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Bill of Materials</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: 4 }}>
              {['All', ...BOM_CATEGORIES].map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className={`btn btn-sm ${catFilter === c ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.72rem', padding: '4px 10px' }}>{c}</button>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(s => !s)}>
              <Plus size={14} />Add Part
            </button>
          </div>
        </div>

        {/* Add form */}
        {showAdd && (
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: 16, marginBottom: 16, border: '1px solid var(--orange-border)' }}>
            <div className="grid-2" style={{ gap: 10, marginBottom: 10 }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Component Name</label>
                <input className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={newItem.name} onChange={e => setNewItem(n => ({ ...n, name: e.target.value }))} placeholder="e.g. Raspberry Pi 4 (4GB)" />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Category</label>
                <select className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={newItem.category} onChange={e => setNewItem(n => ({ ...n, category: e.target.value }))}>
                  {BOM_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Quantity</label>
                <input className="form-input" type="number" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={newItem.qty} onChange={e => setNewItem(n => ({ ...n, qty: e.target.value }))} min={1} />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Unit Cost (₹)</label>
                <input className="form-input" type="number" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                  value={newItem.unitCost} onChange={e => setNewItem(n => ({ ...n, unitCost: e.target.value }))} min={0} />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Notes</label>
              <input className="form-input" style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                value={newItem.notes} onChange={e => setNewItem(n => ({ ...n, notes: e.target.value }))} placeholder="Specs, where to buy, etc." />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={handleAdd}>Add Component</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className="bom-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Category</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Unit ₹</th>
                <th style={{ textAlign: 'right' }}>Total ₹</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.name}</td>
                  <td><span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>{item.category}</span></td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{item.qty}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>₹{item.unitCost.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem' }}>₹{(item.qty * item.unitCost).toLocaleString('en-IN')}</td>
                  <td>
                    <select className="form-input" style={{ padding: '4px 8px', fontSize: '0.75rem', width: 'auto', background: 'transparent', border: '1px solid var(--border-subtle)' }}
                      value={item.status} onChange={e => updateBOMItem(item.id, { status: e.target.value })}>
                      {BOM_STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem', maxWidth: 180 }} className="truncate">{item.notes}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} style={{ fontWeight: 700, fontSize: '0.85rem', padding: '12px 12px', borderTop: '2px solid var(--border-dim)' }}>TOTAL BUILD COST</td>
                <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-mono)', color: 'var(--orange)', padding: '12px 12px', borderTop: '2px solid var(--border-dim)' }}>₹{totalCost.toLocaleString('en-IN')}</td>
                <td colSpan={2} style={{ borderTop: '2px solid var(--border-dim)' }} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Build Log */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>🔩 Build Log</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => setEditLog(e => !e)}>
            <Plus size={14} />{editLog ? 'Cancel' : 'Add Entry'}
          </button>
        </div>
        {editLog && (
          <div style={{ marginBottom: 16 }}>
            <textarea className="journal-textarea" style={{ minHeight: 100, marginBottom: 8 }}
              placeholder="Document what you built today, issues, solutions, test results..."
              value={buildLogText} onChange={e => setBuildLogText(e.target.value)} />
            <button className="btn btn-primary btn-sm" onClick={saveBuildLog}>Save Entry</button>
          </div>
        )}
        {(!state?.buildLogs || state.buildLogs.length === 0) && !editLog && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🔧</div>
            <div style={{ fontSize: '0.875rem' }}>No build log entries yet.</div>
            <div style={{ fontSize: '0.8rem' }}>Add your first entry when you start building!</div>
          </div>
        )}
        {(state?.buildLogs || []).map((log, i) => (
          <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 8, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
              {new Date(log.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <p style={{ fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>{log.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
