import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Search extends React.Component {


    render() {
        return (
        <div className="mt-5">
          <div className="container">
            <h2 className="card-title gray-bg-light ">Search:</h2>
            <div className="p-3 gray-bg-light-mid border-radius-half mb-5">
              <form className="form-inline d-flex justify-content-center">
                <input
                  className="form-control mr-sm-2 w-100"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>

            <h2 className="card-title gray-bg-light ">Results:</h2>
            <div className="card border-none border-radius-half gray-bg-light-mid">
              <div className="card-body ">
                <h3 className="custom-card-sub mb-2 text-muted gray-bg-light-mid">
                  3 matches found
                </h3>
                <div className="gray-bg-light-mid">
                  <ul className="list-group gray-bg-light-mid border-radius-half">
                    <li className="d-flex justify-content-between align-items-center bg-white p-3 border-radius-half mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          className="rounded-circle"
                          src="https://www.w3schools.com/w3images/avatar2.png"
                          width="64"
                          height="64"
                          alt="user avatar"
                        />
                        <div className="ml-3">Tutee #1</div>
                      </div>
                      <span className="badge badge-pill">
                        <i className="material-icons">more_vert</i>
                      </span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center bg-white p-3 border-radius-half mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          className="rounded-circle"
                          src="https://www.w3schools.com/w3images/avatar2.png"
                          width="64"
                          height="64"
                          alt="user avatar"
                        />
                        <div className="ml-3">Tutee #2</div>
                      </div>
                      <span className="badge badge-pill">
                        <i className="material-icons">more_vert</i>
                      </span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center bg-white p-3 border-radius-half mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          className="rounded-circle"
                          src="https://www.w3schools.com/w3images/avatar2.png"
                          width="64"
                          height="64"
                          alt="user avatar"
                        />
                        <div className="ml-3">Tutee #3</div>
                      </div>
                      <span className="badge badge-pill">
                        <i className="material-icons">more_vert</i>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

const msp = state => ({

});

const mdp = state => ({

});

export default connect(msp, mdp)(withRouter(Search));



