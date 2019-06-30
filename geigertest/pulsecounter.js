/*
pulsecounter.js
This is used for calculating pulse statuses.

Going to convert this to rust. But prototype at first with this
*/

// each ADC burst takes (pulseStatus.adcSampleCount/pulseStatus.fs) = 0.37s  SO   60sec is  162
var maxpulsescountstored=200;  //Allow to do actual CPM  from latest minute

const MAXPULSETIMESTAMPS=100; //Limit memory usage, how many pulse timestamps are stored. Used on low radiation. Activity under 2.69Bq
const MAXTIMEBLOCKCOUNT=200 //Testing :D

const MAXONLINELOGENTRIES=128
const ONLINELOGACCURACY=1000*10


//Keep all statuses and cumulatives here. use counts per minute number always
var pulseStatus={
  fs:0,
  adcSampleCount:0,

  //Must be pushed... time goes in positive direction
  timestartlog:[],
  pulsecountlog:[], //One entry per adc measurement. Used for moving window CPM approximation latest first
  latestPulses:[], //add pulse timestamps here.  latestPulsesMaxCount
  cpm:{

  },
  cumulatives:{
    total:0,
    /*
    Following levels are needed (filled independently, more possible). Idea is that
      - 1 minute blocks stored with start time and total uptime
      - 1 hour blocks with start time and total uptime (average doserate does not fall)
    */
    minuteBlocks:[],
    hourBlocks:[]
  }
}


//TODO rust camel case?
function sessionStartsNow(tNow,arr){
  if(arr==undefined){
    return [[tNow,tNow]]
  }
  console.log("onlinelog on "+JSON.stringify(arr))
  arr.push([tNow,tNow])
  return arr.slice(-MAXONLINELOGENTRIES)
}

function sessionRunsNow(tNow,arr){
  arr[arr.length-1][1]=tNow
  return arr
}



//Pushes if start time is too much. Its ok to not to match wall clock hour or minute threshold :)
function newcumulativeblock(tNow,blocks,blocksize,newcounts){
  blocks.push({t:tNow,counts:newcounts})
  return blocks.slice(-MAXTIMEBLOCKCOUNT)
}

function cumulativeblockupdate(tNow,blocks,blocksize,newcounts){ //One call?
  if (blocks.length==0){
    return [{t:tNow,counts:newcounts}]
  }
  if (blocksize<(tNow-blocks[blocks.length-1].t)){
      //need new block
      return newcumulativeblock(tNow,blocks,blocksize,newcounts)
  }
  blocks[blocks.length-1].counts+=newcounts
  return blocks
}




/*
fixed samplecount and sampling rate
Error if changed (full reset required)
*/
function initializePulseCounter(fs,samplecount) {
  pulseStatus.fs=fs
  pulseStatus.adcSampleCount=samplecount
  maxpulsescountstored=Math.ceil(60/(samplecount/fs))
}



/*
index vector,
sampling rate and time when sampling started
*/
function processPulses(pulseIndexVec,timestart,avgSecondOptions){
  let tStep=1000/pulseStatus.fs

  pulseStatus.cumulatives.total+=pulseIndexVec.length

  pulseStatus.pulsecountlog.push(pulseIndexVec.length)
  pulseStatus.pulsecountlog=pulseStatus.pulsecountlog.slice(-maxpulsescountstored)
  pulseStatus.timestartlog.push(timestart) //For debugging :) How long time actually
  pulseStatus.timestartlog=pulseStatus.timestartlog.slice(-maxpulsescountstored)


  pulseStatus.logDuration=pulseStatus.adcSampleCount/pulseStatus.fs+(pulseStatus.timestartlog[pulseStatus.timestartlog.length-1]-pulseStatus.timestartlog[0])


  /*
  pulseStatus.cpm=[]
  pulseSum=0;
  for(let index=pulseStatus.pulsecountlog.length-1;0<=index;index--){
    pulseSum+=pulseStatus.pulsecountlog[index]
    avgseconds=(pulseStatus.timestartlog[pulseStatus.pulsecountlog.length-1]-pulseStatus.timestartlog[index])/1000+tStep/1000
    pulseStatus.cpm.push({"avgseconds":avgseconds,"cpm":pulseSum*60/avgseconds})
  }
  */
  //Only meaningfull averaging times (plot these, for that reason in even...)

  pulseStatus.cpm=[]
  for(let sec of avgSecondOptions){
    pulseStatus.cpm.push({"avg":sec})
  }

  //HACK pulseStatus.cpm=[{"avg":1},{"avg":5},{"avg":10},{"avg":15},{"avg":20},{"avg":25},{"avg":30},{"avg":35},{"avg":40},{"avg":45},{"avg":50},{"avg":55},{"avg":60}];

  pulseSum=0;
  for(let index=pulseStatus.pulsecountlog.length-1;0<=index;index--){//Start from latest
    pulseSum+=pulseStatus.pulsecountlog[index]
    avgseconds=(pulseStatus.timestartlog[pulseStatus.pulsecountlog.length-1]-pulseStatus.timestartlog[index])/1000+tStep/1000
    //pulseStatus.cpm.push({"avgseconds":avgseconds,"cpm":pulseSum*60/avgseconds})
    let cpm=pulseSum*60/avgseconds;
    for(let i in pulseStatus.cpm){
      if (avgseconds<pulseStatus.cpm[i].avg){
        pulseStatus.cpm[i].cpm=cpm
      }
    }
  }


  let pulseTimes=[]
  for(let index of pulseIndexVec){
    let pTime=index*tStep+timestart
    pulseTimes.push(pTime)

    pulseStatus.cumulatives.minuteBlocks=cumulativeblockupdate(pTime,pulseStatus.cumulatives.minuteBlocks,1000*60,1) //One by one
    pulseStatus.cumulatives.hourBlocks=cumulativeblockupdate(pTime,pulseStatus.cumulatives.hourBlocks,1000*60*60,1) //If hour changes... :D
  }
  //pulseStatus.latestPulses=pulseTimes.concat(pulseStatus.latestPulses).slice(0,LATESTPULSESMAXCOUNT)
  pulseStatus.latestPulses=pulseStatus.latestPulses.concat(pulseTimes)
  pulseStatus.latestPulses=pulseStatus.latestPulses.slice(-MAXPULSETIMESTAMPS)

  pulseStatus.bufTimeLen=pulseStatus.latestPulses[pulseStatus.latestPulses.length-1]-pulseStatus.latestPulses[0];


}
