/*
MQTT wrapper
*/
function writeConnectionMessages(msg){ //TODO roll log?
  let msgList=ractive.get("connectionMessages")
  msgList.push({t:(new Date()).getTime(),message:msg})
  ractive.set("connectionMessages",msgList)
}

function onConnect() {
  ractive.set("connected",true)
  client.subscribe("koe");
  localStorage.connectionSettings=JSON.stringify(ractive.get("connectionSettings"))
  enableRetrys(true)
  writeConnectionMessages("CONNECTED")
  client.send("relayapp/simple","{}") //Just query status
  // Good... let's save working settings
}

function doFail(e){
  console.log(e);
  ractive.set("connected",false)
  writeConnectionMessages("FAIL="+e)
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
  ractive.set("connected",false)
  writeConnectionMessages("Connection lost "+JSON.stringify(responseObject))
}
// called when a message arrives
function onMessageArrived(message) {
  ractive.set("connected",true) //just in cas
  console.log("topic is "+JSON.stringify(message.destinationName))
  console.log("onMessageArrived:"+message.payloadString);

  /*
  let edited=statusIsEdited()
  ractive.set("edited",edited)
  if (!edited){
    ractive.set("statusNow",JSON.parse(message.payloadString))
  }
  ractive.set("recievedStatus",JSON.parse(message.payloadString))
  */
}

function makeMqttConnection() {
  let cs=ractive.get("connectionSettings")
  console.log("TODO login "+JSON.stringify(cs))
  client = new Paho.MQTT.Client(cs.hostname, cs.port,"sub"+ parseInt(Math.random() * 10000));
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({useSSL: cs.useSSL,	onSuccess:onConnect,	onFailure:doFail,userName: cs.username,password: cs.password});
}

function enableRetrys(enab){
  ractive.set("allowRetry",enab)
  localStorage.allowRetry=enab
}
