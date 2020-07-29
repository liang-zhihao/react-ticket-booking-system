import React, { Component } from "react";
import Tables from "components";
import { getCount } from "utils/request";
import { Route, Switch } from "react-router-dom";
import {
  Button,
  Grid,
  Menu,
  Sidebar,
  Statistic,
  Segment,
  Icon,
  Header,
} from "semantic-ui-react";
import Api from "utils/api";
const { User, Film, Session, Admin, Order } = Api;
export default class AdminIndexBody extends Component {
  state = {
    adminCount: 0,
    userCount: 0,
    sessionCount: 0,
    orderCount: 0,
    filmCount: 0,
  };
  async componentDidMount() {
    this.setState({
      adminCount: await getCount(Admin),
      userCount: await getCount(User),
      sessionCount: await getCount(Session),
      orderCount: await getCount(Order),
      filmCount: await getCount(Film),
    });
  }
  render() {
    //   TODO: fix Dashboard, layout !
    const GR = Grid.Row;
    const GC = Grid.Column;
    const {
      adminCount,
      filmCount,
      orderCount,
      sessionCount,
      userCount,
    } = this.state;

    return (
      <Grid centered>
        <GR>
          {" "}
          <Header content="Welcome to Admin System" />
        </GR>
        <GR>
          {" "}
          <Segment.Group>
            <Statistic.Group horizontal widths="5" color="pink">
              <Statistic>
                <Statistic.Value>
                  {userCount} <Icon name="user" />{" "}
                </Statistic.Value>
                <Statistic.Label>Users</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {adminCount} <Icon name="user secret" />
                </Statistic.Value>
                <Statistic.Label>Admin</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {filmCount} <Icon name="play circle" />
                </Statistic.Value>
                <Statistic.Label>Films</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {sessionCount} <Icon name="table" />
                </Statistic.Value>
                <Statistic.Label>Sessions</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {orderCount} <Icon name="shopping cart" />
                </Statistic.Value>
                <Statistic.Label>Orders</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment.Group>
        </GR>
      </Grid>
    );
  }
}
