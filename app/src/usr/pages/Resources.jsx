/* Resources.jsx — The Library */
import { useState } from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

const RESOURCES = [
  // Phase 0
  { title: '3Blue1Brown — Essence of Linear Algebra', type: 'Video', phase: 0, topic: 'Math', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', desc: 'Visual explanation of linear algebra — the foundation of kinematics' },
  { title: 'Khan Academy Calculus', type: 'Course', phase: 0, topic: 'Math', url: 'https://www.khanacademy.org/math/calculus-1', desc: 'Free calculus course — trajectory planning, control theory' },
  { title: 'Probabilistic Robotics — Thrun', type: 'Book', phase: 0, topic: 'Math', url: 'https://docs.ufpr.br/~danielsantos/ProbabilisticRobotics.pdf', desc: 'The SLAM/Kalman bible. Free PDF.' },
  { title: 'Linux Command Line Basics', type: 'Docs', phase: 0, topic: 'Linux', url: 'https://linuxcommand.org/', desc: 'Master the terminal for robot development' },
  // Phase 1
  { title: 'Modern Robotics — Lynch & Park', type: 'Book', phase: 1, topic: 'Kinematics', url: 'https://modernrobotics.northwestern.edu/', desc: 'Free PDF + Coursera. The best robotics textbook online.' },
  { title: 'Brian Douglas Control Systems', type: 'Video', phase: 1, topic: 'Control', url: 'https://www.youtube.com/user/ControlLectures', desc: 'PID, state space, Bode plots explained clearly' },
  { title: 'Nav2 Documentation', type: 'Docs', phase: 1, topic: 'ROS2', url: 'https://docs.nav2.org/', desc: 'Official Nav2 docs — path planning, costmaps, behavior trees' },
  { title: 'ros2_control Documentation', type: 'Docs', phase: 1, topic: 'ROS2', url: 'https://control.ros.org/jazzy/index.html', desc: 'Hardware interface, controllers, controller manager' },
  { title: 'MoveIt 2 Documentation', type: 'Docs', phase: 1, topic: 'ROS2', url: 'https://moveit.picknik.ai/', desc: 'Motion planning for robot arms' },
  { title: 'OpenCV Python Tutorials', type: 'Docs', phase: 1, topic: 'Vision', url: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html', desc: 'Official OpenCV tutorials for computer vision' },
  { title: 'YOLOv8 — Ultralytics', type: 'Docs', phase: 1, topic: 'Vision', url: 'https://docs.ultralytics.com/', desc: 'Real-time object detection integration with ROS2' },
  { title: 'Kalman Filter Explained Visually', type: 'Docs', phase: 1, topic: 'Sensors', url: 'https://www.kalmanfilter.net/default.aspx', desc: 'Visual, interactive Kalman filter tutorial' },
  // Phase 2
  { title: 'Gazebo Harmonic Documentation', type: 'Docs', phase: 2, topic: 'Simulation', url: 'https://gazebosim.org/docs/harmonic/', desc: 'Official Gazebo Harmonic reference' },
  { title: 'NVIDIA Isaac Sim', type: 'Docs', phase: 2, topic: 'Simulation', url: 'https://developer.nvidia.com/isaac-sim', desc: 'Industry-standard simulation platform' },
  { title: 'Open3D — 3D Data Processing', type: 'Docs', phase: 2, topic: 'Simulation', url: 'http://www.open3d.org/', desc: 'Point cloud processing library' },
  // Phase 3
  { title: 'micro-ROS Documentation', type: 'Docs', phase: 3, topic: 'Hardware', url: 'https://micro.ros.org/', desc: 'ESP32 / STM32 as first-class ROS2 nodes' },
  { title: 'KiCad PCB Design (Free)', type: 'Tool', phase: 3, topic: 'Hardware', url: 'https://www.kicad.org/', desc: 'Design your own motor controller PCB' },
  { title: 'Fusion 360 → URDF Exporter', type: 'Tool', phase: 3, topic: 'Hardware', url: 'https://github.com/syuntoku14/fusion2urdf', desc: 'Export your Fusion360 robot to URDF automatically' },
  { title: 'PrusaSlicer', type: 'Tool', phase: 3, topic: 'Hardware', url: 'https://www.prusa3d.com/page/prusaslicer_424/', desc: 'Free 3D printing slicer for robot chassis' },
  // Phase 4 / Career
  { title: 'ROS-Industrial', type: 'Docs', phase: 4, topic: 'Specialization', url: 'https://rosindustrial.org/', desc: 'ROS2 for industrial robot arms and factories' },
  { title: 'PX4 Autopilot Documentation', type: 'Docs', phase: 4, topic: 'Specialization', url: 'https://docs.px4.io/', desc: 'Drone autopilot stack — aerial robotics lane' },
  { title: 'ArduPilot', type: 'Docs', phase: 4, topic: 'Specialization', url: 'https://ardupilot.org/', desc: 'Open source autopilot for drones and rovers' },
  { title: 'ETH Zurich — Programming for Robotics', type: 'Course', phase: 5, topic: 'Career', url: 'https://rsl.ethz.ch/education-students/lectures/ros.html', desc: 'Best free ROS course from ETH Zurich' },
  { title: 'Articulated Robotics YouTube', type: 'Video', phase: 5, topic: 'Career', url: 'https://www.youtube.com/@ArticulatedRobotics', desc: 'Best YouTube channel for practical ROS2 projects' },
  { title: 'ROS Discourse Community', type: 'Community', phase: 5, topic: 'Career', url: 'https://discourse.ros.org', desc: 'Official ROS community — maintainers answer questions' },
  { title: 'Robotics Stack Exchange', type: 'Community', phase: 5, topic: 'Career', url: 'https://robotics.stackexchange.com', desc: 'Build reputation by answering robotics questions' },
];

const TOPICS = ['All', 'Math', 'Linux', 'Kinematics', 'Control', 'ROS2', 'Vision', 'Sensors', 'Simulation', 'Hardware', 'Specialization', 'Career', 'Community'];
const TYPE_COLORS = { Video: 'badge-orange', Book: 'badge-amber', Course: 'badge-steel', Docs: 'badge-green', Tool: 'badge-purple', Community: 'badge-muted' };

export default function Resources() {
  const [phase, setPhase] = useState('All');
  const [topic, setTopic] = useState('All');
  const [read, setRead] = useState({});

  const filtered = RESOURCES.filter(r =>
    (phase === 'All' || r.phase === Number(phase)) &&
    (topic === 'All' || r.topic === topic)
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">📚 The Library</h1>
        <p className="page-subtitle">{RESOURCES.length} curated resources • Filtered by phase and topic</p>
      </div>

      {/* Phase filter */}
      <div className="card" style={{ marginBottom: 20, padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {['All', '0', '1', '2', '3', '4', '5'].map(p => (
            <button key={p} onClick={() => setPhase(p)} className={`btn btn-sm ${phase === p ? 'btn-primary' : 'btn-ghost'}`} style={{ fontSize: '0.75rem', padding: '4px 12px' }}>
              {p === 'All' ? 'All Phases' : `Phase ${p}`}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TOPICS.map(t => (
            <button key={t} onClick={() => setTopic(t)} className={`btn btn-sm ${topic === t ? 'btn-steel' : 'btn-ghost'}`} style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {filtered.map((r, i) => (
          <div key={i} className="resource-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }}>
              <a href={r.url} target="_blank" rel="noreferrer"
                style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>
                {r.title}
              </a>
              <a href={r.url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-icon" style={{ flexShrink: 0 }}>
                <ExternalLink size={13} />
              </a>
            </div>
            <p style={{ fontSize: '0.8rem', marginBottom: 10 }}>{r.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span className={`badge ${TYPE_COLORS[r.type] || 'badge-muted'}`}>{r.type}</span>
              <span className={`badge badge-phase-${r.phase}`}>Phase {r.phase}</span>
              <span className="badge badge-muted">{r.topic}</span>
              <button onClick={() => setRead(rd => ({ ...rd, [i]: !rd[i] }))}
                className={`btn btn-sm ${read[i] ? 'btn-success' : 'btn-ghost'}`}
                style={{ marginLeft: 'auto', fontSize: '0.65rem', padding: '2px 8px' }}>
                {read[i] ? '✓ Done' : 'Mark Read'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          <BookOpen size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
          <div>No resources match this filter combination.</div>
        </div>
      )}
    </div>
  );
}
