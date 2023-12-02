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
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
