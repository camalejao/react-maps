import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import marker from './marker.css';

export default class Marcador extends Component {
    render() {
        return (
            <div className='marker' title={this.props.nome}>
                <div className='row justify-content-center'>
                    <FontAwesomeIcon icon="map-marker-alt" size="2x" className="marker-icon" />
                </div>
            </div>
        )
    }

}