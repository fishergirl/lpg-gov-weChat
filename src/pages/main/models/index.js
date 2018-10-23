import { queryArticles, queryArticle, saveBtAreaCode } from '../../../services/api';

export default {
  namespace: 'main',

  state: {
    areaCode: '',
    articleLists: [], // 文章列表
    articleData: {}, // 获取某一篇文章详情
    articlesData: {}, // 获取文章列表信息
    current: 1,
    pageSize: 5,
  },

  effects: {
    // 保存钢瓶地区
    * saveBtArea({ payload }, {call, put}) {
      const res = yield call(saveBtAreaCode, payload);
      yield put({
        type: 'changeState',
        payload: {
          areaCode: res.data,
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
