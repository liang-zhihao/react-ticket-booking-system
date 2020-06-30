
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Checkbox,
} from "semantic-ui-react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";


export default  ({ rowData, dataKey, onClick, idName, ...props }) => {
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