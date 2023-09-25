import axios from "axios";

export const axiosPerfil = axios.create({
    baseURL: 'https://proliseum-back.cyclic.app/',
    headers: {
        'Content-Type': "application/json",
    }
})

//axios.defaults.baseURL = 'https://proliseum-back.cyclic.app/'
