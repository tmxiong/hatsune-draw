import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import { Container, Spinner, Button, InputGroup, Input, Icon } from 'native-base';
import global from '../../public/global/global'
import inputUtils from '../../public/utils/inputUtils'
import {save} from '../../public/utils/storage'
import config from '../../public/config/config'
export default class login extends PureComponent {

    static defaultProps = {
        goToRegist:()=>{},
        goBack:()=>{},
        showLoading:()=>{},
        dismisLoading:()=>{}
    };

    constructor(props) {
        super(props);
        //this.params = props.navigation.state.params;
        this.state = {
            name:'登录',
            errorMsg:null,
        };

        this.userName = '';
        this.psd = '';
    }

    componentDidMount() {
        //this.getUserData();
    }

    setUserData(data) {
        // 保存用户名，用于展示
        global.userData = data.attributes;
        save('userData','userData',data);

        // 保存SessionToken 用于下次登录
        global.sessionToken = data._sessionToken;
        save('userData','sessionToken',data._sessionToken);

        global.loginedUserData = data;
    }

    _login() {
        let user = new global.AV.User();
        user.setUsername(this.userName);
        user.setPassword(this.psd);
        user.logIn()
            .then(this._loginSuccess.bind(this))
            .catch(this._loginFailure.bind(this))
    }

    // 登录成功！！
    _loginSuccess(data) {
        this.props.dismisLoading();
        this.setUserData(data);
        this.props.updateToLogin();
        this.props.goBack();
        console.log(data);
    }

    // 登录失败！！
    _loginFailure(err) {
        this.props.dismisLoading();
        this.setState({errorMsg:err.rawMessage})
    }

    _onChangeText(e,type) {
        if(type == 'userName') {
            this.userName = e;
        }else if(type == 'psd') {
            this.psd = e;
        }
    }

    _submit() {
        let desc = null;

        desc = inputUtils._checkUserName(this.userName.trim());
        if(!desc[0]) {
            return this.setState({errorMsg:[desc[1]]})
        }

        desc = inputUtils._checkPsd(this.psd,this.psd);
        if(!desc[0]) {
            return this.setState({errorMsg:[desc[1]]})
        }

        this.props.showLoading();

        this._login();

    }

    _onFocus() {
        if(this.state.errorMsg) {
            this.setState({errorMsg:null});
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.content}>
                            <View style={styles.userIconContainer}>
                                <Icon style={styles.userIcon} name={'ios-contact-outline'}/>
                            </View>
                            <InputGroup borderType="underline" style={[styles.textInput,{marginTop:20}]}>
                                <Icon name="md-person" style={styles.inputIcon}/>
                                <Input onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'userName')} placeholder="邮箱/手机号" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <InputGroup borderType="underline" style={styles.textInput}>
                                <Icon name="md-lock" style={styles.inputIcon}/>
                                <Input secureTextEntry={true} onFocus={this._onFocus.bind(this)} onChangeText={(e)=>this._onChangeText(e,'psd')} placeholder="密码" placeholderTextColor="#ccc"/>
                            </InputGroup>
                            <View style={{height:100,marginTop:20,alignItems:'center'}}>
                                <View style={{height:20}}>
                                    {this.state.errorMsg ? <Text style={{color:'#f00',fontWeight:'bold'}}>错误：{this.state.errorMsg}</Text> : null}
                                </View>
                                <Button onPress={this._submit.bind(this)} full style={styles.btn}>
                                    <Text style={{color:'#fff',fontSize:16}}>登录</Text>
                                </Button>
                            </View>

                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={()=>this.props.goToRegist()} activeOpacity={0.8}>
                                <Text>注册新账号</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.props.goToFeedback()} activeOpacity={0.8}>
                                <Text>登录遇到问题或反馈</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        alignItems:'center',
        backgroundColor:'#fff'

    },
    content: {
        alignItems:'center',
        width:cfn.deviceWidth()-20,
        marginTop:cfn.picHeight(40),
        backgroundColor:'#fff'
    },
    userIconContainer: {
        width:cfn.picWidth(180),
        height:cfn.picWidth(180),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:cfn.picWidth(90),
        //borderColor:'#fff',
        backgroundColor:'#eee',
        borderWidth:1,
        borderColor:'#ddd'
    },
    userIcon: {
        fontSize:cfn.picWidth(180),
        color:'#ccc',
    },
    inputIcon: {
        color:config.baseColor,
        marginLeft:10,
        fontSize:32
    },
    textInput: {
        width:cfn.deviceWidth()-cfn.picWidth(80),
        borderColor:config.baseColor,
        marginTop:cfn.picHeight(30),
        height:50,
        borderWidth:2
    },
    btn: {
        width:cfn.deviceWidth()-cfn.picWidth(80),
        backgroundColor:config.baseColor,
        marginTop:20,
        height:50,
    },
    footer: {
        flexDirection:'row',
        height:50,
        alignItems:'center',
        justifyContent:'space-between',
        width:cfn.deviceWidth(),
        paddingLeft:20,
        paddingRight:20,
        marginTop:10
    }
});