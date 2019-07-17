import { createStore } from "redux";
import {devToolsEnhancer} from 'redux-devtools-extension';
import rootReducer from "../reducers/rootReducer";

//Configuration of the Store
export const configureStore = () => {
        //creates a store
        const store = createStore (rootReducer, devToolsEnhancer());

        return store;
}