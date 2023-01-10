import  Header  from "../src/componant/layout/Headere/Header"
import  Footer  from "./componant/layout/Footer/Footer" 
//import WebFont from "webfontloader"
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
//import React, { useEffect } from "react";
import Home from "./componant/layout/Home.js"
function App() {
  // React.useEffect(()=>{
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"],
  //     },
  //   });
  // }, []);
  return (
  
    <Router>
     <Header />
     <Switch> 
     <Route extact path="/"><Home/></Route>
     </Switch>
     
     <Footer />
    </Router>

  
  );
}

export default App;
