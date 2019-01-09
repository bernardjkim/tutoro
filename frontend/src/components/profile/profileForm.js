import React from 'react';
import { connect } from 'react-redux';
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
    enrollmentStatusInput =() => {
        return(
            <select name="enrollment" required>
                <option value="" selected disabled>select</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Graduated">Graduated</option>
            </select>
        );
    }
    
    render() {
        return(
            <form>
                <input type='text' value={this.state.firstName}/>
                <input type='text' value={this.state.lastName}/>
                {this.enrollmentStatusInput()}
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