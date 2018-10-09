import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import marker from './marker.css';
import ReactTooltip from 'react-tooltip';

export default class Marcador extends Component {

    render() {
        const marker = this.props.marker;
        const n = this.props.n;
        return (
            <div>
                <div className='marker' data-tip={marker.nome} data-for={'tip' + n}>
                    <div className='row justify-content-center'>
                        <FontAwesomeIcon icon="map-marker-alt" size="2x" className="marker-icon" />
                    </div>
                </div>
                <ReactTooltip id={'tip' + n} effect='solid' />
            </div>
        )
    }

}