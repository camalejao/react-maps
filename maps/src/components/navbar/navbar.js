import React from 'react';

class Navbar extends React.Component {


    render() {
        if (!this.props.logado) {
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">React Map</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="btn collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/map">Mapa</a>
                            </li>
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Conta
                                </a>
                                <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/login">Login/Cadastro</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/logout">Sair</a>
                                </div>
                            </li>
                        </ul>

                    </div>
                </nav >
            )
        } else{
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">React Map</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="btn collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/map">Mapa</a>
                            </li>
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Conta
                                </a>
                                <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                    <p className="dropdown-item disabled">{this.props.usuario.email}</p>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/logout">Sair</a>
                                </div>
                            </li>
                        </ul>
    
                    </div>
                </nav >
            )
        }

    }
}

export default Navbar;