/**
 * Created by timxiong on 2017/9/6.
 */
// SyntaxError: Unexpected token < in JSON at position 0
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
    ListView
} from 'react-native';
import cfn from '../../public/utils/commonFun';
import config from '../../public/config/config'
import urls from '../../public/config/urls'
export default class articles extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false,
            isRefreshing: false,
            ds: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1 !== r2})
        };
        this.nowPage = 0;

    }

    static defaultProps = {
        _this: null,
    };


    componentDidMount() {
        // true 为首次加载
        // false 为上拉加载
        this.getData(true);
        //onBackAndroid.bindHardwareBackPress(this);
    }


    getData(showLoading) {

        this.setState({
            isLoading: showLoading,
            isError: false,
        });


        let url = urls.getArticle('csxw', 0);
        fetch(url)
            .then((res)=>res.text())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))

    }

    setError(error) {
        this.setState({
            isLoading: false,
            isError: true,
            isRefreshing: false,
        });
        // console.log(error);
    }

    setData(data) {
        data = data.substring(7,data.length-1);
        data = JSON.parse(data);
        this.setState({
            isError:false,
            isLoading:false,
            isRefreshing:false,
            data: data.data.dataConfig.data,
            ds: this.state.ds.cloneWithRows(data.data.dataConfig.data)
        });
    }

    goToDetail(route, params) {
        this.props.navigation.navigate(route, params);
    }

    _renderRow(rowData) {

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>cfn.goToPage(this.props._this,'articleDetail', {
                        name: '彩市资讯',
                        rowData: rowData,
                        url: urls.getArticleDetail(rowData.id),
                        from:'index', // 来自首页
                        title: rowData.title
                    }
                )}
                style={styles.item_container}>
                <View style={styles.item_text_container}>
                    <Text
                        style={styles.item_title}>{rowData.title}</Text>
                    <Text style={styles.item_source}>{config.appName}</Text>
                    <Text style={styles.item_time}>{new Date(rowData.publishTime).toLocaleString().split(' ')[0]}</Text>
                </View>
                <Image
                    style={styles.item_img}
                    source={{uri: rowData.imageList[0]}}/>
            </TouchableOpacity>
        )

    }

    _onRefresh() {
        this.setState({
            isRefreshing: true,
        });
        this.getData(false);
    }

    render() {
        return (
                <View
                    style={styles.container}

                >
                    {this.state.ds.getRowCount() > 0 ? <ListView
                        dataSource={this.state.ds}
                        renderRow={this._renderRow.bind(this)}
                    /> :
                    <TouchableOpacity
                        style={{width:cfn.deviceWidth(),height:50,alignItems:'center',justifyContent:'center',marginTop:20}}
                        activeOpacity={0.8} onPress={()=>this.getData(false)}>
                        <Text>{this.state.isError ? '没加载出来，点击重试' : '正在加载...'}</Text>
                    </TouchableOpacity>}
                </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        minHeight:cfn.picHeight(200),
    },
    cp_btn_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(170),
        flexDirection: 'row',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    border_right: {
        width: 1,
        height: cfn.picHeight(80),
        backgroundColor: '#ddd'
    },
    cp_btn: {
        width: (cfn.deviceWidth() - cfn.picWidth(40)) / 3,
        height: cfn.picHeight(170),
        alignItems: 'center',
        justifyContent: 'center'
    },
    cp_btn_img: {
        width: (cfn.deviceWidth() - cfn.picWidth(40)) / 3,
        height: cfn.picHeight(150),
        resizeMode: 'stretch',
        borderRadius: 7
    },

    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    item_text_container: {
        flexWrap: 'wrap',
        width: cfn.deviceWidth() - cfn.picWidth(180 + 40),
        paddingLeft: cfn.picWidth(20),
        height: cfn.picHeight(120),
    },
    item_source: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        left: cfn.picWidth(20),
        bottom: 0
    },
    item_time: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        right: cfn.picWidth(20),
        bottom: 0
    },
    item_title: {
        color: '#444'
    },
    item_img: {
        width: cfn.picWidth(180),
        height: cfn.picHeight(120),
        marginLeft: cfn.picWidth(20),
    }

});