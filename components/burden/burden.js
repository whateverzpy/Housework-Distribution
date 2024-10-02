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
  lifetimes: {
    attached() {
      app.globalData.times[this.properties.flag][
        this.properties.index
      ] = this.data.slidervalue;
      app.globalData.preferences[this.properties.flag][this.properties.index] =
        this.data.ratevalue - 1;
    },
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
    },
    onChange(e) {
      this.setData({
        ratevalue: e.detail.value,
      });
      app.globalData.preferences[this.properties.flag][this.properties.index] =
        e.detail.value - 1;
    },
  },
});
