Page({
  data: {
    navbar: ['猫', '关于'],
    all_cat: [],
    currentTab: 0
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad: function() {
    // 初始化云
    wx.cloud.init({
      env: 'cat-3gmdyukw78634db2',
      traceUser: 'true'
    });
    // 初始化数据库 
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('all_cat')
    .get({
      success: res => {
        this.setData({
          all_cat: res.data
        })
        console.log("成功获得数据",res);
      } 
    })
  },

  goToEdit: function() {
    wx.navigateTo({
      url: '../edit/edit',
    })
  }
})