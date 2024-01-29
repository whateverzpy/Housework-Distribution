Page({
	
});

Component({
	data: {
		first: 1
	},
	methods: {
		toinputitems(e) {
			wx.redirectTo({
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