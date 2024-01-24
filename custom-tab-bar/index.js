// custom-tab-bar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#7a7e83",
    selectedColor: "#3cc51f",
    list: [{
      "pagePath": "/pages/inputitems/inputitems",
      "iconPath": "/public/images/sensei.png",
      "selectedIconPath": "/public/images/sensei.png",
      "text": "选择家务"
    },{
      "pagePath": "/pages/mychoice/mychoice",
      "iconPath": "/public/avatar/myAvatar.png",
      "selectedIconPath": "/public/avatar/myAvatar.png",
      "text": "我的选择"
    },{
      "pagePath": "/pages/partnerchoice/partnerchoice",
      "iconPath": "/public/avatar/partnerAvatar.png",
      "selectedIconPath": "/public/avatar/partnerAvatar.png",
      "text": "同伴选择"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      console.log("执行跳转", e);
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
}
})