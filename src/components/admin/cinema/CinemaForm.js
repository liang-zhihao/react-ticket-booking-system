import { FormFieldInput } from "components/base/form/FormFieldInput";
import React, { useState } from "react";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Form, Segment, Header, Modal } from "semantic-ui-react";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";
import BaseForm from "components/base/form/BaseTableForm";
const { Cinema } = Api;
const api = Cinema;
export const CinemaForm = ({ rowData, type, formProps }) => {
  let header = {
    update: "Edit a cinema",
    create: "Add a cinema",
  };
  const dataProps = {
    name: {
      descriptor: {
        name: [Rules.required("Cinema")],
      },
      dataKey: "name",
      title: "Cinema",
      placeholder: "Please enter a cinema name",
    },
    tel: {
      descriptor: {
        tel: [Rules.required("cinema contact")],
      },
      dataKey: "tel",
      title: "Telephone number",
      placeholder: "Please enter the cinema contact",
    },
    location: {
      descriptor: {
        location: [Rules.required("location")],
      },
      dataKey: "location",
      title: "Location",
      placeholder: "Please enter the location",
    },
  };
  header = header[type];
  const FormField = Form.Field;
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
      cinemaId: rowDataExisted ? rowData["cinemaId"] : "",
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
  const getNameField = (key) => {
    const fieldProps = {
      ...dataProps["name"],
      initVal: state.name,
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getTelField = (key) => {
    const fieldProps = {
      ...dataProps["tel"],
      initVal: state.tel,
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getLocationField = (key) => {
    const fieldProps = {
      ...dataProps["location"],
      initVal: state.location,
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };

  // NOTE:  写成组件形式会导致重复render->失焦
  const getForms = () => {
    let formFields = [];
    let index = 0;
    formFields.push(getNameField(index++));
    formFields.push(getLocationField(index++));
    formFields.push(getTelField(index++));
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
