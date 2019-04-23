// Global Variables
const refreshDelay = 2500;
var trips = 0;
var dayTrips = {};
var dayVehicles = {};
var dayAvgVehicles = {};
var tripsDropOff = {'yellow' : 0, 'green' : 0, 'fhv' : 0};
var tripsTypesMinutes = {'yellow' : 0, 'green' : 0, 'fhv' : 0};
var tripsMadison = {};




$(document).ready(function(){

    // Create WebSocket object
    const socket = new WebSocket('ws://localhost:9000/ws');

    // Connection opened
    socket.addEventListener('open', function (event) {
        // Refresh the dashboard every 2.5 seconds
        refreshDashboard(refreshDelay);
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        trips++;
        var data_dict = JSON.parse(event.data);
        updateDashboard(data_dict);
    });
});


function updateDashboard(data)
{   
    dataPreprocessing(data);
    tripsPerDay(data);
    vehiclesPerDay(data);
    tripsWithoutDropOff(data);
    minutesPerTripByType(data);
    tripsFromMadison(data);
}

function dataPreprocessing(data)
{
    // Looping to extract useful information from messy data
    for(var key in data)
    {   
        // Remove the single and double quotes inside the values of keys
        data[key] = data[key].replace(/[''']/g, "").replace(/["""]/g, "");
    }   
}

function tripsPerDay(data)
{
    let day = data.pickupDateTime.substring(0, 10);
    // If that day already exists before
    if (day in dayTrips)
    {
        dayTrips[day]++;
    }
    else
    {
        dayTrips[day] = 1;
    }
}

function vehiclesPerDay(data)
{
    // Extract the pick up day from the data
    let day = data.pickupDateTime.substring(0, 10);
    // If that day already exists before
    if (day in dayVehicles)    
    {
        dayVehicles[day].add(data.vendorId);
        dayAvgVehicles[day] = dayVehicles[day].size;
    }
    else
    {
        dayVehicles[day] = new Set([data.vendorId]);
        dayAvgVehicles[day] = 1;
    }
}

function tripsWithoutDropOff(data)
{
    if(data.dropOffLocationId === "")
    {
        let type = typeChecker(data);
        tripsDropOff[type]++;
    }   
}

function minutesPerTripByType(data)
{
    let begin = new Date(data.pickupDateTime);
    let end = new Date(data.dropOffDatetime);
    let diff = (end - begin);
    let time = Math.floor((diff/1000)/60);
    let type = typeChecker(data);
    tripsTypesMinutes[type] += time;
}

function tripsFromMadison(data)
{
    // Check for Madison, Brooklyb Location ID : 149
    if(data.pickupLocationId === "149")
    {
        // Extract the pick up day from the data
        let day = data.pickupDateTime.substring(0, 10);
        if(day in tripsMadison)
        {   
            let type = typeChecker(data);
            tripsMadison[day][type]++;
        }
        else
        {
            tripsMadison[day] = {'yellow' : 0, 'fhv' : 0, 'green' : 0};
        }
    }

}

function typeChecker(data)
{
    let type;
    // For Not found taxiType
    if(data.taxiType === undefined)
    { 
        type = data.type;
    }
    else
    {
        type = data.taxiType;
    }
    return type;
}