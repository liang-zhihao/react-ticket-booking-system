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

class FilmTable extends Component {
  static defaultProps = {
    url: "/film",
    idName: "filmId",
    colNames: [
      "ID",
      "Name",
      "Duration",
      "Director",
      "Actors",
      "Rating",
      "Type",
      "Poster",
      "Introduction",
      "Status",
    ],
    tableData: [
      "typeId",
      "name",
      "duration",
      "director",
      "actors",
      "rating",
      "type",
      "poster",
      "introduction",
      "status",
    ],
    listName: "list",
    tableHeader: "Film Manage",
    // ------------------------
    // Modal Form content ()
    // ------------------------
    modalHeader: "Add a new film",
    labelNames: [
      "Film Name",
      "Duration",
      "Director",
      "Actors",
      "Rating",
      "Introduction",

      "Poster",
      "Status",
    ],
    dataNames: [
      "name",
      "duration",
      "director",
      "actors",
      "rating",
      "introduction",
      "poster",
      "status",
    ],
    descriptor: {
      name: [
        Rules.required("Film name"),
        Rules.isType(Rules.TYPE.string),
        Rules.isDuplicate("/film/filmName-duplication", "name"),
      ],
    },
  };
  state = {
    items: [],
  };
  componentWillMount() {
    this.createAdminCols();
  }
  onDropdownChange = (id, type) => {
    console.log(id);
    const { list } = this.child.state;
    const { idName } = this.props;
    for (let item of list) {
      if (id === item[idName]) {
        item["type"] = type["type"];
        item["typeId"] = type["typeId"];
        updateOne("/film", item);
        break;
      }
    }
    this.child.setState((state, prop) => {
      return { list: list };
    });
    console.log(list);
  };
  onDropdownClose = (id, type) => {};
  createAdminCols = async () => {
    const { url, listName } = this.props;
    let list = [];
    let typeList = [];

    await getList(url, listName).then((myList) => {
      list = myList;
    });
    await getList("/type", listName).then((myList) => {
      typeList = myList;
    });

    const { idName, colNames, tableData } = this.props;
    // let tmp = {};
    // if (list != null) {
    //   tmp = list[0];
    // }
    // let obj = Object.assign({}, tmp);
    // let cols = Object.keys(obj);
    let items = [];
    let count = 0;

    for (let dataName of tableData) {
      if(dataName==="type"){
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{colNames[count]}</HeaderCell>
            <DropdownCell idName={idName} dataKey={tableData[count]} dropdownList={typeList} onChange={this.onDropdownChange} />
          </Column>
        );
      }else{
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{colNames[count]}</HeaderCell>
            <Cell dataKey={tableData[count]} onChange={this.child.handleChange} />
          </Column>
        );
      }
 
      count++;

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
export const DropdownCell = ({
  rowData,
  dataKey,
  onChange,
  idName,
  dropdownList,
  onOpen,
  onClose,
  ...props
}) => {
  // must deliver  dataKey, IdKey, onChange like IdKey="adminId" onChange={this.handleChange} dataKey="password"
  let options = [];
  for (let item of dropdownList) {
    let opt = {
      key: item["typeId"],
      text: item["type"],
      value: item["type"],
    };
    options.push(opt);
  }

  return (
    <Cell {...props}>
      <Modal trigger={<Button content={rowData[dataKey]} />}>
        <Dropdown
          fluid
          selection
          search
          options={options}
          onChange={(e, d) => {
            let typeId = -1;
            for (let opt of options) {
              if (opt["value"] === d.value) {
                typeId = opt["key"];
                break;
              }
            }
            const obj = {
              typeId: typeId,
              type: d.value,
            };
            onChange(rowData[idName], obj);
          }}
          placeholder={rowData[dataKey]}
        />
      </Modal>
    </Cell>
  );
};

export default FilmTable;
