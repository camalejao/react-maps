import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import marker from './marker.css';
import ReactTooltip from 'react-tooltip'

export default class Marcador extends Component {
    render() {
        return (
            <div className='marker' title={this.props.nome}>
                <div className='row justify-content-center'>
                    <span data-tip={this.props.descricao} data-for={'tip'+this.props.n}>
                        <FontAwesomeIcon icon="map-marker-alt" size="2x" className="marker-icon" />
                    </span>
                </div>
                <ReactTooltip id={'tip'+this.props.n} data-multiline='false' />
            </div>
        )
    }

}