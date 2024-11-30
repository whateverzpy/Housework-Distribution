const app = getApp();

Page({
	onShow: function () {
		// 处理所有7个复选框组
		for (let i = 1; i <= 7; i++) {
			const checkboxKey = `checkbox${i}`;
			this.data[checkboxKey] = this.data[checkboxKey].map((checkbox) => {
				checkbox.checked = app.globalData.selected.includes(checkbox.value);
				return checkbox;
			});
		}

		this.setData({
			selected: app.globalData.selected,
			checkbox1: this.data.checkbox1,
			checkbox2: this.data.checkbox2,
			checkbox3: this.data.checkbox3,
			checkbox4: this.data.checkbox4,
			checkbox5: this.data.checkbox5,
			checkbox6: this.data.checkbox6,
			checkbox7: this.data.checkbox7,
		});
	},
	data: {
		first: 0,
		checkbox1: [
			{ value: "摆放茶几物品", checked: false },
			{ value: "擦桌子", checked: false },
			{ value: "清洁客厅地板", checked: false },
			{ value: "客厅除尘", checked: false },
			{ value: "擦客厅窗户", checked: false },
			{ value: "浇花", checked: false },
		],
		checkbox2: [
			{ value: "做早餐", checked: false },
			{ value: "做午餐", checked: false },
			{ value: "做晚餐", checked: false },
			{ value: "买菜", checked: false },
			{ value: "清洁厨房地板", checked: false },
			{ value: "清洁微波炉", checked: false },
			{ value: "清洁冰箱", checked: false },
			{ value: "整理储藏柜物品", checked: false },
			{ value: "洗碗", checked: false },
		],
		checkbox3: [
			{ value: "清洁浴室地板", checked: false },
			{ value: "擦拭洗手台", checked: false },
			{ value: "清洁和更换毛巾", checked: false },
			{ value: "清洁浴缸", checked: false },
			{ value: "清洁马桶", checked: false },
		],
		checkbox4: [
			{ value: "清洁卧室地板", checked: false },
			{ value: "清洁并更换床上用品", checked: false },
			{ value: "清扫垃圾", checked: false },
			{ value: "卧室除尘", checked: false },
		],
		checkbox5: [
			{ value: "倒垃圾", checked: false },
			{ value: "洗衣服", checked: false },
			{ value: "晾晒和整理折叠衣物", checked: false },
			{ value: "熨烫衣物", checked: false },
		],
		checkbox6: [
			{ value: "接送（学校）", checked: false },
			{ value: "接送（课外班）", checked: false },
			{ value: "学习辅导", checked: false },
			{ value: "陪伴玩耍", checked: false },
		],
		checkbox7: [
			{ value: "婴儿喂食", checked: false },
			{ value: "婴儿洗澡", checked: false },
			{ value: "婴儿穿衣服", checked: false },
			{ value: "婴儿换尿布", checked: false },
		],
	},
	toinputitems: function () {
		wx.redirectTo({
			url: "/pages/inputitems/inputitems",
		});
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
	onCheckAllChange: function (e) {
		app.globalData.selected = e.detail.value;
	},
	resetCheckbox: function () {
		app.globalData.selected = [];
		this.setData({
			selected: app.globalData.selected,
		});
		wx.redirectTo({
			url: "/pages/inputitems/inputitems",
		});
	},
});
