var PageIPFS=`
<div>
  Interplanetary file system setup.

  Whole IPFS on browser is still in experimental phase. Use with caution.
  <form class="form-horizontal" >
    <fieldset>
      <div class="field">
        <label class="label">IPFS activation</label>
        {{#if ipfsStatus.enabled}}
          {{JSON.stringify(ipfsStatus)}}
          <br/>
          <a class="button" on-click="['shutdownIPFS']">Shutdown IPFS</a>
        {{else}}
          <a class="button" on-click="['connectIPFS']">Connect IPFS</a>
        {{/if}}
      </div>
    </fieldset>
  </form>


</div>
`;

function updateIpfsRepoStat(){
  if (ipfsNode){
    ipfsNode.repo.stat({},function(err,stats){
      if (err) {
        ractive.set("ipfsError","IPFS REPO ERROR: "+err)
        return
      }
      let sta=ractive.get("ipfsStatus")
      sta.repoStats=stats
      ractive.set("ipfsStatus",sta)
    })
  }
}

function updateIpfsPeersList(){
  if (ipfsNode){
    ipfsNode.swarm.peers(function (err, addrs) {
      if (err) {
        ractive.set("ipfsError","IPFS PEERS ERROR: "+err)
        return
      }
      let lst=[]
      for(let a of addrs){
        lst.push(a.addr.toString())
      }
      let sta=ractive.get("ipfsStatus")
      sta.peers=lst
      ractive.set("ipfsStatus",sta)
    })
  }
}

function addDataToIpfs(data,fDone){
  let buf=ipfsNode.types.Buffer.from(data);
  ipfsNode.add(buf,{},function (err, res){
    if (err!=undefined){
      ractive.set("textAddResult","ERROR: "+JSON.stringify(err))
    }else{
      //ractive.set("textAddResult",JSON.stringify(res))
      console.log("Add result "+JSON.stringify(res))
      //Assuming only one file added
      if (res.length!=1){
        console.log("TODO ERRROR???")
        return
      }
      oneHash=res[0].hash
      console.log("fdone returns with "+oneHash)
      fDone(oneHash)
    }
  })
}
