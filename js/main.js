var gameTitle = "JS-Clicker";

var pointsTotal = 0;
var pointsPerSecond = 0;

var pointsPerClick = 1;

var mainInterval = null;
var framerate = 60;

var saveFrequency = 1000;

var upgrades = [ 
{ id: "upgrade-0", name: "upgrade-1", cost: 10, value: 0.1, quantity: 0 }, 
{ id: "upgrade-1", name: "upgrade-2", cost: 100, value: 1, quantity: 0 },
{ id: "upgrade-2", name: "upgrade-3", cost: 200, value: 5, quantity: 0 }, 
{ id: "upgrade-3", name: "upgrade-4", cost: 500, value: 10, quantity: 0 },
{ id: "upgrade-4", name: "upgrade-5", cost: 1000, value: 20, quantity: 0 },
];

var achievement = [ 
{ id: "achievement-0", name: "achievement-1",  value: 1 }, 
{ id: "achievement-1", name: "achievement-2",  value: 2  },
{ id: "achievement-2", name: "achievement-3",  value: 5  }, 
{ id: "achievement-3", name: "achievement-4",  value: 10  },
{ id: "achievement-4", name: "achievement-5",  value: 20  },
];

var randomClicker = { baseValue: 5, baseDelay: 120000, delay: 180000 };

window.onload = init;

function init()
{
	//loadLocalStorage();
	
	mainInterval = setInterval( mainLoop, 1000 / framerate );
	saveInterval = setInterval( saveLocalStorage, saveFrequency );
	setRandomClickerTimeout();
}

function displayPoints()
{
	let pointsElement = document.getElementById( 'points-total-display' );
	let ppsElement = document.getElementById( 'points-per-second-display' );
	
	pointsElement.innerHTML = Math.round( pointsTotal );
	ppsElement.innerHTML = Math.round( pointsPerSecond * 10 ) / 10;
	
	updateTitle();
}

function updateTitle()
{
	document.title = Math.round( pointsTotal ) + " points - " + gameTitle;
}

function displayUpgrades()
{
	for( let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++ )
	{
		let upgrade = document.getElementById( 'upgrade-' + upgradeIndex );
	
		upgrade.querySelector('.upgrade-name').innerHTML = upgrades[ upgradeIndex ].name;
		upgrade.querySelector('.upgrade-cost').innerHTML = upgrades[ upgradeIndex ].cost;
		upgrade.querySelector('.upgrade-quantity').innerHTML = upgrades[ upgradeIndex ].quantity;
		
		if( pointsTotal >= upgrades[ upgradeIndex ].cost )
		{
			showUpgrade( upgradeIndex );
		}
		else
		{
			hideUpgrade( upgradeIndex );
		}
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

function mainClickerOnClick()
{
	pointsTotal += pointsPerClick;
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

function showUpgrade( upgradeIndex )
{
	let upgradeElement = document.getElementById( 'upgrade-' + upgradeIndex );
	upgradeElement.style.opacity = 1;
}

function hideUpgrade( upgradeIndex )
{
	let upgradeElement = document.getElementById( 'upgrade-' + upgradeIndex );
	upgradeElement.style.opacity = 0.25;
}	

function saveLocalStorage()
{
	localStorage.setItem( 'pointsTotal', pointsTotal );
	localStorage.setItem( 'pointsPerSecond', pointsPerSecond );
	localStorage.setItem( 'pointsPerClick', pointsPerClick );
	
	for( let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++ )
	{
		let upgrade = upgrades[ upgradeIndex ];
		localStorage.setItem('upgrade-' + upgradeIndex, JSON.stringify( upgrade ) );
	}
	
	localStorage.setItem( 'randomClicker', JSON.stringify( randomClicker ) );
}

function loadLocalStorage()
{
	let storagePoints = localStorage.getItem( 'pointsTotal' );

	if( storagePoints !== null )
	{
		pointsTotal = parseFloat( storagePoints );
	}
	
	let storagePPS = localStorage.getItem( 'pointsPerSecond' );

	if( storagePPS !== null )
	{
		pointsPerSecond = parseFloat( storagePPS );
	}
	
	let storagePPC = localStorage.getItem( 'pointsPerClick' );

	if( storagePPC !== null )
	{
		pointsPerClick = parseFloat( storagePPC );
	}
	
	for( let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++ )
	{
		let upgradeJSON = localStorage.getItem( 'upgrade-' + upgradeIndex );
		
		if( upgradeJSON !== null )
		{
			let upgrade = JSON.parse( upgradeJSON );
			upgrades[ upgradeIndex ] = upgrade;
		}
	}
	
	let randomClickerJSON = localStorage.getItem( 'randomClicker' );

	if( randomClickerJSON !== null )
	{
		randomClicker = JSON.parse( randomClickerJSON );
	}
}

