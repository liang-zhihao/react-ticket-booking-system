import React from "react";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Form, Header, Segment } from "semantic-ui-react";
// BaseForm
export default ({ formProps }) => {
  const {
    dispatch,
    updateFormMsg,
    fieldValidate,
    canDispatch,
    createStateFromDataProps,
    clearInputVal,
    formFields,
    header,
    dataProps,
    type,
    state,
    setState,
    descriptors,
    api,
  } = formProps;
  return (
    <Segment stacked size="huge">
      <Header>{header}</Header>
      <Form>
        <Button
          floated="right"
          color="red"
          size="mini"
          icon="undo"
          onClick={() => {
            const nullValState = createStateFromDataProps(false, dataProps);
            const newState = clearInputVal(nullValState, state);
            setState({ ...newState });
          }}
          content="Clear All"
        />
        {formFields}
        <Button
          positive
          icon="checkmark"
          type="submit"
          labelPosition="right"
          onClick={async (e) => {
            const errors = await fieldValidate(descriptors, state);
            updateFormMsg(errors, state, setState);
            if (canDispatch(errors)) dispatch(type, state, api);
          }}
          content="OK"
        />
      </Form>
    </Segment>
  );
};
