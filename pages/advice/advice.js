const app = getApp();

const chores = app.globalData.selected;
const preferences = app.globalData.preferences;
const times = app.globalData.times;

const aliceUtility = [];
const bobUtility = [];

for (let i = 0; i < chores.length; i++) {
  aliceUtility.push((3 - preferences[0][i]) * times[0][i]);
  bobUtility.push((3 - preferences[1][i]) * times[1][i]);
}

function DeleteFromArray(Array1, item) {
  const Array2 = [];
  for (let i = 0; i < Array1.length; i++) {
    if (Array1[i] !== item) {
      Array2.push(Array1[i]);
      //console.log(Array1[i]);
    }
  }
  return Array2;
}

function AddIntoArray(Array1, item) {
  const Array2 = [];
  for (let i = 0; i < Array1.length; i++) {
    Array2.push(Array1[i]);
  }
  Array2.push(item);
  return Array2;
}

function SumArray(Array1) {
  return Array1.reduce((prev, cur) => cur + prev, 0);
}

function MaxArray(Array1) {
  return Array1.reduce((prev, cur) => Math.max(prev, cur), 0);
}

function isEFone(AliceUtility, BobUtility, AliceAllocation, BobAllocation) {
  const AAU = [];
  const BAU = [];
  const ABU = [];
  const BBU = [];
  for (let i = 0; i < AliceAllocation.length; i++) {
    AAU.push(AliceUtility[AliceAllocation[i]]);
    BAU.push(BobUtility[AliceAllocation[i]]);
  }
  for (let i = 0; i < BobAllocation.length; i++) {
    ABU.push(AliceUtility[BobAllocation[i]]);
    BBU.push(BobUtility[BobAllocation[i]]);
  }
  return (
    SumArray(AAU) - MaxArray(AAU) <= SumArray(ABU) &&
    SumArray(BBU) - MaxArray(BBU) <= SumArray(BAU)
  );
}

function initAllocate(selectedChores) {
  const AliceAllocation = [];
  const BobAllocation = [];
  for (let chore of selectedChores) {
    if (Math.random() < 0.5) {
      AliceAllocation.push(chore);
    } else {
      BobAllocation.push(chore);
    }
  }
  return AliceAllocation, BobAllocation;
}

function improvedAdjustedWinner(aliceUtility, bobUtility, taskList) {
  let ranNum = Math.random();
  let AliceAllocation = [];
  let BobAllocation = [];
  if (ranNum >= 0.5) {
    AliceAllocation = Array.from(Array(aliceUtility.length), (v, k) => k);
    BobAllocation = [];
    let alist = [];
    for (let i = 0; i < AliceAllocation.length; i++) {
      alist.push([
        AliceAllocation[i],
        bobUtility[AliceAllocation[i]] / aliceUtility[AliceAllocation[i]],
      ]);
    }
    alist.sort((a, b) => a[1] - b[1]);
    let t = 0;
    for (let i = 0; i < alist.length; i++) {
      if (
        isEFone(aliceUtility, bobUtility, AliceAllocation, BobAllocation) ==
        true
      ) {
        break;
      }
      if (t < alist.length) {
        AliceAllocation = DeleteFromArray(AliceAllocation, alist[t][0]);
        BobAllocation.push(alist[t][0]);
        t++;
      }
    }
    for (let i = t; i < alist.length; i++) {
      const BAU = [];
      const BBU = [];
      let aAllocation = DeleteFromArray(AliceAllocation, alist[t][0]);
      let bAllocation = AddIntoArray(BobAllocation, alist[t][0]);
      for (let i = 0; i < aAllocation.length; i++) {
        BAU.push(bobUtility[aAllocation[i]]);
      }
      for (let i = 0; i < bAllocation.length; i++) {
        BBU.push(bobUtility[bAllocation[i]]);
      }
      if (SumArray(BBU) > SumArray(BAU)) {
        break;
      }
      if (t < alist.length) {
        AliceAllocation = DeleteFromArray(AliceAllocation, alist[t][0]);
        BobAllocation.push(alist[t][0]);
        t++;
      }
    }
  } else {
    AliceAllocation = [];
    BobAllocation = Array.from(Array(bobUtility.length), (v, k) => k);
    let blist = [];
    for (let i = 0; i < BobAllocation.length; i++) {
      blist.push([
        BobAllocation[i],
        aliceUtility[BobAllocation[i]] / bobUtility[BobAllocation[i]],
      ]);
    }
    blist.sort((a, b) => a[1] - b[1]);
    let t = 0;
    for (let i = 0; i < blist.length; i++) {
      if (
        isEFone(aliceUtility, bobUtility, AliceAllocation, BobAllocation) ==
        true
      ) {
        break;
      }
      if (t < blist.length) {
        BobAllocation = DeleteFromArray(BobAllocation, blist[t][0]);
        AliceAllocation.push(blist[t][0]);
        t++;
      }
    }
    for (let i = t; i < blist.length; i++) {
      const ABU = [];
      const AAU = [];
      let aAllocation = AddIntoArray(AliceAllocation, blist[t][0]);
      let bAllocation = DeleteFromArray(BobAllocation, blist[t][0]);
      for (let i = 0; i < bAllocation.length; i++) {
        ABU.push(aliceUtility[bAllocation[i]]);
      }
      for (let i = 0; i < aAllocation.length; i++) {
        AAU.push(aliceUtility[aAllocation[i]]);
      }
      if (SumArray(AAU) > SumArray(ABU)) {
        break;
      }
      if (t < blist.length) {
        BobAllocation = DeleteFromArray(BobAllocation, blist[t][0]);
        AliceAllocation.push(blist[t][0]);
        t++;
      }
    }
  }
  const aliceTask = [];
  for (let i of AliceAllocation) {
    aliceTask.push(taskList[i]);
  }
  const bobTask = [];
  for (let i of BobAllocation) {
    bobTask.push(taskList[i]);
  }
  console.log(aliceTask, bobTask);
  return [aliceTask, bobTask];
}

let result = [];
result = improvedAdjustedWinner(aliceUtility, bobUtility, chores);

Page({
  data: {
    first: 3,
    selected: app.globalData.selected,
    preferences: app.globalData.preferences,
    times: app.globalData.times,
    aliceUtility: aliceUtility,
    bobUtility: bobUtility,
    result: result,
  },
  onShow: function () {
    this.setData({
      selected: app.globalData.selected,
    });
  },
  toinputitems: function () {
    wx.redirectTo({
      url: "/pages/inputitems/inputitems",
    });
    console.log(app.globalData.selected);
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
