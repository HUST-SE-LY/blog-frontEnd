import axios from "axios";

function useAxios() {
  const instance = axios.create({
    timeout: 100000,
    baseURL: "https://netease-cloud-music-2lcevlrwk-hust-se-ly.vercel.app",
  });

  return instance;
}

export default useAxios;