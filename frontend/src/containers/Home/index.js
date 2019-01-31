import React from "react";
import Modal from "react-modal";
import ProfileForm from "./ProfileForm/newForm";
import UpdateForm from './ProfileForm/updateForm';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav/index";
import { fetchProfile, fetchCourses } from "./axios";
import Search from "./Search";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
      profilePic: this.props.profilePic
    };
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <div className="gray-bg-light height-100">
        <Nav />
        <Search />
        <Modal
          isOpen={this.props.newProfile}
          // isOpen={this.props.newProfile}
          style={customStyles}
          contentLabel="New Profile Modal"
        >
          <ProfileForm />
        </Modal>
        <Modal
          isOpen={this.props.updateForm}
          style={customStyles}
          contentLabel="Update Profile Modal"
        >
          <UpdateForm />
        </Modal>
      </div>
    );
  }
}

Modal.setAppElement("body");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "50%",
    minWidth: "320px"
  }
};

const msp = state => ({
  profile: state.home.profile.profile,
  profilePic: state.home.profile.profilePic,
  newProfile: state.home.profile.newForm,
  updateForm: state.home.profile.updateForm,
});

const mdp = dispatch => ({
  fetchProfile: () => dispatch(fetchProfile()),
  fetchCourses: () => dispatch(fetchCourses())
});

export default connect(
  msp,
  mdp
)(withRouter(Home));
