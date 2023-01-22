import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from "../Images/logo.PNG"
import {MdAccountCircle } from 'react-icons/md';
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  
  searchIcon	: "true",
  SearchIconElement	: MdSearch,
  searchIconUrl: '/search',
  searchIconSize: '2vmax',
  searchIconColor: 'black',
  searchIconColorHover : 'eb4034',


  cartIcon : 'true',
  CartIconElement : MdAddShoppingCart,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",

  profileIcon : 'true',
  ProfileIconElement : MdAccountCircle,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
};


const Header = () => {
  return (
    <ReactNavbar {...options}/>
    
  )
}
export default Header