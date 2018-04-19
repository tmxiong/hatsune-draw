import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';
import cfn from '../../public/utils/commonFun'
import {Icon} from 'native-base'
import {connect} from 'react-redux';
import {getOpenCode} from '../../app/actions/kaijiang'
class jingjicai extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            items:null,
            isRefreshing: true,
        }
    }

    componentDidMount() {
        //console.warn('componentDidMount')

        setTimeout(()=>{
            this.setState({isRefreshing: false})
        },this.props.stateCode == 1 ? 2000 : 0)

    }

    setData(data) {

        let items = [];
        for(let i = 0; i < data.length; i++) {
            let {name,expect,openCode,time} = data[i];
            let codes = [];

            openCode = openCode.split(',');
            for(let j = 0; j < openCode.length; j++) {
                codes.push(
                    <View
                        key={''+i+j}
                        style={styles.itemCode}>
                        <Text style={styles.codeText}>{openCode[j]}</Text>
                    </View>
                )
            }


            items.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={()=>{cfn.goToPage(this.props.parentThis,'kaijiangDetail',{data:data[i],name:name})}}
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
            )
        }
        return items;
    }

    renderItems(props) {
        let {data, stateCode, stateText} = props;
        if(data) {
            data = data.slice(17,20);
            return this.setData(data);
        }else {
            return(
                <TouchableOpacity
                    style={{alignSelf:'center',marginTop:cfn.deviceWidth()/3}}
                    activeOpacity={0.8}
                    onPress={()=>this.props.stateCode == 2 && getOpenCode(this.props.dispatch)}>
                    <Text style={{fontSize:15,color:'#888'}}>{stateText}</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.stateCode == 0 || this.state.isRefreshing}
                            //onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                    style={styles.scrollView}>
                    {!this.state.isRefreshing && this.renderItems(this.props)}
                </ScrollView>
            </View>
        )
    }

}
function setData(store) {
    return ({
        data: store.kaijiang.data,
        stateText: store.kaijiang.stateText,
        stateCode: store.kaijiang.stateCode,
    })
}
export default connect(setData)(jingjicai);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f5f5f5'
    },
    scrollView: {
        backgroundColor:'#f5f5f5'
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
        width:cfn.picWidth(30),
        height:cfn.picWidth(60),
        backgroundColor:'#7CBD7F',
        alignItems:'center',
        justifyContent:'center',
        marginRight:2
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