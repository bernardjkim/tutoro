import React from 'react';
import Modal from 'react-modal';
import ProfileForm from './NewForm/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav/index';
import {fetchProfile} from './axios';
import encode from '../util/encode';
import {logoutUser} from './action';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.profile,
            // newProfile: this.props.profile ? false: true,
            newProfile:  true,
            profilePic: this.props.profilePic,
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


    profilePic =() => {
        
        const pic = this.props.profilePic;
        
        if (pic) {
            console.log(pic)
            return (
                <img src= {`data:image/png;base64,${encode(pic)}`} style ={{width: 130, height: 130, backgroundSize: 'cover'}}/>
            );
        } else {
            return <div>Mola</div>;
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        return (
            <div>
                <Nav/>
                {this.profilePic()}
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
    profile: state.home.profile.profile,
    profilePic: state.home.profile.profilePic,
});

const mdp = dispatch => ({
    logoutUser: ()=> dispatch(logoutUser()),
    fetchProfile: ()=> dispatch(fetchProfile()),
})

export default connect(
    msp,
    mdp
)(withRouter(Home));





