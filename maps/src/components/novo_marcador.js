import React, { Component } from 'react';
import firebase from 'firebase';

export default class NovoMarcador extends Component {
    constructor(props){
        super(props);
        this.state={ novo_marcador:{}};
        this.cadastrarMarcador = this.cadastrarMarcador.bind(this);
        this.atualizarNomeNovoMarcador = this.atualizarNomeNovoMarcador.bind(this);
        this.atualizarLatitudeNovoMarcador = this.atualizarLatitudeNovoMarcador.bind(this);
        this.atualizarLongitudeNovoMarcador = this.atualizarLongitudeNovoMarcador.bind(this);
        this.atualizarDescricaoNovoMarcador = this.atualizarDescricaoNovoMarcador.bind(this);       
            
        }
        
        cadastrarMarcador() {
            const db = firebase.firestore();
            db.collection("marcadores").doc().set({
                lat: this.novo_marcador.coords.lat,
                long: this.novo_marcador.coords.long,
                nome: this.novo_marcador.nome,
                descricao: this.novo_marcador.descricao
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            
        }
        atualizarCategoriaNovoMarcador(event) {
            this.setState({ [this.novo_marcador.descricao]: event.target.value });
        }
        atualizarLatitudeNovoMarcador(event) {
            this.setState({ [this.novo_marcador.coords.lat] : event.target.value });
        }

        atualizarLongitudeNovoMarcador(event) {
            this.setState({ [this.novo_marcador.coords.long]: event.target.value });
        }
        atualizarNomeNovoMarcador(event) {
            this.setState({ [this.novo_marcador.nome]: event.target.value });
        }
        atualizarDescricaoNovoMarcador(event) {
            this.setState({ [this.novo_marcador.descricao]: event.target.value });
        }

        render(){
            return(
                <div>
                   
                   <div className="form-group">
                        <label htmlFor="inputLat" className="">Latitude</label>
                        <input className="form-control" type="text" name="latitude" id="inputLat" placeholder="Latitude" onChange={this.atualizarLatitudeNovoMarcador}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLong" className="">Longitude</label>
                        <input className="form-control" type="text" name="longitude" id="inputLong" placeholder="Longitude" onChange={this.atualizarLongitudeNovoMarcador}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputNome" className="">Nome</label>
                        <input className="form-control" type="text" name="nome" id="inputNome" placeholder="Nome" onChange={this.atualizarNomeNovoMarcador}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDesc" className="">Descrição</label>
                        <input className="form-control" type="text" name="descricao" id="inputDesc" placeholder="Descrição" onChange={this.atualizarDescricaoNovoMarcador}/>
                    </div>                  



                    <div className="form-group">
                        <div className="form-row justify-content-center">
                            <button className="btn btn-sm btn-outline-primary mt-4 mb-2" type="submit">Cadastrar</button>
                        </div>
                        <div className="form-row justify-content-center">
                            <a className="btn btn-sm btn-outline-danger" href="/" >Cancelar</a>
                        </div>
                    </div>
                    
                </div>
            );
        }

}





