import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import App from './components/App';
import reducer from './reducers/app';

const store = createStore(reducer);
const appElement = document.getElementById('root');

ReactDOM.render(
    <Provider store = {store}>
		<App />
    </Provider>,
    appElement
);

registerServiceWorker();
