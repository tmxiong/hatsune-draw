import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ToastAndroid,
    Alert
} from 'react-native';
import Header from '../../components/header'
import {Icon} from 'native-base'
import cfn from '../../public/utils/commonFun'
import global from '../../public/global/global'
import {load} from '../../public/utils/storage'
import dateBase from '../../public/utils/dateBase'
import {defaultIcon} from '../../public/config/images'
import {getUserDataBySessionToken} from '../../public/utils/storage'
export default class index extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);


        this.state = {
            isLogin:global.userData,
            version: `检查更新`,
        };
    }

    componentDidMount() {

        if(!global.userData) {
            this.getUserData();
        }

    }

    async autoLogin() {
        try{
            let data = await load('userData','sessionToken');
            global.sessionToken = data;
            getUserDataBySessionToken(data,(user)=>{
                // 更新信息
                global.loginedUserData = user;
                global.userData = user.attributes;
            })
        }catch(e){}

    }

    async getUserData() {
        try{
            let data = await load('userData','userData');
            this.onSuccess(data)
        }catch (e){}

    }

    onSuccess(data) {
        // 如果之前登录了，每次打开都自动登录获取最新数据
        this.autoLogin();
        global.userData = data;
        this.setState({isLogin:true});
        //console.log(data)
    }

    onFailure(err) {

    }

    getLoginDesc(isLogin) {
        return isLogin ? `${dateBase.cn_time()}欢迎亲爱的${global.userData.username}回来！` : `${dateBase.cn_time()}游客！登录更精彩～`
    }


    updateToNoLogin() {
        this.setState({
            isLogin:false,
        });
        ToastAndroid.show('注销成功！',ToastAndroid.SHORT);
    }

    updateToLogin() {
        this.setState({
            isLogin:true,
        });
        ToastAndroid.show('登录成功！',ToastAndroid.SHORT);
    }

    _checkUpdate() {

        this.setState({
            version:'正在检查更新...'
        },()=>{
            fetch('https://www.github.com')
                .then(()=>{
                    this.setState({
                        version:'已经是最新版本！'
                    })
                })
                .catch(()=>{
                    this.setState({
                        version:'连网失败，请稍后重试！'
                    })
                })
        });

    }

    _clearCache() {
        Alert.alert('提示：','是否清除缓存？',[
            {text:'取消',onPress:()=>{}},
            {text:'清除',onPress:()=>{
                setTimeout(()=>{
                    ToastAndroid.show('已成功清除所有缓存！',ToastAndroid.SHORT)
                },1000);
                ToastAndroid.show('正在清除缓存...',ToastAndroid.SHORT)
            }}
        ])
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*title={"我的"}*/}
                    {/*leftBtn={""}*/}
                    {/*leftType="text"*/}
                    {/*leftFun={()=>{}}*/}
                    {/*rightBtn={""}*/}
                    {/*rightType="text"*/}
                    {/*rightFun={()=>{}}*/}
                {/*/>*/}
                <TouchableOpacity
                    onPress={()=>cfn.goToPage(this,this.state.isLogin ? 'userInfo':'loginAndRegist',
                        {name:'登录',updateToLogin:this.updateToLogin.bind(this),updateToNoLogin:this.updateToNoLogin.bind(this)})}
                    activeOpacity={1} style={[styles.itemHeader,{backgroundColor:'#d22'}]}>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <View style={styles.userIconContainer}>
                            {this.state.isLogin ?
                                <Image style={styles.userImg} source={defaultIcon}/> :
                                <Icon style={styles.userIcon} name={'ios-contact-outline'}/>}
                        </View>

                        <View style={styles.userContent}>
                            <Text style={styles.userName}>{this.state.isLogin ? global.userData.username : '登录/注册'}</Text>
                            <Text style={styles.userDesc}>{this.getLoginDesc(this.state.isLogin)}</Text>
                        </View>
                        <Icon style={styles.forward} name="ios-arrow-forward"/>
                    </View>
                </TouchableOpacity>

                <ScrollView>
                    <View style={{height:cfn.picHeight(30)}}/>
                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                                      {/*onPress={()=>cfn.goToPage(this,'myArticle',*/}
                                          {/*{name:'我收藏的文章',key:'collectedArticle'})} style={styles.itemBody}>*/}
                        {/*<Icon style={styles.itemIcon} name="md-bookmark"/>*/}
                        {/*<Text style={styles.itemText}>我收藏的文章</Text>*/}
                        {/*<View style={styles.itemForwardContainer}>*/}
                            {/*<Icon style={styles.itemForward} name="ios-arrow-forward"/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                                      {/*onPress={()=>cfn.goToPage(this,'myArticle',*/}
                                          {/*{name:'我喜欢的文章',key:'lovedArticle'})} style={styles.itemBody}>*/}
                        {/*<Icon style={styles.itemIcon} name="md-heart"/>*/}
                        {/*<Text style={styles.itemText}>我喜欢的文章</Text>*/}
                        {/*<View style={styles.itemForwardContainer}>*/}
                            {/*<Icon style={styles.itemForward} name="ios-arrow-forward"/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                                      {/*onPress={()=>cfn.goToPage(this,'myArticle', // read 的过去也是 read 666*/}
                                          {/*{name:'阅读过的文章',key:'readArticle'})} style={styles.itemBody}>*/}
                        {/*<Icon style={styles.itemIcon} name="ios-time"/>*/}
                        {/*<Text style={styles.itemText}>阅读过的文章</Text>*/}
                        {/*<View style={styles.itemForwardContainer}>*/}
                            {/*<Icon style={styles.itemForward} name="ios-arrow-forward"/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<View style={{height:cfn.picHeight(30)}}/>*/}
                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                                      {/*onPress={()=>cfn.goToPage(this,'myLottery',*/}
                                          {/*{name:'我收藏的彩种',key:'collectedLottery'})} style={styles.itemBody}>*/}
                        {/*<Icon style={styles.itemIcon} name="md-bookmark"/>*/}
                        {/*<Text style={styles.itemText}>我收藏的彩种</Text>*/}
                        {/*<View style={styles.itemForwardContainer}>*/}
                            {/*<Icon style={styles.itemForward} name="ios-arrow-forward"/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                                      {/*onPress={()=>cfn.goToPage(this,'myLottery', {name:'我喜欢的彩种',key:'lovedLottery'})}*/}
                                      {/*style={styles.itemBody}>*/}
                        {/*<Icon style={styles.itemIcon} name="md-heart"/>*/}
                        {/*<Text style={styles.itemText}>我喜欢的彩种</Text>*/}
                        {/*<View style={styles.itemForwardContainer}>*/}
                            {/*<Icon style={styles.itemForward} name="ios-arrow-forward"/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity activeOpacity={0.8}*/}
                                      {/*onPress={()=>cfn.goToPage(this,'welcome')} style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>*/}
                        {/*<Icon style={styles.itemIcon} name="md-list-box"/>*/}
                        {/*<Text style={styles.itemText}>应用介绍</Text>*/}
                        {/*<View style={styles.itemForwardContainer}>*/}
                            {/*<Icon style={styles.itemForward} name="ios-arrow-forward"/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={()=>this._clearCache()} style={[styles.itemBody]}>
                        <Icon style={styles.itemIcon} name="ios-folder"/>
                        <Text style={styles.itemText}>清除缓存</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={()=>this._checkUpdate()}
                                      style={[styles.itemBody,{marginTop:cfn.picHeight(30)}]}>
                        <Icon style={styles.itemIcon} name="md-download"/>
                        <Text style={styles.itemText}>版本更新</Text>

                        <View style={styles.itemForwardContainer}>
                            <Text>{this.state.version}</Text>
                        </View>
                    </TouchableOpacity>



                </ScrollView>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemHeader: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(350),
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'flex-end',
        paddingBottom:cfn.picHeight(50)
    },
    userIconContainer: {
        width:cfn.picWidth(120),
        height:cfn.picWidth(120),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:cfn.picWidth(75),
        marginRight:cfn.picWidth(20),
        marginLeft:cfn.picWidth(20),
    },
    userIcon: {
        fontSize:cfn.picWidth(120),
        color:'#ccc',

    },
    userImg: {
        width:cfn.picWidth(120),
        height:cfn.picWidth(120),
        borderRadius:cfn.picWidth(75),
    },
    userContent: {
        width:cfn.deviceWidth()-cfn.picWidth(120 + 20 + 20 + 60)
    },
    userName: {
        fontSize:18,
        color:'#fff'
    },
    userDesc: {
        color:'#ddd',
        marginTop:cfn.picHeight(10),
        width:cfn.deviceWidth()-cfn.picWidth(120 + 20 + 20 + 60)
    },
    forward: {
        fontSize: 30,
        color:'#ddd',
    },
    itemBody: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        backgroundColor:'#fff',
        //marginTop:cfn.picHeight(20),
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
    },
    itemIcon: {
        fontSize:25,
        marginLeft:cfn.picWidth(30),
        marginRight:cfn.picWidth(30),
        width:25,
        textAlign:'center'

    },
    itemText: {

    },
    itemForwardContainer: {
        position:'absolute',
        height:cfn.picHeight(100),
        justifyContent:'center',
        right:cfn.picWidth(30)
    },
});