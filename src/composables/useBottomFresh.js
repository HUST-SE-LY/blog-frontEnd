import useAxios from "./useAxios";

const axios = useAxios();

function useBottomFresh() {
  async function fresh(path, limit, offset, isLoading, e, list) {
    if (
      e.srcElement.scrollTop + e.srcElement.offsetHeight <
      e.srcElement.scrollHeight
    )
      return;
    if (isLoading.value) return;
    isLoading.value = true;
    console.log(offset.value);
    const res = await axios.post(path, {
      limit: limit,
      offset: offset.value,
    });
    list.value = list.value.concat(res.data.blogs);
    offset.value += res.data.blogs.length;
    isLoading.value = false;
    if (res.data.blogs.length < limit) {
      return true;
    } else {
      return false;
    }
  }
  return fresh;
}

export default useBottomFresh;
