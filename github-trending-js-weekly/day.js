function getweek(dateString) {
  var da = ''
  if (dateString == undefined) {
    var now = new Date()
    var now_m = now.getMonth() + 1
    now_m = now_m < 10 ? '0' + now_m : now_m
    var now_d = now.getDate()
    now_d = now_d < 10 ? '0' + now_d : now_d
    da = now.getFullYear() + '-' + now_m + '-' + now_d
    console.log('今天系统时间是:' + da)
  } else {
    da = dateString //日期格式2015-12-30
  }
  var date1 = new Date(
    da.substring(0, 4),
    parseInt(da.substring(5, 7)) - 1,
    da.substring(8, 10)
  ) //当前日期
  var date2 = new Date(da.substring(0, 4), 0, 1) //1月1号
  //获取1月1号星期（以周一为第一天，0周一~6周日）
  var dateWeekNum = date2.getDay() - 1
  if (dateWeekNum < 0) {
    dateWeekNum = 6
  }
  if (dateWeekNum < 4) {
    //前移日期
    date2.setDate(date2.getDate() - dateWeekNum)
  } else {
    //后移日期
    date2.setDate(date2.getDate() + 7 - dateWeekNum)
  }
  var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
  if (d < 0) {
    var date3 = date1.getFullYear() - 1 + '-12-31'
    return getYearWeek(date3)
  } else {
    //得到年数周数
    var year = date1.getFullYear()
    var week = Math.ceil((d + 1) / 7)
    console.log(year + '年第' + week + '周')
    return week
  }
}

const a = getweek('2020-11-08')

console.log(' --- a --- ', a);
