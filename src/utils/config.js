module.exports = {
	name: '佛山智慧云图管理后台',
	footerText: '佛山智慧云图管理后台 @ 2017 CORE',
	logo: '/logo.png',
	menus: [
    {
      id: 1,
      icon: 'laptop',
      name: '宽带地图',
    },
    {
      id: 11,
      bpid: 1,
      mpid: 1,
      icon: 'laptop',
      name: '基础数据管理',
      router: '/map/manage',
    },
    {
      id: 12,
      bpid: 1,
      mpid: 1,
      icon: 'laptop',
      name: '基础数据导入',
      router: '/map/import',
    },
    {
      id: 13,
      bpid: 1,
      mpid: 1,
      icon: 'laptop',
      name: '专题管理',
      router: '/map/zt',
    },
    {
      id: 14,
      bpid: 1,
      mpid: 1,
      icon: 'laptop',
      name: '详情管理',
      router: '/map/detail',
    },
    
    {
      id: 15,
      bpid: 1,
      mpid: 1,
      icon: 'laptop',
      name: '版块管理',
      router: '/map/plate',
    }
    
  ],
  city: [{
    value: 44,
    label: '广东省',
    children: [{
      value: 6,
      label: '佛山市',
      children: [{
        value: 1,
        label: '顺德区',
      },{
        value: 2,
        label: '高明区',
      },{
        value: 3,
        label: '三水区',
      },{
        value: 4,
        label: '南海区',
      },{
        value: 5,
        label: '禅城区',
      },{
        value: -1,
        label: '所有',
      }],
    }],
  }],
  openPages: ['/login'],
}