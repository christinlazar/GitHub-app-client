import React, { useEffect, useState } from 'react'
import './followers.css'
import { useSelector } from 'react-redux'
import { getfollowers } from '../Api/userApi'
import { useNavigate } from 'react-router-dom'
function Followers() {
  const {user} = useSelector((state)=>state.auth)
  const [follwersData,setFollwersData] = useState([])
  const navigate = useNavigate()
    useEffect(()=>{
        const getFollowers = async () =>{
          const response = await getfollowers(user.user_url)
          if(response.data){
            setFollwersData(response.data)
          }
        }
        getFollowers()
    },[])

  return (
   <>
   {
    follwersData && follwersData.map((follower,index)=> (
      <div key={index} className="repository-item-2">
      <div className="repository-content-2">
        <div className="repository-header">
        <img className='avatar_img' src={follower.avatar_url}/>
          <h3 onClick={()=>navigate(`/follower-details?username=${follower.login}`)}  className="repository-name">{follower.login}</h3>
          <span className='account-text'>Account type:{follower.user_view_type}</span>
        </div>
      </div>
</div>
    )
    )
   }

   </>
  )
}

export default Followers