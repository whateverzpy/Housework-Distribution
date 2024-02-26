// components/burden/burden.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ratevalue: 2,
    slidervalue: 50,
    texts: ["讨厌","一般","喜欢"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e) {
      this.setData({
        slidervalue: e.detail.value,
      });
    },
    onChange(e) {
      const { index } = e.currentTarget.dataset;
      const { value } = e.detail;
      this.setData({
        ratevalue: value,
      });
    },
  }
})