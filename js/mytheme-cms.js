var Myui = {
	'language':'0',
	'Score':function(){
		var id = $('#rating').attr('data-id');
		$("ul.rating li").each(function(i) {
			var $title = $(this).attr("title");
			var $lis = $("ul.rating li");
			var num = $(this).index();
			var n = num + 1;
			$(this).click(function () {
					var hadpingfen = MyTheme.Cookie.Get('ssea3_score'+id)||'';
					if (hadpingfen =='ok') {
						layer.msg('已经评分,请务重复评分');
					}
					else {
						$lis.removeClass("active");
						$("ul.rating li:lt(" + n + ")").find(".fa").addClass("fa-star").removeClass("fa-star-o");
						$("#ratewords").html($title);
						var score = $(this).attr("val");
						var nocache =  new Date().getTime();
						MyTheme.Ajax("/include/ajax.php?id="+id+"&action=score&score="+score+"&timestamp="+nocache,'get','text','',function(r){
							if((''+r).indexOf("havescore")!=-1){
								layer.msg("您已经评过分啦");
							}
							else if(r > 0){
								MyTheme.Cookie.Set('ssea3_score'+id,'ok',1);
								$("#rating .branch").html(r);//r.responseText
								if(r>8){layer.msg("满星，好爱你哟ლ(°◕‵ƹ′◕ლ)");}else if(r>6){layer.msg("四星，差点就满分了≥﹏≤");}else if(r>4){layer.msg("三星，好无奈哟╮(╯﹏╰)╭");}else if(r>2){layer.msg("凭实力二星O__O");}else if(r>0){layer.msg("一星，好气哦o(╥﹏╥)o");}
							}
							else {
								layer.msg("感谢参与！");
							}
						});
					}
				}
			).hover(function () {
				this.myTitle = this.title;
				this.title = "";
				$(this).nextAll().find(".fa").addClass("fa-star-o").removeClass("fa-star");
				$(this).prevAll().find(".fa").addClass("fa-star").removeClass("fa-star-o");
				$(this).find(".fa").addClass("fa-star").removeClass("fa-star-o");
				$("#ratewords").html($title);
			}, function () {
				this.title = this.myTitle;
				$("ul.rating li:lt(" + n + ")").removeClass("hover");
			});
		});
	},
	'Autocomplete': function() {
		$('#wd').keyup(function(){
			var keywords = $(this).val();
			if (keywords=='') { $('#word').hide(); return };
			$.ajax({
				url: '/ass.php?wd=' + keywords,
				dataType: 'jsonp',
				jsonp: 'cb', //回调函数的参数名(键值)key
				// jsonpCallback: 'fun', //回调函数名(值) value
				beforeSend:function(){
					$('.wordlist').append('<li>正在加载。。。</li>');
				},
				success:function(data){
					$('#word').show();
					$('.wordlist').empty();
					if (data.s==''){
						$('.wordlist').append('<li>未找到与 "' + keywords + '"相关的结果</li>');
					}
					$.each(data.s, function(){
						$('.wordlist').append('<li>'+ this +'</li>');
					});
				},
				error:function(){
					$('#word').show();
					$('.wordlist').empty();
					$('#word').append('<li>查找"' + keywords + '"失败</li>');
				}
			});
		});
		//点击搜索数据复制给搜索框
		$(document).on('click','.wordlist li',function(){
			var word = $(this).text();
			$('#wd').val(word);
			$('#word').hide();
			$('.submit').trigger('click');触发搜索事件
		})		
		//失去焦点时隐藏	
		var clear = function(){ $('#word').hide();}
		$("input").blur(function(){			    
			 setTimeout(clear,500); 		
		});
	},
	'Other': {
		'Topbg': function(high){				
			$(".myui-topbg").css({"height":high});
			$("#header-top").addClass("color");
			$(window).scroll(function(){
				if($(window).scrollTop()>10){
					$("#header-top").removeClass("color");
				}else if($(window).scrollTop()<110){
					$("#header-top").addClass("color");
				}
			});
		}	
	}
};
$(function(){Myui.Autocomplete();Myui.Score();});
function diggVideo(id,div){var hadzan = MyTheme.Cookie.Get('digg_score'+id)||'';if (hadzan=='ok') {layer.msg('每天只能赞一次，好气哦o(╥﹏╥)o');}else{MyTheme.Ajax("/include/ajax.php?id="+id+"&action=digg&r="+new Date().getTime(),'get','text','',function (obj){var returnValue=Number(obj);if (!isNaN(returnValue)){MyTheme.Cookie.Set('digg_score'+id,'ok',1);$("#"+div).html(returnValue);layer.msg("赞的人家心里乐开了花(*^__^*)")}else if(obj=="err"){layer.msg("好气哦！赞美失败o(╥﹏╥)o")}else if(obj=="havescore"){layer.msg("每天只能赞一次，好气哦o(╥﹏╥)o")}else{layer.msg("系统开小差，请重试o(╥﹏╥)o")}});}}
function treadVideo(id,div){var hadcha = MyTheme.Cookie.Get('tread_score'+id)||'';if (hadcha=='ok') {layer.msg('每天只能踩一次哦，还踩o(╥﹏╥)o');}else{MyTheme.Ajax("/include/ajax.php?id="+id+"&action=tread&r="+new Date().getTime(),'get','text','',function (obj){var returnValue=Number(obj);if(!isNaN(returnValue)){MyTheme.Cookie.Set('tread_score'+id,'ok',1);$("#"+div).html(returnValue);layer.msg("人家哪里不好看了o(╥﹏╥)o")}else if(obj=="err"){layer.msg("成功躲过一次伤害(*^▽^*)",{anim:5,time: 2000});}else if(obj=="havescore"){layer.msg("每天只能踩一次哦，还踩o(╥﹏╥)o")}else{layer.msg("系统开小差，请重试o(╥﹏╥)o")}});}}
function getVideoHit(vid){MyTheme.Ajax("/include/ajax.php?action=hit&id="+vid,'get','text','',function (obj){if(obj=="err"){$("#hit").html('发生错误')}else{$("#hit").html(obj)}});}
function reportErr2(id,name,bfz,djj){openWin("/err.php?id="+id+"&name="+ encodeURI(name)+"&bfz="+ encodeURI(bfz)+"&djj="+djj,480,350,0)}
function zidongqiupian(key){openWin("/qiupian.php?key="+encodeURI(key),480,350,0)}
function openWin(url,w,h,resize){var iTop = (window.screen.height-30-h)/2;var iLeft = (window.screen.width-10-w)/2;window.open(url,'New_Win','toolbars=0, scrollbars=0, location=0, statusbars=0,menubars=0, resizable='+(resize)+',width='+w+',height='+h+',left='+iLeft+',top='+iTop)}
function goget(){var goget=location.href;if(goget.indexOf("?") != -1){var isor='?';}else if(goget.indexOf("#") != -1){var isor='#';}else{var isor='?';}var endurl=goget.split(isor);window.location.href=endurl[0]+'?s='+Math.round(new Date().getTime()/1000).toString();return false;}
function viewComment(id,page){var url;if (page.length==0){url=id;}else{url="/comment.php?id="+id+"&page="+page;}MyTheme.Ajax(url,'get','text','',function(obj) {if (obj=="err"){$("#comment_list").html("<font color='red'>发生错误</font>");}else{$("#comment_list").html(obj);}});}
function word(wd){var wd=(wd.replace(/\s+/g, "") == "")?"+":wd;window.location.href = "/so/"+wd;return false;}