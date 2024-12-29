import React from 'react'
import './repo.css'
import { useSelector } from 'react-redux'
function RepoDetialsPage({repo}) {
    const {repoData} = useSelector((state)=>state.auth)
  return (
  <div className="app-card">
  <div className="app-header">
    <img  src= "https://i.pinimg.com/736x/89/25/a6/8925a64f6b430a0b1bb061dfbfa66bf4.jpg" alt="Gitpod Logo" className="app-logo" />
    <div className="app-title-section">
      <span className="label"></span>
      <h1>gitpod.io</h1>
      <button className="setup-button">Set up a plan</button>
    </div>
  </div>

  <div className="verification">
    <div className="verified-badge">
      <span className="check-icon">✓</span>
      Verified by GitHub
    </div>
    <p className="verification-text">
      GitHub confirms that this app meets the{' '}
      <a href="#" className="link">
        requirements for verification
      </a>
      .
    </p>
  </div>

  <div className="categories">
    <h2>Categories</h2>
    <div className="category-tags">
      <span className="tag">Code review</span>
      <span className="tag">IDEs</span>
      <span className="tag">Free</span>
      <span className="tag paid">Paid</span>
    </div>
  </div>

  <div className="description">
    <p>
      <a href="#" className="link">Gitpod</a> is the online IDE for GitHub.
    </p>
    <p>
      Repository name : {repoData.name}
    </p>
    <p>
    Description : {repoData.description} 🚀
    </p>
    <p>
    Language used: {repoData.language}
    </p>
    <div className='eye_icon_div'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
    <p>
    Views: {repoData.watchers_count}
    </p>
    </div>
   
  </div>
</div>
  )
}

export default RepoDetialsPage