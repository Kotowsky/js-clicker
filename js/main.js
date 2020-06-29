
var pointsTotal = 0;
var pointsPerSecond = 0;

var pointsPerClick = 1;

var mainInterval = null;
var framerate = 30;

var upgrades = [ 
{ id: "upgrade-1", name: "upgrade-1", cost: 10, value: 0.1, quantity: 0 }, 
{ id: "upgrade-2", name: "upgrade-2", cost: 100, value: 1, quantity: 0 },
{ id: "upgrade-3", name: "upgrade-3", cost: 200, value: 5, quantity: 0 }, 
{ id: "upgrade-4", name: "upgrade-4", cost: 500, value: 10, quantity: 0 },
{ id: "upgrade-5", name: "upgrade-5", cost: 1000, value: 10, quantity: 0 },
];

var randomClicker = { baseValue: 5, baseDelay: 120000, delay: 180000 };

window.onload = init;

function init()
{
	document.getElementById( 'main-clicker' ).onclick = click;
	
	displayUpgrades();
	displayPoints();
	
	mainInterval = setInterval( mainLoop, 1000 / framerate );
	
	setRandomClickerTimeout();
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
		upgrade.querySelector('.upgrade-quantity').innerHTML = upgrades[ upgradeIndex ].quantity;
	}
}

function purchaseUpgrade( upgradeIndex, quantity )
{ 
	if( pointsTotal >= upgrades[ upgradeIndex ].cost )
	{
		upgrades[ upgradeIndex ].quantity += quantity;
		pointsPerSecond += upgrades[ upgradeIndex ].value;
		
		pointsTotal -= upgrades[ upgradeIndex ].cost;
		upgrades[ upgradeIndex ].cost = Math.round( upgrades[ upgradeIndex ].cost * 1.25 );	
		
    }
		
	
}

function mainLoop()
{
	pointsTotal += pointsPerSecond / framerate;
	
	displayPoints();
	displayUpgrades();
}

function randomClickerOnClick()
{
	pointsTotal += randomClicker.baseValue;
	randomClicker.baseValue = Math.round( randomClicker.baseValue * 1.5 );
	
	hideRandomClicker();
	setRandomClickerTimeout();
}

function setRandomClickerTimeout()
{
	let delay = Math.round( randomClicker.baseDelay + Math.random() * randomClicker.delay );
	
	let posX = Math.round( 10 + Math.random() * 80 );
	let posY = Math.round( 10 + Math.random() * 80 );
	
	let randomClickerElement = document.getElementById( 'random-clicker' );
	randomClickerElement.style.left = posX + '%';
	randomClickerElement.style.top = posY + '%';

	
	setTimeout( showRandomClicker, delay );
	
}

function showRandomClicker()
{
	let randomClickerElement = document.getElementById( 'random-clicker' );
	randomClickerElement.style.display = 'block';
}

function hideRandomClicker()
{
	let randomClickerElement = document.getElementById( 'random-clicker' );
	randomClickerElement.style.display = 'none';
}
