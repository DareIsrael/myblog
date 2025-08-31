// filepath: [Home.jsx](http://_vscodecontentref_/3)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import styles from "./Home.module.css"; // Import CSS Module

const Home = () => {
  const [homeNews, setHomeNews] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchHomeNews = async (isInitialLoad = false) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "MyBlog"),
        orderBy("timestamp", "desc"),
        limit(10),
        ...(lastVisible ? [startAfter(lastVisible)] : [])
      );
      const snapshot = await getDocs(q);
      const newsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHomeNews(prev => (isInitialLoad ? newsList : [...prev, ...newsList]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeNews(true);
  }, []);

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Latest News</h1>
      <div className={styles.homeGrid}>
        {homeNews.map((news) => (
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
        <button className={styles.loadMore} onClick={() => fetchHomeNews(false)}>Load More</button>
      )}
    </div>
  );
};

export default Home;