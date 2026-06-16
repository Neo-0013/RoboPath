/* App.jsx — Auth Gate + Router */
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './proc/AppContext';
import { encrypt, decrypt, verifyPassphrase } from './var/crypto/cipher';
import { STORAGE_KEY, SALT_VERIFY_KEY } from './etc/constants';
import Sidebar from './usr/components/Sidebar';
import AchievementToast from './usr/components/AchievementToast';
import Dashboard from './usr/pages/Dashboard';
import Roadmap from './usr/pages/Roadmap';
import Planner from './usr/pages/Planner';
import Projects from './usr/pages/Projects';
import Hardware from './usr/pages/Hardware';
import Simulation from './usr/pages/Simulation';
import Income from './usr/pages/Income';
import Resources from './usr/pages/Resources';
import Journal from './usr/pages/Journal';
import Settings from './usr/pages/Settings';
import { Cog, Lock, Eye, EyeOff, AlertTriangle, Shield } from 'lucide-react';

function AuthGate({ onAuth }) {
  const isFirst = !localStorage.getItem(SALT_VERIFY_KEY);
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!pw) return setError('Password required');
    if (pw.length < 8) return setError('Minimum 8 characters');
    if (isFirst) {
      if (pw !== confirm) return setError('Passwords do not match');
      setLoading(true);
      const sentinel = await encrypt({ v: 1, app: 'robopath', t: Date.now() }, pw);
      localStorage.setItem(SALT_VERIFY_KEY, sentinel);
      setLoading(false);
      onAuth(pw);
    } else {
      setLoading(true);
      const sentinel = localStorage.getItem(SALT_VERIFY_KEY);
      const valid = await verifyPassphrase(sentinel, pw);
      setLoading(false);
      if (!valid) return setError('Incorrect password. Try again.');
      onAuth(pw);
    }
  }

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <div className="auth-logo">
          <span className="auth-gear">⚙️</span>
          <h1>RoboPath</h1>
          <p>Robotics &amp; Automation Engineering Roadmap</p>
        </div>
        <div className="auth-card">
          <div className="auth-security-badge">
            <Shield size={14} />
            <span>AES-GCM 256-bit • PBKDF2 SHA-256 • 600,000 iterations • Web Crypto API</span>
          </div>
          <h3 style={{ marginBottom: 8 }}>
            {isFirst ? '🔐 Set Master Password' : '🔓 Access Mission Control'}
          </h3>
          <p className="text-secondary text-sm" style={{ marginBottom: 24 }}>
            {isFirst
              ? 'This password encrypts ALL your robotics data. Store it safely — it cannot be recovered.'
              : 'Enter your password to decrypt and access your engineering dashboard.'}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Master Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={show ? 'text' : 'password'}
                  value={pw}
                  onChange={e => { setPw(e.target.value); setError(''); }}
                  placeholder="Enter a strong passphrase..."
                  autoFocus
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {isFirst && <p className="form-hint">Tip: use a phrase like "robot-build-2026-go"</p>}
            </div>
            {isFirst && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className="form-input" type={show ? 'text' : 'password'} value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError(''); }}
                  placeholder="Repeat your password..." />
              </div>
            )}
            {error && (
              <div className="form-error"><AlertTriangle size={14} />{error}</div>
            )}
            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: 8 }} disabled={loading}>
              {loading ? (
                <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />Deriving key (~2s)...</>
              ) : isFirst ? (
                <><Lock size={16} />Encrypt &amp; Launch</>
              ) : (
                <><Cog size={16} />Start Engines</>
              )}
            </button>
          </form>
          {!isFirst && (
            <div style={{ marginTop: 20, padding: 12, background: 'rgba(255,82,82,0.07)', borderRadius: 8, border: '1px solid rgba(255,82,82,0.2)' }}>
              <p style={{ fontSize: '0.73rem', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={12} />Forgot password? Your data is encrypted and cannot be recovered. Reset in Settings to start fresh.
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function AppShell() {
  const { pendingAchievement, clearPendingAchievement } = useApp();
  return (
    <div className="layout-shell">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/roadmap"    element={<Roadmap />} />
          <Route path="/planner"    element={<Planner />} />
          <Route path="/projects"   element={<Projects />} />
          <Route path="/hardware"   element={<Hardware />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/income"     element={<Income />} />
          <Route path="/resources"  element={<Resources />} />
          <Route path="/journal"    element={<Journal />} />
          <Route path="/settings"   element={<Settings />} />
          <Route path="*"           element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      {pendingAchievement && (
        <AchievementToast achievementId={pendingAchievement} onDismiss={clearPendingAchievement} />
      )}
    </div>
  );
}

export default function App() {
  const [passphrase, setPassphrase] = useState(null);
  if (!passphrase) return <AuthGate onAuth={setPassphrase} />;
  return (
    <BrowserRouter>
      <AppProvider passphrase={passphrase}>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}
