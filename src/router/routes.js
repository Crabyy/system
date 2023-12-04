import { checkIfUserIsAuthenticated, getUserRole } from "./auth";

const routes = [
  {
    path: "/",
    name: "SigninComponent",
    component: () => import("src/pages/SigninComponent.vue"),
  },

  {
    path: "/DashboardComponent",
    name: "DashboardComponent",
    component: () => import("../pages/DashboardComponent.vue"),
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (checkIfUserIsAuthenticated() && role !== "admin") {
        next();
      } else if (checkIfUserIsAuthenticated() && role === "admin") {
        // Redirect to admin dashboard or wherever you want
        next("/AdminDashboardComponent");
      } else {
        next("/");
      }
    },
  },

  {
    path: "/AdminDashboardComponent",
    name: "AdminDashboardComponent",
    component: () => import("../pages/admin/AdminDashboardComponent.vue"),
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (checkIfUserIsAuthenticated() && role === "admin") {
        next();
      } else if (checkIfUserIsAuthenticated() && role !== "admin") {
        // Redirect to user dashboard or wherever you want
        next("/DashboardComponent");
      } else {
        next("/");
      }
    },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
