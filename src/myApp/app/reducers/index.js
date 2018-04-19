/**
 * Created by timxiong on 2018/3/2.
 */
import {combineReducers} from 'redux';

import kaijiang from './kaijiang';
// import home from './home';

const rootReducer = combineReducers({
    kaijiang,
});

export default rootReducer;
