 /* eslint-disable */
import React from 'react';
import { loadScript, DelScript } from '../utils';

class MapBaidu extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { options, initCB } = this.props;

    window.init = function() {
      const BMap = window.BMap
      // 创建地图实例，关闭底图可点功能
      const map = new BMap.Map('allmap', { enableMapClick: false });
      // 创建坐标点
      const ponit = new BMap.Point(options.lng, options.lat);
      // 初始化地图
      map.centerAndZoom(ponit, options.zoom);
      // 启用滚轮放大缩小
      map.enableScrollWheelZoom(true);
      // 添加平移缩放控件
      map.addControl(new BMap.NavigationControl());
      // 添加比例尺到左上角
      map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
      // 添加缩略图到右下角
      map.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
      // 传对象出去
      initCB(map);
    }
    loadScript('https://api.map.baidu.com/api?v=2.0&ak=CyGBwibbsem3vBvNBjwuu8sQ&callback=init','',{id:'mapbaidu'});
  }
  componentWillUnmount(){
    DelScript('mapbaidu')
  }
  render() {
    const { style } = this.props;
    return (
      <div className="homemap" id="allmap" style={style}></div>
    );
  }
}

MapBaidu.defaultProps = {
  options: {
    lng : '113.122717',
    lat : '23.028762',
    zoom : '13'
  }
}

export default MapBaidu;
