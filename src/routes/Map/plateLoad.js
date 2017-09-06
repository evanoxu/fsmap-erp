import React from 'react';
import PropTypes from 'prop-types';
import { BDMap } from '../../components';

import { FilterItem } from '../../components';
import { loadScript, DelScript } from '../../utils';

import { Form, Button, Row, Col, Input, Cascader } from 'antd';

// //设置地图对象
// let stateMap = {};
// // let isload = false;
// const PlateLoad = ({list, ...PlateLoadProps }) => {
//   // 获取地图信息
//   const handleMap = (obj,control) => {
//     const _map = obj;
//     stateMap = _map;
//     stateMap.disableScrollWheelZoom();
//     stateMap.removeControl(control.navigation);
//     stateMap.removeControl(control.Scale);
//   };

//   console.log(list)
//   if(list.length){
//     // if(isload) return;
//     // isload = true;
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
    _map.disableContinuousZoom()  
    setTimeout(function(){
      var overlays = [];
      var overlaycomplete = function(e){
        drawingManager.close()
        overlays.push(e.overlay);
        _this.addHandler('',e.overlay)
        this.setState({
          overlays,
        })
      };

      var styleOptions = {
          strokeColor:"#758dd3",    //边线颜色。
          fillColor:"#758dd3",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 0.01,       //边线的宽度，以像素为单位。
          strokeOpacity: 0,    //边线透明度，取值范围0 - 1。
          fillOpacity: 0.8,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
      }
      // console.log(window.BMapLib)
      //实例化鼠标绘制工具
      var drawingManager = new window.BMapLib.DrawingManager(_map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: false, //是否显示工具栏
          drawingToolOptions: {
              anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
              offset: new window.BMap.Size(5, 5), //偏离值
              scale:1
          },
          rectangleOptions: styleOptions //矩形的样式
      });   

      _map.disableScrollWheelZoom()
      _map.disableDoubleClickZoom()
      _map.disablePinchToZoom()        

      //DrawingManager 缩放去除
      drawingManager.addEventListener('overlaycomplete', overlaycomplete); 
      _map.addEventListener("click",function(e){
        _map.disableDoubleClickZoom()
      })             
    },500)

    this.setState({
      map: _map
    })

    //
    window.savaPlate = function(id){
      var name = document.getElementById('Polygon').value
      if(!name){
        alert('请输入区块名称！')
        return false;
      }
      var path = ''
      if(id){
        path = _this.state.json[id].getPath()
      }else{
        path = ''
      }
      var pathArr = []
      path.map(function(g,i){
        pathArr.push(g.lng+','+g.lat)
      })
      var query= {
        name: name,
        levels: '12,13,14,15,16,17,18,19',
        lnglat: pathArr.join(';')
      }
      if(id) query.id = id 
       _this.props.savaPlate(query)
    }  

    // 删除
    window.deletePlate = function(id){
      if(id){
        var query = {
          id: id
        }
        _this.props.deletePlate(query)
      }else{
        obj.hide()
        map.closeInfoWindow()
      }
    }         
  };

  addHandler(content,obj){
    var _this = this
    const { map }  = this.state
    var html = '<p><input type="text" value="" id="Polygon"/></p><p><a onclick="savaPlate()">保存</a></p><p><a onclick="deletePlate()">删除</a></p>'
    if(content){
      html = '</p><input type="text" value="'+content.name+'" id="Polygon"/></p><p><a onclick="savaPlate('+content.id+')">保存</a></p><p><a onclick="deletePlate('+content.id+')">删除</a></p>'
    }


    // 点击保存删除      
    obj.addEventListener("click",function(e){
      if(_this.state.cilck){
        _this.state.cilck.disableEditing();
        _this.setState({
          cilck: ''
        })         
      }
      var center = obj.getBounds().getCenter()
      var point = new BMap.Point(center.lng, center.lat);
      var infoWindow = new BMap.InfoWindow(html,{
        width : 250,
        height: 80,
      });
      map.openInfoWindow(infoWindow,point);       
    }) 

    // 右键编辑
    obj.addEventListener("rightclick",function(e){
      if(_this.state.cilck==obj){
        obj.disableEditing();
        _this.setState({
          cilck: ''
        })        
      }else{
        if(_this.state.cilck) _this.state.cilck.disableEditing();
        obj.enableEditing();
        _this.setState({
          cilck: obj
        })
      }
    });
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
  componentWillUnmount(){
    DelScript('DrawingManager')
    window.savaPlate = window.deletePlate = null;
  }  
  componentWillReceiveProps(nextProps){
    const { list,isDelete,isSava } = nextProps;
    const { map } = this.state
    var len = this.props.list.length
    if(len!==nextProps.list.length){
      var json = {}
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
           // console.log(content.name,content.id,content.lnglat)
          json[Polygonid] = polygon
          this.addHandler(content,polygon);
      }  
      this.setState({
        json,
      })
    } 
    if(isSava!==this.props.isSava){
      if(isSava) map.closeInfoWindow()
    } 
    if(isDelete!==this.props.isDelete){
      if(isDelete) map.closeInfoWindow()
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