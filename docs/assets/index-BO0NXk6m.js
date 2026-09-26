(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Zu={resume:[{id:"resume-01",role:"Creative technologist",organisation:"Independent practice",period:"2024 — present",summary:"Placeholder for a role, practice, or collaboration."}],projects:[{id:"project-01",title:"A small digital shoreline",summary:"Placeholder for a project log and its short field note.",year:2025,link:"#"}],writing:[{id:"writing-01",title:"Notes from the weather line",publication:"Personal notebook",year:2025,excerpt:"Placeholder for a writing sample excerpt.",link:"#"}],media:[{id:"media-01",label:"Portfolio media placeholder",url:"#",kind:"image"}]},Mo=180,nr={x:0,z:0},$u=["resume","projects","writing","media"],Ku=["ridge","mesa","mound","twin-peaks"],ih=/^#[0-9a-f]{6}$/i,ns=[{id:"island-resume",name:"Chartroom",category:"resume",position:{x:-26,z:-18},landCollisionRadius:7,dockingTriggerRadius:11,landform:"ridge",palette:{sand:"#d8c28d",land:"#7e9a73",rock:"#465d5d"},contentIds:["resume-01"],description:"A quiet chartroom for the route so far and the work behind it."},{id:"island-projects",name:"Shipyard",category:"projects",position:{x:16,z:-24},landCollisionRadius:6,dockingTriggerRadius:10,landform:"mesa",palette:{sand:"#d8b878",land:"#b86f4c",rock:"#704b44"},contentIds:["project-01"],description:"A working shipyard for experiments, builds, and field notes."},{id:"island-writing",name:"Logbook",category:"writing",position:{x:-18,z:26},landCollisionRadius:8,dockingTriggerRadius:12,landform:"twin-peaks",palette:{sand:"#dfcfaa",land:"#8e806f",rock:"#555968"},contentIds:["writing-01"],description:"A windward logbook for essays, observations, and unfinished thoughts."},{id:"island-media",name:"Signal Cove",category:"media",position:{x:24,z:20},landCollisionRadius:7,dockingTriggerRadius:11,landform:"mound",palette:{sand:"#cbbd98",land:"#5d8c87",rock:"#3f5964"},contentIds:["media-01"],description:"A sheltered cove for images, moving pictures, and sound."}];function Zr(n){return typeof n=="object"&&n!==null}function rh(n){return Zr(n)}function sh(n){return Zr(n)&&typeof n.id=="string"&&n.id.length>0}function oh(n){return typeof n=="string"&&$u.includes(n)}function ah(n){return typeof n=="string"&&Ku.includes(n)}function fs(n){return typeof n=="number"&&Number.isFinite(n)}function vt(n,e){throw new Error(`Invalid island at index ${n}: ${e}`)}function ch(n,e){if(!Array.isArray(n))throw new Error("Invalid island definitions: expected an array");if(!Zr(e))throw new Error("Invalid portfolio content: expected an object");const t=new Set,i=[];n.forEach((r,s)=>{rh(r)||vt(s,"expected an object"),(typeof r.id!="string"||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))&&vt(s,"id must be a stable non-empty kebab-case string"),t.has(r.id)&&vt(s,`duplicate id "${r.id}"`),t.add(r.id),(typeof r.name!="string"||r.name.trim().length===0)&&vt(s,"name must be a non-empty string"),oh(r.category)||vt(s,`category must be one of ${$u.join(", ")}`),ah(r.landform)||vt(s,`landform must be one of ${Ku.join(", ")}`),(!Zr(r.position)||!fs(r.position.x)||!fs(r.position.z))&&vt(s,"position.x and position.z must be finite numbers"),(!fs(r.landCollisionRadius)||r.landCollisionRadius<=0)&&vt(s,"landCollisionRadius must be a finite positive number"),(!fs(r.dockingTriggerRadius)||r.dockingTriggerRadius<=0)&&vt(s,"dockingTriggerRadius must be a finite positive number"),(Math.abs(r.position.x)+r.dockingTriggerRadius>Mo||Math.abs(r.position.z)+r.dockingTriggerRadius>Mo)&&vt(s,`docking zone must remain within ±${Mo} world units`),r.landCollisionRadius>=r.dockingTriggerRadius&&vt(s,"dockingTriggerRadius must be greater than landCollisionRadius"),Zr(r.palette)||vt(s,"palette must contain sand, land, and rock colors");for(const u of["sand","land","rock"])(typeof r.palette[u]!="string"||!ih.test(r.palette[u]))&&vt(s,`palette.${u} must be a six-digit hex color`);(!Array.isArray(r.contentIds)||r.contentIds.length===0)&&vt(s,"contentIds must contain at least one content ID"),(typeof r.description!="string"||r.description.trim().length===0)&&vt(s,"description must be a non-empty string");const o=e[r.category];Array.isArray(o)||vt(s,`portfolio content category "${r.category}" must be an array`);const a=new Set;o.forEach((u,d)=>{if(!sh(u))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: id must be a non-empty string`);if(a.has(u.id))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: duplicate id "${u.id}"`);a.add(u.id)});const l=new Set;r.contentIds.forEach(u=>{(typeof u!="string"||u.length===0)&&vt(s,"contentIds must contain non-empty strings"),l.has(u)&&vt(s,`duplicate content ID "${u}"`),a.has(u)||vt(s,`content ID "${u}" is missing from category "${r.category}"`),l.add(u)}),i.push({index:s,island:r}),Math.hypot(r.position.x-nr.x,r.position.z-nr.z)<=r.dockingTriggerRadius&&vt(s,"docking zone must leave the vessel spawn point clear")});for(let r=0;r<i.length;r+=1)for(let s=r+1;s<i.length;s+=1){const o=i[r],a=i[s];if(Math.hypot(o.island.position.x-a.island.position.x,o.island.position.z-a.island.position.z)<=o.island.dockingTriggerRadius+a.island.dockingTriggerRadius)throw new Error(`Invalid island definitions: docking zones overlap for "${o.island.id}" and "${a.island.id}"`)}}const lh=["up","down","trimIn","trimOut","left","right","brake"],uh=new Map([["w","up"],["arrowup","up"],["s","down"],["arrowdown","down"],["a","left"],["arrowleft","left"],["d","right"],["arrowright","right"],["q","trimIn"],["e","trimOut"],[" ","brake"]]),dh={throttle:0,sheet:0,rudder:0,brake:!1};function hh(n){const e=new Set(n),t=Number(e.has("right"))-Number(e.has("left")),i=Number(e.has("down"))-Number(e.has("up")),r=t||i?Math.atan2(t+i,i-t):void 0;return{throttle:0,sheet:e.has("trimIn")===e.has("trimOut")?0:e.has("trimIn")?-1:1,rudder:0,brake:e.has("brake"),...r===void 0?{}:{targetHeading:r}}}class fh{root;onInput;onReset;onAutoTrim;buttons=new Map;resetButton;autoTrimButton;pressedKeys=new Map;pressedButtons=new Map;pointers=new Map;buttonHandlers=[];enabled=!0;resetEnabled=!0;disposed=!1;resetHeld=!1;lastInput={...dh};constructor(e){this.root=e.root,this.onInput=e.onInput,this.onReset=e.onReset,this.onAutoTrim=e.onAutoTrim;for(const r of lh){const s=Array.from(this.root.querySelectorAll(`[data-vessel-control="${r}"]`));this.buttons.set(r,s);for(const o of s)this.bindButton(o,r)}this.root.addEventListener("pointerdown",this.onPointerDown),this.root.addEventListener("pointerup",this.onPointerUp),this.root.addEventListener("pointercancel",this.onPointerCancel),this.root.addEventListener("lostpointercapture",this.onLostPointerCapture),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),window.addEventListener("pagehide",this.onPageHide),document.addEventListener("visibilitychange",this.onVisibilityChange);const t=this.root.querySelector("[data-vessel-reset]");if(this.resetButton=t??void 0,t&&this.onReset){const r=()=>{this.releaseAll(),this.onReset?.()};t.addEventListener("click",r),this.buttonHandlers.push({button:t,type:"click",handler:r})}const i=this.root.querySelector("[data-vessel-auto-trim]");if(this.autoTrimButton=i??void 0,i&&this.onAutoTrim){const r=()=>{this.releaseAll(),this.onAutoTrim?.()};i.addEventListener("click",r),this.buttonHandlers.push({button:i,type:"click",handler:r})}this.emitIfChanged()}setEnabled(e,t=e){if(!this.disposed){this.enabled=e,this.resetEnabled=t,this.releaseAll();for(const i of this.buttons.values())for(const r of i)r.disabled=!e,r.setAttribute("aria-disabled",String(!e));this.resetButton&&(this.resetButton.disabled=!t,this.resetButton.setAttribute("aria-disabled",String(!t))),this.autoTrimButton&&(this.autoTrimButton.disabled=!e,this.autoTrimButton.setAttribute("aria-disabled",String(!e))),this.root.toggleAttribute("data-controls-disabled",!e)}}releaseAll(){this.pressedKeys.clear(),this.pressedButtons.clear(),this.resetHeld=!1;for(const{pointerId:e,button:t}of this.pointers.values())try{t.releasePointerCapture?.(e)}catch{}this.pointers.clear(),this.emitIfChanged(!0)}dispose(){if(!this.disposed){this.disposed=!0,this.releaseAll(),this.root.removeEventListener("pointerdown",this.onPointerDown),this.root.removeEventListener("pointerup",this.onPointerUp),this.root.removeEventListener("pointercancel",this.onPointerCancel),this.root.removeEventListener("lostpointercapture",this.onLostPointerCapture),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),window.removeEventListener("pagehide",this.onPageHide),document.removeEventListener("visibilitychange",this.onVisibilityChange);for(const{button:e,type:t,handler:i}of this.buttonHandlers)e.removeEventListener(t,i);this.buttonHandlers.length=0}}bindButton=(e,t)=>{e.dataset.vesselControl=t,e.addEventListener("keydown",this.onButtonKeyDown),e.addEventListener("keyup",this.onButtonKeyUp),e.addEventListener("focusout",this.onButtonFocusOut),this.buttonHandlers.push({button:e,type:"keydown",handler:this.onButtonKeyDown},{button:e,type:"keyup",handler:this.onButtonKeyUp},{button:e,type:"focusout",handler:this.onButtonFocusOut})};onButtonKeyDown=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||this.enabled&&(e.preventDefault(),this.pressedButtons.set(t,i),this.emitIfChanged())};onButtonKeyUp=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.pressedButtons.delete(t),this.emitIfChanged())};onButtonFocusOut=e=>{const t=e.currentTarget;!t||!this.pressedButtons.delete(t)||this.emitIfChanged()};onPointerDown=e=>{if(!this.enabled||this.disposed||e.pointerType==="mouse"&&e.button!==0)return;const t=e.target instanceof Element?e.target.closest("[data-vessel-control]"):null,i=t?.dataset.vesselControl;!t||!i||t.disabled||(e.preventDefault(),this.pointers.set(e.pointerId,{pointerId:e.pointerId,control:i,button:t}),t.setPointerCapture?.(e.pointerId),this.emitIfChanged())};onPointerUp=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onPointerCancel=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onLostPointerCapture=e=>{const t=e.pointerId;!Number.isFinite(t)||!this.pointers.delete(t)||this.emitIfChanged()};onKeyDown=e=>{if(this.disposed||ph(e.target)||mh(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;const t=Zc(e.key);if(e.target instanceof HTMLElement&&e.target.matches("button, a")&&(t===" "||t==="enter"))return;if(t==="r"){if(!this.resetEnabled||this.resetHeld)return;e.preventDefault(),this.releaseAll(),this.resetHeld=!0,this.onReset?.();return}if(!this.enabled)return;if(t==="m"){if(e.repeat)return;e.preventDefault(),this.releaseAll(),this.onAutoTrim?.();return}const i=uh.get(t);i&&(e.preventDefault(),!this.pressedKeys.has(t)&&(this.pressedKeys.set(t,i),this.emitIfChanged()))};onKeyUp=e=>{const t=Zc(e.key);if(t==="r"){this.resetHeld=!1;return}this.pressedKeys.delete(t)&&(e.preventDefault(),this.emitIfChanged())};onBlur=()=>this.releaseAll();onPageHide=()=>this.releaseAll();onVisibilityChange=()=>{document.hidden&&this.releaseAll()};emitIfChanged(e=!1){const t=this.getInput();!e&&gh(t,this.lastInput)||(this.lastInput=t,this.onInput({...t}))}getInput(){const e=new Set(this.pressedKeys.values());for(const i of this.pressedButtons.values())e.add(i);for(const{control:i}of this.pointers.values())e.add(i);const t=hh(e);for(const[i,r]of this.buttons){const s=e.has(i);for(const o of r)o.dataset.active=String(s),o.setAttribute("aria-pressed",String(s))}return t}}function Zc(n){return n.length===1,n.toLowerCase()}function ph(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest("input, select, textarea"):!1}function mh(n){return n instanceof Element&&!!n.closest(".content-drawer")}function gh(n,e){return n.throttle===e.throttle&&n.sheet===e.sheet&&n.rudder===e.rudder&&n.brake===e.brake&&n.sailAngle===e.sailAngle&&n.targetHeading===e.targetHeading}const _h=1.25;function Rr(n){return typeof n=="number"&&Number.isFinite(n)}function $c(n,e){return Math.hypot(n.x-e.position.x,n.z-e.position.z)}function vh(n,e,t){if(!Rr(n?.x)||!Rr(n?.z))return null;if(t){const s=e.find(o=>o.id===t);if(s&&$c(n,s)<=s.dockingTriggerRadius+_h)return s}let i=null,r=Number.POSITIVE_INFINITY;for(const s of e){if(!Rr(s.position.x)||!Rr(s.position.z)||!Rr(s.dockingTriggerRadius))continue;const o=$c(n,s);o<=s.dockingTriggerRadius&&o<r&&(i=s,r=o)}return i}const So={resume:"Resume",projects:"Projects",writing:"Writing",media:"Media"};function xh(n){const{root:e,islands:t,content:i}=n,r=new Map(t.map(O=>[O.id,O])),s=document.createElement("nav");s.className="scanner-hud",s.setAttribute("aria-label","Portfolio scanner");const o=document.createElement("p");o.className="scanner-hud__label",o.textContent="Scan by category",s.append(o);const a=document.createElement("div");a.className="scanner-hud__links",a.setAttribute("role","list");for(const O of t){const J=document.createElement("div");J.setAttribute("role","listitem");const ee=document.createElement("button");ee.type="button",ee.className="scanner-hud__link",ee.dataset.scannerIsland=O.id,ee.setAttribute("aria-label",`Scan ${O.name}, ${So[O.category]}`),ee.setAttribute("aria-expanded","false"),ee.setAttribute("aria-controls","portfolio-content-drawer");const we=document.createElement("span");we.className="scanner-hud__number",we.setAttribute("aria-hidden","true"),we.textContent=String(a.children.length+1).padStart(2,"0");const Pe=document.createElement("span");Pe.className="scanner-hud__link-label",Pe.textContent=So[O.category];const k=document.createElement("span");k.className="scanner-hud__link-name",k.textContent=O.name,ee.append(we,Pe,k),ee.addEventListener("click",E),J.append(ee),a.append(J)}s.append(a);const l=document.createElement("p");l.className="scanner-hud__status",l.setAttribute("role","status"),l.setAttribute("aria-live","polite"),l.setAttribute("aria-atomic","true"),l.textContent="Under way · choose a category to scan",s.append(l);const c=document.createElement("p");c.className="visually-hidden",c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.setAttribute("aria-atomic","true"),s.append(c);const u=document.createElement("section");u.className="explore-prompt",u.hidden=!0,u.setAttribute("aria-label","Nearby island");const d=document.createElement("p");d.className="explore-prompt__kicker",d.textContent="Within range";const f=document.createElement("p");f.className="explore-prompt__text";const m=document.createElement("button");m.type="button",m.dataset.exploreAction="true",m.className="explore-prompt__button",m.textContent="Explore island",m.addEventListener("click",y),u.append(d,f,m);const g=document.createElement("aside");g.className="content-drawer",g.id="portfolio-content-drawer",g.hidden=!0,g.setAttribute("aria-label","Portfolio content"),g.setAttribute("aria-live","off");const v=document.createElement("div");v.className="content-drawer__header";const p=document.createElement("button");p.type="button",p.className="content-drawer__close",p.setAttribute("aria-label","Close portfolio drawer"),p.textContent="Close";const h=()=>L(!0);p.addEventListener("click",h);const x=document.createElement("h2");x.className="content-drawer__title",x.tabIndex=-1,x.id="portfolio-drawer-heading",v.append(x,p);const M=document.createElement("div");M.className="content-drawer__body",M.tabIndex=0,M.setAttribute("role","region"),M.setAttribute("aria-labelledby",x.id),g.setAttribute("aria-labelledby",x.id),g.append(v,M),e.append(s,u,g);let _=null,b=null,w=l.textContent??"",P=!1,C=0;function E(O){const J=O.currentTarget;if(!(J instanceof HTMLButtonElement))return;const ee=J.dataset.scannerIsland;!ee||!r.has(ee)||(D(ee,J),n.onScanRequest(ee))}function y(){_&&(D(_.id,m),n.onExploreRequest(_.id))}function R(O){O.key!=="Escape"||g.hidden||L(!0)}function D(O,J=null){const ee=r.get(O);if(!ee||P)return;b=J??F(O),x.textContent=ee.name,M.replaceChildren(Mh(ee,i)),M.scrollTop=0,g.hidden=!1,e.classList.add("is-reading"),u.hidden=!0;for(const Pe of s.querySelectorAll("[data-scanner-island]")){const k=Pe.dataset.scannerIsland===O;Pe.setAttribute("aria-expanded",String(k)),Pe.dataset.selected=String(k)}const we=++C;requestAnimationFrame(()=>{!g.hidden&&we===C&&x.focus({preventScroll:!0})})}function L(O=!0){if(g.hidden)return;const J=q();C+=1,g.hidden=!0,e.classList.remove("is-reading"),u.hidden=!_;for(const we of s.querySelectorAll("[data-scanner-island]"))we.setAttribute("aria-expanded","false"),we.dataset.selected="false";const ee=b&&document.contains(b)&&Sh(b)?b:J;O&&ee&&ee.focus({preventScroll:!0}),b=null}function U(O){_?.id!==O?.id&&(_=O,u.hidden=!O||!g.hidden,c.textContent=O?`Docking range: ${O.name}. Explore prompt available.`:"Outside all docking zones.",O&&(f.textContent=`${O.name} · ${So[O.category]}`,m.setAttribute("aria-label",`Explore ${O.name}`)))}function B(O){if(P)return;const J=O.status==="travelling"?`Assisted passage to ${r.get(O.islandId??"")?.name??"island"}`:O.status==="arrived"?`Arrived at ${r.get(O.islandId??"")?.name??"island"}`:O.status==="cancelled"?"Scanner cancelled · steer manually":O.status==="failed"?"Scanner route unavailable · steer manually":"Under way · choose a category to scan",ee=O.message??J;ee!==w&&(w=ee,l.textContent=ee)}function F(O){return s.querySelector(`[data-scanner-island="${CSS.escape(O)}"]`)}function q(){return V()?F(V()):null}function V(){return Array.from(s.querySelectorAll("[data-scanner-island]")).find(O=>O.dataset.selected==="true")?.dataset.scannerIsland??null}function re(){if(!P){P=!0,C+=1,e.classList.remove("is-reading"),window.removeEventListener("keydown",R);for(const O of s.querySelectorAll("[data-scanner-island]"))O.removeEventListener("click",E);m.removeEventListener("click",y),p.removeEventListener("click",h),s.remove(),u.remove(),g.remove()}}return window.addEventListener("keydown",R),{nav:s,drawer:g,setProximity:U,setScanUpdate:B,openIsland:D,closeDrawer:L,dispose:re}}function Mh(n,e){const t=document.createDocumentFragment(),i=document.createElement("p");i.className="content-drawer__description",i.textContent=n.description,t.append(i);const r=n.category;if(r==="resume")for(const s of e.resume.filter(o=>n.contentIds.includes(o.id))){const o=ps();ms(o,s.role),gs(o,`${s.organisation} · ${s.period}`),yo(o,s.summary),t.append(o)}else if(r==="projects")for(const s of e.projects.filter(o=>n.contentIds.includes(o.id))){const o=ps();ms(o,s.title),gs(o,String(s.year)),yo(o,s.summary),Eo(o,s.link),t.append(o)}else if(r==="writing")for(const s of e.writing.filter(o=>n.contentIds.includes(o.id))){const o=ps();ms(o,s.title),gs(o,`${s.publication} · ${s.year}`),yo(o,s.excerpt),Eo(o,s.link),t.append(o)}else for(const s of e.media.filter(o=>n.contentIds.includes(o.id))){const o=ps();ms(o,s.label),gs(o,s.kind),Eo(o,s.url),t.append(o)}return t}function ps(){const n=document.createElement("article");return n.className="content-card",n}function ms(n,e){const t=document.createElement("h3");t.textContent=e,n.append(t)}function gs(n,e){const t=document.createElement("p");t.className="content-card__meta",t.textContent=e,n.append(t)}function yo(n,e){const t=document.createElement("p");t.textContent=e,n.append(t)}function Eo(n,e){if(!e||e==="#"){const i=document.createElement("p");i.className="content-card__placeholder",i.textContent="Link unavailable in placeholder data.",n.append(i);return}const t=document.createElement("a");t.href=e,t.target="_blank",t.rel="noreferrer",t.textContent="Open related material",n.append(t)}function Sh(n){if(n.hidden||n.closest("[hidden]"))return!1;const e=window.getComputedStyle(n);return e.display!=="none"&&e.visibility!=="hidden"}const xc="179",yh=0,Kc=1,Eh=2,ju=1,bh=2,Fn=3,ni=0,Gt=1,wt=2,ei=0,cr=1,jc=2,Jc=3,Qc=4,Th=5,_i=100,Ah=101,wh=102,Rh=103,Ch=104,Ph=200,Ih=201,Lh=202,Dh=203,_a=204,va=205,Uh=206,Nh=207,Fh=208,Oh=209,Bh=210,zh=211,kh=212,Hh=213,Vh=214,xa=0,Ma=1,Sa=2,pr=3,ya=4,Ea=5,ba=6,Ta=7,Ju=0,Gh=1,Wh=2,ti=0,Xh=1,qh=2,Yh=3,Qu=4,Zh=5,$h=6,Kh=7,ed=300,mr=301,gr=302,Aa=303,wa=304,uo=306,Ra=1e3,Mi=1001,Ca=1002,Kt=1003,jh=1004,_s=1005,yn=1006,bo=1007,Si=1008,An=1009,td=1010,nd=1011,is=1012,Mc=1013,wi=1014,En=1015,cs=1016,Sc=1017,yc=1018,rs=1020,id=35902,rd=1021,sd=1022,fn=1023,ss=1026,os=1027,Ec=1028,bc=1029,od=1030,Tc=1031,Ac=1033,Ks=33776,js=33777,Js=33778,Qs=33779,Pa=35840,Ia=35841,La=35842,Da=35843,Ua=36196,Na=37492,Fa=37496,Oa=37808,Ba=37809,za=37810,ka=37811,Ha=37812,Va=37813,Ga=37814,Wa=37815,Xa=37816,qa=37817,Ya=37818,Za=37819,$a=37820,Ka=37821,eo=36492,ja=36494,Ja=36495,ad=36283,Qa=36284,ec=36285,tc=36286,Jh=3200,Qh=3201,cd=0,ef=1,Kn="",Zt="srgb",_r="srgb-linear",io="linear",it="srgb",Li=7680,el=519,tf=512,nf=513,rf=514,ld=515,sf=516,of=517,af=518,cf=519,tl=35044,dn=35048,nl="300 es",bn=2e3,ro=2001;class yr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],To=Math.PI/180,nc=180/Math.PI;function ls(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function $e(n,e,t){return Math.max(e,Math.min(t,n))}function lf(n,e){return(n%e+e)%e}function Ao(n,e,t){return(1-t)*n+t*e}function Cr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ze{constructor(e=0,t=0){Ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class us{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const f=s[o+0],m=s[o+1],g=s[o+2],v=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==f||c!==m||u!==g){let p=1-a;const h=l*f+c*m+u*g+d*v,x=h>=0?1:-1,M=1-h*h;if(M>Number.EPSILON){const b=Math.sqrt(M),w=Math.atan2(b,h*x);p=Math.sin(p*w)/b,a=Math.sin(a*w)/b}const _=a*x;if(l=l*p+f*_,c=c*p+m*_,u=u*p+g*_,d=d*p+v*_,p===1-a){const b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*m-c*f,e[t+1]=l*g+u*f+c*d-a*m,e[t+2]=c*g+u*m+a*f-l*d,e[t+3]=u*g-a*d-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d-f*m*g;break;case"YXZ":this._x=f*u*d+c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d+f*m*g;break;case"ZXY":this._x=f*u*d-c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d-f*m*g;break;case"ZYX":this._x=f*u*d-c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d+f*m*g;break;case"YZX":this._x=f*u*d+c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d-f*m*g;break;case"XZY":this._x=f*u*d-c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>d){const m=2*Math.sqrt(1+i-a-d);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-i-d);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+d-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,i=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return wo.copy(this).projectOnVector(e),this.sub(wo)}reflect(e){return this.sub(wo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wo=new H,il=new us;class Ge{constructor(e,t,i,r,s,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],m=i[5],g=i[8],v=r[0],p=r[3],h=r[6],x=r[1],M=r[4],_=r[7],b=r[2],w=r[5],P=r[8];return s[0]=o*v+a*x+l*b,s[3]=o*p+a*M+l*w,s[6]=o*h+a*_+l*P,s[1]=c*v+u*x+d*b,s[4]=c*p+u*M+d*w,s[7]=c*h+u*_+d*P,s[2]=f*v+m*x+g*b,s[5]=f*p+m*M+g*w,s[8]=f*h+m*_+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,m=c*s-o*l,g=t*d+i*f+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*c-u*i)*v,e[2]=(a*i-r*o)*v,e[3]=f*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-a*t)*v,e[6]=m*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ro.makeScale(e,t)),this}rotate(e){return this.premultiply(Ro.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ro.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ro=new Ge;function ud(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function so(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function uf(){const n=so("canvas");return n.style.display="block",n}const rl={};function lr(n){n in rl||(rl[n]=!0,console.warn(n))}function df(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const sl=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ol=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hf(){const n={enabled:!0,workingColorSpace:_r,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===it&&(r.r=kn(r.r),r.g=kn(r.g),r.b=kn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(r.r=ur(r.r),r.g=ur(r.g),r.b=ur(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Kn?io:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return lr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return lr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[_r]:{primaries:e,whitePoint:i,transfer:io,toXYZ:sl,fromXYZ:ol,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:sl,fromXYZ:ol,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),n}const et=hf();function kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ur(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Di;class ff{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Di===void 0&&(Di=so("canvas")),Di.width=e.width,Di.height=e.height;const r=Di.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Di}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=so("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=kn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(kn(t[i]/255)*255):t[i]=kn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let pf=0;class wc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=ls(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Co(r[o].image)):s.push(Co(r[o]))}else s=Co(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Co(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ff.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mf=0;const Po=new H;class Ft extends yr{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,i=Mi,r=Mi,s=yn,o=Si,a=fn,l=An,c=Ft.DEFAULT_ANISOTROPY,u=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=ls(),this.name="",this.source=new wc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Po).x}get height(){return this.source.getSize(Po).y}get depth(){return this.source.getSize(Po).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ed)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ra:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case Ca:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ra:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case Ca:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=ed;Ft.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,i=0,r=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],m=l[5],g=l[9],v=l[2],p=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,_=(m+1)/2,b=(h+1)/2,w=(u+f)/4,P=(d+v)/4,C=(g+p)/4;return M>_&&M>b?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=w/i,s=P/i):_>b?_<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),i=w/r,s=C/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=P/s,r=C/s),this.set(i,r,s,t),this}let x=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(d-v)/x,this.z=(f-u)/x,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gf extends yr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Ft(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new wc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends gf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class dd extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _f extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ii{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,rn):rn.fromBufferAttribute(s,o),rn.applyMatrix4(e.matrixWorld),this.expandByPoint(rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vs.copy(i.boundingBox)),vs.applyMatrix4(e.matrixWorld),this.union(vs)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,rn),rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),xs.subVectors(this.max,Pr),Ui.subVectors(e.a,Pr),Ni.subVectors(e.b,Pr),Fi.subVectors(e.c,Pr),Gn.subVectors(Ni,Ui),Wn.subVectors(Fi,Ni),oi.subVectors(Ui,Fi);let t=[0,-Gn.z,Gn.y,0,-Wn.z,Wn.y,0,-oi.z,oi.y,Gn.z,0,-Gn.x,Wn.z,0,-Wn.x,oi.z,0,-oi.x,-Gn.y,Gn.x,0,-Wn.y,Wn.x,0,-oi.y,oi.x,0];return!Io(t,Ui,Ni,Fi,xs)||(t=[1,0,0,0,1,0,0,0,1],!Io(t,Ui,Ni,Fi,xs))?!1:(Ms.crossVectors(Gn,Wn),t=[Ms.x,Ms.y,Ms.z],Io(t,Ui,Ni,Fi,xs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Cn=[new H,new H,new H,new H,new H,new H,new H,new H],rn=new H,vs=new ii,Ui=new H,Ni=new H,Fi=new H,Gn=new H,Wn=new H,oi=new H,Pr=new H,xs=new H,Ms=new H,ai=new H;function Io(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){ai.fromArray(n,s);const a=r.x*Math.abs(ai.x)+r.y*Math.abs(ai.y)+r.z*Math.abs(ai.z),l=e.dot(ai),c=t.dot(ai),u=i.dot(ai);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const vf=new ii,Ir=new H,Lo=new H;class Er{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):vf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ir.subVectors(e,this.center);const t=Ir.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ir,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ir.copy(e.center).add(Lo)),this.expandByPoint(Ir.copy(e.center).sub(Lo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Pn=new H,Do=new H,Ss=new H,Xn=new H,Uo=new H,ys=new H,No=new H;class Rc{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pn.copy(this.origin).addScaledVector(this.direction,t),Pn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Do.copy(e).add(t).multiplyScalar(.5),Ss.copy(t).sub(e).normalize(),Xn.copy(this.origin).sub(Do);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ss),a=Xn.dot(this.direction),l=-Xn.dot(Ss),c=Xn.lengthSq(),u=Math.abs(1-o*o);let d,f,m,g;if(u>0)if(d=o*l-a,f=o*a-l,g=s*u,d>=0)if(f>=-g)if(f<=g){const v=1/u;d*=v,f*=v,m=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Do).addScaledVector(Ss,f),m}intersectSphere(e,t){Pn.subVectors(e.center,this.origin);const i=Pn.dot(this.direction),r=Pn.dot(Pn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Pn)!==null}intersectTriangle(e,t,i,r,s){Uo.subVectors(t,e),ys.subVectors(i,e),No.crossVectors(Uo,ys);let o=this.direction.dot(No),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xn.subVectors(this.origin,e);const l=a*this.direction.dot(ys.crossVectors(Xn,ys));if(l<0)return null;const c=a*this.direction.dot(Uo.cross(Xn));if(c<0||l+c>o)return null;const u=-a*Xn.dot(No);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,i,r,s,o,a,l,c,u,d,f,m,g,v,p){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,f,m,g,v,p)}set(e,t,i,r,s,o,a,l,c,u,d,f,m,g,v,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=m,h[7]=g,h[11]=v,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Oi.setFromMatrixColumn(e,0).length(),s=1/Oi.setFromMatrixColumn(e,1).length(),o=1/Oi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,m=o*d,g=a*u,v=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=f-v*c,t[9]=-a*l,t[2]=v-f*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,m=l*d,g=c*u,v=c*d;t[0]=f+v*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=v+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,m=l*d,g=c*u,v=c*d;t[0]=f-v*a,t[4]=-o*d,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,m=o*d,g=a*u,v=a*d;t[0]=l*u,t[4]=g*c-m,t[8]=f*c+v,t[1]=l*d,t[5]=v*c+f,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,m=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=v-f*d,t[8]=g*d+m,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*d+g,t[10]=f-v*d}else if(e.order==="XZY"){const f=o*l,m=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+v,t[5]=o*u,t[9]=m*d-g,t[2]=g*d-m,t[6]=a*u,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xf,e,Mf)}lookAt(e,t,i){const r=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),qn.crossVectors(i,qt),qn.lengthSq()===0&&(Math.abs(i.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),qn.crossVectors(i,qt)),qn.normalize(),Es.crossVectors(qt,qn),r[0]=qn.x,r[4]=Es.x,r[8]=qt.x,r[1]=qn.y,r[5]=Es.y,r[9]=qt.y,r[2]=qn.z,r[6]=Es.z,r[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],m=i[13],g=i[2],v=i[6],p=i[10],h=i[14],x=i[3],M=i[7],_=i[11],b=i[15],w=r[0],P=r[4],C=r[8],E=r[12],y=r[1],R=r[5],D=r[9],L=r[13],U=r[2],B=r[6],F=r[10],q=r[14],V=r[3],re=r[7],O=r[11],J=r[15];return s[0]=o*w+a*y+l*U+c*V,s[4]=o*P+a*R+l*B+c*re,s[8]=o*C+a*D+l*F+c*O,s[12]=o*E+a*L+l*q+c*J,s[1]=u*w+d*y+f*U+m*V,s[5]=u*P+d*R+f*B+m*re,s[9]=u*C+d*D+f*F+m*O,s[13]=u*E+d*L+f*q+m*J,s[2]=g*w+v*y+p*U+h*V,s[6]=g*P+v*R+p*B+h*re,s[10]=g*C+v*D+p*F+h*O,s[14]=g*E+v*L+p*q+h*J,s[3]=x*w+M*y+_*U+b*V,s[7]=x*P+M*R+_*B+b*re,s[11]=x*C+M*D+_*F+b*O,s[15]=x*E+M*L+_*q+b*J,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],m=e[14],g=e[3],v=e[7],p=e[11],h=e[15];return g*(+s*l*d-r*c*d-s*a*f+i*c*f+r*a*m-i*l*m)+v*(+t*l*m-t*c*f+s*o*f-r*o*m+r*c*u-s*l*u)+p*(+t*c*d-t*a*m-s*o*d+i*o*m+s*a*u-i*c*u)+h*(-r*a*u-t*l*d+t*a*f+r*o*d-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],m=e[11],g=e[12],v=e[13],p=e[14],h=e[15],x=d*p*c-v*f*c+v*l*m-a*p*m-d*l*h+a*f*h,M=g*f*c-u*p*c-g*l*m+o*p*m+u*l*h-o*f*h,_=u*v*c-g*d*c+g*a*m-o*v*m-u*a*h+o*d*h,b=g*d*l-u*v*l-g*a*f+o*v*f+u*a*p-o*d*p,w=t*x+i*M+r*_+s*b;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return e[0]=x*P,e[1]=(v*f*s-d*p*s-v*r*m+i*p*m+d*r*h-i*f*h)*P,e[2]=(a*p*s-v*l*s+v*r*c-i*p*c-a*r*h+i*l*h)*P,e[3]=(d*l*s-a*f*s-d*r*c+i*f*c+a*r*m-i*l*m)*P,e[4]=M*P,e[5]=(u*p*s-g*f*s+g*r*m-t*p*m-u*r*h+t*f*h)*P,e[6]=(g*l*s-o*p*s-g*r*c+t*p*c+o*r*h-t*l*h)*P,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*m+t*l*m)*P,e[8]=_*P,e[9]=(g*d*s-u*v*s-g*i*m+t*v*m+u*i*h-t*d*h)*P,e[10]=(o*v*s-g*a*s+g*i*c-t*v*c-o*i*h+t*a*h)*P,e[11]=(u*a*s-o*d*s-u*i*c+t*d*c+o*i*m-t*a*m)*P,e[12]=b*P,e[13]=(u*v*r-g*d*r+g*i*f-t*v*f-u*i*p+t*d*p)*P,e[14]=(g*a*r-o*v*r-g*i*l+t*v*l+o*i*p-t*a*p)*P,e[15]=(o*d*r-u*a*r+u*i*l-t*d*l-o*i*f+t*a*f)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,m=s*u,g=s*d,v=o*u,p=o*d,h=a*d,x=l*c,M=l*u,_=l*d,b=i.x,w=i.y,P=i.z;return r[0]=(1-(v+h))*b,r[1]=(m+_)*b,r[2]=(g-M)*b,r[3]=0,r[4]=(m-_)*w,r[5]=(1-(f+h))*w,r[6]=(p+x)*w,r[7]=0,r[8]=(g+M)*P,r[9]=(p-x)*P,r[10]=(1-(f+v))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Oi.set(r[0],r[1],r[2]).length();const o=Oi.set(r[4],r[5],r[6]).length(),a=Oi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],sn.copy(this);const c=1/s,u=1/o,d=1/a;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=d,sn.elements[9]*=d,sn.elements[10]*=d,t.setFromRotationMatrix(sn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=bn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),m=(i+r)/(i-r);let g,v;if(l)g=s/(o-s),v=o*s/(o-s);else if(a===bn)g=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===ro)g=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=bn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),m=-(i+r)/(i-r);let g,v;if(l)g=1/(o-s),v=o/(o-s);else if(a===bn)g=-2/(o-s),v=-(o+s)/(o-s);else if(a===ro)g=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Oi=new H,sn=new at,xf=new H(0,0,0),Mf=new H(1,1,1),qn=new H,Es=new H,qt=new H,al=new at,cl=new us;class wn{constructor(e=0,t=0,i=0,r=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return al.makeRotationFromQuaternion(e),this.setFromRotationMatrix(al,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cl.setFromEuler(this),this.setFromQuaternion(cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class Cc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sf=0;const ll=new H,Bi=new us,In=new at,bs=new H,Lr=new H,yf=new H,Ef=new us,ul=new H(1,0,0),dl=new H(0,1,0),hl=new H(0,0,1),fl={type:"added"},bf={type:"removed"},zi={type:"childadded",child:null},Fo={type:"childremoved",child:null};class Mt extends yr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new H,t=new wn,i=new us,r=new H(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new Ge}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.premultiply(Bi),this}rotateX(e){return this.rotateOnAxis(ul,e)}rotateY(e){return this.rotateOnAxis(dl,e)}rotateZ(e){return this.rotateOnAxis(hl,e)}translateOnAxis(e,t){return ll.copy(e).applyQuaternion(this.quaternion),this.position.add(ll.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ul,e)}translateY(e){return this.translateOnAxis(dl,e)}translateZ(e){return this.translateOnAxis(hl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?bs.copy(e):bs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(Lr,bs,this.up):In.lookAt(bs,Lr,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),Bi.setFromRotationMatrix(In),this.quaternion.premultiply(Bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fl),zi.child=e,this.dispatchEvent(zi),zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bf),Fo.child=e,this.dispatchEvent(Fo),Fo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fl),zi.child=e,this.dispatchEvent(zi),zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,e,yf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,Ef,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Mt.DEFAULT_UP=new H(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new H,Ln=new H,Oo=new H,Dn=new H,ki=new H,Hi=new H,pl=new H,Bo=new H,zo=new H,ko=new H,Ho=new gt,Vo=new gt,Go=new gt;class hn{constructor(e=new H,t=new H,i=new H){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),on.subVectors(e,t),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){on.subVectors(r,t),Ln.subVectors(i,t),Oo.subVectors(e,t);const o=on.dot(on),a=on.dot(Ln),l=on.dot(Oo),c=Ln.dot(Ln),u=Ln.dot(Oo),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,m=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Dn.x),l.addScaledVector(o,Dn.y),l.addScaledVector(a,Dn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Ho.setScalar(0),Vo.setScalar(0),Go.setScalar(0),Ho.fromBufferAttribute(e,t),Vo.fromBufferAttribute(e,i),Go.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Ho,s.x),o.addScaledVector(Vo,s.y),o.addScaledVector(Go,s.z),o}static isFrontFacing(e,t,i,r){return on.subVectors(i,t),Ln.subVectors(e,t),on.cross(Ln).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),on.cross(Ln).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;ki.subVectors(r,i),Hi.subVectors(s,i),Bo.subVectors(e,i);const l=ki.dot(Bo),c=Hi.dot(Bo);if(l<=0&&c<=0)return t.copy(i);zo.subVectors(e,r);const u=ki.dot(zo),d=Hi.dot(zo);if(u>=0&&d<=u)return t.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(ki,o);ko.subVectors(e,s);const m=ki.dot(ko),g=Hi.dot(ko);if(g>=0&&m<=g)return t.copy(s);const v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Hi,a);const p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return pl.subVectors(s,r),a=(d-u)/(d-u+(m-g)),t.copy(r).addScaledVector(pl,a);const h=1/(p+v+f);return o=v*h,a=f*h,t.copy(i).addScaledVector(ki,o).addScaledVector(Hi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Wo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=lf(e,1),t=$e(t,0,1),i=$e(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Wo(o,s,e+1/3),this.g=Wo(o,s,e),this.b=Wo(o,s,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=Zt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){const i=hd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}copyLinearToSRGB(e){return this.r=ur(e.r),this.g=ur(e.g),this.b=ur(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return et.workingToColorSpace(Ct.copy(this),e),Math.round($e(Ct.r*255,0,255))*65536+Math.round($e(Ct.g*255,0,255))*256+Math.round($e(Ct.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Ct.copy(this),t);const i=Ct.r,r=Ct.g,s=Ct.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Zt){et.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,i=Ct.g,r=Ct.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Yn),this.setHSL(Yn.h+e,Yn.s+t,Yn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Yn),e.getHSL(Ts);const i=Ao(Yn.h,Ts.h,t),r=Ao(Yn.s,Ts.s,t),s=Ao(Yn.l,Ts.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new qe;qe.NAMES=hd;let Tf=0;class br extends yr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=ls(),this.name="",this.type="Material",this.blending=cr,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_a,this.blendDst=va,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=el,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==cr&&(i.blending=this.blending),this.side!==ni&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_a&&(i.blendSrc=this.blendSrc),this.blendDst!==va&&(i.blendDst=this.blendDst),this.blendEquation!==_i&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==el&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Tn extends br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Ju,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new H,As=new Ze;let Af=0;class ut{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Af++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=tl,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)As.fromBufferAttribute(this,t),As.applyMatrix3(e),this.setXY(t,As.x,As.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Cr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tl&&(e.usage=this.usage),e}}class fd extends ut{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class pd extends ut{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends ut{constructor(e,t,i){super(new Float32Array(e),t,i)}}let wf=0;const Qt=new at,Xo=new Mt,Vi=new H,Yt=new ii,Dr=new ii,bt=new H;class _t extends yr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ud(e)?pd:fd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,i){return Qt.makeTranslation(e,t,i),this.applyMatrix4(Qt),this}scale(e,t,i){return Qt.makeScale(e,t,i),this.applyMatrix4(Qt),this}lookAt(e){return Xo.lookAt(e),Xo.updateMatrix(),this.applyMatrix4(Xo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Yt.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Dr.setFromBufferAttribute(a),this.morphTargetsRelative?(bt.addVectors(Yt.min,Dr.min),Yt.expandByPoint(bt),bt.addVectors(Yt.max,Dr.max),Yt.expandByPoint(bt)):(Yt.expandByPoint(Dr.min),Yt.expandByPoint(Dr.max))}Yt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(bt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)bt.fromBufferAttribute(a,c),l&&(Vi.fromBufferAttribute(e,c),bt.add(Vi)),r=Math.max(r,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ut(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<i.count;C++)a[C]=new H,l[C]=new H;const c=new H,u=new H,d=new H,f=new Ze,m=new Ze,g=new Ze,v=new H,p=new H;function h(C,E,y){c.fromBufferAttribute(i,C),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,y),f.fromBufferAttribute(s,C),m.fromBufferAttribute(s,E),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),m.sub(f),g.sub(f);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(R),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(R),a[C].add(v),a[E].add(v),a[y].add(v),l[C].add(p),l[E].add(p),l[y].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,E=x.length;C<E;++C){const y=x[C],R=y.start,D=y.count;for(let L=R,U=R+D;L<U;L+=3)h(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const M=new H,_=new H,b=new H,w=new H;function P(C){b.fromBufferAttribute(r,C),w.copy(b);const E=a[C];M.copy(E),M.sub(b.multiplyScalar(b.dot(E))).normalize(),_.crossVectors(w,E);const R=_.dot(l[C])<0?-1:1;o.setXYZW(C,M.x,M.y,M.z,R)}for(let C=0,E=x.length;C<E;++C){const y=x[C],R=y.start,D=y.count;for(let L=R,U=R+D;L<U;L+=3)P(e.getX(L+0)),P(e.getX(L+1)),P(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new H,s=new H,o=new H,a=new H,l=new H,c=new H,u=new H,d=new H;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),v=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let m=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*u;for(let h=0;h<u;h++)f[g++]=c[m++]}return new ut(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _t,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],m=e(f,i);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,m=d.length;f<m;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ml=new at,ci=new Rc,ws=new Er,gl=new H,Rs=new H,Cs=new H,Ps=new H,qo=new H,Is=new H,_l=new H,Ls=new H;class Ve extends Mt{constructor(e=new _t,t=new Tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Is.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(qo.fromBufferAttribute(d,e),o?Is.addScaledVector(qo,u):Is.addScaledVector(qo.sub(t),u))}t.add(Is)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ws.copy(i.boundingSphere),ws.applyMatrix4(s),ci.copy(e.ray).recast(e.near),!(ws.containsPoint(ci.origin)===!1&&(ci.intersectSphere(ws,gl)===null||ci.origin.distanceToSquared(gl)>(e.far-e.near)**2))&&(ml.copy(s).invert(),ci.copy(e.ray).applyMatrix4(ml),!(i.boundingBox!==null&&ci.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],h=o[p.materialIndex],x=Math.max(p.start,m.start),M=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let _=x,b=M;_<b;_+=3){const w=a.getX(_),P=a.getX(_+1),C=a.getX(_+2);r=Ds(this,h,e,i,c,u,d,w,P,C),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=g,h=v;p<h;p+=3){const x=a.getX(p),M=a.getX(p+1),_=a.getX(p+2);r=Ds(this,o,e,i,c,u,d,x,M,_),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],h=o[p.materialIndex],x=Math.max(p.start,m.start),M=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let _=x,b=M;_<b;_+=3){const w=_,P=_+1,C=_+2;r=Ds(this,h,e,i,c,u,d,w,P,C),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,h=v;p<h;p+=3){const x=p,M=p+1,_=p+2;r=Ds(this,o,e,i,c,u,d,x,M,_),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Rf(n,e,t,i,r,s,o,a){let l;if(e.side===Gt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===ni,a),l===null)return null;Ls.copy(a),Ls.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ls);return c<t.near||c>t.far?null:{distance:c,point:Ls.clone(),object:n}}function Ds(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Rs),n.getVertexPosition(l,Cs),n.getVertexPosition(c,Ps);const u=Rf(n,e,t,i,Rs,Cs,Ps,_l);if(u){const d=new H;hn.getBarycoord(_l,Rs,Cs,Ps,d),r&&(u.uv=hn.getInterpolatedAttribute(r,a,l,c,d,new Ze)),s&&(u.uv1=hn.getInterpolatedAttribute(s,a,l,c,d,new Ze)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,l,c,d,new H),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new H,materialIndex:0};hn.getNormal(Rs,Cs,Ps,f.normal),u.face=f,u.barycoord=d}return u}class Ci extends _t{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(d,2));function g(v,p,h,x,M,_,b,w,P,C,E){const y=_/P,R=b/C,D=_/2,L=b/2,U=w/2,B=P+1,F=C+1;let q=0,V=0;const re=new H;for(let O=0;O<F;O++){const J=O*R-L;for(let ee=0;ee<B;ee++){const we=ee*y-D;re[v]=we*x,re[p]=J*M,re[h]=U,c.push(re.x,re.y,re.z),re[v]=0,re[p]=0,re[h]=w>0?1:-1,u.push(re.x,re.y,re.z),d.push(ee/P),d.push(1-O/C),q+=1}}for(let O=0;O<C;O++)for(let J=0;J<P;J++){const ee=f+J+B*O,we=f+J+B*(O+1),Pe=f+(J+1)+B*(O+1),k=f+(J+1)+B*O;l.push(ee,we,k),l.push(we,Pe,k),V+=6}a.addGroup(m,V,E),m+=V,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=vr(n[t]);for(const r in i)e[r]=i[r]}return e}function Cf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function md(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Pf={clone:vr,merge:Nt};var If=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hn extends br{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=If,this.fragmentShader=Lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vr(e.uniforms),this.uniformsGroups=Cf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class gd extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new H,vl=new Ze,xl=new Ze;class ln extends gd{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=nc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(To*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nc*2*Math.atan(Math.tan(To*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z)}getViewSize(e,t){return this.getViewBounds(e,vl,xl),t.subVectors(xl,vl)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(To*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gi=-90,Wi=1;class Df extends Mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ln(Gi,Wi,e,t);r.layers=this.layers,this.add(r);const s=new ln(Gi,Wi,e,t);s.layers=this.layers,this.add(s);const o=new ln(Gi,Wi,e,t);o.layers=this.layers,this.add(o);const a=new ln(Gi,Wi,e,t);a.layers=this.layers,this.add(a);const l=new ln(Gi,Wi,e,t);l.layers=this.layers,this.add(l);const c=new ln(Gi,Wi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===bn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ro)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class _d extends Ft{constructor(e=[],t=mr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Uf extends Ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new _d(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ci(5,5,5),s=new Hn({name:"CubemapFromEquirect",uniforms:vr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:ei});s.uniforms.tEquirect.value=t;const o=new Ve(r,s),a=t.minFilter;return t.minFilter===Si&&(t.minFilter=yn),new Df(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class Jn extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nf={type:"move"};class Yo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),h=this._getHandJoint(c,v);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Nf)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Jn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Pc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new qe(e),this.near=t,this.far=i}clone(){return new Pc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ff extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Of extends Ft{constructor(e=null,t=1,i=1,r,s,o,a,l,c=Kt,u=Kt,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ic extends ut{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xi=new at,Ml=new at,Us=[],Sl=new ii,Bf=new at,Ur=new Ve,Nr=new Er;class vd extends Ve{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ic(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Bf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ii),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xi),Sl.copy(e.boundingBox).applyMatrix4(Xi),this.boundingBox.union(Sl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Er),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Xi),Nr.copy(e.boundingSphere).applyMatrix4(Xi),this.boundingSphere.union(Nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Ur.geometry=this.geometry,Ur.material=this.material,Ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nr.copy(this.boundingSphere),Nr.applyMatrix4(i),e.ray.intersectsSphere(Nr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Xi),Ml.multiplyMatrices(i,Xi),Ur.matrixWorld=Ml,Ur.raycast(e,Us);for(let o=0,a=Us.length;o<a;o++){const l=Us[o];l.instanceId=s,l.object=this,t.push(l)}Us.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ic(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Of(new Float32Array(r*this.count),r,this.count,Ec,En));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Zo=new H,zf=new H,kf=new Ge;class mi{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Zo.subVectors(i,t).cross(zf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Zo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||kf.getNormalMatrix(e),r=this.coplanarPoint(Zo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new Er,Hf=new Ze(.5,.5),Ns=new H;class Ic{constructor(e=new mi,t=new mi,i=new mi,r=new mi,s=new mi,o=new mi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=bn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],m=s[7],g=s[8],v=s[9],p=s[10],h=s[11],x=s[12],M=s[13],_=s[14],b=s[15];if(r[0].setComponents(c-o,m-u,h-g,b-x).normalize(),r[1].setComponents(c+o,m+u,h+g,b+x).normalize(),r[2].setComponents(c+a,m+d,h+v,b+M).normalize(),r[3].setComponents(c-a,m-d,h-v,b-M).normalize(),i)r[4].setComponents(l,f,p,_).normalize(),r[5].setComponents(c-l,m-f,h-p,b-_).normalize();else if(r[4].setComponents(c-l,m-f,h-p,b-_).normalize(),t===bn)r[5].setComponents(c+l,m+f,h+p,b+_).normalize();else if(t===ro)r[5].setComponents(l,f,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(e){li.center.set(0,0,0);const t=Hf.distanceTo(e.center);return li.radius=.7071067811865476+t,li.applyMatrix4(e.matrixWorld),this.intersectsSphere(li)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ns.x=r.normal.x>0?e.max.x:e.min.x,Ns.y=r.normal.y>0?e.max.y:e.min.y,Ns.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xd extends br{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const oo=new H,ao=new H,yl=new at,Fr=new Rc,Fs=new Er,$o=new H,El=new H;class Vf extends Mt{constructor(e=new _t,t=new xd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)oo.fromBufferAttribute(t,r-1),ao.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=oo.distanceTo(ao);e.setAttribute("lineDistance",new dt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fs.copy(i.boundingSphere),Fs.applyMatrix4(r),Fs.radius+=s,e.ray.intersectsSphere(Fs)===!1)return;yl.copy(r).invert(),Fr.copy(e.ray).applyMatrix4(yl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const m=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=m,p=g-1;v<p;v+=c){const h=u.getX(v),x=u.getX(v+1),M=Os(this,e,Fr,l,h,x,v);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(g-1),p=u.getX(m),h=Os(this,e,Fr,l,v,p,g-1);h&&t.push(h)}}else{const m=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=m,p=g-1;v<p;v+=c){const h=Os(this,e,Fr,l,v,v+1,v);h&&t.push(h)}if(this.isLineLoop){const v=Os(this,e,Fr,l,g-1,m,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Os(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(oo.fromBufferAttribute(a,r),ao.fromBufferAttribute(a,s),t.distanceSqToSegment(oo,ao,$o,El)>i)return;$o.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo($o);if(!(c<e.near||c>e.far))return{distance:c,point:El.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class Md extends Ft{constructor(e,t,i=wi,r,s,o,a=Kt,l=Kt,c,u=ss,d=1){if(u!==ss&&u!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Lc extends _t{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new H,u=new Ze;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const m=i+d/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(a,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class nn extends _t{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],m=[];let g=0;const v=[],p=i/2;let h=0;x(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new dt(d,3)),this.setAttribute("normal",new dt(f,3)),this.setAttribute("uv",new dt(m,2));function x(){const _=new H,b=new H;let w=0;const P=(t-e)/i;for(let C=0;C<=s;C++){const E=[],y=C/s,R=y*(t-e)+e;for(let D=0;D<=r;D++){const L=D/r,U=L*l+a,B=Math.sin(U),F=Math.cos(U);b.x=R*B,b.y=-y*i+p,b.z=R*F,d.push(b.x,b.y,b.z),_.set(B,P,F).normalize(),f.push(_.x,_.y,_.z),m.push(L,1-y),E.push(g++)}v.push(E)}for(let C=0;C<r;C++)for(let E=0;E<s;E++){const y=v[E][C],R=v[E+1][C],D=v[E+1][C+1],L=v[E][C+1];(e>0||E!==0)&&(u.push(y,R,L),w+=3),(t>0||E!==s-1)&&(u.push(R,D,L),w+=3)}c.addGroup(h,w,0),h+=w}function M(_){const b=g,w=new Ze,P=new H;let C=0;const E=_===!0?e:t,y=_===!0?1:-1;for(let D=1;D<=r;D++)d.push(0,p*y,0),f.push(0,y,0),m.push(.5,.5),g++;const R=g;for(let D=0;D<=r;D++){const U=D/r*l+a,B=Math.cos(U),F=Math.sin(U);P.x=E*F,P.y=p*y,P.z=E*B,d.push(P.x,P.y,P.z),f.push(0,y,0),w.x=B*.5+.5,w.y=F*.5*y+.5,m.push(w.x,w.y),g++}for(let D=0;D<r;D++){const L=b+D,U=R+D;_===!0?u.push(U,U+1,L):u.push(U+1,U,L),C+=3}c.addGroup(h,C,_===!0?1:2),h+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ai extends nn{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ai(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ho extends _t{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(s.slice(),3)),this.setAttribute("uv",new dt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const M=new H,_=new H,b=new H;for(let w=0;w<t.length;w+=3)m(t[w+0],M),m(t[w+1],_),m(t[w+2],b),l(M,_,b,x)}function l(x,M,_,b){const w=b+1,P=[];for(let C=0;C<=w;C++){P[C]=[];const E=x.clone().lerp(_,C/w),y=M.clone().lerp(_,C/w),R=w-C;for(let D=0;D<=R;D++)D===0&&C===w?P[C][D]=E:P[C][D]=E.clone().lerp(y,D/R)}for(let C=0;C<w;C++)for(let E=0;E<2*(w-C)-1;E++){const y=Math.floor(E/2);E%2===0?(f(P[C][y+1]),f(P[C+1][y]),f(P[C][y])):(f(P[C][y+1]),f(P[C+1][y+1]),f(P[C+1][y]))}}function c(x){const M=new H;for(let _=0;_<s.length;_+=3)M.x=s[_+0],M.y=s[_+1],M.z=s[_+2],M.normalize().multiplyScalar(x),s[_+0]=M.x,s[_+1]=M.y,s[_+2]=M.z}function u(){const x=new H;for(let M=0;M<s.length;M+=3){x.x=s[M+0],x.y=s[M+1],x.z=s[M+2];const _=p(x)/2/Math.PI+.5,b=h(x)/Math.PI+.5;o.push(_,1-b)}g(),d()}function d(){for(let x=0;x<o.length;x+=6){const M=o[x+0],_=o[x+2],b=o[x+4],w=Math.max(M,_,b),P=Math.min(M,_,b);w>.9&&P<.1&&(M<.2&&(o[x+0]+=1),_<.2&&(o[x+2]+=1),b<.2&&(o[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function m(x,M){const _=x*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function g(){const x=new H,M=new H,_=new H,b=new H,w=new Ze,P=new Ze,C=new Ze;for(let E=0,y=0;E<s.length;E+=9,y+=6){x.set(s[E+0],s[E+1],s[E+2]),M.set(s[E+3],s[E+4],s[E+5]),_.set(s[E+6],s[E+7],s[E+8]),w.set(o[y+0],o[y+1]),P.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),b.copy(x).add(M).add(_).divideScalar(3);const R=p(b);v(w,y+0,x,R),v(P,y+2,M,R),v(C,y+4,_,R)}}function v(x,M,_,b){b<0&&x.x===1&&(o[M]=x.x-1),_.x===0&&_.z===0&&(o[M]=b/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function h(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.vertices,e.indices,e.radius,e.details)}}class Dc extends ho{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Dc(e.radius,e.detail)}}class fo extends ho{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new fo(e.radius,e.detail)}}class po extends _t{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=t/l,m=[],g=[],v=[],p=[];for(let h=0;h<u;h++){const x=h*f-o;for(let M=0;M<c;M++){const _=M*d-s;g.push(_,-x,0),v.push(0,0,1),p.push(M/a),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let x=0;x<a;x++){const M=x+c*h,_=x+c*(h+1),b=x+1+c*(h+1),w=x+1+c*h;m.push(M,_,w),m.push(_,b,w)}this.setIndex(m),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.width,e.height,e.widthSegments,e.heightSegments)}}class Uc extends _t{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new H,f=new H,m=[],g=[],v=[],p=[];for(let h=0;h<=i;h++){const x=[],M=h/i;let _=0;h===0&&o===0?_=.5/t:h===i&&l===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){const w=b/t;d.x=-e*Math.cos(r+w*s)*Math.sin(o+M*a),d.y=e*Math.cos(o+M*a),d.z=e*Math.sin(r+w*s)*Math.sin(o+M*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),p.push(w+_,1-M),x.push(c++)}u.push(x)}for(let h=0;h<i;h++)for(let x=0;x<t;x++){const M=u[h][x+1],_=u[h][x],b=u[h+1][x],w=u[h+1][x+1];(h!==0||o>0)&&m.push(M,_,w),(h!==i-1||l<Math.PI)&&m.push(_,b,w)}this.setIndex(m),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class en extends br{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cd,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Gf extends br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wf extends br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Xf extends xd{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Sd extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class qf extends Sd{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ko=new at,bl=new H,Tl=new H;class Yf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ic,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(bl),Tl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Tl),t.updateMatrixWorld(),Ko.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ko,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ko)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Nc extends gd{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zf extends Yf{constructor(){super(new Nc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Al extends Sd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Zf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class $f extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const wl=new at;class Kf{constructor(e,t,i=0,r=1/0){this.ray=new Rc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Cc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return wl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wl),this}intersectObject(e,t=!0,i=[]){return rc(e,this,i,t),i.sort(Rl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)rc(e[r],this,i,t);return i.sort(Rl),i}}function Rl(n,e){return n.distance-e.distance}function rc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)rc(s[o],e,t,!0)}}function Cl(n,e,t,i){const r=jf(i);switch(t){case rd:return n*e;case Ec:return n*e/r.components*r.byteLength;case bc:return n*e/r.components*r.byteLength;case od:return n*e*2/r.components*r.byteLength;case Tc:return n*e*2/r.components*r.byteLength;case sd:return n*e*3/r.components*r.byteLength;case fn:return n*e*4/r.components*r.byteLength;case Ac:return n*e*4/r.components*r.byteLength;case Ks:case js:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Js:case Qs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ia:case Da:return Math.max(n,16)*Math.max(e,8)/4;case Pa:case La:return Math.max(n,8)*Math.max(e,8)/2;case Ua:case Na:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case za:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ka:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Va:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Za:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case $a:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case eo:case ja:case Ja:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ad:case Qa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ec:case tc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jf(n){switch(n){case An:case td:return{byteLength:1,components:1};case is:case nd:case cs:return{byteLength:2,components:1};case Sc:case yc:return{byteLength:2,components:4};case wi:case Mc:case En:return{byteLength:4,components:1};case id:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc);function yd(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Jf(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<d.length;m++){const g=d[f],v=d[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,d[f]=v)}d.length=f+1;for(let m=0,g=d.length;m<g;m++){const v=d[m];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ep=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,np=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ap=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,yp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ep=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,bp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Xp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,qp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Jp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,em=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,im=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,am=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,um=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_m=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ym=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Am=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Rm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Om=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,km=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ym=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ig=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,og=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ag=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_g=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Mg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Eg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Pg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Qf,alphahash_pars_fragment:ep,alphamap_fragment:tp,alphamap_pars_fragment:np,alphatest_fragment:ip,alphatest_pars_fragment:rp,aomap_fragment:sp,aomap_pars_fragment:op,batching_pars_vertex:ap,batching_vertex:cp,begin_vertex:lp,beginnormal_vertex:up,bsdfs:dp,iridescence_fragment:hp,bumpmap_pars_fragment:fp,clipping_planes_fragment:pp,clipping_planes_pars_fragment:mp,clipping_planes_pars_vertex:gp,clipping_planes_vertex:_p,color_fragment:vp,color_pars_fragment:xp,color_pars_vertex:Mp,color_vertex:Sp,common:yp,cube_uv_reflection_fragment:Ep,defaultnormal_vertex:bp,displacementmap_pars_vertex:Tp,displacementmap_vertex:Ap,emissivemap_fragment:wp,emissivemap_pars_fragment:Rp,colorspace_fragment:Cp,colorspace_pars_fragment:Pp,envmap_fragment:Ip,envmap_common_pars_fragment:Lp,envmap_pars_fragment:Dp,envmap_pars_vertex:Up,envmap_physical_pars_fragment:Xp,envmap_vertex:Np,fog_vertex:Fp,fog_pars_vertex:Op,fog_fragment:Bp,fog_pars_fragment:zp,gradientmap_pars_fragment:kp,lightmap_pars_fragment:Hp,lights_lambert_fragment:Vp,lights_lambert_pars_fragment:Gp,lights_pars_begin:Wp,lights_toon_fragment:qp,lights_toon_pars_fragment:Yp,lights_phong_fragment:Zp,lights_phong_pars_fragment:$p,lights_physical_fragment:Kp,lights_physical_pars_fragment:jp,lights_fragment_begin:Jp,lights_fragment_maps:Qp,lights_fragment_end:em,logdepthbuf_fragment:tm,logdepthbuf_pars_fragment:nm,logdepthbuf_pars_vertex:im,logdepthbuf_vertex:rm,map_fragment:sm,map_pars_fragment:om,map_particle_fragment:am,map_particle_pars_fragment:cm,metalnessmap_fragment:lm,metalnessmap_pars_fragment:um,morphinstance_vertex:dm,morphcolor_vertex:hm,morphnormal_vertex:fm,morphtarget_pars_vertex:pm,morphtarget_vertex:mm,normal_fragment_begin:gm,normal_fragment_maps:_m,normal_pars_fragment:vm,normal_pars_vertex:xm,normal_vertex:Mm,normalmap_pars_fragment:Sm,clearcoat_normal_fragment_begin:ym,clearcoat_normal_fragment_maps:Em,clearcoat_pars_fragment:bm,iridescence_pars_fragment:Tm,opaque_fragment:Am,packing:wm,premultiplied_alpha_fragment:Rm,project_vertex:Cm,dithering_fragment:Pm,dithering_pars_fragment:Im,roughnessmap_fragment:Lm,roughnessmap_pars_fragment:Dm,shadowmap_pars_fragment:Um,shadowmap_pars_vertex:Nm,shadowmap_vertex:Fm,shadowmask_pars_fragment:Om,skinbase_vertex:Bm,skinning_pars_vertex:zm,skinning_vertex:km,skinnormal_vertex:Hm,specularmap_fragment:Vm,specularmap_pars_fragment:Gm,tonemapping_fragment:Wm,tonemapping_pars_fragment:Xm,transmission_fragment:qm,transmission_pars_fragment:Ym,uv_pars_fragment:Zm,uv_pars_vertex:$m,uv_vertex:Km,worldpos_vertex:jm,background_vert:Jm,background_frag:Qm,backgroundCube_vert:eg,backgroundCube_frag:tg,cube_vert:ng,cube_frag:ig,depth_vert:rg,depth_frag:sg,distanceRGBA_vert:og,distanceRGBA_frag:ag,equirect_vert:cg,equirect_frag:lg,linedashed_vert:ug,linedashed_frag:dg,meshbasic_vert:hg,meshbasic_frag:fg,meshlambert_vert:pg,meshlambert_frag:mg,meshmatcap_vert:gg,meshmatcap_frag:_g,meshnormal_vert:vg,meshnormal_frag:xg,meshphong_vert:Mg,meshphong_frag:Sg,meshphysical_vert:yg,meshphysical_frag:Eg,meshtoon_vert:bg,meshtoon_frag:Tg,points_vert:Ag,points_frag:wg,shadow_vert:Rg,shadow_frag:Cg,sprite_vert:Pg,sprite_frag:Ig},Me={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Mn={basic:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Nt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Nt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Nt([Me.points,Me.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Nt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Nt([Me.common,Me.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Nt([Me.sprite,Me.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Nt([Me.common,Me.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Nt([Me.lights,Me.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Mn.physical={uniforms:Nt([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Bs={r:0,b:0,g:0},ui=new wn,Lg=new at;function Dg(n,e,t,i,r,s,o){const a=new qe(0);let l=s===!0?0:1,c,u,d=null,f=0,m=null;function g(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?t:e).get(_)),_}function v(M){let _=!1;const b=g(M);b===null?h(a,l):b&&b.isColor&&(h(b,1),_=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(M,_){const b=g(_);b&&(b.isCubeTexture||b.mapping===uo)?(u===void 0&&(u=new Ve(new Ci(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:vr(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ui.copy(_.backgroundRotation),ui.x*=-1,ui.y*=-1,ui.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(ui)),u.material.toneMapped=et.getTransfer(b.colorSpace)!==it,(d!==b||f!==b.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,d=b,f=b.version,m=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Ve(new po(2,2),new Hn({name:"BackgroundMaterial",uniforms:vr(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=et.getTransfer(b.colorSpace)!==it,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||f!==b.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=b,f=b.version,m=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function h(M,_){M.getRGB(Bs,md(n)),i.buffers.color.setClear(Bs.r,Bs.g,Bs.b,_,o)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),l=_,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,h(a,l)},render:v,addToRenderList:p,dispose:x}}function Ug(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(y,R,D,L,U){let B=!1;const F=d(L,D,R);s!==F&&(s=F,c(s.object)),B=m(y,L,D,U),B&&g(y,L,D,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,_(y,R,D,L),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function d(y,R,D){const L=D.wireframe===!0;let U=i[y.id];U===void 0&&(U={},i[y.id]=U);let B=U[R.id];B===void 0&&(B={},U[R.id]=B);let F=B[L];return F===void 0&&(F=f(l()),B[L]=F),F}function f(y){const R=[],D=[],L=[];for(let U=0;U<t;U++)R[U]=0,D[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:D,attributeDivisors:L,object:y,attributes:{},index:null}}function m(y,R,D,L){const U=s.attributes,B=R.attributes;let F=0;const q=D.getAttributes();for(const V in q)if(q[V].location>=0){const O=U[V];let J=B[V];if(J===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(J=y.instanceColor)),O===void 0||O.attribute!==J||J&&O.data!==J.data)return!0;F++}return s.attributesNum!==F||s.index!==L}function g(y,R,D,L){const U={},B=R.attributes;let F=0;const q=D.getAttributes();for(const V in q)if(q[V].location>=0){let O=B[V];O===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(O=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(O=y.instanceColor));const J={};J.attribute=O,O&&O.data&&(J.data=O.data),U[V]=J,F++}s.attributes=U,s.attributesNum=F,s.index=L}function v(){const y=s.newAttributes;for(let R=0,D=y.length;R<D;R++)y[R]=0}function p(y){h(y,0)}function h(y,R){const D=s.newAttributes,L=s.enabledAttributes,U=s.attributeDivisors;D[y]=1,L[y]===0&&(n.enableVertexAttribArray(y),L[y]=1),U[y]!==R&&(n.vertexAttribDivisor(y,R),U[y]=R)}function x(){const y=s.newAttributes,R=s.enabledAttributes;for(let D=0,L=R.length;D<L;D++)R[D]!==y[D]&&(n.disableVertexAttribArray(D),R[D]=0)}function M(y,R,D,L,U,B,F){F===!0?n.vertexAttribIPointer(y,R,D,U,B):n.vertexAttribPointer(y,R,D,L,U,B)}function _(y,R,D,L){v();const U=L.attributes,B=D.getAttributes(),F=R.defaultAttributeValues;for(const q in B){const V=B[q];if(V.location>=0){let re=U[q];if(re===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(re=y.instanceColor)),re!==void 0){const O=re.normalized,J=re.itemSize,ee=e.get(re);if(ee===void 0)continue;const we=ee.buffer,Pe=ee.type,k=ee.bytesPerElement,se=Pe===n.INT||Pe===n.UNSIGNED_INT||re.gpuType===Mc;if(re.isInterleavedBufferAttribute){const ae=re.data,Ee=ae.stride,Ie=re.offset;if(ae.isInstancedInterleavedBuffer){for(let X=0;X<V.locationSize;X++)h(V.location+X,ae.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let X=0;X<V.locationSize;X++)p(V.location+X);n.bindBuffer(n.ARRAY_BUFFER,we);for(let X=0;X<V.locationSize;X++)M(V.location+X,J/V.locationSize,Pe,O,Ee*k,(Ie+J/V.locationSize*X)*k,se)}else{if(re.isInstancedBufferAttribute){for(let ae=0;ae<V.locationSize;ae++)h(V.location+ae,re.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ae=0;ae<V.locationSize;ae++)p(V.location+ae);n.bindBuffer(n.ARRAY_BUFFER,we);for(let ae=0;ae<V.locationSize;ae++)M(V.location+ae,J/V.locationSize,Pe,O,J*k,J/V.locationSize*ae*k,se)}}else if(F!==void 0){const O=F[q];if(O!==void 0)switch(O.length){case 2:n.vertexAttrib2fv(V.location,O);break;case 3:n.vertexAttrib3fv(V.location,O);break;case 4:n.vertexAttrib4fv(V.location,O);break;default:n.vertexAttrib1fv(V.location,O)}}}}x()}function b(){C();for(const y in i){const R=i[y];for(const D in R){const L=R[D];for(const U in L)u(L[U].object),delete L[U];delete R[D]}delete i[y]}}function w(y){if(i[y.id]===void 0)return;const R=i[y.id];for(const D in R){const L=R[D];for(const U in L)u(L[U].object),delete L[U];delete R[D]}delete i[y.id]}function P(y){for(const R in i){const D=i[R];if(D[y.id]===void 0)continue;const L=D[y.id];for(const U in L)u(L[U].object),delete L[U];delete D[y.id]}}function C(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:E,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function Ng(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];t.update(m,i,1)}function l(c,u,d,f){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v]*f[v];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Fg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==fn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const C=P===cs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==An&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==En&&!C)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:b,maxSamples:w}}function Og(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new mi,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||i!==0||r;return r=f,i=d.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,h=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{const x=s?0:i,M=x*4;let _=h.clippingState||null;l.value=_,_=u(g,f,M,m);for(let b=0;b!==M;++b)_[b]=t[b];h.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,m,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const h=m+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<h)&&(p=new Float32Array(h));for(let M=0,_=m;M!==v;++M,_+=4)o.copy(d[M]).applyMatrix4(x,a),o.normal.toArray(p,_),p[_+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function Bg(n){let e=new WeakMap;function t(o,a){return a===Aa?o.mapping=mr:a===wa&&(o.mapping=gr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Aa||a===wa)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Uf(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ir=4,Pl=[.125,.215,.35,.446,.526,.582],vi=20,jo=new Nc,Il=new qe;let Jo=null,Qo=0,ea=0,ta=!1;const gi=(1+Math.sqrt(5))/2,qi=1/gi,Ll=[new H(-gi,qi,0),new H(gi,qi,0),new H(-qi,0,gi),new H(qi,0,gi),new H(0,gi,-qi),new H(0,gi,qi),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)],zg=new H;class Dl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=zg}=s;Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel(),ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jo,Qo,ea),this._renderer.xr.enabled=ta,e.scissorTest=!1,zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mr||e.mapping===gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel(),ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:cs,format:fn,colorSpace:_r,depthBuffer:!1},r=Ul(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ul(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kg(s)),this._blurMaterial=Hg(s,e,t)}return r}_compileMaterial(e){const t=new Ve(this._lodPlanes[0],e);this._renderer.compile(t,jo)}_sceneToCubeUV(e,t,i,r,s){const l=new ln(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,m=d.toneMapping;d.getClearColor(Il),d.toneMapping=ti,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null));const v=new Tn({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),p=new Ve(new Ci,v);let h=!1;const x=e.background;x?x.isColor&&(v.color.copy(x),e.background=null,h=!0):(v.color.copy(Il),h=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const b=this._cubeSize;zs(r,_*b,M>2?b:0,b,b),d.setRenderTarget(r),h&&d.render(p,l),d.render(e,l)}p.geometry.dispose(),p.material.dispose(),d.toneMapping=m,d.autoClear=f,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===mr||e.mapping===gr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ve(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;zs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,jo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ll[(r-s-1)%Ll.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ve(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*vi-1),v=s/g,p=isFinite(s)?1+Math.floor(u*v):vi;p>vi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${vi}`);const h=[];let x=0;for(let P=0;P<vi;++P){const C=P/v,E=Math.exp(-C*C/2);h.push(E),P===0?x+=E:P<p&&(x+=2*E)}for(let P=0;P<h.length;P++)h[P]=h[P]/x;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const _=this._sizeLods[r],b=3*_*(r>M-ir?r-M+ir:0),w=4*(this._cubeSize-_);zs(t,b,w,3*_,2*_),l.setRenderTarget(t),l.render(d,jo)}}function kg(n){const e=[],t=[],i=[];let r=n;const s=n-ir+1+Pl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ir?l=Pl[o-n+ir-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,v=3,p=2,h=1,x=new Float32Array(v*g*m),M=new Float32Array(p*g*m),_=new Float32Array(h*g*m);for(let w=0;w<m;w++){const P=w%3*2/3-1,C=w>2?0:-1,E=[P,C,0,P+2/3,C,0,P+2/3,C+1,0,P,C,0,P+2/3,C+1,0,P,C+1,0];x.set(E,v*g*w),M.set(f,p*g*w);const y=[w,w,w,w,w,w];_.set(y,h*g*w)}const b=new _t;b.setAttribute("position",new ut(x,v)),b.setAttribute("uv",new ut(M,p)),b.setAttribute("faceIndex",new ut(_,h)),e.push(b),r>ir&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Ul(n,e,t){const i=new Ri(n,e,t);return i.texture.mapping=uo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Hg(n,e,t){const i=new Float32Array(vi),r=new H(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Nl(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Fl(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Fc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vg(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Aa||l===wa,u=l===mr||l===gr;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Dl(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return c&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new Dl(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Gg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&lr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Wg(n,e,t,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const m in f)e.update(f[m],n.ARRAY_BUFFER)}function c(d){const f=[],m=d.index,g=d.attributes.position;let v=0;if(m!==null){const x=m.array;v=m.version;for(let M=0,_=x.length;M<_;M+=3){const b=x[M+0],w=x[M+1],P=x[M+2];f.push(b,w,w,P,P,b)}}else if(g!==void 0){const x=g.array;v=g.version;for(let M=0,_=x.length/3-1;M<_;M+=3){const b=M+0,w=M+1,P=M+2;f.push(b,w,w,P,P,b)}}else return;const p=new(ud(f)?pd:fd)(f,1);p.version=v;const h=s.get(d);h&&e.remove(h),s.set(d,p)}function u(d){const f=s.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Xg(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,m){n.drawElements(i,m,s,f*o),t.update(m,i,1)}function c(f,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,f*o,g),t.update(m,i,g))}function u(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,f,0,g);let p=0;for(let h=0;h<g;h++)p+=m[h];t.update(p,i,1)}function d(f,m,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<f.length;h++)c(f[h]/o,m[h],v[h]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,f,0,v,0,g);let h=0;for(let x=0;x<g;x++)h+=m[x]*v[x];t.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function qg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Yg(n,e,t){const i=new WeakMap,r=new gt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let y=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var m=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),p===!0&&(_=3);let b=a.attributes.position.count*_,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const P=new Float32Array(b*w*4*d),C=new dd(P,b,w,d);C.type=En,C.needsUpdate=!0;const E=_*4;for(let R=0;R<d;R++){const D=h[R],L=x[R],U=M[R],B=b*w*4*R;for(let F=0;F<D.count;F++){const q=F*E;g===!0&&(r.fromBufferAttribute(D,F),P[B+q+0]=r.x,P[B+q+1]=r.y,P[B+q+2]=r.z,P[B+q+3]=0),v===!0&&(r.fromBufferAttribute(L,F),P[B+q+4]=r.x,P[B+q+5]=r.y,P[B+q+6]=r.z,P[B+q+7]=0),p===!0&&(r.fromBufferAttribute(U,F),P[B+q+8]=r.x,P[B+q+9]=r.y,P[B+q+10]=r.z,P[B+q+11]=U.itemSize===4?r.w:1)}}f={count:d,texture:C,size:new Ze(b,w)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Zg(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Ed=new Ft,Ol=new Md(1,1),bd=new dd,Td=new _f,Ad=new _d,Bl=[],zl=[],kl=new Float32Array(16),Hl=new Float32Array(9),Vl=new Float32Array(4);function Tr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Bl[r];if(s===void 0&&(s=new Float32Array(r),Bl[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Et(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function mo(n,e){let t=zl[e];t===void 0&&(t=new Int32Array(e),zl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $g(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2fv(this.addr,e),Et(t,e)}}function jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;n.uniform3fv(this.addr,e),Et(t,e)}}function Jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4fv(this.addr,e),Et(t,e)}}function Qg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;Vl.set(i),n.uniformMatrix2fv(this.addr,!1,Vl),Et(t,i)}}function e0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;Hl.set(i),n.uniformMatrix3fv(this.addr,!1,Hl),Et(t,i)}}function t0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(yt(t,i))return;kl.set(i),n.uniformMatrix4fv(this.addr,!1,kl),Et(t,i)}}function n0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function i0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2iv(this.addr,e),Et(t,e)}}function r0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3iv(this.addr,e),Et(t,e)}}function s0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4iv(this.addr,e),Et(t,e)}}function o0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function a0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2uiv(this.addr,e),Et(t,e)}}function c0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;n.uniform3uiv(this.addr,e),Et(t,e)}}function l0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4uiv(this.addr,e),Et(t,e)}}function u0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ol.compareFunction=ld,s=Ol):s=Ed,t.setTexture2D(e||s,r)}function d0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Td,r)}function h0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ad,r)}function f0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||bd,r)}function p0(n){switch(n){case 5126:return $g;case 35664:return Kg;case 35665:return jg;case 35666:return Jg;case 35674:return Qg;case 35675:return e0;case 35676:return t0;case 5124:case 35670:return n0;case 35667:case 35671:return i0;case 35668:case 35672:return r0;case 35669:case 35673:return s0;case 5125:return o0;case 36294:return a0;case 36295:return c0;case 36296:return l0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return d0;case 35680:case 36300:case 36308:case 36293:return h0;case 36289:case 36303:case 36311:case 36292:return f0}}function m0(n,e){n.uniform1fv(this.addr,e)}function g0(n,e){const t=Tr(e,this.size,2);n.uniform2fv(this.addr,t)}function _0(n,e){const t=Tr(e,this.size,3);n.uniform3fv(this.addr,t)}function v0(n,e){const t=Tr(e,this.size,4);n.uniform4fv(this.addr,t)}function x0(n,e){const t=Tr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function M0(n,e){const t=Tr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function S0(n,e){const t=Tr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function y0(n,e){n.uniform1iv(this.addr,e)}function E0(n,e){n.uniform2iv(this.addr,e)}function b0(n,e){n.uniform3iv(this.addr,e)}function T0(n,e){n.uniform4iv(this.addr,e)}function A0(n,e){n.uniform1uiv(this.addr,e)}function w0(n,e){n.uniform2uiv(this.addr,e)}function R0(n,e){n.uniform3uiv(this.addr,e)}function C0(n,e){n.uniform4uiv(this.addr,e)}function P0(n,e,t){const i=this.cache,r=e.length,s=mo(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Ed,s[o])}function I0(n,e,t){const i=this.cache,r=e.length,s=mo(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Td,s[o])}function L0(n,e,t){const i=this.cache,r=e.length,s=mo(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Ad,s[o])}function D0(n,e,t){const i=this.cache,r=e.length,s=mo(t,r);yt(i,s)||(n.uniform1iv(this.addr,s),Et(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||bd,s[o])}function U0(n){switch(n){case 5126:return m0;case 35664:return g0;case 35665:return _0;case 35666:return v0;case 35674:return x0;case 35675:return M0;case 35676:return S0;case 5124:case 35670:return y0;case 35667:case 35671:return E0;case 35668:case 35672:return b0;case 35669:case 35673:return T0;case 5125:return A0;case 36294:return w0;case 36295:return R0;case 36296:return C0;case 35678:case 36198:case 36298:case 36306:case 35682:return P0;case 35679:case 36299:case 36307:return I0;case 35680:case 36300:case 36308:case 36293:return L0;case 36289:case 36303:case 36311:case 36292:return D0}}class N0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=p0(t.type)}}class F0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=U0(t.type)}}class O0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const na=/(\w+)(\])?(\[|\.)?/g;function Gl(n,e){n.seq.push(e),n.map[e.id]=e}function B0(n,e,t){const i=n.name,r=i.length;for(na.lastIndex=0;;){const s=na.exec(i),o=na.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Gl(t,c===void 0?new N0(a,n,e):new F0(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new O0(a),Gl(t,d)),t=d}}}class to{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);B0(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Wl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const z0=37297;let k0=0;function H0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Xl=new Ge;function V0(n){et._getMatrix(Xl,et.workingColorSpace,n);const e=`mat3( ${Xl.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case io:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ql(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+H0(n.getShaderSource(e),a)}else return s}function G0(n,e){const t=V0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function W0(n,e){let t;switch(e){case Xh:t="Linear";break;case qh:t="Reinhard";break;case Yh:t="Cineon";break;case Qu:t="ACESFilmic";break;case $h:t="AgX";break;case Kh:t="Neutral";break;case Zh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ks=new H;function X0(){et.getLuminanceCoefficients(ks);const n=ks.x.toFixed(4),e=ks.y.toFixed(4),t=ks.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function q0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function Y0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Z0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Vr(n){return n!==""}function Yl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $0=/^[ \t]*#include +<([\w\d./]+)>/gm;function sc(n){return n.replace($0,j0)}const K0=new Map;function j0(n,e){let t=We[e];if(t===void 0){const i=K0.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return sc(t)}const J0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(n){return n.replace(J0,Q0)}function Q0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Kl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function e_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ju?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===bh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Fn&&(e="SHADOWMAP_TYPE_VSM"),e}function t_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case mr:case gr:e="ENVMAP_TYPE_CUBE";break;case uo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function n_(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===gr&&(e="ENVMAP_MODE_REFRACTION"),e}function i_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ju:e="ENVMAP_BLENDING_MULTIPLY";break;case Gh:e="ENVMAP_BLENDING_MIX";break;case Wh:e="ENVMAP_BLENDING_ADD";break}return e}function r_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function s_(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=e_(t),c=t_(t),u=n_(t),d=i_(t),f=r_(t),m=q0(t),g=Y0(s),v=r.createProgram();let p,h,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),h.length>0&&(h+=`
`)):(p=[Kl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),h=[Kl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?We.tonemapping_pars_fragment:"",t.toneMapping!==ti?W0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,G0("linearToOutputTexel",t.outputColorSpace),X0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),o=sc(o),o=Yl(o,t),o=Zl(o,t),a=sc(a),a=Yl(a,t),a=Zl(a,t),o=$l(o),a=$l(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=x+p+o,_=x+h+a,b=Wl(r,r.VERTEX_SHADER,M),w=Wl(r,r.FRAGMENT_SHADER,_);r.attachShader(v,b),r.attachShader(v,w),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function P(R){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(v)||"",L=r.getShaderInfoLog(b)||"",U=r.getShaderInfoLog(w)||"",B=D.trim(),F=L.trim(),q=U.trim();let V=!0,re=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,b,w);else{const O=ql(r,b,"vertex"),J=ql(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+O+`
`+J)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||q==="")&&(re=!1);re&&(R.diagnostics={runnable:V,programLog:B,vertexShader:{log:F,prefix:p},fragmentShader:{log:q,prefix:h}})}r.deleteShader(b),r.deleteShader(w),C=new to(r,v),E=Z0(r,v)}let C;this.getUniforms=function(){return C===void 0&&P(this),C};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(v,z0)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=k0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=w,this}let o_=0;class a_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new c_(e),t.set(e,i)),i}}class c_{constructor(e){this.id=o_++,this.code=e,this.usedTimes=0}}function l_(n,e,t,i,r,s,o){const a=new Cc,l=new a_,c=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return c.add(E),E===0?"uv":`uv${E}`}function p(E,y,R,D,L){const U=D.fog,B=L.geometry,F=E.isMeshStandardMaterial?D.environment:null,q=(E.isMeshStandardMaterial?t:e).get(E.envMap||F),V=q&&q.mapping===uo?q.image.height:null,re=g[E.type];E.precision!==null&&(m=r.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const O=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,J=O!==void 0?O.length:0;let ee=0;B.morphAttributes.position!==void 0&&(ee=1),B.morphAttributes.normal!==void 0&&(ee=2),B.morphAttributes.color!==void 0&&(ee=3);let we,Pe,k,se;if(re){const tt=Mn[re];we=tt.vertexShader,Pe=tt.fragmentShader}else we=E.vertexShader,Pe=E.fragmentShader,l.update(E),k=l.getVertexShaderID(E),se=l.getFragmentShaderID(E);const ae=n.getRenderTarget(),Ee=n.state.buffers.depth.getReversed(),Ie=L.isInstancedMesh===!0,X=L.isBatchedMesh===!0,pe=!!E.map,ue=!!E.matcap,A=!!q,te=!!E.aoMap,oe=!!E.lightMap,Se=!!E.bumpMap,ie=!!E.normalMap,ge=!!E.displacementMap,K=!!E.emissiveMap,me=!!E.metalnessMap,Ke=!!E.roughnessMap,Xe=E.anisotropy>0,I=E.clearcoat>0,S=E.dispersion>0,W=E.iridescence>0,$=E.sheen>0,ne=E.transmission>0,j=Xe&&!!E.anisotropyMap,Te=I&&!!E.clearcoatMap,he=I&&!!E.clearcoatNormalMap,Re=I&&!!E.clearcoatRoughnessMap,De=W&&!!E.iridescenceMap,de=W&&!!E.iridescenceThicknessMap,ve=$&&!!E.sheenColorMap,Ne=$&&!!E.sheenRoughnessMap,Ce=!!E.specularMap,xe=!!E.specularColorMap,Be=!!E.specularIntensityMap,N=ne&&!!E.transmissionMap,ce=ne&&!!E.thicknessMap,_e=!!E.gradientMap,be=!!E.alphaMap,le=E.alphaTest>0,Q=!!E.alphaHash,Le=!!E.extensions;let ke=ti;E.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ke=n.toneMapping);const ot={shaderID:re,shaderType:E.type,shaderName:E.name,vertexShader:we,fragmentShader:Pe,defines:E.defines,customVertexShaderID:k,customFragmentShaderID:se,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:X,batchingColor:X&&L._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&L.instanceColor!==null,instancingMorph:Ie&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:_r,alphaToCoverage:!!E.alphaToCoverage,map:pe,matcap:ue,envMap:A,envMapMode:A&&q.mapping,envMapCubeUVHeight:V,aoMap:te,lightMap:oe,bumpMap:Se,normalMap:ie,displacementMap:f&&ge,emissiveMap:K,normalMapObjectSpace:ie&&E.normalMapType===ef,normalMapTangentSpace:ie&&E.normalMapType===cd,metalnessMap:me,roughnessMap:Ke,anisotropy:Xe,anisotropyMap:j,clearcoat:I,clearcoatMap:Te,clearcoatNormalMap:he,clearcoatRoughnessMap:Re,dispersion:S,iridescence:W,iridescenceMap:De,iridescenceThicknessMap:de,sheen:$,sheenColorMap:ve,sheenRoughnessMap:Ne,specularMap:Ce,specularColorMap:xe,specularIntensityMap:Be,transmission:ne,transmissionMap:N,thicknessMap:ce,gradientMap:_e,opaque:E.transparent===!1&&E.blending===cr&&E.alphaToCoverage===!1,alphaMap:be,alphaTest:le,alphaHash:Q,combine:E.combine,mapUv:pe&&v(E.map.channel),aoMapUv:te&&v(E.aoMap.channel),lightMapUv:oe&&v(E.lightMap.channel),bumpMapUv:Se&&v(E.bumpMap.channel),normalMapUv:ie&&v(E.normalMap.channel),displacementMapUv:ge&&v(E.displacementMap.channel),emissiveMapUv:K&&v(E.emissiveMap.channel),metalnessMapUv:me&&v(E.metalnessMap.channel),roughnessMapUv:Ke&&v(E.roughnessMap.channel),anisotropyMapUv:j&&v(E.anisotropyMap.channel),clearcoatMapUv:Te&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:he&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:de&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&v(E.sheenRoughnessMap.channel),specularMapUv:Ce&&v(E.specularMap.channel),specularColorMapUv:xe&&v(E.specularColorMap.channel),specularIntensityMapUv:Be&&v(E.specularIntensityMap.channel),transmissionMapUv:N&&v(E.transmissionMap.channel),thicknessMapUv:ce&&v(E.thicknessMap.channel),alphaMapUv:be&&v(E.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ie||Xe),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(pe||be),fog:!!U,useFog:E.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ee,skinning:L.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ee,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:pe&&E.map.isVideoTexture===!0&&et.getTransfer(E.map.colorSpace)===it,decodeVideoTextureEmissive:K&&E.emissiveMap.isVideoTexture===!0&&et.getTransfer(E.emissiveMap.colorSpace)===it,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===wt,flipSided:E.side===Gt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Le&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&E.extensions.multiDraw===!0||X)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ot.vertexUv1s=c.has(1),ot.vertexUv2s=c.has(2),ot.vertexUv3s=c.has(3),c.clear(),ot}function h(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)y.push(R),y.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(x(y,E),M(y,E),y.push(n.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function x(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function M(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){const y=g[E.type];let R;if(y){const D=Mn[y];R=Pf.clone(D.uniforms)}else R=E.uniforms;return R}function b(E,y){let R;for(let D=0,L=u.length;D<L;D++){const U=u[D];if(U.cacheKey===y){R=U,++R.usedTimes;break}}return R===void 0&&(R=new s_(n,y,E,s),u.push(R)),R}function w(E){if(--E.usedTimes===0){const y=u.indexOf(E);u[y]=u[u.length-1],u.pop(),E.destroy()}}function P(E){l.remove(E)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:_,acquireProgram:b,releaseProgram:w,releaseShaderCache:P,programs:u,dispose:C}}function u_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function d_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function jl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Jl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,f,m,g,v,p){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=m,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=v,h.group=p),e++,h}function a(d,f,m,g,v,p){const h=o(d,f,m,g,v,p);m.transmission>0?i.push(h):m.transparent===!0?r.push(h):t.push(h)}function l(d,f,m,g,v,p){const h=o(d,f,m,g,v,p);m.transmission>0?i.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function c(d,f){t.length>1&&t.sort(d||d_),i.length>1&&i.sort(f||jl),r.length>1&&r.sort(f||jl)}function u(){for(let d=e,f=n.length;d<f;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function h_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Jl,n.set(i,[o])):r>=s.length?(o=new Jl,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function f_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new qe};break;case"SpotLight":t={position:new H,direction:new H,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new H,halfWidth:new H,halfHeight:new H};break}return n[e.id]=t,t}}}function p_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let m_=0;function g_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function __(n){const e=new f_,t=p_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);const r=new H,s=new at,o=new at;function a(c){let u=0,d=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,g=0,v=0,p=0,h=0,x=0,M=0,_=0,b=0,w=0,P=0;c.sort(g_);for(let E=0,y=c.length;E<y;E++){const R=c[E],D=R.color,L=R.intensity,U=R.distance,B=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=D.r*L,d+=D.g*L,f+=D.b*L;else if(R.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(R.sh.coefficients[F],L);P++}else if(R.isDirectionalLight){const F=e.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const q=R.shadow,V=t.get(R);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,i.directionalShadow[m]=V,i.directionalShadowMap[m]=B,i.directionalShadowMatrix[m]=R.shadow.matrix,x++}i.directional[m]=F,m++}else if(R.isSpotLight){const F=e.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(D).multiplyScalar(L),F.distance=U,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,i.spot[v]=F;const q=R.shadow;if(R.map&&(i.spotLightMap[b]=R.map,b++,q.updateMatrices(R),R.castShadow&&w++),i.spotLightMatrix[v]=q.matrix,R.castShadow){const V=t.get(R);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,i.spotShadow[v]=V,i.spotShadowMap[v]=B,_++}v++}else if(R.isRectAreaLight){const F=e.get(R);F.color.copy(D).multiplyScalar(L),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=F,p++}else if(R.isPointLight){const F=e.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),F.distance=R.distance,F.decay=R.decay,R.castShadow){const q=R.shadow,V=t.get(R);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,V.shadowCameraNear=q.camera.near,V.shadowCameraFar=q.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=R.shadow.matrix,M++}i.point[g]=F,g++}else if(R.isHemisphereLight){const F=e.get(R);F.skyColor.copy(R.color).multiplyScalar(L),F.groundColor.copy(R.groundColor).multiplyScalar(L),i.hemi[h]=F,h++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const C=i.hash;(C.directionalLength!==m||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==p||C.hemiLength!==h||C.numDirectionalShadows!==x||C.numPointShadows!==M||C.numSpotShadows!==_||C.numSpotMaps!==b||C.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=_+b-w,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=P,C.directionalLength=m,C.pointLength=g,C.spotLength=v,C.rectAreaLength=p,C.hemiLength=h,C.numDirectionalShadows=x,C.numPointShadows=M,C.numSpotShadows=_,C.numSpotMaps=b,C.numLightProbes=P,i.version=m_++)}function l(c,u){let d=0,f=0,m=0,g=0,v=0;const p=u.matrixWorldInverse;for(let h=0,x=c.length;h<x;h++){const M=c[h];if(M.isDirectionalLight){const _=i.directional[d];_.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),d++}else if(M.isSpotLight){const _=i.spot[m];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),m++}else if(M.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),o.identity(),s.copy(M.matrixWorld),s.premultiply(p),o.extractRotation(s),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const _=i.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(p),v++}}}return{setup:a,setupView:l,state:i}}function Ql(n){const e=new __(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function v_(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Ql(n),e.set(r,[a])):s>=o.length?(a=new Ql(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const x_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function S_(n,e,t){let i=new Ic;const r=new Ze,s=new Ze,o=new gt,a=new Gf({depthPacking:Qh}),l=new Wf,c={},u=t.maxTextureSize,d={[ni]:Gt,[Gt]:ni,[wt]:wt},f=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:x_,fragmentShader:M_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new _t;g.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ve(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ju;let h=this.type;this.render=function(w,P,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const E=n.getRenderTarget(),y=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),D=n.state;D.setBlending(ei),D.buffers.depth.getReversed()?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const L=h!==Fn&&this.type===Fn,U=h===Fn&&this.type!==Fn;for(let B=0,F=w.length;B<F;B++){const q=w[B],V=q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const re=V.getFrameExtents();if(r.multiply(re),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/re.x),r.x=s.x*re.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/re.y),r.y=s.y*re.y,V.mapSize.y=s.y)),V.map===null||L===!0||U===!0){const J=this.type!==Fn?{minFilter:Kt,magFilter:Kt}:{};V.map!==null&&V.map.dispose(),V.map=new Ri(r.x,r.y,J),V.map.texture.name=q.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const O=V.getViewportCount();for(let J=0;J<O;J++){const ee=V.getViewport(J);o.set(s.x*ee.x,s.y*ee.y,s.x*ee.z,s.y*ee.w),D.viewport(o),V.updateMatrices(q,J),i=V.getFrustum(),_(P,C,V.camera,q,this.type)}V.isPointLightShadow!==!0&&this.type===Fn&&x(V,C),V.needsUpdate=!1}h=this.type,p.needsUpdate=!1,n.setRenderTarget(E,y,R)};function x(w,P){const C=e.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ri(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(P,null,C,f,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(P,null,C,m,v,null)}function M(w,P,C,E){let y=null;const R=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)y=R;else if(y=C.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const D=y.uuid,L=P.uuid;let U=c[D];U===void 0&&(U={},c[D]=U);let B=U[L];B===void 0&&(B=y.clone(),U[L]=B,P.addEventListener("dispose",b)),y=B}if(y.visible=P.visible,y.wireframe=P.wireframe,E===Fn?y.side=P.shadowSide!==null?P.shadowSide:P.side:y.side=P.shadowSide!==null?P.shadowSide:d[P.side],y.alphaMap=P.alphaMap,y.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,y.map=P.map,y.clipShadows=P.clipShadows,y.clippingPlanes=P.clippingPlanes,y.clipIntersection=P.clipIntersection,y.displacementMap=P.displacementMap,y.displacementScale=P.displacementScale,y.displacementBias=P.displacementBias,y.wireframeLinewidth=P.wireframeLinewidth,y.linewidth=P.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=n.properties.get(y);D.light=C}return y}function _(w,P,C,E,y){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Fn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const L=e.update(w),U=w.material;if(Array.isArray(U)){const B=L.groups;for(let F=0,q=B.length;F<q;F++){const V=B[F],re=U[V.materialIndex];if(re&&re.visible){const O=M(w,re,E,y);w.onBeforeShadow(n,w,P,C,L,O,V),n.renderBufferDirect(C,null,L,O,w,V),w.onAfterShadow(n,w,P,C,L,O,V)}}}else if(U.visible){const B=M(w,U,E,y);w.onBeforeShadow(n,w,P,C,L,B,null),n.renderBufferDirect(C,null,L,B,w,null),w.onAfterShadow(n,w,P,C,L,B,null)}}const D=w.children;for(let L=0,U=D.length;L<U;L++)_(D[L],P,C,E,y)}function b(w){w.target.removeEventListener("dispose",b);for(const C in c){const E=c[C],y=w.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const y_={[xa]:Ma,[Sa]:ba,[ya]:Ta,[pr]:Ea,[Ma]:xa,[ba]:Sa,[Ta]:ya,[Ea]:pr};function E_(n,e){function t(){let N=!1;const ce=new gt;let _e=null;const be=new gt(0,0,0,0);return{setMask:function(le){_e!==le&&!N&&(n.colorMask(le,le,le,le),_e=le)},setLocked:function(le){N=le},setClear:function(le,Q,Le,ke,ot){ot===!0&&(le*=ke,Q*=ke,Le*=ke),ce.set(le,Q,Le,ke),be.equals(ce)===!1&&(n.clearColor(le,Q,Le,ke),be.copy(ce))},reset:function(){N=!1,_e=null,be.set(-1,0,0,0)}}}function i(){let N=!1,ce=!1,_e=null,be=null,le=null;return{setReversed:function(Q){if(ce!==Q){const Le=e.get("EXT_clip_control");Q?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ce=Q;const ke=le;le=null,this.setClear(ke)}},getReversed:function(){return ce},setTest:function(Q){Q?ae(n.DEPTH_TEST):Ee(n.DEPTH_TEST)},setMask:function(Q){_e!==Q&&!N&&(n.depthMask(Q),_e=Q)},setFunc:function(Q){if(ce&&(Q=y_[Q]),be!==Q){switch(Q){case xa:n.depthFunc(n.NEVER);break;case Ma:n.depthFunc(n.ALWAYS);break;case Sa:n.depthFunc(n.LESS);break;case pr:n.depthFunc(n.LEQUAL);break;case ya:n.depthFunc(n.EQUAL);break;case Ea:n.depthFunc(n.GEQUAL);break;case ba:n.depthFunc(n.GREATER);break;case Ta:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}be=Q}},setLocked:function(Q){N=Q},setClear:function(Q){le!==Q&&(ce&&(Q=1-Q),n.clearDepth(Q),le=Q)},reset:function(){N=!1,_e=null,be=null,le=null,ce=!1}}}function r(){let N=!1,ce=null,_e=null,be=null,le=null,Q=null,Le=null,ke=null,ot=null;return{setTest:function(tt){N||(tt?ae(n.STENCIL_TEST):Ee(n.STENCIL_TEST))},setMask:function(tt){ce!==tt&&!N&&(n.stencilMask(tt),ce=tt)},setFunc:function(tt,Rn,mn){(_e!==tt||be!==Rn||le!==mn)&&(n.stencilFunc(tt,Rn,mn),_e=tt,be=Rn,le=mn)},setOp:function(tt,Rn,mn){(Q!==tt||Le!==Rn||ke!==mn)&&(n.stencilOp(tt,Rn,mn),Q=tt,Le=Rn,ke=mn)},setLocked:function(tt){N=tt},setClear:function(tt){ot!==tt&&(n.clearStencil(tt),ot=tt)},reset:function(){N=!1,ce=null,_e=null,be=null,le=null,Q=null,Le=null,ke=null,ot=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,m=[],g=null,v=!1,p=null,h=null,x=null,M=null,_=null,b=null,w=null,P=new qe(0,0,0),C=0,E=!1,y=null,R=null,D=null,L=null,U=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,q=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(V)[1]),F=q>=1):V.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),F=q>=2);let re=null,O={};const J=n.getParameter(n.SCISSOR_BOX),ee=n.getParameter(n.VIEWPORT),we=new gt().fromArray(J),Pe=new gt().fromArray(ee);function k(N,ce,_e,be){const le=new Uint8Array(4),Q=n.createTexture();n.bindTexture(N,Q),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<_e;Le++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,be,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(ce+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return Q}const se={};se[n.TEXTURE_2D]=k(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=k(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=k(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=k(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(n.DEPTH_TEST),o.setFunc(pr),Se(!1),ie(Kc),ae(n.CULL_FACE),te(ei);function ae(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Ee(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Ie(N,ce){return d[N]!==ce?(n.bindFramebuffer(N,ce),d[N]=ce,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ce),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function X(N,ce){let _e=m,be=!1;if(N){_e=f.get(ce),_e===void 0&&(_e=[],f.set(ce,_e));const le=N.textures;if(_e.length!==le.length||_e[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,Le=le.length;Q<Le;Q++)_e[Q]=n.COLOR_ATTACHMENT0+Q;_e.length=le.length,be=!0}}else _e[0]!==n.BACK&&(_e[0]=n.BACK,be=!0);be&&n.drawBuffers(_e)}function pe(N){return g!==N?(n.useProgram(N),g=N,!0):!1}const ue={[_i]:n.FUNC_ADD,[Ah]:n.FUNC_SUBTRACT,[wh]:n.FUNC_REVERSE_SUBTRACT};ue[Rh]=n.MIN,ue[Ch]=n.MAX;const A={[Ph]:n.ZERO,[Ih]:n.ONE,[Lh]:n.SRC_COLOR,[_a]:n.SRC_ALPHA,[Bh]:n.SRC_ALPHA_SATURATE,[Fh]:n.DST_COLOR,[Uh]:n.DST_ALPHA,[Dh]:n.ONE_MINUS_SRC_COLOR,[va]:n.ONE_MINUS_SRC_ALPHA,[Oh]:n.ONE_MINUS_DST_COLOR,[Nh]:n.ONE_MINUS_DST_ALPHA,[zh]:n.CONSTANT_COLOR,[kh]:n.ONE_MINUS_CONSTANT_COLOR,[Hh]:n.CONSTANT_ALPHA,[Vh]:n.ONE_MINUS_CONSTANT_ALPHA};function te(N,ce,_e,be,le,Q,Le,ke,ot,tt){if(N===ei){v===!0&&(Ee(n.BLEND),v=!1);return}if(v===!1&&(ae(n.BLEND),v=!0),N!==Th){if(N!==p||tt!==E){if((h!==_i||_!==_i)&&(n.blendEquation(n.FUNC_ADD),h=_i,_=_i),tt)switch(N){case cr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jc:n.blendFunc(n.ONE,n.ONE);break;case Jc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case cr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Jc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}x=null,M=null,b=null,w=null,P.set(0,0,0),C=0,p=N,E=tt}return}le=le||ce,Q=Q||_e,Le=Le||be,(ce!==h||le!==_)&&(n.blendEquationSeparate(ue[ce],ue[le]),h=ce,_=le),(_e!==x||be!==M||Q!==b||Le!==w)&&(n.blendFuncSeparate(A[_e],A[be],A[Q],A[Le]),x=_e,M=be,b=Q,w=Le),(ke.equals(P)===!1||ot!==C)&&(n.blendColor(ke.r,ke.g,ke.b,ot),P.copy(ke),C=ot),p=N,E=!1}function oe(N,ce){N.side===wt?Ee(n.CULL_FACE):ae(n.CULL_FACE);let _e=N.side===Gt;ce&&(_e=!_e),Se(_e),N.blending===cr&&N.transparent===!1?te(ei):te(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const be=N.stencilWrite;a.setTest(be),be&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),K(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):Ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function Se(N){y!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),y=N)}function ie(N){N!==yh?(ae(n.CULL_FACE),N!==R&&(N===Kc?n.cullFace(n.BACK):N===Eh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ee(n.CULL_FACE),R=N}function ge(N){N!==D&&(F&&n.lineWidth(N),D=N)}function K(N,ce,_e){N?(ae(n.POLYGON_OFFSET_FILL),(L!==ce||U!==_e)&&(n.polygonOffset(ce,_e),L=ce,U=_e)):Ee(n.POLYGON_OFFSET_FILL)}function me(N){N?ae(n.SCISSOR_TEST):Ee(n.SCISSOR_TEST)}function Ke(N){N===void 0&&(N=n.TEXTURE0+B-1),re!==N&&(n.activeTexture(N),re=N)}function Xe(N,ce,_e){_e===void 0&&(re===null?_e=n.TEXTURE0+B-1:_e=re);let be=O[_e];be===void 0&&(be={type:void 0,texture:void 0},O[_e]=be),(be.type!==N||be.texture!==ce)&&(re!==_e&&(n.activeTexture(_e),re=_e),n.bindTexture(N,ce||se[N]),be.type=N,be.texture=ce)}function I(){const N=O[re];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Re(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(N){we.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),we.copy(N))}function Ne(N){Pe.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Pe.copy(N))}function Ce(N,ce){let _e=c.get(ce);_e===void 0&&(_e=new WeakMap,c.set(ce,_e));let be=_e.get(N);be===void 0&&(be=n.getUniformBlockIndex(ce,N.name),_e.set(N,be))}function xe(N,ce){const be=c.get(ce).get(N);l.get(ce)!==be&&(n.uniformBlockBinding(ce,be,N.__bindingPointIndex),l.set(ce,be))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},re=null,O={},d={},f=new WeakMap,m=[],g=null,v=!1,p=null,h=null,x=null,M=null,_=null,b=null,w=null,P=new qe(0,0,0),C=0,E=!1,y=null,R=null,D=null,L=null,U=null,we.set(0,0,n.canvas.width,n.canvas.height),Pe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ae,disable:Ee,bindFramebuffer:Ie,drawBuffers:X,useProgram:pe,setBlending:te,setMaterial:oe,setFlipSided:Se,setCullFace:ie,setLineWidth:ge,setPolygonOffset:K,setScissorTest:me,activeTexture:Ke,bindTexture:Xe,unbindTexture:I,compressedTexImage2D:S,compressedTexImage3D:W,texImage2D:De,texImage3D:de,updateUBOMapping:Ce,uniformBlockBinding:xe,texStorage2D:he,texStorage3D:Re,texSubImage2D:$,texSubImage3D:ne,compressedTexSubImage2D:j,compressedTexSubImage3D:Te,scissor:ve,viewport:Ne,reset:Be}}function b_(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ze,u=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,S){return m?new OffscreenCanvas(I,S):so("canvas")}function v(I,S,W){let $=1;const ne=Xe(I);if((ne.width>W||ne.height>W)&&($=W/Math.max(ne.width,ne.height)),$<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const j=Math.floor($*ne.width),Te=Math.floor($*ne.height);d===void 0&&(d=g(j,Te));const he=S?g(j,Te):d;return he.width=j,he.height=Te,he.getContext("2d").drawImage(I,0,0,j,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+j+"x"+Te+")."),he}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),I;return I}function p(I){return I.generateMipmaps}function h(I){n.generateMipmap(I)}function x(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(I,S,W,$,ne=!1){if(I!==null){if(n[I]!==void 0)return n[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let j=S;if(S===n.RED&&(W===n.FLOAT&&(j=n.R32F),W===n.HALF_FLOAT&&(j=n.R16F),W===n.UNSIGNED_BYTE&&(j=n.R8)),S===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(j=n.R8UI),W===n.UNSIGNED_SHORT&&(j=n.R16UI),W===n.UNSIGNED_INT&&(j=n.R32UI),W===n.BYTE&&(j=n.R8I),W===n.SHORT&&(j=n.R16I),W===n.INT&&(j=n.R32I)),S===n.RG&&(W===n.FLOAT&&(j=n.RG32F),W===n.HALF_FLOAT&&(j=n.RG16F),W===n.UNSIGNED_BYTE&&(j=n.RG8)),S===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(j=n.RG8UI),W===n.UNSIGNED_SHORT&&(j=n.RG16UI),W===n.UNSIGNED_INT&&(j=n.RG32UI),W===n.BYTE&&(j=n.RG8I),W===n.SHORT&&(j=n.RG16I),W===n.INT&&(j=n.RG32I)),S===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(j=n.RGB8UI),W===n.UNSIGNED_SHORT&&(j=n.RGB16UI),W===n.UNSIGNED_INT&&(j=n.RGB32UI),W===n.BYTE&&(j=n.RGB8I),W===n.SHORT&&(j=n.RGB16I),W===n.INT&&(j=n.RGB32I)),S===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),W===n.UNSIGNED_INT&&(j=n.RGBA32UI),W===n.BYTE&&(j=n.RGBA8I),W===n.SHORT&&(j=n.RGBA16I),W===n.INT&&(j=n.RGBA32I)),S===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),S===n.RGBA){const Te=ne?io:et.getTransfer($);W===n.FLOAT&&(j=n.RGBA32F),W===n.HALF_FLOAT&&(j=n.RGBA16F),W===n.UNSIGNED_BYTE&&(j=Te===it?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function _(I,S){let W;return I?S===null||S===wi||S===rs?W=n.DEPTH24_STENCIL8:S===En?W=n.DEPTH32F_STENCIL8:S===is&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===wi||S===rs?W=n.DEPTH_COMPONENT24:S===En?W=n.DEPTH_COMPONENT32F:S===is&&(W=n.DEPTH_COMPONENT16),W}function b(I,S){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==Kt&&I.minFilter!==yn?Math.log2(Math.max(S.width,S.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?S.mipmaps.length:1}function w(I){const S=I.target;S.removeEventListener("dispose",w),C(S),S.isVideoTexture&&u.delete(S)}function P(I){const S=I.target;S.removeEventListener("dispose",P),y(S)}function C(I){const S=i.get(I);if(S.__webglInit===void 0)return;const W=I.source,$=f.get(W);if($){const ne=$[S.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&E(I),Object.keys($).length===0&&f.delete(W)}i.remove(I)}function E(I){const S=i.get(I);n.deleteTexture(S.__webglTexture);const W=I.source,$=f.get(W);delete $[S.__cacheKey],o.memory.textures--}function y(I){const S=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(S.__webglFramebuffer[$]))for(let ne=0;ne<S.__webglFramebuffer[$].length;ne++)n.deleteFramebuffer(S.__webglFramebuffer[$][ne]);else n.deleteFramebuffer(S.__webglFramebuffer[$]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[$])}else{if(Array.isArray(S.__webglFramebuffer))for(let $=0;$<S.__webglFramebuffer.length;$++)n.deleteFramebuffer(S.__webglFramebuffer[$]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let $=0;$<S.__webglColorRenderbuffer.length;$++)S.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[$]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=I.textures;for(let $=0,ne=W.length;$<ne;$++){const j=i.get(W[$]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(W[$])}i.remove(I)}let R=0;function D(){R=0}function L(){const I=R;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),R+=1,I}function U(I){const S=[];return S.push(I.wrapS),S.push(I.wrapT),S.push(I.wrapR||0),S.push(I.magFilter),S.push(I.minFilter),S.push(I.anisotropy),S.push(I.internalFormat),S.push(I.format),S.push(I.type),S.push(I.generateMipmaps),S.push(I.premultiplyAlpha),S.push(I.flipY),S.push(I.unpackAlignment),S.push(I.colorSpace),S.join()}function B(I,S){const W=i.get(I);if(I.isVideoTexture&&me(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&W.__version!==I.version){const $=I.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(W,I,S);return}}else I.isExternalTexture&&(W.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+S)}function F(I,S){const W=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){se(W,I,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+S)}function q(I,S){const W=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){se(W,I,S);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+S)}function V(I,S){const W=i.get(I);if(I.version>0&&W.__version!==I.version){ae(W,I,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+S)}const re={[Ra]:n.REPEAT,[Mi]:n.CLAMP_TO_EDGE,[Ca]:n.MIRRORED_REPEAT},O={[Kt]:n.NEAREST,[jh]:n.NEAREST_MIPMAP_NEAREST,[_s]:n.NEAREST_MIPMAP_LINEAR,[yn]:n.LINEAR,[bo]:n.LINEAR_MIPMAP_NEAREST,[Si]:n.LINEAR_MIPMAP_LINEAR},J={[tf]:n.NEVER,[cf]:n.ALWAYS,[nf]:n.LESS,[ld]:n.LEQUAL,[rf]:n.EQUAL,[af]:n.GEQUAL,[sf]:n.GREATER,[of]:n.NOTEQUAL};function ee(I,S){if(S.type===En&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===yn||S.magFilter===bo||S.magFilter===_s||S.magFilter===Si||S.minFilter===yn||S.minFilter===bo||S.minFilter===_s||S.minFilter===Si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,re[S.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,re[S.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,re[S.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,O[S.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,O[S.minFilter]),S.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,J[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Kt||S.minFilter!==_s&&S.minFilter!==Si||S.type===En&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function we(I,S){let W=!1;I.__webglInit===void 0&&(I.__webglInit=!0,S.addEventListener("dispose",w));const $=S.source;let ne=f.get($);ne===void 0&&(ne={},f.set($,ne));const j=U(S);if(j!==I.__cacheKey){ne[j]===void 0&&(ne[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ne[j].usedTimes++;const Te=ne[I.__cacheKey];Te!==void 0&&(ne[I.__cacheKey].usedTimes--,Te.usedTimes===0&&E(S)),I.__cacheKey=j,I.__webglTexture=ne[j].texture}return W}function Pe(I,S,W){return Math.floor(Math.floor(I/W)/S)}function k(I,S,W,$){const j=I.updateRanges;if(j.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,W,$,S.data);else{j.sort((de,ve)=>de.start-ve.start);let Te=0;for(let de=1;de<j.length;de++){const ve=j[Te],Ne=j[de],Ce=ve.start+ve.count,xe=Pe(Ne.start,S.width,4),Be=Pe(ve.start,S.width,4);Ne.start<=Ce+1&&xe===Be&&Pe(Ne.start+Ne.count-1,S.width,4)===xe?ve.count=Math.max(ve.count,Ne.start+Ne.count-ve.start):(++Te,j[Te]=Ne)}j.length=Te+1;const he=n.getParameter(n.UNPACK_ROW_LENGTH),Re=n.getParameter(n.UNPACK_SKIP_PIXELS),De=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let de=0,ve=j.length;de<ve;de++){const Ne=j[de],Ce=Math.floor(Ne.start/4),xe=Math.ceil(Ne.count/4),Be=Ce%S.width,N=Math.floor(Ce/S.width),ce=xe,_e=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Be,N,ce,_e,W,$,S.data)}I.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,he),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Re),n.pixelStorei(n.UNPACK_SKIP_ROWS,De)}}function se(I,S,W){let $=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&($=n.TEXTURE_3D);const ne=we(I,S),j=S.source;t.bindTexture($,I.__webglTexture,n.TEXTURE0+W);const Te=i.get(j);if(j.version!==Te.__version||ne===!0){t.activeTexture(n.TEXTURE0+W);const he=et.getPrimaries(et.workingColorSpace),Re=S.colorSpace===Kn?null:et.getPrimaries(S.colorSpace),De=S.colorSpace===Kn||he===Re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let de=v(S.image,!1,r.maxTextureSize);de=Ke(S,de);const ve=s.convert(S.format,S.colorSpace),Ne=s.convert(S.type);let Ce=M(S.internalFormat,ve,Ne,S.colorSpace,S.isVideoTexture);ee($,S);let xe;const Be=S.mipmaps,N=S.isVideoTexture!==!0,ce=Te.__version===void 0||ne===!0,_e=j.dataReady,be=b(S,de);if(S.isDepthTexture)Ce=_(S.format===os,S.type),ce&&(N?t.texStorage2D(n.TEXTURE_2D,1,Ce,de.width,de.height):t.texImage2D(n.TEXTURE_2D,0,Ce,de.width,de.height,0,ve,Ne,null));else if(S.isDataTexture)if(Be.length>0){N&&ce&&t.texStorage2D(n.TEXTURE_2D,be,Ce,Be[0].width,Be[0].height);for(let le=0,Q=Be.length;le<Q;le++)xe=Be[le],N?_e&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,ve,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,le,Ce,xe.width,xe.height,0,ve,Ne,xe.data);S.generateMipmaps=!1}else N?(ce&&t.texStorage2D(n.TEXTURE_2D,be,Ce,de.width,de.height),_e&&k(S,de,ve,Ne)):t.texImage2D(n.TEXTURE_2D,0,Ce,de.width,de.height,0,ve,Ne,de.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){N&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,Ce,Be[0].width,Be[0].height,de.depth);for(let le=0,Q=Be.length;le<Q;le++)if(xe=Be[le],S.format!==fn)if(ve!==null)if(N){if(_e)if(S.layerUpdates.size>0){const Le=Cl(xe.width,xe.height,S.format,S.type);for(const ke of S.layerUpdates){const ot=xe.data.subarray(ke*Le/xe.data.BYTES_PER_ELEMENT,(ke+1)*Le/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,ke,xe.width,xe.height,1,ve,ot)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,de.depth,ve,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,le,Ce,xe.width,xe.height,de.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?_e&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,de.depth,ve,Ne,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,le,Ce,xe.width,xe.height,de.depth,0,ve,Ne,xe.data)}else{N&&ce&&t.texStorage2D(n.TEXTURE_2D,be,Ce,Be[0].width,Be[0].height);for(let le=0,Q=Be.length;le<Q;le++)xe=Be[le],S.format!==fn?ve!==null?N?_e&&t.compressedTexSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,ve,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,le,Ce,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?_e&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,ve,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,le,Ce,xe.width,xe.height,0,ve,Ne,xe.data)}else if(S.isDataArrayTexture)if(N){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,Ce,de.width,de.height,de.depth),_e)if(S.layerUpdates.size>0){const le=Cl(de.width,de.height,S.format,S.type);for(const Q of S.layerUpdates){const Le=de.data.subarray(Q*le/de.data.BYTES_PER_ELEMENT,(Q+1)*le/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,de.width,de.height,1,ve,Ne,Le)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,ve,Ne,de.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,de.width,de.height,de.depth,0,ve,Ne,de.data);else if(S.isData3DTexture)N?(ce&&t.texStorage3D(n.TEXTURE_3D,be,Ce,de.width,de.height,de.depth),_e&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,ve,Ne,de.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,de.width,de.height,de.depth,0,ve,Ne,de.data);else if(S.isFramebufferTexture){if(ce)if(N)t.texStorage2D(n.TEXTURE_2D,be,Ce,de.width,de.height);else{let le=de.width,Q=de.height;for(let Le=0;Le<be;Le++)t.texImage2D(n.TEXTURE_2D,Le,Ce,le,Q,0,ve,Ne,null),le>>=1,Q>>=1}}else if(Be.length>0){if(N&&ce){const le=Xe(Be[0]);t.texStorage2D(n.TEXTURE_2D,be,Ce,le.width,le.height)}for(let le=0,Q=Be.length;le<Q;le++)xe=Be[le],N?_e&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,ve,Ne,xe):t.texImage2D(n.TEXTURE_2D,le,Ce,ve,Ne,xe);S.generateMipmaps=!1}else if(N){if(ce){const le=Xe(de);t.texStorage2D(n.TEXTURE_2D,be,Ce,le.width,le.height)}_e&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,Ne,de)}else t.texImage2D(n.TEXTURE_2D,0,Ce,ve,Ne,de);p(S)&&h($),Te.__version=j.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function ae(I,S,W){if(S.image.length!==6)return;const $=we(I,S),ne=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+W);const j=i.get(ne);if(ne.version!==j.__version||$===!0){t.activeTexture(n.TEXTURE0+W);const Te=et.getPrimaries(et.workingColorSpace),he=S.colorSpace===Kn?null:et.getPrimaries(S.colorSpace),Re=S.colorSpace===Kn||Te===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const De=S.isCompressedTexture||S.image[0].isCompressedTexture,de=S.image[0]&&S.image[0].isDataTexture,ve=[];for(let Q=0;Q<6;Q++)!De&&!de?ve[Q]=v(S.image[Q],!0,r.maxCubemapSize):ve[Q]=de?S.image[Q].image:S.image[Q],ve[Q]=Ke(S,ve[Q]);const Ne=ve[0],Ce=s.convert(S.format,S.colorSpace),xe=s.convert(S.type),Be=M(S.internalFormat,Ce,xe,S.colorSpace),N=S.isVideoTexture!==!0,ce=j.__version===void 0||$===!0,_e=ne.dataReady;let be=b(S,Ne);ee(n.TEXTURE_CUBE_MAP,S);let le;if(De){N&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,be,Be,Ne.width,Ne.height);for(let Q=0;Q<6;Q++){le=ve[Q].mipmaps;for(let Le=0;Le<le.length;Le++){const ke=le[Le];S.format!==fn?Ce!==null?N?_e&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,0,0,ke.width,ke.height,Ce,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,Be,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,0,0,ke.width,ke.height,Ce,xe,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,Be,ke.width,ke.height,0,Ce,xe,ke.data)}}}else{if(le=S.mipmaps,N&&ce){le.length>0&&be++;const Q=Xe(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,be,Be,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(de){N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ve[Q].width,ve[Q].height,Ce,xe,ve[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Be,ve[Q].width,ve[Q].height,0,Ce,xe,ve[Q].data);for(let Le=0;Le<le.length;Le++){const ot=le[Le].image[Q].image;N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,0,0,ot.width,ot.height,Ce,xe,ot.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,Be,ot.width,ot.height,0,Ce,xe,ot.data)}}else{N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ce,xe,ve[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Be,Ce,xe,ve[Q]);for(let Le=0;Le<le.length;Le++){const ke=le[Le];N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,0,0,Ce,xe,ke.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,Be,Ce,xe,ke.image[Q])}}}p(S)&&h(n.TEXTURE_CUBE_MAP),j.__version=ne.version,S.onUpdate&&S.onUpdate(S)}I.__version=S.version}function Ee(I,S,W,$,ne,j){const Te=s.convert(W.format,W.colorSpace),he=s.convert(W.type),Re=M(W.internalFormat,Te,he,W.colorSpace),De=i.get(S),de=i.get(W);if(de.__renderTarget=S,!De.__hasExternalTextures){const ve=Math.max(1,S.width>>j),Ne=Math.max(1,S.height>>j);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,j,Re,ve,Ne,S.depth,0,Te,he,null):t.texImage2D(ne,j,Re,ve,Ne,0,Te,he,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),K(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,ne,de.__webglTexture,0,ge(S)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,ne,de.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(I,S,W){if(n.bindRenderbuffer(n.RENDERBUFFER,I),S.depthBuffer){const $=S.depthTexture,ne=$&&$.isDepthTexture?$.type:null,j=_(S.stencilBuffer,ne),Te=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=ge(S);K(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,j,S.width,S.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,j,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,j,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,I)}else{const $=S.textures;for(let ne=0;ne<$.length;ne++){const j=$[ne],Te=s.convert(j.format,j.colorSpace),he=s.convert(j.type),Re=M(j.internalFormat,Te,he,j.colorSpace),De=ge(S);W&&K(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Re,S.width,S.height):K(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De,Re,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Re,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function X(I,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(S.depthTexture);$.__renderTarget=S,(!$.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),B(S.depthTexture,0);const ne=$.__webglTexture,j=ge(S);if(S.depthTexture.format===ss)K(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(S.depthTexture.format===os)K(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function pe(I){const S=i.get(I),W=I.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==I.depthTexture){const $=I.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),$){const ne=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,$.removeEventListener("dispose",ne)};$.addEventListener("dispose",ne),S.__depthDisposeCallback=ne}S.__boundDepthTexture=$}if(I.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const $=I.texture.mipmaps;$&&$.length>0?X(S.__webglFramebuffer[0],I):X(S.__webglFramebuffer,I)}else if(W){S.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[$]),S.__webglDepthbuffer[$]===void 0)S.__webglDepthbuffer[$]=n.createRenderbuffer(),Ie(S.__webglDepthbuffer[$],I,!1);else{const ne=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,j)}}else{const $=I.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),Ie(S.__webglDepthbuffer,I,!1);else{const ne=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,j)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(I,S,W){const $=i.get(I);S!==void 0&&Ee($.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&pe(I)}function A(I){const S=I.texture,W=i.get(I),$=i.get(S);I.addEventListener("dispose",P);const ne=I.textures,j=I.isWebGLCubeRenderTarget===!0,Te=ne.length>1;if(Te||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=S.version,o.memory.textures++),j){W.__webglFramebuffer=[];for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[he]=[];for(let Re=0;Re<S.mipmaps.length;Re++)W.__webglFramebuffer[he][Re]=n.createFramebuffer()}else W.__webglFramebuffer[he]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let he=0;he<S.mipmaps.length;he++)W.__webglFramebuffer[he]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Te)for(let he=0,Re=ne.length;he<Re;he++){const De=i.get(ne[he]);De.__webglTexture===void 0&&(De.__webglTexture=n.createTexture(),o.memory.textures++)}if(I.samples>0&&K(I)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let he=0;he<ne.length;he++){const Re=ne[he];W.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[he]);const De=s.convert(Re.format,Re.colorSpace),de=s.convert(Re.type),ve=M(Re.internalFormat,De,de,Re.colorSpace,I.isXRRenderTarget===!0),Ne=ge(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,ve,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,W.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Ie(W.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),ee(n.TEXTURE_CUBE_MAP,S);for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0)for(let Re=0;Re<S.mipmaps.length;Re++)Ee(W.__webglFramebuffer[he][Re],I,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Re);else Ee(W.__webglFramebuffer[he],I,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);p(S)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let he=0,Re=ne.length;he<Re;he++){const De=ne[he],de=i.get(De);let ve=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ve=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,de.__webglTexture),ee(ve,De),Ee(W.__webglFramebuffer,I,De,n.COLOR_ATTACHMENT0+he,ve,0),p(De)&&h(ve)}t.unbindTexture()}else{let he=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(he=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,$.__webglTexture),ee(he,S),S.mipmaps&&S.mipmaps.length>0)for(let Re=0;Re<S.mipmaps.length;Re++)Ee(W.__webglFramebuffer[Re],I,S,n.COLOR_ATTACHMENT0,he,Re);else Ee(W.__webglFramebuffer,I,S,n.COLOR_ATTACHMENT0,he,0);p(S)&&h(he),t.unbindTexture()}I.depthBuffer&&pe(I)}function te(I){const S=I.textures;for(let W=0,$=S.length;W<$;W++){const ne=S[W];if(p(ne)){const j=x(I),Te=i.get(ne).__webglTexture;t.bindTexture(j,Te),h(j),t.unbindTexture()}}}const oe=[],Se=[];function ie(I){if(I.samples>0){if(K(I)===!1){const S=I.textures,W=I.width,$=I.height;let ne=n.COLOR_BUFFER_BIT;const j=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(I),he=S.length>1;if(he)for(let De=0;De<S.length;De++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const Re=I.texture.mipmaps;Re&&Re.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let De=0;De<S.length;De++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),he){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[De]);const de=i.get(S[De]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,de,0)}n.blitFramebuffer(0,0,W,$,0,0,W,$,ne,n.NEAREST),l===!0&&(oe.length=0,Se.length=0,oe.push(n.COLOR_ATTACHMENT0+De),I.depthBuffer&&I.resolveDepthBuffer===!1&&(oe.push(j),Se.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Se)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let De=0;De<S.length;De++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,Te.__webglColorRenderbuffer[De]);const de=i.get(S[De]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,de,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const S=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function ge(I){return Math.min(r.maxSamples,I.samples)}function K(I){const S=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function me(I){const S=o.render.frame;u.get(I)!==S&&(u.set(I,S),I.update())}function Ke(I,S){const W=I.colorSpace,$=I.format,ne=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||W!==_r&&W!==Kn&&(et.getTransfer(W)===it?($!==fn||ne!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}function Xe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=D,this.setTexture2D=B,this.setTexture2DArray=F,this.setTexture3D=q,this.setTextureCube=V,this.rebindTextures=ue,this.setupRenderTarget=A,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=K}function T_(n,e){function t(i,r=Kn){let s;const o=et.getTransfer(r);if(i===An)return n.UNSIGNED_BYTE;if(i===Sc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===yc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===id)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===td)return n.BYTE;if(i===nd)return n.SHORT;if(i===is)return n.UNSIGNED_SHORT;if(i===Mc)return n.INT;if(i===wi)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===cs)return n.HALF_FLOAT;if(i===rd)return n.ALPHA;if(i===sd)return n.RGB;if(i===fn)return n.RGBA;if(i===ss)return n.DEPTH_COMPONENT;if(i===os)return n.DEPTH_STENCIL;if(i===Ec)return n.RED;if(i===bc)return n.RED_INTEGER;if(i===od)return n.RG;if(i===Tc)return n.RG_INTEGER;if(i===Ac)return n.RGBA_INTEGER;if(i===Ks||i===js||i===Js||i===Qs)if(o===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ks)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===js)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Js)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ks)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===js)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Js)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Qs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pa||i===Ia||i===La||i===Da)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Pa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ia)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===La)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Da)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ua||i===Na||i===Fa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ua||i===Na)return o===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Fa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Oa||i===Ba||i===za||i===ka||i===Ha||i===Va||i===Ga||i===Wa||i===Xa||i===qa||i===Ya||i===Za||i===$a||i===Ka)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Oa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ba)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===za)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ka)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ha)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Va)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ga)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Wa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Xa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ya)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Za)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===$a)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ka)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===eo||i===ja||i===Ja)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===eo)return o===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ja)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ja)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ad||i===Qa||i===ec||i===tc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===eo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Qa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ec)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===tc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class wd extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const A_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class R_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new wd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Hn({vertexShader:A_,fragmentShader:w_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ve(new po(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C_ extends yr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,m=null,g=null;const v=new R_,p={},h=t.getContextAttributes();let x=null,M=null;const _=[],b=[],w=new Ze;let P=null;const C=new ln;C.viewport=new gt;const E=new ln;E.viewport=new gt;const y=[C,E],R=new $f;let D=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let se=_[k];return se===void 0&&(se=new Yo,_[k]=se),se.getTargetRaySpace()},this.getControllerGrip=function(k){let se=_[k];return se===void 0&&(se=new Yo,_[k]=se),se.getGripSpace()},this.getHand=function(k){let se=_[k];return se===void 0&&(se=new Yo,_[k]=se),se.getHandSpace()};function U(k){const se=b.indexOf(k.inputSource);if(se===-1)return;const ae=_[se];ae!==void 0&&(ae.update(k.inputSource,k.frame,c||o),ae.dispatchEvent({type:k.type,data:k.inputSource}))}function B(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",F);for(let k=0;k<_.length;k++){const se=b[k];se!==null&&(b[k]=null,_[k].disconnect(se))}D=null,L=null,v.reset();for(const k in p)delete p[k];e.setRenderTarget(x),m=null,f=null,d=null,r=null,M=null,Pe.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(x=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",B),r.addEventListener("inputsourceschange",F),h.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(w),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(r,t)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Ee=null,Ie=null;h.depth&&(Ie=h.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=h.stencil?os:ss,Ee=h.stencil?rs:wi);const X={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:s};f=d.createProjectionLayer(X),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new Ri(f.textureWidth,f.textureHeight,{format:fn,type:An,depthTexture:new Md(f.textureWidth,f.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:h.stencil,colorSpace:e.outputColorSpace,samples:h.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ae={antialias:h.antialias,alpha:!0,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new Ri(m.framebufferWidth,m.framebufferHeight,{format:fn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:h.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Pe.setContext(r),Pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function F(k){for(let se=0;se<k.removed.length;se++){const ae=k.removed[se],Ee=b.indexOf(ae);Ee>=0&&(b[Ee]=null,_[Ee].disconnect(ae))}for(let se=0;se<k.added.length;se++){const ae=k.added[se];let Ee=b.indexOf(ae);if(Ee===-1){for(let X=0;X<_.length;X++)if(X>=b.length){b.push(ae),Ee=X;break}else if(b[X]===null){b[X]=ae,Ee=X;break}if(Ee===-1)break}const Ie=_[Ee];Ie&&Ie.connect(ae)}}const q=new H,V=new H;function re(k,se,ae){q.setFromMatrixPosition(se.matrixWorld),V.setFromMatrixPosition(ae.matrixWorld);const Ee=q.distanceTo(V),Ie=se.projectionMatrix.elements,X=ae.projectionMatrix.elements,pe=Ie[14]/(Ie[10]-1),ue=Ie[14]/(Ie[10]+1),A=(Ie[9]+1)/Ie[5],te=(Ie[9]-1)/Ie[5],oe=(Ie[8]-1)/Ie[0],Se=(X[8]+1)/X[0],ie=pe*oe,ge=pe*Se,K=Ee/(-oe+Se),me=K*-oe;if(se.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(me),k.translateZ(K),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Ie[10]===-1)k.projectionMatrix.copy(se.projectionMatrix),k.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Ke=pe+K,Xe=ue+K,I=ie-me,S=ge+(Ee-me),W=A*ue/Xe*Ke,$=te*ue/Xe*Ke;k.projectionMatrix.makePerspective(I,S,W,$,Ke,Xe),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function O(k,se){se===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(se.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;let se=k.near,ae=k.far;v.texture!==null&&(v.depthNear>0&&(se=v.depthNear),v.depthFar>0&&(ae=v.depthFar)),R.near=E.near=C.near=se,R.far=E.far=C.far=ae,(D!==R.near||L!==R.far)&&(r.updateRenderState({depthNear:R.near,depthFar:R.far}),D=R.near,L=R.far),R.layers.mask=k.layers.mask|6,C.layers.mask=R.layers.mask&3,E.layers.mask=R.layers.mask&5;const Ee=k.parent,Ie=R.cameras;O(R,Ee);for(let X=0;X<Ie.length;X++)O(Ie[X],Ee);Ie.length===2?re(R,C,E):R.projectionMatrix.copy(C.projectionMatrix),J(k,R,Ee)};function J(k,se,ae){ae===null?k.matrix.copy(se.matrixWorld):(k.matrix.copy(ae.matrixWorld),k.matrix.invert(),k.matrix.multiply(se.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(se.projectionMatrix),k.projectionMatrixInverse.copy(se.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=nc*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(k){l=k,f!==null&&(f.fixedFoveation=k),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=k)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(R)},this.getCameraTexture=function(k){return p[k]};let ee=null;function we(k,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const ae=u.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let Ee=!1;ae.length!==R.cameras.length&&(R.cameras.length=0,Ee=!0);for(let ue=0;ue<ae.length;ue++){const A=ae[ue];let te=null;if(m!==null)te=m.getViewport(A);else{const Se=d.getViewSubImage(f,A);te=Se.viewport,ue===0&&(e.setRenderTargetTextures(M,Se.colorTexture,Se.depthStencilTexture),e.setRenderTarget(M))}let oe=y[ue];oe===void 0&&(oe=new ln,oe.layers.enable(ue),oe.viewport=new gt,y[ue]=oe),oe.matrix.fromArray(A.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(A.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(te.x,te.y,te.width,te.height),ue===0&&(R.matrix.copy(oe.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Ee===!0&&R.cameras.push(oe)}const Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const ue=d.getDepthInformation(ae[0]);ue&&ue.isValid&&ue.texture&&v.init(ue,r.renderState)}if(Ie&&Ie.includes("camera-access")&&(e.state.unbindTexture(),d))for(let ue=0;ue<ae.length;ue++){const A=ae[ue].camera;if(A){let te=p[A];te||(te=new wd,p[A]=te);const oe=d.getCameraImage(A);te.sourceTexture=oe}}}for(let ae=0;ae<_.length;ae++){const Ee=b[ae],Ie=_[ae];Ee!==null&&Ie!==void 0&&Ie.update(Ee,se,c||o)}ee&&ee(k,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const Pe=new yd;Pe.setAnimationLoop(we),this.setAnimationLoop=function(k){ee=k},this.dispose=function(){}}}const di=new wn,P_=new at;function I_(n,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,md(n)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,x,M,_){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),d(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h)):h.isMeshStandardMaterial?(s(p,h),f(p,h),h.isMeshPhysicalMaterial&&m(p,h,_)):h.isMeshMatcapMaterial?(s(p,h),g(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),v(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(o(p,h),h.isLineDashedMaterial&&a(p,h)):h.isPointsMaterial?l(p,h,x,M):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Gt&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Gt&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const x=e.get(h),M=x.envMap,_=x.envMapRotation;M&&(p.envMap.value=M,di.copy(_),di.x*=-1,di.y*=-1,di.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),p.envMapRotation.value.setFromMatrix4(P_.makeRotationFromEuler(di)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function o(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function a(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,x,M){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*x,p.scale.value=M*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function d(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function f(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,x){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Gt&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function v(p,h){const x=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function L_(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const _=M.program;i.uniformBlockBinding(x,_)}function c(x,M){let _=r[x.id];_===void 0&&(g(x),_=u(x),r[x.id]=_,x.addEventListener("dispose",p));const b=M.program;i.updateUBOMapping(x,b);const w=e.render.frame;s[x.id]!==w&&(f(x),s[x.id]=w)}function u(x){const M=d();x.__bindingPointIndex=M;const _=n.createBuffer(),b=x.__size,w=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,b,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,_),_}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=r[x.id],_=x.uniforms,b=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let w=0,P=_.length;w<P;w++){const C=Array.isArray(_[w])?_[w]:[_[w]];for(let E=0,y=C.length;E<y;E++){const R=C[E];if(m(R,w,E,b)===!0){const D=R.__offset,L=Array.isArray(R.value)?R.value:[R.value];let U=0;for(let B=0;B<L.length;B++){const F=L[B],q=v(F);typeof F=="number"||typeof F=="boolean"?(R.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,D+U,R.__data)):F.isMatrix3?(R.__data[0]=F.elements[0],R.__data[1]=F.elements[1],R.__data[2]=F.elements[2],R.__data[3]=0,R.__data[4]=F.elements[3],R.__data[5]=F.elements[4],R.__data[6]=F.elements[5],R.__data[7]=0,R.__data[8]=F.elements[6],R.__data[9]=F.elements[7],R.__data[10]=F.elements[8],R.__data[11]=0):(F.toArray(R.__data,U),U+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(x,M,_,b){const w=x.value,P=M+"_"+_;if(b[P]===void 0)return typeof w=="number"||typeof w=="boolean"?b[P]=w:b[P]=w.clone(),!0;{const C=b[P];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return b[P]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(x){const M=x.uniforms;let _=0;const b=16;for(let P=0,C=M.length;P<C;P++){const E=Array.isArray(M[P])?M[P]:[M[P]];for(let y=0,R=E.length;y<R;y++){const D=E[y],L=Array.isArray(D.value)?D.value:[D.value];for(let U=0,B=L.length;U<B;U++){const F=L[U],q=v(F),V=_%b,re=V%q.boundary,O=V+re;_+=re,O!==0&&b-O<q.storage&&(_+=b-O),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=_,_+=q.storage}}}const w=_%b;return w>0&&(_+=b-w),x.__size=_,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function h(){for(const x in r)n.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}class D_{constructor(e={}){const{canvas:t=uf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),v=new Int32Array(4);let p=null,h=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let b=!1;this._outputColorSpace=Zt;let w=0,P=0,C=null,E=-1,y=null;const R=new gt,D=new gt;let L=null;const U=new qe(0);let B=0,F=t.width,q=t.height,V=1,re=null,O=null;const J=new gt(0,0,F,q),ee=new gt(0,0,F,q);let we=!1;const Pe=new Ic;let k=!1,se=!1;const ae=new at,Ee=new H,Ie=new gt,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pe=!1;function ue(){return C===null?V:1}let A=i;function te(T,z){return t.getContext(T,z)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xc}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",le,!1),A===null){const z="webgl2";if(A=te(z,T),A===null)throw te(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let oe,Se,ie,ge,K,me,Ke,Xe,I,S,W,$,ne,j,Te,he,Re,De,de,ve,Ne,Ce,xe,Be;function N(){oe=new Gg(A),oe.init(),Ce=new T_(A,oe),Se=new Fg(A,oe,e,Ce),ie=new E_(A,oe),Se.reversedDepthBuffer&&f&&ie.buffers.depth.setReversed(!0),ge=new qg(A),K=new u_,me=new b_(A,oe,ie,K,Se,Ce,ge),Ke=new Bg(_),Xe=new Vg(_),I=new Jf(A),xe=new Ug(A,I),S=new Wg(A,I,ge,xe),W=new Zg(A,S,I,ge),de=new Yg(A,Se,me),he=new Og(K),$=new l_(_,Ke,Xe,oe,Se,xe,he),ne=new I_(_,K),j=new h_,Te=new v_(oe),De=new Dg(_,Ke,Xe,ie,W,m,l),Re=new S_(_,W,Se),Be=new L_(A,ge,Se,ie),ve=new Ng(A,oe,ge),Ne=new Xg(A,oe,ge),ge.programs=$.programs,_.capabilities=Se,_.extensions=oe,_.properties=K,_.renderLists=j,_.shadowMap=Re,_.state=ie,_.info=ge}N();const ce=new C_(_,A);this.xr=ce,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const T=oe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=oe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(F,q,!1))},this.getSize=function(T){return T.set(F,q)},this.setSize=function(T,z,Y=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=T,q=z,t.width=Math.floor(T*V),t.height=Math.floor(z*V),Y===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(F*V,q*V).floor()},this.setDrawingBufferSize=function(T,z,Y){F=T,q=z,V=Y,t.width=Math.floor(T*Y),t.height=Math.floor(z*Y),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(R)},this.getViewport=function(T){return T.copy(J)},this.setViewport=function(T,z,Y,Z){T.isVector4?J.set(T.x,T.y,T.z,T.w):J.set(T,z,Y,Z),ie.viewport(R.copy(J).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(ee)},this.setScissor=function(T,z,Y,Z){T.isVector4?ee.set(T.x,T.y,T.z,T.w):ee.set(T,z,Y,Z),ie.scissor(D.copy(ee).multiplyScalar(V).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(T){ie.setScissorTest(we=T)},this.setOpaqueSort=function(T){re=T},this.setTransparentSort=function(T){O=T},this.getClearColor=function(T){return T.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(T=!0,z=!0,Y=!0){let Z=0;if(T){let G=!1;if(C!==null){const fe=C.texture.format;G=fe===Ac||fe===Tc||fe===bc}if(G){const fe=C.texture.type,ye=fe===An||fe===wi||fe===is||fe===rs||fe===Sc||fe===yc,Ue=De.getClearColor(),Ae=De.getClearAlpha(),ze=Ue.r,He=Ue.g,Fe=Ue.b;ye?(g[0]=ze,g[1]=He,g[2]=Fe,g[3]=Ae,A.clearBufferuiv(A.COLOR,0,g)):(v[0]=ze,v[1]=He,v[2]=Fe,v[3]=Ae,A.clearBufferiv(A.COLOR,0,v))}else Z|=A.COLOR_BUFFER_BIT}z&&(Z|=A.DEPTH_BUFFER_BIT),Y&&(Z|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",le,!1),De.dispose(),j.dispose(),Te.dispose(),K.dispose(),Ke.dispose(),Xe.dispose(),W.dispose(),xe.dispose(),Be.dispose(),$.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",mn),ce.removeEventListener("sessionend",Vc),ri.stop()};function _e(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const T=ge.autoReset,z=Re.enabled,Y=Re.autoUpdate,Z=Re.needsUpdate,G=Re.type;N(),ge.autoReset=T,Re.enabled=z,Re.autoUpdate=Y,Re.needsUpdate=Z,Re.type=G}function le(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Q(T){const z=T.target;z.removeEventListener("dispose",Q),Le(z)}function Le(T){ke(T),K.remove(T)}function ke(T){const z=K.get(T).programs;z!==void 0&&(z.forEach(function(Y){$.releaseProgram(Y)}),T.isShaderMaterial&&$.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,Y,Z,G,fe){z===null&&(z=X);const ye=G.isMesh&&G.matrixWorld.determinant()<0,Ue=jd(T,z,Y,Z,G);ie.setMaterial(Z,ye);let Ae=Y.index,ze=1;if(Z.wireframe===!0){if(Ae=S.getWireframeAttribute(Y),Ae===void 0)return;ze=2}const He=Y.drawRange,Fe=Y.attributes.position;let Ye=He.start*ze,nt=(He.start+He.count)*ze;fe!==null&&(Ye=Math.max(Ye,fe.start*ze),nt=Math.min(nt,(fe.start+fe.count)*ze)),Ae!==null?(Ye=Math.max(Ye,0),nt=Math.min(nt,Ae.count)):Fe!=null&&(Ye=Math.max(Ye,0),nt=Math.min(nt,Fe.count));const pt=nt-Ye;if(pt<0||pt===1/0)return;xe.setup(G,Z,Ue,Y,Ae);let ct,rt=ve;if(Ae!==null&&(ct=I.get(Ae),rt=Ne,rt.setIndex(ct)),G.isMesh)Z.wireframe===!0?(ie.setLineWidth(Z.wireframeLinewidth*ue()),rt.setMode(A.LINES)):rt.setMode(A.TRIANGLES);else if(G.isLine){let Oe=Z.linewidth;Oe===void 0&&(Oe=1),ie.setLineWidth(Oe*ue()),G.isLineSegments?rt.setMode(A.LINES):G.isLineLoop?rt.setMode(A.LINE_LOOP):rt.setMode(A.LINE_STRIP)}else G.isPoints?rt.setMode(A.POINTS):G.isSprite&&rt.setMode(A.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)lr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))rt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Oe=G._multiDrawStarts,ht=G._multiDrawCounts,Je=G._multiDrawCount,Wt=Ae?I.get(Ae).bytesPerElement:1,Ii=K.get(Z).currentProgram.getUniforms();for(let Xt=0;Xt<Je;Xt++)Ii.setValue(A,"_gl_DrawID",Xt),rt.render(Oe[Xt]/Wt,ht[Xt])}else if(G.isInstancedMesh)rt.renderInstances(Ye,pt,G.count);else if(Y.isInstancedBufferGeometry){const Oe=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,ht=Math.min(Y.instanceCount,Oe);rt.renderInstances(Ye,pt,ht)}else rt.render(Ye,pt)};function ot(T,z,Y){T.transparent===!0&&T.side===wt&&T.forceSinglePass===!1?(T.side=Gt,T.needsUpdate=!0,hs(T,z,Y),T.side=ni,T.needsUpdate=!0,hs(T,z,Y),T.side=wt):hs(T,z,Y)}this.compile=function(T,z,Y=null){Y===null&&(Y=T),h=Te.get(Y),h.init(z),M.push(h),Y.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(h.pushLight(G),G.castShadow&&h.pushShadow(G))}),T!==Y&&T.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(h.pushLight(G),G.castShadow&&h.pushShadow(G))}),h.setupLights();const Z=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const fe=G.material;if(fe)if(Array.isArray(fe))for(let ye=0;ye<fe.length;ye++){const Ue=fe[ye];ot(Ue,Y,G),Z.add(Ue)}else ot(fe,Y,G),Z.add(fe)}),h=M.pop(),Z},this.compileAsync=function(T,z,Y=null){const Z=this.compile(T,z,Y);return new Promise(G=>{function fe(){if(Z.forEach(function(ye){K.get(ye).currentProgram.isReady()&&Z.delete(ye)}),Z.size===0){G(T);return}setTimeout(fe,10)}oe.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let tt=null;function Rn(T){tt&&tt(T)}function mn(){ri.stop()}function Vc(){ri.start()}const ri=new yd;ri.setAnimationLoop(Rn),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(T){tt=T,ce.setAnimationLoop(T),T===null?ri.stop():ri.start()},ce.addEventListener("sessionstart",mn),ce.addEventListener("sessionend",Vc),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(z),z=ce.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,z,C),h=Te.get(T,M.length),h.init(z),M.push(h),ae.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Pe.setFromProjectionMatrix(ae,bn,z.reversedDepth),se=this.localClippingEnabled,k=he.init(this.clippingPlanes,se),p=j.get(T,x.length),p.init(),x.push(p),ce.enabled===!0&&ce.isPresenting===!0){const fe=_.xr.getDepthSensingMesh();fe!==null&&vo(fe,z,-1/0,_.sortObjects)}vo(T,z,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(re,O),pe=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,pe&&De.addToRenderList(p,T),this.info.render.frame++,k===!0&&he.beginShadows();const Y=h.state.shadowsArray;Re.render(Y,T,z),k===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=p.opaque,G=p.transmissive;if(h.setupLights(),z.isArrayCamera){const fe=z.cameras;if(G.length>0)for(let ye=0,Ue=fe.length;ye<Ue;ye++){const Ae=fe[ye];Wc(Z,G,T,Ae)}pe&&De.render(T);for(let ye=0,Ue=fe.length;ye<Ue;ye++){const Ae=fe[ye];Gc(p,T,Ae,Ae.viewport)}}else G.length>0&&Wc(Z,G,T,z),pe&&De.render(T),Gc(p,T,z);C!==null&&P===0&&(me.updateMultisampleRenderTarget(C),me.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(_,T,z),xe.resetDefaultState(),E=-1,y=null,M.pop(),M.length>0?(h=M[M.length-1],k===!0&&he.setGlobalState(_.clippingPlanes,h.state.camera)):h=null,x.pop(),x.length>0?p=x[x.length-1]:p=null};function vo(T,z,Y,Z){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)Y=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)h.pushLight(T),T.castShadow&&h.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Pe.intersectsSprite(T)){Z&&Ie.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ae);const ye=W.update(T),Ue=T.material;Ue.visible&&p.push(T,ye,Ue,Y,Ie.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Pe.intersectsObject(T))){const ye=W.update(T),Ue=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ie.copy(T.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ie.copy(ye.boundingSphere.center)),Ie.applyMatrix4(T.matrixWorld).applyMatrix4(ae)),Array.isArray(Ue)){const Ae=ye.groups;for(let ze=0,He=Ae.length;ze<He;ze++){const Fe=Ae[ze],Ye=Ue[Fe.materialIndex];Ye&&Ye.visible&&p.push(T,ye,Ye,Y,Ie.z,Fe)}}else Ue.visible&&p.push(T,ye,Ue,Y,Ie.z,null)}}const fe=T.children;for(let ye=0,Ue=fe.length;ye<Ue;ye++)vo(fe[ye],z,Y,Z)}function Gc(T,z,Y,Z){const G=T.opaque,fe=T.transmissive,ye=T.transparent;h.setupLightsView(Y),k===!0&&he.setGlobalState(_.clippingPlanes,Y),Z&&ie.viewport(R.copy(Z)),G.length>0&&ds(G,z,Y),fe.length>0&&ds(fe,z,Y),ye.length>0&&ds(ye,z,Y),ie.buffers.depth.setTest(!0),ie.buffers.depth.setMask(!0),ie.buffers.color.setMask(!0),ie.setPolygonOffset(!1)}function Wc(T,z,Y,Z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[Z.id]===void 0&&(h.state.transmissionRenderTarget[Z.id]=new Ri(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?cs:An,minFilter:Si,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const fe=h.state.transmissionRenderTarget[Z.id],ye=Z.viewport||R;fe.setSize(ye.z*_.transmissionResolutionScale,ye.w*_.transmissionResolutionScale);const Ue=_.getRenderTarget(),Ae=_.getActiveCubeFace(),ze=_.getActiveMipmapLevel();_.setRenderTarget(fe),_.getClearColor(U),B=_.getClearAlpha(),B<1&&_.setClearColor(16777215,.5),_.clear(),pe&&De.render(Y);const He=_.toneMapping;_.toneMapping=ti;const Fe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),h.setupLightsView(Z),k===!0&&he.setGlobalState(_.clippingPlanes,Z),ds(T,Y,Z),me.updateMultisampleRenderTarget(fe),me.updateRenderTargetMipmap(fe),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let nt=0,pt=z.length;nt<pt;nt++){const ct=z[nt],rt=ct.object,Oe=ct.geometry,ht=ct.material,Je=ct.group;if(ht.side===wt&&rt.layers.test(Z.layers)){const Wt=ht.side;ht.side=Gt,ht.needsUpdate=!0,Xc(rt,Y,Z,Oe,ht,Je),ht.side=Wt,ht.needsUpdate=!0,Ye=!0}}Ye===!0&&(me.updateMultisampleRenderTarget(fe),me.updateRenderTargetMipmap(fe))}_.setRenderTarget(Ue,Ae,ze),_.setClearColor(U,B),Fe!==void 0&&(Z.viewport=Fe),_.toneMapping=He}function ds(T,z,Y){const Z=z.isScene===!0?z.overrideMaterial:null;for(let G=0,fe=T.length;G<fe;G++){const ye=T[G],Ue=ye.object,Ae=ye.geometry,ze=ye.group;let He=ye.material;He.allowOverride===!0&&Z!==null&&(He=Z),Ue.layers.test(Y.layers)&&Xc(Ue,z,Y,Ae,He,ze)}}function Xc(T,z,Y,Z,G,fe){T.onBeforeRender(_,z,Y,Z,G,fe),T.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(_,z,Y,Z,T,fe),G.transparent===!0&&G.side===wt&&G.forceSinglePass===!1?(G.side=Gt,G.needsUpdate=!0,_.renderBufferDirect(Y,z,Z,G,T,fe),G.side=ni,G.needsUpdate=!0,_.renderBufferDirect(Y,z,Z,G,T,fe),G.side=wt):_.renderBufferDirect(Y,z,Z,G,T,fe),T.onAfterRender(_,z,Y,Z,G,fe)}function hs(T,z,Y){z.isScene!==!0&&(z=X);const Z=K.get(T),G=h.state.lights,fe=h.state.shadowsArray,ye=G.state.version,Ue=$.getParameters(T,G.state,fe,z,Y),Ae=$.getProgramCacheKey(Ue);let ze=Z.programs;Z.environment=T.isMeshStandardMaterial?z.environment:null,Z.fog=z.fog,Z.envMap=(T.isMeshStandardMaterial?Xe:Ke).get(T.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",Q),ze=new Map,Z.programs=ze);let He=ze.get(Ae);if(He!==void 0){if(Z.currentProgram===He&&Z.lightsStateVersion===ye)return Yc(T,Ue),He}else Ue.uniforms=$.getUniforms(T),T.onBeforeCompile(Ue,_),He=$.acquireProgram(Ue,Ae),ze.set(Ae,He),Z.uniforms=Ue.uniforms;const Fe=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=he.uniform),Yc(T,Ue),Z.needsLights=Qd(T),Z.lightsStateVersion=ye,Z.needsLights&&(Fe.ambientLightColor.value=G.state.ambient,Fe.lightProbe.value=G.state.probe,Fe.directionalLights.value=G.state.directional,Fe.directionalLightShadows.value=G.state.directionalShadow,Fe.spotLights.value=G.state.spot,Fe.spotLightShadows.value=G.state.spotShadow,Fe.rectAreaLights.value=G.state.rectArea,Fe.ltc_1.value=G.state.rectAreaLTC1,Fe.ltc_2.value=G.state.rectAreaLTC2,Fe.pointLights.value=G.state.point,Fe.pointLightShadows.value=G.state.pointShadow,Fe.hemisphereLights.value=G.state.hemi,Fe.directionalShadowMap.value=G.state.directionalShadowMap,Fe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Fe.spotShadowMap.value=G.state.spotShadowMap,Fe.spotLightMatrix.value=G.state.spotLightMatrix,Fe.spotLightMap.value=G.state.spotLightMap,Fe.pointShadowMap.value=G.state.pointShadowMap,Fe.pointShadowMatrix.value=G.state.pointShadowMatrix),Z.currentProgram=He,Z.uniformsList=null,He}function qc(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=to.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Yc(T,z){const Y=K.get(T);Y.outputColorSpace=z.outputColorSpace,Y.batching=z.batching,Y.batchingColor=z.batchingColor,Y.instancing=z.instancing,Y.instancingColor=z.instancingColor,Y.instancingMorph=z.instancingMorph,Y.skinning=z.skinning,Y.morphTargets=z.morphTargets,Y.morphNormals=z.morphNormals,Y.morphColors=z.morphColors,Y.morphTargetsCount=z.morphTargetsCount,Y.numClippingPlanes=z.numClippingPlanes,Y.numIntersection=z.numClipIntersection,Y.vertexAlphas=z.vertexAlphas,Y.vertexTangents=z.vertexTangents,Y.toneMapping=z.toneMapping}function jd(T,z,Y,Z,G){z.isScene!==!0&&(z=X),me.resetTextureUnits();const fe=z.fog,ye=Z.isMeshStandardMaterial?z.environment:null,Ue=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:_r,Ae=(Z.isMeshStandardMaterial?Xe:Ke).get(Z.envMap||ye),ze=Z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,He=!!Y.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Fe=!!Y.morphAttributes.position,Ye=!!Y.morphAttributes.normal,nt=!!Y.morphAttributes.color;let pt=ti;Z.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pt=_.toneMapping);const ct=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,rt=ct!==void 0?ct.length:0,Oe=K.get(Z),ht=h.state.lights;if(k===!0&&(se===!0||T!==y)){const Ut=T===y&&Z.id===E;he.setState(Z,T,Ut)}let Je=!1;Z.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==ht.state.version||Oe.outputColorSpace!==Ue||G.isBatchedMesh&&Oe.batching===!1||!G.isBatchedMesh&&Oe.batching===!0||G.isBatchedMesh&&Oe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Oe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Oe.instancing===!1||!G.isInstancedMesh&&Oe.instancing===!0||G.isSkinnedMesh&&Oe.skinning===!1||!G.isSkinnedMesh&&Oe.skinning===!0||G.isInstancedMesh&&Oe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Oe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Oe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Oe.instancingMorph===!1&&G.morphTexture!==null||Oe.envMap!==Ae||Z.fog===!0&&Oe.fog!==fe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==he.numPlanes||Oe.numIntersection!==he.numIntersection)||Oe.vertexAlphas!==ze||Oe.vertexTangents!==He||Oe.morphTargets!==Fe||Oe.morphNormals!==Ye||Oe.morphColors!==nt||Oe.toneMapping!==pt||Oe.morphTargetsCount!==rt)&&(Je=!0):(Je=!0,Oe.__version=Z.version);let Wt=Oe.currentProgram;Je===!0&&(Wt=hs(Z,z,G));let Ii=!1,Xt=!1,wr=!1;const ft=Wt.getUniforms(),jt=Oe.uniforms;if(ie.useProgram(Wt.program)&&(Ii=!0,Xt=!0,wr=!0),Z.id!==E&&(E=Z.id,Xt=!0),Ii||y!==T){ie.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ft.setValue(A,"projectionMatrix",T.projectionMatrix),ft.setValue(A,"viewMatrix",T.matrixWorldInverse);const Ot=ft.map.cameraPosition;Ot!==void 0&&Ot.setValue(A,Ee.setFromMatrixPosition(T.matrixWorld)),Se.logarithmicDepthBuffer&&ft.setValue(A,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&ft.setValue(A,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Xt=!0,wr=!0)}if(G.isSkinnedMesh){ft.setOptional(A,G,"bindMatrix"),ft.setOptional(A,G,"bindMatrixInverse");const Ut=G.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),ft.setValue(A,"boneTexture",Ut.boneTexture,me))}G.isBatchedMesh&&(ft.setOptional(A,G,"batchingTexture"),ft.setValue(A,"batchingTexture",G._matricesTexture,me),ft.setOptional(A,G,"batchingIdTexture"),ft.setValue(A,"batchingIdTexture",G._indirectTexture,me),ft.setOptional(A,G,"batchingColorTexture"),G._colorsTexture!==null&&ft.setValue(A,"batchingColorTexture",G._colorsTexture,me));const Jt=Y.morphAttributes;if((Jt.position!==void 0||Jt.normal!==void 0||Jt.color!==void 0)&&de.update(G,Y,Wt),(Xt||Oe.receiveShadow!==G.receiveShadow)&&(Oe.receiveShadow=G.receiveShadow,ft.setValue(A,"receiveShadow",G.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(jt.envMap.value=Ae,jt.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&z.environment!==null&&(jt.envMapIntensity.value=z.environmentIntensity),Xt&&(ft.setValue(A,"toneMappingExposure",_.toneMappingExposure),Oe.needsLights&&Jd(jt,wr),fe&&Z.fog===!0&&ne.refreshFogUniforms(jt,fe),ne.refreshMaterialUniforms(jt,Z,V,q,h.state.transmissionRenderTarget[T.id]),to.upload(A,qc(Oe),jt,me)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(to.upload(A,qc(Oe),jt,me),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&ft.setValue(A,"center",G.center),ft.setValue(A,"modelViewMatrix",G.modelViewMatrix),ft.setValue(A,"normalMatrix",G.normalMatrix),ft.setValue(A,"modelMatrix",G.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Ut=Z.uniformsGroups;for(let Ot=0,xo=Ut.length;Ot<xo;Ot++){const si=Ut[Ot];Be.update(si,Wt),Be.bind(si,Wt)}}return Wt}function Jd(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function Qd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,z,Y){const Z=K.get(T);Z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),K.get(T.texture).__webglTexture=z,K.get(T.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:Y,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,z){const Y=K.get(T);Y.__webglFramebuffer=z,Y.__useDefaultFramebuffer=z===void 0};const eh=A.createFramebuffer();this.setRenderTarget=function(T,z=0,Y=0){C=T,w=z,P=Y;let Z=!0,G=null,fe=!1,ye=!1;if(T){const Ae=K.get(T);if(Ae.__useDefaultFramebuffer!==void 0)ie.bindFramebuffer(A.FRAMEBUFFER,null),Z=!1;else if(Ae.__webglFramebuffer===void 0)me.setupRenderTarget(T);else if(Ae.__hasExternalTextures)me.rebindTextures(T,K.get(T.texture).__webglTexture,K.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Fe=T.depthTexture;if(Ae.__boundDepthTexture!==Fe){if(Fe!==null&&K.has(Fe)&&(T.width!==Fe.image.width||T.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");me.setupDepthRenderbuffer(T)}}const ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ye=!0);const He=K.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[z])?G=He[z][Y]:G=He[z],fe=!0):T.samples>0&&me.useMultisampledRTT(T)===!1?G=K.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?G=He[Y]:G=He,R.copy(T.viewport),D.copy(T.scissor),L=T.scissorTest}else R.copy(J).multiplyScalar(V).floor(),D.copy(ee).multiplyScalar(V).floor(),L=we;if(Y!==0&&(G=eh),ie.bindFramebuffer(A.FRAMEBUFFER,G)&&Z&&ie.drawBuffers(T,G),ie.viewport(R),ie.scissor(D),ie.setScissorTest(L),fe){const Ae=K.get(T.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ae.__webglTexture,Y)}else if(ye){const Ae=z;for(let ze=0;ze<T.textures.length;ze++){const He=K.get(T.textures[ze]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+ze,He.__webglTexture,Y,Ae)}}else if(T!==null&&Y!==0){const Ae=K.get(T.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ae.__webglTexture,Y)}E=-1},this.readRenderTargetPixels=function(T,z,Y,Z,G,fe,ye,Ue=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=K.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae){ie.bindFramebuffer(A.FRAMEBUFFER,Ae);try{const ze=T.textures[Ue],He=ze.format,Fe=ze.type;if(!Se.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Se.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-Z&&Y>=0&&Y<=T.height-G&&(T.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Ue),A.readPixels(z,Y,Z,G,Ce.convert(He),Ce.convert(Fe),fe))}finally{const ze=C!==null?K.get(C).__webglFramebuffer:null;ie.bindFramebuffer(A.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(T,z,Y,Z,G,fe,ye,Ue=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=K.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae)if(z>=0&&z<=T.width-Z&&Y>=0&&Y<=T.height-G){ie.bindFramebuffer(A.FRAMEBUFFER,Ae);const ze=T.textures[Ue],He=ze.format,Fe=ze.type;if(!Se.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Se.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Ye),A.bufferData(A.PIXEL_PACK_BUFFER,fe.byteLength,A.STREAM_READ),T.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Ue),A.readPixels(z,Y,Z,G,Ce.convert(He),Ce.convert(Fe),0);const nt=C!==null?K.get(C).__webglFramebuffer:null;ie.bindFramebuffer(A.FRAMEBUFFER,nt);const pt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await df(A,pt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Ye),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,fe),A.deleteBuffer(Ye),A.deleteSync(pt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,z=null,Y=0){const Z=Math.pow(2,-Y),G=Math.floor(T.image.width*Z),fe=Math.floor(T.image.height*Z),ye=z!==null?z.x:0,Ue=z!==null?z.y:0;me.setTexture2D(T,0),A.copyTexSubImage2D(A.TEXTURE_2D,Y,0,0,ye,Ue,G,fe),ie.unbindTexture()};const th=A.createFramebuffer(),nh=A.createFramebuffer();this.copyTextureToTexture=function(T,z,Y=null,Z=null,G=0,fe=null){fe===null&&(G!==0?(lr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),fe=G,G=0):fe=0);let ye,Ue,Ae,ze,He,Fe,Ye,nt,pt;const ct=T.isCompressedTexture?T.mipmaps[fe]:T.image;if(Y!==null)ye=Y.max.x-Y.min.x,Ue=Y.max.y-Y.min.y,Ae=Y.isBox3?Y.max.z-Y.min.z:1,ze=Y.min.x,He=Y.min.y,Fe=Y.isBox3?Y.min.z:0;else{const Jt=Math.pow(2,-G);ye=Math.floor(ct.width*Jt),Ue=Math.floor(ct.height*Jt),T.isDataArrayTexture?Ae=ct.depth:T.isData3DTexture?Ae=Math.floor(ct.depth*Jt):Ae=1,ze=0,He=0,Fe=0}Z!==null?(Ye=Z.x,nt=Z.y,pt=Z.z):(Ye=0,nt=0,pt=0);const rt=Ce.convert(z.format),Oe=Ce.convert(z.type);let ht;z.isData3DTexture?(me.setTexture3D(z,0),ht=A.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(me.setTexture2DArray(z,0),ht=A.TEXTURE_2D_ARRAY):(me.setTexture2D(z,0),ht=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,z.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,z.unpackAlignment);const Je=A.getParameter(A.UNPACK_ROW_LENGTH),Wt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Ii=A.getParameter(A.UNPACK_SKIP_PIXELS),Xt=A.getParameter(A.UNPACK_SKIP_ROWS),wr=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,ct.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,ct.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,ze),A.pixelStorei(A.UNPACK_SKIP_ROWS,He),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Fe);const ft=T.isDataArrayTexture||T.isData3DTexture,jt=z.isDataArrayTexture||z.isData3DTexture;if(T.isDepthTexture){const Jt=K.get(T),Ut=K.get(z),Ot=K.get(Jt.__renderTarget),xo=K.get(Ut.__renderTarget);ie.bindFramebuffer(A.READ_FRAMEBUFFER,Ot.__webglFramebuffer),ie.bindFramebuffer(A.DRAW_FRAMEBUFFER,xo.__webglFramebuffer);for(let si=0;si<Ae;si++)ft&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,K.get(T).__webglTexture,G,Fe+si),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,K.get(z).__webglTexture,fe,pt+si)),A.blitFramebuffer(ze,He,ye,Ue,Ye,nt,ye,Ue,A.DEPTH_BUFFER_BIT,A.NEAREST);ie.bindFramebuffer(A.READ_FRAMEBUFFER,null),ie.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||K.has(T)){const Jt=K.get(T),Ut=K.get(z);ie.bindFramebuffer(A.READ_FRAMEBUFFER,th),ie.bindFramebuffer(A.DRAW_FRAMEBUFFER,nh);for(let Ot=0;Ot<Ae;Ot++)ft?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Jt.__webglTexture,G,Fe+Ot):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Jt.__webglTexture,G),jt?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Ut.__webglTexture,fe,pt+Ot):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ut.__webglTexture,fe),G!==0?A.blitFramebuffer(ze,He,ye,Ue,Ye,nt,ye,Ue,A.COLOR_BUFFER_BIT,A.NEAREST):jt?A.copyTexSubImage3D(ht,fe,Ye,nt,pt+Ot,ze,He,ye,Ue):A.copyTexSubImage2D(ht,fe,Ye,nt,ze,He,ye,Ue);ie.bindFramebuffer(A.READ_FRAMEBUFFER,null),ie.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else jt?T.isDataTexture||T.isData3DTexture?A.texSubImage3D(ht,fe,Ye,nt,pt,ye,Ue,Ae,rt,Oe,ct.data):z.isCompressedArrayTexture?A.compressedTexSubImage3D(ht,fe,Ye,nt,pt,ye,Ue,Ae,rt,ct.data):A.texSubImage3D(ht,fe,Ye,nt,pt,ye,Ue,Ae,rt,Oe,ct):T.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,fe,Ye,nt,ye,Ue,rt,Oe,ct.data):T.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,fe,Ye,nt,ct.width,ct.height,rt,ct.data):A.texSubImage2D(A.TEXTURE_2D,fe,Ye,nt,ye,Ue,rt,Oe,ct);A.pixelStorei(A.UNPACK_ROW_LENGTH,Je),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Wt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ii),A.pixelStorei(A.UNPACK_SKIP_ROWS,Xt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,wr),fe===0&&z.generateMipmaps&&A.generateMipmap(ht),ie.unbindTexture()},this.copyTextureToTexture3D=function(T,z,Y=null,Z=null,G=0){return lr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,z,Y,Z,G)},this.initRenderTarget=function(T){K.get(T).__webglFramebuffer===void 0&&me.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?me.setTextureCube(T,0):T.isData3DTexture?me.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?me.setTexture2DArray(T,0):me.setTexture2D(T,0),ie.unbindTexture()},this.resetState=function(){w=0,P=0,C=null,ie.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const $t={centerX:0,centerZ:0,calmRadius:142,fullRadius:172,worldLimit:220,maxWaveScale:1.4};function eu(n,e){return Number.isFinite(n)?n:e}function U_(n,e,t){return Math.min(t,Math.max(e,n))}function go(n,e){const t=eu(n,$t.centerX)-$t.centerX,i=eu(e,$t.centerZ)-$t.centerZ,r=Math.hypot(t,i),s=Math.max(r,1e-9),o=t/s,a=i/s,l=-o,c=-a,u=$t.fullRadius-$t.calmRadius,d=U_((r-$t.calmRadius)/u,0,1),f=d*d*(3-2*d),m=d>0&&d<1?6*d*(1-d)/u:0;return{intensity:f,inwardX:l,inwardZ:c,gradientX:o*m,gradientZ:a*m}}const tu={velocityX:-9,velocityZ:0};function rr(n,e){return Number.isFinite(n)?n:e}function xr(n=0){const e=rr(tu.velocityX,0),t=rr(tu.velocityZ,0);return{x:e,z:t,speed:Math.hypot(e,t)}}function Oc(n,e,t){const i=rr(n?.x??0,0)-rr(e,0),r=rr(n?.z??0,0)-rr(t,0);return{x:i,z:r,speed:Math.hypot(i,r)}}const st={minAngle:8*Math.PI/180,maxAngle:85*Math.PI/180,defaultAngle:85*Math.PI/180,trimRate:25*Math.PI/180,noGoAngle:40*Math.PI/180,trueWindNoGoSoftness:8*Math.PI/180,maxDriveAcceleration:5.8,maxLateralAcceleration:1.6,sailingMaxYawRate:1.1,stallYawRate:.55,manualBoostFraction:.45};function ia(n,e){return Number.isFinite(n)?n:e}function hi(n,e,t){return Math.min(t,Math.max(e,n))}function nu(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function pn(n,e=st.defaultAngle,t=0){const i=ia(n?.heading??0,0),r=Oc(xr(),n?.velocityX??0,n?.velocityZ??0),s=r.speed,o=s>1e-7?-r.x/s:0,a=s>1e-7?-r.z/s:1,l=Math.sin(i),c=Math.cos(i),u=l,d=c,f=c,m=-l,g=o*f+a*m,v=o*u+a*d,p=Math.atan2(g,v),h=Math.sign(p)||1,x=Math.abs(p),M=xr(),_=M.speed||1,b=-M.x/_,w=-M.z/_,P=b*f+w*m,C=b*u+w*d,E=Math.abs(Math.atan2(P,C)),y=st.noGoAngle-st.trueWindNoGoSoftness,R=Math.min(E,x),D=R<st.noGoAngle,L=hi(ia(e,st.defaultAngle),st.minAngle,st.maxAngle),U=hi(x*.5,st.minAngle,st.maxAngle),B=Math.abs(L-U),F=Math.max(0,1-B/(35*Math.PI/180)),q=.35+.65*Math.sin(hi(x,0,Math.PI)),V=hi((R-y)/(2*st.trueWindNoGoSoftness),0,1),re=V*V*(3-2*V),O=hi(s/9,0,1.35),J=hi(1-Math.max(0,ia(t,0)),0,1),ee=hi(F*q*O*J*re,0,1),we=h*L,Pe=ee*st.maxDriveAcceleration,k=D?0:-h*ee*st.maxLateralAcceleration*.5;return{driveAcceleration:Pe,lateralAcceleration:k,power:ee,suggestedAngle:U,signedAngle:nu(we),relativeWindAngle:nu(p),noGo:D}}const gn={targetEfficiency:.75,assistRate:25*Math.PI/180,boostMinSpeed:1.5,boostStableSeconds:.35,boostDurationSeconds:1.4,boostCooldownSeconds:5,sweetSpotEnter:.9,sweetSpotExit:.78};function On(n,e){return Number.isFinite(n)?n:e}function Gr(n,e,t){return Math.min(t,Math.max(e,n))}function N_(n,e,t){return n<e?Math.min(n+t,e):Math.max(n-t,e)}function $r(n){return Gr(On(n,st.defaultAngle),st.minAngle,st.maxAngle)}function Rd(n){const e=pn(n,st.defaultAngle).suggestedAngle,t=pn(n,e);return{idealAngle:$r(e),peak:t.power}}function F_(n){const e=Rd(n);if(e.peak<=1e-6)return{angle:$r(e.idealAngle),efficiency:0};const t=e.peak*gn.targetEfficiency;let i=e.idealAngle,r=st.maxAngle;const s=pn(n,r).power<=t;s||(i=st.minAngle,r=e.idealAngle);for(let l=0;l<8;l+=1){const c=(i+r)*.5,u=pn(n,c).power;s?u>t?i=c:r=c:u>t?r=c:i=c}const o=(i+r)*.5,a=pn(n,o).power;return{angle:o,efficiency:a/e.peak}}function iu(){return{sailAngle:st.defaultAngle,mode:"auto",engaged:!1,efficiency:0,sweetSpot:!1,boost:0,boostSerial:0,stableSeconds:0,cooldownSeconds:0,boostArmed:!0}}function $n(n){return{...n,boost:0,sweetSpot:!1,stableSeconds:0,cooldownSeconds:Math.max(On(n?.cooldownSeconds??0,0),gn.boostCooldownSeconds),boostArmed:!1}}function ru(n,e,t,i){const r=Number.isFinite(i)&&i>0?Math.min(i,.25):0,s=Gr(On(t?.sheet??0,0),-1,1),o=Math.abs(s)>1e-4;let a=n?.mode==="manual"?"manual":"auto",l=n?.engaged===!0,c=$r(n?.sailAngle??st.defaultAngle),u=Math.max(0,On(n?.cooldownSeconds??0,0)-r),d=Gr(On(n?.boost??0,0),0,1),f=Math.max(0,Math.floor(On(n?.boostSerial??0,0))),m=Math.max(0,On(n?.stableSeconds??0,0)),g=n?.boostArmed!==!1;o?(a="manual",l=!0,c=$r(c+s*st.trimRate*r)):t?.resumeAuto===!0?(a="auto",l=!0,d=0,m=0):t?.engage===!0&&(l=!0);const v=pn(e,c);t?.suppressed===!0&&(d=0,m=0);const p=Rd(e);let h=p.peak>1e-6?v.power/p.peak:0,x=n?.sweetSpot===!0;if(t?.resumeAuto===!0&&(x=!1),h<gn.sweetSpotExit?x=!1:h>=gn.sweetSpotEnter&&(x=!0),a==="auto"&&l&&t?.suppressed!==!0){const M=F_(e);c=N_(c,M.angle,gn.assistRate*r);const _=pn(e,c);h=p.peak>1e-6?_.power/p.peak:0,x=!1,d=0,m=0}else{h<gn.sweetSpotExit&&(x=!1,g=!0,m=0);const M=On(e.heading,0),_=e.velocityX*Math.sin(M)+e.velocityZ*Math.cos(M),b=a==="manual"&&!t?.suppressed&&!v.noGo&&_>=gn.boostMinSpeed&&x;m=b?m+r:0,d>0?(d=Math.max(0,d-r/gn.boostDurationSeconds),(!b||v.noGo||t?.suppressed)&&(d=0),d===0&&(u=gn.boostCooldownSeconds)):b&&g&&m>=gn.boostStableSeconds&&u<=0&&(d=1,f+=1,m=0,g=!1)}return{sailAngle:$r(c),mode:a,engaged:l,efficiency:Gr(On(h,0),0,1),sweetSpot:x,boost:Gr(d,0,1),boostSerial:f,stableSeconds:m,cooldownSeconds:u,boostArmed:g}}const O_=.18,sr=1.42;function B_(n,e){const t=new Jn;t.name="phase-two-landmarks",n.add(t);const i=[],r=[],s=[],o=[];e.forEach((c,u)=>{const d=z_(c,u,i);if(t.add(d.group),o.push({id:c.id,group:d.group}),c.id==="island-projects"){const f=c.landCollisionRadius*.4666666666666666/Math.SQRT2;s.push({x:c.position.x+f,y:er(d.group,f,f),z:c.position.z+f})}r.push({id:c.id,position:d.anchor.clone().add(new H(c.position.x,0,c.position.z))})}),t.updateMatrixWorld(!0);const a=o.map(({id:c,group:u})=>({id:c,bounds:new ii().setFromObject(u)}));let l=!1;return{group:t,anchors:r,windFlagAnchors:s,landmarkBounds:a,dispose:()=>{if(!l){l=!0;for(const c of i)c.dispose();t.removeFromParent(),t.clear()}}}}function z_(n,e,t){const i=n.landCollisionRadius,r=n.dockingTriggerRadius,s=new Jn;s.name=n.id,s.userData={islandId:n.id,landCollisionRadius:n.landCollisionRadius,dockingTriggerRadius:n.dockingTriggerRadius},s.position.set(n.position.x,0,n.position.z);const o=dr(new en({color:n.palette.sand,roughness:.9,metalness:0,flatShading:!0}),t),a=dr(new en({color:n.palette.land,roughness:.92,metalness:0,flatShading:!0}),t),l=dr(new en({color:n.palette.rock,roughness:.96,metalness:0,flatShading:!0}),t),c=It(new nn(i*.78,i*.98,.48,10,1,!1),t),u=new Ve(c,o);u.name="sand-shelf",u.position.y=sr+.24,s.add(u);const d=sr+.48;H_(s,n,e,d,i,a,t),V_(s,n,e,i,l,t),k_(s,n,i,o,a,l,t);const f=G_(r,t);f.position.y=sr+O_,s.add(f);const m=i*.82,g=new H(m,sr+.12,m);return{group:s,anchor:g}}function k_(n,e,t,i,r,s,o){if(e.id==="island-resume"){const a=-t*.22,l=t*.58,c=er(n,a,l),u=Math.max(2.1,t*.29),d=It(new nn(t*.13,t*.17,u,6,1,!1),o),f=new Ve(d,s);f.name="chartroom-tower",f.userData={detailRole:"tower",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const m=It(new Ai(t*.23,.34,6,1,!1),o),g=new Ve(m,i);g.name="chartroom-tower-roof",g.userData={detailRole:"tower-roof",supportY:c+u},g.position.set(f.position.x,c+u+.17,f.position.z),n.add(g);return}if(e.id==="island-projects"){const a=new H(1,0,1).normalize(),l=new H(-a.z,0,a.x),c=t*.26,u=t*.12,d=a.clone().multiplyScalar(t*.84),f=er(n,d.x,d.z),m=It(new Ci(u,.16,c),o),g=dr(new en({color:7754044,roughness:.9,flatShading:!0}),o),v=new Ve(m,g);v.name="shipyard-dock",v.userData={detailRole:"dock",supportY:f},v.position.set(d.x,f+.08,d.z),v.rotation.y=Math.PI/4,n.add(v);const p=It(new nn(t*.045,t*.055,.74,6,1,!1),o);for(const h of[t*.76,t*.93]){const x=a.clone().multiplyScalar(h).add(l.clone().multiplyScalar(t*.055)),M=new Ve(p,s);M.name="shipyard-dock-pile";const _=er(n,x.x,x.z);M.userData={detailRole:"dock-pile",supportY:_},M.position.set(x.x,_+.37,x.z),n.add(M)}return}if(e.id==="island-writing"){const a=-t*.5,l=t*.55,c=er(n,a,l),u=Math.max(1.65,t*.23),d=It(new nn(t*.055,t*.075,u,6,1,!1),o),f=new Ve(d,s);f.name="logbook-marker",f.userData={detailRole:"marker",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const m=It(new Ai(t*.14,.24,5,1,!1),o),g=new Ve(m,i);g.name="logbook-marker-cap",g.userData={detailRole:"marker-cap",supportY:c+u},g.position.set(f.position.x,c+u+.12,f.position.z),n.add(g);return}if(e.id==="island-media"){const a=t*.58,l=t*.18,c=er(n,a,l),u=Math.max(1.95,t*.27),d=It(new nn(t*.13,t*.18,u,8,1,!1),o),f=new Ve(d,s);f.name="signal-cove-light",f.userData={detailRole:"lighthouse",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const m=It(new Ai(t*.2,.3,8,1,!1),o),g=new Ve(m,i);g.name="signal-cove-light-cap",g.userData={detailRole:"lighthouse-cap",supportY:c+u},g.position.set(f.position.x,c+u+.15,f.position.z),n.add(g);const v=It(new Uc(t*.05,8,4),o),p=dr(new en({color:16772522,emissive:16754984,emissiveIntensity:1.8,roughness:.35,metalness:0,flatShading:!0}),o),h=new Ve(v,p);h.name="signal-cove-lantern",h.userData={detailRole:"lighthouse-lantern",supportY:c+u},h.position.set(f.position.x,c+u+.4,f.position.z),n.add(h)}}function er(n,e,t){n.updateMatrixWorld(!0);const i=new Kf(new H(n.position.x+e,20,n.position.z+t),new H(0,-1,0)),r=n.children.filter(o=>o instanceof Ve&&(o.name==="sand-shelf"||o.name.startsWith("landform-")||o.name==="rock-facet")),s=i.intersectObjects(r,!1)[0];return s?s.point.y-n.position.y:sr+.24}function H_(n,e,t,i,r,s,o){const a=t*37%90*(Math.PI/180),l=Math.max(1.35,r*.34);if(e.landform==="twin-peaks"){const d=It(new Ai(r*.38,l*1.12,6,1,!1),o);for(const[f,m,g]of[[-r*.24,r*.05,.92],[r*.24,-r*.04,.78]]){const v=new Ve(d,s);v.name="landform-twin-peak",v.position.set(f,i+l*g/2,m),v.scale.set(g,g,g),v.rotation.y=a,n.add(v)}return}if(e.landform==="ridge"){const d=It(new Ai(r*.68,l*.86,7,1,!1),o),f=new Ve(d,s);f.name="landform-ridge",f.position.y=i+l*.43,f.scale.set(1.35,1,.58),f.rotation.y=a,n.add(f);return}if(e.landform==="mesa"){const d=It(new nn(r*.54,r*.76,l*.9,7,1,!1),o),f=new Ve(d,s);f.name="landform-mesa",f.position.y=i+l*.45,f.rotation.y=a,n.add(f);return}const c=It(new fo(r*.63,1),o),u=new Ve(c,s);u.name="landform-mound",u.position.y=i+l*.42,u.scale.set(1.05,.58,.9),u.rotation.y=a,n.add(u)}function V_(n,e,t,i,r,s){const o=It(new Dc(i*.13,0),s),a=e.landform==="twin-peaks"?4:3;for(let l=0;l<a;l+=1){const c=(t*1.9+l*2.1)%(Math.PI*2),u=i*(.48+l*.08),d=new Ve(o,r);d.name="rock-facet",d.position.set(Math.cos(c)*u,sr+.55+l%2*.14,Math.sin(c)*u),d.scale.set(1,.8+l%2*.25,.8),d.rotation.set(.2*l,c,.1*t),n.add(d)}}function G_(n,e){const t=[];for(let a=0;a<=96;a+=1){const l=a/96*Math.PI*2;t.push(new H(Math.cos(l)*n,0,Math.sin(l)*n))}const r=It(new _t().setFromPoints(t),e),s=dr(new Xf({color:16052196,dashSize:.72,gapSize:.48,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1}),e),o=new Vf(r,s);return o.name="docking-boundary",o.userData={dockingTriggerRadius:n},o.computeLineDistances(),o.renderOrder=4,o}function It(n,e){return e.push(n),n}function dr(n,e){return e.push(n),n}const Yi=220,W_=5.5,X_=60,q_=90,Y_=60;function Z_(){const n=new Nc(-1,1,1,-1,.1,1200);n.position.set(Yi,Yi,Yi);let e=0,t=0,i=!1;const r=()=>{n.position.set(e+Yi,Yi,t+Yi),n.lookAt(e,0,t),n.updateMatrixWorld(!0)};return r(),{camera:n,resize:(s,o)=>{if(i)return;const a=Math.max(1,s),l=Math.max(1,o),c=a/l,u=l<=460?Y_*.5:a<=600?X_/c*.5:q_*.5,d=u*c;n.left=-d,n.right=d,n.top=u,n.bottom=-u,n.updateProjectionMatrix(),r()},update:(s,o,a)=>{if(i)return;const l=1-Math.exp(-Math.max(0,a)*W_);e+=(s-e)*l,t+=(o-t)*l,r()},snapTo:(s,o)=>{i||(e=s,t=o,r())},dispose:()=>{i=!0}}}const oc=5370206;function Hs(n,e,t){let i=Math.imul(n|0,521288629)^Math.imul(e|0,1597334677)^Math.imul(t|0,668265261);return i=Math.imul(i^i>>>15,2246822507),i=Math.imul(i^i>>>13,3266489909),i^=i>>>16,(i>>>0)/4294967295*2-1}function su(n){return n*n*n*(n*(n*6-15)+10)}function ou(n){return 30*n*n*(n*(n-2)+1)}function Vs(n,e,t=oc,i){const r=Number.isFinite(n)?n:0,s=Number.isFinite(e)?e:0,o=Number.isFinite(t)?t:oc,a=Math.floor(r),l=Math.floor(s),c=r-a,u=s-l,d=su(c),f=su(u),m=ou(c),g=ou(u),v=Hs(a,l,o),p=Hs(a+1,l,o),h=Hs(a,l+1,o),x=Hs(a+1,l+1,o),M=v+(p-v)*d,_=h+(x-h)*d,b=i??{value:0,derivativeU:0,derivativeV:0};return b.value=M+(_-M)*f,b.derivativeU=(p-v+(x-h-(p-v))*f)*m,b.derivativeV=(_-M)*g,b}const an={amplitude:.84,waveNumber:Math.PI*2/30,directionX:.92,directionZ:.39,angularSpeed:Math.PI*2/5.8,phase:0,kind:"sine",phaseWarp:3.2,amplitudeVariation:.06},$_={amplitude:.4,waveNumber:Math.PI*2/24,directionX:-.38,directionZ:.925,angularSpeed:Math.PI*2/4.6,phase:0,kind:"cosine",phaseWarp:2.4,amplitudeVariation:-.08},co=[an,$_,{amplitude:.24,waveNumber:Math.PI*2/34,directionX:.74,directionZ:-.673,angularSpeed:Math.PI*2/6.8,phase:0,kind:"sine",phaseWarp:-2.3,amplitudeVariation:-.04},{amplitude:.06,waveNumber:Math.PI*2/11,directionX:.707,directionZ:.707,angularSpeed:Math.PI*2/3.5,phase:0,kind:"cosine",phaseWarp:1.1,amplitudeVariation:-.01},{amplitude:.11,waveNumber:Math.PI*2/52,directionX:.58,directionZ:-.815,angularSpeed:Math.PI*2/8.7,phase:1.7,kind:"sine",phaseWarp:.42,amplitudeVariation:.03},{amplitude:.07,waveNumber:Math.PI*2/67,directionX:-.7,directionZ:-.714,angularSpeed:Math.PI*2/10.9,phase:-.8,kind:"cosine",phaseWarp:-.31,amplitudeVariation:.02},{amplitude:.05,waveNumber:Math.PI*2/19,directionX:.22,directionZ:.975,angularSpeed:Math.PI*2/4.1,phase:2.3,kind:"sine",phaseWarp:.27,amplitudeVariation:.01},{amplitude:.03,waveNumber:Math.PI*2/43,directionX:-.91,directionZ:.414,angularSpeed:Math.PI*2/7.6,phase:-2.1,kind:"cosine",phaseWarp:.2,amplitudeVariation:.01}],Qe={seed:oc,phaseLength:44,phaseWidth:27,phaseSpeed:5.1,packetLength:72,packetWidth:48,packetSpeed:4.6,detailLength:23,detailWidth:41,detailSpeed:3.35,macroLength:137,macroWidth:91,macroSpeed:1.7},ac=1.8,Kr={value:0,derivativeU:0,derivativeV:0},jr={value:0,derivativeU:0,derivativeV:0},vn={value:0,derivativeU:0,derivativeV:0},xn={value:0,derivativeU:0,derivativeV:0},Wr=[1.2,-2.1,1.8,-.9,1.1,-.8,.9,-1.3],Xr=[.9,1.1,-.8,.5,-.9,1.2,-.6,.7],qr=[.11,-.07,-.025,-.025,.025,.018,-.022,-.011],Yr=[.07,-.045,-.015,-.01,-.014,.012,.008,-.006];function hr(n,e){return Number.isFinite(n)?n:e}function Cd(n,e,t,i){Vs((n+t*Qe.phaseSpeed)/Qe.phaseLength+2.731,e/Qe.phaseWidth-4.193,i,Kr),Vs((n+t*Qe.packetSpeed)/Qe.packetLength-7.217,e/Qe.packetWidth+9.431,i^1779033703,jr),Vs((n*.81-e*.59+t*Qe.detailSpeed)/Qe.detailLength+5.173,(n*.59+e*.81)/Qe.detailWidth-2.647,i^3144134277,vn),Vs((n*.93+e*.37+t*Qe.macroSpeed)/Qe.macroLength-8.319,(-n*.37+e*.93)/Qe.macroWidth+1.427,i^1013904242,xn)}function Lt(n,e,t=0,i=Qe.seed){const r=hr(n,0),s=hr(e,0),o=hr(t,0);Cd(r,s,o,i);let a=0;for(let c=0;c<co.length;c+=1){const u=co[c],d=(r*u.directionX+s*u.directionZ)*u.waveNumber+o*u.angularSpeed+u.phase+u.phaseWarp*Kr.value+Wr[c]*vn.value+Xr[c]*xn.value,f=u.amplitude+u.amplitudeVariation*jr.value+qr[c]*vn.value+Yr[c]*xn.value;a+=f*(u.kind==="sine"?Math.sin(d):Math.cos(d))}const l=go(r,s).intensity;return a*(1+l*($t.maxWaveScale-1))}function Jr(n,e,t=0,i=0,r=Qe.seed){const s=hr(n,0),o=hr(e,0),a=hr(t,0);Cd(s,o,a,r);const l=Kr.derivativeU/Qe.phaseLength,c=Kr.derivativeV/Qe.phaseWidth,u=l*Qe.phaseSpeed,d=jr.derivativeU/Qe.packetLength,f=jr.derivativeV/Qe.packetWidth,m=d*Qe.packetSpeed,g=vn.derivativeU*.81/Qe.detailLength+vn.derivativeV*.59/Qe.detailWidth,v=vn.derivativeU*-.59/Qe.detailLength+vn.derivativeV*.81/Qe.detailWidth,p=vn.derivativeU*Qe.detailSpeed/Qe.detailLength,h=xn.derivativeU*.93/Qe.macroLength+xn.derivativeV*-.37/Qe.macroWidth,x=xn.derivativeU*.37/Qe.macroLength+xn.derivativeV*.93/Qe.macroWidth,M=xn.derivativeU*Qe.macroSpeed/Qe.macroLength;let _=0,b=0,w=0,P=0;for(let R=0;R<co.length;R+=1){const D=co[R],L=(s*D.directionX+o*D.directionZ)*D.waveNumber+a*D.angularSpeed+D.phase+D.phaseWarp*Kr.value+Wr[R]*vn.value+Xr[R]*xn.value,U=Math.sin(L),B=Math.cos(L),F=D.kind==="sine"?U:B,q=D.kind==="sine"?B:-U,V=D.amplitude+D.amplitudeVariation*jr.value+qr[R]*vn.value+Yr[R]*xn.value,re=D.amplitudeVariation*d+qr[R]*g+Yr[R]*h,O=D.amplitudeVariation*f+qr[R]*v+Yr[R]*x,J=D.amplitudeVariation*m+qr[R]*p+Yr[R]*M;_+=V*F,b+=re*F+V*q*(D.waveNumber*D.directionX+D.phaseWarp*l+Wr[R]*g+Xr[R]*h),w+=O*F+V*q*(D.waveNumber*D.directionZ+D.phaseWarp*c+Wr[R]*v+Xr[R]*x),P+=J*F+V*q*(D.angularSpeed+D.phaseWarp*u+Wr[R]*p+Xr[R]*M)}const C=go(s,o),E=$t.maxWaveScale-1,y=1+C.intensity*E;if(b=b*y+_*E*C.gradientX,w=w*y+_*E*C.gradientZ,P*=y,_*=y,Number.isFinite(i)&&i>0){const R=Math.max(1e-4,i);b=(Lt(s+R,o,a,r)-Lt(s-R,o,a,r))/(2*R),w=(Lt(s,o+R,a,r)-Lt(s,o-R,a,r))/(2*R)}return{height:_,slopeX:b,slopeZ:w,velocityY:P,stormIntensity:C.intensity}}const cn={centralLimit:180,outerLimit:360,centralStep:4,outerStep:12};function Pd(){const n=[];for(let e=-360;e<-180;e+=cn.outerStep)n.push(e);for(let e=-180;e<=cn.centralLimit;e+=cn.centralStep)n.push(e);for(let e=cn.centralLimit+cn.outerStep;e<=cn.outerLimit;e+=cn.outerStep)n.push(e);return n}function au(n,e,t){return Math.min(t,Math.max(e,n))}function cu(n,e){return Number.isFinite(n)?n:e}function lu(n,e){let t=0,i=n.length-1;for(;i-t>1;){const r=Math.floor((t+i)*.5);n[r]<=e?t=r:i=r}return t}const K_=Pd();function Id(n,e){let t=Math.imul((e|0)^2135587861,73244475);return t=Math.imul(t^((n|0)^1779033703),73244475),t^=t>>>16,t=Math.imul(t,73244475),t^=t>>>16,(t&1)===0}function yi(n,e,t=0){return Ld(n,e,t)}function j_(n,e,t){return Ld(n,e,0,t)}function Ld(n,e,t,i){const r=K_,s=au(cu(n,0),-360,cn.outerLimit),o=au(cu(e,0),-360,cn.outerLimit),a=lu(r,o),l=lu(r,s),c=r[l],u=r[l+1],d=r[a],f=r[a+1],m=u>c?(s-c)/(u-c):0,g=f>d?(o-d)/(f-d):0,v=a*r.length+l,p=i?i[v*3+1]:Lt(c,d,t),h=i?i[(v+1)*3+1]:Lt(u,d,t),x=i?i[(v+r.length)*3+1]:Lt(c,f,t),M=i?i[(v+r.length+1)*3+1]:Lt(u,f,t);return Id(a,l)?m+g<=1?p+g*(x-p)+m*(h-p):M+(1-m)*(x-M)+(1-g)*(h-M):g>=m?p+g*(x-p)+m*(M-x):p+g*(M-h)+m*(h-p)}const ra={gain:2.5,yawDamping:1,deadband:.01};function Or(n,e){return Number.isFinite(n)?n:e}function J_(n,e,t){return Math.min(t,Math.max(e,n))}function Q_(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function ev(n,e){const t=Or(n?.heading??0,0),i=Q_(Or(e,t)-t);if(Math.abs(i)<=ra.deadband)return 0;const r=i*ra.gain-Or(n?.yawRate??0,0)*ra.yawDamping,s=t,a=Or(n?.velocityX??0,0)*Math.sin(s)+Or(n?.velocityZ??0,0)*Math.cos(s)<-.6?-1:1;return J_(-r/a,-1,1)}const Bn={maxSurgeAcceleration:.9,maxSwayAcceleration:.65,slopeAcceleration:2.8,maxInputSlope:8,uphillResistanceScale:12,maxUphillResistanceAcceleration:7.2};function tv(n,e,t,i){const r=bi(-Ei(n?.surgeAcceleration??0,0),0,Bn.maxSurgeAcceleration),s=Math.max(.01,Ei(i,14)),o=bi(Ei(e,0)/s,0,1),a=bi(Ei(t,0),0,1);return-Math.min(r*Bn.uphillResistanceScale*o*o*a,Bn.maxUphillResistanceAcceleration)}function Ei(n,e){return Number.isFinite(n)?n:e}function bi(n,e,t){return Math.min(t,Math.max(e,n))}function nv(n,e){const t=Ei(e,0),i=bi(Ei(n?.slopeX??0,0),-8,Bn.maxInputSlope),r=bi(Ei(n?.slopeZ??0,0),-8,Bn.maxInputSlope),s=-i*Bn.slopeAcceleration,o=-r*Bn.slopeAcceleration,a=Math.sin(t),l=Math.cos(t),c=bi(s*l-o*a,-.65,Bn.maxSwayAcceleration),u=bi(s*a+o*l,-.9,Bn.maxSurgeAcceleration);return{accelerationX:u*a+c*l,accelerationZ:u*l-c*a,surgeAcceleration:u,swayAcceleration:c}}const je={length:5.2,width:2.6,collisionRadius:3.2,maxForwardSpeed:14,maxReverseSpeed:7,maxLateralSpeed:6,brakingAcceleration:15,maxYawRate:.6},sa=180,iv=.25,rv=1/120,uu=1e-7,du=16,sv=2.4,Gs=100;function St(n,e){return Number.isFinite(n)?n:e}function un(n,e,t){return Math.min(t,Math.max(e,n))}function ov(n){return{throttle:un(St(n?.throttle??0,0),-1,1),rudder:un(St(n?.rudder??0,0),-1,1),brake:n?.brake===!0,sheet:un(St(n?.sheet??0,0),-1,1),sailAngle:St(n?.sailAngle??st.defaultAngle,st.defaultAngle),targetHeading:Number.isFinite(n?.targetHeading)?n.targetHeading:void 0,trimBoost:un(St(n?.trimBoost??0,0),0,1)}}function Dd(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function av(n){const e=Math.max(je.maxYawRate,st.sailingMaxYawRate);return{x:St(n?.x??0,0),z:St(n?.z??0,0),velocityX:St(n?.velocityX??0,0),velocityZ:St(n?.velocityZ??0,0),heading:Dd(St(n?.heading??0,0)),yawRate:un(St(n?.yawRate??0,0),-e,e)}}function cv(n){const e=St(n?.worldLimit??sa,sa);return e>0?e:sa}function hu(n,e,t,i,r){const s=Math.max(0,r-je.collisionRadius);return n>s?(n=s,t>0&&(t=0)):n<-s&&(n=-s,t<0&&(t=0)),e>s?(e=s,i>0&&(i=0)):e<-s&&(e=-s,i<0&&(i=0)),[n,e,t,i]}function lv(n,e,t,i,r){for(const s of r){const o=St(s?.x??0,0),a=St(s?.z??0,0),l=St(s?.radius??0,0);if(l<=0)continue;const c=je.collisionRadius+l,u=n-o,d=e-a,f=Math.hypot(u,d);if(f>=c)continue;let m,g;if(f>uu)m=u/f,g=d/f;else{const p=Math.hypot(t,i);p>uu?(m=-t/p,g=-i/p):(m=1,g=0)}n=o+m*c,e=a+g*c;const v=t*m+i*g;v<0&&(t-=v*m,i-=v*g)}return[n,e,t,i]}function Ud(n,e,t,i,r){const s=cv(r),o=Array.isArray(r?.obstacles)?r.obstacles:[];for(let a=0;a<2;a+=1)[n,e,t,i]=hu(n,e,t,i,s),[n,e,t,i]=lv(n,e,t,i,o);return[n,e,t,i]=hu(n,e,t,i,s),[n,e,t,i]}function uv(n,e,t,i,r){const s=Math.sin(n.heading),o=Math.cos(n.heading);let a=n.velocityX*s+n.velocityZ*o,l=n.velocityX*o-n.velocityZ*s;a*=Math.exp(-.35*t),l*=Math.exp(-3.5*t);const c=pn(n,e.sailAngle,e.brake?1:0),u=!e.brake&&c?.noGo!==!0?1+(e.trimBoost??0)*st.manualBoostFraction:1,d=e.brake?0:(c?.driveAcceleration??0)*u;if(a+=d*t,c!==void 0&&(l+=c.lateralAcceleration*t),r!==void 0&&Number.isFinite(r)){const D=nv(Jr(n.x,n.z,r),n.heading);a+=D.surgeAcceleration*t,a+=tv(D,a,c?.power??0,je.maxForwardSpeed)*t,l+=D.swayAcceleration*t}{const D=go(n.x,n.z);if(D.intensity>0){const L=D.inwardX*du*D.intensity,U=D.inwardZ*du*D.intensity,B=un(St(a*s+l*o,0),-Gs,Gs),F=un(St(a*o-l*s,0),-Gs,Gs),q=Math.max(0,B*-D.inwardX+F*-D.inwardZ),V=Math.max(0,q)*sv*D.intensity,re=L+D.inwardX*V,O=U+D.inwardZ*V;a+=(re*s+O*o)*t,l+=(re*o-O*s)*t}}if(e.brake){const D=Math.sign(a)||Math.sign(d),L=je.brakingAcceleration*t;D!==0&&(a=Math.abs(a)<=L?0:a-D*L)}a=un(a,-7,je.maxForwardSpeed),l=un(l,-6,je.maxLateralSpeed);const f=a*s+l*o,m=a*o-l*s,g=a<-.6?-1:1,v=g<0?je.maxReverseSpeed:je.maxForwardSpeed,p=un(Math.abs(a)/v,0,1),h=st.sailingMaxYawRate,x=Math.max(st.stallYawRate/h,.12+p*.88),_=-(e.targetHeading!==void 0?ev(n,e.targetHeading):e.rudder)*g*h*x,b=1-Math.exp(-6.5*t),w=un(n.yawRate+(_-n.yawRate)*b,-h,h),P=Dd(n.heading+w*t);let[C,E,y,R]=Ud(n.x+f*t,n.z+m*t,f,m,i);return{x:C,z:E,velocityX:y,velocityZ:R,heading:P,yawRate:w}}function fu(n=0,e=0){return{x:St(n,0),z:St(e,0),velocityX:0,velocityZ:0,heading:0,yawRate:0}}function dv(n,e,t,i,r){const s=av(n),o=ov(e),a=Number.isFinite(t)&&t>0?Math.min(t,iv):0;let l=Ud(s.x,s.z,s.velocityX,s.velocityZ,i),c={x:l[0],z:l[1],velocityX:l[2],velocityZ:l[3],heading:s.heading,yawRate:s.yawRate},u=a,d=0;for(;u>0;){const f=Math.min(u,rv),m=r!==void 0&&Number.isFinite(r)?r+d:void 0;c=uv(c,o,f,i,m),u-=f,d+=f}return c}const Ht={maxHeave:ac*$t.maxWaveScale,maxWavePitch:.29,maxWaveRoll:.3,maxSpeedLift:.065,maxTurnHeel:.12,maxWindHeel:Math.PI/9,maxWindHeelLift:.1,heaveResponseRate:15,tiltResponseRate:9,maxForwardSpeed:je.maxForwardSpeed,maxYawRate:je.maxYawRate},pu=.01;function mt(n,e){return Number.isFinite(n)?n:e}function Un(n,e,t){return Math.min(t,Math.max(e,n))}function Ws(n){const e=n.reduce((t,i)=>t+i,0);return mt(e/n.length,0)}function hv(n){const e=n.reduce((i,[,r])=>i+r,0),t=n.reduce((i,[r,s])=>i+r*s,0);return e>0?mt(t/e,0):0}function mu(n){return{height:mt(n,0)}}function fv(n,e,t){try{return mu(n(e,t)?.height)}catch{return mu(0)}}function pv(n,e,t,i,r,s){const o=mt(n,0),a=mt(e,0),l=mt(t,0),c=Math.max(pu,Math.abs(mt(i,1))*.5),u=Math.max(pu,Math.abs(mt(r,1))*.5),d=Math.cos(l),f=Math.sin(l),m=(g,v)=>fv(s,o+g*d+v*f,a-g*f+v*d);return{bow:m(0,c),stern:m(0,-c),port:m(-u,0),starboard:m(u,0),bowPort:m(-u,c),bowStarboard:m(u,c),sternPort:m(-u,-c),sternStarboard:m(u,-c)}}function mv(n,e={},t=!1){const i=mt(n?.bow?.height,0),r=mt(n?.stern?.height,0),s=mt(n?.port?.height,0),o=mt(n?.starboard?.height,0),a=mt(n?.bowPort?.height,0),l=mt(n?.bowStarboard?.height,0),c=mt(n?.sternPort?.height,0),u=mt(n?.sternStarboard?.height,0),d=Ws([i,a,l]),f=Ws([r,c,u]),m=Ws([s,a,c]),g=Ws([o,l,u]),v=Un(hv([[i,1],[r,1],[s,1],[o,1],[a,.5],[l,.5],[c,.5],[u,.5]]),-2.52,Ht.maxHeave),p=Un(-Math.atan2(mt(d-f,0),je.length),-.29,Ht.maxWavePitch),h=Un(Math.atan2(mt(g-m,0),je.width),-.3,Ht.maxWaveRoll),x=mt(e?.forwardSpeed,0),M=mt(e?.yawRate,0),_=Un(mt(e?.sailPower,0),0,1),b=mt(e?.relativeWindAngle,0),w=Un(x/Ht.maxForwardSpeed,0,1),P=Un(M/Ht.maxYawRate*Math.min(1,Math.abs(x)/Ht.maxForwardSpeed),-1,1),C=t?0:1,E=w*w*Ht.maxSpeedLift*C,y=-P*Ht.maxTurnHeel*C,R=Math.sin(b),D=Math.abs(R)<1e-6?0:R,L=Math.pow(_,.35),U=Math.sign(D)*Math.pow(Math.abs(D),.65)*L*Ht.maxWindHeel*C,B=Math.abs(U)/Ht.maxWindHeel*Ht.maxWindHeelLift;return{heave:Un(v+B,-2.52,Ht.maxHeave),pitch:Un(p-E,-.36,.36),roll:Un(h+y+U,-.4,.4)}}const Pt={sternPort:{x:-1.3,z:-2.6},sternStarboard:{x:1.3,z:-2.6},shoulderPort:{x:-1.17,z:1.612},shoulderStarboard:{x:1.17,z:1.612},bowPort:{x:-.585,y:-.55,z:1.352},bowStarboard:{x:.585,y:-.55,z:1.352}},gv=[{x:-1.209,y:.47,z:-2.496},{x:1.209,y:.47,z:-2.496},{x:1.16064,y:.47,z:1.54752},{x:0,y:.47,z:2.496},{x:-1.16064,y:.47,z:1.54752}],_v=[{x:0,y:.47,z:-.18},{x:0,y:.465,z:-.34},{x:-.51,y:.47,z:-1.24},{x:.51,y:.47,z:-1.24},{x:-.51,y:.47,z:-.4},{x:.51,y:.47,z:-.4}],vv=[{x:-.884,y:-.55,z:-2.132},{x:.884,y:-.55,z:-2.132},Pt.bowPort,Pt.bowStarboard,{x:0,y:-.37,z:2.236},{x:0,y:-.63,z:-.312}];function xv(n,e,t,i,r,s,o){const a=M=>{const _=Nd(M,r,s,o,e,t);let b=0;try{b=At(i(_.x,_.z),0)}catch{}return _.y-b},l=Math.min(...gv.map(a)),c=Math.min(..._v.map(a)),u=Math.min(...vv.map(a)),d=At(n.leewardRail.clearance,0),f=Math.max(-.06-l,.12-c,-.055-d),m=-.025-u,g=Qr(n.heelLoad/.5,0,1),v=g*g*(3-2*g),p=-Qr(d+.035,0,.6)*v,h=e.heave+f,x=Math.max(h,e.heave+m);return{minimumHeave:h,maximumHeave:x,targetHeave:Qr(e.heave+p,h,x)}}function At(n,e){return Number.isFinite(n)?n:e}function Qr(n,e,t){return Math.min(t,Math.max(e,n))}function Nd(n,e,t,i,r,s){const o=At(r?.roll,0),a=At(r?.pitch,0),l=At(i,0),c=Math.cos(o),u=Math.sin(o),d=Math.cos(a),f=Math.sin(a),m=Math.cos(l),g=Math.sin(l),v=c*n.x-u*n.y,p=u*n.x+c*n.y,h=n.z,x=v,M=d*p-f*h,_=f*p+d*h;return{x:At(e,0)+m*x+g*_,y:At(s,0)+At(r?.heave,0)+M,z:At(t,0)-g*x+m*_}}function gu(n,e,t,i,r,s,o,a,l,c,u,d=0,f=0){const m=Math.max(.01,Math.abs(At(s,2.6))/2.6),g=Math.max(.01,Math.abs(At(r,5.2))/5.2),v={},p=At(l,0),h=u?Math.max(0,p-At(u.timeSeconds,p)):0,x=(D,L)=>{const U=Nd(L,n,e,t,i,o);let B=0;try{B=At(c(U.x,U.z),0)}catch{B=0}const F=u?.points[D],q=F&&h>1e-6?(B-F.waterHeight-(U.y-F.y))/h:0,V={...U,waterHeight:B,clearance:U.y-B,closingSpeed:At(q,0)};return v[D]=V,V},M=x("bowPort",{x:Pt.bowPort.x*m,y:Pt.bowPort.y,z:Pt.bowPort.z*g}),_=x("bowStarboard",{x:Pt.bowStarboard.x*m,y:Pt.bowStarboard.y,z:Pt.bowStarboard.z*g}),b=x("portRail",{x:(Pt.sternPort.x+Pt.shoulderPort.x)*.5*m,y:.45,z:(Pt.sternPort.z+Pt.shoulderPort.z)*.5*g}),w=x("starboardRail",{x:(Pt.sternStarboard.x+Pt.shoulderStarboard.x)*.5*m,y:.45,z:(Pt.sternStarboard.z+Pt.shoulderStarboard.z)*.5*g}),P=Qr(At(d,0),0,1),C=At(f,0),E=P*Math.abs(Math.sin(C)),y=Math.sin(C)>=0?"port":"starboard";return{contact:{bowPort:M,bowStarboard:_,leewardRail:y==="port"?b:w,leewardSide:y,heelLoad:Qr(E,0,1),forwardSpeed:At(a,0),sailPower:P,relativeWindAngle:C},history:{timeSeconds:p,points:v}}}const Br=je.length,zr=je.width,Xs=.2,Mv=8*Math.PI/180,qs=85*Math.PI/180,Sv=9,_u=-.34,vu=3;function yv(n){const e=new Jn;e.name="portfolio-sailboat",e.rotation.order="YXZ";const t=[],i=[],r=O=>(t.push(O),O),s=O=>(i.push(O),O),o=s(new en({color:14140835,roughness:.82,metalness:0,flatShading:!0})),a=new Ve(r(Ev(zr,Br)),o);a.name="vessel-faceted-hull",e.add(a);const l=s(new en({color:12088134,roughness:.82,metalness:0,flatShading:!0})),c=new Ve(r(bv(zr,Br)),l);c.name="vessel-warm-wood-deck",e.add(c);const u=s(new en({color:7097150,roughness:.78,metalness:0,flatShading:!0})),d=new Ve(r(new Ci(1.02,.32,.84)),u);d.name="vessel-cockpit-console",d.position.set(0,.63,-.82),e.add(d);const f=s(new en({color:5131331,roughness:.7,metalness:.05,flatShading:!0})),m=new Ve(r(new nn(.085,.12,5.45,6)),f);m.name="vessel-mast",m.position.set(0,3.19,-.34),e.add(m);const g=new Jn;g.name="sail-rig",g.position.set(0,0,_u),e.add(g);const v=O=>{O.position.z-=_u,g.add(O)},p=new Ve(r(new nn(.06,.075,3.1,6)),s(new en({color:15757160,roughness:.64,metalness:0,flatShading:!0})));p.name="vessel-main-boom",p.rotation.x=Math.PI*.5,p.position.set(0,2.04,-1.895),v(p);const h=s(new Tn({color:16775142,side:wt,toneMapped:!1})),x=s(new Tn({color:14339507,side:wt,toneMapped:!1})),M=new Ve(r(Mu(.055,-.6,[[5.8,-.39],[2,-.39],[2.08,-3.4],[3.3,-1.52]])),h);M.name="vessel-cream-mainsail",v(M);const _=new Ve(r(Mu(.062,-.42,[[5.76,-.41],[2.02,-.41],[2.08,-2.74],[3.28,-1.28]])),x);_.name="vessel-mainsail-facet",v(_);const b=s(new en({color:15757160,roughness:.64,metalness:0,side:wt,flatShading:!0})),w=new Ve(r(xu([.073,2.08,-.48,.073,2.12,-3.05,.073,2.38,-2.78])),b);w.name="vessel-coral-main-clew",v(w);const P=new Ve(r(xu([-.52,.7,.96,.52,.7,.96,0,.7,2.18])),b);P.name="vessel-coral-bow",e.add(P);const C={heave:0,pitch:0,roll:0};let E=!1,y=qs,R=qs,D=0,L=0,U={bowPort:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},bowStarboard:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardRail:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardSide:"starboard",heelLoad:0,sailPower:0,relativeWindAngle:0,forwardSpeed:0},B,F=!1;const q=O=>{if(!Number.isFinite(O))return qs;const J=O<0?-1:1,ee=Math.min(qs,Math.max(Mv,Math.abs(O)));return J*ee},V=(O,J)=>{const ee=Number.isFinite(O)&&O>0?Math.min(O,.25):0,we=J||E?1:1-Math.exp(-ee*Sv);y=oa(y,R,we),g.rotation.y=y,g.scale.x=y<0?-1:1},re=(O,J,ee,we)=>{const Pe=Number.isFinite(J)?J:0,k=pv(O.x,O.z,O.heading,Br,zr,(ie,ge)=>({height:yi(ie,ge,Pe)})),se=O.velocityX*Math.sin(O.heading)+O.velocityZ*Math.cos(O.heading),ae=mv(k,{forwardSpeed:se,yawRate:O.yawRate,sailPower:D,relativeWindAngle:L},E),Ee=Number.isFinite(ee)&&ee>0?Math.min(ee,.25):0,Ie=we?1:1-Math.exp(-Ee*Ht.heaveResponseRate),X=we?1:1-Math.exp(-Ee*Ht.tiltResponseRate),pe=(ie,ge)=>{const K=oa(ie,ge,X);return we?K:ie+Math.max(-vu*Ee,Math.min(vu*Ee,K-ie))};C.pitch=pe(C.pitch,ae.pitch),C.roll=pe(C.roll,ae.roll);const ue={...C,heave:ae.heave},A=E?0:D,te=gu(O.x,O.z,O.heading,ue,Br,zr,Xs,se,Pe,(ie,ge)=>yi(ie,ge,Pe),we?void 0:B,A,L),oe=xv(te.contact,ue,Xs,(ie,ge)=>yi(ie,ge,Pe),O.x,O.z,O.heading);C.heave=Math.min(oe.maximumHeave,Math.max(oe.minimumHeave,oa(C.heave,oe.targetHeave,Ie)));const Se=gu(O.x,O.z,O.heading,C,Br,zr,Xs,se,Pe,(ie,ge)=>yi(ie,ge,Pe),we?void 0:B,A,L);U=Se.contact,B=Se.history,e.position.set(Number.isFinite(O.x)?O.x:0,C.heave+Xs,Number.isFinite(O.z)?O.z:0),e.rotation.y=Number.isFinite(O.heading)?O.heading:0,e.rotation.x=C.pitch,e.rotation.z=C.roll,V(ee,we)};return n.add(e),{group:e,update:(O,J,ee)=>{F||re(O,J,ee,!1)},resetPose:(O,J=0)=>{F||(B=void 0,re(O,J,0,!0))},setReducedMotion:O=>{F||(E=O===!0,E&&V(0,!0))},setSailAngle:(O,J=!1)=>{F||(R=q(O),V(0,J))},setSailLoad:(O,J)=>{F||(D=Number.isFinite(O)?Math.min(1,Math.max(0,O)):0,L=Number.isFinite(J)?J:0)},getSailAngle:()=>y,getWaterContact:()=>({...U,bowPort:{...U.bowPort},bowStarboard:{...U.bowStarboard},leewardRail:{...U.leewardRail}}),getPose:()=>({...C}),dispose:()=>{if(!F){F=!0;for(const O of t)O.dispose();for(const O of i)O.dispose();e.removeFromParent(),e.clear()}}}}function Ev(n,e){const t=n*.5,i=e*.5,r=.45,s=-.55,o=[[-t,r,-i],[t,r,-i],[t*.9,r,i*.62],[0,r,i],[-t*.9,r,i*.62]],a=[[-t*.68,s,-i*.82],[t*.68,s,-i*.82],[t*.45,s,i*.52],[0,s+.18,i*.86],[-t*.45,s,i*.52]],l=[];for(const f of o)l.push(...f);for(const f of a)l.push(...f);l.push(0,s-.08,-i*.12);const c=10,u=[];for(let f=0;f<5;f+=1){const m=(f+1)%5;u.push(f,m,5+m,f,5+m,5+f),u.push(c,5+m,5+f)}const d=new _t;return d.setAttribute("position",new dt(l,3)),d.setIndex(u),d.computeVertexNormals(),d}function bv(n,e){const t=n*.5*.93,i=e*.5*.96,r=.47,s=[[-t,r,-i],[t,r,-i],[t*.96,r,i*.62],[0,r,i],[-t*.96,r,i*.62]],o=[0,r,-.18],a=[];for(const c of s)o.push(...c);for(let c=0;c<s.length;c+=1){const u=(c+1)%s.length;a.push(0,u+1,c+1)}const l=new _t;return l.setAttribute("position",new dt(o,3)),l.setIndex(a),l.computeVertexNormals(),Tv(l),l}function Tv(n){const e=n.getAttribute("position"),t=n.getIndex();if(!t||t.count<3)throw new Error("Vessel deck needs indexed faces");const i=t.getX(0),r=t.getX(1),s=t.getX(2),o=e.getX(r)-e.getX(i),a=e.getZ(r)-e.getZ(i),l=e.getX(s)-e.getX(i),c=e.getZ(s)-e.getZ(i);if(!(a*l-o*c>0))throw new Error("Vessel deck faces downward")}function xu(n){const e=new _t;return e.setAttribute("position",new dt([...n],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function Mu(n,e,t){const[i,r,s,o]=t,a=new _t;return a.setAttribute("position",new dt([n,i[0],i[1],n,r[0],r[1],n,s[0],s[1],e,o[0],o[1]],3)),a.setIndex([0,1,3,1,2,3,2,0,3]),a.computeVertexNormals(),a}function oa(n,e,t){return n+(e-n)*Math.min(1,Math.max(0,t))}const kr=96,Fd=80,Hr=Fd,Av=[-1,1],wv=1.45,Su=.34,yu=.055,Eu=.11,Rv=.45,Cv=.055,lt=32,bu=.06,Zi=2.2,Tu=.24,$i=18,Pv=.27,Iv=.2,Lv=1;function Dv(n){const e=new Lc(1,7);e.rotateX(-Math.PI*.5);const t=new Tn({color:16052196,transparent:!0,opacity:.5,depthWrite:!1,side:wt}),i=new vd(e,t,kr);i.name="phase-five-wake-foam",i.frustumCulled=!1,i.instanceMatrix.setUsage(dn),n.add(i);const r=new Float32Array(lt*2*2*3),s=new Float32Array(lt*2*2*4),o=new Uint16Array((lt-1)*2*6);let a=0;for(let X=0;X<2;X+=1){const pe=X*lt*2;for(let ue=0;ue<lt-1;ue+=1){const A=pe+ue*2,te=A+2;o[a++]=A,o[a++]=te,o[a++]=A+1,o[a++]=A+1,o[a++]=te,o[a++]=te+1}}const l=new _t,c=new ut(r,3),u=new ut(s,4);c.setUsage(dn),u.setUsage(dn),l.setAttribute("position",c),l.setAttribute("color",u),l.setIndex(new ut(o,1));const d=new Tn({color:16777215,vertexColors:!0,transparent:!0,opacity:.42,depthWrite:!1,side:wt}),f=new Ve(l,d);f.name="phase-five-wake-ribbon",f.frustumCulled=!1,n.add(f);const m=new Float32Array($i*2*3),g=new Float32Array($i*2*4),v=new Uint16Array(($i-1)*6);let p=0;for(let X=0;X<$i-1;X+=1){const pe=X*2,ue=pe+2;v[p++]=pe,v[p++]=ue,v[p++]=pe+1,v[p++]=pe+1,v[p++]=ue,v[p++]=ue+1}const h=new _t,x=new ut(m,3),M=new ut(g,4);x.setUsage(dn),M.setUsage(dn),h.setAttribute("position",x),h.setAttribute("color",M),h.setIndex(new ut(v,1));const _=new Tn({color:16777215,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,side:wt}),b=new Ve(h,_);b.name="phase-five-bow-wave",b.frustumCulled=!1,n.add(b);const w=Array.from({length:kr},()=>({age:Number.POSITIVE_INFINITY,life:0,x:0,z:0,heading:0,driftX:0,driftZ:0,size:0,elongation:1,kind:0,side:0,waveResponse:0,trimBoost:0,active:!1})),P=new Mt,C=Array.from({length:lt},()=>({age:Number.POSITIVE_INFINITY,x:0,z:0,heading:0,speed:0,yawRate:0,trimBoost:0,active:!1}));let E=0,y=Hr,R=0,D=0,L=0,U=0,B=0,F=0,q=!1,V=!1;const re=(X,pe,ue,A)=>{if(!pe.active||pe.age>=pe.life){pe.active=!1,P.scale.setScalar(0),P.updateMatrix(),i.setMatrixAt(X,P.matrix);return}const te=Math.min(1,Math.max(0,pe.age/pe.life)),oe=te<.16?te/.16:1-(te-.16)/.84,Se=A?Math.min(pe.trimBoost,F):0,ie=pe.size*(1+Se*.85)*Math.max(0,oe);let ge=Lt(pe.x,pe.z,ue),K=0;if(pe.kind!==0){const Ke=Jr(pe.x,pe.z,ue);ge=Ke.height,K=Math.min(.45,Math.hypot(Ke.slopeX,Ke.slopeZ))}const me=1+pe.waveResponse*K;P.position.set(pe.x,ge+Iv,pe.z),P.rotation.set(0,pe.heading,0),P.scale.set(ie*pe.elongation*(1+Se*.24)*me,1,ie*(1+Se*.12)*me),P.updateMatrix(),i.setMatrixAt(X,P.matrix)},O=X=>{X.active=!1,X.age=Number.POSITIVE_INFINITY,X.kind=0,X.side=0,X.waveResponse=0,X.trimBoost=0},J=(X,pe)=>{const ue=Math.sin(X.heading),A=Math.cos(X.heading),te=Math.cos(X.heading),oe=-Math.sin(X.heading),Se=je.length*.52;for(const ie of Av){const ge=E;E=(E+1)%Fd;const K=w[ge],me=(ge*17%11/10-.5)*.12,Ke=je.width*.32+me,Xe=.18+Math.min(.48,pe*.035);K.age=0,K.heading=X.heading,K.life=wv*(.82+ge*13%7*.035),K.x=X.x-ue*Se+te*ie*Ke,K.z=X.z-A*Se+oe*ie*Ke,K.driftX=-ue*(.12+pe*.08)+te*ie*Xe,K.driftZ=-A*(.12+pe*.08)+oe*ie*Xe,K.size=.13+Math.min(.2,pe*.017),K.elongation=1.1+Math.min(.45,pe*.035),K.kind=0,K.side=ie,K.waveResponse=.45,K.trimBoost=F,K.active=!0}},ee=()=>{const X=y;return y=Hr+(y-Hr+1)%(kr-Hr),w[X]},we=(X,pe,ue,A,te)=>{const oe=Math.sin(X.heading),Se=Math.cos(X.heading),ie=Math.cos(X.heading),ge=-Math.sin(X.heading),K=ee();K.age=0,K.life=Su*(.92+A*.35+te*.22),K.heading=X.heading+ue*.16,K.x=X.x+oe*(je.length*.48)+ie*ue*je.width*.28,K.z=X.z+Se*(je.length*.48)+ge*ue*je.width*.28,K.driftX=oe*(.08+pe*.035)+ie*ue*(.2+A*.24+te*.12),K.driftZ=Se*(.08+pe*.035)+ge*ue*(.2+A*.24+te*.12),K.size=.13+Math.min(.12,pe*.012)+A*.05+te*.1,K.elongation=1.35+Math.min(.4,pe*.025)+te*.18,K.kind=1,K.side=ue,K.waveResponse=1.25,K.active=!0},Pe=(X,pe,ue,A)=>{const te=Math.sign(X.yawRate);if(te===0)return;const oe=Math.sin(X.heading),Se=Math.cos(X.heading),ie=Math.cos(X.heading),ge=-Math.sin(X.heading),K=ee(),me=Math.min(1,Math.abs(X.yawRate)/.6);K.age=0,K.life=Su*(1.05+me*.3+A*.18),K.heading=X.heading+te*.32,K.x=X.x-oe*(je.length*.08)+ie*te*(je.width*.58),K.z=X.z-Se*(je.length*.08)+ge*te*(je.width*.58),K.driftX=ie*te*(.22+pe*.035)-oe*.06,K.driftZ=ge*te*(.22+pe*.035)-Se*.06,K.size=.13+me*.1+ue*.04+A*.08,K.elongation=1.5+me*.45+A*.12,K.kind=2,K.side=te,K.waveResponse=1.1,K.active=!0},k=(X,pe,ue)=>{const A=X.x+Math.sin(X.heading)*je.length*.48,te=X.z+Math.cos(X.heading)*je.length*.48,oe=Jr(A,te,ue),Se=Math.min(.45,Math.hypot(oe.slopeX,oe.slopeZ)),ie=Math.abs(oe.velocityY+X.velocityX*oe.slopeX+X.velocityZ*oe.slopeZ),ge=Math.min(.9,ie*.26);we(X,pe,-1,Se,ge),we(X,pe,1,Se,ge),Math.abs(X.yawRate)>=Cv&&Pe(X,pe,Se,ge)},se=(X,pe)=>{const ue=C[L];ue.age=0,ue.x=Number.isFinite(X.x)?X.x:0,ue.z=Number.isFinite(X.z)?X.z:0,ue.heading=Number.isFinite(X.heading)?X.heading:0,ue.speed=pe,ue.yawRate=Number.isFinite(X.yawRate)?X.yawRate:0,ue.trimBoost=F,ue.active=!0,L=(L+1)%lt,U=Math.min(lt,U+1)},ae=(X,pe)=>{const ue=lt-U;for(let A=0;A<2;A+=1){const te=A===0?-1:1,oe=A*lt*2;let Se=lt,ie=-1;for(let ge=0;ge<lt;ge+=1){const K=ge>=ue,me=ge-ue,Ke=K?(L-U+me+lt)%lt:0,Xe=C[Ke];K&&Xe.active&&Xe.age<Zi&&(Se===lt&&(Se=ge),ie=ge)}for(let ge=0;ge<lt;ge+=1){const K=(oe+ge*2)*3,me=(oe+ge*2)*4,Ke=ge>=ue,Xe=ge-ue,I=Ke?(L-U+Xe+lt)%lt:0,S=C[I];if(!Ke||!S.active||S.age>=Zi){for(let ke=0;ke<8;ke+=1)s[me+ke]=0;continue}const W=Math.max(0,1-S.age/Zi),$=pe?Math.min(S.trimBoost,F):0,ne=Math.min(1,Math.max(0,S.speed/je.maxForwardSpeed)),j=U>1?Xe/(U-1):1,Te=.18+Math.min(1,Math.max(0,1-j)*5)*.82,he=W*W*(.72+ne*.28)*(.55+Te*.45)*(1+$*.16),Re=Math.sin(S.heading),De=Math.cos(S.heading),de=Math.cos(S.heading),ve=-Math.sin(S.heading),Ne=je.length*(.52+ne*.08),Ce=S.x-Re*Ne,xe=S.z-De*Ne,Be=je.width*(.34+ne*.1)*(1+$*.2)*Te,N=Be+(.62+ne*1.05+Math.min(.45,Math.abs(S.yawRate)*.72))*(.32+W*.68)*(1+$*.82)*Te,ce=Ce+de*te*Be,_e=xe+ve*te*Be,be=Ce+de*te*N,le=xe+ve*te*N,Q=Lt(ce,_e,X)+Tu,Le=Lt(be,le,X)+Tu;r[K]=ce,r[K+1]=Q,r[K+2]=_e,r[K+3]=be,r[K+4]=Le,r[K+5]=le,s[me]=1,s[me+1]=1,s[me+2]=1,s[me+3]=he,s[me+4]=1,s[me+5]=1,s[me+6]=1,s[me+7]=he}if(ie<0)for(let ge=0;ge<lt;ge+=1){const K=(oe+ge*2)*3;for(let me=0;me<6;me+=1)r[K+me]=0}else for(let ge=0;ge<lt;ge+=1){const K=ge>=ue,me=ge-ue,Ke=K?(L-U+me+lt)%lt:0,Xe=C[Ke];if(K&&Xe.active&&Xe.age<Zi)continue;let I=ge<=Se?Se:ge-1;for(;I>=Se;){const $=I>=ue,ne=I-ue,j=$?(L-U+ne+lt)%lt:0,Te=C[j];if($&&Te.active&&Te.age<Zi)break;I-=1}I<Se&&(I=Se);const S=(oe+ge*2)*3,W=(oe+I*2)*3;for(let $=0;$<6;$+=1)r[S+$]=r[W+$]}}l.getAttribute("position").needsUpdate=!0,l.getAttribute("color").needsUpdate=!0},Ee=(X,pe,ue,A)=>{if(!A){m.fill(0),g.fill(0),x.needsUpdate=!0,M.needsUpdate=!0;return}const te=Math.sin(X.heading),oe=Math.cos(X.heading),Se=Math.cos(X.heading),ie=-Math.sin(X.heading),ge=X.x+te*je.length*.48,K=X.z+oe*je.length*.48,me=ge-te*.78,Ke=K-oe*.78,Xe=Jr(ge,K,ue),I=Math.min(.5,Math.hypot(Xe.slopeX,Xe.slopeZ)),S=Math.abs(Xe.velocityY+X.velocityX*Xe.slopeX+X.velocityZ*Xe.slopeZ),W=Math.min(.9,S*.26),$=Math.min(1,Math.max(0,pe/je.maxForwardSpeed)),ne=.9+$*.22+W*.14,j=.18+$*.12+I*.1+W*.08,Te=Math.min(.92,.28+$*.48+W*.18);for(let he=0;he<$i;he+=1){const Re=Math.PI-he/($i-1)*Math.PI,De=Math.cos(Re),de=Math.sin(Re);for(let ve=0;ve<2;ve+=1){const Ne=ne+ve*j,Ce=De*Ne,xe=de*Ne,Be=(he*2+ve)*3,N=(he*2+ve)*4,ce=me+Se*Ce+te*xe,_e=Ke+ie*Ce+oe*xe;m[Be]=ce,m[Be+1]=Lt(ce,_e,ue)+Pv,m[Be+2]=_e,g[N]=1,g[N+1]=1,g[N+2]=1,g[N+3]=Te*(ve===0?1:.78)}}x.needsUpdate=!0,M.needsUpdate=!0},Ie=()=>{if(!V){R=0,D=0,E=0,y=Hr,L=0,U=0,B=0,F=0;for(const X of w)O(X);for(const X of C)X.trimBoost=0,X.active=!1;for(let X=0;X<kr;X+=1)re(X,w[X],0,!1);ae(0,!1),Ee({x:0,z:0,velocityX:0,velocityZ:0,heading:0},0,0,!1),i.instanceMatrix.needsUpdate=!0}};return Ie(),{update:(X,pe,ue)=>{if(V||q)return;const A=Number.isFinite(ue)?Math.min(.1,Math.max(0,ue)):0;if(A<=0)return;const te=Number.isFinite(pe)?pe:0,oe=X.velocityX*Math.sin(X.heading)+X.velocityZ*Math.cos(X.heading),Se=Math.max(0,oe),ie=Se>=Rv;for(const me of w)me.active&&(me.age+=A,me.x+=me.driftX*A,me.z+=me.driftZ*A,me.age>=me.life&&(me.active=!1));let ge=!1;for(const me of C)me.active&&(me.age+=A,me.age>=Zi?me.active=!1:ge=!0);if(!ge&&U>0&&(U=0,L=0),ie){for(U===0&&se(X,Se),B+=A;B>=bu;)B-=bu,se(X,Se);for(R+=A;R>=yu;)R-=yu,J(X,Se);for(D+=A;D>=Eu;)D-=Eu,k(X,Se,te)}else R=0,D=0,B=0;const K=ie&&F>0;for(let me=0;me<kr;me+=1)re(me,w[me],te,K);ae(te,K),Ee(X,Se,te,ie),i.instanceMatrix.needsUpdate=!0},reset:Ie,setTrimBoost:X=>{if(!V){if(F=Number.isFinite(X)?Math.min(Lv,Math.max(0,X)):0,F===0){for(const pe of w)pe.trimBoost=0;for(const pe of C)pe.trimBoost=0}q&&(F=0)}},setReducedMotion:X=>{V||q===X||(q=X,X&&(F=0,Ie()))},dispose:()=>{V||(V=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),f.removeFromParent(),l.dispose(),d.dispose(),b.removeFromParent(),h.dispose(),_.dispose(),P.clear())}}}const Ki=48,Au=.065,wu=.09,Ru=.65,Uv=.08,Nv=.12,Fv=.3,Ov=.06,Bv=.1,Cu=-7.5,aa=.035,Pu=3254217;function zt(n,e){return Number.isFinite(n)?n:e}function ji(n,e,t){return Math.min(t,Math.max(e,n))}function ca(n){return n!=null}function zv(n){const e=new fo(1,0),t=new Tn({color:16055287,vertexColors:!0,transparent:!0,opacity:.76,depthWrite:!1,side:wt}),i=new vd(e,t,Ki);i.name="phase-twelve-hull-spray",i.frustumCulled=!1,i.instanceMatrix.setUsage(dn),i.instanceColor=new ic(new Float32Array(Ki*3),3),i.instanceColor.setUsage(dn),n.add(i);const r=Array.from({length:Ki},()=>({active:!1,age:Number.POSITIVE_INFINITY,life:0,x:0,y:0,z:0,velocityX:0,velocityY:0,velocityZ:0,size:0,elongation:1,kind:0})),s=new Mt,o=new qe(16318460),a=new qe(12577250);let l=0,c=0,u=0,d=Pu,f=!1,m=!1;const g=()=>(d=Math.imul(d,1664525)+1013904223>>>0,d/4294967295),v=b=>{b.active=!1,b.age=Number.POSITIVE_INFINITY,b.life=0,b.size=0},p=(b,w)=>{if(!w.active||w.age>=w.life){v(w),s.scale.setScalar(0),s.position.set(0,0,0),s.updateMatrix(),i.setMatrixAt(b,s.matrix),i.setColorAt(b,w.kind===0?o:a);return}const P=ji(w.age/w.life,0,1),C=P<.12?P/.12:Math.max(0,1-(P-.12)/.88),E=w.size*C;s.position.set(w.x,w.y,w.z),s.rotation.set(0,0,0),s.scale.set(E*w.elongation,E,E),s.updateMatrix(),i.setMatrixAt(b,s.matrix),i.setColorAt(b,w.kind===0?o:a)},h=b=>{const w=r[l];return l=(l+1)%Ki,w.active=!0,w.age=0,w.kind=b,w},x=(b,w,P,C,E,y,R,D)=>{const L=xr(D),U=ji(zt(b.closingSpeed,0),0,4),B=h(0),F=.18+g()*.42;B.x=zt(b.x,0)+E*w*F,B.z=zt(b.z,0)+y*w*F;const q=yi(B.x,B.z,D)+aa;B.y=Math.max(zt(b.y,0),q),B.velocityX=P*(.2+R*.035)+E*w*(.12+g()*.18)+L.x*.025,B.velocityZ=C*(.2+R*.035)+y*w*(.12+g()*.18)+L.z*.025,B.velocityY=.62+g()*.65+U*.22,B.life=.45+g()*.25,B.size=.07+g()*.055+Math.min(.035,R*.003),B.elongation=1.2+g()*.55},M=(b,w,P,C,E,y,R,D,L)=>{const U=xr(L),B=h(1);B.x=zt(b.x,0),B.z=zt(b.z,0);const F=yi(B.x,B.z,L)+aa;B.y=Math.max(zt(b.y,0),F),B.velocityX=P*(.12+R*.018)+E*w*(.16+D*.18)+U.x*.018,B.velocityZ=C*(.12+R*.018)+y*w*(.16+D*.18)+U.z*.018,B.velocityY=.22+g()*.3+D*.25,B.life=.32+g()*.18,B.size=.065+g()*.045+D*.025,B.elongation=1.1+g()*.5},_=()=>{if(!m){l=0,c=0,u=0,d=Pu;for(let b=0;b<Ki;b+=1)v(r[b]),p(b,r[b]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}};return _(),{update:(b,w,P)=>{if(m||f)return;const C=Number.isFinite(P)?ji(P,0,Bv):0;if(C<=0)return;const E=Number.isFinite(w)?w:0,y=zt(b?.forwardSpeed,0),R=b?.bowPort,D=b?.bowStarboard,L=b?.leewardRail;let U=zt(R?.x,0)-zt(D?.x,0),B=zt(R?.z,0)-zt(D?.z,0);const F=Math.hypot(U,B);F<1e-6?(U=-1,B=0):(U/=F,B/=F);let q=B,V=-U;const re=Math.hypot(q,V);re<1e-6?(q=0,V=1):(q/=re,V/=re);const O=[[R,1],[D,-1]];let J,ee=1;for(const[k,se]of O)ca(k)&&(k.clearance>Fv||k.closingSpeed<=Uv||(!J||k.closingSpeed>J.closingSpeed)&&(J=k,ee=se));const we=y>=Ru&&ca(J),Pe=y>=Ru&&ca(L)&&L.clearance<=Ov&&zt(b?.heelLoad,0)>=Nv;for(const k of r){if(!k.active)continue;k.age+=C,k.x+=k.velocityX*C,k.y+=k.velocityY*C+.5*Cu*C*C,k.z+=k.velocityZ*C,k.velocityY+=Cu*C;const se=yi(k.x,k.z,E)+aa;if(k.y<=se){k.y=se,k.active=!1;continue}k.age>=k.life&&(k.active=!1)}if(we&&J){c+=C;let k=0;for(;c>=Au&&k<2;)c-=Au,x(J,ee,q,V,U,B,ji(y,0,20),E),k+=1}else c=0;if(Pe&&L){u+=C;let k=0;for(;u>=wu&&k<2;){u-=wu;const se=b.leewardSide==="port"?1:-1;M(L,se,q,V,U,B,ji(y,0,20),ji(zt(b?.heelLoad,0),0,1),E),k+=1}}else u=0;for(let k=0;k<Ki;k+=1)p(k,r[k]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)},reset:_,setReducedMotion:b=>{m||f===b||(f=b,b&&_())},dispose:()=>{m||(m=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),s.clear())}}}const kv=new H(0,5.87,-.34),Od=new H(1,0,0),xi=5,Hv=2.25,Vv=1.42,Gv=.42,Wv=.28,Xv=.25;function _n(n,e=0){return Number.isFinite(n)?n:e}function Iu(n,e){const t=new H(_n(n),0,_n(e));return t.lengthSq()<1e-12?Od.clone():t.normalize()}function qv(n,e){const t=new _t,i=new Float32Array((xi+1)*2*3),r=new Float32Array((xi+1)*2*3),s=new qe(15757160),o=new qe(16773590);for(let l=0;l<=xi;l+=1){const c=l%2===0?s:o;for(let u=0;u<2;u+=1){const d=(l*2+u)*3;c.toArray(r,d)}}const a=[];for(let l=0;l<xi;l+=1){const c=l*2,u=c+2;a.push(c,u,c+1,c+1,u,u+1)}return t.setAttribute("position",new ut(i,3)),t.setAttribute("color",new ut(r,3)),t.setIndex(a),t.userData={length:n,width:e,segments:xi},t}function Lu(n,e,t,i){const r=qv(e,t),s=new Tn({vertexColors:!0,side:wt,transparent:!1,opacity:1,depthWrite:!0,forceSinglePass:!0,toneMapped:!1}),o=new Ve(r,s);return o.name=n,o.userData={length:e,width:t,phase:i,direction:new H},{mesh:o,origin:new H,length:e,width:t,phase:i,direction:Od.clone()}}function la(n,e,t,i){const r=n.mesh.geometry.getAttribute("position");n.direction.copy(e),n.mesh.userData.direction.copy(n.direction);for(let o=0;o<=xi;o+=1){const a=o/xi,l=n.width*(1-a*.76),c=i?0:Math.sin(t*5.4+n.phase+a*3.2)*.055*a,u=i?0:Math.cos(t*4.1+n.phase+a)*.035*a,d=n.origin.x+e.x*n.length*a-e.z*c,f=n.origin.y+u,m=n.origin.z+e.z*n.length*a+e.x*c;r.setXYZ(o*2,d,f+l,m),r.setXYZ(o*2+1,d,f-l,m)}r.needsUpdate=!0,n.mesh.geometry.computeBoundingSphere()}function Yv(n,e,t){const i=[],r=[],s=[],o=Array.isArray(t)?t:[];for(let p=0;p<o.length;p+=1){o[p];const h=new nn(.035,.055,3,5),x=new Tn({color:5131331,toneMapped:!1}),M=new Ve(h,x);M.name=`wind-flag-land-mast-${p}`,n.add(M),s.push(M),i.push(h,x);const _=Lu(`wind-flag-land-${p}`,Hv,Gv,p*1.7);n.add(_.mesh),r.push(_),i.push(_.mesh.geometry,_.mesh.material)}const a=Lu("wind-flag-vessel-masthead",Vv,Wv,4.7);n.add(a.mesh),r.push(a),i.push(a.mesh.geometry,a.mesh.material);let l=0,c=!1,u=!1;const d=new H,f=new H,m=()=>{for(let p=0;p<o.length;p+=1){const h=o[p],x=s[p],M=r[p],_=_n(h?.x),b=_n(h?.y),w=_n(h?.z);x.position.set(_,b+1.5,w),M.origin.set(_,b+3,w)}},g=(p,h,x)=>{if(u)return;Math.min(Xv,Math.max(0,_n(x)))>0&&(l=_n(h,l)),m();const _=xr(_n(h));d.set(_.x,0,_.z);const b=Iu(d.x,d.z);for(let C=0;C<o.length;C+=1)la(r[C],b,l,c);e.updateMatrixWorld(!0),f.copy(kv),e.localToWorld(f),a.origin.copy(f);const w=Oc(_,_n(p?.velocityX),_n(p?.velocityZ)),P=Math.hypot(w.x,w.z)<1e-6?a.direction:Iu(w.x,w.z);la(a,P,l,c)};return{update:g,reset:()=>{u||(l=0,m(),g({velocityX:0,velocityZ:0},0,0))},setReducedMotion:p=>{if(!u){c=p===!0;for(const h of r)la(h,h.direction,l,c)}},dispose:()=>{if(!u){u=!0;for(const p of s)p.removeFromParent(),p.geometry.dispose(),p.material.dispose();for(const p of r)p.mesh.removeFromParent(),p.mesh.geometry.dispose(),p.mesh.material.dispose();i.length=0}}}}const tn=1e-7,ua=.28,Du=20;function es(n){return typeof n=="number"&&Number.isFinite(n)}function Zv(n){return es(n?.x)&&es(n?.z)}function or(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Nn(n,e,t){return{ok:!1,islandId:n,reason:e,message:t}}function $v(n,e,t){return Math.min(t,Math.max(e,n))}function Kv(n,e,t){const i=t.x-e.x,r=t.z-e.z,s=i*i+r*r;if(s<=tn)return or(n,e);const o=$v(((n.x-e.x)*i+(n.z-e.z)*r)/s,0,1);return Math.hypot(n.x-(e.x+i*o),n.z-(e.z+r*o))}function ts(n,e,t){const i=e-t;return n.x>=-i-tn&&n.x<=i+tn&&n.z>=-i-tn&&n.z<=i+tn}function jv(n,e,t,i,r){if(!ts(n,i,r)||!ts(e,i,r))return!1;for(const s of t){const o=s.radius+r;if(Kv(s.center,n,e)<o-tn)return!1}return!0}function Jv(n){let e=0;for(let t=1;t<n.length;t+=1)e+=or(n[t-1],n[t]);return e}function Uu(n){return`${n.x.toFixed(5)}:${n.z.toFixed(5)}`}function Qv(n,e,t,i,r=i?.vesselClearance){const s=t.find(L=>L.id===e);if(!s)return Nn(e,"unknown-island",`Unknown island "${e}".`);if(!Zv(n))return Nn(e,"invalid-start","The vessel position is not finite.");const o=i?.worldLimit,a=r;if(!es(o)||o<=0||!es(a)||a<0||a>=o)return Nn(e,"invalid-bounds","Navigation bounds must be finite and leave room for the vessel.");if(!ts(n,o,a))return Nn(e,"invalid-start","The vessel is outside the navigable water bounds.");const l=t.map(L=>({center:{x:L.position.x,z:L.position.z},radius:L.landCollisionRadius})),c=t.findIndex(L=>L.id===e),u=s.landCollisionRadius+a,d=s.dockingTriggerRadius-u;if(!es(d)||d<=ua*2)return Nn(e,"target-annulus-too-small","There is not enough safe water inside the docking zone.");if(or(n,l[c].center)<u-tn)return Nn(e,"start-in-obstacle","The vessel starts inside an island clearance envelope.");const m=l[c].center,g=n.x-m.x,v=n.z-m.z,p=Math.hypot(g,v),h=u+Math.min(ua,d*.34),x=p>tn?g/p:1,M=p>tn?v/p:0,_={x:m.x+x*h,z:m.z+M*h};if(!ts(_,o,a))return Nn(e,"target-out-of-bounds","The docking point is outside the navigable water bounds.");const b=[{point:{x:n.x,z:n.z},obstacleIndex:null},{point:_,obstacleIndex:null}],w=new Set(b.map(L=>Uu(L.point)));t.forEach((L,U)=>{const B=L.landCollisionRadius+a+ua;for(let F=0;F<Du;F+=1){const q=F/Du*Math.PI*2,V={x:L.position.x+Math.cos(q)*B,z:L.position.z+Math.sin(q)*B};if(!ts(V,o,a)||t.some((O,J)=>J===U?!1:or(V,{x:O.position.x,z:O.position.z})<O.landCollisionRadius+a-tn))continue;const re=Uu(V);w.has(re)||(w.add(re),b.push({point:V,obstacleIndex:U}))}});const P=b.map(()=>[]);for(let L=0;L<b.length;L+=1)for(let U=L+1;U<b.length;U+=1){if(!jv(b[L].point,b[U].point,l,o,a))continue;const B=or(b[L].point,b[U].point);P[L].push({to:U,cost:B}),P[U].push({to:L,cost:B})}const C=b.map(()=>Number.POSITIVE_INFINITY),E=b.map(()=>-1),y=b.map(()=>!1);C[0]=0;for(let L=0;L<b.length;L+=1){let U=-1,B=Number.POSITIVE_INFINITY;for(let F=0;F<b.length;F+=1)!y[F]&&C[F]<B&&(B=C[F],U=F);if(U<0||!Number.isFinite(B)||(y[U]=!0,U===1))break;for(const F of P[U]){const q=B+F.cost;q<C[F.to]-tn&&(C[F.to]=q,E[F.to]=U)}}if(!Number.isFinite(C[1]))return Nn(e,"no-safe-route","No bounded safe route to the docking zone could be found.");const R=[];for(let L=1;L>=0&&(R.push(b[L].point),L!==0);L=E[L])if(E[L]<0)return Nn(e,"no-safe-route","The safe route graph is disconnected.");R.reverse();const D=R.filter((L,U)=>U===0||or(L,R[U-1])>tn);return{ok:!0,islandId:e,points:D,target:_,distance:Jv(D),clearance:a}}const Nu=.8,Fu=12,ex=16,tx=60,Bd=1e-7,nx=.01;function Qn(n){return typeof n=="number"&&Number.isFinite(n)}function Mr(n,e,t){return Math.min(t,Math.max(e,n))}function as(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function ix(n,e){return as(e-n)}function Bc(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function rx(n){let e=0;for(let t=1;t<n.length;t+=1)e+=Bc(n[t-1],n[t]);return e}function cc(n){return{x:n.x,z:n.z}}function zd(n){return{x:Qn(n?.x)?n.x:0,z:Qn(n?.z)?n.z:0,heading:as(Qn(n?.heading)?n.heading:0)}}function sx(n){return{...zd(n),status:"idle",islandId:null,route:[],elapsed:0,duration:0,travelledDistance:0,totalDistance:0,velocityX:0,velocityZ:0,reason:null}}function tr(n={x:0,z:0,heading:0}){return sx(n)}function no(n,e,t){return{...n,status:e,reason:t,velocityX:0,velocityZ:0}}function ox(n,e){if(n.length===0)return{point:{x:0,z:0},heading:0};if(n.length===1)return{point:cc(n[0]),heading:0};let t=Math.max(0,e);for(let s=1;s<n.length;s+=1){const o=n[s-1],a=n[s],l=Bc(o,a);if(t<=l||s===n.length-1){const c=l>Bd?Mr(t/l,0,1):1;return{point:{x:o.x+(a.x-o.x)*c,z:o.z+(a.z-o.z)*c},heading:Math.atan2(a.x-o.x,a.z-o.z)}}t-=l}const i=n[n.length-1],r=n[n.length-2];return{point:cc(i),heading:Math.atan2(i.x-r.x,i.z-r.z)}}function ax(n){const e=Mr(n,0,1);return e*e*(3-2*e)}function cx(n,e,t={}){const i=n??tr(),r=e?.route,s=Array.isArray(r)&&r.every(f=>Qn(f?.x)&&Qn(f?.z)),o=s?r.map(cc):[];if(!e?.islandId||!s||o.length===0)return no({...i,islandId:e?.islandId??null,route:o},"failed","Scanner route is empty or invalid.");if(Bc(i,o[0])>nx)return no({...i,islandId:e.islandId,route:o},"failed","Scanner route does not start at the vessel position.");const a=rx(o);if(a<=Bd)return no({...i,islandId:e.islandId,route:o,x:o[o.length-1].x,z:o[o.length-1].z},"arrived",null);const l=Qn(t.maxSpeed)&&t.maxSpeed>0?t.maxSpeed:ex,c=Mr(a/l,Nu,Fu),u=Qn(t.duration)&&t.duration>0?Mr(t.duration,Nu,Fu):c,d=zd(i);return{...i,...d,x:o[0].x,z:o[0].z,heading:as(d.heading),status:"active",islandId:e.islandId,route:o,elapsed:0,duration:u,travelledDistance:0,totalDistance:a,velocityX:0,velocityZ:0,reason:null}}function lx(n,e="Scanner cancelled by user."){return no({...n},"cancelled",e)}function Ou(n,e){if(!n||n.status!=="active")return n;const t=Qn(e)?Mr(e,0,tx):0,i=Math.min(n.duration,n.elapsed+t),r=n.duration>0?i/n.duration:1,s=ax(r),o=n.totalDistance*s,a=ox(n.route,o),l={x:n.x,z:n.z},c=t>0?(a.point.x-l.x)/t:0,u=t>0?(a.point.z-l.z)/t:0,d=r>=1?1:Mr(t*5.5,0,1),f=as(n.heading+ix(n.heading,a.heading)*d);return r>=1-Number.EPSILON?{...n,x:n.route[n.route.length-1].x,z:n.route[n.route.length-1].z,heading:as(a.heading),elapsed:n.duration,travelledDistance:n.totalDistance,status:"arrived",velocityX:0,velocityZ:0,reason:null}:{...n,x:a.point.x,z:a.point.z,heading:f,elapsed:i,travelledDistance:o,velocityX:c,velocityZ:u}}function fi(n){return n.status==="active"}const Ji=[.012,.16,.23],da=[.018,.31,.4],ha=[.045,.43,.5],Bu=[.34,.58,.56],zu=[.007,.02,.045],ux=[.016,.055,.085],dx=[.055,.12,.16],hx=[.28,.34,.36];function fx(n){const e=Pd(),t=e.length*e.length,i=new Float32Array(t*3),r=new Float32Array(t*3),s=[],o=[];let a=0;for(let h=0;h<e.length;h+=1)for(let x=0;x<e.length;x+=1){const M=e[x],_=e[h];o.push([M,_]),i[a*3]=M,i[a*3+1]=0,i[a*3+2]=_,a+=1}const l=e.length;for(let h=0;h<l-1;h+=1)for(let x=0;x<l-1;x+=1){const M=h*l+x,_=M+1,b=M+l,w=b+1;Id(h,x)?s.push(M,b,_,_,b,w):s.push(M,b,w,M,w,_)}const c=new _t,u=new ut(i,3),d=new ut(r,3);u.setUsage(dn),d.setUsage(dn),c.setAttribute("position",u),c.setAttribute("color",d),c.setIndex(s),c.computeVertexNormals();const f=new en({color:16777215,roughness:.5,metalness:.08,flatShading:!0,vertexColors:!0}),m=new Ve(c,f);m.name="phase-one-water-field",n.add(m);const g=px(i);n.add(g.mesh);let v=!1;const p=h=>{if(v)return;const x=Number.isFinite(h)?h:0,M=c.getAttribute("position"),_=c.getAttribute("color");for(let b=0;b<o.length;b+=1){const[w,P]=o[b],C=Jr(w,P,x);M.setY(b,C.height),gx(_,b,C.height,C.slopeX,C.slopeZ,C.stormIntensity)}M.needsUpdate=!0,_.needsUpdate=!0,g.update(x)};return p(0),{mesh:m,crestMesh:g.mesh,update:p,dispose:()=>{v||(v=!0,c.dispose(),f.dispose(),m.removeFromParent(),g.dispose())}}}function px(n){const e=an.directionX,t=an.directionZ,i=-t,r=e,s=1/(e*e+t*t),o=1/(i*i+r*r),a=cn.outerLimit*(Math.abs(i)+Math.abs(r)),l=cn.outerLimit*(Math.abs(e)+Math.abs(t)),c=Math.PI*.5-an.phase,u=Math.ceil((-l*an.waveNumber-c)/(Math.PI*2))-1,d=Math.floor((l*an.waveNumber-c)/(Math.PI*2))+1,f=Math.PI*2/an.waveNumber,m=(c+u*Math.PI*2)/an.waveNumber,g=(d-u+1)*f,v=[];for(let L=u;L<=d;L+=1){let U=0,B=-a+Qi(L+821,431)*44;for(;B<=a;)v.push({normalIndex:L,normalOffset:(Qi(L*43+U*23+149,L*11+U*37+337)-.5)*f*.9,tangentCenter:B,activity:Qi(L*31+U*17+401,L*13+U*7+911),halfLength:3+Qi(L*37+U*13+211,L*7+U*31+263)*2.5,halfWidth:.18+Qi(L*41+U*17+307,L*5+U*43+359)*.16}),B+=32+Qi(L*19+U*29+71,L*23+U*11+173)*26,U+=1}const p=new Float32Array(v.length*4*3),h=new Float32Array(v.length*4),x=new Float32Array(v.length*4*2),M=[];for(let L=0;L<v.length;L+=1){const U=L*4;M.push(U,U+1,U+2,U,U+2,U+3),x[(U+0)*2]=0,x[(U+0)*2+1]=0,x[(U+1)*2]=1,x[(U+1)*2+1]=0,x[(U+2)*2]=1,x[(U+2)*2+1]=1,x[(U+3)*2]=0,x[(U+3)*2+1]=1}const _=new _t,b=new ut(p,3),w=new ut(h,1);b.setUsage(dn),w.setUsage(dn),_.setAttribute("position",b),_.setAttribute("crestOpacity",w),_.setAttribute("crestUv",new ut(x,2)),_.setIndex(M);const P=new Hn({transparent:!0,depthWrite:!1,side:wt,toneMapped:!1,uniforms:{},vertexShader:`
      attribute float crestOpacity;
      attribute vec2 crestUv;
      varying float vCrestOpacity;
      varying vec2 vCrestUv;
      void main() {
        vCrestOpacity = crestOpacity;
        vCrestUv = crestUv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying float vCrestOpacity;
      varying vec2 vCrestUv;
      void main() {
        float endTaper = smoothstep(0.0, 0.24, vCrestUv.x) *
          (1.0 - smoothstep(0.76, 1.0, vCrestUv.x));
        float edgeTaper = smoothstep(0.0, 0.22, vCrestUv.y) *
          (1.0 - smoothstep(0.78, 1.0, vCrestUv.y));
        gl_FragColor = vec4(0.52, 0.75, 0.69, vCrestOpacity * endTaper * edgeTaper);
        #include <colorspace_fragment>
      }
    `}),C=new Ve(_,P);C.name="phase-one-water-crest-ribbons";const E=new Float64Array(9),y={x:0,z:0,support:0};let R=!1;const D=L=>{if(R)return;const U=Number.isFinite(L)?L:0,B=U*an.angularSpeed/an.waveNumber;for(let F=0;F<v.length;F+=1){const q=v[F],V=(c+q.normalIndex*Math.PI*2)/an.waveNumber+q.normalOffset,re=m+_x(V-B-m,g),O=q.tangentCenter,J=e*re*s+i*O*o,ee=t*re*s+r*O*o,we=q.activity>.48;y.x=J,y.z=ee,y.support=0;const Pe=we?mx(J,ee,e,t,U,E,y):y,k=Pe.x,se=Pe.z,ae=kd(k,se),Ee=Pe.support*(.3+ae*.18),Ie=i*q.halfLength,X=r*q.halfLength,pe=e*q.halfWidth,ue=t*q.halfWidth,A=F*4;Ys(b,A,k-Ie-pe,se-X-ue,n),Ys(b,A+1,k+Ie-pe,se+X-ue,n),Ys(b,A+2,k+Ie+pe,se+X+ue,n),Ys(b,A+3,k-Ie+pe,se-X+ue,n),w.setX(A,Ee),w.setX(A+1,Ee),w.setX(A+2,Ee),w.setX(A+3,Ee)}b.needsUpdate=!0,w.needsUpdate=!0};return D(0),{mesh:C,update:D,dispose:()=>{R||(R=!0,_.dispose(),P.dispose(),C.removeFromParent())}}}function Ys(n,e,t,i,r){const s=kd(t,i);n.setXYZ(e,t,j_(t,i,r)+.045+s*.018,i)}function mx(n,e,t,i,r,s,o){let c=0;for(let p=0;p<s.length;p+=1){const h=p*1.5-6;s[p]=Lt(n+t*h,e+i*h,r),s[p]>s[c]&&(c=p)}let u=0;if(c>0&&c<s.length-1){const p=s[c-1]-2*s[c]+s[c+1];p<-1e-5&&(u=Math.max(-.5,Math.min(.5,.5*(s[c-1]-s[c+1])/p)))}const d=(c+u)*1.5-6;o.x=n+t*d,o.z=e+i*d;const f=Lt(o.x,o.z,r),m=Lt(o.x-t*3.5,o.z-i*3.5,r),g=Lt(o.x+t*3.5,o.z+i*3.5,r),v=f-Math.max(m,g);return o.support=jn(.025,.19,v)*(1-jn(3.5,6,Math.abs(d)))*jn(0,.4,f),o}function gx(n,e,t,i,r,s=0){const o=Math.min(1,Math.max(0,s)),a=1+o*($t.maxWaveScale-1),l=(t+ac*a)/(ac*2*a),c=jn(.1,.52,l),u=jn(.6,.9,l)*.52,d=Math.min(1,Math.hypot(i,r)*2.8),f=jn(.76,.96,l)*jn(.24,.5,d)*.16,m=Ji[0]+(da[0]-Ji[0])*c,g=Ji[1]+(da[1]-Ji[1])*c,v=Ji[2]+(da[2]-Ji[2])*c,p=m+(ha[0]-m)*u,h=g+(ha[1]-g)*u,x=v+(ha[2]-v)*u,M=Math.min(.3,f+o*jn(.38,.78,d)*.06);for(let _=0;_<3;_+=1){const b=zu[_]+(ux[_]-zu[_])*c,w=b+(dx[_]-b)*u,P=_===0?p:_===1?h:x,C=P+(w-P)*o,E=Bu[_]+(hx[_]-Bu[_])*o;n.array[e*3+_]=C+(E-C)*M}}function kd(n,e){return Math.min(1,Math.max(0,go(n,e).intensity))}function jn(n,e,t){const i=Math.min(1,Math.max(0,(t-n)/(e-n)));return i*i*(3-2*i)}function Qi(n,e){const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function _x(n,e){return(n%e+e)%e}const ku=1.75,pi=1/120,vx=.1,Hu=12;function xx(n,e={}){const t=e.reducedMotion??(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches),i=new Ff;i.background=new qe(536381),i.fog=new Pc(536381,540,800);const r=Z_(),s=r.camera,o=new D_({antialias:!0,powerPreference:"high-performance"});o.setPixelRatio(Math.min(window.devicePixelRatio||1,ku)),o.setClearColor(536381,1),o.outputColorSpace=Zt,o.toneMapping=Qu,o.toneMappingExposure=1.12,o.shadowMap.enabled=!1,o.domElement.setAttribute("aria-label","Animated isometric water field"),o.domElement.style.display="block",o.domElement.style.width="100%",o.domElement.style.height="100%",o.domElement.style.touchAction="none",n.appendChild(o.domElement);const a=fx(i),l=B_(i,e.islands??[]),c=yv(i),u=Dv(i),d=zv(i),f=Yv(i,c.group,l.windFlagAnchors);let m=!!t;c.setReducedMotion(m),u.setReducedMotion(m),d.setReducedMotion(m),f.setReducedMotion(m);let g=!1,p=fu(nr.x,nr.z),h={throttle:0,rudder:0,brake:!1},x=iu();const M={worldLimit:$t.worldLimit,obstacles:(e.islands??[]).map(A=>({x:A.position.x,z:A.position.z,radius:A.landCollisionRadius}))};let _=tr({x:p.x,z:p.z,heading:p.heading}),b={status:"idle",islandId:null};const w=()=>{const A=fi(_),te=h.brake||g,oe=pn(p,x.sailAngle,te?1:0),Se=A?oe.suggestedAngle:x.sailAngle,ie=A?pn(p,Se):oe,ge=pn(p,oe.suggestedAngle).power;return{sailAngle:Se,suggestedAngle:ie.suggestedAngle,signedSailAngle:ie.signedAngle,relativeWindAngle:ie.relativeWindAngle,power:ie.power,noGo:ie.noGo,windSpeed:Oc(xr(),p.velocityX,p.velocityZ).speed,luffing:te,moored:g,assisted:A,trimMode:x.mode,trimEngaged:x.engaged,trimEfficiency:ge>1e-6?ma(ie.power/ge,0,1):0,sweetSpot:!A&&!te&&!ie.noGo&&x.sweetSpot,trimBoost:A||te||ie.noGo?0:x.boost,boostSerial:x.boostSerial}},P=(A=!1)=>{const te=w();c.setSailLoad(te.power,te.relativeWindAngle),c.setSailAngle(te.signedSailAngle,A),e.onSailingUpdate?.(te)},C=(A,te,oe)=>{b=oe===void 0?{status:A,islandId:te}:{status:A,islandId:te,message:oe},e.onScanUpdate?.(b)},E=()=>{u.reset(),d.reset(),P(!0),c.resetPose(p,ee),f.update(p,ee,0),r.snapTo(p.x,p.z),a.update(ee),e.onVesselUpdate?.($s(p)),e.onLandmarkProjection?.(Zs(s,fa(n),pa(n),l.anchors,e.framingInsets)),o.render(i,s)},y=A=>{_=A,A.status==="arrived"&&(g=!0),p={x:A.x,z:A.z,velocityX:A.velocityX,velocityZ:A.velocityZ,heading:A.heading,yawRate:0}},R=A=>{const te=A.status==="active"?"travelling":A.status;C(te,A.islandId,A.reason??void 0)},D=A=>{fi(_)&&(y(lx(_,A)),R(_))},L=A=>{if(!fi(_))return;const te=_.status;y(Ou(_,A)),_.status!==te&&R(_)};i.add(new qf(10999760,471872,1.65));const U=new Al(16769723,2.35);U.position.set(-55,80,42),i.add(U);const B=new Al(6209481,.48);B.position.set(75,42,-65),i.add(B);let F=!1,q=t,V=typeof document<"u"?document.hidden:!1,re=!0,O=null,J=0,ee=0,we=0;const Pe=()=>q||V||!re,k=A=>{if(F)return;J||(J=A);const te=Math.min(Math.max(0,(A-J)/1e3),vx);if(J=A,!Pe()){we=Math.min(we+te,pi*Hu);let oe=0;for(;we+1e-9>=pi&&oe<Hu;)fi(_)?L(pi):g||(x=ru(x,p,{sheet:h.sheet??0,engage:h.targetHeading!==void 0||Math.abs(h.rudder)>1e-6,resumeAuto:!1,suppressed:h.brake},pi),p=dv(p,{...h,sailAngle:x.sailAngle,trimBoost:x.boost},pi,M,m?void 0:ee)),ee+=pi,we=Math.max(0,we-pi),oe+=1;r.update(p.x,p.z,te),P(),c.update(p,ee,te),f.update(p,ee,te),u.setTrimBoost(fi(_)||g?0:x.boost),u.update(p,ee,te),fi(_)||g?d.reset():d.update(c.getWaterContact(),ee,te),e.onVesselUpdate?.($s(p))}if(e.onLandmarkProjection?.(Zs(s,fa(n),pa(n),l.anchors,e.framingInsets)),a.update(ee),o.render(i,s),Pe()){O=null;return}O=window.requestAnimationFrame(k)},se=()=>{F||O!==null||(J=0,O=window.requestAnimationFrame(k))},ae=()=>{O!==null&&(window.cancelAnimationFrame(O),O=null)},Ee=()=>{if(F)return;const A=Math.max(1,n.clientWidth||window.innerWidth),te=Math.max(1,n.clientHeight||window.innerHeight);r.resize(A,te),o.setPixelRatio(Math.min(window.devicePixelRatio||1,ku)),o.setSize(A,te,!1),e.onLandmarkProjection?.(Zs(s,A,te,l.anchors,e.framingInsets)),Pe()&&o.render(i,s)},Ie=A=>{F||(A&&D("Scanner navigation paused."),q=A,Pe()?(ae(),we=0,J=0,h={throttle:0,rudder:0,brake:!1},x=$n(x),u.setTrimBoost(0),d.reset(),o.render(i,s)):se(),e.onSailingUpdate?.(w()))},X=()=>{V=document.hidden,Pe()?(ae(),we=0,J=0,h={throttle:0,rudder:0,brake:!1},x=$n(x),u.setTrimBoost(0),d.reset(),o.render(i,s)):se()},pe=typeof IntersectionObserver<"u"?new IntersectionObserver(A=>{re=A[0]?.isIntersecting??!0,Pe()?(ae(),we=0,J=0,h={throttle:0,rudder:0,brake:!1},x=$n(x),u.setTrimBoost(0),d.reset(),o.render(i,s)):se()},{threshold:.01}):null,ue=typeof ResizeObserver<"u"?new ResizeObserver(Ee):null;return Ee(),P(!0),c.resetPose(p,ee),f.update(p,ee,0),r.snapTo(p.x,p.z),e.onVesselUpdate?.($s(p)),e.onScanUpdate?.(b),ue?.observe(n),window.addEventListener("resize",Ee),pe?.observe(n),document.addEventListener("visibilitychange",X),Pe()?o.render(i,s):se(),{setPaused:Ie,setReducedMotion:A=>{F||(m=A,c.setReducedMotion(A),u.setReducedMotion(A),d.setReducedMotion(A),f.setReducedMotion(A),f.update(p,ee,0),Pe()&&o.render(i,s))},setInput:A=>{if(F)return;const te={throttle:0,sheet:ma(A.sheet??0,-1,1),rudder:ma(A.rudder,-1,1),brake:!!A.brake,targetHeading:Number.isFinite(A.targetHeading)?A.targetHeading:void 0};(te.targetHeading!==void 0||Math.abs(te.sheet)>1e-6||Math.abs(te.rudder)>1e-6||te.brake)&&(g=!1,D("Scanner navigation cancelled by helm input."),_.status==="arrived"&&(_=tr({x:p.x,z:p.z,heading:p.heading}),R(_))),h=te,te.brake&&(x=$n(x),u.setTrimBoost(0),d.reset()),e.onSailingUpdate?.(w())},setAutoTrim:()=>{F||Pe()||(h={throttle:0,rudder:0,brake:!1},g=!1,D("Scanner navigation cancelled by helm input."),_.status==="arrived"&&(_=tr({x:p.x,z:p.z,heading:p.heading}),R(_)),x=ru($n(x),p,{sheet:0,engage:!0,resumeAuto:!0,suppressed:!1},0),e.onSailingUpdate?.(w()))},resetVessel:()=>{F||(u.reset(),d.reset(),f.reset(),g=!1,p=fu(nr.x,nr.z),_=tr({x:p.x,z:p.z,heading:p.heading}),R(_),h={throttle:0,rudder:0,brake:!1},x=$n(x),u.setTrimBoost(0),we=0,J=0,ee=0,x=iu(),P(!0),c.resetPose(p,ee),f.update(p,ee,0),r.snapTo(p.x,p.z),a.update(ee),e.onVesselUpdate?.($s(p)),e.onLandmarkProjection?.(Zs(s,fa(n),pa(n),l.anchors,e.framingInsets)),o.render(i,s))},getVesselState:()=>({...p}),getSailingState:w,startScan:(A,te={})=>{if(F)return;const oe=Qv({x:p.x,z:p.z},A,e.islands??[],{worldLimit:$t.worldLimit,vesselClearance:je.collisionRadius});if(!oe.ok){D("Scanner navigation replaced by an invalid route."),h={throttle:0,rudder:0,brake:!1},x=$n(x),u.setTrimBoost(0),d.reset(),C("failed",A,oe.message);return}h={throttle:0,rudder:0,brake:!1},x=$n(x),u.setTrimBoost(0),d.reset(),g=!1;const Se=tr({x:p.x,z:p.z,heading:p.heading});if(y(cx(Se,{islandId:A,route:oe.points})),!!te.instant||q){fi(_)&&y(Ou(_,_.duration)),we=0,J=0,E(),R(_);return}R(_),se()},cancelScan:()=>{F||D("Scanner navigation cancelled.")},dispose:()=>{F||(F=!0,ae(),ue?.disconnect(),window.removeEventListener("resize",Ee),pe?.disconnect(),document.removeEventListener("visibilitychange",X),l.dispose(),c.dispose(),u.dispose(),d.dispose(),f.dispose(),r.dispose(),a.dispose(),o.dispose(),o.domElement.remove(),i.clear())}}}function Zs(n,e,t,i,r){const s=Mx(e,t,r);return i.map(({id:o,position:a})=>{const l=a.clone().project(n),c=(l.x*.5+.5)*e,u=(1-(l.y*.5+.5))*t;return{id:o,x:c,y:u,visible:l.z>=-1&&l.z<=1&&c>=s.left&&c<=e-s.right&&u>=s.top&&u<=t-s.bottom}})}function Mx(n,e,t){const i=e<=460,r=n<=600?{top:140,right:20,bottom:68,left:20}:{top:160,right:28,bottom:70,left:28};return i&&(r.top=112),{top:Math.max(0,t?.top??r.top),right:Math.max(0,t?.right??r.right),bottom:Math.max(0,t?.bottom??r.bottom),left:Math.max(0,t?.left??r.left)}}function fa(n){return Math.max(1,n.clientWidth||window.innerWidth)}function pa(n){return Math.max(1,n.clientHeight||window.innerHeight)}function ma(n,e,t){return Math.min(t,Math.max(e,Number.isFinite(n)?n:0))}function $s(n){return{x:n.x,z:n.z,heading:n.heading,speed:Math.hypot(n.velocityX,n.velocityZ)}}const Vu={boost:0,serial:0,paused:!1,reducedMotion:!1},Sx=.75,yx=.075,Ex=.012,bx=.05,Tx=.16,Gu=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0,Ax=()=>{const n=globalThis;return typeof n.AudioContext=="function"?n.AudioContext:typeof n.webkitAudioContext=="function"?n.webkitAudioContext:null};function wx(){let n=null,e=null,t=null,i=null,r=!1,s=!1,o=!1,a=!1,l=null,c=0,u=Vu.serial,d=Vu;const f=typeof document>"u"?null:document;a=!!f?.hidden;const m=()=>{a=!!f?.hidden,p()};f?.addEventListener("visibilitychange",m);const g=()=>{try{e?.stop()}catch{}try{e?.disconnect()}catch{}try{t?.disconnect()}catch{}try{i?.disconnect()}catch{}e=null,t=null,i=null},v=async()=>{const M=n;if(n=null,g(),!!M)try{await M.close()}catch{}},p=()=>{if(!n||!i||!t||r)return;const M=n.currentTime,_=Gu(d.boost),b=s&&!a&&!d.paused&&!d.reducedMotion&&_>0,w=M<c?1.35:1,P=b?Math.min(yx,(Ex+bx*_)*w):0,C=560+_*980;i.gain.cancelScheduledValues(M),i.gain.setTargetAtTime(P,M,P>0?.065:.035),t.frequency.cancelScheduledValues(M),t.frequency.setTargetAtTime(C,M,.09)},h=M=>{const _=Number.isFinite(M.sampleRate)&&M.sampleRate>0?M.sampleRate:44100,b=Math.max(2048,Math.min(32768,Math.round(_*Sx))),w=M.createBuffer(1,b,_),P=w.getChannelData(0);let C=99539473;for(let D=0;D<P.length;D+=1)C=Math.imul(C,1664525)+1013904223>>>0,P[D]=C/4294967295*2-1;const E=M.createBufferSource();e=E,E.buffer=w,E.loop=!0;const y=M.createBiquadFilter();t=y,y.type="lowpass",y.frequency.value=560,y.Q.value=.45;const R=M.createGain();i=R,R.gain.value=0,E.connect(y),y.connect(R),R.connect(M.destination);try{E.start()}catch(D){throw g(),D}},x=async()=>{if(r)return!1;const M=Ax();if(!M)return!1;try{return n||(n=new M,h(n)),n.state==="suspended"&&await n.resume(),r||!o?(await v(),!1):(s=!0,p(),!0)}catch{return s=!1,await v(),!1}};return{setEnabled:M=>r?Promise.resolve(!1):M?(o=!0,l||(l=x().finally(()=>{l=null}),l)):(o=!1,s=!1,p(),Promise.resolve(!0)),update:M=>{if(r)return;const _=Gu(M.boost),b=Number.isFinite(M.serial)?M.serial:0;d={boost:_,serial:b,paused:!!M.paused,reducedMotion:!!M.reducedMotion},b!==u&&_>0&&!d.paused&&!d.reducedMotion&&(c=(n?.currentTime??0)+Tx),u=b,p()},dispose:()=>{r||(r=!0,o=!1,s=!1,f?.removeEventListener("visibilitychange",m),v())}}}const Hd=document.querySelector("#app");if(!Hd)throw new Error("The app mount point is missing.");const Pi=window.matchMedia("(prefers-reduced-motion: reduce)");let Vt=Pi.matches;const Ar=wx();let Ti=!1,fr=!0,ga=0;Hd.innerHTML=`
  <main class="portfolio-shell">
    <div class="scene-layer" data-scene-layer aria-hidden="true"></div>

    <header class="site-header" aria-label="Portfolio introduction">
      <div class="site-header__identity">
        <p class="site-header__label">Leif Pedersen</p>
        <h1 class="site-header__title">Under way</h1>
        <p class="site-header__subtitle">A portfolio in motion</p>
      </div>
      <div class="site-header__control">
        <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false">
          Pause motion
        </button>
      </div>
    </header>

    <div class="landmark-layer" data-landmark-layer role="list" aria-label="Island landmarks"></div>

    <aside class="vessel-model-note" aria-label="Visible sail trim">
      <span class="vessel-model-note__swatch" aria-hidden="true"></span>
      <span>Coral boom shows trim. Pennants trail downwind.</span>
    </aside>

    <section class="sailing-hud" data-sailing-hud aria-label="Wind and sail trim">
      <div class="sailing-hud__dial" aria-hidden="true"><span class="sailing-hud__bow"></span><span data-wind-marker>•</span></div>
      <div class="sailing-hud__readout">
        <p class="sailing-hud__eyebrow">Wind from <span data-wind-direction>ahead</span> · <span data-wind-speed>9 m/s</span></p>
        <p class="sailing-hud__trim"><span data-trim-mode>Auto</span> · Main <span data-sail-angle> eased</span> · Aim <span data-suggested-trim>beam reach</span></p>
        <p class="sailing-hud__efficiency">Trim <span class="sailing-hud__meter" aria-hidden="true"><span data-trim-meter></span></span> <span data-trim-efficiency>0%</span><span data-trim-sweetspot> </span></p>
        <p class="sailing-hud__guidance" data-sailing-guidance>Auto trim ready. WASD or arrows to set sail.</p>
      </div>
    </section>

    <section class="helm-panel" data-vessel-controls aria-label="Sailing controls">
      <div class="helm-panel__heading">
        <p class="helm-panel__eyebrow">Helm</p>
        <p class="helm-panel__hint">
          <span class="helm-panel__hint-keyboard">WASD / arrows steer · Q/E trim · M auto</span>
          <span class="helm-panel__hint-touch">Steer · trim · auto · spill</span>
        </p>
      </div>
      <div class="helm-controls" role="group" aria-label="Steering controls">
        <button class="helm-button helm-button--direction-up" type="button" data-vessel-control="up" aria-label="Sail up">
          <span aria-hidden="true">↑</span><span>Up</span>
        </button>
        <button class="helm-button helm-button--direction-left" type="button" data-vessel-control="left" aria-label="Sail left">
          <span aria-hidden="true">←</span><span>Left</span>
        </button>
        <button class="helm-button helm-button--direction-down" type="button" data-vessel-control="down" aria-label="Sail down">
          <span aria-hidden="true">↓</span><span>Down</span>
        </button>
        <button class="helm-button helm-button--direction-right" type="button" data-vessel-control="right" aria-label="Sail right">
          <span aria-hidden="true">→</span><span>Right</span>
        </button>
        <button class="helm-button helm-button--trim-in" type="button" data-vessel-control="trimIn" aria-label="Trim sail in">
          <span aria-hidden="true">↗</span><span>Trim in</span>
        </button>
        <button class="helm-button helm-button--trim-out" type="button" data-vessel-control="trimOut" aria-label="Ease sail out">
          <span aria-hidden="true">↘</span><span>Ease out</span>
        </button>
        <button class="helm-button helm-button--auto-trim" type="button" data-vessel-auto-trim aria-label="Return to auto trim">
          <span aria-hidden="true">A</span><span>Auto trim</span>
        </button>
        <button class="helm-button helm-button--brake" type="button" data-vessel-control="brake" aria-label="Spill wind">
          <span aria-hidden="true">■</span><span>Spill</span>
        </button>
        <button class="helm-button helm-button--reset" type="button" data-vessel-reset aria-label="Reset boat">
          <span aria-hidden="true">↺</span><span>Reset boat</span>
        </button>
        <button class="helm-button helm-button--sound" type="button" data-sound-toggle aria-pressed="false" aria-label="Sound off">
          <span aria-hidden="true">♪</span><span>Sound off</span>
        </button>
      </div>
    </section>

    <footer class="scene-legend" aria-label="Map legend">
      <p class="scene-legend__title">Four islands. Room to explore.</p>
      <p class="scene-legend__key"><span class="scene-legend__ring" aria-hidden="true"></span> Ring marks a docking area</p>
    </footer>

    <section class="webgl-fallback is-hidden" data-webgl-fallback aria-live="polite">
      <p class="webgl-fallback__label">Island guide</p>
      <p>The 3D water is unavailable in this browser. Use the category buttons above to explore the full portfolio.</p>
      <ul class="island-summary" data-island-summary></ul>
    </section>
  </main>
`;const Vd=document.querySelector("[data-scene-layer]"),zc=document.querySelector("[data-landmark-layer]"),Sr=document.querySelector("[data-motion-toggle]"),_o=document.querySelector("[data-vessel-controls]"),Sn=document.querySelector("[data-sailing-hud]"),lc=document.querySelector("[data-wind-marker]"),uc=document.querySelector("[data-wind-direction]"),dc=document.querySelector("[data-wind-speed]"),hc=document.querySelector("[data-sail-angle]"),fc=document.querySelector("[data-suggested-trim]"),pc=document.querySelector("[data-trim-mode]"),mc=document.querySelector("[data-trim-meter]"),gc=document.querySelector("[data-trim-efficiency]"),_c=document.querySelector("[data-trim-sweetspot]"),zn=document.querySelector("[data-sound-toggle]"),kt=document.querySelector("[data-sailing-guidance]"),Wu=document.querySelector(".vessel-model-note"),Gd=document.querySelector("[data-webgl-fallback]"),Wd=document.querySelector("[data-island-summary]"),Xd=document.querySelector(".portfolio-shell");if(!Vd||!zc||!Sr||!_o||!Sn||!lc||!uc||!dc||!hc||!fc||!pc||!mc||!gc||!_c||!zn||!kt||!Gd||!Wd||!Xd)throw new Error("The portfolio shell is incomplete.");ch(ns,Zu);let Dt,Xu=null;const lo=xh({root:Xd,islands:ns,content:Zu,onScanRequest:n=>{Vn.releaseAll(),Dt?.startScan(n,{instant:Vt||Pi.matches})},onExploreRequest:()=>{Vn.releaseAll()}}),qd=new Map,kc=new Map,Tt={width:window.innerWidth,height:window.innerHeight};let ar=Sn.getBoundingClientRect();const Yd=typeof ResizeObserver<"u"?new ResizeObserver(()=>{ar=Sn.getBoundingClientRect()}):null;Yd?.observe(Sn);const Zd=typeof ResizeObserver<"u"?new ResizeObserver(n=>{for(const e of n){const i=e.target.dataset.landmarkId;if(!i)continue;const r=Array.isArray(e.borderBoxSize)?e.borderBoxSize[0]:e.borderBoxSize,s=r?.inlineSize??e.contentRect.width,o=r?.blockSize??e.contentRect.height;s<=0||o<=0||kc.set(i,{width:s,height:o})}}):null;for(const[n,e]of ns.entries()){const t=document.createElement("div");t.className="landmark-label",t.dataset.landmarkId=e.id,t.setAttribute("role","listitem"),t.innerHTML=`
    <span class="landmark-label__name"></span>
    <span class="landmark-label__category"></span>
  `;const i=t.querySelector(".landmark-label__name"),r=t.querySelector(".landmark-label__category");if(!i||!r)throw new Error("The landmark label is incomplete.");i.textContent=e.name,r.textContent=`${Yu(e.category)} · ${String(n+1).padStart(2,"0")}`,zc.append(t),qd.set(e.id,t),kc.set(e.id,{width:120,height:40}),Zd?.observe(t);const s=document.createElement("li");s.textContent=`${e.name} — ${Yu(e.category)}`,Wd.append(s)}const Hc=()=>{Sr.textContent=Vt?"Resume motion":"Pause motion",Sr.setAttribute("aria-pressed",String(Vt)),_o.setAttribute("aria-disabled",String(!Dt))};function Rx(n){if(!lc||!uc||!dc||!hc||!fc||!pc||!mc||!gc||!_c||!Sn||!kt)return;const e=s=>Math.round(Math.abs(s)*180/Math.PI),t=14,i=-Math.sin(n.relativeWindAngle)*t,r=-Math.cos(n.relativeWindAngle)*t;lc.style.transform=`translate(calc(-50% + ${i}px), calc(-50% + ${r}px))`,uc.textContent=qu(n.relativeWindAngle),dc.textContent=`${n.windSpeed.toFixed(0)} m/s`,Sn.setAttribute("aria-label",`Wind from ${qu(n.relativeWindAngle)}, ${n.windSpeed.toFixed(0)} metres per second. Sail angle ${e(n.sailAngle)} degrees; suggested ${e(n.suggestedAngle)} degrees.`),hc.textContent=`${e(n.sailAngle)}°`,fc.textContent=`${e(n.suggestedAngle)}°`,pc.textContent=n.trimMode==="manual"?"Manual":"Auto",mc.style.width=`${Math.round(Math.max(0,Math.min(1,n.trimEfficiency))*100)}%`,gc.textContent=`${Math.round(n.trimEfficiency*100)}%`,_c.textContent=n.sweetSpot?" · Sweet spot":"",Sn.toggleAttribute("data-manual-trim",n.trimMode==="manual"),Ar.update({boost:n.trimBoost,serial:n.boostSerial,paused:Vt,reducedMotion:Pi.matches}),Sn.toggleAttribute("data-no-go",n.noGo),Sn.toggleAttribute("data-luffing",n.luffing),n.assisted?kt.textContent="Assisted passage: steer when you are ready to take the helm.":n.moored?kt.textContent="Moored. Trim or steer to set sail.":n.luffing?kt.textContent="Wind spilled. Release to catch the wind.":n.noGo?kt.textContent="Into the wind. Turn left or right to tack.":n.trimMode==="auto"&&!n.trimEngaged?kt.textContent="Auto trim ready. WASD or arrows to set sail.":n.trimMode==="auto"?kt.textContent=`Auto trim ${Math.round(n.trimEfficiency*100)}% · Q/E for manual trim.`:n.trimBoost>.05?kt.textContent="Sweet spot · speed surge!":n.sailAngle>n.suggestedAngle+.1?kt.textContent="Trim in toward the suggested angle for more drive.":n.sailAngle<n.suggestedAngle-.1?kt.textContent="Ease out toward the suggested angle for more drive.":n.power<.08?kt.textContent="Turn across the wind to fill the sail.":n.sweetSpot?kt.textContent="Sweet spot. Sail diagonally and tack to travel upwind.":kt.textContent="Manual trim. Q/E adjusts the sail; M returns to auto."}function qu(n){const e=(n*180/Math.PI+360)%360;return e<22.5||e>=337.5?"ahead":e<67.5?"port bow":e<112.5?"port":e<157.5?"port quarter":e<202.5?"astern":e<247.5?"starboard quarter":e<292.5?"starboard":"starboard bow"}const Vn=new fh({root:_o,onInput:n=>{Dt?.setInput(n)},onReset:()=>{Dt?.resetVessel(),lo.closeDrawer(!1),Ar.update({boost:0,serial:0,paused:Vt,reducedMotion:Pi.matches})},onAutoTrim:()=>Dt?.setAutoTrim()}),vc=()=>{zn&&(zn.textContent=fr?Ti?"♪ Sound on":"♪ Sound off":"♪ Sound unavailable",zn.setAttribute("aria-pressed",String(Ti)),zn.setAttribute("aria-label",fr?Ti?"Sound on":"Sound off":"Sound unavailable"),zn.disabled=!fr)},$d=async()=>{if(!zn||!fr)return;const n=++ga,e=!Ti;Ti=e,vc();try{const t=await Ar.setEnabled(e);if(n!==ga)return;Ti=e&&t,fr=t||!e}catch{if(n!==ga)return;fr=!1,Ti=!1}vc()};zn?.addEventListener("click",$d);const Cx=n=>{for(const[e,t]of qd){const i=n.find(r=>r.id===e);if(!i||!i.visible||!Px(i,kc.get(e))){t.hidden=!0;continue}t.hidden=!1,t.style.transform=`translate3d(${i.x}px, ${i.y}px, 0) translate(-50%, 8px)`}};function Px(n,e){const t=e?.width??120,i=e?.height??40,r=n.x-t*.5,s=n.y+8,o=r+t,a=s+i,l=Math.min(48,Math.max(16,Tt.width*.04));if(r<ar.right+6&&o>ar.left-6&&s<ar.bottom+6&&a>ar.top-6)return!1;const c=Tt.height<=460?110:Tt.width<=900?200:160,u=Tt.height<=460?105:155,d=Tt.width<=540?l:Math.max(l,Tt.width-l-Math.min(480,Tt.width-l*2));if(r<l||o>Tt.width-l||s<c||a>Tt.height-u)return!1;const f=32,m=Tt.width*.5-f,g=Tt.height*.5-f,v=Tt.width*.5+f,p=Tt.height*.5+f;if(r<v&&o>m&&s<p&&a>g)return!1;const x=Tt.height-u;return!(r<Tt.width-l&&o>d&&s<Tt.height&&a>x)}const Kd=()=>{Tt.width=window.innerWidth,Tt.height=window.innerHeight,ar=Sn.getBoundingClientRect()};window.addEventListener("resize",Kd);try{Dt=xx(Vd,{reducedMotion:Pi.matches,islands:ns,framingInsets:{top:145,right:20,bottom:155,left:20},onLandmarkProjection:Cx,onVesselUpdate:n=>{const e=vh({x:n.x,z:n.z},ns,Xu);Xu=e?.id??null,lo.setProximity(e)},onSailingUpdate:Rx,onScanUpdate:n=>lo.setScanUpdate(n)}),Dt.setPaused(Vt),Vn.setEnabled(!Vt,!!Dt)}catch(n){console.warn("Unable to initialise the water scene.",n),zc.hidden=!0,Gd.classList.remove("is-hidden"),Sr.disabled=!0,Vn.setEnabled(!1,!1),_o.hidden=!0,Wu&&(Wu.hidden=!0)}const Ix=()=>{Vt=!Vt,Vn.setEnabled(!Vt&&!!Dt,!!Dt),Dt?.setPaused(Vt),Ar.update({boost:0,serial:0,paused:Vt,reducedMotion:Pi.matches}),Hc()};Sr.addEventListener("click",Ix);const Lx=n=>{if(n.key.toLowerCase()==="p"&&n.target===document.body){Sr.click();return}if(n.key.toLowerCase()!=="f"||n.repeat||n.altKey||n.ctrlKey||n.metaKey||n.target instanceof Element&&n.target.closest(".content-drawer, input, textarea, select, [contenteditable]"))return;const e=document.querySelector("[data-explore-action]");!document.querySelector(".content-drawer:not([hidden])")&&e&&!e.closest("[hidden]")&&(n.preventDefault(),e.click())};window.addEventListener("keydown",Lx);const Dx=n=>{Dt?.setReducedMotion(n.matches),n.matches&&(Vt=!0,Vn.setEnabled(!1,!!Dt),Dt?.setPaused(!0),Ar.update({boost:0,serial:0,paused:!0,reducedMotion:!0}),Hc())};Pi.addEventListener("change",Dx);const Ux=n=>{Vn.releaseAll(),n.persisted||(Vn.dispose(),Dt?.dispose(),lo.dispose(),Ar.dispose(),zn?.removeEventListener("click",$d),Zd?.disconnect(),Yd?.disconnect(),window.removeEventListener("resize",Kd))};window.addEventListener("pagehide",Ux);const Nx=()=>{Dt&&Vn.setEnabled(!Vt,!0)};window.addEventListener("pageshow",Nx);function Yu(n){return n.charAt(0).toUpperCase()+n.slice(1)}Hc();vc();
