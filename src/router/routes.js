import { checkIfUserIsAuthenticated, getUserRole } from "./auth";

const routes = [
  {
    path: "/",
    component: () => import("src/layouts/SignInLayout.vue"),
    beforeEnter: (to, from, next) => {
      // If the user is already authenticated, redirect to the appropriate dashboard
      if (checkIfUserIsAuthenticated()) {
        const role = getUserRole();
        if (role === "admin") {
          next("/admin/Dashboard");
        } else {
          next("/user/Dashboard");
        }
      } else {
        // Allow access to the SigninComponent for non-authenticated users
        next();
      }
    },
  },

  {
    path: "/user",
    component: () => import("../layouts/user/SideBar.vue"),
    children: [
      {
        path: "Profile",
        name: "UserProfile",
        component: () => import("../components/user/ProfileComponent.vue"),
      },
      {
        path: "Dashboard",
        name: "UserDashboard",
        component: () => import("../components/user/Dashboard.vue"),
      },
      {
        path: "UnitSelection",
        name: "UserUnitSelection",
        component: () => import("../components/user/UnitSelection.vue"),
      },
      {
        path: "AcquireUnit",
        name: "UserAcquireUnit",
        component: () => import("../components/user/AcquireUnit.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (checkIfUserIsAuthenticated() && role !== "admin") {
        next();
      } else {
        // Redirect to the root path for unauthorized access
        next("/");
      }
    },
  },

  {
    path: "/admin",
    component: () => import("../layouts/admin/AdminSideBar.vue"),
    children: [
      {
        path: "Profile",
        name: "AdminProfile",
        component: () => import("../components/admin/AdminProfile.vue"),
      },
      {
        path: "Dashboard",
        name: "AdminDashboard",
        component: () => import("../components/admin/AdminDashboard.vue"),
      },
      {
        path: "UnitSelection",
        name: "AdminUnitSelection",
        component: () => import("../components/admin/AdminUnitSelection.vue"),
      },
      {
        path: "AcquireUnit",
        name: "AdminAcquireUnit",
        component: () => import("../components/admin/AdminAcquireUnit.vue"),
      },
      {
        path: "ClientManagement",
        name: "ClientAccountManagement",
        component: () =>
          import("../components/admin/ClientAccountManagement.vue"),
      },
      {
        path: "AdminManagement",
        name: "AdminAccountManagement",
        component: () =>
          import("../components/admin/AdminAccountManagement.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      const role = getUserRole();
      if (checkIfUserIsAuthenticated() && role === "admin") {
        next();
      } else {
        // Redirect to the root path for unauthorized access
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
