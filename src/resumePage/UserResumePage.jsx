import { useEffect, useState } from "react";
import axios from "axios";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Database,
  Terminal,
  Globe,
  Pencil,
} from "lucide-react";
import "./UserResumePage.css";

function UserResumePage() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [firstName, setFirstName] = useState("FirstName");
  const [lastName, setLastName] = useState("LastName");
  const [position, setPosition] = useState("Developer");

  const [formData, setFormData] = useState({
    firstName: "FirstName",
    lastName: "LastName",
    position: "Position",
    email: "contact@example.com",
    github: "",
    linkedin: "",
    skills: ["React", "Java", "Kotlin", "SpringBoot"],
    experience: [
      {
        title: "VTB mobile bank",
        description: "Worked on mobile banking solutions.",
      },
      { title: "Open bank", description: "Built financial services backend." },
    ],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/resume/arteemtkacheev@gmail.com", {
        headers: { Authorization: `Bearer TOKEN` },
      })
      .then((response) => {
        const data = response.data;

        console.log("RESPONSE: " + JSON.stringify(data, null, 2));

        setFormData({
          firstName: data.firstName || "FirstName",
          lastName: data.lastName || "LastName",
          email: data.email || "contact@example.com",
          position: data.position || "Developer",
        });
      })
      .catch((error) => {
        console.error(
          "Error while do request for get resume data from server",
          error
        );
        setError("Some error happend, please try again later..");
      });
  }, []);

  return (
    <div className="resumePage">
      <header className="resumeHeader">
        <div className="resumeImageWrapper"></div>
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
          alt="Programming background"
          className="resumeImage"
          style={{ opacity: 0.1 }}
        />
        {/* FirstName and LastName */}
        {isEditingName ? (
          <div className="centeredNameContainer">
            <div className="editNameContainer">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                autoFocus
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                autoFocus
                onBlur={() => setIsEditingName(false)}
              />
              <button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, firstName, lastName }));
                  setIsEditingName(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="resumeContent">
            <h1 className="resumeTitle">
              {formData.firstName} {formData.lastName}
              <div
                className="editNameIcon"
                onClick={() => setIsEditingName(true)}
              >
                <Pencil size={16} />
              </div>
            </h1>
          </div>
        )}
        {/* Position */}
        {isEditingPosition ? (
          <div className="resumeSubtitle editPositionContainer">
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Your position"
              autoFocus
              className="editPositionInput"
              onBlur={() => setIsEditingPosition(false)}
            />
            <button
              className="savePositionButton"
              onClick={() => {
                setFormData((prev) => ({ ...prev, position }));
                setIsEditingPosition(false);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="resumeSubtitle">
            <p>{formData.position}</p>
            <div
              className="editPositionIcon"
              onClick={() => setIsEditingPosition(true)}
            >
              <Pencil size={16} />
            </div>
          </div>
        )}
      </header>
    </div>
  );

  // const [resume, setResume] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     window.location.href = "/login";
  //     return;
  //   }
  //   axios
  //     .get("http://localhost:8080/resume", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       setResume(response.data);
  //     })
  //     .catch(() => {
  //       console.error("Failed to fetch resume");
  //     })
  //     .finally(() => setLoading(false));
  // }, [token]);

  // if (loading) return <p>Loading...</p>;
  // if (!resume) return <p>No resume data found</p>;

  // return (
  //   <div className="resumePage">
  //     <header className="resumeHeader">
  //       <div className="resumeImageWrapper">
  //         <img src={resume.image} alt="Profile" className="resumeImage" style={{ opacity: 0.1 }} />
  //       </div>
  //       <div className="resumeContent">
  //         <h1 className="resumeTitle">{resume.name}</h1>
  //         <p className="resumeSubtitle">{resume.position}</p>
  //         <div className="buttonGroup">
  //           <a href={resume.github} className="navLink">
  //             <Github size={24} />
  //           </a>
  //           <a href={resume.linkedin} className="navLink">
  //             <Linkedin size={24} />
  //           </a>
  //           <a href={`mailto:${resume.email}`} className="navLink">
  //             <Mail size={24} />
  //           </a>
  //         </div>
  //       </div>
  //     </header>

  //     <section className="skills">
  //       <h2 className="skillsTitle">Technical Skills</h2>
  //       <div className="skillsGrid">
  //         {resume.skills.map((skill, index) => (
  //           <SkillCard key={index} icon={<Code2 size={32} />} title={skill.category} skills={skill.items} />
  //         ))}
  //       </div>
  //     </section>

  //     <section className="experience">
  //       <h2 className="experienceTitle">Experience</h2>
  //       <div className="experienceGrid">
  //         {resume.experience.map((exp, index) => (
  //           <ExperienceCard key={index} title={exp.title} description={exp.description} image={exp.image} />
  //         ))}
  //       </div>
  //     </section>
  //   </div>
  // );
}

// function SkillCard({ icon, title, skills }) {
//   return (
//     <div className="skillCard">
//       <div className="skillIcon">{icon}</div>
//       <h3 className="skillTitle">{title}</h3>
//       <ul className="skillList">
//         {skills.map((skill, index) => (
//           <li key={index} className="skillItem">{skill}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function ExperienceCard({ title, description, image }) {
//   return (
//     <div className="experienceCard">
//       <img src={image} alt={title} className="experienceImage" />
//       <div className="experienceContent">
//         <h3 className="experienceTitle">{title}</h3>
//         <p className="experienceDescription">{description}</p>
//       </div>
//     </div>
//   );
// }

export default UserResumePage;
