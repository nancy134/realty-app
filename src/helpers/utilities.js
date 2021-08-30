import { publishTypes } from '../constants/publishTypes';

export function getPublishType(listing){
    if (listing.publishStatus === "Draft" && listing.listing.latestApprovedId){
        return publishTypes.DRAFT_WITH_LIVE;
    }
    if (listing.publishStatus === "On Market" && listing.listing.latestDraftId){
        return publishTypes.LIVE_WITH_DRAFT;
    }
    if (listing.publishStatus === "Draft" && !listing.listing.latestApprovedId){
        return publishTypes.ONLY_DRAFT;
    }
    if (listing.publishStatus === "On Market" && !listing.listing.latestDraftId){
        return publishTypes.ONLY_LIVE;
    }
}

function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

function addNameValuePair(label, value, prefix, unit, nameValuePairs){
    var nameValuePair = {
        label: label,
        value: value,
        prefix: prefix,
        unit: unit
    }
    nameValuePairs.push(nameValuePair);
}
export function amenitiesToRowCol(amenities){
    console.log(amenities);
    var rows = [];
    console.log("amenities.length: "+amenities.length);
    for (var i=0; i<amenities.length; i += 2){
        console.log("i: "+i);
        var cols = {};
        if (i+1 === amenities.length){
            cols = {
                col1: amenities[i], 
                col2: null
            };
        } else {
            cols = {
                col1: amenities[i], 
                col2: amenities[i+1]
            };
        }
        rows.push(cols);
    }
    return rows;
}
// Convert Space details to a set of name value pairs
export function spaceNameValuePairs(space){
    var nameValuePairs = [];

    if (space.type){
        addNameValuePair("Lease Type", space.type, null, null, nameValuePairs);
    }
    if (space.driveInDoors){
        addNameValuePair("Drive in Doors", space.driveInDoors, null, "door(s)", nameValuePairs);
    }
    if (space.floors){
        addNameValuePair("Floors", space.floors, null, "floor(s)", nameValuePairs);
    }
    if (space.divisible){
        addNameValuePair("Divisible?", space.divisible, null, null, nameValuePairs);
    }
    if (space.loadingDocks){
        addNameValuePair("Loading Docks", space.loadingDocks, null, "dock(s)", nameValuePairs);
    }
    if (space.leaseTerm){
        addNameValuePair("Lease Term", space.leaseTerm, null, null, nameValuePairs);
    }
    if (space.ceilingHeight){
        addNameValuePair("Ceiling Height", space.ceilingHeight, null, "ft", nameValuePairs);
    }
    if (space.availableDate){
        var availableDate = formatDate(space.availableDate);
        addNameValuePair("Available Date", availableDate, null, null, nameValuePairs);
    }
    if (space.nets){
        addNameValuePair("Nets", space.nets, "$", null, nameValuePairs);
    }
    if (space.class){
        addNameValuePair("Class", space.class, null, null, nameValuePairs);
    } 
    return nameValuePairs;
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



export function abbrState(input, to){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
    var i = 0;
    if (to === 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] === input){
                return(states[i][1]);
            }
        }    
    } else if (to === 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] === input){
                return(states[i][0]);
            }
        }    
    }
}

/////////////////////////////////
// Size and Price
/////////////////////////////////

function getMinSize(array){
    return array.reduce((min, p) => p.size < min ? p.size : min, array[0].size);
}
function getMaxSize(array){
    return array.reduce((max, p) => p.size > max ? p.size : max, array[0].size);
}

function calculatePrice(price,size, priceUnit){
    var calculatedPrice;
    if (priceUnit ===  "/sf/yr"){
        calculatedPrice = price;
    }else if (priceUnit === "/sf/mo"){
        calculatedPrice = price*12;
    }else if (priceUnit === "/mo"){
        calculatedPrice = (price/size)*12;
    }else if (priceUnit === "yr"){
        calculatedPrice = price/size;
    }else{
        calculatedPrice = price;
    }
    return calculatedPrice;
}

function getMinPriceIndex(array){
    var length = array.length;
    var minIndex = 0;
    var minPrice = calculatePrice(
        array[0].price,
        array[0].size,
        array[0].priceUnit); 
    for (var i=1; i<length; i++){
       var calculatedPrice = calculatePrice(
           array[i].price,
           array[i].size,
           array[i].priceUnit
       );
       if (calculatedPrice < minPrice) minIndex = i; 
    }
    return minIndex;
}

function getMaxPriceIndex(array){
    var length = array.length;
    var maxIndex = 0;
    var maxPrice = calculatePrice(
        array[0].price,
        array[0].size,
        array[0].priceUnit);
    for (var i=1; i<length; i++){
       var calculatedPrice = calculatePrice(
           array[i].price,
           array[i].size,
           array[i].priceUnit
       );
       if (calculatedPrice > maxPrice) maxIndex = i;
    }
    return maxIndex;
}

export function formatSizeAndPrice(spaces){
    var size = null;
    var price = null;
    if (spaces.length === 1){
        size = numberWithCommas(spaces[0].size);

        var priceUnit = spaces[0].priceUnit;
        if (!priceUnit) priceUnit = "/sf/yr";

        if (spaces[0].price){
            price = numberWithCommas(spaces[0].price) + " " + priceUnit;
        }

        size += " sf for lease";        
    } else if (spaces.length > 1){
        var minSize = numberWithCommas(getMinSize(spaces));
        var maxSize = numberWithCommas(getMaxSize(spaces));
        if (minSize === maxSize){
            size = minSize;
        } else {
            size = minSize+" - "+maxSize;
        }

        var minPriceIndex = getMinPriceIndex(spaces);
        var maxPriceIndex = getMaxPriceIndex(spaces);
        if (spaces[minPriceIndex].price !== null){
            if (minPriceIndex === maxPriceIndex){
                var minPrice =  numberWithCommas(spaces[minPriceIndex].price);
                priceUnit = spaces[minPriceIndex].priceUnit ?  spaces[minPriceIndex].priceUnit : "/sf/yr";
                if (minPrice){
                    price = minPrice + " " + priceUnit;
                }
            } else {
       
                minPrice = numberWithCommas(spaces[minPriceIndex].price);
                console.log("minPrice: "+minPrice);
                var maxPrice = numberWithCommas(spaces[maxPriceIndex].price);
                var minPriceUnit = spaces[minPriceIndex].priceUnit;
                var maxPriceUnit = spaces[maxPriceIndex].priceUnit;

                if (minPriceUnit === null) minPriceUnit = "/sf/yr";
                if (maxPriceUnit === null) maxPriceUnit = "/sf/yr";

                if (minPriceUnit === maxPriceUnit){
                    price = minPrice + " - " + maxPrice + " " + minPriceUnit;
                } else {
                    price = minPrice + " " + minPriceUnit + " - " +
                        maxPrice + " " + maxPriceUnit;
                }
            }
        }
        size += " sf (" + spaces.length + " spaces)";
    } else {
        return null;
    }
    if (price){
        price = "$"+price;
    }

    var ret = {
        size: size,
        price: price
    }
    return ret;
}
