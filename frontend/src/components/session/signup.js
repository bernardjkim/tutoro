import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../images/logo.png';
import Modal from 'react-modal';
import LoginForm from './login_container';

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
    this.otherFrom = this.otherFrom.bind(this);
    this.displayError = this.displayError.bind(this);
    this.closeModal= this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
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

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }
 
  render() {
      const errors = this.props.errors.map((error, idx) =>{
        return (<li className= 'session-error' key={idx}>{error}</li>);
    } );
   
    return (

          <div id='signup-background'>
          <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Login Modal'
          >
          <LoginForm 
          closeModal={this.closeModal}
          />
          </Modal>
            <form className='form-container signup'>
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
             <p>Already a member? <a id='login-atag' onClick={this.openModal}>Log in</a></p>
            </form>
          </div>
      
    );
  }
}

export default withRouter(Signup);

Modal.setAppElement('body');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '595px',
    width: '450px'
  },
  overlay: {
    backgroundColor: 'rgba(23, 19, 19, 0.99)'
  }
}
