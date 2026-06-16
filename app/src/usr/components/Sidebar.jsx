/* Sidebar.jsx */
import { NavLink } from 'react-router-dom';
import { useApp } from '../../proc/AppContext';
import { getEngineerRank } from '../../etc/constants';
import {
  LayoutDashboard, Map, Calendar, Wrench,
  Cpu, MonitorPlay, DollarSign, BookOpen,
  NotebookPen, Settings, Cog, Zap
} from 'lucide-react';

const NAV = [
  { to: '/dashboard',   icon: LayoutDashboard, label: 'Mission Control' },
  { to: '/roadmap',     icon: Map,             label: 'Roadmap' },
  { to: '/planner',     icon: Calendar,        label: 'Sprint Board' },
];

const NAV_BUILD = [
  { to: '/projects',    icon: Wrench,          label: 'The Forge',    badge: '⭐' },
  { to: '/hardware',    icon: Cpu,             label: 'The Lab',      badge: '🔧' },
  { to: '/simulation',  icon: MonitorPlay,     label: 'Sim Lab',      badge: '🖥️' },
];

const NAV_TOOLS = [
  { to: '/income',      icon: DollarSign,   label: 'Revenue' },
  { to: '/resources',   icon: BookOpen,     label: 'Library' },
  { to: '/journal',     icon: NotebookPen,  label: 'Eng. Notebook' },
  { to: '/settings',    icon: Settings,     label: 'Settings' },
];

export default function Sidebar() {
  const { state } = useApp();
  const xp = state?.totalXP || 0;
  const streak = state?.streak || 0;
  const rank = getEngineerRank(xp);

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Cog size={20} color="var(--orange)" style={{ flexShrink: 0 }} />
          <h1>RoboPath</h1>
        </div>
        <p>Robotics &amp; Automation Eng.</p>
      </div>

      {/* Streak */}
      <div className="streak-widget">
        <span className="streak-flame">
          {streak >= 14 ? '🔥' : streak >= 7 ? '⚡' : streak >= 1 ? '🔆' : '💤'}
        </span>
        <div>
          <div className="streak-count">{streak}</div>
          <div className="streak-label">build streak</div>
        </div>
      </div>

      {/* XP / Rank */}
      <div style={{ padding: '0 8px', marginBottom: 8 }}>
        <div className="xp-widget">
          <div className="xp-level-label">
            <span className="xp-level-name">{rank.icon} {rank.name}</span>
            <span className="xp-points">{xp.toLocaleString()} XP</span>
          </div>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${rank.progress}%` }} />
          </div>
          {rank.next && (
            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 4, textAlign: 'right' }}>
              {rank.next.name} in {(rank.next.minXP - xp).toLocaleString()} XP
            </div>
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Overview</div>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Icon className="nav-item-icon" />
            {label}
          </NavLink>
        ))}

        <div className="nav-section-label">Build</div>
        {NAV_BUILD.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Icon className="nav-item-icon" />
            {label}
            {badge && (
              <span className="badge badge-orange" style={{ marginLeft: 'auto', fontSize: '0.6rem', padding: '1px 5px' }}>
                {badge}
              </span>
            )}
          </NavLink>
        ))}

        <div className="nav-section-label">Tools</div>
        {NAV_TOOLS.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Icon className="nav-item-icon" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
          🔒 AES-GCM-256 encrypted
        </div>
      </div>
    </nav>
  );
}
