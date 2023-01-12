import React from 'react';
import {Link} from 'react-router-dom';
import ReactStar from 'react-rating-stars-component';


const Product = ({product}) => {
  const options = {
    edit:true,
    color:"rgba(20,20,20, 0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 500 ? 15:20,
    value:2.8,
    isHalf:true
}
  return (
    <>
    <Link className='ProductCard' to={product._id}>
    <img src={product.images[0].url} alt={product.name}/>
    <p>{product.name}</p>
    <div>
        <ReactStar {...options}/><span>({product.noOfReviews} Revie)</span>
    </div>
    <span>{product.price}</span>
    </Link>
    </>
  )
}

export default Product