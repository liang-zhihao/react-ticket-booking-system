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
import login from "../user/login/login";
import Register from "../user/register/register";
import { getList, updateOne, deleteOne, createOne } from "utils/request";
export default class TopMenu extends Component {
  state = {
    activeItem: "",
  };
  render() {
    var sto = window.sessionStorage;
    let profileUrl = "/profile";

    const { activeItem } = this.state;
    return (
      <Grid>
        <Grid.Row columns={1} verticalAlign="middle">
          <Grid.Column width={16}>
            <Menu>
              {/* <span>Logo</span> */}

              <NavLink to="/index">
                <Menu.Item
                  icon="home"
                  name="Index"
                  active={activeItem === "index"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="home" />
                  Index
                </Menu.Item>
              </NavLink>
              <NavLink to="/cinema">
                <Menu.Item
                  name="Cinema"
                  active={activeItem === "cinema"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="video"></Icon>
                  Cinema
                </Menu.Item>
              </NavLink>
              <NavLink to="/film">
                <Menu.Item
                  name="films"
                  active={activeItem === "films"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="film"></Icon>
                  Films
                </Menu.Item>
              </NavLink>
              <Menu.Menu position="right">
                <NavLink to={"/profile"}>
                  {" "}
                  <Menu.Item
                    name="profile"
                    active={activeItem === "profile"}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="user" />
                  </Menu.Item>
                </NavLink>
                <Menu.Item>
                  <Input
                    type="text"
                    icon="search"
                    placeholder="Search Films..."
                  />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
