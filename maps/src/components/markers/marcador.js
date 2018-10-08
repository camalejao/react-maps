import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import marker from './marker.css';
import firebase from 'firebase';
import ReactTooltip from 'react-tooltip'

export default class Marcador extends Component {

    constructor(props) {
        super(props);
        this.addMarcador = this.addMarcador.bind(this);
    }

    addMarcador() {
        if (this.props.usuario) {
            const marker = this.props.marker;
            console.log(this.props.lat, this.props.lng, marker.nome);
            const db = firebase.firestore();
            db.collection("favoritos").doc(this.props.usuario.uid).collection("marcadores").doc(marker.key).set({ nome: marker.nome })
                .then(function () {
                    console.log("Document successfully written!");
                    window.location.reload();
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        } else (console.log('não está logado'))
    }

    render() {
        const marker = this.props.marker;
        const n = this.props.n;
        return (
            <div className='marker' title={marker.nome} data-tip={marker.descricao} data-for={'tip' + n} onClick={this.addMarcador}>
                <div className='row justify-content-center'>
                    <FontAwesomeIcon icon="map-marker-alt" size="2x" className="marker-icon" />
                </div>
                <ReactTooltip id={'tip' + n} data-multiline='true' />
            </div>
        )
    }

}