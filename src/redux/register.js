export const actionTypes = {
  HANDLE_CHANGE_EMAIL: "handleChangeEmail",
  SUBMIT: "submit",
  HANDLE_CHANGE_PASSWORD: "handleChangePassword",
  HANDLE_CHANGE_USERNAME: "handleChangeUsername"
};
const initState = {
  username: "",
  email: "",
  password: "",
  rePassword: ""
};
export const actions = {
  submitRegisterInfo: function(data) {
      
    return {
      type: actionTypes.SUBMIT,
      data
    };
  },
  handleChangePassword: function(data) {
    return {
      type: actionTypes.HANDLE_CHANGE_PASSWORD,
      data
    };
  },
  handleChangeUsername: function(data) {
    return {
      type: actionTypes.HANDLE_CHANGE_USERNAME,
      data
    };
  },
  handleChangeEmail: function(data) {
    return {
      type: actionTypes.HANDLE_CHANGE_EMAIL,
      data
    };
  }
};
export const registerReducer = (state=initState , action) => {
  
  switch (action.type) {
  
    case actionTypes.SUBMIT:
  
      return {
        ...state,
        username: action.data
      };
    case actionTypes.HANDLE_CHANGE_EMAIL:
      
        console.log(state)
      return {
        ...state,
        email: action.data
      };

    case actionTypes.HANDLE_CHANGE_USERNAME:
      return {
        ...state,

        username: action.data
      };

    case actionTypes.HANDLE_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.data
      };

    default:
      return state;
  }
};
