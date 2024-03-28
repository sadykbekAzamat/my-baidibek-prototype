import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Update import statement to use compat
import 'firebase/compat/database'; 
import TaxiItem from '../Items/TaxiItem';
import { Link } from 'react-router-dom';


function Taxi() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
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

      // Get a reference to the database service
      const database = firebase.database();
      const postsRef = database.ref('Direct');

      // Fetch posts data from Firebase
      postsRef.once('value', (snapshot) => {
        const fetchedPosts = [];
        snapshot.forEach((childSnapshot) => {
          const post = childSnapshot.val();
          fetchedPosts.push(post);
        });
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      });
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className='title'>Хабарландырулар</h2>
      <div className='grid-shop-parent'>
        {posts.map((post, index) => (
            <TaxiItem key={index} post={post} />
          ))}
      </div>
    </div>
  );
}

export default Taxi;
