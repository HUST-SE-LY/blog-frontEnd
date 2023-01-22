import axios from "axios";

function useAxios() {
  const instance = axios.create({
    timeout: 100000,
    baseURL: "http://127.0.0.1:6324",
  });

  return instance;
}

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use((response) => {
  console.log(response)
  return response;

});

export default useAxios;