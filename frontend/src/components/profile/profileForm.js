import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import LanOp from './languages';
import {
    majorOptions,
    enrollmentOption,
    courseTakenOption


} from './options';

class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            enrollmentStatus:'',
            major: '',
            courseTaken: [],
            locationPref:'',
            contact: '',
            language: ''
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

    enrollmentStatusInput =() => {

        const { enrollmentStatus } = this.state;
        return(
            <Select
                name = 'enrollmentStatus'
                placeholder='I am ..'
                value={enrollmentStatus}
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

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSelectChange = (selectedOption, field) => {
         this.setState({ [field.name]: selectedOption });
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
                {this.enrollmentStatusInput()}
                {this.majorInput()}
                {this.languageInput()}
                {this.coursesTakenInput()}
                
            </form>

        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);