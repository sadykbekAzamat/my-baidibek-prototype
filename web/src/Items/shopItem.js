import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Link } from 'react-router-dom';
import deffImage from "../img/no-image.png"



function ShopItem({ post }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${post.id}0`);
        const url = await imageRef.getDownloadURL();
        setImageUrl(url);
      } catch (error) {
        setImageUrl(deffImage);
        console.error('Error getting image URL:', error);
      }
    };

    fetchImageUrl();
  }, [post.id]);
  

  return (
    <Link to={`/shop-info/${post.id}`} className='shop-item-link link-style'>
        <div className='shop-item-parent' >
        {imageUrl && (
            <img
            src={imageUrl}
            alt={post.title}
            className='shop-item-image'
            />
        )}
        <h3>{post.title}</h3>
        <p>Бағасы: {post.grade}</p>
        <p>Санат: {post.category}</p>
        </div>
    </Link>
  );
}

export default ShopItem;
