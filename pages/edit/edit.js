import util from '../../utils/util'
import weDebug from '../../miniprogram_npm/@we-debug/core/libs/index'

Page({
    data: {
        isGong: true,
        isMu: false,


        urlArr: [],
        files: [],


        submitTap: 'submitForm',

        catName: '',
        catGender: '',
        catAppearance: '',
        catCharac: '',


        isShow: false,
        dialogShow: false,
        buttons: [{text: '取消'}, {text: '确定'}],

        id: "",


        src: "",

        isSterilization: false,
        isAdoption: false,


        sterilizationDate: "",
        adoptionDate: "",

        sterilizationItems: [
            {name: '否', value: 'ns', checked: true},
            {name: '是', value: 's'}
        ],

        adoptionItems: [
            {name: '否', value: 'na', checked: true},
            {name: '是', value: 'a'}
        ],

        formData: {
            "gender": "公"
        },
        
        rules: [{
            name: 'name',
            rules: {required: true, message: '请输入名字'},
        }, {
            name: 'appearance',
            rules: {required: true, message: '请输入外貌'},
        },{
            name: 'charac',
            rules: {required: true, message: '请输入性格'},
        },]
    },

    onLoad (option) {
        this.setData({
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this)
        })
        var TIME = util.formatDate(new Date());
        this.setData({
            date: TIME,
            sterilizationDate: TIME,
            adoptionDate: TIME,
        })

        let { avatar } = option
        if (avatar) {
          this.setData({
            src: avatar
          })
        }
        this.addEventListener()
        this.setData({
            id: option.id
        })
        console.log('传过来的id字段名', this.data.id)
        // console.log('id值判断undefined',this.data.id!=)
        console.log()
        if (this.data.id!=undefined) {
            this.changeSubmitTap(),
            this.editInit()
        }
    },

    changeSubmitTap() {
        this.setData({
            submitTap: 'submitFormForSet'
        })
    },

    editInit() {
        const db = wx.cloud.database()
        const _ = db.command
        wx.cloud.init({
            env: 'cat-3gmdyukw78634db2',
            traceUser: 'true'
        });
        db.collection('all_cat').doc(this.data.id)
        .get({
            success: res=> {
                console.log('获得数据成功', res)
                const catData = res.data
                this.setData({
                    formData: catData,
                    src: catData.avatar,
                    catName: catData.name,
                    catGender: catData.gender,
                    catAppearance: catData.appearance,
                    catCharac: catData.charac
                })
                delete this.data.formData._id
                delete this.data.formData._openid
                console.log("ado", catData.adoptionDate)
                if (catData.adoptionDate!=undefined) {
                    this.setData({
                        isAdoption: true,
                        adoptionItems: [
                            {name: '否', value: 'na'},
                            {name: '是', value: 'a', checked: true}
                        ],
                        adoptionDate: catData.adoptionDate

                    })
                }
                console.log("ste", catData.sterilizationDate)
                if (catData.sterilizationDate!=undefined) {
                    this.setData({
                        isSterilization: true,
                        sterilizationItems: [
                            {name: '否', value: 'ns'},
                            {name: '是', value: 's', checked: true}
                        ],
                        sterilizationDate: catData.sterilizationDate
                    })
                }
                if (catData.gender=="公") {
                    this.setData({
                        isGong: true,
                        isMu: false
                    })
                } else {
                    this.setData({
                        isGong: false,
                        isMu: true
                    })
                }
            }
        })
    },

    upload () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
          success (res) {
            const src = res.tempFilePaths[0]
            wx.navigateTo({
              url: `../upload/upload?src=${src}`
            })
          }
        })
      },
      addEventListener () {
        weDebug.event.on('avatar:finish', (path) => {
          this.setData({
            src: path
          })
        })
      },
      removeEventListener () {
        weDebug.event.off('avatar:finish')
      },

      onUnload (option) {
        this.removeEventListener()
      },

    sterilizationDateChange: function(e) {
        this.setData({
            sterilizationDate: e.detail.value,
            [`formData.sterilizationDate`]: e.detail.value
        })
    },

    adoptionDateChange: function(e) {
        this.setData({
            adoptionDate: e.detail.value,
            [`formData.adoptionDate`]: e.detail.value
        })
    },


    radioChange: function (e) {
        var ADOTIME = this.data.adoptionDate
        // console.log(ADOTIME)
        var STETIME = this.data.sterilizationDate
        if (e.detail.value=='s') {
            this.setData({
                isSterilization: true,
                [`formData.sterilizationDate`]: STETIME
            })
        } else if (e.detail.value=='ns') {
            this.setData({
                isSterilization: false,
            })
            delete this.data.formData.sterilizationDate
        }
        if (e.detail.value=='a') {
            this.setData({
                isAdoption: true,
                [`formData.adoptionDate`]: ADOTIME,
            })
        } else if (e.detail.value=='na') {
            this.setData({
                isAdoption: false,
            })
            delete this.data.formData.adoptionDate
        }
    },



    
    formInputChange(e) {
        const {field} = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },

    submitForm() {
        this.selectComponent('#form').validate((valid, errors) => {
            console.log('valid', valid, errors)
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })

                }
            } else { 
                this.showLoading()
                const fileName = this.data.formData.name
                wx.cloud.init({
                    env: 'cat-3gmdyukw78634db2',
                    traceUser: 'true'
                });
                if (this.data.src!="") {
                    wx.cloud.uploadFile({
                        // 指定上传到的云路径
                        cloudPath: 'avatar/' + 'cat-avatar' + fileName + '.png',
                        // 指定要上传的文件的小程序临时文件路径
                        filePath: this.data.src,
                        // 成功回调
                        success: res => {
                            console.log('上传头像成功', res)
                            this.setData({
                                [`formData.avatar`]: res.fileID
                            })
                            // 初始化数据库 
                            const db = wx.cloud.database()
                            const _ = db.command
                            db.collection('all_cat')
                            .add({
                                data: this.data.formData,
                                success: function(res) {
                                    const id = res._id
                                    console.log('上传数据成功', res) 
                                    wx.navigateTo({
                                      url: `../details/details?id=${id}&isReturn=1`,
                                    })  
                                }
                            })
                        },
    
                    })
                } else {
                    const db = wx.cloud.database()
                    const _ = db.command
                    db.collection('all_cat')
                    .add({
                        data: this.data.formData,
                        success: function(res) {
                            const id = res._id
                            console.log('上传数据成功', res) 
                            wx.navigateTo({
                              url: `../details/details?id=${id}&isReturn=1`,
                            })  
                        }
                    })
                }




            }
        })
    },

    showLoading() {
        this.setData({
            isShow: true
        })
    },

    submitFormForSet() {
        console.log("成功调用该方法")
        this.showLoading()
        wx.cloud.init({
            env: 'cat-3gmdyukw78634db2',
            traceUser: 'true'
        });
        const db = wx.cloud.database()
        const _ = db.command
        console.log(this.data.formData)
        db.collection('all_cat').doc(this.data.id)
        .set({
            data: this.data.formData,
            success: res=> {
                console.log("sucess!", res)
                wx.navigateTo({
                    url: `../details/details?id=${this.data.id}&isBack=1`,
                })  
            }
        })

    },

    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    selectFile(files) {
        console.log('files', files)
        // 返回false可以阻止某次文件上传
    },

    // bug上传图片不会删除
    uplaodFile(files) {
        console.log('upload files', files)
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {
            wx.cloud.init({
                env: 'cat-3gmdyukw78634db2',
                traceUser: 'true'
            });
            var tempFilePaths = files.tempFilePaths;
            //上传返回值
            var that = this;
            var object = {};
            for (var i = 0; i < tempFilePaths.length; i++) {
                wx.cloud.uploadFile({
                // 模拟https
                    cloudPath: 'cat-image' + '-' + Date.now() + tempFilePaths[i].match(/\.[^.]+?$/)[0],
                    filePath: files.tempFilePaths[i], //上传的文件本地地址
                    success: res=> {
                        console.log("上传成功", res)
                        that.setData({
                            urlArr: that.data.urlArr.concat(res.fileID) 
                        })
                        object['urls'] = that.data.urlArr
                        // resolve({'urls':["上传成功"]})
                        if (that.data.urlArr.length == tempFilePaths.length) {
                            that.setData({
                                [`formData.src`]: that.data.urlArr
                            })
                            console.log(that.data.formData)
                            resolve(object)
                        }
                    }
                    
                })
            }
        })
    },
    uploadError(e) {
        console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
        console.log('upload success', e.detail)
    },

    genderTap: function(e) {
        var value = e.detail.value
        console.log("radio值", value)
        if (value=="r1") {
            this.setData({
                isGong: true,
                isMu: false,
                [`formData.gender`]: "公"
            })
        } else {
            this.setData({
                isGong: false,
                isMu: true,
                [`formData.gender`]: "母"
            })
        }
    }

});