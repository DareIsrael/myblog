// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // Import useParams to get the news ID
// import { db } from "../../firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import styles from "./NewsDetails.module.css";

// const NewsDetails = () => {
//   const { id } = useParams(); // Get the news ID from the URL
//   const [news, setNews] = useState(null);

//   useEffect(() => {
//     const fetchNewsDetails = async () => {
//       try {
//         const docRef = doc(db, "MyBlog", id); // Reference the specific document
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setNews(docSnap.data());
//         } else {
//           console.error("No such document!");
//         }
//       } catch (err) {
//         console.error("Error fetching news details:", err);
//       }
//     };

//     fetchNewsDetails();
//   }, [id]);

//   return (
//     <div className={styles.newsDetailsPage}>
//       {news ? (
//         <>
//           <h1 className={styles.headline}>{news.headline}</h1>
//           <p className={styles.timestamp}>
//             {news.timestamp?.seconds
//               ? new Date(news.timestamp.seconds * 1000).toLocaleDateString()
//               : "No Date Available"}
//           </p>
//           <img
//             src={news.imageURL}
//             alt={news.headline}
//             className={styles.image}
//           />
//           <p className={styles.content}>{news.content}</p>
         
//            {news.videoURL && (
//            <video className={styles.video} controls>
//            <source src={news.videoURL} type="video/mp4" />
//            Your browser does not support the video tag.
//            </video>
// )}
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default NewsDetails;

import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styles from "./NewsDetails.module.css";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const docRef = doc(db, "MyBlog", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setNews(docSnap.data());
        } else {
          setError("News article not found");
          console.error("No such document!");
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

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return <div className={styles.loading}>Loading news article...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.newsDetailsPage}>
          <button className={styles.backButton} onClick={handleGoBack}>
            <span className={styles.backArrow}>←</span>
            Back
          </button>
      {news ? (
        <>
          <div className={styles.newsHeader}>
            <h1 className={styles.headline}>{news.headline}</h1>
            <p className={styles.timestamp}>
              {news.timestamp?.seconds
                ? new Date(news.timestamp.seconds * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
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

          <div className={styles.newsBody}>
            <div className={styles.content}>
              {news.content}
            </div>
          </div>

          {news.videoURL && (
            <div className={styles.videoContainer}>
              <video className={styles.video} controls preload="metadata">
                <source src={news.videoURL} type="video/mp4" />
                <source src={news.videoURL} type="video/webm" />
                <source src={news.videoURL} type="video/ogg" />
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

export default NewsDetails;