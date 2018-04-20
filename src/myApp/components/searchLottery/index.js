/**
 * Created by timxiong on 2017/9/8.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Platform,
    FlatList,
    Alert,
} from 'react-native';
import cfn from '../../public/utils/commonFun';
import Header from '../header'
import lotterys from '../../public/config/lottery_kaijiang'
import urls from '../../public/config/urls';
import config from '../../public/config/config'
import {Picker,Icon, Button, Card} from 'native-base'

export default class searchModal extends PureComponent {

    static defaultProps = {
        visible: false,
        closeModal: ()=> {}
    };

    constructor(props) {
        super(props);
        this.listHeight = cfn.deviceHeight() - cfn.picHeight(370);
        this.showModal = this._setModalVisible.bind(this,true);
        this.state = {
            issueNum:null,
            id:lotterys[0].code,
            name: null,
            visible: false,

            data:null,


            isLoading:false,
            isError: false,
        }
    }

    _setModalVisible(visible) {
        this.setState({
            visible: visible
        })
    }

    renderItem() {
        let items = [];
        for(let i = 0; i < lotterys.length; i++) {
            items.push(
                <Picker.Item key={i} label={lotterys[i].name} value={lotterys[i]} />
            )
        }
        return items;
    }


    search(){
        const{issueNum,id} = this.state;
        let reg = new RegExp(/^(\d)*$/);

        if(id) {
            if (issueNum) {
                if (!reg.test(issueNum)) {
                    return Alert.alert('提示', '期号只能是数字');
                }

            } else {

            }
            this.getData(issueNum,id);
        }


    }

    getData(num,id) {
        this.setState({
            isLoading:true,
            isError: false,
            codeView:null,
        });
        let url = num ? urls.getSearchLotteryCode(num,id) : urls.getHistoryLotteryCode(id);
        fetch(url)
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setError(error) {
        console.log(error);
        this.setState({isLoading:false, isError:true});
    }

    setData(data) {
        console.warn(data);
        data = data.showapi_res_body.result;

        if(data) {
            if(data.constructor!==Array) {
                let new_data = [];
                new_data[0] = data;
                data = new_data;
            }
            this.setState({data:data, isLoading: false, isError:false});
        } else {
            this.setState({isLoading: false, isError:false});
            return Alert.alert('提示','您输入的期号有误，请核对后重新输入');
        }

    }

    onValueChange(data) {
        console.warn(data);
        this.setState({
            name:data,
            id: data.code,
        })
    }

    _renderItem({item,index}) {
        let rowData = item;
        let rowId = index;
        let {name, expect,time, openCode, code} = rowData;

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
                        key={''+rowId+j}
                        style={styles.itemCode}>
                        <Text style={styles.codeText}>{openCode_0[j]}</Text>
                    </View>
                )
            }
            // 蓝球
            for(let k = 0; k < openCode_1.length; k++) {
                codes.push(
                    <View
                        key={''+rowId+k+k}
                        style={[styles.itemCode,{backgroundColor:'#5D99EE'}]}>
                        <Text style={styles.codeText}>{openCode_1[k]}</Text>
                    </View>
                )
            }
        }else {
            openCode = openCode.split(',');
            if(code == 'zcbqc' || code == 'zcjqc' || code == 'zcsfc') {
                var itemCodeStyle = {
                    width:cfn.picWidth(30),
                    backgroundColor:'#7CBD7F',
                    borderRadius:0,
                    marginRight:2
                }
            }
            for(let j = 0; j < openCode.length; j++) {
                codes.push(
                    <View
                        key={''+rowId+j}
                        style={[styles.itemCode,itemCodeStyle]}>
                        <Text style={styles.codeText}>{openCode[j]}</Text>
                    </View>
                )
            }
        }

        return (

                <TouchableOpacity
                    key={rowId}
                    activeOpacity={0.8}
                    //onPress={()=>{cfn.goToPage(this.props.parentThis,'kaijiangDetail',{data:rowData,name:name})}}
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

    _keyExtractor=(item,index) => index;

    render() {
        const {lotteryView} = this.state;
        return (
            <Modal
                style={styles.container}
                animationType={"slide"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                }}
            >
                <View style={[styles.container,{marginTop:-cfn.statusBarHeight()}]}>
                    <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                    <Header
                        title={"开奖查询"}
                        leftBtn={'md-close'}
                        leftFun={()=>this._setModalVisible(false)}
                        rightBtn={'md-help-circle'}
                        rightFun={()=>Alert.alert('搜索帮助','1.期号为选填；\n2.彩种为必填；\n若期号和彩种都输入则返回具体某一期的开奖结果；\n若只输入彩种则返回多期开奖结果。')}

                    />

                    <View style={{flexDirection:'row',height:55,width:cfn.deviceWidth(),alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                        <TextInput
                            style={styles.inputIssue}
                            placeholder='输入期号,如 20170909042'
                            underlineColorAndroid="transparent"
                            placeholderTextColor='#ddd'
                            onChangeText={(text)=>this.setState({issueNum:text})}
                        />
                        <Picker
                            mode="dropdown"
                            style={{ width: cfn.deviceWidth()/2 * 2/3,height:45,backgroundColor:'#fff',
                                alignItems:'center',borderWidth:1,borderRadius:5,borderColor:'#eee' }}
                            selectedValue={this.state.name}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            {this.renderItem()}
                        </Picker>
                        <Button info
                                onPress={()=>this.search()}
                                style={{backgroundColor:config.baseColor,height:40,width:cfn.deviceWidth()/2 /3,
                                    alignItems:'center',justifyContent:'center',marginTop:7}}>
                            <Text style={{color:'#fff'}}> 搜索 </Text>
                        </Button>
                        {/*<TouchableOpacity*/}
                            {/*onPress={()=>this.search()}*/}
                            {/*activeOpacity={0.8}*/}
                            {/*style={styles.btn}>*/}
                            {/*<Text style={styles.btn_text}>开始查询</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>


                    <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.state.data}
                        renderItem={this._renderItem.bind(this)}
                    />
                </View>
                <StatusBar hidden={false}
                           translucent= {true}
                           backgroundColor={'transparent'}
                           barStyle={'light-content'}/>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        backgroundColor:'#f2f2f2',
        alignItems:'center',
    },
    inputIssue: {
        borderBottomColor:'#eee',
        borderWidth:1,
        width:cfn.deviceWidth()/2-2,
        height:50,
        padding:0,
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20),
        backgroundColor:'#fff',
        fontSize:15,
        borderRadius:5,
        borderColor:'#eee'
    },
    caizhong: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:cfn.picWidth(20),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    cz_text: {
        color:'#ddd',
        fontSize:15
    },
    btn: {
        width: cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        backgroundColor:'#f82222',
        marginTop:cfn.picHeight(40),
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },

    icon: {
        width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        resizeMode:'contain',
        marginLeft:cfn.picWidth(20)
    },
    cz_name: {
        fontSize:15,
        color:'#666',
        marginLeft:cfn.picWidth(20)
    },



    itemContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(170),
        backgroundColor:'#fff',
        marginTop:10
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