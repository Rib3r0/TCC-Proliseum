import axios from "axios";

export const axiosPerfil = axios.create({
    baseURL: 'https://proliseum-back.cyclic.app/',
    headers: {
        'Content-Type': "application/json",
        Authorization : `Bearer ${localStorage.getItem('token')}`
    }
})

//axios.defaults.baseURL = 'https://proliseum-back.cyclic.app/'
