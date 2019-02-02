import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCourses, fetchProfileWithCourse } from '../axios';
import Detail from './detail';
import { AsyncSelect } from '../../../components/Select';
import Loading from '../../../components/Loading';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
    }
  }

  componentDidMount() {
    this.props.fetchCourseOption();
  }

  changeSearchInput = (selectedOption, field) => {
    const { fetchProfileWithCourse } = this.props;
    this.setState({ [field.name]: selectedOption });
    fetchProfileWithCourse(selectedOption.value);
  };

  // submitSearchResult = e => {
  //   e.preventDefault();
  //   fetchProfileWithCourse(this.state.search.value);
  // }


    render() {
      const { profiles, loading } = this.props;
      let results;
      if (loading) {
        return <Loading/>
      }

      if (profiles[0]) {
        results = profiles.map((el, idx) => <Detail key={idx} profile={el}/>)
      }
        return (
        <div className="mt-5">
          <div className="container">
            <h2 className="card-title gray-bg-light ">Search:</h2>
            <div className="p-3 gray-bg-light-mid border-radius-half mb-5">
              <form className="form-inline d-flex flex-row w-100" >
                <AsyncSelect
                className = 'form-control mr-sm-2 flex-grow-1 p-0 '
                placeholder='Search a Course You Need Help On'
                aria-label='Search'
                name='search'
                clearable={true}
                value={this.state.search}
                onChange = {this.changeSearchInput}
                options={this.props.courses}
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
  // uncommnet for testing
  // profiles: [state.home.profile.profile]
  loading: state.home.profile.loading,
  courses: state.home.options.courses,
  profiles: state.home.profile.profileswithCourse
});

const mdp = dispatch => ({
  fetchCourseOption: () => dispatch(fetchCourses()),
  fetchProfileWithCourse: className => dispatch(fetchProfileWithCourse(className))
});

export default connect(msp, mdp)(withRouter(Search));



