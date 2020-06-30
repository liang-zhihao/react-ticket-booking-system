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
import   EditCell  from "components/table/components/EditCell";
import  EditTable from "components/table/EditTable";
import DatePicker from "react-datepicker";
import { useState } from "react";
import {dateFormat} from 'utils/timeFormat';
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
    tableHeader: "Session Manage",
    // ------------------------
    // Modal Form content ()
    // ------------------------
    modalHeader: "Add a new session",
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
    this.createSessionCols();
  }
  /**
   * @param  {int} id : row data id
   * @param  { r } selectedObj
   */

  onDropdownChange = async (id, selectedObj) => {
    const { url } = this.props;
    const { list } = this.child.state;
    const { idName } = this.props;
    for (let item of list) {
      if (id === item[idName]) {
        item[selectedObj.dropdownIdName] = selectedObj.dropdownItemId;
        await updateOne(url, item);
        this.child.updateTable();
        break;
      }
    }

    console.log(list);
  };
  onDatePickerChange = async (date, id) => {
    const { url, idName } = this.props;
    const { list } = this.child.state;
    for (let item of list) {
      if (id === item[idName]) {

        item["time"] =date
        await updateOne(url, item);
        this.child.updateTable();
        break;
      }
    }

    console.log(list);
  };
  createSessionCols = async () => {
    const { url, listName, dataToLabel, idName } = this.props;
    let list = [];
    await getList(url, listName).then((myList) => {
      list = myList;
    });
    /**  
    
    */
    for (let item of list) {
      item["cinemaName"] = item["film"]["name"];
      item["filmName"] = item["cinema"]["name"];
      item["roomName"] = item["room"]["roomName"];
    }
    console.log("--------");
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
          <Column key={count} width={100} sort="true" flexGrow align="center">
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
            <DatePickerCell
              idName={idName}
              dataKey={key}
              onChange={this.onDatePickerChange}
            ></DatePickerCell>
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

    return null;
  };
  render() {
    let { items } = this.state;

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

const DatePickerCell = ({ rowData, dataKey, onChange, idName, ...props }) => {
  const [date, setNewDate] = useState();
  // must deliver  dataKey, IdKey, onChange like IdKey="adminId" onChange={this.handleChange} dataKey="password"

  return (
    <Cell {...props}>
      <Modal trigger={<Button content={rowData[dataKey]} />}>
        <MyDatePicker
          date={rowData[dataKey]}
          itemId={rowData[idName]}
          onChange={onChange}
        />
      </Modal>
    </Cell>
  );
};

export default SessionTable;
const MyDatePicker = ({ date, itemId, onChange, ...props }) => {
  const [startDate, setStartDate] = useState(new Date(date));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        onChange(dateFormat(date), itemId);
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

