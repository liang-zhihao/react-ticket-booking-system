import UserForm from "components/admin/user/UserForm";
import EditTable from "components/table/EditTable";
import React, { Component } from "react";
import { Cell, Column, HeaderCell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
class UserTable extends Component {
  static defaultProps = {
    tableHeaders: [
      {
        title: "ID",
        dataKey: "userId",
      },
      {
        title: "Username",
        dataKey: "username",
      },
      {
        title: "Email",
        dataKey: "email",
      },
      {
        title: "Password",
        dataKey: "password",
      },
      {
        title: "Phone Number",
        dataKey: "tel",
      },
      {
        title: "Student",
        dataKey: "isStudent",
      },
    ],
    url: "/user",
    idName: "userId",
    tableTitle: "User Manage",
  };
  state = {
    columns: [],
    isStudent: null,
  };
  componentWillMount() {
    this.createUserCols();
  }

  // NOTE: async function return a Promise!!!
  createUserCols = async () => {
    const { tableHeaders } = this.props;
    let columns = [],
      index = 0;
    for (const header of tableHeaders) {
      if (header.dataKey === "isStudent") {
        continue;
      }
      columns.push(
        <Column key={index++} width={200} resizable align="center">
          <HeaderCell>{header["title"]}</HeaderCell>
          <Cell dataKey={header["dataKey"]} />
        </Column>
      );
    }
    columns.push(
      <Column key={index++} width={200} resizable align="center">
        <HeaderCell>{"isStudent"}</HeaderCell>
        <Cell>
          {(rowData, rowIndex) => {
            return rowData["isStudent"] !== 0 ? "True" : "False";
          }}
        </Cell>
      </Column>
    );
    this.setState({ columns });
  };
  getFormElement = (type, formProps, rowData) => {
    return <UserForm rowData={rowData} type={type} formProps={formProps} />;
  };
  render() {
    let { columns } = this.state;
    return (
      <EditTable
        {...this.props}
        tableColumns={columns}
        getFormElement={this.getFormElement}
      />
    );
  }
}

export default UserTable;
