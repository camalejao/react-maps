import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Demo from './geolocator.js'
import Navbar from './navbar/navbar.js'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Mapa extends Component {


    constructor(props) {
        super(props);
        this.state = { lat: '', lon: '', carregado: false, status: null };
    }

    componentDidMount() {
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        carregado: true,
                        lat: result.lat,
                        lon: result.lon
                    });
                },
                (error) => {
                    this.setState({
                        carregado: true,
                        status: error
                    });
                }
            )
    }

    render() {
        const style = {
            width: '50vw',
            height: '50vh'
        }

        if (this.state.carregado) {
            var latitude = this.state.lat;
            var longitude = this.state.lon;
            var center = { lat: latitude, lng: longitude };
            var zoom = 11;
            console.log(this.state);
            return (



                <div className='google-map' style={style}>
                    <Navbar />
                    <li className="buttom">
                            <a className="button-link" href="/map">Mapa</a>
                        </li>
                    <Demo />
                    <h1>
                        HOME {latitude}, {longitude}
                    </h1>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: '' }}
                        defaultCenter={center}
                        defaultZoom={zoom}
                    >
                        <AnyReactComponent
                            lat={latitude}
                            lng={longitude}
                            text={'Você está aqui'}
                        />
                    </GoogleMapReact>
                </div>
            );
        }
        else
            return <div>eh</div>
    }
}

export default Mapa;
