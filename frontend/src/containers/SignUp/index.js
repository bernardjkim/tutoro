import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Form from './Form';
import Login from '../Login/index';
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
    this.otherFrom = this.otherFrom.bind(this);
    this.displayError = this.displayError.bind(this);
    this.closeModal= this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
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
   const {
     password,
     password2,
     email,
   } = this.state;
    return (

          <div id='signup-background'>
          <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Login Modal'
          >
          <Login 
          closeModal={this.closeModal}
          />
          </Modal>
          <Form
          errors={errors}
          password = {password}
          password2 = {password2}
          email = {email}
          handleInput ={this.handleInput}
          handleSubmit = {this.handleSubmit}
          openModal = {this.openModal}
          />
           
          </div>
      
      );
    }
  }
  
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

Modal.setAppElement('body');

