/**
 * 
 */
function getrows(){
	/* 获取行中的维度 */
	var vr = "";
	var ar = document.getElementById('rows').getElementsByTagName("a");
	var j = 0;
	if(ar.length!=0){
	for (j = 0; j < ar.length - 1; j++) {
		vr += ar[j].getAttribute('value') + ",";
	}
	alert("j:"+j);
	var fr = ar[j].getAttribute('value');
	vr = vr + fr;
	return vr;
	}
}
