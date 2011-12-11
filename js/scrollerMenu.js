$(document).ready(function() {
	
	var name = "#scrollerMenu";  // put here your menu Id
    var menuYloc = null;
	
	menuYloc = parseInt($(name).css("top").substring(0,$(name).css("top").indexOf("px")));
	
	$(window).scroll(function () {   
        var offset = menuYloc+$(document).scrollTop()+"px";  
		$(name).animate({top:offset},{duration:400,queue:false});  
    });  

/*
 * Here and after a click on one of the menu links ( specified by the link id ) , we scroll the the corresponding DIV section
 * with the specified speed ( in ScrollTo(xxxx) ) , finally we add the Class "current" to the clicked link to change the color the white
 */
	$('#goHome').click(function(){ $('#home').ScrollTo(2000);$("#scrollerMenu a").removeClass("current");$(this).addClass("current");return false });
	$('#goServices').click(function(){ $('#services').ScrollTo(2000);$("#scrollerMenu a").removeClass("current");$(this).toggleClass("current");return false });
	$('#goPortfolio').click(function(){ $('#portfolio').ScrollTo(2000);$("#scrollerMenu a").removeClass("current");$(this).toggleClass("current");return false });
	$('#goContact').click(function(){ $('#contact').ScrollTo(2000);$("#scrollerMenu a").removeClass("current");$(this).toggleClass("current");return false });

});

jQuery.getPos = function (e)
{
	var l = 0;
	var t  = 0;
	var w = jQuery.intval(jQuery.css(e,'width'));
	var h = jQuery.intval(jQuery.css(e,'height'));
	var wb = e.offsetWidth;
	var hb = e.offsetHeight;
	while (e.offsetParent){
		l += e.offsetLeft + (e.currentStyle?jQuery.intval(e.currentStyle.borderLeftWidth):0);
		t += e.offsetTop  + (e.currentStyle?jQuery.intval(e.currentStyle.borderTopWidth):0);
		e = e.offsetParent;
	}
	l += e.offsetLeft + (e.currentStyle?jQuery.intval(e.currentStyle.borderLeftWidth):0);
	t  += e.offsetTop  + (e.currentStyle?jQuery.intval(e.currentStyle.borderTopWidth):0);
	return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
};

jQuery.getClient = function(e)
{
	if (e) {
		w = e.clientWidth;
		h = e.clientHeight;
	} else {
		w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
		h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
	}
	return {w:w,h:h};
};

jQuery.getScroll = function (e) 
{
	if (e) {
		t = e.scrollTop;
		l = e.scrollLeft;
		w = e.scrollWidth;
		h = e.scrollHeight;
	} else  {
		if (document.documentElement && document.documentElement.scrollTop) {
			t = document.documentElement.scrollTop;
			l = document.documentElement.scrollLeft;
			w = document.documentElement.scrollWidth;
			h = document.documentElement.scrollHeight;
		} else if (document.body) {
			t = document.body.scrollTop;
			l = document.body.scrollLeft;
			w = document.body.scrollWidth;
			h = document.body.scrollHeight;
		}
	}
	return { t: t, l: l, w: w, h: h };
};

jQuery.intval = function (v)
{
	v = parseInt(v);
	return isNaN(v) ? 0 : v;
};

jQuery.fn.ScrollTo = function(s) {
	o = jQuery.speed(s);
	return this.each(function(){
		new jQuery.fx.ScrollTo(this, o);
	});
};

jQuery.fx.ScrollTo = function (e, o)
{
	var z = this;
	z.o = o;
	z.e = e;
	z.p = jQuery.getPos(e);
	z.s = jQuery.getScroll();
	z.clear = function(){clearInterval(z.timer);z.timer=null};
	z.t=(new Date).getTime();
	z.step = function(){
		var t = (new Date).getTime();
		var p = (t - z.t) / z.o.duration;
		if (t >= z.o.duration+z.t) {
			z.clear();
			setTimeout(function(){z.scroll(z.p.y, z.p.x)},13);
		} else {
			st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
			sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
			z.scroll(st, sl);
		}

	};
	z.scroll = function (t, l){window.scrollTo(l, t)};
	z.timer=setInterval(function(){z.step();},13);
};