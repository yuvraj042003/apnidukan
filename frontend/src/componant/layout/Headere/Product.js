import React from 'react';
import {Link} from 'react-router-dom';
import ReactStar from 'react-rating-stars-component';

const options = {
    edit:true,
    color:"rgba(20,20,20, 0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 500 ? 15:20,
    value:2.8,
    isHalf:true
}
const Product = ({product}) => {
  return (
    <>
    <Link className='ProductCard' to={product._id}>
    <img src={product.images[0].url} alt={product.name}/>
    <p>{product.name}</p>
    <div>
        <ReactStar {...options}/><span>(256 Reviews)</span>
    </div>
    <span>{product.price}</span>
    </Link>
    </>
  )
}

export default Product