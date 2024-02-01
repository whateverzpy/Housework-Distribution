
Page({
	options: {
		styleIsolation: 'apply-shared',
	},
});

Component({
	data: {
		first: 0,
		options: [
      { label: '全选', checkAll: true },
      { label: '多选', value: 1 },
      { label: '多选', value: 2 },
      {
        label: '多选',
        value: 3,
        content: '单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息单选描述信息',
      },
    ],
    checkAllValues: [1, 2, 3, ''],
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
		},
		onChange(e) {
      this.setData({
        value: e.detail.value,
      });
		},
		onCheckAllChange(event) {
      console.log('checkbox', event.detail.value);
      this.setData({
        checkAllValues: event.detail,
      });
    },
	}
})