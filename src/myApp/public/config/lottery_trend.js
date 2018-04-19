/**
 * Created by timxiong on 2018/3/16.
 */
import {lotteryIcon as icon} from './images'
module.exports = [
    {
        name:'时时彩',
        code:'cqssc',
        icon:icon.ssc,
        desc:'每天120期，00:05起每5、10、\n5分钟一期',
        menu:[
            {
                title:'基本走势',
                url:'http://m.aicai.com/zst/cqssc/5xjbzs.do?vt=5&clientType=0'
            },
            // {
            //     title:'三星遗漏',
            //     url:'http://m.aicai.com/zst/cqssc/yl/3xzhiyl.do?vt=5&clientType=0'
            // },
            // {
            //     title:'二星遗漏',
            //     url:'http://m.aicai.com/zst/cqssc/yl/2xzhiyl.do?vt=5&clientType=0'
            // }
        ]
    },
    {
        name:'双色球',
        code:'ssq',
        icon:icon.ssq,
        desc: '每周二、四、日的21:15开奖',
        menu:[
            {
                title:'基本走势',
                url:'http://m.aicai.com/zst/ssq.do?vt=5&clientType=0'
            },
            {
                title:'冷热分析',
                url:'http://m.aicai.com/zst/ssq/lr.do?vt=5&clientType=0'
            },
            // {
            //     title:'投注倾向',
            //     url:'http://m.aicai.com/zst/ssq/betTrend.do?vt=5&clientType=0'
            // },
            {
                title:'大小奇偶',
                url:'http://m.aicai.com/zst/ssq/dxjo.do?vt=5&clientType=0'
            },
            {
                title:'蓝球走势',
                url:'http://m.aicai.com/zst/ssq.do?vt=5&flag=blue_zs&clientType=0'
            },
            {
                title:'历史同期',
                url:'http://m.aicai.com/zst/ssq/history.do?vt=5&clientType=0'
            },
            {
                title:'历史开奖',
                url:'http://m.aicai.com/zst/ssq/historyzs.do?vt=5&clientType=0'
            },
        ]
    },
    {
        name:'大乐透',
        code:'dlt',
        icon:icon.dlt,
        desc:'每周一、三、六的20:30开奖',
        menu:[
            {
                title:'基本走势',
                url:'http://m.aicai.com/zst/dlt.do?vt=5&clientType=0'
            },
            {
                title:'冷热分析',
                url:'http://m.aicai.com/zst/dlt/lr.do?vt=5&clientType=0'
            },
            // {
            //     title:'投注倾向',
            //     url:'http://m.aicai.com/zst/dlt/betTrend.do?vt=5&clientType=0'
            // },
            {
                title:'大小奇偶',
                url:'http://m.aicai.com/zst/dlt/dxjo.do?vt=5&clientType=0'
            },
            {
                title:'后区走势',
                url:'http://m.aicai.com/zst/dlt.do?vt=5&flag=blue_zs&clientType=0'
            },
            {
                title:'历史同期',
                url:'http://m.aicai.com/zst/dlt/history.do?vt=5&clientType=0'
            },
            {
                title:'历史开奖',
                url:'http://m.aicai.com/zst/dlt/historyzs.do?vt=5&clientType=0'
            },
        ]
    },
    {
        name:'福彩3D',
        code:'fc3d',
        desc:'每天的21:20开奖',
        icon:icon.fc3d,
        menu:[
            {
                title:'定位走势',
                url:'http://m.aicai.com/zst/fc3d.do?vt=5&clientType=0'
            },
            {
                title:'和值走势',
                url:'http://m.aicai.com/zst/fc3d/hzzs.do?vt=5&clientType=0'
            },
            {
                title:'跨度/形态',
                url:'http://m.aicai.com/zst/fc3d/kdzs.do?vt=5&clientType=0'
            },
            {
                title:'大小奇偶',
                url:'http://m.aicai.com/zst/fc3d/dxjo.do?vt=5&clientType=0'
            },
            {
                title:'不定位走势',
                url:'http://m.aicai.com/zst/fc3d/bdwzs.do?vt=5&clientType=0'
            },
            {
                title:'历史开奖',
                url:'http://m.aicai.com/zst/fc3d/historyzs.do?vt=5&clientType=0'
            },
        ]
    },
    {
        name:'排列3',
        code:'pl3',
        icon:icon.pl3,
        desc:'每天的20:30开奖',
        menu:[
            {
                title:'定位走势',
                url:'http://m.aicai.com/zst/pl3/dwzs.do?vt=5&clientType=0'
            },
            {
                title:'和值走势',
                url:'http://m.aicai.com/zst/pl3/hzzs.do?vt=5&clientType=0'
            },
            {
                title:'大小奇偶',
                url:'http://m.aicai.com/zst/pl3/dxjo.do?vt=5&clientType=0'
            },
            {
                title:'不定位走势',
                url:'http://m.aicai.com/zst/pl3/bdwzs.do?vt=5&clientType=0'
            },
            {
                title:'历史开奖',
                url:'http://m.aicai.com/zst/pl3/historyzs.do?vt=5&clientType=0'
            },
        ]
    },
    {
        name:'排列5',
        code:'pl5',
        icon:icon.pl5,
        desc:'每天的20:30开奖',
        menu:[
            {
                title:'直选走势',
                url:'http://m.aicai.com/zst/pl5.do?vt=5&clientType=0'
            },
            {
                title:'和值走势',
                url:'http://m.aicai.com/zst/pl5/sum.do?vt=5&clientType=0'
            },
            {
                title:'大小奇偶',
                url:'http://m.aicai.com/zst/pl5/dxjo.do?vt=5&clientType=0'
            },
            {
                title:'除3余数',
                url:'http://m.aicai.com/zst/pl5/div3.do?vt=5&clientType=0'
            },
        ]
    },
    {
        name:'十一运夺金',
        code:'11ydj',
        icon:icon.syydj,
        desc:'每天87期，08:35起每10分钟一期',
        menu:[
            {
                title:'基本走势',
                url:'http://m.aicai.com/zst/sd11x5/jbzs2.do?vt=5&clientType=0'
            },
            // {
            //     title:'任三遗漏',
            //     url:'http://m.aicai.com/zst/sd11x5/r3mayl.do?vt=5&clientType=0'
            // },
            {
                title:'任五遗漏',
                url:'http://m.aicai.com/zst/sd11x5/r5mayl.do?vt=5&clientType=0'
            }
        ]
    },
    {
        name:'吉林快3',
        code:'jlk3',
        icon:icon.xk3,
        desc:'每天87期，08:29起每9分钟一期',
        menu:[
            {
                title:'基本走势',
                url:'http://m.aicai.com/zst/xk3/jbzs.do?vt=5&clientType=0'
            },
            {
                title:'和值走势',
                url:'http://m.aicai.com/zst/xk3/hzzs.do?vt=5&clientType=0'
            },
            {
                title:'号码遗漏',
                url:'http://m.aicai.com/zst/xk3/hmyl.do?vt=5&clientType=0'
            }
        ]
    },

];