import { FormFieldInput } from "components/base/form/FormFieldInput";
import React, { useState } from "react";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Checkbox, Form, Header, Segment } from "semantic-ui-react";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";
import BaseForm from "components/base/form/BaseTableForm";
const { Order } = Api;
const api = Order;
// OrderForm
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
    update: "Edit an order",
    create: "Add an order",
  };
  header = header[type];
  const dataProps = {
    orderTime: {
      descriptor: {
        orderTime: [Rules.required("orderTime")],
      },
      dataKey: "orderTime",
      title: "Order time",
      placeholder: "Please enter order time",
    },
    payTime: {
      descriptor: {
        payTime: [Rules.required("payment time")],
      },
      dataKey: "payTime",
      title: "Payment time",
      placeholder: "Please enter the payment time",
    },
    status: {
      descriptor: {
        status: [Rules.required("status")],
      },
      dataKey: "status",
      title: "Status",
      placeholder: "Please enter the order status",
    },
    fee: {
      descriptor: {
        tefeel: [Rules.required("fee")],
      },
      dataKey: "fee",
      title: "Fee",
      placeholder: "Please enter the fee",
    },
  };
  const [state, setState] = useState(() => {
    const rowDataExisted = rowData !== undefined;
    const obj = createStateFromDataProps(rowDataExisted, dataProps, rowData);
    return {
      ...obj,
      userId: rowDataExisted ? rowData["orderId"] : "",
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

  const getOrderTimeField = (key) => {
    const dataName = "orderTime";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getFeeField = (key) => {
    const dataName = "fee";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getStatusField = (key) => {
    const dataName = "status";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getPayTimeField = (key) => {
    const dataName = "payTime";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };

  // NOTE:  写成组件形式会导致重复render->失焦
  const getForms = () => {
    let index = 0;
    let formFields = [];
    formFields.push(getOrderTimeField(index++));
    formFields.push(getPayTimeField(index++));
    formFields.push(getStatusField(index++));
    formFields.push(getFeeField(index++));
    return formFields;
  };
  const formFields = getForms();
  formProps = {
    ...formProps,
    formFields,
  };
  return <BaseForm formProps={formProps} />;
};
