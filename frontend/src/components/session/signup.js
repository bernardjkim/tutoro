import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.otherFrom = this.otherFrom.bind(this);
    this.displayError = this.displayError.bind(this);
  }

  componentDidMount() {
    if (this.props.session.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  otherFrom() {
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

  displayError() {
     const errors = this.props.errors.map((error, idx) =>{
        return (<p key={idx}>{error}</p>);
    } );
    if (this.props.errors.length > 0) {
      return(
        <div className='error-flash'>
          {errors}
        </div>
      );
    }
    return null;
  }

  render() {
      const errors = this.props.errors.map((error, idx) =>{
        return (<li className= 'session-error' key={idx}>{error}</li>);
    } );
   
    return (

          <div id='signup-background'>
            <form id='form-container'>
            <div id='signup-title'>Sign Up for Free</div>
            <div className='logo-container'>
              <img className='signup-logo' src={logo}/>
            </div>
            <div>
                {errors}
            </div>
                <input 
                placeholder="Email" 
                type='text'
                name="email"
                value={this.state.email}
                onChange={this.handleInput}/>
                
                <input
                type='password'
                placeholder='Password'
                name='password'
                value={this.state.password}
                onChange={this.handleInput}
                />
                <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={this.state.password2}
                onChange={this.handleInput}
                />
                
                <button className ='signup-button' onClick={this.handleSubmit}>Sign Up</button>
             <p>Already a member? <a id='login-atag'>Log in</a></p>
            </form>
          </div>
      
    );
  }
}

export default withRouter(Signup);
