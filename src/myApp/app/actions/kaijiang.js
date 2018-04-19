/**
 * Created by tmxiong on 2018/4/15.
 */
import * as actions from '../actionTypes/kaijiang';
import lottery from '../../public/config/lottery_kaijiang';
import urls from '../../public/config/urls';
import {save, getAllDataForKey,remove} from '../../public/utils/storage'

export function getOpenCode(dispatch) {

    dispatch({type: actions.GET_OPEN_CODE});

    let codes = '';
    for(let i = 0,len = lottery.length; i <len; i++) {
        codes += lottery[i].code+'|';
    }
    let url = urls.getNewestLotteryCode(codes);
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            data = data.showapi_res_body.result;
            for(let i = 0,len = data.length; i < len; i++) {
                for(let j = 0,len_1 = lottery.length; j < len_1; j++) {
                    if(data[i].code == lottery[j].code) {
                        data[i].help = lottery[j].help;
                        break;
                    }
                }
            }
            dispatch({type: actions.SET_OPEN_CODE, data: data});
            //dispatch({type: GET_ERROR})
        })
        .catch((e)=>{
            dispatch({type: actions.GET_ERROR})
        });

}

export async function getWatch(dispatch) {

    let data = await getAllDataForKey('watch');

    dispatch({type: actions.SET_WATCH, data: data});

}
