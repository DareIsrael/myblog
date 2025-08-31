import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import styles from "./DailyTips.module.css"; // Changed to CSS Module

const DailyTips = () => {
  const [dailyTipsNews, setDailyTipsNews] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDailyTipsNews = async (isInitialLoad = false) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "DailyTips"),
        orderBy("timestamp", "desc"),
        limit(10),
        ...(lastVisible ? [startAfter(lastVisible)] : [])
      );
      const snapshot = await getDocs(q);
      const newsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDailyTipsNews(prev => (isInitialLoad ? newsList : [...prev, ...newsList]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      console.error("Error fetching daily tips news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyTipsNews(true);
  }, []);

  const handleNewsClick = (newsId) => {
    navigate(`/daily-tips/${newsId}`);
  };

  return (
    <div className={styles.dailyTipsContainer}>
      <h1 className={styles.dailyTipsTitle}>Daily Travel & Scholarships Tips</h1>
      <div className={styles.dailyTipsGrid}>
        {dailyTipsNews.map((news) => (
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
        <button className={styles.loadMore} onClick={() => fetchDailyTipsNews(false)}>Load More</button>
      )}
    </div>
  );
};

export default DailyTips;