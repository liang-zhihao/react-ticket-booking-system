

import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
} from "semantic-ui-react";
import {  Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
export default  ({ rowData, dataKey, onClick, ...props }) => {
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