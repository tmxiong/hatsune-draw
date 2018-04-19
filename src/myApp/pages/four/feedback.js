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
    Image,
    ScrollView,
    Alert,
    ToastAndroid
} from 'react-native';
import Header from '../../components/header'
import {Input,Button} from 'native-base'
import cfn from '../../public/utils/commonFun'
import checkInput from '../../public/utils/inputUtils'
import {Loading,EasyLoading} from '../../components/loading'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.contentText = '';
        this.emailText = '';
    }

    _onSubmit() {
        if(this.contentText == '') {
            return Alert.alert('错误：','反馈内容不能为空')
        }
        let emailCheck = checkInput._checkEmail(this.emailText);
        if(!emailCheck[0]) {
            return Alert.alert('错误：',emailCheck[1]);
        }
        EasyLoading.show('正在提交...');
        fetch('https://www.github.com')
            .then(()=>{
                EasyLoading.dismis();
                ToastAndroid.show('提交成功！感谢您的反馈', ToastAndroid.SHORT);
                cfn.goBack(this);
            })
            .catch((e)=>{
                EasyLoading.dismis();
                Alert.alert('错误：','网络错误，请稍后重试！');
            })
    }

    _onChangeText(t,type) {
        if(type == '1') {
            this.contentText = t;
        }else if(type == '2') {
            this.emailText = t;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={"帮助与反馈"}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={""}
                    rightType="text"
                />
                <ScrollView>
                    <Image
                        style={styles.image}
                        source={require('../../public/asset/imgs/feedback.jpg')}
                    />

                    <Text style={styles.note}>您的意见、建议或遇到的问题：</Text>

                    <View style={styles.inputGroup}>
                        <Input
                            onChangeText={(t)=>this._onChangeText(t,'1')}
                            maxLenght={100}
                            style={styles.input}
                            multiline={true}
                            placeholderTextColor="#bbb"
                            placeholder="请输入100字以内的内容" />
                    </View>

                    <Text style={[styles.note,{marginTop:30}]}>联系邮箱：</Text>

                    <View style={[styles.inputGroup,{height:cfn.picHeight(120)}]}>
                        <Input
                            onChangeText={(t)=>this._onChangeText(t,'2')}
                            style={styles.input1}
                            placeholderTextColor="#bbb"
                            placeholder="邮箱" />
                    </View>
                    <Button
                        onPress={()=>this._onSubmit()}
                        full style={styles.btn}> 提交反馈 </Button>
                </ScrollView>
                <Loading background={'transparent'} topOffset={cfn.statusBarHeight()+56}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:cfn.deviceWidth(),
        //alignItems:'center'

    },
    image: {
        width:cfn.deviceWidth(),
        height:cfn.deviceWidth()/2-40,
        resizeMode:'stretch'
    },
    noteContainer: {
        width:cfn.deviceWidth(),
    },
    note: {
        margin:15,
        fontSize:18,
        color:'#222',
        padding:0
    },
    inputGroup: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(200),
        alignItems:'center',
    },
    input: {
        width:cfn.deviceWidth()-20,
        height:cfn.picHeight(200),
        backgroundColor:'#fff',
        borderRadius:5
    },
    input1: {
        width:cfn.deviceWidth()-20,
        height:cfn.picHeight(80),
        backgroundColor:'#fff',
        borderRadius:5
    },
    btn: {
        width:cfn.deviceWidth()-20,
        alignSelf:'center',
        marginTop:20
    }

});
