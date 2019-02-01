import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { connect } from 'react-redux';
import loginUser from './axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.otherForm = this.otherForm.bind(this);
  }

  componentDidMount() {
    if (this.props.global.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  otherForm() {
    this.props.history.push('/signup');
  }
  
  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.loginUser(newUser);
  }

 
  render() {
      const errors = this.props.errors.map((error, idx) =>{
        return (<li className= 'session-error' key={idx}>{error}</li>);
    } );
   const {
     password,
     email,
   } = this.state;
    return (

          <div id='signup-background'>
              <Form
              errors={errors}
              password = {password}
              email = {email}
              handleInput ={this.handleInput}
              handleSubmit = {this.handleSubmit}
              otherForm = {this.otherForm}
              /> 
            <div id='splash-intro'>
                <i className="fas fa-chalkboard-teacher splash-icon"></i>
                <div >Find a UW tutor today from Tutoro</div>
              </div>
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


