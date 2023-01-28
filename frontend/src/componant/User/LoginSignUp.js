import React from "react";
import "./LoginSignUp.css";
import loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

const LoginSignUp = () => {
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

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  
  const loginSubmit = () => {
    console.log(" Login Form Submitted");
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);
    console.log(" Signup Form Submitted");

  }
  const registerDataChange = (e) =>{
    if(e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files)
    }
    else{
      setUser({...user, [e.target.name]:e.target.value });
    }
  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRigth");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRigth");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      <div className="LoginSignUpContainer">
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
          ref="registerForm"
          encType="multipart/form-type"
          onSubmit={registerSubmit}
          >
          <div className="signUpName">
            <FaceIcon/>
            <input
                type="text"
                placeholder="Name"
                required
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
                value={password}
                onChange={registerDataChange}
              />
        </div>

        <div id="registerImage">
            <img src={avatarPreview} alt="AvatarPrivew" />
            <input
                type="file"
                placeholder="avatar"
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
    </>
  );
};

export default LoginSignUp;
