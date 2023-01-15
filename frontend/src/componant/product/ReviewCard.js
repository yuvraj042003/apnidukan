import React from 'react'
import ReactStars from 'react-rating-stars-component'

import profilePng from '../../../src/componant/layout/Images/Profile.png'
const ReviewCard = ({review}) => {
    const options = {
        edit:true,
        color:"rgba(20,20,20, 0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 500 ? 15:20,
        value:review.rating,
        isHalf:true
    }
    return (
    <>
        <div className='reviewCard'>
        <img src={profilePng} alt="user"/>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>

        </div>
    </>
  )
}

export default ReviewCard