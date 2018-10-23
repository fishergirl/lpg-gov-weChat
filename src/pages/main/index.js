import React, { Component, Fragment } from 'react'
import { connect } from 'dva'

@connect(({ main, global, loading }) => {
  return {
    main,
    global,
    loading: loading.models.main,
  };
})

class ReactComponent extends Component {
  state = {};

  componentDidMount() {

  }

  render() {
    return (
      <div>首页</div>
    );
  }
}

export default ReactComponent;
