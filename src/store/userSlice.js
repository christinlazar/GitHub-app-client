import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
    repositiries:localStorage.getItem('repo_data') ? JSON.parse(localStorage.getItem('repo_data')) : [],
    repoData:{}
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserData : (state,action)=>{
            state.user = action.payload;
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        setRepositiryData: (state,action) =>{
            state.repositiries = action.payload
            localStorage.setItem('repo_data',JSON.stringify(action.payload))
        },
        setSingleRepoDetials:(state,action) => {
            state.repoData = action.payload
        }
    }
})

export const {setUserData,setRepositiryData,setSingleRepoDetials} = userSlice.actions
export default userSlice.reducer