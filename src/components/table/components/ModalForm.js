import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { getList, updateOne, deleteOne, createOne } from "utils/request";
import { tableEditAction } from "utils/tableAction";
import {
  Segment,
  Button,
  Input,
  Modal,
  Form,
  Message,
  Confirm,
} from "semantic-ui-react";
import schema from "async-validator";
import { Rules } from "utils/validatorRules";
export default class ModalForm extends Component {
  state = {
    errorMessages: {
      display: false,
      content: [],
    },
    confirm: false,
  };
  // TODO: use select to 
  //   use async method to make sure wait createOne func and update table
  handleSubmit = () => {
    const { dataNames, url, descriptor } = this.props;
    const obj = {};
    let validator = new schema(descriptor);
    dataNames.forEach((name) => {
      const { [name]: value } = this.state;
      obj[name] = value;
    });
    let errorsTmp = [];
    validator
      .validate(obj)
      .then(async (e) => {
        this.setErrorMessages(false, []);
        await createOne(url, obj);
        this.close();
        this.setState({ open: false });
      })
      .catch(({ errors, fields }) => {
        for (let error of errors) {
          errorsTmp.push(error["message"]);
        }
        this.setErrorMessages(true, errorsTmp);
      });
  };
  // _____________________
  setErrorMessages = (display, content) => {
    let { errorMessages } = this.state;
    errorMessages.display = display;
    errorMessages.content = content;
    this.setState({ errorMessages });
  };
  close = () => {
    this.setState({ open: false });
    this.setErrorMessages(false, []);
    this.props.updateTale();
  };
  componentWillMount() {
    this.props.onRef(this);
  }
  render() {
    const { open, errorMessages } = this.state;
    const { dataNames, labelNames } = this.props;

    let forms = [];
    dataNames.forEach((dataName, index) => {
      forms.push(
        <Form.Field
          key={index}
          label={labelNames[index]}
          control={Input}
          name={dataName}
          type={dataName}
          onChange={(e, { name, value }) => this.setState({ [name]: value })}
        />
      );
    });
    return (
      <Modal
        open={open}
        size="tiny"
        dimmer="blurring"
        trigger={<Button>Add</Button>}
      >
        <Confirm
          open={this.state.confirm}
          onConfirm={() => {
            this.handleSubmit();
            this.setState({ confirm: false });
          }}
          onCancel={() => {
            this.setState({ confirm: false });
          }}
        ></Confirm>
        <Segment textAlign="center">
          <Form
            size="massive"
            onSubmit={() => this.setState({ confirm: open })}
          >
            {forms}
            {errorMessages.display ? (
              <Message
                size="small"
                header="Error Message"
                list={errorMessages.content}
              />
            ) : (
              ""
            )}

            <Form.Button content="Submit" />
            <Button onClick={this.close}>Cancel</Button>
          </Form>
        </Segment>
      </Modal>
    );
  }
}

// url: "/admin",
// modalHeader: "Add a new admin",
// labelNames: ["Username", "Password"],
// dataNames: ["username", "password"],
// descriptor: {
//   username: [
//     Rules.required("Username"),
//     Rules.isLength(3, 10, "Username"),
//     Rules.isType(Rules.TYPE.string),
//     Rules.isDuplicate("/admin/username-duplication", "username"),
//   ],
//   password: [Rules.required("password"), Rules.isLength(3, 10)],
// },
// };
