var gameTitle = "JS-Clicker";

var pointsTotal = 1000000;
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
{ id: "upgrade-5", name: "upgrade-6", cost: 5000, value: 50, quantity: 0 },
];

var achievements = [ 

[
{ id: "achievement-0", name: "achievement-1",  requirementType: "points-total", requirementValue: 250, rewardType: "points-per-click", rewardValue: 1, cost: 100, purchased: false, available: false }, 
{ id: "achievement-1", name: "achievement-2",  requirementType: "points-total", requirementValue: 500, rewardType: "points-per-click", rewardValue: 2, cost: 200, purchased: false, available: false },
{ id: "achievement-2", name: "achievement-3",  requirementType: "points-total", requirementValue: 5000, rewardType: "points-per-click", rewardValue: 5, cost: 500, purchased: false, available: false }, 
{ id: "achievement-3", name: "achievement-4",  requirementType: "points-total", requirementValue: 10000, rewardType: "points-per-click", rewardValue: 10, cost: 1000, purchased: false, available: false },
{ id: "achievement-4", name: "achievement-5",  requirementType: "points-total", requirementValue: 20000, rewardType: "points-per-click", rewardValue: 20, cost: 2500, purchased: false, available: false },
],

[
{ id: "achievement-5", name: "achievement-6",  requirementType: "upgrade-quantity", requirementValue: 10, rewardType: "upgrade-value-multiplier", upgradeIndex: 0, rewardValue: 2, cost: 100, purchased: false, available: false }, 
{ id: "achievement-6", name: "achievement-7",  requirementType: "upgrade-quantity", requirementValue: 10, rewardType: "upgrade-value-multiplier", upgradeIndex: 1, rewardValue: 2, cost: 200, purchased: false, available: false },
{ id: "achievement-7", name: "achievement-8",  requirementType: "upgrade-quantity", requirementValue: 10, rewardType: "upgrade-value-multiplier", upgradeIndex: 2, rewardValue: 1.5, cost: 500, purchased: false, available: false }, 
{ id: "achievement-8", name: "achievement-9",  requirementType: "upgrade-quantity", requirementValue: 10, rewardType: "upgrade-value-multiplier", upgradeIndex: 3, rewardValue: 1.5, cost: 10000, purchased: false, available: false },
{ id: "achievement-9", name: "achievement-10",  requirementType: "upgrade-quantity", requirementValue: 10, rewardType: "upgrade-value-multiplier", upgradeIndex: 4, rewardValue: 1.5, cost: 25000, purchased: false, available: false },
{ id: "achievement-10", name: "achievement-11",  requirementType: "upgrade-quantity", requirementValue: 10, rewardType: "upgrade-value-multiplier", upgradeIndex: 5, rewardValue: 1.5, cost: 50000, purchased: false, available: false },
],

[
{ id: "achievement-11", name: "achievement-12",  requirementType: "points-per-second", requirementValue: 1, rewardType: "points-total", rewardValue: 100, cost: 0, purchased: false, available: false }, 
{ id: "achievement-12", name: "achievement-13",  requirementType: "points-per-second", requirementValue: 10, rewardType: "points-total", rewardValue: 500, cost: 0, purchased: false, available: false },
{ id: "achievement-13", name: "achievement-14",  requirementType: "points-per-second", requirementValue: 20, rewardType: "points-total", rewardValue: 1000, cost: 0, purchased: false, available: false }, 
{ id: "achievement-14", name: "achievement-15",  requirementType: "points-per-second", requirementValue: 50, rewardType: "points-total", rewardValue: 2000, cost: 0, purchased: false, available: false },
{ id: "achievement-15", name: "achievement-16",  requirementType: "points-per-second", requirementValue: 100, rewardType: "points-total", rewardValue: 5000, cost: 0, purchased: false, available: false },
{ id: "achievement-16", name: "achievement-17",  requirementType: "points-per-second", requirementValue: 200, rewardType: "points-total", rewardValue: 10000, cost: 0, purchased: false, available: false },
],

];

var randomClicker = { baseValue: 5, baseDelay: 120000, delay: 180000 };

window.onload = init;


function init()
{
	//loadLocalStorage();
	
	createUpgrades();
	createAchievements();
	
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

function createUpgrades()
{
	for( let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++ )
	{
		let upgradeContainer = document.getElementById( 'upgrade-container-0' );
		
		let upgrade = createUpgrade( upgradeIndex );
		upgradeContainer.appendChild( upgrade );
	}
}

function createUpgrade( upgradeIndex )
{
	let upgrade = document.createElement( 'div' );
	upgrade.setAttribute( 'id', 'upgrade-' + upgradeIndex );
	upgrade.setAttribute( 'class', 'upgrade');
	
	let upgradeInfo = document.createElement( 'div' );
	upgradeInfo.setAttribute( 'class', 'upgrade-info' );
	
	let upgradeName = document.createElement( 'p' );
	upgradeName.setAttribute( 'class', 'upgrade-name' );
	
	let upgradeCost = document.createElement( 'p' );
	upgradeCost.setAttribute( 'class', 'upgrade-cost' );
	
	upgradeInfo.appendChild( upgradeName );
	upgradeInfo.appendChild( upgradeCost );
	
	let upgradeRight = document.createElement( 'div' );
	upgradeRight.setAttribute( 'class', 'upgrade-right' );
	
	let upgradePurchaseButon = document.createElement( 'div' );
	upgradePurchaseButon.setAttribute( 'class', 'purchase-button' );
	upgradePurchaseButon.innerHTML = 'buy';
	
	let upgradeQuantity = document.createElement( 'div' );
	upgradeQuantity.setAttribute( 'class', 'upgrade-quantity' );
	
	upgradeRight.appendChild( upgradePurchaseButon );
	upgradeRight.appendChild( upgradeQuantity );
	
	upgrade.appendChild( upgradeInfo );
	upgrade.appendChild( upgradeRight );
	
	upgrade.addEventListener( 'click', function() { purchaseUpgrade( upgradeIndex, 1 ) }, false );
	
	return upgrade;
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

function displayAchievements()
{
	for( let achievementRowIndex = 0; achievementRowIndex < achievements.length; achievementRowIndex++ )
	{
		for( let achievementIndex = 0; achievementIndex < achievements[ achievementRowIndex ].length; achievementIndex++ )
		{
			let achievementElement = document.getElementById( achievements[ achievementRowIndex ][ achievementIndex ].id );
			
			if( pointsTotal >= achievements[ achievementRowIndex ][ achievementIndex ].cost && !achievements[ achievementRowIndex ][ achievementIndex ].purchased )
			{
				achievementElement.style.display = 'flex';
				achievements[ achievementRowIndex ][ achievementIndex ].available = true;
			}
			
			if( achievements[ achievementRowIndex ][ achievementIndex ].available = true && checkAchievementRequirements( achievementRowIndex, achievementIndex ) )
			{
				achievementElement.style.opacity = 1;
			}
			else 
			{
				achievementElement.style.opacity = 0.5;
			}
		}
	}
}

function createAchievements()
{  
	let achievementContainer = document.getElementById( 'achievement-container' );
	
	for( let achievementRowIndex = 0; achievementRowIndex < achievements.length; achievementRowIndex++ )
	{
		let achievementRow = createAchievementRow( achievementRowIndex );
		achievementContainer.appendChild( achievementRow );
	}
}

function createAchievementRow( achievementRowIndex )
{
	let achievementRow = document.createElement( 'div' );
	achievementRow.setAttribute( 'id', 'achievement-row-'+ achievementRowIndex );
	achievementRow.setAttribute( 'class', 'achievement-row' );
	
	for( let achievementIndex = 0; achievementIndex < achievements[ achievementRowIndex ].length; achievementIndex++ )
	{
		let achievement = createAchievement( achievementRowIndex, achievementIndex );
		achievementRow.appendChild( achievement );
	}
	
	return achievementRow;
}

function createAchievement( achievementRowIndex, achievementIndex )
{
	let achievement = document.createElement( 'div' );
	achievement.setAttribute( 'id', achievements[ achievementRowIndex ][ achievementIndex ].id );
	achievement.setAttribute( 'class', 'achievement' );
	
	let achievementHidden = document.createElement( 'div' );
	achievementHidden.setAttribute( 'class', 'achievement-hidden centered-vertically' );
	
	let achievementName = document.createElement( 'p' );
	achievementName.setAttribute( 'class', 'achievement-name' );
	achievementName.innerHTML = achievements[ achievementRowIndex ][ achievementIndex ].name;
	
	let achievementCost = document.createElement( 'p' );
	achievementCost.setAttribute( 'class', 'achievement-cost' );
	achievementCost.innerHTML = achievements[ achievementRowIndex ][ achievementIndex ].cost;
	
	achievementHidden.appendChild( achievementName );
	achievementHidden.appendChild( achievementCost );
	
	achievement.appendChild( achievementHidden );
	
	achievement.addEventListener( 'click', function() { purchaseAchievement( achievementRowIndex, achievementIndex ) }, false );
	
	return achievement;
}

function purchaseAchievement( achievementRowIndex, achievementIndex )
{ 
	if( checkAchievementRequirements( achievementRowIndex, achievementIndex ) )
	{
		getAchievementReward( achievementRowIndex, achievementIndex );
		achievements[ achievementRowIndex ][ achievementIndex ].purchased = true;
		
		let achievementElement = document.getElementById( achievements[ achievementRowIndex ][ achievementIndex ].id );
		achievementElement.style.display = 'none';
		
		if( achievementRowIndex == 0 )
		{
			changeMainClickerTier( achievementIndex + 1 );
		}
    }
}

function checkAchievementRequirements( achievementRowIndex, achievementIndex )
{
	switch( achievements[ achievementRowIndex ][ achievementIndex ].requirementType )
	{
		case "points-total":
				return pointsTotal >= achievements[ achievementRowIndex ][ achievementIndex ].requirementValue;
			break;
			
		case "points-per-second":
				return pointsPerSecond >= achievements[ achievementRowIndex ][ achievementIndex ].requirementValue;
			break;
			
		case "points-per-click":
				return pointsPerClick >= achievements[ achievementRowIndex ][ achievementIndex ].requirementValue;
			break;
			
		case "upgrade-quantity":
				let upgradeIndex = achievements[ achievementRowIndex ][achievementIndex].upgradeIndex;
				return upgrades[ upgradeIndex ].quantity >= achievements[ achievementRowIndex ][achievementIndex].requirementValue;
			break;	
			
		default:
				console.log( 'not working' );
			break;
	}
}

function getAchievementReward( achievementRowIndex, achievementIndex )
{
	switch( achievements[ achievementRowIndex ][ achievementIndex ].rewardType )
	{
		case "points-total":
				pointsTotal += achievements[ achievementRowIndex ][achievementIndex].rewardValue;
			break;
			
		case "points-per-second":
				pointsPerSecond += achievements[ achievementRowIndex ][achievementIndex].rewardValue;
			break;
			
		case "points-per-click":
				pointsPerClick += achievements[ achievementRowIndex ][achievementIndex].rewardValue;
			break;
			
		case "upgrade-value-multiplier":
				let upgradeIndex = achievements[ achievementRowIndex ][achievementIndex].upgradeIndex;
				upgrades[ upgradeIndex ].value *= achievements[ achievementRowIndex ][achievementIndex].rewardValue;
				
				calculatePointsPerSecond();
			break;
			
		default:
			console.log( 'not working' );
			break;
	}
}


function changeMainClickerTier( clickerTier )
{
	let mainClicker = document.getElementById( 'main-clicker' );
	mainClicker.className = 'clicker centered-horizontally centered-vertically tier-' + clickerTier;
}

function calculatePointsPerSecond()
{
	let resultValue = 0;
	
	for( let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++ )
	{
		resultValue += upgrades[ upgradeIndex ].quantity * upgrades[ upgradeIndex ].value;
	}
	
	pointsPerSecond = resultValue;
}

function mainLoop()
{
	pointsTotal += pointsPerSecond / framerate;
	
	displayPoints();
	displayUpgrades();
	displayAchievements();
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

