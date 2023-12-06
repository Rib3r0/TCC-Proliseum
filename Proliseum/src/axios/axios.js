import axios from "axios";

export const axiosPerfil = axios.create({
    baseURL: 'https://lonely-jade-helmet.cyclic.app/',
    headers: {
        'Content-Type': "application/json",
        Authorization : `Bearer ${localStorage.getItem('token')}`,
    },
})

//axios.defaults.baseURL = 'https://proliseum-back.cyclic.app/'
//https://alive-dog-parka.cyclic.app/
//https://proliseum-back.cyclic.app/