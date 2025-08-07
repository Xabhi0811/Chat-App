import React from 'react'
import assets from '../assets/assets'

const RightSidebar = ({selectedUser}) => {
  return selectedUser && (
    <div>
       <div className="">
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt='' />
       </div>
    </div>
  )
}

export default RightSidebar
