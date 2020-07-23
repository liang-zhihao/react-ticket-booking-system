import axios from "axios";
import { getTokenHeader, setToken, getToken } from "utils/token";
import Alert from "components/public/Alert";
export const BASE_URL = "http://localhost:8090/api";
// export const BASE_URL = "http://46.137.237.243:8090/api";
let headers = getTokenHeader();
var instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers,
});
// "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFuZyIsImV4cCI6MTU4NzIyNDM0NSwiaWF0IjoxNTg3MjE3MTQ1fQ.GvHmecWhnJSQp5pq9ccGLOok1DmYle55u3k7ZcJSvyJJAfb9BZushjvKa6vEdwLQvcmIBpKu0QrINUZIkvD_rQ"
/**
 * get list from back end
 * 
 * @param  {String} url ("api/user")
 */
export async function getList(url) {
  let data = [];
  let response = await instance
    .get(url)
    .then((res) => {
      console.log(res);
      data = res.data.data;
      data.map((item) => {
        item["editable"] = false;
        item["checked"] = false;
        return null;
      });
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
}

/**
 * @param  {String } url :api url
 * @param  {Object } item : like {username: 123, password:123}
 */
export async function updateOne(url, item) {
  await instance
    .put(url, item)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
/**
 * @param  {String} url
 * @param  {Object} param such as {userId : 1}
 */
export async function deleteOne(url, param) {
  url = BASE_URL + url;
  // NOTE: @RequestParam
  await instance
    .delete(url, { params: param })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function createOne(url, obj) {
  const params = obj;
  instance
    .post(url, params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
/**
 * @param  {String} url :(api/user/1)
 */
export async function getOne(url) {
  let data = [];
  let response = await instance
    .get(url, "")
    .then((res) => {
      console.log(res);
      data = res.data.data;
      data["editable"] = false;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
}
/**
 * @param  {Object} params :{ proof : liang , password :1234}
 * @returns {String} accessToken 
 *  use toke to access any resource
 */
export async function auth(params) {
  let res = await axios
    .post(BASE_URL + "/auth", params)
    .then((res) => {
      setToken(res.data.data["accessToken"]);
      console.log("successfully login, token is "+ getToken() );
      return res.data;
    })
    .catch((err) => {
      // alert("Login wrong")
      Alert.show("Login failed", "please contact your admin", "error");
      console.error(err);
    });
  return res;
}
/**
 * @param  {Object} params
 */
export async function getUserByTokenApi(params) {
  let res = await axios
    .post(BASE_URL + "/user/accessToken", params)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      // alert("Login wrong")
      console.error(err);
    });
  return res;
}
