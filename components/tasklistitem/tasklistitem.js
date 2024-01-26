// components/tasklistitem/tasklistitem.js
Component({

  onLoad: function(options) {
    // 在页面加载时，处理传入的props，这里假设props通过options传入
    const task = options.task;
    this.setData({
      task: task,
      checked: task.checked
    });
  },
  handleCheckChange: function(e) {
    const checked = e.detail.value; // 获取复选框状态
    this.setData({
      checked: checked
    });
    // 传递修改后的状态
    this.triggerEvent('onChangeState', {index: this.data.task.index, checked: checked});
  },
  handleClick: function(e) {
    e.preventDefault();
    const checked = !this.data.checked;
    this.setData({
      checked: checked
    });
    // 传递修改后的状态
    this.triggerEvent('onChangeState', {index: this.data.task.index, checked: checked});
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    task: {name: '', checked: false}, // 初始化任务数据
    checked: false // 初始化复选框状态
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})