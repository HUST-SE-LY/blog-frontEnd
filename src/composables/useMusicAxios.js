import axios from "axios";

function useMusicAxios() {
  const instance = axios.create({
    timeout: 10000,
    baseURL: "http://150.158.43.171:3000",
  });

  return instance
}

export default useMusicAxios;