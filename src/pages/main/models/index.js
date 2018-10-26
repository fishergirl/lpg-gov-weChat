import { Toast } from 'antd-mobile';
import { queryArticles, queryArticle, queryScanRes } from '../../../services/api';
import {wxScan} from '../../../utils/wx'

export default {
  namespace: 'main',

  state: {
    scanResData: undefined,
    articleLists: [], // 文章列表
    articleData: {}, // 获取某一篇文章详情
    articlesData: {}, // 获取文章列表信息
    current: 1,
    pageSize: 5,
  },

  effects: {
    // 提交扫码信息 获取扫码后的结果
    * submitScanInfo({ payload }, {call, put}) {
      const scanRes = yield call(wxScan);
      if (scanRes.indexOf('http://mai.haoyunqi.com.cn')===-1 && scanRes.indexOf('http://')!==-1){
        // Toast.fail('编码有误！');
        return;
      }
      const res = yield call(queryScanRes, {
        ...payload,
        resultStr: scanRes,
      });
      yield put({
        type: 'changeState',
        payload: {
          scanResData: res.data,
        }
      })
    },
    // 获取某一篇文章
    * getArticle({ payload }, {call, put}) {
      const res = yield call(queryArticle, payload);
      yield put({
        type: 'changeState',
        payload: {
          articleData: res.data,
        }
      })
    },
    // 获取文章列表
    * getArticles({ payload }, {call, put, select}) {
      const {current, pageSize} = yield select(state => state.main);
      const res = yield call(queryArticles, {
        ...payload,
        afficheStatus: 0,
        current,
        pageSize,
      });
      yield put({
        type: 'changeState',
        payload: {
          articlesData: res.data
        }
      })
    },
  },

  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    articleList(state, { payload }) {
      return {
        ...state,
        articleLists: payload,
      };
    },
  },
};
