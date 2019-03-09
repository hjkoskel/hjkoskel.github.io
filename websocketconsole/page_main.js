var PageMain=`
<div>
  This is MQTT web console single page application. Application is based on mqttws31.js library. This appliction allows to connect multiple mqtt websocket enabled brokers
  <br/>

  <br/>
  Whole application runs on local browser without backend. Passwords and connection settings are stored only browser local storage for convient usage.
  <br/>
  <br/>
  There are now {{Object.keys(connections).length}} connections
  <br/>
  <br/>
  {{#if 0<Object.keys(connections).length}}
    If computer account is shared by multiple users, clear local storage before leaving browser
    <a class="button is-light" on-click="['clearLocalStorage']"> Clear {{Object.keys(connections).length}} connections</a>
  {{/if}}
</div>
`;
