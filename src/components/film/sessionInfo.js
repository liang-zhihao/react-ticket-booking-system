import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import {
  Grid,
  Icon,
  Image,

  List,
  Item,Button
} from "semantic-ui-react";
import { getPlaceHolder } from "utils/placeHolder";
import {
  getList,
  updateOne,
  deleteOne,
  createOne,
  getOne,
} from "utils/apiRequest";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
export default class SessionInfo extends Component {
  static defaultProps = {
    url: "/session",
    idName: "sessionId",
    dataToLabel: {
      sessionId: "ID",
      cinemaName: "Cinema",
      time: "Time",
      remainingSeats: "Remaining Seats",
      filmName: "Film",
      roomName: "Room",
      status: "Status",
    },
    // TODO
    listName: "list",
  };
  state = {
    list: [],
    cols: [],
    sessionList: [],
  };
  componentWillReceiveProps(nextProp) {
    console.log(nextProp.sessionList);
    this.createAdminCols();
  }
  handleBook=()=>{
    
  }
  createAdminCols = () => {
    const { url, dataToLabel, idName } = this.props;

    let cols = [];

    const dataMapKeys = Object.keys(dataToLabel);
    dataMapKeys.forEach((dataKey) => {
      cols.push(
        <Column width={100} align="center" flexGrow>
          <HeaderCell>{dataToLabel[dataKey]}</HeaderCell>
          <Cell dataKey={dataKey} idName={idName} />
        </Column>
      );
    });
    cols.push(
      <Column width={100} align="center" flexGrow>
        <HeaderCell>{"Action"}</HeaderCell>
        <Cell dataKey={idName} idName={idName} >
          <Button content="Book" onClick={this.handleBook}/>        </Cell>
      </Column>
    );
    this.setState({ cols });
  };
  render() {
    const { sessionList } = this.props;
    let list = Object.assign([], sessionList);

    for (let item of list) {
      item["cinemaName"] = item["cinema"]["name"];
      item["filmName"] = item["film"]["name"];
      item["roomName"] = item["room"]["roomName"];
      console.log(item);
    }

    const { cols } = this.state;
    return (
      <Table data={sessionList} autoHeight bordered defaultExpandAllRows>
        {cols}
      </Table>
    );
  }
}
