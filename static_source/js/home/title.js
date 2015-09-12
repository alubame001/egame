
function ostb_int() {
	
	var Cookie = {};
	Cookie.get = function(sName, sDefaultValue) {
		var sRE = "(?:; |^)" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);
		if (oRE.test(document.cookie)) {
			return unescape(RegExp['$1'])
		} else {
			return sDefaultValue || null
		}
	};
	Cookie.set = function(sName, sValue, iExpireSec, sDomain, sPath, bSecure) {
		if (!sName) {
			return
		}
		if (!sValue) {
			sValue = ""
		}
		var str = sName + "=" + escape(sValue) + "; ";
		if (!isNaN(iExpireSec)) {
			var oDate = new Date();
			oDate.setTime(oDate.getTime() + iExpireSec * 1000);
			str += "expires=" + oDate.toGMTString() + "; "
		}
		if (sDomain) {
			str += "domain=" + sDomain + "; "
		}
		if (sPath) {
			str += "path=" + sPath + "; "
		} else {
			str += "path=/; "
		}
		if (bSecure) {
			str += "secure"
		}
		document.cookie = str
	};
	Cookie.clear = function(sName) {
		Cookie.set(sName, "", new Date(0), "jsbdw.com", "/")
	};
	var d = document,
		$ = function(o) {
			return d.getElementById(o)
		},
		js = {
			"jade": true,
			"yl": true,
			"speed": true,
			"xd": true,
			"nz": true,
			"tps": true,
			"qqtang": true
		},
		ost = d.createElement("div"),
		b = ['<div class="ost_pbx ost_pbg"><div class="ost_pin ost_pbg">'],
		rd = Math.random(),
		n = window.location.host.split(".")[0],
		p = null,
		t = null,
		e = null,
		len = null,
		chk = true,
		chh = true,
		
		//a = '" target="_blank"',
		a = '" target=""',
		ig = '?ADTAG=IED.InnerCop.gameWeb.iGame',
		ir = "http://igame.qq.com/",
		iu = "http://ossweb-img.qq.com/",
		r = iu + "images/js/topfiles/ost1410/",
		isIE6 = navigator.userAgent.indexOf('MSIE') != -1 && !window.XMLHttpRequest,
		l = function(u, y) {
			var s = d.createElement(y);
			if (y == "script") {
				s.src = u;
				s.type = "text/javascript";
				s.setAttribute("charset", "gb2312")
			} else {
				s.href = u;
				s.rel = "stylesheet";
				s.type = "text/css"
			}
			d.getElementsByTagName("head")[0].appendChild(s);
			return s
		},
		cl = function(c, u) {
			o = l(u, "script");
			if (navigator.userAgent.indexOf('MSIE') != -1) {
				o.onreadystatechange = function() {
					if (this.readyState && this.readyState == "loading") {
						return
					} else {
						c()
					}
				}
			} else {
				o.onload = c
			}
		},
		loadJs = function(url, callback, options) {
			options = options || {};
			var head = document.getElementsByTagName('head')[0] || document.documentElement,
				script = document.createElement('script'),
				done = false;
			script.src = url;
			if (options.charset) {
				script.charset = options.charset
			}
			script.onerror = script.onload = script.onreadystatechange = function() {
				if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
					done = true;
					if (callback) {
						callback()
					}
					script.onerror = script.onload = script.onreadystatechange = null;
					head.removeChild(script)
				}
			};
			head.insertBefore(script, head.firstChild)
		},
		getHost = function(url) {
			var host = "null";
			if (typeof url == "undefined" || null == url) url = window.location.href;
			var regex = /.*\:\/\/([^\/|:]*).*/;
			var match = url.match(regex);
			if (typeof match != "undefined" && null != match) {
				host = match[1]
			}
			if (typeof host != "undefined" && null != host) {
				var strAry = host.split(".");
				if (strAry.length > 1) {
					host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1]
				}
			}
			return host
		},
		int = function() {
			l(r + "ost.min.css?ran=" + rd, "link");
			ost.className = "ost_box ost_bg";
			ost.id = "ost_box";
			ost.style.cssText = "position:absolute;top:-500px;";
			ost.innerHTML = '<ul class="ost_inner ost_lsn"><li class="ost_logo ost_h40 ost_fl ost_bg"><a href="/' + a + ' class="ost_blnk ost_hdn" title="首页">New Game</a></li><li id="ost_g" class="ost_ad ost_h40 ost_fl"></li><li class="ost_total ost_ml10 ost_fr"><h3 class="ost_title ost_h40" id="ost_t">New Game!<i class="ost_icon_arrow ost_bg"></i><sup class="ost_icon_reddot" id="ost_rank_v"></sup></h3><div class="ost_pop" id="ost_p"></div></li><li class="ost_fr ost_log ost_bg" id="ost_log"></li></ul><div id="ost_d" class="ost_big"></div>';
			d.body.appendChild(ost);
			cl(function() {
				var aes = function(index) {
						var pm = $("ost_pm"),
							bar = $("ost_log");
						pm.onmouseover = bar.onmouseover = function() {
							if (chh) {
								var popstr = '<div id="ost_pm" class="ost_pop_msg ost_pmbg"><div class="ost_pm_box ost_pmbg"><div class="opt_pm_inner"><h3 class="ost_pm_title">' + official_website_info['gname'] + '</h3><div id="ost_txtbox"></div></div></div></div>';
								pm.innerHTML = popstr;
								var txtbox = $("ost_txtbox"),
									infoList = official_website_info['igamemsg'];
								if (index == 0) {
									var msgstr = '<ul class="ost_lsn ost_pmlist">';
									if (infoList.length) {
										for (var i = 0; i < infoList.length; i++) {
											msgstr += '<li><a target="_blank" href="' + infoList[i]['url'] + '" class="ost_pmlnk"><span class="ost_pmname">' + infoList[i]['name'] + '</span>(<span class="ost_pm_num">' + infoList[i]['num'] + '</span>)</a></li>'
										};
										msgstr += "</ul>"
									} else {
										msgstr = '<p class="ost_nmsg">New Game</p>'
									}
									txtbox.innerHTML = msgstr
								} else if (index == -2) {
									txtbox.innerHTML = '<p class="ost_pm_tips">New Game2</p><span class="ost_reg"><a class="ost_reglnk" target="_blank" href="' + official_website_info["active_url"] + '">New Game<span class="ost_arrow">&nbsp;&gt;&gt;</span></a></span>'
								}
								chh = false
							}
							pm.style.display = "block"
						};
						pm.onmouseout = bar.onmouseout = function() {
							pm.style.display = "none"
						}
					},
					sn = function(o) {
						var num = o,
							c = [];
						if (o.length > 8) {
							for (var i = 0; i < 8; i++) {
								c.push(o.charAt(i))
							};
							return c.join("")
						};
						return o
					},
					lg = function() {
						LoginManager.login(function() {
							//cl(msg, "http://user1.game.qq.com/cgi-bin/v1.0/extern/cgi_official_website.cgi?type=0&rd=" + (rd + 1))
						})
					};

				function msg() {
					var giftstr = official_website_info['gid'] != 0 ? '<li class="ost_fl ost_bg ost_gift"><a class="ost_gifturl ost_loglnk" href="' + official_website_info['gifturl'] + '"  target="_blank">Àñ°ü</a></li>' : '',
						logstr = '<li id="log" class="ost_fl ost_login"><a href="' + official_website_info['homeurl'] + '" target="_blank" class="ost_loglnk">¹Ù·½ÉçÇø</a></li>',
						wstr = '<ul class="ost_fl ost_lsn ost_info ost_bg ost_h40">';
					if (official_website_info["r"] != -1) {
						var cls = numstr = '';
						if (official_website_info["total"] != 0) {
							var total = official_website_info["total"] > 9 ? '9+' : official_website_info["total"];
							numstr = '<span class="ost_msgnum">' + total + '</span>';
							cls += ' ost_newmsgn'
						};
						var nsstr = '<li class="ost_head ost_fl"><a target="_blank" href="' + official_website_info['headurl'] + '"><img class="headimg" width="20" height="19" src="' + official_website_info['headImg'] + '"></a></li><li class="ost_fl ost_nick"><a class="ost_loglnk" href="' + official_website_info['nickurl'] + '" target="_blank">' + sn(official_website_info["nick"]) + '</a></li><li class="ost_fl ost_bg ost_msgn ' + cls + ' ost_mt9"><a href="' + official_website_info['mailurl'] + '" target="_blank" class="ost_loglnk ost_mlnk">' + numstr + '</a></li>'
					};
					switch (official_website_info["r"]) {
					case "0":
						$("ost_log").innerHTML = wstr + nsstr + giftstr + '</ul><div id="ost_pm"></div>';
						aes(0);
						break;
					case "-1":
						$("ost_log").innerHTML = wstr + logstr + giftstr + '</ul>';
						break;
					case "-2":
						$("ost_log").innerHTML = wstr + nsstr + giftstr + '</ul><div id="ost_pm"></div>';
						aes(-2);
						break;
					default:
						break
					}
				}
				//msg()
			}, "http://user1.game.qq.com/cgi-bin/v1.0/extern/cgi_official_website.cgi?type=0&rd=" + rd);
			cl(function() {
				if (js[n] && window.location.host.indexOf("qt.qq.com") == -1) {
					var slide = function(a) {
							function l() {
								c = setInterval(m, 10)
							}
							function m() {
								j > g ? k.style.top = -Math.round(b.Quart.easeOut(g++, h, i, j)) + "px" : (h = Math.abs(parseInt(k.style.top)), h >= f * e && (h = k.style.top = 0), clearInterval(c), g = 0, setTimeout(l, d))
							}
							var c, b = {
								Quart: {
									easeOut: function(a, b, c, d) {
										return -c * (a /= d) * (a - 2) + b
									}
								}
							},
								d = 3e3,
								e = 1,
								f = 25,
								g = 0,
								h = 0,
								i = f,
								j = 40,
								k = document.getElementById(a);
							setTimeout(l, d)
						};
					var bn = d.createElement("div"),
						oD3 = _tencent_media.js;
					d.body.appendChild(bn);
					d.body.style.paddingTop = "67px";
					d.body.style.backgroundPosition = "center 67px";
					bn.className = "ost_bn";
					bn.style.cssText = "position:absolute;top:-500px;";
					bn.innerHTML = '<div class="ost_inner ost_bni"><em class="ost_jn ost_bg">¹«¸æ£º</em><ul id="ost_jade" class="ost_news"><li><a href="/"></a></li> <li><a href="/" target="_blank" class="ost_BFB ost_bg">' + oD3[0] + '</a></li></ul></div>';
					if (n == "nz" && $("flash_top")) {
						$("flash_top").style.top = "67px"
					}
					slide("ost_jade")
				} else {
					d.body.style.paddingTop = "42px"
				}
			}, "http://game.qq.com/act/media/20120601457/data.js?ran=" + rd);

			function footMedia() {
				cl(function() {
					var url = window.location.href,
						ex = _tencent_media.except.split(","),
						site = document.title,
						st = false,
						show = true;
					if (ex.length && ex[0] != "ÎÞ") {
						for (var i = ex.length; i--;) {
							if (site.indexOf(ex[i]) != -1) {
								show = false;
								break
							}
						}
					};
					for (var i = 1, len = _tencent_media.prod.length; i < len; i++) {
						var ths = _tencent_media.prod[i]["site"];
						if (url == ths || url == ths + "/" || url == ths + "/index.shtml" || url.indexOf(ths + "?") != -1 || url.indexOf(ths + "/?") != -1 || url.indexOf(ths + "/index.shtml?") != -1 || url.indexOf(ths + "/main.shtml?") != -1 || url.indexOf(ths + "#") != -1 || url.indexOf(ths + "/#") != -1 || url.indexOf(ths + "/main.shtml#") != -1) {
							st = true;
							break
						}
					}
					if (st && show) {
						var bp = d.createElement("div"),
							oD4 = _tencent_media.ads.main;
						d.body.appendChild(bp);
						var ht = null,
							_1 = oD4[1],
							_2 = "?";
						if (_1.indexOf("?") != -1) {
							_2 = "&"
						}
						var bpc1 = '<div class="ost_bpb"><h3 class="ost_t ost_bg"><a href="javascript:bps(false);" class="ost_bpc ost_fr ost_bg ost_hdn">¹Ø±Õ</a>ÌÚÑ¶ÓÎÏ·¾«Æ·ÍÆ¼ö</h3><p style="background-image:url(' + oD4[0] + ')" class="ost_p ost_bg"><a href="' + _1 + _2 + 'ADTAG=media.free.gamewebhot.ad" class="ost_lnk ost_hdn" target="_blank">µã»÷½øÈë</a></p></div>',
							bpc2 = '<a href="javascript:bps(true);" class="ost_cnr ost_bg ost_hdn">µã»÷½øÈë</a>',
							bps = function(o) {
								if (o) {
									bp.innerHTML = bpc1;
									ht = 174
								} else {
									bp.innerHTML = bpc2;
									ht = 53
								}
								if (autohdn) {
									clearTimeout(autohdn)
								}
								if (isIE6) {
									var pos = function() {
											bp.style.top = d.documentElement.scrollTop + d.documentElement.clientHeight - ht + "px"
										};
									pos();
									window.onscroll = pos;
									window.attachEvent("onresize", pos)
								}
							};
						window.bps = bps;
						bp.className = "ost_bp";
						bp.style.cssText = "position:absolute;right:-500px;";
						bps(true);
						var autohdn = setTimeout(function() {
							bps(false);
							autohdn = null
						}, 8000)
					}
				}, "http://game.qq.com/act/media/20120601457/data.js?ran=" + rd)
			};

			function loadO2Media() {
				cl(function() {
					window.tencentO2AdCallback1 = function(topData) {
						if (!topData) {
							return
						}
						var gg = $("ost_g"),
							gd = $("ost_d"),
							isHtmlInsert = false,
							topadImgThumb = unescape(topData.res_url_small);
						var topadImg = unescape(topData.res_url),
							topadUrl = "http://ac.o2.qq.com/php/click.php";
						topadUrl += "?loc_id=" + topData.loc_id;
						topadUrl += "&sch_id=" + topData.sch_id;
						topadUrl += "&ad_id=" + topData.ad_id;
						topadUrl += "&mtr_id=" + topData.mtr_id;
						topadUrl += "&gid=" + topData.gid;
						topadUrl += "&tag=" + topData.tag;
						topadUrl += "&link_to=" + topData.link_to;
						gg.innerHTML = '<img class="ost_nb" id="ost_go" src="' + topadImgThumb + '" alt=""/>';
						gg.onmouseover = gd.onmouseover = function() {
							gd.style.display = "block";
							$("ost_go").style.display = "none";
							if (!isHtmlInsert) {
								gd.innerHTML = '<a href="' + topadUrl + '" target="_blank"><img class="ost_nb" src="' + topadImg + '" width="' + topData.width + '" height="' + topData.height + '" alt=""/></a>'
							}
							isHtmlInsert = true
						};
						gg.onmouseout = gd.onmouseout = function() {
							gd.style.display = "none";
							$("ost_go").style.display = "block"
						}
					};
					loadJs('http://ac.o2.qq.com/php/show.php?loc_id=119_0d8e2b9df01ce2966bb5d8dd52e865e1&func_type=1&ran=' + rd, '', {
						charset: 'utf-8'
					})
				}, "http://game.qq.com/act/media/20120601457/data.js?ran=" + rd)
				//}, "/activity/" + rd)
			};
			//footMedia();
			//loadO2Media();
			var eventUtil = {
				addListener: function(element, type, hander) {
					if (element.addEventListener) {
						element.addEventListener(type, hander, false)
					} else if (element.attachEvent) {
						element.attachEvent('on' + type, hander)
					} else {
						element['on' + type] = hander
					}
				},
				getEvent: function(event) {
					return event || window.event
				},
				getTarget: function(event) {
					return event.target || event.srcElement
				},
				preventDefault: function(event) {
					if (event.preventDefault) {
						event.preventDefault()
					} else {
						event.returnValue = false
					}
				},
				removeListener: function(element, type, hander) {
					if (element.removeEventListener) {
						element.removeEventListener(type, hander, false)
					} else if (element.deattachEvent) {
						element.detachEvent(type, hander)
					} else {
						element['on' + type] = null
					}
				},
				stopPropagation: function(event) {
					if (event.stopPropagation) {
						event.stopPropagation()
					} else {
						event.cancelBubble = true
					}
				}
			};

			function vCompare() {
				var isRankChanged = Cookie.get("bRankChanged");
				var ostRankv = $("ost_rank_v");
				if (isRankChanged == "TRUE") {
					ostRankv.className = "ost_icon_reddot ost_bg"
				} else {
					ostRankv.className = "ost_icon_reddot"
				}
			};
			p = $("ost_p");
			t = $("ost_t");
			eventUtil.addListener(t, "mouseover", function(event) {
				t.className = "ost_title ost_h40 ost_title_hover";
				p.innerHTML = '<iframe id="gameRank" name="gameRank" allowTransparency="true" style="background:transparent;" src="http://ossweb-img.qq.com/images/js/topfiles/ost1410/game_rank.htm?rd=' + rd + '" width="700" height="465" frameBorder="0" scrolling="no"></iframe></div>';
				p.style.display = "block";
				var gameRank = $("gameRank");
				if (gameRank.attachEvent) {
					gameRank.attachEvent("onload", function() {
						vCompare()
					})
				} else {
					gameRank.onload = function() {
						vCompare()
					}
				};
				eventUtil.stopPropagation(event)
			});
			eventUtil.addListener(p, "mouseover", function(event) {
				t.className = "ost_title ost_h40 ost_title_hover";
				p.style.display = "block";
				eventUtil.stopPropagation(event)
			});
			eventUtil.addListener(t, "mouseout", function(event) {
				p.style.display = "none";
				t.className = "ost_title ost_h40";
				Cookie.clear("bRankChanged");
				eventUtil.stopPropagation(event)
			});
			eventUtil.addListener(p, "mouseout", function(event) {
				p.style.display = "none";
				t.className = "ost_title ost_h40";
				Cookie.clear("bRankChanged");
				eventUtil.stopPropagation(event)
			})
		}()
};

function ostb_chk() {
	setTimeout(function() {
		if (document.getElementById("ost_g")) {
			if (window.detachEvent) {
				window.detachEvent("onload", ostb_chk)
			} else {
				window.removeEventListener("load", ostb_chk, false)
			}
		} else {
			ostb_int()
		}
	}, 500)
};
if (window.attachEvent) {
	window.attachEvent("onload", ostb_chk)
} else {
	window.addEventListener("load", ostb_chk, false)
}; /*  |xGv00|19807ed608173cc8d4d078deb81989a6 */