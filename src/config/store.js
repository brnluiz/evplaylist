import {createStore} from 'redux';
import reducers from 'config/reducers';

const store = createStore(reducers);
export default store;
