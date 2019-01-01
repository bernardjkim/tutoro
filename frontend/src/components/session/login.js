import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    if (this.props.session.isAuthenticated) {
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
    const errors = this.props.errors.map(error => <p>{error}</p>);

    return (
        <div>
            {errors}
            <form>
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
                
            <button className ='login-button' onClick={this.handleSubmit}>Log In</button>
            </form>
        </div>
      
    );
  }
}

export default withRouter(Login);