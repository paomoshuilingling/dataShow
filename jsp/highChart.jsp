<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.lang.String.*"%>
<!DOCTYPE HTML >
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta charset="utf-8">
<title>专利数据展示</title>
<!-- <script type="text/javascript" src="js/jquery-2.1.3.js"></script>
<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="js/charts.js"></script>
<script type="text/javascript" src="js/highChart.js"></script>
<script type="text/javascript" src="js/show.js"></script>
<script type="text/javascript" src="js/skies.js"></script> -->

</head>

<body>
	<div id="container" style="min-width:800px;height:400px"></div>
	

</body>
</html>