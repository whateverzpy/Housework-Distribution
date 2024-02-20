// components/burden/burden.js
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
    value: 50,
    texts: ["讨厌","一般","喜欢"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
  }
})