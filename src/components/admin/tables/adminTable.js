import PropTypes from "prop-types";
import React, { Component } from "react";
import { Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { Rules } from "utils/validatorRules";
import EditCell from "components/table/components/EditCell";
import EditTable from "components/table/EditTable";

class AdminTable extends Component {
  
  static defaultProps = {
    tableHeaders: [
      {
        title: "ID",
        dataKey: "adminId",
        editable: false,
      },
      {
        title: "Username",
        dataKey: "username",
        editable: true,
      },
      {
        title: "Password",
        dataKey: "password",
        editable: true,
      },
    ],
    url: "/admin",
    idName: "adminId",
    colNames: ["ID", "Username", "Password"],
    listName: "list",
    tableHeader: "Admin Manage",
    // ------------------------
    // Modal Form content
    // ------------------------
    ModalFormHeaders: [
      { title: "Username", dataKey: "username" },
      {
        title: "Password",
        dataKey: "password",
      },
    ],

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
    columns: [],
  };
  componentDidMount() {

    this.createAdminCols();
  }
  // NOTE: async function return a Promise!!!
  createAdminCols = async () => {
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

export default AdminTable;
