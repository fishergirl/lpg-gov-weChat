import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import DocumentTitle from 'react-document-title'
import {
  InputItem, List, Picker, Button, WingBlank, Toast
} from 'antd-mobile'
import styles from './style.less'
import { reg_btCode } from '../../utils/config'
import cityData from '../../utils/cityData';

@connect(({ main, global, loading }) => {
  return {
    main,
    global,
    loading: loading.models.main,
  };
})

export default class SearchBtCode extends Component {
  state = {
    pickerValue: null
  };

  search = () => {
    if(!this.state.pickerValue){
      Toast.fail('请选择省市',2,null,false)
    }else if(!this.btCodeRef.state.value){
      Toast.fail('请输入钢瓶编号',2,null,false)
    }else if(!reg_btCode.test(this.btCodeRef.state.value)){
      Toast.fail('编码格式有误',2,null,false);
    }else{
      const data = {
        areaCode: this.state.pickerValue.join(',').split(",")[1],
        btCode: this.btCodeRef.state.value
      };
      router.push('/btSource/btRes?btCode=' + data.btCode + '&areaCode=' + data.areaCode);
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
            <InputItem
              ref={el=>this.btCodeRef = el}
              placeholder="请输入芯片号或钢瓶号"
              clear
            >
              编号
            </InputItem>
          </List>
          <WingBlank>
            <Button type="primary" className={styles.add_btn} onClick={this.search}>确定</Button>
          </WingBlank>
        </div>
      </DocumentTitle>
    );
  }
}
