// 从投注页跳过来的

import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    WebView,
    Alert,
    ScrollView,
    RefreshControl,
    ToastAndroid
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import { Loading, EasyLoading } from '../../components/loading'
import Header from '../../components/header'
import {save, getAllDataForKey,remove} from '../../public/utils/storage'
import {getWatch} from '../../app/actions/kaijiang'
import urls from '../../public/config/urls'
import {connect} from 'react-redux'
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';

class kaijiangDetail extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            items: null,
            isRefreshing: true,
            isError: false,
            isWatched:false,
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {
        //EasyLoading.show('加载数据...');
        this.getData();
        this.checkIsWatched();
    }

    async checkIsWatched() {
        let data = await getAllDataForKey('watch');
        let isWatched = false;
        const{code} = this.params.data;
        for(let i = 0; i < data.length; i++) {
            if(data[i].code == code) {
                isWatched = true;
                break;
            }
        }
        this.setState({
            isWatched: isWatched,
        })
    }

    getData() {
        fetch(urls.getHistoryLotteryCode(this.params.data.code))
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((e)=>this.setError())
    }

    setError() {
        this.setState({
            isRefreshing: false,
            isError: true
        })
    }

    setData(data) {
        data = data.showapi_res_body.result;
        let items = [];
        for(let i = 0; i < data.length; i++) {
            let {name,expect,openCode,time,code} = data[i];
            let codes = [];

            // 有+号的
            if(openCode.match(/\+/)){
                openCode = openCode.split('+');
                let openCode_0 = openCode[0].split(',');
                let openCode_1 = openCode[1].split(',');
                // 红球
                for(let j = 0; j < openCode_0.length; j++) {
                    codes.push(
                        <View
                            key={''+i+j}
                            style={styles.itemCode}>
                            <Text style={styles.codeText}>{openCode_0[j]}</Text>
                        </View>
                    )
                }
                // 蓝球
                for(let k = 0; k < openCode_1.length; k++) {
                    codes.push(
                        <View
                            key={''+i+k+k}
                            style={[styles.itemCode,{backgroundColor:'#5D99EE'}]}>
                            <Text style={styles.codeText}>{openCode_1[k]}</Text>
                        </View>
                    )
                }
            }else {
                // 竞技彩
                const {code} = this.params.data;
                if(code == 'zcbqc' || code == 'zcjqc' || code == 'zcsfc') {
                    var itemCodeStyle = {
                        width:cfn.picWidth(30),
                        backgroundColor:'#7CBD7F',
                        borderRadius:0,
                        marginRight:2
                    }
                }
                openCode = openCode.split(',');
                for(let j = 0; j < openCode.length; j++) {
                    codes.push(
                        <View
                            key={''+i+j}
                            style={[styles.itemCode,itemCodeStyle]}>
                            <Text style={styles.codeText}>{openCode[j]}</Text>
                        </View>
                    )
                }
            }

            items.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={()=>{}}
                    style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemIssue}>{expect}</Text>
                        <Text style={styles.itemDate}>{time}</Text>
                    </View>
                    <View style={styles.itemBody}>
                        {codes}
                    </View>
                </TouchableOpacity>
            )
        }
        this.setState({items: items});
        setTimeout(()=>{
            this.setState({
                isError:false,
                isRefreshing:false,
            })
        },1000)
    }

    _onRefresh() {
        this.setState({isRefreshing:true,isError:false});
        this.getData();
    }

    async _onSelect(value) {
        const {data} = this.params;
        if(value == 1) { //关注
            if(!this.state.isWatched) {
                save('watch',data.code,data);
                ToastAndroid.show(`${data.name} 关注成功！`,ToastAndroid.SHORT);
                this.setState({isWatched: true});
            }else {
                remove('watch',data.code,data);
                ToastAndroid.show(`您已取消对${data.name}的关注！ `,ToastAndroid.SHORT);
                this.setState({isWatched: false});
            }
            getWatch(this.props.dispatch);

        }else if(value == 2) { // 帮助
            //console.warn(data.help);
            setTimeout(()=>{
                cfn.goToPage(this,'help',{help:data.help,name:'玩法帮助'})
            },400)

        }else {}
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*title={this.params.name}*/}
                    {/*leftBtn={"ios-arrow-back"}*/}
                    {/*leftFun={()=>cfn.goBack(this)}*/}
                    {/*rightBtn={"md-more"}*/}
                    {/*rightType={'icon'}*/}
                {/*/>*/}

                <MenuProvider style={{flexDirection: 'column',width:cfn.deviceWidth(),height:cfn.deviceHeight()}}>
                    <Header
                        title={this.params.name}
                        leftBtn={"ios-arrow-back"}
                        leftFun={()=>cfn.goBack(this)}
                        rightBtn={"md-more"}
                    />
                    <Menu
                        style={{position:'absolute',top:cfn.statusBarHeight(),right:0,width:56,height:56,backgroundColor:'transparent'}}
                        onSelect={this._onSelect.bind(this)}>
                        <MenuTrigger text='' style={{backgroundColor:'transparent',width:56,height:56}}/>
                        <MenuOptions >
                            <MenuOption value={1}>
                                <Text style={{color: this.state.isWatched ? 'red' : '#888',margin:5}}>{this.state.isWatched ? '已关注' : '关注'}</Text>
                            </MenuOption>
                            <MenuOption value={2}>
                                <Text style={{color: '#888',margin:5}}>玩法帮助</Text>
                            </MenuOption>
                            {/*<MenuOption value={3} disabled={true} text='Three' />*/}
                        </MenuOptions>
                    </Menu>
                    <ScrollView
                        refreshControl={<RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#fff"
                        />}
                    >
                        {
                            this.state.isError ?
                                <TouchableOpacity
                                    style={{alignSelf:'center',marginTop:cfn.deviceWidth()/3}}
                                    activeOpacity={0.8}
                                    onPress={()=>this.state.isError && this._onRefresh()}>
                                    <Text style={{fontSize:15,color:'#888'}}>{'加载错误，点击重试！'}</Text>
                                </TouchableOpacity> :
                                this.state.items
                        }
                    </ScrollView>
                </MenuProvider>
            </View>
        )
    }

}

export default connect()(kaijiangDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    itemContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(170),
        backgroundColor:'#fff',
        marginBottom:5,
        marginTop:5
    },
    itemHeader: {
        height:cfn.picHeight(70),
        width:cfn.deviceWidth()-50,
        flexDirection:'row',
        alignItems:'center',
    },
    itemName: {
        marginLeft:10,
        fontSize:18,
        color:'#222'
    },
    itemIssue: {
        marginLeft:10,
        color:'#c33'
    },
    itemDate: {
        marginLeft:10,
        color:'#aaa'
    },
    itemBody: {
        flexDirection:'row',
        height:cfn.picHeight(90),
        width:cfn.deviceWidth()-50,
        alignItems:'center',
        paddingLeft:10
    },
    itemCode: {
        width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        backgroundColor:'#EC6561',
        borderRadius:cfn.picWidth(30),
        alignItems:'center',
        justifyContent:'center',
        marginRight:5
    },
    codeText: {
        color:'#fff',
        fontSize:15
    },
});