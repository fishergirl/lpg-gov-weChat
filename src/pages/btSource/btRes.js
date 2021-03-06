import React, { Component } from 'react'
import {connect} from 'dva'
import DocumentTitle from 'react-document-title'
import {
  List
} from 'antd-mobile'
import { getPageQuery } from '../../utils/utils'
import dateFtt from '../../utils/dateFtt'
import styles from './style.less'
import noDataImg from '../../assets/noData.png'

const Item = List.Item;
@connect(({ btSource, loading }) => {
  return {
    btSource,
    loading: loading.effects['btSource/getBtSourceRes'] || false,
  }
})
class BtRes extends Component {
  componentDidMount() {
    const btCode = getPageQuery().btCode;
    const areaCode = getPageQuery().areaCode;
    this.props.dispatch({
      type:'btSource/getBtSourceRes',
      payload: {
        areaCode,
        btCode
      },
    })
  }
  render() {
    const {btSource: {btSourceRes}, loading} = this.props;
    return (
      <DocumentTitle title="查询结果" className={styles.result}>
        <div>
          {btSourceRes.length === 0 && !loading && (
            <div className={styles.noData}>
              <img src={noDataImg} alt="" width="100%" />
              <div>抱歉，没有找到信息……</div>
            </div>
          )}
          {btSourceRes.length > 0 && btSourceRes.map((item, index) => (
            <div className={styles.list} key={index}>
              <List renderHeader={() => '钢瓶生产信息'} className="my-list">
                <Item extra={item.btCode}>钢瓶编码：</Item>
                <Item extra={item.specCode ? item.specCode : '--'}>钢瓶规格：</Item>
                <Item extra={dateFtt(item.prodDate) ? dateFtt(item.prodDate) : '--'}>出厂时间：</Item>
                <Item extra={item.manufacturer ? item.manufacturer : '--'}>生产厂家：</Item>
              </List>
              <List renderHeader={() => '钢瓶充装信息'} className="my-list">
                <Item extra={item.fillStation ? item.fillStation : '--'}>最后充装单位：</Item>
                <Item extra={dateFtt(item.fillDate) ? dateFtt(item.fillDate) : '--'}>最后充装时间：</Item>
              </List>
              <List renderHeader={() => '钢瓶配送信息'} className="my-list">
                <Item extra={item.deliveryStation ? item.deliveryStation : '--'}>最后配送单位：</Item>
                <Item extra={item.deliveryDt ? item.deliveryDt : '--'}>最后配送时间：</Item>
                <Item extra={item.delivery ? item.delivery : '--'}>配送工：</Item>
              </List>
              <List renderHeader={() => '钢瓶检测信息'} className="my-list">
                <Item extra={item.checkName ? item.checkName : '--'}>最后检测单位：</Item>
              </List>
            </div>
          ))}
        </div>
      </DocumentTitle>
    );
  }
}

export default BtRes;
