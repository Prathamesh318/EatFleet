import axios from "axios"
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../Config/api"


export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        
        const {data}=await axios.post(`${API_URL}/auth/signup`,reqData.userData);

        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant");
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt});
        console.log("SignUp Successfull",data);
    } catch (error) {
        
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log(error);
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        
        const {data}=await axios.post(`${API_URL}/auth/signin`,reqData.userData);
        console.log(JSON.stringify(data));

        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant");
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt});
        console.log("Login Success");
    } catch (error) {
        
        dispatch({type:LOGIN_FAILURE,payload:error})
        console.log(error);
    }
}

export const getUsesr=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        
        const {data}=await api.get(`/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        dispatch({type:GET_USER_SUCCESS,payload:data});
        console.log("USer profile",data);
    } catch (error) {
        
        dispatch({type:GET_USER_FAILURE,payload:error})
        console.log(error);
    }
}


export const addToFavourite=({jwt,restaurantId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVOURITE_REQUEST})
    try {
        
        const {data}=await api.put(`/api/restaurants/${restaurantId}/add-favourite`,{},{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        dispatch({type:ADD_TO_FAVOURITE_SUCCESS,payload:data});
        console.log("Added to favourite",data);
    } catch (error) {
        
        dispatch({type:ADD_TO_FAVOURITE_FAILURE,payload:error})
        console.log(error);
    }
}


export const logout=()=>async(dispatch)=>{
    
    try {
        
        dispatch({type:LOGOUT})
        console.log("Logout Succcesfull");
        localStorage.clear();
    } catch (error) {
        
        
        console.log(error);
    }
}