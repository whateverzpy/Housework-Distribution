// components/burden/burden.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag: {
      type: Number,
    },
    index: {
      type: Number,
    },
    content: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    ratevalue: 2,
    slidervalue: 50,
    texts: ["讨厌", "一般", "喜欢"],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e) {
      this.setData({
        slidervalue: e.detail.value,
      });
      app.globalData.times[this.properties.flag][this.properties.index] =
        e.detail.value;
      console.log(app.globalData.times);
    },
    onChange(e) {
      this.setData({
        ratevalue: e.detail.value,
      });
      app.globalData.preferences[this.properties.flag][this.properties.index] =
        e.detail.value - 1;
      console.log(app.globalData.preferences);
    },
  },
});
