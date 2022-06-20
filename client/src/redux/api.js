import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
export const googleSignIn = (result) => API.post("/auth/googleSignin", result);

export const createTour = (tourData) => API.post('/tour', tourData)