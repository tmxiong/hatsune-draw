/**
 * Created by xiongtm on 2017/9/13.
 */
/**
 * Created by xiongtm on 2017/9/7.
 */



//  {"appid":"99025601","appname":"990895247","isshowwap":"1","wapurl":"https://www.256.com/","status":1,"desc":"\u6210\u529f\u8fd4\u56de\u6570\u636e"}
// 1 显示
// 2 不显示
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    StatusBar,
    Platform,
    ActivityIndicator

} from 'react-native';

// import JPushModule from 'jpush-react-native';


import {NavigationActions} from 'react-navigation'
import cfn from '../../public/utils/commonFun'
// import Storage from 'react-native-storage';
import Global from '../../public/global/global';
import fetchp from '../../public/utils/fetch-polyfill';
import config from '../../public/config/config';
import {load} from '../../public/utils/storage'
import SplashScreen from 'react-native-splash-screen';

export default class loadingModal extends Component {
    static navigationOptions = {header: null};

    static defaultProps={

    };

    constructor(props) {
        super(props);
        // 是否显示欢迎页；
        Global.showWelcome = true;
    }

    componentDidMount() {

        // this.initPage();
        //
        // this.initStorage();
        //
        SplashScreen.hide();
        this.getLocalData();

    }

    initPage() {
        if(Platform.OS == 'ios') {
            JPushModule.setBadge(0, (badgeNumber) => {
                // console.log(badgeNumber);
            });
        } else {
            setTimeout(()=>{
                //SplashScreen.hide();//关闭启动屏幕
            },1000);
        }
    }

    // 判断是否显示欢迎页
    async getLocalData() {
        //this.startTime = new Date().getTime();
        try{
            Global.showWelcome = await load('welcome','welcome');
            if(Global.showWelcome) {
                this.goToPage('main');
            }else {
                this.goToPage('main');
            }
        }catch(e) {
            this.goToPage('main')
        }
        // Global.storage.getAllDataForKey('welcome')
        //     .then((data)=>this.setLocalData(data))
        //     .catch((error)=>this.setError(error))
    }

    setLocalData(data) {
        this.showWelcome = data.length == 0;

        // 检查页面跳转到哪；
        this.getUrlData();
    }

    getUrlData() {
        fetchp(config.jumpUrl,{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=> this.setUrlData(data))
            .catch((error)=>this.setError(error));
    }

    setUrlData(jsonData) {

        if(jsonData.isshowwap == '1') {
            // 要显示webView
            this.goToPage('CPWebView',{url:jsonData.wapurl});
        }else {
            // 不显示webView
            if(this.showWelcome) {
                this.goToPage('main')
            } else {
                this.goToPage('Main')
            }
        }
    }

    setError(err) {
        this.goToPage('Main')
    }

    goToPage(route,params) {
        //this.endTime = new Date().getTime();
        //let subTime = this.endTime - this.startTime;
        setTimeout(()=>{
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: route, params: params})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        },2000)
    }

    render() {

        return (
            <View style={{flex:1}}>
                <StatusBar translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <Image style={styles.img} source={{uri:'launch_screen'}}/>
                <View style={styles.indicator}>
                    <ActivityIndicator
                        animating={true}
                        color="#eee"
                        size="large"
                    />
                    <Text style={{color:'#ddd',marginTop:20}}>正在加载数据...</Text>
                </View>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent:'center'
    },
    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'stretch'
    },
    indicator: {
        height: cfn.picHeight(100),
        width:cfn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:cfn.deviceWidth()/2
    }
});