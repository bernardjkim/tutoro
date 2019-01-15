import React from 'react';
import Input from '../../../components/Input';
import {
    majorInput, 
    enrollmentInput,
    languageInput,
    locationPrefInput,
    coursesTakenInput
} from './Select';



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
            languagePreferences: '',
            image:'',
            userId: this.props.userId,
            phone: ''
            
        }
        
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
        const state = this.state;
        e.preventDefault();
        const finalState = {}
        // change {value: ... , label: .... } to just string
        Object.keys(state).forEach(key => {
            if (key !== 'image' 
            && 
            // check if it is an array
            Object.prototype.toString.call(state[key]) === "[object Object]") {
                finalState[key] = state[key].value;
            } else if (Array.isArray(state[key])) {
                finalState[key] = state[key].map(el=> {
                    return el.value
                });
            } else {
                finalState[key] = state[key];
            }
        });
        this.props.createNewProfile(finalState);

    }
    
    render() {
        const {
            locationPreferences,
            major,
            languagePreferences,
            enrollment,
            courseTaken
        } = this.state;

        const handleSelectChange = this.handleSelectChange;
        return(
            <form>
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
                <Input
                type = 'file'
                inputClassName='form-control-file'
                ref = 'upload'
                accept = 'image/*'
                onChange = {this.handleFileUpload}
                />
                <Input
                type = 'tel'
                name ='phone'
                onChange = {this.handleInputChange}
                placeholder = 'Phone Number'
                value = {this.state.phone}
                />  
                {locationPrefInput(locationPreferences, handleSelectChange)} 
                {enrollmentInput(enrollment, handleSelectChange)}
                {majorInput(major, handleSelectChange)}
                {languageInput(languagePreferences, handleSelectChange)}
                {coursesTakenInput(coursesTakenInput, handleSelectChange)}
                <button onClick={this.handleSubmit}>Submit</button>
            </form>

        );
    }
}

