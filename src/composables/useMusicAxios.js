import axios from "axios";

function useMusicAxios() {
  const instance = axios.create({
    timeout: 10000,
    baseURL: "https://netease-cloud-music-2lcevlrwk-hust-se-ly.vercel.app/",
  });

  return instance
}

export default useMusicAxios;