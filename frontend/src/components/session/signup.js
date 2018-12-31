import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

  render() {
    const errors = this.props.errors.map((error, idx) =>{
        return (<p key={idx}>{error}</p>);
    } );

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
                <input
                type='password'
                placeholder='Retype Password'
                name='password2'
                value={this.state.password2}
                onChange={this.handleInput}
                />
                
                <button className ='signup-button' onClick={this.handleSubmit}>Sign Up</button>
            </form>
        </div>
      
    );
  }
}

export default withRouter(Signup);
