import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Rotas from './rotas';

ReactDOM.render(<Rotas />, document.getElementById('root'));
registerServiceWorker();
