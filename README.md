# 🤖 RoboPath

**Robotics & Automation Engineering — Career Roadmap & Dashboard**

RoboPath is an interactive, encrypted dashboard built to track your 24-month journey from foundational robotics to becoming a Chief Roboticist. It features an industrial "Mission Control" aesthetic, focusing on actionable steps across hardware, simulation, software, and real-world deployment.

> *"Automation is not the enemy of employment — it's the engine of it. The people who build it will never be replaced by it."*

---

## 🚀 Features

- **Encrypted Local Storage**: All your progress, journal entries, and income logs are encrypted using Web Crypto AES-GCM-256. Your data never leaves your machine.
- **Mission Control Dashboard**: Track your overall progress, upcoming tasks, daily quizzes, and recently completed achievements.
- **Interactive Roadmap**: A 5-phase structured path covering Math/Linux, ROS2/Navigation, Gazebo/Simulation, Hardware/micro-ROS, and Career Specialization.
- **Project Forge**: Manage portfolio projects with a kanban-style pipeline (Blueprint → Dev → Testing → Shipped).
- **Hardware BOM Tracker**: Plan robot builds, track component costs, calculate total weight, and log assembly progress.
- **Sim Lab**: Document your Gazebo and Isaac Sim runs, track real-time factors (RTF), FPS, and Nav2 configurations.
- **Engineering Notebook**: Keep detailed, taggable logs of your robotics sessions, complete with pre-made templates for ROS2, hardware, and simulation work.
- **Revenue Streams**: Track income from freelance gigs, consulting, and project builds, complete with industry-standard rate cards.

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with a bespoke "Industrial Orange" dark mode design system (CSS Variables, Flexbox/Grid, Glassmorphism).
- **Security**: Native Browser Web Crypto API (AES-GCM encryption, PBKDF2 key derivation, SHA-256).

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Neo-0013/RoboPath.git
   cd RoboPath/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5174/`).

---

## 🔒 Security & Data Privacy

RoboPath is a fully client-side application. When you set your "Master Password" on the first run, it is used to derive a strong encryption key. 
- **Data Location**: Your encrypted data is stored in your browser's `localStorage`. 
- **Encryption Algorithm**: AES-GCM-256.
- **No Cloud Sync**: There are no external databases or telemetry. If you forget your Master Password, your data cannot be recovered.

## 📂 Project Structure

- `app/src/etc/`: Constants and configuration arrays (quizzes, etc.).
- `app/src/var/`: Data definitions and encrypted cipher logic (`roadmap.js`, `projects.js`, `bom.js`, `cipher.js`).
- `app/src/proc/`: Core context providers (`AppContext.jsx` for global state and encryption pipeline).
- `app/src/usr/`: UI components and pages (Dashboard, Projects, Hardware, Sim Lab, etc.).
- `app/src/index.css`: The master stylesheet and design system tokens.

---

*Built with precision for the next generation of automation engineers.*
