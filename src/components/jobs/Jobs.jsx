import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import styles from "./Jobs.module.css"; // Changed to CSS Module

const Jobs = () => {
  const [jobsNews, setJobsNews] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchJobsNews = async (isInitialLoad = false) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Jobs"),
        orderBy("timestamp", "desc"),
        limit(10),
        ...(lastVisible ? [startAfter(lastVisible)] : [])
      );
      const snapshot = await getDocs(q);
      const newsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobsNews(prev => (isInitialLoad ? newsList : [...prev, ...newsList]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      console.error("Error fetching jobs news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsNews(true);
  }, []);

  const handleNewsClick = (newsId) => {
    navigate(`/jobs/${newsId}`);
  };

  return (
    <div className={styles.jobsContainer}>
      <h1 className={styles.jobsTitle}>Jobs News</h1>
      <div className={styles.jobsGrid}>
        {jobsNews.map((news) => (
          <div
            className={styles.newsItem}
            key={news.id}
            onClick={() => handleNewsClick(news.id)}
          >
            <img className={styles.newsItemImg} src={news.imageURL} alt={news.headline} loading="lazy" />
            <div className={styles.newsDetails}>
              <h3 className={styles.newsHeadline}>{news.headline}</h3>
              <p className={styles.newsTimestamp}>
                {news.timestamp?.seconds
                  ? new Date(news.timestamp.seconds * 1000).toLocaleDateString()
                  : "No Date Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && lastVisible && (
        <button className={styles.loadMore} onClick={() => fetchJobsNews(false)}>Load More</button>
      )}
    </div>
  );
};

export default Jobs;