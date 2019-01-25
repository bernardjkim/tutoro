import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchProfileWithCourse} from '../action';
import Detail from './detail';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }
  

  changeSearchInput = (e) => {
    this.setState({search: e.target.value})
  }

  submitSearchResult = e => {
    e.preventDefault();
    const { fetchProfileWithCourse } = this.props;
    fetchProfileWithCourse(this.state.search)
  }


    render() {
      const { profiles } = this.props;
      const results = profiles.map((el, idx) => <Detail key={idx} profile={el}/>)
        return (
        <div className="mt-5">
          <div className="container">
            <h2 className="card-title gray-bg-light ">Search:</h2>
            <div className="p-3 gray-bg-light-mid border-radius-half mb-5">
              <form className="form-inline d-flex justify-content-center" onSubmit={this.submitSearchResult}>
                <input
                  className="form-control mr-sm-2 w-100"
                  type="search"
                  placeholder="Search"
                  onChange= {this.changeSearchInput}
                  value = {this.state.search}
                  aria-label="Search"
                />
              </form>
            </div>

            <h2 className="card-title gray-bg-light ">Results:</h2>
            <div className="card border-none border-radius-half gray-bg-light-mid">
              <div className="card-body ">
                <h3 className="custom-card-sub mb-2 text-muted gray-bg-light-mid">
                  {`${profiles.length} results has been found`}
                </h3>
                <div className="gray-bg-light-mid">
                  <ul className="list-group gray-bg-light-mid border-radius-half">
                    {results}
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
  profiles: state.home.profile.profileswithCourse
});

const mdp = dispatch => ({
  fetchProfileWithCourse: className => dispatch(fetchProfileWithCourse(className))
});

export default connect(msp, mdp)(withRouter(Search));



