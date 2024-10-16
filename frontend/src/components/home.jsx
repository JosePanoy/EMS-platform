import React, { useState } from "react";
import "../assets/css/homepage.css";
import { Link } from 'react-router-dom';


import RightLogo from "../assets/img/administrator.png";
import FBlogo from "../assets/img/socmed logo/facebook.png";
import INSTAlogo from "../assets/img/socmed logo/instagram.png";
import GMAILlogo from "../assets/img/socmed logo/gmail.png";
import LINKEDINlogo from "../assets/img/socmed logo/linkedin.png";
import FAQlogo from "../assets/img/faq.png";
import EmployeeSlider from "./employee-slider-option";

function HomePage() {
  const [isFaqModalOpen, setFaqModalOpen] = useState(false);
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);

  const handleFaqClick = () => {
    setFaqModalOpen(true);
  };

  const handleMenuClick = () => {
    setMenuModalOpen(true);
  };

  const closeModal = () => {
    setFaqModalOpen(false);
    setMenuModalOpen(false);
  };

  return (
    <>
      <div className="main-body">
        <div className="home-left-panel">
          <div className="right-img-caption">
            <img className="rightLogo" src={RightLogo} alt="" />
            <h1>Transform Your Employee Experience</h1>
            <h3>
              Revolutionize the way you manage your workforce with intuitive tools designed for modern businesses. From onboarding to performance reviews, our system streamlines every aspect of employee management, making your job easier and more efficient.
            </h3>
            <div className="socmedLogo">
              <img src={FBlogo} alt="" />
              <img src={INSTAlogo} alt="" />
              <img src={GMAILlogo} alt="" />
              <img src={LINKEDINlogo} alt="" />
            </div>
          </div>
        </div>

        <div className="home-right-panel">
          <div className="right-panel-navbar">
            <img
              src={FAQlogo}
              alt=""
              className="nav-icon"
              onClick={handleFaqClick}
            />
            <div className="menu-button" onClick={handleMenuClick}>
              <div></div>
            </div>
          </div>
          <EmployeeSlider />
        </div>
      </div>

      {isFaqModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="faq-modal" onClick={(e) => e.stopPropagation()}>
            <h2>FAQ </h2>
            <p>Click the left and right arrow to navigate what type of employee you are🤗.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {isMenuModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Menu Options</h2>
            <Link to="/tempsignin" style={{textDecoration: 'none', color: '#00887A', fontSize: '0.8rem'}}>Temp Sign In</Link>
            <p>Pending Feature.... 🤔🤫</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
