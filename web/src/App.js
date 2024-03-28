import React from 'react';
import './App.css';
import Posts from './Pages/Posts';
import Taxi from './Pages/Taxi';
import Service from './Pages/Service';
import MoreInfoPage from './Items/MoreInfoPage';
import MoreInfoTaxi from './Items/MoreInfoTaxi';
import ServiceCategory from './Pages/ServiceCategory';
import IsMobileDevice from './Pages/IsNotMobile';
import MoreInfoService from './Items/MoreInfoService';
import Navbar from './nav/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  // Function to check if the device is mobile
  const isMobile = () => {
    return window.innerWidth <= 768; // You can adjust the width breakpoint as needed
  };

  return (
    <Router>
      
        {!isMobile() && (       
          <IsMobileDevice/>
        )}


        {isMobile() && (
        <div>
          <React.Fragment>
            <Navbar />
          </React.Fragment>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/taxi" element={<Taxi />} />
            <Route path="/service" element={<Service />} />
            <Route path="/shop-info/:postId" element={<MoreInfoPage />} />
            <Route path="/taxi-info/:postId" element={<MoreInfoTaxi />} />
            <Route path="/service-category/:postId" element={<ServiceCategory />} />
            <Route path="/service-info/:categoryId/list/:postId" element={<MoreInfoService />} />
          </Routes>
        </div>
        )}
    </Router>
  );
}

export default App;