import PropTypes from "prop-types";
import React, { Component, useState } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { getList, updateOne, deleteOne, createOne } from "utils/request";
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
  FormField,
  Label,
} from "semantic-ui-react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import schema from "async-validator";
import ModalForm from "components/table/components/ModalForm";
import { Rules } from "utils/validatorRules";
import EditCell from "components/table/components/EditCell";
import EditTable from "components/table/EditTable";
import CheckCell from "components/table/components/CheckCell";
import DeleteActionCell from "components/table/components/DeleteActionCell";
import EditActionCell from "components/table/components/EditActionCell";
/**
 *
 *
 * @export
 * @class EditTable
 * @extends {Component}
 */

/**
  like this 
  * static defaultProps = {
    url: "/admin",
    idName: "adminId",
    colNames: ["ID", "Username", "Password"],
    listName: "list",
    tableHeader: "Admin Manage",
    // ------------------------
    // Modal Form content
    // ------------------------
    modalHeader: "Add a new admin",
    labelNames: ["Username", "Password"],
    dataNames: ["username", "password"],
    descriptor: {
      username: [
        Rules.required("Username"),
        Rules.isLength(3, 10, "Username"),
        Rules.isType(Rules.TYPE.string),
        Rules.isDuplicate("/admin/username-duplication", "username"),
      ],
      password: [Rules.required("password"), Rules.isLength(3, 10)],
    },
  };
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
    await getList(url).then((list) => {
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
  handleUpdate = () => {};
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
            {/* <EditActionCell dataKey={idName} onClick={this.handleEdit} /> */}
            <UModalForm />
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


const UModalForm = ({ rowData, ...props }) => {
  const FormField = Form.Field;
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  console.log("====================================");
  console.log(rowData);
  console.log("====================================");
  const updateField = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  // TODO: finish the reconstrction of ModalForm including update data and create data 
  return (
    <Cell {...props}>
      <Modal trigger={<Button>Edit</Button>}>
        <Form>
          <FormField>
            <label>Username</label>
            <Input placeholder="Username" value={rowData["username"]} onChange={} />
          </FormField>
          <Form.Field >
            <label>Password</label>
            <Input placeholder="Password" value={rowData["password"]} />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </Cell>
  );
};

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
