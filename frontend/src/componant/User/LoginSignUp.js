import React from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import {useAlert} from "react-alert";

import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, login, register} from '../../action/userAction';
import Loader from "../layout/Loader/Loader";


const LoginSignUp = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error,loading, isAuthenticated  } = useSelector(state => state.user)
  console.log("is Autheticated ---->>>>>>", isAuthenticated);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
}
  );
  const { name, email, password } = user;
/// C H A N G E S
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // FOR COKKIES RELATE PROBLEM
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  };

  /////////////////////////////////// FOR UPLOAD IMAGE IN CLOUDINARY /////////////////////////////
    
    // const uploadImg = (file) => {
    //   const data = new FormData()
    //   data.append("file", "image")
    //   data.append("upload_preset", "tutorial")
    //   data.append("cloud_name","breellz")
    //   fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload",{
    //   method:"post",
    //   body: data
    //   })
    //   .then(resp => resp.json())
    //   .then(data => {
    //   // setUrl(data.url)
    //   setAvatar(data.url);
    //   console.log(data.url)
    //   })
    //   .catch(err => console.log(err))
    //   }
          

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);
    dispatch(register (myForm))

  }
  const registerDataChange = (e) => {
    if(e.target.name === "avatar"){
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.result === 2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }

      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else{
      setUser({ ...user, [e.target.name]:e.target.value})
    }
  }
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isAuthenticated){
    // Uncaught TypeError: Cannot read properties of undefined (reading 'push') --->  #### F-I-X-E-D ####
     navigate("/account")
    }
  }, [dispatch, error, alert, navigate, isAuthenticated ])
  

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      { loading ? <Loader/> : <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="forget/password">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>

          <form 
          className="signUpForm"
          ref={registerTab}
          encType="multipart/form-type"
          onSubmit={registerSubmit}
          >
          <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    autoComplete="on"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

        {/* CHANGES FILE IN AND IN BACKEND 2 FILES TOUCHED 
        1. SERVER.JS IN BACKEND FOR ADD CLOUDINARY CLOUD
        2. USERCONTROLLER > REGISTER_USER > CHANGE DATA
        3. CREATE A FOLDER ON THE AVATARS. ALL SECRET CODE SEND THROUGH THE WHATSSAPP
        CODE PUSHED */}
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatars"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
        <input
                type="submit"
                placeholder="register"
                className="signUpBtn"
            />
          </form>

        </div>
      </div>
      }
    </>
  );
};

export default LoginSignUp;
