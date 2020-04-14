import PropTypes from "prop-types";
import React, { Component } from "react";
import poster from "../../../poster.jpg";
import axios from "axios";
import { actions } from "../../../redux/register";
import {bindActionCreators} from 'redux'
import { Provider, connect } from "react-redux";
import {Link} from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Form,
  Message,
  Visibility,
  Input,
  Checkbox,
  Label,
  Card,
  Rating
} from "semantic-ui-react";

class RegisterFormUI extends Component {
    constructor(props) {
      super(props);
      this.setIsStudent = this.setIsStudent.bind(this);
    }
    static propTypes = {
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      submitToStore:PropTypes.func,
      handleChangeUsername:PropTypes.func,
      handleChangePassword:PropTypes.func,
      handleChangeEmail:PropTypes.func,
    };
  
    state = {
      isStudent: 0,
      rePassword:'',
    };
    setIsStudent(e) {
      const { isStudent } = this.state;
      this.setState({ isStudent: !isStudent });
    }
    checkEmail = email => {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          email
        )
      ) {
        return false;
      } else {
        return true;
      }
    };
    checkPassword = (password, rePassword) => {
      if (password === rePassword && password !== "") {
        return true;
      } else {
        return false;
      }
    };

    handleClick(){
        // let { email, password, username } = this.props;
        // let{rePassword}=this.state
        // console.log(this.props)
        // if (
        //   this.checkEmail(email) &&
        //   this.checkPassword(password, rePassword) &&
        //   username !== ""
        // ) {
        //   axios
        //     .post(
        //       "http://rap2.taobao.org:38080/app/mock/248939/api/user/register",
        //       { email, password, username }
        //     )
        //     .then(res => {
        //       console.log(res);
        //       if (res.data.code === 200) {
        //         alert("Succeed to sign up");
        //       } else {
        //         alert("Fail to sign up");
        //       }
        //     })
        //     .catch(err => {
        //       console.error(err);
        //     });
        // }
         console.log(this.props)
    }
    // Change(e){
    //   //e.target.name代表你当前输入Input框对应的Name,如email,password
    // // e.target.value 代表当前输入的值
    // this.setState({
    //   [e.target.name] : e.target.value
    // })

    render() {
      const { isStudent } = this.state;
        console.log(this.props)
      return (
        <Grid centered>
          <Grid.Column width={8}>
            <Form>
              <Segment>
                <Form.Field
                  control={Input}
                  icon="user"
                  placeholder="Username"
                  type="text"
                //   error={this.handleE("username")}
                    onChange={e=>this.props.handleChangeUsername(e.target.value)}
                  value={this.props.username}
                />
  
                <Form.Field
                  control={Input}
                  icon="mail"
                  placeholder="Email"
                  type="text"
                //   error={this.handleE("email")}
                onChange={e=>this.props.handleChangeEmail(e.target.value)}
                  value={this.props.email}
                />
  
                <Form.Field
                  control={Input}
                  icon="lock"
                  placeholder="Enter password"
                  type="password"
                  onChange={e=>this.props.handleChangePassword(e.target.value)}
                  value={this.props.password}
                />
  
                <Form.Field
                  control={Input}
                  placeholder="Enter password again"
                  type="password"
                  icon="lock"
                  onChange={e=>{this.setState({rePassword:e.target.value})}}
                //   error={this.handleE("password")}
                />
  
                <Form.Field
                  control={Checkbox}
                  toggle
                  label="Are you a student?"
                  onClick={this.setIsStudent}
                />
                {isStudent ? (
                  <Form.Input placeholder="Enter your student ID"></Form.Input>
                ) : (
                  ""
                )}
  
                <Form.Button
                  primary
                  type="submit"
                  className="btn"
                  fluid
                  onClick={this.handleClick.bind(this)}
                >
                  Sign up
                </Form.Button>
              </Segment>
              <Message>
              <Link>Forget password?</Link>
              </Message>
            </Form>
          </Grid.Column>
        </Grid>
      );
    }
  }
  const mapStateToProps = (state, ownProps) => {
    return {
      username: state.registerReducer.username,
      email:state.registerReducer.email,
      password:state.registerReducer.password,
    };
  };
  function mapDispatchToProps(dispatch, ownProps) {

    return {
        // handleChangeUsername: (val) => dispatch(actions.handleChangeUsername(val)),
        // handleClick:  dispatch(actions.submitRegisterInfo(ownProps)),
        submitToStore: bindActionCreators(actions.submitRegisterInfo, dispatch),
        handleChangeUsername:bindActionCreators(actions.handleChangeUsername,dispatch),
        handleChangePassword:bindActionCreators(actions.handleChangePassword,dispatch),
        handleChangeEmail:bindActionCreators(actions.handleChangeEmail,dispatch),

        
        // change_location_admin: bindActionCreators(change_location_admin, dispatch)
    };
  }
  const RegisterForm=connect(mapStateToProps, mapDispatchToProps)(RegisterFormUI);
//   const RegisterForm=RegisterFormUI
  export default RegisterForm