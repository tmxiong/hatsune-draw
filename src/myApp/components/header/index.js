import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import myTheme from '../../public/theme/index'
import {Header, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';
import cfn from '../../public/utils/commonFun'
import config from '../../public/config/config'
export default class header extends PureComponent {

    static defaultProps = {
        title:'Header',

        leftBtn:'ios-arrow-back',
        leftText:'',
        leftFun:()=>{},

        rightBtn:'',
        rightText:'',
        rightFun:()=>{},

        bgColor: config.baseColor,
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {title, leftBtn, leftText, leftFun, rightBtn, rightText, rightFun, bgColor} = this.props;

        return (
            <View style={[styles.container,{backgroundColor:bgColor}]}>
                <Header style={{marginTop:cfn.statusBarHeight(),backgroundColor:bgColor}}>
                    <Left>
                        <Button onPress={()=>leftFun()} transparent>
                            {leftBtn !== '' ? <Icon style={styles.btn} name={leftBtn} /> : <Text>{leftText}</Text>}
                        </Button>
                    </Left>
                    <Body>
                    <Title>{title}</Title>
                    </Body>
                    <Right>
                        <Button onPress={()=>rightFun()} transparent>
                            {rightBtn !== '' ? <Icon style={styles.btn} name={rightBtn} /> : <Text>{rightText}</Text>}
                        </Button>
                    </Right>
                </Header>
                <StatusBar hidden={false}
                           translucent= {true}
                           backgroundColor={'transparent'}
                           barStyle={'light-content'}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:config.baseColor,
        width:cfn.deviceWidth()
    },
    btn: {
        minWidth:30,
        textAlign:'center'
    }
});