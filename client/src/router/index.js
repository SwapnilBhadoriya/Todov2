import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import SignUp from "../views/SignUp..vue";
import User from "../views/UserView.vue";
import Login from "../views/LoginView.vue"

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  {path:'/login',component:Login},
  { path: "/register", component: SignUp },
  {
    path: "/user/:id/todos",
    component: User,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      axios.get("http://localhost:3000/user/"+to.params.id+'/todos', {
        headers: { Authorization: localStorage.getItem("token") },
      }).then((res)=>{
        if(res.data.success){
          next();
        }
        else if(res.status === 401){
          next('/register');
        }
      }).catch((error)=>{
        
        next('/register')
      });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
