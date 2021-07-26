(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{116:function(e,t,n){"use strict";n.r(t);var s=n(28),i=n.n(s),a=n(68),o=n(51),r=n(6),l=n(0),c=n(143),u=n(142),h=n(146),p=n(147),d=n(119),b=n(3),v=function(e){var t=e.id,n=e.min,s=e.max,i=e.step,a=e.label,o=e.value,r=e.onChange,l=e.sublabel;return Object(b.jsxs)("div",{children:[Object(b.jsxs)(d.a,{gutterBottom:!0,children:[a," (",l,")"]}),Object(b.jsx)(p.a,{id:t,step:i,min:n,max:s,onChange:function(e,n){r(t,n)},marks:!0,value:o})]})},j=function(e){var t=Object(l.useState)({coil:e.values.coil,period:e.values.period,pulse:e.values.pulse}),n=Object(r.a)(t,2),s=n[0],i=n[1],a=function(t,n){var a={coil:s.coil,period:s.period,pulse:s.pulse};a[t]=n,i(a),e.changeEvent(a)},o=100*s.pulse/s.period,c=o<50?o:o-100,u=8,h=10,p=10,d=.01,j={coil:d*(Math.pow(2,u)-1),period:d*(Math.pow(2,h)-1),pulse:d*(Math.pow(2,p)-1)};return Object(b.jsxs)("form",{children:[Object(b.jsx)(v,{id:"period",min:0,max:j.period,step:d,label:"Faims Period ",sublabel:s.period+" \xb5s "+(1e3/s.period).toFixed(2)+"kHz",onChange:a,value:s.period}),Object(b.jsx)(v,{id:"pulse",min:0,max:Math.min(j.pulse,s.period),step:d,label:"Faims Pulse",sublabel:s.pulse+" \xb5s, "+c.toFixed(2)+"%",onChange:a,value:s.pulse}),Object(b.jsx)("br",{}),Object(b.jsx)(v,{id:"coil",min:0,max:Math.min(j.coil,s.period),step:d,label:"Coil Work",sublabel:s.coil+" \xb5s, "+(100*s.coil/s.period).toFixed(2)+"%",onChange:a,value:s.coil})]})},g=n(138),m=n(150),x=n(139),O=n(140),f=n(141),w=n(149);function M(e){var t=function(t){e.onStateChange(t.target.name,t.target.checked)};return Object(b.jsxs)(m.a,{component:"fieldset",children:[Object(b.jsx)(g.a,{component:"legend",children:"Hardware flags"}),Object(b.jsxs)(x.a,{row:!0,children:[Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.sweepOn,onChange:t,name:"sweepOn"}),label:"Sweep On"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.shutdown,onChange:t,name:"shutdown"}),label:"Shutdown"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.ionize,onChange:t,name:"ionize"}),label:"Ionize"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.pos,onChange:t,name:"pos"}),label:"Positive"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.neg,onChange:t,name:"neg"}),label:"Negative"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.pumpOn,onChange:t,name:"pumpOn"}),label:"Pump"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.sweepUp,onChange:t,name:"sweepUp"}),label:"Sweep Up"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.attention,onChange:t,name:"attention"}),label:"Attention"}),Object(b.jsx)(O.a,{control:Object(b.jsx)(w.a,{checked:e.faimsEnable,onChange:t,name:"faimsEnable"}),label:"FAIMS enable"})]}),Object(b.jsx)(f.a,{children:"Be careful"})]})}var F=n(148),C=function(e){var t=Math.pow(2,12),n=29/t,s=Object(l.useState)({step:e.values.step,stepIndexes:Math.max(1,Math.round(e.values.step/n)),repeats:e.values.repeats,sweepMin:e.values.sweepMin,sweepMax:e.values.sweepMax}),i=Object(r.a)(s,2),a=i[0],o=i[1];return Object(b.jsxs)("div",{children:[Object(b.jsxs)(d.a,{id:"lblsteps",gutterBottom:!0,children:["Step (resolution) step count= ",Math.ceil((a.sweepMax-a.sweepMin)/(a.stepIndexes*n))]}),Object(b.jsx)(F.a,{id:"inputStepsize",value:a.stepIndexes*n,margin:"dense",onChange:function(t){console.log("step changed to "+t.target.value);var s={step:t.target.value,stepIndexes:Math.max(1,Math.round(Number(t.target.value)/n)),repeats:a.repeats,sweepMin:a.sweepMin,sweepMax:a.sweepMax};o(s),e.changeEvent(s)},inputProps:{step:n,min:n,max:10,type:"number","aria-labelledby":"lblsteps"}}),Object(b.jsx)(d.a,{id:"lblrepeats",gutterBottom:!0,children:"Repeats"}),Object(b.jsx)(F.a,{id:"inputRepeats",value:a.repeats,margin:"dense",onChange:function(t){console.log("repeats changed to "+t.target.value);var n={step:a.value,stepIndexes:a.stepIndexes,repeats:Number(t.target.value),sweepMin:a.sweepMin,sweepMax:a.sweepMax};o(n),e.changeEvent(n)},inputProps:{step:1,min:0,max:t-1,type:"number","aria-labelledby":"lblrepeats"}}),Object(b.jsxs)(d.a,{gutterBottom:!0,children:["VC range (",a.sweepMin.toFixed(2)," to ",a.sweepMax.toFixed(2),")"]}),Object(b.jsx)(p.a,{id:"vcRange",step:n,min:-5,max:24,onChange:function(t,n){var s={step:a.step,stepIndexes:a.stepIndexes,repeats:a.repeats,sweepMin:Number(n[0]),sweepMax:Number(n[1])};o(s),e.changeEvent(s)},marks:[{value:-5,label:"-5V"},{value:0,label:"0V"},{value:5,label:"5V"},{value:10,label:"10V"},{value:15,label:"15V"},{value:20,label:"20V"},{value:24,label:"24V"}],value:[a.sweepMin,a.sweepMax]})]})},y=function(e){var t=e.pulse,n=e.period,s=e.coil;return Object(b.jsxs)("svg",{height:"100%",width:"100%",viewBox:"0 0 200 10",children:[function(){for(var e=[],s=0;s<6;s++)e.push(Object(b.jsx)("rect",{x:n*s,y:0,width:t,height:8,stroke:"rgb(0,255,0)",fill:"rgb(0,255,0)"},"faimsrect"+s));return e}(),function(){for(var e=[],t=0;t<6;t++)e.push(Object(b.jsx)("rect",{x:n*t,y:7,width:s,height:8,stroke:"rgb(255,0,0)",fill:"rgb(255,0,0)"},"coilrect"+t));return e}()]})},k=n(56),E=n.n(k),N=n(2),T=n(10),V=n(13),S=function(){function e(t,n,s,i,a){Object(T.a)(this,e),this.pos=t,this.compTd=n,this.hvTd=s,this.current=i,this.hw=a}return Object(V.a)(e,[{key:"interpolate",value:function(t,n){var s=new e(this.pos,this.compTd*t+(1-t)*n.compTd,this.hvTd*t+(1-t)*n.hvTd,this.current*t+(1-t)*n.current,this.hw*t+(1-t)*n.hw);return console.log("interpolation result "+JSON.stringify(s)),s}},{key:"calcCurrent",value:function(e){var t=this.hw/(2*Math.sqrt(2*Math.log(2))),n=this.current/(t*Math.sqrt(2*Math.PI))*Math.exp(-(e-this.compTd)*(e-this.compTd)/(2*t));return this.pos?n:-1*n}},{key:"evaluateXY",value:function(e,t,n){var s=this,i=(t-e)/n;return[Array.from({length:n},(function(t,n){return n*i+e})),Array.from({length:n},(function(t,n){return s.calcCurrent(n*i+e)}))]}}]),e}(),A=function(){function e(t,n){Object(T.a)(this,e),this.name=t,n.sort((function(e,t){return e.hvTd-t.hvTd})),this.negPoints=n.filter((function(e){return!1===e.pos})),this.posPoints=n.filter((function(e){return!0===e.pos}))}return Object(V.a)(e,[{key:"interpolate",value:function(e,t){var n=this.posPoints;e||(n=this.negPoints);var s=n.findIndex((function(e){return t<e.hvTd}));if(s<1)return n[0];var i=(t-n[s-1].hvTd)/(n[s].hvTd-n[s-1].hvTd);return n[s].interpolate(i,n[s-1])}}]),e}(),I=(Math.pow(10,-23),2.6867811*Math.pow(10,25));function z(e,t,n,s){return 0===s?0:e-e*n/s-t}function U(e){return function(e,t,n){return e/t/n/Math.pow(10,-21)}(e,25e-5,I)}var B=function(){function e(t,n,s,i){Object(T.a)(this,e),this.latestVcMsg=n,this.latestFlagsMsg=s,this.latestFaimsMsg=i,this.runninCounter=0,this.gasmixture=[new A("aineA",[new S(!0,0,0,10,.02),new S(!0,1.2,60,4,.02),new S(!0,3,130,1,.02),new S(!1,0,0,10,.02),new S(!1,1.2,60,4,.02),new S(!1,3,130,1,.02)]),new A("aineB",[new S(!0,0,0,10,.02),new S(!0,1.7,60,2,.02),new S(!0,6,130,.7,.02),new S(!1,0,0,10,.02),new S(!1,1.6,60,2,.02),new S(!1,6,130,1,.02)])]}return Object(V.a)(e,[{key:"runCycle",value:function(){var e=this.latestFlagsMsg.faimsEnable?3e3*this.latestFaimsMsg.coil/this.latestFaimsMsg.period:0,t=this.latestVcMsg.vcValue(this.runninCounter);if(Number.isNaN(e)||Number.isNaN(t))return NaN;var n=25*(Math.random()-.5);if((this.latestFlagsMsg.pos||this.latestFlagsMsg.neg)&&this.latestFlagsMsg.ionize&&this.latestFlagsMsg.pumpOn){var s=z(e,t,this.latestFaimsMsg.pulse,this.latestFaimsMsg.period),i=t;if(Number.isNaN(s)||Number.isNaN(i))return NaN;var a,o=U(s),r=U(i),l=Object(N.a)(this.gasmixture);try{for(l.s();!(a=l.n()).done;){var c=a.value.interpolate(this.latestFlagsMsg.pos,o);(this.latestFlagsMsg.pos||this.latestFlagsMsg.neg)&&0!==c&&(n+=c.calcCurrent(r))}}catch(h){l.e(h)}finally{l.f()}}else this.latestFlagsMsg.pos||this.latestFlagsMsg.neg;var u=new P(this.runninCounter,n,e,t,this.latestFlagsMsg.ionize,this.latestFlagsMsg.faimsEnable);return this.latestFlagsMsg.sweepOn&&this.runninCounter++,u}},{key:"do_setVc",value:function(e){return this.latestVcMsg=e,this.runninCounter=0,new Promise((function(e,t){e()}))}},{key:"do_setFaims",value:function(e){return this.latestFaimsMsg=e,this.runninCounter=0,new Promise((function(e,t){e()}))}},{key:"do_setFlags",value:function(e){return this.latestFlagsMsg=e,this.runninCounter=0,new Promise((function(e,t){e()}))}}]),e}(),P=function e(t,n,s,i,a,o){Object(T.a)(this,e),this.ions=n,this.hv=s,this.vc=i,this.roll=t%512,this.button=!1,this.ionizing=a,this.faimsEnabled=o,this.version=69},_=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.coil,s=void 0===n?0:n,i=t.period,a=void 0===i?0:i,o=t.pulse,r=void 0===o?0:o;Object(T.a)(this,e),this.coil=s,this.period=a,this.pulse=r},D=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.step,s=void 0===n?0:n,i=t.repeats,a=void 0===i?1:i,o=t.sweepMin,r=void 0===o?0:o,l=t.sweepMax,c=void 0===l?0:l,u=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];Object(T.a)(this,e),this.step=s,this.repeats=a,0===this.step?this.steps=0:this.steps=Math.floor((c-r)/s),this.sweepUp=u,this.start=u?r:c}return Object(V.a)(e,[{key:"vcValue",value:function(e){if(this.steps<1)return this.start;var t=Math.min(1,this.repeats),n=e%(this.steps*t),s=Math.floor(n/t);return this.sweepUp?this.start+s*this.step:this.start-s*this.step}}]),e}(),R=n(52),L=n.n(R);function H(e,t){return"undefined"===typeof e?"udef":Number.isNaN(e)?NaN:e.toFixed(t)}var J=function(e){var t=e.ions,n=e.vc,s=e.hvdc,i=e.returnField,a=e.peakField,o=e.compensationField;return Object(b.jsxs)(u.a,{container:!0,spacing:3,children:[Object(b.jsx)(u.a,{item:!0,xs:!0,children:Object(b.jsx)(c.a,{children:Object(b.jsx)(h.a,{p:2,children:Object(b.jsx)(L.a,{id:"ionGauge",minValue:-500,maxValue:500,value:t,segments:2,segmentColors:["#3377FF","#FF3933"],needleColor:"steelblue",needleTransitionDuration:100,needleTransition:"easeElastic",currentValueText:"Ions: "+H(t,2)+" pA",textColor:"#AAA"})})})}),Object(b.jsx)(u.a,{item:!0,xs:!0,children:Object(b.jsx)(c.a,{children:Object(b.jsx)(h.a,{p:2,children:Object(b.jsx)(L.a,{id:"vcGauge",minValue:-5,maxValue:24,value:n,segments:2,segmentColors:["#00FBFF","#FFFF00"],customSegmentStops:[-5,0,24],needleColor:"steelblue",needleTransitionDuration:100,needleTransition:"easeElastic",currentValueText:"VC: "+H(n,3)+"\nfield:"+H(i,3)+" Td\ncomp "+H(o,3),textColor:"#AAA"})})})}),Object(b.jsx)(u.a,{item:!0,xs:!0,children:Object(b.jsx)(c.a,{children:Object(b.jsx)(h.a,{p:2,children:Object(b.jsx)(L.a,{id:"hvGauge",minValue:0,maxValue:1e3,value:s,segments:3,segmentColors:["#C2C2C2","#4FFF20","#FF0000"],customSegmentStops:[0,100,800,1e3],needleColor:"steelblue",needleTransitionDuration:100,needleTransition:"easeElastic",currentValueText:"HVDC: "+H(s,1)+" field:"+H(a,2)+" Td",textColor:"#AAA"})})})})]})},G=n(75),q=n.n(G),W=n(144),Y=new k.TimeSeries({resetBounds:!0,resetBoundsInterval:3e3}),X={coil:.25,period:2.5,pulse:.13},K={step:.276123046875,repeats:1,sweepMin:-4,sweepMax:18},Q={sweepOn:!0,shutdown:!1,ionize:!0,pos:!0,neg:!1,pumpOn:!0,sweepUp:!1,attention:!1,faimsEnable:!0},Z=new B([],new D(K),new function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.sweepOn,s=void 0!==n&&n,i=t.shutdown,a=void 0!==i&&i,o=t.ionize,r=void 0!==o&&o,l=t.pos,c=void 0!==l&&l,u=t.neg,h=void 0!==u&&u,p=t.pumpOn,d=void 0!==p&&p,b=t.sweepUp,v=void 0===b||b,j=t.attention,g=void 0!==j&&j,m=t.faimsEnable,x=void 0!==m&&m;Object(T.a)(this,e),this.sweepOn=s,this.shutdown=a,this.ionize=r,this.pos=c,this.neg=h,this.pumpOn=d,this.sweepUp=v,this.attention=g,this.faimsEnable=x}(Q),new _(X)),$=function(){var e=Object(l.useState)(X),t=Object(r.a)(e,2),n=t[0],s=t[1],i=Object(l.useState)(K),p=Object(r.a)(i,2),d=p[0],v=p[1],g=Object(l.useState)(Q),m=Object(r.a)(g,2),x=m[0],O=m[1],f=Object(l.useState)({ions:0,vc:0,hv:0}),w=Object(r.a)(f,2),F=w[0],k=w[1],N=Object(l.useState)({ions:[],vc:[],hv:[],roll:[],button:[],ionizing:[],faimsEnabled:[]}),T=Object(r.a)(N,2),V=T[0],S=T[1],A=Object(l.useState)([]),I=Object(r.a)(A,2),B=I[0],P=I[1];Object(l.useEffect)((function(){var e=setInterval((function(){var e=Z.runCycle();if(void 0!=typeof e&&!Number.isNaN(e)&&void 0!=typeof e.ions){k({ions:e.ions,vc:e.vc,hv:e.hv});var t=(new Date).getTime();if(Y.append(t,e.ions),void 0!==typeof V&&void 0!==typeof B)if(V.ions.length<2)V.ions=V.ions.concat(e.ions),V.vc=V.vc.concat(e.vc),V.hv=V.vc.concat(e.hv),V.roll=V.roll.concat(e.roll),V.button=V.button.concat(e.button),V.ionizing=V.ionizing.concat(e.ionizing),V.faimsEnabled=V.faimsEnabled.concat(e.faimsEnabled),S(V);else{var n=0<V.vc[1]-V.vc[0],s=0<V.vc[V.vc.length-1]-V.vc[V.vc.length-2],i=V.vc[V.vc.length-1]===V.vc[V.vc.length-2];n===s||i?(V.ions=V.ions.concat(e.ions),V.vc=V.vc.concat(e.vc),V.hv=V.vc.concat(e.hv),V.roll=V.roll.concat(e.roll),V.button=V.button.concat(e.button),V.ionizing=V.ionizing.concat(e.ionizing),V.faimsEnabled=V.faimsEnabled.concat(e.faimsEnabled),S(V)):(P([].concat(Object(o.a)(B),[V])),S({ions:[],vc:[],hv:[],roll:[],button:[],ionizing:[],faimsEnabled:[]}))}}}),200);return function(){return clearInterval(e)}}));for(var R,L,H,G,$=[],ee=[],te=0;te<1e3;te+=1){$.push(Math.random());for(var ne=[],se=0;se<100;se+=1)ne.push(Math.random());ee.push(ne)}return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("h1",{children:"Faims hardware UI demo"}),0<B.length?Object(b.jsxs)(W.a,{variant:"contained",color:"primary",onClick:function(){var e=new Date;!function(e,t,n){var s=document.createElement("a");if(s.setAttribute("target","_blank"),void 0!==Blob){var i=new Blob([n],{type:t});s.setAttribute("href",URL.createObjectURL(i))}else s.setAttribute("href",t+","+encodeURIComponent(n));s.setAttribute("download",e),document.body.appendChild(s),s.click(),document.body.removeChild(s)}("faimstest"+e.getSeconds()+"_"+e.getMinutes()+"_"+e.getHours()+"_"+e.getDate()+"_"+(e.getMonth()+1)+"_"+e.getFullYear()+"json","application/json",JSON.stringify(B)),P([])},children:[" Download ",B.length," sweeps "]}):"",Object(b.jsx)(J,{ions:F.ions,vc:F.vc,hvdc:F.hv,peakField:U(z(F.hv,F.vc,n.pulse,n.period)),returnField:U((R=F.hv,L=F.vc,H=n.pulse,G=n.period,L+R*H/G)),compensationField:U(F.vc)}),Object(b.jsxs)(u.a,{container:!0,spacing:3,children:[Object(b.jsx)(u.a,{item:!0,xs:!0,children:Object(b.jsx)(c.a,{children:Object(b.jsxs)(h.a,{p:2,children:[Object(b.jsx)(j,{values:n,changeEvent:function(e){console.log("TODO RAUDALLE FAIMS VIESTI\xc4",e);var t=new _(e);s(e),Z.do_setFaims(t).then((function(e){}),(function(e){}))}}),Object(b.jsx)(y,{pulse:n.pulse,period:n.period,coil:n.coil})]})})}),Object(b.jsx)(u.a,{item:!0,xs:!0,children:Object(b.jsx)(c.a,{children:Object(b.jsx)(h.a,{p:2,children:Object(b.jsx)(M,{sweepOn:x.sweepOn,shutdown:x.shutdown,ionize:x.ionize,pos:x.pos,neg:x.neg,pumpOn:x.pumpOn,sweepUp:x.sweepUp,attention:x.attention,faimsEnable:x.faimsEnable,onStateChange:function(e,t){console.log("Muuttuu lippu "+e+" arvo "+t),x[e]=Boolean(t),"sweepOn"===e&&Boolean(t)&&P([]),x.pos&&x.neg&&(x.pos=!1,x.neg=!1),O(Object(a.a)({},x)),Z.do_setFlags(x).then((function(e){}),(function(e){}));var n=new D(d,x.sweepUp);Z.do_setVc(n).then((function(e){}),(function(e){}))}})})})}),Object(b.jsx)(u.a,{item:!0,xs:!0,children:Object(b.jsx)(c.a,{children:Object(b.jsx)(h.a,{p:2,children:Object(b.jsx)(C,{values:d,sweepUp:!0,changeEvent:function(e){var t=new D(e,x.sweepUp);console.log("TODO RAUDALLE VC VIESTI\xc4",e," MUOTOON ",t),v(e),Z.do_setVc(t).then((function(e){}),(function(e){}))}})})})})]}),Object(b.jsx)(E.a,{responsive:!0,height:300,tooltip:!0,series:[{data:Y,strokeStyle:{g:255},fillStyle:{g:255},lineWidth:1}]}),Object(b.jsx)("br",{}),Object(b.jsxs)("div",{children:[Object(b.jsx)("br",{}),Object(b.jsx)(q.a,{data:0===B.length?[]:1===B.length?[{x:B[B.length-1].vc,y:B[B.length-1].ions,type:"scatter",mode:"lines+markers",marker:{color:"red"}}]:2<B.length?[{x:B[B.length-2].vc,y:B[B.length-2].ions,type:"scatter",name:"previous",mode:"lines",marker:{color:"gray"}},{x:B[B.length-1].vc,y:B[B.length-1].ions,type:"scatter",name:"latest",mode:"lines+markers",marker:{color:"red"}}]:void 0,layout:{width:1024,height:600,title:"VC plot",autosize:!0}})]})]})};i.a.render(Object(b.jsx)($,{}),document.getElementById("root"))}},[[116,1,2]]]);
//# sourceMappingURL=main.0f873518.chunk.js.map