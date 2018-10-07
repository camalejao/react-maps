import React, { Component } from 'react';
import Navbar from './navbar/navbar'
import firebase from 'firebase';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            senha: '',
            logado: false,
            usuario: null
        };

        this.loginUsuario = this.loginUsuario.bind(this);
        this.cadastrarUsuario = this.cadastrarUsuario.bind(this);
        this.atualizarEmail = this.atualizarEmail.bind(this);
        this.atualizarSenha = this.atualizarSenha.bind(this);

    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            const db = firebase.firestore();
            if (user) {
                var ref = db.collection('categoria').doc('7').collection("users");
                ref.doc(user.uid).set({});
                this.setState({ logado: true, usuario: user });
            } else {
                this.setState({ logado: false, usuario: null });
            }
        });
    }

    atualizarEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizarSenha(event) {
        this.setState({ senha: event.target.value });
    }

    cadastrarUsuario() {
        firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.senha
        )
            .then(sucesso => {
                alert('Usuário cadastrado com sucesso!');
            })
            .catch(erro => {
                alert(erro);
            });
    }

    loginUsuario() {
        firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.senha
        )
            .then(sucesso => {
                this.props.history.push('/');
            })
            .catch(erro => {
                alert(erro);
            });
    }

    render() {
        if (!this.state.logado) {
            return (
                <div>
                    <Navbar logado={this.state.logado} usuario={this.state.usuario} />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="card mt-2 mb-2" style={{ width: '25rem' }}>
                                <div className="card-header">Login / Cadastro</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" id="email" name="email" className="form-control"
                                            value={this.state.email} onChange={this.atualizarEmail} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="senha">Senha</label>
                                        <input type="password" id="senha" name="senha" className="form-control"
                                            value={this.state.senha} onChange={this.atualizarSenha} />
                                    </div>
                                    <div>
                                        <a className="btn btn-block btn-primary mb-2" onClick={this.loginUsuario}><span className="text-light">Login</span></a>
                                    </div>
                                    <div>
                                        <a className="btn btn-block btn-secondary mb-2" onClick={this.cadastrarUsuario}><span className="text-light">Cadastrar</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    <Navbar logado={this.state.logado} usuario={this.state.usuario} />
                    <h6 className="mt-3 ml-3">Você já está logado.</h6>
                </div>
            )
        }


    }
}

export default Login