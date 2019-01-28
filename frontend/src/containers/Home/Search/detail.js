import React from 'react';
import encode from "../../util/encode";


export default ({profile}) => {
    const { firstName, lastName, image } = profile;

    return <li className="d-flex justify-content-between align-items-center bg-white p-3 border-radius-half mb-2">
                <div className="d-flex align-items-center">
                <img
                    className="rounded-circle"
                    src= {`data:image/png;base64,${encode(image)}`}
                    width="64"
                    height="64"
                    alt="user avatar"
                />
                <div className="ml-3">{`${firstName} ${lastName}`}</div>
                </div>
                <span className="badge badge-pill">
                <i className="material-icons">more_vert</i>
                </span>
            </li>
}