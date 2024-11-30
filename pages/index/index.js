const swiperList = [
  `https://miniprograme-1332491040.cos.ap-guangzhou.myqcloud.com/public/images/swaper1.jpg`,
  `https://miniprograme-1332491040.cos.ap-guangzhou.myqcloud.com/public/images/swaper2.jpg`,
  `https://miniprograme-1332491040.cos.ap-guangzhou.myqcloud.com/public/images/swaper3.jpg`,
  `https://miniprograme-1332491040.cos.ap-guangzhou.myqcloud.com/public/images/swaper4.jpg`,
];

Page({
  onShareAppMessage: function () {
    // 返回自定义分享信息
    return {
      title: '家务分配',
      path: '/pages/index/index',
      imageUrl: 'https://miniprograme-1332491040.cos.ap-guangzhou.myqcloud.com/public/favicon.ico',
      success: function (shareTickets) {
        // 分享成功的回调函数
        console.log('分享成功', shareTickets);
      },
      fail: function (err) {
        // 分享失败的回调函数
        console.log('分享失败', err);
      }
    }
  },
  data: {
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
    swiperList,
  },
  toinputitems: function() {
    wx.navigateTo({
      url: '/pages/inputitems/inputitems'
    })
  }
});
