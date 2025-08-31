import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styles from "./RDetails.module.css"; // Updated to CSS Module

const RDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const docRef = doc(db, "Religion", id); // Changed to Religion collection
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setNews(docSnap.data());
        } else {
          setError("News article not found");
        }
      } catch (err) {
        setError("Error loading news article");
        console.error("Error fetching news details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading news article...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.newsDetailsPage}>
      {news ? (
        <>
          <div className={styles.newsHeader}>
            <h1 className={styles.headline}>{news.headline}</h1>
            <p className={styles.timestamp}>
              {news.timestamp?.seconds
                ? new Date(news.timestamp.seconds * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : "No Date Available"}
            </p>
          </div>

          {news.imageURL && (
            <img
              src={news.imageURL}
              alt={news.headline}
              className={styles.image}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          <div className={styles.content}>
            <p>{news.content}</p>
          </div>

          {news.videoURL && (
            <div className={styles.videoContainer}>
              <video className={styles.video} controls preload="metadata">
                <source src={news.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </>
      ) : (
        <div className={styles.error}>News article not found</div>
      )}
    </div>
  );
};

export default RDetails;