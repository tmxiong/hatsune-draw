
// https://m.qmcai.com/hd/caipiaoclass/index.html?fromType=cpkt_1002&hideTab=true
let secret = 'eb7f104bd5c44f5fb6862b3b9a4b31af';
let timeStamp = function () {
    return new Date().getTime();
};

// 福彩3D 双色球 大乐透开奖
exports.getOpenCode = () =>
    'http://m.zhcw.com/clienth5.do?transactionType=8010&busiCode=300105&cache=yes&src=0000100001%7C6000003060'

// 5条资讯
exports.getTitleNews = () =>
'http://m.zhcw.com/clienth5.do?transactionType=8010&busiCode=300104&cache=yes&src=0000100001%7C6000003060'

// 福彩3d/高频彩/数字彩的列表链接
exports.getArticle = function (type,offset) {
    // type = fc/gpc/szc/csxw
    return 'https://m.qmcai.com/support/cmsv2/information/queryContent?parameter=%7B%22command%22:%22queryContent%22,%22categoryId%22:%22'+ type +'%22,%22offset%22:'+ offset +',%22size%22:15,%22platform%22:%22html%22,%22version%22:%225.2.16%22%7D&callback=jsonp5'
};

// 福彩3d/高频彩/数字彩的详情链接
exports.getArticleDetail = function (id) {
    return 'https://m.qmcai.com/zixun/detail.html?_id=' + id +'&time=' + timeStamp();
};

// 彩票显示所有彩票最新一期开奖号码
exports.getNewestLotteryCode = function (id) {
    return 'https://route.showapi.com/44-1?code='+ id +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};

// 显示某个彩种的历史开奖
exports.getHistoryLotteryCode = function (id) {
    return 'https://route.showapi.com/44-2?code='+ id +'&count=20&endTime='+ new Date().Format('yyyy-MM-dd hh:mm:ss') +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};

//查询某一期的彩票开奖号码
exports.getSearchLotteryCode = function (issue, id) {
    return 'https://route.showapi.com/44-3?code='+ id +'&expect='+ issue +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};

// 彩票玩法介绍
exports.getHelp = function (type) {
    if(type.match('https')) {
        return type;
    }else{
        return 'http://pimg1.126.net/swdp/game_rule/'+ type +'.html?time='+timeStamp();
    }

};