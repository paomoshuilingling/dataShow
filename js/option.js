function option() {
	document.getElementById('default').style.display = 'none';
	document.getElementById('inventor analysis').style.display = 'none';
	document.getElementById('patent analysis').style.display = 'none';
	document.getElementById('专利和发明').style.display = 'none';
	var value = document.getElementById('select').value;
	document.getElementById(value).style.display = 'block';
	return value;
}

function allowDrop(ev)
{
ev.preventDefault();
}

function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
ev.target.appendChild(document.getElementById(data));
}