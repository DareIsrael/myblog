// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../../firebaseConfig';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import styles from './ManagePosts.module.css';

// const ManagePosts = () => {
//   const { collectionName } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPosts();
//   }, [collectionName]);

//   const fetchPosts = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, collectionName));
//       const postsList = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setPosts(postsList);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (postId) => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       try {
//         await deleteDoc(doc(db, collectionName, postId));
//         setPosts(posts.filter(post => post.id !== postId));
//         alert('Post deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting post:', error);
//         alert('Error deleting post. Please try again.');
//       }
//     }
//   };

//   if (loading) return <div className={styles.loading}>Loading posts...</div>;

//   return (
//     <div className={styles.managePosts}>
//       <div className={styles.header}>
//         <h1>Manage {collectionName} Posts</h1>
//         <button onClick={() => window.history.back()} className={styles.backButton}>
//           ← Back to Dashboard
//         </button>
//       </div>

//       <div className={styles.postsGrid}>
//         {posts.map(post => (
//           <div key={post.id} className={styles.postCard}>
//             {post.imageURL && (
//               <img src={post.imageURL} alt={post.headline} className={styles.postImage} />
//             )}
//             <div className={styles.postContent}>
//               <h3 className={styles.postTitle}>{post.headline}</h3>
//               <p className={styles.postDate}>
//                 {post.timestamp?.seconds 
//                   ? new Date(post.timestamp.seconds * 1000).toLocaleDateString()
//                   : 'No date'
//                 }
//               </p>
//               {post.location && (
//                 <p className={styles.postLocation}>📍 {post.location}</p>
//               )}
//               <div className={styles.postActions}>
//                 <button className={styles.editButton}>Edit</button>
//                 <button 
//                   className={styles.deleteButton}
//                   onClick={() => handleDelete(post.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {posts.length === 0 && !loading && (
//         <div className={styles.noPosts}>
//           <p>No posts found in {collectionName}.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagePosts;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import styles from './ManagePosts.module.css';

const ManagePosts = () => {
  const { collectionName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    headline: '',
    content: '',
    imageURL: '',
    videoURL: '',
    location: ''
  });

  useEffect(() => {
    fetchPosts();
  }, [collectionName]);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const postsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsList);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, collectionName, postId));
        setPosts(posts.filter(post => post.id !== postId));
        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditFormData({
      headline: post.headline || '',
      content: post.content || '',
      imageURL: post.imageURL || '',
      videoURL: post.videoURL || '',
      location: post.location || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (postId) => {
    try {
      const postRef = doc(db, collectionName, postId);
      await updateDoc(postRef, editFormData);
      
      // Update local state
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, ...editFormData } : post
      ));
      
      setEditingPost(null);
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditFormData({
      headline: '',
      content: '',
      imageURL: '',
      videoURL: '',
      location: ''
    });
  };

  if (loading) return <div className={styles.loading}>Loading posts...</div>;

  return (
    <div className={styles.managePosts}>
      <div className={styles.header}>
        <h1>Manage {collectionName} Posts</h1>
        <button onClick={() => window.history.back()} className={styles.backButton}>
          ← Back to Dashboard
        </button>
      </div>

      <div className={styles.postsGrid}>
        {posts.map(post => (
          <div key={post.id} className={styles.postCard}>
            {post.imageURL && (
              <img src={post.imageURL} alt={post.headline} className={styles.postImage} />
            )}
            
            <div className={styles.postContent}>
              {editingPost === post.id ? (
                // Edit Form
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label>Headline</label>
                    <input
                      type="text"
                      name="headline"
                      value={editFormData.headline}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Content</label>
                    <textarea
                      name="content"
                      value={editFormData.content}
                      onChange={handleEditChange}
                      className={styles.editTextarea}
                      rows="4"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Image URL</label>
                    <input
                      type="url"
                      name="imageURL"
                      value={editFormData.imageURL}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Video URL</label>
                    <input
                      type="url"
                      name="videoURL"
                      value={editFormData.videoURL}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  </div>
                  
                  {collectionName === 'Properties' && (
                    <div className={styles.formGroup}>
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editFormData.location}
                        onChange={handleEditChange}
                        className={styles.editInput}
                      />
                    </div>
                  )}
                  
                  <div className={styles.editActions}>
                    <button 
                      onClick={() => handleEditSubmit(post.id)}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <>
                  <h3 className={styles.postTitle}>{post.headline}</h3>
                  <p className={styles.postDate}>
                    {post.timestamp?.seconds 
                      ? new Date(post.timestamp.seconds * 1000).toLocaleDateString()
                      : 'No date'
                    }
                  </p>
                  {post.location && (
                    <p className={styles.postLocation}>📍 {post.location}</p>
                  )}
                  <div className={styles.postActions}>
                    <button 
                      className={styles.editButton}
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className={styles.noPosts}>
          <p>No posts found in {collectionName}.</p>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;