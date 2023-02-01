import axios from "axios";

function useMusicAxios() {
  const instance = axios.create({
    timeout: 10000,
    baseURL: "music",
  });

  return instance
}

export default useMusicAxios;