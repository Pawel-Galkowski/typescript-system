import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = (
    { element: Component, auth: { isAuthenticated, loading, isAdmin }, path }: 
    { element: any, auth: any, path: any }
  ) => !isAuthenticated && !loading && !isAdmin
  ? <Navigate to="/login" />
  : <Route path={path} element={Component}/>

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state:any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
