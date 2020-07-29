import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import { getList, updateOne, deleteOne, createOne } from "utils/request";
import TopMenu from "../../components/public/TopMenu";
import IndexBody from "../../components/index/IndexBody";
import FilmDetail from "components/film/FilmDetail.js";
import Profile from "../../components/user/profile/profile";
import OrderDetail from "components/order/orderDetail";
import { isTokenNull } from "utils/token";
import SessionDetail from "components/session/sessionDetail";
import PrivateRoute from "Route/PrivateRoute";
class Index extends Component {
  render() {


    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <TopMenu />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/film/:id" component={FilmDetail} />
              <PrivateRoute
                exact
                path="/session/:id"
                component={SessionDetail}
              />
              {/* <PrivateRoute  path="/index" component={IndexBody} />*/}
              <PrivateRoute path="/" component={IndexBody} />
              {/* TODO test area */}
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Index;

class Model extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return <div></div>;
  }
}
