import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home/index.vue");
const Feedbacks = () => import("../views/Feedbacks/index.vue");
const Credecials = () => import("../views/Credecials/index.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/credencials",
    name: "Credencials",
    component: Credecials,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;