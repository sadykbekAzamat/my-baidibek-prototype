import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

function MoreInfoPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: "AIzaSyDtksSIisErQzgX5RIgy4GKFrOubws_I_8",
            authDomain: "my-baidibek.firebaseapp.com",
            databaseURL: "https://my-baidibek-default-rtdb.firebaseio.com",
            projectId: "my-baidibek",
            storageBucket: "my-baidibek.appspot.com",
            messagingSenderId: "663766257444",
            appId: "1:663766257444:web:b71bad6ee443805e9b2db1",
            measurementId: "G-1XGY8GDDRX"
          });
        }

        const database = firebase.database();
        const postRef = database.ref(`Shop/${postId}`);

        postRef.once('value', (snapshot) => {
            const postData = snapshot.val();
            setPost(postData);
        
            const userData = database.ref(`Users/${postData.ownerId}`);
            userData.once('value', (snapshott) => {
                const userCome = snapshott.val();
                if (userCome.number.startsWith('8')) {
                    userCome.number = '+7' + userCome.number.slice(1);
                }
                if (userCome.number.startsWith('7')) {
                    userCome.number = '+' + userCome.number;
                }
                setUser(userCome);
            });
        });
        

        // Fetch image URL
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${postId}0`);
        const url = await imageRef.getDownloadURL();
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post || !user) {
    return <div>Жүктелуде...</div>;
  }

  
  const whatsappLink = `https://wa.me/${user.number}`;

  return (
    <div className='more-info-page-parent'>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          style={{ maxWidth: '100%', maxHeight: '400px' }}
        />
      )}
      <h2 className='more-info-page-title'>{post.title}</h2>

      <h3 className='more-info-page-grade'>Бағасы: {post.grade}</h3>

      <p>Толығырақ: {post.moreInfo}</p>

      <div className='more-info-page-min-div'>
        <h3>Санат: {post.category}</h3>
        <h4>Пост иесі: {user.name}</h4>
      </div>
      
        <a className='link-a' href={whatsappLink} target="_blank" rel="noopener noreferrer">
          Whatsapp арқылы байланысу...
        </a>

        <p className='more-info-page-date'>{post.date}</p>
    </div>
  );
}

export default MoreInfoPage;
