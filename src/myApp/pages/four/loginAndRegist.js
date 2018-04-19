import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Header from '../../components/header'
import cfn from '../../public/utils/commonFun'
import Login from './login';
import Regist from './regist';
import {Loading, EasyLoading} from '../../components/loading'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.params = props.navigation.state.params;
        this.isLoading = false;
        this.state = {
            isLogin:true, // 登录界面还是注册界面
        }
    }

    componentDidMount() {

    }

    goToRegist() {
        this._scrollView.scrollTo({x:cfn.deviceWidth()});
        this.setState({
            isLogin:!this.state.isLogin,
        })
    }
    goToLogin() {
        this._scrollView.scrollTo({x:0});
        this.setState({
            isLogin:!this.state.isLogin,
        })
    }

    onPressSwitch() {
        if(this.isLoading) return;
        if(this.state.isLogin) {
            this.goToRegist()
        } else {
            this.goToLogin();
        }
    }

    showLoading(text) {
        this.isLoading = true;
        EasyLoading.show(text);
    }

    dismisLoading() {
        this.isLoading = false;
        EasyLoading.dismis();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.state.isLogin ? "欢迎登录" : "欢迎注册"}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={this.state.isLogin ? "去注册" : "去登录"}
                    rightType="text"
                    rightFun={()=>this.onPressSwitch()}
                />

                <ScrollView
                    pagingEnabled={true}
                    ref={ref=>this._scrollView = ref}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true} scrollEnabled={false}>

                    <Login
                        goToRegist={this.goToRegist.bind(this)}
                        goBack={()=>cfn.goBack(this)}
                        updateToLogin={()=>this.params.updateToLogin()}
                        showLoading={()=>this.showLoading('正在登录...')}
                        dismisLoading={()=>this.dismisLoading()}
                        goToFeedback={()=>cfn.goToPage(this,'feedback')}
                    />
                    <Regist
                        goToLogin={this.goToLogin.bind(this)}
                        goBack={()=>cfn.goBack(this)}
                        updateToLogin={()=>this.params.updateToLogin()}
                        showLoading={()=>this.showLoading('正在注册...')}
                        dismisLoading={this.dismisLoading.bind(this)}
                        goToFeedback={()=>cfn.goToPage(this,'feedback')}
                    />


                </ScrollView>
                <Loading background={'transparent'} topOffset={cfn.statusBarHeight()+56}/>
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

});