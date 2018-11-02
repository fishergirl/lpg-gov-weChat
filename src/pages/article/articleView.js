import React, { Component } from 'react'
import {connect} from 'dva'
import DocumentTitle from 'react-document-title'
import { getPageQuery, distanceNow } from '../../utils/utils'
import styles from './style.less'

@connect(({ global, loading }) => {
  return {
    global,
    loading: loading.effects['global/getArticle'],
  }
})
class ArticleView extends Component {
  componentDidMount() {
    const id = getPageQuery().id;
    this.props.dispatch({
      type:'global/getArticle',
      payload: {
        id: parseInt(id),
      },
    }).then(()=>{
      const {global: {articleData}} = this.props;
      this.contentRef.innerHTML = articleData.adviceDesc;
    })
  }
  render() {
    const {global: {articleData}} = this.props;
    return (
      <DocumentTitle title="">
        <div className={styles.article}>
          <h2>{articleData.title ? articleData.title : ''}</h2>
          <p>
            <span className={styles.author}>{articleData.author ? articleData.author : ''}</span>&emsp;&emsp;
            <span className={styles.uploadDt}>{articleData.uploadDt? distanceNow(articleData.uploadDt) : ''}</span>
          </p>
          <div ref={el=>this.contentRef = el} className={styles.content} />
        </div>
      </DocumentTitle>
    );
  }

}

export default ArticleView;
