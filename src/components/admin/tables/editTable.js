import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { getList, updateOne, deleteOne, createOne } from "utils/apiRequest";
import { tableEditAction } from "utils/tableAction";
import {
  Grid,
  Menu,
  Sidebar,
  Segment,
  Button,
  Icon,
  Input,
  Header,
  Checkbox,
  Modal,
  Form,
} from "semantic-ui-react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import schema from "async-validator";
import ModalForm from "components/admin/tables/modalForm";
import { Rules } from "utils/validatorRules";
/**
 *
 *
 * @export
 * @class EditTable
 * @extends {Component}
 */
export class EditTable extends Component {
  static defaultProps = {};
  state = {
    list: [],
    checkedAll: false,
    rowHeight: 50,
  };
  static propTypes = {
    cols: PropTypes.array,
  };

  /**
   * get list form back-end
   *
   * @memberof EditTable
   */
  updateTable = async () => {
    const { url, listName } = this.props;
    await getList(url, listName).then((list) => {
      this.setState({ list });
      console.log(list);
    });
  };
  /**
    deliver to 'this' father node
 * initialize the table
 *
 * @memberof EditTable
 */
  componentWillMount() {
    this.props.onRef(this);
    this.updateTable();
  }
  handleEdit = (id) => {
    tableEditAction(id, this);
  };

  handleChange = (id, key, value) => {
    const { list } = this.state;
    const { idName } = this.props;
    for (let item of list) {
      if (item[idName] === id) {
        item[key] = value;
        break;
      }
    }
    this.setState({ list });
  };
  /**
   * connect to the delete button
   *
   * @memberof EditTable
   */
  handleDelete = (dataKey, id) => {
    const { url } = this.props;
    const param = { [dataKey]: id };
    // NOTE: @Requestparam
    deleteOne(url, param).then((res) => {
      this.updateTable();
    });
  };

  handleCheck = (data, id) => {
    const { list } = this.state;
    const { idName } = this.props;
    for (let item of list) {
      if (item[idName] === id) {
        if (item["checked"] === true) {
          item["checked"] = false;
        } else {
          item["checked"] = true;
        }
        break;
      }
    }
    this.setState({ list });
  };
  handleDeleteSelected = async () => {
    const { url, idName } = this.props;
    const { list } = this.state;
    for (let item of list) {
      if (item["checked"] === true) {
        const param = { [idName]: item[idName] };
        await deleteOne(url, param);
      }
    }

    // NOTE : @Requestparam

    this.updateTable();
  };

  render() {
    const { list, checkedAll } = this.state;
    const { idName, colNames, tableHeader, tableColumns } = this.props;
    const { rowHeight } = this.state;
    // if(list[0]["isStudent"]!==null){
    //   console.info(list[0].isStudent)
    // }

    return (
      <div>
        <Segment>
          <Header textAlign="center" as="h2">
            {tableHeader}
          </Header>
        </Segment>
        <Menu>
          <Menu.Item
            onClick={(e) => {
              const { open } = this.child.state;
              if (!open) {
                this.child.setState({ open: true });
              }
            }}
          >
            <ModalForm
              {...this.props}
              onRef={(ref) => {
                this.child = ref;
              }}
              updateTale={this.updateTable}
            />
          </Menu.Item>
          <Menu.Item
            icon="minus"
            as={Button}
            name="Delete Selected"
            onClick={this.handleDeleteSelected}
          />
        </Menu>

        <Table
          data={list}
          autoHeight
          virtualized
          bordered
          defaultExpandAllRows
          rowHeight={rowHeight}
        >
          {/* checkbox columns */}
          <Column width={50} align="center" fixed>
            <HeaderCell></HeaderCell>
            <CheckCell
              dataKey="checked"
              idName={idName}
              onClick={this.handleCheck}
            />
          </Column>
          {/* data columns */}
          {tableColumns}
          <Column width={100} sort="true" resizable align="center">
            <HeaderCell>Edit</HeaderCell>
            <EditActionCell dataKey={idName} onClick={this.handleEdit} />
          </Column>
          <Column width={100} sort="true" resizable align="center">
            <HeaderCell>Delete</HeaderCell>
            <DeleteActionCell dataKey={idName} onClick={this.handleDelete} />
          </Column>
        </Table>
      </div>
    );
  }
}
// TODO: asyn

export const CheckCell = ({ rowData, dataKey, onClick, idName, ...props }) => {
  // must deliver  dataKey, IdKey, onChange like IdKey="adminId" onChange={this.handleChange} dataKey="password"
  let checkVal = rowData[dataKey];
  let editable = null;
  return (
    <Cell {...props}>
      <Checkbox
        checked={checkVal}
        onClick={(event, data) => {
          onClick(data, rowData[idName]);
        }}
      />
    </Cell>
  );
};
export const EditCell = ({ rowData, dataKey, onChange, idName, ...props }) => {
  // must deliver  dataKey, IdKey, onChange like IdKey="adminId" onChange={this.handleChange} dataKey="password"
  return (
    <Cell {...props}>
      {rowData["editable"] === true ? (
        <Input
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange(rowData[idName], dataKey, event.target.value);
          }}
        />
      ) : (
        rowData[dataKey]
      )}
    </Cell>
  );
};

const EditActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  // must deliver like dataKey="adminId" onClick={this.handleEdit}
  return (
    <Cell {...props} style={{ padding: "6px 0" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData[dataKey]);
        }}
      >
        {rowData["editable"] === true ? "Save" : "Edit"}
      </Button>
    </Cell>
  );
};
const DeleteActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: "6px 0" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(dataKey, rowData[dataKey]);
        }}
      >
        Delete
      </Button>
    </Cell>
  );
};

class table extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return <div></div>;
  }
}

const setDelay = (millisecond) => {
  return new Promise((resolve, reject) => {
    if (typeof millisecond != "number")
      reject(new Error("参数必须是number类型"));
    setTimeout(() => {
      resolve(`我延迟了${millisecond}毫秒后输出的`);
    }, millisecond);
  });
};
const setDelaySecond = (seconds) => {
  return new Promise((resolve, reject) => {
    if (typeof seconds != "number" || seconds > 10)
      reject(new Error("参数必须是number类型，并且小于等于10"));
    setTimeout(() => {
      resolve(`我延迟了${seconds}秒后输出的，注意单位是秒`);
    }, seconds * 1000);
  });
};
