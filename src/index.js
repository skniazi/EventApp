import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/util/ScrollToTop';

const rootEl = document.getElementById('root');

//Creating Store
const store = configureStore();

console.log(store.getState());

let render = () =>{
    //Add BrowserRouter and put App Compononent inside as child component
    //For Binding our redux Store with the App component we
    //will make use of Provider
    ReactDOM.render(<Provider store={store}><BrowserRouter><ScrollToTop><App /></ScrollToTop></BrowserRouter></Provider>, rootEl);
}

//For adding hot-module
//it really helps smoothens our development experience
//acts as hot-reloading concept
if(module.hot){
    module.hot.accept('./app/layout/App',() =>{
            setTimeout(render);
    })
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
