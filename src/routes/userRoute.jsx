import React from 'react'
import {Routes,Route} from 'react-router-dom'
import RepoDetialsPage from '../Pages/RepoDetialsPage'
import IndexPage from '../Pages/indexPage'
import Followers from '../Pages/Followers'
import FollowerDetials from '../Pages/followerDetials'
import Friends from '../Pages/friends'
import Users from '../Pages/users'
function UserRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/repo_detials' element={<RepoDetialsPage/>}/>
            <Route path='/followers' element={<Followers/>}/>
            <Route path='/follower-details' element={<FollowerDetials/>}/>
            <Route path='/friends' element={<Friends/>}/>
            <Route path='/users' element={<Users/>}/>
        </Routes>
    </div>
  )
}

export default UserRoute