// components/inputitems/inputitems.js
Component({
  
  onLoad: function(options){
    let { person, label, participates, effort, duration } = options;
    this.setData({
        person,
        label,
        isDoingTask: participates? participates==='true' : false,
        happyLevel: effort? Number(effort) : 0,
        taskTime: duration? Number(duration) : 30,
    });

    this.publication = getApp().publication;
    this.onTaskChangePublication = this.publication.subscribe('onTaskChange', this.onTaskChange);
  },

  onUnload: function() {
    this.onTaskChangePublication.unsubscribe();
  },

  onTaskChange: function(newTaskInfo) {
    console.log('Received new task info: ', newTaskInfo);
  },

  updateIsDoingTask(e){
    this.setData({
        isDoingTask: e.detail.value==='true'
    })
    this.publishTaskChange();
  },

  updateHappyLevel(e){
    this.setData({
        happyLevel: Number(e.detail.value)
    })
    this.publishTaskChange();
  },

  updateTaskTime(e){
    this.setData({
        taskTime: e.detail.value
    })
    this.publishTaskChange();
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
    isDoingTask: false,
    happyLevel: 0,
    taskTime: 30
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})