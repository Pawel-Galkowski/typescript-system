import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts } : any) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert: any) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state: any) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
