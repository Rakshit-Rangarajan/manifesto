import projectOrbBot from "@/assets/project-orbbot.png";
import projectSanjana from "@/assets/project-underconstruction.png";
import projectSayCymraeg from "@/assets/project-saycymraeg.png";
import projectForgeFit from "@/assets/project-forgefit.png";
// import projectAgroFresh from "@/assets/project-agrofresh.jpg";

export const personalInfo = {
  name: "Rakshit Rangarajan",
  role: "Software Engineer | Full-Stack Developer",
  tagline:
    "Building innovative, secure web applications with a passion for AI and automation.",
  email: "rakshitr2000@gmail.com",
  phone: "+44 78236 40897",
  location: "Cardiff, UK / Bengaluru, India",
  github: "https://github.com/Rakshit-Rangarajan",
  linkedin: "https://www.linkedin.com/in/rakshit-rangarajan-2084b2211/",
};

export const projects = [
  {
    id: 1,
    title: "OrbBot",
    description:
      "A drop-in AI chat widget for any website, featuring Pinecone RAG and zero-config deployment without the need for a backend or API keys.",
    problem:
      "Website owners needed a simple way to add a document-aware AI chatbot without managing complex backends, databases, or API key billing.",
    solution:
      "Built a fully customizable, embeddable widget that utilizes Puter.js for native AI capabilities and Pinecone for Retrieval-Augmented Generation, easily integrated via a simple script tag.",
    tech: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "#888888" },
      { name: "Puter.js", icon: "/logos/puter.png", color: "#9333EA" },
      { name: "Pinecone", icon: "/logos/pinecone.png", color: "#888888" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" }
    ],
    github: "https://github.com/Rakshit-Rangarajan/Orb-Bot",
    live: "https://orb-bot.rakshitr.co.in",
    image: projectOrbBot,
  },
  {
    id: 2,
    title: "Say Cymraeg",
    description:
      "A Welsh language learning web app powered by AI, designed to be accessible for all ages with personalized learning paths.",
    problem:
      "Welsh learners lacked an intuitive, AI-powered tool that could adapt to individual learning paces and provide interactive language practice.",
    solution:
      "Built an easy-to-use web app with an AI assistant powered by Ollama that tailors lessons to each learner's pace, with Firebase for real-time data sync.",
    tech: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "#888888" },
      { name: "Ollama", icon: "/logos/ollama.png", color: "#999999" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" },
      { name: "Firestore", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" }
    ],
    github: "https://github.com/Rakshit-Rangarajan/SayCymraeg",
    live: "https://saycymraeg.rakshitr.co.in",
    image: projectSayCymraeg,
  },
  {
    id: 3,
    title: "ForgeFit",
    description:
      "A privacy-focused, self-hostable AI training application designed to help users generate dynamic workout plans and track fitness progress.",
    problem:
      "Fitness enthusiasts wanted a personalized, AI-driven personal trainer without paying for expensive monthly subscriptions or sacrificing their personal health data.",
    solution:
      "Developed a containerized, self-hosted web app where users can deploy their own local AI fitness assistant to optimize routines and track physical metrics securely.",
    tech: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "#888888" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "#2496ED" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", color: "#339933" },
      { name: "Ollama", icon: "/logos/ollama.png", color: "#999999" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", color: "#47A248" }
    ],
    github: "https://github.com/Rakshit-Rangarajan/ForgeFit",
    live: "https://forgefit.rakshitr.co.in",
    image: projectForgeFit,
  },
  {
    id: 4,
    title: "Sanjana",
    description:
      "A cross-platform AI Assistant that works seamlessly across devices, leveraging local and cloud-based LLMs for intelligent task automation.",
    problem:
      "Users needed a versatile AI assistant that could work across platforms without being locked into a single ecosystem or cloud provider.",
    solution:
      "Building a cross-platform assistant integrating Ollama for local inference and Claude for cloud-based reasoning, with SQL-backed persistent memory.",
    tech: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", color: "#4479A1" },
      { name: "Ollama", icon: "/logos/ollama.png", color: "#999999" },
      { name: "Claude", icon: "/logos/openai.png", color: "#D97757" },
      { name: "PyCharm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg", color: "#21D789" }
    ],
    github: "https://github.com/Rakshit-Rangarajan/Sanjana",
    live: "https://sanjana.rakshitr.co.in",
    image: projectSanjana,
  },
  {
    id: 5,
    title: "Rakshantara",
    description:
      "An AI-powered digital journaling app with blog publishing, personal journals, and dream journals — all enhanced with Gemini AI.",
    problem:
      "People wanted a unified journaling platform that combined personal reflection, dream logging, and public blogging with AI-powered insights.",
    solution:
      "Developed a cross-platform app with Gemini API integration for AI-assisted writing, Firebase authentication, and separate sections for blogs, journals, and dream entries.",
    tech: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "#888888" },
      { name: "Gemini API", icon: "/logos/gemini.png", color: "#8E24AA" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" },
      { name: "Firestore", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" }
    ],
    github: "https://github.com/Rakshit-Rangarajan/Rakshantara",
    // image: projectRakshantara,
  },
  {
    id: 6,
    title: "Agro-Fresh Organics",
    description:
      "An e-commerce platform connecting farmers directly with wholesalers and consumers for farm-fresh produce.",
    problem:
      "Farmers lacked a direct-to-consumer platform to sell their produce, relying on middlemen that reduced their profit margins.",
    solution:
      "Built an easy-to-use e-commerce website enabling farmers to list produce and buyers to purchase fresh commodities directly, with PHP/MySQL backend.",
    tech: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", color: "#777BB4" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", color: "#4479A1" }
    ],
    github: "https://github.com/Rakshit-Rangarajan/Agro-Fresh-Organics",
    // image: projectAgroFresh,
  },
];

export const skills = {
  frontend: [
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg", color: "#DD0031" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "#888888" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  ],
  backend: [
    { name: ".NET Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg", color: "#512BD4" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", color: "#777BB4" },
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", color: "#4479A1" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", color: "#47A248" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", color: "#9B4F96" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", color: "#007396" },
  ],
  ai: [
    { name: "Camunda", icon: "/logos/camunda.png", color: "#f16d45" },
    { name: "Power Automate", icon: "/logos/power-automate.png", color: "#0066FF" },
    { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg", color: "#af2929" },
    { name: "n8n", icon: "/logos/n8n.png", color: "#E54060" },
    { name: "Firebase Auto", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" },
    { name: "Cursor", icon: "/logos/cursor.png", color: "#888888" },
    { name: "GitHub Copilot", icon: "/logos/copilot.png", color: "#888888" },
    { name: "V0.dev", icon: "/logos/v0.png", color: "#888888" },
    { name: "Ollama", icon: "/logos/ollama.png", color: "#999999" },
    { name: "Gemini", icon: "/logos/gemini.png", color: "#8E24AA" },
    { name: "Llama 3", icon: "/logos/llama.png", color: "#0668E1" },
    { name: "Qwen", icon: "/logos/qwen.png", color: "#615EEA" },
    { name: "GPT / OpenAI", icon: "/logos/openai.png", color: "#10A37F" },
  ],
  tools: [
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", color: "#007ACC" },
    { name: "Visual Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg", color: "#5C2D91" },
    { name: "Jira", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg", color: "#0052CC" },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", color: "#007FFF" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", color: "#326CE5" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "#FFCA28" },
    { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg", color: "#3DDC84" },
    { name: "Bootstrap Studio", icon: "/logos/bootstrap-studio.png", color: "#7952B3" },
    { name: "Wix", icon: "/logos/wix.png", color: "#999999" },
    { name: "Google Antigravity", icon: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/component.svg", color: "#6366F1" },
  ],
};

export const experience = [
  {
    id: 1,
    role: "Software Engineer (Full-Stack Developer)",
    company: "BrandMuscle India Pvt Ltd (Acquired by Ansira in 2024)",
    period: "Apr 2022 - Jun 2024",
    description: [
      "Managed and optimized database operations (MongoDB) and developed console applications for efficient data retrieval and reporting, reducing report generation time by 80%",
      "Developed automation workflows using Power Automate and Azure Data Factory to streamline data fetching and reporting",
      "Enhanced application security by resolving 50+ critical vulnerabilities flagged by SonarQube and Snyk, achieving 100% compliance score",
      "Designed, tested, and automated complex workflows using Camunda and JAMS for reliable execution of critical business processes",
      "Led application upgrades including Formio, Angular, and .NET frameworks, improving performance and maintainability",
      "Spearheaded GitHub Copilot integration across the team, training 15 engineers and increasing coding efficiency by 10%",
    ],
  },
];

export const education = [
  {
    degree: "Master of Science in Artificial Intelligence",
    institution: "Cardiff University (Prifysgol Caerdydd)",
    location: "Cardiff, UK",
    period: "Sep 2024 - Sep 2025",
  },
  {
    degree: "Bachelor of Engineering, Information Science and Engineering",
    institution: "Rajeev Institute of Technology (VTU)",
    location: "Hassan, India",
    period: "Jun 2018 - Aug 2022",
  },
];

export const aboutText = `A results-oriented Software Engineer with over two years of experience in full-stack development, recently graduated with an MSc in Artificial Intelligence at Cardiff University with Merit. Passionate about applying expertise in AI, building innovative and secure web applications, and driving automation in challenging software engineering roles.`;

export const aboutHighlights = [
  {
    icon: "🏆",
    label: "AI Hackathon",
    value: "2nd Runner-up at Cardiff University AI Hackathon with AMPLYFI",
  },
  {
    icon: "👨‍🏫",
    label: "Mentorship",
    value: "Delivered workshops on Web Development, Python, QA Testing & Generative AI",
  },
  {
    icon: "🔒",
    label: "Security",
    value: "Resolved 50+ critical vulnerabilities, 100% compliance",
  },
  {
    icon: "🤖",
    label: "AI Advocate",
    value: "Led GitHub Copilot adoption for 15 engineers",
  },
];
