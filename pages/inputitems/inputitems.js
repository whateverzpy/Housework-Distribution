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
		onFirstChange(e) {
			this.setData({ first: e.detail.current });
		}
	}
})