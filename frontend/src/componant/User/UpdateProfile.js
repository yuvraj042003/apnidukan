import React from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, loadUser, updateProfile} from '../../action/userAction';
import Loader from "../layout/Loader/Loader";
import { UPDATE_PROFILE_RESET } from "../../constant/userConstant";
import MetaData from '../layout/metadata'

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const {error, isUpdated, loading} = useSelector((state) => state.profile);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const uploadImg = (file) => {
      console.log(file)
      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "radr1w4p")
      data.append("cloud_name","dlch8tvdz")
      fetch("https://api.cloudinary.com/v1_1/dlch8tvdz/image/upload", {
        method: "post",
        body: data,
      })
      .then((res) => res.json())
        .then((data) => {
          // setPic(data.url.toString());
          console.log(data)
          console.log(data.url.toString());
          // setPicLoading(false);
        })
      .catch(err => console.log(err))
      }
          

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("avatar",avatar);
    dispatch(updateProfile (myForm))

  }
  const updateProfileDataChange = (e) => {
    
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.result === 2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    
    
  }
  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview("user.avatar.url");
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isUpdated){
    // Uncaught TypeError: Cannot read properties of undefined (reading 'push') --->  #### F-I-X-E-D ####
    alert.success("Profile Updated Successfully");
    dispatch(loadUser()); 
    navigate("/account");

    dispatch({
      type: UPDATE_PROFILE_RESET
    })
    }
  }, [dispatch, error, alert, navigate, isUpdated ])
  

  return (
    
    <>
    <MetaData title="Update Profile @Apni Dukan" />
      { loading ? <Loader/> : 
      <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
      }
        
    </>         
  )
}

export default UpdateProfile