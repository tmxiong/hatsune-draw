import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native'
import Header from '../../components/header'
import cfn from '../../public/utils/commonFun';
import { Loading, EasyLoading } from '../../components/loading'
import OptionModal from '../../components/optionModal'
import WebViewAndroid from '../../components/webViewAndroid'
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Watch from './watch';
import Gaopin from './gaopincai';
import Shuzi from './shuzicai';
import Jingji from './jingjicai';
import lottery from '../../public/config/lottery_kaijiang'
import urls from '../../public/config/urls'
import {connect} from 'react-redux';
import {getOpenCode} from '../../app/actions/kaijiang'
class three extends Component {

    constructor(props) {
        super(props);
        this.state={
            webViewOffset:50,
            data:[],


        }

    }

    componentDidMount() {
        //EasyLoading.show('加载数据...');
        getOpenCode(this.props.dispatch);
        //this.getData();
    }

    getData() {
        let codes = '';
        for(let i = 0,len = lottery.length; i <len; i++) {
            codes += lottery[i].code+'|';
        }
        let url = urls.getNewestLotteryCode(codes);
        fetch(url)
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((e)=>{});
    }

    setData(data) {
        data = data.showapi_res_body.result;

    }



    _javascriptToInject() {
        return `
       var a = document.getElementsByClassName('h_popup_mask')[0];
       if(a) {a.style.display = "none";}
       var h = 0;
       var b = document.getElementsByClassName('v-showSubTitle')[0];
       if(b){h = b.style.offsetHeight;}
        window.webView.postMessage(h);
       
      `
    }

    _onMessage(e) {
        this.setState({
            webViewOffset:cfn.px2dp(e.message),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },400)
    }

    _onNavigationStateChange(e) {
        let url = e.url;

        if(url.match(/kaijiang/) || url.match(/history/)) {
            this.refs._webView.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'kaijiang',{url:url,name:e.title})
            }
        }
    }

    _onPressOption(index,option,isSelected) {
        if(index == 666) {
            EasyLoading.show('加载数据...');
            this.refs._webView._webView.reload();
            return;
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*title={"开奖大厅"}*/}
                    {/*leftBtn={""}*/}
                    {/*leftType="text"*/}
                    {/*rightBtn={""}*/}
                    {/*rightType="text"*/}
                {/*/>*/}


                {/*<WebViewAndroid*/}
                    {/*ref='_webView'*/}
                    {/*injectedJavaScript={this._javascriptToInject()}*/}
                    {/*onNavigationStateChange={this._onNavigationStateChange.bind(this)}*/}
                    {/*navBarHeight={cfn.statusBarHeight()+56+50}*/}
                    {/*source={{uri:'https://m.aicai.com/kjgg/index.do?agentId=1&vt=5'}} // or use the source(object) attribute...*/}
                {/*/>*/}

                <View style={{height:30,backgroundColor:'#d22'}}/>
                <ScrollableTabView
                    locked={true}
                    tabBarBackgroundColor="#d22"
                    tabBarTextStyle={{color:'#fff'}}
                    tabBarUnderlineStyle={{backgroundColor:'#fff'}}
                >
                    <Watch tabLabel="关注" parentThis={this}/>
                    <Shuzi tabLabel="数字彩" parentThis={this}/>
                    <Gaopin tabLabel="高频彩" parentThis={this}/>
                    <Jingji tabLabel="竞技彩" parentThis={this}/>
                </ScrollableTabView>

            </View>
        )
    }

}
function setData(store) {
    return ({loadState: store.loadState})
}

export default connect()(three)
// export default three

const styles = StyleSheet.create({
    container: {
      flex:1,
        backgroundColor:'#fff'
    },
    webView: {
        zIndex:-1,
        flex:1
    },
});