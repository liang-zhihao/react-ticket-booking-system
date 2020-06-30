import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Alert from "components/public/Alert";
import {
  Link,
  Switch,
  Route,
  NavLink,
  Redirect,
  withRouter,
} from "react-router-dom";
import {
  Grid,
  Icon,
  Image,
  List,
  Item,
  Button,
  Segment,
  Header,
} from "semantic-ui-react";
import { getPlaceHolder } from "utils/placeHolder";
import {
  getList,
  updateOne,
  deleteOne,
  createOne,
  getOne,
} from "utils/request";
import SegmentInfo from "components/public/SegmentInfo";
import { getUserByToken } from "utils/token";
import { dateFormat } from "utils/timeFormat";
class SessionDetail extends Component {
  /**
sessionId: 2
filmId: 19
time: "2020-04-10 14:30"
status: null
remainingSeats: 50
roomId: 3
cinemaId: 5
price: null
cinema: null
film: null
room: null
editable: false */
  static defaultProps = {
    dataToLabel: {
      filmName: "Film",
      time: "Time",
      status: "Status",
      remainingSeats: "Remaining seats",
      cinemaName: "Cinema",
      roomName: "Room",
      price: "Price",
    },
  };
  state = {
    segments: [],
    film: {},
    cinema: {},
    room: {},
  };
  handleBook = async () => {
    const { history } = this.props;
    const { data } = this.state;
    const sessionId = this.props.match.params.id;
    let now = new Date();
    now = dateFormat(now);
    let userId = -1;
    await getUserByToken().then((res) => {
      userId = res["userId"];
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    });
    let obj = {
      userId: userId,
      sessionId: sessionId,
      orderTime: now,
      payTime: now,
      status: "has paid",
      fee: data["price"],
    };
    await createOne("/order", obj).then((res) => {
      Alert.show("Order", "the order is creating");
      history.push("/profile");
    });
  };
  componentWillMount() {
    const id = this.props.match.params.id;
    getOne("/session/" + id).then((data) => {
      const film = data["film"];
      const cinema = data["cinema"];
      const room = data["room"];
      data["filmName"] = film["name"];
      data["cinemaName"] = cinema["name"];
      data["roomName"] = room["roomName"];
      this.setState({ data, film, cinema, room });
    });
  }
  //   TODO: finish order system
  render() {
    let segments = [];
    let { data } = this.state;
    data = Object.assign({}, data);
    let { dataToLabel, history } = this.props;
    dataToLabel = Object.assign({}, dataToLabel);
    let cols = Object.keys(dataToLabel);
    cols.forEach((dataName) => {
      segments.push(
        <SegmentInfo
          meta={dataToLabel[dataName]}
          info={data[dataName]}
          editable={false}
        />
      );
    });
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={12}>
            <Header size="huge">Session Detail</Header>
            <Segment.Group>{segments}</Segment.Group>
            <Button
              floated="right"
              basic
              size="massive"
              content="Book!"
              onClick={this.handleBook}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.userId,
  };
};
function mapDispatchToProps(dispatch, ownProps) {
  return {
    // handleChangeUsername:bindActionCreators(actions.handleChangeUsername,dispatch),
  };
}

//   const RegisterForm=RegisterFormUI
export default connect(mapStateToProps, mapDispatchToProps)(SessionDetail);
// "orderId": 1,
// "userId": 1,
// "sessionId": 5,
// "orderTime": "2020-04-27 17:39",
// "payTime": "2020-04-29 17:39",
// "status": "",
// "fee": 11111,
