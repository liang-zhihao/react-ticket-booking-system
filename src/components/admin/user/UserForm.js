import { FormFieldInput } from "components/base/form/FormFieldInput";
import React, { useState } from "react";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Checkbox, Form, Header, Segment } from "semantic-ui-react";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";
import BaseForm from "components/base/form/BaseTableForm";
const { User } = Api;
const api = User;
export default ({ rowData, type, formProps }) => {
  const FormField = Form.Field;
  const {
    dispatch,
    updateFormMsg,
    fieldValidate,
    canDispatch,
    getDescriptors,
    createStateFromDataProps,
  } = formProps;
  let header = {
    update: "Edit a user",
    create: "Add a user",
  };
  header = header[type];
  const dataProps = {
    username: {
      descriptor: {
        username: [Rules.required("username")],
      },
      dataKey: "username",
      title: "Username",
      placeholder: "Please enter username",
    },
    password: {
      descriptor: {
        password: [Rules.required("usepasswordrname")],
      },
      dataKey: "password",
      title: "Password",
      placeholder: "Please enter password",
    },
    email: {
      descriptor: {
        email: [Rules.required("email")],
      },
      dataKey: "email",
      title: "Email",
      placeholder: "Please enter your email",
    },
    tel: {
      descriptor: {
        tel: [Rules.required("tel")],
      },
      dataKey: "tel",
      title: "Phone number",
      placeholder: "Please enter your phone number",
    },
    isStudent: {
      dataKey: "isStudent",
      title: "Is a student",
      placeholder: "Are you a student",
    },
  };
  const [state, setState] = useState(() => {
    const rowDataExisted = rowData !== undefined;
    const obj = createStateFromDataProps(rowDataExisted, dataProps, rowData);
    return {
      ...obj,
      userId: rowDataExisted ? rowData["userId"] : "",
      errMsg: {},
    };
  });
  const descriptors = getDescriptors(dataProps);
  formProps = {
    ...formProps,
    state,
    setState,
    descriptors,
    header,
    dataProps,
    type,
    api,
  };
  const getUsernameField = (key) => {
    const dataName = "username";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getPasswordField = (key) => {
    const dataName = "password";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getEmailField = (key) => {
    const dataName = "email";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getTelField = (key) => {
    const dataName = "tel";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getIsStudentField = (key) => {
    const { dataKey, title, placeholder } = dataProps["isStudent"];
    const initVal = state.isStudent === 0 ? false : true;
    const onIsStudentChange = (e, val) => {
      const status = val["checked"];
      console.log(val["checked"]);
      setState({
        ...state,
        isStudent: status === true ? 1 : 0,
      });
    };
    return (
      <FormField
        key={key}
        defaultChecked={initVal}
        control={Checkbox}
        label={title}
        onChange={onIsStudentChange}
        placeholder={placeholder}
        name={dataKey}
      />
    );
  };

  // NOTE:  写成组件形式会导致重复render->失焦
  const getForms = () => {
    let index = 0;
    let formFields = [];
    formFields.push(getUsernameField(index++));
    formFields.push(getPasswordField(index++));
    formFields.push(getEmailField(index++));
    formFields.push(getTelField(index++));
    formFields.push(getIsStudentField(index++));
    return formFields;
  };
  const formFields = getForms();
  formProps = {
    ...formProps,
    formFields,
  };
  return <BaseForm formProps={formProps} />;
};
