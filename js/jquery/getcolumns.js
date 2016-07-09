/**
 * 
 */
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
	}
}