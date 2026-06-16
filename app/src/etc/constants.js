/* constants.js — RoboPath */
export const STORAGE_KEY = 'robopath_data_v1';
export const SALT_VERIFY_KEY = 'robopath_salt_verify_v1';

export const APP_NAME = 'RoboPath';
export const APP_SUBTITLE = 'Robotics & Automation Engineering';
export const TOTAL_MONTHS = 24;

/* ─── Specialization Lanes ─── */
export const LANES = [
  { id: 'A', label: 'Industrial Automation', icon: '🏭', companies: 'ABB, KUKA, Siemens, Bosch' },
  { id: 'B', label: 'Autonomous Mobile Robots', icon: '🤖', companies: 'MiR, Fetch, Clearpath' },
  { id: 'C', label: 'Aerial Robotics (Drones)', icon: '🚁', companies: 'DJI, Parrot, DRDO' },
  { id: 'D', label: 'Medical Robotics', icon: '🏥', companies: 'Stryker, Intuitive, ReWalk' },
];

/* ─── XP / Level System ─── */
export const ENGINEER_RANKS = [
  { name: 'Intern',            minXP: 0,     icon: '🔩', color: '#64748b' },
  { name: 'Junior Engineer',   minXP: 500,   icon: '⚙️',  color: '#3b82f6' },
  { name: 'Engineer',          minXP: 1500,  icon: '🤖', color: '#8b5cf6' },
  { name: 'Senior Engineer',   minXP: 3500,  icon: '🦾', color: '#ff6b2b' },
  { name: 'Tech Lead',         minXP: 7000,  icon: '🛰️',  color: '#ffd740' },
  { name: 'Principal Eng.',    minXP: 12000, icon: '🚀', color: '#00e676' },
  { name: 'Chief Roboticist',  minXP: 20000, icon: '🏆', color: '#ff6b2b' },
];

export function getEngineerRank(xp) {
  let rank = ENGINEER_RANKS[0];
  for (const r of ENGINEER_RANKS) {
    if (xp >= r.minXP) rank = r;
  }
  const idx = ENGINEER_RANKS.indexOf(rank);
  const next = ENGINEER_RANKS[idx + 1] || null;
  const progress = next
    ? Math.round(((xp - rank.minXP) / (next.minXP - rank.minXP)) * 100)
    : 100;
  return { ...rank, next, progress };
}

/* ─── Daily Concept Quiz ─── */
export const DAILY_CONCEPTS = [
  {
    concept: 'Kinematics',
    q: 'In forward kinematics, what does the Denavit-Hartenberg (DH) convention define?',
    options: [
      'The electrical connections between motors',
      'A systematic way to describe joint and link transformations in a robot',
      'The PID gains for a robot controller',
      'The network protocol for ROS2 topics',
    ],
    answer: 1,
  },
  {
    concept: 'ROS2',
    q: 'What is the role of the DDS (Data Distribution Service) in ROS2?',
    options: [
      'It stores robot URDF files in a database',
      'It is the middleware enabling pub/sub communication between nodes',
      'It renders Gazebo simulation graphics',
      'It compiles C++ ROS2 packages',
    ],
    answer: 1,
  },
  {
    concept: 'Control Theory',
    q: 'In a PID controller, what does the Integral (I) term correct for?',
    options: [
      'Rapid oscillations in the output',
      'Future error predictions',
      'Steady-state error (persistent offset from setpoint)',
      'Sensor noise filtering',
    ],
    answer: 2,
  },
  {
    concept: 'SLAM',
    q: 'What does SLAM stand for, and what problem does it solve?',
    options: [
      'Simultaneous Localization And Mapping — building a map while knowing your position in it',
      'Sensor-Level Autonomous Maneuvering — avoiding obstacles',
      'Stereo Laser And Mapping — 3D LiDAR fusion',
      'Sequential Loop And Merge — combining ROS2 launch files',
    ],
    answer: 0,
  },
  {
    concept: 'Sensor Fusion',
    q: 'The Kalman Filter is used in robotics primarily to:',
    options: [
      'Filter electrical noise in motor drivers',
      'Optimally estimate state (position, velocity) by fusing noisy sensor data',
      'Schedule ROS2 node execution order',
      'Compress LiDAR point cloud data',
    ],
    answer: 1,
  },
  {
    concept: 'micro-ROS',
    q: 'micro-ROS allows microcontrollers like ESP32 to:',
    options: [
      'Run a full Ubuntu OS and ROS2 stack',
      'Act as first-class ROS2 nodes with pub/sub/services over serial or WiFi',
      'Simulate Gazebo worlds on low-power hardware',
      'Replace the Raspberry Pi as the main compute unit',
    ],
    answer: 1,
  },
  {
    concept: 'Nav2',
    q: 'In Nav2, what is the purpose of a Costmap?',
    options: [
      'To calculate the financial cost of a robot build',
      'To represent the environment as a 2D/3D grid showing traversable vs. obstacle space',
      'To rank navigation paths by computation cost',
      'To map ROS2 topics to RViz visualization panels',
    ],
    answer: 1,
  },
  {
    concept: 'Digital Twin',
    q: 'A Digital Twin in robotics refers to:',
    options: [
      'Running two identical robots in parallel for redundancy',
      'A real-time virtual replica of a physical robot that mirrors its state',
      'Duplicating ROS2 nodes for load balancing',
      'Mirroring a GitHub repo for backup',
    ],
    answer: 1,
  },
  {
    concept: 'URDF',
    q: 'What is a URDF file used for in ROS2?',
    options: [
      'Storing encrypted user data',
      'Defining the physical structure, joints, and links of a robot for simulation and visualization',
      'Configuring Nav2 path planners',
      'Writing launch file parameters',
    ],
    answer: 1,
  },
  {
    concept: 'ros2_control',
    q: 'The Hardware Interface in ros2_control is an abstraction that:',
    options: [
      'Provides WiFi connectivity to the robot',
      'Separates the controller logic from the actual hardware (motors, encoders)',
      'Manages the robot\'s battery management system',
      'Renders the robot model in RViz',
    ],
    answer: 1,
  },
];
