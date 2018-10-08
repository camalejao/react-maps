import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import marker from './marker.css';
import firebase from 'firebase';
import ReactTooltip from 'react-tooltip'
import NovoMarcador from '../novo_marcador';

export default class Marcador extends Component {

    render() {
        const marker = this.props.marker;
        const n = this.props.n;
        return (
            <div className='marker' title={marker.nome} data-tip={marker.descricao} data-for={'tip' + n}>
                <div className='row justify-content-center'>
                    <FontAwesomeIcon icon="map-marker-alt" size="2x" className="marker-icon" />
                </div>
                <ReactTooltip id={'tip' + n} data-multiline='true' />
            </div>
        )
    }

}