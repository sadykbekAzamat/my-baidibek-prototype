import React from 'react';
import 'firebase/compat/storage';
import { Link } from 'react-router-dom';
import arrowRight from '../img/arrowhead.png'
import './MoreInfo.css'



function ServiceCategoryItem({ post }) {
  return (
    <Link to={`/service-category/${post.id}`} className='shop-item-link link-style'>
        <div className='service-category-list-item' >
            <h3>{post.name}</h3>
            <img className='img-service-category' src={arrowRight} alt='link'/>
        </div>
    </Link>
  );
}

export default ServiceCategoryItem;
