/* bom.js — Hardware Bill of Materials */

export const BOM_CATEGORIES = ['Compute', 'Sensors', 'Actuators', 'Power', 'Structure', 'Electronics', 'Other'];

export const DEFAULT_BOM = [
  { id: 'b1',  name: 'Raspberry Pi 4 (4GB)',          category: 'Compute',     qty: 1,  unitCost: 4500,  status: 'Planned', notes: 'Main compute unit — runs ROS2 Jazzy' },
  { id: 'b2',  name: 'RPLiDAR A1M8',                  category: 'Sensors',     qty: 1,  unitCost: 7500,  status: 'Planned', notes: 'Primary SLAM sensor — 12m range, 360°' },
  { id: 'b3',  name: 'ESP32 Dev Board',                category: 'Compute',     qty: 1,  unitCost: 350,   status: 'Planned', notes: 'micro-ROS node for additional sensors' },
  { id: 'b4',  name: 'L298N Motor Driver',             category: 'Electronics', qty: 1,  unitCost: 120,   status: 'Planned', notes: 'Dual H-bridge for 2 DC motors' },
  { id: 'b5',  name: 'DC Geared Motor w/ Encoder',    category: 'Actuators',   qty: 2,  unitCost: 450,   status: 'Planned', notes: 'JGA25-370 motors — 12V, 200RPM' },
  { id: 'b6',  name: '3S LiPo Battery (2200mAh)',      category: 'Power',       qty: 1,  unitCost: 1200,  status: 'Planned', notes: '11.1V, 30C — main power source' },
  { id: 'b7',  name: 'LiPo Battery Management System', category: 'Power',       qty: 1,  unitCost: 350,   status: 'Planned', notes: 'Protection circuit for the LiPo' },
  { id: 'b8',  name: 'Buck Converter (12V → 5V)',      category: 'Power',       qty: 1,  unitCost: 80,    status: 'Planned', notes: 'Step-down for RPi 4 power' },
  { id: 'b9',  name: 'MPU-6050 IMU',                   category: 'Sensors',     qty: 1,  unitCost: 80,    status: 'Planned', notes: 'Gyroscope + Accelerometer for odometry fusion' },
  { id: 'b10', name: 'Ultrasonic Sensor HC-SR04',      category: 'Sensors',     qty: 2,  unitCost: 60,    status: 'Planned', notes: 'Rear + front obstacle detection backup' },
  { id: 'b11', name: '3D Printed Chassis (PLA)',        category: 'Structure',   qty: 1,  unitCost: 400,   status: 'Planned', notes: 'Fusion360 designed, ~300g filament' },
  { id: 'b12', name: 'Wheels + Caster',                category: 'Structure',   qty: 1,  unitCost: 250,   status: 'Planned', notes: '65mm rubber wheels + ball caster' },
  { id: 'b13', name: 'Jumper Wires & Connectors',      category: 'Electronics', qty: 1,  unitCost: 200,   status: 'Planned', notes: 'M-M, M-F, F-F sets' },
  { id: 'b14', name: 'Breadboard + PCB Proto Board',   category: 'Electronics', qty: 1,  unitCost: 150,   status: 'Planned', notes: 'For prototyping circuits' },
  { id: 'b15', name: 'MicroSD Card (64GB)',             category: 'Compute',     qty: 1,  unitCost: 500,   status: 'Planned', notes: 'RPi OS + ROS2 install' },
];

export const BOM_STATUSES = ['Planned', 'Ordered', 'In-Hand', 'Installed'];
