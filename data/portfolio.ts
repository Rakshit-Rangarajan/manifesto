// import projectSanjana from "@/assets/project-sanjana.jpg";
// import projectSayCymraeg from "@/assets/project-saycymraeg.jpg";
// import projectRakshantara from "@/assets/project-rakshantara.jpg";
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
    title: "Sanjana",
    description:
      "A cross-platform AI Assistant that works seamlessly across devices, leveraging local and cloud-based LLMs for intelligent task automation.",
    problem:
      "Users needed a versatile AI assistant that could work across platforms without being locked into a single ecosystem or cloud provider.",
    solution:
      "Building a cross-platform assistant integrating Ollama for local inference and Claude for cloud-based reasoning, with SQL-backed persistent memory.",
    tech: ["Python", "SQL", "Ollama", "Claude", "PyCharm"],
    github: "https://github.com/Rakshit-Rangarajan",
    // image: projectSanjana,
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
    tech: ["Next.js", "Ollama", "HTML", "Bootstrap", "Firebase", "Firestore"],
    github: "https://github.com/Rakshit-Rangarajan",
    // image: projectSayCymraeg,
  },
  {
    id: 3,
    title: "Rakshantara",
    description:
      "An AI-powered digital journaling app with blog publishing, personal journals, and dream journals — all enhanced with Gemini AI.",
    problem:
      "People wanted a unified journaling platform that combined personal reflection, dream logging, and public blogging with AI-powered insights.",
    solution:
      "Developed a cross-platform app with Gemini API integration for AI-assisted writing, Firebase authentication, and separate sections for blogs, journals, and dream entries.",
    tech: [
      "Next.js",
      "Gemini API",
      "HTML",
      "Bootstrap",
      "Firebase",
      "Firestore",
    ],
    github: "https://github.com/Rakshit-Rangarajan",
    // image: projectRakshantara,
  },
  {
    id: 4,
    title: "Agro-Fresh Organics",
    description:
      "An e-commerce platform connecting farmers directly with wholesalers and consumers for farm-fresh produce.",
    problem:
      "Farmers lacked a direct-to-consumer platform to sell their produce, relying on middlemen that reduced their profit margins.",
    solution:
      "Built an easy-to-use e-commerce website enabling farmers to list produce and buyers to purchase fresh commodities directly, with PHP/MySQL backend.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
    // image: projectAgroFresh,
  },
];

export const skills = {
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "Bootstrap",
    "Angular",
    "Next.js",
    "React",
  ],
  backend: [".NET Framework", "PHP", "SQL", "MongoDB", "Python", "C#", "Java"],
  ai: [
    "Camunda",
    "Power Automate",
    "Selenium",
    "n8n",
    "Firebase Automation",
    "Cursor",
    "GitHub Copilot",
    "V0.dev",
  ],
  tools: [
    "VS Code",
    "Visual Studio",
    "Jira",
    "Azure",
    "Kubernetes",
    "Firebase",
    "Android Studio",
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
    value: "Delivered workshops on Python, QA Testing & Generative AI",
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
