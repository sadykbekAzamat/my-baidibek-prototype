import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Update import statement to use compat
import 'firebase/compat/database'; 
import ShopItem from '../Items/shopItem';
import { Link } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Initialize Firebase (if not already initialized)
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
      const postsRef = database.ref('Shop');

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
          <React.Fragment key={index}>
            <ShopItem post={post} />

            {(index + 1) % 10 === 0 && (
              <div className="ad-container">
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4419298126395682" crossorigin="anonymous"></script>
                <ins className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="+2f+qv+11-4m+db"
                  data-ad-client="ca-pub-4419298126395682"
                  data-ad-slot="5874349991"></ins>
                  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
              </div>
            )}
            
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Posts;
