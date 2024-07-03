import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='news-letter'>
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscribe and stay updated</p>
        <div className='hi'>
            <input type="email" placeholder='Your Email id'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter