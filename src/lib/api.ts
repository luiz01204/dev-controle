import axios from "axios";
import Axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXTAUTH_URL
});