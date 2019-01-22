import React from "react";
import Input from "../../../components/Input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createNewProfile } from "./axios";
import {
<<<<<<< HEAD
  majorInput,
  enrollmentInput,
  languageInput,
  locationPrefInput,
  coursesTakenInput
} from "./Select";

class NewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      enrollment: "",
      major: [],
      coursesName: "",
      courseTaken: [],
      locationPreferences: "",
      languagePreferences: "",
      image: "",
      userId: this.props.userId,
      phone: ""
    };
  }
  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "image") {
      debugger;
      this.setState({ image: e.target.files });
    } else {
      this.setState({ [name]: value });
=======
    createNewProfile,
    getFormOptions,

} from './axios';
import {
    majorInput, 
    enrollmentInput,
    languageInput,
    locationPrefInput,
    coursesTakenInput
} from './Select';




class NewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            enrollment:'',
            major: [],
            coursesName: '',
            courseTaken: [],
            locationPreferences:'',
            languagePreferences: '',
            image:'',
            userId: this.props.userId,
            phone: ''
            
        }
        
    }

    componentDidMount() {
        this.props.getFormOptions();
        debugger

    }

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'image') {
            debugger
            this.setState({image: e.target.files });
        } else {
            this.setState({[name]: value});
        }
>>>>>>> f16f03ceae3af7ccf858d47a00deb173a441c781
    }
  };

  handleSelectChange = (selectedOption, field) => {
    this.setState({ [field.name]: selectedOption });
  };

  handleSubmit = e => {
    const state = this.state;
    e.preventDefault();
    const finalState = {};
    // change {value: ... , label: .... } to just string
    Object.keys(state).forEach(key => {
      if (
        key !== "image" &&
        // check if it is an array
        Object.prototype.toString.call(state[key]) === "[object Object]"
      ) {
        finalState[key] = state[key].value;
      } else if (Array.isArray(state[key])) {
        finalState[key] = state[key].map(el => {
          return el.value;
        });
      } else {
        finalState[key] = state[key];
      }
    });
    this.props.createNewProfile(finalState);
  };

  render() {
    const {
      locationPreferences,
      major,
      languagePreferences,
      enrollment,
      courseTaken
    } = this.state;

    const handleSelectChange = this.handleSelectChange;
    return (
      <form>
        <Input
          type="text"
          name="firstName"
          onChange={this.handleInputChange}
          placeholder="First Name"
          value={this.state.firstName}
        />
        <Input
          type="text"
          name="lastName"
          onChange={this.handleInputChange}
          placeholder="Last Name"
          value={this.state.lastName}
        />

        <div className="form-group">
          <input
            id="upload"
            ref="upload"
            type="file"
            accept="image/*"
            onChange={this.handleInputChange}
          />
        </div>
        <Input
          type="tel"
          name="phone"
          onChange={this.handleInputChange}
          placeholder="Phone Number"
          value={this.state.phone}
        />
        {locationPrefInput(locationPreferences, handleSelectChange)}
        {enrollmentInput(enrollment, handleSelectChange)}
        {majorInput(major, handleSelectChange)}
        {languageInput(languagePreferences, handleSelectChange)}
        {coursesTakenInput(courseTaken, handleSelectChange)}
        <button
          className="btn btn-outline-primary btn-lg btn-block"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

const msp = state => ({
  userId: state.global.user.id
});

const mdp = profile => dispatch => ({
<<<<<<< HEAD
  createNewProfile: profile => dispatch(createNewProfile(profile))
=======
    createNewProfile: profile => dispatch(createNewProfile(profile)),
    getFormOptions: () =>  dispatch(getFormOptions()),

>>>>>>> f16f03ceae3af7ccf858d47a00deb173a441c781
});

export default connect(
  msp,
  mdp
)(withRouter(NewProfile));
