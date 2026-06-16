/* achievements.js — RoboPath Achievement Badges */

export const ACHIEVEMENTS = [
  // Foundation
  { id: 'first_login',       title: 'System Online',          desc: 'Logged in for the first time',                         icon: '🟢', xp: 50,   phase: 0 },
  { id: 'first_task',        title: 'First Commit',           desc: 'Completed your first task',                            icon: '✅', xp: 50,   phase: 0 },
  { id: 'week_streak_7',     title: '7-Day Streak',           desc: 'Studied 7 days in a row',                              icon: '🔥', xp: 150,  phase: 0 },
  { id: 'week_streak_30',    title: 'Iron Will',              desc: 'Studied 30 days in a row',                             icon: '⚡', xp: 500,  phase: 0 },
  { id: 'math_done',         title: 'Linear Algebra Clear',   desc: 'Completed Phase 0 math foundation',                    icon: '📐', xp: 200,  phase: 0 },

  // Phase 1 — Core Engineering
  { id: 'first_ros2_node',   title: 'Node Online',            desc: 'Built your first custom ROS2 node',                    icon: '🤖', xp: 150,  phase: 1 },
  { id: 'pid_impl',          title: 'PID Tuner',              desc: 'Implemented a PID controller from scratch',            icon: '⚙️',  xp: 200,  phase: 1 },
  { id: 'fk_ik_done',        title: 'Kinematic Master',       desc: 'Solved FK and IK for a 2-DOF arm',                     icon: '🦾', xp: 300,  phase: 1 },
  { id: 'nav2_first',        title: 'First Navigation',       desc: 'Got TurtleBot3 to navigate with Nav2',                 icon: '🗺️',  xp: 250,  phase: 1 },
  { id: 'yolo_ros',          title: 'Machine Eyes',           desc: 'Integrated YOLO detection with a ROS2 node',           icon: '👁️',  xp: 300,  phase: 1 },

  // Phase 2 — Simulation
  { id: 'first_gazebo',      title: 'Simulation Engineer',    desc: 'Launched your first custom Gazebo world',              icon: '🖥️', xp: 200,  phase: 2 },
  { id: 'warehouse_sim',     title: 'Warehouse Architect',    desc: 'Built a full warehouse sim with autonomous nav',        icon: '🏭', xp: 500,  phase: 2 },
  { id: 'digital_twin',      title: 'Digital Twin Pioneer',   desc: 'Created a digital twin of a real robot',               icon: '👥', xp: 600,  phase: 2 },
  { id: 'multi_robot',       title: 'Fleet Commander',        desc: 'Ran 3+ robots simultaneously in Gazebo',               icon: '🤖', xp: 400,  phase: 2 },

  // Phase 3 — Hardware
  { id: 'first_solder',      title: 'Soldering Iron',         desc: 'Completed your first hardware wiring',                 icon: '🔌', xp: 150,  phase: 3 },
  { id: 'first_print',       title: '3D Printer',             desc: 'Printed your first robot chassis part',                icon: '🖨️',  xp: 200,  phase: 3 },
  { id: 'physical_robot',    title: 'Robot Builder',          desc: 'Built a complete physical robot from scratch',         icon: '🔧', xp: 1000, phase: 3 },
  { id: 'slam_real',         title: 'SLAM in the Wild',       desc: 'Ran SLAM on a physical robot in a real room',          icon: '🗺️',  xp: 800,  phase: 3 },
  { id: 'micro_ros',         title: 'micro-ROS Engineer',     desc: 'Connected ESP32 to ROS2 via micro-ROS',                icon: '📡', xp: 300,  phase: 3 },

  // Phase 4 — Specialization
  { id: 'lane_chosen',       title: 'Specialist',             desc: 'Chose your specialization lane',                       icon: '🎯', xp: 100,  phase: 4 },
  { id: 'capstone_started',  title: 'Capstone Initiated',     desc: 'Started your Phase 4 capstone project',               icon: '🚀', xp: 200,  phase: 4 },
  { id: 'capstone_deployed', title: 'Chief Engineer',         desc: 'Deployed your capstone project',                      icon: '🏆', xp: 2000, phase: 4 },

  // Career
  { id: 'github_push',       title: 'Open Source',            desc: 'Pushed a robotics project to GitHub',                  icon: '💻', xp: 100,  phase: 5 },
  { id: 'first_freelance',   title: 'First Client',           desc: 'Landed your first freelance robotics project',         icon: '💰', xp: 500,  phase: 5 },
  { id: 'first_income',      title: 'Revenue Positive',       desc: 'Logged your first income from robotics',               icon: '💵', xp: 300,  phase: 5 },
  { id: 'blog_post',         title: 'Technical Writer',       desc: 'Published your first robotics blog post',              icon: '✍️',  xp: 200,  phase: 5 },
  { id: 'full_time',         title: 'Professional Roboticist', desc: 'Landed a full-time robotics engineering job',         icon: '🎓', xp: 3000, phase: 5 },
];
