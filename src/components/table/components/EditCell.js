import PropTypes from "prop-types";
import React, { Component } from "react";
import {

  Input,

} from "semantic-ui-react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";


export default  ({ rowData, dataKey, onChange, idName, ...props }) => {
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