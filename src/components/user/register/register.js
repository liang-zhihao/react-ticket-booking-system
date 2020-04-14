import PropTypes from "prop-types";
import React, { Component } from "react";
import poster from "../../../poster.jpg";
import axios from "axios";
import { actions } from "../../../redux/register";
import { Provider, connect } from "react-redux";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Form,
  Message,
  Visibility,
  Input,
  Checkbox,
  Label,
  Card,
  Rating
} from "semantic-ui-react";
import RegisterFormUI from './registerForm'
class RegisterUI extends Component {
  render() {
    const h = document.body.clientHeight;
    return (
      <Grid verticalAlign="middle" className="my_container">
        <Grid.Row style={{ height: h + "px" }}>
          <Grid.Column width={8}>
            <Message>Enjoy Movie</Message>{" "}
          </Grid.Column>
          <Grid.Column width={8}>
            <RegisterFormUI />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}



const Register = connect()(RegisterUI);
export default Register;
