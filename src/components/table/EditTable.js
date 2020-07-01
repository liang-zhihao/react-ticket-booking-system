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
import Api from "utils/api";
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

  get FormProps() {
    const { Admin } = Api;
    return {
      dispatch: async (type, payload) => {
        switch (type) {
          case "update":
            await updateOne(Admin, payload);
            break;
          case "create":
            await createOne(payload);
            break;
          default:
            break;
        }
        this.updateTable();
      },
      updateTable: this.updateTable,
      fieldValidate: async (descriptor, dataName, value) => {
        let validator = new schema(descriptor);
        return validator
          .validate({ [dataName]: value })
          .then(() => {
            return null;
          })
          .catch(({ errors, fields }) => {
            return {
              content: fields[dataName][0]["message"],
              pointing: "below",
            };
          });
      },

      updateField: (e, state, setState) => {
        console.log("====================================");
        console.log(setState);
        console.log("====================================");
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      },
      getErrorProp: (dataKey, state) => {
        return state["errMsg"][dataKey];
      },
      updateFormMsg: (dataKey, newMsg, state, setState) => {
        const msg = state.errMsg;
        msg[dataKey] = newMsg;
        setState({ ...state, errMsg: msg });
      },
    };
  }
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
            <AdminFormCell type="update" {...this.FormProps} />
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

const AdminFormCell = ({ rowData, type, ...props }) => {
  // TODO: finish the reconstrction of ModalForm including update data and create data

  return (
    <Cell {...props}>
      <Modal trigger={<Button>Edit</Button>}>
        <AdminForm rowData={rowData} type={type} props={props} />
      </Modal>
    </Cell>
  );
};
const AdminForm = ({ rowData, type, props }) => {
  const FormField = Form.Field;

  const adminId = rowData["adminId"],
    dispatch = props["dispatch"],
    updateField = props["updateField"],
    fieldValidate = props["fieldValidate"],
    getErrorProp = props["getErrorProp"],
    updateFormMsg = props["updateFormMsg"];

  const [state, setState] = useState({
    adminId: adminId,
    username: rowData["username"],
    password: rowData["password"],
    errMsg: {},
  });
  // TODO: 继续封装！
  const usernameField = () => {
    // const descriptor = {
    //   username: [Rules.required("username")],
    // };
    // const dataKey = "username";
    // const title = "Username";
    // const placeholder = "Fuck you";
    // const initVal = state.username;
    // const props={}

    const formProps = {
      descriptor: {
        username: [Rules.required("username")],
      },
      dataKey: "username",
      title: "Username",
      placeholder: "Fuck you",
      initVal: state.username,
      state,
      setState,
    };
    return (
      <FormFieldInput methods={props} formProps={formProps} />
    );
  };
  const passwordField = () => {
    return (
      <FormField>
        <label>Password</label>
        <Input
          onBlur={() => {
            // validator
            //   .validate(state)
            //   .then(async () => {})
            //   .catch(({ errors, fields }) => {
            //     console.log("====================================");
            //     console.log(errors);
            //     console.log("====================================");
            //   });
          }}
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={updateField}
        />
      </FormField>
    );
  };

  return (
    <Form>
      {usernameField()}

      <Button
        type="submit"
        onClick={() => {
          dispatch(type, state);
        }}
      >
        Ok
      </Button>
    </Form>
  );
};
const FormFieldInput = ({ methods, formProps, ...props }) => {
  const { getErrorProp, fieldValidate, updateFormMsg, updateField } = methods;
  const {
    title,
    initVal,
    state,
    setState,
    placeholder,
    dataKey,
    descriptor,
  } = formProps;
  return (
    <FormField
      control={Input}
      label={title}
      placeholder={placeholder}
      value={initVal}
      onChange={(e) => {
        updateField(e, state, setState);
      }}
      name={dataKey}
      error={getErrorProp(dataKey, state)}
      onBlur={async (e) => {
        const newMsg = await fieldValidate(descriptor, dataKey, state[dataKey]);
        updateFormMsg(dataKey, newMsg, state, setState);
      }}
    />
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
