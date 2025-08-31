// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
// import styles from "./Education.module.css";

// const Education = () => {
//   const [educationNews, setEducationNews] = useState([]);
//   const [lastVisible, setLastVisible] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchEducationNews = async (isInitialLoad = false) => {
//     setLoading(true);
//     try {
//       const q = query(
//         collection(db, "Education"),
//         orderBy("timestamp", "desc"),
//         limit(10),
//         ...(lastVisible ? [startAfter(lastVisible)] : [])
//       );
//       const snapshot = await getDocs(q);
//       const newsList = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setEducationNews(prev => (isInitialLoad ? newsList : [...prev, ...newsList]));
//       setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
//     } catch (err) {
//       console.error("Error fetching education news:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEducationNews(true);
//   }, []);

//   const handleNewsClick = (newsId) => {
//     navigate(`/education/${newsId}`);
//   };

//   return (
//     <div className={styles.education}>
//   <h1 className={styles.educationTitle}>Education News</h1>
//   <div className={styles.educationGrid}>
//     {educationNews.map((news) => (
//       <div
//         className={styles.newsItem}
//         key={news.id}
//         onClick={() => handleNewsClick(news.id)}
//       >
//         <img
//           src={news.imageURL}
//           alt={news.headline}
//           loading="lazy"
//         />
//         <div className={styles.newsDetails}>
//           <h3>{news.headline}</h3>
//           <p>
//             {news.timestamp?.seconds
//               ? new Date(news.timestamp.seconds * 1000).toLocaleDateString()
//               : "No Date Available"}
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>
//   {loading && <p>Loading...</p>}
//   {!loading && lastVisible && (
//     <button onClick={() => fetchEducationNews(false)}>Load More</button>
//   )}
// </div>

//   );
// };

// export default Education;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import styles from "./Education.module.css";

const Education = () => {
  const [educationNews, setEducationNews] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEducationNews = async (isInitialLoad = false) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Education"),
        orderBy("timestamp", "desc"),
        limit(10),
        ...(lastVisible ? [startAfter(lastVisible)] : [])
      );
      const snapshot = await getDocs(q);
      const newsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEducationNews(prev => (isInitialLoad ? newsList : [...prev, ...newsList]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      console.error("Error fetching education news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationNews(true);
  }, []);

  const handleNewsClick = (newsId) => {
    navigate(`/education/${newsId}`);
  };

  return (
    <div className={styles.educationContainer}>
      <h1 className={styles.educationTitle}>Education News</h1>
      <div className={styles.educationGrid}>
        {educationNews.map((news) => (
          <div
            className={styles.newsItem}
            key={news.id}
            onClick={() => handleNewsClick(news.id)}
          >
            <img
              className={styles.newsItemImg}
              src={news.imageURL}
              alt={news.headline}
              loading="lazy"
            />
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
      {loading && <p className={styles.loading}>Loading...</p>}
      {!loading && lastVisible && (
        <button className={styles.loadMore} onClick={() => fetchEducationNews(false)}>Load More</button>
      )}
    </div>
  );
};

export default Education;