import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home_page';
import Mapa from './components/map_page';
import Login from './components/login_page'
import Logout from './components/logout'
import Geolocator from './components/geolocator';
import firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faQuestionCircle, faHeart as fasFaHeart  } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';

library.add(faMapMarkerAlt);
library.add(faQuestionCircle);
library.add(fasFaHeart);
library.add(farFaHeart);

// Initialize Firebase


export default class Rotas extends Component {
    render() {
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