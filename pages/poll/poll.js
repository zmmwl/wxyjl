// pages/poll/poll.js
Page({

  /**
   * Page initial data
   */
  data: {
    clazz:
    {
      "id": "1",
      "className": "1年级5班",
      "students": [{ "number": "1", "name": "QQ" }, { "number": "2", "name": "秦墨轩" }, { "number": "3", "name": "玛奇朵" }],
      "owner": "Tyler"
    },
    activity:
    {
      "id": "1",
      "activityName": "疫苗确认接龙",
      "activityType": "0", //0:签名接龙，1：单选接龙，2：多选接龙
      "classId": "1",
      "createDate": "2019-08-01 12:00:00",
      "options": [{ "id": "1", "name": "参加" }, { "id": "2", "name": "不参加" }],
      "deletedOptions": ["2"],
      "owner": "Tyler"
    },
    polls:[
      {
        "id": "xxx",
        "activityId": "1",
        "studentNumber": "1",
        "studentName": "QQ",
        "options": [
          { "id": "1", "voter": { "openid": "Tyler", "nickname": "Tyler", "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eolwNR2YeZ15iaFwlUTPticlgScBQ3B0sVL5WeossnGPedY5cpzDl2Oa4n2DvyVLCBictr302en5uRng/132" } },
          { "id": "2", "voter": { "openid": "Tyler", "nickname": "Tyler", "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eolwNR2YeZ15iaFwlUTPticlgScBQ3B0sVL5WeossnGPedY5cpzDl2Oa4n2DvyVLCBictr302en5uRng/132" } }
        ]
      }
    ],

    displayMode:"S",//S:按学生列表显示,O:按选项列表显示
    displayNoPoll:true,//true:列出未选择同学，false:不列出未选择同学
    displayDetail: "0",//0:只显示头像, 1:显示更多细节

    studentsMap: null,
    optionsMap: null,
    pollStudentMap: null,

    pollArray: null,
    
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.buildStudentsMap()
    this.buildOptionsMap()
    this.buildPollArray()
  },

  buildPollArray: function(){
    // console.log("zmm pollList is: "+this.data.pollList)
    var pollArray = new Array()
    if (this.data.displayMode == "S"){

      var option = new Object()
      option.pollArray = new Array()

      if(this.data.displayNoPoll){
        //学生列表-显示未选择学生
        for(var i=0; i<this.data.clazz.students; i++){
          var poll = new Object()
          poll.studentNumber = this.data.clazz.students[i].number
          poll.studentName = this.data.clazz.students[i].name
          if (pollStudentMap.get(poll.studentNumber)){
            var polled = pollStudentMap.get(poll.studentNumber)
            poll.options = polled.options
          }else{
            poll.options = []
          }
          option.pollArray[i] = poll
        }
      }else{
        //学生列表-不显示未选择学生
        for (var i = 0; i < this.data.polls; i++) {
          var poll = new Object()
          poll.studentNumber = this.data.polls[i].studentNumber
          poll.studentName = this.data.polls[i].studentName
          poll.options = this.data.polls[i].options
          option.pollArray[i] = poll
        }
      }

      pollArray[0] = option

    } else { //按选项显示
      var opMap = new Map()
      for (var i = 0; i < this.data.activity.options.length; i++) {
        var option = new Object()
        option.option = this.data.activity.options[i]
        option.id = this.data.activity.options[i].id
        option.name = this.data.optionsMap.get(this.data.activity.options[i].id)
        option.pollArray = new Array()
        opMap.set(option.id,option)

        pollArray[i] = option
      }

      for (var i = 0; i < this.data.polls.length; i++) {
        for (var j = 0; j < this.data.polls[i].options; j++){

          var poll = new Object()
          poll.studentNumber = this.data.polls[i].studentNumber
          poll.studentName = this.data.polls[i].studentName
          poll.options = [this.data.polls[i].options[j]]

          opMap.get(this.data.polls[i].options[j].id).pollArray.push(poll)
        }

      }

      if (this.data.displayNoPoll) {

      }
    }

    this.setData({
      pollArray: pollArray
    })

  },

  buildPollStudentMap: function () {
    if (this.data.polls) {
      var map = new Map()
      for (var i = 0; i < this.data.polls.length; i++) {
        map.set(this.data.polls[i].studentNumber, this.data.polls[i])
      }
      this.data.pollStudentMap = map
    }

  },

  buildOptionsMap: function () {
    if (this.data.activity) {
      var map = new Map()
      for (var i = 0; i < this.data.activity.options.length; i++) {
        map.set(this.data.activity.options[i].id, this.data.activity.options[i].name)
      }
      this.data.optionsMap = map
    }
  },

  buildStudentsMap: function(){
    if(this.data.clazz){
      var map = new Map()
      for (var i = 0; i < this.data.clazz.students.length; i++){
        map.set(this.data.clazz.students[i].number, this.data.clazz.students[i].name)
      }
      this.data.studentsMap = map
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    console.log('zmm: ', e.currentTarget)
  },
  bindPickerTap: function (e) {
    console.log('picker tap event: ', e)
    this.setData({
      array: ["zmm", "wl"]
    })

  }
})