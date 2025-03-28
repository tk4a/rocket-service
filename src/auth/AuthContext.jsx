import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Функция для входа
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // Функция для выхода
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
  };

  // Запуск таймера logout после входа
  useEffect(() => {
    if (isAuthenticated) {
      const logoutTimer = setTimeout(() => {
        logout();
      }, 3 * 60 * 1000); // 3 минуты

      return () => clearTimeout(logoutTimer); // Очистка таймера при размонтировании
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
