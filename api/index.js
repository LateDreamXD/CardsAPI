const moment = require("moment");

var param, width = 500;
const prefix = "https://api.xecades.xyz";
const offset = [0, 0, 4.8, 2.7];
const icons = ["alipay", "bilibili", "codepen", "csdn", "douban", "email", "facebook", "github", "google", "pixiv", "qq", "quora", "taobao", "twitter", "wechat", "weibo", "zhihu"];

function getBG() {
    var ret = 1;
    if (param.get("bg") && +param.get("bg") >= 1 && +param.get("bg") <= 3)
        ret = +param.get("bg");
    return ret;
}

function getBGOffset() {
    return offset[getBG()];
}

function getSocial() {
    var can = [];
    var ret = "";

    for (var key of param.keys()) {
        if (icons.includes(key))
            can.push(key);
    }

    if (can.length == 0) {
        width = 320;
        return "";
    }

    var margin = 40;
    var sp = (170 - margin) / can.length;

    for (var i = 0; i < can.length; i++) {
        ret += `
        <g class="item">
            <image class="icon" transform="translate(350 ${margin + sp * i + sp / 2 - 16})" href="${prefix}/res/icon/${can[i]}.svg"/>
            <text class="text" transform="translate(370 ${margin + 12 + sp * i + sp / 2 - 16})">${param.get(can[i])}</text>
        </g>`;
    }

    return ret;
}

function getDur() {
    var date = param.get("date") || "";
    if (!moment(date).isValid())
        date = `${moment().year()}-12-31`;
    return -moment().diff(date, 'd');
}

function getStr() {
    var date = param.get("date") || "";
    if (!moment(date).isValid())
        return ` ${moment().year()} 年末`;
    if (param.get("str"))
        return param.get("str");
    return "一个特殊日期";
}

module.exports = (req, res) => {
    moment.locale("zh-cn");
    param = new URLSearchParams(req.url.split("/api")[1]);

    res.setHeader("Content-Type", "image/svg+xml");
    const {
        background = `${prefix}/res/bg/${getBG()}.png`,
        bg_offset = 250 - getBGOffset(),
        socialText = getSocial(),
        dayOfYear = moment().dayOfYear(),
        year = moment().year(),
        month = moment().format('M'),
        day = moment().format('D'),
        weekday = moment().format('dddd'),
        toStr = getStr(),
        toDur = getDur(),
        quote = param.get("quote") || "✨✨"
    } = req.query;

    res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} 180">
    <defs>
        <style>
            svg { background-color: #fff; }
            #image .line { fill: none; stroke: #555; stroke-miterlimit: 10; stroke-width: 0.5px; stroke-linecap: round; }
            #image .bg { width: 200px; height: 250px; }
            #detail .text { font-size: 12px; font-weight: lighter; }
            #contact .item .icon { width: 16px; height: 16px; }
            #contact .item .text { font-size: 10px; fill: #333; font-weight: lighter; }
            #quote .text { font-size: 10px; fill: #333; font-weight: lighter;}
        </style>
    </defs>
    <title>Postcard | Xecades</title>
    
    <g id="image">
        <line class="line" x1="250.5" y1="20" x2="250.5" y2="170"/>
        <image class="bg" transform="translate(${bg_offset} 32) scale(0.5)" href="${background}"/>
    </g>
    
    <g id="detail">
        <text class="text" transform="translate(20 35)">欢迎您朋友 🎉</text>
        <text class="text" transform="translate(20 65)">今天是 ${month} 月 ${day} 日，${weekday}</text>
        <text class="text" transform="translate(20 95)">也是 ${year} 年的第 ${dayOfYear} 天</text>
        <text class="text" transform="translate(20 125)">距离${toStr}还有 ${toDur} 天</text>
        <text class="text" transform="translate(20 155)">${quote}</text>
    </g>
    
    <g id="contact">${socialText}</g>
    </svg>`);
};
