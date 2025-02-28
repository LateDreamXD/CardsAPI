import * as vue from 'https://s4.zstatic.net/ajax/libs/vue/3.5.13/vue.esm-browser.prod.min.js';

const socials = ['bilibili', 'discord', 'email', 'facebook', 'github', 'google', 'microsoft',
	'phone', 'pixiv', 'qq', 'site', 'telegram', 'twitch', 'twitter', 'wechat', 'weibo',
	'youtube', 'zhihu'],
	games = ['arcaea', 'arknights', 'blue_archive', 'dont_starve',
	'epic', 'girls_frontline', 'mihoyo', 'minecraft', 'musedash', 'phigros', 'steam', 'xbox'];

const updatePreview = (key, value) => {
	const preview = document.querySelector('#view>img');
	preview.src += `&${key}=${encodeURIComponent(value)}`;
}

vue.createApp({
	setup() {
		const bgColor = vue.ref('#333333');
		const fontColor = vue.ref('#f5f5f5');
		return {
			bgColor,
			fontColor,
			// ----
			socials, games,
			pics: [
				{'index': '1', 'name': '雾雨魔理沙(东方Project, 默认)', 'selected': true},
				{'index': '2', 'name': '博丽灵梦(东方Project)'},
				{index: 3, name: '芙兰朵露(东方Project)'},
				// ---
				{index: 4, name: '猫羽雫(Pixiv)'}
			],
			// ----
			updatePreview
		}
	}
}).mount('#app');