import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Link } from 'react-router-dom';
import deffImage from "../img/services.png"



function ServiceItem({ post }) {
  const [imageUrl, setImageUrl] = useState(null);
//
//   useEffect(() => {
//     const fetchImageUrl = async () => {
//       try {
//         const storage = firebase.storage();
//         const storageRef = storage.ref();
//         const imageRef = storageRef.child(`images/${post.id}0`);
//         const url = await imageRef.getDownloadURL();
//         setImageUrl(url);
//       } catch (error) {
//         setImageUrl(deffImage);
//         console.error('Error getting image URL:', error);
//       }
//     };

//     fetchImageUrl();
//   }, [post.id]);
  

  return (
    <Link to={`/service-info/${post.category}/list/${post.id}`} className='shop-item-link link-style'>
        <div className='service-item-parent' >
        {imageUrl && (
            <img
            src={deffImage}
            alt={post.title}
            className='service-item-image'
            />
        )}
        <h3>{post.title}</h3>
        </div>
    </Link>
  );
}

export default ServiceItem;
