import axios from "axios";

function useAxios() {
  const instance = axios.create({
    timeout: 100000,
    baseURL: "http://127.0.0.1:6324",
  });

  return instance;
}

export default useAxios;