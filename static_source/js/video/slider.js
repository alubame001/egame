(function($) {
				$.fn.parallaxSlider = function(options) {
					var opts = $.extend({}, $.fn.parallaxSlider.defaults, options);
					return this.each(function() {
						var $pxs_container 	= $(this),
						o 				= $.meta ? $.extend({}, opts, $pxs_container.data()) : opts;
						
						//the main slider
						var $pxs_slider		= $('.pxs_slider',$pxs_container),
						//the elements in the slider
						$elems			= $pxs_slider.children(),
						//total number of elements
						total_elems		= $elems.length,
						//the navigation buttons
						$pxs_next		= $('.pxs_next',$pxs_container),
						$pxs_prev		= $('.pxs_prev',$pxs_container),
						//the bg images
						$pxs_bg1		= $('.pxs_bg1',$pxs_container),
						$pxs_bg2		= $('.pxs_bg2',$pxs_container),
						$pxs_bg3		= $('.pxs_bg3',$pxs_container),
						//current image
						current			= 0,
						//the thumbs container
						$pxs_thumbnails = $('.pxs_thumbnails',$pxs_container),
						//the thumbs
						$thumbs			= $pxs_thumbnails.children(),
						//the interval for the autoplay mode
						slideshow,
						//the loading image
						$pxs_loading	= $('.pxs_loading',$pxs_container),
						$pxs_slider_wrapper = $('.pxs_slider_wrapper',$pxs_container);
							
						//first preload all the images
						var loaded		= 0,
						$images		= $pxs_slider_wrapper.find('img');
							
						$images.each(function(){
							var $img	= $(this);
							
							$('<img/>').load(function(){
								++loaded;
								if(loaded	== total_elems*2){
									$pxs_loading.hide();
									$pxs_slider_wrapper.show();
										
									//one images width (assuming all images have the same sizes)
									var one_image_w		= $pxs_slider.find('img:first').width();
							
									/*
									need to set width of the slider,
									of each one of its elements, and of the
									navigation buttons
									 */
									setWidths($pxs_slider,
									$elems,
									total_elems,
									$pxs_bg1,
									$pxs_bg2,
									$pxs_bg3,
									one_image_w,
									$pxs_next,
									$pxs_prev);
							
									/*
										set the width of the thumbs
										and spread them evenly
									 */
									$pxs_thumbnails.css({
										'width'			: one_image_w + 'px',
										'margin-left' 	: -one_image_w/2 + 'px'
									});
									var spaces	= one_image_w/(total_elems+1);
									$thumbs.each(function(i){
										var $this 	= $(this);
										var left	= spaces*(i+1) - $this.width()/2;
										$this.css('left',left+'px');
											
										if(o.thumbRotation){
											var angle 	= Math.floor(Math.random()*41)-20;
											$this.css({
												'-moz-transform'	: 'rotate('+ angle +'deg)',
												'-webkit-transform'	: 'rotate('+ angle +'deg)',
												'transform'			: 'rotate('+ angle +'deg)'
											});
										}
										//hovering the thumbs animates them up and down
										$this.bind('mouseenter',function(){
											$(this).stop().animate({top:'-10px'},100);
										}).bind('mouseleave',function(){
											$(this).stop().animate({top:'0px'},100);
										});
									});
										
									//make the first thumb be selected
									highlight($thumbs.eq(0));
										
									//slide when clicking the navigation buttons
									$pxs_next.bind('click',function(){

										++current;

										if(current >= total_elems)
											if(o.circular)
												current = 0;
										else{
											--current;
											return false;
										}
										setChannel(current)
										highlight($thumbs.eq(current));
										slide(current,
										$pxs_slider,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										o.speed,
										o.easing,
										o.easingBg);
									});
									$pxs_prev.bind('click',function(){
										--current;
										if(current < 0)
											if(o.circular)
												current = total_elems - 1;
										else{
											++current;
											return false;
										}
										highlight($thumbs.eq(current));
										slide(current,
										$pxs_slider,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										o.speed,
										o.easing,
										o.easingBg);
										setChannel(current)
									});
							
									/*
									clicking a thumb will slide to the respective image
									 */
									$thumbs.bind('click',function(){
										var $thumb	= $(this);
										highlight($thumb);
										//if autoplay interrupt when user clicks
										if(o.auto)
											clearInterval(slideshow);
										current 	= $thumb.index();
										slide(current,
										$pxs_slider,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										o.speed,
										o.easing,
										o.easingBg);
										setChannel(current)
									});
							
								
							
									/*
									activate the autoplay mode if
									that option was specified
									 */
									if(o.auto != 0){
										o.circular	= true;
										slideshow	= setInterval(function(){
											$pxs_next.trigger('click');
										},o.auto);
									}
							
									/*
									when resizing the window,
									we need to recalculate the widths of the
									slider elements, based on the new windows width.
									we need to slide again to the current one,
									since the left of the slider is no longer correct
									 */
									$(window).resize(function(){
										w_w	= $(window).width();
										setWidths($pxs_slider,$elems,total_elems,$pxs_bg1,$pxs_bg2,$pxs_bg3,one_image_w,$pxs_next,$pxs_prev);
										slide(current,
										$pxs_slider,
										$pxs_bg3,
										$pxs_bg2,
										$pxs_bg1,
										1,
										o.easing,
										o.easingBg);
									});

								}
							}).error(function(){
								alert('here')
							}).attr('src',$img.attr('src'));
						});
							
							
							
					});
				};
				
				//the current windows width
				var w_w				= $(window).width();
				
				var slide			= function(current,
				$pxs_slider,
				$pxs_bg3,
				$pxs_bg2,
				$pxs_bg1,
				speed,
				easing,
				easingBg){
					var slide_to	= parseInt(-w_w * current);
					$pxs_slider.stop().animate({
						left	: slide_to + 'px'
					},speed, easing);
					$pxs_bg3.stop().animate({
						left	: slide_to/2 + 'px'
					},speed, easingBg);
					$pxs_bg2.stop().animate({
						left	: slide_to/4 + 'px'
					},speed, easingBg);
					$pxs_bg1.stop().animate({
						left	: slide_to/8 + 'px'
					},speed, easingBg);
				}
				
				var highlight		= function($elem){
					$elem.siblings().removeClass('selected');
					$elem.addClass('selected');

				}
				
				var setWidths		= function($pxs_slider,
				$elems,
				total_elems,
				$pxs_bg1,
				$pxs_bg2,
				$pxs_bg3,
				one_image_w,
				$pxs_next,
				$pxs_prev){
					/*
					the width of the slider is the windows width
					times the total number of elements in the slider
					 */
					var pxs_slider_w	= w_w * total_elems;
					$pxs_slider.width(pxs_slider_w + 'px');
					//each element will have a width = windows width
					$elems.width(w_w + 'px');
					/*
					we also set the width of each bg image div.
					The value is the same calculated for the pxs_slider
					 */
					$pxs_bg1.width(pxs_slider_w + 'px');
					$pxs_bg2.width(pxs_slider_w + 'px');
					$pxs_bg3.width(pxs_slider_w + 'px');
					
					/*
					both the right and left of the
					navigation next and previous buttons will be:
					windowWidth/2 - imgWidth/2 + some margin (not to touch the image borders)
					 */
					var position_nav	= w_w/2 - one_image_w/2 + 3;
					$pxs_next.css('right', position_nav + 'px');
					$pxs_prev.css('left', position_nav + 'px');
				}
				
				$.fn.parallaxSlider.defaults = {
					auto			: 0,	//how many seconds to periodically slide the content.
											//If set to 0 then autoplay is turned off.
					speed			: 1000,//speed of each slide animation
					easing			: 'jswing',//easing effect for the slide animation
					easingBg		: 'jswing',//easing effect for the background animation
					circular		: true,//circular slider
					thumbRotation	: true//the thumbs will be randomly rotated
				};
				//easeInOutExpo,easeInBack

			})(jQuery);
function setChannel(newParam) {
	function SetPlayer(streamName, token, targetName) {
		var swfVersion = "10.1.0";
		var installSwf = "/static_source/js/video/playerProductInstall.swf";

		var flashvars = {};
		flashvars.uid = "";
		flashvars.location = "CN";
		flashvars.stream = streamName;
		flashvars.token = token;
		flashvars.button = "1,1,1,1,1,1";

		var params = {};
		params.quality = "high";
		params.bgcolor = "#FFFFFF";
		params.allowscriptaccess = "always";
		params.allowfullscreen = "true";
		params.wmode = "transparent";

		var attributes = {};
		attributes.id = targetName;
		attributes.name = targetName;
		attributes.align = "middle";

		swfobject.embedSWF("http://staticlive.douyutv.com/common/share/play.swf?room_id="+DyId, targetName, "1000", "500", swfVersion, installSwf, flashvars, params, attributes);
	}
	console.log("setChannel",newParam)
	$('.show').hide().fadeIn(5000)
	//$('.delete').fadeOut(5000)
	$(".delete").fadeOut("slow", function(){ //fade
	$('.show').show().fadeIn(5000)
	});

          switch (newParam) {
          case 0:
            $(".show").fadeOut(1000).remove()
            $(".images").hide()
            $(".image0").fadeIn(1000)
            $(".channel0").append('<embed class="show" src="http://yy.com/s/14075572/mini.swf" quality="high" width="1000" height="500" align="middle" allowScriptAccess="never" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>')
            $(".images").hide(1000) 
   
   
              break;          	
          case 1:
          // http://x.15w.com/summoner/ao2x1e4ru2cxdnk1ha
            $(".show").fadeOut(1000).remove()
            $(".images").hide()
            $(".image1").fadeIn(1000)
            $(".channel1").append('<embed class="show" src="http://yy.com/s/36163746/1728229749/mini.swf" quality="high" width="1000" height="500" align="middle" allowScriptAccess="never" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>')
            $(".images").hide(1000) 
   
              break;

          case 2: 
            $(".show").fadeOut(1000).remove()
            $(".images").show()
            $(".image2").fadeIn(1000)
            $(".channel2").append('<object class="show" width="1000" height="500" id ="player"></object>')
			var DyId ="65251"

			SetPlayer("Virtual12@s30309", "daEbbctb3c8a0b1d1d_dNanbJbwctcIdZd8-bv7dL_-jy-SMU", "player");
			 $("#player").addClass("show")
            $(".images").hide(1000) 
   
             break;

          case 3: 
            $(".show").fadeOut(1000).remove()
            $(".images").show()
            $(".image3").fadeIn(1000)
            $(".channel3").append('<object class="show" width="1000" height="500" id ="player"></object>')
			var DyId ="264254"

			SetPlayer("Virtual12@s30309", "daEbbctb3c8a0b1d1d_dNanbJbwctcIdZd8-bv7dL_-jy-SMU", "player");
			 $("#player").addClass("show")
            $(".images").hide(1000) 
   
             break;

          case 4: 
            $(".show").fadeOut(1000).remove()
            $(".images").show()
            $(".image4").fadeIn(1000)
            $(".channel4").append('<object class="show"  type="application/x-shockwave-flash" id="BFPlayerID" data="http://dlstatic.cdn.zhanqi.tv/assets/swf/shell.swf?20150901.04" width="100%" height="100%"><param name="menu" value="false"><param name="scale" value="noScale"><param name="allowFullscreen" value="true"><param name="allowScriptAccess" value="always"><param name="allowFullScreenInteractive" value="true"><param name="wmode" value="transparent"><param name="flashvars" value="Servers=eyJsb2ciOnsiaXAiOiIxMTMuMzEuODcuODYiLCJwb3J0IjoxNTAwMX0sImxpc3QiOlt7ImlwIjoiMTE1LjI5LjI0NS4xNDQiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjc5LCJpZCI6Nzl9LHsiaXAiOiIxODIuOTIuMjMyLjE5MCIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6OTIsImlkIjo5Mn0seyJpcCI6IjExMi4xMjYuODQuNjYiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjkzLCJpZCI6OTN9LHsiaXAiOiIxMTUuMjguMTczLjM2IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo5NCwiaWQiOjk0fSx7ImlwIjoiMTIwLjI2LjAuMTM4IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo1OSwiaWQiOjU5fSx7ImlwIjoiMTEyLjEyNC42MS4xMDYiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjQ4LCJpZCI6NDh9LHsiaXAiOiIxMjAuNTUuMTE3LjExMyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6OTcsImlkIjo5N30seyJpcCI6IjEyMy41Ny40Ni4yMjMiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjgyLCJpZCI6ODJ9LHsiaXAiOiIxMTUuMjkuMjAxLjI1MyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6ODYsImlkIjo4Nn0seyJpcCI6IjExMi4xMjYuODQuMjE0IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo5MCwiaWQiOjkwfSx7ImlwIjoiMTEyLjEyNC45LjM5IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjoyMiwiaWQiOjIyfSx7ImlwIjoiMTIwLjI2LjE2LjM4IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo4NywiaWQiOjg3fSx7ImlwIjoiMTIxLjQzLjE5Ni43NyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NDEsImlkIjo0MX0seyJpcCI6IjExMi4xMjQuNjEuMTA0IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo0NywiaWQiOjQ3fSx7ImlwIjoiMTIwLjI2LjYzLjE3NiIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6MjEsImlkIjoyMX0seyJpcCI6IjEyMC41NS43Mi4xNjQiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjQzLCJpZCI6NDN9LHsiaXAiOiIxMTQuMjE1LjExNy42MCIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6MjcsImlkIjoyN30seyJpcCI6IjExMi4xMjYuODQuNjQiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjkxLCJpZCI6OTF9LHsiaXAiOiIxMTUuMjguMTMxLjE5NyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6ODQsImlkIjo4NH0seyJpcCI6IjIxOC4yNDQuMTI4LjQ4IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo3NiwiaWQiOjc2fSx7ImlwIjoiMTIzLjU3LjEwLjE5NyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NjAsImlkIjo2MH0seyJpcCI6IjEyMS40My4yMzAuODIiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjI0LCJpZCI6MjR9LHsiaXAiOiIxMTIuMTI0LjE5LjIwMyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NDYsImlkIjo0Nn0seyJpcCI6IjExMi4xMjYuODUuMTI0IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo2MSwiaWQiOjYxfSx7ImlwIjoiMTIzLjU3LjIxMi40NiIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6MzMsImlkIjozM30seyJpcCI6IjIxOC4yNDQuMTMwLjI1IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo4OCwiaWQiOjg4fSx7ImlwIjoiMTE1LjI4LjIyNi4xMzMiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjI5LCJpZCI6Mjl9LHsiaXAiOiI0Mi45Ni4xNDMuOSIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6OTUsImlkIjo5NX0seyJpcCI6IjEyMC4yNi4xNi4xNzYiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjg5LCJpZCI6ODl9LHsiaXAiOiIxMjMuNTYuMTUyLjI1MyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NDAsImlkIjo0MH0seyJpcCI6IjQyLjk2LjE2OC45NyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NjUsImlkIjo2NX0seyJpcCI6IjEyMC4yNi4xMy4yMTQiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjU4LCJpZCI6NTh9LHsiaXAiOiIxODIuOTIuMjE3LjE0MyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NjIsImlkIjo2Mn0seyJpcCI6IjEyMC41NS43Mi4yNTQiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjQ0LCJpZCI6NDR9LHsiaXAiOiIxMjMuNTYuMTUyLjE4MyIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6MzEsImlkIjozMX0seyJpcCI6IjEyMC41NS4xMTYuMjE5IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo5OCwiaWQiOjk4fSx7ImlwIjoiMTgyLjkyLjEyOC4yNDkiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjYzLCJpZCI6NjN9LHsiaXAiOiIxMTIuMTI0LjI1LjI0OSIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NTcsImlkIjo1N30seyJpcCI6IjEyMy41Ni40Ny4xNTUiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjgxLCJpZCI6ODF9LHsiaXAiOiIxMjEuNDMuMTk3LjE1MiIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6NDIsImlkIjo0Mn0seyJpcCI6IjExMi4xMjQuMzguMjI5IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo2NCwiaWQiOjY0fSx7ImlwIjoiMTEyLjEyNC40NC4yMDUiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjIzLCJpZCI6MjN9LHsiaXAiOiIxMTUuMjkuMTk0LjE3OSIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6OTYsImlkIjo5Nn0seyJpcCI6IjEyMS40Mi4xNDIuMTYwIiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjoyNiwiaWQiOjI2fSx7ImlwIjoiMTEyLjEyNC4xMDAuMzYiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjc4LCJpZCI6Nzh9LHsiaXAiOiIxMTIuMTI2Ljg0LjY1IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo4MywiaWQiOjgzfSx7ImlwIjoiMTIzLjU2LjE1Mi4xOTIiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjMyLCJpZCI6MzJ9LHsiaXAiOiIxMTIuMTI0LjIwLjM0IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo0NSwiaWQiOjQ1fSx7ImlwIjoiMTEyLjEyNi44NC45MiIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6ODAsImlkIjo4MH0seyJpcCI6IjEyMS40Mi4xOTUuMTY2IiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjo2NiwiaWQiOjY2fSx7ImlwIjoiMTE0LjIxNS4xNDQuMTgyIiwicG9ydCI6MTUwMTAsImNoYXRyb29tX2lkIjoyOCwiaWQiOjI4fSx7ImlwIjoiMTIzLjU2LjE0NS45MCIsInBvcnQiOjE1MDEwLCJjaGF0cm9vbV9pZCI6MzQsImlkIjozNH0seyJpcCI6IjQyLjk2LjE1NC4xMjkiLCJwb3J0IjoxNTAxMCwiY2hhdHJvb21faWQiOjg1LCJpZCI6ODV9XX0=&amp;ServerIp=&amp;ServerPort=&amp;ChatRoomId=&amp;VideoLevels=eyJtdWxyYXRlIjpbWyJ3c19saXZlIiwiaGRsIiwiMjQwOTJfQk12bDcuZmx2IiwiTElWRSIsIjQiLDEsIiJdXSwicmV2aWV3IjpbWyJ6cV9yZXZpZXciLCJobHMiLCIyNDA5Ml9CTXZsN1wvcGxheWxpc3QubTN1OCIsIkxJVkUiLCI0IiwxLCIiXV0sIm11bHJhdGVIbHMiOltbIndzX2xpdmUiLCJobHMiLCIyNDA5Ml9CTXZsN1wvcGxheWxpc3QubTN1OCIsIkxJVkUiLCI0IiwxLCIiXV19&amp;cdns=eyJ2aWQiOiIyNDA5Ml9CTXZsNyIsImJyb2Nhc3QiOiI0IiwiY2RucyI6IjIxfDMyfDYxIiwicmF0ZSI6IiIsInJldmlldyI6IjEzIiwiYWlkY2RucyI6IiIsInVhaWQiOjAsImFrIjoiMS1mQTlMQ0V4Sk9DaDlKeHR0UmxrV0xRPT18Mi1mQTlMQ0V4Sk9DaDlKeHR0UmxrV0xRPT18My1kd2dSUzFsdVBTaG9OVlI4QzFnb0ZBPT18NC1kd2dSUzFsdVBTaG9OVlI4QzFnb0ZBPT18NS1lRzV0YUgxbUJBeElhMDVwU3gwbkxnPT18Ni1lRzV0YUgxbUJBeElhMDVwU3gwbkxnPT18Ny1hUnhyU3d4RUtTUlhQWEpSRG1jeE13PT18OC1SQm9UV1hoalBTOXVPWGRRZkcwYlBnPT18OS1SQWxVY0FZU0p4cHRHWFpyU200b0t3PT18MTAtfDExLWFTcGFDbGRwS1R0MEtGcDFEa2dYT3c9PXwxMi1kR3BHQXc1K0VDUjNISFJqY1U4VkVnPT18MTMtWFd4Q2VVZFBEU1p4R2tKcVhWTTlOdz09fDE0LVNRbHZYRWthREI1SloxdDVVV0VOSHc9PXwxNS1TV3BHRGtkWkRBeHZLM1pvQ1I4cUdnPT0iLCJhazIiOiIxLVlTcE9IVnhkUjN4Z0FoNTRWazFwZVE9PXwyLVlTcE9IVnhkUjN4Z0FoNTRWazFwZVE9PXwzLWFpMFVYa2w2UW54MUVGRnBHMHhYUUE9PXw0LWFpMFVYa2w2UW54MUVGRnBHMHhYUUE9PXw1LVpVdG9mVzF5ZTFoVlRrdDhXd2xZZWc9PXw2LVpVdG9mVzF5ZTFoVlRrdDhXd2xZZWc9PXw3LWREbHVYaHhRVm5CS0dIZEVIbk5PWnc9PXw4LVdUOFdUR2gzUW50ekhISkZiSGxrYWc9PXw5LVdTeFJaUllHV0U1d1BITitXbnBYZnc9PXwxMC18MTEtZEE5ZkgwZDlWbTlwRFY5Z0hseG9idz09fDEyLWFVOURGaDVxYjNCcU9YRjJZVnRxUmc9PXwxMy1RRWxIYkZkYmNuSnNQMGRcL1RVZENZdz09fDE0LVZDeHFTVmtPYzBwVVFsNXNRWFZ5U3c9PXwxNS1WRTlERzFkTmMxaHlEbk45R1F0VlRnPT0iLCJhY2MiOnsiY2RuIjo3MiwiYWRkIjoiIiwicGxhdGZvcm0iOjEsImFzdCI6MSwiYWR0IjoiMTo5MCIsImNzdCI6MCwiY2R0IjoiIn19&amp;Status=4&amp;RoomId=24092&amp;ComLayer=true&amp;VideoTitle=剑客打野，学不到东西你砍我&amp;WebHost=http://www.zhanqi.tv&amp;VideoType=LIVE&amp;GameId=6&amp;Online=51478&amp;StarRoom=0&amp;pv=20150910.02&amp;UID=0"></object>')
            $(".images").hide(2000) 
   			SetPlayer("Virtual12@s30309", "daEbbctb3c8a0b1d1d_dNanbJbwctcIdZd8-bv7dL_-jy-SMU", "BFPlayerID");
             break;


          case 5: 
            $(".show").fadeOut(1000).remove()
            $(".images").show()
            $(".image5").fadeIn(1000)
            $(".channel5").append('<embed class="show" src="http://yy.com/s/90066/mini.swf" quality="high" width="1000" height="500" align="middle" allowScriptAccess="never" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>')
            $(".images").hide(2000) 
   
             break;

         }


}
setChannel(0);

/*
<div id="live-player" class="live-player"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" align="middle"><param name="movie" value="http://imgcache.qq.com/minivideo_v1/vd/res/TencentPlayerLive.swf?max_age=86400&amp;auto=1&amp;v=243007102&amp;loadingswf=http://imgcache.qq.com/minivideo_v1/vd/res/skins/longzhu_loading.swf"><param name="quality" value="high"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"><embed wmode="opaque" flashvars="vid=243007102&amp;loadingswf=http://imgcache.qq.com/minivideo_v1/vd/res/skins/longzhu_loading.swf&amp;vurl=http://zb.v.qq.com:1863/?progid=243007102&amp;sktype=live&amp;funCnlInfo=TenVideo_FlashLive_GetChannelInfo&amp;funTopUrl=TenVideo_FlashLive_GetTopUrl&amp;funLogin=TenVideo_FlashLive_IsLogin&amp;funOpenLogin=TenVideo_FlashLive_OpenLogin&amp;funSwitchPlayer=TenVideo_FlashLive_SwitchPlayer&amp;txvjsv=2.0&amp;showcfg=1&amp;share=1&amp;full=1&amp;autoplay=1&amp;p=true" src="http://imgcache.qq.com/minivideo_v1/vd/res/TencentPlayerLive.swf?max_age=86400&amp;v=243007102" quality="high" name="tenvideo_flash_player_1429855293134" id="tenvideo_flash_player_1429855293134" bgcolor="#000000" width="100%" height="100%" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/"></object><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" class="barrage-flash" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="videoFlash" align="middle"><param name="movie" value="http://r.plures.net/plu/tplayer/tplayer-idtoejej.swf"><param name="quality" value="high"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"><embed align="none" name="videoFlash" allowfullscreen="true" allowscriptaccess="always" loop="false" menu="false" play="true" pluginspage="http://www.macromedia.com/go/getflashplayer" src="http://r.plures.net/plu/tplayer/tplayer-idtoejej.swf" type="application/x-shockwave-flash" wmode="transparent"></object></div>

*/