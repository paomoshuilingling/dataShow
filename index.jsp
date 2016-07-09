<!DOCTYPE html>
<html lang="zh">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>Qing's Web</title>
<script src="js/jquery-2.1.3.min.js" type="text/javascript"></script>
<style type="text/css">
 .moveBar {
	position: absolute;
	width: 250px;
	height: 300px;
	background: #666;
	border: solid 1px #000;
} 

#banner {
position: absolute;
	background: #52CCCC;
	cursor: move;
}
</style>
</head>
<body style="padding-top: 50px;">

	<div id="banner1" class="moveBar">
		<div id="banner">按住此处移动当前div</div>
	</div>

	<script>
		jQuery(document).ready(function() {
			$('#banner1').mousedown(function(event) {
				var isMove = true;
				var abs_x = event.pageX - $('div.moveBar').offset().left;
				var abs_y = event.pageY - $('div.moveBar').offset().top;
				$(document).mousemove(function(event) {
					if (isMove) {
						var obj = $('div.moveBar');
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
	</script>
</body>
</html>
