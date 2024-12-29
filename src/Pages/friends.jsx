import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './friends.css'
import { useSelector } from 'react-redux'
function Friends() {
    const {user} = useSelector((state)=>state.auth)
  const [friendsData,setfriendsData] = useState([])
  const navigate = useNavigate()

    useEffect(()=>{
            setfriendsData(user.friends)
    },[])

  return (
   <>
   {
    friendsData && friendsData.map((friend,index)=> (
      <div key={index} className="repository-item-2">
      <div className="repository-content-2">
        <div className="repository-header">
        <img className='avatar_img' src={friend.avatar_url}/>
          <h3 className="repository-name">{friend.login}</h3>
        </div>
      </div>
</div>
    )
    )
   }

   </>
  )
}

export default Friends 