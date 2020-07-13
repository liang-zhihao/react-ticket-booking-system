import { AdminForm } from "components/admin/admin/AdminForm";
import EditTable from "components/table/EditTable";
import React, { Component } from "react";
import { Cell, Column, HeaderCell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
class AdminTable extends Component {
  static defaultProps = {
    tableHeaders: [
      {
        title: "ID",
        dataKey: "adminId",
      },
      {
        title: "Username",
        dataKey: "username",
      },
      {
        title: "Password",
        dataKey: "password",
      },
    ],
    url: "/admin",
    idName: "adminId",
    tableTitle: "Admin Manage",
  };
  state = {
    columns: [],
  };
  componentDidMount() {
    this.createAdminCols();
  }
  // NOTE: async function return a Promise!!!
  createAdminCols = async () => {
    const { tableHeaders } = this.props;

    let columns = [];
    let index = 0;
    for (const header of tableHeaders) {
      columns.push(
        <Column key={index++} width={200} resizable align="center">
          <HeaderCell>{header["title"]}</HeaderCell>
          <Cell dataKey={header["dataKey"]} />
        </Column>
      );
    }
    // columns.push(
    //   <Column width={100} sort="true" resizable align="center">
    //     <HeaderCell>Edit</HeaderCell>
    //     <AdminFormCell type="update" formProps={formProps} />
    //   </Column>
    // );
    this.setState({ columns });
  };
  getFormElement = (type, formProps, rowData) => {

    return <AdminForm rowData={rowData} type={type} formProps={formProps} />;
  };
  render() {
    let { columns } = this.state;
    console.log(columns);
    return (
      <EditTable
        {...this.props}
        tableColumns={columns}
        getFormElement={this.getFormElement}
      />
    );
  }
}

export default AdminTable;
