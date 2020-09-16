import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: () => import("@/views/Login"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "auth" },
    component: () => import("@/views/SignUp"),
  },
  {
    path: "/reset",
    name: "reset-link",
    meta: { layout: "auth" },
    component: () => import("@/views/ResetSendLink"),
  },
  {
    path: "/reset/:id",
    name: "reset-password",
    meta: { layout: "auth" },
    component: () => import("@/views/ResetPassword"),
  },
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: () => import("@/views/Home"),
  },
  {
    path: "/add",
    name: "add",
    meta: { layout: "main" },
    component: () => import("@/views/Add"),
  },
  {
    path: "/inspiration",
    name: "inspiration",
    meta: { layout: "main" },
    component: () => import("@/views/Inspiration"),
  },
  {
    path: "/list",
    name: "list",
    meta: { layout: "main" },
    component: () => import("@/views/List"),
  },
  {
    path: "/quiz",
    name: "quiz",
    meta: { layout: "main" },
    component: () => import("@/views/Quiz"),
  },
  {
    path: "/test",
    name: "test",
    meta: { layout: "main" },
    component: () => import("@/views/Test"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.Base_URL,
  routes,
})

export default router
