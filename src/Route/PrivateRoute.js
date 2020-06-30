import { isLogged } from "utils/token";
import { Route, withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import { loginJump } from "utils/history";
class PrivateRoute extends Component {
  componentWillMount() {
    const { history } = this.props;
    loginJump(history);
  }
  componentWillUpdate() {
    const { history } = this.props;
    loginJump(history);
    // TODO: fix  book ticket and profile 
  }
  render() {
    let { component: Component, ...rest } = this.props;
    return isLogged() ? (
      <Route {...rest} render={(props) => <Component {...props} />} />
    ) : (
      <Message error size="massive">
        Please Login...
      </Message>
    );
  }
}

export default withRouter(PrivateRoute);
