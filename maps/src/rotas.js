import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home_page';
import Mapa from './components/map_page';
import Login from './components/login_page'
import Logout from './components/logout'
import Geolocator from './components/geolocator';
import firebase from 'firebase';

 // Initialize Firebase




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