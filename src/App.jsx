import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./nav/Navbar";
import MainPage from "./mainPage/MainPage";
import LoginPage from "./loginPage/LoginPage";
import ResumePage from "./resumePage/ResumePage";
import { useState } from "react";
import SuccessSignUp from "./loginPage/SuccessSignUp";
import { AuthProvider } from "./auth/AuthContext";
import SuccessLogin from "./loginPage/SuccessLogin";
import ErrorSignUp from "./loginPage/ErrorSignUp";
import ErrorLogin from "./loginPage/ErrorLogin";
import ErrorPageCommon from "./loginPage/ErrorPageCommon";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <div>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            {!isAuthenticated && (
              <Route path="/login" element={<LoginPage />} />
            )}
            {isAuthenticated && (
              <Route path="/login" element={<Navigate to="/" />} />
            )}
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/success-sign-up" element={<SuccessSignUp />} />
            <Route path="/success-login" element={<SuccessLogin />} />
            <Route path="/error-sign-up" element={<ErrorSignUp />} />
            <Route path="/error-login" element={<ErrorLogin />} />
            <Route path="/error-page" element={<ErrorPageCommon />} />
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
