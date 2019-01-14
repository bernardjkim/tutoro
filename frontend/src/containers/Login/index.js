import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import loginUser  from './axios';
import Form from './Form';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.otherFrom = this.otherFrom.bind(this);
  }

  componentDidMount() {
    if (this.props.global.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  otherFrom() {
    this.props.history.push('/signup');
  }

  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(newUser);
  }

  render() {
    const errors = this.props.errors.map(error => <li className='session-error'>{error}</li>);
    const {email, password} = this.state;
    return (
        <div id='login-form-container'>
           <Form
           errors = {errors}
           email = {email}
           password = {password}
           handleInput = {this.handleInput}
           handleSubmit = {this.handleSubmit}
           />
        </div>
      
    );
  }
}

const mapStateToProps = state => ({
  global: state.global,
  errors: Object.values(state.login)
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
