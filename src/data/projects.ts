export type Project = {
  num: string;
  name: string;
  slug: string;
  desc: string;
  fullDesc: string;
  overview?: string;
  challenges?: string;
  keyFeatures?: string[];
  media?: string[];
  stack: string[];
  github?: string;
  marker?: string;
};

export const currentProject: Project = {
  num: "CURRENT",
  name: "SKYCAST",
  slug: "skycast",
  desc: "High-fidelity weather application with dynamic video backgrounds and real-time insights.",
  fullDesc: "SkyCast is a premium weather application featuring a dynamic video background system that responds to real-time meteorological data. It includes a sophisticated dashboard with editorial-grade typography, staggered entrance animations, and an actionable 'Insights' panel that derives weather advice directly from API forecast data.",
  stack: ["Next.js", "TypeScript", "React", "Framer Motion", "Weather API"],
  github: "https://github.com/Christophermathai/SkyCast",
};

export const projects: Project[] = [
  {
    num: "PROJECT 01",
    name: "ATTENDX",
    slug: "attendx",
    desc: "AI-powered facial recognition attendance system. Live face detection removes manual roll-call.",
    fullDesc: "ATTENDX is an AI-powered facial recognition attendance system that eliminates manual roll-call through live face detection. It features a robust admin dashboard with automated low-attendance flags, real-time analytics, and secure data storage. The frontend is built with React and deployed on Vercel, integrating seamlessly with a Python/Flask backend and OpenCV for high-accuracy recognition.",
    stack: ["Python", "Flask", "OpenCV", "React", "SQLite", "Vercel"],
    github: "https://github.com/Christophermathai/AttendX",
  },
  {
    num: "PROJECT 02",
    name: "IELTS SPEAKING APP",
    slug: "ielts-speaking-app",
    desc: "Full-stack voice practice platform with real-time transcription and automated IELTS scoring.",
    fullDesc: "A comprehensive full-stack voice practice platform tailored for IELTS candidates. It leverages Google Cloud Speech-to-Text for real-time transcription and employs automated scoring algorithms to evaluate fluency, vocabulary, and grammar. The application guides users through multi-part question sessions and provides instant, detailed analytics to track improvement over time.",
    stack: ["Next.js", "TypeScript", "Google Cloud STT", "REST API"],
    github: "https://github.com/Christophermathai/ILETS-Speaking-Tester",
  },
  {
    num: "PROJECT 03",
    name: "COLLAB LIBRARY",
    slug: "collab-library",
    desc: "AI-powered academic platform for document sharing, summarization, and translation.",
    fullDesc: "The Collaborative Online Library is a digital platform designed for college students to share and access academic resources like eBooks, notes, and research papers. It features advanced document categorization, AI-powered summarization, translation, MCQ generation, and voice-to-text capabilities. It also includes role-based access control and real-time search with admin analytics.",
    stack: ["Django", "Python", "JavaScript", "AI/ML", "REST API"],
    github: "https://github.com/Christophermathai/Collaborative-Online-Libary-",
  },
  {
    num: "PROJECT 04",
    name: "EV SALES ANALYSIS",
    slug: "ev-sales-analysis",
    desc: "Multi-year analysis of India's electric vehicle adoption trends across states.",
    fullDesc: "A comprehensive data analysis project examining India's electric vehicle adoption trends over multiple years across various states and vehicle classes. By processing raw government datasets, the project produced industry-ready visualizations and actionable policy insights, highlighting growth patterns, regional disparities, and market penetration.",
    stack: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    github: "https://github.com/Christophermathai/Electric-Vehicle-Sales-by-State-in-India-Data-Analysis",
  },
  {
    num: "PROJECT 05",
    name: "GYMEASE",
    slug: "gymease",
    marker: "IN PRODUCTION",
    desc: "Comprehensive gym management system currently deployed in production.",
    fullDesc: "GymEase is a comprehensive, production-ready gym management system built with Next.js and SQLite. It features secure authentication, role-based access for owners and trainers, and real-time dashboard analytics. The platform handles member management, fee plans, subscription tracking, and payment records with full audit logging. It is currently deployed and actively used in gyms.",
    stack: ["Next.js", "TypeScript", "React", "SQLite", "Tailwind CSS"],
    github: "https://github.com/Christophermathai/Gym-Managend-system---GymEase",
  },
  {
    num: "PROJECT 06",
    name: "COCA‑COLA STOCK PREDICTOR",
    slug: "coca-cola-stock-predictor",
    desc: "ML pipeline forecasting stock prices via technical indicators and feature engineering.",
    fullDesc: "A data science project that analyzes and predicts Coca-Cola stock prices using Python and machine learning. It encompasses end-to-end data cleaning, exploratory visualizations, and the calculation of technical indicators. The pipeline compares multiple Scikit-learn regressors, evaluating them with strict metrics, and includes live data updates for real-time forecasting.",
    stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter Notebook"],
    github: "https://github.com/Christophermathai/Coca-Cola-Stock--Live-and-Updated-Data-Science-Project-",
  },
  {
    num: "PROJECT 07",
    name: "DISASTERRES-NET",
    slug: "disasterres-net",
    desc: "Deep learning model utilizing ResNet architecture for disaster detection and response.",
    fullDesc: "DisasterRes-Net is an AI-driven project focused on disaster response and management. Utilizing advanced deep learning techniques, specifically the ResNet architecture, the system is designed to analyze imagery and data to detect and assess natural disasters in real-time, aiding emergency services in coordinating faster and more effective responses.",
    stack: ["Python", "Deep Learning", "ResNet", "Computer Vision"],
    github: "https://github.com/jeswintom22/DisasterRes-Net",
  },
  {
    num: "PROJECT 08",
    name: "COVID CLINICAL TRIALS",
    slug: "covid-clinical-trials",
    desc: "End-to-end analysis of global COVID-19 clinical trials using Python and Tableau.",
    fullDesc: "An end-to-end analysis of global COVID-19 clinical trials to extract meaningful trends and insights. The project involved rigorous data cleaning and trend analysis segmented by country, phase, and intervention type. Python was used for data processing, while Tableau was utilized to create interactive visualizations and a final comprehensive summary.",
    stack: ["Python", "Tableau", "Data Analysis", "Pandas"],
    github: "https://github.com/Christophermathai/covid-clinical-trials-analysis",
  },
  {
    num: "PROJECT 09",
    name: "WEB THREAT ANALYSIS",
    slug: "web-threat-analysis",
    desc: "Cybersecurity tool using deep learning for real-time web threat detection.",
    fullDesc: "Web-Threat-Analysis is a robust cybersecurity tool that leverages deep learning to detect web-based threats. It features a real-time monitoring system and utilizes Pandas, Seaborn, and Matplotlib for extensive data visualization. Built primarily with Python, it serves as a powerful utility for cybersecurity research and threat analysis.",
    stack: ["Python", "Deep Learning", "Pandas", "Cybersecurity"],
    github: "https://github.com/Christophermathai/Web-Threat-Analysis",
  },
];
