import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import LanOp from './languages';

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
                placeholder='Language'
                value={language}
                onChange={this.handleChange}
                options={lan}
            />

        );
        



    }

    majorInput = () => {
    const options = [{
            value: '',
            label: 'select',
            isDisabled: true
        },
        {
            value: 'Math',
            label: 'Math'
        },
        {
            value: 'Computer Science',
            label: 'Computer Science'
        },
        {
            value: 'Meme',
            label: 'Meme'
        },
        {
            value: 'Art',
            label: 'Art'
        },
        {
            value: 'Ninja Jutsu',
            label: 'Ninja Jutsu'
        },
    ];
        const {major} = this.state;

        return (
            <Select
                placeholder='Major'
                value={major}
                onChange={this.handleChange}
                options={options}
            />

        );
    }
    enrollmentStatusInput =() => {
        const options = [{
                value: '',
                label: 'select',
                isDisabled: true
            },
            {
                value: 'Enrolled',
                label: 'Enrolled'
            },
            {
                value: 'Graduated',
                label: 'Graduated'
            },
            {
                value: 'Dropout',
                label: 'Dropout'
            }
        ];
        const { enrollmentStatus } = this.state;
        return(
            <Select
                placeholder='I am ..'
                value={enrollmentStatus}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
    
    render() {
        return(
            <form>
                <input type='text' value={this.state.firstName}/>
                <input type='text' value={this.state.lastName}/>
                {this.enrollmentStatusInput()}
                {this.majorInput()}
                {this.languageInput()}
                <input type='text' value={this.state.firstName}/>
                
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