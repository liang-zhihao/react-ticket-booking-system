const initState = {
  userId: "",
};
const actionTypes = {
  SAVE_USER_ID: "saveUserId",
  CLEAR_USER_ID: "clearUserId",
};
export const actions = {
  saveUserId: function (data) {
    console.log(`UserId is ${data}`)
    return {
      type: actionTypes.SAVE_USER_ID,
      data,
    };
  },
  clearUserId: function () {
    return {
      type: actionTypes.CLEAR_USER_ID,
      data: "",
    };
  },
};
export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_ID:

      return {
        ...state,
        userId: action.data,
      };
    case actionTypes.CLEAR_USER_ID:
      return {
        ...state,
        userId: -1,
      };
    default:
      return state;
  }
};
/**
  username: "",
  email: "",
  password: "",
  rePassword: "",
  accessToken: "",

  HANDLE_CHANGE_EMAIL: "handleChangeEmail",
  SUBMIT: "submit",
  HANDLE_CHANGE_PASSWORD: "handleChangePassword",
  HANDLE_CHANGE_USERNAME: "handleChangeUsername",
  GET_ACCESS_TOKEN: "getAccessToken",
submitRegisterInfo: function (data) {
  return {
    type: actionTypes.SUBMIT,
    data,
  };
},
handleChangePassword: function (data) {
  return {
    type: actionTypes.HANDLE_CHANGE_PASSWORD,
    data,
  };
},
handleChangeUsername: function (data) {
  return {
    type: actionTypes.HANDLE_CHANGE_USERNAME,
    data,
  };
},
handleChangeEmail: function (data) {
  return {
    type: actionTypes.HANDLE_CHANGE_EMAIL,
    data,
  };
},
getAccessToken: function (data) {
  return {
    type: actionTypes.GET_ACCESS_TOKEN,
    data,
  };
},

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT:
      return {
        ...state,
        username: action.data,
      };
    case actionTypes.HANDLE_CHANGE_EMAIL:
      console.log(state);
      return {
        ...state,
        email: action.data,
      };

    case actionTypes.HANDLE_CHANGE_USERNAME:
      return {
        ...state,
        username: action.data,
      };

    case actionTypes.HANDLE_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.data,
      };
    case actionTypes.GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.data,
      };
    case actionTypes.SAVE_USER_ID:
      return {
        ...state,
        userId: action.data,
      };
    default:
      return state;
  }
};
*/
