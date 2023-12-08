let isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
let userRole = localStorage.getItem("userRole") || "";
let userId = localStorage.getItem("userId") || "";

export function checkIfUserIsAuthenticated() {
  return isAuthenticated;
}

export function getUserRole() {
  return userRole;
}

export function getUserId() {
  return userId;
}

export function simulateLogin(role, id) {
  isAuthenticated = true;
  userRole = role;
  userId = id;
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userRole", role);
  localStorage.setItem("userId", id);
}

export function simulateLogout() {
  isAuthenticated = false;
  userRole = "";
  userId = "";
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
}
