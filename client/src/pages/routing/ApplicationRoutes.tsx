import React from 'react';
import { Route, Routes } from 'react-router';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile/CreateProfile';
import EditProfile from '../profile/EditProfile';
import PrivateRoute from './PrivateRoute';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import AddExperience from '../profile/AddExperience';
import EditExperience from '../profile/EditExperience';
import EditEducation from '../profile/EditEducation';
import AddEducation from '../profile/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../showProfile/Profile';
import AdminRoute from './AdminRoute';
import Admin from '../dashboard/Admin';
import ReMailer from '../auth/ReMailer';
import Authorize from '../auth/Authorize';
import ChangePassword from '../auth/ChangePassword';
import Forms from '../forms/Forms';
import CompanyForm from '../form/CompanyForm';
import Form from '../form/Form';
import FormResponses from '../form/FormResponses';
import SingleFormResponse from '../form/SingleFormResponse';
import CreateForm from '../form/CreateForm';
import SimpleForm from '../form/SimpleForm';
import Alert from '../../components/Alert';

const ApplicationRoutes = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/api/users/confirmation/:token" element={<Authorize/>} />
        <Route path="/recovery" element={<ReMailer/>} />
        <Route path="/api/users/recovery/:token" element={<ChangePassword/>} />
        <Route path="/profiles" element={<Profiles/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <PrivateRoute path="/forms" element={<Forms/>} />
        <PrivateRoute path="/api/forms/:company" element={<CompanyForm/>} />
        <PrivateRoute path="/api/forms/create/:company" element={<CreateForm/>} />
        <PrivateRoute path="/forms/post/:company/:id" element={<SimpleForm/>} />
        <PrivateRoute path="/api/forms/:company/:id" element={<Form/>} />
        <PrivateRoute path="/api/forms/res/:company/:id" element={<FormResponses/>} />
        <PrivateRoute path="/api/forms/res/:company/:id/:response" element={<SingleFormResponse/>} />
        <PrivateRoute path="/dashboard" element={<Dashboard/>} />
        <PrivateRoute path="/create-profile" element={<CreateProfile/>} />
        <PrivateRoute path="/edit-profile" element={<EditProfile/>} />
        <PrivateRoute path="/edit-experience/:id" element={<EditExperience/>} />
        <PrivateRoute path="/edit-education/:id" element={<EditEducation/>} />
        <PrivateRoute path="/experience" element={<AddExperience/>} />
        <PrivateRoute path="/education" element={<AddEducation/>} />
        <PrivateRoute path="/posts" element={<Posts/>} />
        <PrivateRoute path="/posts/:id" element={<Post/>} />
        <AdminRoute path="/admin" element={<Admin/>} />
        <Route element={<NotFound/>} />
      </Routes>
    </section>
  );
};

export default ApplicationRoutes;
