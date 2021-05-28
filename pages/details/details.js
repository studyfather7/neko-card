Page({
  data: {

    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],

    isAutoplay: true,
    src: "",
    id:"",
    catItem: {
    },
    imgUrls: [],
    show: false,
    isUser: 0,
    isReturn: 0,
    isBack: 0
  },


  editTap: function(e) {
    wx.navigateTo({
      url: `../edit/edit?id=${this.data.id}`,
    })
  },  

  bindgetphonenumber: function(e) {
    console.log()
  },


  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id,
      isUser: options.isUser,
      isReturn: options.isReturn,
      isBack: options.isBack
    })
    if (this.data.id!=undefined){
      // 初始化云
      wx.cloud.init({
        env: 'cat-3gmdyukw78634db2',
        traceUser: 'true'
      });
      // 初始化数据库 
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('all_cat').doc(this.data.id)
      .get({
        success: res => {
          console.log('成功获得数据', res);
          const catData = res.data
          this.setData({
            src: catData.avatar,
            imgUrls: catData.src,
            [`catItem.绝育`]: catData.sterilizationDate,
            [`catItem.领养`]: catData.adoptionDate,
            [`catItem.名字`]: catData.name,
            [`catItem.性别`]: catData.gender,
            [`catItem.外貌`]: catData.appearance,
            [`catItem.性格`]: catData.charac
          })
          console.log("猫咪", this.data.catItem)
          if (this.data.imgUrls != undefined) {
            this.setData({
              isAutoplay: false
            })
          }
          console.log("图片数组", this.data.imgUrls)
        } 
      })

    }
  },
  change(e) {
    console.log('current index has changed', e.detail)
},
  delete(e) {
      console.log('delete', e.detail)
  },
  hide() {
      console.log('component hide')
      setTimeout(() => {
          console.log('component show')
          this.setData({
              show: false
          })
      }, 1000)
  },

  AutoplayTap: function(e) {
    const that = this;
    that.setData({
      show: true
    })
  },

  deleteTap: function() {
    var that = this;
    that.setData({
      dialogShow: true
    })


  },

  tapDialogButton: function(e) {
    var that = this;
    var value = e.detail.item;
    var openid = wx.getStorageSync('openid')
    if (value.text == "确定") {
      wx.cloud.init({
        env: 'cat-3gmdyukw78634db2',
        traceUser: 'true'
      });
      // console.log(that.data.imgUrls!=)
      if (that.data.imgUrls!=undefined) {
        wx.cloud.deleteFile({
          fileList: that.data.imgUrls.concat(that.data.src),
          success: res => {
            // handle success
            console.log(res.fileList)
          },
          fail: console.error
        })
      }
      if (that.data.src!="") {
        wx.cloud.deleteFile({
          fileList: [that.data.src],
          success: res => {
            // handle success
            console.log(res.fileList)
          },
          fail: console.error
        })
      }
      const db = wx.cloud.database()
      const _ = db.command
      db.collection("all_cat").doc(this.data.id)
      .remove({
        success: res=> {
          that.setData({
            dialogShow: false
          })
          console.log("删除成功!")
          var pages = getCurrentPages();
          var beforePage = pages[pages.length - 2];
          wx.navigateBack({
            success: res=> {
              beforePage.onLoad()
            },
            delta: 1,
          })
        }
      })
    } else {
      that.setData({
        dialogShow: false
      })
    }
  },
  returnTap() {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 3];
    wx.switchTab({
      success: res=> {
        beforePage.onLoad()
      },
      url: '../index/index',    
    })
  },

  backTap() {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 4];
    wx.navigateBack({
      success: res=> {
        beforePage.onLoad()
      },
      delta: 3,
    })
  }

});