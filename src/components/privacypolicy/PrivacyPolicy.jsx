import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyContainer}>
      <div className={styles.privacyHeader}>
        <h1 className={styles.privacyTitle}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: December 12, 2024</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Introduction</h2>
        <div className={styles.sectionContent}>
          <p>Welcome to Gistplus. We respect your privacy and are committed to protecting any information you choose to share with us. This Privacy Policy explains how we handle your information when you visit our blog.</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
        <div className={styles.sectionContent}>
          <p><strong className={styles.highlight}>Information You Provide:</strong> When you contact us through our contact form, we collect:</p>
          <ul>
            <li>Your name</li>
            <li>Email address</li>
            <li>Any message you choose to send us</li>
          </ul>
          
          <p><strong className={styles.highlight}>Automatically Collected Information:</strong> Like most websites, we automatically collect:</p>
          <ul>
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website (if applicable)</li>
          </ul>
          <p>This information is used for analytics and to improve our website's performance.</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
        <div className={styles.sectionContent}>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to your inquiries and messages</li>
            <li>Improve our blog content and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Ensure the security and proper functioning of our website</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Data Sharing</h2>
        <div className={styles.sectionContent}>
          <p>We do not sell, trade, or rent your personal information to others. We may share information only:</p>
          <ul>
            <li>When required by law or legal process</li>
            <li>To protect our rights or the safety of others</li>
            <li>With service providers who help us operate our website (who are bound by confidentiality agreements)</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Cookies & Tracking</h2>
        <div className={styles.sectionContent}>
          <p>We use minimal cookies only for essential website functionality. We do not use tracking cookies for advertising or extensive analytics.</p>
          <p>You can control cookies through your browser settings if you prefer to limit them.</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Data Retention</h2>
        <div className={styles.sectionContent}>
          <p>We retain contact form submissions for as long as necessary to respond to your inquiry and for our records. Automatically collected data is typically stored for a short period for analytical purposes.</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Your Rights</h2>
        <div className={styles.sectionContent}>
          <p>You have the right to:</p>
          <ul>
            <li>Ask what personal data we hold about you</li>
            <li>Request correction of any inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Withdraw any previously given consent</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Children's Privacy</h2>
        <div className={styles.sectionContent}>
          <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children.</p>
        </div>
      </div>

      <div className={styles.contactInfo}>
        <h3 className={styles.contactTitle}>Contact Us</h3>
        <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:</p>
        <p><strong>Email:</strong> privacy@gistplus.com</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>9. Changes to This Policy</h2>
        <div className={styles.sectionContent}>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;