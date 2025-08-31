// import React, { useState } from 'react';
// import './Navbar.css';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">Gistplus</div>
//       <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
//         <a href="/">Home</a>
//         <a href="/entertainment">Entertainment</a>
//         <a href="/jobs">Jobs</a>
//         <a href="/education">Education</a>
//         <a href="/sport">Properties</a>
//         <a href="/daily-tips">Daily Travel & Scholarships Tips</a>
//         <a href="/religion">Religion</a>
//         <a href="/politics">Politics</a>
//       </div>
//       <div className="navbar-toggle" onClick={toggleMenu}>
//         <span className="bar"></span>
//         <span className="bar"></span>
//         <span className="bar"></span>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import styles from './Navbar.module.css'; // Changed to CSS Module

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside (optional enhancement)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
      <span>Gist</span>
      <span>plus</span>
      </div>
      
      <div className={`${styles.navbarLinks} ${isOpen ? styles.open : ''}`}>
        <a href="/" className={styles.navbarLink} onClick={closeMenu}>Home</a>
        <a href="/entertainment" className={styles.navbarLink} onClick={closeMenu}>Entertainments</a>
        <a href="/jobs" className={styles.navbarLink} onClick={closeMenu}>Jobs</a>
        <a href="/education" className={styles.navbarLink} onClick={closeMenu}>Education</a>
        <a href="/properties" className={styles.navbarLink} onClick={closeMenu}>Apartment</a>
        <a href="/daily-tips" className={styles.navbarLink} onClick={closeMenu}>Daily Travel & Scholarships Tips</a>
        <a href="/religion" className={styles.navbarLink} onClick={closeMenu}>Religion</a>
        <a href="/politics" className={styles.navbarLink} onClick={closeMenu}>News</a>
      </div>
      
      <div 
        className={`${styles.navbarToggle} ${isOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </nav>
  );
};

export default Navbar;