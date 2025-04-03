import { useEffect, useRef, useState } from "react";
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

{
  /* Page with real data from server and posobilities to edit profile */
}
function UserResumePage() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);

  const defaultLinks = [
    { type: "GitHub", value: "http://github.com" },
    { type: "LinkedIn", value: "http://linkedin.com" },
    { type: "Mail", value: "contact@example.com" },
  ];

  const containerRef = useRef(null);
  const saveButtonRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "FirstName",
    lastName: "LastName",
    position: "Position",
    email: "contact@example.com",
    links: [
      { type: "GitHub", value: "http://github.com" },
      { type: "LinkedIn", value: "http://linkedin.com" },
      { type: "Mail", value: "contact@example.com" },
    ],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/resume/arteemtkacheev@gmail.com", {
        headers: { Authorization: `Bearer TOKEN` },
      })
      .then((response) => {
        const data = response.data;
        setFormData({
          firstName: data.firstName || "FirstName",
          lastName: data.lastName || "LastName",
          email: data.email || "contact@example.com",
          position: data.position || "Developer",
          links: data.links || defaultLinks,
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

  // Функция для отправки PUT-запроса
  const handleSave = () => {
    axios
      .put(
        `http://localhost:8081/resume/update/${formData.email}`, // Указываем email для обновления конкретного резюме
        formData, // Отправляем все данные формы
        {
          headers: { Authorization: `Bearer TOKEN` },
        }
      )
      .then((response) => {
        console.log("Data saved:", response.data);
        setIsEditingName(false); // Закрыть форму редактирования имени
        setIsEditingLinks(false); // Закрыть форму редактирования ссылок
      })
      .catch((error) => {
        console.error("Error while saving resume data:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Если клик внутри формы, ничего не делаем
      if (
        (containerRef.current && containerRef.current.contains(event.target)) ||
        (saveButtonRef.current && saveButtonRef.current.contains(event.target))
      ) {
        return;
      }
      // // Закрываем форму, если клик был снаружи
      if (isEditingName || isEditingPosition || isEditingLinks) {
        handleSave();
        setIsEditingName(false);
        setIsEditingPosition(false);
        setIsEditingLinks(false);
      }
    };

    // Используем setTimeout, чтобы подождать завершения рендера
    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formData, isEditingName, isEditingPosition, isEditingLinks]);

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
            <div className="editNameContainer" ref={containerRef}>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                placeholder="First Name"
                autoFocus
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                placeholder="Last Name"
              />
              <button>Save</button>
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
              value={formData.position}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, position: e.target.value }))
              }
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

        {/* Link section */}
        <div className="buttonGroup">
          {isEditingLinks ? (
            // Режим редактирования (показываем инпуты)
            <div className="editLinkContainer" ref={containerRef}>
              {(formData.links ?? defaultLinks).map((link, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={link.value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        links: (prev.links ?? defaultLinks).map((l, i) =>
                          i === index ? { ...l, value: e.target.value } : l
                        ),
                      }))
                    }
                    className="editLinkInput"
                  />
                </div>
              ))}
              <button className="saveLinkButton" onClick={handleSave}>
                ✔
              </button>
            </div>
          ) : (
            // Обычный режим (показываем ссылки)
            <>
              {formData.links && Array.isArray(formData.links) ? (
                <>
                  {formData.links?.map((link, index) => (
                    <a
                      key={index}
                      href={
                        link.type === "Mail"
                          ? `mailto:${link.value}`
                          : link.value
                      }
                      className="navLink"
                    >
                      {link.type === "GitHub" && <Github size={24} />}
                      {link.type === "LinkedIn" && <Linkedin size={24} />}
                      {link.type === "Mail" && <Mail size={24} />}
                    </a>
                  ))}
                  {/* Один карандаш на все ссылки */}
                  <div
                    className="editLinkIcon"
                    onClick={() => setIsEditingLinks(true)}
                  >
                    <Pencil size={16} />
                  </div>
                </>
              ) : (
                <div
                  className="editLinkIcon"
                  onClick={() => setIsEditingLinks(true)}
                >
                  <a href={`mailto:${formData.email}`} className="navLink">
                    <Mail size={24} />
                  </a>
                  <Pencil size={16} />
                </div> // Можно показать заглушку, если links пустой
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default UserResumePage;
