import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Checkbox } from "semantic-ui-react";
import { Rules } from "utils/validatorRules";
import { Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { getList, updateOne, deleteOne, createOne } from "utils/apiRequest";
import { EditTable, EditCell, CheckCell } from "./editTable";

class UserTable extends Component {
  static defaultProps = {
    url: "/user",
    idName: "userId",
    colNames: [
      "Username",
      "Email",
      "Password",
      "Telephone",
      "Is Student",
      "Portrait",
      "ID",
    ],
    listName: "list",
    tableHeader: "User Manage",
    // ------------------------
    // Modal Form content ()
    // ------------------------
    modalHeader: "Add a new user",
    labelNames: [
      "Username",
      "Email",
      "Password",
      "Telephone",
      "Is Student (1 or 0)",
      "Portrait",
    ],
    dataNames: [
      "username",
      "email",
      "password",
      "tel",
      "isStudent",
      "Portrait",
    ],
    descriptor: {
      username: [
        Rules.required("Username"),
        Rules.isLength(3, 10, "Username"),
        Rules.isType(Rules.TYPE.string),
        Rules.isDuplicate("/user/username-duplication", "username"),
      ],
      password: [Rules.required("Password"), Rules.isLength(3, 10)],
      email: [Rules.required("Email"), Rules.isType(Rules.TYPE.email)],
    },
  };
  state = {
    items: [],
    isStudent: null,
  };
  componentWillMount() {
    this.createAdminCols();
  }
  handleIsStd = (checked, id) => {
    const { list } = this.child.state;
    const { idName } = this.props;
    for (let item of list) {
      if (id === item[idName]) {
        if (item["isStudent"] !== 0) {
          item["isStudent"] = 0;
        } else {
          item["isStudent"] = 1;
        }
        updateOne("/user", item);
        break;
      }
    }
    this.child.setState({ list });
  };
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
    console.log("asd");
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
      } else if (colName === "isStudent") {
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
            <IsStudentCheckCell
              dataKey="isStudent"
              idName={idName}
              onClick={this.handleIsStd}
            />
            {/* <CheckCell
              dataKey="isStudent"
              idName={idName}
              onClick={this.handleIsStd}
            /> */}
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

export default UserTable;

const IsStudentCheckCell = ({
  rowData,
  dataKey,
  onClick,
  idName,
  ...props
}) => {
  // must deliver  dataKey, IdKey, onChange like IdKey="adminId" onChange={this.handleChange} dataKey="password"
  let checkVal = rowData[dataKey];
  let editable = null;
  if (dataKey === "isStudent") {
    if (rowData[dataKey] !== 0) {
      checkVal = true;
    } else {
      checkVal = false;
    }
  }
  return (
    <Cell {...props}>
      <Checkbox
        checked={checkVal}
        onClick={(event, data) => {
          console.info(event);
          const dataId = rowData[idName];
          onClick(data.checked, dataId);
        }}
      />
    </Cell>
  );
};
