import React, { Component } from "react";
import {
  Input,
  Button,
  Form,
  FormInput,
  Grid,
  Segment,
  Message,
  Header,
  Checkbox,
  Icon,
  Confirm,
} from "semantic-ui-react";
// import { BrowserRouter as Router,Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Provider, connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actions } from "redux/user";
import PropTypes from "prop-types";
import SegmentInfo from "components/public/SegmentInfo";
import { getUserByToken, setTokenNull } from "utils/token";
import {
  getList,
  updateOne,
  deleteOne,
  createOne,
  getOne,
} from "utils/request";
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

class Profile extends Component {
  static defaultProps = {
    dataNameToMeta: {
      username: "Username",
      password: "Password",
      email: "Email",
      tel: "Phone",
      isStudent: "Is a student",
    },
  };
  state = {
    user: {},
    checked: false,
    confirmOpened: false,
  };
 async componentWillMount() {
    let { user } = this.state;
    // const id = this.props.userId;
    let id = -1;
    await getUserByToken().then((res) => {
      id = res["userId"];
    });

    getOne("/user/" + id).then((res) => {
      user = res;
      this.setState({ user });
      if (user.isStudent === 1) {
        this.setState({ checked: true });
      }
    });
  }
  componentWillUpdate() {}
  onEditChange = (dataKey, newVal) => {
    let { user, checked } = this.state;
    user[dataKey] = newVal;
    this.setState({ user });
  };
  handleCheckBox = (e) => {
    let { user, checked } = this.state;
    this.setState({ checked: !checked });
    user.isStudent = !checked;
    updateOne("/user", user);
  };
  onEditClick = (e) => {
    let { user, checked } = this.state;
    if (user["editable"] === true) {
      updateOne("/user", user);
    }
    user["editable"] = !user["editable"];
    console.log(user["editable"]);
    this.setState({ user });
  };

  handleLogout = () => {
    const { history, clearUserId } = this.props;
    setTokenNull();
    clearUserId();
    history.push("/index");
  };
  render() {
    let segments = [];
    let { user, checked, confirmOpened } = this.state;
    const { dataNameToMeta } = this.props;
    const { editable } = user;
    const keys = Object.keys(dataNameToMeta);
    for (let key of keys) {
      const meta = dataNameToMeta[key],
        info = user[key];
      if (key === "isStudent") {
        segments.push(
          <Segment size="large">
            <Grid columns={2}>
              <Grid.Row verticalAlign="middle">
                <Grid.Column style={styleMeta}>{meta}</Grid.Column>
                <Grid.Column style={styleInfo} textAlign="center">
                  <Checkbox checked={checked} onChange={this.handleCheckBox} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        );
        continue;
      }
      segments.push(
        <SegmentInfo
          meta={meta}
          info={info}
          dataKey={key}
          onEditChange={this.onEditChange}
          editable={editable}
          onEditClick={this.onEditClick}
        />
      );
    }
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={12}>
            <Segment.Group content="">{segments}</Segment.Group>
            <Button
              floated="left"
              color="green"
              size="large"
              content={editable ? "Save" : "Edit"}
              onClick={this.onEditClick}
            />
            <Button
              floated="right"
              negative
              size="large"
              content={"Log out"}
              onClick={(e) => {
                this.setState({ confirmOpened: true });
              }}
            />
            <Confirm
              open={confirmOpened}
              onCancel={(e) => {
                this.setState({ confirmOpened: false });
              }}
              onConfirm={(e) => {
                this.handleLogout();
                this.setState({ confirmOpened: false });
              }}
            ></Confirm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //   username: state.registerReducer.username,
    userId: state.user.userId,
  };
};
function mapDispatchToProps(dispatch, ownProps) {
  return {
    clearUserId: bindActionCreators(actions.clearUserId, dispatch),
  };
}

//   const RegisterForm=RegisterFormUI
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
