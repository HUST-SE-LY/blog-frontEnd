import axios from "axios";

function useAxios() {
  const instance = axios.create({
    timeout: 10000,
    baseURL: "https://150.158.43.171:8088",
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
