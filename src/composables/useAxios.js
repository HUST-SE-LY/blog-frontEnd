import axios from "axios";

function useAxios() {
  const instance = axios.create({
    timeout: 10000,
    baseURL: "http://127.0.0.1:6324",
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}


export default useAxios;
