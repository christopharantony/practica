import axios from "axios";

const baseURL = "http://localhost:4000/"

const instance = axios.create({ baseURL });

export default instance;