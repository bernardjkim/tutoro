import React from "react";
import Input from "../../../components/Input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createNewProfile, getFormOptions } from "./axios";
import {
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
            firstName: '',
            lastName: '',
            enrollment:'',
            major: [],
            courseTaken: [],
            locationPreferences:'',
            languagePreferences: '',
            image:'',
            phone: ''
            
        }
        
    }

    componentDidMount() {
        this.props.getFormOptions();
    }

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'image') {
            this.setState({image: e.target.files });
        } else {
            this.setState({[name]: value});
        }
    }
  

    handleSelectChange = (selectedOption, field) => {
        if (field) {
            this.setState({ [field.name]: selectedOption });
        } else {
            this.setState({courseTaken: selectedOption.value})
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
            const errMsg = <p className='error-message'>{error}</p>
            const {
                locationPreferences,
                major,
                languagePreferences,
                enrollment,
                courseTaken
            } = this.state;

            const { majors, courses, locations, languages } = this.props.options;

            const handleSelectChange = this.handleSelectChange;


            return(
                <form>
                    {errMsg}
                    <Input
                    type = 'text'
                    name ='firstName'
                    onChange = {this.handleInputChange}
                    placeholder = 'First Name'
                    value = {this.state.firstName}
                    />
                    <Input
                    type = 'text'
                    name ='lastName'
                    onChange = {this.handleInputChange}
                    placeholder = 'Last Name'
                    value = {this.state.lastName}
                    />
            
                    <div className='form-group'>
                        <input id="upload" ref="upload" type="file" accept="image/*"
                            onChange={this.handleInputChange}
                    />
                    </div>
                    <Input
                    type = 'tel'
                    name ='phone'
                    onChange = {this.handleInputChange}
                    placeholder = 'Phone Number'
                    value = {this.state.phone}
                    />  
                    {locationPrefInput(locationPreferences, handleSelectChange, locations)} 
                    {enrollmentInput(enrollment, handleSelectChange)}
                    {majorInput(major, handleSelectChange, majors)}
                    {languageInput(languagePreferences, handleSelectChange, languages)}
                    {coursesTakenInput(courseTaken, handleSelectChange,courses)}
                    <button 
                    className = 'btn btn-outline-primary btn-lg btn-block'
                    onClick={this.handleSubmit}>Submit</button>
                </form>

            );
        }
    }

const msp = state => ({
    error : state.home.options.error,
    options: state.home.options
})

const mdp = profile => dispatch => ({
  createNewProfile: profile => dispatch(createNewProfile(profile)),
  getFormOptions: () => dispatch(getFormOptions())
});

export default connect(
  msp,
  mdp
)(withRouter(NewProfile));
