import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import moment from 'moment';
import router from 'umi/router'
import DocumentTitle from 'react-document-title'
import {
  Card, WingBlank, WhiteSpace
} from 'antd-mobile'
import styles from '../news/style.less'

let list = [];

@connect(({ main, global, loading }) => {
  return {
    main,
    global,
    loading: loading.models.main,
  };
})

class Consult extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type:'main/getArticles',
      payload: {
        afficheType: 3
      },
    }).then(()=>{
      const {main: {articlesData}} = this.props;
      dispatch({
        type:'main/articleList',
        payload: list.concat(articlesData.list),
      })
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'main/changeState',
      payload: {current: 1, pageSize: 5, articleLists: []},
    });
  }

  // 查看文章
  articleView = (id) => {
    router.push('/article/articleView?id=' + id);
  };

  // 查看更多
  viewMore = ()=> {
    const {dispatch, main: {articlesData, current, articleLists}} = this.props;
    if (articleLists.length === articlesData.pagination.total) return;
    dispatch({
      type: 'main/changeState',
      payload: {
        current: current + 1,
      },
    });
    dispatch({
      type:'main/getArticles',
      payload: {
        afficheType: 3
      },
    }).then(()=>{
      const {dispatch, main: {articlesData}} = this.props;
      dispatch({
        type:'main/articleList',
        payload: articleLists.concat(articlesData.list),
      })
    });
  };

  render() {
    const {main: {articleLists, articlesData}} = this.props;
    const ArticleItem = (props) => {
      const data = props.data;
      return (
        <div children={styles.articleItem} onClick={()=>this.articleView(data.id)}>
          <div className={styles.publishTime}>
            <WhiteSpace size="lg" />
            <span>{moment(data.uploadDt).format('YYYY年MM月DD年 hh:mm:ssa')}</span>
          </div>
          <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title={<img src={data.titlePhoto} alt="" width="100%" />}
              />
              <Card.Body>
                <div>{data.title}</div>
              </Card.Body>
              <Card.Footer content={data.summary} />
            </Card>
            <WhiteSpace size="lg" />
          </WingBlank>
        </div>
      )
    };
    return (
      <DocumentTitle title="业务咨询">
        <div className={styles.homePage}>
          {articleLists.length > 0 && articleLists.map((item, index)=>(
            <ArticleItem data={item} key={index} />
          ))}
          <div className={styles.more}>
            <WhiteSpace size="lg" />
            <span onClick={this.viewMore}>{articlesData && articlesData.pagination && (articleLists.length===articlesData.pagination.total) ? '没有更多了' : '查看更多'}</span>
            <WhiteSpace size="lg" />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Consult;
