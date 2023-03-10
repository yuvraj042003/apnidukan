import React, { useState } from 'react'
import './Header.css';
import {SpeedDial, SpeedDialAction} from '@mui/lab';
import { Backdrop } from '@mui/material';
import DashboardIcon  from '@material-ui/icons/Dashboard';
import PersonIcon  from '@material-ui/icons/Person';
import ExitToAppIcon  from '@material-ui/icons/ExitToApp';
import ListAltIcon  from '@material-ui/icons/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useAlert} from 'react-alert';
import {logout} from '../../../action/userAction'

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
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
        dispatch(logout());
        alert.success("Logout Successfully");

    }
  return (
    <>
        <Backdrop open={true} style={{ zIndex: "10" }} />
        <SpeedDial 
        ariaLabel='SpeedDial Tooltip Example'
        className='speedDial'
        onClose={() => setOpen(false)}
        style={{zIndex: "11"}}
        onOpen = {() => setOpen(true)}
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
        <SpeedDialAction
         key={item.name}

         icon={<item.icon/>}
         tooltipTitle={item.name}
         onClick={item.func}></SpeedDialAction>
        ))
        }
        


        </SpeedDial>
    </>
  )
}

export default UserOptions;