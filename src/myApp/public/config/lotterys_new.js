/**
 * Created by tmxiong on 2018/3/11.
 */
import {lotteryIcon as icon} from './images'
module.exports = [
    {
        type: '竞技彩',
        lottery: [
            {
                name: '竞彩足球',
                icon: icon.jczq,
                code: 'jczq',
                url: 'http://m.aicai.com/b/zchome.do?agentId=1&vt=5'
            },
            {
                name: '竞足单关',
                icon: icon.jzdg,
                code: 'jzdg',
                url: 'http://m.aicai.com/b/zcdg.do?agentId=1&vt=5'
            },
            {
                name: '竞彩篮球',
                icon: icon.jclq,
                code: 'jclq',
                url: 'http://m.aicai.com/bet/lc.do?agentId=1&vt=5'
            },
            {
                name: '篮彩单关',
                icon: icon.lcdg,
                code: 'lcdg',
                url: 'http://m.aicai.com/bet/lc.do?agentId=1&vt=5'
            },
            {
                name: '胜负彩',
                icon: icon.sfc,
                code: 'sfc',
                url: 'http://m.aicai.com/bet/sfc.do?agentId=1&vt=5'
            },
            {
                name: '任选九场',
                icon: icon.rx9c,
                code: 'rx9c',
                url: 'http://m.aicai.com/bet/rx9.do?agentId=1&vt=5'
            },
        ]
    },
    {
        type: '高频彩',
        lottery: [
            {
                name: '时时彩',
                icon: icon.ssc,
                code: 'ssc',
                url: 'http://m.aicai.com/bet/cqssc.do?agentId=1&vt=5'
            },
            {
                name: '粤11选5',
                icon: icon.y11x5,
                code: 'y11x5',
                url: 'http://m.aicai.com/bet/gd11x5.do?agentId=1&vt=5'
            },

            {
                name: '湖北快3',
                icon: icon.hbk3,
                code: 'hbk3',
                url: 'http://m.aicai.com/bet/hbk3.do?agentId=1&vt=5'
            },
            {
                name: '新快3',
                icon: icon.xk3,
                code: 'xk',
                url: 'http://m.aicai.com/bet/k3.do?agentId=1&vt=5'
            },
            {
                name: '快乐扑克3',
                icon: require('../asset/imgs/lotteryIcons_new/klpk.png'),
                code: icon.klpk,
                url: 'http://m.aicai.com/bet/klpk.do?agentId=1&vt=5'
            },
            {
                name: '幸运赛车',
                icon: require('../asset/imgs/lotteryIcons_new/xysc.png'),
                code: icon.xysc,
                url: 'http://m.aicai.com/bet/xysc/index.do?agentId=1&vt=5'
            },
            {
                name: '11运夺金',
                icon: icon.syydj,
                code:'syydj',
                url: 'http://m.aicai.com/bet/sd11x5.do?agentId=1&vt=5'
            },

        ]
    },
    {
        type: '数字彩',
        lottery: [
            {
                name: '福彩3D',
                icon: icon.fc3d,
                code: 'fc3d',
                url: 'http://m.aicai.com/bet/fc3d.do?agentId=1&vt=5'
            },
            {
                name: '双色球',
                icon: icon.ssq,
                code: 'ssq',
                url: 'http://m.aicai.com/bet/ssq.do?agentId=1&vt=5'
            },
            {
                name: '大乐透',
                icon: icon.dlt,
                code: 'dlt',
                url: 'http://m.aicai.com/bet/dlt.do?agentId=1&vt=5'
            },

        ]
    }
];