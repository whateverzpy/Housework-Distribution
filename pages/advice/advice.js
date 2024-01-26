// pages/advice/advice.js
Page({
	onShow: function () {
		if (typeof this.getTabBar === 'function' &&  this.getTabBar()) {
			this.getTabBar().setData({
				selected: 1
			})
		}
	}
});