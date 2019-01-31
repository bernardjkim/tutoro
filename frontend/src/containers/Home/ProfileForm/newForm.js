import React from "react";
import Input from "../../../components/Input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createNewProfile, getFormOptions } from "./axios";
import { Select, AsyncSelect } from "../../../components/Select";

class NewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      enrollment: "",
      major: [],
      coursesTaken: [],
      locationPreferences: "",
      languagePreferences: "",
      image: "",
      phone: ""
    };
  }

  componentDidMount() {
    this.props.getFormOptions();
  }

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.files) {
      this.setState({ image: e.target.files });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSelectChange = (selectedOption, field) => {
    if (field) {
      this.setState({ [field.name]: selectedOption });
    } else {
      this.setState({ coursesTaken: selectedOption.value });
    }
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
    const { error } = this.props;
    const errMsg = <p className="error-message">{error}</p>;
    const {
      locationPreferences,
      major,
      languagePreferences,
      enrollment,
      coursesTaken
    } = this.state;

    const enrollmentOption = [
      {
        value: "Freshman",
        label: "Freshman"
      },
      {
        value: "Sophomore",
        label: "Sophomore"
      },
      {
        value: "Junior",
        label: "Junior"
      },
      {
        value: "Senior",
        label: "Senior"
      },
      {
        value: "Graduate",
        label: "Graduate"
      }
    ];

    const { majors, courses, locations, languages } = this.props.options;

    const handleSelectChange = this.handleSelectChange;

    return (
      <form>
        {errMsg}
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
        <Select
          value={languagePreferences}
          options={languages}
          placeholder="Language Preferred"
          onChange={handleSelectChange}
          name="languagePreferences"
        />
        <Select
          value={locationPreferences}
          options={locations}
          placeholder="Location Preference"
          onChange={handleSelectChange}
          name="locationPreferences"
        />
        <Select
          value={major}
          options={majors}
          placeholder="Major"
          onChange={handleSelectChange}
          name="major"
          isMulti={true}
        />
        <Select
          value={enrollment}
          options={enrollmentOption}
          placeholder="Enrollment Status"
          onChange={handleSelectChange}
          name="enrollment"
        />
        <AsyncSelect
          value={coursesTaken}
          options={courses}
          placeholder="Courses You Enjoyed"
          onChange={handleSelectChange}
          name="coursesTaken"
          isMulti={true}
        />
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
  error: state.home.options.error,
  options: state.home.options
});

const mdp = dispatch => ({
  createNewProfile: profile => dispatch(createNewProfile(profile)),
  getFormOptions: () => dispatch(getFormOptions())
});

export default connect(
  msp,
  mdp
)(withRouter(NewProfile));
