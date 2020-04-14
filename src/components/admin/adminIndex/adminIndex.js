import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Grid, Menu, Sidebar, Segment, Table, Button } from "semantic-ui-react";
import AdminSidebar from "./adminSidebar";
import AdminTable from "components/admin/tables/adminTable";
import FilmTable from "../tables/filmTable";
import OrderTable from "../tables/orderTable";
import SessionTable from "../tables/sessionTable";
import UserTable from "../tables/userTable";
import CinemaTable from "../tables/cinemaTable";
import CommentTable from "components/admin/tables/commentTable.js";
export default class AdminIndex extends Component {
  // carefully check Menu.Item and Menu.item
  state = {
    visible: false,
  };
  handleClick() {
    let { visible } = this.state;
    visible = !visible;
    this.setState({ visible });
  }
  render() {
    // bookmark the best way to write css in react
    const { visible } = this.state;

    const minHeight = document.body.clientHeight + "px";
    let windowHeight = { minHeight: minHeight };


    return (
      <Sidebar.Pushable>
        <Grid columns={1}>
          <Grid.Row stretched>
            <Grid.Column style={windowHeight}>
              <AdminSidebar visible={visible} />
              <Sidebar.Pusher>
                <Menu>
                  <Menu.Item
                    as={Button}
                    icon="sidebar"
                    onClick={this.handleClick.bind(this)}
                  />
                </Menu>

                <Switch>
                  <Route path="/admin/admin-manage"  component={AdminTable} />
                  <Route path="/admin/order-manage" component={OrderTable} />
                  <Route
                    path="/admin/session-manage"
                    component={SessionTable}
                  />
                  <Route path="/admin/film-manage" component={FilmTable} />
                  <Route path="/admin/cinema-manage" component={CinemaTable} />
                  <Route
                    path="/admin/comment-manage"
                    component={CommentTable}
                  />
                  <Route path="/admin/user-manage" component={UserTable} />
                </Switch>
              </Sidebar.Pusher>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Sidebar.Pushable>
    );
  }
}
