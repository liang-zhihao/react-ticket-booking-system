import axios from "axios";
const BASE_URL = "http://localhost:8090/api";
export const Rules = {
  required: (dataName) => ({
    required: true,
    message: dataName + " is required",
  }),
  isLength: (min, max,dataName) => ({
    min: min,
    max: max,
    message: dataName+": maximum length is " + max + " and  minimum is " + min,
  }),

  TYPE: {
    string: "string",
    number: "number",
    boolean: "boolean",
    method: "function",
    regexp: "regexp",
    integer: "integer",
    float: "float",
    array: "array",
    object: "object",
    enum: "enum",
    date: "date",
    url: "url",

    email: "email",
  },
  isType: (typeName) => ({
    type: typeName,
    message: "require " + typeName,
  }),
  isDuplicate: (url, dataName) => {
    url = BASE_URL + url;
    //   bookmark: get=>  const params = { params: { [dataName]: value } }
    //   bookmark: if there are async requests ,you need asyncValidator
    return {
      asyncValidator: async (rule, value) => {
        const params = { params: { [dataName]: value } };
        let code = 0;
// axios request is not sync
        return new Promise((resolve, reject) => {
          axios
            .get(url, params)
            .then((res) => {
              console.log(res);
              code = res.data.code;
              if (code !== 200) {
                reject(dataName + " is duplicate"); // reject with error message
              } else {
                resolve();
              }
            })
            .catch((err) => {
              reject(dataName + " is duplicate");
              console.error(err);
            });
        });
      },
    };
  },
};
