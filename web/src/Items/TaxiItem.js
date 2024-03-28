import React, { useEffect, useState } from 'react';
import 'firebase/compat/storage';
import { Link } from 'react-router-dom';

function TaxiItem({ post }) {
    const [gradeText, setGradeText] = useState('');

    useEffect(() => {
        if (post.grade.length < 1) {
            setGradeText("Келісімді бағада");
        } else {
            setGradeText("Бағасы: " + post.grade);
        }
    }, [post.grade]);

    return (
        <Link to={`/taxi-info/${post.id}`} className='shop-item-link link-style'>
            <div className='shop-item-parent' >
                <h3>{post.title}</h3>
                <p>{gradeText}</p>
                <p>Санат: {post.type}</p>
                <h4>{post.date}</h4>
            </div>
        </Link>
    );
}

export default TaxiItem;