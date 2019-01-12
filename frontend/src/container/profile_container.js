import { connect } from 'react-redux';
import Profile from '../components/profile/profileForm';
import { createNewProfile } from '../action/profile_action';

const mapStateToProps = state => ({
    userId: state.session.user.id
});

const mapDispatchToProps = dispatch => ({
  createNewProfile: profile => dispatch(createNewProfile(profile))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);