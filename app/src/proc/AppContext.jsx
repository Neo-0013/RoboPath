/* AppContext.jsx — Global State + Encryption */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { encrypt, decrypt } from '../var/crypto/cipher';
import { STORAGE_KEY } from '../etc/constants';
import { DEFAULT_PROJECTS } from '../var/projects';
import { DEFAULT_BOM } from '../var/bom';
import { MONTHS, MONTH_TASKS } from '../var/roadmap';
import { ACHIEVEMENTS } from '../var/achievements';

const AppContext = createContext(null);

const DEFAULT_STATE = {
  totalXP: 0,
  streak: 0,
  lastActiveDate: null,
  startDate: new Date(Date.now() + 37 * 86400000).toISOString().split('T')[0], // ~July 23
  selectedLane: 'A',
  monthStatus: {}, // { [monthId]: 'not_started' | 'in_progress' | 'completed' }
  taskStatus: {},  // { [taskId]: boolean }
  projects: DEFAULT_PROJECTS,
  bom: DEFAULT_BOM,
  simLogs: [],
  buildLogs: [],
  incomeLog: [],
  journal: {},     // { [date]: { text, tags } }
  activityLog: {}, // { [date]: true }
  unlockedAchievements: [],
  quizAnswers: {},
};

function computeStreak(activityLog) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getTime() - i * 86400000).toISOString().split('T')[0];
    if (activityLog[d]) streak++;
    else if (i > 0) break;
  }
  return streak;
}

export function AppProvider({ children, passphrase }) {
  const [state, setState] = useState(null);
  const [pendingAchievement, setPendingAchievement] = useState(null);

  // Load
  useEffect(() => {
    (async () => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const fresh = { ...DEFAULT_STATE, taskStatus: buildDefaultTaskStatus() };
        setState(fresh);
        return;
      }
      try {
        const data = await decrypt(raw, passphrase);
        // Merge missing keys
        setState({ ...DEFAULT_STATE, taskStatus: buildDefaultTaskStatus(), ...data });
      } catch {
        setState({ ...DEFAULT_STATE, taskStatus: buildDefaultTaskStatus() });
      }
    })();
  }, [passphrase]);

  function buildDefaultTaskStatus() {
    const ts = {};
    for (let m = 1; m <= 24; m++) {
      const tasks = MONTH_TASKS[m] || [];
      tasks.forEach(t => { ts[t.id] = false; });
    }
    return ts;
  }

  // Save
  const save = useCallback(async (newState) => {
    const today = new Date().toISOString().split('T')[0];
    const withActivity = {
      ...newState,
      activityLog: { ...newState.activityLog, [today]: true },
    };
    withActivity.streak = computeStreak(withActivity.activityLog);
    withActivity.lastActiveDate = today;
    const blob = await encrypt(withActivity, passphrase);
    localStorage.setItem(STORAGE_KEY, blob);
    setState(withActivity);
  }, [passphrase]);

  const updateState = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      save(next);
      return next;
    });
  }, [save]);

  // Task toggle
  const toggleTask = useCallback((taskId, xpReward = 50) => {
    updateState(prev => {
      const done = !prev.taskStatus[taskId];
      const xpDelta = done ? xpReward : -xpReward;
      return {
        ...prev,
        taskStatus: { ...prev.taskStatus, [taskId]: done },
        totalXP: Math.max(0, prev.totalXP + xpDelta),
      };
    });
  }, [updateState]);

  // Project update
  const updateProject = useCallback((projectId, updates) => {
    updateState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projectId ? { ...p, ...updates } : p),
    }));
  }, [updateState]);

  // BOM update
  const updateBOMItem = useCallback((itemId, updates) => {
    updateState(prev => ({
      ...prev,
      bom: prev.bom.map(b => b.id === itemId ? { ...b, ...updates } : b),
    }));
  }, [updateState]);

  const addBOMItem = useCallback((item) => {
    updateState(prev => ({ ...prev, bom: [...prev.bom, item] }));
  }, [updateState]);

  // Sim log
  const addSimLog = useCallback((log) => {
    updateState(prev => ({ ...prev, simLogs: [log, ...prev.simLogs] }));
  }, [updateState]);

  // Income
  const addIncome = useCallback((entry) => {
    updateState(prev => ({ ...prev, incomeLog: [entry, ...prev.incomeLog] }));
  }, [updateState]);

  // Journal
  const saveJournalEntry = useCallback((date, text, tags) => {
    updateState(prev => ({
      ...prev,
      journal: { ...prev.journal, [date]: { text, tags, updatedAt: Date.now() } },
    }));
  }, [updateState]);

  // Achievement
  const unlockAchievement = useCallback((achievementId) => {
    updateState(prev => {
      if (prev.unlockedAchievements.includes(achievementId)) return prev;
      const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
      setPendingAchievement(achievementId);
      return {
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, achievementId],
        totalXP: prev.totalXP + (ach?.xp || 0),
      };
    });
  }, [updateState]);

  const clearPendingAchievement = useCallback(() => setPendingAchievement(null), []);

  const getCurrentMonth = useCallback(() => {
    if (!state) return 1;
    const start = new Date(state.startDate);
    const today = new Date();
    const diffMs = today - start;
    if (diffMs < 0) return 0;
    return Math.min(24, Math.floor(diffMs / (30 * 86400000)) + 1);
  }, [state]);

  const getPhaseProgress = useCallback((phaseId) => {
    if (!state) return 0;
    const phaseTasks = [];
    for (let m = 1; m <= 24; m++) {
      if (MONTHS[m - 1].phase === phaseId) {
        (MONTH_TASKS[m] || []).forEach(t => phaseTasks.push(t.id));
      }
    }
    if (!phaseTasks.length) return 0;
    const done = phaseTasks.filter(id => state.taskStatus[id]).length;
    return Math.round((done / phaseTasks.length) * 100);
  }, [state]);

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('robopath_salt_verify_v1');
    window.location.reload();
  }, []);

  return (
    <AppContext.Provider value={{
      state, updateState, toggleTask,
      updateProject, updateBOMItem, addBOMItem,
      addSimLog, addIncome, saveJournalEntry,
      unlockAchievement, clearPendingAchievement,
      pendingAchievement, getCurrentMonth, getPhaseProgress,
      resetData,
    }}>
      {state ? children : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#020408', color: '#ff6b2b', fontFamily: 'monospace' }}>
          Decrypting data...
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }
