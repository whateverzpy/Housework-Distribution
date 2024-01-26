Page({
  data: {
    imgPath1: '/public/images/illust-1.png',
    imgPath2: '/public/images/illust-2.png',
    imgPath3: '/public/images/illust-3.png',
    imgPath4: '/public/images/illust-4.png',
  },
  ToInputItems() {
    wx.switchTab({
      url: '/pages/inputitems/inputitems',
    })
  },
  // onShow() {
  //   if (typeof this.getTabBar === 'function' &&
  //     this.getTabBar()) {
  //     this.getTabBar().setData({
  //       selected: 0
  //     })
  //   }
  // }, 
});