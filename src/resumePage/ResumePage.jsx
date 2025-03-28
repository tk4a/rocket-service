import {
  Code2,
  Database,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  Terminal,
} from "lucide-react";
import "./ResumePage.css";

function ResumePage() {
  return (
    <div className="resumePage">
      <header className="resumeHeader">
        <div className="resumeImageWrapper">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
            alt="Programming background"
            className="resumeImage"
            style={{ opacity: 0.1 }}
          />
        </div>
        <div className="resumeContent">
          <h1 className="resumeTitle">Artem Tkachev</h1>
          <p className="resumeSubtitle">Java Software Engineer</p>
          <div className="buttonGroup">
            <a href="#" className="navLink">
              <Github size={24} />
            </a>
            <a href="#" className="navLink">
              <Linkedin size={24} />
            </a>
            <a href="mailto:contact@example.com" className="navLink">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </header>

      <section className="skills">
        <h2 className="sskillsTitle">Technical Skills</h2>
        <div className="skillsGrid">
          <SkillCard
            icon={<Code2 size={32} />}
            title="Frontend Development"
            skills={["React"]}
          />
          <SkillCard
            icon={<Database size={32} />}
            title="Backend Development"
            skills={["Java", "Kotlin", "PostgreSQL", "SpringBoot"]}
          />
          <SkillCard
            icon={<Terminal size={32} />}
            title="DevOps"
            skills={["Docker", "K8S", "CI/CD", "Linux", "Jenkins"]}
          />
          <SkillCard
            icon={<Globe size={32} />}
            title="Other Skills"
            skills={["Git", "Agile", "REST APIs", "CamundaBPM"]}
          />
        </div>
      </section>

      <section className="expirience">
        <h2 className="sexpirienceTitle">Expirience</h2>
        <div className="expirienceGrid">
          <ExpirianceCard
            title="VTB mobile bank"
            description="A full-stack e-commerce solution built with React, Node.js, and PostgreSQL"
            image="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000"
          />
          <ExpirianceCard
            title="Open bank"
            description="Real-time task management application using React and Firebase"
            image="https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1000"
          />
          <ExpirianceCard
            title="Sber"
            description="Modern chat interface with AI integration using TypeScript and OpenAI"
            image="https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1000"
          />
        </div>
      </section>

      <section className="contact">
        <h2 className="contactTitle">Let's Connect</h2>
        <p className="contactSubtitle">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        <a href="mailto:contact@example.com" className="contactButton">
          <Mail className="mailIcon" size={20} />
          Get in Touch
        </a>
      </section>

      <footer className="footer">
        <div className="footerContainer">
          <p>© 2024 John Developer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function SkillCard({ icon, title, skills }) {
  return (
    <div className="skillCard">
      <div className="skillIcon">{icon}</div>
      <h3 className="skillTitle">{title}</h3>
      <ul className="skillList">
        {skills.map((skill, index) => (
          <li key={index} className="skillItem">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpirianceCard({ title, description, image, link }) {
  return (
    <div className="expirianceCard">
      <img src={image} alt={title} className="expirianceImage" />
      <div className="expirianceContent">
        <h3 className="expirianceTitle">{title}</h3>
        <p className="expirianceDescription">{description}</p>
      </div>
    </div>
  );
}

export default ResumePage;
