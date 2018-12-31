import React from 'react';

class Home extends React.Component {

    handleSubmit=(e) => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        return (
            <div>
                <div>Home</div>
                <button onClick={this.handleSubmit}>Log Out</button>
            </div>
        );
    }
}

export default Home;