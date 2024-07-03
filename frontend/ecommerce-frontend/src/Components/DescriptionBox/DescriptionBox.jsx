import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">
                Reviews (122)
            </div>
        </div> 
            <div className="descriptionbox-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quidem voluptatibus, veniam nihil veritatis, quibusdam commodi libero natus quasi ex doloribus pariatur rem laudantium reiciendis blanditiis eveniet deleniti cumque? Distinctio.</p>
            </div>
    </div>
  )
}

export default DescriptionBox