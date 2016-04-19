
var chooseall=document.getElementById("chooseall"),
	mytest=document.getElementsByName("test"),
	leng=mytest.length;

function selectAll(){
	if(chooseall.checked==true){
		for(i=0;i<leng;i++){
			mytest[i].checked=true;
		}
	}else{
		for(i=0;i<leng;i++){
			mytest[i].checked=false;
		}
	}
}
//显示时间
/*var newdate={
	clock:document.getElementById("clock")

}
var date=new Date();
newdate.clock.innerHTML=date.toLocaleString();*/
function displaytime(){
	var clock=document.getElementById("clock"),
	    date=new Date();
	clock.innerHTML=date.toLocaleTimeString();
	setTimeout(displaytime,1000)
}
window.onload=displaytime;
/*location的测试*/
var mylocation=document.getElementById("mylocation"),
	locationbtn=document.getElementById("mylocation").getElementsByTagName("input")

locationbtn[0].onclick=function(){
	location.replace("grayimg.html");
}
locationbtn[1].onclick=function(){
	location.assign("grayimg.html");
}
locationbtn[2].onclick=function(){
	location="grayimg.html";
}
locationbtn[3].onclick=function(){
	location="#top";
}
/*前进后退测试*/
	var jstest={
		myforward:document.getElementById("forward"),
		myback:document.getElementById("back"),
		tuozhauibox:document.getElementById("tuozhuaibox"),
		tuozhuaibar:document.getElementById("tuozhuaibar")
	}
	jstest.myforward.onclick=function(){
		history.forward();
	}
	jstest.myback.onclick=function(){
		history.back();
	}
/*拖动测试*/

var params = {
	left:0 ,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false
};
//获取相关CSS属性
var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};

//拖拽的实例
var startDrag = function(bar, target, callback){
	if(getCss(target, "left") !== "auto"){
		params.left = getCss(target, "left");
	}
	if(getCss(target, "top") !== "auto"){
		params.top = getCss(target, "top");
	}
	//o是移动对象
	bar.onmousedown = function(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}
		}
		var e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
	};
	document.onmouseup = function(){
		params.flag = false;
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
	};
	document.onmousemove = function(event){
		var e = event ? event: window.event;
		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.currentX, disY = nowY - params.currentY;
			target.style.left = parseInt(params.left) + disX + "px";
			target.style.top = parseInt(params.top) + disY + "px";
		}

		if (typeof callback == "function") {
			callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
		}
	}
};
startDrag(jstest.tuozhuaibar,jstest.tuozhauibox);
//密码提示错误后全选中，先focus(),在select();
/*js自动检测地址*/
var getID=function(id){
	return document.getElementById(id);
}
getID("mybtn").onclick=function(){
	var textareatext=getID("mytext").value;
	var reg=/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;//检测
	var newtext=textareatext.replace(reg, "<a href='$1$2' target='_blank'>$1$2</a>").replace(/\n/g, "<br />");
	getID("show").innerHTML=newtext;
}

/*抽奖*/
var arr="前厅部 李XX,工程部 王xx,人事部 刘x,人事部 李x,客房部 胡xx,总经办 王xx,行政办 罗xx,前厅部 王xx"
var arrstr=arr.split(",");
var num=arrstr.length-1;
var timer;
function star(){
	/*clearInterval(timer);*/
	timer=setInterval('chang()',10);

}
function chang(){
   document.getElementById("zhuan").innerHTML=arrstr[getRandom(0,num)]
}
function getRandom(min,max){
	return parseInt(Math.random()*(max-min+1));
}
function stop(){
	clearInterval(timer);
	document.getElementById("showhjpeople").value=document.getElementById("zhuan").innerText;
}

/*投票柱状百分比*/
var votediv1=document.getElementById("vote1_div"),
	votediv1width=votediv1.offsetWidth,
	votediv2=document.getElementById("vote2_div"),
	votediv2width=votediv2.offsetWidth,
	vote=document.getElementById("vote"),
	abtn=vote.getElementsByTagName("input");
//div.style.width只能取到写在元素上面的，带单位px。offsetWidth可以取到class上的，不带单位
	abtn[0].onclick =function(){
		console.log(votediv1width)
		if(votediv1width<400){
			votediv1width=votediv1width+4;
			votediv2width=votediv2width-4;
			votediv1.style.width=votediv1width+"px";
			votediv2.style.width=votediv2width+"px";
			votediv1.innerHTML=(votediv1width)/4+"%";
			votediv2.innerHTML=(votediv2width)/4+"%";
		}

	}
	abtn[1].onclick =function(){
		if(votediv2width<400){
			votediv1width=votediv1width-4;
			votediv2width=votediv2width+4;
			votediv1.style.width=votediv1width+"px";
			votediv2.style.width=votediv2width+"px";
			votediv1.innerHTML=(votediv1width)/4+"%";
			votediv2.innerHTML=(votediv2width)/4+"%";
		}

	}
/*投票柱状百分比结束*/
/*模拟计算器*/
function getId(id){return document.getElementById(id);}
var tf=getId("tf"),jisuani;
for(jisuani=0;jisuani<11;jisuani++){
	getId("btn"+jisuani).onclick=function(){
		if(this.value=="."&&tf.value=="") return false;
		if(this.value=="."&&tf.value.indexOf(".")!=-1) return false;
		tf.value+=this.value;
	}
}
getId("jisuanback").onclick=function(){
	tf.value=tf.value.replace(/.$/,'');
}
/*模拟计算器结束*/
/*滑动解锁*/
//offsetWidth这个宽度包括元素的边框(border)，水平padding，(垂直滚动条宽度)，元素本身宽度等offsetWidth=(border-width)*2+(padding-left)+(width)+(padding-right)。
//offsetLeft在IE8/9/10及Chrome中，offsetLeft = (body的margin-left)+(body的border-width)+(body的padding-left)+(当前元素的margin-left)。
//在FireFox中，offsetLeft = (body的margin-left)+(body的padding-left)+(当前元素的margin-left)。
//Math.ceil()往大去整，Math.floor往小取整，Math.round()四舍五入

var oLock = getId("phonebox"),oBtn = getId("phone_btn"),disX = 0,maxL = oLock.clientWidth - oBtn.offsetWidth;
oBtn.onmousedown = function (e)
{
	var e = e || window.event;
	disX = e.clientX - this.offsetLeft;//保持记录物体的左边距离

	document.onmousemove = function (e)
	{
		var e = e || window.event;
		var left = e.clientX - disX;

		left < 0 && (left = 0);
		left > maxL && (left= maxL);

		oBtn.style.left = left + "px";
		console.log("---disX---"+disX)
		return false;
	};
	document.onmouseup = function ()
	{
		//避免鼠标拖出物体
		document.onmousemove = null;
		document.onmouseup = null;
		oBtn.releaseCapture && oBtn.releaseCapture();//把鼠标事件释放还原

		oBtn.offsetLeft > maxL / 2 ?
			startMove(maxL) :startMove(0)
	};
	this.setCapture && this.setCapture();//让oBtn获得鼠标事件
	return false
};
function startMove (iTarget, onEnd)
{
	clearInterval(oBtn.timer);
	oBtn.timer = setInterval(function ()
	{
		doMove(iTarget, onEnd)
	}, 30)
}
function doMove (iTarget, onEnd)
{
	var iSpeed = (iTarget - oBtn.offsetLeft) / 5;
	iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	iTarget == oBtn.offsetLeft ? (clearInterval(oBtn.timer), onEnd && onEnd()) : oBtn.style.left = iSpeed + oBtn.offsetLeft + "px"
}

/*密码强度检测*/
	var pwdjiance=getId("password"),pwdinput=getId("pwdinput"),pwdTips=pwdjiance.getElementsByTagName("span");
	pwdinput.onkeyup=function(){
		var num=checkPwd(this.value);
		for(var i=0;i<4;i++){
			pwdTips[i].className=""
		}
		if(num>0){
			pwdTips[num-1].className="red";
		}

	}

	function checkPwd(sValue)
	{
		var modes = 0;
		if (sValue.length < 6) return modes;
		if (/\d/.test(sValue)) modes++; //数字
		if (/[a-z]/.test(sValue)) modes++; //小写
		if (/[A-Z]/.test(sValue)) modes++; //大写
		if (/\W/.test(sValue)) modes++; //特殊字符
		switch (modes)
		{
			case 1:
				return 1;
				break;
			case 2:
				return 2;
			case 3:
			case 4:
				return sValue.length < 12 ? 3 : 4
				break;
		}
	}
/*jquery区域*/
$(function(){
	$(".xiala-top").click(function(){
		$(".xiala-ul").slideToggle();
		return false;
		/*
		这里的return false做到了下面三件事
		event.preventDefault();//阻止浏览器的默认行为
		 event.stopPropagation();//停止冒泡
		 停止回调函数执行并立即返回。
		* */
	})
	/*垂直导航*/
	$(".xiala-ul li").hover(function(){
		$(this).animate({
			paddingLeft:30
		},300);
	},function(){
		$(this).animate({
			paddingLeft:5
		},100)
	})
	/*遮罩*/
	$("#mytanchubox").click(function(){
		$("#myzhezhao").css("display","block");
		$(".tanchucont").css("display","block");
		$("#myzhezhao").click(function(){
			$("#myzhezhao").css("display","none");
			$(".tanchucont").css("display","none");
		})
	})
	/*判断input radio是否选中*/
	$("input[type='radio']").click(function(){
		var inputval=$("input:radio[name='weizhi']:checked").val();
		if(inputval!=""){
			alert(inputval);
		}
	})
	/*email的自动完成尾部(自写版)*/
	/*var clickflag=false;
	$("#emailin").keyup(function(){
		var inputval=$(this).val();
		if(inputval==''){
			$(".emaillist").css("display","none");
		}
		if(clickflag==false){

			if(inputval==''){
				$(".emaillist").css("display","none");
			}else{
				if(inputval.indexOf('@')==-1) {
					$(".emaillist li span:first-child").text(inputval);
				}else{
					$(".emaillist li").each(function(){
						if($(this).text().indexOf(inputval)==-1){
							$(this).addClass("Dnone");
						}
					})
				}
				$(".emaillist").css("display","inline-block");
		   }
		}else{
			if(inputval==''){
				$(".emaillist").css("display","none");
			}else{
				/!*if(inputval.indexOf('@')==-1) {
					$(".emaillist li span:first-child").text(inputval);
				}else{
					$(".emaillist li").each(function(){
						if($(this).text().indexOf(inputval)==-1){
							$(this).addClass("Dnone");
						}
					})
				}*!/
				$(".emaillist").css("display","inline-block");
				$(".emaillist li").addClass("Dnone");
				$(".clickafter").removeClass("Dnone").addClass("Ddinlinebk");
				$(".clickafter").text(inputval);
			}

			/!*clickflag=false;*!/

		}

	})
	$(".emaillist li").click(function(){
		var litext=$(this).text();
		$("#emailin").val(litext);
		$(".emaillist").css("display","none");
		clickflag=true;
	})*/
	/*进度显示*/
	var left=0,oldx,clickstatus=false,jinduwidth;
	$(".btn").mousedown(function(e){
		var movex=$(this).offset().left;
		oldx= e.pageX-left;
		clickstatus=true;
	})
	$(document).mouseup(function(e){
		clickstatus=false;
	})

	$(".jindu").mousemove(function(e){
		if(clickstatus==true){
			left= e.pageX-oldx;
			if(left>300){
				left=300;
			}
			if(left<0){
				left=0;
			}
			$(".btn").css("left",left);
			jinduwidth=left+20;
			$(".jindugreen").css("width",jinduwidth);
			$(".jindugreen").stop().animate({width:jinduwidth},20);
			$(".jindupercent").text(parseInt(jinduwidth/3)+"%");

		}

	})
})
/*抽奖*/
var index=1,           //当前亮区位置
	prevIndex=14,          //前一位置
	Speed=300,           //初始速度
	Time,            //定义对象
	arr_length = 14; //GetSide(5,5),         //初始化数组
	EndIndex=1,           //决定在哪一格变慢
	cycle=0,           //转动圈数
	EndCycle=3,           //计算圈数
	flag=false,           //结束转动标志
	random_num=1,      //中奖数
	quick=0;           //加速


function choujiang(){
	$(".choujiangul li").removeClass("cj_choosed"); //取消选中
	//random_num = parseInt($("#txtnum").val());//
	random_num = Math.floor(Math.random()*13+1); //产出随机中奖数2
	index=1; //再来一次,从1开始
	cycle=0;
	flag=false;
	//EndIndex=Math.floor(Math.random()*12);
	if(random_num>5) {
		EndIndex = random_num - 5; //前5格开始变慢
	} else {
		EndIndex = random_num + 14 - 5; //前5格开始变慢
	}
	//EndCycle=Math.floor(Math.random()*3);
	Time = setInterval(Star,Speed);

}
function Star(){
	//跑马灯变速
	if(flag==false){
		//走五格开始加速
		if(quick==5){
			clearInterval(Time);
			Speed=50;
			Time=setInterval(Star,Speed);
		}
		//跑N圈减速
		if(cycle==EndCycle+1 && index-1==EndIndex){
			clearInterval(Time);
			Speed=300;
			flag=true;         //触发结束
			Time=setInterval(Star,Speed);
		}
	}

	if(index>arr_length){
		index=1;
		cycle++;
	}

	//结束转动并选中号码
	if(flag==true && index==parseInt(random_num)){
		quick=0;
		clearInterval(Time);
	}
	$("#random_"+index).addClass('cj_choosed'); //设置当前选中样式
	if(index>1)
		prevIndex=index-1;
	else{
		prevIndex=arr_length;
	}
	$("#random_"+prevIndex).removeClass('cj_choosed'); //取消上次选择样式
	index++;
	quick++;
}
/*抽奖结束*/


/*
解决jquery与其他的框架冲突的办法

jQuery.noConflict();//释放jquery的$
jQuery(function($){//让$成为局域变量
	//这里放jquery的代码
})


*/


