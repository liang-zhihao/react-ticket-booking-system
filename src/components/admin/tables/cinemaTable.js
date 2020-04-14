import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Checkbox, Dropdown, Modal, Button } from "semantic-ui-react";
import { Rules } from "utils/validatorRules";
import { Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { getList, updateOne, deleteOne, createOne } from "utils/apiRequest";
import { EditTable, EditCell, CheckCell } from "./editTable";

class CinemaTable extends Component {
  static defaultProps = {
    url: "/cinema",
    idName: "cinemaId",
    colNames: ["ID", "Name", "Location", "Phone"],
    listName: "list",
    tableHeader: "Cinema Manage",
    // ------------------------
    // Modal Form content ()
    // ------------------------
    modalHeader: "Add a new cinema",
    labelNames: ["Name", "Phone", "Location"],
    dataNames: ["name", "tel", "location"],
    descriptor: {
      name: [
        Rules.required("Cinema name"),
        Rules.isType(Rules.TYPE.string),
        Rules.isDuplicate("/cinema/cinemaName-duplication", "name"),
      ],
    },
  };
  state = {
    items: [],
  };
  componentWillMount() {
    this.createAdminCols();
  }

  createAdminCols = async () => {
    const { url, listName } = this.props;
    let list = [];

    await getList(url, listName).then((myList) => {
      list = myList;
    });

    const { idName, colNames } = this.props;
    let tmp = {};
    if (list != null) {
      tmp = list[0];
    }

    let obj = Object.assign({}, tmp);
    let cols = Object.keys(obj);
    let items = [];
    let count = 0;
    for (let dataName of cols) {
      if (dataName === idName) {
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{colNames[count++]}</HeaderCell>
            <Cell dataKey={dataName} onChange={this.child.handleChange} />
          </Column>
        );
        continue;
      }
      if (dataName !== "editable" && dataName !== "checked") {
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{colNames[count++]}</HeaderCell>
            <EditCell
              dataKey={dataName}
              idName={idName}
              onChange={this.child.handleChange}
            />
          </Column>
        );
      }
    }
    this.setState({ items });
    return null;
  };
  render() {
    let { items } = this.state;
    console.log(items);
    return (
      <EditTable
        {...this.props}
        tableColumns={items}
        onRef={(ref) => {
          this.child = ref;
        }}
      />
    );
  }
}

export default CinemaTable;
