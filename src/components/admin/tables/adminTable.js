import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { getList, updateOne, deleteOne, createOne } from "utils/apiRequest";
import { tableEditAction } from "utils/tableAction";
import {
  Grid,
  Menu,
  Sidebar,
  Segment,
  Button,
  Icon,
  Input,
  Header,
  Checkbox,
  Modal,
  Form,
} from "semantic-ui-react";
import { Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { Rules } from "utils/validatorRules";
import { EditTable, EditCell } from "./editTable";

class AdminTable extends Component {
  static defaultProps = {
    url: "/admin",
    idName: "adminId",
    colNames: ["ID", "Username", "Password"],
    listName: "list",
    tableHeader: "Admin Manage",
    // ------------------------
    // Modal Form content
    // ------------------------
    modalHeader: "Add a new admin",
    labelNames: ["Username", "Password"],
    dataNames: ["username", "password"],
    descriptor: {
      username: [
        Rules.required("Username"),
        Rules.isLength(3, 10, "Username"),
        Rules.isType(Rules.TYPE.string),
        Rules.isDuplicate("/admin/username-duplication", "username"),
      ],
      password: [Rules.required("password"), Rules.isLength(3, 10)],
    },
  };
  state = {
    items: [],
  };
  componentWillMount() {
    this.createAdminCols();
  }
  // NOTE: async function return a Promise!!!
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
    for (let colName of cols) {
      if (colName === idName) {
        items.push(
          <Column
            key={count}
            width={100}
            sort="true"
            fixed
            resizable
            align="center"
          >
            <HeaderCell>{colNames[count++]}</HeaderCell>
            <Cell dataKey={colName} onChange={this.child.handleChange} />
          </Column>
        );
        continue;
      }
      if (colName !== "editable" && colName !== "checked") {
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{colNames[count++]}</HeaderCell>
            <EditCell
              dataKey={colName}
              idName={idName}
              onChange={this.child.handleChange}
            />
          </Column>
        );
      }
    }
    this.setState({ items });
    console.log(items);
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

export default AdminTable;

class adminTable extends Component {
  constructor(props) {
    super(props);
  }

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
