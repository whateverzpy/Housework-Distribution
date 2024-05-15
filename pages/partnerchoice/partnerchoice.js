const app = getApp()

Page({
	data: {
		first: 2,
		ID: 1,
		selected: app.globalData.selected,
	},
	onShow: function() {
		this.setData({
			selected: app.globalData.selected
		})
	},
	toinputitems: function() {
		wx.redirectTo({
			url: '/pages/inputitems/inputitems',
		})
		console.log(app.globalData.selected)
	},
	tomychoice: function() {
		wx.redirectTo({
			url: '/pages/mychoice/mychoice',
		})
	},
	topartnerchoice: function() {
		wx.redirectTo({
			url: '/pages/partnerchoice/partnerchoice',
		})
	},
	toadvice: function() {
		wx.redirectTo({
			url: '/pages/advice/advice',
		})
	},
})
