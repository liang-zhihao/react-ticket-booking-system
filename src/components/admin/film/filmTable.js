import FilmForm from "components/admin/film/FilmForm";
import EditTable from "components/table/EditTable";
import React, { Component } from "react";
import { Cell, Column, HeaderCell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import Api from "utils/api";
import { Rules } from "utils/validatorRules";
import { getList } from "utils/request";
const { Film, Type } = Api;
const api = Film;
class FilmTable extends Component {
  static defaultProps = {
    tableHeaders: [
      {
        title: "ID",
        dataKey: "filmId",
      },
      {
        title: "Type",
        dataKey: "type",
      },
      {
        title: "Name",
        dataKey: "name",
      },
      {
        title: "Director",
        dataKey: "director",
      },
      {
        title: "Introduction",
        dataKey: "introduction",
      },
      {
        title: "Poster",
        dataKey: "poster",
      },
      {
        title: "Status",
        dataKey: "status",
      },
      {
        title: "Actors",
        dataKey: "actors",
      },
      {
        title: "Rating",
        dataKey: "rating",
      },
    ],
    url: "/film",
    idName: "filmId",
    tableTitle: "Film Manage",
  };
  state = {
    columns: [],
    typeOptions: [],
  };
  componentDidMount() {
    this.createFilmCols();
    this.getTypeOptions();
  }

  getTypeOptions = () => {
    let typeOptions = [];
    getList(Type).then((typeList) => {
      for (const type of typeList) {
        typeOptions.push({
          key: type["typeId"],
          value: type["typeId"],
          text: type["type"],
        });
      }
      this.setState({ typeOptions });
    });
  };
  // NOTE: async function return a Promise!!!
  createFilmCols = async () => {
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
      <FilmForm
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

export default FilmTable;
