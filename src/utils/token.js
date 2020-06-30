import { getUserByTokenApi } from "utils/request";
let sto = window.sessionStorage;
let headers = {};

export function getTokenHeader() {
  let token = getToken();
  // token="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFuZyIsImV4cCI6MTU4NzIyNDM0NSwiaWF0IjoxNTg3MjE3MTQ1fQ.GvHmecWhnJSQp5pq9ccGLOok1DmYle55u3k7ZcJSvyJJAfb9BZushjvKa6vEdwLQvcmIBpKu0QrINUZIkvD_rQ"
  if (!isTokenNull()) {
    token = "Bearer " + token;
    headers = { Authorization: token };
    return headers;
  }
  return headers;
}
export function getToken() {
  let token = sto.getItem("accessToken");
  return token;
}
export function setToken(token) {
  let sto = window.sessionStorage;
  sto.setItem("accessToken", token);
}
export function isTokenNull() {
  let token = getToken();
  if (token === null || token === "-1") {
    return true;
  } else {
    return false;
  }
}
export function setTokenNull() {
  let sto = window.sessionStorage;
  sto.setItem("accessToken", "-1");
}
export function isLogged() {
  return !isTokenNull();
}
export async function getUserByToken() {

  let param = {
      accessToken: getToken(),
    };
  let res = await getUserByTokenApi(param).then((res) => {
    return res;
  });
  return res;
}
