import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaArrowsAltV } from 'react-icons/fa'; // Import icons
import '../ScrollToTop/ScrollToTop.css';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-btn">
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export const ScrollToBottom = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 10) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-bottom">
      {isVisible && (
        <button onClick={scrollToBottom} className="scroll-to-bottom-btn">
          <FaArrowDown />
        </button>
      )}
    </div>
  );
};

export const ScrollToHalf = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight / 2) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const scrollToHalf = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight / 2,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-half">
      {isVisible && (
        <button onClick={scrollToHalf} className="scroll-to-half-btn">
          <FaArrowsAltV />
        </button>
      )}
    </div>
  );
};
