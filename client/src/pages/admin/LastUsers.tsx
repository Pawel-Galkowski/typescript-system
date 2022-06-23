import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { deleteUserAccount } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';

const AdminUsers = ({ usrs: { confirmed, _id, name, email, date, role, loading }, deleteUserAccount }: {
  usrs: any,
  deleteUserAccount: any
}) => {
  if (confirmed === true) {
    let adminDanger = false;
    const normalDate = date.substring(0, 10);
    const timeDate = date.substring(11, 16);
    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white padding2 margin-2ud">
            <h3>
              <strong>{name} -</strong>
              {role === 'admin' ? (adminDanger = true) : (adminDanger = false)}
              {adminDanger ? (
                <Fragment>
                  <span className="dangerRole"> {role}</span>
                </Fragment>
              ) : (
                <Fragment>
                  <span> {role}</span>
                </Fragment>
              )}
            </h3>
            <div className="margin-2ud">
              <p>
                Email: <b>{email}</b>
              </p>
              <p>
                Creation date: <b>{normalDate}</b>
              </p>
              <p>
                Creation time: <b>{timeDate}</b>
              </p>
            </div>
            <button className="btn btn-danger" onClick={(e) => deleteUserAccount(_id)} type="button">
              Delete Account
            </button>
          </div>
        )}
      </Fragment>
    );
  } else {
    return <div></div>;
  }
};

AdminUsers.propTypes = {
  deleteUserAccount: PropTypes.func.isRequired,
};

export default connect(null, { deleteUserAccount })(AdminUsers);
