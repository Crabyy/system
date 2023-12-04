let isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
let userRole = localStorage.getItem("userRole") || "";

export function checkIfUserIsAuthenticated() {
  return isAuthenticated;
}

export function getUserRole() {
  return userRole;
}

export function simulateLogin(role) {
  isAuthenticated = true;
  userRole = role;
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userRole", role);
}

export function simulateLogout() {
  isAuthenticated = false;
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRole");
}
