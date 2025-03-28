import "./SuccessLogin.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccessLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/resume"); // Редирект на главную страницу
    }, 5000);

    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, [navigate]);
  return (
    <div className="successLoginPage">
      <div className="successMessageForm">you have successfully logined</div>
    </div>
  );
}

export default SuccessLogin;
