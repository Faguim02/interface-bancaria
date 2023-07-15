import axios from "axios";
import Api from "../services/Api";

export function setAuthorizationHeader(token){
    if(token){
        Api.defaults.headers.common['Authorization'] = `Beare ${token}`
    }else{
        delete Api.defaults.headers.common['Authorization']
    }
}