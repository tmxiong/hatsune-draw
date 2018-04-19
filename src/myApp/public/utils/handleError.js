
/*
* 依赖包：
* 1."react-native-keyboard-spacer"
* 2."react-native-device-info"
* */
import {
    ToastAndroid,
} from 'react-native';
import {setJSExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';
// var DeviceInfo = require('react-native-device-info');
module.exports = function () {
    setJSExceptionHandler((e, isFatal)=>{
        if(isFatal) {
            // let deviceInfo = '';
            // // 手机品牌 e.g. "Apple / htc / Xiaomi"
            // deviceInfo += '手机品牌：' + DeviceInfo.getBrand() + '\n';
            // // 手机型号 e.g. "iPhone 6"
            // deviceInfo += '手机型号：' + DeviceInfo.getModel() + '\n';
            // //deviceInfo += DeviceInfo.getDeviceId() + '\n';
            // // 系统类型 e.g. "iPhone OS"
            // deviceInfo += '系统类型：' + DeviceInfo.getSystemName() + '\n';
            // // 系统版本 e.g. "9.0"
            // deviceInfo += '系统版本：' + DeviceInfo.getSystemVersion() + '\n';
            // // app版本 e.g. "1.1.0.89"
            // deviceInfo += 'app版本：' + DeviceInfo.getVersion() + '\n';

            // let methodName = 'AddPhoneErrorLog';
            // let listener = DeviceEventEmitter.addListener(methodName,(data,err)=>{
            //     listener.remove();
            //     // alert('发送成功'+data);
            // });
            // let params=[];
            // params[0] = Global.Owner;
            // params[1] = new Date().format('yyyy-MM-dd hh:mm:ss');
            // params[2] = DeviceInfo.getBrand();
            // params[3] = DeviceInfo.getModel();
            // params[4] = DeviceInfo.getSystemName();
            // params[5] = DeviceInfo.getSystemVersion();
            // params[6] = DeviceInfo.getVersion();
            // params[7] = JSON.stringify(e.message)+":\n"+JSON.stringify(e.stack);
            //
            // sendParams.sendTo(methodName, params);

            ToastAndroid.show('请稍后...',ToastAndroid.SHORT)
        }

    },true);
};