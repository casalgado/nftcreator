import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Merge from "../views/Merge.vue";
import Collection from "../views/Collection.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/merge",
    name: "Merge",
    component: Merge,
  },
  {
    path: "/collection",
    name: "Collection",
    component: Collection,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
