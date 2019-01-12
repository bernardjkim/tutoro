import { connect } from 'react-redux';
import Home from "../components/home/home";
import { logoutUser } from '../action/session_actions';

const mapStateToProps = state => ({
  session: state.session,
  errors: Object.values(state.errors)
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);