import React, { Component } from "react";
import {
  Input,
  Button,
  Form,
  FormInput,
  Grid,
  Segment,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";
import {withRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./loginForm";
import { Provider, connect } from "react-redux";
import PropTypes from "prop-types";
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  render() {
  
    
    return (
      <Grid
        container
        centered
        textAlign="center"
        style={{ marginTop: "10%" }}
        verticalAlign="middle"
      >
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h1" textAlign="center">
              Login in
            </Header>
            <LoginForm />
          </Grid.Column>{" "}
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //   username: state.registerReducer.username,
  };
};
function mapDispatchToProps(dispatch, ownProps) {
  return {
    // handleChangeUsername:bindActionCreators(actions.handleChangeUsername,dispatch),
  };
}

//   const RegisterForm=RegisterFormUI
export default (connect(mapStateToProps, mapDispatchToProps)(Login)) 
