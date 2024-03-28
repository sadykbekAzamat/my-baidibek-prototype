import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

function MoreInfoService() {
  const { categoryId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: "your-api-key",
            authDomain: "your-auth-domain",
            databaseURL: "your-database-url",
            projectId: "your-project-id",
            storageBucket: "your-storage-bucket",
            messagingSenderId: "your-messaging-sender-id",
            appId: "your-app-id",
            measurementId: "your-measurement-id"
          });
        }

        const database = firebase.database();
        const postRef = database.ref(`Service/Category/${categoryId}/list/${postId}`);
        const snapshot = await postRef.once('value');

        const postData = snapshot.val();

        if (postData) {
          if (postData.number) {
            const numberString = postData.number.toString();

            if (numberString.startsWith('8')) {
              postData.number = '+7' + numberString.slice(1);
            } else if (numberString.startsWith('7')) {
              postData.number = '+' + numberString;
            }
          }

          setPost(postData);

          const storage = firebase.storage();
          const storageRef = storage.ref();
          const imageRef = storageRef.child(`images/${postId}0`);
          const url = await imageRef.getDownloadURL();
          setImageUrl(url);
        } else {
          console.error('Post data not found:', snapshot);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [categoryId, postId]);

  if (!post) {
    return <div>Fetching post...</div>;
  }

  const whatsappLink = `https://wa.me/${post.number}`;
  const telegramLink = post.telegram ? `https://t.me/${post.telegram}` : null;

  return (
    <div className='more-info-page-parent'>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          style={{ maxWidth: '100%', maxHeight: '400px' }}
        />)}
        <h2 className='more-info-page-title'>{post.title}</h2>
        <h3 className='more-info-page-grade'>Бағасы: {post.grade}</h3>
        <p className='more-info-service-description'>Толығырақ: {post.info}</p>

        <div className='contact-links-parent'>
            {post.number && (
            <a
            className='link-contact'
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            >
            WhatsApp арқылы байланысу
            </a>)}

            <hr className='divider-line'/>

            {telegramLink && (
            <a
            className='link-contact'
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            >
            Telegram арқылы байланысу
            </a>)}
        </div>

      <p className='more-info-page-date'>{post.date}</p>
    </div>
  );
}

export default MoreInfoService;
