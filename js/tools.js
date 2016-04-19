/**
 * Created by Admin on 2016/3/10.
 */
// JavaScript Document
var TOOLS = {};
//ʱ��ת������
TOOLS.datetime_to_unix = function (datetime){
//    var tmp_datetime = datetime.replace(/:/g,'-');
//    tmp_datetime = tmp_datetime.replace(/ /g,'-');
//    var arr = tmp_datetime.split("-");
    var now = new Date(datetime);
    return parseInt(now.getTime()/1000);
}

TOOLS.unix_to_datetime = function (unix){
    var now = new Date(parseInt(unix) * 1000);
    return now.toLocaleString().replace(/��|��/g, "-").replace(/��/g, " ");
}
TOOLS.getNowFormatDate = function (){
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
//IP����У��
TOOLS.isIP = function (strIP) {
    var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //ƥ��IP��ַ��������ʽ
    if(re.test(strIP)) {
        if(RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)
            return true;
    }
    return false;
}
TOOLS.isIPblock = function (strIPblock) {
    var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/g //ƥ��IP�ε�ַ��������ʽ
    if(re.test(strIPblock)) {
        if(RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256 && RegExp.$5<=32)
            return true;
    }
    return false;
}

//����״̬
TOOLS.statusMsg = function (message){
    $("#notice").remove();
    $("<p id='notice'></p>").text(message).appendTo("body");
    var c_left =  ($(document).width() - $("#notice").width())/2
    $("#notice").css({left:c_left}).show();
    var wTime = setTimeout(function (){$("#notice").fadeOut("slow")},10000);
}

//JSON����
TOOLS.ajaxGet =  function(url,data,dataType,async,func){
    $.ajax({
        type :"POST",
        cache : false,
        data :data,
        dataType :dataType,
        async:async,
        error : function(){TOOLS.statusMsg("������س�ʱ��[TOOLS.ajaxGet error]");},
        url: url,
        success: func
    });
}

TOOLS.validateDigital = function(param) {
    var flag = true;
    var reg = new RegExp("^[0-9]*$");
    var obj = param;
    if(!reg.test(param)){
        flag = false;
        return flag
        //alert("����������!");
    }
    if(!/^[0-9]*$/.test(param)) {
        flag = false;
        return flag
        //alert("����������!");
    }
    return flag;
}