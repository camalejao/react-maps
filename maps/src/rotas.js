import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home_page';
import Mapa from './components/map_page';
import Login from './components/login_page'
import Logout from './components/logout'
import Geolocator from './components/geolocator';
import firebase from 'firebase';

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqjs5Wyr1Aw5jJ-YQFcnwBrcIEYP6cANc",
    authDomain: "react-map-82b1e.firebaseapp.com",
    databaseURL: "https://react-map-82b1e.firebaseio.com/",
    projectId: "react-map-82b1e",
    storageBucket: "react-map-82b1e.appspot.com",
    messagingSenderId: "1021384083333"
  };
  firebase.initializeApp(config);



export default class Rotas extends Component {   
render(){
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/map" component={Mapa} />
                <Route exact path="/geo" component={Geolocator} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
            </Switch>
        </Router>
    );
}


}