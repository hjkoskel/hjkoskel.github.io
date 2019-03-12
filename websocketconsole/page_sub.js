var PageSub=`
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
      <label class="label">New topic</label>
      <div class="control">
        <input class="input" type="text" placeholder="mqtt topic" value={{newTopic}}>
      </div>
      <p class="help">MQTT standard topic string, wildcards supported</p>
    </div>

    <div class="field">
      <div class="select">
        <select value={{newSubQOS}}>
          <option value="0">QOS=0, Fire and forget</option>
          <option value="1">QOS=1, at least once</option>
          <option value="2">QOS=2, exactly once</option>
        </select>
      </div>
      <p class="help">QOS=quality of service</p>
    </div>

    <div class="has-text-danger">
      {{subscriptionErrorMessage}}
    </div>

    <p class="control">
      <a class="button is-primary" on-click="['addSubscription',selectedConnection,newTopic,parseInt(newSubQOS)]"> Subscribe {{newTopic}} </a>
    </p>
  </fieldset>
  </form>

  <table class="table">
    <thead>
      <tr> <th>Topic</th> <th>Max messages</th> <th>Automatic download</th> </tr>
    </thead>
    <tbody>
      {{#connections[selectedConnection].topics:topicname}}
        <tr>
          <td> {{topicname}} </td>
          <td> <input class="input" type="number" min="1" placeholder="maximum number of messages" value={{maxMessages}} on-change="['connectionsEdited']" /> </td>
          <td> <input class="input" type="number" min="0" max={{maxMessages}} placeholder="message count in automatic download" value={{fileBundleSize}}  on-change="['connectionsEdited']"/>  </td>
          <td> <a class="button is-danger" on-click="['unsubscribe',selectedConnection,topicname]"> unsubscribe </a> </td>
        </tr>
      {{/connections}}
    </tbody>
  </table>
  Bundle=0 is off,1= load all files separately, more than 1 load unload files into one zip
</div>
`;
