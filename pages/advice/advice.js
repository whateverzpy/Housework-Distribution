const app = getApp();

const chores = app.globalData.selected;
const preferences = app.globalData.preferences;
const times = app.globalData.times;

const aliceUtility = [];
const bobUtility = [];

function deleteFromArray(array, item) {
	return array.filter((element) => element !== item);
}

function addIntoArray(array, item) {
	return [...array, item];
}

function sumArray(array) {
	return array.reduce((prev, cur) => cur + prev, 0);
}

function maxArray(array) {
	return array.reduce((prev, cur) => Math.max(prev, cur), 0);
}

function isEFone(aliceUtility, bobUtility, aliceAllocation, bobAllocation) {
	const AAU = aliceAllocation.map((index) => aliceUtility[index]);
	const BAU = aliceAllocation.map((index) => bobUtility[index]);
	const ABU = bobAllocation.map((index) => aliceUtility[index]);
	const BBU = bobAllocation.map((index) => bobUtility[index]);

	return (
		sumArray(AAU) - maxArray(AAU) <= sumArray(ABU) &&
		sumArray(BBU) - maxArray(BBU) <= sumArray(BAU)
	);
}

function isEF(aliceUtility, bobUtility, aliceAllocation, bobAllocation) {
	const AAU = aliceAllocation.map((index) => aliceUtility[index]);
	const BAU = aliceAllocation.map((index) => bobUtility[index]);
	const ABU = bobAllocation.map((index) => aliceUtility[index]);
	const BBU = bobAllocation.map((index) => bobUtility[index]);

	return sumArray(AAU) <= sumArray(ABU) && sumArray(BBU) <= sumArray(BAU);
}

function initAllocate(selectedChores) {
	const aliceAllocation = [];
	const bobAllocation = [];
	selectedChores.forEach((chore) => {
		if (Math.random() < 0.5) {
			aliceAllocation.push(chore);
		} else {
			bobAllocation.push(chore);
		}
	});
	return [aliceAllocation, bobAllocation];
}

function adjustedWinner(aliceUtility, bobUtility, taskList) {
	let aliceAllocation = Array.from(Array(aliceUtility.length), (v, k) => k);
	let bobAllocation = [];
	let alist = aliceAllocation.map((index) => [
		index,
		bobUtility[index] / aliceUtility[index],
	]);

	alist.sort((a, b) => a[1] - b[1]);

	let t = 0;
	while (
		t < alist.length &&
		!isEFone(aliceUtility, bobUtility, aliceAllocation, bobAllocation)
	) {
		aliceAllocation = deleteFromArray(aliceAllocation, alist[t][0]);
		bobAllocation.push(alist[t][0]);
		t++;
	}

	const aliceTask = aliceAllocation.map((index) => taskList[index]);
	const bobTask = bobAllocation.map((index) => taskList[index]);

	console.log(aliceTask, bobTask);
	return [aliceTask, bobTask];
}

function improvedAdjustedWinner(aliceUtility, bobUtility, taskList) {
	const ranNum = Math.random();
	let aliceAllocation = [];
	let bobAllocation = [];

	if (ranNum >= 0.5) {
		aliceAllocation = Array.from(Array(aliceUtility.length), (v, k) => k);
		let alist = aliceAllocation.map((index) => [
			index,
			bobUtility[index] / aliceUtility[index],
		]);

		alist.sort((a, b) => a[1] - b[1]);

		let t = 0;
		while (
			t < alist.length &&
			!isEF(aliceUtility, bobUtility, aliceAllocation, bobAllocation)
		) {
			aliceAllocation = deleteFromArray(aliceAllocation, alist[t][0]);
			bobAllocation.push(alist[t][0]);
			t++;
		}

		for (let i = t; i < alist.length; i++) {
			const BAU = bobAllocation.map((index) => bobUtility[index]);
			const BBU = addIntoArray(bobAllocation, alist[t][0]).map(
				(index) => bobUtility[index]
			);

			if (sumArray(BBU) > sumArray(BAU)) break;

			aliceAllocation = deleteFromArray(aliceAllocation, alist[t][0]);
			bobAllocation.push(alist[t][0]);
			t++;
		}
	} else {
		bobAllocation = Array.from(Array(bobUtility.length), (v, k) => k);
		let blist = bobAllocation.map((index) => [
			index,
			aliceUtility[index] / bobUtility[index],
		]);

		blist.sort((a, b) => a[1] - b[1]);

		let t = 0;
		while (
			t < blist.length &&
			!isEF(aliceUtility, bobUtility, aliceAllocation, bobAllocation)
		) {
			bobAllocation = deleteFromArray(bobAllocation, blist[t][0]);
			aliceAllocation.push(blist[t][0]);
			t++;
		}

		for (let i = t; i < blist.length; i++) {
			const ABU = aliceAllocation.map((index) => aliceUtility[index]);
			const AAU = addIntoArray(aliceAllocation, blist[t][0]).map(
				(index) => aliceUtility[index]
			);

			if (sumArray(AAU) > sumArray(ABU)) break;

			bobAllocation = deleteFromArray(bobAllocation, blist[t][0]);
			aliceAllocation.push(blist[t][0]);
			t++;
		}
	}

	const aliceTask = aliceAllocation.map((index) => taskList[index]);
	const bobTask = bobAllocation.map((index) => taskList[index]);

	console.log(aliceTask, bobTask);
	return [aliceTask, bobTask];
}

let result = adjustedWinner(aliceUtility, bobUtility, chores);

// console.log(aliceUtility, bobUtility);

function calculateBurden(tasks, preferences, times, personIndex) {
	const burdens = {};
	tasks.forEach((task) => {
		const taskIndex = chores.indexOf(task);
		if (taskIndex !== -1) {
			burdens[task] =
				(3 - preferences[personIndex][taskIndex]) *
				times[personIndex][taskIndex];
		}
	});
	return burdens;
}

import * as echarts from "../../components/ec-canvas/echarts.js";
var chart = null;

function convertBurdensToChartData(burdens) {
	return Object.entries(burdens).map(([choreName, burden]) => ({
		value: burden,
		name: choreName,
	}));
}

Page({
	data: {
		first: 3,
		selected: app.globalData.selected,
		preferences: app.globalData.preferences,
		times: app.globalData.times,
		aliceUtility: aliceUtility,
		bobUtility: bobUtility,
		result: result,
		aliceBurdens: {},
		bobBurdens: {},
		aliceChartData: [],
		bobChartData: [],
		ec: {
			lazyLoad: true,
		},
		isLoaded: false,
	},
	onReady: function () {
		// 获取图表组件实例
		this.ecComponent = this.selectComponent("#mychart-dom-pie");
	},
	// 初始化图表的方法
	initChart: function () {
		if (!this.ecComponent || !this.data.aliceChartData.length) {
			return;
		}

		this.ecComponent.init((canvas, width, height, dpr) => {
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height,
				devicePixelRatio: dpr,
			});

			const option = {
				title: {
					text: "任务分配图表", // 添加标题
					left: "center",
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b}: {c} ({d}%)", // 改进提示框显示
				},
				series: [
					{
						name: "任务负担",
						type: "pie",
						radius: "65%",
						center: ["50%", "50%"],
						data: this.data.aliceChartData,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			};

			chart.setOption(option);
			this.chart = chart;

			// 设置 isLoaded 为 true
			this.setData({
				isLoaded: true,
			});

			return chart;
		});
	},

	onShow: function () {
		// 清空并重新计算数据
		aliceUtility.length = 0;
		bobUtility.length = 0;

		for (let i = 0; i < chores.length; i++) {
			aliceUtility.push((3 - preferences[0][i]) * times[0][i]);
			bobUtility.push((3 - preferences[1][i]) * times[1][i]);
		}

		result = adjustedWinner(aliceUtility, bobUtility, chores);

		const aliceBurdens = calculateBurden(result[0], preferences, times, 0);
		const bobBurdens = calculateBurden(result[1], preferences, times, 1);

		const aliceChartData = convertBurdensToChartData(aliceBurdens);
		const bobChartData = convertBurdensToChartData(bobBurdens);

		this.setData(
			{
				selected: app.globalData.selected,
				preferences: app.globalData.preferences,
				times: app.globalData.times,
				aliceUtility: aliceUtility,
				bobUtility: bobUtility,
				result: result,
				aliceBurdens: aliceBurdens,
				bobBurdens: bobBurdens,
				aliceChartData: aliceChartData,
				bobChartData: bobChartData,
			},
			() => {
				// 数据更新完成后立即初始化图表
				setTimeout(() => {
					this.initChart();
				}, 100); // 添加小延时确保组件已经完全渲染
			}
		);
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
});
