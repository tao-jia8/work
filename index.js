// index.js
var gbk = require('../../libs/gbk.js');
// 获取应用实例
const app = getApp()

Page({
  data: {
    background: '',
    inputText: '',
    GBK: '',
    historyData: '',
    historyName: '历史',
    common: `主: D6 F7
    变: B1 E4
    保: B1 A3
    护: BB A4
    站: D5 BE
    用: D3 C3
    电: B5 E7
    容: C8 DD
    器: C6 F7
    抗: BF B9
    线: CF DF
    空格: 32
    M: 77
    #: 35
    0: 48
    1: 49
    2: 50
    `,

    // motto: '有意思科技',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad() {
  //   let that = this;
  //   // let windowHeight = 0, statusBarHeight=0;
  //   wx.getSystemInfo({

  //     success(res) {
  //       // console.log(res.model)
  //       // console.log(res.pixelRatio)
  //       // console.log(`宽${res.windowWidth}`)
  //       console.log(`高${res.windowHeight}`)
  //       // console.log(res.language)
  //       // console.log(res.version)
  //       console.log(`状态栏高${res.statusBarHeight}`)
  //       // 获取可使用窗口宽度
  //       let clientHeight = res.windowHeight;
  //       // 获取可使用窗口高度
  //       let clientWidth = res.windowWidth;
  //       // 算出比例
  //       let ratio = 750 / clientWidth;
  //       // 算出高度(单位rpx)
  //       let height = (clientHeight - res.statusBarHeight) * ratio - 44 ;
  //       // 设置高度
  //       that.setData({
  //         height: height
  //       });

  //     }
  //   })
  //   // this.setData({
  //   //   height: windowHeight - statusBarHeight,

  //   // })
  //   console.log(this.data.height);

  // },
  onLoad() {
    let that = this;
    wx.getStorage({
      key: 'historyData',
      success(res) {
        // console.log(`获取历史查询${res.data}`);
        that.setData({
          historyData: res.data,
        })
      }
    })

  },


  onChange(e) {
    //把处理逻辑放在500ms的定时器中
    let number = setTimeout(() => {
      let str = e.detail.value;
      let newStr = "";
      for (var i = 0; i < str.length; i++) {
        if (newStr.indexOf(str[i]) == -1) //去重
          newStr += str[i];
      }
      let arr = newStr.split('');
      let text = '';
      for (let i = 0; i < arr.length; i++) {
        let temp = `${arr[i]}: ${gbk.encode(arr[i])}
    `.replace(',', ' '); //调用了gbk库里的encode函数返回gbk码和原字符串拼接（结尾有换行），并将返回的逗号用空格替换
        text += temp;
        console.time();
        //如果历史查询过，在历史中先删除
        if (this.data.historyData.indexOf(temp) != -1) {
          this.data.historyData = this.data.historyData.replace(temp, '');
         
        }
        console.timeEnd();

      }

      this.setData({
        GBK: text,
        historyData: text + this.data.historyData //把最新查询添加到历史中
      })
      wx.setStorage({
        key: "historyData",
        data: this.data.historyData //更新缓存
      })

    }, 500);

    //如果连续输入，清除之前的定时器
    while (--number)
      clearTimeout(number);
  },



  // 常用
  common() {
    this.setData({
      GBK: this.data.common
    })

  },

  // 历史
  history() {
    this.setData({
      GBK: this.data.historyData
    })

  },

  //复位
  reset() {
    this.setData({
      inputText: '',
      GBK: ''
    })

  },

  onShareAppMessage() {
    return {
      title: '速查'
    }
  },

  onShareTimeline: function() {
    return {
      title: '收藏备用,汉字GBK码速查小程序来了'
    }
  }

})