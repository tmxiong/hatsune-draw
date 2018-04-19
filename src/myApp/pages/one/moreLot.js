import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Alert
} from 'react-native';
import {Icon} from 'native-base';
import Header from '../../components/header'
import SortableSudokuGrid from '../../components/sortGridView/SortableSudokuGrid';
import myTheme from '../../public/theme/index'
import cfn from '../../public/utils/commonFun'
import lotterys from '../../public/config/lotterys_new'
import global from '../../public/global/global'
import {save} from '../../public/utils/storage'
export default class helloPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.params = props.navigation.state.params;

        let allLottery = this.getAllLottery(lotterys);

        this.state = {
            dataSource: this.params.data,
            candidates: this.getAnotherLottery(allLottery,this.params.data),
            sortable: false,
            scrollEnabled: true,
            disabled: false,
            managementButtonText: '管理',
            opacity: new Animated.Value(0),
        };
    }

    componentWillUnmount() {
        this.params.reloadMenu();
    }

    // 所有彩种放数组里；
    getAllLottery(data) {
        let allLottery = [];
        //console.log(data);
        for(let i = 0; i < data.length; i++) {
            allLottery = allLottery.concat(data[i].lottery);
        }
        return allLottery;
    }

    //挑出没有被选中的彩种
    getAnotherLottery(data,other) {
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < other.length; j++) {
                if(data[i].name == other[j].name) {
                    data.splice(i--,1);
                    break;
                }
            }
        }
        return data;
    }

    _renderGridCell(data,component) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={data.name}
                disabled={this.state.disabled}
                style={{flex: 1, padding: 6, position: 'relative', }}
                onPress={ this._onPressCell.bind(this, data) }>
                <View style={{ overflow: 'hidden', backgroundColor: '#fff',
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                    borderWidth: StyleSheet.hairlineWidth, borderColor: '#eee', }}>
                    <Image source={data.icon} style={{width: 40, height: 40, marginHorizontal: 10, marginBottom: 10,}}/>
                    <Text>{data.name}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!this.state.disabled}
                    style={{position: 'absolute', right: 8, top: 8, width: 30, height: 30, }}
                    onPress={this._onRemoveCellButtonPress.bind(this, component)}>
                    <Animated.View
                        style={{flex: 1, opacity: this.state.opacity, justifyContent: 'center', alignItems: 'center', }}>

                        <Icon name="md-remove" style={{width:22,height:22,color:'#e22',alignSelf:'center',fontSize:20}}/>

                    </Animated.View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    _onPressCell = (data) => {
        cfn.goToPage(this,'touzhu',{name:data.name,url:data.url ,fromMenu:true, data:data})
    };

    _onRemoveCellButtonPress = (component) => {

        let sortableData = this._sortableSudokuGrid.getSortedDataSource();
        if(sortableData.length <= 1) {
            return Alert.alert('提示：', '亲，留一个吧，不能再减了。')
        }

        let cellIndex = this._sortableSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        })

        this._sortableSudokuGrid.removeCell(this,{
            cellIndex,
            callback: (_this,removedDataList) => {
                if(removedDataList.length > 0) {
                    let data = removedDataList[0]
                    _this._candidatesSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    };

    _onPressManagementButton = () => {
        let scrollEnabled = !this.state.scrollEnabled
        let disabled = !this.state.disabled
        let managementButtonText = this.state.managementButtonText == '管理' ? '完成' : '管理'
        let sortable = !this.state.sortable
        let opacity = sortable ? new Animated.Value(1) : new Animated.Value(0)
        this.setState({
            scrollEnabled,
            managementButtonText,
            disabled,
            sortable,
            opacity,
        })
        if (!sortable) {
            let sortedDataSource = this._sortableSudokuGrid.getSortedDataSource()
            //console.log(`_onPressManagementButton get sorted/added/removed DataSource`)
            //console.log(sortedDataSource);
            let candidateDataSource = this._candidatesSudokuGrid.getSortedDataSource()
            //console.log(`_onPressManagementButton get sorted/added/removed candidateDataSource`)
            //console.log(candidateDataSource)

            // global.storage.save({
            //     key: 'lotteryMenu',  // 注意:请不要在key中使用_下划线符号!
            //     id: 'lotteryMenu',
            //     data: sortedDataSource,
            //
            //     // 如果不指定过期时间，则会使用defaultExpires参数
            //     // 如果设为null，则永不过期
            //     expires: null
            // });

            save('lotteryMenu','lotteryMenu',sortedDataSource);
        }
    };


    _renderCandidateCell = (data, component) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={data.name}
                disabled={this.state.disabled}
                style={{flex: 1, padding: 6, position: 'relative', }}
                onPress={ this._onPressCandidateCell.bind(this, data) }>
                <View style={{ overflow: 'hidden', backgroundColor: '#fff',
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                    borderWidth: StyleSheet.hairlineWidth, borderColor: '#eee', }}>
                    <Image source={data.icon} style={{width: 40, height: 40, marginHorizontal: 10, marginBottom: 10,}}/>
                    <Text>{data.name}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!this.state.disabled}
                    style={{position: 'absolute', right: 8, top: 8, width: 30, height: 30, }}
                    onPress={this._onRemoveCandidatesCellButtonPress.bind(this, component)}>
                    <Animated.View
                        style={{flex: 1, opacity: this.state.opacity, justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name="md-add" style={{width: 22, height: 22,color:'#2d2',fontSize:20}}/>
                    </Animated.View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    _onPressCandidateCell = (data) => {
        cfn.goToPage(this,'touzhu',{name:data.name,url:data.url ,fromMenu:true, data:data})
    }

    _onRemoveCandidatesCellButtonPress = (component) => {

        let sortableData = this._sortableSudokuGrid.getSortedDataSource();

        if(sortableData.length >= 8) {
            return Alert.alert('提示：', '亲，已经满了，不能再加了。')
        }

        let cellIndex = this._candidatesSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        });

        this._candidatesSudokuGrid.removeCell(this,{
            cellIndex,
            callback: (_this,removedDataList) => {
                if(removedDataList.length > 0) {
                    let data = removedDataList[0]
                    _this._sortableSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={this.params.name}
                    leftBtn={"ios-arrow-back"}
                    leftFun={()=>cfn.goBack(this)}
                    rightBtn={''}
                    rightType="text"

                />
                <View style={{height:40,justifyContent:'center'}}>
                    <Text style={{color:'#aaa',marginLeft:10}}>提示：点击'管理'可对彩种进行排序或增减</Text>
                </View>
                <ScrollView>
                    <SortableSudokuGrid
                        ref={ ref => this._sortableSudokuGrid = ref }
                        columnCount={4}
                        dataSource={this.state.dataSource}
                        renderCell={this._renderGridCell.bind(this)}
                        sortable={this.state.sortable}
                    />

                   <View style={{height:30,justifyContent:'center'}}>
                       <View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#ddd'}}/>
                   </View>

                    <SortableSudokuGrid
                        ref={ ref => this._candidatesSudokuGrid = ref }
                        containerStyle={{ backgroundColor: '#fff',}}
                        columnCount={4}
                        dataSource={this.state.candidates}
                        renderCell={this._renderCandidateCell.bind(this)}
                        sortable={false}
                    />

                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});