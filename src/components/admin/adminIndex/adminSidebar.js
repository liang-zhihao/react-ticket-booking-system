import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Grid, Menu, Sidebar, Segment, Table } from "semantic-ui-react";

class AdminSidebar extends Component {
  render() {
    const { visible } = this.props;
    return (
      <Sidebar
        as={Menu}
        width="thin"
        animation="push"
        direction="left"
        vertical
        icon="labeled"
        visible={visible}
      >
        <NavLink to="/admin">
          <Menu.Item icon="home" name="Index"></Menu.Item>
        </NavLink>
        <NavLink to="/admin/user-manage">
          <Menu.Item icon="users" name="User Manage"></Menu.Item>
        </NavLink>

        <NavLink to="/admin/admin-manage">
          <Menu.Item icon="user md" name="Admin Manage"></Menu.Item>
        </NavLink>
        <NavLink to="/admin/order-manage">
          <Menu.Item icon="server" name="Order Manage"></Menu.Item>
        </NavLink>
        <NavLink to="/admin/session-manage">
          <Menu.Item icon="compose" name="Session Manage"></Menu.Item>
        </NavLink>
        <NavLink to="/admin/film-manage">
          <Menu.Item icon="film" name="Film Manage"></Menu.Item>
        </NavLink>
        <NavLink to="/admin/cinema-manage">
          <Menu.Item icon="home" name="Cinema Manage"></Menu.Item>
        </NavLink>
        <NavLink to="/admin/comment-manage">
          <Menu.Item icon="comments" name="Comment Manage"></Menu.Item>
        </NavLink>
      </Sidebar>
    );
  }
}

AdminSidebar.propTypes = {};

export default AdminSidebar;
