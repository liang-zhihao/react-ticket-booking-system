import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import {

  Grid,

  Icon,
  Image,

  Menu,

  Input,
  Card,
  Rating,
} from "semantic-ui-react";
import Login from "components/user/login/login";
import Register from "components/user/register/register";
import { getList, updateOne, deleteOne, createOne } from "utils/apiRequest";
import TopMenu from "../public/TopMenu"
import IndexBody from './IndexBody'
import FilmDetail from "components/film/FilmDetail.js"
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
              <Route path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/film/:id" component={FilmDetail} /> 
              <Route path="/" component={IndexBody} />
      
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
