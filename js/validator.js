/**
 * Created by Admin on 2016/3/10.
 */
// JavaScript Document
var VALIDATOR = {};
VALIDATOR.form = {}
VALIDATOR.form.formMethodA = function (arg)
{
    MYWARN = "��д����";
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
    MYWARN = "��д����,��Ĵ��ˣ���ȥ�����ɡ�";
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
    //���֣���ĸ���»���
    isNotChn:function(value) {
        return /^[A-Za-z0-9_]*$/.test(value);
    },
    //������
    positiveDigits:function(value) {
        return /^[1-9][0-9]*$/g.test(value);
    },
    //�����ţ�����֤3-4λ���ţ�7-8λֱ�����룬1��4λ�ֻ���,400�绰
    telephone:function(value) {
        return /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|\d{3}-\d{3}-\d{4}|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(value);
    },
    //�ƶ��绰�ֻ���
    mobilephone:function(value) {
        return /^[1]+[3,5,8]+\d{9}/.test(value);
    },
    //�����ʼ�
    email:function(value) {
        return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
    },
    //������IP
    url:function(value) {
        return ( /^(((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\|)*(((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))$/.test(value) || /^(([a-zA-Z][\w-]*\.)([a-zA-Z0-9][\w-]*\.)*[a-zA-Z][\w-]*\|)*(([a-zA-Z][\w-]*\.)([a-zA-Z0-9][\w-]*\.)*[a-zA-Z][\w-]*)$/.test(value) );
    },

    //����15���ַ�����
    limitLength:function(value) {
        return /^.{1,15}$/.test(value);
    }
}