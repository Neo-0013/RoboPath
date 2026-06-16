/* roadmap.js — RoboPath 5-Phase Roadmap Data */

export const PHASES = [
  {
    id: 0, label: 'Foundation', months: '1–2', color: '#546e7a', icon: '📐',
    tagline: 'Fix the gaps. Build the base. No shortcuts.',
    topics: ['Linear Algebra', 'Calculus', 'OOP Python', 'C++ Basics', 'Linux Mastery', 'Git Workflow'],
  },
  {
    id: 1, label: 'Core Engineering', months: '2–7', color: '#1565c0', icon: '⚙️',
    tagline: 'Kinematics. Control. ROS2 deep dive. Sensors.',
    topics: ['Forward/Inverse Kinematics', 'PID Control', 'Nav2', 'ros2_control', 'MoveIt2', 'Sensor Fusion', 'OpenCV + YOLO'],
  },
  {
    id: 2, label: 'Simulation Mastery', months: '6–10', color: '#6a1b9a', icon: '🖥️',
    tagline: 'Simulate before you build. Save robots, save money.',
    topics: ['Gazebo Harmonic Advanced', 'Custom SDF Worlds', 'Digital Twins', 'HIL Testing', 'Multi-Robot Sim', 'NVIDIA Isaac Sim'],
  },
  {
    id: 3, label: 'Hardware & Build', months: '8–14', color: '#bf360c', icon: '🔧',
    tagline: 'Design. Print. Wire. Deploy. Real robots only.',
    topics: ['Electronics & PCB', 'Motor Drivers', 'micro-ROS', 'Raspberry Pi + ESP32', 'Fusion360 → URDF', '3D Printing', 'Physical Robot Build'],
  },
  {
    id: 4, label: 'Specialization', months: '12–18', color: '#e65100', icon: '🎯',
    tagline: 'Pick your lane. Go deep. Own the niche.',
    topics: {
      A: ['ROS-Industrial', 'MoveIt2 Advanced', 'PLC Integration', 'OPC-UA', 'Safety Standards ISO 10218'],
      B: ['Nav2 Expert', 'Fleet Management', 'Multi-AMR Systems', 'LIDAR Calibration', 'Lifecycle Nodes'],
      C: ['PX4 / ArduPilot', 'MAVROS', 'GPS+IMU Fusion', 'Precision Landing', 'Drone Security'],
      D: ['Safety-Critical Systems', 'Force/Torque Control', 'Haptics', 'Real-Time ROS2', 'IEC 62304'],
    },
  },
  {
    id: 5, label: 'Career & Income', months: '18–24', color: '#1b5e20', icon: '💰',
    tagline: 'Skills converted to money. Escape the rat race.',
    topics: ['Job Applications', 'ROS2 Freelancing', 'Technical Blog', 'YouTube Channel', 'Udemy Course', 'Consulting'],
  },
];

export const MONTHS = Array.from({ length: 24 }, (_, i) => {
  const month = i + 1;
  let phase = 0;
  if (month >= 2 && month <= 7) phase = 1;
  if (month >= 6 && month <= 10) phase = 2;
  if (month >= 8 && month <= 14) phase = 3;
  if (month >= 12 && month <= 18) phase = 4;
  if (month >= 18) phase = 5;

  const phaseData = PHASES[phase];
  const weekStart = (i * 4) + 1;

  return {
    id: month,
    phase,
    phaseLabel: phaseData.label,
    phaseColor: phaseData.color,
    weekStart,
    weekEnd: weekStart + 3,
    xp: 200 + (phase * 50),
    label: `Month ${month}`,
    focus: Array.isArray(phaseData.topics)
      ? phaseData.topics[Math.min(i % phaseData.topics.length, phaseData.topics.length - 1)]
      : `Lane specialization`,
  };
});

// Weekly tasks by month
export const MONTH_TASKS = {};
for (let m = 1; m <= 24; m++) {
  const mData = MONTHS[m - 1];
  const phase = PHASES[mData.phase];
  const topics = Array.isArray(phase.topics) ? phase.topics : ['Specialize in chosen lane'];
  MONTH_TASKS[m] = [
    { id: `${m}-1`, text: `Study: ${topics[0] || 'Core topic'}`, xp: 50, done: false },
    { id: `${m}-2`, text: `Implement: Hands-on project for Phase ${mData.phase}`, xp: 75, done: false },
    { id: `${m}-3`, text: `Review: Document what you built`, xp: 25, done: false },
    { id: `${m}-4`, text: `Community: Post update or ask a question on ROS Discourse`, xp: 25, done: false },
    { id: `${m}-5`, text: `Quiz: Complete 3 concept reviews`, xp: 30, done: false },
  ];
}
