Page({
	options: {
		styleIsolation: 'apply-shared',
	},

});

Component({
	data: {
		first: 0
	},
	methods: {
		toinputitems(e) {
			wx.navigateTo({
				url: '/pages/inputitems/inputitems',
			})
		},
		tomychoice(e) {
			wx.redirectTo({
				url: '/pages/mychoice/mychoice',
			})
		},
		topartnerchoice(e) {
			wx.redirectTo({
				url: '/pages/partnerchoice/partnerchoice',
			})
		},
		toadvice(e) {
			wx.redirectTo({
				url: '/pages/advice/advice',
			})
		}
	}
})