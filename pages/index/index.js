const swiperList = [
  `/public/images/illust-1.png`,
  `/public/images/illust-2.png`,
  `/public/images/illust-3.png`,
  `/public/images/illust-4.png`,
];

Page({
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
