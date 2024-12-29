import './followerDetials.css'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getfollowerRepo } from '../Api/userApi'
function FollowerDetials() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const username = params.get('username')
    const navigate = useNavigate()
    const [repoData,setRepoData] = useState([])
    useEffect(()=>{
        const getFollowerRepository = async ()=>{
            const response = await getfollowerRepo(username)
            if(response){
                setRepoData(response.data)
            }
        }
        getFollowerRepository()
    },[])
  return (
    <>
            <div className='follower_repo_maindiv'>
                <h3 className='follower_repo_head'>Repositories</h3>
                <button className='back_button' onClick={()=>navigate('/')}>Back to home</button>
            </div>
            { repoData && repoData.map((repo, index) => (
              <div key={index} className="repository-item">
                <div className="repository-content">
                  <div className="repository-header">
                    <h3  className="repository-name">{repo.name}</h3>
                    {repo.verified && (
                      <svg 
                        className="verified-icon" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M8 0L9.96 1.96L12.4 1.96L13.44 4.24L15.84 5.28L15.84 7.68L17.76 9.6L15.84 11.52L15.84 13.92L13.44 14.96L12.4 17.24L9.96 17.24L8 19.2L6.04 17.24L3.6 17.24L2.56 14.96L0.16 13.92L0.16 11.52L-1.76 9.6L0.16 7.68L0.16 5.28L2.56 4.24L3.6 1.96L6.04 1.96L8 0Z" 
                          fill="#1a73e8"
                        />
                        <path 
                          d="M6.5 9.5L8 11L11.5 7.5" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="repository-description">{repo.description}</p>
                </div>
              </div>
            ))}
    </>
    
  )
}

export default FollowerDetials