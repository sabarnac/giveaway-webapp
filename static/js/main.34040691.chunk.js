(this["webpackJsonpgiveaway-webapp"]=this["webpackJsonpgiveaway-webapp"]||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){},106:function(e,t,n){},107:function(e,t,n){},114:function(e,t,n){},115:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){},143:function(e,t,n){},144:function(e,t,n){},145:function(e,t,n){},146:function(e,t,n){},147:function(e,t,n){},148:function(e,t,n){},149:function(e,t,n){},150:function(e,t,n){},151:function(e,t,n){},152:function(e,t,n){},153:function(e,t,n){},154:function(e,t,n){},156:function(e,t,n){},157:function(e,t,n){},166:function(e,t,n){"use strict";n.r(t);var a=n(39),r=n(53),s=n.n(r),i=n(2),c=n(22),o=n(4),l=n(0),u=n.n(l),m=n(30),h=n(18);n(41);class d{constructor(e,t){this._url=void 0,this._altText=void 0,this._isSameUrl=(e,t)=>e===t,this._isSameAltText=(e,t)=>e===t,this.equals=e=>this._isSameUrl(this._url,e._url)&&this._isSameAltText(this._altText,e._altText),this._url=e,this._altText=t}get url(){return this._url}get altText(){return this._altText}}const g=n(86)();class p{constructor(e,t,n=1){this._id=void 0,this._name=void 0,this._avatar=void 0,this._weight=void 0,this._getOrCreateAvatar=(e,t)=>t?new d(t.url,t.altText):new d(P(e),e),this._isSameName=(e,t)=>e===t,this._isSameAvatar=(e,t)=>e.equals(t),this.equals=e=>this._isSameName(this._name,e._name)&&this._isSameAvatar(this._avatar,e._avatar),this._id="".concat(p.counter++),this._name=e,this._avatar=this._getOrCreateAvatar(e,t),this._weight=n}get id(){return this._id}get name(){return this._name}get properName(){return g.titleize(this._name)}get avatar(){return this._avatar}get weight(){return this._weight}}p.counter=1;var _=n(5),w=n(37),f=n.n(w);const E=f.a.engines.mt19937().seed(c.seed);var v,y,b,O,x,N=new f.a(E);class j{}j._SPEED_MAP=new Map([["HALF",.5],["ONE",1],["TWO",2]]),j.get=e=>j._SPEED_MAP.get(e),j.getValues=()=>Array.from(j._SPEED_MAP.values()),j.getKeys=()=>Array.from(j._SPEED_MAP.keys()),j.hasKey=e=>j._SPEED_MAP.has(e),j.hasValue=e=>-1!==j.getValues().indexOf(e),j.getEntries=()=>Array.from(j._SPEED_MAP.entries());let M=(x=O=class e{constructor(){this._name=void 0,this._messages=void 0,this._allParticipants=void 0,this._participantsPerMatch=void 0,this._languages=void 0,Object(m.a)(this,"_currentLanguage",y,this),Object(m.a)(this,"_speed",b,this),this._unusedMessages=void 0,this._getName=()=>c.name,this._getMessages=()=>c.messages,this._createParticipant=e=>"string"===typeof e?new p(e):new p(e.name,e.avatar,e.weight),this._getParticipants=()=>c.users.map(this._createParticipant),this._getParticipantsPerMatch=()=>c.participantsPerMatch,this._getlLanguages=()=>c.lang,this._getSpeed=()=>j.get("ONE"),this._shouldPrepend=(e,t)=>e===t-1&&t>1,this._prependToLastParticipant=(e,t)=>(n,a)=>this._shouldPrepend(a,e)?"".concat(t," ").concat(n):n,this._formatLosers=e=>e.map(this._prependToLastParticipant(e.length,"and")).join(", "),this.getFormattedMessage=(e,t,n)=>e.replace("#winner",t).replace("#loser",this._formatLosers(n)),this.getMessageIndex=e=>this._messages.indexOf(e),this._name=this._getName(),this._messages=this._getMessages(),this._unusedMessages=N.shuffle([...this._messages]),this._allParticipants=this._getParticipants(),this._participantsPerMatch=this._getParticipantsPerMatch(),this._languages=this._getlLanguages(),this._currentLanguage="en",this._speed=this._getSpeed()}static getInstance(){return e._instance?e._instance:e._instance=new e}get name(){return this._name}get messages(){return[...this._messages]}getRandomMessage(){0===this._unusedMessages.length&&(this._unusedMessages=N.shuffle([...this._messages]));const e=N.pick(this._unusedMessages);return this._unusedMessages.splice(this._unusedMessages.indexOf(e),1),e}get allParticipants(){return this._allParticipants}get participantsPerMatch(){return this._participantsPerMatch}get languages(){return this._languages}get currentLanguage(){return this._currentLanguage}setCurrentLanguage(e){-1!==this._languages.indexOf(e)?(this._currentLanguage=e,V.changeLanguage(e)):console.error("Illegal value '".concat(e,"' for current language."))}get speed(){return this._speed}setSpeed(e){j.hasValue(e)?this._speed=e:console.error("Illegal value '".concat(e,"' for speed."))}},O._instance=null,v=x,y=Object(h.a)(v.prototype,"_currentLanguage",[_.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),b=Object(h.a)(v.prototype,"_speed",[_.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Object(h.a)(v.prototype,"currentLanguage",[_.computed],Object.getOwnPropertyDescriptor(v.prototype,"currentLanguage"),v.prototype),Object(h.a)(v.prototype,"setCurrentLanguage",[_.action],Object.getOwnPropertyDescriptor(v.prototype,"setCurrentLanguage"),v.prototype),Object(h.a)(v.prototype,"speed",[_.computed],Object.getOwnPropertyDescriptor(v.prototype,"speed"),v.prototype),Object(h.a)(v.prototype,"setSpeed",[_.action],Object.getOwnPropertyDescriptor(v.prototype,"setSpeed"),v.prototype),v);var I=n(12),C=n(6);const P=e=>"https://api.adorable.io/avatars/480/".concat(e),k=(e,t,n)=>n>=t&&e>=t&&e<=n,A=(e,t)=>{const n=setTimeout(e,t);return()=>clearTimeout(n)},S=(e=0)=>{const t=Object(l.useState)(e),n=Object(o.a)(t,2),a=n[0],r=n[1],s=()=>r(a+1);return[a,s,e=>A(s,e),r]},T=e=>e/M.getInstance().speed,R=(e,t)=>()=>e?t():void 0,D=(e,t)=>u.a.createElement(I.a,{to:"/round/".concat(e,"/match/").concat(t)}),W=e=>t=>u.a.createElement(C.Observer,null,()=>u.a.createElement(e,t));var L={resources:{en:{translation:n(57)}},lng:"en",fallbackLng:"en",debug:!1,interpolation:{escapeValue:!1},react:{wait:!0}};const U=c.lang,G=Object.keys(L.resources);G.filter(e=>-1===U.indexOf(e)).forEach(e=>{throw new Error('Language "'.concat(e,'" is not added in config.'))}),U.filter(e=>-1===G.indexOf(e)).forEach(e=>{throw new Error('Language "'.concat(e,'" is not added in resources.'))}),a.a.use(s.a).use(i.b).init(L);var V=a.a,F=(n(98),n(99),n(25)),K=n.n(F),z=n(61),B=(n(100),n(1)),q=n.n(B),J=(n(101),n(102),n(7)),H=(n(103),n(104),n(105),n(106),e=>void 0===e.participant.avatar?null:u.a.createElement("div",{className:q()("".concat(e.className,"__avatar"))},u.a.createElement("img",{src:e.participant.avatar.url,alt:e.participant.avatar.altText}))),Y=e=>u.a.createElement("div",{className:q()("".concat(e.className,"__name"))},u.a.createElement("strong",null,e.participant.properName)),$=e=>t=>u.a.createElement("div",{className:q()("participant",e,{["".concat("participant","--invert")]:t.invert})},u.a.createElement(H,Object.assign({className:e},t)),u.a.createElement(Y,Object.assign({className:e},t))),Q=$("participant-entry"),X=(n(107),e=>{const t=S(),n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(l.useEffect)(R(0===a,r)),u.a.createElement(J.CSSTransition,{in:a>0,timeout:T(200),classNames:{enter:"",enterActive:"".concat(e.className,"__winner--entering"),enterDone:"".concat(e.className,"__winner--entered"),exit:"",exitActive:"".concat(e.className,"__winner--exiting"),exitDone:"".concat(e.className,"__winner--exited")},mountOnEnter:!0,unmountOnExit:!0},u.a.createElement("div",{className:q()("".concat(e.className,"__winner")),style:{transition:"opacity ".concat(T(200),"ms ease-in-out")}},u.a.createElement(Q,{participant:e.winner})))}),Z=e=>{const t=S(),n=Object(o.a)(t,4),a=n[0],r=n[1],s=n[2],i=n[3];return Object(l.useEffect)(R(0===a,r)),Object(l.useEffect)(R((a+1)%3===0,()=>s(T(200)))),Object(l.useEffect)(R(a===3*e.match.participants.length+1,()=>i(1))),u.a.createElement(l.Fragment,null,e.isCurrentMatch&&e.isActualMatch?e.match.participants.map((t,n)=>u.a.createElement(J.CSSTransition,{key:t.id,in:k(a,3*n+1,3*n+2),timeout:T(200),classNames:{enter:"",enterActive:"".concat(e.className,"__interim--entering"),enterDone:"".concat(e.className,"__interim--entered"),exit:"",exitActive:"".concat(e.className,"__interim--exiting"),exitDone:"".concat(e.className,"__interim--exited")},mountOnEnter:!0,unmountOnExit:!0,onEntered:r,onExited:r},u.a.createElement("div",{className:q()("".concat(e.className,"__interim")),style:{transition:"opacity ".concat(T(200),"ms ease-in-out")}},u.a.createElement(Q,{participant:t})))):u.a.createElement(X,{className:e.className,isCurrentMatch:e.isCurrentMatch,winner:e.match.winner}))},ee=(n(114),e=>u.a.createElement("div",{className:q()("".concat(e.className,"__list"))},e.match.participants.map(e=>u.a.createElement(Q,{key:e.id,participant:e}))));n(115),n(116);var te=Object(C.inject)("config")(Object(i.d)()(Object(I.g)(W(e=>{const t=S(),n=Object(o.a)(t,2),a=n[0],r=n[1],s=Object(l.useState)(document.hidden),c=Object(o.a)(s,2),m=c[0],h=c[1],d=!new URLSearchParams(e.location.search).has("stop");Object(l.useEffect)(R(0===a,r)),Object(l.useEffect)(()=>{console.log(document.hidden);const e=()=>{console.log(document.hidden),h(document.hidden)};return document.addEventListener("visibilitychange",e),()=>document.removeEventListener("visibilitychange",e)});const g=(0,Object(i.c)().t)("matchOverlay.messages",{returnObjects:!0,count:e.currentMatch.losers.length});let p=e.currentMatch.message;const _=e.config.getMessageIndex(e.currentMatch.message);-1!==_&&Array.isArray(g)&&k(_,0,g.length-1)&&(p=g[_]);const w=e.currentMatch.winner.properName,f=e.currentMatch.losers.map(e=>e.properName);return Object(l.useEffect)(R(2===a&&d&&!m,()=>A(()=>{e.onWinnerComplete()},T(4e3)))),u.a.createElement(J.CSSTransition,{in:a>0&&e.show,timeout:T(500),classNames:{enter:"",enterActive:"".concat(e.className,"__winner--entering"),enterDone:"".concat(e.className,"__winner--entered"),exit:"",exitActive:"".concat(e.className,"__winner--exiting"),exitDone:"".concat(e.className,"__winner--exited")},mountOnEnter:!0,unmountOnExit:!0,onEntered:r},u.a.createElement("div",{className:q()("".concat(e.className,"__winner")),style:{transition:"opacity ".concat(T(500),"ms ease-in-out")}},u.a.createElement(i.a,{i18nKey:"matchOverlay.winnerTitle"},u.a.createElement(Q,{participant:e.currentMatch.winner}),u.a.createElement("h3",null,"Won The Match!")),u.a.createElement("h5",null,u.a.createElement("strong",null,u.a.createElement("em",null,e.config.getFormattedMessage(p,w,f))))))})))),ne=(n(117),n(58)),ae=Object(i.d)()(W(e=>{const t=S(),n=Object(o.a)(t,3),a=n[0],r=n[1],s=n[2];return Object(l.useEffect)(R(0===a,r)),Object(l.useEffect)(R(2===a,()=>s(T(4e3))),[a]),u.a.createElement(J.CSSTransition,{in:k(a,1,2)&&e.show,timeout:T(500),classNames:{enter:"",enterActive:"".concat(e.className,"__interim--entering"),enterDone:"".concat(e.className,"__interim--entered"),exit:"",exitActive:"".concat(e.className,"__interim--exiting"),exitDone:"".concat(e.className,"__interim--exited")},mountOnEnter:!0,unmountOnExit:!0,onEntered:r,onExited:e.onInterimComplete},u.a.createElement("div",{className:q()("".concat(e.className,"__interim")),style:{transition:"opacity ".concat(T(500),"ms ease-in-out")}},u.a.createElement("h3",null,u.a.createElement(i.a,{i18nKey:"matchOverlay.interimText"},"Selecting Winner")),u.a.createElement(ne.ClipLoader,{sizeUnit:"rem",size:3})))})),re=(n(143),n(144),$("participant-card")),se=Object(i.d)()(e=>u.a.createElement("div",{className:q()("".concat(e.className,"__list"))},e.currentMatch.participants.flatMap(t=>[u.a.createElement("div",{key:t.id},u.a.createElement(re,{invert:!0,participant:t})),u.a.createElement("h3",{className:q()("versus-text"),key:"".concat(t.id," versus")},u.a.createElement(i.a,{i18nKey:"matchOverlay.versus",count:e.currentMatch.participants.length},"VS"))]).slice(0,-1))),ie=W(e=>{const t=S(),n=Object(o.a)(t,2),a=n[0],r=n[1],s="match-overlay";return Object(l.useEffect)(R(0===a&&e.show,r)),u.a.createElement(J.CSSTransition,{in:k(a,1,2)&&e.show,timeout:T(500),classNames:{enter:"",enterActive:"".concat(s,"-wrapper--entering"),enterDone:"".concat(s,"-wrapper--entered"),exit:"",exitActive:"".concat(s,"-wrapper--exiting"),exitDone:"".concat(s,"-wrapper--exited")},mountOnEnter:!0,unmountOnExit:!0,onExited:e.onOverlayComplete},u.a.createElement("div",{className:q()("".concat(s,"-wrapper")),style:{transition:"opacity ".concat(T(500),"ms ease-in-out")}},u.a.createElement("div",{className:q()(s)},u.a.createElement(se,{className:s,currentMatch:e.currentMatch}),u.a.createElement(ae,{className:s,show:1===a,onInterimComplete:r}),u.a.createElement(te,{currentMatch:e.currentMatch,className:s,show:2===a,onWinnerComplete:r}))))}),ce=W(e=>{if(void 0===e.match)return null;const t=e.match.participants.length>1,n=S(e.isCurrentMatch?0:3),a=Object(o.a)(n,4),r=a[0],s=a[1],i=a[2],c=a[3],m=()=>{c(3),R(e.isCurrentMatch,()=>A(()=>e.onMatchComplete(),T(1e3)))()};Object(l.useEffect)(R(0===r,s)),Object(l.useEffect)(R(1===r&&t&&e.isCurrentMatch,()=>i(T(200)))),Object(l.useEffect)(R(1===r&&!t,m));const h=Object(l.useRef)(null);return u.a.createElement(J.CSSTransition,{in:r>0,timeout:T(500),classNames:{enter:"",enterActive:"".concat("match","--entering"),enterDone:"".concat("match","--entered"),exit:"",exitActive:"".concat("match","--exiting"),exitDone:"".concat("match","--exited")},mountOnEnter:!0,unmountOnExit:!0,onEntering:()=>h.current.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),onExited:e.onMatchComplete},u.a.createElement("div",{ref:h,className:q()("match",{["".concat("match","--completed")]:!e.isCurrentMatch}),style:{transition:"opacity ".concat(T(500),"ms ease-in-out")}},u.a.createElement(ee,{className:"match",match:e.match}),u.a.createElement(Z,{className:"match",isCurrentMatch:e.isCurrentMatch&&r<3,isActualMatch:t,match:e.match}),u.a.createElement(ie,{currentMatch:e.match,show:2===r&&e.isCurrentMatch,onOverlayComplete:m})))}),oe=e=>{const t=e.round.matches.findIndex(t=>t.id===e.matchId);return u.a.createElement(C.Observer,null,()=>u.a.createElement("div",{className:q()("".concat(e.className,"__list"))},e.round.matches.filter((e,n)=>n<=t).map(t=>u.a.createElement(ce,{key:t.fullId,match:t,isCurrentMatch:t.id===e.matchId,onMatchComplete:e.onCurrentMatchComplete}))))},le=(n(145),Object(i.d)()(e=>{const t=e.round.id;return u.a.createElement("h2",null,u.a.createElement(i.a,{i18nKey:"roundView.title"},"Round ",{roundId:t}))})),ue=W(e=>{const t=e.round.matches.findIndex(t=>t.id===e.matchId),n=S(t),a=Object(o.a)(n,2),r=a[0],s=a[1];return Object(l.useEffect)(R(0===r,s)),u.a.createElement(J.CSSTransition,{in:r>0&&-1!==t&&e.show,timeout:T(500),classNames:{enter:"",enterActive:"".concat(e.className,"--entering"),enterDone:"".concat(e.className,"--entered"),exit:"",exitActive:"".concat(e.className,"--exiting"),exitDone:"".concat(e.className,"--exited")},mountOnEnter:!0,unmountOnExit:!0},u.a.createElement("div",{className:q()(e.className),style:{transition:"opacity ".concat(T(500),"ms ease-in-out")}},u.a.createElement(le,{round:e.round}),u.a.createElement(oe,{key:"".concat(e.round.id,":").concat(e.matchId),className:e.className,round:e.round,matchId:e.matchId,onCurrentMatchComplete:e.onCurrentComplete})))});const me=(e=!1,t,n)=>e?D(t.id,t.matches[n].id):null;var he=W(e=>{if(void 0===e.round)return null;const t=e.round.matches.findIndex(t=>t.id===e.matchId),n=S(t),a=Object(o.a)(n,4),r=a[0],s=a[1],i=a[3],c=r>0&&t!==r&&-1!==t&&r<e.round.matches.length;return Object(l.useEffect)(R(r===e.round.matches.length,()=>A(e.onRoundComplete,T(500))),[r]),Object(l.useEffect)(()=>i(t),[t,e.matchId,i]),u.a.createElement(J.CSSTransition,{in:e.show,timeout:T(500),classNames:{enter:"",enterActive:"round--entering",enterDone:"round--entered",exit:"",exitActive:"round--exiting",exitDone:"round--exited"},mountOnEnter:!0,unmountOnExit:!0},u.a.createElement(l.Fragment,null,u.a.createElement(ue,{className:"round",round:e.round,show:r!==e.round.matches.length,matchId:e.matchId,onCurrentComplete:s}),me(-1===t,e.round,0),me(c,e.round,r)))}),de=(n(146),n(147),n(148),Object(i.d)()(e=>u.a.createElement("div",{className:q()("".concat(e.className,"__winner"))},u.a.createElement(i.a,{i18nKey:"winnerOverlay.message"},u.a.createElement(re,{participant:e.winner}),u.a.createElement("h3",null,"Won The Tournament!"))))),ge=e=>u.a.createElement("div",{className:q()(e.className)},u.a.createElement(de,e)),pe=W(e=>{const t=S(),n=Object(o.a)(t,2),a=n[0],r=n[1],s="winner-overlay";return Object(l.useEffect)(R(0===a,r)),u.a.createElement(J.CSSTransition,{in:a>0&&e.show,timeout:T(500),classNames:{enter:"",enterActive:"".concat(s,"-wrapper--entering"),enterDone:"".concat(s,"-wrapper--entered"),exit:"",exitActive:"".concat(s,"-wrapper--exiting"),exitDone:"".concat(s,"-wrapper--exited")},mountOnEnter:!0,unmountOnExit:!0},u.a.createElement("div",{className:q()("".concat(s,"-wrapper")),style:{transition:"opacity ".concat(T(500),"ms ease-in-out")}},u.a.createElement(ge,{className:s,winner:e.winner})))}),_e=(n(149),n(150),Object(C.inject)("config")(Object(C.observer)(e=>u.a.createElement("button",{key:e.speed,className:q()("".concat(e.className,"__option"),{"button-primary":e.speed===e.config.speed}),onClick:()=>e.config.setSpeed(e.speed)},"".concat(e.speed,"x")))));const we=j.getValues();var fe=e=>u.a.createElement("div",{className:q()("speed-control")},we.map(e=>u.a.createElement(_e,{className:"speed-control",key:"".concat(e,"-speed"),speed:e}))),Ee=(n(59),()=>null),ve=(n(151),n(152),n(153),W(e=>{const t=S(),n=Object(o.a)(t,3),a=n[0],r=n[1],s=n[2];return Object(l.useEffect)(R(0===a,r)),Object(l.useEffect)(R(2===a,()=>s(T(1e3))),[a]),u.a.createElement(J.CSSTransition,{in:k(a,1,2)&&e.show,timeout:T(200),classNames:{enter:"",enterActive:"".concat(e.className,"__loser--entering"),enterDone:"".concat(e.className,"__loser--entered"),exit:"",exitActive:"".concat(e.className,"__loser--exiting"),exitDone:"".concat(e.className,"__loser--exited")},mountOnEnter:!0,unmountOnExit:!0,onEntered:r,onExited:e.onInfoComplete},u.a.createElement("div",{className:q()("".concat(e.className,"__loser")),style:{transition:"opacity ".concat(T(200),"ms ease-in-out")}},u.a.createElement(re,{participant:e.loser})))})),ye=Object(i.d)()(e=>{const t=S(),n=Object(o.a)(t,2),a=n[0],r=n[1];return Object(l.useEffect)(R(a===e.losers.length,e.onViewComplete)),u.a.createElement("div",{className:q()(e.className)},u.a.createElement("h2",null,u.a.createElement(i.a,{i18nKey:"loserOverlay.title",count:e.losers.length},"Losers")),e.losers.map((t,n)=>u.a.createElement(ve,{key:t.name,className:e.className,show:a===n,loser:t,onInfoComplete:r})))}),be=W(e=>{const t=S(),n=Object(o.a)(t,2),a=n[0],r=n[1],s="loser-overlay";return Object(l.useEffect)(R(0===a,r)),u.a.createElement(J.CSSTransition,{in:1===a,timeout:T(500),classNames:{enter:"",enterActive:"".concat(s,"-wrapper--entering"),enterDone:"".concat(s,"-wrapper--entered"),exit:"",exitActive:"".concat(s,"-wrapper--exiting"),exitDone:"".concat(s,"-wrapper--exited")},mountOnEnter:!0,unmountOnExit:!0,onExited:e.onOverlayComplete},u.a.createElement("div",{className:q()("".concat(s,"-wrapper")),style:{transition:"opacity ".concat(T(500),"ms ease-in-out")}},u.a.createElement(ye,{losers:e.losers,className:s,onViewComplete:r})))}),Oe=e=>e.show?u.a.createElement(be,{losers:e.round.losers,onOverlayComplete:e.onOverlayComplete}):null;n(154);const xe=n(155);var Ne=Object(i.d)()(Object(C.inject)("config")(e=>{const t=(0,Object(i.c)().t)("tournamentView.name");let n=xe(t)&&t?t:e.config.name;return u.a.createElement("h1",null,u.a.createElement(i.a,{i18nKey:"tournamentView.title"},{tournamentName:n}," Tournament"))})),je=(n(156),n(157),Object(C.inject)("config")(Object(C.observer)(e=>u.a.createElement("button",{key:e.language,className:q()("".concat(e.className,"__option"),{"button-primary":e.language===e.config.currentLanguage}),onClick:()=>e.config.setCurrentLanguage(e.language)},e.language)))),Me=Object(C.inject)("config")(e=>u.a.createElement("div",{className:q()("language-control")},e.config.languages.map(e=>u.a.createElement(je,{key:"".concat(e,"-language"),className:"language-control",language:e}))));const Ie=n(51);var Ce=Object(i.d)()(Object(C.inject)("serviceWorkerAlertsConfig")(W(e=>{const t=Object(l.useState)(!0),n=Object(o.a)(t,2),a=n[0],r=n[1],s=e.t("serviceWorker.updateMessage.title"),i=e.t("serviceWorker.updateMessage.message");return u.a.createElement(Ie.default,{show:a&&e.serviceWorkerAlertsConfig.updated,type:"warning",title:s,text:i,onConfirm:()=>{r(!1),e.serviceWorkerAlertsConfig.setIsUpdated(!1)}})})));const Pe=n(51);var ke=Object(i.d)()(Object(C.inject)("serviceWorkerAlertsConfig")(W(e=>{const t=Object(l.useState)(!0),n=Object(o.a)(t,2),a=n[0],r=n[1],s=e.t("serviceWorker.offlineMessage.title"),i=e.t("serviceWorker.offlineMessage.message");return u.a.createElement(Pe.default,{show:a&&e.serviceWorkerAlertsConfig.added,type:"success",title:s,text:i,onConfirm:()=>{r(!1),e.serviceWorkerAlertsConfig.setIsAdded(!1)}})})));const Ae=(e=!1,t,n,a)=>e?D(t.rounds[n].id,t.rounds[n].matches[a].id):null;var Se,Te=e=>{const t=e.tournament.rounds.findIndex(t=>t.id===e.roundId),n=e.tournament.lastRound.id===e.roundId,a=Object(l.useState)(!1),r=Object(o.a)(a,2),s=r[0],i=r[1],c=S(),m=Object(o.a)(c,4),h=m[0],d=m[1],g=m[3],p=h>0&&t+1!==h&&h<=e.tournament.rounds.length;return Object(l.useEffect)(R(0===h,()=>g(t+1))),u.a.createElement("div",{key:"round-".concat(t),className:q()("tournament")},u.a.createElement(Ne,null),u.a.createElement(he,{key:"".concat(e.roundId),show:h===t+1,round:e.tournament.rounds[t],matchId:e.matchId,onRoundComplete:()=>i(!0)}),u.a.createElement(Oe,{show:s&&!n,round:e.tournament.rounds[t],onOverlayComplete:()=>{i(!1),d()}}),u.a.createElement(pe,{show:s&&n,winner:e.tournament.winner}),Ae(-1===t,e.tournament,0,0),Ae(p,e.tournament,Math.max(t,h-1),0),u.a.createElement(fe,null),u.a.createElement(Me,null),u.a.createElement(ke,null),u.a.createElement(Ce,null),u.a.createElement(Ee,null))};const Re=e=>e.roundId?D(e.roundId,e.firstMatchId):D(e.firstRoundId,e.firstMatchId);let De=Object(C.observer)(Se=class extends l.Component{constructor(...e){super(...e),this._getParams=e=>e.match.params,this._getApplicationRoute=()=>u.a.createElement(I.b,{exact:!0,path:"/round/:roundId/match/:matchId",render:this._getTournament}),this._getTournament=e=>u.a.createElement(Te,{key:this._getParams(e).roundId,tournament:this.props.tournament,roundId:this._getParams(e).roundId,matchId:this._getParams(e).matchId}),this._getPartialRoute=()=>u.a.createElement(I.b,{exact:!0,path:"/round/:roundId",render:this._getPartialAppRedirect}),this._getPartialAppRedirect=e=>this._getCurrentRoundDetails(this._getParams(e).roundId)?u.a.createElement(Re,{roundId:this._getParams(e).roundId,firstMatchId:this._getFirstMatchIdOfCurrentRound(this._getParams(e).roundId)}):this._getUnknownAppRedirect(),this._getUnknownRoute=()=>u.a.createElement(I.b,{exact:!0,path:"*",render:this._getUnknownAppRedirect}),this._getUnknownAppRedirect=()=>u.a.createElement(Re,{roundId:this._getFirstRoundId(),firstMatchId:this._getFirstMatchIdOfCurrentRound(this._getFirstRoundId())}),this._getFirstRoundId=()=>this.props.tournament.firstRound.id,this._getIsCurrentRoundFilter=e=>t=>t.id===e,this._getCurrentRoundDetails=e=>this.props.tournament.rounds.find(this._getIsCurrentRoundFilter(e)),this._getFirstMatchIdOfCurrentRound=e=>this._getCurrentRoundDetails(e).firstMatch.id,this.render=()=>u.a.createElement(I.d,null,this._getApplicationRoute(),this._getPartialRoute(),this._getUnknownRoute())}})||Se;var We=Object(I.g)(De);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Le,Ue,Ge,Ve,Fe;let Ke=(Fe=Ve=class e{constructor(){Object(m.a)(this,"_added",Ue,this),Object(m.a)(this,"_updated",Ge,this),this._added=!1,this._updated=!1}static getInstance(){return e._instance?e._instance:e._instance=new e}get added(){return this._added}get updated(){return this._updated}setIsAdded(e){this._added=e}setIsUpdated(e){this._updated=e}},Ve._instance=null,Le=Fe,Ue=Object(h.a)(Le.prototype,"_added",[_.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Ge=Object(h.a)(Le.prototype,"_updated",[_.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Object(h.a)(Le.prototype,"added",[_.computed],Object.getOwnPropertyDescriptor(Le.prototype,"added"),Le.prototype),Object(h.a)(Le.prototype,"updated",[_.computed],Object.getOwnPropertyDescriptor(Le.prototype,"updated"),Le.prototype),Object(h.a)(Le.prototype,"setIsAdded",[_.action],Object.getOwnPropertyDescriptor(Le.prototype,"setIsAdded"),Le.prototype),Object(h.a)(Le.prototype,"setIsUpdated",[_.action],Object.getOwnPropertyDescriptor(Le.prototype,"setIsUpdated"),Le.prototype),Le);var ze=n(34),Be=n.n(ze),qe=n(60),Je=n.n(qe);const He=n(165);class Ye{constructor(e,t,n){this._id=void 0,this._roundId=void 0,this._participants=void 0,this._winner=void 0,this._message=void 0,this._participantWeightGcd=void 0,this._config=void 0,this._getParticipantWeight=e=>e.weight,this._getParticipantWeightsGcd=()=>this._participants.map(this._getParticipantWeight).reduce((e,t)=>He(e,t)),this._cloneParticipantByWeight=e=>{const t=[];for(let n=0;n<e.weight/this._participantWeightGcd;n++)t.push(e);return t},this._getWinner=()=>N.pick(this._participants.flatMap(this._cloneParticipantByWeight)),this._getMessage=()=>this._config.getRandomMessage(),this._getMatchId=e=>(Ye.counter[e]||(Ye.counter[e]=1),"".concat(Ye.counter[e]++)),this._isNotWinner=e=>!e.equals(this._winner),this._config=e,this._id="".concat(this._getMatchId(n)),this._roundId=n,this._participants=t,this._participantWeightGcd=this._getParticipantWeightsGcd(),this._winner=this._getWinner(),this._message=this._getMessage()}get id(){return this._id}get fullId(){return"".concat(this._roundId,":").concat(this._id)}get losers(){return this._participants.filter(this._isNotWinner)}get participants(){return this._participants}get winner(){return this._winner}get message(){return this._message}}Ye.counter={};class $e{constructor(e,t){this._id=void 0,this._matches=void 0,this._config=void 0,this._shuffleParticipants=e=>N.shuffle(e),this._createMatch=e=>new Ye(this._config,e,this._id),this._getMatches=e=>Je()(this._shuffleParticipants(e),this._config.participantsPerMatch).map(this._createMatch),this._getMatchParticipants=e=>e.participants,this._getMatchWinner=e=>e.winner,this._getMatchLosers=e=>e.losers,this._config=e,this._id="".concat($e.counter++),this._matches=this._getMatches(t)}get id(){return this._id}get matches(){return this._matches}get firstMatch(){return this._matches[0]}get lastMatch(){return Be()(this._matches)}get participants(){return this._matches.flatMap(this._getMatchParticipants)}get winners(){return this._matches.map(this._getMatchWinner)}get losers(){return this._matches.flatMap(this._getMatchLosers)}}$e.counter=1;const Qe=M.getInstance(),Xe=Ke.getInstance();"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()});const Ze=new class{constructor(e){this._rounds=void 0,this._config=void 0,this._createRound=e=>new $e(this._config,e),this._getRounds=()=>{for(this._rounds=[this._createRound(this._config.allParticipants)];!this._hasWinner;)this._rounds.push(this._createRound(this.lastRound.winners));return this._rounds},this._config=e,this._rounds=this._getRounds()}get _hasWinner(){return 1===this.lastRound.winners.length}get firstRound(){return this._rounds[0]}get lastRound(){return Be()(this._rounds)}get rounds(){return this._rounds}get winner(){return this.lastRound.winners[0]}}(Qe);document.title="".concat(Qe.name," Tournament"),K.a.render(u.a.createElement(z.a,null,u.a.createElement(C.Provider,{config:Qe,serviceWorkerAlertsConfig:Xe},u.a.createElement(We,{tournament:Ze}))),document.getElementById("root"))},22:function(e){e.exports=JSON.parse('{"name":"The Witcher: Enhanced Edition Director\'s Cut Giveaway (Third Coming)","seed":1585834272,"participantsPerMatch":2,"messages":["#loser committed sudoku.","#winner didn\'t even do anything.","#loser is contemplating the meaning of their existence.","#loser thinks traps are gay.","#winner was assisted by The Big Gay.","#winner subscribed to thighdeology.","#loser, ur mum gay.","Why do we exist?","#loser hates giveaways.","#winner winner winner, fuck your dinner.","#loser, ur mum also gay.","Does anyone even read these?","#winner monologues harder than 8-man.","#winner wins better than a harem protagonist wins women.","#loser died of dysentery.","#loser drools harder than a waterfall over Gundam figures.","#loser floss dances.","#winner PRAISES THE SUN. \\\\[T]/","#winner is woke and breath-taking Samurai.","#loser goes UwU, #winner goes OwO.","#loser: \\"It\'s time to kick gum and chew ass. And I\'m all out of ass.\\"","#winner had the high ground.","#winner played #loser like a damn fiddle.","#loser though his power was underestimated.","#winner is woke and a breath-taking Samurai.","#winner winner winner, your mom makes a great dinner.","There are 3 ways this could have gone, and #loser would have lost in all of them.","#loser, always fear the flame giveaway, lest you be devoured by it, and lose yourself","#RIGGED","Giveaways are why we are here. It\'s what we pariticpate in when no money is left.","\ud83d\udd25 \ud83d\udc4c \ud83d\udcaf \ud83d\ude02 \ud83d\ude91"],"lang":["en"],"users":[{"name":"Joyverse#2655","weight":1},{"name":"epigmenio#2456","weight":1},{"name":"Enpitsu_hito#2843","weight":1},{"name":"LeoArmstrong#1514","weight":1},{"name":"Kunjabes#6232","weight":1},{"name":"toymaker#4439","weight":1},{"name":"Lucifer_sama#7848","weight":1},{"name":"nibbles#8415","weight":1},{"name":"Potato#2524","weight":1},{"name":"jjm#1379","weight":1},{"name":"Master#0136","weight":1},{"name":"Prax#6361","weight":1},{"name":"Yolomanceringu#5278","weight":1},{"name":"(Fusion_Jazz)#4450","weight":1},{"name":"reycom#4704","weight":1},{"name":"littlekat#3223","weight":1},{"name":"Excalibur#1915","weight":1},{"name":"HiteshOO7#8668","weight":1},{"name":"K14_Muneeb#2355","weight":1},{"name":"Kamado_Tanjirou#3780","weight":1},{"name":"PoodleHead#0543","weight":1},{"name":"Kris Bauch","weight":1},{"name":"Gatsby89200#4533","weight":1},{"name":"Estelle Schiller","weight":1},{"name":"Blanche Bergstrom","weight":1},{"name":"Melany Larkin","weight":1},{"name":"Garett Kris","weight":1},{"name":"Kobe Schulist","weight":1},{"name":"Olen McLaughlin","weight":1},{"name":"Israel Runolfsdottir","weight":1},{"name":"Frances Murphy","weight":1},{"name":"TheYorouzoya#3449","weight":1},{"name":"Arnoldo Monahan","weight":1},{"name":"Blanca Legros","weight":1},{"name":"Pinky\ud83d\udc3c#8227","weight":1}]}')},57:function(e){e.exports=JSON.parse('{"serviceWorker":{"offlineMessage":{"title":"Use Offline","message":"This web application can now be used offline!"},"updateMessage":{"title":"App Updated","message":"This web application has been updated. Please close all tabs/instances of it and open it again to see the update."}},"tournamentView":{"name":"The Witcher: Enhanced Edition Director\'s Cut Giveaway (Third Coming)","title":"<0>{{tournamentName}}</0> Tournament"},"loserOverlay":{"title":"Losers"},"roundView":{"title":"Round <1>{{roundId}}</1>"},"matchOverlay":{"interimText":"Selecting Winner","versus":"VS","messages":["#loser committed sudoku.","#winner didn\'t even do anything.","#loser is contemplating the meaning of their existence.","#loser thinks traps are gay.","#winner was assisted by The Big Gay.","#winner subscribed to thighdeology.","#loser, ur mum gay.","Why do we exist?","#loser hates giveaways.","#winner winner winner, fuck your dinner.","#loser, ur mum also gay.","Does anyone even read these?","#winner monologues harder than 8-man.","#winner wins better than a harem protagonist wins women.","#loser died of dysentery.","#loser drools harder than a waterfall over Gundam figures.","#loser floss dances.","#winner PRAISES THE SUN. \\\\[T]/","#winner is woke and breath-taking Samurai.","#loser goes UwU, #winner goes OwO.","#loser: \\"It\'s time to kick gum and chew ass. And I\'m all out of ass.\\"","#winner had the high ground.","#winner played #loser like a damn fiddle.","#loser though his power was underestimated.","#winner is woke and a breath-taking Samurai.","#winner winner winner, your mom makes a great dinner.","There are 3 ways this could have gone, and #loser would have lost in all of them.","#loser, always fear the flame giveaway, lest you be devoured by it, and lose yourself","#RIGGED","Giveaways are why we are here. It\'s what we pariticpate in when no money is left.","\ud83d\udd25 \ud83d\udc4c \ud83d\udcaf \ud83d\ude02 \ud83d\ude91"],"winnerTitle":"<0></0><1>Won The Match!</1>"},"winnerOverlay":{"message":"<0></0><1>Won The Tournament!</1>"},"#loserOverlay.title_note":"Count is passed for plurals (if required).","#matchOverlay.messages_note":"Count is passed for plurals (if required).","#matchOverlay.versus_note":"Count is passed for plurals (if required).","#tournamentView.name_note":"To be filled in by end developer."}')},62:function(e,t,n){e.exports=n(166)},98:function(e,t,n){}},[[62,1,2]]]);
//# sourceMappingURL=main.34040691.chunk.js.map