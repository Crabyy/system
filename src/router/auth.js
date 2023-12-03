let isAuthenticated = false;

export function checkIfUserIsAuthenticated() {
  return isAuthenticated;
}

export function simulateLogin() {
  isAuthenticated = true;
}

export function simulateLogout() {
  isAuthenticated = false;
}
