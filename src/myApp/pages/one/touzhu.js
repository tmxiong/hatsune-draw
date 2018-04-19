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
    ToastAndroid
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import WebViewRN from '../../components/webViewRN';
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import OptionModal from '../../components/optionModal'
import {save,remove,getAllDataForKey} from '../../public/utils/storage'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:50,
            isCollected:false,
            isLoved:false,
        };
        this.params = props.navigation.state.params;
        this.isCollected = this.isLoved = false;
    }

    componentDidMount() {


        console.log(this.refs)
        this.getIsCollectedOrLoved(this.params.data.code);
        //this.getIsCollectedOrLoved('lovedLottery',this.params.data.code);
    }

    getOptionData() {
        return [{
            icon:'md-star',
            option:'收藏',
            isSelected:this.isCollected
        },{
            icon:'ios-heart',
            option:'喜欢',
            isSelected:this.isLoved
        }]
    }

    _onLoadEnd() {

    }

    _javascriptToInject() {
        // let className = 'v-header';
        // const {name} = this.params;
        // if(name == '幸运赛车') {
        //     className = 'racing-header';
        // } else if (name == '任选九场' || name == '胜负彩') {
        //     className = 'p_header';
        // }


        return `
          
          if(document.getElementsByClassName("v-showSubTitle")[0]){
            document.getElementsByClassName("v-showSubTitle")[0].style.display='none';
          } else if(document.getElementsByClassName("racing-header")[0]) {
            document.getElementsByClassName("racing-header")[0].style.display='none';
          } else if(document.getElementsByClassName("p_header")[0]) {
            document.getElementsByClassName("p_header")[0].style.display='none';
          }
          
        `
    }

    _onMessage(e) {
        this.setState({
            webViewOffset:cfn.px2dp(e.message),
        });

        setTimeout(()=>{
            EasyLoading.dismis();
        },300)
    }

    _onNavigationStateChange(e) {
        //console.log(e);
        let url = e.url;
        //  我到投注 拦截
        if(url.match(/planQuery/) || url.match(/login/)) {
            this.refs._webView._webView.stopLoading();
            if(!e.loading) {
                Alert.alert('温馨提示：',
                    '应有关部门要求，当前所有彩种均停止销售，开奖历史和技巧资讯可正常查看，已售出彩票兑奖不受影响。您可以到附近实体店进行购彩，给您带来不便敬请谅解！',
                    [
                        {text: '表示理解', onPress: ()=> {}}
                    ])
            }

        }else if( url.match(/history/)  //开奖记录
            || url.match(/help/) //玩法介绍
            || url.match(/playHelp/) //玩法介绍  快乐扑克3
            || url.match(/zst/)  //走势图
            || url.match(/openCountDownIndex/)
            || url.match(/winTop/) //竞技彩的 中奖排行
            || url.match(/articles/) //竞技彩的 资讯
        ){
            this.refs._webView._webView.stopLoading();
            if(!e.loading && this.params.fromMenu) {
                let title = e.title;
                if(title.match(/aicai/) || title=='' || !title) {
                    title = "介绍";
                }

                cfn.goToPage(this,'touzhuOther',
                    {url:url,name:title,
                        fromTouzhu:true});
            }

        }
    }

    _onPressOption(index,option,isSelected) {
        if(index == 666) {
            EasyLoading.show('加载数据...');
            this._webViewAndroid.reload();
            return;
        }


        let key = null;
        let data = this.params.data;

        if(index == 0) { //收藏
            key = 'collectedLottery';
        } else if(index == 1) { //喜欢
            key = 'lovedLottery'
        }

        if(isSelected) {
            save(key,data.code,data);
        }else {
            remove(key,data.code)
        }

        this.showToast(key,isSelected);

    }

    showToast(key,isSelected) {
        let type =  key == 'collectedLottery' ? '收藏' : '喜欢';
        let toast =  isSelected ? `已成功添加到${type}列表` : `已成功从${type}列表中删除`;
        ToastAndroid.show(toast, ToastAndroid.SHORT);
    }

    // 查看此彩种是否在收藏或喜欢列表中
    async getIsCollectedOrLoved(code) {

        let data = await getAllDataForKey('collectedLottery');
        for(let i = 0; i < data.length; i++) {
            if(data[i].code == code) {
                this.isCollected = true;
                break;
            }
        }

        data = await getAllDataForKey('lovedLottery');
        for(let i = 0; i < data.length; i++) {
            if(data[i].code == code) {
                this.isLoved = true;
                break;
            }
        }

        if(this.isLoved || this.isCollected) {
            this._optionModal.renderOption(this.getOptionData());
        }
       // console.log(data);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={"ios-menu"}
                    rightFun={()=>this._optionModal.setModalVisible(true)}
                />
                <WebViewRN
                    ref='_webView'
                    injectedJavaScript={this._javascriptToInject()}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    source={{uri:this.params.url}} // or use the source(object) attribute...
                />


                <OptionModal
                    ref={ref=>this._optionModal = ref}
                    onPressOption={this._onPressOption.bind(this)}
                    optionData={this.getOptionData()}
                />
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