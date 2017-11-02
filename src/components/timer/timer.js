import Vue from "vue"


Vue.filter("setDate",function(time){
	var d=new Date(time);
	// 年
	var year=d.getFullYear();
	// 月
	var month=d.getUTCMonth()+1;
	//日
	var day=d.getDate();
	// console.log(year,month,day)
	//小时
	var h=d.getHours();
	//分钟
	var m=d.getMinutes();
	//秒
	var s=d.getSeconds();
	return year+"-"+month+"-"+day+" "+h+":"+m;

})