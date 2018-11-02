import React, { Component } from 'react'
import { connect } from 'dva'
import moment from 'moment';
import router from 'umi/router'
import DocumentTitle from 'react-document-title'
import {
  Card, WingBlank, WhiteSpace
} from 'antd-mobile'
import styles from './style.less'
import noDataImg from '../../assets/noData.png';

@connect(({ global, loading }) => {
  return {
    global,
    loading: loading.effects['global/getArticles'] || false,
  };
})

class Law extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type:'global/getArticles',
      payload: {
        afficheType: 1
      },
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type:'global/initCurrent',
      payload: {
        current: 1,
        list: [],
        noMore: false
      },
    })
  }

  // 查看文章
  articleView = (id) => {
    router.push('/article/articleView?id=' + id);
  };

  // 查看更多
  viewMore = async()=>{
    const { global:{ articlesData:{ current, list, total } } } = this.props;
    if(list.length >= total) return;
    await this.props.dispatch({
      type: 'global/getArticles',
      payload:{
        afficheType: 1,
        current: current+1
      }
    });
  };

  render() {
    const {global: {articlesData: { list, noMore }}, loading} = this.props;
    const ArticleItem = (props) => {
      const data = props.data;
      return (
        <div children={styles.articleItem} onClick={()=>this.articleView(data.id)}>
          <div className={styles.publishTime}>
            <WhiteSpace size="lg" />
            <span>{moment(data.uploadDt).format('YYYY年MM月DD日 h:mm:ssa')}</span>
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
      <DocumentTitle title="法律法规">
        <div className={styles.homePage}>
          {list.map((item, index)=>(
            <ArticleItem data={item} key={index} />
          ))}
          {list.length > 0 && (
            <div className={styles.more}>
              <WhiteSpace size="lg" />
              <span onClick={this.viewMore}>{noMore ? '没有更多了' : '查看更多'}</span>
              <WhiteSpace size="lg" />
            </div>
          )}
          {list.length === 0 && !loading && (
            <div className={styles.noData}>
              <img src={noDataImg} alt="" width="100%" />
              <div>暂无信息……</div>
            </div>
          )}
        </div>
      </DocumentTitle>
    );
  }
}

export default Law;
