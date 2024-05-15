const swiperList = [
  `/public/images/illust-1.png`,
  `/public/images/illust-2.png`,
  `/public/images/illust-3.png`,
  `/public/images/illust-4.png`,
];

Page({
  onShareAppMessage: function () {
    // 返回自定义分享信息
    return {
      title: '家务分配',
      path: '/pages/index/index',
      imageUrl: '/public/favicon.ico',
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
