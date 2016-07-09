/**
 * 
 */
var value;
var column;
var row;

function getChartsId(m) {

	var gecube=option();
	/*alert(gecube);*/	
	var ger = getrows();
	/*alert(ger);*/
	var gec = getcolumns();
	/*alert(gec);*/
	var geo=getorder();
	/*alert(geo);	*/
	var get=gettop();
	/*alert(get);*/
	var geom = getorderMeasures();
	/*alert(geom);*/

	var column1 = encodeURI(encodeURI(gec, "UTF-8"), "UTF-8");
	// alert(url('#a11'));
	var row1 = encodeURI(encodeURI(ger,
			"UTF-8"), "UTF-8");
	var order = geo;
	var orderMeasures = encodeURI(encodeURI(geom, "UTF-8"), "UTF-8");
	var top = get;
	var cube = encodeURI(encodeURI(gecube, "UTF-8"), "UTF-8");
	alert("start query ...(*^__^*) 嘻嘻……");
	getValue(column1, row1, order, orderMeasures, top, cube);
	selectChange(m);

}

function selectChange(select) {
	switch (select) {
	case 1:
		lineChange();
		break;
	case 2:
		areaChange();
		break;
	case 3:
		columnChange();
		break;
	case 4:
		column1Change();
		break;
	case 5:
		barChange();
		break;
	case 6:
		scatterChange();
		break;
	case 7:
		splineChange();
		break;
	default:
		lineChange();
	}
}

function getValue(column1, row1, order, orderMeasures, top, cube) {
	$.ajax({
		type : "get",
		url : "http://localhost:8080/mondrian/query.do?cube=" + cube
				+ "&column=" + column1 + "&row=" + row1 + "&order=" + order
				+ "&orderMeasures=" + orderMeasures + "&top=" + top,
		dataType : "json",
		async : false,
		scriptCharset : 'UTF-8',
		success : function(date) {

			value = date.value;
			column = date.column;
			row = date.row;
			if (row.length != 0) {
				for (var i = 0; i < row.length; i++) {
					row[i] = decodeURI(row[i]);
				}
			}
			if (column.length != 0) {
				for (var i = 0; i < column.length; i++) {
					column[i] = decodeURI(column[i]);
				}
			}
			console.log(value);
			console.log(column);
			console.log(row);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

			console.log(XMLHttpRequest.status);
			console.log(XMLHttpRequest.readyState);
			console.log(textStatus);
		}
	});
}

function lineChange() {

	$('#container').highcharts({

		chart : {
			type : 'line'
		},
		title : {
			text : '专利数据展示',
			x : -20
		},
		subtitle : {
			text : '',
			x : -20
		},
		xAxis : {
			categories : row
		},
		yAxis : {
			title : {
				text : '个'
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			valueSuffix : '个'
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'middle',
			borderWidth : 0
		},
		series : function() {
			var serie = [];
			// var c=column.split(",");
			if (value.length != 0) {
				for (var i = 0; i < value.length; i++) {
					var item = {
						name : column[i],
						data : value[i]
					};
					serie.push(item);
				}
				;
			}
			return serie;
		}()

	});
}

function areaChange() {

	$('#container').highcharts({
		chart : {
			type : 'areaspline'
		},
		title : {
			text : '专利数据展示',
			x : -20
		},

		legend : {
			layout : 'vertical',
			align : 'left',
			verticalAlign : 'top',
			x : 150,
			y : 100,
			floating : true,
			borderWidth : 1,
			backgroundColor : '#FFFFFF'
		},
		xAxis : {
			categories : row,
			plotBands : [ { // visualize the weekend
				from : 4.5,
				to : 6.5,
				color : 'rgba(68, 170, 213, .2)'
			} ]
		},
		yAxis : {
			title : {
				text : '个'
			}
		},
		tooltip : {
			shared : true,
			valueSuffix : ' units'
		},
		credits : {
			enabled : false
		},
		plotOptions : {
			areaspline : {
				fillOpacity : 0.5
			}
		},
		series : function() {
			var serie = [];
			if (value.length != 0) {
				for (var i = 0; i < value.length; i++) {
					var item = {
						name : decodeURI(column[i]),
						data : value[i]
					};
					serie.push(item);
				}
				;
			}
			return serie;
		}()
	});
}

function columnChange() {
	$('#container')
			.highcharts(
					{
						chart : {
							type : 'column'
						},
						title : {
							text : '专利数据展示',
							x : -20
						},
						xAxis : {
							categories : row
						},
						yAxis : {
							min : 0,
							title : {
								text : '数量'
							}
						},
						tooltip : {
							headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
									+ '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
							footerFormat : '</table>',
							shared : true,
							useHTML : true
						},
						plotOptions : {
							column : {
								pointPadding : 0.2,
								borderWidth : 0
							}
						},
						series : function() {
							var serie = [];
							if (value.length != 0) {
								for (var i = 0; i < value.length; i++) {
									var item = {
										name : column[i],
										data : value[i]
									};
									serie.push(item);
								}
								;
							}
							return serie;
						}()
					});
}

function column1Change() {
	$('#container')
			.highcharts(
					{
						chart : {
							type : 'column'
						},
						title : {
							text : '专利数据展示',
							x : -20
						},
						xAxis : {
							categories : row
						},
						yAxis : {
							min : 0,
							title : {
								text : '个'
							},
							stackLabels : {
								enabled : true,
								style : {
									fontWeight : 'bold',
									color : (Highcharts.theme && Highcharts.theme.textColor)
											|| 'gray'
								}
							}
						},
						legend : {
							align : 'right',
							x : -70,
							verticalAlign : 'top',
							y : 20,
							floating : true,
							backgroundColor : (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid)
									|| 'white',
							borderColor : '#ffffff',
							borderWidth : 1,
							shadow : false
						},
						tooltip : {
							formatter : function() {
								return '<b>' + this.x + '</b><br/>'
										+ this.series.name + ': ' + this.y
										+ '<br/>' + 'Total: '
										+ this.point.stackTotal;
							}
						},
						plotOptions : {
							column : {
								stacking : 'normal',
								dataLabels : {
									enabled : true,
									color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
											|| 'white'
								}
							}
						},
						series : function() {
							var serie = [];
							if (value.length != 0) {
								for (var i = 0; i < value.length; i++) {
									var item = {
										name : column[i],
										data : value[i]
									};
									serie.push(item);
								}
								;
							}
							return serie;
						}()
					});
}

function barChange() {
	$('#container').highcharts({
		chart : {
			type : 'bar'
		},
		title : {
			text : '专利数据展示',
			x : -20
		},
		xAxis : {
			categories : row,
			title : {
				text : null
			}
		},
		yAxis : {
			min : 0,
			title : {
				text : '个',
				align : 'high'
			},
			labels : {
				overflow : 'justify'
			}
		},
		tooltip : {
			valueSuffix : ' millions'
		},
		plotOptions : {
			bar : {
				dataLabels : {
					enabled : true
				}
			}
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'top',
			x : -40,
			y : 100,
			floating : true,
			borderWidth : 1,
			backgroundColor : '#FFFFFF',
			shadow : true
		},
		credits : {
			enabled : false
		},
		series : function() {
			var serie = [];
			if (value.length != 0) {
				for (var i = 0; i < value.length; i++) {
					var item = {
						name : column[i],
						data : value[i]
					};
					serie.push(item);
				}
				;
			}
			return serie;
		}()
	});
}

function scatterChange() {
	$('#container').highcharts({
		chart : {
			type : 'scatter',
			zoomType : 'xy'
		},
		title : {
			text : '专利数据展示',
			x : -20
		},

		xAxis : {
			categories : row,
			title : {
				enabled : true,
			},
			startOnTick : true,
			endOnTick : true,
			showLastLabel : true
		},
		yAxis : {
			title : {
				text : '个'
			}
		},
		legend : {
			layout : 'vertical',
			align : 'left',
			verticalAlign : 'top',
			x : 100,
			y : 70,
			floating : true,
			backgroundColor : '#FFFFFF',
			borderWidth : 1
		},
		plotOptions : {
			scatter : {
				marker : {
					radius : 5,
					states : {
						hover : {
							enabled : true,
							lineColor : 'rgb(100,100,100)'
						}
					}
				},
				states : {
					hover : {
						marker : {
							enabled : false
						}
					}
				},
				tooltip : {
					headerFormat : '<b>{series.name}</b><br>',
					pointFormat : '{point.x} cm, {point.y} kg'
				}
			}
		},
		series : function() {
			var serie = [];
			if (value.length != 0) {
				for (var i = 0; i < value.length; i++) {
					var item = {
						name : column[i],
						data : value[i]
					};
					serie.push(item);
				}
				;
			}
			return serie;
		}()
	});
}

function splineChange() {
	$('#container').highcharts({
		chart : {
			type : 'spline',
			inverted : true
		},
		title : {
			text : '专利数据展示',
			x : -20
		},
		xAxis : {
			reversed : false,
			title : {
				enabled : true,
				text : ''
			},
			categories : row,
			maxPadding : 0.05,
			showLastLabel : true
		},
		yAxis : {
			title : {
				text : '个'
			},

			lineWidth : 2
		},
		legend : {
			enabled : false
		},
		tooltip : {
			headerFormat : '<b>{series.name}</b><br/>',
			pointFormat : '{point.x} : {point.y}'
		},
		plotOptions : {
			spline : {
				marker : {
					enable : false
				}
			}
		},
		series : function() {
			var serie = [];
			if (value.length != 0) {
				for (var i = 0; i < value.length; i++) {
					var item = {
						name : decodeURI(column[i]),
						data : value[i]
					};
					serie.push(item);
				}
				;
			}
			return serie;
		}()
	});
}

var flg = 0;
function ShowAndHide(e, m) {
	var content = document.getElementById("container");
	if (flg == 0) {
		content.className = "show";
		getChartsId(m);
		flg = 1;
	} else {
		content.className = "hidden";
		alert("隐藏");
		flg = 0;
	}
}

function menuAct(mid) {
	var stat;
	stat = document.getElementById("menu" + mid).style.display;
	if (stat == "none")
		document.getElementById("menu" + mid).style.display = 'block';
	else
		document.getElementById("menu" + mid).style.display = 'none';
	return;
}