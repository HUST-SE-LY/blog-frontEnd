export default function persistState(store) {
  window.addEventListener('beforeunload', () => {
    window.localStorage.setItem("vuex", JSON.stringify(store.state));
  })
  const prevState = window.localStorage.getItem("vuex");
  if(prevState) {
    store.replaceState(JSON.parse(prevState));
  }
}