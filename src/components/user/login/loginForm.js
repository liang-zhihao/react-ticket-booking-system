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
import { withRouter } from "react-router-dom";
// import { BrowserRouter as Router,Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actions } from "redux/user";
import PropTypes from "prop-types";
import { auth } from "utils/request";
// import history from "utils/history";
class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };
  state = {
    proof: "",
    password: "",
  };
  static propTypes = {
    accessToken: PropTypes.string,
  };
  submit() {
    const { proof, password } = this.state;
    const { saveUserId } = this.props;
    const params = { proof, password };
    auth(params).then((res) => {
      console.log(`UserId is ${res["data"]["userId"]}`);
      saveUserId(res["data"]["userId"]);
      setTimeout(this.props.history.replace("/"), 1000);
    });
  }
  render() {
    const { proof, password } = this.state;

    return (
      <Form onSubmit={this.submit.bind(this)}>
        <Segment stacked>
          <Form.Field>
            <Input
              icon="user"
              placeholder="Username or email"
              type="text"
              value={proof}
              onChange={(e) => this.setState({ proof: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon="lock"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Field>
          <Button primary type="submit" fluid>
            Login
          </Button>
        </Segment>
        <Message>
          <Link to="/forget-pwd">Forget password?</Link>{" "}
          <Link to="/register" style={{ float: "right" }}>
            Register
          </Link>
        </Message>
      </Form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.userId,
  };
};
function mapDispatchToProps(dispatch, ownProps) {
  return {
    saveUserId: bindActionCreators(actions.saveUserId, dispatch),
  };
}

//   const RegisterForm=RegisterFormUI
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
