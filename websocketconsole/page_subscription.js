var PageSubscription=`
<div>

  <a class="button is-success" on-click="['downloadAllInConnectionTopic',selectedConnection,selectedTopic]"  >
    <span class="icon is-small">
      <i class="fas fa-check"></i>
    </span>
    <span>Download all</span>
  </a>

  <a class="button is-success" on-click="['downloadNotSavedInConnectionTopic',selectedConnection,selectedTopic]"  >
    <span class="icon is-small">
      <i class="fas fa-check"></i>
    </span>
    <span>Download not saved</span>
  </a>
  <br/>
  {{#if ipfsStatus.enabled}}
  <a class="button is-link" on-click="['downloadAllIPFShashes',selectedConnection,selectedTopic]"  >
    <span class="icon is-small">
      <i class="fas fa-check"></i>
    </span>
    <span>Download all IPFS hashes</span>
  </a>
  {{/if}}
  <br/>

  {{#recieved[selectedConnection][selectedTopic]:msgIndex}}
    <span class="tag is-warning">{{format}}</span>
    {{#if format!="ipfs"}}
      <span class="tag is-warning">
      {{size}} bytes
      {{#if uncompressedSize}}
        , {{uncompressedSize}} in text
      {{/if}}
      </span>
    {{/if}}

    <article class="message {{formatByMessageFormat(format)}}">
      <div class="message-header">
        <p>{{formatDateTimeDoNotRepeatDate(time)}}  {{topic}}</p>
        <span>
          <a class="button is-link" on-click="['checkMIME',selectedConnection,selectedTopic,msgIndex]"  >
            <span>Test MIME</span>
          </a>
          {{#if format=="ipfs"}}
            {{#if !loadedIPFS}}
              <a class="button is-link" on-click="['downloadIPFS',selectedConnection,selectedTopic,msgIndex,ipfsHash]"> <span>IPFS get</span> </a>
            {{/if}}
          {{/if}}
          <a class="button is-success" on-click="['downloadSingle',selectedConnection,selectedTopic,msgIndex]"  >
            {{#if saved}}
              <span class="icon is-small"> <i class="fas fa-check"></i> </span>
            {{/if}}
            <span>Download</span>
          </a>
          <a class="button is-danger is-outlined" on-click="['deleteSingle',selectedConnection,selectedTopic,msgIndex]"  >
            <span>Delete</span>
            <span class="icon is-small"> <i class="fas fa-times"></i> </span>
          </a>
        </span>
      </div>
      <div class="message-body">
        {{#if format=="binary"}}
          <img src={{formatPicIfPossible(payload)}}/>
        {{else}}
          <pre>{{text}}</pre>
        {{/if}}
      </div>
    </article>
  {{/recieved}}

</div>
`;
