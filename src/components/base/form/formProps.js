import schema from "async-validator";
import "rsuite-table/dist/css/rsuite-table.css";
import Api from "utils/api";
import { createOne, updateOne } from "utils/request";

export default {
  dispatch: async (type, payload, api) => {
    switch (type) {
      case "update":
        await updateOne(api, payload);
        break;
      case "create":
        await createOne(api, payload);
        break;
      default:
        break;
    }
    return;
  },
  fieldValidate: async (descriptor, object) => {
    let validator = new schema(descriptor);
    return validator
      .validate(object)
      .then(() => {
        // what did the function validate
        let fields = Object.keys(descriptor);
        let newMsg = [];
        for (const field of fields) {
          newMsg.push({ field, message: null });
        }
        return newMsg;
      })
      .catch(({ errors, fields }) => {
        return errors;
      });
  },

  updateField: (e, state, setState) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  },
  getErrorProp: (dataKey, state) => {
    return state["errMsg"][dataKey];
  },
  updateFormMsg: (errors, state, setState) => {
    let msg = state.errMsg === null ? {} : state.errMsg;
    for (const error of errors) {
      msg[error.field] = error.message;
    }

    setState({ ...state, errMsg: msg });
  },
  canDispatch: (errors) => {
    for (const i of errors) {
      if (i["message"] !== null) {
        return false;
      }
    }
    return true;
  },
  getDescriptors: (dataProps) => {
    const objList = Object.keys(dataProps);
    let descriptors = {};
    for (const i of objList) {
      if (dataProps[i]["descriptor"] !== undefined) {
        Object.assign(descriptors, dataProps[i]["descriptor"]);
      }
    }
    return descriptors;
  },
  createStateFromDataProps: (rowDataExisted, dataProps, rowData) => {
    const keyList = Object.keys(dataProps);
    let obj = {};
    for (const i of keyList) {
      Object.assign(obj, { [i]: rowDataExisted ? rowData[i] : "" });
    }
    return obj;
  },
  clearInputVal: (nullValState, state) => {
  
    let newState = state;
    newState = Object.assign(newState, nullValState);
    return newState;
  },
};
