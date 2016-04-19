/**
 * Created by Admin on 2016/3/10.
 */
// JavaScript Document
var VALIDATOR = {};
VALIDATOR.form = {}
VALIDATOR.form.formMethodA = function (arg)
{
    MYWARN = "你写错了";
    var theValue = arg.find("input").val();
    if( theValue != "")
    {
        return true;
    }
    else
    {
        return false;
    }

}
VALIDATOR.form.formMethodC = function (arg)
{
    return true;
}
VALIDATOR.form.formMethodE = function (arg)
{
    MYWARN = "你写错了,真的错了，回去看看吧。";
    var theValue = arg.find("input").val();
    if( theValue != "")
    {
        return true;
    }
    else
    {
        return false;
    }

}


validate={
    //数字，字母，下划线
    isNotChn:function(value) {
        return /^[A-Za-z0-9_]*$/.test(value);
    },
    //正整数
    positiveDigits:function(value) {
        return /^[1-9][0-9]*$/g.test(value);
    },
    //座机号，可验证3-4位区号，7-8位直播号码，1－4位分机号,400电话
    telephone:function(value) {
        return /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|\d{3}-\d{3}-\d{4}|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(value);
    },
    //移动电话手机号
    mobilephone:function(value) {
        return /^[1]+[3,5,8]+\d{9}/.test(value);
    },
    //电子邮件
    email:function(value) {
        return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
    },
    //域名或IP
    url:function(value) {
        return ( /^(((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\|)*(((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))$/.test(value) || /^(([a-zA-Z][\w-]*\.)([a-zA-Z0-9][\w-]*\.)*[a-zA-Z][\w-]*\|)*(([a-zA-Z][\w-]*\.)([a-zA-Z0-9][\w-]*\.)*[a-zA-Z][\w-]*)$/.test(value) );
    },

    //限制15个字符长度
    limitLength:function(value) {
        return /^.{1,15}$/.test(value);
    }
}