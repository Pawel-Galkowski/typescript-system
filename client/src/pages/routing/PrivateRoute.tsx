import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ element: Component, auth: { isAuthenticated, loading }, path }: {
  element: any, auth: any, path:any
}) => !isAuthenticated && !loading
  ? <Navigate to="/login" />
  : <Route path={path} element={Component}/>

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state:any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
