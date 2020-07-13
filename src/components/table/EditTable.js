import oldFormProps from "components/base/form/formProps";
import CheckCell from "components/table/components/CheckCell";
import DeleteActionCell from "components/table/components/DeleteActionCell";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Header, Menu, Modal, Segment } from "semantic-ui-react";
import { createOne, deleteOne, getList, updateOne } from "utils/request";
/**
 *
 *
 * @export
 * @class EditTable
 * @extends {Component}
 */

export default class extends Component {
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
    const { url } = this.props;
    getList(url).then((list) => {
      this.setState({ list });
      // console.log(list);
    });
  };
  /**
    deliver to 'this' father node
 * initialize the table
 *
 * @memberof EditTable
 */
  componentDidMount() {
    this.updateTable();
  }
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
  handleRefresh = () => {
    this.updateTable();
  };
  dispatch = async (type, payload, api) => {
    switch (type) {
      case "update":
        await updateOne(api, payload);
        break;
      case "create":
        await createOne(api, payload);
 
        break;
      default:
        break;
    }
    this.updateTable();
  };
  render() {
    const { list, checkedAll, rowHeight } = this.state;
    const { idName, tableTitle, tableColumns, getFormElement } = this.props;
    const formProps = {
      ...oldFormProps,
      dispatch: this.dispatch,
    };

    return (
      <div>
        <Segment>
          <Header textAlign="center" as="h2">
            {tableTitle}
          </Header>
        </Segment>
        <Menu>
          <Menu.Item>
            <Modal
              trigger={<Button>Add</Button>}
              closeIcon
              closeOnDimmerClick={false}
            >
              {getFormElement("create", formProps)}
            </Modal>
          </Menu.Item>
          <Menu.Item
            icon="minus"
            as={Button}
            name="Delete Selected"
            onClick={this.handleDeleteSelected}
          />
          <Menu.Item
            icon="redo"
            as={Button}
            name=""
            onClick={this.handleRefresh}
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
            <Cell>
              {(rowData, rowIndex) => {
                return (
                  <Modal
                    trigger={<Button>Edit</Button>}
                    closeIcon
                    closeOnDimmerClick={false}
                  >
                    {getFormElement("update", formProps, rowData)}
                  </Modal>
                );
              }}
            </Cell>
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

// class table extends Component {
//   componentWillMount() {}

//   componentDidMount() {}

//   componentWillReceiveProps(nextProps) {}

//   shouldComponentUpdate(nextProps, nextState) {}

//   componentWillUpdate(nextProps, nextState) {}

//   componentDidUpdate(prevProps, prevState) {}

//   componentWillUnmount() {}

//   render() {
//     return <div></div>;
//   }
// }
