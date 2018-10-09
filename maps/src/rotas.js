import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home_page';
import Mapa from './components/map_page';
import Login from './components/login_page'
import Logout from './components/logout'
import firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faQuestionCircle, faHeart as fasFaHeart  } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';

library.add(faMapMarkerAlt);
library.add(faQuestionCircle);
library.add(fasFaHeart);
library.add(farFaHeart);

// Initialize Firebase

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCqjs5Wyr1Aw5jJ-YQFcnwBrcIEYP6cANc",
  authDomain: "react-map-82b1e.firebaseapp.com",
  databaseURL: "https://react-map-82b1e.firebaseio.com",
  projectId: "react-map-82b1e",
  storageBucket: "react-map-82b1e.appspot.com",
  messagingSenderId: "1021384083333"
};
firebase.initializeApp(config);

export default class Rotas extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/map" component={Mapa} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </Router>
        );
    }


}
