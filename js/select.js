var rowlist;
var rowvalue;
var rowid;
/*
 * 
 */
$(function() {

	$("#window").hide(); // 先让div隐藏
	$(".level").click(function(e) {
		rowid = $(this).attr('id');
		rowvalue = $(this).attr('value');
		$("#window").fadeIn("slow");// 淡入淡出效果 显示div
		change(rowid, rowvalue);
	});

	$("#close").click(function() {

		$("#window").fadeOut("slow");// 淡入淡出效果 隐藏div

	});
	$(document).ready(function() {
		$('#window').mousedown(function(event) {
			var isMove = true;
			var abs_x = event.pageX - $('div.window').offset().left;
			var abs_y = event.pageY - $('div.window').offset().top;
			$(document).mousemove(function(event) {
				if (isMove) {
					var obj = $('div.window');
					obj.css({
						'left' : event.pageX - abs_x,
						'top' : event.pageY - abs_y
					});
				}
			}).mouseup(function() {
				isMove = false;
			});
		});
	});
});

function change(id, rowvalue) {
	/* 维度值 */
	/* var rid = document.getElementById('a' + id); */
	/*
	 * if (rowvalue != null) alert(rowvalue);
	 */
	if (rowvalue == null)
		alert("null");
	var row = encodeURI(encodeURI(rowvalue, "UTF-8"), "UTF-8");
	/* 数据库 */
	var c = option();
	var cube = encodeURI(encodeURI(c, "UTF-8"), "UTF-8");
	$.ajax({
		type : "get",
		url : "http://localhost:8080/mondrian/parameter.do?cube=" + cube
				+ "&row=" + row,
		dataType : "json",
		async : false,
		scriptCharset : 'UTF-8',
		success : function(date) {

			rowlist = date.row;
			for (var i = 0; i < rowlist.length; i++) {
				rowlist[i] = decodeURI(rowlist[i]);
			}
			console.log(rowlist);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

			console.log(XMLHttpRequest.status);
			console.log(XMLHttpRequest.readyState);
			console.log(textStatus);
		}
	});
	CreateList();
}
function CreateList() {
	document.getElementById('ul').innerHTML = '';
	var list = "";
	if (rowlist.length != 0) {
		for (var i = 0; i < rowlist.length; i++) {

			list = list
					+ "<li style=\"cursor:pointer;color:#3399FF;margin-left:20px;padding:5px 0 0 0\" id='"
					+ rowlist[i] + "' onclick=\"getMeasure(id)\">";
			list = list + rowlist[i];
			list = list + "</li>";
		}
	}

	$("#ul").append(list);
}
/*function patch(re, s) {// 参数1正则式，参数2字串
	re = re=eval("/"+re);
	// 不区分大小写，如须则去掉i,改为 re=eval("/"+re+"/g")
	alert(re);
	return s.match(re).length;
}*/

function getMeasure(id) {
	var m;
	var v;
	if (id != null) {
		m = rowvalue + ".[" + id + "]";
	}
	else
		m = rowvalue;
	document.getElementById(rowid).innerText=id;
	document.getElementById(rowid).setAttribute('value', m);
	document.getElementById(rowid).setAttribute('class', "m");

}

function getrows() {
	/* 获取行中的维度 */
	var vr = "";
	var ar = document.getElementById('rows').getElementsByTagName("a");
	var j = 0;
	if (ar.length != 0) {
		for (j = 0; j < ar.length - 1; j++) {
			vr += ar[j].getAttribute('value') + ",";
		}
		var fr = ar[j].getAttribute('value');
		vr = vr + fr;
		return vr;
	}else{
		alert("维度为空");
	}
}

function getcolumns() {
	/* 获取列中的度量 */
	var fc = "";
	var vc = "";
	var i = 0;
	var ac = document.getElementById('columns').getElementsByTagName("a");
	if (ac.length != 0) {
		for (i = 0; i < ac.length - 1; i++) {
			vc += ac[i].getAttribute('value') + ",";
		}
		var fc = ac[i].getAttribute('value');
		vc = vc + fc;
		return vc;
	}else{
		alert("度量为空");
	}
}

function getorder() {
	var vo = document.getElementById('order').value;
	return vo;
}
function getorderMeasures() {
	var vm = document.getElementById('orderMeasures').value;
	return vm;
}
function gettop() {
	var vt = document.getElementById('top').value;
	return vt;
}