/**
 * Created by timxiong on 2018/3/15.
 */
import {fork} from 'redux-saga/effects';
import {doit} from './do';
export default function* sagas() {
    yield [
        fork(doit),
    ];
}