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
    TouchableOpacity
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import SplashScreen from 'react-native-splash-screen'
export default class App extends Component {

    static defaultProps = {
        source:{uri:''},
        onNavigationStateChange: ()=>{},
        injectedJavaScript: '',
        style:{},

    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:true,
            fadeOutOpacity:new Animated.Value(1),
            zIndex:1,
            isError:false,
            source:null,
        }
        this.webView = this._webView;
    }

    componentDidMount() {
        this.timer1 = setTimeout(()=>{
            this.setState({
                source:{uri:this.props.source.uri}
            })
        },400)
        //SplashScreen.hide();
        //this._webView.injectJavaScript("$(document).ready(function(){window.postMessage('hello')})");
    }

    componentWillUnmount() {
        if(this.timer1) clearTimeout(this.timer1);
        if(this.timer2) clearTimeout(this.timer2);
        if(this.timer3) clearTimeout(this.timer3);
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

    _onNavigationStateChange(e) {

    }

    _onMessage(e) {

    }

    // 加载成功
    _onLoad() {
        let _this = this;
        this.timer2 = setTimeout(()=>{

            if(this.state.isError) return;
            //this.state.fadeOutOpacity.setValue(0)

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
        this._webView.reload();
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

                <WebView
                    ref={ref=>this._webView = ref}
                    style={{width:cfn.deviceWidth(),height:cfn.deviceHeight(),backgroundColor:'#fff',...this.props.style}}
                    source={this.state.source}
                    scalesPageToFit={false}
                    startInLoadingState={false}
                    injectedJavaScript={this._injectedJavaScript() + this.props.injectedJavaScript}
                    onNavigationStateChange={this.props.onNavigationStateChange}
                    //onMessage={this._onMessage.bind(this)}

                    onLoadStart={()=>{}} // 开始加载调用
                    onLoad={this._onLoad.bind(this)} // 加载成功调用
                    onLoadEnd={()=>{}} // 加载成功失败都调用
                    onError={this._onError.bind(this)} // 加载失败调用

                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
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
        height:cfn.deviceHeight(),
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
