import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store/index"

Vue.use(VueRouter)
//TODO add error page
const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth", requiresAuth: false, requiresUnAuth: true },
    component: () => import("@/views/Login"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "auth", requiresAuth: false, requiresUnAuth: true },
    component: () => import("@/views/SignUp"),
  },
  {
    path: "/reset",
    name: "reset-link",
    meta: { layout: "auth", requiresAuth: false, requiresUnAuth: true },
    component: () => import("@/views/ResetSendLink"),
  },
  {
    path: "/reset/:date/:id",
    name: "reset-password",
    meta: { layout: "auth", requiresAuth: false, requiresUnAuth: true },
    component: () => import("@/views/ResetPassword"),
  },
  {
    path: "/",
    name: "home",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Home"),
  },
  {
    path: "/add",
    name: "add",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Add"),
  },
  {
    path: "/inspiration",
    name: "inspiration",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Inspiration"),
  },
  {
    path: "/list",
    name: "list",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/List"),
  },
  {
    path: "/quiz",
    name: "quiz",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Quiz"),
  },
  {
    path: "/test",
    name: "test",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Test"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", requiresAuth: true, requiresUnAuth: false },
    component: () => import("@/views/Profile"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.Base_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const s = store.state
  const isLogged = store.state.auth.isUserLoggedIn
  const isLoading = store.state.auth.loading
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresUnAuth = to.matched.some((record) => record.meta.requiresUnAuth)

  if (requiresAuth && (isLogged || isLoading)) {
    next()
  } else if (requiresAuth) {
    next("/login?message=req-login")
  } else if (requiresUnAuth && isLogged) {
    next(false)
  } else {
    next()
  }
})
export default router
