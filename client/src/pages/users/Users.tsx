import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/Spinner';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/profile';
import UsersItem from './UsersItem';

const Users = ({ getUsers, profile: { users, loading } }:
  {getUsers: any, profile: any}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {users.length > 0 ? (
              users.map((user: any) => <UsersItem key={user._id} profile={user} />)
            ) : (
              <h4>No Users found...</h4>
            )}
          </div>
        </Fragment>
      )
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getUsers })(Users);
