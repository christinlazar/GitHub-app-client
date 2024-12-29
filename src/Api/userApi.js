import Api from "../services/axios";
import axios  from "axios";
export const searchUser = async (username) =>{
    try {
        const result = await Api.get('/user',{
            params:{username}
        })
        return result
    } catch (error) {
        return error
    }
}

export const getfollowers = async (repo_url) =>{
    try {
        console.log("getting in getfollers")
        const result = await axios.get(`${repo_url}/followers`)
        return result
    } catch (error) {
        return error
    }
}

export const getfollowerRepo = async (username)=>{
    try {
        const result = await axios.get(`https://api.github.com/users/${username}/repos`)
        console.log("In here with res",result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const blockUser = async (username) =>{
    try {
        const result = await Api.patch(`/block-user`,{username})
        return result
    } catch (error) {
        return error
    }
}

export const unBlockUser = async (username) =>{
    try {
        const result = await Api.patch('/unblock-user',{username})
        return result
    } catch (error) {
        return error
    }
}

export const submitEdit = async (formData) =>{
    try {
        const result = await Api.patch('/edit-details',{formData})
        return result
    } catch (error) {
        return error
    }
}

export const fetchAllUsers = async () =>{
    try {
        const result = await Api.get('/users')
        console.log(result)
        return result
    } catch (error) {
        return error
    }
}

export const sortUsers = async (sortBy) =>{
    try {
        console.log("sortby",sortBy)
        const result = await Api.get(`/sort?sortBy=${sortBy}`)
        return result
    } catch (error) {
        return error
    }
}

export const searchuser = async (seacrhBy) =>{
    try {
        const result = await Api.get(`/search?SearchBy=${seacrhBy}`)
        return result
    } catch (error) {
        return error
    }
}