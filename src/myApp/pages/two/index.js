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
    PixelRatio,
    ScrollView
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import Header from '../../components/header'
import WebViewAndroid from 'react-native-webview-android';
import {lotteryIcon as icons} from '../../public/config/images'
import lotterys from '../../public/config/lottery_trend';
export default class two extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            webViewOffset:50,
            item:null
        };
        this.params = props.navigation.state.params;

    }

    componentDidMount() {
        //EasyLoading.show('加载数据...',5000);
        this.renderLottery();
    }

    renderLottery() {
        let views = lotterys.map((option,index)=>{
            let menus = option.menu.map((opt,i)=>{
                return(
                    <TouchableOpacity
                        key={option.name+i}
                        onPress={()=>cfn.goToPage(this,'trend',{name:`${option.name}-${opt.title}`,url:opt.url})}
                        activeOpacity={0.8} style={styles.list}>
                        <Text style={styles.menu}>{opt.title}</Text>
                    </TouchableOpacity>
                )
            });
            return(
                <View
                    key={'k'+index}
                    style={styles.itemContainer}>
                    <View style={styles.header}>
                        <Image style={styles.icon} source={option.icon}/>
                        <Text style={styles.title}>{option.name}</Text>
                        <Text style={styles.desc}>{option.desc}</Text>
                    </View>
                    <View style={styles.body}>
                        {menus}
                    </View>
                </View>
            )
        });
        this.setState({
            item:views,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={"图表走势"}
                    leftBtn={""}
                    leftType="text"
                    leftFun={()=>{}}
                    rightBtn={""}
                    rightType="text"
                    rightFun={()=>{}}
                />

                <ScrollView>
                    {this.state.item}
                </ScrollView>



                {/*<View style={styles.itemContainer}>*/}
                    {/*<View style={styles.header}>*/}
                        {/*<Image style={styles.icon} source={icons.ssc}/>*/}
                        {/*<Text style={styles.title}>时时彩</Text>*/}
                        {/*<Text>5分钟一期不停歇</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.body}>*/}
                        {/*<View style={styles.list}>*/}
                            {/*<Text>基本走势</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    itemContainer: {
        width:cfn.deviceWidth(),
        minHeight:cfn.picHeight(200),
        backgroundColor:'#fff',
        marginBottom:cfn.picHeight(20)
    },

    header: {
        flexDirection:'row',
        alignItems:'center',
        height:cfn.picHeight(120),
        width:cfn.deviceWidth(),
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },
    icon: {
        width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        marginLeft:cfn.picWidth(20)
    },
    title: {
        fontSize:20,
        color:'#333',
        fontWeight:'bold',
        marginLeft:cfn.picWidth(20),
        marginRight:cfn.picWidth(20),
    },
    menu: {
        color:'#444'
    },
    desc: {
        fontSize:12,
        flexWrap:'wrap',
        color:'#999'
    },
    body: {
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
    },
    list: {
      width:cfn.deviceWidth()/4,
        height:cfn.picHeight(80),
        alignItems:'center',
        justifyContent:'center'
    },

});