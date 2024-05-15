const app = getApp()

const chores = app.globalData.selected
const preferences = app.globalData.preferences
const times = app.globalData.times


Page({
	data: {
		first: 3,
		selected: app.globalData.selected,
		preferences: app.globalData.preferences,
		times: app.globalData.times,
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
