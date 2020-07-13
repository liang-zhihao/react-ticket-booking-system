import { FormFieldInput } from "components/base/form/FormFieldInput";
import React, { useState } from "react";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";import BaseForm from "components/base/form/BaseTableForm";
const { Admin } = Api;
const api = Admin;
export const AdminForm = ({ rowData, type, formProps }) => {
  let header = {
    update: "Edit an admin",
    create: "Add an admin",
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
        password: [Rules.required("password")],
      },
      dataKey: "password",
      title: "Password",
      placeholder: "Please enter password",
    },
  };
  const {
    dispatch,
    updateFormMsg,
    fieldValidate,
    canDispatch,
    getDescriptors,
    createStateFromDataProps,
    clearInputVal,
  } = formProps;
  const [state, setState] = useState(() => {
    const rowDataExisted = rowData !== undefined;
    const obj = createStateFromDataProps(rowDataExisted, dataProps, rowData);
    return {
      ...obj,
      cinemaId: rowDataExisted ? rowData["adminId"] : "",
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
  const FormField = Form.Field;


  const getPasswordField = (key) => {
    const fieldProps = {
      ...dataProps["password"],
      initVal: state.password,
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getUsernameField = (key) => {
    const fieldProps = {
      ...dataProps["username"],
      initVal: state.username,
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getForms = () => {
    let formFields = [];
    let index = 0;
    formFields.push(getUsernameField(index++));
    formFields.push(getPasswordField(index++));
    return formFields;
  };
  const formFields = getForms();
  formProps = {
    ...formProps,
    formFields,
  };
  return (
    <BaseForm formProps={formProps} />
  );
};
