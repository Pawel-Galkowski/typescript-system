import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, /*withRouter*/ } from 'react-router-dom';
import { createProfile } from '../../actions/profile';
import axios from 'axios';

const CreateProfile = (
    { auth, createProfile, history }: 
    { auth: any, createProfile: any, history?: any }
  ) => {
  const [data, setdata] = useState<any>({
    company: '',
    website: '',
    location: '',
    bio: '',
    status: '',
    githubusername: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    skills: '',
    profileImg: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState<any>(false);

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    skills,
  } = data;

  const onChange = (e:any) => setdata({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e:any) => {
    e.preventDefault();
    createProfile(data, history);
  };

  const [file, setFile] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>({});

  const handleFile = (elem:any) => {
    setFile(elem.target.files[0]);
  };

  const uploadFile = async (e:any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', auth.user._id);
    try {
      const res = await axios.post(`/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { fileName, filePath } = res.data;
      setdata({ ...data, profileImg: filePath });
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <div className="paddingSection">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <select name="status" value={status} onChange={(e) => onChange(e)}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">Give us an idea of where you are at in your career</small>
          </div>
          <div className="form-group">
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="customFile" onChange={(e) => handleFile(e)} />
              <br />
              <button type="button" className="btn btn-light" onClick={(e) => uploadFile(e)}>
                Upload file
              </button>
            </div>
            {uploadedFile ? (
              <div className="row mt-5">
                <img style={{ width: '30%' }} src={uploadedFile.filePath} alt="" />
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => onChange(e)} />
            <small className="form-text">Could be your own company or one you work for</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Website" name="website" value={website} onChange={(e) => onChange(e)} />
            <small className="form-text">Could be your own or a company website</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChange(e)} />
            <small className="form-text">City & state suggested (eg. Boston, MA)</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e) => onChange(e)} />
            <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(e:any) => onChange(e)}
            />
            <small className="form-text">If you want your latest repos and a Github link, include your username</small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e:any) => onChange(e)}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e:any) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e:any) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e:any) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e:any) => onChange(e)}
                />
              </div>
            </Fragment>
          )}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state:any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(/*withRouter*/(CreateProfile));
