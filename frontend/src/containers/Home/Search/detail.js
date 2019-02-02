import React from 'react';
import encode from "../../util/encode";
import DetailProfile from './detailProfile';

class Detail extends React.Component {
    state = {
        detailProfile: false,
    }

    toggleDetailProfile = () => {
        this.setState({ detailProfile: !this.state.detailProfile})
    }
    
    render() {

            const profile = this.state.detailProfile ?
                <DetailProfile profile ={this.props.profile}/>
                : null;
            const { firstName, lastName, image } = this.props.profile;
       return <div>
                <li className="d-flex justify-content-between align-items-center bg-white p-3 border-radius-half mb-2 search-result"
                    onClick={this.toggleDetailProfile}>
                <div className="d-flex align-items-center">
                <img
                    className="rounded-circle"
                    src= {`data:image/png;base64,${encode(image)}`}
                    width="64"
                    height="64"
                    alt="user avatar"
                />
                <div className="ml-3 search-detail-name">{`${firstName} ${lastName}`}</div>
                </div>
                <span className="badge badge-pill">
                <i className="material-icons">more_vert</i>
                </span>
            </li>
                {profile}
            </div>
    }

}


export default Detail;