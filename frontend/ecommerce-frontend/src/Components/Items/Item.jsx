import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

export const Item = (props) => {
  return (
    <div className='item'>
        <div className='item-content'>
            <Link to = {`/product/${props.id}`}><img onClick={window.scrollTo(0,0)}src={props.image} alt="" /></Link>
            <p>{props.name}</p>
        </div>
        <div className="item-prices">
            <div className="item-price-new">
                Rs. {props.new_price}
            </div>
            <div className="item-price-old">
                Rs. {props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item
