import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });
api.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token"))?.token
    }`;
  }
  return req;
});
export const getAllItems = (page) => api.get(`/items/?page=${page}`);
export const getItemsByCategory = (category) =>
  api.get(`/items/Category/?category=${category}`);
export const setLike = (itemId) => api.patch(`items/Like/${itemId}`);
export const soldItem = (itemId) => api.patch(`items/Sold/${itemId}`);
export const deletePost = (itemId) => api.delete(`/items/Delete/${itemId}`);
export const createPostItem = (itemData) => api.post("/items/", itemData);
export const getItemDetails = (itemId) => api.get(`items/${itemId}`);
export const updateItem = (itemId, formData) =>
  api.put(`items/Update/${itemId}`, formData);

export const userDetails = () => api.get("/users/");
export const Purchase = (itemDetails) => api.patch(`/users/`, itemDetails);
export const login = (formData) => api.post("/users/login", formData);
export const register = (formData) => api.post("/users/register", formData);
