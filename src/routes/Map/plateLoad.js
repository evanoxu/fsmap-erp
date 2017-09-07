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
      cilck: null,
      zoom: 16
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
    _map.setZoom(this.state.zoom)
    setTimeout(function(){
      var overlays = {}; 
      var len = 0;
      var overlaycomplete = function(e){
        drawingManager.close()
        var json = _this.state.json
        len++;
        var id = '-'+len
        var query = {
          content: {id,name:''},
          polygon: e.overlay  
        }
        query.polygon.sid = id
        json[id] = query
        _this.addHandler(query.content,query.polygon)
        _this.setState({
          json
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
          enableDrawingTool: true, //是否显示工具栏
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
      var isnew = Number(id)<0
      path = _this.state.json[id].polygon.getPath()
      var pathArr = []
      path.map(function(g,i){
        pathArr.push(g.lng+','+g.lat)
      })
      var query= {
        name: name,
        levels: '12,13,14,15,16,17,18,19',
        lnglat: pathArr.join(';')
      }
      if(!isnew) query.id = id 
      _this.props.savaPlate(query)
      _this.setState({
        savaId: id
      })     
    }  

    // 删除
    window.deletePlate = function(id){
      var isnew = Number(id)<0
      if(!isnew){
        var query = {
          id: id
        }
        _this.props.deletePlate(query)
      }else{
        var json = _this.state.json;
        json[id].polygon.hide()
        _map.closeInfoWindow()
      }
      _this.setState({
        savaId: id
      })      
    } 
    _map.addEventListener("zoomend",function(){
      _this.setState({
        zoom:_map.getZoom()
      })
    })       
  };

  clickfun(e){
    var _this = this
    const { map,json }  = this.state
    var obj = e.currentTarget
    if(_this.state.cilck){
      _this.state.cilck.disableEditing();
      _this.setState({
        cilck: ''
      })         
    }
    var center = obj.getBounds().getCenter()
    var point = new BMap.Point(center.lng, center.lat);
    var id = obj.sid;
    var name = json[id].content.name
    var html = '<div style="padding-top:15px;"><input type="text" placeholder="请输入你要查询的地址" value="'+name+'" id="Polygon" class="ant-input ant-input-lg"></div><div class="ant-col-xs-24" style="padding-top: 10px;text-center:right"><button type="button" class="ant-btn ant-btn-primary ant-btn-lg" onclick="savaPlate('+id+')" style="margin-right: 16px;"><span>保 存</span></button><button type="button" class="ant-btn ant-btn-lg" onclick="deletePlate('+id+')"><span>删 除</span></button></div>'      
    var infoWindow = new BMap.InfoWindow(html,{
      width : 250,
      height: 90,
    });
    map.openInfoWindow(infoWindow,point);        
  }

  rightclickfun(e){
    var _this = this
    const { map,json }  = this.state
    var obj = e.currentTarget
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
  }

  addHandler(content,obj){
    var _this = this
    const { map }  = this.state
    obj.addEventListener("click",this.clickfun.bind(this)) 
    obj.addEventListener("rightclick",this.rightclickfun.bind(this));
  } 

  setZoom= (value) =>{
    const { map,cilck} = this.state
    var _this = this
    if(!map) return
    if(cilck){
      var center = cilck.getBounds().getCenter()
      var point = new BMap.Point(center.lng, center.lat);      
      map.centerAndZoom(point,value)
    }else{
      map.setZoom(value)
    }
  }
  componentWillUnmount(){
    DelScript('DrawingManager')
    window.savaPlate = window.deletePlate = null;
  }  
  componentWillReceiveProps(nextProps){
    const { list,isDelete,isSava,location} = nextProps;
    const { map,savaId } = this.state
    var len = this.props.list.length
    var editId = '';
    if(location.query.edit){
      editId = location.query.edit
    }
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
          json[Polygonid] = {
            content,polygon
          }
          polygon.sid = Polygonid
          if(editId==Polygonid){
            polygon.enableEditing()
            var center = polygon.getBounds().getCenter()
            var point = new BMap.Point(center.lng, center.lat);             
            map.setCenter(point)
          }
          this.addHandler(content,polygon);
      }  
      this.setState({
        json,
      })
    } 
    if(isSava!==this.props.isSava){
      if(!isSava) return;
      map.closeInfoWindow()
      var content = {
        id:isSava.id,
        name:isSava.name,          
      }   
      var json = this.state.json   
      if(Number(savaId)<0){
        //新增

        json[isSava.id] = {
          content: content,
          polygon: json[savaId].polygon
        } 
        json[savaId].polygon.sid =  content.id  
        this.setState({
          json
        })   
      }else{
        //编辑
        var json = this.state.json
        json[savaId].content = content
        this.setState({
          json
        })  

      }
    } 
    if(isDelete!==this.props.isDelete){
      if(!isDelete) return
      map.closeInfoWindow()
      this.state.json[savaId].polygon.hide()
    }          
  }
  render () {
    const zoomArr = [12,13,14,15,16,17,18,19];
    const {zoom} = this.state;
    return (
      <div className="">
        <p style={{padding:'10px'}}>12-15级别可查看  最好在16-19级别编辑</p>
        <div className="" style={{paddingBottom:'20px'}}>
          {
            zoomArr.map((obj,i)=>
               <Button type={zoom==obj?'primary':''} style={{margin:'0 10px'}} onClick={this.setZoom.bind(this,obj)} key={i}>{obj}级别</Button>)
          }
        </div>
        <BDMap style={{height:'600px'}} initCB={this.handleMap.bind(this)} />       
      </div>
    )
  }
}




 
export default PlateLoad