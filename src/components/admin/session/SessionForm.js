import { FormFieldInput } from "components/base/form/FormFieldInput";
import React, { useState } from "react";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Checkbox, Form, Header, Segment } from "semantic-ui-react";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";
import BaseForm from "components/base/form/BaseTableForm";
import MyDatePicker from "components/base/MyDatePicker";
const { Session } = Api;
const api = Session;
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
    update: "Edit a Session",
    create: "Add a Session",
  };
  header = header[type];
  const dataProps = {
    status: {
      descriptor: {
        status: [Rules.required("status")],
      },
      dataKey: "status",
      title: "Status",
      placeholder: "Please enter the status",
    },
    film: {
      descriptor: {
        status: [Rules.required("film")],
      },
      dataKey: "film",
      title: "Film",
      placeholder: "Please enter the film",
    },
    time: {
      descriptor: {
        time: [Rules.required("time")],
      },
      dataKey: "time",
      title: "Time",
      placeholder: "Please enter the time",
    },
  };

  const [state, setState] = useState(() => {
    const rowDataExisted = rowData !== undefined;
    const obj = createStateFromDataProps(rowDataExisted, dataProps, rowData);
    return {
      ...obj,
      sessionId: rowDataExisted ? rowData["sessionId"] : "",
      errMsg: {},
    };
  });
  //  const onDatePickerChange = async (date, id) => {
  //     const { url, idName } = this.props;
  //     const { list } = this.child.state;
  //     for (let item of list) {
  //       if (id === item[idName]) {

  //         item["time"] =date
  //         await updateOne(url, item);
  //         this.child.updateTable();
  //         break;
  //       }
  //     }
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
  const getStatusField = (key) => {
    const dataName = "status";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getFilmField = (key) => {
    const dataName = "film";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };
  const getTimeField = (key) => {
    const dataName = "time";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    const { initVal, dataKey, title } = formProps;
    return (
      <div>
        <Header>{title}</Header>
        <FormField
          as={MyDatePicker}
          date={initVal}
          itemId={dataKey}
        ></FormField>
      </div>
    );
  };

  // NOTE:  写成组件形式会导致重复render->失焦
  const getForms = () => {
    let index = 0;
    let formFields = [];
    formFields.push(getFilmField(index++));
    formFields.push(getTimeField(index++));
    formFields.push(getStatusField(index++));
    return formFields;
  };
  const formFields = getForms();
  formProps = {
    ...formProps,
    formFields,
  };
  return <BaseForm formProps={formProps} />;
};
