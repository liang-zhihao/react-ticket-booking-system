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
  List,
  Item,
} from "semantic-ui-react";
import { getPlaceHolder } from "utils/placeHolder";
import {
  getList,
  updateOne,
  deleteOne,
  createOne,
  getOne,
} from "utils/apiRequest";

var faker = require("faker");

class FilmDetail extends Component {
  state = {
    filmData: {},
    name: "",
    duration: 0,
    actors: "",
    director: "",
    rating: 0,
    type: "",
    poster: "",
    introduction: "",
    status: "",
  };
  componentWillMount() {
    const id = this.props.match.params.id;
    console.log(id);
    getOne("/film/" + id).then((filmData) => {
      this.setState({ filmData });
    });
  }

  render() {
    const { filmData } = this.state;
    const filmContent = [];
    console.log(filmData);
    if (
      filmData.duration === 0 ||
      filmData.duration === undefined ||
      filmData.duration === null
    ) {
      filmData.duration = faker.random.number();
    }
    if (filmData.actors === null) {
      filmData.actors=""
      for (let i = 0; i < 5; i++) {
        filmData.actors += faker.name.findName() + ", ";
      }
      filmData.actors += faker.name.findName() + "";
    }
    if(filmData.type===null||filmData.type===undefined){
      filmData.type=faker.hacker.noun()
    }
    if(filmData.introduction===null||filmData.introduction===undefined){
      filmData.introduction=faker.lorem.paragraph()
    }
    const cards=[{
      header:"Film Name",
      description:""
    },]
    filmContent.push(
      <List celled relaxed size="large" >
        <List.Item>
          <Image src={getPlaceHolder(500)}></Image>
        </List.Item>
        <List.Item
          header="Film Name:"
          content={filmData.name}
     
        />
        <List.Item header="Duration:" content={filmData.duration + " min"} />
        <List.Item header="Actors:" content={filmData.actors} />
        <List.Item header="Type:" content={filmData.type} />
        <List.Item header="rating:" content={filmData.rating} />
        <List.Item header="introduction:" content={filmData.introduction} />
        <List.Item header="status:" content={filmData.status} />
      </List>
    );
      // TODO
    // ----------session list-------
    // ----------comment list-------
    return (
      <Grid centered>
        <Grid.Row textAlign="left" columns={2} >
          <Grid.Column width={8} >{filmContent}</Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="left" columns={2} >
          <Grid.Column width={8} >{filmContent}</Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="left" columns={2} >
          <Grid.Column width={8} >{filmContent}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

FilmDetail.propTypes = {};

export default FilmDetail;
// "duration": null,
// "actors": null,
// "director": null,
// "filmId": 18,
// "name": "www",
// "rating": null,
// "typeId": 4,
// "type": "what",
// "poster": null,
// "introduction": null,
// "status": "Not released"
