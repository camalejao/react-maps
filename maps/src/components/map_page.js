import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';




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

        if (this.state.carregado) {
            var latitude = this.state.lat;
            var longitude = this.state.lon;

            console.log(this.state);
            return (
                <div className="">
                    <h1>
                        HOME {latitude}, {longitude}
                    </h1>
                </div>
            );
        }
        else
            return <div>eh</div>
    }
}

export default Mapa;
