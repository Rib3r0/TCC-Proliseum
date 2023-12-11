import axios from "axios";

export const axiosPerfil = axios.create({
    baseURL: 'https://aware-flip-flops-ant.cyclic.app/',
    headers: {
        'Content-Type': "application/json",
        Authorization : `Bearer ${localStorage.getItem('token')}`,
    },
})

//axios.defaults.baseURL = 'https://proliseum-back.cyclic.app/'
//https://aware-flip-flops-ant.cyclic.app/
//https://proliseum-back.cyclic.app/
