import { checkIfUserIsAuthenticated } from "./auth";

const routes = [
  {
    path: "/",
    name: "SigninComponent",
    component: () => import("src/pages/SigninComponent.vue"),
  },

  {
    path: "/MainLayout",
    name: "MainLayout",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    beforeEnter: (to, from, next) => {
      // Check if the user is authenticated
      if (checkIfUserIsAuthenticated()) {
        // User is authenticated, proceed to HomeComponent
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/DashboardComponent",
    name: "DashboardComponent",
    component: () => import("../pages/DashboardComponent.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
