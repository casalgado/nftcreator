import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Merge from "../views/Merge.vue";
import Collection from "../views/Collection.vue";
import JagerCollection from "../views/JagerCollection.vue";
import MetadataMod from "../views/MetadataMod.vue";

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
  {
    path: "/jager",
    name: "Jager",
    component: JagerCollection,
  },
  {
    path: "/metadata",
    name: "Metadata",
    component: MetadataMod,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
