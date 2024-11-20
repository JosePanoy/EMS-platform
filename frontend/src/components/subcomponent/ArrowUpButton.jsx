import React, { useState, useEffect } from "react";
import ArrowUpIcon from "../../assets/img/arrow-up.png";
import "../../assets/css/subcomponent-css/ArrowUpButton.css";

function ArrowUpButton() {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {showScrollButton && (
                <div className="arrow-up-button-container">
                    <button
                        className="arrow-up-button"
                        onClick={handleBackToTop}
                    >
                        <img src={ArrowUpIcon} alt="Back to Top" className="arrow-up-icon" />
                    </button>
                </div>
            )}
        </>
    );
}

export default ArrowUpButton;
