import { checkIfUserIsAuthenticated, getUserRole } from "./auth";

const routes = [
  {
    path: "/",
    name: "SigninComponent",
    component: () => import("src/layouts/SignInLayout.vue"),
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
    path: "/",
    name: "SideBar",
    component: () => import("../pages/admin/sidebar/SideBar.vue"),
    children: [
      {
        path: "/Profile",
        name: "ProfileComponent",
        component: () => import("../components/user/Profile.vue"),
      },
      {
        path: "/Dashboard",
        name: "DashboardComponent",
        component: () => import("../components/user/Dashboard.vue"),
      },
      {
        path: "/Unitselection",
        name: "UnitSelection",
        component: () => import("../components/user/UnitSelection.vue"),
      },
      {
        path: "/AcquireUnit",
        name: "AcquireUnit",
        component: () => import("../components/user/AcquireUnit.vue"),
      },
    ],
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
    name: "adminSideBar",
    component: () => import("../pages/admin/sidebar/adminSideBar.vue"),
    children: [
      {
        path: "/AdminProfile",
        name: "AdminProfile",
        component: () => import("../components/admin/AdminProfile.vue"),
      },
      {
        path: "/Administration",
        name: "AdminDashboard",
        component: () => import("../components/admin/AdminDashboard.vue"),
      },
      {
        path: "/AdminUnitSelection",
        name: "AdminUnitSelection",
        component: () => import("../components/admin/AdminUnitSelection.vue"),
      },
      {
        path: "/AdminAcquireUnit",
        name: "AdminAcquireUnit",
        component: () => import("../components/admin/AdminAcquireUnit.vue"),
      },

      {
        path: "/ClientManagement",
        name: "ClientAccountManagement",
        component: () =>
          import("../components/admin/ClientAccountManagement.vue"),
      },
      {
        path: "/AdminManagement",
        name: "AdminAccountManagement",
        component: () =>
          import("../components/admin/AdminAccountManagement.vue"),
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
