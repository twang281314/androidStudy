 //主流程函数
(function(d){
	//1.获取目标地址，并拼上有可能的子码参数
	url = getGoUrl();
	//2.黄金令箭埋点
	sendEcode();
	//3.设置当前页面标题，网速慢或者在微信中要用到
  setTitle();
	//4.1如果是微信，则按定制的要求展示
	if(app=='weixin'|| app=='qq'){
		if(wxMethod!='replace'){
			//4.1.1 设置微信分享的Logo图片
			setWxImg();
			//4.1.2 微信中展示
			if(isSelfView=='false'){
				wxShow();
			}
			return;
		}
	}
	//4.2 唤起客户端访问，只有在手机上里才需要唤起，本身是对应的客户端也不需要作唤起操作，直接跳转
	if(client!=0 && client!='' && (os=='iphone' || os=='android' || os=='ipad') && isAliApp=='false'){
		callClient();
		return;
	}
	//4.3 直接跳转扫码目地页
    setTimeout(function(){
		window.location.replace(url);
		//alert("go to:"+url);
    },200);
})(document);

 //1.拼装目标地址，把短地址里的参数拼上
function getGoUrl(){
//	var strRedirect ;//t=url;
    var strRedirect = url;
    var append2;
	//是否有锚点
	var anchorIndex = url.indexOf("#");
	if(anchorIndex>0){
        //有锚点把url分成两部分
        strRedirect = url.substring(0,anchorIndex);
        append2 = url.substring(anchorIndex);
    }else{
        strRedirect = url;
        append2 = '';
    }
//    alert(strRedirect)
	//扫码失败
	if(status!='true'){
			strRedirect = invalidUrl;
	}
	//拼上子码参数
	var params =  location.search;
	if(params.indexOf("?")!=-1){
		if(strRedirect.indexOf("?")>=0){
			strRedirect = strRedirect+params.replace("?","&");
		}else{
			strRedirect=strRedirect+params;
		}
	}
	//把APP信息来源也加上
	if(strRedirect.indexOf("?")>=0){
		strRedirect= strRedirect+'&app='+app;
	}else{
		strRedirect= strRedirect+'?app='+app;
	}
//	return strRedirect;
return strRedirect + append2;
}
//2.黄金令箭埋点
function sendEcode(){
	if(shortName){
    	var logUrl = '//gm.mmstat.com/'+ecode+'?logtype=2&cache='+new Date().getTime();
		var img = new Image();
		img.src = logUrl + '&id='+shortName+'&biz_code='+bizCode+'&app='+app+'&status='+status;
	}
}
//3、设置当前页面标题
function setTitle(){
	var title = url.match(/\bxTitle=([^&$]+)/);
	title = title ? title[1] : '';
    title = decodeURIComponent(title);
    if(title){
        document.title = title;
        sendMsg("wxtitle:"+title);
    }
}
//4.1.1设置微信分享的Logo图片,图片大小大于350*350,body里面的第一张图片
function setWxImg(){
    var image = url.match(/\bxImage=([^&$]+)/);
    image = image ? image[1] : '';
    image = decodeURIComponent(image);
    if(image){
    	//下面这种用法有坑，会清空所有节点，注掉，用appendChild
    	//var wxpic = '<div id="wx_pic" style="display:none" ><img src="'+image+'" /></div>';
        //document.write(wxpic);
    
		var imgDiv = document.createElement('div');
		imgDiv.style.display="none";
		imgDiv.id="wx_pic";
		imgDiv.innerHTML="<img src='"+image+"' />";
		document.body.appendChild(imgDiv); 
		//发送给外部iframe消息，申请了腾讯云服务器域名，跨域设置父页面内容
        sendMsg("wxpic:"+image);
    }
}
//在微信里展示时，使用外部域名IFRAME，发出消息告知tile和分享图片logo
function sendMsg(message){
	if (typeof window.postMessage != 'undefined') {// 检查浏览器是否支持postMessage	 
		window.parent.postMessage(message, '*');//注意向父窗口发送消息，如果往本页面的iframe发消息，需要指明哪个iframe.contentWindow.postMessage
	}	
}   
//4.1.2微信里展现方式
function wxShow(){
	var body = document.body;
	//Iframe展现， TODO 加上浮动层提示用户用浏览器打开
	if(wxMethod=='iframe' || wxMethod=='iframe2'){
		makeIframe(url);
	}else{
		if(wxContent.indexOf(",")<=0){
			wxContent = '//gtms01.alicdn.com/tps/i1/TB1lcdUIFXXXXc6XpXXv8wV0FXX-640-390.jpg,//gtms02.alicdn.com/tps/i2/TB1OkV4IFXXXXa_XXXXPF7W0FXX-640-421.png';
		}
		var imgArr =  wxContent.split(",");
		//QQ
		if(app=='qq' && imgArr.length==4){
			if(os=='iphone' || os=='ipad' ){
				body.style.backgroundImage = 'url('+imgArr[2]+')';
			}else{
				body.style.backgroundImage = 'url('+imgArr[3]+')';
			}
		//微信			
		}else{
			if(os=='iphone' || os=='ipad' ){
				body.style.backgroundImage = 'url('+imgArr[0]+')';
			}else{
				body.style.backgroundImage = 'url('+imgArr[1]+')';
			}
		}
	}		
}
 //4.2 唤起客户端方式展示，双11后重构下改成前端的库使用gotoPage
 //1、淘宝：“taobao://”
 //2、支付宝：“alipays://platformapi/startapp?appId=20000067&url=”,20000067 代表钱包内部应用的ID ，by 左契
 //3、天猫：“tmall://page.tm/webview?webURLString=” by 宵练
 //4、淘宝电影：“tbmovie://taobao.com/h5jump?url=”，by 爵爷
function callClient(){
	var schame = '';
	var encode = false;
	if(client == 1){
		schame = 'taobao://';
	}
	if(client==2 ){
		schame = 'alipays://platformapi/startapp?appId=20000067&url=';
		encode =true;
	}
	if(client==3){
		schame = "tmall://page.tm/webview?webURLString=";
		encode =true;
	}
	if(client==4){
		schame = 'tbmovie://taobao.com/h5jump?url=';
		encode =true;
	}
	//唤起失败，还是停留在这个H5页面
	makeIframe(url);
	//唤起客户端，用一个iframe来唤起
	if(schame !=''){
		var schameUrl = url.replace('http://',"");
		schameUrl = schameUrl.replace('https://',"");
		if(encode == true){
			schameUrl = encodeURIComponent(schameUrl);
		}
		schameUrl = schame + schameUrl;
		//JS库对系统的判断
		var j_os = lib.env.os;
		var j_browser = lib.env.browser;
		  // ios 9.0，需要用a标签的href???
        var ios9SafariFix =j_os.isIPhone && j_os.version.gte('9.0') && j_browser.isSafari;
        //IOS9 Safari特殊处理
		if(ios9SafariFix){
            setTimeout(function(){
                useAnchorLink(schameUrl);
            }, 100);		
		}else{
			makeHiddenIframe(schameUrl);
		}
	}
}
//创建一个A连接打开事件，打开一个地址
function useAnchorLink(url) {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.style.display = 'none';
    document.body.appendChild(a);

    var e = document.createEvent('HTMLEvents');
    e.initEvent('click', false, false);
    a.dispatchEvent(e);
}

 //创建一个Iframe节点
function makeIframe(url){
    var ifa = document.createElement('iframe');
    ifa.style.width = '100%';
    ifa.style.height = '100%';
    ifa.style.border = 'none';
    ifa.style.margin = '0';
    ifa.style.padding = '0';
    if(app=='weixin' && wxMethod=='iframe2'){
    	ifa.id="js_iframe2";
    	ifa.style.marginTop = '80px';
    }
    ifa.src = url;
    document.body.appendChild(ifa);
}
 //创建一个隐藏的 iframe，用于唤起客户端
function makeHiddenIframe(url){
    var ifa = document.createElement('iframe');
		ifa.style.display='none';
    ifa.style.width = '0%';
    ifa.style.height = '0%';
    ifa.style.border = 'none';
    ifa.style.margin = '0';
    ifa.style.padding = '0';
    ifa.src = url;
    document.body.appendChild(ifa);
}