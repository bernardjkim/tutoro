import React from 'react';
import { connect } from 'react-redux';
import { logoutUser, openUpdateProfile } from './action'
import logo from '../../../images/logo.png'

class NavBar extends React.Component {

    logoutUser = () => {
        this.props.logoutUser();
    }

    openUpdateProfile = () => {
        this.props.openUpdateProfile();
    }
    render()  {
        return (
            < nav className = "navbar navbar-expand-lg" >
                <a className="navbar-brand nav-bar-brand" href="#">
                    <img src={logo} className="d-inline-block align-top logo-nav" alt=""/>
                    Tutoro
                </a>
                <div className="dropdown">
                    <a className="fas fa-bars menu-icon" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </a>
                
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={this.openUpdateProfile} href="#">Edit Profile</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={this.logoutUser} href="#">Log Out</a>
                </div>
                </div>
            

            </nav>
        );
    }
}

const msp = state => ({

});

const mdp = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    openUpdateProfile: () => dispatch(openUpdateProfile())
})

export default connect(
    msp,
    mdp
)(NavBar);