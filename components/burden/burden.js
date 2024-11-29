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
			const flag = this.properties.flag;
			const index = this.properties.index;

			// 如果已有保存的值，使用保存的值
			if (
				app.globalData.times[flag] &&
				app.globalData.times[flag][index] !== undefined
			) {
				this.setData({
					slidervalue: app.globalData.times[flag][index],
				});
			}

			if (
				app.globalData.preferences[flag] &&
				app.globalData.preferences[flag][index] !== undefined
			) {
				this.setData({
					ratevalue: app.globalData.preferences[flag][index] + 1,
				});
			} else {
				// 否则使用默认值
				app.globalData.times[flag][index] = this.data.slidervalue;
				app.globalData.preferences[flag][index] = this.data.ratevalue - 1;
			}
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
