import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title'
import {
  List, Button, WingBlank, Toast, Picker
} from 'antd-mobile'
import styles from './style.less'
import cityData from '../../utils/cityData'

@connect(({ global, loading }) => {
  return {
    global,
    loading: loading.models.global,
  };
})

class ScanBtCode extends Component {
  state = {
    pickerValue: null
  };

  // 提交
  submit = () => {
    const {dispatch} = this.props;
    if(!this.state.pickerValue){
      Toast.fail('请选择省市',2,null,false)
    }else{
      const areaCodeArr = this.state.pickerValue.join(',').split(',')[1];
      dispatch({
        type:'global/submitScanInfo',
        payload: {
          areaCode: areaCodeArr,
        },
      }).then(()=>{
        const {global:{scanResData}} = this.props;
        if(scanResData && typeof (scanResData)=== 'string') {
          window.location.href = scanResData;
        } else {
          dispatch(routerRedux.push('/btSource/scanBtRes'));
        }
      });
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

export default ScanBtCode;
