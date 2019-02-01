import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import { connect } from 'react-redux';
import { signupUser } from './axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      modalOpen: false,
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
    this.props.history.push('/login');
  }
  
  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signupUser(newUser);
  }
 
  render() {
      const errors = this.props.errors.map((error, idx) =>{
        return (<li className= 'session-error' key={idx}>{error}</li>);
    } );
   const {
     password,
     password2,
     email,
   } = this.state;
    return (

          <div id='signup-background'>
              <Form
              errors={errors}
              password = {password}
              password2 = {password2}
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
    errors: Object.values(state.signup)
});

const mapDispatchToProps = dispatch => ({
  signupUser: userData => dispatch(signupUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Signup));


