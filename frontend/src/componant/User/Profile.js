import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import MetaData from '../layout/metadata'
import Loader from '../layout/Loader/Loader'
import { useNavigate} from 'react-router-dom'
import "./Profile.css";

const Profile = () => {
  const {user, loading, isAuthenticated} = useSelector((state)=>state.user);
  console.log(user)
  const navigate = useNavigate();
console.log(user)
  useEffect(() => {
    if(isAuthenticated === false){
      navigate("/login")
    }
  }, [isAuthenticated, navigate])
  


  return (
    <>
        {loading ? <Loader />:<><MetaData title={`${user.name}s Profile`}/>
        <div className='profileContainer'>
          <div>
            <h1>My Profile</h1>
            <img src={user.avatar} alt={user.name}/>
            <Link to="/profile/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>

              <p>{String(user.createAt).substring(0, 10)}</p>
            </div>
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Update Password</Link>
            </div>
          </div>
        </div>
        </>}
        
    </>
  )
}

export default Profile