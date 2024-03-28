import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import "./MoreInfo.css"

function MoreInfoTaxi() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

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
        const postRef = database.ref(`Direct/${postId}`);

        postRef.once('value', (snapshot) => {
            const postData = snapshot.val();

            if(postData.grade.length < 1){
                postData.grade = "Келісімді бағада";
            }else {
                postData.grade = "Бағасы: " + postData.grade;
            }

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
    <div className='taxi-info-page-parent'>
      <h2 className='taxi-info-page-title'>{post.title}</h2>
      <h3>{post.grade}</h3>
      <h3>Толығырақ: {post.moreInfo}</h3>
      <div className='taxi-info-page-min-div'>
        <h4>Санат: {post.type}</h4>
        <h4>Қайдан: {post.whereFrom}</h4>
        <h4>Қайда: {post.where}</h4>
      </div>


      <p>Пост иесі: {user.name}</p>
      
        <a className='link-a' href={whatsappLink} target="_blank" rel="noopener noreferrer">
          Whatsapp арқылы байланысу...
        </a>

        <p className='taxi-info-page-date'>{post.date}</p>
    </div>
  );
}

export default MoreInfoTaxi;
