import React, { useState } from 'react'
import './Header.css';
import {SpeedDial, SpeedDialAction} from '@mui/lab';
import DashboardIcon  from '@material-ui/icons/Dashboard';
import PersonIcon  from '@material-ui/icons/Person';
import ExitToAppIcon  from '@material-ui/icons/ExitToApp';
import ListAltIcon  from '@material-ui/icons/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useAlert} from "react-alert"

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const options = [
        {icon: <ListAltIcon/>, name:"Orders", func: orders},
        {icon: <PersonIcon/>, name:"Profile", func: account},
        {icon: <ExitToAppIcon/>, name:"Logout", func: logoutuser},
    ]
    if(user.role==='admin'){
        options.unshift({icon: <DashboardIcon/>,
         name:"Dashboard",
        func: dashboard})
    }

    function dashboard(){
        navigate("/dashboard");
    }
    function orders(){
        navigate("/orders");
    }
    function account(){
        navigate("/account");
    }
    function logoutuser(){
        // useDispatch(logout());
        alert.success("Logout Successfully");

    }
  return (
    <>
        <SpeedDial 
        ariaLabel='SpeedDial Tooltip Example'
        onClose={() =>setOpen=(false)}
        onOpen = {() => setOpen=(true)}
        open={open}
        direction="down"
        icon={
            <img className='SpeeedDialIcon'
            // 'user' is not defined ----> DUE TO REGISTRATION BUTTON ERROR -- FIXED
            src={user.avatar.url ? user.avatar.url: "Profile.png" }

            alt="Profile"
            /> 
        }
        >
        {
            options.map((item)=>(
        <SpeedDialAction icon={<item.icon/>}
         tooltipTitle={item.name}
         onClick={item.func}></SpeedDialAction>
        ))
        }
        


        </SpeedDial>
    </>
  )
}

export default UserOptions;