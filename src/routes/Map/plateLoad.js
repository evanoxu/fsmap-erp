import React from 'react';
import PropTypes from 'prop-types';
import { BDMap } from '../../components';

import { FilterItem } from '../../components';
import { loadScript, DelScript } from '../../utils';

import { Form, Button, Row, Col, Input, Cascader } from 'antd';

// 设置地图对象
// let stateMap = {};
// let isload = false;
// const PlateLoad = ({list,...PlateLoadProps }) => {
//   // 获取地图信息
//   const handleMap = (obj,control) => {
//     const _map = obj;
//     stateMap = _map;
//     stateMap.disableScrollWheelZoom();
//     stateMap.removeControl(control.navigation);
//     stateMap.removeControl(control.Scale);
//   };

//   if(list.length){
//     if(isload) return;
//     isload = true;
//     for (var i = 0; i < list.length; i++) {
//         var Polygonid = list[i].id;
//         var PolygonPoint = list[i].lnglat;
//         var PolygonPointArr = PolygonPoint.split(';')
//         var PolygonJSON = [];
//         for (var j = 0; j < PolygonPointArr.length; j++) {
//             var _point = PolygonPointArr[j].split(',');
//             PolygonJSON.push(new window.BMap.Point(_point[0],_point[1]));
//         }
//         var polygon = new window.BMap.Polygon(PolygonJSON,{fillColor:'#758dd3',fillOpacity:0.8, strokeWeight:0.01, strokeOpacity:0});
//         stateMap.addOverlay(polygon);
//         // var content = mapdraw[i].id
//         // addClickHandler(content,polygon);
//         // if(i==10) break;
//     }    
//   }
//   return (
//     <div className=""><BDMap style={{height:'600px'}} initCB={handleMap.bind(this)} /></div>
//   );
// };

// export default PlateLoad



class PlateLoad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      cilck: null
    }
  } 
  
  handleMap = (obj,control) => {
    var _this = this 
    loadScript('http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js','',{id:'DrawingManager'})
    const _map = obj;
    _map.disableScrollWheelZoom();
    _map.removeControl(control.navigation);
    _map.removeControl(control.Scale);
    _map.disableDoubleClickZoom()
    setTimeout(function(){
      var overlays = [];
      var overlaycomplete = function(e){
        _map.disableDoubleClickZoom()
        _map.disablePinchToZoom()        
        overlays.push(e.overlay);
        _this.addHandler({},e.overlay)
      };

      var styleOptions = {
          strokeColor:"#758dd3",    //边线颜色。
          fillColor:"#758dd3",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 0.01,       //边线的宽度，以像素为单位。
          strokeOpacity: 0,    //边线透明度，取值范围0 - 1。
          fillOpacity: 0.8,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
      }
      console.log(window.BMapLib)
      //实例化鼠标绘制工具
      var drawingManager = new window.BMapLib.DrawingManager(_map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
          drawingToolOptions: {
              anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
              offset: new window.BMap.Size(5, 5), //偏离值
          },
          rectangleOptions: styleOptions //矩形的样式
      });  
     //添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener('overlaycomplete', overlaycomplete);
      _map.disableDoubleClickZoom()
      _map.disablePinchToZoom()
    },500)

    this.setState({
      map: _map
    })  
  };

  addHandler(content,obj){
    var _this = this
    const { map }  = this.state
    obj.addEventListener("dblclick",function(e){
        if(_this.state.cilck) _this.state.cilck.disableEditing();
        obj.enableEditing();
        _this.setState({
          cilck: obj
        })
    })    
    var opts = {
      width : 250,
      height: 80,
      title : "信息窗口" ,
      enableMessage:true
    };   
    obj.addEventListener("click",function(e){
      var center = obj.getBounds().getCenter()
      var point = new BMap.Point(center.lng, center.lat);
      var infoWindow = new BMap.InfoWindow('11111',opts);  // 
      map.openInfoWindow(infoWindow,point);       
    })       
  } 

  setZoom= (value) =>{
      const { map } = this.state
      var _this = this
      if(!map) return
      map.setZoom(value)
      _this.setState({
        cilck: ''
      })
  }
  componentWillReceiveProps(nextProps){
    const { list } = nextProps;
    const { map } = this.state
    var len = this.props.list.length
    if(len!==nextProps.list.length){
      for (var i = 0; i < list.length; i++) {
          var Polygonid = list[i].id;
          var PolygonPoint = list[i].lnglat;
          var PolygonPointArr = PolygonPoint.split(';')
          var PolygonJSON = [];
          for (var j = 0; j < PolygonPointArr.length; j++) {
              var _point = PolygonPointArr[j].split(',');
              PolygonJSON.push(new window.BMap.Point(_point[0],_point[1]));
          }
          var polygon = new window.BMap.Polygon(PolygonJSON,{fillColor:'#758dd3',fillOpacity:0.8, strokeWeight:0.01, strokeOpacity:0});
          map.addOverlay(polygon);
          var content = list[i]
          this.addHandler(content,polygon);
      }  
    }        
    }
  render () {
    const zoom = [12,13,14,15,16,17,18,19]
    return (
      <div className="">
        <div className="" style={{paddingBottom:'20px'}}>
          {
            zoom.map((obj,i)=>
               <Button type="primary" style={{margin:'0 10px'}} onClick={this.setZoom.bind(this,obj)} key={i}>{obj}级别</Button>  
            )
          }
        </div>
        <BDMap style={{height:'600px'}} initCB={this.handleMap.bind(this)} />
      </div>
    )
  }
}




 
export default PlateLoad