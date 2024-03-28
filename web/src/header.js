import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logoApplication from "./img/iconApplication.png"


function Header() {
  return (
    <div className='header-parent'>
        <div className='header-second-parent'>
            <img className='image-logo' src={logoApplication} alt='logotype'/>
            
            <Link className='to-home-text' to={"/"}><h1>My Baidibek</h1></Link>
        </div>
    </div>
  );
}

export default Header;
