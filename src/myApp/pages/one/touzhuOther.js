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
// import WebViewAndroid from 'react-native-webview-android';
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import OptionModal from '../../components/optionModal'
import WebViewRN from '../../components/webViewRN';
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:50,
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {

    }


    _javascriptToInject() {
        let className = '';

        if(this.params.url.match(/cqssc\/help/)) {
            className = 'fBack';
        }else if(this.params.url.match(/help/)) {
            className = 'back_tz';
        }else if(this.params.url.match(/history/)) {
            className = 'history-btn';
        }

        return`
            if(document.getElementsByClassName("v-hideSubTitle")[0]){document.getElementsByClassName("v-hideSubTitle")[0].style.display="block"}
            
            if(document.getElementsByClassName("v-header")[0]){
            document.getElementsByClassName("v-header")[0].style.display = "none";
            
            }else if(document.getElementsByClassName("head")[0]){
            document.getElementsByClassName("head")[0].style.display = "none";
           
            }else if(document.getElementsByClassName("h_topbar")[0]){
            document.getElementsByClassName("h_topbar")[0].style.display = "none";
            }
            
            document.getElementsByClassName("btn_box")[0].style.display = "none";
            document.getElementsByClassName("f_btn_box")[0].style.display = "none";
            document.getElementsByClassName("v-showSubTitle")[0].style.display = "none";
           
            if(document.getElementsByClassName("h_popup_mask")[0]) {document.getElementsByClassName("h_popup_mask")[0].style.display = "none";}
            if(document.getElementsByClassName("service")[0]) {document.getElementsByClassName("service")[0].style.display = "none";}
            if(document.getElementsByClassName("${className}")[0]){document.getElementsByClassName("${className}")[0].style.display = "none";}
            
        `;
    }

    _onNavigationStateChange(e) {
        let url = e.url;
        console.log(e);
        if(url.match(/articleDetail.do/) || url.match(/article.do/)) {
            this._webView._webView.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'articleDetail',{name: e.title,url:url,from:'touzhuOther'})
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
                    rightType={"text"}
                />

                {/*<WebViewAndroid*/}
                    {/*ref="webViewAndroid"*/}
                    {/*javaScriptEnabled={true}*/}
                    {/*geolocationEnabled={false}*/}
                    {/*builtInZoomControls={false}*/}
                    {/*injectedJavaScript={this._javascriptToInject()}*/}
                    {/*onNavigationStateChange={this._onNavigationStateChange.bind(this)}*/}
                    {/*onMessage={this._onMessage.bind(this)}*/}
                    {/*source={{uri:this.params.url}} // or use the source(object) attribute...*/}
                    {/*style={[styles.webView,{marginTop:-this.state.webViewOffset}]} />*/}

                <WebViewRN
                    ref='_webView'
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    injectedJavaScript={this._javascriptToInject()}
                    source={{uri:this.params.url}}
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