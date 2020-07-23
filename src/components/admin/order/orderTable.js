import DeleteActionCell from "components/table/components/DeleteActionCell";
import React, { Component } from "react";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { Button, Form, Header, Modal, Segment, Icon } from "semantic-ui-react";
import Api from "utils/api";
import { getList, createOne, deleteOne, updateOne } from "utils/request";
import OrderForm from "./OrderForm";
import oldFormProps from "components/base/form/formProps";
const { Order } = Api;
const api = Order;
const rowKey = "orderId";
class OrderTable extends Component {
  static defaultProps = {
    tableHeaders: [
      {
        title: "ID",
        dataKey: "orderId",
      },
      {
        title: "Order Time",
        dataKey: "orderTime",
      },
      {
        title: "Pay Time",
        dataKey: "payTime",
      },
      {
        title: "Status",
        dataKey: "status",
      },
      {
        title: "Fee",
        dataKey: "fee",
      },
    ],
    url: "/order",
    idName: "orderId",
    tableTitle: "Order Manage",
  };
  state = {
    columns: [],
    data: {},
    expandedRowKeys: [],
  };
  componentDidMount() {
    this.createFilmCols();
    const { url } = this.props;
    let list = {};
    getList(url).then((res) => {
      list = res;
      this.setState({ data: list });
    });
    this.updateTable();
  }
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
  handleExpanded = (rowData, dataKey) => {
    const { expandedRowKeys } = this.state;

    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }
    this.setState({
      expandedRowKeys: nextExpandedRowKeys,
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
    return <OrderForm rowData={rowData} type={type} formProps={formProps} />;
  };
  // TODO: End here
  render() {
    const { idName } = this.props;
    const formProps = {
      ...oldFormProps,
      dispatch: this.dispatch,
    };
    let { columns, expandedRowKeys, data } = this.state;
    return (
      <Table
        rowExpandedHeight={600}
        height={400}
        data={data}
        rowKey={rowKey}
        expandedRowKeys={expandedRowKeys}
        onRowClick={(data) => {
          console.log(data);
        }}
        renderRowExpanded={(rowData) => {
          const { user, session, film, cinema, room } = rowData;
          return (
            <div>
              <Segment>
                <Form>
                  <Header content="User Info" />{" "}
                  <Form.Input
                    fluid
                    label="Username"
                    value={user["username"]}
                    readOnly
                  />
                  <Form.Input
                    fluid
                    label="Email"
                    value={user["email"]}
                    readOnly
                  />
                </Form>
              </Segment>
              <Segment>
                <Form>
                  <Header content="Film Info" />{" "}
                  <Form.Input
                    fluid
                    label="Film"
                    value={film["name"]}
                    readOnly
                  />
                  <Form.Input
                    fluid
                    label="Director"
                    value={film["director"]}
                    readOnly
                  />
                </Form>
              </Segment>
            </div>
          );
        }}
      >
        <Column width={100} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="id"
            expandedRowKeys={expandedRowKeys}
            onChange={this.handleExpanded}
          />
        </Column>
        {columns}
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
                  {this.getFormElement("update", formProps, rowData)}
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
    );
  }
}
const ExpandCell = ({
  rowData,
  dataKey,
  expandedRowKeys,
  onChange,
  ...props
}) => (
  <Cell {...props}>
    <Button basic
      size="xs"
      onClick={() => {
        onChange(rowData);
      }}
      icon=    {expandedRowKeys.some((key) => key === rowData[rowKey]) ? "minus square" : "plus square"}
     
    />
 
  </Cell>
);
export default OrderTable;
