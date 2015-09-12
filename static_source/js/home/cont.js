//ping
if(typeof(pgvMain) == 'function')
pgvMain();

//back
//document.getElementById('main-bottom').style.backgroundImage="url('http://ossweb-img.qq.com/images/age/web201408/con_bot.jpg')";

//nav
function nav(){
	var topNav = document.getElementById('topNav'),logoBox = document.getElementById('logoBox');
	showIndex(topNav);
	showIndex(logoBox);
	var navSub = document.getElementById('navSub').getElementsByTagName('dl'),navIndex = document.getElementById('navIndex').getElementsByTagName('li'),i,j;
	for(i=0;i<navSub.length;i++){
		showSub(navSub[i],i)
		showSub(navIndex[i+1],i)
	}
	function showIndex(_obj){
		_obj.onmouseover=function(){topNav.style.height='242px';document.getElementById('navSub').style.display='block'}
		_obj.onmouseout=function(){topNav.style.height='75px';document.getElementById('navSub').style.display='none'}
	};
	function showSub(_obj,_no){
		_obj.onmouseover=function(){
			navSub[_no].className='nav3';navIndex[_no+1].className='nav3'
		}
		_obj.onmouseout=function(){
			navSub[_no].className='';navIndex[_no+1].className=''
		}
	}
}


//lay
/*
var _lay = document.createElement('div');
_lay.style.cssText = "width:117px;height:371px;position:absolute";
_lay.innerHTML = '<a href="#" target="_blank" data-TGAD="1267,12585" class="retad"></a><a href="#" target="_blank" data-TGAD="1267,8166" class="retad"></a><div class="retdiv"><a href="#" title=""></a></div>';
document.body.appendChild(_lay);

var _scroll = function() {
    var _t = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
    _w = document.documentElement.clientWidth || document.body.clientWidth,
    _c = document.documentElement.clientHeight || document.body.clientHeight,
    _h = document.documentElement.scrollHeight || document.body.scrollHeight,
    px = 100+_t;
    if(_w<1200){_lay.style.display='none'}
    else{_lay.style.left = _w / 2 + 500 + 'px';_lay.style.display='block';}
    if (px < 446 ) px = 446;
    if (px + 550 >= _h)px = _h -550
    _lay.style.top = px + 'px'
};
_scroll();


function addEvent(obj, type, fn) {
    if (window.attachEvent) {
        obj.attachEvent('on' + type, fn)
    } else {
        obj.addEventListener(type, fn, false)
    }
}
addEvent(window, 'scroll', _scroll);
addEvent(window, 'resize', _scroll);
*/

//flash
function flash(cid,w,h,url){
/*	
var swfid=document.getElementById(cid),size='width="'+w+'" height="'+h+'"',doc=url;var swf='<object id="FlashID" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '+size+'><param name="movie" value="'+doc+'" /><param name="wmode" value="transparent" /> <param name="allowScriptAcces" value="always"/><param name="quality" value="high" /><embed type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="'+doc+'" '+size+' wmode="transparent" /></object>';swfid.innerHTML=swf;};
flash('enter1','221','242','/web201408/swf/enter1.swf');
//FLASH°´Å¥
function gotoPage(num){
	switch(num+""){
		case "1":window.open("/act/a20150727issue/index.shtml","_blank");break;
		case "2":window.open("/download.shtml","_blank");break;
		case "3":window.open("/cp/a20150707activate/index.htm","_blank");break;//


}
*/
}

/*  |xGv00|082797220b2fe7f3e631e6579c5b3a31 */