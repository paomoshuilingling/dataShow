var r=0;
/*
 * $(function() { change(); });
 */
$(function() {
	setTimeout("CreateList(r)", 10000);
	alert("0");
	CreateList(r);
});
function CreateList(r) {
	alert("0");
	var list = "<ul id=\"ul\" display=\"none\"><li>a</li>";
	if (r.length != 0) {
		for (var i = 0; i < r.length; i++) {

			list = list + "<li>";
			list = list + r[i];
			list = list + "</li>";
			console.log(list);
		}
	}
	list = list + "</ul>";

	$("#list").append(list);
	/* setTimeout("open()",1000); */
	/* open('window'); */
}
/*
 * function open(o) { var o = document.getElementById(o); o.style.display =
 * 'block'; alert("1"); } function close(o) { var o =
 * document.getElementById(o); o.style.display = 'none'; window.location = url; }
 */