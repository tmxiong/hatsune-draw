/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    ScrollView,
    RefreshControl,
    Animated,
    Easing,
    TouchableOpacity,
    NetInfo,
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import SplashScreen from 'react-native-splash-screen'
import WebViewAndroid from 'react-native-webview-android'
export default class webViewAndroid extends Component {

    static defaultProps = {
        source:{uri:''},
        onNavigationStateChange: ()=>{},
        injectedJavaScript: '',
        style:{},
        onMessage: ()=>{},
        navBarHeight:0,

    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:true,
            fadeOutOpacity:new Animated.Value(1),
            zIndex:1,
            isError:false,
            source:null,
            topOffset:0,
        }

    }

    componentDidMount() {
        //SplashScreen.hide();
        this._checkNetInfo();
        // window.webView.postMessage(height1+height2);
        //this._webView.injectJavaScript("$(document).ready(function(){window.postMessage('hello')})");
    }

    componentWillUnmount() {
        this.timer1 && clearTimeout(this.timer1);
        this.timer2 && clearTimeout(this.timer2);
        this.timer3 && clearTimeout(this.timer3);

    }

    _injectedJavaScript() {

        //var height = document.getElementsByTagName("html")[0].offsetHeight;
        //window.postMessage(height)

        return (
            `
            for(var i = 0,e = document.getElementsByTagName("*"),len = e.length; i < len; i++) {e[i].style.webkitUserSelect="none"}
            window.addEventListener('contextmenu', function(e){  e.preventDefault();  }); 
            
            `
        );
    }

    _checkNetInfo() {
        var _this = this;
        NetInfo.fetch().done((netInfo)=>{
            //console.warn(netInfo)
            if(netInfo != 'NONE') { // 有网
                _this.timer1 = setTimeout(()=>{
                    this.setState({
                        source:{uri:this.props.source.uri}
                    })
                },400);
            } else {
                this._onError();
            }
        })
    }

    _onMessage(e) {
        let m = e.message; // m的类型： null、number、number|string
        //console.warn(m);
        if(m) {
            if(m.match(/|/)) {
                m = m.split('|')[0];
            }
           this.setState({topOffset:cfn.px2dp(Number(m))})
        }
        this._onLoad();
        this.props.onMessage(e);
    }

    // 加载成功
    _onLoad() {
        let _this = this;
        this.timer2 = setTimeout(()=>{

            if(this.state.isError) return;

            Animated.timing(
                this.state.fadeOutOpacity,
                {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,// 线性的渐变函数
                }
            ).start(()=>{
                this.setState({
                    isRefreshing:false,
                    isError:false
                });
                _this.timer3 = setTimeout(()=>{
                    this.setState({zIndex:-1})
                },400)
            })

        },2000)

    }

    _onError() {
        this.setState({
            isRefreshing:false,
            isError:true,
        })
    }

    _reload() {
        this.setState({
            isError:false,
            isRefreshing:true,
        });
        this._checkNetInfo();
        //this.refs.webViewAndroid.reload();
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={[styles.scrollView,{zIndex:this.state.zIndex}]}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            //onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    <Animated.View style={[styles.scrollViewContent,{opacity:this.state.fadeOutOpacity}]} >
                        {this.state.isError ?
                            <TouchableOpacity onPress={this._reload.bind(this)} activeOpacity={0.8}>
                                <Text style={{color:'#aaa',fontSize:16}}>加载失败，点击重试</Text>
                            </TouchableOpacity> :  <Text style={{color:'#aaa',fontSize:16}}>正在努力加载数据...</Text>}
                    </Animated.View>

                </ScrollView>

                <WebViewAndroid
                    ref='webViewAndroid'
                    style={{width:cfn.deviceWidth(),height:cfn.deviceHeight()-this.props.navBarHeight+this.state.topOffset,
                        backgroundColor:'#fff',marginTop:-this.state.topOffset,...this.props.style}}
                    source={this.state.source}
                    scalesPageToFit={false}
                    injectedJavaScript={this._injectedJavaScript() + this.props.injectedJavaScript}
                    onNavigationStateChange={this.props.onNavigationStateChange}
                    onMessage={this._onMessage.bind(this)}

                    //onLoadStart={()=>{}} // 开始加载调用
                    //onLoad={this._onLoad.bind(this)} // 加载成功调用
                    //onLoadEnd={()=>{}} // 加载成功失败都调用
                    //onError={this._onError.bind(this)} // 加载失败调用

                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    scrollView: {
        position:'absolute',
        zIndex:1,
        top:0,
        flex:1
    },
    scrollViewContent: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight()-70,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    }
});
