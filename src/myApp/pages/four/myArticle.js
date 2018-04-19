import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    Alert
} from 'react-native';
import Header from '../../components/header'
import cfn from '../../public/utils/commonFun'
import Swipeout from 'react-native-swipeout';
import {save,remove,getAllDataForKey,clearMapForKey} from '../../public/utils/storage'
import {Icon} from 'native-base'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            ds: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        };
        this.params = props.navigation.state.params;
        this.rowData = null;  // 点击或滑动item存储该rowData
        this.swipeBtns = [
            // {
            //     component: <TouchableOpacity activeOpacity={0.8} onPress={()=>this._cancel()} style={styles.swipeBtn}>
            //         <Text>取消</Text>
            //     </TouchableOpacity>
            // },
            // {
            //     component: <TouchableOpacity activeOpacity={0.8} onPress={()=>this._delete()} style={[styles.swipeBtn,{backgroundColor:'#e00'}]}>
            //         <Text style={{color:'#eee'}}>删除</Text>
            //     </TouchableOpacity>
            // },
            {
                text: '取消',
                //onPress:()=>alert('取消'),
                type:'default'
            },
            {
                text: '删除',
                onPress:()=>this._delete(),
                type:'delete'
            },
        ];
    }

    componentDidMount() {
        this.getStorageData(this.params.key);
    }

    async getStorageData(key) {
        let data = await getAllDataForKey(key);
        this.setState({
            ds: this.state.ds.cloneWithRows(data)
        });
    }


    _onOpen(rowData,sectionId, rowId) {
        this.rowData = rowData;
        //console.log('open')
    }

    _delete() {
        remove(this.params.key,this.rowData.id);
        this.getStorageData(this.params.key);
    }

    _clearAll(key,name) {
        if(this.state.ds.getRowCount() == 0) return;
        Alert.alert('提示：',`确定删除所有${name}？`,[
            {
                text:'取消',
                onPress:()=>{}
            },
            {
                text:'确定',
                onPress:()=>{
                    clearMapForKey(key);
                    this.getStorageData(key);
                }
            }
        ])
    }

    _onPressItem(rowData,sectionId, rowId) {
        cfn.goToPage(this,'articleDetail',
            {name:rowData.name, url: rowData.url ,from:rowData.from, data:rowData})
    }

    _renderRow(rowData,sectionId, rowId) {
        return (
            <Swipeout  right={this.swipeBtns} buttonWidth={cfn.picWidth(140)}
                       autoClose={true} onOpen={()=>this._onOpen(rowData,sectionId, rowId)}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>this._onPressItem(rowData,sectionId, rowId)} style={styles.item}>
                    <Text style={styles.itemText}>{rowData.title}</Text>

                    <View style={styles.iconContainer}>
                        <Icon style={styles.icon} name="ios-arrow-forward"/>
                    </View>



                </TouchableOpacity>
            </Swipeout>)
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={"md-trash"}
                    rightFun={()=>this._clearAll(this.params.key,this.params.name)}
                />

                {this.state.ds.getRowCount() > 0 ?

                    [<Text key={0} style={styles.note}>提示: 左划可将列表移除</Text>,
                        <ListView
                            key={1}
                            dataSource={this.state.ds}
                            renderRow={this._renderRow.bind(this)}
                        />] :
                    <View style={{width:cfn.deviceWidth(),alignItems:'center',marginTop:50}}><Text style={{color:'#aaa',fontSize:18}}>暂无数据</Text></View>
                }

                {/*<Swipeout  right={swipeBtns}*/}
                {/*buttonWidth={cfn.picWidth(140)} autoClose={true} onOpen={this._onOpen.bind(this)}>*/}
                {/*<View style={styles.item}>*/}
                {/*<Text>Swipe me left</Text>*/}
                {/*</View>*/}
                {/*</Swipeout>*/}

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    note: {
        margin:5,
        color:'#aaa'
    },
    swipeBtn: {
        width:cfn.picWidth(140),
        height:cfn.picHeight(100),
        alignItems:'center',
        justifyContent:'center'
    },
    item: {
        height:cfn.picHeight(120),
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    iconContainer: {
        width: cfn.picWidth(120),
        height: cfn.picHeight(120),
        alignItems:'center',
        justifyContent:'center'
    },
    icon: {
        textAlign:'center',
        color:'#ccc'
    },
    itemText: {
        color:'#555',
        marginLeft:cfn.picWidth(20),
        width:cfn.deviceWidth() - cfn.picWidth(120)
    }
});