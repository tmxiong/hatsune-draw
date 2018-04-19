import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Picker,
    Alert
} from 'react-native';
import Header from '../../components/header'
import cfn from '../../public/utils/commonFun'
import {Input,InputGroup,} from 'native-base'
import inputUtils from '../../public/utils/inputUtils';
import global from '../../public/global/global'
import {save} from '../../public/utils/storage'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            sex:'男',
        };
        this.params = props.navigation.state.params;
        this.inputStr = ''
    }

    onPressOK(key,input) {
        var check = null;
        if(key == 'nickname') {
            check = inputUtils._checkNickname(input);
            if(!check[0]) return Alert.alert('错误：',check[1]);
        }else if(key == 'sex') {
            input = this.state.sex;
        } else if (key == 'age') {
            check = inputUtils._checkAge(input);
            if(!check[0]) return Alert.alert('错误：',check[1]);
        } else if(key == 'email') {
            check = inputUtils._checkEmail(input);
            if(!check[0]) return Alert.alert('错误：',check[1]);
        } else if(key == 'phoneNum') {
            check = inputUtils._checkPhoneNum(input);
            if(!check[0]) return Alert.alert('错误：',check[1]);
        }

        global.loginedUserData.set(key,input);
        global.loginedUserData.save();

        global.userData[key] = input;
        save('userData','userData',global.userData);

        this.params.updateView(global.userData);

        cfn.goBack(this);

    }

    renderView(key,name) {

        let that = this;

        let view1 = <InputGroup borderType="regular" style={{backgroundColor:'#fff'}}>
            <Input style={styles.text} onChangeText={(t)=>this.inputStr = t} keyboardType="numeric" maxLength={2} placeholderTextColor="#ccc" placeholder={name}/>
        </InputGroup>;

        let view2 = <InputGroup borderType="regular" style={{backgroundColor:'#fff'}}>
            <Input style={styles.text} onChangeText={(t)=>this.inputStr = t} placeholderTextColor="#ccc" placeholder={name}/>
        </InputGroup>;

        let view3 = <Picker
            style={{backgroundColor:'#fff'}}
            selectedValue={this.state.sex}
            mode="dropdown"
            onValueChange={(sex) => {
                that.inputStr = sex;
                that.setState({sex: sex})}
            }>
            <Picker.Item label="男" value="男" />
            <Picker.Item label="女" value="女" />
        </Picker>;

        if(key == 'nickname') {
            return view2
        }else if(key == 'sex') {
            return view3
        } else if (key == 'age') {
            return view1;
        } else if(key == 'email') {
            return view2
        } else if(key == 'phoneNum') {
            return view2
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={"完成"}
                    rightType="text"
                    rightFun={()=>this.onPressOK(this.params.key,this.inputStr)}
                />

                {this.renderView(this.params.key,this.params.name)}



            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        padding:0,
        height:50
    }
});