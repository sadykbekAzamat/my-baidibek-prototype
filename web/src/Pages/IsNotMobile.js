import React from 'react';


function isMobileDevice() {

  return (
    <div className='is-not-mobile-parent'>
        <h1 className='is-not-mobile-header-text'>
            Сайт мобильді құрылғыларға арналған
        </h1>
        <h2 className='is-not-mobile-header-text'>
            Android үшін қосымша жүктеу:
        </h2>
        <a href='https://play.google.com/store/apps/details?id=com.betagames.mybaidibek'>
        <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.betagames.mybaidibek&chs=360x360&choe=UTF-8&chld=L|2" rel="nofollow" alt="qr code"></img>
        </a>
        <h1 className='is-not-mobile-header-text'>
            My Baidibek
        </h1>
    </div>
  );
}

export default isMobileDevice;
