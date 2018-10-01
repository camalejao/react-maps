import firebase from 'firebase';
import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        var currentUser = firebase.auth().currentUser
        if (!currentUser) {
            this.props.history.push('/');
        }
    }

    logout() {
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    render(){
        return(
            <input>
                {this.logout()}
            </input>
        );
    }
}




export default Logout
