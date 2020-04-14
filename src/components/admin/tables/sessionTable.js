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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class SessionTable extends Component {
  static defaultProps = {
    url: "/session",
    idName: "sessionId",
    dataToLabel: {
      sessionId: "ID",
      cinemaName: "Cinema",
      time: "Time",
      remainingSeats: "Remaining Seats",
      filmName: "Film",
      roomName: "Room",
      status: "Status",
    },
    listName: "list",
    tableHeader: "Film Manage",
    // ------------------------
    // Modal Form content ()
    // ------------------------
    modalHeader: "Add a new film",
    labelNames: [
      "Cinema",
      "Film",
      "Time",
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
    // descriptor: {
    //   name: [
    //     Rules.required("Film name"),
    //     Rules.isType(Rules.TYPE.string),
    //     Rules.isDuplicate("/film/filmName-duplication", "name"),
    //   ],
    // },
  };
  state = {
    items: [],
  };
  componentWillMount() {
    this.createAdminCols();
  }
  onDropdownChange = (id, selectedObj) => {
    const { url } = this.props;
    console.log(id);
    const { list } = this.child.state;
    const { idName } = this.props;
    for (let item of list) {
      if (id === item[idName]) {
        item[selectedObj.dropdownIdName] = selectedObj.dropdownItemId;
        updateOne(url, item);
        break;
      }
    }
    this.child.setState((state, prop) => {
      return { list: list };
    });
    console.log(list);
  };

  createAdminCols = async () => {
    const { url, listName, dataToLabel, idName } = this.props;
    let list = [];
    await getList(url, listName).then((myList) => {
      list = myList;
    });
    for (let item of list) {
      item["cinemaName"] = item["film"]["name"];
      item["filmName"] = item["cinema"]["name"];
      item["roomName"] = item["room"]["roomName"];
    }
    console.log(list);
    let items = [],
      count = 0;

    const dataMapKeys = Object.keys(dataToLabel);

    for (let key of dataMapKeys) {
      let dropdownInfo = {};
      let dropdownList = [];
      switch (key) {
        case "cinemaName":
          await getList("/cinema").then((myList) => {
            dropdownList = myList;
            dropdownInfo["tableName"] = "cinema";
            dropdownInfo["idName"] = "cinemaId";
            dropdownInfo["value"] = "name";
            dropdownInfo["url"] = "/cinema";
          });

          break;
        case "filmName":
          await getList("/film").then((myList) => {
            dropdownList = myList;
            dropdownInfo["tableName"] = "film";
            dropdownInfo["idName"] = "filmId";
            dropdownInfo["value"] = "name";
            dropdownInfo["url"] = "/film";
          });
          break;
        case "roomName":
          await getList("/room").then((myList) => {
            dropdownList = myList;
            dropdownInfo["tableName"] = "room";
            dropdownInfo["idName"] = "roomId";
            dropdownInfo["value"] = "roomName";
            dropdownInfo["url"] = "/room";
          });
          break;
        default:
      }
      if (key === "cinemaName" || key === "filmName" || key === "roomName") {
        dropdownInfo["list"] = dropdownList;
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{dataToLabel[key]}</HeaderCell>
            <DropdownCell
              idName={idName}
              dataKey={key}
              dropdownInfo={dropdownInfo}
              onChange={this.onDropdownChange}
            />
            {/* onChange */}
          </Column>
        );
        continue;
      } else if (key === "time") {
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{dataToLabel[key]}</HeaderCell>
            <Cell
              idName={idName}
              dataKey={key}
              onChange={this.child.handleChange}>
            
              <DatePicker ></DatePicker>{" "}
            </Cell>
          </Column>
        );
      } else {
        items.push(
          <Column key={count} width={100} sort="true" resizable align="center">
            <HeaderCell>{dataToLabel[key]}</HeaderCell>
            <Cell
              idName={idName}
              dataKey={key}
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
const DropdownCell = ({
  rowData,
  dataKey,
  onChange,
  idName,
  dropdownInfo,
  onOpen,
  onClose,
  ...props
}) => {
  // must deliver  dataKey, IdKey, onChange like IdKey="adminId" onChange={this.handleChange} dataKey="password"
  let options = [];
  for (let item of dropdownInfo["list"]) {
    let opt = {
      key: item[dropdownInfo["idName"]],
      text: item[dropdownInfo["value"]],
      value: item[dropdownInfo["value"]],
    };
    options.push(opt);
  }
  console.info(dataKey + "----------------");
  return (
    <Cell {...props}>
      <Modal
        trigger={
          <Button
            content={rowData[dropdownInfo["tableName"]][dropdownInfo["value"]]}
          />
        }
      >
        <Dropdown
          fluid
          selection
          search
          options={options}
          onChange={(e, data) => {
            let dropdownItemId = -1;
            for (let opt of options) {
              if (opt["value"] === data.value) {
                dropdownItemId = opt["key"];
                break;
              }
            }
            const obj = {
              dropdownItemId: dropdownItemId,
              dropdownIdName: dropdownInfo["idName"],
            };
            onChange(rowData[idName], obj);
          }}
          placeholder={
            rowData[dropdownInfo["tableName"]][dropdownInfo["value"]]
          }
        />
      </Modal>
    </Cell>
  );
};

const DateCell = ({
  rowData,
  dataKey,
  onChange,
  idName,
  dropdownInfo,
  onOpen,
  onClose,
  ...props
}) => {
  // must deliver  dataKey, IdKey, onChange like IdKey="adminId" onChange={this.handleChange} dataKey="password"
  let options = [];
  for (let item of dropdownInfo["list"]) {
    let opt = {
      key: item[dropdownInfo["idName"]],
      text: item[dropdownInfo["value"]],
      value: item[dropdownInfo["value"]],
    };
    options.push(opt);
  }
  console.info(dataKey + "----------------");
  return (
    <Cell {...props}>
      <Modal
        trigger={
          <Button
            content={rowData[dropdownInfo["tableName"]][dropdownInfo["value"]]}
          />
        }
      >
        <Dropdown
          fluid
          selection
          search
          options={options}
          onChange={(e, data) => {
            let dropdownItemId = -1;
            for (let opt of options) {
              if (opt["value"] === data.value) {
                dropdownItemId = opt["key"];
                break;
              }
            }
            const obj = {
              dropdownItemId: dropdownItemId,
              dropdownIdName: dropdownInfo["idName"],
            };
            onChange(rowData[idName], obj);
          }}
          placeholder={
            rowData[dropdownInfo["tableName"]][dropdownInfo["value"]]
          }
        />
      </Modal>
    </Cell>
  );
};

export default SessionTable;
