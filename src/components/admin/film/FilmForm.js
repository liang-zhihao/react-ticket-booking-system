import BaseForm from "components/base/form/BaseTableForm";
import { FormFieldInput } from "components/base/form/FormFieldInput";
import React, { useState } from "react";
import "rsuite-table/dist/css/rsuite-table.css";
import { Dropdown, Form } from "semantic-ui-react";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";
const { Film, Type } = Api;
const api = Film;
const FilmForm = ({ rowData, type, formProps, typeOptions }) => {
  const FormField = Form.Field;
  const {
    getDescriptors,
    createStateFromDataProps,
  } = formProps;
  let header = {
    update: "Edit a film",
    create: "Add a film",
  };
  const dataProps = {
    type: {
      descriptor: {
        // type: [Rules.required("cinema contact")],
      },
      dataKey: "type",
      title: "Type",
      placeholder: "Please enter a film name",
    },
    name: {
      descriptor: {
        name: [Rules.required("name")],
      },
      dataKey: "name",
      title: "Film",
      placeholder: "Please enter a film name",
    },
    director: {
      descriptor: {
        director: [Rules.required("director")],
      },
      dataKey: "director",
      title: "Director",
      placeholder: "Please enter a director name",
    },
    introduction: {
      descriptor: {
        introduction: [Rules.required("introduction")],
      },
      dataKey: "introduction",
      title: "Introduction",
      placeholder: "Please enter introduction",
    },
    poster: {
      descriptor: {
        poster: [Rules.required("poster")],
      },
      dataKey: "poster",
      title: "Poster",
      placeholder: "Please select a poster",
    },
    duration: {
      descriptor: {
        duration: [Rules.required("duration")],
      },
      dataKey: "duration",
      title: "Duration",
      placeholder: "Please enter duration",
    },
    actors: {
      descriptor: {
        actors: [Rules.required("actors")],
      },
      dataKey: "actors",
      title: "Actors",
      placeholder: "Please enter actors",
    },
    status: {
      descriptor: {
        status: [Rules.required("status")],
      },
      dataKey: "status",
      title: "Status",
      placeholder: "Please enter the status",
    },
  };

  const [state, setState] = useState(() => {
    const rowDataExisted = rowData !== undefined;
    const obj = createStateFromDataProps(rowDataExisted, dataProps, rowData);
    return {
      ...obj,
      filmId: rowDataExisted ? rowData["filmId"] : "",
      errMsg: {},
    };
  });
  const descriptors = getDescriptors(dataProps);
  header = header[type];
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

  const getTypeField = (key) => {
    const { dataKey, title, placeholder } = dataProps["type"];
    const initValId = state.typeId;
    let pos = 0;
    for (let i = 0; i < typeOptions.length; i++) {
      if (typeOptions[i]["key"] === initValId) {
        pos = i;
        break;
      }
    }
    const onTypeChange = (e, v) => {
      setState({ ...state, typeId: v.value });
    };
    return (
      <FormField
        key={key}
        control={Dropdown}
        label={title}
        options={typeOptions}
        onChange={onTypeChange}
        placeholder={placeholder}
        name={dataKey}
        defaultValue={typeOptions[pos].value}
        selection
      />
    );
  };

  const getDirectorField = (key) => {
    const dataName = "director";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };

  const getIntroductionField = (key) => {
    const dataName = "introduction";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };

  const getPosterField = (key) => {
    const dataName = "poster";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };

  const getDurationField = (key) => {
    const dataName = "duration";
    const fieldProps = {
      ...dataProps[dataName],
      initVal: state[dataName],
    };
    formProps = { ...formProps, ...fieldProps };
    return <FormFieldInput key={key} formProps={formProps} />;
  };

  const getActorsField = (key) => {
    const dataName = "actors";
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

  // NOTE:  写成组件形式会导致重复render->失焦
  const getForms = () => {
    let index = 0;
    let formFields = [];
    formFields.push(getNameField(index++));
    formFields.push(getActorsField(index++));
    formFields.push(getDirectorField(index++));
    formFields.push(getIntroductionField(index++));
    formFields.push(getPosterField(index++));
    formFields.push(getStatusField(index++));
    formFields.push(getTypeField(index++));
    formFields.push(getDurationField(index++));
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
export default FilmForm;
