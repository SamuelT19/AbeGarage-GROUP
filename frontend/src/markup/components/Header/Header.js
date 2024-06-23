import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/g3logo.png";
import loginService from "../../../services/login.service";
import { useAuth } from "../../../Contexts/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const { isAdmin, isLogged, setIsLogged, employee } = useAuth();

  const logOut = () => {
    loginService.logOut();
    setIsLogged(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`main-header header-style-one ${
        isScrolled ? "fixed-header" : ""
      }`}
    >
      <div className="header-top">
        <div className="auto-container">
          <div className="inner-container">
            <div className="left-column">
              <div className="text">
                Quality service and expert care for your vehicle
              </div>
              <div className="office-hour">
                Monday - Saturday 7:00AM - 6:00PM
              </div>
            </div>
            <div className="right-column">
              {isLogged ? (
                <div className="link-btn">
                  <div className="phone-number">
                    <strong>Welcome :){employee?.employee_first_name}</strong>
                  </div>
                </div>
              ) : (
                <div className="phone-number">
                  Schedule Appointment: <strong>+251713829204</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-upper">
        <div className="auto-container">
          <div className="inner-container">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="right-column">
              <div className="nav-outer">
                <button className="navbar-toggler" onClick={toggleMenu}>
                  <div className="navbar-toggler-icon">
                    <MenuIcon className="navbar-icon" />
                  </div>
                </button>
                <ul
                  className={`navigation ${isOpen && isMobile ? "show" : ""}`}
                >
                  <button className="close-btn" onClick={toggleMenu}>
                    <CloseIcon className="navbar-icon" />
                  </button>
                  <li className="dropdown">
                    <Link to="/" onClick={handleMenuClick}>
                      Home
                    </Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/about" onClick={handleMenuClick}>
                      About Us
                    </Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/services" onClick={handleMenuClick}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={handleMenuClick}>
                      Contact Us
                    </Link>
                  </li>
                  {isLogged && isAdmin && (
                    <li>
                      <Link to="/admin" onClick={handleMenuClick}>
                        Admin
                      </Link>
                    </li>
                  )}
                  {isLogged && isMobile && (
                    <li>
                      <Link
                        className=""
                        onClick={() => {
                          logOut();
                          handleMenuClick();
                        }}
                        to="/"
                      >
                        Log Out
                      </Link>
                    </li>
                  )}
                  {!isLogged && isMobile && (
                    <li>
                      <Link to="/login" className="" onClick={handleMenuClick}>
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="link-btn">
                {isLogged ? (
                  <Link
                    to="/"
                    className="theme-btn btn-style-one blue"
                    onClick={logOut}
                  >
                    Log out
                  </Link>
                ) : (
                  <Link to="/login" className="theme-btn btn-style-one">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
