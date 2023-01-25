import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import SignUp from "../views/SignUp..vue";
import User from "../views/UserView.vue";
import Login from "../views/LoginView.vue";
import Unauthorised from "../views/Unauthorised.vue";
import Admin from "../views/Admin.vue";
import AdminView from "../views/AdminView.vue";
import NotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/admin", component: Admin },
  {
    path: "/admin/users",
    component: AdminView,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/admin/users", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data.success) {
            next();
          } else if (res.status === 401) {
            next("/unauthorised");
          }
        })
        .catch((err) => {
          next("/unauthorised");
        });
    },
  },
  { path: "/unauthorised", component: Unauthorised },
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: SignUp },
  {
    path: "/user/:id/todos",
    component: User,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/user/" + to.params.id + "/todos", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data.success) {
            next();
          } else if (res.status === 401) {
            next("/register");
          }
        })
        .catch((error) => {
          next("/unauthorised");
        });
    },
  },
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
