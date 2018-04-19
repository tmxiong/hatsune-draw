// 从投注页跳过来的

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    WebView,
    Alert,
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import Header from '../../components/header'
import WebViewAndroid from '../../components/webViewAndroid'
import config from '../../public/config/config';
import urls from '../../public/config/urls'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:50,
        };
        this.params = props.navigation.state.params;
        this.injectedJavaScript = this._javascriptToInject();

    }

    componentDidMount() {

    }


    _javascriptToInject() {
        const{help} = this.params;
        //console.warn(help)
       if(help.match('https')) { // 新浪的
            return`
            var h = document.getElementsByClassName("v-header")[0];
            var height = 0;
            if(h){height = h.offsetHeight};
            window.webView.postMessage(height);
        `
        } else { // 网易的
            return `
            document.getElementsByTagName("html")[0].style.background="#fff";
            var ele = document.getElementsByClassName("dlTit");
            var fistChild = ele[ele.length-1].children[0];
            var secondChild = ele[ele.length-1].children[1];
            if(fistChild.innerText == "如何领奖：") {
            fistChild.innerText = "温馨提示：";
            secondChild.innerText = "${config.appName}祝您中大奖！"
            };
            window.webView.postMessage(0);
        `
        }

    }

    _onMessage(e) {
        console.log(e);
        this.setState({
            webViewOffset:cfn.px2dp(e.message),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },400)
    }

    _onNavigationStateChange(e) {
        let url = e.url;
        console.log(e);
        if(url.match(/help/)) {
            this.refs._webView._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'touzhuOther',{name: e.title,url:url})
            }
        } else if(url.match(/detailAll/)) {
            this.refs._webView._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'kaijiangDetail',{name: e.title,url:url})
            }
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={""}
                    rightType={'text'}
                />

                <WebViewAndroid
                    ref="webViewAndroid"
                    source={{uri:urls.getHelp(this.params.help)}}
                    //onMessage={this._onMessage.bind(this)}
                    injectedJavaScript={this.injectedJavaScript}
                    navBarHeight={cfn.statusBarHeight()+56}
                    //style={{height:cfn.deviceHeight()-cfn.statusBarHeight()-56}}
                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webView: {
        zIndex:-1,
        flex:1
    },
});