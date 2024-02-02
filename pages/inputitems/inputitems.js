
Page({
	options: {
		styleIsolation: 'apply-shared',
	},
	
});

Component({
	data: {
		first: 0,
		options1: [
      { label: '全选', checkAll: true },
      { label: '选项1', value: "选项1" },
      { label: '选项2', value: "选项2" },
      {
        label: '选项3',
        value: "选项3",
        content: '描述信息',
      },
		],
		options2: [
      { label: '全选', checkAll: true },
      { label: '选项4', value: "选项4" },
      { label: '选项5', value: "选项5" },
      {
        label: '选项6',
        value: "选项6",
        content: '描述信息',
      },
    ],
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
		onCheckAllChange(event) {
			console.log('checkbox', event.detail);
			event.detail.context.checked = !event.detail.context.checked
      this.setData({
        checkAllValues: event.detail,
      });
		},
		formReset(e) {
			console.log('form发生了reset事件，携带数据为：', e.detail.value)
			this.setData({
				chosen: ''
			})
		},
	},
	behaviors: ['wx://form-field-group']
})