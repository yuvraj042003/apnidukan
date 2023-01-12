import React from 'react'
import playStore from "../Images/playstore.png"
import  Appstore from "../Images/Appstore.png"
import { Link } from 'react-router-dom'
import  footer from "../Footer/Footer.css"
const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>Download Our App</h4>
            <p>Download App for Android and Apple Store</p>
            <img src={playStore} alt="playstore"/>
            <img src={Appstore} alt="playstore"/>
        </div>

        <div className="midFooter">
            <h1>Apni Dukan</h1>
            <p>Quality Product and On Time Dilevry is our First Priority</p>
            <p>Copyrights &copy; UVDeveloper</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us:</h4>
            <Link to={'#'}>LinkedIn</Link>
            <Link to={'#'}>Twitter</Link>
            <Link to={'#'}>Youtube</Link>
        </div>
    </footer>
  )
}

export default Footer