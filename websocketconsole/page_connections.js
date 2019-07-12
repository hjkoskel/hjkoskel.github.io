var PageConnections=`
<div>

  <table class="table">
  <thead>
    <tr>
    <th>Connection</th>
    <th>Online</th>
    <th>Hostname</th>
    <th>Port</th>
    <th>Use SSL</th>
    <th>Username</th>
    <th>Autoconnect</th>
    <th>CONNECT</th>
    <th>DELETE</th>

    </tr>
  </thead>
  <tbody>
    {{#connections:conName}}
      <tr>
        <th>{{conName}}</th>
        <th>
          {{#if connectionStatus[conName].connected}}
            Connected
          {{else}}
            Not connected, {{connectionStatus[conName].error}}
          {{/if}}
        </th>
        <th>{{connection.hostname}}</th>
        <th>{{connection.port}}</th>
        <th>{{connection.useSSL}}</th>
        <th>{{connection.username}}</th>

        <th><input type="checkbox" checked="{{connection.autoconnect}}" on-click="{{connectionsEdited}}"/></th>

        <th>
          {{#if connectionStatus[conName].connected}}
            <a class="button is-danger" on-click="['disconnectConnection',conName]"> disconnect </a>
          {{else}}
            <a class="button is-primary" on-click="['connectConnection',conName]"> connect </a>
          {{/if}}
        </th>

        {{#if connectionStatus[conName].connected}}
          <th> </th>
        {{else}}
          <th> <a class="button is-danger" on-click="['deleteConnection',conName]"> delete </a></th>
        {{/if}}


      </tr>
    {{/connections}}
  </tbody>
  </table>

  ADD new connection

  <form class="form-horizontal" >
  <fieldset>
    <div class="field">
      <label class="label">Connection name</label>
      <div class="control">
        <input class="input" type="text" placeholder="connection name" value={{newConn.name}}>
      </div>
      <p class="help">unique name</p>
    </div>


    <div class="field">
      <label class="label">Hostname</label>
      <div class="control">
        <input class="input" type="text" placeholder="hostname" value={{newConn.hostname}}>
      </div>
      <p class="help">Ip address or hostname</p>
    </div>

    <div class="field">
      <label class="label">Websocket Port</label>
      <div class="control"> <input class="input" type="number" placeholder="port" value={{newConn.port}}>
      </div>
      <p class="help">Websocket (not SSL) port typical is 9001</p>
    </div>

    <div class="field">
      <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" placeholder="username" value={{newConn.username}}>
        </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="password" value={{newConn.password}}>
      </div>
    </div>

    <div class="field">
      <label class="label">Use SSL (TLS)</label>
      <div class="control">
        <input type="checkbox" checked="{{newConn.useSSL}}"/>
      </div>
    </div>

    <div class="field">
      <label class="label">Automatic connection</label>
      <div class="control">
        <input type="checkbox" checked="{{newConn.autoconnect}}"/>
      </div>
    </div>


    <div class="field is-grouped">
      <p class="control">
        <a class="button is-primary" on-click="['addNewConnection']"> Add </a>
      </p>
      <p class="control">
        <a class="button is-light" on-click="['clearNewConnection']"> Clear </a>
      </p>
    </div>


  </fieldset>
  </form>

  <p class="control">
    <label class="label">New connection as qrcode</label>
    <a class="button is-primary" on-click="['getQRcode']"> getQRcode </a>
  </p>
  <a href="{{newSettingsQRuri}}">Qrcode uri link</a>
  <img src="{{newSettingsQRuri}}" width="50%" height="50%"/>


</div>
`;
