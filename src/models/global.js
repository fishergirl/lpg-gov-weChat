import { wxScan } from '../utils/wx';
import initialState from '../utils/dvaInitData'
import { queryArticle, queryArticles, queryScanRes } from '../services/api';

export default {
  namespace: "global",
  state: {
    query:{},
    scanResData: [],
    articleLists: [], // 文章列表
    articleData: {}, // 获取某一篇文章详情
    articlesData: { // 获取文章列表信息
      list: [],
      current: 1,
      pageSize: 5,
      noMore: false,
    },
    ...initialState
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ query }) => {
        //router listen
        dispatch({
          type: 'setRouter',
          payload: {
            routerTo:history.location
          }
        });
      });
    },
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
      let { list, current, pageSize } = yield select(state=>state.global.articlesData);
      const data = {
        afficheStatus: 0,
        current,
        pageSize,
        ...payload,
      };
      const res = yield call(queryArticles,data);
      let noMore = false;
      if(res.data.list.length < pageSize) noMore = true;
      if(payload && payload.current > 1){
        list = list.concat(res.data.list);
      }else{
        list = res.data.list
      }
      yield put ({
        type: 'changeArticlesData',
        payload:{
          list,
          noMore,
          total: res.data.pagination.total,
          ...payload,
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
    initCurrent(state,{ payload }){
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          ...payload
        }
      }
    },
    changeArticlesData(state,{ payload }){
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          ...payload
        }
      }
    },
    setRouter(state, { payload }){
      const routerFrom = state.routerTo;
      const routerTo = payload.routerTo;
      if(routerFrom && routerFrom.pathname === routerTo.pathname){
        return state
      }
      return {
        ...state,
        routerFrom,
        routerTo
      }
    }
  }
};
