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

let result = improvedAdjustedWinner(aliceUtility, bobUtility, chores);

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
		ec1: {
			lazyLoad: true,
		},
		ec2: {
			lazyLoad: true,
		},
		isLoaded1: false,
		isLoaded2: false,
	},
	onReady: function () {
		// 获取图表组件实例
		this.ecComponent1 = this.selectComponent("#mychart-dom-pie1");
		this.ecComponent2 = this.selectComponent("#mychart-dom-pie2");
	},
	// 初始化图表的方法
	initChart: function () {
		// 初始化Alice的图表
		if (this.ecComponent1 && this.data.aliceChartData.length) {
			this.ecComponent1.init((canvas, width, height, dpr) => {
				const chart1 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr,
				});

				const option1 = {
					title: {
						text: "我的任务分配",
						left: "center",
					},
					tooltip: {
						trigger: "item",
						formatter: "{b}: {c} ({d}%)",
						position: [0, 0],
					},
					series: [
						{
							name: "我的任务负担",
							type: "pie",
							radius: ["40%", "70%"],
							center: ["50%", "50%"],
							label: {
								show: false,
								position: "center",
							},
							data: this.data.aliceChartData,
							emphasis: {
								label: {
									show: true,
									fontSize: 15,
								},
							},
							labelLine: {
								show: false,
							},
						},
					],
					legend: {
						bottom: 0,
						type: "scroll",
					},
					color: [
						"#ff4500",
						"#2e8b57",
						"#468499",
						"#8b0000",
						"#cd5c5c",
						"#ffa500",
						"#1e90ff",
						"#adff2f",
						"#9400d3",
						"#ff1493",
						"#00ced1",
						"#20b2aa",
						"#5f9ea0",
						"#b8860b",
						"#7b68ee",
						"#00fa9a",
						"#ff7f50",
						"#8fbc8f",
						"#dda0dd",
						"#db7093",
						"#4169e1",
						"#8b4513",
						"#48d1cc",
						"#708090",
						"#6a5acd",
						"#00bfff",
						"#66cdaa",
						"#bc8f8f",
						"#9932cc",
						"#e9967a",
						"#dc9b9b",
						"#ffefd5",
						"#ff00ff",
						"#ffdab9",
						"#87cefa",
						"#6b8e23",
					],
				};

				chart1.setOption(option1);
				this.chart1 = chart1;
				this.setData({
					isLoaded1: true,
				});
				return chart1;
			});
		}

		// 初始化Bob的图表
		if (this.ecComponent2 && this.data.bobChartData.length) {
			this.ecComponent2.init((canvas, width, height, dpr) => {
				const chart2 = echarts.init(canvas, null, {
					width: width,
					height: height,
					devicePixelRatio: dpr,
				});

				const option2 = {
					title: {
						text: "同伴的任务分配",
						left: "center",
					},
					tooltip: {
						trigger: "item",
						formatter: "{b}: {c} ({d}%)",
						position: [0, 0],
					},
					series: [
						{
							name: "同伴的任务负担",
							type: "pie",
							radius: ["40%", "70%"],
							center: ["50%", "50%"],
							label: {
								show: false,
								position: "center",
							},
							data: this.data.bobChartData,
							emphasis: {
								label: {
									show: true,
									fontSize: 15,
								},
							},
							labelLine: {
								show: false,
							},
						},
					],
					legend: {
						bottom: 0,
						type: "scroll",
					},
					color: [
						"#5470c6",
						"#91cc75",
						"#fac858",
						"#ee6666",
						"#73c0de",
						"#3ba272",
						"#fc8452",
						"#9a60b4",
						"#ea7ccc",
						"#6e7074",
						"#c4ccd3",
						"#f6d54a",
						"#f69846",
						"#009db2",
						"#d35d6e",
						"#58a55c",
						"#7d83ff",
						"#ffa07a",
						"#9acd32",
						"#40e0d0",
						"#ff69b4",
						"#ba55d3",
						"#4682b4",
						"#ff6347",
						"#d2691e",
						"#ffd700",
						"#87ceeb",
						"#32cd32",
						"#8a2be2",
						"#dc143c",
						"#7f8c8d",
						"#27ae60",
						"#e67e22",
						"#2980b9",
						"#16a085",
						"#f39c12",
					],
				};

				chart2.setOption(option2);
				this.chart2 = chart2;
				this.setData({
					isLoaded2: true,
				});
				return chart2;
			});
		}
	},

	onShow: function () {
		// 清空并重新计算数据
		aliceUtility.length = 0;
		bobUtility.length = 0;

		for (let i = 0; i < chores.length; i++) {
			aliceUtility.push((3 - preferences[0][i]) * times[0][i]);
			bobUtility.push((3 - preferences[1][i]) * times[1][i]);
		}

		result = improvedAdjustedWinner(aliceUtility, bobUtility, chores);

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
