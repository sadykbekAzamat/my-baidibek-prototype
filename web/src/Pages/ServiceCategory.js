import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServiceItem from '../Items/ServiceItem';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

function ServiceCategory() {
  const { postId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
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
        const postRef = database.ref(`Service/Category/${postId}/list`);

        postRef.once('value', (snapshot) => {
          const fetchedPosts = [];
          snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            fetchedPosts.push(post);
          });
          setPosts(fetchedPosts);
        });


        /*
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${postId}0`);
        const url = await imageRef.getDownloadURL();
        setImageUrl(url);*/
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPosts();
  }, [postId]);

  if (!posts.length) {
    return <div>Жүктелуде...</div>;
  }

  return (
    <div className='service-item-list-parent'>
      {posts.map((post, index) => (
        <ServiceItem key={index} post={post} />
      ))}
    </div>
  );
}

export default ServiceCategory;
