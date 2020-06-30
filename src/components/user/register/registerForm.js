import PropTypes from "prop-types";
import React, { Component, useState } from "react";
import axios from "axios";
import { actions } from "../../../redux/user";
import { bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import schema from "async-validator";
import { Rules } from "utils/validatorRules";
import Alert from "components/public/Alert";
import {
  Grid,
  Segment,
  Form,
  Message,
  Input,
  Checkbox,
} from "semantic-ui-react";
import {
  getList,
  updateOne,
  deleteOne,
  createOne,
  getOne,
} from "utils/request";
class RegisterFormUI extends Component {
  static defaultProps = {
    descriptor: {
      username: [
        Rules.required("Username"),
        Rules.isLength(3, 10, "Username"),
        Rules.isType(Rules.TYPE.string),
        Rules.isDuplicate("/user/username-duplication", "username"),
      ],
      password: [Rules.required("password"), Rules.isLength(3, 10)],
      email: [Rules.required("Email"), Rules.isType(Rules.TYPE.email)],
    },
  };

  state = {
    isStudent: 0,
    username: "",
    password: "",
    email: "",
    rePassword: "",
    errorInfo: {
      header: "",
      show: false,
      contentList: [],
    },
  };

  // Change(e){
  //   //e.target.name代表你当前输入Input框对应的Name,如email,password
  // // e.target.value 代表当前输入的值
  // this.setState({
  //   [e.target.name] : e.target.value
  // })
  submit = () => {
    const { descriptor, history } = this.props;
    let {
      email,
      password,
      username,
      rePassword,
      isStudent,
      errorInfo,
    } = this.state;
    errorInfo.contentList = [];
    let validator = new schema(descriptor);

    let obj = {
      username: username,
      email: email,
      password: password,
      rePassword: rePassword,
      isStudent: isStudent,
    };
    validator
      .validate(obj)
      .then(async (e) => {
        if (password === rePassword) {
          await createOne("/user", obj);
          Alert.show("Sign up", "Successfully!");
          setTimeout(history.push("/index"), 1000);
          errorInfo.show = false;
        } else {
          errorInfo.contentList.push("passwords are not same");
          errorInfo.show = true;
        }
        this.setState({ errorInfo });
      })
      .catch(({ errors, fields }) => {
        errorInfo.header = "Error";
        for (let error of errors) {
          errorInfo.contentList.push(error["message"]);
        }
        errorInfo.show = true;
        this.setState({ errorInfo });
      });
  };
  render() {
    const { isStudent, errorInfo } = this.state;

    return (
      <Grid centered>
        <Grid.Column width={8}>
          <Form onSubmit={this.submit}>
            <Segment>
              <Form.Field
                control={Input}
                icon="user"
                placeholder="Username"
                type="text"
                onChange={(e) => this.setState({ username: e.target.value })}
                value={this.props.username}
              />

              <Form.Field
                control={Input}
                icon="mail"
                placeholder="Email"
                type="text"
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.props.email}
              />

              <Form.Field
                control={Input}
                icon="lock"
                placeholder="Enter password"
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.props.password}
              />

              <Form.Field
                control={Input}
                placeholder="Enter password again"
                type="password"
                icon="lock"
                onChange={(e) => this.setState({ rePassword: e.target.value })}
              />

              <Form.Field
                control={Checkbox}
                toggle
                label="Are you a student?"
                onClick={() => {
                  this.setState({ isStudent: !isStudent });
                }}
              />
              {isStudent ? (
                <Form.Input placeholder="Enter your student ID"></Form.Input>
              ) : (
                ""
              )}
              {errorInfo.show ? <ErrorMessage errorInfo={errorInfo} /> : ""}

              <Form.Button primary type="submit" className="btn" fluid>
                Sign up
              </Form.Button>
            </Segment>
            <Message>
              <Link>Forget password?</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    // userId: state.user.userId,
  };
};
function mapDispatchToProps(dispatch, ownProps) {
  return {
    // saveUserId: bindActionCreators(actions.saveUserId, dispatch),
  };
}
const RegisterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormUI);
export default withRouter(RegisterForm);

const ErrorMessage = ({ errorInfo }) => {
  const { show, header, contentList } = errorInfo;
  return <Message header={header} list={contentList} />;
};
