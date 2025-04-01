import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbarContent">
        <div className="navbarSiteLabel">
          <Link to="/" className="toWelcomePage">
            Rocket-service
          </Link>
        </div>
        <div className="navbarMenu">
          <Link to="/" className="toWelcomePage">
            Home
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="toLoginPagePage">
              Login
            </Link>
          )}
          <Link to="/resume" className="toResumePage">
            Resume
          </Link>
          <Link to="/fill-resume" className="toFillResume">
            Fill-Resume
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
