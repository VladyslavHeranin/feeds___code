import axios from "axios"
import { setList } from "../reducers/userRed"


export const login = (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`)
            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}

export const Auth = (username) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`)
            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}






