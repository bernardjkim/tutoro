import React from "react";
import Input from "../../../components/Input";
import { withRouter } from "react-router-dom";
import Loading from '../../../components/Loading';
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
        image: null,
        phone: "",
        editImage: false,

        };
    }

    editImage = () => {
        this.setState({editImage: !this.state.editImage});
    }

    profileImage = () => {
        const { image, editImage } = this.state;
        const profielImage = image ? 
                <img
                    src={URL.createObjectURL(image[0])}
                    className='profile-image'
                />:
                <img
                    className='profile-image'
                    src = 'http://chittagongit.com//images/default-profile-icon/default-profile-icon-24.jpg'
                />
        if (editImage) {
            return (
                <div className='profile-image-container' >
                    <input
                        id="upload"
                        ref="upload"
                        type="file"
                        className = 'custom-file-upload'
                        accept="image/*"
                        onChange={this.handleInputChange}
                    />  
                    <label className="custom-file-upload">
                        <input
                            id="upload"
                            ref="upload"
                            type="file"
                            accept="image/*"
                            onChange={this.handleInputChange}
                        />  
                        <i className="fa fa-cloud-upload-alt"></i> Upload Image
                    </label>
                </div>
            )
        } else {
            return (
                <div className='profile-image-container'>
                    {profielImage}
                    <p onClick={this.editImage}>Edit Image</p>
                </div>
            )
        }
  }

  componentDidMount() {
    this.props.getFormOptions();
  }

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.files) {
        this.setState({ image: e.target.files });
        this.editImage();
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
    if (this.props.loading) {
        return <Loading/>
    }
    const {
      locationPreferences,
      major,
      languagePreferences,
      enrollment,
      coursesTaken,
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
      <form className='profile-form'>
        {this.profileImage()}
        <div className='profile-input-container'>
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
            <Input
            type="tel"
            name="phone"
            onChange={this.handleInputChange}
            placeholder="Phone Number (No Space)"
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
            <div id='button-wrapper'>
                <button
                className="signup-button"
                onClick={this.handleSubmit}
                >
                Submit
                </button>
            </div>
        </div>
      </form>
    );
  }
}

const msp = state => ({
  error: state.home.options.error,
  options: state.home.options,
  loading: state.home.profile.loading,
});

const mdp = dispatch => ({
  createNewProfile: profile => dispatch(createNewProfile(profile)),
  getFormOptions: () => dispatch(getFormOptions())
});

export default connect(
  msp,
  mdp
)(withRouter(NewProfile));
