import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1 className={styles.contactTitle}>Get in Touch</h1>
        <p className={styles.contactSubtitle}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.contactInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📧</span>
            <div>
              <h3>Email</h3>
              <p>contact@infoconnect.com</p>
            </div>
          </div>
          
          {/* <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📞</span>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
           */}
          {/* <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📍</span>
            <div>
              <h3>Address</h3>
              <p>123 News Street, Media City<br />Digital State, 10001</p>
            </div>
          </div> */}
          
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>🕒</span>
            <div>
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9AM - 6PM<br />Weekend: 10AM - 4PM</p>
            </div>
          </div>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.formInput}
              required
              placeholder="What is this regarding?"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.formTextarea}
              required
              placeholder="Type your message here..."
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>

      {/* <div className={styles.socialSection}>
        <h2 className={styles.socialTitle}>Follow Us On Social Media</h2>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
          <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
          <a href="#" className={styles.socialLink} aria-label="Instagram">📷</a>
          <a href="#" className={styles.socialLink} aria-label="LinkedIn">💼</a>
          <a href="#" className={styles.socialLink} aria-label="YouTube">📺</a>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;