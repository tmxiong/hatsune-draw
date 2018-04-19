/*****
 * 首页轮播图
 * ****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity
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
        bannerList:[],
    };

    renderBanner() {
        let bannerList = this.props.bannerList;
        if (bannerList) {
            let arr = [];
            for (let i = 0; i < bannerList.length; i++) {
                arr.push(<TouchableOpacity
                    key={i}
                    activeOpacity={0.9}
                onPress={()=>this.goToDetail(i)}
                >
                        <Image style={styles.imageStyle} source={bannerList[i]}/>
                    </TouchableOpacity>);
            }
            return arr;
        }

    }

    goToDetail(index) {


        if(index == 1) {
            commonFn.goToPage(this.props._this,'trend',{url:'http://m.aicai.com/zst/cqssc/5xjbzs.do?vt=5&clientType=0',name:'基本走势'})
        } else if(index == 0) {
            commonFn.goToPage(this.props._this,'touzhuOther',{
                url: 'https://m.aicai.com/f/filterCode.do?gameId=201&agentId=1&vt=5',
                name: '精品杀码'
            })
        } else if(index == 2) {
            commonFn.goToPage(this.props._this,'article',{name: '更多彩市资讯'})
        }
    }

    onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        this.nextPage = Math.round(offsetX / commonFn.deviceWidth());
        this.nextPagePixel = offsetX / commonFn.deviceWidth();

        //指示器滚动效果--自动滚动
        if (this.isAutoScroll) {
            this.ref.indecator.setNativeProps(
                {style: {right: this.ref.rightX - this.nextPage * commonFn.picWidth(24)}}
            )
        } else {
            //指示器滚动效果--手动滑动
            this.ref.indecator.setNativeProps(
                {style: {right: this.ref.rightX - this.nextPagePixel * commonFn.picWidth(24)}}
            )
        }
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
            this.scrollView.scrollTo({x: this.nextPage * commonFn.deviceWidth()}, true);
            this.nextPage++;
            if (this.nextPage >= this.props.bannerList.length) {
                this.nextPage = 0;
            }
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
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
                <Indicator
                    pointCount={this.props.bannerList.length}
                    ref={(ref)=>this.ref = ref}
                />
            </View>
        );
    }
}



module.exports = Banner;

const styles = StyleSheet.create({
    container: {
        width: commonFn.deviceWidth(),
        height: commonFn.picHeight(365),
        borderBottomColor:'rgba(255,255,255,0.7)',
        borderBottomWidth:1,
        // marginBottom:-1
    },
    imageStyle: {
        width: commonFn.deviceWidth(),
        height: commonFn.picWidth(365),
    },
});