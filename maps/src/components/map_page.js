import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Demo from './geolocator.js'
import Navbar from './navbar/navbar.js'
import firebase from 'firebase';
import icon from './icon.png';
import marker from './marker.css';

const AnyReactComponent = ({ nome }) => <div><img src={icon} width='35px' height='40px' className="marker" title={nome} /></div>;
export default class Mapa extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: '', lon: '', carregado: false, status: null, marcadores: [],
            categorias: []
        };
    }

    componentDidMount() {
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        carregado: true,
                        lat: result.lat,
                        lon: result.lon
                        //lat:-9.6640396,
                        //lon:-35.7303309
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

                const { categoria, coords, nome, descricao } = doc.data();

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

                const { nome } = doc.data();

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
            const latitude = this.state.lat;
            const longitude = this.state.lon;
            var center = { lat: latitude, lng: longitude };
            var zoom = 12;
            console.log(this.state);
            return (
                <div className='google-map' style={style}>
                    <Navbar />
                    <li className="buttom">
                        <a className="button-link" href="/map">Mapa</a>
                    </li>
                    
                    <h6>
                        local atual: {latitude}, {longitude}
                    </h6>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: '' }}
                        defaultCenter={center}
                        defaultZoom={zoom}
                    >
                        <AnyReactComponent
                            lat={latitude}
                            lng={longitude}
                            nome={'Sua Localização'}
                        />
                        {this.state.marcadores.map((marcador) => {
                            return (
                                <AnyReactComponent
                                    lat={marcador.coords.lat}
                                    lng={marcador.coords.long}
                                    nome={marcador.nome}
                                    onChildClick={marcador.descricao}
                                    hover={marcador.desc}
                                />
                            )
                        })}
                    </GoogleMapReact>
                </div>
            );
        }
        else
            return <div>Carregando</div>
    }
}

