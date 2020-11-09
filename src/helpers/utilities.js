export function formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDateTime(d) {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

// Convert Building Details to a set of name value pairs
// Used in display and reporting
export function generalNameValuePairs(listing){

    var nameValuePairs = [];
    var nameValuePair = {};

    if (listing.propertyType){
        nameValuePair = {
            label: "Property Type",
            value: listing.propertyType,
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.totalBuildingSize){
        nameValuePair = {
            label: "Building Size",
            value: listing.totalBuildingSize.toString(),
            unit: "sq ft"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.lotSize){
        nameValuePair = {
            label: "Lot Size",
            value: listing.lotSize,
            units: "acres"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.taxes){
        nameValuePair = {
            label: "Taxes",
            prefix: "$",
            value: listing.taxes,
            unit: "per yr"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.parking){
        nameValuePair = {
            label: "Parking",
            value: listing.parking.toString(),
            unit: "spaces(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.floors){
        nameValuePair = {
            label: "Floors",
            value: listing.floors.toString(),
            unit: "floor(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.totalNumberOfUnits){
        nameValuePair = {
            label: "Units",
            value: listing.totalNumberOfUnits.toString(),
            unit: "unit(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.buildingClass){
        nameValuePair = {
            label: "Building Class",
            value: listing.buildingClass
        };
         nameValuePairs.push(nameValuePair);
    }
    if (listing.ceilingHeight){
        nameValuePair = {
            label: "Ceiling Height",
            value: listing.ceilingHeight,
            unit: "ft"
        };
         nameValuePairs.push(nameValuePair);
    }
    if (listing.driveInDoors){
        nameValuePair = {
            label: "Drive in Doors",
            value: listing.driveInDoors.toString(),
            unit: "door(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.loadingDocks){
        nameValuePair = {
            label: "Loading Docks", 
            value: listing.loadingDocks.toString(),
            unit: "dock(s)"
        };
         nameValuePairs.push(nameValuePair);
    }
    if (listing.yearBuilt){
        nameValuePair = {
            label: "Year Built",
            value: listing.yearBuilt.toString()
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.zone){
        nameValuePair = {
            label: "Zone",
            value: listing.zone
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.totalAvailableSpace){
        nameValuePair = {
            label: "Total Space",
            value: listing.totalAvailableSpace,
            unit: "sq ft"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.nets){
        nameValuePair = {
            label: "Nets",
            prefix: "$",
            value: listing.nets,
            unit: "per month"
        };
        nameValuePairs.push(nameValuePair);
    }
    return nameValuePairs;
}
