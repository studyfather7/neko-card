Page({
  data:{
    isUser: 1
  },

  onLoad: function(options) {
    var that = this;
    var openid = wx.getStorageSync('openid')
    if (openid!=undefined){
      wx.cloud.init({
        env: 'cat-3gmdyukw78634db2',
        traceUser: 'true'
      });
      // 初始化数据库 
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('all_cat').where({
        _openid: openid
      })
      .get({
        success: res => {
          this.setData({
            all_cat: res.data
          })
          console.log("成功获得littltCat数据",res);
        },
        fail: error => {
          console.log(error);
        }
      })
    }
  }
  
})