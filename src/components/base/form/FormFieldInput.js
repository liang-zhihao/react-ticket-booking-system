import React from "react";
import { Form, Input } from "semantic-ui-react";
export const FormFieldInput = ({ formProps, ...props }) => {
  const {
    getErrorProp,
    fieldValidate,
    updateFormMsg,
    updateField,
    state,
    setState,
    title,
    initVal,
    placeholder,
    dataKey,
    descriptors,
  } = formProps;
  const FormField = Form.Field;

  const descriptor = {
    [dataKey]: descriptors[dataKey],
  };

  return (
    <FormField
      control={Input}
      label={title}
      placeholder={placeholder}
      // NOTE:Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa).
      value={initVal || ""}
      onChange={(e) => {
        updateField(e, state, setState);
      }}
      name={dataKey}
      error={getErrorProp(dataKey, state)}
      onBlur={async (e) => {
        const errors = await fieldValidate(descriptor, state);
        updateFormMsg(errors, state, setState);
      }}
    />
  );
};
