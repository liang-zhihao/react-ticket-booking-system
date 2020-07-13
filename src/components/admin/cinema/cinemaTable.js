
import { CinemaForm } from "components/admin/cinema/CinemaForm";
import EditTable from "components/table/EditTable";
import React, { Component } from "react";
import { Cell, Column, HeaderCell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
class CinemaTable extends Component {
  static defaultProps = {
    tableHeaders: [
      {
        title: "ID",
        dataKey: "cinemaId",
      },
      {
        title: "Name",
        dataKey: "name",
      },
      {
        title: "Location",
        dataKey: "location",
      },
      {
        title: "Tel",
        dataKey: "tel",
      },
    
    ],
    url: "/cinema",
    idName: "cinemaId",
    tableTitle: "Cinema Manage",
  };
  state = {
    columns: [],

  };
  componentWillMount() {
    this.createCinemaCols();
  }
  // NOTE: async function return a Promise!!!
  createCinemaCols = async () => {
    const { tableHeaders } = this.props;
    let columns = [];
    let index=0
    for (const header of tableHeaders) {
      columns.push(
        <Column key={index++} width={200} resizable align="center">
          <HeaderCell>{header["title"]}</HeaderCell>
          <Cell dataKey={header["dataKey"]} />
        </Column>
      );
    }
    this.setState({ columns });
  };
  getFormElement = (type, formProps, rowData) => {

    return <CinemaForm rowData={rowData} type={type} formProps={formProps} />;
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

export default CinemaTable;