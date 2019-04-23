// Global Variables
var tables = ["TripsPerDay", "VehiclesPerDay", "TripsWithoutDropOff", "MinutesPerTrip", "TripsFromMadison"];

function refreshDashboard(delay)
{
    setInterval(refresh, delay);
}

function refresh()
{
    cleanTables();
    updateTables();
}

function cleanTables()
{
    // Clean all tables to update it
    for (let i=0; i<tables.length; i++ )
    {
        table = document.getElementById(tables[i]);
        for(let j = table.rows.length - 1; j > 1; j--)
        {
        table.deleteRow(j);
        }
    }
}

function updateTables()
{
    updateTripsPerDay();
    updateVehiclesPerDay();
    updateTripsDropOff();
    updateMinutesPerTrip();
    updateTripsFromMadison();
}

function updateTripsPerDay()
{
    // Choose TripsPerDay table
    let table = document.getElementById("TripsPerDay");

    for (let element in dayTrips)
    {
        let entry = table.insertRow(-1);
        entry.insertCell(0).innerHTML = element;
        entry.insertCell(1).innerHTML = dayTrips[element];
        
        console.log("TripsPerDay" + "," + element+","+dayTrips[element]+"\n");
    }
}

function updateVehiclesPerDay()
{
    // Choose TripsPerDay table
    let table = document.getElementById("VehiclesPerDay");

    for (let element in dayAvgVehicles)
    {
        let entry = table.insertRow(-1);
        entry.insertCell(0).innerHTML = element;
        entry.insertCell(1).innerHTML = dayAvgVehicles[element];
        
        console.log("VehiclesPerDay"+","+element+","+dayAvgVehicles[element]+"\n");

    }
    
}

function updateTripsDropOff()
{
    // Choose TripsPerDay table
    let table = document.getElementById("TripsWithoutDropOff");
    let i = 0;
    let entry = table.insertRow(-1);
    
    for (let element in tripsDropOff)
    {
        entry.insertCell(i).innerHTML = tripsDropOff[element];
        i++;
        console.log("TripsWithoutDropOff"+","+tripsDropOff[element]+"\n");

    }

}

function updateMinutesPerTrip()
{
    // Choose TripsPerDay table
    let table = document.getElementById("MinutesPerTrip");
    let i = 0;

    // Data buffer array
    buffer = ["MinutesPerTrip"];

    let entry = table.insertRow(-1);
    for (let element in tripsTypesMinutes)
    {
        entry.insertCell(i).innerHTML = tripsTypesMinutes[element];
        i++;
        console.log("MinutesPerTrip"+","+tripsTypesMinutes[element]+"\n");

    }
}

function updateTripsFromMadison()
{
    // Choose TripsPerDay table
    let table = document.getElementById("TripsFromMadison");

    // Data buffer array
    buffer = ["TripsFromMadison"];

    for (let element in tripsMadison)
    {

        let entry = table.insertRow(-1);
        // Insert Day
        entry.insertCell(0).innerHTML = element;
        // Type Yellow
        entry.insertCell(1).innerHTML = tripsMadison[element]["yellow"];
        // Type Green
        entry.insertCell(2).innerHTML = tripsMadison[element]["green"];
        // Type Fhv
        entry.insertCell(3).innerHTML = tripsMadison[element]["fhv"];

        console.log("TripsFromMadison"+","+element+tripsMadison[element]["yellow"]+tripsMadison[element]["green"]+tripsMadison[element]["fhv"]+"\n");

    }

}