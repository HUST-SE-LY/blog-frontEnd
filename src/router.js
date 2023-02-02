
import { createRouter, createWebHistory } from "vue-router";

// import home from './pages/home.vue'
// import blog from './pages/blog.vue'
// import back from './pages/back.vue'

const home = () => {return import('./pages/home.vue')};
const blog = () => {return import('./pages/blog.vue')};
const back = () => {return import('./pages/back.vue')};
const about = () => {return import('./pages/about.vue')};

const routes = [
  {
    path:"/",
    redirect:'/home',
  },
  {
    path:'/blog/:id',
    component: blog,
    meta:{
      title:'博客喵～'
    }
  },
  {
    name: 'home',
    path: "/home",
    component: home,
    meta:{
      title:'这里是首页喵～'
    }
  },
  {
    path:'/back',
    component: back,
    meta: {
      title: '这里是后台喵'
    }
  },{
    path:'/about',
    component: about,
    meta: {
      title: '关于本站'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from) => {
  if(to.path === '/') {
    return '/home'
  }
  if(to.meta.title) {
    document.title = to.meta.title;
  }
})

export default router