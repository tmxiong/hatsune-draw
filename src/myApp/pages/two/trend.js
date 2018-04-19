import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert,
    NetInfo
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import WebViewAndroid from '../../components/webViewAndroid';
import global from '../../public/global/global';
import OptionModal from '../../components/optionModal'
import WebViewRN from '../../components/webViewRN'
export default class trend extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:116
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {
        //EasyLoading.show('加载数据...');
    }

    _javascriptToInject() {
        // 去除大乐透 双色球 福彩3D的 我要选号按钮 select_btn
        //document.getElementsByClassName("header")[0].style.display='none'
        return `
          var a = document.getElementsByClassName("select_btn")[0];
         if(a){a.style.display='none'}
         var height1 = document.getElementsByClassName("nav")[0].offsetHeight;
         var height2 = document.getElementsByClassName("header")[0].offsetHeight;
         window.webView.postMessage(height1+height2);
      `
    }

    _onMessage(e) {

        var dp = cfn.px2dp(e.message);
        this.setState({
            webViewOffset: dp,
        },()=>{
            setTimeout(()=>{
                EasyLoading.dismis();
            },300)
        });
    }

    _onNavigationStateChange(e) {
        let url = e.url;
        //console.log(e);
        // if(url.match(/zst/)) {
        //     this._webView.stopLoading();
        //     if(!e.loading) {
        //         cfn.goToPage(this,'articleDetail',{name: e.title,url:url})
        //     }
        // }
    }

    _onPressOption(index,option,isSelected) {
        if(index == 666) {
            EasyLoading.show('加载数据...');
            this.refs.webViewAndroid.reload();
            return;
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
                    source={{uri:this.params.url}}
                    //onMessage={this._onMessage.bind(this)}
                    injectedJavaScript={this._javascriptToInject()}
                    navBarHeight={cfn.statusBarHeight()+56}
                    //style={{height:cfn.deviceHeight()-cfn.statusBarHeight()-56}}
                />
                {/*<OptionModal*/}
                    {/*ref={ref=>this._optionModal = ref}*/}
                    {/*onPressOption={this._onPressOption.bind(this)}*/}
                    {/*//optionData={this.getOptionData()}*/}
                {/*/>*/}
                {/*<Loading topOffset={cfn.statusBarHeight()+56}/>*/}
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