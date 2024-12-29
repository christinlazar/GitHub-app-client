
import './App.css';
import {useEffect, useState}from 'react'
import { searchUser } from './Api/userApi';
import {toast,Toaster} from 'sonner'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData,setRepositiryData } from './store/userSlice';
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom';
import RepoDetialsPage from './Pages/RepoDetialsPage';
import userRoute from './routes/userRoute';
import UserRoute from './routes/userRoute';
function App() {
  const [username,setUserName] = useState('')
  const [selectedRepo, setSelectedRepo] = useState(null);
  const dispatch = useDispatch()
  const {user,repositiries} = useSelector((state)=>state.auth)
  useEffect(()=>{

  },[user,repositiries])
  const handleChange =  (e) =>{
    setUserName(e.target.value)
  }
  const handleFormSubmssion = async (e)=>{
    e.preventDefault()
    try {
      const response = await searchUser(username)
      setUserName('')
      if(response.status == 404){
        toast.error("No such user exists")
      }
      if(response.data){
        dispatch(setUserData(response.data.user))
        dispatch(setRepositiryData(response.data.repo_data))
      }
    } catch (error) {
      toast.error("Something unexpected happend")
    }
  }

  const handleRepoClick = (repo) =>{
    setSelectedRepo(repo)
    
  }
 
  return (

  <Router>
    <Routes>
      <Route path='/*' element={<UserRoute/>}/>
    </Routes>
  </Router>
      
  );
}

export default App;
