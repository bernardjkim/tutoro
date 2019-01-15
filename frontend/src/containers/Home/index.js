import React from 'react';
import Modal from 'react-modal';
import ProfileForm from './NewForm/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {logoutUser} from './action';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileModal: true,
        }
    }

    modalOpen = () => {
        this.setState({profileModal: true});
    }

    closeModal = () => {
        this.setState({profileModal: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        return (
            <div>
                <div>Home</div>
                <button onClick={this.handleSubmit}>Log Out</button>
                <Modal
                isOpen={this.state.profileModal}
                style={customStyles}
                contentLabel='Profile Modal'
                >
                <ProfileForm
                closeModal={this.closeModal}
                />
                </Modal>
            </div>
        );
    }
}


Modal.setAppElement('body');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '80%',
        width: '50%',
        minWidth: '320px',
        // overflow: 'hidden',
    },
}

const msp = state => ({
    // later use
});

const mdp = dispatch => ({
    logoutUser: ()=> dispatch(logoutUser()),
})

export default connect(
    msp,
    mdp
)(withRouter(Home));





