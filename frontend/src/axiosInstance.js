import axios from "axios";

// const baseURL = "http://localhost:4000/"
const baseURL = "https://practica--backend.herokuapp.com/"

const instance = axios.create({ baseURL });

export default instance;