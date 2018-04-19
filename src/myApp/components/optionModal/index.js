/**
 * Created by timxiong on 2017/7/4.
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableOpacity,
    Platform,
    StatusBar
} from 'react-native';

import cfn from '../../public/utils/commonFun'
import {Icon} from 'native-base'

// import collection_true from '../imgs/collection_icon_true.png';
// import collection_false from '../imgs/collection_icon_false.png';
// import refresh from '../imgs/refresh_icon.png'

export default class modal extends PureComponent {

    static defaultProps={
        visible:false,
        onPressOption:()=>{},
        optionData:[],
    };

    constructor(props){
        super(props);
        this.state={
            visible:false,
            optionView:null,
        };

        this.setModalVisible = this._setModalVisible;
        this.renderOption = this._renderOption;
        //this.onPressItem = this._onPressItem;

    }

    componentDidMount() {
        this._renderOption();
    }

    _setModalVisible(visible) {
        this.setState({
            visible:visible
        })
    }

    onPressOption(index,option,isSelected) {

        if(index != 666) { // 666是刷新按钮
            this.optionData[index].isSelected = !isSelected;
        }

        this._setModalVisible(false);
        this.props.onPressOption(index,option,!isSelected);

        this._renderOption(this.optionData);
    }

    _renderOption(optionData) {
        this.optionData = optionData || this.props.optionData;
        let optionView = this.optionData.map((option,index)=>{
            return <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.itemContent}
                onPress={()=>this.onPressOption(index,option.option,option.isSelected)}
            >
                <Icon name={option.icon}
                      style={[styles.itemIcon,{color:option.isSelected ? '#e22' : '#888'}]}
                />
                <Text style={[styles.itemText,{color: option.isSelected ? '#e22' : '#888'}]}>
                    {option.option}
                </Text>
            </TouchableOpacity >
        });

        this.setState({optionView:optionView});

    }

    render() {
        return (
            <Modal
                //animationType={"fade"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {}}
            >
                <StatusBar hidden={false}  translucent= {true} backgroundColor={'rgba(0,0,0,0.5)'} barStyle={'light-content'}/>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>this.setModalVisible(false)}
                    style={styles.container}>
                    <View
                        style={{width:cfn.picWidth(200),
                            minHeight:cfn.picHeight(80),
                            alignItems:"center",
                            justifyContent:'center',
                            borderRadius:5,
                            marginTop: Platform.OS == 'ios' ? cfn.picHeight(150) : cfn.picHeight(100),
                            marginRight: cfn.picWidth(20),
                            backgroundColor:'#fff',zIndex:3}}>
                        {/*<TouchableOpacity*/}
                            {/*activeOpacity={0.8}*/}
                            {/*style={styles.itemContent}*/}
                            {/*onPress={()=>this.onPressOption(0,true)}*/}
                        {/*>*/}
                            {/*<Icon name="md-star"*/}
                                   {/*style={{width:cfn.picWidth(40),resizeMode:'contain', marginRight:cfn.picWidth(10)}}*/}
                            {/*/>*/}
                            {/*<Text style={[styles.itemText,{color:'#888'}]}>*/}
                                {/*收藏*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity >*/}

                        {this.state.optionView}
                        {/*<TouchableOpacity*/}
                            {/*activeOpacity={0.8}*/}
                            {/*style={styles.itemContent}*/}
                            {/*onPress={()=>this.onPressOption(666,'刷新','')}*/}
                        {/*>*/}
                            {/*<Icon name={'md-refresh'}*/}
                                  {/*style={[styles.itemIcon,{color:'#888'}]}*/}
                            {/*/>*/}
                            {/*<Text style={[styles.itemText,{color: '#888'}]}>*/}
                                {/*{"刷新"}*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity >*/}
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    itemContent: {
        width:cfn.picWidth(180),
        height: cfn.picHeight(80),
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    itemText: {
        textAlign: 'center',
        alignSelf:'center',
        color:'#888',
        fontSize:16
    },
    itemIcon: {
        width:cfn.picWidth(60),
        textAlign:'center',
        fontSize:25,
        marginRight:cfn.picWidth(10),
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});