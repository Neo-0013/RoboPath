/* Journal.jsx — Engineering Notebook */
import { useState } from 'react';
import { useApp } from '../../proc/AppContext';
import { NotebookPen, Plus, Tag } from 'lucide-react';

const TAGS = ['ROS2', 'Hardware', 'Simulation', 'Math', 'Vision', 'Control', 'Career', 'General'];
const TAG_TEMPLATES = {
  'ROS2': '## ROS2 Session\n\n**Node/Package:** \n**Goal:**\n**Commands run:**\n```bash\n\n```\n**Outcome:**\n**Issues:**\n**Next step:**',
  'Hardware': '## Hardware Build Session\n\n**Component worked on:**\n**Tools used:**\n**Steps:**\n1. \n2. \n3. \n**Issues encountered:**\n**Solutions:**\n**Measurements/Results:**',
  'Simulation': '## Gazebo Sim Session\n\n**World:**\n**Robot:**\n**Goal:**\n**Command:**\n```bash\nros2 launch ...\n```\n**Result:**\n**RTF:**\n**Issues:**\n**Next:**',
  'Math': '## Math Study Block\n\n**Topic:**\n**Resources used:**\n**Key concepts learned:**\n\n**Exercises completed:**\n\n**Still confused about:**',
};

export default function Journal() {
  const { state, saveJournalEntry } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const journal = state?.journal || {};
  const entry = journal[selectedDate];
  const allDates = Object.keys(journal).sort((a, b) => b.localeCompare(a));

  function startEdit() {
    setText(entry?.text || '');
    setSelectedTags(entry?.tags || []);
    setEditing(true);
  }

  function save() {
    saveJournalEntry(selectedDate, text, selectedTags);
    setEditing(false);
  }

  function applyTemplate(tag) {
    const tmpl = TAG_TEMPLATES[tag];
    if (tmpl) setText(t => t ? `${t}\n\n---\n\n${tmpl}` : tmpl);
  }

  function toggleTag(t) {
    setSelectedTags(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">📓 Engineering Notebook</h1>
        <p className="page-subtitle">AES-encrypted session logs • Templates • Searchable history</p>
      </div>

      <div className="grid-2" style={{ gap: 24 }}>
        {/* Editor panel */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <input type="date" value={selectedDate}
                  onChange={e => { setSelectedDate(e.target.value); setEditing(false); }}
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-dim)', borderRadius: 8, padding: '6px 10px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }} />
              </div>
              {!editing ? (
                <button className="btn btn-primary btn-sm" onClick={startEdit}>
                  <Plus size={14} />{entry ? 'Edit Entry' : 'New Entry'}
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={save}>Save</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              )}
            </div>

            {editing ? (
              <>
                {/* Tags */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tags</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {TAGS.map(t => (
                      <button key={t} onClick={() => toggleTag(t)}
                        className={`badge ${selectedTags.includes(t) ? 'badge-orange' : 'badge-muted'}`}
                        style={{ cursor: 'pointer', border: selectedTags.includes(t) ? '1px solid var(--orange-border)' : '1px solid var(--border-subtle)' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Templates */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Insert Template</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {Object.keys(TAG_TEMPLATES).map(t => (
                      <button key={t} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '3px 10px' }} onClick={() => applyTemplate(t)}>
                        {t} Session
                      </button>
                    ))}
                  </div>
                </div>
                <textarea className="journal-textarea"
                  value={text} onChange={e => setText(e.target.value)}
                  placeholder="Document your engineering session..." />
              </>
            ) : (
              <div>
                {entry ? (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                      {(entry.tags || []).map(t => <span key={t} className="badge badge-orange">{t}</span>)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.8, fontFamily: 'var(--font-mono)', background: 'var(--bg-elevated)', padding: 16, borderRadius: 10, maxHeight: 400, overflowY: 'auto' }}>
                      {entry.text}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                    <NotebookPen size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                    <div style={{ fontSize: '0.875rem' }}>No entry for {selectedDate}</div>
                    <div style={{ fontSize: '0.78rem', marginTop: 4 }}>Click "New Entry" to start writing</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* History panel */}
        <div>
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>📅 Entry History</h3>
            {allDates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                No entries yet. Start documenting your engineering sessions!
              </div>
            ) : allDates.map(date => (
              <div key={date} className="journal-entry-card" style={{ marginBottom: 8 }}
                onClick={() => { setSelectedDate(date); setEditing(false); }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: date === selectedDate ? 'var(--orange)' : 'var(--text-primary)' }}>
                    {date}
                  </span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {(journal[date]?.tags || []).slice(0, 3).map(t => (
                      <span key={t} className="badge badge-muted" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {journal[date]?.text?.substring(0, 80)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
