
export default {
  namespace: "global",
  state: {
    query:{}
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

  },
  reducers: {
    changeState(state, { payload }){
      return {
        ...state,
        ...payload
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
