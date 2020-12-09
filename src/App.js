import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Views/Home';
import Favorites from './Views/Favorites';
import PromoDiscount from './Views/PromoDiscount';
import Setting from './Views/Setting';
import SinglePage from './Views/SinglePage'
import Map from './Views/Map'


function App() {
  return (
    <div className="h-screen">
      <Router>
          <Header/>

          <Switch>
              <Route exact path = "/~lauriaus/build/"><Home/></Route>
              <Route exact path = "/~lauriaus/build/favorites"><Favorites /></Route>
              <Route exact path = "/~lauriaus/build/:name/promodiscount"><PromoDiscount /></Route>
              <Route exact path = "/~lauriaus/build/setting"><Setting /></Route>
              <Route exact path = "/~lauriaus/build/:name"><SinglePage /></Route>
              <Route exact path = "/~lauriaus/build/:name/map"><Map /></Route>
          </Switch>

          {/*<Footer />*/}
      </Router>
    </div>
  ); 
}

export default App;
