import { queryBtSourceRes, getScanBtSourceRes } from '../../../services/api'

export default {
  namespace: 'btSource',

  state: {
    btSourceRes: [],
  },

  effects: {
    * getBtSourceRes({ payload }, {call, put}) {
      const res = yield call(queryBtSourceRes, payload);
      yield put({
        type: 'changeState',
        payload: {
          btSourceRes: res.data
        }
      })
    },
    * getScanBtSourceRes({ payload }, {call, put}) {
      const res = yield call(queryScanBtSourceRes, payload);
      yield put({
        type: 'changeState',
        payload: {
          btSourceRes: res.data
        }
      })
    },
  },

  reducers: {
    changeState(state, { payload }){
      return {
        ...state,
        ...payload
      }
    }
  },
};
