var c;
var r;
var tableList;

$(function() {
	// t();
});

function ShowAndHide1(e) {

	var content = document.getElementById("div1");
	if (flg == 0) {
		content.className = "show";
		t();
		flg = 1;
	} else {

		content.className = "hidden";
		alert("隐藏表格");
		flg = 0;
	}
}

function t() {

	var getcube = option();
	/* alert(getcube); */
	var getr = getrows();
	/* alert(getr); */
	var getc = getcolumns();
	/* alert(getc); */
	var geto = getorder();
	/* alert(geto); */
	var gett = gettop();
	/* alert(gett); */
	var getom = getorderMeasures();
	/* alert(getom); */
	var column1 = encodeURI(encodeURI(getc, "UTF-8"), "UTF-8");
	var row1 = encodeURI(encodeURI(getr, "UTF-8"), "UTF-8");
	var order = geto;
	var orderMeasures = encodeURI(encodeURI(getom, "UTF-8"), "UTF-8");
	var top = gett;
	var cube = encodeURI(encodeURI(getcube, "UTF-8"), "UTF-8");
	alert("start query ...(*^__^*) 嘻嘻……");
	$.ajax({
		type : "get",
		url : "http://localhost:8080/mondrian/table.do?cube=" + cube
				+ "&column=" + column1 + "&row=" + row1 + "&order=" + order
				+ "&orderMeasures=" + orderMeasures + "&top=" + top,
		dataType : "json",
		async : false,
		scriptCharset : 'UTF-8',
		success : function(date) {

			tableList = date.tableList;
			r = date.r;
			c = date.c;
			console.log(r);
			console.log(c);
			console.log(tableList);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

			console.log(XMLHttpRequest.status);
			console.log(XMLHttpRequest.readyState);
			console.log(textStatus);
		}
	});
	CreateTable();
}

function CreateTable() {
	document.getElementById('div1').innerHTML = '';
	var tablehtml = "<table class=\"table\" border=\"1\"><tbody> ";

	for (var i = 0; i <= r; i++) {

		tablehtml = tablehtml + "<tr>";

		for (var j = 0; j <= c; j++) {

			tablehtml = tablehtml + "<td>";
			tablehtml = tablehtml + decodeURI(tableList[i][j]);
			tablehtml = tablehtml + "</td>";
		}
		tablehtml = tablehtml + "</tr>";
		console.log(tablehtml);
	}
	tablehtml = tablehtml + "</tbody></table>";

	$("#div1").append(tablehtml);
}