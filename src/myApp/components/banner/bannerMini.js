/*****
 * 首页轮播图
 * ****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native';

import commonFn from '../../public/utils/commonFun';
import Indicator from './Indicator';

export default class Banner extends PureComponent {
    componentDidMount() {
        this.startScroll();
    }

    componentWillUnmount() {
        clearInterval(this.scrollTimer);
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.nextPage = 0;
        this.isAutoScroll = true;
    };

    static defaultProps = {
        bannerData:[1,2,3],
    };

    renderBanner() {
        const {bannerData} = this.props;
        if (bannerData) {
            let arr = [];
            for (let i = 0; i < bannerData.length; i++) {
                let item = bannerData[i];
                let view = (
                    <View key={i} style={styles.container}>
                        <View style={styles.content}>

                        </View>
                    </View>
                );

                if(bannerData[i].imageList) {
                    view = (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('ArticleDetail', {
                                    id: item.id,
                                    //name: item.title,
                                    name: '3D推荐',
                                    rowData: item,
                                    type:'fc'
                                }
                            )}
                            style={styles.container}>
                            <View style={styles.content}>
                                <Image
                                    style={styles.item_img}
                                    source={{uri: item.imageList[0]}}/>
                                <Text
                                    style={styles.item_title}>{item.title}</Text>
                                <View style={styles.line_col}/>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={()=>this.goToPage('ArticleList',{type:'fc', name:'3D推荐'})}
                                    style={styles.more_btn}>
                                    <Text style={styles.more_text}>更多>></Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }
                arr.push(view);
            }
            return arr;
        }

    }

    goToPage(route,params) {

        this.props.navigation.navigate(route,params);

    }

    onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        this.nextPage = Math.round(offsetX / (commonFn.deviceWidth()-commonFn.picWidth(40)));
        this.nextPagePixel = offsetX / (commonFn.deviceWidth()-commonFn.picWidth(40));

        //指示器滚动效果--自动滚动
        // if (this.isAutoScroll) {
        //     this.ref.indecator.setNativeProps(
        //         {style: {right: this.ref.rightX - this.nextPage * commonFn.picWidth(24)}}
        //     )
        // } else {
        //     //指示器滚动效果--手动滑动
        //     this.ref.indecator.setNativeProps(
        //         {style: {right: this.ref.rightX - this.nextPagePixel * commonFn.picWidth(24)}}
        //     )
        // }
    }

    onTouchStart() {
        this.isAutoScroll = false;
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
    }

    startScroll() {
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
        this.isAutoScroll = true;
        this.scrollTimer = setInterval(()=> {
            this.scrollView.scrollTo({x: this.nextPage * (commonFn.deviceWidth()-commonFn.picWidth(40))}, true);
            this.nextPage++;
            if (this.nextPage >= this.props.bannerData.length) {
                this.nextPage = 0;
            }
        }, 3000);
    }

    render() {
        return (

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onScroll={this.onScroll.bind(this)}
                onTouchStart={()=>this.onTouchStart()}
                onScrollEndDrag={()=>this.startScroll()}
                onTouchEnd={()=>this.startScroll()}
                ref={(ref)=>this.scrollView = ref}
            >
                {this.renderBanner()}
            </ScrollView>

        );
    }
}



module.exports = Banner;

const styles = StyleSheet.create({
    container: {
        width: commonFn.deviceWidth()-commonFn.picWidth(40),
        height: commonFn.picHeight(140),
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    content: {
        width:commonFn.deviceWidth()-commonFn.picWidth(80),
        height:commonFn.picHeight(120),
        borderRadius:commonFn.picHeight(60),
        backgroundColor:'#f3d5d5',
        flexDirection: 'row',
        alignItems:'center'
    },
    item_img: {
        width: commonFn.picWidth(80),
        height:commonFn.picWidth(80),
        borderRadius:commonFn.picWidth(40),
        marginLeft:commonFn.picWidth(20)
    },
    item_title: {
        width:commonFn.deviceWidth()-commonFn.picWidth(80 + 10 + 10 + 100 + 100),
        marginLeft:commonFn.picWidth(10),
        color:'#be5457'
    },
    line_col: {
        height:commonFn.picHeight(80),
        width:1,
        backgroundColor:'#e5b9ba',
        marginLeft:commonFn.picWidth(10)
    },
    more_btn: {
        height:commonFn.picHeight(100),
        justifyContent:'center'
    },
    more_text: {
        fontSize: 12,
        marginLeft:commonFn.picWidth(10),
        color:'#e8a3a5'
    }
});