/**
 * Created by Admin on 2016/3/10.
 */
VALIDATOR.form = {};
VALIDATOR.listHead = {};
//菜单位置
$(function(){

    var request = new Object();
    request = GetRequest();
    $('#customerEmail').val(request['vo.customerEmail']);

    $('#search_form').attr("action",contextPath+"/service/trialApply/Search.action").attr("method","post");
    $('#advancedSearch_form').attr("action",contextPath+"/service/trialApply/Search.action").attr("method","post");
    $('#add_form').attr("action",contextPath+"/service/trialApply/Add.action").attr("method","post");
    $('#update_form').attr("action",contextPath+"/customer/customer/Update.action").attr("method","post");
    $('#updatePw_form').attr("action",contextPath+"/customer/customer/UpdatePassword.action").attr("method","post");

    //点击搜索
    $("#searchButton").on("click",function (){
        $('#search_form *[name]').each(function(){
            //去除为空搜索项
            if(""==$(this).val()){$(this).attr("name","");}
        });
        $('#search_form select').each(function(){
            if("0"==$(this).val()){$(this).attr("name","");}
        });
        //搜索
        $('#search_form').submit();
    });
    $("#advancedSearchButton").on("click",function (){
        $('#advancedSearch_form *[name]').each(function(){
            //去除为空搜索项
            if(""==$(this).val()){$(this).attr("name","");}
            if("0"==$(this).val()){$(this).attr("name","");}
        });

        //搜索
        $('#advancedSearch_form').submit();
    });

    //点击重置按钮
    $("#resetButton").on("click",function (){
        //重置并刷新
        window.location.href = contextPath+"/service/trialApply/InSearch.action";
    });

    //获取验证码
    $("button.getCheckNum").on("click",function () {
        var useType = $("button.getCheckNum").attr("lang");
        var node_username = $("#username");
        if(useType == "register") {
            if(node_username.val()==''||node_username==null) {
                return checkParam(0,node_username,"用户名不能为空!");
            }
            if(!ajaxGetUsername(node_username.val())) {
                return checkParam(0,node_username,"用户名不合法或已被占用!");
            }
        }else if(useType == "reset") {
            if(node_username.val()==''||node_username==null) {
                return checkParam(0,node_username,"用户名不能为空!");
            }
            if(!checkUsernameForFindPw(node_username.val())) {
                return checkParam(0,node_username,"未找到该用户或用户名不合法!");
            }
        }else {

        }
        $("button.getCheckNum").attr("disabled","disabled");
        $("button.getCheckNum").addClass("gray");
        $("button.getCheckNum").html("验证码已下发(<span></span>)...");
        //验证码等待时间 注意回收
        var dateNum = 9000;
        $("button.getCheckNum span").text(dateNum/1000);
        var countdown = window.setInterval(function (){
            if( dateNum >= 1000 )
            {
                dateNum = dateNum-1000;
                $("button.getCheckNum span").text(dateNum/1000);
            }

        },1000);

        window.setTimeout(function (){
            //验证码回收
            dateNum = 9000;
            clearInterval(countdown);
            $("button.getCheckNum").removeClass("gray");
            $("button.getCheckNum").removeAttr("disabled");
            $("button.getCheckNum").html("获取验证码");
        },dateNum)

        ajaxSendSecurityCode(useType);
    });


    //点击新建_加载列表
    /*	$(".listAdd").on("click",function (){
     window.location.href = contextPath+"/service/trialApply/InAdd.action";
     });*/


    //点击编辑_加载列表
    $(".listChange").on("click",function (){if(!($(this).hasClass("gray"))){
        var id = $(".listTable").find("tbody input[type='checkbox']:checked").val();
        window.location.href = contextPath+"/service/trialApply/InUpdate.action?vo.id="+id;
    }});


    //点击删除_弹出弹窗
    $(".listDelete").on("click",function (){if(!($(this).hasClass("gray"))){
            DeleteForme();
        }}

    );

    //点击重置按钮
    $(".lister.add").on("click",function () {
        window.location.href = contextPath+"/service/trialApply/InAdd.action";
    });

    //点击重置按钮
    $(".buttoner.cancel").on("click",function () {
        var id = $("#TrialApplyId").val();
        window.location.href = contextPath+"/service/trialApply/Update.action?vo.status="+'cancel&'+"vo.id="+id;
    });

    //点击重置按钮
    $(".buttoner.cancel.offline").on("click",function () {
        var id = $("#TrialApplyId").val();
        window.location.href = contextPath+"/service/trialApply/Update.action?vo.status="+'offline&'+"vo.id="+id;
    });

    //回显下拉框
    cacheSelect();
    updateInit();

    //点击
    $(".registerSelf").on("click",function () {
        check();
    });

    //点击
    $(".findPw").on("click",function (){
        checkFindPw();
    });

})

VALIDATOR.form.oldPassword = function(arg) {
    //为空校验
    if('' == arg.find('input').val()) {
        MYWARN = "原始密码不能为空！";
        return false;
    }

    if(!ajaxGetUserPassword()) {
        MYWARN = "原始密码错误,请重新输入！";
        return false;
    }

    return true;
}

VALIDATOR.form.newPassword = function(arg) {
    //为空校验
    if('' == arg.find('input').val()){
        MYWARN = "新密码不能为空!";
        return false;
    }
    if(arg.find('input').val().length != 6) {
        MYWARN = "请输入6~18位密码！";
        return false;
    }
    var newPassword = $('#newPassword').val();
    var confirmPassword = $('#confirmPassword').val();
    if(newPassword!=""&&confirmPassword!=""&&newPassword!=confirmPassword) {
        MYWARN = "新密码和确认密码不一致！";
        return false;
    }
    return true;
}

VALIDATOR.form.confirmPassword = function(arg) {
    //为空校验
    if('' == arg.find('input').val()){
        MYWARN = "确认密码不能为空！";
        return false;
    }
    return true;
}

function ajaxGetUserPassword() {
    var flag = false;
    VO = {};
    var sesssionUserId = $("#sesssionUserId").val();
    VO['avo.id'] = sesssionUserId;
    var originalPassword = $("#oldPassword").val();
    TOOLS.ajaxGet(contextPath+"/customer/customer/AjaxSearch.action",VO,"json",false,function(soucedata){
        if(soucedata[0]!=null&&soucedata[0].password==originalPassword) {
            flag = true;
        } else {
            flag = false;
        }
    });
    return flag;
}

//STATIC[翻页]
pageMark = function(){
    //分页信息
    $('#currentPage').val(PAGE.currentPage);
    //去除为空搜索项
    $('#search_form *[name]').each(function(){if(""==$(this).val()){$(this).attr("name","");}});
    $('#search_form').submit();
}
//STATIC[列表单击]
listClick = function(links){
    document.location.href = links;
}






//-----------添加-按钮--------------
function AddForme() {
    $("#add_form").submit();
}
//-----------更新-按钮--------------
function UpdatePwForme() {
    $("#updatePw_form").submit();
}
function UpdateForme() {
    $("#update_form").submit();
}
//-----------删除-按钮--------------
function DeleteForme() {

    var ids = "";
    $(".listTable").find("tbody input[type='checkbox']:checked").each(function(){
        ids += $(this).val()+",";
    });
    ids=ids.substring(0,ids.length-1);

    var data = {};
    data["vo.ids"] = ids;

    window.location.href = contextPath+"/customer/Delete.action?vo.ids="+ids;

}

function ajaxAdd() {
    var flag = false;
    VO = {};

    /*	if(CheckMail($("#username").val())) {
     VO['vo.customerEmail'] = $("#username").val();
     }else if(checkMobile($("#username").val())){
     VO['vo.customerTel'] = $("#username").val();
     }else {
     return false
     }*/

    if(checkMobile($("#username").val())){
        VO['vo.customerTel'] = $("#username").val();
    }else if(CheckMail($("#username").val())) {
        VO['vo.customerEmail'] = $("#username").val();
    }else {
        return false
    }

    VO['vo.username'] = '';
    VO['vo.password'] = $("#password").val();
    VO['vo.customerName'] = $("#customerName").val();
    VO['vo.customerAddress'] = $("#customerAddress").val();
    VO['vo.securityCode'] = $("#securityCode").val();
//	VO['vo.customerType'] = $("#customerType").val();


    UNICOM.ajaxGet(contextPath+"/customer/customer/AjaxAdd.action",VO,"json",false,function(sourcedata){
        if(sourcedata.success==true) {
            $(".registed strong").text(sourcedata.result);
            art.dialog({
                title: '申请已提交',
                content:$(".registed")[0],
                lock:true,
                close:function index(){window.location.href = contextPath+"/jsp/vlink/login.jsp"},
                id:"overed"
            })
            $(".sure").on("click",function (){
                art.dialog({ id: 'overed' }).close()
            });
        } else {
            alert("你的申请提交失败,请重新申请或与客服联系！");
        }
    });
    return flag;
}

function ajaxFindPw() {
    var flag = false;
    VO = {};
    if(CheckMail($("#username").val())) {
        VO['vo.customerEmail'] = $("#username").val();
    }else if(checkMobile($("#username").val())){
        VO['vo.customerTel'] = $("#username").val();
    }else {
        return false
    }
    VO['vo.username'] = '';
    VO['vo.password'] = $("#password").val();
    VO['vo.securityCode'] = $("#securityCode").val();

    UNICOM.ajaxGet(contextPath+"/customer/customer/AjaxUpdatePassword.action",VO,"json",false,function(sourcedata){
        if(sourcedata.success==true) {
            $("#findPwSucceed strong").text(sourcedata.result);
            art.dialog({
                title: '密码修改成功！',
                content:$("#findPwSucceed")[0],
                lock:true,
                close:function index(){window.location.href = contextPath+"/jsp/vlink/index.jsp"},
                id:"overed"
            })
            $(".sure").on("click",function (){
                art.dialog({ id: 'overed' }).close()
            });
        } else {
            alert("密码修改失败,请重新修改或与客服联系！");
        }
    });
    return flag;
}

function ajaxUpdate() {
    var flag = false;
    VO = {};
    VO['vo.id'] = $("#sesssionUserId").val();
    VO['vo.password'] = $("#newPassword").val();
    if($("#sesssionUserId").val() == "" || $("#sesssionUserId").val() == null) {
        alert("请登陆后在修改密码！");
        return false;
    }
    UNICOM.ajaxGet(contextPath+"/customer/customer/AjaxUpdate.action",VO,"json",false,function(sourcedata){
        if(sourcedata.success==true) {
            alert("修改成功！");
            window.location.href = contextPath+"/jsp/vlink/index.jsp";
        } else {
            alert("修改失败！");
        }
    });
    return flag;
}

function ajaxSendSecurityCode(useType) {
    VO = {};
    VO['vo.username'] = $("#username").val();
    if(CheckMail($("#username").val())) {
        VO['vo.usernameType'] = 'mail';
    }else if(checkMobile($("#username").val())) {
        VO['vo.usernameType'] = 'tel';
    }else {
        alert('用户名请输入邮箱或手机号');
        return false;
    }
    VO['vo.useType'] = useType;
    UNICOM.ajaxGet(contextPath+"/customer/securityCode/AjaxObtain.action",VO,"json",false,function(sourcedata){
        if(sourcedata.success==true) {
            alert("验证码已发送，请查收！");
        } else {
            alert("验证码发送失败，稍后请重试！");
        }
    });
}

//表单验证---------------------------------------------------------------------------------------


function cacheSelect() {
    var ctValue = $("#ctValue").val();
    if(ctValue != undefined){
        $("#ctSelect").val(ctValue);
    }

    var ctValueSearch = $("#ctValueSearch").val();
    if(ctValueSearch != undefined){
        $("#customerType").val(ctValueSearch);
    }

    var sValueSearch = $("#sValueSearch").val();
    if(sValueSearch != undefined){
        $("#status").val(sValueSearch);
    }
}

function updateInit() {
    var disabledFlag = $("#disabledFlag").val();
    if(disabledFlag != undefined && disabledFlag == 'false'){
        $('#update_form *[name]').each(function(){
            $(this).attr("disabled","disabled");
        });
        $(".submitor").css("display", "none");
    }
}

function validateDigital(num) {
    var flag = false;
    var reg = new RegExp("^[0-9]*$");
    if(!reg.test(num)){
        return flag;
    }else {
        flag = true;
        return flag;
    }
}

function decimals(num) {
    var flag = false;
    var reg = /^\d+$|^\d+\.\d{0,2}$/gi;
    if(!reg.test(num)) {
        return flag;
    }else {
        flag = true;
        return flag;
    }
}


function CheckMail(mail) {
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) {
        return true;
    } else {
        return false;
    }
}

function checkMobile(str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

function check() {
    var useType = $("button.registerSelf").attr("lang");
    checkUsername();
    checkPassword();
    checkSecurityCode(useType);

    if(checkUsername()&&checkPassword()&&checkSecurityCode(useType)) {
//		alert("Winodws8 用户请使用OpeVPN账号登录，OpeVPN账号账号信息请登录后查看!");
        ajaxAdd();
    }else {
        return false
    }
}

function checkFindPw() {
    var useType = $("button.findPw").attr("lang");
    checkUsernameForFindPw();
    checkPassword();
    checkSecurityCode(useType);
    if(checkUsernameForFindPw()&&checkPassword()&&checkSecurityCode(useType)) {
        ajaxFindPw();
    }else {
        return false
    }
}

function checkUsername() {
    var node = $("#username");
    if(node.val()=="") {
        return checkParam(0,node,"用户名不能为空!");
    }
    var mail = CheckMail(node.val());
    var mobile = checkMobile(node.val());
    if(mail == mobile) {
        return checkParam(0,node,"用户名只能用手机号或邮箱!");
    }

    if(!ajaxGetUsername(node.val())) {
        return checkParam(0,node,"用户名不合法或已被占用!");
    }else {
        return checkParam(1,node,"");
    }
}

function checkUsernameForFindPw() {
    var node = $("#username");
    if(node.val()=="") {
        return checkParam(0,node,"用户名不能为空!");
    }
    var mail = CheckMail(node.val());
    var mobile = checkMobile(node.val());
    if(mail == mobile) {
        return checkParam(0,node,"用户名只能用邮箱或是手机号!");
    }

    if(!ajaxGetUsernameForFindPw(node.val())) {
        return checkParam(0,node,"未找到该用户!");
    }else {
        return checkParam(1,node,"");
    }
}

function checkPassword() {
    var node_password = $("#password");
    var node_confirmPassword = $("#confirmPassword");

    if(node_password.val()=="") {
        return checkParam(0,node_password,"密码不能为空!");
    }
    if(node_password.val().length < 6) {
        return checkParam(0,node_password,"请输入6~18位密码!");
    }
    if(node_password.val().length > 18) {
        return checkParam(0,node_password,"请输入6~18位密码!");
    }
    if(node_confirmPassword.val()=="") {
        return checkParam(0,node_password,"确认密码不能为空!");
    }
    if(node_password.val()!=node_confirmPassword.val()) {
        return checkParam(0,node_password,"密码与确认密码不一致!");
    }else {
        return checkParam(1,node_password,"");
    }
}

function checkSecurityCode(useType) {
    var node = $("#securityCode");
    if(node.val() =="") {
        return checkParam(0,node,"验证码不能为空!");
    }
    var username = $("#username").val();
    var securityCode = $("#securityCode").val();

    if(!ajaxSecurityCodeExpired(username,securityCode,useType)) {
        return checkParam(0,node,"验证码过期或无效!");
    }else {
        return checkParam(1,node,"");
    }
}


//----------------------------------------------------------------------------------------------------------------------


function checkUpdatePassword() {
    var original_flag = checkOriginalPassword();
    var new_flag = checkNewPassword();
    var confirm_flag = checkConfirmPassword();
    if(original_flag&&new_flag&&confirm_flag) {
        var compare_flag = checkComparePassword();
        var isOri_flag = checkIsOriPassword();
        if(compare_flag&&isOri_flag) {
            ajaxUpdate();
        }else {
            return false
        }
    }else {
        return false
    }
}

function ajaxGetUsername(username) {
    var flag = false;
    VO = {};
    if(checkMobile(username)) {
        VO['avo.customerTel'] = username;
    }else if(CheckMail(username)) {
        VO['avo.customerEmail'] = username;
    }else {
        return false;
    }
    UNICOM.ajaxGet(contextPath+"/customer/customer/AjaxSearch.action",VO,"json",false,function(soucedata){
        if(soucedata[0]!=null&&soucedata[0].username!=null) {
            flag = false;
        } else {
            flag = true;
        }
    });
    return flag;
}

function ajaxGetUsernameForFindPw(username) {
    var flag = false;
    VO = {};
    if(checkMobile(username)) {
        VO['avo.customerTel'] = username;
    }else if(CheckMail(username)) {
        VO['avo.customerEmail'] = username;
    }else {
        return false;
    }
    UNICOM.ajaxGet(contextPath+"/customer/customer/AjaxSearch.action",VO,"json",false,function(soucedata){
        if(soucedata.length == 1) {
            flag = true;
        } else {
            flag = false;
        }
    });
    return flag;
}

function ajaxSecurityCodeExpired(username,securityCode,useType) {
    var flag = false;
    VO = {};
    VO['vo.username'] = username;
    VO['vo.securityCode'] = securityCode;
    VO['vo.useType'] = useType;
    if(checkMobile(username)) {
        VO['vo.usernameType'] = 'tel';
    }else if(CheckMail(username)) {
        VO['vo.usernameType'] = 'mail';
    }else {
        return false;
    }
    UNICOM.ajaxGet(contextPath+"/customer/securityCode/AjaxSearchSecurityCode.action",VO,"json",false,function(soucedata){
        if(soucedata!=null&&soucedata.statusExpired==true) {
            flag = true;
        } else {
            flag = false;
        }
    });
    return flag;
}

function checkFindPwUsername() {
    var node = $("#userName");
    if(node.val()=="") {
        return checkParam(0,node,"用户名不能为空!");
    }else {
        return checkParam(1,node,"");
    }
}


function checkCustomerEmailRepeat() {
    var node = $("#customerEmail");
    if(node.val()!="") {
        if(!ajaxGeTrialApplyMail()) {
            return checkParam(0,node,"客户电子邮箱已申请,请耐心等待审核结果!");
        }
        if(!ajaxGetCustomerMail()) {
            return checkParam(0,node,"客户电子邮箱已注册,请重新输入!");
        }else {
            return checkParam(1,node,"");
        }
    }
}

/*password update ---------------start*/
function checkOriginalPassword() {
    var node = $("#originalPassword");
    if(node.val()=="") {
        return checkParam(0,node,"原始密码不能为空!");
    }else {
        return checkParam(1,node,"");
    }
}

function checkNewPassword() {
    var node = $("#newPassword");
    if(node.val()=="") {
        return checkParam(0,node,"新密码不能为空!");
    }else {
        return checkParam(1,node,"");
    }
}

function checkConfirmPassword() {
    var node = $("#confirmPassword");
    if(node.val()=="") {
        return checkParam(0,node,"确认密码不能为空!");
    }else {
        return checkParam(1,node,"");
    }
}

function checkComparePassword() {
    var node_con = $("#confirmPassword");
    var node_new = $("#newPassword");
    if(node_con.val()!=node_new.val()) {
        return checkParam(0,node_new,"新密码和确认密码不一致!");
    }else {
        return checkParam(1,node_new,"");
    }
}

function checkIsOriPassword() {
    var node = $("#originalPassword");
    if(!ajaxGetUserPassword()) {
        return checkParam(0,node,"原始密码不正确，请重新输入!");
    }else {
        return checkParam(1,node,"");
    }
}

function ajaxGetCustomerMail() {
    var flag = false;
    VO = {};
    var customerEmail = $("#customerEmail").val();
    VO['avo.customerEmail'] = customerEmail;
    UNICOM.ajaxGet(contextPath+"/service/customer/AjaxSearch.action",VO,"json",false,function(soucedata){
        if(soucedata[0]!=null&&soucedata[0].customerEmail==customerEmail) {
            flag = false;;
        } else {
            flag = true
        }
    });
    return flag;
}

function ajaxGeTrialApplyMail() {
    var flag = false;
    VO = {};
    var customerEmail = $("#customerEmail").val();
    VO['avo.customerEmail'] = customerEmail;
    VO['avo.notEqStatus'] = 'cancel';
    UNICOM.ajaxGet(contextPath+"/service/trialApply/AjaxSearchEmail.action",VO,"json",false,function(soucedata){
        if(soucedata[0]!=null&&soucedata[0].customerEmail==customerEmail) {
            flag = false;;
        } else {
            flag = true
        }
    });
    return flag;
}

/*password update ---------------end*/

function checkParam(bool,that,words) {
    if(bool == 0) {
        $(that).parent().next("p.validator").addClass("warn").text(words);
        return false;
    }else {
        $(that).parent().next("p.validator").removeClass("warn").text("");
        return true;
    }
}

var UNICOM = {};

UNICOM.ajaxGet =  function(url,data,dataType,async,func) {
    $.ajax({
        type :"POST",
        cache : false,
        data :data,
        dataType :dataType,
        async:async,
        error : function(){alert("网络加载超时！[UNICOM.ajaxGet error]");},
        url: url,
        success: func
    });
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function refresh(obj) {
    obj.src = contextPath+"/validateCode?"+Math.random();
}

function ajaxGetRealTimeEffectForContinents() {
    var flag = false;
    VO = {};
    UNICOM.ajaxGet(contextPath+"/customer/realTimeEffect/AjaxSearchRealTimeEffectVoForContinentsList.action",VO,"json",false,function(soucedata){
        if(soucedata[0]!=null) {
            var data = {};
            $.each(soucedata,function() {
                data[this.destinationAreaEN] = {
                    "before":this.internetAvgRtt,
                    "after" :this.algowareAvgRtt
                };
            })
            $g.speed(data);
            flag = true;;
        } else {
            flag = false
            $g.speed(null);
        }
    });
    return flag;
}

function formatDou(num) {
    var param = num.toString();
    return param.indexOf('.') == -1 ? param+".0":param;
}