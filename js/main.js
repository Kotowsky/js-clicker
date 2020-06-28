
var pointsTotal = 0;
var pointsPerSecond = 0;

var pointsPerClick = 1;

var mainInterval = null;
var framerate = 30;

var upgrades = [ 
{ id: "upgrade-1", name: "upgrade-1", cost: 10, value: 0.1, quantity: 0 }, 
{ id: "upgrade-2", name: "upgrade-2", cost: 100, value: 1, quantity: 0 } ];

window.onload = init;

function init()
{
	document.getElementById( 'clicker' ).onclick = click;
	
	displayUpgrades();
	displayPoints();
	
	mainInterval = setInterval( mainLoop, 1000 / framerate );
}

function click()
{
	pointsTotal += pointsPerClick;
	displayPoints();
}

function displayPoints()
{
	let points = document.getElementById( 'points-total-display' );
	let pps = document.getElementById( 'points-per-second-display' );
	
	points.innerHTML = Math.round( pointsTotal );
	pps.innerHTML = Math.round( pointsPerSecond * 10 ) / 10;
}

function displayUpgrades()
{
	for( let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++ )
	{
		let upgrade = document.getElementById( 'upgrade-' + upgradeIndex );
	
		upgrade.querySelector('.upgrade-name').innerHTML = upgrades[ upgradeIndex ].name;
		upgrade.querySelector('.upgrade-cost').innerHTML = upgrades[ upgradeIndex ].cost;
	}
}

function purchaseUpgrade( upgradeIndex, quantity )
{
	upgrades[ upgradeIndex ].quantity += quantity;
	pointsPerSecond += upgrades[ upgradeIndex ].value;
}

function mainLoop()
{
	pointsTotal += pointsPerSecond / framerate;
	displayPoints();
}