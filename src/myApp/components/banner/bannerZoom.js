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
    Text,
} from 'react-native';

import commonFn from '../../public/utils/commonFun';
export default class Banner extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.nextPage = 1;
        this.isAutoScroll = true;
        this.oldOffsetX = 0;

    };

    static defaultProps = {
        // 页面高度
        pageHeight: commonFn.picHeight(300),
        // 页面宽度
        pageWidth: commonFn.deviceWidth()-commonFn.picWidth(80),
        // 两个页面之间的宽度
        pageGap: commonFn.picWidth(10),
        bannerData: [null,null,null],
        autoScroll: true,
        //bannerList:[{imgsrc:require('../imgs/banner/banner_default.png'),title:'数据正在加载...'}],
    };

    componentDidMount() {
        if(this.props.autoScroll) {
            this.startScroll(true);
        }

    }

    componentWillUnmount() {
        clearInterval(this.scrollTimer);
    }

    renderBanner() {
        const {bannerData,pageWidth,pageHeight,pageGap} = this.props;
        // 第一页和最后一页比较特殊
        let margin = (commonFn.deviceWidth() - pageWidth) / 2;
            let arr = [];
            for (let i = 0; i < bannerData.length; i++) {

                let marginStyle = {
                    marginLeft: pageGap/2,
                    marginRight: pageGap/2,
                };

                if(i == 0) {
                    marginStyle.marginLeft = margin;
                } else if (i == bannerData.length - 1) {
                    marginStyle.marginRight = margin;
                }

                arr.push(
                    <View
                        key={i}
                        style={{width:pageWidth,height:pageHeight,backgroundColor:'#fff',borderRadius:10,
                            ...marginStyle}}
                        cardElevation={4}
                        cardMaxElevation={0}
                        cornerRadius={6}>

                        {bannerData[i]}

                    </View>);
            }
            return arr;


    }

    onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        const {pageWidth,pageGap} = this.props;
        //this.nextPage = Math.round(offsetX / (pageWidth + pageGap)*2);
        this.nextPagePixel = offsetX / commonFn.deviceWidth();
        offsetX > this.oldOffsetX ?
            this.nextPage = Math.round(offsetX / (pageWidth + pageGap)*2) :
            this.nextPage = Math.round(offsetX / (pageWidth + pageGap)/2);
        this.oldOffsetX = offsetX;
        //console.log(this.nextPage);
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

    onTouchStart(e) {
        this.isAutoScroll = false;
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
    }


    startScroll(showAnim = true) {
        const {pageWidth,pageGap} = this.props;
        this.isAutoScroll = true;
        this.scrollView.scrollTo({x: this.nextPage * (pageWidth+pageGap)}, showAnim);
        this.scrollTimer = setInterval(()=> {
            this.scrollView.scrollTo({x: this.nextPage * (pageWidth+pageGap)}, showAnim);
            this.nextPage++;
            if (this.nextPage >= this.props.bannerData.length) {
                this.nextPage = 0;
            }
        }, 3000);

    }

    render() {
        return (
            <View style={[styles.container,this.props.style]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={false}
                    onScroll={this.onScroll.bind(this)}
                    onTouchStart={this.onTouchStart.bind(this)}
                    onScrollEndDrag={this.startScroll.bind(this)}
                    onTouchEnd={()=>this.startScroll.bind(this)}
                    ref={(ref)=>this.scrollView = ref}
                >
                    {this.renderBanner()}
                </ScrollView>
            </View>
        );
    }
}



module.exports = Banner;

const styles = StyleSheet.create({
    container: {
        width: commonFn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center'
        //height: commonFn.picHeight(365),
        // marginBottom:-1
    },
});