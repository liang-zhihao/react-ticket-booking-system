import React, { Component } from "react";

import {
  Grid,
  Segment,
  Form,
  Message,
  Input,
  Checkbox,
} from "semantic-ui-react";
const styleMeta = {
  // font:"#5f5447"
  color: "#5f6368",
  fontFamily: "Roboto,Arial,sans-serif",
  fontSize: "11px",
};
const styleInfo = {
  // font:"#5f5447"
  color: "#202124",
  fontFamily: "Roboto,Arial,sans-serif",
  fontSize: "16px",
};

const SegmentInfo = ({
  meta,
  info,
  editable,
  dataKey,
  onEditChange,
  onEditClick,
}) => {
  return (
    <Segment size="large">
      <Grid columns={2}>
        <Grid.Row verticalAlign="middle">
          <Grid.Column style={styleMeta}>{meta}</Grid.Column>
          <Grid.Column style={styleInfo} textAlign="center">
            {editable === true ? (
              <Input
                defaultValue={info}
                onChange={(event) => {
                  onEditChange(dataKey, event.target.value);
                }}
              />
            ) : (
              info
            )}
          </Grid.Column>
          <Grid.Column textAlign="right"></Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
export default SegmentInfo;
