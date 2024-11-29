const app = getApp();

Page({
	data: {
		first: 1,
		ID: 0,
		selected: app.globalData.selected,
		preferences: app.globalData.preferences,
		times: app.globalData.times,
	},

	onShow: function () {
		this.setData({
			selected: app.globalData.selected,
			preferences: app.globalData.preferences[0],
			times: app.globalData.times[0],
		});
	},
	
	toinputitems: function () {
		wx.redirectTo({
			url: "/pages/inputitems/inputitems",
		});
		console.log(app.globalData.selected);
	},
	tomychoice: function () {
		wx.redirectTo({
			url: "/pages/mychoice/mychoice",
		});
	},
	topartnerchoice: function () {
		wx.redirectTo({
			url: "/pages/partnerchoice/partnerchoice",
		});
	},
	toadvice: function () {
		wx.redirectTo({
			url: "/pages/advice/advice",
		});
	},
});
