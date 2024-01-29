const chineseNumber = '一二三四五六七八九十'.split('');

const generateTree = function (deep = 0, count = 10, prefix) {
  const ans = [];

  for (let i = 0; i < count; i += 1) {
    const value = prefix ? `${prefix}-${i}` : `${i}`;
    const rect = {
      label: `选项${chineseNumber[i]}`,
      value,
    };

    if (deep > 0) {
      rect.children = generateTree(deep - 1, 10, value);
    }
    ans.push(rect);
  }

  return ans;
};

Page({
	options: {
		styleIsolation: 'apply-shared',
	},
	data: {
		first: 0,
		options: generateTree(1),
		value: ['0', ['0-0', '0-1']],
	},
});

Component({
	data: {
		first: 0,
		options: generateTree(1),
		value: ['0', ['0-0', '0-1']],
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
		},
		onChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
	}
})