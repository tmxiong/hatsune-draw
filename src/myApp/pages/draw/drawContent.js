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
import config from '../../public/config/config'
import imgs from '../../public/config/images'
import {Card} from 'native-base'
const drawWidth = cfn.deviceWidth()/3 * 2;
export default class index extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);


        this.state = {
            isLogin:global.userData,
            version: `版本更新`,
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

                <View style={{height: 210,width:drawWidth,  alignItems:'center'}}>
                    <View style={{width:drawWidth,backgroundColor:config.baseColor,height:125}}/>

                    <View style={{position:'absolute',top:80,zIndex:0}}>
                        <Card style={{width:drawWidth - 20,height:120, borderRadius:10,backgroundColor:'#fff',alignItems:'center'}}>

                            <Text style={styles.userName}>{this.state.isLogin ? global.userData.username : '登录/注册'}</Text>
                            <Text style={styles.userDesc}>{this.getLoginDesc(this.state.isLogin)}</Text>

                        </Card>
                    </View>

                    <Card style={[styles.userImg,{marginTop: cfn.picWidth(60), position:'absolute'}]}>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=>cfn.goToPage(this,this.state.isLogin ? 'userInfo':'loginAndRegist',
                                              {updateToLogin: this.updateToLogin.bind(this),goBack:cfn.goBack(this),updateToNoLogin:this.updateToNoLogin.bind(this)})}>
                            <Image style={styles.userImg} source={this.state.isLogin ? imgs.defaultIcon : imgs.noLoginIcon}/>
                        </TouchableOpacity>
                    </Card>

                </View>

                <ScrollView>
                    <View style={{height:cfn.picHeight(30)}}/>
                    <Card style={{width:drawWidth-20,height:120,alignSelf:'center',borderRadius:10}}>
                        <View style={{width:drawWidth-20,height:40,alignItems:'center',justifyContent:'center',backgroundColor:'#FF5D3B',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                            <Text style={{fontSize:16,color:'#fff'}}>看开奖</Text>
                        </View>
                        <View style={{width:drawWidth-20,height:80,flexWrap:'wrap',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>cfn.goToPage(this,'three')} activeOpacity={0.8} style={styles.menuCell}>
                                <Text>我的关注</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>cfn.goToPage(this, 'three', {initialPage:2})} activeOpacity={0.8} style={styles.menuCell}>
                                <Text>高频彩</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>cfn.goToPage(this, 'three', {initialPage:1})} activeOpacity={0.8} style={styles.menuCell}>
                                <Text>数字彩</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>cfn.goToPage(this, 'three', {initialPage:3})} activeOpacity={0.8} style={styles.menuCell}>
                                <Text>竞技彩</Text>
                            </TouchableOpacity>
                        </View>

                    </Card>

                    <Card style={{width:drawWidth-20,height:160,alignSelf:'center',borderRadius:10,marginTop:20}}>
                        <View style={{width:drawWidth-20,height:40,alignItems:'center',justifyContent:'center',backgroundColor:'#37a46f',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                            <Text style={{fontSize:16,color:'#fff'}}>看走势</Text>
                        </View>
                        <View style={{width:drawWidth-20,height:120,flexWrap:'wrap',flexDirection:'row'}}>
                            <View style={styles.menuCell}><Text>关注</Text></View>
                            <View style={styles.menuCell}><Text>关注</Text></View>
                            <View style={styles.menuCell}><Text>关注</Text></View>
                            <View style={styles.menuCell}><Text>关注</Text></View>
                            <View style={styles.menuCell}><Text>关注</Text></View>
                            <View style={styles.menuCell}><Text>关注</Text></View>
                        </View>

                    </Card>



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
                        <Text style={styles.itemText}>{this.state.version}</Text>

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
        width:drawWidth,
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
        fontSize:cfn.picWidth(140),
        color:'#eee',

    },
    userImg: {
        width:cfn.picWidth(140),
        height:cfn.picWidth(140),
        borderRadius:cfn.picWidth(70),
    },
    userContent: {
        width:drawWidth,
        alignItems:'center'
    },
    userName: {
        fontSize:16,
        color:'#888',
        marginTop:40
    },
    userDesc: {
        color:'#aaa',
        marginTop:cfn.picHeight(20),
        fontSize:12

    },
    forward: {
        fontSize: 30,
        color:'#ddd',
    },
    itemBody: {
        width:drawWidth,
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
    menuCell: {
        width:(drawWidth-20)/2,alignItems:'center',justifyContent:'center',height:40,borderWidth:1,borderColor:'transparent',borderBottomColor:'#eee',borderRightColor:'#eee'
    }
});