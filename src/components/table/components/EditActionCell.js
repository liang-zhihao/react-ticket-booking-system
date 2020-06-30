

import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
} from "semantic-ui-react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
export default ({ rowData, dataKey, onClick, ...props }) => {
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