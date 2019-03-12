var PagePub=`
<div>
<div class="tabs">
  <ul>
      {{#connections:name}}
        {{#if name==selectedConnection}}
          <li class="is-active"><a>{{name}}</a></li>
        {{else}}
          <li><a on-click="['changeSelectedConnection',name]">{{name}}</a></li>
        {{/if}}
      {{/connections}}
  </ul>
</div>

<form class="form-horizontal" >
<fieldset>
  <div class="field">
    <label class="label">Topic</label>
    <div class="control">
      <input class="input" type="text" placeholder="mqtt topic" value={{newPubTopic}}>
    </div>
    <p class="help">MQTT standard topic string, wildcards supported</p>
  </div>

  <div class="field">
    <div class="select">
      <select value={{newPubQOS}}>
        <option value="0">QOS=0, Fire and forget</option>
        <option value="1">QOS=1, at least once</option>
        <option value="2">QOS=2, exactly once</option>
      </select>
    </div>
    <p class="help">QOS=quality of service</p>
  </div>
  <label class="checkbox">
    <input type="checkbox" checked={{newPubRetain}}>
    Retain
  </label>

  <div class="field">
    <div class="select">
      <select value={{newPubPayloadFormat}}>
        <option value="raw">Raw text</option>
        <option value="json">JSON</option>
        <option value="messagePack">Message Pack</option>
        <option value="file">file upload</option>
        {{#if 0<deviceInfos.videoinput.length}}
          <option value="cameraShot">camera shot</option>
        {{/if}}
      </select>
    </div>
    <p class="help">Payload format</p>
  </div>

  {{#if newPubPayloadFormat=="file"}}
    <input type='file' value='{{pubFileList}}'/>
  {{else}}
    {{#if newPubPayloadFormat=="cameraShot"}}
      {{#if activeCamera}}
        <a class="button is-danger" on-click="['stopCamera']">Stop Camera</a>
      {{else}}
        <div class="select">
          <select value="{{selectedVideoDeviceId}}">
            {{#deviceInfos.videoinput:n}}
              <option value="{{deviceId}}">{{label}} ({{n}})</option>
            {{/deviceInfos.videoinput}}
          </select>
        </div>
        <a class="button is-primary" on-click="['startCamera']">Start Camera</a>
      {{/if}}
      {{#if activeCamera}}
        <input type="range" min="0" max="1" step="0.01" value="{{shotQuality}}"/> Quality:{{shotQuality}}<br/>
        {{#if 0<newPubTopic.length}}
          <p class="control">
            <a class="button is-primary" on-click="['takeShot',false,newPubPayloadFormat,selectedConnection,newPubTopic,newPubPayload,parseInt(newPubQOS),newPubRetain,pubFileList]"> Take shot to {{newPubTopic}} on {{selectedConnection}} </a>
          </p>
          {{#if ipfsStatus.enabled}}
            <a class="button is-primary" on-click="['takeShot',true,newPubPayloadFormat,selectedConnection,newPubTopic,newPubPayload,parseInt(newPubQOS),newPubRetain,pubFileList]"> Take shot IPFS hash to {{newPubTopic}} on {{selectedConnection}} </a>
          {{/if}}
        {{/if}}
      {{/if}}
      <br/>
      <video autoplay></video>
      <canvas></canvas>
    {{else}}
      <div class="field">
        <label class="label">Payload</label>
        <div class="control">
          <textarea class="textarea" value={{newPubPayload}}></textarea>
        </div>
      </div>
    {{/if}}
  {{/if}}

  <div class="has-text-danger">
    {{publishErrorMessage}}
  </div>

  {{#if newPubPayloadFormat!="cameraShot"}}
    {{#if 0<newPubTopic.length}}
      <p class="control">
        <a class="button is-primary" on-click="['publishMessage',false,newPubPayloadFormat,selectedConnection,newPubTopic,newPubPayload,parseInt(newPubQOS),newPubRetain,pubFileList]"> Publish to {{newPubTopic}} on {{selectedConnection}} </a>
      </p>
      {{#if ipfsStatus.enabled}}
        <a class="button is-primary" on-click="['publishMessage',true,newPubPayloadFormat,selectedConnection,newPubTopic,newPubPayload,parseInt(newPubQOS),newPubRetain,pubFileList]"> Publish IPFS hash to {{newPubTopic}} on {{selectedConnection}} </a>
      {{/if}}
      <a class="button" on-click="['getLatLon']">Get my LAT LON to payload</a>
    {{/if}}
  {{/if}}
  </fieldset>

</form>


</div>
`;
