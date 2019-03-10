import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Product from "./views/Product.vue";
import Cart from "./views/Cart.vue";
import GenderOverview from "./views/GenderOverview.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        position: 1,
        depth: 1,
        transitionName: "slide"
      }
    },
    {
      path: "/products/:id",
      name: "product",
      component: Product,
      meta: { depth: 2, transitionName: "zoom" }
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: {
        position: 4,
        depth: 1,
        transitionName: "slide"
      }
    },
    {
      path: "/men",
      name: "men-overview",
      component: GenderOverview,
      meta: {
        gender: "men",
        position: 3,
        depth: 1,
        transitionName: "slide"
      }
    },
    {
      path: "/women",
      name: "women-overview",
      component: GenderOverview,
      meta: {
        gender: "women",
        position: 2,
        depth: 1,
        transitionName: "slide"
      }
    }
  ]
});
