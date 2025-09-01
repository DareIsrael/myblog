import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import styles from "./Entertainment.module.css";

const Entertainment = () => {
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEntertainmentNews = async (isInitialLoad = false) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Entertainment"),
        orderBy("timestamp", "desc"),
        limit(12),
        ...(lastVisible ? [startAfter(lastVisible)] : [])
      );
      const snapshot = await getDocs(q);
      const newsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntertainmentNews(prev => (isInitialLoad ? newsList : [...prev, ...newsList]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      console.error("Error fetching entertainment news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntertainmentNews(true);
  }, []);

  const handleNewsClick = (newsId) => {
    navigate(`/entertainment/${newsId}`);
  };

  return (
    <div className={styles.entertainmentContainer}>
      <h1 className={styles.entertainmentTitle}>Entertainment News</h1>
      <div className={styles.entertainmentGrid}>
        {entertainmentNews.map((news) => (
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
        <button className={styles.loadMore} onClick={() => fetchEntertainmentNews(false)}>Load More</button>
      )}
    </div>
  );
};

export default Entertainment;