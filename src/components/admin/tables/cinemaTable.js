import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Checkbox, Dropdown, Modal, Button } from "semantic-ui-react";
import { Rules } from "utils/validatorRules";
import { Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { getList, updateOne, deleteOne, createOne } from "utils/request";
import EditCell from "components/table/components/EditCell";
import EditTable from "components/table/EditTable";

class CinemaTable extends Component {
  static defaultProps = {
    tableHeaders: [
      { title: "ID", dataKey: "cinemaId", editable: false },
      { title: "Name", dataKey: "name", editable: true },
      { title: "Location", dataKey: "cinemaId", editable: true },
      { title: "Phone No", dataKey: "tel", editable: true },
    ],
    url: "/cinema",
    idName: "cinemaId",
    tableHeader: "Cinema Manage",    listName: "list",
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
    columns: [],
  };
  componentDidMount() {
    this.createCinemaCols();
  }

  createCinemaCols = () => {
    const { idName, tableHeaders } = this.props;
    let columns = [],
      index = 0;
    for (const header of tableHeaders) {
      columns.push(
        <Column key={index} width={200} resizable align="center">
          <HeaderCell>{header["title"]}</HeaderCell>
          {header["editable"] ? (
            <EditCell
              dataKey={header["dataKey"]}
              onChange={this.child.handleChange}
              idName={idName}
            />
          ) : (
            <Cell
              dataKey={header["dataKey"]}
              onChange={this.child.handleChange}
        
            />
          )}
        </Column>
      );
    }
    this.setState({ columns });
  };
  render() {
    let { columns } = this.state;
    console.log(columns);
    return (
      <EditTable
        {...this.props}
        tableColumns={columns}
        onRef={(ref) => {
          this.child = ref;
        }}
      />
    );
  }
}

export default CinemaTable;
