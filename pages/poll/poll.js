// pages/poll/poll.js

const app = getApp()

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
      "options": [{ "id": "1", "name": "确认接种疫苗" }, { "id": "2", "name": "不接种疫苗" }],
      "deletedOptions": ["2"],
      "owner": "Tyler"
    },
    polls:[
      {
        "id": 1,
        "activityId": "1",
        "studentNumber": "1",
        "optionid": "1", 
        "voter": { "openid": "Tyler", "nickName": "Tyler", "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eolwNR2YeZ15iaFwlUTPticlgScBQ3B0sVL5WeossnGPedY5cpzDl2Oa4n2DvyVLCBictr302en5uRng/132" }
        
      }
    ],

    displayMode:"S",//S:按学生列表显示,O:按选项列表显示
    displayNoPoll:true,//true:列出未选择同学，false:不列出未选择同学
    displayDetail: "0",//0:只显示头像, 1:显示更多细节

    studentsMap: null,
    optionsMap: null,

    pollArray: null,

    
    
    array: [{ "id": "1", "name": "QQ" }, { "id": "2", "name": "玛奇朵" }],
    index: 0,
    pollid:2,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.buildStudentsMap()
    this.buildOptionsMap()
    this.buildPollVOArray()
  },

  buildPollVOArray: function(){
    // console.log("zmm pollList is: "+this.data.pollList)
    var pollArray = new Array()
    if (this.data.activity.activityType == "0"){

      var section = {}
      pollArray.push(section)


      section.id = this.data.activity.options[0].id
      section.name = this.data.activity.options[0].name
      section.pollArray = new Array()

      if (this.data.displayNoPoll) {
        //学生列表-显示未选择学生
        var map = new Map()
        for (var i = 0; i < this.data.clazz.students.length; i++) {
          var pollVO = {}
          pollVO.studentNumber = this.data.clazz.students[i].number
          pollVO.studentName = this.data.studentsMap.get(pollVO.studentNumber)
          pollVO.votes = []
          section.pollArray.push(pollVO)
          map.set(pollVO.studentNumber, pollVO)
        }
        for (var i = 0; i < this.data.polls.length; i++) {
          var pollVO = map.get(this.data.polls[i].studentNumber)
          if (pollVO) {
             pollVO.votes.push(this.data.polls[i])
          }
        }
      }else{
        //学生列表-不显示未选择学生
        for (var i = 0; i < this.data.polls.length; i++) {
          var pollVO = {}
          pollVO.studentNumber = this.data.polls[i].studentNumber
          pollVO.studentName = this.data.studentsMap.get(pollVO.studentNumber)
          pollVO.votes=[this.data.polls[i]]
          section.pollArray.push(pollVO)
        }
      }

    } else { //按选项显示
      var sectionMap = new Map()
      for (var i = 0; i < this.data.activity.options.length; i++) {
        var section = {}
        section.id = this.data.activity.options[i].id
        section.name = this.data.activity.options[i].name
        section.pollArray = new Array()
        sectionMap.set(section.id,section)

        pollArray.push(section)
      }

      for (var i = 0; i < this.data.polls.length; i++) {

          var pollVO = {}
          pollVO.studentNumber = this.data.polls[i].studentNumber
          pollVO.studentName = this.data.studentsMap.get(pollVO.studentNumber)
          pollVO.votes = [this.data.polls[i]]

          var section=sectionMap.get(pollVO.options[0].optionid)
          if(section){
            section.pollArray.push(pollVO)
          }

      }
    }

    this.setData({
      pollArray: pollArray
    })

    console.log(pollArray)

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

  bindSectionPickerChange: function(e){
    var section = this.data.pollArray[e.currentTarget.dataset.sectionindex]
    var pickerIndex = e.detail.value
    console.log("section is: ", section)
    var student = this.data.clazz.students[pickerIndex]
    var openid = app.globalData.openid

    var  poll = {}
    poll.id = this.data.pollid++
    poll.activityId = this.data.activity.id
    poll.studentNumber = student.number
    poll.optionid = section.id
    poll.voter = {}
    poll.voter.openid = openid
    poll.voter.nickname = app.globalData.userInfo.nickname
    poll.voter.avatarUrl = app.globalData.userInfo.avatarUrl
    
    var pollVO = {}
    pollVO.studentNumber = student.number
    pollVO.studentName = student.name
    pollVO.votes = []
    pollVO.votes.push(poll)

    this.data.polls.push(poll)
    section.pollArray.push(pollVO)
    

    this.setData({
      pollArray: this.data.pollArray
    })
  },





  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    console.log('zmm: ', e.currentTarget)
  },

  bindPollTap: function (e) {

    var section = this.data.pollArray[e.currentTarget.dataset.sectionindex]
    var pollVO = section.pollArray[e.currentTarget.dataset.pollindex]
    var poll = null
    var openid = app.globalData.openid
    var deleteVOIndex = -1
    if (pollVO.votes.length>0){
      for (var i = 0; i < pollVO.votes.length; i++) {
        if (pollVO.votes[i].voter.openid == openid){
          poll = pollVO.votes[i]
          deleteVOIndex = i
          break
        }
      }
    }
    if (deleteVOIndex >= 0){
      console.log("delete poll")
      var deleteIndex = -1
      for(var i=0;i<this.data.polls.length;i++){
        if (poll.id == this.data.polls[i].id){
          deleteIndex = i
        }
      }

      console.log("deleteIndex: ", deleteIndex)
      console.log("deleteVOIndex: ", deleteVOIndex)


      this.data.polls.splice(deleteIndex,1)
      pollVO.votes.splice(deleteVOIndex,1)
      if (this.data.displayMode == "O" && pollVO.votes.length == 0) {
        section.pollArray.splice(e.currentTarget.dataset.pollindex,1)
      }


      for (var i = 0; i < this.data.polls.length; i++) {
        console.log("this.data.polls[", i, "]: ", this.data.polls[i])
      }

      this.setData({
        pollArray: this.data.pollArray
      })
    } else {
      if (this.data.displayMode == "S") { //如果点击的接龙不是本人的，只有按学生列表的模式下才会增加接龙
        console.log("create poll")
        poll = {}
        poll.id = this.data.pollid++
        poll.activityId = this.data.activity.id
        poll.studentNumber = pollVO.studentNumber
        poll.optionid = section.id
        poll.voter = {}
        poll.voter.openid = openid
        poll.voter.nickName = app.globalData.userInfo.nickName
        poll.voter.avatarUrl = app.globalData.userInfo.avatarUrl

        console.log("adding poll: ", poll)
        this.data.polls.push(poll)
        pollVO.votes.push(poll)


        for (var i = 0; i < this.data.polls.length; i++) {
          console.log("this.data.polls[", i, "]: ", this.data.polls[i])
        }

        this.setData({
          pollArray: this.data.pollArray
        })

      }
    }
    
  }

})
