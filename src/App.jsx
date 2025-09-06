import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Entertainment from './components/entertainment/Entertainment';
// import News from './components/news/News';
import Jobs from './components/jobs/Jobs';
import Sport from './components/properties/Properties';
import Extra from './components/extra/Extra';
import DailyTips from './components/dailyTips/DailyTips';
import Religion from './components/religion/Religion';
import Politics from './components/politics/Politics';
import Footer from './components/footer/Footer';
import NewsDetails from './components/home/NewsDetails';
import EntertainmentDetails from './components/entertainment/EntertainmentDetails';
import Education from './components/education/Education';
import EDetails from './components/education/EDetails';
import Properties from './components/properties/Properties';
import PDetails from './components/properties/PDetails';
import Contact from './components/contact/Contact';
import PrivacyPolicy from './components/privacypolicy/PrivacyPolicy';
import About from './components/about/About';
import PoDetails from './components/politics/PDetails';
import AdminDashboard from './components/admin/AdminDashboard';
import ManagePosts from './components/admin/ManagePosts';

// import AdminDashboard from './components/admin/AdminDashboard';
// import ManagePosts from './components/admin/ManagePosts';



const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entertainment" element={<Entertainment />} />
        {/* <Route path="/news" element={<News />} /> */}
        <Route path="/extra" element={<Extra />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/education" element={<Education />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PDetails />} />
        <Route path="/daily-tips" element={<DailyTips />} />
        <Route path="/religion" element={<Religion />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/politics/:id" element={<PoDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/entertainment/:id" element={<EntertainmentDetails />} />
        <Route path="/education/:id" element={<EDetails />} />
        {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/managepost/managepost/:collectionName" element={<ManagePosts />} /> */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage/:collectionName" element={<ManagePosts />} />
      </Routes>
       <Footer />
     </>
  );
};

export default App;