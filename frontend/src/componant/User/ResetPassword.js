import React from "react";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors} from '../../action/userAction';
import Loader from "../layout/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../constant/userConstant";
import MetaData from '../layout/metadata';

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";



const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const {error, success, loading} = useSelector((state) => state.forgotPassword);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const ResetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(ResetPassword(params.token,myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="ResetPasswordContainer">
            <div className="ResetPasswordBox">
              <h2 className="ResetPasswordHeading">Update Profile</h2>

              <form
                className="ResetPasswordForm"
                onSubmit={ResetPasswordSubmit}
              >
                <div >
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div >
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="ResetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
