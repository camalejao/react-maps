import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from './navbar/navbar.js'
import firebase from 'firebase';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logado: false, usuario: null
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ logado: true, usuario: user });
      } else {
        this.setState({ logado: false, usuario: null });
      }
    });
  }

  addPlace() {
    var place = {
      desciption: '',
      lat: '',
      lng: ''
    };

    firebase.database().ref('marcadores').push(place)
      .then(sucesso => {
        console.log('Dados inseridos: ' + sucesso);
      });
  }

  listPlaces() {
    var ref = firebase.database().ref('marcadores');

    ref.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val());
      })
    });
  }

  render() {
    return (
      <div>
        <Navbar logado={this.state.logado} usuario={this.state.usuario} />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
              <h1 className="display-1 text-info">React Map</h1>
            </div>
          </div>
        </div>
      </div>


    );
  }


}

export default Home