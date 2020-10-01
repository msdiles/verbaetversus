import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store/index"

Vue.use(VueRouter)
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
    path: "/words/add",
    name: "addWord",
    meta: { layout: "main", requiresAuth: true, requiresUnAuth: false },
    component: () => import("@/views/AddWord"),
  },
  {
    path: "/word/:word",
    name: "word",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Word"),
  },
  {
    path: "/quotes/add",
    name: "addQuote",
    meta: { layout: "main", requiresAuth: true, requiresUnAuth: false },
    component: () => import("@/views/AddQuote"),
  },
  {
    path: "/quote/:quote",
    name: "quote",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Quote"),
  },
  {
    path: "/inspiration",
    name: "inspiration",
    meta: { layout: "main", requiresAuth: true, requiresUnAuth: false },
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
  {
    path: "*",
    name: "error",
    meta: { layout: "main", requiresAuth: false, requiresUnAuth: false },
    component: () => import("@/views/Error"),
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.Base_URL,
  routes,
})

router.beforeEach((to, from, next) => {
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
