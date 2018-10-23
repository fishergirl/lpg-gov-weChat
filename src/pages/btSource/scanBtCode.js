import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import DocumentTitle from 'react-document-title'
import {
  ActivityIndicator, List, InputItem, Button, WingBlank, Toast, Tabs, Picker
} from 'antd-mobile'
import styles from './style.less'
import cityData from '../../utils/cityData'
import {wxScan} from '../../utils/wx'

@connect(({ main, global, loading }) => {
  return {
    main,
    global,
    loading: loading.models.main,
  };
})

export default class ScanBtCode extends Component {
  state = {
    pickerValue: null
  };

  componentDidMount() {

  }

  // 提交
  submit = () => {
    const {dispatch} = this.props;
    if(!this.state.pickerValue){
      Toast.fail('请选择省市',2,null,false)
    }else{
      const areaCodeArr = this.state.pickerValue.join(',').split(',')[1];
      dispatch({
        type:'main/saveBtArea',
        payload: areaCodeArr,
      })
      // wxScan();
    }
  };

  render() {
    const { pickerValue } = this.state;
    return (
      <DocumentTitle title="钢瓶溯源">
        <div className={styles.selectArea}>
          <div>
            <h2>钢瓶信息查询</h2>
            <p>请填写信息</p>
          </div>
          <List style={{ backgroundColor: 'white' }} className="picker-list">
            <Picker
              title="请选择省市"
              data={cityData}
              value={pickerValue}
              onChange={v => this.setState({ pickerValue: v })}
              onOk={v => this.setState({ pickerValue: v })}
            >
              <List.Item arrow="horizontal">钢瓶位置</List.Item>
            </Picker>
          </List>
          <WingBlank>
            <Button type="primary" className={styles.add_btn} onClick={this.submit}>扫一扫</Button>
          </WingBlank>
        </div>
      </DocumentTitle>
    );
  }
}

