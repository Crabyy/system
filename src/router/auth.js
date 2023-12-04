let isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

export function checkIfUserIsAuthenticated() {
  return isAuthenticated;
}

export function simulateLogin() {
  isAuthenticated = true;
  localStorage.setItem("isAuthenticated", "true");
}

export function simulateLogout() {
  isAuthenticated = false;
  localStorage.removeItem("isAuthenticated");
}
