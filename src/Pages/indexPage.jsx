
import './indexPage.css'
import {useEffect, useState}from 'react'
import {createPortal} from 'react-dom'
import { blockUser, searchUser, submitEdit, unBlockUser } from '../Api/userApi';
import {toast,Toaster} from 'sonner'
import { useDispatch, useSelector } from 'react-redux';
import { setRepositiryData,setSingleRepoDetials,setUserData } from '../store/userSlice';
import React from 'react'
import { useNavigate } from 'react-router-dom';


function IndexPage() {
  const {user,repositiries} = useSelector((state)=>state.auth)
    const [username,setUserName] = useState('')
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [modalOpen,setModalOpen] = useState(false)
    const [blog,setBlog] = useState(user.blog)
    const [bio,setBio] = useState(user.bio)
    const [reload,setReload] = useState(false)
    const [Location,setLocation] = useState(user.location)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      if (user) {
        setBlog(user.blog || '');
        setBio(user.bio || '');
        setLocation(user.location || '');
      }
    }, [user]);
    
    const handleChange =  (e) =>{
      setUserName(e.target.value)
    }
    const handleFormSubmssion = async (e)=>{
      e.preventDefault()
      try {
        const response = await searchUser(username)
        setUserName('')
        if(response.status == 401){
          toast.error("User has been blocked")
        }
        if(response.status == 404){
          toast.error("No such user exists")
        }
        if(response.data){
          dispatch(setUserData(response.data.user))
          dispatch(setRepositiryData(response.data.repo_data))
          setReload(true)
          navigate('/')
        }
      } catch (error) {
        toast.error("Something unexpected happend")
      }
    }
  
    const handleRepoClick = (repo) =>{
      setSelectedRepo(repo)
      dispatch(setSingleRepoDetials(repo))
      navigate('/repo_detials')
    }

    const handleDelete = async () =>{
      try {
          const response = await blockUser(user.username)
          if(response.data && response.data.success){
            dispatch(setUserData(response.data.user))
          }
      } catch (error) {
        toast.error("Something unexpected happend")
      }
    }

    const handleUnblock = async () => {
      try {
        const response = await unBlockUser(user.username)
        if(response.data && response.data.success){
          dispatch(setUserData(response.data.user))
        }
      } catch (error) {
        toast.error("Something unexpected happend")
      }
    }

    const handleEditSubmission = async () =>{
      try {
        if(!blog.trim()){
          setBlog(user.blog)
        }
        if(!bio.trim()){
          setBio(user.bio)
        }
        if(!Location.trim()){
          setLocation(user.location)
        }
        const formData = {
          username:user.username,
          blog,
          bio,
          Location
        }
        const response = await submitEdit(formData)
        if(response.data.success){
          dispatch(setUserData(response.data.user))
          setReload(true)
          toast.success("User details updated successfully")
        }
      } catch (error) {
        toast.error("Something unexpected happend")
      }
    }
   
    return (
      <>
      <form onSubmit={handleFormSubmssion}>
        <Toaster richColors position='bottom-right'/>
         <div className="container">
              <label htmlFor="username">
                  <i className="fas fa-user"></i> Username
              </label>
              <input value={username} onChange={handleChange} type="text" id="username" placeholder="Enter your username"/>
              <button className='search_button'>Search</button>
        </div>
        {
            user && repositiries.length > 0 ? (
            <div className="repository-container">
              <div className='profile-div'>
            
              <img className='avatar_img' src={user.avatar_url}/>
              <h4 className='username2'>{user.username}</h4>
              <span onClick={()=>navigate('/followers')} className='follow_class'>Followers</span>
              <span onClick={()=>navigate('/friends')} className='follow_class'>Friends</span>
              <span onClick={()=>navigate('/users')} className='follow_class'>Users</span>
              {
                user.isBlocked ? (
                  <svg onClick={handleUnblock} className='delete_icon2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 4H14.82l-1-1H10.18l-1 1H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H5z"/>
                  </svg>
                ) :
                (
                  <svg onClick={handleDelete} className='delete_icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 4H14.82l-1-1H10.18l-1 1H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H5z"/>
                  </svg>
                )
              }
              <i onClick={()=>setModalOpen(true)} className="edit_icon fas fa-edit"></i>
      
              </div>
              <h3></h3>
            { !user.isBlocked && repositiries.map((repo,index) => (
              <div key={index} className="repository-item">
                <div className="repository-content">
                  <div className="repository-header">
                    <h3 onClick={()=>handleRepoClick(repo) } className="repository-name">{repo.name}</h3>
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
          </div>
         
          ): 
          <div className='repository-container'>
           '' 
          </div>
        }
        </form>
        
        {
            modalOpen && createPortal(

              <div className="review-modal">
  <p className="modal-title">Edit Details</p>
  <label>Blog</label>
  <input 
    className="review-textarea"
    value={blog}
    onChange={(e)=>setBlog(e.target.value)}
  />
  <label>Bio</label>
  <input 
    className="review-textarea"
    value={bio}
    onChange={(e)=>setBio(e.target.value)}
  />
  <label>Location</label>
  <input 
   value={Location}
   onChange={(e)=>setLocation(e.target.value)}
    className="review-textarea"
  />
  <div className="modal-buttons">
    <button 
    onClick={handleEditSubmission}
      className="submit-button"
    >
      Submit
    </button>
    <button 
      className="close-button"
      onClick={()=>setModalOpen(false)}
    >
      Close
    </button>
  </div>
</div>
,document.body


            )
          }
      </>
    
        
    );
  
}

export default IndexPage