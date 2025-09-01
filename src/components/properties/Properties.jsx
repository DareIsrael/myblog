import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import styles from "./Properties.module.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const navigate = useNavigate();

  const fetchProperties = async (isInitialLoad = false, locationFilter = selectedLocation) => {
    setLoading(true);
    try {
      let q;
      if (locationFilter === "All") {
        q = query(
          collection(db, "Properties"),
          orderBy("timestamp", "desc"),
          limit(12),
          ...(lastVisible && !isInitialLoad ? [startAfter(lastVisible)] : [])
        );
      } else {
        q = query(
          collection(db, "Properties"),
          where("location", "==", locationFilter),
          orderBy("timestamp", "desc"),
          limit(12),
          ...(lastVisible && !isInitialLoad ? [startAfter(lastVisible)] : [])
        );
      }

      const snapshot = await getDocs(q);
      const propertiesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (isInitialLoad) {
        setProperties(propertiesList);
      } else {
        setProperties(prev => [...prev, ...propertiesList]);
      }
      
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllLocations = async () => {
    try {
      const q = query(collection(db, "Properties"));
      const snapshot = await getDocs(q);
      const locations = [...new Set(snapshot.docs.map(doc => doc.data().location).filter(Boolean))];
      setUniqueLocations(["All", ...locations.sort()]);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  useEffect(() => {
    fetchProperties(true);
    fetchAllLocations();
  }, []);

  const handleFilterClick = async (location) => {
    setSelectedLocation(location);
    setLastVisible(null); // Reset pagination
    setShowFilter(false);
    
    // Fetch the filtered data immediately
    setLoading(true);
    try {
      let q;
      if (location === "All") {
        q = query(
          collection(db, "Properties"),
          orderBy("timestamp", "desc"),
          limit(12)
        );
      } else {
        q = query(
          collection(db, "Properties"),
          where("location", "==", location),
          orderBy("timestamp", "desc"),
          limit(10)
        );
      }

      const snapshot = await getDocs(q);
      const propertiesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProperties(propertiesList);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (err) {
      console.error("Error filtering properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsClick = (newsId) => {
    navigate(`/properties/${newsId}`);
  };

  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.propertiesTitle}>Properties for Rent</h1>
        <div className={styles.filterContainer}>
          <button 
            className={styles.filterButton}
            onClick={() => setShowFilter(!showFilter)}
          >
            <span className={styles.filterIcon}>📍</span>
            Filter by Location
            {selectedLocation !== "All" && (
              <span className={styles.activeFilter}> • {selectedLocation}</span>
            )}
          </button>
          
          {showFilter && (
            <div className={styles.filterDropdown}>
              {uniqueLocations.map(location => (
                <button
                  key={location}
                  className={`${styles.filterOption} ${
                    selectedLocation === location ? styles.active : ""
                  }`}
                  onClick={() => handleFilterClick(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.propertiesGrid}>
        {properties.map((property) => (
          <div
            className={styles.newsItem}
            key={property.id}
            onClick={() => handleNewsClick(property.id)}
          >
            <img 
              className={styles.newsItemImg} 
              src={property.imageURL} 
              alt={property.headline} 
              loading="lazy" 
            />
            <div className={styles.newsDetails}>
              <h3 className={styles.newsHeadline}>{property.headline}</h3>
              {property.location && (
                <p className={styles.propertyLocation}>📍 {property.location}</p>
              )}
              <p className={styles.newsTimestamp}>
                {property.timestamp?.seconds
                  ? new Date(property.timestamp.seconds * 1000).toLocaleDateString()
                  : "No Date Available"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}
      
      {/* Only show Load More if there are more items to load */}
      {!loading && lastVisible && properties.length >= 10 && (
        <button 
          className={styles.loadMore} 
          onClick={() => fetchProperties(false)}
        >
          Load More
        </button>
      )}
      
      {properties.length === 0 && !loading && (
        <div className={styles.noResults}>
          {selectedLocation !== "All" 
            ? `No properties found in ${selectedLocation}`
            : "No properties available"
          }
        </div>
      )}
    </div>
  );
};

export default Properties;