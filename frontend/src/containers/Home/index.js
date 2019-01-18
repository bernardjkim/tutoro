import React from 'react';
import Modal from 'react-modal';
import ProfileForm from './NewForm/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav/index';
import {fetchProfile} from './axios';
import {logoutUser} from './action';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.profile,
            newProfile: this.props.profile ? false: true,
        }
    }

    componentDidMount() {
        this.props.fetchProfile();
    }

    modalOpen = () => {
        this.setState({newProfile: true});
    }

    closeModal = () => {
        this.setState({newProfile: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        return (
            <div>
                <Nav/>
                <div>Home</div>
                <Modal
                isOpen={this.state.newProfile}
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
    },
}

const msp = state => ({
    profile: state.home.profile
});

const mdp = dispatch => ({
    logoutUser: ()=> dispatch(logoutUser()),
    fetchProfile: ()=> dispatch(fetchProfile()),
})

export default connect(
    msp,
    mdp
)(withRouter(Home));





