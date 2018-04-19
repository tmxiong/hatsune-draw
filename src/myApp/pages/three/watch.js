import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ListView
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import {getWatch} from '../../app/actions/kaijiang'
import {connect} from 'react-redux';
import {Icon} from 'native-base'
import Swipeout from 'react-native-swipeout';
import {save, getAllDataForKey,remove} from '../../public/utils/storage'
class watch extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
        this.rowData = null;  // 点击或滑动item存储该rowData
        this.swipeBtns = [
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
        getWatch(this.props.dispatch);
    }

    _delete() {
        remove('watch',this.rowData.code);
        getWatch(this.props.dispatch);
    }

    _renderRow(rowData,sectionId, rowId) {
        let {name,expect,time, openCode, code} = rowData;

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
            <Swipeout  backgroundColor={'#f5f5f5'} right={this.swipeBtns} buttonWidth={cfn.picWidth(140)}
                       autoClose={true}
                       onOpen={()=>this._onOpen(rowData,sectionId, rowId)}
                >
                <TouchableOpacity
                    key={rowId}
                    activeOpacity={0.8}
                    onPress={()=>{cfn.goToPage(this.props.parentThis,'kaijiangDetail',{data:rowData,name:name})}}
                    style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemIssue}>{expect}</Text>
                        <Text style={styles.itemDate}>{time}</Text>
                    </View>
                    <View style={styles.itemBody}>
                        {codes}
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Icon style={styles.forwardIcon} name={"ios-arrow-forward"}/>
                    </View>
                </TouchableOpacity>
            </Swipeout>)
    }

    _onOpen(rowData) {
       this.rowData = rowData;
    }

    render() {
        return (
            <View style={styles.container}>

                {this.props.ds.getRowCount() > 0 ?
                    [<View key={2} style={styles.noteContainer}><Text key={0} style={styles.note}>提示: 左划可将列表移除</Text></View>,
                        <ListView
                        key={1}
                        dataSource={this.props.ds}
                        renderRow={this._renderRow.bind(this)}
                    />] :
                    <View style={styles.emptyContainer}>
                        <Text style={{color:'#bbb',lineHeight:20}}>{'暂无关注\n请点上面'}</Text>
                    </View>
                }


            </View>
        )
    }

}

function setData(store) {
    return ({
        data: store.kaijiang.data,
        ds: store.kaijiang.ds,
    })
}
export default connect(setData)(watch)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:'#f5f5f5'
    },
    noteContainer:{
        backgroundColor:'#FABE3B',
        height:30,
        justifyContent:'center',
    },
    note: {
        color:'#fff',
        width:cfn.deviceWidth(),
        paddingLeft:5
    },
    swipeBtn: {
        width:cfn.picWidth(140),
        height:cfn.picHeight(100),
        alignItems:'center',
        justifyContent:'center'
    },
    emptyContainer: {
        width:100,height:50,borderRadius:5,
        borderColor:'#bbb',borderWidth:1,
        alignItems:'center',justifyContent:'center',
        marginTop:cfn.deviceWidth()/2
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
    forwardIcon: {
        fontSize:30,
        color:'#aaa',
    },
    forwardIconContainer: {
        width:50,
        height:cfn.picHeight(170),
        position:'absolute',
        right:10,
        alignItems:'center',
        justifyContent:'center'
    }
});