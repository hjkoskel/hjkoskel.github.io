/*
Functions for logging geolocation.

Saves position with timestamp. And updates lates timestamp on that spot
TODO: convert to rust
*/


/*
Logs when moved out from stationary position
Logs while moving

Uses two thresholds in meters

- Smaller threshold What is allowed radius from point for declaring that as "static"
- Time for recording point as static.  Important to not move when doing averaged measurement
- Meter threshold for logging next point when moving (Showing path)

At first... as constants
*/

const STATICLOCATIONTHRESHOLD_METER=5.5
const STATICLOCATIONTHRESHOLD_TIME=60000
const MOVEMENTTHRESHOLD_METER=25
const STATICLOCATIONTYPE="static"


function gpsDistance(lat1,lon1,lat2,lon2){
  let R = 6371e3; // metres

  var a = Math.sin(((lat2-lat1)*(Math.PI/180.0))/2) * Math.sin((lat2-lat1)*(Math.PI/180.0)/2) +
        Math.cos(lat1*(Math.PI/180.0)) * Math.cos(lat2*(Math.PI/180.0)) *
        Math.sin(((lon2-lon1)*(Math.PI/180.0))/2) * Math.sin(((lon2-lon1)*(Math.PI/180.0))/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

function updateGeolocationsLog(locations,coords,tNow){
  if (locations==undefined){
    return [{"t0":tNow,"lat":coords.latitude,"lon":coords.longitude,"alt":coords.altitude,"type":""}]
  }
  let last=locations[locations.length-1]
  let dist=gpsDistance(last.lat,last.lon,coords.latitude,coords.longitude);
  console.log("Distance from previous is "+dist)

  //we are static (inside small area), and still are static
  if (dist<STATICLOCATIONTHRESHOLD_METER){
    last.t1=tNow
    if (STATICLOCATIONTHRESHOLD_TIME<(tNow-last.t0)){
      last.type=STATICLOCATIONTYPE  //Declare as static point for measurements
    }
    locations[locations.length-1]=last
    return locations
  }


  //Moving away from static or fast from moving point  OR Moved but not enough and stayed in between static threshold radius and logging radius
  if ((last.type==STATICLOCATIONTYPE)||(MOVEMENTTHRESHOLD_METER<dist)||(STATICLOCATIONTHRESHOLD_TIME<(tNow-last.t0))) {
    locations.push({"t0":tNow,"lat":coords.latitude,"lon":coords.longitude,"alt":coords.altitude,"type":""})
    return locations //Need fresh point for movement
  }
  return locations //NOP
}
