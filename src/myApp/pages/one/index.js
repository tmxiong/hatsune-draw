/**
 * Created by tmxiong on 2018/3/10.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import Header from '../../components/header'
import {banner} from '../../public/config/images'
import BannerMini from '../../components/banner/bannerMini'
import BannerZoom from '../../components/banner/bannerZoom'
import MarqueeLabel from '../../components/notice/marqueeLabel'
import {Card,CardItem,Body} from 'native-base'
import lotterys from '../../public/config/lotterys_new'
import tools from '../../public/config/lottery_tools'
import SearchLottery from '../../components/searchLottery'
import {Icon} from 'native-base';
import {load} from '../../public/utils/storage'
import NewsList from '../../components/newsList'
import config from '../../public/config/config'
import {connect} from 'react-redux';
import splashScreen from 'react-native-splash-screen'

const marginVal = 10; //边距为8

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lotteryMenu:null,
            toolsMenu:null,
        };

        //let fc = lotterys[2].lottery[0];
        this.lottery = lotterys[1].lottery;
        //this.lottery[7] = fc;
    }

    componentDidMount() {
        splashScreen.hide();
        this.setToolMenu();
        this.getLotteryDataByStorage();

    }

    async getLotteryDataByStorage() {
        // global.storage.getAllDataForKey('lotteryMenu')
        //     .then((data)=>this.setLotteryStorageData(data))
        //     .catch((error)=>this.setLotteryMenu(this.lottery))

        // global.storage.load({key:'lotteryMenu',id:'lotteryMenu'})
        //     .then((data)=>this.setLotteryStorageData(data))
        //     .catch((error)=>this.setLotteryMenu(this.lottery))
        try {
            let data = await load('lotteryMenu','lotteryMenu');
            this.setLotteryStorageData(data);
        }  catch(e) {
            this.setLotteryMenu(this.lottery)
        }

    }

    setLotteryStorageData(data) {
        if(data.length != 0) {
            this.lottery = data;
        }
        this.setLotteryMenu(data);
    }

    setLotteryMenu() {
        let data = this.lottery;
        let lotteryMenu = [];
        for(let i = 0; i < data.length; i++) {
            lotteryMenu.push(
                <TouchableOpacity
                    activeOpacity={0.8} key={data[i].code}
                    style={[styles.menuBodyItem,{width:(cfn.deviceWidth()-marginVal*2)/3 - 2}]}>
                    <Image style={styles.imgIcon} source={data[i].icon}/>
                    <Text>{data[i].name}</Text>
                </TouchableOpacity>
            )
        }
        // return lotteryMenu;
        this.setState({
            lotteryMenu:lotteryMenu
        })
    }

    setToolMenu() {
        let toolsMenu = [];
        for(let i = 0; i < 4; i++) {
            toolsMenu.push(
                <TouchableOpacity
                    key={'s'+i}
                    activeOpacity={0.8}
                    onPress={()=>cfn.goToPage(this,tools[i].page,{name:tools[i].name,url:tools[i].url,key:tools[i].key})}
                    style={[styles.toolCell,{marginBottom:20,backgroundColor:tools[i].bgColor}]}>
                    <Icon name={tools[i].icon} style={[styles.toolIcon,{color:tools[i].color}]}/>
                    <View style={styles.toolCellHead}>
                        <Text style={styles.toolCellTitle}>{tools[i].name}</Text>
                        <Text style={styles.toolCellDesc}>{tools[i].desc}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return toolsMenu;
        // this.setState({
        //     toolsMenu:toolsMenu,
        // })
    }

    render() {
        return(
            <View style={styles.container}>
                <Header
                    title={config.appName}
                    leftBtn={"ios-menu"}
                    leftFun={()=>cfn.goToPage(this,'DrawerOpen')}
                    rightBtn={'md-search'}
                    rightFun={()=>this.searchLottery.showModal()}
                />
                <ScrollView>
                    <BannerZoom
                        pageGap={marginVal}
                        bannerData={banner}
                        style={{marginTop:10}}
                    />



                    <Card style={[styles.menuContainer]}>
                        <View style={styles.menuTitle}>
                            <View style={styles.titleIcon}/>
                            <Text style={styles.titleText}>时时彩工具</Text>
                        </View>
                        <View style={styles.menuBody}>
                            {/*<View style={[styles.toolCell,{borderRightColor:'#eee',borderRightWidth:1}]}>*/}
                            {/*<Icon name="ios-trending-up-outline" style={styles.toolIcon}/>*/}
                            {/*<View style={styles.toolCellHead}>*/}
                            {/*<Text style={styles.toolCellTitle}>开奖走势</Text>*/}
                            {/*<Text style={styles.toolCellDesc}>开奖走势开奖走势</Text>*/}
                            {/*</View>*/}
                            {/*</View>*/}
                            {/*{this.state.toolsMenu}*/}
                            {this.setToolMenu()}

                        </View>
                    </Card>



                    <Card style={styles.menuContainer}>
                        <View style={styles.menuTitle}>
                            <View style={styles.titleIcon}/>
                            <Text style={styles.titleText}>热门彩种</Text>
                            <TouchableOpacity
                                onPress={()=>cfn.goToPage(this,'moreLot',
                                    {name:'彩种列表',data:this.lottery,reloadMenu:this.getLotteryDataByStorage.bind(this)})}
                                activeOpacity={0.8}
                                style={styles.more}>
                                <Text>更多>></Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.menuBody,{justifyContent:'flex-start'}]}>
                            {/*<View style={styles.menuBodyItem}>*/}
                            {/*<Image style={styles.imgIcon} source={this.lottery[0].icon}/>*/}
                            {/*<Text>{this.lottery[0].name}</Text>*/}
                            {/*</View>*/}
                            {this.state.lotteryMenu}
                            {/*{this.setLotteryMenu()}*/}
                        </View>
                    </Card>



                    <Card style={[styles.menuContainer,{marginTop:cfn.picHeight(20)}]}>
                        <View style={styles.menuTitle}>
                            <View style={styles.titleIcon}/>
                            <Text style={styles.titleText}>热门资讯</Text>
                            <TouchableOpacity
                                onPress={()=>cfn.goToPage(this,'article', {name:'彩种列表'})}
                                activeOpacity={0.8}
                                style={styles.more}>
                                <Text>更多>></Text>
                            </TouchableOpacity>
                        </View>
                        <NewsList _this={this}/>
                    </Card>

                </ScrollView>
                <SearchLottery
                    ref={ref=>this.searchLottery = ref}
                />

                <StatusBar hidden={false}
                           translucent= {true}
                           backgroundColor={'transparent'}
                           barStyle={'light-content'}/>

            </View>
        )
    }
}

export default connect()(index)

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5',
        alignItems:'center'
    },
    wrapper: {
        height:cfn.picHeight(300),
        width:cfn.deviceWidth(),

    },
    banner: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(300),
        backgroundColor:'#f00'
    },
    menuContainer: {
        width:cfn.deviceWidth()- marginVal * 2,
        backgroundColor:'#fff',
        borderRadius:6,
        alignSelf:'center'
    },
    menuTitle: {
        height:cfn.picHeight(80),
        flexDirection:'row',
        width:cfn.deviceWidth(),
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    titleIcon: {
      width:5,
        height:cfn.picHeight(36),
        backgroundColor:'#d22',
        marginLeft:cfn.picWidth(20),
        marginRight:cfn.picWidth(10),
        borderRadius:2
    },
    titleText: {
      color:'#333',
        fontSize:16
    },
    more: {
      position:'absolute',
        right:marginVal*3,
        alignItems:'center',
        justifyContent:'center',
        height:cfn.picHeight(80),
    },
    menuBody: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'space-around'

    },
    menuBodyItem: {
      alignItems:'center',
        justifyContent:'center',
        width:cfn.deviceWidth()/4,
        height:cfn.deviceWidth()/4,
    },
    imgIcon: {
        width:cfn.picHeight(120),
        height:cfn.picHeight(120)
    },
    toolCell: {
        width:cfn.deviceWidth()/2 - marginVal-20,
        height:cfn.picHeight(200),
        borderBottomColor:'#eee',
        flexDirection:'row',
        alignItems:'center',
        alignSelf: 'center',
        backgroundColor:'#229ae9',
        borderRadius:6
    },
    toolIcon: {
        fontSize:50,
        color:'#c33',
        width:50,
        height:50,
        marginLeft:10,
        textAlign:'center'
    },
    toolCellHead: {
        marginLeft:5,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    toolCellTitle: {
        fontSize:18,
        color:'#fff'
    },
    toolCellDesc: {
        color:'#fff0e6',
        marginTop:5,
        fontSize:12
    }
})