import React, { Component } from "react";
import {Input, Button, Form, FormInput, Grid, Segment, Message,Header,Icon } from "semantic-ui-react";
// import { BrowserRouter as Router,Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Provider, connect } from "react-redux";
import {Link} from 'react-router-dom'
class LoginForm extends Component {
    state={
        proof:'',
        password:'',
    }
    submit(){
        const {proof,password}=this.state
       const params={proof,password}
        axios.post('http://localhost:8090/api/auth',params)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err); 
        })
    }
    render() {
        const {proof,password}=this.state
      return (
        <Form onSubmit={this.submit.bind(this)}>
          <Segment stacked>
            <Form.Field>
              <Input  icon='user'  placeholder="Username or email" type="text" value={proof} onChange={e=>this.setState({proof:e.target.value})}/>{" "}
            </Form.Field>
            <Form.Field>
              <Input icon='lock' placeholder="Password" type="password" value={password} onChange={e=>this.setState({password:e.target.value})}/>{" "}
            </Form.Field>
            <Button primary type="submit" fluid>
              Login
            </Button>
          </Segment>
          <Message>
            <Link  to="/forget-pwd">Forget password?</Link> <Link to="/register" style={{float:'right'}}>Register</Link>
          </Message>
          
        </Form>
      );
    }
  }
  const mapStateToProps = (state, ownProps) => {
    return {
    //   username: state.registerReducer.username,
    };
  };
  function mapDispatchToProps(dispatch, ownProps) {

    return {
        // handleChangeUsername:bindActionCreators(actions.handleChangeUsername,dispatch),

    };
  }
  
//   const RegisterForm=RegisterFormUI
  export default  connect(mapStateToProps, mapDispatchToProps)(LoginForm);