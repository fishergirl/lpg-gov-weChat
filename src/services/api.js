import request from '../utils/request';

export const getWeixinJapiTicket = data => request({ url:'/api/wechat/js/api/config', method: 'POST', data });
export const queryBtSourceRes = data => request({ url:'/api/wechat/bottle/source/btCode', method: 'GET', data });
export const queryArticle = data => request({ url:'/api/wechat/bottle/affiche/detail', method: 'GET', data });
export const queryArticles = data => request({ url:'/api/wechat/bottle/affiche', method: 'GET', data });
export const queryScanRes = data => request({ url:'/api/wechat/bottle/source/barCode', method: 'POST', data });

export const queryScanBtSourceRes = data => request({ url:'/mock/scanBtSource/res', method: 'GET', data });
