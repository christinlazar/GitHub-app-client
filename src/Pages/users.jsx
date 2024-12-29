import { fetchAllUsers, sortUsers,  } from '../Api/userApi'
import './friends.css'
import React, { useEffect, useState } from 'react'

function Users() {
    const [users,setUsers] = useState([])
    const [selectedOption,setSelectedOption] = useState('')
    useEffect(()=>{
        const fetchUsers = async () =>{
            const response = await fetchAllUsers()
            if(response.data.users){
                setUsers(response.data.users)
            }
        }
        fetchUsers()
    },[])

    const handleChange = async (e) =>{
        try {
            const selected = e.target.value
            setSelectedOption(selected)
            const response = await sortUsers(selected)
            if (response.data.users) {
                setUsers(response.data.users)
            }
        } catch (error) {
            
        }
    }
  return (
    <>
     <div className="container">
      <label htmlFor="options" className="label">Select an option:</label>
      <select
        id="options"
        className="dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="" disabled>Select an option</option>
        <option value="public_repos">public_repos</option>
        <option value="public_gists">public_gists</option>
        <option value="followers">followers</option>
        <option value="following">following</option>
        <option value="createdAt">created_at</option>
      </select>
    </div>
    {
        
     users && users.map((user,index)=> (
       <div key={index} className="repository-item-2">
       <div className="repository-content-2">
         <div className="repository-header">
         <img className='avatar_img' src={user.avatar_url}/>
           <h3 className="repository-name">{user.username}</h3>
         <h2 className='location'>{user.location}</h2>
         </div>
       </div>
 </div>
     )
     )
    }
 
    </>
  )
}

export default Users