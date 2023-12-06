import { checkIfUserIsAuthenticated, getUserRole } from "./auth";

const routes = [
  {
    path: "/",
    name: "SigninComponent",
    component: () => import("src/pages/SigninComponent.vue"),
    beforeEnter: (to, from, next) => {
      // If the user is already authenticated, redirect to the appropriate dashboard
      if (checkIfUserIsAuthenticated()) {
        const role = getUserRole();
        if (role === "admin") {
          next("/Administration");
        } else {
          next("/Dashboard");
        }
      } else {
        // Allow access to the SigninComponent for non-authenticated users
        next();
      }
    },
  },

  {
    path: "/Dashboard",
    name: "DashboardComponent",
    component: () => import("../pages/DashboardComponent.vue"),
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (checkIfUserIsAuthenticated() && role !== "admin") {
        next();
      } else if (checkIfUserIsAuthenticated() && role === "admin") {
        // Redirect to admin dashboard or wherever you want
        next("/Administration");
      } else {
        next("/");
      }
    },
  },

  {
    path: "/",
    name: "SideBar",
    component: () => import("../pages/admin/sidebar/SideBar.vue"),
    children: [
      {
        path: "/Administration",
        name: "AdminDashboard",
        component: () => import("../pages/admin/AdminDashboardComponent.vue"),
      },
      {
        path: "/ClientManagement",
        name: "ClientAccountManagement",
        component: () => import("../pages/admin/ClientAccountManagement.vue"),
      },
      {
        path: "/AdminManagement",
        name: "AdminAccountManagement",
        component: () => import("../pages/admin/AdminAccountManagement.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (checkIfUserIsAuthenticated() && role === "admin") {
        next();
      } else if (checkIfUserIsAuthenticated() && role !== "admin") {
        // Redirect to user dashboard or wherever you want
        next("/Dashboard");
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
