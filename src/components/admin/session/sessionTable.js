import SessionForm from "components/admin/session/SessionForm";
import EditTable from "components/table/EditTable";
import React, { Component } from "react";
import { Cell, Column, HeaderCell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";
import { getList } from "utils/request";
const { Session, Type } = Api;
const api = Session;
class SessionTable extends Component {
  static defaultProps = {
    tableHeaders: [
      {
        title: "ID",
        dataKey: "sessionId",
      },
      {
        title: "Status",
        dataKey: "status",
      },
      {
        title: "Remaining Seats",
        dataKey: "remainingSeats",
      },
      {
        title: "Price",
        dataKey: "price",
      },
     
    ],
    url: "/session",
    idName: "sessionId",
    tableTitle: "Session Manage",
  };
  state = {
    columns: [],
  };
  componentDidMount() {
    this.createSessionCols();
  }
  // NOTE: async function return a Promise!!!
  createSessionCols = async () => {
    const { tableHeaders } = this.props;
    let columns = [],
      index = 0;
    for (const header of tableHeaders) {
      columns.push(
        <Column key={index++} width={100} resizable align="center">
          <HeaderCell>{header["title"]}</HeaderCell>
          <Cell dataKey={header["dataKey"]} />
        </Column>
      );
    }
    this.setState({ columns });
  };
  getFormElement = (type, formProps, rowData) => {
    const { typeOptions } = this.state;
    return (
      <SessionForm
        rowData={rowData}
        type={type}
        formProps={formProps}
        typeOptions={typeOptions}
      />
    );
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

export default SessionTable;
