import React from "react";
import { Document, Page, Text, View, StyleSheet, Svg, Path, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#000000",
  },
  header: {
    marginBottom: 12,
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563eb",
    letterSpacing: 2.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 16,
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    width: "100%",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 9,
    color: "#1e3a8a",
    textDecoration: "none",
    marginLeft: 6,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitleContainer: {
    borderTopWidth: 2,
    borderTopColor: "#2563eb",
    borderBottomWidth: 1.5,
    borderBottomColor: "#2563eb",
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#2563eb",
    letterSpacing: 1,
  },
  summary: {
    fontSize: 9.5,
    color: "#374151",
    textAlign: "justify",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
  },
  jobDate: {
    fontSize: 9.5,
    color: "#4b5563",
  },
  company: {
    fontSize: 9.5,
    color: "#2563eb",
    marginBottom: 3,
  },
  bulletPointContainer: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
    fontSize: 9.5,
    color: "#374151",
  },
  bulletPointText: {
    flex: 1,
    fontSize: 9.5,
    color: "#374151",
    textAlign: "justify",
    lineHeight: 1.5,
  },
  skillRow: {
    marginBottom: 4,
  },
  skillCategoryTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 2,
  },
  skillList: {
    fontSize: 9.5,
    color: "#374151",
    lineHeight: 1.4,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
  },
  projectTech: {
    fontSize: 9,
    color: "#2563eb",
    marginBottom: 1,
  },
  projectDesc: {
    fontSize: 9.5,
    color: "#374151",
    textAlign: "justify",
    marginBottom: 6,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
  },
  educationSchool: {
    fontSize: 9.5,
    color: "#2563eb",
  },
  educationGrade: {
    fontSize: 9.5,
    color: "#4b5563",
    marginTop: 1,
  },
  educationBlock: {
    marginBottom: 8,
  }
});

const MailIcon = () => (
  <Svg viewBox="0 0 24 24" width="10" height="10">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#e83e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 6l-10 7L2 6" fill="none" stroke="#e83e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg viewBox="0 0 24 24" width="10" height="10">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const WhatsAppIcon = () => (
  <Svg viewBox="0 0 24 24" width="10" height="10">
    <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GithubIcon = () => (
  <Svg viewBox="0 0 24 24" width="10" height="10">
    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LinkedinIcon = () => (
  <Svg viewBox="0 0 24 24" width="10" height="10">
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 9h4v12H2z" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const WebIcon = () => (
  <Svg viewBox="0 0 24 24" width="10" height="10">
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#374151" />
  </Svg>
);

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionTitleContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bulletPointContainer}>
    <Text style={styles.bulletPoint}>•</Text>
    <Text style={styles.bulletPointText}>{children}</Text>
  </View>
);

const ATSResumePDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>RAKSHIT RANGARAJAN</Text>
          <Text style={styles.title}>Full-Stack Developer | AI Enthusiast | Software Engineer</Text>
        </View>

        <View style={styles.contactContainer}>
          <View style={styles.contactRow}>
            <MailIcon />
            <Link style={styles.contactText} src="mailto:rakshitr2000@gmail.com">rakshitr2000@gmail.com</Link>
          </View>
          <View style={styles.contactRow}>
            <WhatsAppIcon />
            <Link style={styles.contactText} src="https://wa.me/447823640897">+44 78236 40897</Link>
            <Text style={{ fontSize: 9, color: "#9ca3af", marginHorizontal: 4 }}>|</Text>
            <PhoneIcon />
            <Link style={styles.contactText} src="tel:+918217630327">+91 82176 30327</Link>
          </View>
          <View style={styles.contactRow}>
            <GithubIcon />
            <Link style={styles.contactText} src="https://github.com/Rakshit-Rangarajan">https://github.com/Rakshit-Rangarajan</Link>
          </View>
          <View style={styles.contactRow}>
            <LinkedinIcon />
            <Link style={styles.contactText} src="https://www.linkedin.com/in/rakshit-rangarajan/">https://www.linkedin.com/in/rakshit-rangarajan/</Link>
          </View>
          <View style={styles.contactRow}>
            <WebIcon />
            <Link style={styles.contactText} src="https://rakshitr.co.in">https://rakshitr.co.in</Link>
          </View>
        </View>

        <View style={{ marginBottom: 12 }} />

        <View style={styles.section}>
          <SectionHeader title="PROFESSIONAL SUMMARY" />
          <Text style={styles.summary}>
            Results-oriented Full-Stack Developer with over 2 years of experience in building enterprise-grade web applications. Recently completed MSc in Artificial Intelligence at Cardiff University with Merit. Skilled in leveraging AI tools to automate workflows, optimize development processes, and enhance application security. Passionate about building innovative, scalable solutions that combine cutting-edge AI with practical application development.
          </Text>
        </View>

        <View style={styles.section}>
          <SectionHeader title="PROFESSIONAL EXPERIENCE" />

          <View style={{ marginBottom: 10 }}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>Software Engineer (Full-Stack Developer)</Text>
              <Text style={styles.jobDate}>Apr 2022 - Jun 2024</Text>
            </View>
            <Text style={styles.company}>BrandMuscle India Pvt Ltd (Acquired by Ansira in 2024)</Text>

            <BulletPoint>Managed and optimized MongoDB database operations, developing console applications for efficient data retrieval and reporting, reducing report generation time by 80%</BulletPoint>
            <BulletPoint>Developed automation workflows using Power Automate and Azure Data Factory to streamline data fetching and reporting processes</BulletPoint>
            <BulletPoint>Enhanced application security by resolving 50+ critical vulnerabilities flagged by SonarQube and Snyk, achieving 100% security compliance score</BulletPoint>
            <BulletPoint>Designed, tested, and automated complex business workflows using Camunda and JAMS for reliable execution of critical processes</BulletPoint>
            <BulletPoint>Designed and tested complex Stored Procedures in MySQL</BulletPoint>
            <BulletPoint>Led application upgrades including Formio, Angular, and .NET frameworks, improving performance and maintainability</BulletPoint>
            <BulletPoint>Spearheaded GitHub Copilot integration across the team, training 15 engineers and increasing coding efficiency by 10%</BulletPoint>
            <BulletPoint>Enhanced Fund Management Product by designing and developing various Pages and Functionality like Rewards, Bulk Claim Submission and wrote Unit Test cases for every API call and UI component added.</BulletPoint>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="TECHNICAL SKILLS" />

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.skillCategoryTitle}>Frontend:</Text>
            <Text style={styles.skillList}>React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap, Angular</Text>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.skillCategoryTitle}>Backend:</Text>
            <Text style={styles.skillList}>Node.js, Python, .NET, C#, PHP, Java, SQL, MongoDB, REST APIs</Text>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.skillCategoryTitle}>AI and Automation:</Text>
            <Text style={styles.skillList}>Cursor, Claude, ChatGPT, Gemini, Perplexity, Ollama, Pinecone, n8n, Power Automate, Camunda, Selenium</Text>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.skillCategoryTitle}>Tools and Platforms:</Text>
            <Text style={styles.skillList}>VS Code, Git, Docker, Kubernetes, Azure, Firebase, Figma, Jira</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="PROJECTS" />

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.projectTitle}>OrbBot - AI Chat Widget</Text>
            <Text style={styles.projectTech}>React, Next.js, Pinecone, Puter.js</Text>
            <Text style={styles.projectDesc}>Drop-in AI chat widget for any website featuring Pinecone RAG and zero-config deployment without backend or API keys.</Text>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.projectTitle}>Say Cymraeg - Welsh Language Learning App</Text>
            <Text style={styles.projectTech}>Next.js, Ollama, Firebase, Bootstrap</Text>
            <Text style={styles.projectDesc}>AI-powered Welsh language learning platform with personalized learning paths. Deployed with 500+ active learners and 40% retention improvement.</Text>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={styles.projectTitle}>ForgeFit - AI Fitness Trainer</Text>
            <Text style={styles.projectTech}>Next.js, Docker, Node.js, Ollama, MongoDB</Text>
            <Text style={styles.projectDesc}>Privacy-focused, self-hostable AI training application for dynamic workout plans and fitness progress tracking.</Text>
          </View>

          <View>
            <Text style={styles.projectTitle}>Rakshantara - AI Journaling App</Text>
            <Text style={styles.projectTech}>Next.js, Gemini API, Firebase</Text>
            <Text style={styles.projectDesc}>AI-powered digital journaling app with blog publishing, personal journals, and dream journals enhanced with Gemini AI.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="EDUCATION" />

          <View style={styles.educationBlock}>
            <View style={styles.jobHeader}>
              <Text style={styles.educationDegree}>Master of Science in Artificial Intelligence</Text>
              <Text style={styles.educationGrade}>2024-2025</Text>
            </View>
            <Text style={styles.educationSchool}>Cardiff University, UK</Text>
            <Text style={styles.educationGrade}>Merit</Text>
          </View>

          <View style={styles.educationBlock}>
            <View style={styles.jobHeader}>
              <Text style={styles.educationDegree}>Bachelor of Engineering in Information Science</Text>
              <Text style={styles.educationGrade}>2018-2022</Text>
            </View>
            <Text style={styles.educationSchool}>Rajeev Institute of Technology (VTU), India</Text>
            <Text style={styles.educationGrade}>First Class</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="ACHIEVEMENTS" />
          <BulletPoint>2nd Runner-up at Cardiff University AI Hackathon with AMPLYFI</BulletPoint>
          <BulletPoint>Resolved 50+ critical vulnerabilities, achieving 100% security compliance</BulletPoint>
          <BulletPoint>Led GitHub Copilot adoption for 15+ engineers with documented 10% velocity increase</BulletPoint>
          <BulletPoint>Delivered workshops on Web Development, Python, QA Testing, and Generative AI</BulletPoint>
          <BulletPoint>Part of the core Technical Team and GLUG during Bachelor's</BulletPoint>
        </View>
      </Page>
    </Document>
  );
};

export default ATSResumePDF;