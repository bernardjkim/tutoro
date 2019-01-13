import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import LanOp from './languages';
import {
    majorOptions,
    enrollmentOption,
    courseTakenOption,
    locationPrefOptions
} from './options';


export default class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            enrollment:'',
            major: [],
            courseTaken: [],
            locationPreferences:'',
            contact: '',
            languagePreferences: '',
            image:'',
            userId: this.props.userId,
            phone: ''
            
        }
        
    }
    languageInput = () => {
        let lan = Object.values(LanOp).map(el=> {
            return {value: el.name, label: el.nativeName};
        });
        const {language} = this.state;
        return (
            <Select
                name = 'language'
                placeholder='Language'
                value={language}
                onChange={this.handleSelectChange}
                options={lan}
            />

        );

    }

    locationPrefInput = () => {
        const {locationPreferences} = this.state;
        return (
            <Select
                name = "locationPreferences"
                placeholder='Location Preference'
                value={locationPreferences}
                onChange={this.handleSelectChange}
                options={locationPrefOptions}
            />

        );

    }

    majorInput = () => {
        const {major} = this.state;
        
        return (
            <Select
                name = 'major'
                placeholder='Major'
                value={major}
                onChange={this.handleSelectChange}
                options={majorOptions}
            />

        );
    }

    enrollmentInput =() => {

        const { enrollment } = this.state;
        return(
            <Select
                name = 'enrollment'
                placeholder='Enrollment'
                value={enrollment}
                onChange={this.handleSelectChange}
                options={enrollmentOption}
            />
        );
    }

    coursesTakenInput = () => {

        const { courseTaken } = this.state;
        return(
            <Select
                name='courseTaken'
                isMulti= {true}
                placeholder='Taken Courses'
                value={courseTaken}
                onChange={this.handleSelectChange}
                options={courseTakenOption}
                />
        );

    }

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSelectChange = (selectedOption, field) => {
         this.setState({ [field.name]: selectedOption });
    }
     handleFileUpload = event => {
         this.setState({
             image: event.target.files
         });
     };

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.createNewProfile(this.state);

    }
    
    render() {
        return(
            <form>
                <input type='text' 
                name='firstName'
                onChange ={this.handleInputChange} 
                placeholder='First Name'
                value={this.state.firstName}/>
                <input type='text' 
                name='lastName'
                onChange ={this.handleInputChange} 
                placeholder='Last  Name'
                value={this.state.lastName}/>
                <input id="upload" ref="upload" type="file" accept="image/*"
                        onChange={this.handleFileUpload}
                />
                < input type = "tel"
                id = "phone"
                name = "phone"
                onChange={this.handleInputChange}
                placeholder='Phone Number'
                required />
                {this.locationPrefInput()}
                {this.enrollmentInput()}
                {this.majorInput()}
                {this.languageInput()}
                {this.coursesTakenInput()}
                <button onClick={this.handleSubmit}>Submit</button>
            </form>

        );
    }
}

