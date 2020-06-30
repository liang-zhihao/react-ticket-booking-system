import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Grid, Menu, Sidebar, Segment, Table } from "semantic-ui-react";
import   EditCell  from "components/table/components/EditCell";
import  EditTable from "components/table/EditTable";


class OrderTable extends Component {

        static defaultProps = {
            url: "/order",
            idName: "orderId",
            dataToLabel: {
              orderId: "ID",
              cinemaName: "Cinema",
              orderTime: "Order time",
              filmName: "Film",
            },
        
            listName: "list",
            tableHeader: "Order Manage",
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
      };
    render() {
        return (
            <EditTable
            // {...this.props}
            // tableColumns={items}
            // onRef={(ref) => {
            //   this.child = ref;
            // }}
          />
        );
    }
}

export default OrderTable;