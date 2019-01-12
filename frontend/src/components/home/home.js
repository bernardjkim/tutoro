import React from 'react';
import Modal from 'react-modal';
import ProfileForm from '../../container/profile_container';

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

export default Home;







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
        width: '80%',
        minWidth: '320px'
    },
}