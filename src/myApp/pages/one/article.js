import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    FlatList,
    Platform,
    StatusBar,
    ToastAndroid,

} from 'react-native';
import urls from '../../public/config/urls';
import config from '../../public/config/config'
import cfn from '../../public/utils/commonFun'
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import OptionModal from '../../components/optionModal'
import WebViewAndroid from '../../components/webViewAndroid'
import {save,remove,getAllDataForKey} from '../../public/utils/storage'
export default class newsDetail extends Component {

    constructor(props) {
        super(props);

        this.id = props.navigation.state.params.id;
        this.loadCount = 0;
        this.script = 'document.getElementById("author").textContent="' + config.sourceName + '";' +
            'document.getElementById("tuijian").style.display="none";' +
            'document.getElementsByClassName("share")[0].innerHTML="";';
        this.state = {
            isLoading:true,
            isError:false,
            visible:false,
            isCollected:false,
            url: urls.getArticleDetail(this.id)
        };


        // let statusBarHeight = Platform.OS == 'ios' ? cfn.picHeight(46) : StatusBar.currentHeight;
        // this.navBarHeight = Platform.OS == 'ios' ? cfn.picHeight(160) : cfn.picHeight(200);
        // this.navBarHeight = this.navBarHeight + statusBarHeight;
    }

    static defaultProps = {

    };

    componentDidMount() {
        //EasyLoading.show('加载数据...');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    // 加载完成 成功或失败
    _onLoadEnd() {
        setTimeout(()=>{
            EasyLoading.dismis();
        },300)
    }

    // 开始加载
    _onLoadStart() {
        this.loadCount = 0;
        this.setState({
            isLoading: true,
            isError:false
        })
    }

    // 加载错误
    _onError() {
        this.setState({
            isLoading:false,
            isError:true
        })
    }

    _onPressOption(index,option,isSelected) {
        if (index == 666) {
            EasyLoading.show('加载数据...');
            this.refs.webViewAndroid.refs.webViewAndroid.reload();
            return;
        }
    }



    onNavigationStateChange(e) {
        console.log(e);
        let url = e.url;
        if(url.match('detail')) {
            this.refs.webViewAndroid.refs.webViewAndroid.stopLoading();
            if(!e.loading) {
                cfn.goToPage(this,'articleDetail',{name:'彩市资讯',url:url,from:'article'})
            }
        }
    }

    _rightFun() {
        this._optionModal.setModalVisible(true);
    }

    _javascriptToInject() {
        return`window.webView.postMessage(0);`
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={'更多彩市资讯'}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={""}
                    rightType="text"
                />


                {/*<WebView*/}
                    {/*ref={(ref)=>this._webView = ref}*/}
                    {/*source={{uri: 'https://m.qmcai.com/hd/caipiaoclass/index.html'}}*/}
                    {/*//injectedJavaScript={this.script}*/}
                    {/*onLoadEnd={()=>this._onLoadEnd()}*/}
                    {/*onLoadStart={()=>this._onLoadStart()}*/}
                    {/*onError={()=>this._onError()}*/}
                    {/*scalesPageToFit={false}*/}
                    {/*onNavigationStateChange={this.onNavigationStateChange.bind(this)}//在WebView中注册该回调方法*/}
                {/*/>*/}
                <WebViewAndroid
                    ref="webViewAndroid"
                    source={{uri:'https://m.qmcai.com/hd/caipiaoclass/index.html'}}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    injectedJavaScript={this._javascriptToInject()}
                    navBarHeight={cfn.statusBarHeight()+56}
                    //style={{height:cfn.deviceHeight()-cfn.statusBarHeight()-56}}
                />

                <OptionModal
                    ref={ref=>this._optionModal = ref}
                    onPressOption={this._onPressOption.bind(this)}
                    //optionData={this.getOptionData()}
                />
                {/*<Loading topOffset={cfn.statusBarHeight()+56}/>*/}
            </View>)
    }

}
const styles = StyleSheet.create({
    container: {
        width: cfn.deviceWidth(),
        height: cfn.deviceHeight(),

    }
});