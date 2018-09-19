import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home_page';
import Mapa from './components/map_page';
import firebase from 'firebase';

var config = {
    //redacted
};
firebase.initializeApp(config);

export default class Rotas extends Component {   
render(){
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/map" component={Mapa} />
            </Switch>
        </Router>
    );
}


}