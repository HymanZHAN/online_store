import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Product from "./views/Product.vue";
import Cart from "./views/Cart.vue";
import MenOverview from "./views/MenOverview.vue";
import WomenOverview from "./views/WomenOverview.vue";

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
        transitionName: "slide"
      }
    },
    {
      path: "/women",
      name: "women-overview",
      component: WomenOverview,
      meta: {
        position: 2,
        transitionName: "slide"
      }
    },
    {
      path: "/men",
      name: "men-overview",
      component: MenOverview,
      meta: {
        position: 3,
        transitionName: "slide"
      }
    }
  ]
});
