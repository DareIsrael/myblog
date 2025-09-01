import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <h1 className={styles.aboutTitle}>About InfoConnect</h1>
        <p className={styles.aboutSubtitle}>
          Your comprehensive platform for news, entertainment, opportunities, and lifestyle. 
          Everything you need to stay informed and empowered in one place.
        </p>
      </div>

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Your Complete Information Hub</h2>
          <p className={styles.heroText}>
            InfoConnect is more than just a news platform - we're your one-stop destination for 
            all aspects of modern life. From breaking news to apartment hunting, career opportunities 
            to travel tips, we bring you comprehensive coverage across all essential categories.
          </p>
          <p className={styles.heroText}>
            Founded with the vision to simplify information access, we curate and create content 
            that matters to your daily life, helping you make informed decisions and stay ahead 
            of the curve in an ever-changing world.
          </p>
        </div>
        <div className={styles.heroImage}>IC</div>
      </div>

      <div className={styles.missionSection}>
        <h2 className={styles.missionTitle}>Our Mission</h2>
        <p className={styles.missionText}>
          To empower individuals with comprehensive, accurate, and timely information across all 
          aspects of life - from current affairs and entertainment to education, career opportunities, 
          real estate, travel, and personal development. We believe in making quality information 
          accessible to everyone.
        </p>
      </div>

      <div className={styles.categoriesGrid}>
        <div className={`${styles.categoryCard} ${styles.categoryNews}`}>
          <div className={styles.categoryIcon}>📰</div>
          <h3 className={styles.categoryTitle}>News & Politics</h3>
          <p className={styles.categoryDescription}>
            Stay updated with breaking news, political developments, and current affairs from around the world
          </p>
        </div>
        
        <div className={`${styles.categoryCard} ${styles.categoryEntertainment}`}>
          <div className={styles.categoryIcon}>🎬</div>
          <h3 className={styles.categoryTitle}>Entertainment</h3>
          <p className={styles.categoryDescription}>
            Latest movies, music, celebrity news, and pop culture updates to keep you entertained
          </p>
        </div>
        
        <div className={`${styles.categoryCard} ${styles.categoryJobs}`}>
          <div className={styles.categoryIcon}>💼</div>
          <h3 className={styles.categoryTitle}>Jobs & Career</h3>
          <p className={styles.categoryDescription}>
            Career opportunities, job market insights, and professional development resources
          </p>
        </div>
        
        <div className={`${styles.categoryCard} ${styles.categoryEducation}`}>
          <div className={styles.categoryIcon}>🎓</div>
          <h3 className={styles.categoryTitle}>Education</h3>
          <p className={styles.categoryDescription}>
            Educational resources, learning opportunities, and academic news for students and professionals
          </p>
        </div>
        
        <div className={`${styles.categoryCard} ${styles.categoryProperties}`}>
          <div className={styles.categoryIcon}>🏠</div>
          <h3 className={styles.categoryTitle}>Apartment & Properties</h3>
          <p className={styles.categoryDescription}>
            Comprehensive real estate listings, rental opportunities, and property investment guidance
          </p>
        </div>
        
        <div className={`${styles.categoryCard} ${styles.categoryTravel}`}>
          <div className={styles.categoryIcon}>✈️</div>
          <h3 className={styles.categoryTitle}>Travel & Scholarships</h3>
          <p className={styles.categoryDescription}>
            Daily travel tips, destination guides, and scholarship opportunities for students and travelers
          </p>
        </div>
        
        <div className={`${styles.categoryCard} ${styles.categoryReligion}`}>
          <div className={styles.categoryIcon}>🙏</div>
          <h3 className={styles.categoryTitle}>Religion</h3>
          <p className={styles.categoryDescription}>
            Spiritual guidance, religious news, and interfaith dialogue for diverse belief systems
          </p>
        </div>
        
        <div className={`${styles.categoryCard} ${styles.categoryPolitics}`}>
          <div className={styles.categoryIcon}>🏛️</div>
          <h3 className={styles.categoryTitle}>Politics</h3>
          <p className={styles.categoryDescription}>
            In-depth political analysis, election coverage, and government policy updates
          </p>
        </div>
      </div>

      <div className={styles.teamSection}>
        <h2 className={styles.teamTitle}>Our Commitment</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>AC</div>
            <h3 className={styles.memberName}>Accuracy</h3>
            <p className={styles.memberRole}>Fact-checked content</p>
          </div>
          
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>TP</div>
            <h3 className={styles.memberName}>Timeliness</h3>
            <p className={styles.memberRole}>Real-time updates</p>
          </div>
          
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>DV</div>
            <h3 className={styles.memberName}>Diversity</h3>
            <p className={styles.memberRole}>Inclusive coverage</p>
          </div>
          
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>IQ</div>
            <h3 className={styles.memberName}>Quality</h3>
            <p className={styles.memberRole}>Premium content</p>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Join Our Community</h2>
        <p className={styles.ctaText}>
          Stay informed across all aspects of life. Subscribe to get updates on news, 
          apartments, jobs, education, and much more delivered to you.
        </p>
        <button className={styles.ctaButton}>Subscribe Now</button>
      </div>
    </div>
  );
};

export default About;