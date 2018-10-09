import React, { Component } from 'react';
import firebase from 'firebase';

export default class NovoMarcador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            novo_marcador: { nome: '', descricao: '', categoria: '', coords: { lat: '', long: '' } }
        };

        this.cadastrarMarcador = this.cadastrarMarcador.bind(this);
        this.atualizarNomeNovoMarcador = this.atualizarNomeNovoMarcador.bind(this);
        this.atualizarLatitudeNovoMarcador = this.atualizarLatitudeNovoMarcador.bind(this);
        this.atualizarLongitudeNovoMarcador = this.atualizarLongitudeNovoMarcador.bind(this);
        this.atualizarDescricaoNovoMarcador = this.atualizarDescricaoNovoMarcador.bind(this);
        this.atualizarCategoriaNovoMarcador = this.atualizarCategoriaNovoMarcador.bind(this);
        this.limparForm = this.limparForm.bind(this);

    }

    cadastrarMarcador() {
        const db = firebase.firestore();
        db.collection("marcadores").doc().set({
            coords: this.state.novo_marcador.coords,
            nome: this.state.novo_marcador.nome,
            descricao: this.state.novo_marcador.descricao,
            categoria: this.state.novo_marcador.categoria
        })
            .then(function () {
                console.log("Document successfully written!");
                window.location.reload();
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    atualizarLatitudeNovoMarcador(event) {
        var marcador = this.state.novo_marcador;
        marcador.coords.lat = event.target.value;
        this.setState({ novo_marcador: marcador });
    }

    atualizarLongitudeNovoMarcador(event) {
        var marcador = this.state.novo_marcador;
        marcador.coords.long = event.target.value;
        this.setState({ novo_marcador: marcador });
    }

    atualizarNomeNovoMarcador(event) {
        var marcador = this.state.novo_marcador;
        marcador.nome = event.target.value;
        this.setState({ novo_marcador: marcador });
    }

    atualizarDescricaoNovoMarcador(event) {
        var marcador = this.state.novo_marcador;
        marcador.descricao = event.target.value;
        this.setState({ novo_marcador: marcador });
    }
    
    atualizarCategoriaNovoMarcador(event) {
        var marcador = this.state.novo_marcador;
        marcador.categoria = event.target.value;
        this.setState({ novo_marcador: marcador });
    }

    limparForm() {
        document.querySelectorAll('input[type=text]').forEach(el => el.value = '');
    }

    render() {
        var categorias = this.props.categorias;
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="inputLat" className="">Latitude</label>
                    <input className="form-control" type="text" name="latitude" id="inputLat" placeholder="Latitude" onChange={this.atualizarLatitudeNovoMarcador} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputLong" className="">Longitude</label>
                    <input className="form-control" type="text" name="longitude" id="inputLong" placeholder="Longitude" onChange={this.atualizarLongitudeNovoMarcador} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputNome" className="">Nome</label>
                    <input className="form-control" type="text" name="nome" id="inputNome" placeholder="Nome" onChange={this.atualizarNomeNovoMarcador} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputDesc" className="">Descrição</label>
                    <input className="form-control" type="text" name="descricao" id="inputDesc" placeholder="Descrição" onChange={this.atualizarDescricaoNovoMarcador} />
                </div>
                <div className="form-group">
                    <label htmlFor="selectCategoria">Categoria</label>
                    <select class="form-control" id="selectCategoria" onChange={this.atualizarCategoriaNovoMarcador}>
                        <option defaultChecked hidden='true'>Selecione...</option>
                        {categorias.map((cat) => {
                            return (
                                <option value={cat.key}>{cat.nome}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <div className="form-row justify-content-center">
                        <button className="btn btn-sm btn-outline-primary mt-4 mb-2" onClick={this.cadastrarMarcador}>Cadastrar</button>
                    </div>
                    <div className="form-row justify-content-center">
                        <button className="btn btn-sm btn-outline-danger" onClick={this.limparForm}>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    }
}





