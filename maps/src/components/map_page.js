import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Demo from './geolocator.js'
import Navbar from './navbar/navbar.js'
import firebase from 'firebase';
import icon from './icon.png';

const AnyReactComponent = ({nome}) => <div><img src={icon} width= '30px' height='40px'/></div>;
export default class Mapa extends Component {

    constructor(props) {
        super(props);
        this.state = { lat: '', lon: '', carregado: false, status: null, marcadores: [],
        categorias: [] };
    }

    componentDidMount() {
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        carregado: true,
                        //lat: result.lat,
                        //lon: result.lon
                        lat:-9.6640396,
                        lon:-35.7303309
                    });
                    
                },
                (error) => {
                    this.setState({
                        carregado: false,
                        status: error
                    });
                }
            )
            const db = firebase.firestore();
        db.collection('marcadores').get().then((querySnapshot) => {
            const marcadores = [];
            querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    const {categoria, coords, nome, descricao} = doc.data();

                    marcadores.push({
                        key: doc.id,
                        categoria: categoria,
                        coords: coords,
                        nome: nome,
                        descricao: descricao,
                    });


                }
            );

            this.setState({
                marcadores: marcadores,
            });
        }).catch((error) => {
            console.error(error);
        });

        db.collection('categoria').get().then((querySnapshot) => {
            const categorias = [];
            querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    const {nome} = doc.data();

                    categorias.push({
                        key: doc.id,
                        nome: nome,
                    });


                }
            );

            this.setState({
                categorias: categorias,
            });
        }).catch((error) => {
            console.error(error);
        });
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
                        {this.state.marcadores.map((marcadores) => {
                        return (
                            <AnyReactComponent
                                lat={marcadores.coords.lat}
                                lng={marcadores.coords.long}
                                nome={marcadores.nome}
                                onChildClick={marcadores.descricao}
                                hover={marcadores.desc}
                            />
                        )
                    })}
                    </GoogleMapReact>
                </div>
            );
        }
        else
            return <div>eh</div>
    }
}


