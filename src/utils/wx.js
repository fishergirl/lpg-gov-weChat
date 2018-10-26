import {getWeixinJapiTicket, shopWxPrePay, updateOrderPayStatus} from '../services/api'
import queryString from "query-string";
import { Toast } from 'antd-mobile';

export const wxConfig = async ()=>{
  const wx = window.wx;
  // const index = window.location.href.indexOf('#');
  const url = window.location.href.split('#')[0];
  // const queryIndex = window.location.href.indexOf('?');
  // const query = queryString.parse(window.location.href.substring(queryIndex+1));
  // let appid = query.appid;
  // if (typeof appid === 'undefined') {
  //   appid = localStorage.getItem('appid');
  // }
  const res = await getWeixinJapiTicket({url});
  const jsapiConfig = res.data;
  if(Object.keys(jsapiConfig).length === 0){
    Toast.fail('微信权限配置失败',2,null,false);
    return
  }
  wx.config({
    debug: false,
    appId: 'wx4089b52792c013e9',
    jsApiList: ['scanQRCode'],
    timestamp: jsapiConfig.timestamp,
    nonceStr: jsapiConfig.noncestr,
    signature: jsapiConfig.signature
  });
  wx.error(function (res) {
    console.error(res);
  });
  wx.ready(function (res) {
    console.log('jssdk ready...', res);
  });
};

const pay = (res)=>{
  return new Promise((resolve)=>{
    window.wx.chooseWXPay({
      timestamp: res.data.timeStamp * 1,
      nonceStr: res.data.nonceStr,
      package: 'prepay_id=' + res.data.prePayId,
      signType: res.data.signType,
      paySign: res.data.paySign,
      complete(res1){
        resolve(res1);
        console.log(res1)
      }
    });
  })
};
export const scan = async ()=>{
  return new Promise((resolve)=>{
    window.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      complete(res1){
        resolve(res1);
      }
    });
  })
};

export const wxPay = async (orderCode,fee)=>{
  const res = await shopWxPrePay({orderCode,fee});
  const res1 = await pay(res);
  if(res1.errMsg === "chooseWXPay:ok") {
    try{
      window.noToast = true;
      await updateOrderPayStatus({orderCode})
    }catch (e) { console.log('修改预支付状态失败')}
  }
};

export const wxScan = async ()=>{
  const res1 = await scan();
  if(res1.errMsg === "scanQRCode:ok") {
    try{
      window.noToast = true;
    }catch (e) { console.log('扫码失败')}
  }
  return res1.resultStr;
};

