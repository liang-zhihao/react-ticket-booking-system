import axios from "axios";
const BASE_URL = "http://localhost:8090/api";
export async function getList(url, listName) {
  let data = [];
  url = BASE_URL + url;
  let response = await axios
    .get(url, "")
    .then((res) => {
      console.log(res);
      data = res.data.data;
      data.map((item) => {
        item["editable"] = false;
        item["checked"] = false;
        return null;
      });
      return data ;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
}

export async function updateOne(url, item) {
  url = BASE_URL + url;
  await axios
    .put(url, item)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function deleteOne(url, param) {
  url = BASE_URL + url;
  // NOTE: @RequestParam
  await axios
    .delete(url, { params: param })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function createOne(url, obj) {
  url = BASE_URL + url;
  const params = obj;
  axios
    .post(url, params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getOne(url) {
  let data = [];
  url = BASE_URL + url;
  let response = await axios
    .get(url, "")
    .then((res) => {
      console.log(res);
      data = res.data.data;
      return data ;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
}

