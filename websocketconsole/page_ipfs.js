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
