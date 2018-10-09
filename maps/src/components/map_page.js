import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Demo from './geolocator.js'
import Navbar from './navbar/navbar.js'
import firebase from 'firebase';
import Marcador from './markers/marcador.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip'
import NovoMarcador from './novo_marcador.js';


export default class Mapa extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: '', lon: '', carregado: false, status: null, marcadores: [],
            categorias: [], selecionados: [], logado: false, usuario: null,
            inserido: false, favoritos: [], favs: false, marcadorSelecionado: { marker: { nome: '', descricao: ''} },
            selecionado: false
        };

        this.filtrar = this.filtrar.bind(this);
        this.limparFiltros = this.limparFiltros.bind(this);
        this.addFavorito = this.addFavorito.bind(this);
        this.remvFavorito = this.remvFavorito.bind(this);
        this.selecionarMarcador = this.selecionarMarcador.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ logado: true, usuario: user });

                console.log("logado")
                var id = this.state.usuario.uid;
                var ref = firebase.firestore().collection("favoritos");
                ref.get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.id === id) {
                            console.log("UID já cadastrada");
                            this.setState({ inserido: true })
                            return;
                        } else if (this.state.inserido === false) {
                            console.log("UID cadastrada")
                            ref.doc(id).set({});
                            this.setState({ inserido: true })
                            return;
                        }

                    });
                });

            } else {
                console.log("não logado")
                this.setState({ logado: false, usuario: null });
            }
        });
    }

    componentDidMount() {
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then((result) => {
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
                })
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
            });
            this.setState({
                categorias: categorias,
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    componentDidUpdate() {
        if (this.state.logado && !this.state.favs) {
            const db = firebase.firestore();
            db.collection('favoritos').doc(this.state.usuario['uid']).collection('marcadores').get().then((querySnapshot) => {
                const favoritos = [];
                querySnapshot.forEach((doc) => {
                    const { nome } = doc.data();
                    favoritos.push({
                        key: doc.id,
                        nome: nome,
                    });
                });
                this.setState({
                    favoritos: favoritos,
                    favs: true
                });
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    filtrar(event) {
        if (event.target.checked) {
            var selec = this.state.selecionados;
            selec.push(event.target.value);
            this.setState({ selecionados: selec });
        } else {
            var selec = this.state.selecionados;
            for (var i = selec.length - 1; i >= 0; i--) {
                if (selec[i] === event.target.value)
                    selec.splice(i, 1);
            }
            this.setState({ selecionados: selec });
        }
    }

    limparFiltros() {
        document.querySelectorAll('input[type=checkbox]').forEach(el => {
            el.checked = false;
            var selec = this.state.selecionados;
            for (var i = selec.length - 1; i >= 0; i--) {
                if (selec[i] === el.value)
                    selec.splice(i, 1);
            }
            this.setState({ selecionados: selec });
        });
    }

    addFavorito() {
        if (this.state.usuario) {
            const marker = this.state.marcadorSelecionado.marker;
            console.log(this.state.marcadorSelecionado.lat, this.state.marcadorSelecionado.lng, marker.nome);
            const db = firebase.firestore();
            db.collection("favoritos").doc(this.state.usuario.uid).collection("marcadores").doc(marker.key).set({ nome: marker.nome })
                .then(function () {
                    console.log("Document successfully written!");
                    window.location.reload();
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        } else (console.log('não está logado'))
    }
    remvFavorito() {
        if (this.state.usuario) {
            const marker = this.state.marcadorSelecionado.marker;
            const db = firebase.firestore();
            db.collection("favoritos").doc(this.state.usuario.uid).collection("marcadores").doc(marker.key).delete().then(function () {
                console.log("Documento deletado!");
                window.location.reload();
            })
                .catch(function (error) {
                    console.error("Erro ao tentar deletar o documento ", error)
                });
        } else (console.log("Usuário não está logado"))
    }

    selecionarMarcador(key, childProps) {
        this.setState({ marcadorSelecionado: childProps, selecionado: true });
        console.log(childProps.marker.categoria);
        console.log(this.state.categorias[childProps.marker.categoria-1]);
    }

    render() {
        var ehFavorito = false;
        var categorias = this.state.categorias;
        const style = {
            //width: '50rem',
            height: '30rem'
        }
        if (this.state.carregado) {
            const latitude = this.state.lat;
            const longitude = this.state.lon;
            var center = { lat: latitude, lng: longitude };
            var zoom = 13;
            return (
                <div className>
                    <Navbar logado={this.state.logado} usuario={this.state.usuario} />
                    <div className='container-fluid mt-3'>
                        <div className='row'>
                            <div className='col-8'>
                                <div className='google-map' style={style}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: '' }}
                                        defaultCenter={center}
                                        defaultZoom={zoom}
                                        onChildClick={this.selecionarMarcador}
                                    >
                                        {this.state.marcadores.map((marcador, n) => {
                                            var passou = false;
                                            {
                                                this.state.categorias.map((cat) => {
                                                    if ((cat.key == marcador.categoria) && this.state.selecionados.includes(cat.nome))
                                                        passou = true;
                                                })
                                            }
                                            if (this.state.selecionados.includes('favoritos')) {
                                                {
                                                    this.state.favoritos.map((fav) => {
                                                        if (fav.key === marcador.key)
                                                            passou = true;
                                                    })
                                                }
                                            }
                                            if (passou || !this.state.selecionados.length) {
                                                return (
                                                    <Marcador
                                                        lat={marcador.coords.lat}
                                                        lng={marcador.coords.long}
                                                        n={n}
                                                        marker={marcador}
                                                        usuario={this.state.usuario}
                                                    />
                                                )
                                            }
                                        })}
                                    </GoogleMapReact>
                                </div>
                            </div>
                            <div className="col-4">
                                {this.state.selecionado ?
                                    <div className='card mb-3'>
                                        <div className='card-body'>
                                            {this.state.favoritos ?
                                                <div>
                                                    {this.state.favoritos.map((fav) => {
                                                        if (fav.key === this.state.marcadorSelecionado.marker.key)
                                                            ehFavorito = true;
                                                    })}
                                                </div>
                                                :
                                                <div>
                                                    {ehFavorito = false}
                                                </div>
                                            }
                                            <h5>
                                                {this.state.marcadorSelecionado.marker.nome}&nbsp;
                                                {ehFavorito ?
                                                    <span onClick={this.remvFavorito} title='Remover Favorito' style={{cursor: 'pointer'}}>
                                                        <FontAwesomeIcon clickable='true' icon='heart' color='red' />
                                                    </span>
                                                    :
                                                    <span onClick={this.addFavorito} title='Adicionar Favorito' style={{cursor: 'pointer'}}>
                                                        <FontAwesomeIcon icon={['far', 'heart']} />
                                                    </span>
                                                }
                                            </h5>
                                            <p>{categorias[this.state.marcadorSelecionado.marker.categoria -1].nome}</p>
                                            <p>{this.state.marcadorSelecionado.marker.descricao}</p>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }

                                <div className='card'>
                                    <div className='card-header'>
                                        <span>Filtrar por categoria </span>
                                        <span data-for='duvida' data-tip="Apenas os marcadores das categorias selecionadas serão exibidos.<br>Para exibir todos, basta clicar em 'Limpar Filtros'.">
                                            <FontAwesomeIcon icon='question-circle' size='sm' color='gray' />
                                        </span>
                                        <ReactTooltip id='duvida' multiline='true' />
                                    </div>
                                    <div className='card-body'>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id='favoritos' value='favoritos' onChange={this.filtrar} />
                                            <label className="custom-control-label" htmlFor='favoritos'>Favoritos</label>
                                        </div>
                                        {this.state.categorias.map((cat, n) => {
                                            return (
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id={'cat' + n} value={cat.nome} onChange={this.filtrar} />
                                                    <label className="custom-control-label" htmlFor={'cat' + n}>{cat.nome}</label>
                                                </div>
                                            )
                                        })}
                                        <button className='btn btn-sm btn-outline-primary mt-3' onClick={this.limparFiltros}>Limpar Filtros</button>
                                    </div>
                                </div>
                                <div className="card mt-2 mb-3">
                                    <div className="card-header">
                                        <span>Novo Marcador</span>
                                    </div>
                                    <div className="card-body">
                                        {this.state.usuario ?
                                            <NovoMarcador categorias={this.state.categorias} />
                                            :
                                            <p>Você precisa estar logado para adicionar novos marcadores.</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (
                <div>
                    <Navbar logado={this.state.logado} usuario={this.state.usuario} />
                    Carregando
                </div>
            )
    }
}


