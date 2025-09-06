// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebaseConfig';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import styles from './AdminDashboard.module.css';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('create');
//   const [selectedCollection, setSelectedCollection] = useState('MyBlog');
//   const [formData, setFormData] = useState({
//     headline: '',
//     content: '',
//     imageURL: '',
//     videoURL: '',
//     location: '',
//     timestamp: serverTimestamp()
//   });

//   const collections = [
//     { value: 'MyBlog', label: 'Home News' },
//     { value: 'Entertainment', label: 'Entertainment' },
//     { value: 'Jobs', label: 'Jobs' },
//     { value: 'Education', label: 'Education' },
//     { value: 'Properties', label: 'Properties' },
//     { value: 'DailyTips', label: 'Daily Tips' },
//     { value: 'Religion', label: 'Religion' },
//     { value: 'Polities', label: 'Politics' }
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = await addDoc(collection(db, selectedCollection), formData);
//       alert('Post created successfully!');
//       setFormData({
//         headline: '',
//         content: '',
//         imageURL: '',
//         videoURL: '',
//         location: '',
//         timestamp: serverTimestamp()
//       });
//     } catch (error) {
//       console.error('Error creating post:', error);
//       alert('Error creating post. Please try again.');
//     }
//   };

//   return (
//     <div className={styles.adminDashboard}>
//       <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
      
//       <div className={styles.tabs}>
//         <button 
//           className={`${styles.tab} ${activeTab === 'create' ? styles.active : ''}`}
//           onClick={() => setActiveTab('create')}
//         >
//           Create Post
//         </button>
//         <button 
//           className={`${styles.tab} ${activeTab === 'manage' ? styles.active : ''}`}
//           onClick={() => setActiveTab('manage')}
//         >
//           Manage Posts
//         </button>
//       </div>

//       {activeTab === 'create' && (
//         <div className={styles.createPost}>
//           <h2>Create New Post</h2>
//           <form onSubmit={handleSubmit} className={styles.postForm}>
//             <div className={styles.formGroup}>
//               <label>Select Collection:</label>
//               <select 
//                 value={selectedCollection} 
//                 onChange={(e) => setSelectedCollection(e.target.value)}
//                 className={styles.collectionSelect}
//               >
//                 {collections.map(collection => (
//                   <option key={collection.value} value={collection.value}>
//                     {collection.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label>Headline *</label>
//               <input
//                 type="text"
//                 name="headline"
//                 value={formData.headline}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Enter post headline"
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label>Content *</label>
//               <textarea
//                 name="content"
//                 value={formData.content}
//                 onChange={handleInputChange}
//                 required
//                 placeholder="Write your post content here..."
//                 rows="6"
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label>Image URL</label>
//               <input
//                 type="url"
//                 name="imageURL"
//                 value={formData.imageURL}
//                 onChange={handleInputChange}
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label>Video URL</label>
//               <input
//                 type="url"
//                 name="videoURL"
//                 value={formData.videoURL}
//                 onChange={handleInputChange}
//                 placeholder="https://example.com/video.mp4"
//               />
//             </div>

//             {selectedCollection === 'Properties' && (
//               <div className={styles.formGroup}>
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   placeholder="Enter property location"
//                 />
//               </div>
//             )}

//             <button type="submit" className={styles.submitButton}>
//               Create Post
//             </button>
//           </form>
//         </div>
//       )}

//       {activeTab === 'manage' && (
//         <div className={styles.managePosts}>
//           <h2>Manage Posts</h2>
//           <p>Select a collection to manage posts:</p>
//           <div className={styles.collectionGrid}>
//             {collections.map(collection => (
//               <div key={collection.value} className={styles.collectionCard}>
//                 <h3>{collection.label}</h3>
//                 <button 
//                   className={styles.manageButton}
//                   onClick={() => window.location.href = `/admin/manage/${collection.value}`}
//                 >
//                   Manage Posts
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import axios from "axios";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedCollection, setSelectedCollection] = useState('MyBlog');
  const [formData, setFormData] = useState({
    headline: '',
    content: '',
    imageURL: '',
    videoURL: '',
    location: '',
    timestamp: serverTimestamp()
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const collections = [
    { value: 'MyBlog', label: 'Home News' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Jobs', label: 'Jobs' },
    { value: 'Education', label: 'Education' },
    { value: 'Properties', label: 'Properties' },
    { value: 'DailyTips', label: 'Daily Tips' },
    { value: 'Religion', label: 'Religion' },
    { value: 'Politics', label: 'Politics' }
  ];

  // Cloudinary Upload Function
  
const uploadToCloudinary = async (file, resourceType = "image") => {
  setUploading(true);
  setUploadProgress(0);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset"); // replace with your Cloudinary preset
  formData.append("cloud_name", "dvntutcf4");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dvntutcf4/${resourceType}/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  } finally {
    setUploading(false);
  }
};

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    try {
      const imageUrl = await uploadToCloudinary(file, 'image');
      setFormData(prev => ({ ...prev, imageURL: imageUrl }));
    } catch (error) {
      alert('Image upload failed. Please try again.');
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }
    
    try {
      const videoUrl = await uploadToCloudinary(file, 'video');
      setFormData(prev => ({ ...prev, videoURL: videoUrl }));
    } catch (error) {
      alert('Video upload failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, selectedCollection), formData);
      alert('Post created successfully!');
      setFormData({
        headline: '',
        content: '',
        imageURL: '',
        videoURL: '',
        location: '',
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageURL: '' }));
  };

  const removeVideo = () => {
    setFormData(prev => ({ ...prev, videoURL: '' }));
  };

  return (
    <div className={styles.adminDashboard}>
      <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'create' ? styles.active : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create Post
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'manage' ? styles.active : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Posts
        </button>
      </div>

      {activeTab === 'create' && (
        <div className={styles.createPost}>
          <h2>Create New Post</h2>
          <form onSubmit={handleSubmit} className={styles.postForm}>
            <div className={styles.formGroup}>
              <label>Select Collection:</label>
              <select 
                value={selectedCollection} 
                onChange={(e) => setSelectedCollection(e.target.value)}
                className={styles.collectionSelect}
              >
                {collections.map(collection => (
                  <option key={collection.value} value={collection.value}>
                    {collection.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Headline *</label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleInputChange}
                required
                placeholder="Enter post headline"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                placeholder="Write your post content here..."
                rows="6"
              />
            </div>

            {/* Image Upload Section */}
            <div className={styles.formGroup}>
              <label>Image Upload</label>
              {!formData.imageURL ? (
                <div className={styles.uploadSection}>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="imageUpload" className={styles.uploadButton}>
                    📷 Upload Image
                  </label>
                  {uploading && (
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                      <span>{uploadProgress}%</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.previewSection}>
                  <img src={formData.imageURL} alt="Preview" className={styles.previewImage} />
                  <button type="button" onClick={removeImage} className={styles.removeButton}>
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* Video Upload Section */}
            <div className={styles.formGroup}>
              <label>Video Upload</label>
              {!formData.videoURL ? (
                <div className={styles.uploadSection}>
                  <input
                    type="file"
                    id="videoUpload"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="videoUpload" className={styles.uploadButton}>
                    🎥 Upload Video
                  </label>
                  {uploading && (
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                      <span>{uploadProgress}%</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.previewSection}>
                  <video controls className={styles.previewVideo}>
                    <source src={formData.videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button type="button" onClick={removeVideo} className={styles.removeButton}>
                    Remove Video
                  </button>
                </div>
              )}
            </div>

            {selectedCollection === 'Properties' && (
              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter property location"
                />
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Create Post'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className={styles.managePosts}>
          <h2>Manage Posts</h2>
          <p>Select a collection to manage posts:</p>
          <div className={styles.collectionGrid}>
            {collections.map(collection => (
              <div key={collection.value} className={styles.collectionCard}>
                <h3>{collection.label}</h3>
                <button 
                  className={styles.manageButton}
                  onClick={() => window.location.href = `/admin/manage/${collection.value}`}
                >
                  Manage Posts
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;