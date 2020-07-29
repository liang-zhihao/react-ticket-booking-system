import Tables from "components";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Button, Grid, Menu, Sidebar } from "semantic-ui-react";
import AdminSidebar from "components/admin/adminIndex/adminSidebar";
import AdminIndexBody from "containers/admin/components/indexBody"
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
    // NOTE the best way to write css in react
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
            
           
                  <Route
                    path="/admin/admin-manage"
                    component={Tables.AdminTable}
                  />
                  <Route
                    path="/admin/order-manage"
                    component={Tables.OrderTable}
                  />
                  <Route
                    path="/admin/session-manage"
                    component={Tables.SessionTable}
                  />
                  <Route
                    path="/admin/film-manage"
                    component={Tables.FilmTable}
                  />
                  <Route
                    path="/admin/cinema-manage"
                    component={Tables.CinemaTable}
                  />
                  {/* <Route
                    path="/admin/comment-manage"
                    component={CommentTable}
                  /> */}
                  <Route
                    path="/admin/user-manage"
                    component={Tables.UserTable}
                  />
                   <Route
                    path="/admin" exact
                    component={AdminIndexBody}
                  />
                </Switch>
              </Sidebar.Pusher>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Sidebar.Pushable>
    );
  }
}
