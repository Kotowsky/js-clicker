
var pointsTotal = 0;
var pointsPerSecond = 0;

var pointsPerClick = 1;

window.onload = init;

function init()
{
	document.getElementById( 'clicker' ).onclick = click;
	
	displayInfo();
}

function click()
{
	pointsTotal += pointsPerClick;
	displayInfo();
}

function displayInfo()
{
	let points = document.getElementById( 'points-total-display' );
	let pps = document.getElementById( 'points-per-second-display' );
	
	points.innerHTML = pointsTotal;
	pps.innerHTML = pointsPerSecond;
}