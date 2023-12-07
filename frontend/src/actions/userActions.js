import { loginRequest } from "../slices/authSlice";

export const login = (email, password) => async(dispatch) =>{
    try{
        dispatch(loginRequest)
    }catch(error){
        
    }

}