const app = getApp()

Page({
	onShow: function() {
		this.data.checkbox1 = this.data.checkbox1.map(checkbox => {
			checkbox.checked = app.globalData.selected.includes(checkbox.value)
			return checkbox;
		})
		this.data.checkbox2 = this.data.checkbox2.map(checkbox => {
			checkbox.checked = app.globalData.selected.includes(checkbox.value)
			return checkbox;
		})
		this.setData({
			selected: app.globalData.selected,
			checkbox1: this.data.checkbox1,
			checkbox2: this.data.checkbox2
		})
	},
	data: {
		first: 0,
		checkbox1: [
      { value: '选项一', checked: false },
      { value: '选项二', checked: false },
      { value: '选项三', checked: false }
		],
		checkbox2: [
      { value: '选项四', checked: false },
      { value: '选项五', checked: false },
      { value: '选项六', checked: false }
		],
	},
	toinputitems: function() {
		wx.redirectTo({
			url: '/pages/inputitems/inputitems',
		})
	},
	tomychoice: function() {
		wx.redirectTo({
			url: '/pages/mychoice/mychoice',
		})
		console.log(app.globalData.selected)
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
	onCheckAllChange: function(e) {
		console.log('checkbox', e.detail.value)
		app.globalData.selected = e.detail.value
	},
	resetCheckbox: function() {
		app.globalData.selected = []
		this.setData({
			selected: app.globalData.selected
		})
		wx.redirectTo({
			url: '/pages/inputitems/inputitems',
		})
	}
})