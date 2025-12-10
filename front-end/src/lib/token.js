export function setTokenLocal(token) {
  if (token) localStorage.setItem("hv_token", token);
}

export function getTokenLocal() {
  return localStorage.getItem("hv_token");
}

export function clearTokenLocal() {
  localStorage.removeItem("hv_token");
}

export function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(atob(payload));
    return { name: json.name || json.email, email: json.email, role: json.role, id: json.id };
  } catch (e) {
    return null;
  }
}
