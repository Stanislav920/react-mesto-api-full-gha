export const baseUrl = "https://api.stas.nomoreparties.co";

export const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
       Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponseData);
}

export function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponseData);
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponseData);
}
