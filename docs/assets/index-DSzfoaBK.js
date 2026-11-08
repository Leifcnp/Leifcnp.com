(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Dc={resume:[{id:"resume-01",role:"Creative technologist",organisation:"Independent practice",period:"2024 — present",summary:"Placeholder for a role, practice, or collaboration."}],projects:[{id:"project-01",title:"A small digital shoreline",summary:"Placeholder for a project log and its short field note.",year:2025,link:"#"}],writing:[{id:"writing-01",title:"Notes from the weather line",publication:"Personal notebook",year:2025,excerpt:"Placeholder for a writing sample excerpt.",link:"#"}],media:[{id:"media-01",label:"Portfolio media placeholder",url:"#",kind:"image"}]},Do=180,or={x:0,z:0},Ed=["resume","projects","writing","media"],Ad=["ridge","mesa","mound","twin-peaks"],zh=/^#[0-9a-f]{6}$/i,ds=[{id:"island-resume",name:"Chartroom",category:"resume",position:{x:-26,z:-18},landCollisionRadius:7,dockingTriggerRadius:11,landform:"ridge",palette:{sand:"#d8c28d",land:"#7e9a73",rock:"#465d5d"},contentIds:["resume-01"],description:"A quiet chartroom for the route so far and the work behind it."},{id:"island-projects",name:"Shipyard",category:"projects",position:{x:16,z:-24},landCollisionRadius:6,dockingTriggerRadius:10,landform:"mesa",palette:{sand:"#d8b878",land:"#b86f4c",rock:"#704b44"},contentIds:["project-01"],description:"A working shipyard for experiments, builds, and field notes."},{id:"island-writing",name:"Logbook",category:"writing",position:{x:-18,z:26},landCollisionRadius:8,dockingTriggerRadius:12,landform:"twin-peaks",palette:{sand:"#dfcfaa",land:"#8e806f",rock:"#555968"},contentIds:["writing-01"],description:"A windward logbook for essays, observations, and unfinished thoughts."},{id:"island-media",name:"Signal Cove",category:"media",position:{x:24,z:20},landCollisionRadius:7,dockingTriggerRadius:11,landform:"mound",palette:{sand:"#cbbd98",land:"#5d8c87",rock:"#3f5964"},contentIds:["media-01"],description:"A sheltered cove for images, moving pictures, and sound."}];function ns(n){return typeof n=="object"&&n!==null}function Hh(n){return ns(n)}function kh(n){return ns(n)&&typeof n.id=="string"&&n.id.length>0}function Vh(n){return typeof n=="string"&&Ed.includes(n)}function Gh(n){return typeof n=="string"&&Ad.includes(n)}function Es(n){return typeof n=="number"&&Number.isFinite(n)}function xt(n,e){throw new Error(`Invalid island at index ${n}: ${e}`)}function Wh(n,e){if(!Array.isArray(n))throw new Error("Invalid island definitions: expected an array");if(!ns(e))throw new Error("Invalid portfolio content: expected an object");const t=new Set,i=[];n.forEach((r,s)=>{Hh(r)||xt(s,"expected an object"),(typeof r.id!="string"||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))&&xt(s,"id must be a stable non-empty kebab-case string"),t.has(r.id)&&xt(s,`duplicate id "${r.id}"`),t.add(r.id),(typeof r.name!="string"||r.name.trim().length===0)&&xt(s,"name must be a non-empty string"),Vh(r.category)||xt(s,`category must be one of ${Ed.join(", ")}`),Gh(r.landform)||xt(s,`landform must be one of ${Ad.join(", ")}`),(!ns(r.position)||!Es(r.position.x)||!Es(r.position.z))&&xt(s,"position.x and position.z must be finite numbers"),(!Es(r.landCollisionRadius)||r.landCollisionRadius<=0)&&xt(s,"landCollisionRadius must be a finite positive number"),(!Es(r.dockingTriggerRadius)||r.dockingTriggerRadius<=0)&&xt(s,"dockingTriggerRadius must be a finite positive number"),(Math.abs(r.position.x)+r.dockingTriggerRadius>Do||Math.abs(r.position.z)+r.dockingTriggerRadius>Do)&&xt(s,`docking zone must remain within ±${Do} world units`),r.landCollisionRadius>=r.dockingTriggerRadius&&xt(s,"dockingTriggerRadius must be greater than landCollisionRadius"),ns(r.palette)||xt(s,"palette must contain sand, land, and rock colors");for(const u of["sand","land","rock"])(typeof r.palette[u]!="string"||!zh.test(r.palette[u]))&&xt(s,`palette.${u} must be a six-digit hex color`);(!Array.isArray(r.contentIds)||r.contentIds.length===0)&&xt(s,"contentIds must contain at least one content ID"),(typeof r.description!="string"||r.description.trim().length===0)&&xt(s,"description must be a non-empty string");const o=e[r.category];Array.isArray(o)||xt(s,`portfolio content category "${r.category}" must be an array`);const a=new Set;o.forEach((u,d)=>{if(!kh(u))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: id must be a non-empty string`);if(a.has(u.id))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: duplicate id "${u.id}"`);a.add(u.id)});const l=new Set;r.contentIds.forEach(u=>{(typeof u!="string"||u.length===0)&&xt(s,"contentIds must contain non-empty strings"),l.has(u)&&xt(s,`duplicate content ID "${u}"`),a.has(u)||xt(s,`content ID "${u}" is missing from category "${r.category}"`),l.add(u)}),i.push({index:s,island:r}),Math.hypot(r.position.x-or.x,r.position.z-or.z)<=r.dockingTriggerRadius&&xt(s,"docking zone must leave the vessel spawn point clear")});for(let r=0;r<i.length;r+=1)for(let s=r+1;s<i.length;s+=1){const o=i[r],a=i[s];if(Math.hypot(o.island.position.x-a.island.position.x,o.island.position.z-a.island.position.z)<=o.island.dockingTriggerRadius+a.island.dockingTriggerRadius)throw new Error(`Invalid island definitions: docking zones overlap for "${o.island.id}" and "${a.island.id}"`)}}const Xh=["up","down","trimIn","trimOut","left","right","brake"],qh=new Map([["w","up"],["arrowup","up"],["s","down"],["arrowdown","down"],["a","left"],["arrowleft","left"],["d","right"],["arrowright","right"],["q","trimIn"],["e","trimOut"],[" ","brake"]]),Yh={throttle:0,sheet:0,rudder:0,brake:!1};function Zh(n){const e=new Set(n),t=Number(e.has("right"))-Number(e.has("left")),i=Number(e.has("down"))-Number(e.has("up")),r=t||i?Math.atan2(t+i,i-t):void 0;return{throttle:0,sheet:e.has("trimIn")===e.has("trimOut")?0:e.has("trimIn")?-1:1,rudder:0,brake:e.has("brake"),...r===void 0?{}:{targetHeading:r}}}class $h{root;onInput;onReset;onAutoTrim;buttons=new Map;resetButton;autoTrimButton;pressedKeys=new Map;pressedButtons=new Map;pointers=new Map;buttonHandlers=[];enabled=!0;resetEnabled=!0;disposed=!1;resetHeld=!1;lastInput={...Yh};constructor(e){this.root=e.root,this.onInput=e.onInput,this.onReset=e.onReset,this.onAutoTrim=e.onAutoTrim;for(const r of Xh){const s=Array.from(this.root.querySelectorAll(`[data-vessel-control="${r}"]`));this.buttons.set(r,s);for(const o of s)this.bindButton(o,r)}this.root.addEventListener("pointerdown",this.onPointerDown),this.root.addEventListener("pointerup",this.onPointerUp),this.root.addEventListener("pointercancel",this.onPointerCancel),this.root.addEventListener("lostpointercapture",this.onLostPointerCapture),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),window.addEventListener("pagehide",this.onPageHide),document.addEventListener("visibilitychange",this.onVisibilityChange);const t=this.root.querySelector("[data-vessel-reset]");if(this.resetButton=t??void 0,t&&this.onReset){const r=()=>{this.releaseAll(),this.onReset?.()};t.addEventListener("click",r),this.buttonHandlers.push({button:t,type:"click",handler:r})}const i=this.root.querySelector("[data-vessel-auto-trim]");if(this.autoTrimButton=i??void 0,i&&this.onAutoTrim){const r=()=>{this.releaseAll(),this.onAutoTrim?.()};i.addEventListener("click",r),this.buttonHandlers.push({button:i,type:"click",handler:r})}this.emitIfChanged()}setEnabled(e,t=e){if(!this.disposed){this.enabled=e,this.resetEnabled=t,this.releaseAll();for(const i of this.buttons.values())for(const r of i)r.disabled=!e,r.setAttribute("aria-disabled",String(!e));this.resetButton&&(this.resetButton.disabled=!t,this.resetButton.setAttribute("aria-disabled",String(!t))),this.autoTrimButton&&(this.autoTrimButton.disabled=!e,this.autoTrimButton.setAttribute("aria-disabled",String(!e))),this.root.toggleAttribute("data-controls-disabled",!e)}}releaseAll(){this.pressedKeys.clear(),this.pressedButtons.clear(),this.resetHeld=!1;for(const{pointerId:e,button:t}of this.pointers.values())try{t.releasePointerCapture?.(e)}catch{}this.pointers.clear(),this.emitIfChanged(!0)}dispose(){if(!this.disposed){this.disposed=!0,this.releaseAll(),this.root.removeEventListener("pointerdown",this.onPointerDown),this.root.removeEventListener("pointerup",this.onPointerUp),this.root.removeEventListener("pointercancel",this.onPointerCancel),this.root.removeEventListener("lostpointercapture",this.onLostPointerCapture),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),window.removeEventListener("pagehide",this.onPageHide),document.removeEventListener("visibilitychange",this.onVisibilityChange);for(const{button:e,type:t,handler:i}of this.buttonHandlers)e.removeEventListener(t,i);this.buttonHandlers.length=0}}bindButton=(e,t)=>{e.dataset.vesselControl=t,e.addEventListener("keydown",this.onButtonKeyDown),e.addEventListener("keyup",this.onButtonKeyUp),e.addEventListener("focusout",this.onButtonFocusOut),this.buttonHandlers.push({button:e,type:"keydown",handler:this.onButtonKeyDown},{button:e,type:"keyup",handler:this.onButtonKeyUp},{button:e,type:"focusout",handler:this.onButtonFocusOut})};onButtonKeyDown=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||this.enabled&&(e.preventDefault(),this.pressedButtons.set(t,i),this.emitIfChanged())};onButtonKeyUp=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.pressedButtons.delete(t),this.emitIfChanged())};onButtonFocusOut=e=>{const t=e.currentTarget;!t||!this.pressedButtons.delete(t)||this.emitIfChanged()};onPointerDown=e=>{if(!this.enabled||this.disposed||e.pointerType==="mouse"&&e.button!==0)return;const t=e.target instanceof Element?e.target.closest("[data-vessel-control]"):null,i=t?.dataset.vesselControl;!t||!i||t.disabled||(e.preventDefault(),this.pointers.set(e.pointerId,{pointerId:e.pointerId,control:i,button:t}),t.setPointerCapture?.(e.pointerId),this.emitIfChanged())};onPointerUp=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onPointerCancel=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onLostPointerCapture=e=>{const t=e.pointerId;!Number.isFinite(t)||!this.pointers.delete(t)||this.emitIfChanged()};onKeyDown=e=>{if(this.disposed||Kh(e.target)||jh(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;const t=fl(e.key);if(e.target instanceof HTMLElement&&e.target.matches("button, a")&&(t===" "||t==="enter"))return;if(t==="r"){if(!this.resetEnabled||this.resetHeld)return;e.preventDefault(),this.releaseAll(),this.resetHeld=!0,this.onReset?.();return}if(!this.enabled)return;if(t==="m"){if(e.repeat)return;e.preventDefault(),this.releaseAll(),this.onAutoTrim?.();return}const i=qh.get(t);i&&(e.preventDefault(),!this.pressedKeys.has(t)&&(this.pressedKeys.set(t,i),this.emitIfChanged()))};onKeyUp=e=>{const t=fl(e.key);if(t==="r"){this.resetHeld=!1;return}this.pressedKeys.delete(t)&&(e.preventDefault(),this.emitIfChanged())};onBlur=()=>this.releaseAll();onPageHide=()=>this.releaseAll();onVisibilityChange=()=>{document.hidden&&this.releaseAll()};emitIfChanged(e=!1){const t=this.getInput();!e&&Jh(t,this.lastInput)||(this.lastInput=t,this.onInput({...t}))}getInput(){const e=new Set(this.pressedKeys.values());for(const i of this.pressedButtons.values())e.add(i);for(const{control:i}of this.pointers.values())e.add(i);const t=Zh(e);for(const[i,r]of this.buttons){const s=e.has(i);for(const o of r)o.dataset.active=String(s),o.setAttribute("aria-pressed",String(s))}return t}}function fl(n){return n.length===1,n.toLowerCase()}function Kh(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest("input, select, textarea"):!1}function jh(n){return n instanceof Element&&!!n.closest(".content-drawer")}function Jh(n,e){return n.throttle===e.throttle&&n.sheet===e.sheet&&n.rudder===e.rudder&&n.brake===e.brake&&n.sailAngle===e.sailAngle&&n.targetHeading===e.targetHeading}const Qh=1.25;function Ur(n){return typeof n=="number"&&Number.isFinite(n)}function pl(n,e){return Math.hypot(n.x-e.position.x,n.z-e.position.z)}function ef(n,e,t){if(!Ur(n?.x)||!Ur(n?.z))return null;if(t){const s=e.find(o=>o.id===t);if(s&&pl(n,s)<=s.dockingTriggerRadius+Qh)return s}let i=null,r=Number.POSITIVE_INFINITY;for(const s of e){if(!Ur(s.position.x)||!Ur(s.position.z)||!Ur(s.dockingTriggerRadius))continue;const o=pl(n,s);o<=s.dockingTriggerRadius&&o<r&&(i=s,r=o)}return i}const ir=[{id:"shipyard-overview",islandId:"island-projects",label:"Overview",localPosition:{x:12,z:2},captureRadius:1.75,contentTarget:{kind:"overview"},approachPoints:[{x:14,z:2},{x:12,z:2}]},{id:"shipyard-project",islandId:"island-projects",label:"Project",localPosition:{x:2,z:12},captureRadius:1.75,contentTarget:{kind:"project",contentId:"project-01"},approachPoints:[{x:2,z:14},{x:2,z:12}]}];function hs(n,e){const t=e.find(i=>i.id===n.islandId);return t?{x:t.position.x+n.localPosition.x,z:t.position.z+n.localPosition.z}:null}function tf(n,e,t){const i=t.x-e.x,r=t.z-e.z,s=i*i+r*r,o=s>0?Math.max(0,Math.min(1,((n.x-e.x)*i+(n.z-e.z)*r)/s)):0;return Math.hypot(n.x-e.x-o*i,n.z-e.z-o*r)}function nf(n,e,t,i,r){const s=new Set,o=.28,a=u=>Number.isFinite(u?.x)&&Number.isFinite(u?.z),l=(u,d)=>{if(!a(u)||Math.abs(u.x)+d+i>r||Math.abs(u.z)+d+i>r)throw new Error("Harbour point is outside safe world bounds");for(const f of e)if(Math.hypot(u.x-f.position.x,u.z-f.position.z)-d<f.landCollisionRadius+i+o)throw new Error("Harbour capture/approach overlaps land clearance")},c=(u,d)=>{for(const f of e)if(tf(f.position,u,d)<f.landCollisionRadius+i+o)throw new Error("Harbour approach/connection crosses land clearance")};if(!Number.isFinite(i)||i<0||!Number.isFinite(r)||r<=i)throw new Error("Invalid harbour navigation bounds");for(const u of n){const d=e.find(_=>_.id===u.islandId);if(!d||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(u.id)||s.has(u.id)||!u.label.trim())throw new Error("Invalid harbour identity/parent");if(s.add(u.id),!a(u.localPosition)||!Number.isFinite(u.captureRadius)||u.captureRadius<=0)throw new Error("Invalid harbour capture geometry");const f=u.contentTarget;if(f.kind!=="overview"&&!(f.kind==="project"&&d.category==="projects"&&d.contentIds.includes(f.contentId)&&t.projects.some(_=>_.id===f.contentId)))throw new Error("Unknown harbour content target");const m=hs(u,e);if(l(m,u.captureRadius),u.approachPoints.length===0)throw new Error("Harbour needs a safe approach");let g=null;for(const _ of u.approachPoints){const p={x:d.position.x+_.x,z:d.position.z+_.z};l(p,0),g&&c(g,p),g=p}if(Math.hypot(g.x-m.x,g.z-m.z)>1e-6)throw new Error("Harbour approach must reach its centre");for(const _ of n){if(_===u||_.islandId!==u.islandId)continue;const p=hs(_,e);if(Math.hypot(m.x-p.x,m.z-p.z)<u.captureRadius+_.captureRadius)throw new Error("Harbour capture circles overlap");c(m,p)}}}const Uo={resume:"Resume",projects:"Projects",writing:"Writing",media:"Media"};function rf(n){const{root:e,islands:t,content:i}=n,r=new Map(t.map(X=>[X.id,X])),s=document.createElement("nav");s.className="scanner-hud",s.setAttribute("aria-label","Portfolio scanner");const o=document.createElement("p");o.className="scanner-hud__label",o.textContent="Scan by category",s.append(o);const a=document.createElement("div");a.className="scanner-hud__links",a.setAttribute("role","list");for(const X of t){const te=document.createElement("div");te.setAttribute("role","listitem");const Q=document.createElement("button");Q.type="button",Q.className="scanner-hud__link",Q.dataset.scannerIsland=X.id,Q.setAttribute("aria-label",`Scan ${X.name}, ${Uo[X.category]}`),Q.setAttribute("aria-expanded","false"),Q.setAttribute("aria-controls","portfolio-content-drawer");const ne=document.createElement("span");ne.className="scanner-hud__number",ne.setAttribute("aria-hidden","true"),ne.textContent=String(a.children.length+1).padStart(2,"0");const se=document.createElement("span");se.className="scanner-hud__link-label",se.textContent=Uo[X.category];const Y=document.createElement("span");Y.className="scanner-hud__link-name",Y.textContent=X.name,Q.append(ne,se,Y),Q.addEventListener("click",Z),te.append(Q),a.append(te)}s.append(a);const l=document.createElement("p");l.className="scanner-hud__status",l.setAttribute("role","status"),l.setAttribute("aria-live","polite"),l.setAttribute("aria-atomic","true"),l.textContent="Under way · choose a category to scan",s.append(l);const c=document.createElement("p");c.className="visually-hidden",c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.setAttribute("aria-atomic","true"),s.append(c);const u=document.createElement("section");u.className="explore-prompt",u.hidden=!0,u.setAttribute("aria-label","Nearby island");const d=document.createElement("p");d.className="explore-prompt__kicker",d.textContent="Within range";const f=document.createElement("p");f.className="explore-prompt__text";const m=document.createElement("button");m.type="button",m.dataset.exploreAction="true",m.className="explore-prompt__button",m.textContent="Explore island",m.addEventListener("click",pe),u.append(d,f,m);const g=document.createElement("aside");g.className="content-drawer",g.id="portfolio-content-drawer",g.hidden=!0,g.setAttribute("aria-label","Portfolio content"),g.setAttribute("aria-live","off");const _=document.createElement("div");_.className="content-drawer__header";const p=document.createElement("button");p.type="button",p.className="content-drawer__close",p.setAttribute("aria-label","Close portfolio drawer"),p.textContent="Close";const h=()=>Ue(!0);p.addEventListener("click",h);const S=document.createElement("h2");S.className="content-drawer__title",S.tabIndex=-1,S.id="portfolio-drawer-heading",_.append(S,p);const v=document.createElement("div");v.className="content-drawer__body",v.tabIndex=0,v.setAttribute("role","region"),v.setAttribute("aria-labelledby",S.id),g.setAttribute("aria-labelledby",S.id),g.append(_,v);const x=document.createElement("section");x.className="harbour-nav",x.hidden=!0,x.setAttribute("aria-label","Shipyard local harbours");const A=document.createElement("span");A.className="harbour-nav__title",A.textContent="Shipyard";const E=document.createElement("div");E.className="harbour-nav__destinations";const C=new Map,w=new Map,M=document.createElement("div");M.className="harbour-labels",M.setAttribute("aria-hidden","true");for(const X of ir){const te=document.createElement("button");te.type="button",te.textContent=X.label,te.dataset.harbourId=X.id,te.setAttribute("aria-pressed","false"),te.setAttribute("aria-label",`Focus ${X.label} harbour`),te.addEventListener("click",()=>n.onHarbourSelect(X.id)),E.append(te),C.set(X.id,te);const Q=document.createElement("div");Q.className="harbour-label",Q.dataset.harbourLandmark=X.id,Q.textContent=X.label,Q.hidden=!0,M.append(Q),w.set(X.id,Q)}const y=document.createElement("button");y.type="button",y.textContent="Open",y.dataset.harbourOpen="true",y.addEventListener("click",()=>{const X=D.selectedHarbourId;X&&xe(X,y)});const R=document.createElement("button");R.type="button",R.hidden=!0,R.dataset.nearbyHarbourOpen="true",R.addEventListener("click",()=>{D.nearbyHarbourId&&xe(D.nearbyHarbourId,R)});const N=document.createElement("button");N.type="button",N.textContent="Zoom out",N.addEventListener("click",()=>n.onZoomOut());const L=document.createElement("span");L.className="harbour-nav__status",L.setAttribute("role","status"),L.setAttribute("aria-live","polite"),x.append(A,N,E,y,R,L),e.append(s,u,g,x,M);let D={islandId:null,selectedHarbourId:null,nearbyHarbourId:null},F=null,B=null,$=l.textContent??"",H=!1,ie=0;function Z(X){const te=X.currentTarget;if(!(te instanceof HTMLButtonElement))return;const Q=te.dataset.scannerIsland;!Q||!r.has(Q)||(De(Q,te),n.onScanRequest(Q))}function pe(){F&&(De(F.id,m),n.onExploreRequest(F.id))}function Ee(X){X.key!=="Escape"||g.hidden||Ue(!0)}function De(X,te=null){const Q=r.get(X);if(!Q||H)return;B=te??q(X),S.textContent=Q.name,v.replaceChildren(ml(Q,i)),v.scrollTop=0,g.hidden=!1,e.classList.add("is-reading"),u.hidden=!0;for(const se of s.querySelectorAll("[data-scanner-island]")){const Y=se.dataset.scannerIsland===X;se.setAttribute("aria-expanded",String(Y)),se.dataset.selected=String(Y)}const ne=++ie;requestAnimationFrame(()=>{!g.hidden&&ne===ie&&S.focus({preventScroll:!0})})}function Ue(X=!0){if(g.hidden)return;const te=me();ie+=1,g.hidden=!0,e.classList.remove("is-reading"),u.hidden=!F||!!D.islandId;for(const ne of s.querySelectorAll("[data-scanner-island]"))ne.setAttribute("aria-expanded","false"),ne.dataset.selected="false";const Q=B&&document.contains(B)&&sf(B)?B:te;X&&Q&&Q.focus({preventScroll:!0}),B=null}function W(X){F?.id!==X?.id&&(F=X,u.hidden=!X||!g.hidden||!!D.islandId,c.textContent=X?`Docking range: ${X.name}. Explore prompt available.`:"Outside all docking zones.",X&&(f.textContent=`${X.name} · ${Uo[X.category]}`,m.setAttribute("aria-label",`Explore ${X.name}`)))}function ce(X){if(H||X.islandId===D.islandId&&X.selectedHarbourId===D.selectedHarbourId&&X.nearbyHarbourId===D.nearbyHarbourId)return;const te=D;D=X;const Q=!!X.islandId;x.hidden=!Q,e.classList.toggle("is-local-harbour",Q),u.hidden=!F||!g.hidden||Q;for(const[oe,qe]of C)qe.setAttribute("aria-pressed",String(oe===X.selectedHarbourId));const ne=X.selectedHarbourId,se=ir.find(oe=>oe.id===ne);y.disabled=!se,y.textContent=se?`Open ${se.label}`:"Open",y.setAttribute("aria-label",se?`Open ${se.label} content`:"Open harbour content");const Y=ir.find(oe=>oe.id===X.nearbyHarbourId);if(R.hidden=!Y||Y.id===ne,R.textContent=Y?`Open nearby ${Y.label}`:"",te.nearbyHarbourId!==X.nearbyHarbourId||te.islandId!==X.islandId){const oe=ir.find(qe=>qe.id===X.nearbyHarbourId);L.textContent=oe?`${oe.label} reached · Open available`:"Choose a harbour to focus"}if(!Q){for(const oe of w.values())oe.hidden=!0;x.contains(document.activeElement)&&q("island-projects")?.focus({preventScroll:!0})}}function le(X){for(const[te,Q]of w){const ne=X.find(se=>se.id===te);Q.hidden=!D.islandId||!ne?.visible,ne&&(Q.style.transform=`translate3d(${ne.x}px, ${ne.y}px, 0) translate(-50%, 10px)`)}}function xe(X,te=null){const Q=ir.find(Y=>Y.id===X);if(!Q||!D.islandId)return;const ne=r.get(D.islandId);if(!ne)return;De(ne.id,te??C.get(X)),S.textContent=`${ne.name} · ${Q.label}`;const se=Q.contentTarget;if(se.kind==="overview"){const Y=document.createElement("p");Y.className="content-drawer__description",Y.textContent=ne.description,v.replaceChildren(Y)}else v.replaceChildren(ml({...ne,description:"",contentIds:[se.contentId]},i)),v.querySelector(".content-drawer__description")?.remove();n.onExploreRequest(ne.id)}function Ae(X){if(H)return;const te=X.status==="travelling"?`Assisted passage to ${r.get(X.islandId??"")?.name??"island"}`:X.status==="arrived"?`Arrived at ${r.get(X.islandId??"")?.name??"island"}`:X.status==="cancelled"?"Scanner cancelled · steer manually":X.status==="failed"?"Scanner route unavailable · steer manually":"Under way · choose a category to scan",Q=X.message??te;Q!==$&&($=Q,l.textContent=Q)}function q(X){return s.querySelector(`[data-scanner-island="${CSS.escape(X)}"]`)}function me(){return ae()?q(ae()):null}function ae(){return Array.from(s.querySelectorAll("[data-scanner-island]")).find(X=>X.dataset.selected==="true")?.dataset.scannerIsland??null}function P(){if(!H){H=!0,ie+=1,e.classList.remove("is-reading","is-local-harbour"),x.remove(),M.remove(),window.removeEventListener("keydown",Ee);for(const X of s.querySelectorAll("[data-scanner-island]"))X.removeEventListener("click",Z);m.removeEventListener("click",pe),p.removeEventListener("click",h),s.remove(),u.remove(),g.remove()}}return window.addEventListener("keydown",Ee),{nav:s,drawer:g,setHarbourUpdate:ce,setHarbourProjection:le,openHarbour:xe,setProximity:W,setScanUpdate:Ae,openIsland:De,closeDrawer:Ue,dispose:P}}function ml(n,e){const t=document.createDocumentFragment(),i=document.createElement("p");i.className="content-drawer__description",i.textContent=n.description,t.append(i);const r=n.category;if(r==="resume")for(const s of e.resume.filter(o=>n.contentIds.includes(o.id))){const o=As();ws(o,s.role),Ts(o,`${s.organisation} · ${s.period}`),No(o,s.summary),t.append(o)}else if(r==="projects")for(const s of e.projects.filter(o=>n.contentIds.includes(o.id))){const o=As();ws(o,s.title),Ts(o,String(s.year)),No(o,s.summary),Fo(o,s.link),t.append(o)}else if(r==="writing")for(const s of e.writing.filter(o=>n.contentIds.includes(o.id))){const o=As();ws(o,s.title),Ts(o,`${s.publication} · ${s.year}`),No(o,s.excerpt),Fo(o,s.link),t.append(o)}else for(const s of e.media.filter(o=>n.contentIds.includes(o.id))){const o=As();ws(o,s.label),Ts(o,s.kind),Fo(o,s.url),t.append(o)}return t}function As(){const n=document.createElement("article");return n.className="content-card",n}function ws(n,e){const t=document.createElement("h3");t.textContent=e,n.append(t)}function Ts(n,e){const t=document.createElement("p");t.className="content-card__meta",t.textContent=e,n.append(t)}function No(n,e){const t=document.createElement("p");t.textContent=e,n.append(t)}function Fo(n,e){if(!e||e==="#"){const i=document.createElement("p");i.className="content-card__placeholder",i.textContent="Link unavailable in placeholder data.",n.append(i);return}const t=document.createElement("a");t.href=e,t.target="_blank",t.rel="noreferrer",t.textContent="Open related material",n.append(t)}function sf(n){if(n.hidden||n.closest("[hidden]"))return!1;const e=window.getComputedStyle(n);return e.display!=="none"&&e.visibility!=="hidden"}const Uc="179",of=0,gl=1,af=2,wd=1,cf=2,On=3,li=0,qt=1,yt=2,ai=0,hr=1,_l=2,xl=3,vl=4,lf=5,yi=100,uf=101,df=102,hf=103,ff=104,pf=200,mf=201,gf=202,_f=203,Ia=204,La=205,xf=206,vf=207,Mf=208,Sf=209,yf=210,bf=211,Ef=212,Af=213,wf=214,Da=0,Ua=1,Na=2,vr=3,Fa=4,Oa=5,Ba=6,za=7,Td=0,Tf=1,Rf=2,ci=0,Cf=1,Pf=2,If=3,Rd=4,Lf=5,Df=6,Uf=7,Cd=300,Mr=301,Sr=302,Ha=303,ka=304,bo=306,Va=1e3,Ai=1001,Ga=1002,Qt=1003,Nf=1004,Rs=1005,yn=1006,Oo=1007,wi=1008,wn=1009,Pd=1010,Id=1011,fs=1012,Nc=1013,Ii=1014,bn=1015,vs=1016,Fc=1017,Oc=1018,ps=1020,Ld=35902,Dd=1021,Ud=1022,fn=1023,ms=1026,gs=1027,Bc=1028,zc=1029,Nd=1030,Hc=1031,kc=1033,ao=33776,co=33777,lo=33778,uo=33779,Wa=35840,Xa=35841,qa=35842,Ya=35843,Za=36196,$a=37492,Ka=37496,ja=37808,Ja=37809,Qa=37810,ec=37811,tc=37812,nc=37813,ic=37814,rc=37815,sc=37816,oc=37817,ac=37818,cc=37819,lc=37820,uc=37821,ho=36492,dc=36494,hc=36495,Fd=36283,fc=36284,pc=36285,mc=36286,Ff=3200,Of=3201,Od=0,Bf=1,ri="",jt="srgb",yr="srgb-linear",go="linear",rt="srgb",Fi=7680,Ml=519,zf=512,Hf=513,kf=514,Bd=515,Vf=516,Gf=517,Wf=518,Xf=519,Sl=35044,Ot=35048,yl="300 es",En=2e3,_o=2001;class Tr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bo=Math.PI/180,gc=180/Math.PI;function Ms(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]).toLowerCase()}function je(n,e,t){return Math.max(e,Math.min(t,n))}function qf(n,e){return(n%e+e)%e}function zo(n,e,t){return(1-t)*n+t*e}function Nr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ht(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ss{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const f=s[o+0],m=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==f||c!==m||u!==g){let p=1-a;const h=l*f+c*m+u*g+d*_,S=h>=0?1:-1,v=1-h*h;if(v>Number.EPSILON){const A=Math.sqrt(v),E=Math.atan2(A,h*S);p=Math.sin(p*E)/A,a=Math.sin(a*E)/A}const x=a*S;if(l=l*p+f*x,c=c*p+m*x,u=u*p+g*x,d=d*p+_*x,p===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*m-c*f,e[t+1]=l*g+u*f+c*d-a*m,e[t+2]=c*g+u*m+a*f-l*d,e[t+3]=u*g-a*d-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d-f*m*g;break;case"YXZ":this._x=f*u*d+c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d+f*m*g;break;case"ZXY":this._x=f*u*d-c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d-f*m*g;break;case"ZYX":this._x=f*u*d-c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d+f*m*g;break;case"YZX":this._x=f*u*d+c*m*g,this._y=c*m*d+f*u*g,this._z=c*u*g-f*m*d,this._w=c*u*d-f*m*g;break;case"XZY":this._x=f*u*d-c*m*g,this._y=c*m*d-f*u*g,this._z=c*u*g+f*m*d,this._w=c*u*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>d){const m=2*Math.sqrt(1+i-a-d);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-i-d);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+d-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,i=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ho.copy(this).projectOnVector(e),this.sub(Ho)}reflect(e){return this.sub(Ho.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ho=new k,bl=new Ss;class Xe{constructor(e,t,i,r,s,o,a,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],m=i[5],g=i[8],_=r[0],p=r[3],h=r[6],S=r[1],v=r[4],x=r[7],A=r[2],E=r[5],C=r[8];return s[0]=o*_+a*S+l*A,s[3]=o*p+a*v+l*E,s[6]=o*h+a*x+l*C,s[1]=c*_+u*S+d*A,s[4]=c*p+u*v+d*E,s[7]=c*h+u*x+d*C,s[2]=f*_+m*S+g*A,s[5]=f*p+m*v+g*E,s[8]=f*h+m*x+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,m=c*s-o*l,g=t*d+i*f+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=m*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ko.makeScale(e,t)),this}rotate(e){return this.premultiply(ko.makeRotation(-e)),this}translate(e,t){return this.premultiply(ko.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ko=new Xe;function zd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function xo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Yf(){const n=xo("canvas");return n.style.display="block",n}const El={};function fr(n){n in El||(El[n]=!0,console.warn(n))}function Zf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Al=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wl=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $f(){const n={enabled:!0,workingColorSpace:yr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===rt&&(r.r=Xn(r.r),r.g=Xn(r.g),r.b=Xn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(r.r=pr(r.r),r.g=pr(r.g),r.b=pr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ri?go:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return fr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return fr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[yr]:{primaries:e,whitePoint:i,transfer:go,toXYZ:Al,fromXYZ:wl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:Al,fromXYZ:wl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),n}const et=$f();function Xn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function pr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Oi;class Kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Oi===void 0&&(Oi=xo("canvas")),Oi.width=e.width,Oi.height=e.height;const r=Oi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Oi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Xn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Xn(t[i]/255)*255):t[i]=Xn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jf=0;class Vc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Ms(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Vo(r[o].image)):s.push(Vo(r[o]))}else s=Vo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Vo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Kf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jf=0;const Go=new k;class Bt extends Tr{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,i=Ai,r=Ai,s=yn,o=wi,a=fn,l=wn,c=Bt.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Ms(),this.name="",this.source=new Vc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Go).x}get height(){return this.source.getSize(Go).y}get depth(){return this.source.getSize(Go).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Va:e.x=e.x-Math.floor(e.x);break;case Ai:e.x=e.x<0?0:1;break;case Ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Va:e.y=e.y-Math.floor(e.y);break;case Ai:e.y=e.y<0?0:1;break;case Ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=Cd;Bt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,i=0,r=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(m+1)/2,A=(h+1)/2,E=(u+f)/4,C=(d+_)/4,w=(g+p)/4;return v>x&&v>A?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=E/i,s=C/i):x>A?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=E/r,s=w/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=C/s,r=w/s),this.set(i,r,s,t),this}let S=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(d-_)/S,this.z=(f-u)/S,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qf extends Tr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Bt(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Vc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Li extends Qf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Hd extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ep extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ui{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,on):on.fromBufferAttribute(s,o),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Cs.copy(i.boundingBox)),Cs.applyMatrix4(e.matrixWorld),this.union(Cs)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fr),Ps.subVectors(this.max,Fr),Bi.subVectors(e.a,Fr),zi.subVectors(e.b,Fr),Hi.subVectors(e.c,Fr),Yn.subVectors(zi,Bi),Zn.subVectors(Hi,zi),fi.subVectors(Bi,Hi);let t=[0,-Yn.z,Yn.y,0,-Zn.z,Zn.y,0,-fi.z,fi.y,Yn.z,0,-Yn.x,Zn.z,0,-Zn.x,fi.z,0,-fi.x,-Yn.y,Yn.x,0,-Zn.y,Zn.x,0,-fi.y,fi.x,0];return!Wo(t,Bi,zi,Hi,Ps)||(t=[1,0,0,0,1,0,0,0,1],!Wo(t,Bi,zi,Hi,Ps))?!1:(Is.crossVectors(Yn,Zn),t=[Is.x,Is.y,Is.z],Wo(t,Bi,zi,Hi,Ps))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pn=[new k,new k,new k,new k,new k,new k,new k,new k],on=new k,Cs=new ui,Bi=new k,zi=new k,Hi=new k,Yn=new k,Zn=new k,fi=new k,Fr=new k,Ps=new k,Is=new k,pi=new k;function Wo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){pi.fromArray(n,s);const a=r.x*Math.abs(pi.x)+r.y*Math.abs(pi.y)+r.z*Math.abs(pi.z),l=e.dot(pi),c=t.dot(pi),u=i.dot(pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const tp=new ui,Or=new k,Xo=new k;class Rr{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):tp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Or.subVectors(e,this.center);const t=Or.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Or,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Or.copy(e.center).add(Xo)),this.expandByPoint(Or.copy(e.center).sub(Xo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const In=new k,qo=new k,Ls=new k,$n=new k,Yo=new k,Ds=new k,Zo=new k;class Gc{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){qo.copy(e).add(t).multiplyScalar(.5),Ls.copy(t).sub(e).normalize(),$n.copy(this.origin).sub(qo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ls),a=$n.dot(this.direction),l=-$n.dot(Ls),c=$n.lengthSq(),u=Math.abs(1-o*o);let d,f,m,g;if(u>0)if(d=o*l-a,f=o*a-l,g=s*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,m=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),m=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(qo).addScaledVector(Ls,f),m}intersectSphere(e,t){In.subVectors(e.center,this.origin);const i=In.dot(this.direction),r=In.dot(In)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,i,r,s){Yo.subVectors(t,e),Ds.subVectors(i,e),Zo.crossVectors(Yo,Ds);let o=this.direction.dot(Zo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$n.subVectors(this.origin,e);const l=a*this.direction.dot(Ds.crossVectors($n,Ds));if(l<0)return null;const c=a*this.direction.dot(Yo.cross($n));if(c<0||l+c>o)return null;const u=-a*$n.dot(Zo);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,r,s,o,a,l,c,u,d,f,m,g,_,p){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,f,m,g,_,p)}set(e,t,i,r,s,o,a,l,c,u,d,f,m,g,_,p){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=m,h[7]=g,h[11]=_,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ki.setFromMatrixColumn(e,0).length(),s=1/ki.setFromMatrixColumn(e,1).length(),o=1/ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,m=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,m=l*d,g=c*u,_=c*d;t[0]=f+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,m=l*d,g=c*u,_=c*d;t[0]=f-_*a,t[4]=-o*d,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,m=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*d,t[8]=g*d+m,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+_,t[5]=o*u,t[9]=m*d-g,t[2]=g*d-m,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(np,e,ip)}lookAt(e,t,i){const r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Kn.crossVectors(i,$t),Kn.lengthSq()===0&&(Math.abs(i.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Kn.crossVectors(i,$t)),Kn.normalize(),Us.crossVectors($t,Kn),r[0]=Kn.x,r[4]=Us.x,r[8]=$t.x,r[1]=Kn.y,r[5]=Us.y,r[9]=$t.y,r[2]=Kn.z,r[6]=Us.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],m=i[13],g=i[2],_=i[6],p=i[10],h=i[14],S=i[3],v=i[7],x=i[11],A=i[15],E=r[0],C=r[4],w=r[8],M=r[12],y=r[1],R=r[5],N=r[9],L=r[13],D=r[2],F=r[6],B=r[10],$=r[14],H=r[3],ie=r[7],Z=r[11],pe=r[15];return s[0]=o*E+a*y+l*D+c*H,s[4]=o*C+a*R+l*F+c*ie,s[8]=o*w+a*N+l*B+c*Z,s[12]=o*M+a*L+l*$+c*pe,s[1]=u*E+d*y+f*D+m*H,s[5]=u*C+d*R+f*F+m*ie,s[9]=u*w+d*N+f*B+m*Z,s[13]=u*M+d*L+f*$+m*pe,s[2]=g*E+_*y+p*D+h*H,s[6]=g*C+_*R+p*F+h*ie,s[10]=g*w+_*N+p*B+h*Z,s[14]=g*M+_*L+p*$+h*pe,s[3]=S*E+v*y+x*D+A*H,s[7]=S*C+v*R+x*F+A*ie,s[11]=S*w+v*N+x*B+A*Z,s[15]=S*M+v*L+x*$+A*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],h=e[15];return g*(+s*l*d-r*c*d-s*a*f+i*c*f+r*a*m-i*l*m)+_*(+t*l*m-t*c*f+s*o*f-r*o*m+r*c*u-s*l*u)+p*(+t*c*d-t*a*m-s*o*d+i*o*m+s*a*u-i*c*u)+h*(-r*a*u-t*l*d+t*a*f+r*o*d-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],h=e[15],S=d*p*c-_*f*c+_*l*m-a*p*m-d*l*h+a*f*h,v=g*f*c-u*p*c-g*l*m+o*p*m+u*l*h-o*f*h,x=u*_*c-g*d*c+g*a*m-o*_*m-u*a*h+o*d*h,A=g*d*l-u*_*l-g*a*f+o*_*f+u*a*p-o*d*p,E=t*S+i*v+r*x+s*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return e[0]=S*C,e[1]=(_*f*s-d*p*s-_*r*m+i*p*m+d*r*h-i*f*h)*C,e[2]=(a*p*s-_*l*s+_*r*c-i*p*c-a*r*h+i*l*h)*C,e[3]=(d*l*s-a*f*s-d*r*c+i*f*c+a*r*m-i*l*m)*C,e[4]=v*C,e[5]=(u*p*s-g*f*s+g*r*m-t*p*m-u*r*h+t*f*h)*C,e[6]=(g*l*s-o*p*s-g*r*c+t*p*c+o*r*h-t*l*h)*C,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*m+t*l*m)*C,e[8]=x*C,e[9]=(g*d*s-u*_*s-g*i*m+t*_*m+u*i*h-t*d*h)*C,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*h+t*a*h)*C,e[11]=(u*a*s-o*d*s-u*i*c+t*d*c+o*i*m-t*a*m)*C,e[12]=A*C,e[13]=(u*_*r-g*d*r+g*i*f-t*_*f-u*i*p+t*d*p)*C,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*p-t*a*p)*C,e[15]=(o*d*r-u*a*r+u*i*l-t*d*l-o*i*f+t*a*f)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,m=s*u,g=s*d,_=o*u,p=o*d,h=a*d,S=l*c,v=l*u,x=l*d,A=i.x,E=i.y,C=i.z;return r[0]=(1-(_+h))*A,r[1]=(m+x)*A,r[2]=(g-v)*A,r[3]=0,r[4]=(m-x)*E,r[5]=(1-(f+h))*E,r[6]=(p+S)*E,r[7]=0,r[8]=(g+v)*C,r[9]=(p-S)*C,r[10]=(1-(f+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ki.set(r[0],r[1],r[2]).length();const o=ki.set(r[4],r[5],r[6]).length(),a=ki.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],an.copy(this);const c=1/s,u=1/o,d=1/a;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=u,an.elements[5]*=u,an.elements[6]*=u,an.elements[8]*=d,an.elements[9]*=d,an.elements[10]*=d,t.setFromRotationMatrix(an),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=En,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),m=(i+r)/(i-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===En)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===_o)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=En,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),m=-(i+r)/(i-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===En)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===_o)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ki=new k,an=new ct,np=new k(0,0,0),ip=new k(1,1,1),Kn=new k,Us=new k,$t=new k,Tl=new ct,Rl=new Ss;class Tn{constructor(e=0,t=0,i=0,r=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Tl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rl.setFromEuler(this),this.setFromQuaternion(Rl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class Wc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rp=0;const Cl=new k,Vi=new Ss,Ln=new ct,Ns=new k,Br=new k,sp=new k,op=new Ss,Pl=new k(1,0,0),Il=new k(0,1,0),Ll=new k(0,0,1),Dl={type:"added"},ap={type:"removed"},Gi={type:"childadded",child:null},$o={type:"childremoved",child:null};class Mt extends Tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=Ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new k,t=new Tn,i=new Ss,r=new k(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ct},normalMatrix:{value:new Xe}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(Pl,e)}rotateY(e){return this.rotateOnAxis(Il,e)}rotateZ(e){return this.rotateOnAxis(Ll,e)}translateOnAxis(e,t){return Cl.copy(e).applyQuaternion(this.quaternion),this.position.add(Cl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pl,e)}translateY(e){return this.translateOnAxis(Il,e)}translateZ(e){return this.translateOnAxis(Ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ns.copy(e):Ns.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Br,Ns,this.up):Ln.lookAt(Ns,Br,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dl),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ap),$o.child=e,this.dispatchEvent($o),$o.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dl),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,e,sp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,op,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Mt.DEFAULT_UP=new k(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new k,Dn=new k,Ko=new k,Un=new k,Wi=new k,Xi=new k,Ul=new k,jo=new k,Jo=new k,Qo=new k,ea=new _t,ta=new _t,na=new _t;class hn{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),cn.subVectors(e,t),r.cross(cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){cn.subVectors(r,t),Dn.subVectors(i,t),Ko.subVectors(e,t);const o=cn.dot(cn),a=cn.dot(Dn),l=cn.dot(Ko),c=Dn.dot(Dn),u=Dn.dot(Ko),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,m=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Un.x),l.addScaledVector(o,Un.y),l.addScaledVector(a,Un.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return ea.setScalar(0),ta.setScalar(0),na.setScalar(0),ea.fromBufferAttribute(e,t),ta.fromBufferAttribute(e,i),na.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ea,s.x),o.addScaledVector(ta,s.y),o.addScaledVector(na,s.z),o}static isFrontFacing(e,t,i,r){return cn.subVectors(i,t),Dn.subVectors(e,t),cn.cross(Dn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),cn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Wi.subVectors(r,i),Xi.subVectors(s,i),jo.subVectors(e,i);const l=Wi.dot(jo),c=Xi.dot(jo);if(l<=0&&c<=0)return t.copy(i);Jo.subVectors(e,r);const u=Wi.dot(Jo),d=Xi.dot(Jo);if(u>=0&&d<=u)return t.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Wi,o);Qo.subVectors(e,s);const m=Wi.dot(Qo),g=Xi.dot(Qo);if(g>=0&&m<=g)return t.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Xi,a);const p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return Ul.subVectors(s,r),a=(d-u)/(d-u+(m-g)),t.copy(r).addScaledVector(Ul,a);const h=1/(p+_+f);return o=_*h,a=f*h,t.copy(i).addScaledVector(Wi,o).addScaledVector(Xi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Fs={h:0,s:0,l:0};function ia(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ge{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=qf(e,1),t=je(t,0,1),i=je(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=ia(o,s,e+1/3),this.g=ia(o,s,e),this.b=ia(o,s,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=jt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const i=kd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return et.workingToColorSpace(Pt.copy(this),e),Math.round(je(Pt.r*255,0,255))*65536+Math.round(je(Pt.g*255,0,255))*256+Math.round(je(Pt.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Pt.copy(this),t);const i=Pt.r,r=Pt.g,s=Pt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=jt){et.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,r=Pt.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(Fs);const i=zo(jn.h,Fs.h,t),r=zo(jn.s,Fs.s,t),s=zo(jn.l,Fs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new Ge;Ge.NAMES=kd;let cp=0;class Cr extends Tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Ms(),this.name="",this.type="Material",this.blending=hr,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=La,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ml,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hr&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ia&&(i.blendSrc=this.blendSrc),this.blendDst!==La&&(i.blendDst=this.blendDst),this.blendEquation!==yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ml&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class An extends Cr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Td,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new k,Os=new $e;let lp=0;class nt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Sl,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Os.fromBufferAttribute(this,t),Os.applyMatrix3(e),this.setXY(t,Os.x,Os.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Nr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array),s=Ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sl&&(e.usage=this.usage),e}}class Vd extends nt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Gd extends nt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ut extends nt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let up=0;const nn=new ct,ra=new Mt,qi=new k,Kt=new ui,zr=new ui,wt=new k;class ht extends Tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zd(e)?Gd:Vd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,i){return nn.makeTranslation(e,t,i),this.applyMatrix4(nn),this}scale(e,t,i){return nn.makeScale(e,t,i),this.applyMatrix4(nn),this}lookAt(e){return ra.lookAt(e),ra.updateMatrix(),this.applyMatrix4(ra.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ut(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Kt.setFromBufferAttribute(s),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];zr.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(Kt.min,zr.min),Kt.expandByPoint(wt),wt.addVectors(Kt.max,zr.max),Kt.expandByPoint(wt)):(Kt.expandByPoint(zr.min),Kt.expandByPoint(zr.max))}Kt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)wt.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(e,c),wt.add(qi)),r=Math.max(r,i.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let w=0;w<i.count;w++)a[w]=new k,l[w]=new k;const c=new k,u=new k,d=new k,f=new $e,m=new $e,g=new $e,_=new k,p=new k;function h(w,M,y){c.fromBufferAttribute(i,w),u.fromBufferAttribute(i,M),d.fromBufferAttribute(i,y),f.fromBufferAttribute(s,w),m.fromBufferAttribute(s,M),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),m.sub(f),g.sub(f);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(R),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(R),a[w].add(_),a[M].add(_),a[y].add(_),l[w].add(p),l[M].add(p),l[y].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let w=0,M=S.length;w<M;++w){const y=S[w],R=y.start,N=y.count;for(let L=R,D=R+N;L<D;L+=3)h(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const v=new k,x=new k,A=new k,E=new k;function C(w){A.fromBufferAttribute(r,w),E.copy(A);const M=a[w];v.copy(M),v.sub(A.multiplyScalar(A.dot(M))).normalize(),x.crossVectors(E,M);const R=x.dot(l[w])<0?-1:1;o.setXYZW(w,v.x,v.y,v.z,R)}for(let w=0,M=S.length;w<M;++w){const y=S[w],R=y.start,N=y.count;for(let L=R,D=R+N;L<D;L+=3)C(e.getX(L+0)),C(e.getX(L+1)),C(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new nt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new k,s=new k,o=new k,a=new k,l=new k,c=new k,u=new k,d=new k;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*u;for(let h=0;h<u;h++)f[g++]=c[m++]}return new nt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ht,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],m=e(f,i);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,m=d.length;f<m;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nl=new ct,mi=new Gc,Bs=new Rr,Fl=new k,zs=new k,Hs=new k,ks=new k,sa=new k,Vs=new k,Ol=new k,Gs=new k;class Ve extends Mt{constructor(e=new ht,t=new An){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Vs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(sa.fromBufferAttribute(d,e),o?Vs.addScaledVector(sa,u):Vs.addScaledVector(sa.sub(t),u))}t.add(Vs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Bs.copy(i.boundingSphere),Bs.applyMatrix4(s),mi.copy(e.ray).recast(e.near),!(Bs.containsPoint(mi.origin)===!1&&(mi.intersectSphere(Bs,Fl)===null||mi.origin.distanceToSquared(Fl)>(e.far-e.near)**2))&&(Nl.copy(s).invert(),mi.copy(e.ray).applyMatrix4(Nl),!(i.boundingBox!==null&&mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,mi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],h=o[p.materialIndex],S=Math.max(p.start,m.start),v=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let x=S,A=v;x<A;x+=3){const E=a.getX(x),C=a.getX(x+1),w=a.getX(x+2);r=Ws(this,h,e,i,c,u,d,E,C,w),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,h=_;p<h;p+=3){const S=a.getX(p),v=a.getX(p+1),x=a.getX(p+2);r=Ws(this,o,e,i,c,u,d,S,v,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],h=o[p.materialIndex],S=Math.max(p.start,m.start),v=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let x=S,A=v;x<A;x+=3){const E=x,C=x+1,w=x+2;r=Ws(this,h,e,i,c,u,d,E,C,w),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,h=_;p<h;p+=3){const S=p,v=p+1,x=p+2;r=Ws(this,o,e,i,c,u,d,S,v,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function dp(n,e,t,i,r,s,o,a){let l;if(e.side===qt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===li,a),l===null)return null;Gs.copy(a),Gs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Gs);return c<t.near||c>t.far?null:{distance:c,point:Gs.clone(),object:n}}function Ws(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,zs),n.getVertexPosition(l,Hs),n.getVertexPosition(c,ks);const u=dp(n,e,t,i,zs,Hs,ks,Ol);if(u){const d=new k;hn.getBarycoord(Ol,zs,Hs,ks,d),r&&(u.uv=hn.getInterpolatedAttribute(r,a,l,c,d,new $e)),s&&(u.uv1=hn.getInterpolatedAttribute(s,a,l,c,d,new $e)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,l,c,d,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new k,materialIndex:0};hn.getNormal(zs,Hs,ks,f.normal),u.face=f,u.barycoord=d}return u}class Di extends ht{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(u,3)),this.setAttribute("uv",new ut(d,2));function g(_,p,h,S,v,x,A,E,C,w,M){const y=x/C,R=A/w,N=x/2,L=A/2,D=E/2,F=C+1,B=w+1;let $=0,H=0;const ie=new k;for(let Z=0;Z<B;Z++){const pe=Z*R-L;for(let Ee=0;Ee<F;Ee++){const De=Ee*y-N;ie[_]=De*S,ie[p]=pe*v,ie[h]=D,c.push(ie.x,ie.y,ie.z),ie[_]=0,ie[p]=0,ie[h]=E>0?1:-1,u.push(ie.x,ie.y,ie.z),d.push(Ee/C),d.push(1-Z/w),$+=1}}for(let Z=0;Z<w;Z++)for(let pe=0;pe<C;pe++){const Ee=f+pe+F*Z,De=f+pe+F*(Z+1),Ue=f+(pe+1)+F*(Z+1),W=f+(pe+1)+F*Z;l.push(Ee,De,W),l.push(De,Ue,W),H+=6}a.addGroup(m,H,M),m+=H,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Di(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function br(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Ut(n){const e={};for(let t=0;t<n.length;t++){const i=br(n[t]);for(const r in i)e[r]=i[r]}return e}function hp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Wd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const fp={clone:br,merge:Ut};var pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends Cr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pp,this.fragmentShader=mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=br(e.uniforms),this.uniformsGroups=hp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Xd extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new k,Bl=new $e,zl=new $e;class un extends Xd{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=gc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gc*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z)}getViewSize(e,t){return this.getViewBounds(e,Bl,zl),t.subVectors(zl,Bl)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Yi=-90,Zi=1;class gp extends Mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new un(Yi,Zi,e,t);r.layers=this.layers,this.add(r);const s=new un(Yi,Zi,e,t);s.layers=this.layers,this.add(s);const o=new un(Yi,Zi,e,t);o.layers=this.layers,this.add(o);const a=new un(Yi,Zi,e,t);a.layers=this.layers,this.add(a);const l=new un(Yi,Zi,e,t);l.layers=this.layers,this.add(l);const c=new un(Yi,Zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===En)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_o)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class qd extends Bt{constructor(e=[],t=Mr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _p extends Li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new qd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Di(5,5,5),s=new Rn({name:"CubemapFromEquirect",uniforms:br(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qt,blending:ai});s.uniforms.tEquirect.value=t;const o=new Ve(r,s),a=t.minFilter;return t.minFilter===wi&&(t.minFilter=yn),new gp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class Vn extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xp={type:"move"};class oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),h=this._getHandJoint(c,_);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xp)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Vn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Xc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ge(e),this.near=t,this.far=i}clone(){return new Xc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vp extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Mp extends Bt{constructor(e=null,t=1,i=1,r,s,o,a,l,c=Qt,u=Qt,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _c extends nt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $i=new ct,Hl=new ct,Xs=[],kl=new ui,Sp=new ct,Hr=new Ve,kr=new Rr;class Yd extends Ve{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _c(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Sp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,$i),kl.copy(e.boundingBox).applyMatrix4($i),this.boundingBox.union(kl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,$i),kr.copy(e.boundingSphere).applyMatrix4($i),this.boundingSphere.union(kr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Hr.geometry=this.geometry,Hr.material=this.material,Hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kr.copy(this.boundingSphere),kr.applyMatrix4(i),e.ray.intersectsSphere(kr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,$i),Hl.multiplyMatrices(i,$i),Hr.matrixWorld=Hl,Hr.raycast(e,Xs);for(let o=0,a=Xs.length;o<a;o++){const l=Xs[o];l.instanceId=s,l.object=this,t.push(l)}Xs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _c(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Mp(new Float32Array(r*this.count),r,this.count,Bc,bn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const aa=new k,yp=new k,bp=new Xe;class Mi{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=aa.subVectors(i,t).cross(yp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(aa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||bp.getNormalMatrix(e),r=this.coplanarPoint(aa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new Rr,Ep=new $e(.5,.5),qs=new k;class qc{constructor(e=new Mi,t=new Mi,i=new Mi,r=new Mi,s=new Mi,o=new Mi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=En,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],m=s[7],g=s[8],_=s[9],p=s[10],h=s[11],S=s[12],v=s[13],x=s[14],A=s[15];if(r[0].setComponents(c-o,m-u,h-g,A-S).normalize(),r[1].setComponents(c+o,m+u,h+g,A+S).normalize(),r[2].setComponents(c+a,m+d,h+_,A+v).normalize(),r[3].setComponents(c-a,m-d,h-_,A-v).normalize(),i)r[4].setComponents(l,f,p,x).normalize(),r[5].setComponents(c-l,m-f,h-p,A-x).normalize();else if(r[4].setComponents(c-l,m-f,h-p,A-x).normalize(),t===En)r[5].setComponents(c+l,m+f,h+p,A+x).normalize();else if(t===_o)r[5].setComponents(l,f,p,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(e){gi.center.set(0,0,0);const t=Ep.distanceTo(e.center);return gi.radius=.7071067811865476+t,gi.applyMatrix4(e.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(qs.x=r.normal.x>0?e.max.x:e.min.x,qs.y=r.normal.y>0?e.max.y:e.min.y,qs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(qs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yc extends Cr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vo=new k,Mo=new k,Vl=new ct,Vr=new Gc,Ys=new Rr,ca=new k,Gl=new k;class Zd extends Mt{constructor(e=new ht,t=new Yc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)vo.fromBufferAttribute(t,r-1),Mo.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=vo.distanceTo(Mo);e.setAttribute("lineDistance",new ut(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ys.copy(i.boundingSphere),Ys.applyMatrix4(r),Ys.radius+=s,e.ray.intersectsSphere(Ys)===!1)return;Vl.copy(r).invert(),Vr.copy(e.ray).applyMatrix4(Vl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const m=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const h=u.getX(_),S=u.getX(_+1),v=Zs(this,e,Vr,l,h,S,_);v&&t.push(v)}if(this.isLineLoop){const _=u.getX(g-1),p=u.getX(m),h=Zs(this,e,Vr,l,_,p,g-1);h&&t.push(h)}}else{const m=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const h=Zs(this,e,Vr,l,_,_+1,_);h&&t.push(h)}if(this.isLineLoop){const _=Zs(this,e,Vr,l,g-1,m,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Zs(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(vo.fromBufferAttribute(a,r),Mo.fromBufferAttribute(a,s),t.distanceSqToSegment(vo,Mo,ca,Gl)>i)return;ca.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ca);if(!(c<e.near||c>e.far))return{distance:c,point:Gl.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Wl=new k,Xl=new k;class Ap extends Zd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Wl.fromBufferAttribute(t,r),Xl.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Wl.distanceTo(Xl);e.setAttribute("lineDistance",new ut(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $d extends Bt{constructor(e,t,i=Ii,r,s,o,a=Qt,l=Qt,c,u=ms,d=1){if(u!==ms&&u!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Zc extends ht{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new k,u=new $e;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const m=i+d/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(a,3)),this.setAttribute("uv",new ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Jt extends ht{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],m=[];let g=0;const _=[],p=i/2;let h=0;S(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new ut(d,3)),this.setAttribute("normal",new ut(f,3)),this.setAttribute("uv",new ut(m,2));function S(){const x=new k,A=new k;let E=0;const C=(t-e)/i;for(let w=0;w<=s;w++){const M=[],y=w/s,R=y*(t-e)+e;for(let N=0;N<=r;N++){const L=N/r,D=L*l+a,F=Math.sin(D),B=Math.cos(D);A.x=R*F,A.y=-y*i+p,A.z=R*B,d.push(A.x,A.y,A.z),x.set(F,C,B).normalize(),f.push(x.x,x.y,x.z),m.push(L,1-y),M.push(g++)}_.push(M)}for(let w=0;w<r;w++)for(let M=0;M<s;M++){const y=_[M][w],R=_[M+1][w],N=_[M+1][w+1],L=_[M][w+1];(e>0||M!==0)&&(u.push(y,R,L),E+=3),(t>0||M!==s-1)&&(u.push(R,N,L),E+=3)}c.addGroup(h,E,0),h+=E}function v(x){const A=g,E=new $e,C=new k;let w=0;const M=x===!0?e:t,y=x===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,p*y,0),f.push(0,y,0),m.push(.5,.5),g++;const R=g;for(let N=0;N<=r;N++){const D=N/r*l+a,F=Math.cos(D),B=Math.sin(D);C.x=M*B,C.y=p*y,C.z=M*F,d.push(C.x,C.y,C.z),f.push(0,y,0),E.x=F*.5+.5,E.y=B*.5*y+.5,m.push(E.x,E.y),g++}for(let N=0;N<r;N++){const L=A+N,D=R+N;x===!0?u.push(D,D+1,L):u.push(D+1,D,L),w+=3}c.addGroup(h,w,x===!0?1:2),h+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pi extends Jt{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Pi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Eo extends ht{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new ut(s,3)),this.setAttribute("normal",new ut(s.slice(),3)),this.setAttribute("uv",new ut(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const v=new k,x=new k,A=new k;for(let E=0;E<t.length;E+=3)m(t[E+0],v),m(t[E+1],x),m(t[E+2],A),l(v,x,A,S)}function l(S,v,x,A){const E=A+1,C=[];for(let w=0;w<=E;w++){C[w]=[];const M=S.clone().lerp(x,w/E),y=v.clone().lerp(x,w/E),R=E-w;for(let N=0;N<=R;N++)N===0&&w===E?C[w][N]=M:C[w][N]=M.clone().lerp(y,N/R)}for(let w=0;w<E;w++)for(let M=0;M<2*(E-w)-1;M++){const y=Math.floor(M/2);M%2===0?(f(C[w][y+1]),f(C[w+1][y]),f(C[w][y])):(f(C[w][y+1]),f(C[w+1][y+1]),f(C[w+1][y]))}}function c(S){const v=new k;for(let x=0;x<s.length;x+=3)v.x=s[x+0],v.y=s[x+1],v.z=s[x+2],v.normalize().multiplyScalar(S),s[x+0]=v.x,s[x+1]=v.y,s[x+2]=v.z}function u(){const S=new k;for(let v=0;v<s.length;v+=3){S.x=s[v+0],S.y=s[v+1],S.z=s[v+2];const x=p(S)/2/Math.PI+.5,A=h(S)/Math.PI+.5;o.push(x,1-A)}g(),d()}function d(){for(let S=0;S<o.length;S+=6){const v=o[S+0],x=o[S+2],A=o[S+4],E=Math.max(v,x,A),C=Math.min(v,x,A);E>.9&&C<.1&&(v<.2&&(o[S+0]+=1),x<.2&&(o[S+2]+=1),A<.2&&(o[S+4]+=1))}}function f(S){s.push(S.x,S.y,S.z)}function m(S,v){const x=S*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function g(){const S=new k,v=new k,x=new k,A=new k,E=new $e,C=new $e,w=new $e;for(let M=0,y=0;M<s.length;M+=9,y+=6){S.set(s[M+0],s[M+1],s[M+2]),v.set(s[M+3],s[M+4],s[M+5]),x.set(s[M+6],s[M+7],s[M+8]),E.set(o[y+0],o[y+1]),C.set(o[y+2],o[y+3]),w.set(o[y+4],o[y+5]),A.copy(S).add(v).add(x).divideScalar(3);const R=p(A);_(E,y+0,S,R),_(C,y+2,v,R),_(w,y+4,x,R)}}function _(S,v,x,A){A<0&&S.x===1&&(o[v]=S.x-1),x.x===0&&x.z===0&&(o[v]=A/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function h(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.vertices,e.indices,e.radius,e.details)}}class $c extends Eo{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $c(e.radius,e.detail)}}class Ao extends Eo{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ao(e.radius,e.detail)}}class wo extends ht{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=t/l,m=[],g=[],_=[],p=[];for(let h=0;h<u;h++){const S=h*f-o;for(let v=0;v<c;v++){const x=v*d-s;g.push(x,-S,0),_.push(0,0,1),p.push(v/a),p.push(1-h/l)}}for(let h=0;h<l;h++)for(let S=0;S<a;S++){const v=S+c*h,x=S+c*(h+1),A=S+1+c*(h+1),E=S+1+c*h;m.push(v,x,E),m.push(x,A,E)}this.setIndex(m),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wo(e.width,e.height,e.widthSegments,e.heightSegments)}}class Kc extends ht{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new k,f=new k,m=[],g=[],_=[],p=[];for(let h=0;h<=i;h++){const S=[],v=h/i;let x=0;h===0&&o===0?x=.5/t:h===i&&l===Math.PI&&(x=-.5/t);for(let A=0;A<=t;A++){const E=A/t;d.x=-e*Math.cos(r+E*s)*Math.sin(o+v*a),d.y=e*Math.cos(o+v*a),d.z=e*Math.sin(r+E*s)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),p.push(E+x,1-v),S.push(c++)}u.push(S)}for(let h=0;h<i;h++)for(let S=0;S<t;S++){const v=u[h][S+1],x=u[h][S],A=u[h+1][S],E=u[h+1][S+1];(h!==0||o>0)&&m.push(v,x,E),(h!==i-1||l<Math.PI)&&m.push(x,A,E)}this.setIndex(m),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class rn extends Cr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Od,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wp extends Cr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tp extends Cr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Rp extends Yc{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Kd extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Cp extends Kd{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const la=new ct,ql=new k,Yl=new k;class Pp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qc,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ql.setFromMatrixPosition(e.matrixWorld),t.position.copy(ql),Yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yl),t.updateMatrixWorld(),la.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(la,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(la)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class jc extends Xd{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ip extends Pp{constructor(){super(new jc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zl extends Kd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Ip}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Lp extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const $l=new ct;class Dp{constructor(e,t,i=0,r=1/0){this.ray=new Gc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Wc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return $l.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4($l),this}intersectObject(e,t=!0,i=[]){return xc(e,this,i,t),i.sort(Kl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)xc(e[r],this,i,t);return i.sort(Kl),i}}function Kl(n,e){return n.distance-e.distance}function xc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)xc(s[o],e,t,!0)}}function jl(n,e,t,i){const r=Up(i);switch(t){case Dd:return n*e;case Bc:return n*e/r.components*r.byteLength;case zc:return n*e/r.components*r.byteLength;case Nd:return n*e*2/r.components*r.byteLength;case Hc:return n*e*2/r.components*r.byteLength;case Ud:return n*e*3/r.components*r.byteLength;case fn:return n*e*4/r.components*r.byteLength;case kc:return n*e*4/r.components*r.byteLength;case ao:case co:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case lo:case uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xa:case Ya:return Math.max(n,16)*Math.max(e,8)/4;case Wa:case qa:return Math.max(n,8)*Math.max(e,8)/2;case Za:case $a:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ec:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case tc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case nc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ic:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case rc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case sc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case oc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ac:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case cc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case lc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case uc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ho:case dc:case hc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Fd:case fc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case pc:case mc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Up(n){switch(n){case wn:case Pd:return{byteLength:1,components:1};case fs:case Id:case vs:return{byteLength:2,components:1};case Fc:case Oc:return{byteLength:2,components:4};case Ii:case Nc:case bn:return{byteLength:4,components:1};case Ld:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uc);function jd(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Np(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<d.length;m++){const g=d[f],_=d[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let m=0,g=d.length;m<g;m++){const _=d[m];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Fp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Op=`#ifdef USE_ALPHAHASH
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
#endif`,Bp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vp=`#ifdef USE_AOMAP
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
#endif`,Gp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wp=`#ifdef USE_BATCHING
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
#endif`,Xp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$p=`#ifdef USE_IRIDESCENCE
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
#endif`,Kp=`#ifdef USE_BUMPMAP
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
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,sm=`#define PI 3.141592653589793
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
} // validated`,om=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,am=`vec3 transformedNormal = objectNormal;
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
#endif`,cm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,um=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hm="gl_FragColor = linearToOutputTexel( gl_FragColor );",fm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pm=`#ifdef USE_ENVMAP
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
#endif`,mm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gm=`#ifdef USE_ENVMAP
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
#endif`,_m=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xm=`#ifdef USE_ENVMAP
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
#endif`,vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ym=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bm=`#ifdef USE_GRADIENTMAP
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
}`,Em=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Am=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tm=`uniform bool receiveShadow;
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
#endif`,Rm=`#ifdef USE_ENVMAP
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
#endif`,Cm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dm=`PhysicalMaterial material;
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
#endif`,Um=`struct PhysicalMaterial {
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
}`,Nm=`
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
#endif`,Fm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Om=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,km=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xm=`#if defined( USE_POINTS_UV )
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
#endif`,qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ym=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$m=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jm=`#ifdef USE_MORPHTARGETS
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
#endif`,Jm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rg=`#ifdef USE_NORMALMAP
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
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ag=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ug=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mg=`float getShadowMask() {
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
}`,Sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yg=`#ifdef USE_SKINNING
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
#endif`,bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Eg=`#ifdef USE_SKINNING
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
#endif`,Ag=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cg=`#ifdef USE_TRANSMISSION
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
#endif`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ug=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fg=`uniform sampler2D t2D;
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
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`#include <common>
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
}`,Vg=`#if DEPTH_PACKING == 3200
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
}`,Gg=`#define DISTANCE
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
}`,Wg=`#define DISTANCE
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
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yg=`uniform float scale;
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
}`,Zg=`uniform vec3 diffuse;
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
}`,$g=`#include <common>
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
}`,Kg=`uniform vec3 diffuse;
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
}`,jg=`#define LAMBERT
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
}`,Jg=`#define LAMBERT
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
}`,Qg=`#define MATCAP
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
}`,e0=`#define MATCAP
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
}`,t0=`#define NORMAL
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
}`,n0=`#define NORMAL
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
}`,i0=`#define PHONG
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
}`,r0=`#define PHONG
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
}`,s0=`#define STANDARD
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
}`,o0=`#define STANDARD
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
}`,a0=`#define TOON
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
}`,c0=`#define TOON
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
}`,l0=`uniform float size;
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
}`,u0=`uniform vec3 diffuse;
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
}`,d0=`#include <common>
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
}`,h0=`uniform vec3 color;
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
}`,f0=`uniform float rotation;
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
}`,p0=`uniform vec3 diffuse;
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
}`,Ye={alphahash_fragment:Fp,alphahash_pars_fragment:Op,alphamap_fragment:Bp,alphamap_pars_fragment:zp,alphatest_fragment:Hp,alphatest_pars_fragment:kp,aomap_fragment:Vp,aomap_pars_fragment:Gp,batching_pars_vertex:Wp,batching_vertex:Xp,begin_vertex:qp,beginnormal_vertex:Yp,bsdfs:Zp,iridescence_fragment:$p,bumpmap_pars_fragment:Kp,clipping_planes_fragment:jp,clipping_planes_pars_fragment:Jp,clipping_planes_pars_vertex:Qp,clipping_planes_vertex:em,color_fragment:tm,color_pars_fragment:nm,color_pars_vertex:im,color_vertex:rm,common:sm,cube_uv_reflection_fragment:om,defaultnormal_vertex:am,displacementmap_pars_vertex:cm,displacementmap_vertex:lm,emissivemap_fragment:um,emissivemap_pars_fragment:dm,colorspace_fragment:hm,colorspace_pars_fragment:fm,envmap_fragment:pm,envmap_common_pars_fragment:mm,envmap_pars_fragment:gm,envmap_pars_vertex:_m,envmap_physical_pars_fragment:Rm,envmap_vertex:xm,fog_vertex:vm,fog_pars_vertex:Mm,fog_fragment:Sm,fog_pars_fragment:ym,gradientmap_pars_fragment:bm,lightmap_pars_fragment:Em,lights_lambert_fragment:Am,lights_lambert_pars_fragment:wm,lights_pars_begin:Tm,lights_toon_fragment:Cm,lights_toon_pars_fragment:Pm,lights_phong_fragment:Im,lights_phong_pars_fragment:Lm,lights_physical_fragment:Dm,lights_physical_pars_fragment:Um,lights_fragment_begin:Nm,lights_fragment_maps:Fm,lights_fragment_end:Om,logdepthbuf_fragment:Bm,logdepthbuf_pars_fragment:zm,logdepthbuf_pars_vertex:Hm,logdepthbuf_vertex:km,map_fragment:Vm,map_pars_fragment:Gm,map_particle_fragment:Wm,map_particle_pars_fragment:Xm,metalnessmap_fragment:qm,metalnessmap_pars_fragment:Ym,morphinstance_vertex:Zm,morphcolor_vertex:$m,morphnormal_vertex:Km,morphtarget_pars_vertex:jm,morphtarget_vertex:Jm,normal_fragment_begin:Qm,normal_fragment_maps:eg,normal_pars_fragment:tg,normal_pars_vertex:ng,normal_vertex:ig,normalmap_pars_fragment:rg,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:og,clearcoat_pars_fragment:ag,iridescence_pars_fragment:cg,opaque_fragment:lg,packing:ug,premultiplied_alpha_fragment:dg,project_vertex:hg,dithering_fragment:fg,dithering_pars_fragment:pg,roughnessmap_fragment:mg,roughnessmap_pars_fragment:gg,shadowmap_pars_fragment:_g,shadowmap_pars_vertex:xg,shadowmap_vertex:vg,shadowmask_pars_fragment:Mg,skinbase_vertex:Sg,skinning_pars_vertex:yg,skinning_vertex:bg,skinnormal_vertex:Eg,specularmap_fragment:Ag,specularmap_pars_fragment:wg,tonemapping_fragment:Tg,tonemapping_pars_fragment:Rg,transmission_fragment:Cg,transmission_pars_fragment:Pg,uv_pars_fragment:Ig,uv_pars_vertex:Lg,uv_vertex:Dg,worldpos_vertex:Ug,background_vert:Ng,background_frag:Fg,backgroundCube_vert:Og,backgroundCube_frag:Bg,cube_vert:zg,cube_frag:Hg,depth_vert:kg,depth_frag:Vg,distanceRGBA_vert:Gg,distanceRGBA_frag:Wg,equirect_vert:Xg,equirect_frag:qg,linedashed_vert:Yg,linedashed_frag:Zg,meshbasic_vert:$g,meshbasic_frag:Kg,meshlambert_vert:jg,meshlambert_frag:Jg,meshmatcap_vert:Qg,meshmatcap_frag:e0,meshnormal_vert:t0,meshnormal_frag:n0,meshphong_vert:i0,meshphong_frag:r0,meshphysical_vert:s0,meshphysical_frag:o0,meshtoon_vert:a0,meshtoon_frag:c0,points_vert:l0,points_frag:u0,shadow_vert:d0,shadow_frag:h0,sprite_vert:f0,sprite_frag:p0},ye={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Mn={basic:{uniforms:Ut([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Ut([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Ut([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Ut([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Ut([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Ut([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Ut([ye.points,ye.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Ut([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Ut([ye.common,ye.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Ut([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Ut([ye.sprite,ye.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:Ut([ye.common,ye.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:Ut([ye.lights,ye.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Mn.physical={uniforms:Ut([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const $s={r:0,b:0,g:0},_i=new Tn,m0=new ct;function g0(n,e,t,i,r,s,o){const a=new Ge(0);let l=s===!0?0:1,c,u,d=null,f=0,m=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const A=g(v);A===null?h(a,l):A&&A.isColor&&(h(A,1),x=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(v,x){const A=g(x);A&&(A.isCubeTexture||A.mapping===bo)?(u===void 0&&(u=new Ve(new Di(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:br(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),_i.copy(x.backgroundRotation),_i.x*=-1,_i.y*=-1,_i.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(m0.makeRotationFromEuler(_i)),u.material.toneMapped=et.getTransfer(A.colorSpace)!==rt,(d!==A||f!==A.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,d=A,f=A.version,m=n.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Ve(new wo(2,2),new Rn({name:"BackgroundMaterial",uniforms:br(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=et.getTransfer(A.colorSpace)!==rt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||f!==A.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=A,f=A.version,m=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function h(v,x){v.getRGB($s,Wd(n)),i.buffers.color.setClear($s.r,$s.g,$s.b,x,o)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,h(a,l)},render:_,addToRenderList:p,dispose:S}}function _0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(y,R,N,L,D){let F=!1;const B=d(L,N,R);s!==B&&(s=B,c(s.object)),F=m(y,L,N,D),F&&g(y,L,N,D),D!==null&&e.update(D,n.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,x(y,R,N,L),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function d(y,R,N){const L=N.wireframe===!0;let D=i[y.id];D===void 0&&(D={},i[y.id]=D);let F=D[R.id];F===void 0&&(F={},D[R.id]=F);let B=F[L];return B===void 0&&(B=f(l()),F[L]=B),B}function f(y){const R=[],N=[],L=[];for(let D=0;D<t;D++)R[D]=0,N[D]=0,L[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:N,attributeDivisors:L,object:y,attributes:{},index:null}}function m(y,R,N,L){const D=s.attributes,F=R.attributes;let B=0;const $=N.getAttributes();for(const H in $)if($[H].location>=0){const Z=D[H];let pe=F[H];if(pe===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),Z===void 0||Z.attribute!==pe||pe&&Z.data!==pe.data)return!0;B++}return s.attributesNum!==B||s.index!==L}function g(y,R,N,L){const D={},F=R.attributes;let B=0;const $=N.getAttributes();for(const H in $)if($[H].location>=0){let Z=F[H];Z===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor));const pe={};pe.attribute=Z,Z&&Z.data&&(pe.data=Z.data),D[H]=pe,B++}s.attributes=D,s.attributesNum=B,s.index=L}function _(){const y=s.newAttributes;for(let R=0,N=y.length;R<N;R++)y[R]=0}function p(y){h(y,0)}function h(y,R){const N=s.newAttributes,L=s.enabledAttributes,D=s.attributeDivisors;N[y]=1,L[y]===0&&(n.enableVertexAttribArray(y),L[y]=1),D[y]!==R&&(n.vertexAttribDivisor(y,R),D[y]=R)}function S(){const y=s.newAttributes,R=s.enabledAttributes;for(let N=0,L=R.length;N<L;N++)R[N]!==y[N]&&(n.disableVertexAttribArray(N),R[N]=0)}function v(y,R,N,L,D,F,B){B===!0?n.vertexAttribIPointer(y,R,N,D,F):n.vertexAttribPointer(y,R,N,L,D,F)}function x(y,R,N,L){_();const D=L.attributes,F=N.getAttributes(),B=R.defaultAttributeValues;for(const $ in F){const H=F[$];if(H.location>=0){let ie=D[$];if(ie===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(ie=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(ie=y.instanceColor)),ie!==void 0){const Z=ie.normalized,pe=ie.itemSize,Ee=e.get(ie);if(Ee===void 0)continue;const De=Ee.buffer,Ue=Ee.type,W=Ee.bytesPerElement,ce=Ue===n.INT||Ue===n.UNSIGNED_INT||ie.gpuType===Nc;if(ie.isInterleavedBufferAttribute){const le=ie.data,xe=le.stride,Ae=ie.offset;if(le.isInstancedInterleavedBuffer){for(let q=0;q<H.locationSize;q++)h(H.location+q,le.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let q=0;q<H.locationSize;q++)p(H.location+q);n.bindBuffer(n.ARRAY_BUFFER,De);for(let q=0;q<H.locationSize;q++)v(H.location+q,pe/H.locationSize,Ue,Z,xe*W,(Ae+pe/H.locationSize*q)*W,ce)}else{if(ie.isInstancedBufferAttribute){for(let le=0;le<H.locationSize;le++)h(H.location+le,ie.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let le=0;le<H.locationSize;le++)p(H.location+le);n.bindBuffer(n.ARRAY_BUFFER,De);for(let le=0;le<H.locationSize;le++)v(H.location+le,pe/H.locationSize,Ue,Z,pe*W,pe/H.locationSize*le*W,ce)}}else if(B!==void 0){const Z=B[$];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(H.location,Z);break;case 3:n.vertexAttrib3fv(H.location,Z);break;case 4:n.vertexAttrib4fv(H.location,Z);break;default:n.vertexAttrib1fv(H.location,Z)}}}}S()}function A(){w();for(const y in i){const R=i[y];for(const N in R){const L=R[N];for(const D in L)u(L[D].object),delete L[D];delete R[N]}delete i[y]}}function E(y){if(i[y.id]===void 0)return;const R=i[y.id];for(const N in R){const L=R[N];for(const D in L)u(L[D].object),delete L[D];delete R[N]}delete i[y.id]}function C(y){for(const R in i){const N=i[R];if(N[y.id]===void 0)continue;const L=N[y.id];for(const D in L)u(L[D].object),delete L[D];delete N[y.id]}}function w(){M(),o=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:w,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:p,disableUnusedAttributes:S}}function x0(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];t.update(m,i,1)}function l(c,u,d,f){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function v0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==fn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const w=C===vs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==wn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==bn&&!w)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:S,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:A,maxSamples:E}}function M0(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Mi,a=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||i!==0||r;return r=f,i=d.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,h=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{const S=s?0:i,v=S*4;let x=h.clippingState||null;l.value=x,x=u(g,f,v,m);for(let A=0;A!==v;++A)x[A]=t[A];h.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const h=m+_*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(p===null||p.length<h)&&(p=new Float32Array(h));for(let v=0,x=m;v!==_;++v,x+=4)o.copy(d[v]).applyMatrix4(S,a),o.normal.toArray(p,x),p[x+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function S0(n){let e=new WeakMap;function t(o,a){return a===Ha?o.mapping=Mr:a===ka&&(o.mapping=Sr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ha||a===ka)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new _p(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ar=4,Jl=[.125,.215,.35,.446,.526,.582],bi=20,ua=new jc,Ql=new Ge;let da=null,ha=0,fa=0,pa=!1;const Si=(1+Math.sqrt(5))/2,Ki=1/Si,eu=[new k(-Si,Ki,0),new k(Si,Ki,0),new k(-Ki,0,Si),new k(Ki,0,Si),new k(0,Si,-Ki),new k(0,Si,Ki),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],y0=new k;class tu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=y0}=s;da=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=iu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(da,ha,fa),this._renderer.xr.enabled=pa,e.scissorTest=!1,Ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Mr||e.mapping===Sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),da=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:vs,format:fn,colorSpace:yr,depthBuffer:!1},r=nu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nu(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=b0(s)),this._blurMaterial=E0(s,e,t)}return r}_compileMaterial(e){const t=new Ve(this._lodPlanes[0],e);this._renderer.compile(t,ua)}_sceneToCubeUV(e,t,i,r,s){const l=new un(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,m=d.toneMapping;d.getClearColor(Ql),d.toneMapping=ci,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null));const _=new An({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),p=new Ve(new Di,_);let h=!1;const S=e.background;S?S.isColor&&(_.color.copy(S),e.background=null,h=!0):(_.color.copy(Ql),h=!0);for(let v=0;v<6;v++){const x=v%3;x===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[v],s.y,s.z)):x===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[v]));const A=this._cubeSize;Ks(r,x*A,v>2?A:0,A,A),d.setRenderTarget(r),h&&d.render(p,l),d.render(e,l)}p.geometry.dispose(),p.material.dispose(),d.toneMapping=m,d.autoClear=f,e.background=S}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Mr||e.mapping===Sr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ru()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=iu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ve(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ks(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,ua)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=eu[(r-s-1)%eu.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ve(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*bi-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):bi;p>bi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${bi}`);const h=[];let S=0;for(let C=0;C<bi;++C){const w=C/_,M=Math.exp(-w*w/2);h.push(M),C===0?S+=M:C<p&&(S+=2*M)}for(let C=0;C<h.length;C++)h[C]=h[C]/S;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const x=this._sizeLods[r],A=3*x*(r>v-ar?r-v+ar:0),E=4*(this._cubeSize-x);Ks(t,A,E,3*x,2*x),l.setRenderTarget(t),l.render(d,ua)}}function b0(n){const e=[],t=[],i=[];let r=n;const s=n-ar+1+Jl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ar?l=Jl[o-n+ar-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,_=3,p=2,h=1,S=new Float32Array(_*g*m),v=new Float32Array(p*g*m),x=new Float32Array(h*g*m);for(let E=0;E<m;E++){const C=E%3*2/3-1,w=E>2?0:-1,M=[C,w,0,C+2/3,w,0,C+2/3,w+1,0,C,w,0,C+2/3,w+1,0,C,w+1,0];S.set(M,_*g*E),v.set(f,p*g*E);const y=[E,E,E,E,E,E];x.set(y,h*g*E)}const A=new ht;A.setAttribute("position",new nt(S,_)),A.setAttribute("uv",new nt(v,p)),A.setAttribute("faceIndex",new nt(x,h)),e.push(A),r>ar&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function nu(n,e,t){const i=new Li(n,e,t);return i.texture.mapping=bo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ks(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function E0(n,e,t){const i=new Float32Array(bi),r=new k(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Jc(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function iu(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jc(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function ru(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Jc(){return`

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
	`}function A0(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ha||l===ka,u=l===Mr||l===Sr;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new tu(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return c&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new tu(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function w0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&fr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function T0(n,e,t,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const m in f)e.update(f[m],n.ARRAY_BUFFER)}function c(d){const f=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const S=m.array;_=m.version;for(let v=0,x=S.length;v<x;v+=3){const A=S[v+0],E=S[v+1],C=S[v+2];f.push(A,E,E,C,C,A)}}else if(g!==void 0){const S=g.array;_=g.version;for(let v=0,x=S.length/3-1;v<x;v+=3){const A=v+0,E=v+1,C=v+2;f.push(A,E,E,C,C,A)}}else return;const p=new(zd(f)?Gd:Vd)(f,1);p.version=_;const h=s.get(d);h&&e.remove(h),s.set(d,p)}function u(d){const f=s.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function R0(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,m){n.drawElements(i,m,s,f*o),t.update(m,i,1)}function c(f,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,f*o,g),t.update(m,i,g))}function u(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,f,0,g);let p=0;for(let h=0;h<g;h++)p+=m[h];t.update(p,i,1)}function d(f,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<f.length;h++)c(f[h]/o,m[h],_[h]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,f,0,_,0,g);let h=0;for(let S=0;S<g;S++)h+=m[S]*_[S];t.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function C0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function P0(n,e,t){const i=new WeakMap,r=new _t;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let y=function(){w.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var m=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),p===!0&&(x=3);let A=a.attributes.position.count*x,E=1;A>e.maxTextureSize&&(E=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const C=new Float32Array(A*E*4*d),w=new Hd(C,A,E,d);w.type=bn,w.needsUpdate=!0;const M=x*4;for(let R=0;R<d;R++){const N=h[R],L=S[R],D=v[R],F=A*E*4*R;for(let B=0;B<N.count;B++){const $=B*M;g===!0&&(r.fromBufferAttribute(N,B),C[F+$+0]=r.x,C[F+$+1]=r.y,C[F+$+2]=r.z,C[F+$+3]=0),_===!0&&(r.fromBufferAttribute(L,B),C[F+$+4]=r.x,C[F+$+5]=r.y,C[F+$+6]=r.z,C[F+$+7]=0),p===!0&&(r.fromBufferAttribute(D,B),C[F+$+8]=r.x,C[F+$+9]=r.y,C[F+$+10]=r.z,C[F+$+11]=D.itemSize===4?r.w:1)}}f={count:d,texture:w,size:new $e(A,E)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function I0(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Jd=new Bt,su=new $d(1,1),Qd=new Hd,eh=new ep,th=new qd,ou=[],au=[],cu=new Float32Array(16),lu=new Float32Array(9),uu=new Float32Array(4);function Pr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ou[r];if(s===void 0&&(s=new Float32Array(r),ou[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function At(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function To(n,e){let t=au[e];t===void 0&&(t=new Int32Array(e),au[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function L0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function D0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),At(t,e)}}function U0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),At(t,e)}}function N0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),At(t,e)}}function F0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Et(t,i))return;uu.set(i),n.uniformMatrix2fv(this.addr,!1,uu),At(t,i)}}function O0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Et(t,i))return;lu.set(i),n.uniformMatrix3fv(this.addr,!1,lu),At(t,i)}}function B0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Et(t,i))return;cu.set(i),n.uniformMatrix4fv(this.addr,!1,cu),At(t,i)}}function z0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function H0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),At(t,e)}}function k0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),At(t,e)}}function V0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),At(t,e)}}function G0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function W0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),At(t,e)}}function X0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),At(t,e)}}function q0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),At(t,e)}}function Y0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(su.compareFunction=Bd,s=su):s=Jd,t.setTexture2D(e||s,r)}function Z0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||eh,r)}function $0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||th,r)}function K0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Qd,r)}function j0(n){switch(n){case 5126:return L0;case 35664:return D0;case 35665:return U0;case 35666:return N0;case 35674:return F0;case 35675:return O0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return H0;case 35668:case 35672:return k0;case 35669:case 35673:return V0;case 5125:return G0;case 36294:return W0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return Z0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return K0}}function J0(n,e){n.uniform1fv(this.addr,e)}function Q0(n,e){const t=Pr(e,this.size,2);n.uniform2fv(this.addr,t)}function e_(n,e){const t=Pr(e,this.size,3);n.uniform3fv(this.addr,t)}function t_(n,e){const t=Pr(e,this.size,4);n.uniform4fv(this.addr,t)}function n_(n,e){const t=Pr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function i_(n,e){const t=Pr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function r_(n,e){const t=Pr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function s_(n,e){n.uniform1iv(this.addr,e)}function o_(n,e){n.uniform2iv(this.addr,e)}function a_(n,e){n.uniform3iv(this.addr,e)}function c_(n,e){n.uniform4iv(this.addr,e)}function l_(n,e){n.uniform1uiv(this.addr,e)}function u_(n,e){n.uniform2uiv(this.addr,e)}function d_(n,e){n.uniform3uiv(this.addr,e)}function h_(n,e){n.uniform4uiv(this.addr,e)}function f_(n,e,t){const i=this.cache,r=e.length,s=To(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Jd,s[o])}function p_(n,e,t){const i=this.cache,r=e.length,s=To(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||eh,s[o])}function m_(n,e,t){const i=this.cache,r=e.length,s=To(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||th,s[o])}function g_(n,e,t){const i=this.cache,r=e.length,s=To(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Qd,s[o])}function __(n){switch(n){case 5126:return J0;case 35664:return Q0;case 35665:return e_;case 35666:return t_;case 35674:return n_;case 35675:return i_;case 35676:return r_;case 5124:case 35670:return s_;case 35667:case 35671:return o_;case 35668:case 35672:return a_;case 35669:case 35673:return c_;case 5125:return l_;case 36294:return u_;case 36295:return d_;case 36296:return h_;case 35678:case 36198:case 36298:case 36306:case 35682:return f_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}class x_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=j0(t.type)}}class v_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=__(t.type)}}class M_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function du(n,e){n.seq.push(e),n.map[e.id]=e}function S_(n,e,t){const i=n.name,r=i.length;for(ma.lastIndex=0;;){const s=ma.exec(i),o=ma.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){du(t,c===void 0?new x_(a,n,e):new v_(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new M_(a),du(t,d)),t=d}}}class fo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);S_(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function hu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const y_=37297;let b_=0;function E_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const fu=new Xe;function A_(n){et._getMatrix(fu,et.workingColorSpace,n);const e=`mat3( ${fu.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case go:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function pu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+E_(n.getShaderSource(e),a)}else return s}function w_(n,e){const t=A_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function T_(n,e){let t;switch(e){case Cf:t="Linear";break;case Pf:t="Reinhard";break;case If:t="Cineon";break;case Rd:t="ACESFilmic";break;case Df:t="AgX";break;case Uf:t="Neutral";break;case Lf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const js=new k;function R_(){et.getLuminanceCoefficients(js);const n=js.x.toFixed(4),e=js.y.toFixed(4),t=js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function P_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function I_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function $r(n){return n!==""}function mu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function vc(n){return n.replace(L_,U_)}const D_=new Map;function U_(n,e){let t=Ye[e];if(t===void 0){const i=D_.get(e);if(i!==void 0)t=Ye[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return vc(t)}const N_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _u(n){return n.replace(N_,F_)}function F_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function xu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function O_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===wd?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===cf?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function B_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Mr:case Sr:e="ENVMAP_TYPE_CUBE";break;case bo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function z_(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Sr&&(e="ENVMAP_MODE_REFRACTION"),e}function H_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Td:e="ENVMAP_BLENDING_MULTIPLY";break;case Tf:e="ENVMAP_BLENDING_MIX";break;case Rf:e="ENVMAP_BLENDING_ADD";break}return e}function k_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function V_(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=O_(t),c=B_(t),u=z_(t),d=H_(t),f=k_(t),m=C_(t),g=P_(s),_=r.createProgram();let p,h,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($r).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($r).join(`
`),h.length>0&&(h+=`
`)):(p=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),h=[xu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ci?"#define TONE_MAPPING":"",t.toneMapping!==ci?Ye.tonemapping_pars_fragment:"",t.toneMapping!==ci?T_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,w_("linearToOutputTexel",t.outputColorSpace),R_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($r).join(`
`)),o=vc(o),o=mu(o,t),o=gu(o,t),a=vc(a),a=mu(a,t),a=gu(a,t),o=_u(o),a=_u(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",t.glslVersion===yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const v=S+p+o,x=S+h+a,A=hu(r,r.VERTEX_SHADER,v),E=hu(r,r.FRAGMENT_SHADER,x);r.attachShader(_,A),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(R){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(_)||"",L=r.getShaderInfoLog(A)||"",D=r.getShaderInfoLog(E)||"",F=N.trim(),B=L.trim(),$=D.trim();let H=!0,ie=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,A,E);else{const Z=pu(r,A,"vertex"),pe=pu(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+Z+`
`+pe)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(B===""||$==="")&&(ie=!1);ie&&(R.diagnostics={runnable:H,programLog:F,vertexShader:{log:B,prefix:p},fragmentShader:{log:$,prefix:h}})}r.deleteShader(A),r.deleteShader(E),w=new fo(r,_),M=I_(r,_)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,y_)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=b_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=E,this}let G_=0;class W_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new X_(e),t.set(e,i)),i}}class X_{constructor(e){this.id=G_++,this.code=e,this.usedTimes=0}}function q_(n,e,t,i,r,s,o){const a=new Wc,l=new W_,c=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,y,R,N,L){const D=N.fog,F=L.geometry,B=M.isMeshStandardMaterial?N.environment:null,$=(M.isMeshStandardMaterial?t:e).get(M.envMap||B),H=$&&$.mapping===bo?$.image.height:null,ie=g[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const Z=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,pe=Z!==void 0?Z.length:0;let Ee=0;F.morphAttributes.position!==void 0&&(Ee=1),F.morphAttributes.normal!==void 0&&(Ee=2),F.morphAttributes.color!==void 0&&(Ee=3);let De,Ue,W,ce;if(ie){const tt=Mn[ie];De=tt.vertexShader,Ue=tt.fragmentShader}else De=M.vertexShader,Ue=M.fragmentShader,l.update(M),W=l.getVertexShaderID(M),ce=l.getFragmentShaderID(M);const le=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),Ae=L.isInstancedMesh===!0,q=L.isBatchedMesh===!0,me=!!M.map,ae=!!M.matcap,P=!!$,X=!!M.aoMap,te=!!M.lightMap,Q=!!M.bumpMap,ne=!!M.normalMap,se=!!M.displacementMap,Y=!!M.emissiveMap,oe=!!M.metalnessMap,qe=!!M.roughnessMap,We=M.anisotropy>0,I=M.clearcoat>0,b=M.dispersion>0,U=M.iridescence>0,z=M.sheen>0,ee=M.transmission>0,j=We&&!!M.anisotropyMap,ve=I&&!!M.clearcoatMap,ue=I&&!!M.clearcoatNormalMap,Re=I&&!!M.clearcoatRoughnessMap,Ie=U&&!!M.iridescenceMap,fe=U&&!!M.iridescenceThicknessMap,Me=z&&!!M.sheenColorMap,Ne=z&&!!M.sheenRoughnessMap,Ce=!!M.specularMap,Se=!!M.specularColorMap,Be=!!M.specularIntensityMap,O=ee&&!!M.transmissionMap,de=ee&&!!M.thicknessMap,_e=!!M.gradientMap,we=!!M.alphaMap,he=M.alphaTest>0,re=!!M.alphaHash,Pe=!!M.extensions;let He=ci;M.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(He=n.toneMapping);const at={shaderID:ie,shaderType:M.type,shaderName:M.name,vertexShader:De,fragmentShader:Ue,defines:M.defines,customVertexShaderID:W,customFragmentShaderID:ce,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:q,batchingColor:q&&L._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&L.instanceColor!==null,instancingMorph:Ae&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:le===null?n.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:yr,alphaToCoverage:!!M.alphaToCoverage,map:me,matcap:ae,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:H,aoMap:X,lightMap:te,bumpMap:Q,normalMap:ne,displacementMap:f&&se,emissiveMap:Y,normalMapObjectSpace:ne&&M.normalMapType===Bf,normalMapTangentSpace:ne&&M.normalMapType===Od,metalnessMap:oe,roughnessMap:qe,anisotropy:We,anisotropyMap:j,clearcoat:I,clearcoatMap:ve,clearcoatNormalMap:ue,clearcoatRoughnessMap:Re,dispersion:b,iridescence:U,iridescenceMap:Ie,iridescenceThicknessMap:fe,sheen:z,sheenColorMap:Me,sheenRoughnessMap:Ne,specularMap:Ce,specularColorMap:Se,specularIntensityMap:Be,transmission:ee,transmissionMap:O,thicknessMap:de,gradientMap:_e,opaque:M.transparent===!1&&M.blending===hr&&M.alphaToCoverage===!1,alphaMap:we,alphaTest:he,alphaHash:re,combine:M.combine,mapUv:me&&_(M.map.channel),aoMapUv:X&&_(M.aoMap.channel),lightMapUv:te&&_(M.lightMap.channel),bumpMapUv:Q&&_(M.bumpMap.channel),normalMapUv:ne&&_(M.normalMap.channel),displacementMapUv:se&&_(M.displacementMap.channel),emissiveMapUv:Y&&_(M.emissiveMap.channel),metalnessMapUv:oe&&_(M.metalnessMap.channel),roughnessMapUv:qe&&_(M.roughnessMap.channel),anisotropyMapUv:j&&_(M.anisotropyMap.channel),clearcoatMapUv:ve&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ue&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&_(M.sheenRoughnessMap.channel),specularMapUv:Ce&&_(M.specularMap.channel),specularColorMapUv:Se&&_(M.specularColorMap.channel),specularIntensityMapUv:Be&&_(M.specularIntensityMap.channel),transmissionMapUv:O&&_(M.transmissionMap.channel),thicknessMapUv:de&&_(M.thicknessMap.channel),alphaMapUv:we&&_(M.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ne||We),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!F.attributes.uv&&(me||we),fog:!!D,useFog:M.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xe,skinning:L.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Ee,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:me&&M.map.isVideoTexture===!0&&et.getTransfer(M.map.colorSpace)===rt,decodeVideoTextureEmissive:Y&&M.emissiveMap.isVideoTexture===!0&&et.getTransfer(M.emissiveMap.colorSpace)===rt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===yt,flipSided:M.side===qt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Pe&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&M.extensions.multiDraw===!0||q)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at}function h(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)y.push(R),y.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(S(y,M),v(y,M),y.push(n.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function S(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function v(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){const y=g[M.type];let R;if(y){const N=Mn[y];R=fp.clone(N.uniforms)}else R=M.uniforms;return R}function A(M,y){let R;for(let N=0,L=u.length;N<L;N++){const D=u[N];if(D.cacheKey===y){R=D,++R.usedTimes;break}}return R===void 0&&(R=new V_(n,y,M,s),u.push(R)),R}function E(M){if(--M.usedTimes===0){const y=u.indexOf(M);u[y]=u[u.length-1],u.pop(),M.destroy()}}function C(M){l.remove(M)}function w(){l.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:x,acquireProgram:A,releaseProgram:E,releaseShaderCache:C,programs:u,dispose:w}}function Y_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Z_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function vu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Mu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,f,m,g,_,p){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=m,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=_,h.group=p),e++,h}function a(d,f,m,g,_,p){const h=o(d,f,m,g,_,p);m.transmission>0?i.push(h):m.transparent===!0?r.push(h):t.push(h)}function l(d,f,m,g,_,p){const h=o(d,f,m,g,_,p);m.transmission>0?i.unshift(h):m.transparent===!0?r.unshift(h):t.unshift(h)}function c(d,f){t.length>1&&t.sort(d||Z_),i.length>1&&i.sort(f||vu),r.length>1&&r.sort(f||vu)}function u(){for(let d=e,f=n.length;d<f;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function $_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Mu,n.set(i,[o])):r>=s.length?(o=new Mu,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function K_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Ge};break;case"SpotLight":t={position:new k,direction:new k,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function j_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let J_=0;function Q_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ex(n){const e=new K_,t=j_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new ct,o=new ct;function a(c){let u=0,d=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let m=0,g=0,_=0,p=0,h=0,S=0,v=0,x=0,A=0,E=0,C=0;c.sort(Q_);for(let M=0,y=c.length;M<y;M++){const R=c[M],N=R.color,L=R.intensity,D=R.distance,F=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=N.r*L,d+=N.g*L,f+=N.b*L;else if(R.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(R.sh.coefficients[B],L);C++}else if(R.isDirectionalLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const $=R.shadow,H=t.get(R);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=F,i.directionalShadowMatrix[m]=R.shadow.matrix,S++}i.directional[m]=B,m++}else if(R.isSpotLight){const B=e.get(R);B.position.setFromMatrixPosition(R.matrixWorld),B.color.copy(N).multiplyScalar(L),B.distance=D,B.coneCos=Math.cos(R.angle),B.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),B.decay=R.decay,i.spot[_]=B;const $=R.shadow;if(R.map&&(i.spotLightMap[A]=R.map,A++,$.updateMatrices(R),R.castShadow&&E++),i.spotLightMatrix[_]=$.matrix,R.castShadow){const H=t.get(R);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=F,x++}_++}else if(R.isRectAreaLight){const B=e.get(R);B.color.copy(N).multiplyScalar(L),B.halfWidth.set(R.width*.5,0,0),B.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=B,p++}else if(R.isPointLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),B.distance=R.distance,B.decay=R.decay,R.castShadow){const $=R.shadow,H=t.get(R);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,H.shadowCameraNear=$.camera.near,H.shadowCameraFar=$.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=F,i.pointShadowMatrix[g]=R.shadow.matrix,v++}i.point[g]=B,g++}else if(R.isHemisphereLight){const B=e.get(R);B.skyColor.copy(R.color).multiplyScalar(L),B.groundColor.copy(R.groundColor).multiplyScalar(L),i.hemi[h]=B,h++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const w=i.hash;(w.directionalLength!==m||w.pointLength!==g||w.spotLength!==_||w.rectAreaLength!==p||w.hemiLength!==h||w.numDirectionalShadows!==S||w.numPointShadows!==v||w.numSpotShadows!==x||w.numSpotMaps!==A||w.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=x+A-E,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,w.directionalLength=m,w.pointLength=g,w.spotLength=_,w.rectAreaLength=p,w.hemiLength=h,w.numDirectionalShadows=S,w.numPointShadows=v,w.numSpotShadows=x,w.numSpotMaps=A,w.numLightProbes=C,i.version=J_++)}function l(c,u){let d=0,f=0,m=0,g=0,_=0;const p=u.matrixWorldInverse;for(let h=0,S=c.length;h<S;h++){const v=c[h];if(v.isDirectionalLight){const x=i.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),d++}else if(v.isSpotLight){const x=i.spot[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),m++}else if(v.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:i}}function Su(n){const e=new ex(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function tx(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Su(n),e.set(r,[a])):s>=o.length?(a=new Su(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ix=`uniform sampler2D shadow_pass;
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
}`;function rx(n,e,t){let i=new qc;const r=new $e,s=new $e,o=new _t,a=new wp({depthPacking:Of}),l=new Tp,c={},u=t.maxTextureSize,d={[li]:qt,[qt]:li,[yt]:yt},f=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:nx,fragmentShader:ix}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new ht;g.setAttribute("position",new nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ve(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wd;let h=this.type;this.render=function(E,C,w){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;const M=n.getRenderTarget(),y=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),N=n.state;N.setBlending(ai),N.buffers.depth.getReversed()?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const L=h!==On&&this.type===On,D=h===On&&this.type!==On;for(let F=0,B=E.length;F<B;F++){const $=E[F],H=$.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ie=H.getFrameExtents();if(r.multiply(ie),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ie.x),r.x=s.x*ie.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ie.y),r.y=s.y*ie.y,H.mapSize.y=s.y)),H.map===null||L===!0||D===!0){const pe=this.type!==On?{minFilter:Qt,magFilter:Qt}:{};H.map!==null&&H.map.dispose(),H.map=new Li(r.x,r.y,pe),H.map.texture.name=$.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const Z=H.getViewportCount();for(let pe=0;pe<Z;pe++){const Ee=H.getViewport(pe);o.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),N.viewport(o),H.updateMatrices($,pe),i=H.getFrustum(),x(C,w,H.camera,$,this.type)}H.isPointLightShadow!==!0&&this.type===On&&S(H,w),H.needsUpdate=!1}h=this.type,p.needsUpdate=!1,n.setRenderTarget(M,y,R)};function S(E,C){const w=e.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Li(r.x,r.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,w,f,_,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,w,m,_,null)}function v(E,C,w,M){let y=null;const R=w.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)y=R;else if(y=w.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=y.uuid,L=C.uuid;let D=c[N];D===void 0&&(D={},c[N]=D);let F=D[L];F===void 0&&(F=y.clone(),D[L]=F,C.addEventListener("dispose",A)),y=F}if(y.visible=C.visible,y.wireframe=C.wireframe,M===On?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:d[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=n.properties.get(y);N.light=w}return y}function x(E,C,w,M,y){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===On)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,E.matrixWorld);const L=e.update(E),D=E.material;if(Array.isArray(D)){const F=L.groups;for(let B=0,$=F.length;B<$;B++){const H=F[B],ie=D[H.materialIndex];if(ie&&ie.visible){const Z=v(E,ie,M,y);E.onBeforeShadow(n,E,C,w,L,Z,H),n.renderBufferDirect(w,null,L,Z,E,H),E.onAfterShadow(n,E,C,w,L,Z,H)}}}else if(D.visible){const F=v(E,D,M,y);E.onBeforeShadow(n,E,C,w,L,F,null),n.renderBufferDirect(w,null,L,F,E,null),E.onAfterShadow(n,E,C,w,L,F,null)}}const N=E.children;for(let L=0,D=N.length;L<D;L++)x(N[L],C,w,M,y)}function A(E){E.target.removeEventListener("dispose",A);for(const w in c){const M=c[w],y=E.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const sx={[Da]:Ua,[Na]:Ba,[Fa]:za,[vr]:Oa,[Ua]:Da,[Ba]:Na,[za]:Fa,[Oa]:vr};function ox(n,e){function t(){let O=!1;const de=new _t;let _e=null;const we=new _t(0,0,0,0);return{setMask:function(he){_e!==he&&!O&&(n.colorMask(he,he,he,he),_e=he)},setLocked:function(he){O=he},setClear:function(he,re,Pe,He,at){at===!0&&(he*=He,re*=He,Pe*=He),de.set(he,re,Pe,He),we.equals(de)===!1&&(n.clearColor(he,re,Pe,He),we.copy(de))},reset:function(){O=!1,_e=null,we.set(-1,0,0,0)}}}function i(){let O=!1,de=!1,_e=null,we=null,he=null;return{setReversed:function(re){if(de!==re){const Pe=e.get("EXT_clip_control");re?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),de=re;const He=he;he=null,this.setClear(He)}},getReversed:function(){return de},setTest:function(re){re?le(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(re){_e!==re&&!O&&(n.depthMask(re),_e=re)},setFunc:function(re){if(de&&(re=sx[re]),we!==re){switch(re){case Da:n.depthFunc(n.NEVER);break;case Ua:n.depthFunc(n.ALWAYS);break;case Na:n.depthFunc(n.LESS);break;case vr:n.depthFunc(n.LEQUAL);break;case Fa:n.depthFunc(n.EQUAL);break;case Oa:n.depthFunc(n.GEQUAL);break;case Ba:n.depthFunc(n.GREATER);break;case za:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}we=re}},setLocked:function(re){O=re},setClear:function(re){he!==re&&(de&&(re=1-re),n.clearDepth(re),he=re)},reset:function(){O=!1,_e=null,we=null,he=null,de=!1}}}function r(){let O=!1,de=null,_e=null,we=null,he=null,re=null,Pe=null,He=null,at=null;return{setTest:function(tt){O||(tt?le(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function(tt){de!==tt&&!O&&(n.stencilMask(tt),de=tt)},setFunc:function(tt,Cn,mn){(_e!==tt||we!==Cn||he!==mn)&&(n.stencilFunc(tt,Cn,mn),_e=tt,we=Cn,he=mn)},setOp:function(tt,Cn,mn){(re!==tt||Pe!==Cn||He!==mn)&&(n.stencilOp(tt,Cn,mn),re=tt,Pe=Cn,He=mn)},setLocked:function(tt){O=tt},setClear:function(tt){at!==tt&&(n.clearStencil(tt),at=tt)},reset:function(){O=!1,de=null,_e=null,we=null,he=null,re=null,Pe=null,He=null,at=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,m=[],g=null,_=!1,p=null,h=null,S=null,v=null,x=null,A=null,E=null,C=new Ge(0,0,0),w=0,M=!1,y=null,R=null,N=null,L=null,D=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,$=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(H)[1]),B=$>=1):H.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),B=$>=2);let ie=null,Z={};const pe=n.getParameter(n.SCISSOR_BOX),Ee=n.getParameter(n.VIEWPORT),De=new _t().fromArray(pe),Ue=new _t().fromArray(Ee);function W(O,de,_e,we){const he=new Uint8Array(4),re=n.createTexture();n.bindTexture(O,re),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<_e;Pe++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,we,0,n.RGBA,n.UNSIGNED_BYTE,he):n.texImage2D(de+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,he);return re}const ce={};ce[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),ce[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ce[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(n.DEPTH_TEST),o.setFunc(vr),Q(!1),ne(gl),le(n.CULL_FACE),X(ai);function le(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function xe(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function Ae(O,de){return d[O]!==de?(n.bindFramebuffer(O,de),d[O]=de,O===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=de),O===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=de),!0):!1}function q(O,de){let _e=m,we=!1;if(O){_e=f.get(de),_e===void 0&&(_e=[],f.set(de,_e));const he=O.textures;if(_e.length!==he.length||_e[0]!==n.COLOR_ATTACHMENT0){for(let re=0,Pe=he.length;re<Pe;re++)_e[re]=n.COLOR_ATTACHMENT0+re;_e.length=he.length,we=!0}}else _e[0]!==n.BACK&&(_e[0]=n.BACK,we=!0);we&&n.drawBuffers(_e)}function me(O){return g!==O?(n.useProgram(O),g=O,!0):!1}const ae={[yi]:n.FUNC_ADD,[uf]:n.FUNC_SUBTRACT,[df]:n.FUNC_REVERSE_SUBTRACT};ae[hf]=n.MIN,ae[ff]=n.MAX;const P={[pf]:n.ZERO,[mf]:n.ONE,[gf]:n.SRC_COLOR,[Ia]:n.SRC_ALPHA,[yf]:n.SRC_ALPHA_SATURATE,[Mf]:n.DST_COLOR,[xf]:n.DST_ALPHA,[_f]:n.ONE_MINUS_SRC_COLOR,[La]:n.ONE_MINUS_SRC_ALPHA,[Sf]:n.ONE_MINUS_DST_COLOR,[vf]:n.ONE_MINUS_DST_ALPHA,[bf]:n.CONSTANT_COLOR,[Ef]:n.ONE_MINUS_CONSTANT_COLOR,[Af]:n.CONSTANT_ALPHA,[wf]:n.ONE_MINUS_CONSTANT_ALPHA};function X(O,de,_e,we,he,re,Pe,He,at,tt){if(O===ai){_===!0&&(xe(n.BLEND),_=!1);return}if(_===!1&&(le(n.BLEND),_=!0),O!==lf){if(O!==p||tt!==M){if((h!==yi||x!==yi)&&(n.blendEquation(n.FUNC_ADD),h=yi,x=yi),tt)switch(O){case hr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _l:n.blendFunc(n.ONE,n.ONE);break;case xl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case hr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _l:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case xl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}S=null,v=null,A=null,E=null,C.set(0,0,0),w=0,p=O,M=tt}return}he=he||de,re=re||_e,Pe=Pe||we,(de!==h||he!==x)&&(n.blendEquationSeparate(ae[de],ae[he]),h=de,x=he),(_e!==S||we!==v||re!==A||Pe!==E)&&(n.blendFuncSeparate(P[_e],P[we],P[re],P[Pe]),S=_e,v=we,A=re,E=Pe),(He.equals(C)===!1||at!==w)&&(n.blendColor(He.r,He.g,He.b,at),C.copy(He),w=at),p=O,M=!1}function te(O,de){O.side===yt?xe(n.CULL_FACE):le(n.CULL_FACE);let _e=O.side===qt;de&&(_e=!_e),Q(_e),O.blending===hr&&O.transparent===!1?X(ai):X(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const we=O.stencilWrite;a.setTest(we),we&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Y(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?le(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Q(O){y!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),y=O)}function ne(O){O!==of?(le(n.CULL_FACE),O!==R&&(O===gl?n.cullFace(n.BACK):O===af?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),R=O}function se(O){O!==N&&(B&&n.lineWidth(O),N=O)}function Y(O,de,_e){O?(le(n.POLYGON_OFFSET_FILL),(L!==de||D!==_e)&&(n.polygonOffset(de,_e),L=de,D=_e)):xe(n.POLYGON_OFFSET_FILL)}function oe(O){O?le(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function qe(O){O===void 0&&(O=n.TEXTURE0+F-1),ie!==O&&(n.activeTexture(O),ie=O)}function We(O,de,_e){_e===void 0&&(ie===null?_e=n.TEXTURE0+F-1:_e=ie);let we=Z[_e];we===void 0&&(we={type:void 0,texture:void 0},Z[_e]=we),(we.type!==O||we.texture!==de)&&(ie!==_e&&(n.activeTexture(_e),ie=_e),n.bindTexture(O,de||ce[O]),we.type=O,we.texture=de)}function I(){const O=Z[ie];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function z(){try{n.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{n.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ve(){try{n.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ue(){try{n.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Re(){try{n.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ie(){try{n.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(){try{n.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Me(O){De.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),De.copy(O))}function Ne(O){Ue.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),Ue.copy(O))}function Ce(O,de){let _e=c.get(de);_e===void 0&&(_e=new WeakMap,c.set(de,_e));let we=_e.get(O);we===void 0&&(we=n.getUniformBlockIndex(de,O.name),_e.set(O,we))}function Se(O,de){const we=c.get(de).get(O);l.get(de)!==we&&(n.uniformBlockBinding(de,we,O.__bindingPointIndex),l.set(de,we))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ie=null,Z={},d={},f=new WeakMap,m=[],g=null,_=!1,p=null,h=null,S=null,v=null,x=null,A=null,E=null,C=new Ge(0,0,0),w=0,M=!1,y=null,R=null,N=null,L=null,D=null,De.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:le,disable:xe,bindFramebuffer:Ae,drawBuffers:q,useProgram:me,setBlending:X,setMaterial:te,setFlipSided:Q,setCullFace:ne,setLineWidth:se,setPolygonOffset:Y,setScissorTest:oe,activeTexture:qe,bindTexture:We,unbindTexture:I,compressedTexImage2D:b,compressedTexImage3D:U,texImage2D:Ie,texImage3D:fe,updateUBOMapping:Ce,uniformBlockBinding:Se,texStorage2D:ue,texStorage3D:Re,texSubImage2D:z,texSubImage3D:ee,compressedTexSubImage2D:j,compressedTexSubImage3D:ve,scissor:Me,viewport:Ne,reset:Be}}function ax(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,u=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,b){return m?new OffscreenCanvas(I,b):xo("canvas")}function _(I,b,U){let z=1;const ee=We(I);if((ee.width>U||ee.height>U)&&(z=U/Math.max(ee.width,ee.height)),z<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const j=Math.floor(z*ee.width),ve=Math.floor(z*ee.height);d===void 0&&(d=g(j,ve));const ue=b?g(j,ve):d;return ue.width=j,ue.height=ve,ue.getContext("2d").drawImage(I,0,0,j,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+j+"x"+ve+")."),ue}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),I;return I}function p(I){return I.generateMipmaps}function h(I){n.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(I,b,U,z,ee=!1){if(I!==null){if(n[I]!==void 0)return n[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let j=b;if(b===n.RED&&(U===n.FLOAT&&(j=n.R32F),U===n.HALF_FLOAT&&(j=n.R16F),U===n.UNSIGNED_BYTE&&(j=n.R8)),b===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.R8UI),U===n.UNSIGNED_SHORT&&(j=n.R16UI),U===n.UNSIGNED_INT&&(j=n.R32UI),U===n.BYTE&&(j=n.R8I),U===n.SHORT&&(j=n.R16I),U===n.INT&&(j=n.R32I)),b===n.RG&&(U===n.FLOAT&&(j=n.RG32F),U===n.HALF_FLOAT&&(j=n.RG16F),U===n.UNSIGNED_BYTE&&(j=n.RG8)),b===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RG8UI),U===n.UNSIGNED_SHORT&&(j=n.RG16UI),U===n.UNSIGNED_INT&&(j=n.RG32UI),U===n.BYTE&&(j=n.RG8I),U===n.SHORT&&(j=n.RG16I),U===n.INT&&(j=n.RG32I)),b===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGB8UI),U===n.UNSIGNED_SHORT&&(j=n.RGB16UI),U===n.UNSIGNED_INT&&(j=n.RGB32UI),U===n.BYTE&&(j=n.RGB8I),U===n.SHORT&&(j=n.RGB16I),U===n.INT&&(j=n.RGB32I)),b===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),U===n.UNSIGNED_INT&&(j=n.RGBA32UI),U===n.BYTE&&(j=n.RGBA8I),U===n.SHORT&&(j=n.RGBA16I),U===n.INT&&(j=n.RGBA32I)),b===n.RGB&&U===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),b===n.RGBA){const ve=ee?go:et.getTransfer(z);U===n.FLOAT&&(j=n.RGBA32F),U===n.HALF_FLOAT&&(j=n.RGBA16F),U===n.UNSIGNED_BYTE&&(j=ve===rt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function x(I,b){let U;return I?b===null||b===Ii||b===ps?U=n.DEPTH24_STENCIL8:b===bn?U=n.DEPTH32F_STENCIL8:b===fs&&(U=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ii||b===ps?U=n.DEPTH_COMPONENT24:b===bn?U=n.DEPTH_COMPONENT32F:b===fs&&(U=n.DEPTH_COMPONENT16),U}function A(I,b){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==Qt&&I.minFilter!==yn?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function E(I){const b=I.target;b.removeEventListener("dispose",E),w(b),b.isVideoTexture&&u.delete(b)}function C(I){const b=I.target;b.removeEventListener("dispose",C),y(b)}function w(I){const b=i.get(I);if(b.__webglInit===void 0)return;const U=I.source,z=f.get(U);if(z){const ee=z[b.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&M(I),Object.keys(z).length===0&&f.delete(U)}i.remove(I)}function M(I){const b=i.get(I);n.deleteTexture(b.__webglTexture);const U=I.source,z=f.get(U);delete z[b.__cacheKey],o.memory.textures--}function y(I){const b=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(b.__webglFramebuffer[z]))for(let ee=0;ee<b.__webglFramebuffer[z].length;ee++)n.deleteFramebuffer(b.__webglFramebuffer[z][ee]);else n.deleteFramebuffer(b.__webglFramebuffer[z]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[z])}else{if(Array.isArray(b.__webglFramebuffer))for(let z=0;z<b.__webglFramebuffer.length;z++)n.deleteFramebuffer(b.__webglFramebuffer[z]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let z=0;z<b.__webglColorRenderbuffer.length;z++)b.__webglColorRenderbuffer[z]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[z]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const U=I.textures;for(let z=0,ee=U.length;z<ee;z++){const j=i.get(U[z]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(U[z])}i.remove(I)}let R=0;function N(){R=0}function L(){const I=R;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),R+=1,I}function D(I){const b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function F(I,b){const U=i.get(I);if(I.isVideoTexture&&oe(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&U.__version!==I.version){const z=I.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(U,I,b);return}}else I.isExternalTexture&&(U.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+b)}function B(I,b){const U=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&U.__version!==I.version){ce(U,I,b);return}t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+b)}function $(I,b){const U=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&U.__version!==I.version){ce(U,I,b);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+b)}function H(I,b){const U=i.get(I);if(I.version>0&&U.__version!==I.version){le(U,I,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+b)}const ie={[Va]:n.REPEAT,[Ai]:n.CLAMP_TO_EDGE,[Ga]:n.MIRRORED_REPEAT},Z={[Qt]:n.NEAREST,[Nf]:n.NEAREST_MIPMAP_NEAREST,[Rs]:n.NEAREST_MIPMAP_LINEAR,[yn]:n.LINEAR,[Oo]:n.LINEAR_MIPMAP_NEAREST,[wi]:n.LINEAR_MIPMAP_LINEAR},pe={[zf]:n.NEVER,[Xf]:n.ALWAYS,[Hf]:n.LESS,[Bd]:n.LEQUAL,[kf]:n.EQUAL,[Wf]:n.GEQUAL,[Vf]:n.GREATER,[Gf]:n.NOTEQUAL};function Ee(I,b){if(b.type===bn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===yn||b.magFilter===Oo||b.magFilter===Rs||b.magFilter===wi||b.minFilter===yn||b.minFilter===Oo||b.minFilter===Rs||b.minFilter===wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,ie[b.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,ie[b.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,ie[b.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,Z[b.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,Z[b.minFilter]),b.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,pe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Qt||b.minFilter!==Rs&&b.minFilter!==wi||b.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function De(I,b){let U=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",E));const z=b.source;let ee=f.get(z);ee===void 0&&(ee={},f.set(z,ee));const j=D(b);if(j!==I.__cacheKey){ee[j]===void 0&&(ee[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),ee[j].usedTimes++;const ve=ee[I.__cacheKey];ve!==void 0&&(ee[I.__cacheKey].usedTimes--,ve.usedTimes===0&&M(b)),I.__cacheKey=j,I.__webglTexture=ee[j].texture}return U}function Ue(I,b,U){return Math.floor(Math.floor(I/U)/b)}function W(I,b,U,z){const j=I.updateRanges;if(j.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,U,z,b.data);else{j.sort((fe,Me)=>fe.start-Me.start);let ve=0;for(let fe=1;fe<j.length;fe++){const Me=j[ve],Ne=j[fe],Ce=Me.start+Me.count,Se=Ue(Ne.start,b.width,4),Be=Ue(Me.start,b.width,4);Ne.start<=Ce+1&&Se===Be&&Ue(Ne.start+Ne.count-1,b.width,4)===Se?Me.count=Math.max(Me.count,Ne.start+Ne.count-Me.start):(++ve,j[ve]=Ne)}j.length=ve+1;const ue=n.getParameter(n.UNPACK_ROW_LENGTH),Re=n.getParameter(n.UNPACK_SKIP_PIXELS),Ie=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let fe=0,Me=j.length;fe<Me;fe++){const Ne=j[fe],Ce=Math.floor(Ne.start/4),Se=Math.ceil(Ne.count/4),Be=Ce%b.width,O=Math.floor(Ce/b.width),de=Se,_e=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),t.texSubImage2D(n.TEXTURE_2D,0,Be,O,de,_e,U,z,b.data)}I.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ue),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Re),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ie)}}function ce(I,b,U){let z=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(z=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(z=n.TEXTURE_3D);const ee=De(I,b),j=b.source;t.bindTexture(z,I.__webglTexture,n.TEXTURE0+U);const ve=i.get(j);if(j.version!==ve.__version||ee===!0){t.activeTexture(n.TEXTURE0+U);const ue=et.getPrimaries(et.workingColorSpace),Re=b.colorSpace===ri?null:et.getPrimaries(b.colorSpace),Ie=b.colorSpace===ri||ue===Re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let fe=_(b.image,!1,r.maxTextureSize);fe=qe(b,fe);const Me=s.convert(b.format,b.colorSpace),Ne=s.convert(b.type);let Ce=v(b.internalFormat,Me,Ne,b.colorSpace,b.isVideoTexture);Ee(z,b);let Se;const Be=b.mipmaps,O=b.isVideoTexture!==!0,de=ve.__version===void 0||ee===!0,_e=j.dataReady,we=A(b,fe);if(b.isDepthTexture)Ce=x(b.format===gs,b.type),de&&(O?t.texStorage2D(n.TEXTURE_2D,1,Ce,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Ce,fe.width,fe.height,0,Me,Ne,null));else if(b.isDataTexture)if(Be.length>0){O&&de&&t.texStorage2D(n.TEXTURE_2D,we,Ce,Be[0].width,Be[0].height);for(let he=0,re=Be.length;he<re;he++)Se=Be[he],O?_e&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Se.width,Se.height,Me,Ne,Se.data):t.texImage2D(n.TEXTURE_2D,he,Ce,Se.width,Se.height,0,Me,Ne,Se.data);b.generateMipmaps=!1}else O?(de&&t.texStorage2D(n.TEXTURE_2D,we,Ce,fe.width,fe.height),_e&&W(b,fe,Me,Ne)):t.texImage2D(n.TEXTURE_2D,0,Ce,fe.width,fe.height,0,Me,Ne,fe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){O&&de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ce,Be[0].width,Be[0].height,fe.depth);for(let he=0,re=Be.length;he<re;he++)if(Se=Be[he],b.format!==fn)if(Me!==null)if(O){if(_e)if(b.layerUpdates.size>0){const Pe=jl(Se.width,Se.height,b.format,b.type);for(const He of b.layerUpdates){const at=Se.data.subarray(He*Pe/Se.data.BYTES_PER_ELEMENT,(He+1)*Pe/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,He,Se.width,Se.height,1,Me,at)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Se.width,Se.height,fe.depth,Me,Se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Ce,Se.width,Se.height,fe.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?_e&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Se.width,Se.height,fe.depth,Me,Ne,Se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Ce,Se.width,Se.height,fe.depth,0,Me,Ne,Se.data)}else{O&&de&&t.texStorage2D(n.TEXTURE_2D,we,Ce,Be[0].width,Be[0].height);for(let he=0,re=Be.length;he<re;he++)Se=Be[he],b.format!==fn?Me!==null?O?_e&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,Se.width,Se.height,Me,Se.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Ce,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?_e&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Se.width,Se.height,Me,Ne,Se.data):t.texImage2D(n.TEXTURE_2D,he,Ce,Se.width,Se.height,0,Me,Ne,Se.data)}else if(b.isDataArrayTexture)if(O){if(de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ce,fe.width,fe.height,fe.depth),_e)if(b.layerUpdates.size>0){const he=jl(fe.width,fe.height,b.format,b.type);for(const re of b.layerUpdates){const Pe=fe.data.subarray(re*he/fe.data.BYTES_PER_ELEMENT,(re+1)*he/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,re,fe.width,fe.height,1,Me,Ne,Pe)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Me,Ne,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,fe.width,fe.height,fe.depth,0,Me,Ne,fe.data);else if(b.isData3DTexture)O?(de&&t.texStorage3D(n.TEXTURE_3D,we,Ce,fe.width,fe.height,fe.depth),_e&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Me,Ne,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,fe.width,fe.height,fe.depth,0,Me,Ne,fe.data);else if(b.isFramebufferTexture){if(de)if(O)t.texStorage2D(n.TEXTURE_2D,we,Ce,fe.width,fe.height);else{let he=fe.width,re=fe.height;for(let Pe=0;Pe<we;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,Ce,he,re,0,Me,Ne,null),he>>=1,re>>=1}}else if(Be.length>0){if(O&&de){const he=We(Be[0]);t.texStorage2D(n.TEXTURE_2D,we,Ce,he.width,he.height)}for(let he=0,re=Be.length;he<re;he++)Se=Be[he],O?_e&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Me,Ne,Se):t.texImage2D(n.TEXTURE_2D,he,Ce,Me,Ne,Se);b.generateMipmaps=!1}else if(O){if(de){const he=We(fe);t.texStorage2D(n.TEXTURE_2D,we,Ce,he.width,he.height)}_e&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,Ne,fe)}else t.texImage2D(n.TEXTURE_2D,0,Ce,Me,Ne,fe);p(b)&&h(z),ve.__version=j.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function le(I,b,U){if(b.image.length!==6)return;const z=De(I,b),ee=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+U);const j=i.get(ee);if(ee.version!==j.__version||z===!0){t.activeTexture(n.TEXTURE0+U);const ve=et.getPrimaries(et.workingColorSpace),ue=b.colorSpace===ri?null:et.getPrimaries(b.colorSpace),Re=b.colorSpace===ri||ve===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Ie=b.isCompressedTexture||b.image[0].isCompressedTexture,fe=b.image[0]&&b.image[0].isDataTexture,Me=[];for(let re=0;re<6;re++)!Ie&&!fe?Me[re]=_(b.image[re],!0,r.maxCubemapSize):Me[re]=fe?b.image[re].image:b.image[re],Me[re]=qe(b,Me[re]);const Ne=Me[0],Ce=s.convert(b.format,b.colorSpace),Se=s.convert(b.type),Be=v(b.internalFormat,Ce,Se,b.colorSpace),O=b.isVideoTexture!==!0,de=j.__version===void 0||z===!0,_e=ee.dataReady;let we=A(b,Ne);Ee(n.TEXTURE_CUBE_MAP,b);let he;if(Ie){O&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,we,Be,Ne.width,Ne.height);for(let re=0;re<6;re++){he=Me[re].mipmaps;for(let Pe=0;Pe<he.length;Pe++){const He=he[Pe];b.format!==fn?Ce!==null?O?_e&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,He.width,He.height,Ce,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Be,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,0,0,He.width,He.height,Ce,Se,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe,Be,He.width,He.height,0,Ce,Se,He.data)}}}else{if(he=b.mipmaps,O&&de){he.length>0&&we++;const re=We(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,we,Be,re.width,re.height)}for(let re=0;re<6;re++)if(fe){O?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Me[re].width,Me[re].height,Ce,Se,Me[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Be,Me[re].width,Me[re].height,0,Ce,Se,Me[re].data);for(let Pe=0;Pe<he.length;Pe++){const at=he[Pe].image[re].image;O?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,at.width,at.height,Ce,Se,at.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Be,at.width,at.height,0,Ce,Se,at.data)}}else{O?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ce,Se,Me[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Be,Ce,Se,Me[re]);for(let Pe=0;Pe<he.length;Pe++){const He=he[Pe];O?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,0,0,Ce,Se,He.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Pe+1,Be,Ce,Se,He.image[re])}}}p(b)&&h(n.TEXTURE_CUBE_MAP),j.__version=ee.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function xe(I,b,U,z,ee,j){const ve=s.convert(U.format,U.colorSpace),ue=s.convert(U.type),Re=v(U.internalFormat,ve,ue,U.colorSpace),Ie=i.get(b),fe=i.get(U);if(fe.__renderTarget=b,!Ie.__hasExternalTextures){const Me=Math.max(1,b.width>>j),Ne=Math.max(1,b.height>>j);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,j,Re,Me,Ne,b.depth,0,ve,ue,null):t.texImage2D(ee,j,Re,Me,Ne,0,ve,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),Y(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,z,ee,fe.__webglTexture,0,se(b)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,z,ee,fe.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(I,b,U){if(n.bindRenderbuffer(n.RENDERBUFFER,I),b.depthBuffer){const z=b.depthTexture,ee=z&&z.isDepthTexture?z.type:null,j=x(b.stencilBuffer,ee),ve=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=se(b);Y(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,j,b.width,b.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,j,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,j,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,I)}else{const z=b.textures;for(let ee=0;ee<z.length;ee++){const j=z[ee],ve=s.convert(j.format,j.colorSpace),ue=s.convert(j.type),Re=v(j.internalFormat,ve,ue,j.colorSpace),Ie=se(b);U&&Y(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie,Re,b.width,b.height):Y(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie,Re,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Re,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function q(I,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=i.get(b.depthTexture);z.__renderTarget=b,(!z.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),F(b.depthTexture,0);const ee=z.__webglTexture,j=se(b);if(b.depthTexture.format===ms)Y(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(b.depthTexture.format===gs)Y(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function me(I){const b=i.get(I),U=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){const z=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),z){const ee=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,z.removeEventListener("dispose",ee)};z.addEventListener("dispose",ee),b.__depthDisposeCallback=ee}b.__boundDepthTexture=z}if(I.depthTexture&&!b.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const z=I.texture.mipmaps;z&&z.length>0?q(b.__webglFramebuffer[0],I):q(b.__webglFramebuffer,I)}else if(U){b.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[z]),b.__webglDepthbuffer[z]===void 0)b.__webglDepthbuffer[z]=n.createRenderbuffer(),Ae(b.__webglDepthbuffer[z],I,!1);else{const ee=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[z];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,j)}}else{const z=I.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Ae(b.__webglDepthbuffer,I,!1);else{const ee=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,j)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(I,b,U){const z=i.get(I);b!==void 0&&xe(z.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&me(I)}function P(I){const b=I.texture,U=i.get(I),z=i.get(b);I.addEventListener("dispose",C);const ee=I.textures,j=I.isWebGLCubeRenderTarget===!0,ve=ee.length>1;if(ve||(z.__webglTexture===void 0&&(z.__webglTexture=n.createTexture()),z.__version=b.version,o.memory.textures++),j){U.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(b.mipmaps&&b.mipmaps.length>0){U.__webglFramebuffer[ue]=[];for(let Re=0;Re<b.mipmaps.length;Re++)U.__webglFramebuffer[ue][Re]=n.createFramebuffer()}else U.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){U.__webglFramebuffer=[];for(let ue=0;ue<b.mipmaps.length;ue++)U.__webglFramebuffer[ue]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(ve)for(let ue=0,Re=ee.length;ue<Re;ue++){const Ie=i.get(ee[ue]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=n.createTexture(),o.memory.textures++)}if(I.samples>0&&Y(I)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const Re=ee[ue];U.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[ue]);const Ie=s.convert(Re.format,Re.colorSpace),fe=s.convert(Re.type),Me=v(Re.internalFormat,Ie,fe,Re.colorSpace,I.isXRRenderTarget===!0),Ne=se(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,Me,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,U.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(U.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),Ee(n.TEXTURE_CUBE_MAP,b);for(let ue=0;ue<6;ue++)if(b.mipmaps&&b.mipmaps.length>0)for(let Re=0;Re<b.mipmaps.length;Re++)xe(U.__webglFramebuffer[ue][Re],I,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Re);else xe(U.__webglFramebuffer[ue],I,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(b)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ue=0,Re=ee.length;ue<Re;ue++){const Ie=ee[ue],fe=i.get(Ie);let Me=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Me=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,fe.__webglTexture),Ee(Me,Ie),xe(U.__webglFramebuffer,I,Ie,n.COLOR_ATTACHMENT0+ue,Me,0),p(Ie)&&h(Me)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ue=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,z.__webglTexture),Ee(ue,b),b.mipmaps&&b.mipmaps.length>0)for(let Re=0;Re<b.mipmaps.length;Re++)xe(U.__webglFramebuffer[Re],I,b,n.COLOR_ATTACHMENT0,ue,Re);else xe(U.__webglFramebuffer,I,b,n.COLOR_ATTACHMENT0,ue,0);p(b)&&h(ue),t.unbindTexture()}I.depthBuffer&&me(I)}function X(I){const b=I.textures;for(let U=0,z=b.length;U<z;U++){const ee=b[U];if(p(ee)){const j=S(I),ve=i.get(ee).__webglTexture;t.bindTexture(j,ve),h(j),t.unbindTexture()}}}const te=[],Q=[];function ne(I){if(I.samples>0){if(Y(I)===!1){const b=I.textures,U=I.width,z=I.height;let ee=n.COLOR_BUFFER_BIT;const j=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(I),ue=b.length>1;if(ue)for(let Ie=0;Ie<b.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const Re=I.texture.mipmaps;Re&&Re.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Ie=0;Ie<b.length;Ie++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[Ie]);const fe=i.get(b[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,fe,0)}n.blitFramebuffer(0,0,U,z,0,0,U,z,ee,n.NEAREST),l===!0&&(te.length=0,Q.length=0,te.push(n.COLOR_ATTACHMENT0+Ie),I.depthBuffer&&I.resolveDepthBuffer===!1&&(te.push(j),Q.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Q)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Ie=0;Ie<b.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,ve.__webglColorRenderbuffer[Ie]);const fe=i.get(b[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,fe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const b=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function se(I){return Math.min(r.maxSamples,I.samples)}function Y(I){const b=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function oe(I){const b=o.render.frame;u.get(I)!==b&&(u.set(I,b),I.update())}function qe(I,b){const U=I.colorSpace,z=I.format,ee=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||U!==yr&&U!==ri&&(et.getTransfer(U)===rt?(z!==fn||ee!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),b}function We(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=F,this.setTexture2DArray=B,this.setTexture3D=$,this.setTextureCube=H,this.rebindTextures=ae,this.setupRenderTarget=P,this.updateRenderTargetMipmap=X,this.updateMultisampleRenderTarget=ne,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Y}function cx(n,e){function t(i,r=ri){let s;const o=et.getTransfer(r);if(i===wn)return n.UNSIGNED_BYTE;if(i===Fc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Oc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ld)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Pd)return n.BYTE;if(i===Id)return n.SHORT;if(i===fs)return n.UNSIGNED_SHORT;if(i===Nc)return n.INT;if(i===Ii)return n.UNSIGNED_INT;if(i===bn)return n.FLOAT;if(i===vs)return n.HALF_FLOAT;if(i===Dd)return n.ALPHA;if(i===Ud)return n.RGB;if(i===fn)return n.RGBA;if(i===ms)return n.DEPTH_COMPONENT;if(i===gs)return n.DEPTH_STENCIL;if(i===Bc)return n.RED;if(i===zc)return n.RED_INTEGER;if(i===Nd)return n.RG;if(i===Hc)return n.RG_INTEGER;if(i===kc)return n.RGBA_INTEGER;if(i===ao||i===co||i===lo||i===uo)if(o===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ao)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===lo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ao)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===co)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===lo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===uo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Wa||i===Xa||i===qa||i===Ya)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Wa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ya)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Za||i===$a||i===Ka)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Za||i===$a)return o===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ka)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ja||i===Ja||i===Qa||i===ec||i===tc||i===nc||i===ic||i===rc||i===sc||i===oc||i===ac||i===cc||i===lc||i===uc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ja)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ja)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qa)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ec)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===tc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ic)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===sc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===oc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ac)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===lc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===uc)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ho||i===dc||i===hc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ho)return o===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===dc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Fd||i===fc||i===pc||i===mc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ho)return s.COMPRESSED_RED_RGTC1_EXT;if(i===fc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ps?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class nh extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const lx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ux=`
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

}`;class dx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new nh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Rn({vertexShader:lx,fragmentShader:ux,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ve(new wo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hx extends Tr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,m=null,g=null;const _=new dx,p={},h=t.getContextAttributes();let S=null,v=null;const x=[],A=[],E=new $e;let C=null;const w=new un;w.viewport=new _t;const M=new un;M.viewport=new _t;const y=[w,M],R=new Lp;let N=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ce=x[W];return ce===void 0&&(ce=new oa,x[W]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(W){let ce=x[W];return ce===void 0&&(ce=new oa,x[W]=ce),ce.getGripSpace()},this.getHand=function(W){let ce=x[W];return ce===void 0&&(ce=new oa,x[W]=ce),ce.getHandSpace()};function D(W){const ce=A.indexOf(W.inputSource);if(ce===-1)return;const le=x[ce];le!==void 0&&(le.update(W.inputSource,W.frame,c||o),le.dispatchEvent({type:W.type,data:W.inputSource}))}function F(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",F),r.removeEventListener("inputsourceschange",B);for(let W=0;W<x.length;W++){const ce=A[W];ce!==null&&(A[W]=null,x[W].disconnect(ce))}N=null,L=null,_.reset();for(const W in p)delete p[W];e.setRenderTarget(S),m=null,f=null,d=null,r=null,v=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",F),r.addEventListener("inputsourceschange",B),h.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(E),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(r,t)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,xe=null,Ae=null;h.depth&&(Ae=h.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=h.stencil?gs:ms,xe=h.stencil?ps:Ii);const q={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};f=d.createProjectionLayer(q),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Li(f.textureWidth,f.textureHeight,{format:fn,type:wn,depthTexture:new $d(f.textureWidth,f.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:h.stencil,colorSpace:e.outputColorSpace,samples:h.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const le={antialias:h.antialias,alpha:!0,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,le),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new Li(m.framebufferWidth,m.framebufferHeight,{format:fn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:h.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ue.setContext(r),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function B(W){for(let ce=0;ce<W.removed.length;ce++){const le=W.removed[ce],xe=A.indexOf(le);xe>=0&&(A[xe]=null,x[xe].disconnect(le))}for(let ce=0;ce<W.added.length;ce++){const le=W.added[ce];let xe=A.indexOf(le);if(xe===-1){for(let q=0;q<x.length;q++)if(q>=A.length){A.push(le),xe=q;break}else if(A[q]===null){A[q]=le,xe=q;break}if(xe===-1)break}const Ae=x[xe];Ae&&Ae.connect(le)}}const $=new k,H=new k;function ie(W,ce,le){$.setFromMatrixPosition(ce.matrixWorld),H.setFromMatrixPosition(le.matrixWorld);const xe=$.distanceTo(H),Ae=ce.projectionMatrix.elements,q=le.projectionMatrix.elements,me=Ae[14]/(Ae[10]-1),ae=Ae[14]/(Ae[10]+1),P=(Ae[9]+1)/Ae[5],X=(Ae[9]-1)/Ae[5],te=(Ae[8]-1)/Ae[0],Q=(q[8]+1)/q[0],ne=me*te,se=me*Q,Y=xe/(-te+Q),oe=Y*-te;if(ce.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(oe),W.translateZ(Y),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Ae[10]===-1)W.projectionMatrix.copy(ce.projectionMatrix),W.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const qe=me+Y,We=ae+Y,I=ne-oe,b=se+(xe-oe),U=P*ae/We*qe,z=X*ae/We*qe;W.projectionMatrix.makePerspective(I,b,U,z,qe,We),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function Z(W,ce){ce===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ce.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let ce=W.near,le=W.far;_.texture!==null&&(_.depthNear>0&&(ce=_.depthNear),_.depthFar>0&&(le=_.depthFar)),R.near=M.near=w.near=ce,R.far=M.far=w.far=le,(N!==R.near||L!==R.far)&&(r.updateRenderState({depthNear:R.near,depthFar:R.far}),N=R.near,L=R.far),R.layers.mask=W.layers.mask|6,w.layers.mask=R.layers.mask&3,M.layers.mask=R.layers.mask&5;const xe=W.parent,Ae=R.cameras;Z(R,xe);for(let q=0;q<Ae.length;q++)Z(Ae[q],xe);Ae.length===2?ie(R,w,M):R.projectionMatrix.copy(w.projectionMatrix),pe(W,R,xe)};function pe(W,ce,le){le===null?W.matrix.copy(ce.matrixWorld):(W.matrix.copy(le.matrixWorld),W.matrix.invert(),W.matrix.multiply(ce.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ce.projectionMatrix),W.projectionMatrixInverse.copy(ce.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=gc*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(R)},this.getCameraTexture=function(W){return p[W]};let Ee=null;function De(W,ce){if(u=ce.getViewerPose(c||o),g=ce,u!==null){const le=u.views;m!==null&&(e.setRenderTargetFramebuffer(v,m.framebuffer),e.setRenderTarget(v));let xe=!1;le.length!==R.cameras.length&&(R.cameras.length=0,xe=!0);for(let ae=0;ae<le.length;ae++){const P=le[ae];let X=null;if(m!==null)X=m.getViewport(P);else{const Q=d.getViewSubImage(f,P);X=Q.viewport,ae===0&&(e.setRenderTargetTextures(v,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(v))}let te=y[ae];te===void 0&&(te=new un,te.layers.enable(ae),te.viewport=new _t,y[ae]=te),te.matrix.fromArray(P.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(P.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(X.x,X.y,X.width,X.height),ae===0&&(R.matrix.copy(te.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),xe===!0&&R.cameras.push(te)}const Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const ae=d.getDepthInformation(le[0]);ae&&ae.isValid&&ae.texture&&_.init(ae,r.renderState)}if(Ae&&Ae.includes("camera-access")&&(e.state.unbindTexture(),d))for(let ae=0;ae<le.length;ae++){const P=le[ae].camera;if(P){let X=p[P];X||(X=new nh,p[P]=X);const te=d.getCameraImage(P);X.sourceTexture=te}}}for(let le=0;le<x.length;le++){const xe=A[le],Ae=x[le];xe!==null&&Ae!==void 0&&Ae.update(xe,ce,c||o)}Ee&&Ee(W,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),g=null}const Ue=new jd;Ue.setAnimationLoop(De),this.setAnimationLoop=function(W){Ee=W},this.dispose=function(){}}}const xi=new Tn,fx=new ct;function px(n,e){function t(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function i(p,h){h.color.getRGB(p.fogColor.value,Wd(n)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function r(p,h,S,v,x){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(p,h):h.isMeshToonMaterial?(s(p,h),d(p,h)):h.isMeshPhongMaterial?(s(p,h),u(p,h)):h.isMeshStandardMaterial?(s(p,h),f(p,h),h.isMeshPhysicalMaterial&&m(p,h,x)):h.isMeshMatcapMaterial?(s(p,h),g(p,h)):h.isMeshDepthMaterial?s(p,h):h.isMeshDistanceMaterial?(s(p,h),_(p,h)):h.isMeshNormalMaterial?s(p,h):h.isLineBasicMaterial?(o(p,h),h.isLineDashedMaterial&&a(p,h)):h.isPointsMaterial?l(p,h,S,v):h.isSpriteMaterial?c(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,t(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===qt&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,t(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===qt&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,t(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,t(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);const S=e.get(h),v=S.envMap,x=S.envMapRotation;v&&(p.envMap.value=v,xi.copy(x),xi.x*=-1,xi.y*=-1,xi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),p.envMapRotation.value.setFromMatrix4(fx.makeRotationFromEuler(xi)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,p.aoMapTransform))}function o(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform))}function a(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function l(p,h,S,v){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*S,p.scale.value=v*.5,h.map&&(p.map.value=h.map,t(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function c(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,t(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,t(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function d(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function f(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,S){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===qt&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function _(p,h){const S=e.get(h).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function mx(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,v){const x=v.program;i.uniformBlockBinding(S,x)}function c(S,v){let x=r[S.id];x===void 0&&(g(S),x=u(S),r[S.id]=x,S.addEventListener("dispose",p));const A=v.program;i.updateUBOMapping(S,A);const E=e.render.frame;s[S.id]!==E&&(f(S),s[S.id]=E)}function u(S){const v=d();S.__bindingPointIndex=v;const x=n.createBuffer(),A=S.__size,E=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,A,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,x),x}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const v=r[S.id],x=S.uniforms,A=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let E=0,C=x.length;E<C;E++){const w=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,y=w.length;M<y;M++){const R=w[M];if(m(R,E,M,A)===!0){const N=R.__offset,L=Array.isArray(R.value)?R.value:[R.value];let D=0;for(let F=0;F<L.length;F++){const B=L[F],$=_(B);typeof B=="number"||typeof B=="boolean"?(R.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,N+D,R.__data)):B.isMatrix3?(R.__data[0]=B.elements[0],R.__data[1]=B.elements[1],R.__data[2]=B.elements[2],R.__data[3]=0,R.__data[4]=B.elements[3],R.__data[5]=B.elements[4],R.__data[6]=B.elements[5],R.__data[7]=0,R.__data[8]=B.elements[6],R.__data[9]=B.elements[7],R.__data[10]=B.elements[8],R.__data[11]=0):(B.toArray(R.__data,D),D+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(S,v,x,A){const E=S.value,C=v+"_"+x;if(A[C]===void 0)return typeof E=="number"||typeof E=="boolean"?A[C]=E:A[C]=E.clone(),!0;{const w=A[C];if(typeof E=="number"||typeof E=="boolean"){if(w!==E)return A[C]=E,!0}else if(w.equals(E)===!1)return w.copy(E),!0}return!1}function g(S){const v=S.uniforms;let x=0;const A=16;for(let C=0,w=v.length;C<w;C++){const M=Array.isArray(v[C])?v[C]:[v[C]];for(let y=0,R=M.length;y<R;y++){const N=M[y],L=Array.isArray(N.value)?N.value:[N.value];for(let D=0,F=L.length;D<F;D++){const B=L[D],$=_(B),H=x%A,ie=H%$.boundary,Z=H+ie;x+=ie,Z!==0&&A-Z<$.storage&&(x+=A-Z),N.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=$.storage}}}const E=x%A;return E>0&&(x+=A-E),S.__size=x,S.__cache={},this}function _(S){const v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function p(S){const v=S.target;v.removeEventListener("dispose",p);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function h(){for(const S in r)n.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}class gx{constructor(e={}){const{canvas:t=Yf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,h=null;const S=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let A=!1;this._outputColorSpace=jt;let E=0,C=0,w=null,M=-1,y=null;const R=new _t,N=new _t;let L=null;const D=new Ge(0);let F=0,B=t.width,$=t.height,H=1,ie=null,Z=null;const pe=new _t(0,0,B,$),Ee=new _t(0,0,B,$);let De=!1;const Ue=new qc;let W=!1,ce=!1;const le=new ct,xe=new k,Ae=new _t,q={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function ae(){return w===null?H:1}let P=i;function X(T,V){return t.getContext(T,V)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uc}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",he,!1),P===null){const V="webgl2";if(P=X(V,T),P===null)throw X(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let te,Q,ne,se,Y,oe,qe,We,I,b,U,z,ee,j,ve,ue,Re,Ie,fe,Me,Ne,Ce,Se,Be;function O(){te=new w0(P),te.init(),Ce=new cx(P,te),Q=new v0(P,te,e,Ce),ne=new ox(P,te),Q.reversedDepthBuffer&&f&&ne.buffers.depth.setReversed(!0),se=new C0(P),Y=new Y_,oe=new ax(P,te,ne,Y,Q,Ce,se),qe=new S0(x),We=new A0(x),I=new Np(P),Se=new _0(P,I),b=new T0(P,I,se,Se),U=new I0(P,b,I,se),fe=new P0(P,Q,oe),ue=new M0(Y),z=new q_(x,qe,We,te,Q,Se,ue),ee=new px(x,Y),j=new $_,ve=new tx(te),Ie=new g0(x,qe,We,ne,U,m,l),Re=new rx(x,U,Q),Be=new mx(P,se,Q,ne),Me=new x0(P,te,se),Ne=new R0(P,te,se),se.programs=z.programs,x.capabilities=Q,x.extensions=te,x.properties=Y,x.renderLists=j,x.shadowMap=Re,x.state=ne,x.info=se}O();const de=new hx(x,P);this.xr=de,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=te.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=te.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(T){T!==void 0&&(H=T,this.setSize(B,$,!1))},this.getSize=function(T){return T.set(B,$)},this.setSize=function(T,V,K=!0){if(de.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=T,$=V,t.width=Math.floor(T*H),t.height=Math.floor(V*H),K===!0&&(t.style.width=T+"px",t.style.height=V+"px"),this.setViewport(0,0,T,V)},this.getDrawingBufferSize=function(T){return T.set(B*H,$*H).floor()},this.setDrawingBufferSize=function(T,V,K){B=T,$=V,H=K,t.width=Math.floor(T*K),t.height=Math.floor(V*K),this.setViewport(0,0,T,V)},this.getCurrentViewport=function(T){return T.copy(R)},this.getViewport=function(T){return T.copy(pe)},this.setViewport=function(T,V,K,J){T.isVector4?pe.set(T.x,T.y,T.z,T.w):pe.set(T,V,K,J),ne.viewport(R.copy(pe).multiplyScalar(H).round())},this.getScissor=function(T){return T.copy(Ee)},this.setScissor=function(T,V,K,J){T.isVector4?Ee.set(T.x,T.y,T.z,T.w):Ee.set(T,V,K,J),ne.scissor(N.copy(Ee).multiplyScalar(H).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(T){ne.setScissorTest(De=T)},this.setOpaqueSort=function(T){ie=T},this.setTransparentSort=function(T){Z=T},this.getClearColor=function(T){return T.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(T=!0,V=!0,K=!0){let J=0;if(T){let G=!1;if(w!==null){const ge=w.texture.format;G=ge===kc||ge===Hc||ge===zc}if(G){const ge=w.texture.type,be=ge===wn||ge===Ii||ge===fs||ge===ps||ge===Fc||ge===Oc,Le=Ie.getClearColor(),Te=Ie.getClearAlpha(),ze=Le.r,ke=Le.g,Fe=Le.b;be?(g[0]=ze,g[1]=ke,g[2]=Fe,g[3]=Te,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=ze,_[1]=ke,_[2]=Fe,_[3]=Te,P.clearBufferiv(P.COLOR,0,_))}else J|=P.COLOR_BUFFER_BIT}V&&(J|=P.DEPTH_BUFFER_BIT),K&&(J|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",he,!1),Ie.dispose(),j.dispose(),ve.dispose(),Y.dispose(),qe.dispose(),We.dispose(),U.dispose(),Se.dispose(),Be.dispose(),z.dispose(),de.dispose(),de.removeEventListener("sessionstart",mn),de.removeEventListener("sessionend",al),di.stop()};function _e(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const T=se.autoReset,V=Re.enabled,K=Re.autoUpdate,J=Re.needsUpdate,G=Re.type;O(),se.autoReset=T,Re.enabled=V,Re.autoUpdate=K,Re.needsUpdate=J,Re.type=G}function he(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function re(T){const V=T.target;V.removeEventListener("dispose",re),Pe(V)}function Pe(T){He(T),Y.remove(T)}function He(T){const V=Y.get(T).programs;V!==void 0&&(V.forEach(function(K){z.releaseProgram(K)}),T.isShaderMaterial&&z.releaseShaderCache(T))}this.renderBufferDirect=function(T,V,K,J,G,ge){V===null&&(V=q);const be=G.isMesh&&G.matrixWorld.determinant()<0,Le=Dh(T,V,K,J,G);ne.setMaterial(J,be);let Te=K.index,ze=1;if(J.wireframe===!0){if(Te=b.getWireframeAttribute(K),Te===void 0)return;ze=2}const ke=K.drawRange,Fe=K.attributes.position;let Ze=ke.start*ze,it=(ke.start+ke.count)*ze;ge!==null&&(Ze=Math.max(Ze,ge.start*ze),it=Math.min(it,(ge.start+ge.count)*ze)),Te!==null?(Ze=Math.max(Ze,0),it=Math.min(it,Te.count)):Fe!=null&&(Ze=Math.max(Ze,0),it=Math.min(it,Fe.count));const mt=it-Ze;if(mt<0||mt===1/0)return;Se.setup(G,J,Le,K,Te);let lt,st=Me;if(Te!==null&&(lt=I.get(Te),st=Ne,st.setIndex(lt)),G.isMesh)J.wireframe===!0?(ne.setLineWidth(J.wireframeLinewidth*ae()),st.setMode(P.LINES)):st.setMode(P.TRIANGLES);else if(G.isLine){let Oe=J.linewidth;Oe===void 0&&(Oe=1),ne.setLineWidth(Oe*ae()),G.isLineSegments?st.setMode(P.LINES):G.isLineLoop?st.setMode(P.LINE_LOOP):st.setMode(P.LINE_STRIP)}else G.isPoints?st.setMode(P.POINTS):G.isSprite&&st.setMode(P.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)fr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Oe=G._multiDrawStarts,ft=G._multiDrawCounts,Je=G._multiDrawCount,Yt=Te?I.get(Te).bytesPerElement:1,Ni=Y.get(J).currentProgram.getUniforms();for(let Zt=0;Zt<Je;Zt++)Ni.setValue(P,"_gl_DrawID",Zt),st.render(Oe[Zt]/Yt,ft[Zt])}else if(G.isInstancedMesh)st.renderInstances(Ze,mt,G.count);else if(K.isInstancedBufferGeometry){const Oe=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ft=Math.min(K.instanceCount,Oe);st.renderInstances(Ze,mt,ft)}else st.render(Ze,mt)};function at(T,V,K){T.transparent===!0&&T.side===yt&&T.forceSinglePass===!1?(T.side=qt,T.needsUpdate=!0,bs(T,V,K),T.side=li,T.needsUpdate=!0,bs(T,V,K),T.side=yt):bs(T,V,K)}this.compile=function(T,V,K=null){K===null&&(K=T),h=ve.get(K),h.init(V),v.push(h),K.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(h.pushLight(G),G.castShadow&&h.pushShadow(G))}),T!==K&&T.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(h.pushLight(G),G.castShadow&&h.pushShadow(G))}),h.setupLights();const J=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let be=0;be<ge.length;be++){const Le=ge[be];at(Le,K,G),J.add(Le)}else at(ge,K,G),J.add(ge)}),h=v.pop(),J},this.compileAsync=function(T,V,K=null){const J=this.compile(T,V,K);return new Promise(G=>{function ge(){if(J.forEach(function(be){Y.get(be).currentProgram.isReady()&&J.delete(be)}),J.size===0){G(T);return}setTimeout(ge,10)}te.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let tt=null;function Cn(T){tt&&tt(T)}function mn(){di.stop()}function al(){di.start()}const di=new jd;di.setAnimationLoop(Cn),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(T){tt=T,de.setAnimationLoop(T),T===null?di.stop():di.start()},de.addEventListener("sessionstart",mn),de.addEventListener("sessionend",al),this.render=function(T,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(V),V=de.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,V,w),h=ve.get(T,v.length),h.init(V),v.push(h),le.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Ue.setFromProjectionMatrix(le,En,V.reversedDepth),ce=this.localClippingEnabled,W=ue.init(this.clippingPlanes,ce),p=j.get(T,S.length),p.init(),S.push(p),de.enabled===!0&&de.isPresenting===!0){const ge=x.xr.getDepthSensingMesh();ge!==null&&Io(ge,V,-1/0,x.sortObjects)}Io(T,V,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(ie,Z),me=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,me&&Ie.addToRenderList(p,T),this.info.render.frame++,W===!0&&ue.beginShadows();const K=h.state.shadowsArray;Re.render(K,T,V),W===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=p.opaque,G=p.transmissive;if(h.setupLights(),V.isArrayCamera){const ge=V.cameras;if(G.length>0)for(let be=0,Le=ge.length;be<Le;be++){const Te=ge[be];ll(J,G,T,Te)}me&&Ie.render(T);for(let be=0,Le=ge.length;be<Le;be++){const Te=ge[be];cl(p,T,Te,Te.viewport)}}else G.length>0&&ll(J,G,T,V),me&&Ie.render(T),cl(p,T,V);w!==null&&C===0&&(oe.updateMultisampleRenderTarget(w),oe.updateRenderTargetMipmap(w)),T.isScene===!0&&T.onAfterRender(x,T,V),Se.resetDefaultState(),M=-1,y=null,v.pop(),v.length>0?(h=v[v.length-1],W===!0&&ue.setGlobalState(x.clippingPlanes,h.state.camera)):h=null,S.pop(),S.length>0?p=S[S.length-1]:p=null};function Io(T,V,K,J){if(T.visible===!1)return;if(T.layers.test(V.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(V);else if(T.isLight)h.pushLight(T),T.castShadow&&h.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ue.intersectsSprite(T)){J&&Ae.setFromMatrixPosition(T.matrixWorld).applyMatrix4(le);const be=U.update(T),Le=T.material;Le.visible&&p.push(T,be,Le,K,Ae.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ue.intersectsObject(T))){const be=U.update(T),Le=T.material;if(J&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ae.copy(T.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ae.copy(be.boundingSphere.center)),Ae.applyMatrix4(T.matrixWorld).applyMatrix4(le)),Array.isArray(Le)){const Te=be.groups;for(let ze=0,ke=Te.length;ze<ke;ze++){const Fe=Te[ze],Ze=Le[Fe.materialIndex];Ze&&Ze.visible&&p.push(T,be,Ze,K,Ae.z,Fe)}}else Le.visible&&p.push(T,be,Le,K,Ae.z,null)}}const ge=T.children;for(let be=0,Le=ge.length;be<Le;be++)Io(ge[be],V,K,J)}function cl(T,V,K,J){const G=T.opaque,ge=T.transmissive,be=T.transparent;h.setupLightsView(K),W===!0&&ue.setGlobalState(x.clippingPlanes,K),J&&ne.viewport(R.copy(J)),G.length>0&&ys(G,V,K),ge.length>0&&ys(ge,V,K),be.length>0&&ys(be,V,K),ne.buffers.depth.setTest(!0),ne.buffers.depth.setMask(!0),ne.buffers.color.setMask(!0),ne.setPolygonOffset(!1)}function ll(T,V,K,J){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[J.id]===void 0&&(h.state.transmissionRenderTarget[J.id]=new Li(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?vs:wn,minFilter:wi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const ge=h.state.transmissionRenderTarget[J.id],be=J.viewport||R;ge.setSize(be.z*x.transmissionResolutionScale,be.w*x.transmissionResolutionScale);const Le=x.getRenderTarget(),Te=x.getActiveCubeFace(),ze=x.getActiveMipmapLevel();x.setRenderTarget(ge),x.getClearColor(D),F=x.getClearAlpha(),F<1&&x.setClearColor(16777215,.5),x.clear(),me&&Ie.render(K);const ke=x.toneMapping;x.toneMapping=ci;const Fe=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),h.setupLightsView(J),W===!0&&ue.setGlobalState(x.clippingPlanes,J),ys(T,K,J),oe.updateMultisampleRenderTarget(ge),oe.updateRenderTargetMipmap(ge),te.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let it=0,mt=V.length;it<mt;it++){const lt=V[it],st=lt.object,Oe=lt.geometry,ft=lt.material,Je=lt.group;if(ft.side===yt&&st.layers.test(J.layers)){const Yt=ft.side;ft.side=qt,ft.needsUpdate=!0,ul(st,K,J,Oe,ft,Je),ft.side=Yt,ft.needsUpdate=!0,Ze=!0}}Ze===!0&&(oe.updateMultisampleRenderTarget(ge),oe.updateRenderTargetMipmap(ge))}x.setRenderTarget(Le,Te,ze),x.setClearColor(D,F),Fe!==void 0&&(J.viewport=Fe),x.toneMapping=ke}function ys(T,V,K){const J=V.isScene===!0?V.overrideMaterial:null;for(let G=0,ge=T.length;G<ge;G++){const be=T[G],Le=be.object,Te=be.geometry,ze=be.group;let ke=be.material;ke.allowOverride===!0&&J!==null&&(ke=J),Le.layers.test(K.layers)&&ul(Le,V,K,Te,ke,ze)}}function ul(T,V,K,J,G,ge){T.onBeforeRender(x,V,K,J,G,ge),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(x,V,K,J,T,ge),G.transparent===!0&&G.side===yt&&G.forceSinglePass===!1?(G.side=qt,G.needsUpdate=!0,x.renderBufferDirect(K,V,J,G,T,ge),G.side=li,G.needsUpdate=!0,x.renderBufferDirect(K,V,J,G,T,ge),G.side=yt):x.renderBufferDirect(K,V,J,G,T,ge),T.onAfterRender(x,V,K,J,G,ge)}function bs(T,V,K){V.isScene!==!0&&(V=q);const J=Y.get(T),G=h.state.lights,ge=h.state.shadowsArray,be=G.state.version,Le=z.getParameters(T,G.state,ge,V,K),Te=z.getProgramCacheKey(Le);let ze=J.programs;J.environment=T.isMeshStandardMaterial?V.environment:null,J.fog=V.fog,J.envMap=(T.isMeshStandardMaterial?We:qe).get(T.envMap||J.environment),J.envMapRotation=J.environment!==null&&T.envMap===null?V.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",re),ze=new Map,J.programs=ze);let ke=ze.get(Te);if(ke!==void 0){if(J.currentProgram===ke&&J.lightsStateVersion===be)return hl(T,Le),ke}else Le.uniforms=z.getUniforms(T),T.onBeforeCompile(Le,x),ke=z.acquireProgram(Le,Te),ze.set(Te,ke),J.uniforms=Le.uniforms;const Fe=J.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=ue.uniform),hl(T,Le),J.needsLights=Nh(T),J.lightsStateVersion=be,J.needsLights&&(Fe.ambientLightColor.value=G.state.ambient,Fe.lightProbe.value=G.state.probe,Fe.directionalLights.value=G.state.directional,Fe.directionalLightShadows.value=G.state.directionalShadow,Fe.spotLights.value=G.state.spot,Fe.spotLightShadows.value=G.state.spotShadow,Fe.rectAreaLights.value=G.state.rectArea,Fe.ltc_1.value=G.state.rectAreaLTC1,Fe.ltc_2.value=G.state.rectAreaLTC2,Fe.pointLights.value=G.state.point,Fe.pointLightShadows.value=G.state.pointShadow,Fe.hemisphereLights.value=G.state.hemi,Fe.directionalShadowMap.value=G.state.directionalShadowMap,Fe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Fe.spotShadowMap.value=G.state.spotShadowMap,Fe.spotLightMatrix.value=G.state.spotLightMatrix,Fe.spotLightMap.value=G.state.spotLightMap,Fe.pointShadowMap.value=G.state.pointShadowMap,Fe.pointShadowMatrix.value=G.state.pointShadowMatrix),J.currentProgram=ke,J.uniformsList=null,ke}function dl(T){if(T.uniformsList===null){const V=T.currentProgram.getUniforms();T.uniformsList=fo.seqWithValue(V.seq,T.uniforms)}return T.uniformsList}function hl(T,V){const K=Y.get(T);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.batchingColor=V.batchingColor,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.instancingMorph=V.instancingMorph,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}function Dh(T,V,K,J,G){V.isScene!==!0&&(V=q),oe.resetTextureUnits();const ge=V.fog,be=J.isMeshStandardMaterial?V.environment:null,Le=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:yr,Te=(J.isMeshStandardMaterial?We:qe).get(J.envMap||be),ze=J.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ke=!!K.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Fe=!!K.morphAttributes.position,Ze=!!K.morphAttributes.normal,it=!!K.morphAttributes.color;let mt=ci;J.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(mt=x.toneMapping);const lt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,st=lt!==void 0?lt.length:0,Oe=Y.get(J),ft=h.state.lights;if(W===!0&&(ce===!0||T!==y)){const Dt=T===y&&J.id===M;ue.setState(J,T,Dt)}let Je=!1;J.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==ft.state.version||Oe.outputColorSpace!==Le||G.isBatchedMesh&&Oe.batching===!1||!G.isBatchedMesh&&Oe.batching===!0||G.isBatchedMesh&&Oe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Oe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Oe.instancing===!1||!G.isInstancedMesh&&Oe.instancing===!0||G.isSkinnedMesh&&Oe.skinning===!1||!G.isSkinnedMesh&&Oe.skinning===!0||G.isInstancedMesh&&Oe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Oe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Oe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Oe.instancingMorph===!1&&G.morphTexture!==null||Oe.envMap!==Te||J.fog===!0&&Oe.fog!==ge||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ue.numPlanes||Oe.numIntersection!==ue.numIntersection)||Oe.vertexAlphas!==ze||Oe.vertexTangents!==ke||Oe.morphTargets!==Fe||Oe.morphNormals!==Ze||Oe.morphColors!==it||Oe.toneMapping!==mt||Oe.morphTargetsCount!==st)&&(Je=!0):(Je=!0,Oe.__version=J.version);let Yt=Oe.currentProgram;Je===!0&&(Yt=bs(J,V,G));let Ni=!1,Zt=!1,Dr=!1;const pt=Yt.getUniforms(),en=Oe.uniforms;if(ne.useProgram(Yt.program)&&(Ni=!0,Zt=!0,Dr=!0),J.id!==M&&(M=J.id,Zt=!0),Ni||y!==T){ne.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),pt.setValue(P,"projectionMatrix",T.projectionMatrix),pt.setValue(P,"viewMatrix",T.matrixWorldInverse);const zt=pt.map.cameraPosition;zt!==void 0&&zt.setValue(P,xe.setFromMatrixPosition(T.matrixWorld)),Q.logarithmicDepthBuffer&&pt.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&pt.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Zt=!0,Dr=!0)}if(G.isSkinnedMesh){pt.setOptional(P,G,"bindMatrix"),pt.setOptional(P,G,"bindMatrixInverse");const Dt=G.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),pt.setValue(P,"boneTexture",Dt.boneTexture,oe))}G.isBatchedMesh&&(pt.setOptional(P,G,"batchingTexture"),pt.setValue(P,"batchingTexture",G._matricesTexture,oe),pt.setOptional(P,G,"batchingIdTexture"),pt.setValue(P,"batchingIdTexture",G._indirectTexture,oe),pt.setOptional(P,G,"batchingColorTexture"),G._colorsTexture!==null&&pt.setValue(P,"batchingColorTexture",G._colorsTexture,oe));const tn=K.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&fe.update(G,K,Yt),(Zt||Oe.receiveShadow!==G.receiveShadow)&&(Oe.receiveShadow=G.receiveShadow,pt.setValue(P,"receiveShadow",G.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(en.envMap.value=Te,en.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&V.environment!==null&&(en.envMapIntensity.value=V.environmentIntensity),Zt&&(pt.setValue(P,"toneMappingExposure",x.toneMappingExposure),Oe.needsLights&&Uh(en,Dr),ge&&J.fog===!0&&ee.refreshFogUniforms(en,ge),ee.refreshMaterialUniforms(en,J,H,$,h.state.transmissionRenderTarget[T.id]),fo.upload(P,dl(Oe),en,oe)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(fo.upload(P,dl(Oe),en,oe),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&pt.setValue(P,"center",G.center),pt.setValue(P,"modelViewMatrix",G.modelViewMatrix),pt.setValue(P,"normalMatrix",G.normalMatrix),pt.setValue(P,"modelMatrix",G.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Dt=J.uniformsGroups;for(let zt=0,Lo=Dt.length;zt<Lo;zt++){const hi=Dt[zt];Be.update(hi,Yt),Be.bind(hi,Yt)}}return Yt}function Uh(T,V){T.ambientLightColor.needsUpdate=V,T.lightProbe.needsUpdate=V,T.directionalLights.needsUpdate=V,T.directionalLightShadows.needsUpdate=V,T.pointLights.needsUpdate=V,T.pointLightShadows.needsUpdate=V,T.spotLights.needsUpdate=V,T.spotLightShadows.needsUpdate=V,T.rectAreaLights.needsUpdate=V,T.hemisphereLights.needsUpdate=V}function Nh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(T,V,K){const J=Y.get(T);J.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Y.get(T.texture).__webglTexture=V,Y.get(T.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:K,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,V){const K=Y.get(T);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0};const Fh=P.createFramebuffer();this.setRenderTarget=function(T,V=0,K=0){w=T,E=V,C=K;let J=!0,G=null,ge=!1,be=!1;if(T){const Te=Y.get(T);if(Te.__useDefaultFramebuffer!==void 0)ne.bindFramebuffer(P.FRAMEBUFFER,null),J=!1;else if(Te.__webglFramebuffer===void 0)oe.setupRenderTarget(T);else if(Te.__hasExternalTextures)oe.rebindTextures(T,Y.get(T.texture).__webglTexture,Y.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Fe=T.depthTexture;if(Te.__boundDepthTexture!==Fe){if(Fe!==null&&Y.has(Fe)&&(T.width!==Fe.image.width||T.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");oe.setupDepthRenderbuffer(T)}}const ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(be=!0);const ke=Y.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[V])?G=ke[V][K]:G=ke[V],ge=!0):T.samples>0&&oe.useMultisampledRTT(T)===!1?G=Y.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?G=ke[K]:G=ke,R.copy(T.viewport),N.copy(T.scissor),L=T.scissorTest}else R.copy(pe).multiplyScalar(H).floor(),N.copy(Ee).multiplyScalar(H).floor(),L=De;if(K!==0&&(G=Fh),ne.bindFramebuffer(P.FRAMEBUFFER,G)&&J&&ne.drawBuffers(T,G),ne.viewport(R),ne.scissor(N),ne.setScissorTest(L),ge){const Te=Y.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+V,Te.__webglTexture,K)}else if(be){const Te=V;for(let ze=0;ze<T.textures.length;ze++){const ke=Y.get(T.textures[ze]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+ze,ke.__webglTexture,K,Te)}}else if(T!==null&&K!==0){const Te=Y.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Te.__webglTexture,K)}M=-1},this.readRenderTargetPixels=function(T,V,K,J,G,ge,be,Le=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Y.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){ne.bindFramebuffer(P.FRAMEBUFFER,Te);try{const ze=T.textures[Le],ke=ze.format,Fe=ze.type;if(!Q.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=T.width-J&&K>=0&&K<=T.height-G&&(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Le),P.readPixels(V,K,J,G,Ce.convert(ke),Ce.convert(Fe),ge))}finally{const ze=w!==null?Y.get(w).__webglFramebuffer:null;ne.bindFramebuffer(P.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(T,V,K,J,G,ge,be,Le=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=Y.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te)if(V>=0&&V<=T.width-J&&K>=0&&K<=T.height-G){ne.bindFramebuffer(P.FRAMEBUFFER,Te);const ze=T.textures[Le],ke=ze.format,Fe=ze.type;if(!Q.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ze),P.bufferData(P.PIXEL_PACK_BUFFER,ge.byteLength,P.STREAM_READ),T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Le),P.readPixels(V,K,J,G,Ce.convert(ke),Ce.convert(Fe),0);const it=w!==null?Y.get(w).__webglFramebuffer:null;ne.bindFramebuffer(P.FRAMEBUFFER,it);const mt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Zf(P,mt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ze),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ge),P.deleteBuffer(Ze),P.deleteSync(mt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,V=null,K=0){const J=Math.pow(2,-K),G=Math.floor(T.image.width*J),ge=Math.floor(T.image.height*J),be=V!==null?V.x:0,Le=V!==null?V.y:0;oe.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,K,0,0,be,Le,G,ge),ne.unbindTexture()};const Oh=P.createFramebuffer(),Bh=P.createFramebuffer();this.copyTextureToTexture=function(T,V,K=null,J=null,G=0,ge=null){ge===null&&(G!==0?(fr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ge=G,G=0):ge=0);let be,Le,Te,ze,ke,Fe,Ze,it,mt;const lt=T.isCompressedTexture?T.mipmaps[ge]:T.image;if(K!==null)be=K.max.x-K.min.x,Le=K.max.y-K.min.y,Te=K.isBox3?K.max.z-K.min.z:1,ze=K.min.x,ke=K.min.y,Fe=K.isBox3?K.min.z:0;else{const tn=Math.pow(2,-G);be=Math.floor(lt.width*tn),Le=Math.floor(lt.height*tn),T.isDataArrayTexture?Te=lt.depth:T.isData3DTexture?Te=Math.floor(lt.depth*tn):Te=1,ze=0,ke=0,Fe=0}J!==null?(Ze=J.x,it=J.y,mt=J.z):(Ze=0,it=0,mt=0);const st=Ce.convert(V.format),Oe=Ce.convert(V.type);let ft;V.isData3DTexture?(oe.setTexture3D(V,0),ft=P.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(oe.setTexture2DArray(V,0),ft=P.TEXTURE_2D_ARRAY):(oe.setTexture2D(V,0),ft=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment);const Je=P.getParameter(P.UNPACK_ROW_LENGTH),Yt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ni=P.getParameter(P.UNPACK_SKIP_PIXELS),Zt=P.getParameter(P.UNPACK_SKIP_ROWS),Dr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,lt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,lt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ze),P.pixelStorei(P.UNPACK_SKIP_ROWS,ke),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Fe);const pt=T.isDataArrayTexture||T.isData3DTexture,en=V.isDataArrayTexture||V.isData3DTexture;if(T.isDepthTexture){const tn=Y.get(T),Dt=Y.get(V),zt=Y.get(tn.__renderTarget),Lo=Y.get(Dt.__renderTarget);ne.bindFramebuffer(P.READ_FRAMEBUFFER,zt.__webglFramebuffer),ne.bindFramebuffer(P.DRAW_FRAMEBUFFER,Lo.__webglFramebuffer);for(let hi=0;hi<Te;hi++)pt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Y.get(T).__webglTexture,G,Fe+hi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Y.get(V).__webglTexture,ge,mt+hi)),P.blitFramebuffer(ze,ke,be,Le,Ze,it,be,Le,P.DEPTH_BUFFER_BIT,P.NEAREST);ne.bindFramebuffer(P.READ_FRAMEBUFFER,null),ne.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||Y.has(T)){const tn=Y.get(T),Dt=Y.get(V);ne.bindFramebuffer(P.READ_FRAMEBUFFER,Oh),ne.bindFramebuffer(P.DRAW_FRAMEBUFFER,Bh);for(let zt=0;zt<Te;zt++)pt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,tn.__webglTexture,G,Fe+zt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,tn.__webglTexture,G),en?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Dt.__webglTexture,ge,mt+zt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Dt.__webglTexture,ge),G!==0?P.blitFramebuffer(ze,ke,be,Le,Ze,it,be,Le,P.COLOR_BUFFER_BIT,P.NEAREST):en?P.copyTexSubImage3D(ft,ge,Ze,it,mt+zt,ze,ke,be,Le):P.copyTexSubImage2D(ft,ge,Ze,it,ze,ke,be,Le);ne.bindFramebuffer(P.READ_FRAMEBUFFER,null),ne.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else en?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(ft,ge,Ze,it,mt,be,Le,Te,st,Oe,lt.data):V.isCompressedArrayTexture?P.compressedTexSubImage3D(ft,ge,Ze,it,mt,be,Le,Te,st,lt.data):P.texSubImage3D(ft,ge,Ze,it,mt,be,Le,Te,st,Oe,lt):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ge,Ze,it,be,Le,st,Oe,lt.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ge,Ze,it,lt.width,lt.height,st,lt.data):P.texSubImage2D(P.TEXTURE_2D,ge,Ze,it,be,Le,st,Oe,lt);P.pixelStorei(P.UNPACK_ROW_LENGTH,Je),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Yt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ni),P.pixelStorei(P.UNPACK_SKIP_ROWS,Zt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Dr),ge===0&&V.generateMipmaps&&P.generateMipmap(ft),ne.unbindTexture()},this.copyTextureToTexture3D=function(T,V,K=null,J=null,G=0){return fr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,V,K,J,G)},this.initRenderTarget=function(T){Y.get(T).__webglFramebuffer===void 0&&oe.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?oe.setTextureCube(T,0):T.isData3DTexture?oe.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?oe.setTexture2DArray(T,0):oe.setTexture2D(T,0),ne.unbindTexture()},this.resetState=function(){E=0,C=0,w=null,ne.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Gr={enterDwell:.35,exitRadius:18,maxEntrySpeed:4,manualIntentWindow:4};function yu(){return{islandId:null,selectedHarbourId:null,nearbyHarbourId:null,dwellSeconds:0,manualIntentAge:1/0,suppressed:!1}}function bu(n){return{...n,manualIntentAge:0}}function _x(n){return{...n,islandId:null,nearbyHarbourId:null,dwellSeconds:0,manualIntentAge:1/0,suppressed:!0}}function Mc(n){return{...n,islandId:null,nearbyHarbourId:null,dwellSeconds:0,manualIntentAge:1/0,suppressed:!1}}function xx(n,e,t){const i=t.find(r=>r.id===e);return!i||n.islandId&&i.islandId!==n.islandId?n:{...n,selectedHarbourId:e}}function vx(n,e,t,i){if(!Number.isFinite(e.deltaSeconds)||e.deltaSeconds<=0)return n;if(e.scannerActive)return Mc(n);if(!Number.isFinite(e.position.x)||!Number.isFinite(e.position.z)||!Number.isFinite(e.speed)||e.speed<0)return{...n,dwellSeconds:0};const r=t.find(f=>f.id==="island-projects");if(!r||!i.some(f=>f.islandId===r.id))return Mc(n);const s=Math.hypot(e.position.x-r.position.x,e.position.z-r.position.z),o=e.manualIntent?0:n.manualIntentAge+e.deltaSeconds,a=n.suppressed&&s<=Gr.exitRadius;let l=n.islandId,c=n.selectedHarbourId,u=0;s>Gr.exitRadius&&(l=null),!l&&!a&&s<=r.dockingTriggerRadius&&e.speed<=Gr.maxEntrySpeed&&o<=Gr.manualIntentWindow&&(u=n.dwellSeconds+e.deltaSeconds,u+1e-9>=Gr.enterDwell&&(l=r.id,i.some(f=>f.id===c&&f.islandId===r.id)||(c=i.find(f=>f.islandId===r.id).id)));let d=null;if(l)for(const f of i){if(f.islandId!==l)continue;const m=hs(f,t);if(Math.hypot(e.position.x-m.x,e.position.z-m.z)<=f.captureRadius){d=f.id;break}}return{islandId:l,selectedHarbourId:c,nearbyHarbourId:d,dwellSeconds:u,manualIntentAge:o,suppressed:a}}const Ft={centerX:0,centerZ:0,calmRadius:142,fullRadius:172,worldLimit:220,maxWaveScale:1.4};function Eu(n,e){return Number.isFinite(n)?n:e}function Mx(n,e,t){return Math.min(t,Math.max(e,n))}function Ro(n,e){const t=Eu(n,Ft.centerX)-Ft.centerX,i=Eu(e,Ft.centerZ)-Ft.centerZ,r=Math.hypot(t,i),s=Math.max(r,1e-9),o=t/s,a=i/s,l=-o,c=-a,u=Ft.fullRadius-Ft.calmRadius,d=Mx((r-Ft.calmRadius)/u,0,1),f=d*d*(3-2*d),m=d>0&&d<1?6*d*(1-d)/u:0;return{intensity:f,inwardX:l,inwardZ:c,gradientX:o*m,gradientZ:a*m}}const Sc=5370206;function Js(n,e,t){let i=Math.imul(n|0,521288629)^Math.imul(e|0,1597334677)^Math.imul(t|0,668265261);return i=Math.imul(i^i>>>15,2246822507),i=Math.imul(i^i>>>13,3266489909),i^=i>>>16,(i>>>0)/4294967295*2-1}function Au(n){return n*n*n*(n*(n*6-15)+10)}function wu(n){return 30*n*n*(n*(n-2)+1)}function Qs(n,e,t=Sc,i){const r=Number.isFinite(n)?n:0,s=Number.isFinite(e)?e:0,o=Number.isFinite(t)?t:Sc,a=Math.floor(r),l=Math.floor(s),c=r-a,u=s-l,d=Au(c),f=Au(u),m=wu(c),g=wu(u),_=Js(a,l,o),p=Js(a+1,l,o),h=Js(a,l+1,o),S=Js(a+1,l+1,o),v=_+(p-_)*d,x=h+(S-h)*d,A=i??{value:0,derivativeU:0,derivativeV:0};return A.value=v+(x-v)*f,A.derivativeU=(p-_+(S-h-(p-_))*f)*m,A.derivativeV=(x-v)*g,A}const Nt={amplitude:.84,waveNumber:Math.PI*2/30,directionX:.92,directionZ:.39,angularSpeed:Math.PI*2/5.8,phase:0,kind:"sine",phaseWarp:3.2,amplitudeVariation:.06},Sx={amplitude:.4,waveNumber:Math.PI*2/24,directionX:-.38,directionZ:.925,angularSpeed:Math.PI*2/4.6,phase:0,kind:"cosine",phaseWarp:2.4,amplitudeVariation:-.08},So=[Nt,Sx,{amplitude:.24,waveNumber:Math.PI*2/34,directionX:.74,directionZ:-.673,angularSpeed:Math.PI*2/6.8,phase:0,kind:"sine",phaseWarp:-2.3,amplitudeVariation:-.04},{amplitude:.06,waveNumber:Math.PI*2/11,directionX:.707,directionZ:.707,angularSpeed:Math.PI*2/3.5,phase:0,kind:"cosine",phaseWarp:1.1,amplitudeVariation:-.01},{amplitude:.11,waveNumber:Math.PI*2/52,directionX:.58,directionZ:-.815,angularSpeed:Math.PI*2/8.7,phase:1.7,kind:"sine",phaseWarp:.42,amplitudeVariation:.03},{amplitude:.07,waveNumber:Math.PI*2/67,directionX:-.7,directionZ:-.714,angularSpeed:Math.PI*2/10.9,phase:-.8,kind:"cosine",phaseWarp:-.31,amplitudeVariation:.02},{amplitude:.05,waveNumber:Math.PI*2/19,directionX:.22,directionZ:.975,angularSpeed:Math.PI*2/4.1,phase:2.3,kind:"sine",phaseWarp:.27,amplitudeVariation:.01},{amplitude:.03,waveNumber:Math.PI*2/43,directionX:-.91,directionZ:.414,angularSpeed:Math.PI*2/7.6,phase:-2.1,kind:"cosine",phaseWarp:.2,amplitudeVariation:.01}],Qe={seed:Sc,phaseLength:44,phaseWidth:27,phaseSpeed:5.1,packetLength:72,packetWidth:48,packetSpeed:4.6,detailLength:23,detailWidth:41,detailSpeed:3.35,macroLength:137,macroWidth:91,macroSpeed:1.7},yo=1.8,is={value:0,derivativeU:0,derivativeV:0},rs={value:0,derivativeU:0,derivativeV:0},xn={value:0,derivativeU:0,derivativeV:0},vn={value:0,derivativeU:0,derivativeV:0},Kr=[1.2,-2.1,1.8,-.9,1.1,-.8,.9,-1.3],jr=[.9,1.1,-.8,.5,-.9,1.2,-.6,.7],Jr=[.11,-.07,-.025,-.025,.025,.018,-.022,-.011],Qr=[.07,-.045,-.015,-.01,-.014,.012,.008,-.006];function mr(n,e){return Number.isFinite(n)?n:e}function ih(n,e,t,i){Qs((n+t*Qe.phaseSpeed)/Qe.phaseLength+2.731,e/Qe.phaseWidth-4.193,i,is),Qs((n+t*Qe.packetSpeed)/Qe.packetLength-7.217,e/Qe.packetWidth+9.431,i^1779033703,rs),Qs((n*.81-e*.59+t*Qe.detailSpeed)/Qe.detailLength+5.173,(n*.59+e*.81)/Qe.detailWidth-2.647,i^3144134277,xn),Qs((n*.93+e*.37+t*Qe.macroSpeed)/Qe.macroLength-8.319,(-n*.37+e*.93)/Qe.macroWidth+1.427,i^1013904242,vn)}function Lt(n,e,t=0,i=Qe.seed){const r=mr(n,0),s=mr(e,0),o=mr(t,0);ih(r,s,o,i);let a=0;for(let c=0;c<So.length;c+=1){const u=So[c],d=(r*u.directionX+s*u.directionZ)*u.waveNumber+o*u.angularSpeed+u.phase+u.phaseWarp*is.value+Kr[c]*xn.value+jr[c]*vn.value,f=u.amplitude+u.amplitudeVariation*rs.value+Jr[c]*xn.value+Qr[c]*vn.value;a+=f*(u.kind==="sine"?Math.sin(d):Math.cos(d))}const l=Ro(r,s).intensity;return a*(1+l*(Ft.maxWaveScale-1))}function gr(n,e,t=0,i=0,r=Qe.seed){const s=mr(n,0),o=mr(e,0),a=mr(t,0);ih(s,o,a,r);const l=is.derivativeU/Qe.phaseLength,c=is.derivativeV/Qe.phaseWidth,u=l*Qe.phaseSpeed,d=rs.derivativeU/Qe.packetLength,f=rs.derivativeV/Qe.packetWidth,m=d*Qe.packetSpeed,g=xn.derivativeU*.81/Qe.detailLength+xn.derivativeV*.59/Qe.detailWidth,_=xn.derivativeU*-.59/Qe.detailLength+xn.derivativeV*.81/Qe.detailWidth,p=xn.derivativeU*Qe.detailSpeed/Qe.detailLength,h=vn.derivativeU*.93/Qe.macroLength+vn.derivativeV*-.37/Qe.macroWidth,S=vn.derivativeU*.37/Qe.macroLength+vn.derivativeV*.93/Qe.macroWidth,v=vn.derivativeU*Qe.macroSpeed/Qe.macroLength;let x=0,A=0,E=0,C=0;for(let R=0;R<So.length;R+=1){const N=So[R],L=(s*N.directionX+o*N.directionZ)*N.waveNumber+a*N.angularSpeed+N.phase+N.phaseWarp*is.value+Kr[R]*xn.value+jr[R]*vn.value,D=Math.sin(L),F=Math.cos(L),B=N.kind==="sine"?D:F,$=N.kind==="sine"?F:-D,H=N.amplitude+N.amplitudeVariation*rs.value+Jr[R]*xn.value+Qr[R]*vn.value,ie=N.amplitudeVariation*d+Jr[R]*g+Qr[R]*h,Z=N.amplitudeVariation*f+Jr[R]*_+Qr[R]*S,pe=N.amplitudeVariation*m+Jr[R]*p+Qr[R]*v;x+=H*B,A+=ie*B+H*$*(N.waveNumber*N.directionX+N.phaseWarp*l+Kr[R]*g+jr[R]*h),E+=Z*B+H*$*(N.waveNumber*N.directionZ+N.phaseWarp*c+Kr[R]*_+jr[R]*S),C+=pe*B+H*$*(N.angularSpeed+N.phaseWarp*u+Kr[R]*p+jr[R]*v)}const w=Ro(s,o),M=Ft.maxWaveScale-1,y=1+w.intensity*M;if(A=A*y+x*M*w.gradientX,E=E*y+x*M*w.gradientZ,C*=y,x*=y,Number.isFinite(i)&&i>0){const R=Math.max(1e-4,i);A=(Lt(s+R,o,a,r)-Lt(s-R,o,a,r))/(2*R),E=(Lt(s,o+R,a,r)-Lt(s,o-R,a,r))/(2*R)}return{height:x,slopeX:A,slopeZ:E,velocityY:C,stormIntensity:w.intensity}}const ln={centralLimit:180,outerLimit:360,centralStep:4,outerStep:12};function rh(){const n=[];for(let e=-360;e<-180;e+=ln.outerStep)n.push(e);for(let e=-180;e<=ln.centralLimit;e+=ln.centralStep)n.push(e);for(let e=ln.centralLimit+ln.outerStep;e<=ln.outerLimit;e+=ln.outerStep)n.push(e);return n}function Tu(n,e,t){return Math.min(t,Math.max(e,n))}function Ru(n,e){return Number.isFinite(n)?n:e}function Cu(n,e){let t=0,i=n.length-1;for(;i-t>1;){const r=Math.floor((t+i)*.5);n[r]<=e?t=r:i=r}return t}const yx=rh();function sh(n,e){let t=Math.imul((e|0)^2135587861,73244475);return t=Math.imul(t^((n|0)^1779033703),73244475),t^=t>>>16,t=Math.imul(t,73244475),t^=t>>>16,(t&1)===0}function Gn(n,e,t=0){return oh(n,e,t)}function _s(n,e,t){return oh(n,e,0,t)}function oh(n,e,t,i){const r=yx,s=Tu(Ru(n,0),-360,ln.outerLimit),o=Tu(Ru(e,0),-360,ln.outerLimit),a=Cu(r,o),l=Cu(r,s),c=r[l],u=r[l+1],d=r[a],f=r[a+1],m=u>c?(s-c)/(u-c):0,g=f>d?(o-d)/(f-d):0,_=a*r.length+l,p=i?i[_*3+1]:Lt(c,d,t),h=i?i[(_+1)*3+1]:Lt(u,d,t),S=i?i[(_+r.length)*3+1]:Lt(c,f,t),v=i?i[(_+r.length+1)*3+1]:Lt(u,f,t);return sh(a,l)?m+g<=1?p+g*(S-p)+m*(h-p):v+(1-m)*(S-v)+(1-g)*(h-v):g>=m?p+g*(S-p)+m*(v-S):p+g*(v-h)+m*(h-p)}const eo=32,Pu=.12;function bx(n,e,t){const i=e.map(h=>({harbour:h,centre:hs(h,t)})).filter(h=>h.centre!==null),r=new Float32Array(i.length*eo*2*3),s=new Float32Array(r.length),o=new ht,a=new nt(r,3).setUsage(Ot),l=new nt(s,3).setUsage(Ot);o.setAttribute("position",a),o.setAttribute("color",l);const c=new Yc({vertexColors:!0,transparent:!0,opacity:.88,depthWrite:!1}),u=new Ap(o,c);u.frustumCulled=!1;const d=new Vn;d.name="shipyard-local-harbour-markers",d.visible=!1,d.add(u),n.add(d);const f=i.map(({harbour:h,centre:S})=>({id:h.id,position:new k(S.x,0,S.z)})),m=new Ge(16771256),g=new Ge(15773059),_=new Ge(11131091);let p=!1;return{group:d,anchors:f,update(h,S){if(!p&&(d.visible=i.length>0&&h.islandId!==null,!!d.visible)){for(let v=0;v<i.length;v+=1){const{harbour:x,centre:A}=i[v],E=h.nearbyHarbourId===x.id?m:h.selectedHarbourId===x.id?g:_;for(let w=0;w<eo;w+=1)for(let M=0;M<2;M+=1){const y=v*eo*2+w*2+M,R=(w+M)/eo*Math.PI*2,N=A.x+Math.sin(R)*x.captureRadius,L=A.z+Math.cos(R)*x.captureRadius,D=_s(N,L,S);a.setXYZ(y,N,(Number.isFinite(D)?D:0)+Pu,L),l.setXYZ(y,E.r,E.g,E.b)}const C=_s(A.x,A.z,S);f[v].position.y=(Number.isFinite(C)?C:0)+Pu}a.needsUpdate=!0,l.needsUpdate=!0}},dispose(){p||(p=!0,d.removeFromParent(),o.dispose(),c.dispose())}}}const Iu={velocityX:-9,velocityZ:0};function cr(n,e){return Number.isFinite(n)?n:e}function Er(n=0){const e=cr(Iu.velocityX,0),t=cr(Iu.velocityZ,0);return{x:e,z:t,speed:Math.hypot(e,t)}}function Qc(n,e,t){const i=cr(n?.x??0,0)-cr(e,0),r=cr(n?.z??0,0)-cr(t,0);return{x:i,z:r,speed:Math.hypot(i,r)}}const ot={minAngle:8*Math.PI/180,maxAngle:85*Math.PI/180,defaultAngle:85*Math.PI/180,trimRate:25*Math.PI/180,noGoAngle:40*Math.PI/180,trueWindNoGoSoftness:8*Math.PI/180,maxDriveAcceleration:5.8,maxLateralAcceleration:1.6,sailingMaxYawRate:1.1,stallYawRate:.55,manualBoostFraction:.45};function ga(n,e){return Number.isFinite(n)?n:e}function vi(n,e,t){return Math.min(t,Math.max(e,n))}function Lu(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function pn(n,e=ot.defaultAngle,t=0){const i=ga(n?.heading??0,0),r=Qc(Er(),n?.velocityX??0,n?.velocityZ??0),s=r.speed,o=s>1e-7?-r.x/s:0,a=s>1e-7?-r.z/s:1,l=Math.sin(i),c=Math.cos(i),u=l,d=c,f=c,m=-l,g=o*f+a*m,_=o*u+a*d,p=Math.atan2(g,_),h=Math.sign(p)||1,S=Math.abs(p),v=Er(),x=v.speed||1,A=-v.x/x,E=-v.z/x,C=A*f+E*m,w=A*u+E*d,M=Math.abs(Math.atan2(C,w)),y=ot.noGoAngle-ot.trueWindNoGoSoftness,R=Math.min(M,S),N=R<ot.noGoAngle,L=vi(ga(e,ot.defaultAngle),ot.minAngle,ot.maxAngle),D=vi(S*.5,ot.minAngle,ot.maxAngle),F=Math.abs(L-D),B=Math.max(0,1-F/(35*Math.PI/180)),$=.35+.65*Math.sin(vi(S,0,Math.PI)),H=vi((R-y)/(2*ot.trueWindNoGoSoftness),0,1),ie=H*H*(3-2*H),Z=vi(s/9,0,1.35),pe=vi(1-Math.max(0,ga(t,0)),0,1),Ee=vi(B*$*Z*pe*ie,0,1),De=h*L,Ue=Ee*ot.maxDriveAcceleration,W=N?0:-h*Ee*ot.maxLateralAcceleration*.5;return{driveAcceleration:Ue,lateralAcceleration:W,power:Ee,suggestedAngle:D,signedAngle:Lu(De),relativeWindAngle:Lu(p),noGo:N}}const gn={targetEfficiency:.75,assistRate:25*Math.PI/180,boostMinSpeed:1.5,boostStableSeconds:.35,boostDurationSeconds:1.4,boostCooldownSeconds:5,sweetSpotEnter:.9,sweetSpotExit:.78};function Bn(n,e){return Number.isFinite(n)?n:e}function es(n,e,t){return Math.min(t,Math.max(e,n))}function Ex(n,e,t){return n<e?Math.min(n+t,e):Math.max(n-t,e)}function ss(n){return es(Bn(n,ot.defaultAngle),ot.minAngle,ot.maxAngle)}function ah(n){const e=pn(n,ot.defaultAngle).suggestedAngle,t=pn(n,e);return{idealAngle:ss(e),peak:t.power}}function Ax(n){const e=ah(n);if(e.peak<=1e-6)return{angle:ss(e.idealAngle),efficiency:0};const t=e.peak*gn.targetEfficiency;let i=e.idealAngle,r=ot.maxAngle;const s=pn(n,r).power<=t;s||(i=ot.minAngle,r=e.idealAngle);for(let l=0;l<8;l+=1){const c=(i+r)*.5,u=pn(n,c).power;s?u>t?i=c:r=c:u>t?r=c:i=c}const o=(i+r)*.5,a=pn(n,o).power;return{angle:o,efficiency:a/e.peak}}function Du(){return{sailAngle:ot.defaultAngle,mode:"auto",engaged:!1,efficiency:0,sweetSpot:!1,boost:0,boostSerial:0,stableSeconds:0,cooldownSeconds:0,boostArmed:!0}}function Qn(n){return{...n,boost:0,sweetSpot:!1,stableSeconds:0,cooldownSeconds:Math.max(Bn(n?.cooldownSeconds??0,0),gn.boostCooldownSeconds),boostArmed:!1}}function Uu(n,e,t,i){const r=Number.isFinite(i)&&i>0?Math.min(i,.25):0,s=es(Bn(t?.sheet??0,0),-1,1),o=Math.abs(s)>1e-4;let a=n?.mode==="manual"?"manual":"auto",l=n?.engaged===!0,c=ss(n?.sailAngle??ot.defaultAngle),u=Math.max(0,Bn(n?.cooldownSeconds??0,0)-r),d=es(Bn(n?.boost??0,0),0,1),f=Math.max(0,Math.floor(Bn(n?.boostSerial??0,0))),m=Math.max(0,Bn(n?.stableSeconds??0,0)),g=n?.boostArmed!==!1;o?(a="manual",l=!0,c=ss(c+s*ot.trimRate*r)):t?.resumeAuto===!0?(a="auto",l=!0,d=0,m=0):t?.engage===!0&&(l=!0);const _=pn(e,c);t?.suppressed===!0&&(d=0,m=0);const p=ah(e);let h=p.peak>1e-6?_.power/p.peak:0,S=n?.sweetSpot===!0;if(t?.resumeAuto===!0&&(S=!1),h<gn.sweetSpotExit?S=!1:h>=gn.sweetSpotEnter&&(S=!0),a==="auto"&&l&&t?.suppressed!==!0){const v=Ax(e);c=Ex(c,v.angle,gn.assistRate*r);const x=pn(e,c);h=p.peak>1e-6?x.power/p.peak:0,S=!1,d=0,m=0}else{h<gn.sweetSpotExit&&(S=!1,g=!0,m=0);const v=Bn(e.heading,0),x=e.velocityX*Math.sin(v)+e.velocityZ*Math.cos(v),A=a==="manual"&&!t?.suppressed&&!_.noGo&&x>=gn.boostMinSpeed&&S;m=A?m+r:0,d>0?(d=Math.max(0,d-r/gn.boostDurationSeconds),(!A||_.noGo||t?.suppressed)&&(d=0),d===0&&(u=gn.boostCooldownSeconds)):A&&g&&m>=gn.boostStableSeconds&&u<=0&&(d=1,f+=1,m=0,g=!1)}return{sailAngle:ss(c),mode:a,engaged:l,efficiency:es(Bn(h,0),0,1),sweetSpot:S,boost:es(d,0,1),boostSerial:f,stableSeconds:m,cooldownSeconds:u,boostArmed:g}}const wx=.18,ii=1.42;function Tx(n,e){const t=new Vn;t.name="phase-two-landmarks",n.add(t);const i=[],r=[],s=[],o=[];e.forEach((c,u)=>{const d=Rx(c,u,i);if(t.add(d.group),o.push({id:c.id,group:d.group}),c.id==="island-projects"){const f=c.landCollisionRadius*.4666666666666666/Math.SQRT2;s.push({x:c.position.x+f,y:rr(d.group,f,f),z:c.position.z+f})}r.push({id:c.id,position:d.anchor.clone().add(new k(c.position.x,0,c.position.z))})}),t.updateMatrixWorld(!0);const a=o.map(({id:c,group:u})=>({id:c,bounds:new ui().setFromObject(u)}));let l=!1;return{group:t,anchors:r,windFlagAnchors:s,landmarkBounds:a,dispose:()=>{if(!l){l=!0;for(const c of i)c.dispose();t.removeFromParent(),t.clear()}}}}function Rx(n,e,t){const i=n.landCollisionRadius,r=n.dockingTriggerRadius,s=new Vn;s.name=n.id,s.userData={islandId:n.id,landCollisionRadius:n.landCollisionRadius,dockingTriggerRadius:n.dockingTriggerRadius},s.position.set(n.position.x,0,n.position.z);const o=_r(new rn({color:n.palette.sand,roughness:.9,metalness:0,flatShading:!0}),t),a=_r(new rn({color:n.palette.land,roughness:.92,metalness:0,flatShading:!0}),t),l=_r(new rn({color:n.palette.rock,roughness:.96,metalness:0,flatShading:!0}),t),c=Rt(new Jt(i*.78,i*.98,.48,10,1,!1),t),u=new Ve(c,o);u.name="sand-shelf",u.position.y=ii+.24,s.add(u);const d=-2.65,f=Rt(new Jt(i*.98,i*.98,ii-d,10,1,!1),t),m=new Ve(f,l);m.name=n.id==="island-projects"?"shipyard-submerged-foundation":"island-submerged-foundation",m.position.y=(ii+d)*.5,s.add(m);const g=ii+.48;Px(s,n,e,g,i,a,t),Ix(s,n,e,i,l,t),Cx(s,n,i,o,a,l,t);const _=Lx(r,t);_.position.y=ii+wx,s.add(_);const p=i*.82,h=new k(p,ii+.12,p);return{group:s,anchor:h}}function Cx(n,e,t,i,r,s,o){if(e.id==="island-resume"){const a=-t*.22,l=t*.58,c=rr(n,a,l),u=Math.max(2.1,t*.29),d=Rt(new Jt(t*.13,t*.17,u,6,1,!1),o),f=new Ve(d,s);f.name="chartroom-tower",f.userData={detailRole:"tower",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const m=Rt(new Pi(t*.23,.34,6,1,!1),o),g=new Ve(m,i);g.name="chartroom-tower-roof",g.userData={detailRole:"tower-roof",supportY:c+u},g.position.set(f.position.x,c+u+.17,f.position.z),n.add(g);return}if(e.id==="island-projects"){const a=new k(1,0,1).normalize(),l=new k(-a.z,0,a.x),c=t*.26,u=t*.12,d=a.clone().multiplyScalar(t*.84),f=rr(n,d.x,d.z),m=Rt(new Di(u,.16,c),o),g=_r(new rn({color:7754044,roughness:.9,flatShading:!0}),o),_=new Ve(m,g);_.name="shipyard-dock",_.userData={detailRole:"dock",supportY:f},_.position.set(d.x,f+.08,d.z),_.rotation.y=Math.PI/4,n.add(_);const p=Rt(new Jt(t*.045,t*.055,.74,6,1,!1),o);for(const h of[t*.76,t*.93]){const S=a.clone().multiplyScalar(h).add(l.clone().multiplyScalar(t*.055)),v=new Ve(p,s);v.name="shipyard-dock-pile";const x=rr(n,S.x,S.z);v.userData={detailRole:"dock-pile",supportY:x},v.position.set(S.x,x+.37,S.z),n.add(v)}return}if(e.id==="island-writing"){const a=-t*.5,l=t*.55,c=rr(n,a,l),u=Math.max(1.65,t*.23),d=Rt(new Jt(t*.055,t*.075,u,6,1,!1),o),f=new Ve(d,s);f.name="logbook-marker",f.userData={detailRole:"marker",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const m=Rt(new Pi(t*.14,.24,5,1,!1),o),g=new Ve(m,i);g.name="logbook-marker-cap",g.userData={detailRole:"marker-cap",supportY:c+u},g.position.set(f.position.x,c+u+.12,f.position.z),n.add(g);return}if(e.id==="island-media"){const a=t*.58,l=t*.18,c=rr(n,a,l),u=Math.max(1.95,t*.27),d=Rt(new Jt(t*.13,t*.18,u,8,1,!1),o),f=new Ve(d,s);f.name="signal-cove-light",f.userData={detailRole:"lighthouse",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const m=Rt(new Pi(t*.2,.3,8,1,!1),o),g=new Ve(m,i);g.name="signal-cove-light-cap",g.userData={detailRole:"lighthouse-cap",supportY:c+u},g.position.set(f.position.x,c+u+.15,f.position.z),n.add(g);const _=Rt(new Kc(t*.05,8,4),o),p=_r(new rn({color:16772522,emissive:16754984,emissiveIntensity:1.8,roughness:.35,metalness:0,flatShading:!0}),o),h=new Ve(_,p);h.name="signal-cove-lantern",h.userData={detailRole:"lighthouse-lantern",supportY:c+u},h.position.set(f.position.x,c+u+.4,f.position.z),n.add(h)}}function rr(n,e,t){n.updateMatrixWorld(!0);const i=new Dp(new k(n.position.x+e,20,n.position.z+t),new k(0,-1,0)),r=n.children.filter(o=>o instanceof Ve&&(o.name==="sand-shelf"||o.name.startsWith("landform-")||o.name==="rock-facet")),s=i.intersectObjects(r,!1)[0];return s?s.point.y-n.position.y:ii+.24}function Px(n,e,t,i,r,s,o){const a=t*37%90*(Math.PI/180),l=Math.max(1.35,r*.34);if(e.landform==="twin-peaks"){const d=Rt(new Pi(r*.38,l*1.12,6,1,!1),o);for(const[f,m,g]of[[-r*.24,r*.05,.92],[r*.24,-r*.04,.78]]){const _=new Ve(d,s);_.name="landform-twin-peak",_.position.set(f,i+l*g/2,m),_.scale.set(g,g,g),_.rotation.y=a,n.add(_)}return}if(e.landform==="ridge"){const d=Rt(new Pi(r*.68,l*.86,7,1,!1),o),f=new Ve(d,s);f.name="landform-ridge",f.position.y=i+l*.43,f.scale.set(1.35,1,.58),f.rotation.y=a,n.add(f);return}if(e.landform==="mesa"){const d=Rt(new Jt(r*.54,r*.76,l*.9,7,1,!1),o),f=new Ve(d,s);f.name="landform-mesa",f.position.y=i+l*.45,f.rotation.y=a,n.add(f);return}const c=Rt(new Ao(r*.63,1),o),u=new Ve(c,s);u.name="landform-mound",u.position.y=i+l*.42,u.scale.set(1.05,.58,.9),u.rotation.y=a,n.add(u)}function Ix(n,e,t,i,r,s){const o=Rt(new $c(i*.13,0),s),a=e.landform==="twin-peaks"?4:3;for(let l=0;l<a;l+=1){const c=(t*1.9+l*2.1)%(Math.PI*2),u=i*(.48+l*.08),d=new Ve(o,r);d.name="rock-facet",d.position.set(Math.cos(c)*u,ii+.55+l%2*.14,Math.sin(c)*u),d.scale.set(1,.8+l%2*.25,.8),d.rotation.set(.2*l,c,.1*t),n.add(d)}}function Lx(n,e){const t=[];for(let a=0;a<=96;a+=1){const l=a/96*Math.PI*2;t.push(new k(Math.cos(l)*n,0,Math.sin(l)*n))}const r=Rt(new ht().setFromPoints(t),e),s=_r(new Rp({color:16052196,dashSize:.72,gapSize:.48,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1}),e),o=new Zd(r,s);return o.name="docking-boundary",o.userData={dockingTriggerRadius:n},o.computeLineDistances(),o.renderOrder=4,o}function Rt(n,e){return e.push(n),n}function _r(n,e){return e.push(n),n}const _a=220,Dx=5.5,xa=Math.sqrt(2),va=Math.sqrt(6),ei=(n,e=0)=>Number.isFinite(n)?n:e;function Ux(){const n=new jc(-1,1,1,-1,.1,1200);let e=0,t=0,i=0,r=0,s=1,o=1,a=30,l=30,c=null;const u={top:0,right:0,bottom:0,left:0};let d=!1,f=!1;const m=()=>{n.position.set(e+_a,_a,t+_a),n.lookAt(e,0,t),n.updateProjectionMatrix(),n.updateMatrixWorld(!0)},g=()=>{if(!c)return{x:i,z:r,zoom:1};const p=Math.min(1,s*.8/Math.max(1,u.left+u.right)),h=Math.min(1,o*.8/Math.max(1,u.top+u.bottom)),S=u.left*p,v=u.right*p,x=u.top*h,A=u.bottom*h,E=(s-S-v)/s,C=(o-x-A)/o,w=c.x-i,M=c.z-r,y=Math.abs((w-M)/xa)+8,R=Math.abs((w+M)/va)+8,N=Math.min(1.6,2*l*E/y,2*a*C/R),L=(S-v)/s*l/N,D=(A-x)/o*a/N;return{x:(i+c.x)/2-(L*xa-D*va)/2,z:(r+c.z)/2-(-L*xa-D*va)/2,zoom:N}},_=p=>{const h=g();e+=(h.x-e)*p,t+=(h.z-t)*p,n.zoom+=(h.zoom-n.zoom)*p,m()};return m(),{camera:n,resize:(p,h)=>{if(f)return;s=Math.max(1,ei(p,1)),o=Math.max(1,ei(h,1));const S=s/o;a=o<=460?30:s<=600?30/S:45,l=a*S,n.left=-l,n.right=l,n.top=a,n.bottom=-a,_(d?1:0)},update:(p,h,S)=>{if(f)return;i=ei(p,i),r=ei(h,r);const v=Math.max(0,ei(S));_(v>0?d?1:1-Math.exp(-v*Dx):0)},snapTo:(p,h)=>{f||(i=ei(p,i),r=ei(h,r),_(1))},setLocalTarget:p=>{f||(c=p&&Number.isFinite(p.x)&&Number.isFinite(p.z)?{...p}:null,d&&_(1))},setFramingInsets:p=>{if(!f){for(const h of["top","right","bottom","left"])p[h]!==void 0&&(u[h]=Math.max(0,ei(p[h])));d&&_(1)}},setReducedMotion:p=>{f||(d=p,p&&_(1))},dispose:()=>{f=!0}}}const Ma={gain:2.5,yawDamping:1,deadband:.01};function Wr(n,e){return Number.isFinite(n)?n:e}function Nx(n,e,t){return Math.min(t,Math.max(e,n))}function Fx(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function Ox(n,e){const t=Wr(n?.heading??0,0),i=Fx(Wr(e,t)-t);if(Math.abs(i)<=Ma.deadband)return 0;const r=i*Ma.gain-Wr(n?.yawRate??0,0)*Ma.yawDamping,s=t,a=Wr(n?.velocityX??0,0)*Math.sin(s)+Wr(n?.velocityZ??0,0)*Math.cos(s)<-.6?-1:1;return Nx(-r/a,-1,1)}const zn={maxSurgeAcceleration:.9,maxSwayAcceleration:.65,slopeAcceleration:2.8,maxInputSlope:8,uphillResistanceScale:12,maxUphillResistanceAcceleration:7.2};function Bx(n,e,t,i){const r=Ri(-Ti(n?.surgeAcceleration??0,0),0,zn.maxSurgeAcceleration),s=Math.max(.01,Ti(i,14)),o=Ri(Ti(e,0)/s,0,1),a=Ri(Ti(t,0),0,1);return-Math.min(r*zn.uphillResistanceScale*o*o*a,zn.maxUphillResistanceAcceleration)}function Ti(n,e){return Number.isFinite(n)?n:e}function Ri(n,e,t){return Math.min(t,Math.max(e,n))}function zx(n,e){const t=Ti(e,0),i=Ri(Ti(n?.slopeX??0,0),-8,zn.maxInputSlope),r=Ri(Ti(n?.slopeZ??0,0),-8,zn.maxInputSlope),s=-i*zn.slopeAcceleration,o=-r*zn.slopeAcceleration,a=Math.sin(t),l=Math.cos(t),c=Ri(s*l-o*a,-.65,zn.maxSwayAcceleration),u=Ri(s*a+o*l,-.9,zn.maxSurgeAcceleration);return{accelerationX:u*a+c*l,accelerationZ:u*l-c*a,surgeAcceleration:u,swayAcceleration:c}}const Ke={length:5.2,width:2.6,collisionRadius:3.2,maxForwardSpeed:14,maxReverseSpeed:7,maxLateralSpeed:6,brakingAcceleration:15,maxYawRate:.6},Sa=180,Hx=.25,kx=1/120,Nu=1e-7,Fu=16,Vx=2.4,to=100;function St(n,e){return Number.isFinite(n)?n:e}function dn(n,e,t){return Math.min(t,Math.max(e,n))}function Gx(n){return{throttle:dn(St(n?.throttle??0,0),-1,1),rudder:dn(St(n?.rudder??0,0),-1,1),brake:n?.brake===!0,sheet:dn(St(n?.sheet??0,0),-1,1),sailAngle:St(n?.sailAngle??ot.defaultAngle,ot.defaultAngle),targetHeading:Number.isFinite(n?.targetHeading)?n.targetHeading:void 0,trimBoost:dn(St(n?.trimBoost??0,0),0,1)}}function ch(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function Wx(n){const e=Math.max(Ke.maxYawRate,ot.sailingMaxYawRate);return{x:St(n?.x??0,0),z:St(n?.z??0,0),velocityX:St(n?.velocityX??0,0),velocityZ:St(n?.velocityZ??0,0),heading:ch(St(n?.heading??0,0)),yawRate:dn(St(n?.yawRate??0,0),-e,e)}}function Xx(n){const e=St(n?.worldLimit??Sa,Sa);return e>0?e:Sa}function Ou(n,e,t,i,r){const s=Math.max(0,r-Ke.collisionRadius);return n>s?(n=s,t>0&&(t=0)):n<-s&&(n=-s,t<0&&(t=0)),e>s?(e=s,i>0&&(i=0)):e<-s&&(e=-s,i<0&&(i=0)),[n,e,t,i]}function qx(n,e,t,i,r){for(const s of r){const o=St(s?.x??0,0),a=St(s?.z??0,0),l=St(s?.radius??0,0);if(l<=0)continue;const c=Ke.collisionRadius+l,u=n-o,d=e-a,f=Math.hypot(u,d);if(f>=c)continue;let m,g;if(f>Nu)m=u/f,g=d/f;else{const p=Math.hypot(t,i);p>Nu?(m=-t/p,g=-i/p):(m=1,g=0)}n=o+m*c,e=a+g*c;const _=t*m+i*g;_<0&&(t-=_*m,i-=_*g)}return[n,e,t,i]}function lh(n,e,t,i,r){const s=Xx(r),o=Array.isArray(r?.obstacles)?r.obstacles:[];for(let a=0;a<2;a+=1)[n,e,t,i]=Ou(n,e,t,i,s),[n,e,t,i]=qx(n,e,t,i,o);return[n,e,t,i]=Ou(n,e,t,i,s),[n,e,t,i]}function Yx(n,e,t,i,r){const s=Math.sin(n.heading),o=Math.cos(n.heading);let a=n.velocityX*s+n.velocityZ*o,l=n.velocityX*o-n.velocityZ*s;a*=Math.exp(-.35*t),l*=Math.exp(-3.5*t);const c=pn(n,e.sailAngle,e.brake?1:0),u=!e.brake&&c?.noGo!==!0?1+(e.trimBoost??0)*ot.manualBoostFraction:1,d=e.brake?0:(c?.driveAcceleration??0)*u;if(a+=d*t,c!==void 0&&(l+=c.lateralAcceleration*t),r!==void 0&&Number.isFinite(r)){const N=zx(gr(n.x,n.z,r),n.heading);a+=N.surgeAcceleration*t,a+=Bx(N,a,c?.power??0,Ke.maxForwardSpeed)*t,l+=N.swayAcceleration*t}{const N=Ro(n.x,n.z);if(N.intensity>0){const L=N.inwardX*Fu*N.intensity,D=N.inwardZ*Fu*N.intensity,F=dn(St(a*s+l*o,0),-to,to),B=dn(St(a*o-l*s,0),-to,to),$=Math.max(0,F*-N.inwardX+B*-N.inwardZ),H=Math.max(0,$)*Vx*N.intensity,ie=L+N.inwardX*H,Z=D+N.inwardZ*H;a+=(ie*s+Z*o)*t,l+=(ie*o-Z*s)*t}}if(e.brake){const N=Math.sign(a)||Math.sign(d),L=Ke.brakingAcceleration*t;N!==0&&(a=Math.abs(a)<=L?0:a-N*L)}a=dn(a,-7,Ke.maxForwardSpeed),l=dn(l,-6,Ke.maxLateralSpeed);const f=a*s+l*o,m=a*o-l*s,g=a<-.6?-1:1,_=g<0?Ke.maxReverseSpeed:Ke.maxForwardSpeed,p=dn(Math.abs(a)/_,0,1),h=ot.sailingMaxYawRate,S=Math.max(ot.stallYawRate/h,.12+p*.88),x=-(e.targetHeading!==void 0?Ox(n,e.targetHeading):e.rudder)*g*h*S,A=1-Math.exp(-6.5*t),E=dn(n.yawRate+(x-n.yawRate)*A,-h,h),C=ch(n.heading+E*t);let[w,M,y,R]=lh(n.x+f*t,n.z+m*t,f,m,i);return{x:w,z:M,velocityX:y,velocityZ:R,heading:C,yawRate:E}}function Bu(n=0,e=0){return{x:St(n,0),z:St(e,0),velocityX:0,velocityZ:0,heading:0,yawRate:0}}function Zx(n,e,t,i,r){const s=Wx(n),o=Gx(e),a=Number.isFinite(t)&&t>0?Math.min(t,Hx):0;let l=lh(s.x,s.z,s.velocityX,s.velocityZ,i),c={x:l[0],z:l[1],velocityX:l[2],velocityZ:l[3],heading:s.heading,yawRate:s.yawRate},u=a,d=0;for(;u>0;){const f=Math.min(u,kx),m=r!==void 0&&Number.isFinite(r)?r+d:void 0;c=Yx(c,o,f,i,m),u-=f,d+=f}return c}const Gt={maxHeave:yo*Ft.maxWaveScale,maxWavePitch:.29,maxWaveRoll:.3,maxSpeedLift:.065,maxTurnHeel:.12,maxWindHeel:Math.PI/9,maxWindHeelLift:.1,heaveResponseRate:15,tiltResponseRate:9,maxForwardSpeed:Ke.maxForwardSpeed,maxYawRate:Ke.maxYawRate},zu=.01;function gt(n,e){return Number.isFinite(n)?n:e}function Nn(n,e,t){return Math.min(t,Math.max(e,n))}function no(n){const e=n.reduce((t,i)=>t+i,0);return gt(e/n.length,0)}function $x(n){const e=n.reduce((i,[,r])=>i+r,0),t=n.reduce((i,[r,s])=>i+r*s,0);return e>0?gt(t/e,0):0}function Hu(n){return{height:gt(n,0)}}function Kx(n,e,t){try{return Hu(n(e,t)?.height)}catch{return Hu(0)}}function jx(n,e,t,i,r,s){const o=gt(n,0),a=gt(e,0),l=gt(t,0),c=Math.max(zu,Math.abs(gt(i,1))*.5),u=Math.max(zu,Math.abs(gt(r,1))*.5),d=Math.cos(l),f=Math.sin(l),m=(g,_)=>Kx(s,o+g*d+_*f,a-g*f+_*d);return{bow:m(0,c),stern:m(0,-c),port:m(-u,0),starboard:m(u,0),bowPort:m(-u,c),bowStarboard:m(u,c),sternPort:m(-u,-c),sternStarboard:m(u,-c)}}function Jx(n,e={},t=!1){const i=gt(n?.bow?.height,0),r=gt(n?.stern?.height,0),s=gt(n?.port?.height,0),o=gt(n?.starboard?.height,0),a=gt(n?.bowPort?.height,0),l=gt(n?.bowStarboard?.height,0),c=gt(n?.sternPort?.height,0),u=gt(n?.sternStarboard?.height,0),d=no([i,a,l]),f=no([r,c,u]),m=no([s,a,c]),g=no([o,l,u]),_=Nn($x([[i,1],[r,1],[s,1],[o,1],[a,.5],[l,.5],[c,.5],[u,.5]]),-2.52,Gt.maxHeave),p=Nn(-Math.atan2(gt(d-f,0),Ke.length),-.29,Gt.maxWavePitch),h=Nn(Math.atan2(gt(g-m,0),Ke.width),-.3,Gt.maxWaveRoll),S=gt(e?.forwardSpeed,0),v=gt(e?.yawRate,0),x=Nn(gt(e?.sailPower,0),0,1),A=gt(e?.relativeWindAngle,0),E=Nn(S/Gt.maxForwardSpeed,0,1),C=Nn(v/Gt.maxYawRate*Math.min(1,Math.abs(S)/Gt.maxForwardSpeed),-1,1),w=t?0:1,M=E*E*Gt.maxSpeedLift*w,y=-C*Gt.maxTurnHeel*w,R=Math.sin(A),N=Math.abs(R)<1e-6?0:R,L=Math.pow(x,.35),D=Math.sign(N)*Math.pow(Math.abs(N),.65)*L*Gt.maxWindHeel*w,F=Math.abs(D)/Gt.maxWindHeel*Gt.maxWindHeelLift;return{heave:Nn(_+F,-2.52,Gt.maxHeave),pitch:Nn(p-M,-.36,.36),roll:Nn(h+y+D,-.4,.4)}}const It={sternPort:{x:-1.3,z:-2.6},sternStarboard:{x:1.3,z:-2.6},shoulderPort:{x:-1.17,z:1.612},shoulderStarboard:{x:1.17,z:1.612},bowPort:{x:-.585,y:-.55,z:1.352},bowStarboard:{x:.585,y:-.55,z:1.352}},Qx=[{x:-1.209,y:.47,z:-2.496},{x:1.209,y:.47,z:-2.496},{x:1.16064,y:.47,z:1.54752},{x:0,y:.47,z:2.496},{x:-1.16064,y:.47,z:1.54752}],ev=[{x:0,y:.47,z:-.18},{x:0,y:.465,z:-.34},{x:-.51,y:.47,z:-1.24},{x:.51,y:.47,z:-1.24},{x:-.51,y:.47,z:-.4},{x:.51,y:.47,z:-.4}],tv=[{x:-.884,y:-.55,z:-2.132},{x:.884,y:-.55,z:-2.132},It.bowPort,It.bowStarboard,{x:0,y:-.37,z:2.236},{x:0,y:-.63,z:-.312}];function nv(n,e,t,i,r,s,o){const a=v=>{const x=uh(v,r,s,o,e,t);let A=0;try{A=Tt(i(x.x,x.z),0)}catch{}return x.y-A},l=Math.min(...Qx.map(a)),c=Math.min(...ev.map(a)),u=Math.min(...tv.map(a)),d=Tt(n.leewardRail.clearance,0),f=Math.max(-.06-l,.12-c,-.055-d),m=-.025-u,g=os(n.heelLoad/.5,0,1),_=g*g*(3-2*g),p=-os(d+.035,0,.6)*_,h=e.heave+f,S=Math.max(h,e.heave+m);return{minimumHeave:h,maximumHeave:S,targetHeave:os(e.heave+p,h,S)}}function Tt(n,e){return Number.isFinite(n)?n:e}function os(n,e,t){return Math.min(t,Math.max(e,n))}function uh(n,e,t,i,r,s){const o=Tt(r?.roll,0),a=Tt(r?.pitch,0),l=Tt(i,0),c=Math.cos(o),u=Math.sin(o),d=Math.cos(a),f=Math.sin(a),m=Math.cos(l),g=Math.sin(l),_=c*n.x-u*n.y,p=u*n.x+c*n.y,h=n.z,S=_,v=d*p-f*h,x=f*p+d*h;return{x:Tt(e,0)+m*S+g*x,y:Tt(s,0)+Tt(r?.heave,0)+v,z:Tt(t,0)-g*S+m*x}}function ku(n,e,t,i,r,s,o,a,l,c,u,d=0,f=0){const m=Math.max(.01,Math.abs(Tt(s,2.6))/2.6),g=Math.max(.01,Math.abs(Tt(r,5.2))/5.2),_={},p=Tt(l,0),h=u?Math.max(0,p-Tt(u.timeSeconds,p)):0,S=(N,L)=>{const D=uh(L,n,e,t,i,o);let F=0;try{F=Tt(c(D.x,D.z),0)}catch{F=0}const B=u?.points[N],$=B&&h>1e-6?(F-B.waterHeight-(D.y-B.y))/h:0,H={...D,waterHeight:F,clearance:D.y-F,closingSpeed:Tt($,0)};return _[N]=H,H},v=S("bowPort",{x:It.bowPort.x*m,y:It.bowPort.y,z:It.bowPort.z*g}),x=S("bowStarboard",{x:It.bowStarboard.x*m,y:It.bowStarboard.y,z:It.bowStarboard.z*g}),A=S("portRail",{x:(It.sternPort.x+It.shoulderPort.x)*.5*m,y:.45,z:(It.sternPort.z+It.shoulderPort.z)*.5*g}),E=S("starboardRail",{x:(It.sternStarboard.x+It.shoulderStarboard.x)*.5*m,y:.45,z:(It.sternStarboard.z+It.shoulderStarboard.z)*.5*g}),C=os(Tt(d,0),0,1),w=Tt(f,0),M=C*Math.abs(Math.sin(w)),y=Math.sin(w)>=0?"port":"starboard";return{contact:{bowPort:v,bowStarboard:x,leewardRail:y==="port"?A:E,leewardSide:y,heelLoad:os(M,0,1),forwardSpeed:Tt(a,0),sailPower:C,relativeWindAngle:w},history:{timeSeconds:p,points:_}}}const Xr=Ke.length,qr=Ke.width,io=.2,iv=8*Math.PI/180,ro=85*Math.PI/180,rv=9,Vu=-.34,Gu=3;function sv(n){const e=new Vn;e.name="portfolio-sailboat",e.rotation.order="YXZ";const t=[],i=[],r=Z=>(t.push(Z),Z),s=Z=>(i.push(Z),Z),o=s(new rn({color:14140835,roughness:.82,metalness:0,flatShading:!0})),a=new Ve(r(ov(qr,Xr)),o);a.name="vessel-faceted-hull",e.add(a);const l=s(new rn({color:12088134,roughness:.82,metalness:0,flatShading:!0})),c=new Ve(r(av(qr,Xr)),l);c.name="vessel-warm-wood-deck",e.add(c);const u=s(new rn({color:7097150,roughness:.78,metalness:0,flatShading:!0})),d=new Ve(r(new Di(1.02,.32,.84)),u);d.name="vessel-cockpit-console",d.position.set(0,.63,-.82),e.add(d);const f=s(new rn({color:5131331,roughness:.7,metalness:.05,flatShading:!0})),m=new Ve(r(new Jt(.085,.12,5.45,6)),f);m.name="vessel-mast",m.position.set(0,3.19,-.34),e.add(m);const g=new Vn;g.name="sail-rig",g.position.set(0,0,Vu),e.add(g);const _=Z=>{Z.position.z-=Vu,g.add(Z)},p=new Ve(r(new Jt(.06,.075,3.1,6)),s(new rn({color:15757160,roughness:.64,metalness:0,flatShading:!0})));p.name="vessel-main-boom",p.rotation.x=Math.PI*.5,p.position.set(0,2.04,-1.895),_(p);const h=s(new An({color:16775142,side:yt,toneMapped:!1})),S=s(new An({color:14339507,side:yt,toneMapped:!1})),v=new Ve(r(Xu(.055,-.6,[[5.8,-.39],[2,-.39],[2.08,-3.4],[3.3,-1.52]])),h);v.name="vessel-cream-mainsail",_(v);const x=new Ve(r(Xu(.062,-.42,[[5.76,-.41],[2.02,-.41],[2.08,-2.74],[3.28,-1.28]])),S);x.name="vessel-mainsail-facet",_(x);const A=s(new rn({color:15757160,roughness:.64,metalness:0,side:yt,flatShading:!0})),E=new Ve(r(Wu([.073,2.08,-.48,.073,2.12,-3.05,.073,2.38,-2.78])),A);E.name="vessel-coral-main-clew",_(E);const C=new Ve(r(Wu([-.52,.7,.96,.52,.7,.96,0,.7,2.18])),A);C.name="vessel-coral-bow",e.add(C);const w={heave:0,pitch:0,roll:0};let M=!1,y=ro,R=ro,N=0,L=0,D={bowPort:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},bowStarboard:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardRail:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardSide:"starboard",heelLoad:0,sailPower:0,relativeWindAngle:0,forwardSpeed:0},F,B=!1;const $=Z=>{if(!Number.isFinite(Z))return ro;const pe=Z<0?-1:1,Ee=Math.min(ro,Math.max(iv,Math.abs(Z)));return pe*Ee},H=(Z,pe)=>{const Ee=Number.isFinite(Z)&&Z>0?Math.min(Z,.25):0,De=pe||M?1:1-Math.exp(-Ee*rv);y=ya(y,R,De),g.rotation.y=y,g.scale.x=y<0?-1:1},ie=(Z,pe,Ee,De)=>{const Ue=Number.isFinite(pe)?pe:0,W=jx(Z.x,Z.z,Z.heading,Xr,qr,(ne,se)=>({height:Gn(ne,se,Ue)})),ce=Z.velocityX*Math.sin(Z.heading)+Z.velocityZ*Math.cos(Z.heading),le=Jx(W,{forwardSpeed:ce,yawRate:Z.yawRate,sailPower:N,relativeWindAngle:L},M),xe=Number.isFinite(Ee)&&Ee>0?Math.min(Ee,.25):0,Ae=De?1:1-Math.exp(-xe*Gt.heaveResponseRate),q=De?1:1-Math.exp(-xe*Gt.tiltResponseRate),me=(ne,se)=>{const Y=ya(ne,se,q);return De?Y:ne+Math.max(-Gu*xe,Math.min(Gu*xe,Y-ne))};w.pitch=me(w.pitch,le.pitch),w.roll=me(w.roll,le.roll);const ae={...w,heave:le.heave},P=M?0:N,X=ku(Z.x,Z.z,Z.heading,ae,Xr,qr,io,ce,Ue,(ne,se)=>Gn(ne,se,Ue),De?void 0:F,P,L),te=nv(X.contact,ae,io,(ne,se)=>Gn(ne,se,Ue),Z.x,Z.z,Z.heading);w.heave=Math.min(te.maximumHeave,Math.max(te.minimumHeave,ya(w.heave,te.targetHeave,Ae)));const Q=ku(Z.x,Z.z,Z.heading,w,Xr,qr,io,ce,Ue,(ne,se)=>Gn(ne,se,Ue),De?void 0:F,P,L);D=Q.contact,F=Q.history,e.position.set(Number.isFinite(Z.x)?Z.x:0,w.heave+io,Number.isFinite(Z.z)?Z.z:0),e.rotation.y=Number.isFinite(Z.heading)?Z.heading:0,e.rotation.x=w.pitch,e.rotation.z=w.roll,H(Ee,De)};return n.add(e),{group:e,update:(Z,pe,Ee)=>{B||ie(Z,pe,Ee,!1)},resetPose:(Z,pe=0)=>{B||(F=void 0,ie(Z,pe,0,!0))},setReducedMotion:Z=>{B||(M=Z===!0,M&&H(0,!0))},setSailAngle:(Z,pe=!1)=>{B||(R=$(Z),H(0,pe))},setSailLoad:(Z,pe)=>{B||(N=Number.isFinite(Z)?Math.min(1,Math.max(0,Z)):0,L=Number.isFinite(pe)?pe:0)},getSailAngle:()=>y,getWaterContact:()=>({...D,bowPort:{...D.bowPort},bowStarboard:{...D.bowStarboard},leewardRail:{...D.leewardRail}}),getPose:()=>({...w}),dispose:()=>{if(!B){B=!0;for(const Z of t)Z.dispose();for(const Z of i)Z.dispose();e.removeFromParent(),e.clear()}}}}function ov(n,e){const t=n*.5,i=e*.5,r=.45,s=-.55,o=[[-t,r,-i],[t,r,-i],[t*.9,r,i*.62],[0,r,i],[-t*.9,r,i*.62]],a=[[-t*.68,s,-i*.82],[t*.68,s,-i*.82],[t*.45,s,i*.52],[0,s+.18,i*.86],[-t*.45,s,i*.52]],l=[];for(const f of o)l.push(...f);for(const f of a)l.push(...f);l.push(0,s-.08,-i*.12);const c=10,u=[];for(let f=0;f<5;f+=1){const m=(f+1)%5;u.push(f,m,5+m,f,5+m,5+f),u.push(c,5+m,5+f)}const d=new ht;return d.setAttribute("position",new ut(l,3)),d.setIndex(u),d.computeVertexNormals(),d}function av(n,e){const t=n*.5*.93,i=e*.5*.96,r=.47,s=[[-t,r,-i],[t,r,-i],[t*.96,r,i*.62],[0,r,i],[-t*.96,r,i*.62]],o=[0,r,-.18],a=[];for(const c of s)o.push(...c);for(let c=0;c<s.length;c+=1){const u=(c+1)%s.length;a.push(0,u+1,c+1)}const l=new ht;return l.setAttribute("position",new ut(o,3)),l.setIndex(a),l.computeVertexNormals(),cv(l),l}function cv(n){const e=n.getAttribute("position"),t=n.getIndex();if(!t||t.count<3)throw new Error("Vessel deck needs indexed faces");const i=t.getX(0),r=t.getX(1),s=t.getX(2),o=e.getX(r)-e.getX(i),a=e.getZ(r)-e.getZ(i),l=e.getX(s)-e.getX(i),c=e.getZ(s)-e.getZ(i);if(!(a*l-o*c>0))throw new Error("Vessel deck faces downward")}function Wu(n){const e=new ht;return e.setAttribute("position",new ut([...n],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function Xu(n,e,t){const[i,r,s,o]=t,a=new ht;return a.setAttribute("position",new ut([n,i[0],i[1],n,r[0],r[1],n,s[0],s[1],e,o[0],o[1]],3)),a.setIndex([0,1,3,1,2,3,2,0,3]),a.computeVertexNormals(),a}function ya(n,e,t){return n+(e-n)*Math.min(1,Math.max(0,t))}const Yr=96,dh=80,Zr=dh,lv=[-1,1],uv=1.45,qu=.34,Yu=.055,Zu=.11,dv=.45,hv=.055,dt=32,$u=.06,ji=2.2,Ku=.24,Ji=18,fv=.27,pv=.2,mv=1;function gv(n){const e=new Zc(1,7);e.rotateX(-Math.PI*.5);const t=new An({color:16052196,transparent:!0,opacity:.5,depthWrite:!1,side:yt}),i=new Yd(e,t,Yr);i.name="phase-five-wake-foam",i.frustumCulled=!1,i.instanceMatrix.setUsage(Ot),n.add(i);const r=new Float32Array(dt*2*2*3),s=new Float32Array(dt*2*2*4),o=new Uint16Array((dt-1)*2*6);let a=0;for(let q=0;q<2;q+=1){const me=q*dt*2;for(let ae=0;ae<dt-1;ae+=1){const P=me+ae*2,X=P+2;o[a++]=P,o[a++]=X,o[a++]=P+1,o[a++]=P+1,o[a++]=X,o[a++]=X+1}}const l=new ht,c=new nt(r,3),u=new nt(s,4);c.setUsage(Ot),u.setUsage(Ot),l.setAttribute("position",c),l.setAttribute("color",u),l.setIndex(new nt(o,1));const d=new An({color:16777215,vertexColors:!0,transparent:!0,opacity:.42,depthWrite:!1,side:yt}),f=new Ve(l,d);f.name="phase-five-wake-ribbon",f.frustumCulled=!1,n.add(f);const m=new Float32Array(Ji*2*3),g=new Float32Array(Ji*2*4),_=new Uint16Array((Ji-1)*6);let p=0;for(let q=0;q<Ji-1;q+=1){const me=q*2,ae=me+2;_[p++]=me,_[p++]=ae,_[p++]=me+1,_[p++]=me+1,_[p++]=ae,_[p++]=ae+1}const h=new ht,S=new nt(m,3),v=new nt(g,4);S.setUsage(Ot),v.setUsage(Ot),h.setAttribute("position",S),h.setAttribute("color",v),h.setIndex(new nt(_,1));const x=new An({color:16777215,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,side:yt}),A=new Ve(h,x);A.name="phase-five-bow-wave",A.frustumCulled=!1,n.add(A);const E=Array.from({length:Yr},()=>({age:Number.POSITIVE_INFINITY,life:0,x:0,z:0,heading:0,driftX:0,driftZ:0,size:0,elongation:1,kind:0,side:0,waveResponse:0,trimBoost:0,active:!1})),C=new Mt,w=Array.from({length:dt},()=>({age:Number.POSITIVE_INFINITY,x:0,z:0,heading:0,speed:0,yawRate:0,trimBoost:0,active:!1}));let M=0,y=Zr,R=0,N=0,L=0,D=0,F=0,B=0,$=!1,H=!1;const ie=(q,me,ae,P)=>{if(!me.active||me.age>=me.life){me.active=!1,C.scale.setScalar(0),C.updateMatrix(),i.setMatrixAt(q,C.matrix);return}const X=Math.min(1,Math.max(0,me.age/me.life)),te=X<.16?X/.16:1-(X-.16)/.84,Q=P?Math.min(me.trimBoost,B):0,ne=me.size*(1+Q*.85)*Math.max(0,te);let se=Lt(me.x,me.z,ae),Y=0;if(me.kind!==0){const qe=gr(me.x,me.z,ae);se=qe.height,Y=Math.min(.45,Math.hypot(qe.slopeX,qe.slopeZ))}const oe=1+me.waveResponse*Y;C.position.set(me.x,se+pv,me.z),C.rotation.set(0,me.heading,0),C.scale.set(ne*me.elongation*(1+Q*.24)*oe,1,ne*(1+Q*.12)*oe),C.updateMatrix(),i.setMatrixAt(q,C.matrix)},Z=q=>{q.active=!1,q.age=Number.POSITIVE_INFINITY,q.kind=0,q.side=0,q.waveResponse=0,q.trimBoost=0},pe=(q,me)=>{const ae=Math.sin(q.heading),P=Math.cos(q.heading),X=Math.cos(q.heading),te=-Math.sin(q.heading),Q=Ke.length*.52;for(const ne of lv){const se=M;M=(M+1)%dh;const Y=E[se],oe=(se*17%11/10-.5)*.12,qe=Ke.width*.32+oe,We=.18+Math.min(.48,me*.035);Y.age=0,Y.heading=q.heading,Y.life=uv*(.82+se*13%7*.035),Y.x=q.x-ae*Q+X*ne*qe,Y.z=q.z-P*Q+te*ne*qe,Y.driftX=-ae*(.12+me*.08)+X*ne*We,Y.driftZ=-P*(.12+me*.08)+te*ne*We,Y.size=.13+Math.min(.2,me*.017),Y.elongation=1.1+Math.min(.45,me*.035),Y.kind=0,Y.side=ne,Y.waveResponse=.45,Y.trimBoost=B,Y.active=!0}},Ee=()=>{const q=y;return y=Zr+(y-Zr+1)%(Yr-Zr),E[q]},De=(q,me,ae,P,X)=>{const te=Math.sin(q.heading),Q=Math.cos(q.heading),ne=Math.cos(q.heading),se=-Math.sin(q.heading),Y=Ee();Y.age=0,Y.life=qu*(.92+P*.35+X*.22),Y.heading=q.heading+ae*.16,Y.x=q.x+te*(Ke.length*.48)+ne*ae*Ke.width*.28,Y.z=q.z+Q*(Ke.length*.48)+se*ae*Ke.width*.28,Y.driftX=te*(.08+me*.035)+ne*ae*(.2+P*.24+X*.12),Y.driftZ=Q*(.08+me*.035)+se*ae*(.2+P*.24+X*.12),Y.size=.13+Math.min(.12,me*.012)+P*.05+X*.1,Y.elongation=1.35+Math.min(.4,me*.025)+X*.18,Y.kind=1,Y.side=ae,Y.waveResponse=1.25,Y.active=!0},Ue=(q,me,ae,P)=>{const X=Math.sign(q.yawRate);if(X===0)return;const te=Math.sin(q.heading),Q=Math.cos(q.heading),ne=Math.cos(q.heading),se=-Math.sin(q.heading),Y=Ee(),oe=Math.min(1,Math.abs(q.yawRate)/.6);Y.age=0,Y.life=qu*(1.05+oe*.3+P*.18),Y.heading=q.heading+X*.32,Y.x=q.x-te*(Ke.length*.08)+ne*X*(Ke.width*.58),Y.z=q.z-Q*(Ke.length*.08)+se*X*(Ke.width*.58),Y.driftX=ne*X*(.22+me*.035)-te*.06,Y.driftZ=se*X*(.22+me*.035)-Q*.06,Y.size=.13+oe*.1+ae*.04+P*.08,Y.elongation=1.5+oe*.45+P*.12,Y.kind=2,Y.side=X,Y.waveResponse=1.1,Y.active=!0},W=(q,me,ae)=>{const P=q.x+Math.sin(q.heading)*Ke.length*.48,X=q.z+Math.cos(q.heading)*Ke.length*.48,te=gr(P,X,ae),Q=Math.min(.45,Math.hypot(te.slopeX,te.slopeZ)),ne=Math.abs(te.velocityY+q.velocityX*te.slopeX+q.velocityZ*te.slopeZ),se=Math.min(.9,ne*.26);De(q,me,-1,Q,se),De(q,me,1,Q,se),Math.abs(q.yawRate)>=hv&&Ue(q,me,Q,se)},ce=(q,me)=>{const ae=w[L];ae.age=0,ae.x=Number.isFinite(q.x)?q.x:0,ae.z=Number.isFinite(q.z)?q.z:0,ae.heading=Number.isFinite(q.heading)?q.heading:0,ae.speed=me,ae.yawRate=Number.isFinite(q.yawRate)?q.yawRate:0,ae.trimBoost=B,ae.active=!0,L=(L+1)%dt,D=Math.min(dt,D+1)},le=(q,me)=>{const ae=dt-D;for(let P=0;P<2;P+=1){const X=P===0?-1:1,te=P*dt*2;let Q=dt,ne=-1;for(let se=0;se<dt;se+=1){const Y=se>=ae,oe=se-ae,qe=Y?(L-D+oe+dt)%dt:0,We=w[qe];Y&&We.active&&We.age<ji&&(Q===dt&&(Q=se),ne=se)}for(let se=0;se<dt;se+=1){const Y=(te+se*2)*3,oe=(te+se*2)*4,qe=se>=ae,We=se-ae,I=qe?(L-D+We+dt)%dt:0,b=w[I];if(!qe||!b.active||b.age>=ji){for(let He=0;He<8;He+=1)s[oe+He]=0;continue}const U=Math.max(0,1-b.age/ji),z=me?Math.min(b.trimBoost,B):0,ee=Math.min(1,Math.max(0,b.speed/Ke.maxForwardSpeed)),j=D>1?We/(D-1):1,ve=.18+Math.min(1,Math.max(0,1-j)*5)*.82,ue=U*U*(.72+ee*.28)*(.55+ve*.45)*(1+z*.16),Re=Math.sin(b.heading),Ie=Math.cos(b.heading),fe=Math.cos(b.heading),Me=-Math.sin(b.heading),Ne=Ke.length*(.52+ee*.08),Ce=b.x-Re*Ne,Se=b.z-Ie*Ne,Be=Ke.width*(.34+ee*.1)*(1+z*.2)*ve,O=Be+(.62+ee*1.05+Math.min(.45,Math.abs(b.yawRate)*.72))*(.32+U*.68)*(1+z*.82)*ve,de=Ce+fe*X*Be,_e=Se+Me*X*Be,we=Ce+fe*X*O,he=Se+Me*X*O,re=Lt(de,_e,q)+Ku,Pe=Lt(we,he,q)+Ku;r[Y]=de,r[Y+1]=re,r[Y+2]=_e,r[Y+3]=we,r[Y+4]=Pe,r[Y+5]=he,s[oe]=1,s[oe+1]=1,s[oe+2]=1,s[oe+3]=ue,s[oe+4]=1,s[oe+5]=1,s[oe+6]=1,s[oe+7]=ue}if(ne<0)for(let se=0;se<dt;se+=1){const Y=(te+se*2)*3;for(let oe=0;oe<6;oe+=1)r[Y+oe]=0}else for(let se=0;se<dt;se+=1){const Y=se>=ae,oe=se-ae,qe=Y?(L-D+oe+dt)%dt:0,We=w[qe];if(Y&&We.active&&We.age<ji)continue;let I=se<=Q?Q:se-1;for(;I>=Q;){const z=I>=ae,ee=I-ae,j=z?(L-D+ee+dt)%dt:0,ve=w[j];if(z&&ve.active&&ve.age<ji)break;I-=1}I<Q&&(I=Q);const b=(te+se*2)*3,U=(te+I*2)*3;for(let z=0;z<6;z+=1)r[b+z]=r[U+z]}}l.getAttribute("position").needsUpdate=!0,l.getAttribute("color").needsUpdate=!0},xe=(q,me,ae,P)=>{if(!P){m.fill(0),g.fill(0),S.needsUpdate=!0,v.needsUpdate=!0;return}const X=Math.sin(q.heading),te=Math.cos(q.heading),Q=Math.cos(q.heading),ne=-Math.sin(q.heading),se=q.x+X*Ke.length*.48,Y=q.z+te*Ke.length*.48,oe=se-X*.78,qe=Y-te*.78,We=gr(se,Y,ae),I=Math.min(.5,Math.hypot(We.slopeX,We.slopeZ)),b=Math.abs(We.velocityY+q.velocityX*We.slopeX+q.velocityZ*We.slopeZ),U=Math.min(.9,b*.26),z=Math.min(1,Math.max(0,me/Ke.maxForwardSpeed)),ee=.9+z*.22+U*.14,j=.18+z*.12+I*.1+U*.08,ve=Math.min(.92,.28+z*.48+U*.18);for(let ue=0;ue<Ji;ue+=1){const Re=Math.PI-ue/(Ji-1)*Math.PI,Ie=Math.cos(Re),fe=Math.sin(Re);for(let Me=0;Me<2;Me+=1){const Ne=ee+Me*j,Ce=Ie*Ne,Se=fe*Ne,Be=(ue*2+Me)*3,O=(ue*2+Me)*4,de=oe+Q*Ce+X*Se,_e=qe+ne*Ce+te*Se;m[Be]=de,m[Be+1]=Lt(de,_e,ae)+fv,m[Be+2]=_e,g[O]=1,g[O+1]=1,g[O+2]=1,g[O+3]=ve*(Me===0?1:.78)}}S.needsUpdate=!0,v.needsUpdate=!0},Ae=()=>{if(!H){R=0,N=0,M=0,y=Zr,L=0,D=0,F=0,B=0;for(const q of E)Z(q);for(const q of w)q.trimBoost=0,q.active=!1;for(let q=0;q<Yr;q+=1)ie(q,E[q],0,!1);le(0,!1),xe({x:0,z:0,velocityX:0,velocityZ:0,heading:0},0,0,!1),i.instanceMatrix.needsUpdate=!0}};return Ae(),{update:(q,me,ae)=>{if(H||$)return;const P=Number.isFinite(ae)?Math.min(.1,Math.max(0,ae)):0;if(P<=0)return;const X=Number.isFinite(me)?me:0,te=q.velocityX*Math.sin(q.heading)+q.velocityZ*Math.cos(q.heading),Q=Math.max(0,te),ne=Q>=dv;for(const oe of E)oe.active&&(oe.age+=P,oe.x+=oe.driftX*P,oe.z+=oe.driftZ*P,oe.age>=oe.life&&(oe.active=!1));let se=!1;for(const oe of w)oe.active&&(oe.age+=P,oe.age>=ji?oe.active=!1:se=!0);if(!se&&D>0&&(D=0,L=0),ne){for(D===0&&ce(q,Q),F+=P;F>=$u;)F-=$u,ce(q,Q);for(R+=P;R>=Yu;)R-=Yu,pe(q,Q);for(N+=P;N>=Zu;)N-=Zu,W(q,Q,X)}else R=0,N=0,F=0;const Y=ne&&B>0;for(let oe=0;oe<Yr;oe+=1)ie(oe,E[oe],X,Y);le(X,Y),xe(q,Q,X,ne),i.instanceMatrix.needsUpdate=!0},reset:Ae,setTrimBoost:q=>{if(!H){if(B=Number.isFinite(q)?Math.min(mv,Math.max(0,q)):0,B===0){for(const me of E)me.trimBoost=0;for(const me of w)me.trimBoost=0}$&&(B=0)}},setReducedMotion:q=>{H||$===q||($=q,q&&(B=0,Ae()))},dispose:()=>{H||(H=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),f.removeFromParent(),l.dispose(),d.dispose(),A.removeFromParent(),h.dispose(),x.dispose(),C.clear())}}}const Qi=48,ju=.065,Ju=.09,Qu=.65,_v=.08,xv=.12,vv=.3,Mv=.06,Sv=.1,ed=-7.5,ba=.035,td=3254217;function kt(n,e){return Number.isFinite(n)?n:e}function er(n,e,t){return Math.min(t,Math.max(e,n))}function Ea(n){return n!=null}function yv(n){const e=new Ao(1,0),t=new An({color:16055287,vertexColors:!0,transparent:!0,opacity:.76,depthWrite:!1,side:yt}),i=new Yd(e,t,Qi);i.name="phase-twelve-hull-spray",i.frustumCulled=!1,i.instanceMatrix.setUsage(Ot),i.instanceColor=new _c(new Float32Array(Qi*3),3),i.instanceColor.setUsage(Ot),n.add(i);const r=Array.from({length:Qi},()=>({active:!1,age:Number.POSITIVE_INFINITY,life:0,x:0,y:0,z:0,velocityX:0,velocityY:0,velocityZ:0,size:0,elongation:1,kind:0})),s=new Mt,o=new Ge(16318460),a=new Ge(12577250);let l=0,c=0,u=0,d=td,f=!1,m=!1;const g=()=>(d=Math.imul(d,1664525)+1013904223>>>0,d/4294967295),_=A=>{A.active=!1,A.age=Number.POSITIVE_INFINITY,A.life=0,A.size=0},p=(A,E)=>{if(!E.active||E.age>=E.life){_(E),s.scale.setScalar(0),s.position.set(0,0,0),s.updateMatrix(),i.setMatrixAt(A,s.matrix),i.setColorAt(A,E.kind===0?o:a);return}const C=er(E.age/E.life,0,1),w=C<.12?C/.12:Math.max(0,1-(C-.12)/.88),M=E.size*w;s.position.set(E.x,E.y,E.z),s.rotation.set(0,0,0),s.scale.set(M*E.elongation,M,M),s.updateMatrix(),i.setMatrixAt(A,s.matrix),i.setColorAt(A,E.kind===0?o:a)},h=A=>{const E=r[l];return l=(l+1)%Qi,E.active=!0,E.age=0,E.kind=A,E},S=(A,E,C,w,M,y,R,N)=>{const L=Er(N),D=er(kt(A.closingSpeed,0),0,4),F=h(0),B=.18+g()*.42;F.x=kt(A.x,0)+M*E*B,F.z=kt(A.z,0)+y*E*B;const $=Gn(F.x,F.z,N)+ba;F.y=Math.max(kt(A.y,0),$),F.velocityX=C*(.2+R*.035)+M*E*(.12+g()*.18)+L.x*.025,F.velocityZ=w*(.2+R*.035)+y*E*(.12+g()*.18)+L.z*.025,F.velocityY=.62+g()*.65+D*.22,F.life=.45+g()*.25,F.size=.07+g()*.055+Math.min(.035,R*.003),F.elongation=1.2+g()*.55},v=(A,E,C,w,M,y,R,N,L)=>{const D=Er(L),F=h(1);F.x=kt(A.x,0),F.z=kt(A.z,0);const B=Gn(F.x,F.z,L)+ba;F.y=Math.max(kt(A.y,0),B),F.velocityX=C*(.12+R*.018)+M*E*(.16+N*.18)+D.x*.018,F.velocityZ=w*(.12+R*.018)+y*E*(.16+N*.18)+D.z*.018,F.velocityY=.22+g()*.3+N*.25,F.life=.32+g()*.18,F.size=.065+g()*.045+N*.025,F.elongation=1.1+g()*.5},x=()=>{if(!m){l=0,c=0,u=0,d=td;for(let A=0;A<Qi;A+=1)_(r[A]),p(A,r[A]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}};return x(),{update:(A,E,C)=>{if(m||f)return;const w=Number.isFinite(C)?er(C,0,Sv):0;if(w<=0)return;const M=Number.isFinite(E)?E:0,y=kt(A?.forwardSpeed,0),R=A?.bowPort,N=A?.bowStarboard,L=A?.leewardRail;let D=kt(R?.x,0)-kt(N?.x,0),F=kt(R?.z,0)-kt(N?.z,0);const B=Math.hypot(D,F);B<1e-6?(D=-1,F=0):(D/=B,F/=B);let $=F,H=-D;const ie=Math.hypot($,H);ie<1e-6?($=0,H=1):($/=ie,H/=ie);const Z=[[R,1],[N,-1]];let pe,Ee=1;for(const[W,ce]of Z)Ea(W)&&(W.clearance>vv||W.closingSpeed<=_v||(!pe||W.closingSpeed>pe.closingSpeed)&&(pe=W,Ee=ce));const De=y>=Qu&&Ea(pe),Ue=y>=Qu&&Ea(L)&&L.clearance<=Mv&&kt(A?.heelLoad,0)>=xv;for(const W of r){if(!W.active)continue;W.age+=w,W.x+=W.velocityX*w,W.y+=W.velocityY*w+.5*ed*w*w,W.z+=W.velocityZ*w,W.velocityY+=ed*w;const ce=Gn(W.x,W.z,M)+ba;if(W.y<=ce){W.y=ce,W.active=!1;continue}W.age>=W.life&&(W.active=!1)}if(De&&pe){c+=w;let W=0;for(;c>=ju&&W<2;)c-=ju,S(pe,Ee,$,H,D,F,er(y,0,20),M),W+=1}else c=0;if(Ue&&L){u+=w;let W=0;for(;u>=Ju&&W<2;){u-=Ju;const ce=A.leewardSide==="port"?1:-1;v(L,ce,$,H,D,F,er(y,0,20),er(kt(A?.heelLoad,0),0,1),M),W+=1}}else u=0;for(let W=0;W<Qi;W+=1)p(W,r[W]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)},reset:x,setReducedMotion:A=>{m||f===A||(f=A,A&&x())},dispose:()=>{m||(m=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),s.clear())}}}const bv=new k(0,5.87,-.34),hh=new k(1,0,0),Ei=5,Ev=2.25,Av=1.42,wv=.42,Tv=.28,Rv=.25;function _n(n,e=0){return Number.isFinite(n)?n:e}function nd(n,e){const t=new k(_n(n),0,_n(e));return t.lengthSq()<1e-12?hh.clone():t.normalize()}function Cv(n,e){const t=new ht,i=new Float32Array((Ei+1)*2*3),r=new Float32Array((Ei+1)*2*3),s=new Ge(15757160),o=new Ge(16773590);for(let l=0;l<=Ei;l+=1){const c=l%2===0?s:o;for(let u=0;u<2;u+=1){const d=(l*2+u)*3;c.toArray(r,d)}}const a=[];for(let l=0;l<Ei;l+=1){const c=l*2,u=c+2;a.push(c,u,c+1,c+1,u,u+1)}return t.setAttribute("position",new nt(i,3)),t.setAttribute("color",new nt(r,3)),t.setIndex(a),t.userData={length:n,width:e,segments:Ei},t}function id(n,e,t,i){const r=Cv(e,t),s=new An({vertexColors:!0,side:yt,transparent:!1,opacity:1,depthWrite:!0,forceSinglePass:!0,toneMapped:!1}),o=new Ve(r,s);return o.name=n,o.userData={length:e,width:t,phase:i,direction:new k},{mesh:o,origin:new k,length:e,width:t,phase:i,direction:hh.clone()}}function Aa(n,e,t,i){const r=n.mesh.geometry.getAttribute("position");n.direction.copy(e),n.mesh.userData.direction.copy(n.direction);for(let o=0;o<=Ei;o+=1){const a=o/Ei,l=n.width*(1-a*.76),c=i?0:Math.sin(t*5.4+n.phase+a*3.2)*.055*a,u=i?0:Math.cos(t*4.1+n.phase+a)*.035*a,d=n.origin.x+e.x*n.length*a-e.z*c,f=n.origin.y+u,m=n.origin.z+e.z*n.length*a+e.x*c;r.setXYZ(o*2,d,f+l,m),r.setXYZ(o*2+1,d,f-l,m)}r.needsUpdate=!0,n.mesh.geometry.computeBoundingSphere()}function Pv(n,e,t){const i=[],r=[],s=[],o=Array.isArray(t)?t:[];for(let p=0;p<o.length;p+=1){o[p];const h=new Jt(.035,.055,3,5),S=new An({color:5131331,toneMapped:!1}),v=new Ve(h,S);v.name=`wind-flag-land-mast-${p}`,n.add(v),s.push(v),i.push(h,S);const x=id(`wind-flag-land-${p}`,Ev,wv,p*1.7);n.add(x.mesh),r.push(x),i.push(x.mesh.geometry,x.mesh.material)}const a=id("wind-flag-vessel-masthead",Av,Tv,4.7);n.add(a.mesh),r.push(a),i.push(a.mesh.geometry,a.mesh.material);let l=0,c=!1,u=!1;const d=new k,f=new k,m=()=>{for(let p=0;p<o.length;p+=1){const h=o[p],S=s[p],v=r[p],x=_n(h?.x),A=_n(h?.y),E=_n(h?.z);S.position.set(x,A+1.5,E),v.origin.set(x,A+3,E)}},g=(p,h,S)=>{if(u)return;Math.min(Rv,Math.max(0,_n(S)))>0&&(l=_n(h,l)),m();const x=Er(_n(h));d.set(x.x,0,x.z);const A=nd(d.x,d.z);for(let w=0;w<o.length;w+=1)Aa(r[w],A,l,c);e.updateMatrixWorld(!0),f.copy(bv),e.localToWorld(f),a.origin.copy(f);const E=Qc(x,_n(p?.velocityX),_n(p?.velocityZ)),C=Math.hypot(E.x,E.z)<1e-6?a.direction:nd(E.x,E.z);Aa(a,C,l,c)};return{update:g,reset:()=>{u||(l=0,m(),g({velocityX:0,velocityZ:0},0,0))},setReducedMotion:p=>{if(!u){c=p===!0;for(const h of r)Aa(h,h.direction,l,c)}},dispose:()=>{if(!u){u=!0;for(const p of s)p.removeFromParent(),p.geometry.dispose(),p.material.dispose();for(const p of r)p.mesh.removeFromParent(),p.mesh.geometry.dispose(),p.mesh.material.dispose();i.length=0}}}}const Hn=10,Co=4,el=100,Iv=80,fh=Co*el,Lv=Co*Iv,Dv=.98,rd=.2,as=5,ph=as*2,sd=.3,Uv=1.1,Nv=.04,od=yo*Ft.maxWaveScale,Fv=Math.hypot(Nt.directionX,Nt.directionZ),Ov=fh*3,Bv=fh;function Wn(n,e){return Number.isFinite(n)?n:e}function cs(n,e,t){return Math.min(t,Math.max(e,n))}function ad(n,e,t){const i=cs((t-n)/Math.max(e-n,1e-6),0,1);return i*i*(3-2*i)}function zv(n,e,t,i,r=0){if(!Number.isFinite(t))return 0;const s=cs((Nt.directionX*Wn(n,0)+Nt.directionZ*Wn(e,0))/Fv,0,1),o=ad(-.15,.7,t),a=.6+.4*ad(-.2,1,Wn(i,0)),l=1+.25*cs(Wn(r,0),0,1);return cs(o*a*s*l,0,1)}function mh(n){return Math.max(.1,Wn(n?.landCollisionRadius,1))*Dv}function Hv(n,e){const i=((e%Hn+Hn)%Hn+.5)*Math.PI*2/Hn,r=Math.sin(i),s=Math.cos(i),o=s,a=-r,c=mh(n)*Math.cos(Math.PI/Hn),u=Wn(n.position?.x,0)+r*(c+rd),d=Wn(n.position?.z,0)+s*(c+rd);return{x:u,z:d,normalX:r,normalZ:s,tangentX:o,tangentZ:a}}function kv(){const n=new Uint16Array(Lv*3);let e=0;for(let t=0;t<Co;t+=1)for(let i=0;i<Hn;i+=1){const r=t*el+i*ph;for(let s=0;s<as-1;s+=1){const o=r+s*2,a=o+2;n[e++]=o,n[e++]=a,n[e++]=o+1,n[e++]=a,n[e++]=a+1,n[e++]=o+1}}return n}function Vv(n,e){const t=new Float32Array(Ov),i=new Float32Array(Bv),r=new ht;r.setAttribute("position",new nt(t,3).setUsage(Ot)),r.setAttribute("aAlpha",new nt(i,1).setUsage(Ot)),r.setIndex(new nt(kv(),1));const s=new Rn({uniforms:{color:{value:new Ge(16055287)}},vertexShader:"attribute float aAlpha; varying float vAlpha; void main(){vAlpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`uniform vec3 color; varying float vAlpha; void main(){gl_FragColor=vec4(color,vAlpha);
#include <tonemapping_fragment>
#include <colorspace_fragment>}`,transparent:!0,depthWrite:!1,depthTest:!0,side:yt,forceSinglePass:!0}),o=new Ve(r,s);o.name="phase-fifteen-shoreline-foam",o.frustumCulled=!1,n.add(o);const a=e.slice(0,Co).map(m=>({anchors:Array.from({length:Hn},(g,_)=>Hv(m,_)),halfSpan:Math.max(.04,mh(m)*Math.sin(Math.PI/Hn)-.18),hasDock:m.id==="island-projects"}));o.visible=a.length>0;let l=!1,c=!1,u=0;const d=(m,g)=>{if(!(a.length===0||l)){for(let _=0;_<a.length;_+=1){const p=a[_];for(let h=0;h<Hn;h+=1){const S=p.anchors[h],v=gr(S.x,S.z,m),x=g?_s(S.x,S.z,g):Gn(S.x,S.z,m),A=p.hasDock&&S.normalX*Math.SQRT1_2+S.normalZ*Math.SQRT1_2>.95?0:1,E=zv(S.normalX,S.normalZ,x,v.velocityY,v.stormIntensity)*A,C=sd+(Uv-sd)*E;for(let w=0;w<as;w+=1){const M=(w/(as-1)*2-1)*p.halfSpan,y=Math.sin(Math.PI*w/(as-1));for(let R=0;R<2;R+=1){const N=_*el+h*ph+w*2+R,L=R*C,D=S.x+S.tangentX*M+S.normalX*L,F=S.z+S.tangentZ*M+S.normalZ*L;t[N*3]=D,t[N*3+1]=cs(Wn(g?_s(D,F,g):Gn(D,F,m),0),-od,od)+Nv,t[N*3+2]=F,i[N]=Math.min(.6,E*y*(.76+R*.08))}}}}r.getAttribute("position").needsUpdate=!0,r.getAttribute("aAlpha").needsUpdate=!0}},f=()=>{c||(u=0,d(0))};return f(),{mesh:o,update:(m,g)=>{c||(u=Wn(m,u),d(l?0:u,l?void 0:g))},reset:f,setReducedMotion:m=>{c||(l=m,o.visible=a.length>0&&!l,l?(i.fill(0),r.getAttribute("aAlpha").needsUpdate=!0):d(u))},dispose:()=>{c||(c=!0,n.remove(o),r.dispose(),s.dispose())}}}const sn=1e-7,wa=.28,cd=20;function ls(n){return typeof n=="number"&&Number.isFinite(n)}function Gv(n){return ls(n?.x)&&ls(n?.z)}function lr(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Fn(n,e,t){return{ok:!1,islandId:n,reason:e,message:t}}function Wv(n,e,t){return Math.min(t,Math.max(e,n))}function Xv(n,e,t){const i=t.x-e.x,r=t.z-e.z,s=i*i+r*r;if(s<=sn)return lr(n,e);const o=Wv(((n.x-e.x)*i+(n.z-e.z)*r)/s,0,1);return Math.hypot(n.x-(e.x+i*o),n.z-(e.z+r*o))}function us(n,e,t){const i=e-t;return n.x>=-i-sn&&n.x<=i+sn&&n.z>=-i-sn&&n.z<=i+sn}function qv(n,e,t,i,r){if(!us(n,i,r)||!us(e,i,r))return!1;for(const s of t){const o=s.radius+r;if(Xv(s.center,n,e)<o-sn)return!1}return!0}function Yv(n){let e=0;for(let t=1;t<n.length;t+=1)e+=lr(n[t-1],n[t]);return e}function ld(n){return`${n.x.toFixed(5)}:${n.z.toFixed(5)}`}function Zv(n,e,t,i,r=i?.vesselClearance){const s=t.find(L=>L.id===e);if(!s)return Fn(e,"unknown-island",`Unknown island "${e}".`);if(!Gv(n))return Fn(e,"invalid-start","The vessel position is not finite.");const o=i?.worldLimit,a=r;if(!ls(o)||o<=0||!ls(a)||a<0||a>=o)return Fn(e,"invalid-bounds","Navigation bounds must be finite and leave room for the vessel.");if(!us(n,o,a))return Fn(e,"invalid-start","The vessel is outside the navigable water bounds.");const l=t.map(L=>({center:{x:L.position.x,z:L.position.z},radius:L.landCollisionRadius})),c=t.findIndex(L=>L.id===e),u=s.landCollisionRadius+a,d=s.dockingTriggerRadius-u;if(!ls(d)||d<=wa*2)return Fn(e,"target-annulus-too-small","There is not enough safe water inside the docking zone.");if(lr(n,l[c].center)<u-sn)return Fn(e,"start-in-obstacle","The vessel starts inside an island clearance envelope.");const m=l[c].center,g=n.x-m.x,_=n.z-m.z,p=Math.hypot(g,_),h=u+Math.min(wa,d*.34),S=p>sn?g/p:1,v=p>sn?_/p:0,x={x:m.x+S*h,z:m.z+v*h};if(!us(x,o,a))return Fn(e,"target-out-of-bounds","The docking point is outside the navigable water bounds.");const A=[{point:{x:n.x,z:n.z},obstacleIndex:null},{point:x,obstacleIndex:null}],E=new Set(A.map(L=>ld(L.point)));t.forEach((L,D)=>{const F=L.landCollisionRadius+a+wa;for(let B=0;B<cd;B+=1){const $=B/cd*Math.PI*2,H={x:L.position.x+Math.cos($)*F,z:L.position.z+Math.sin($)*F};if(!us(H,o,a)||t.some((Z,pe)=>pe===D?!1:lr(H,{x:Z.position.x,z:Z.position.z})<Z.landCollisionRadius+a-sn))continue;const ie=ld(H);E.has(ie)||(E.add(ie),A.push({point:H,obstacleIndex:D}))}});const C=A.map(()=>[]);for(let L=0;L<A.length;L+=1)for(let D=L+1;D<A.length;D+=1){if(!qv(A[L].point,A[D].point,l,o,a))continue;const F=lr(A[L].point,A[D].point);C[L].push({to:D,cost:F}),C[D].push({to:L,cost:F})}const w=A.map(()=>Number.POSITIVE_INFINITY),M=A.map(()=>-1),y=A.map(()=>!1);w[0]=0;for(let L=0;L<A.length;L+=1){let D=-1,F=Number.POSITIVE_INFINITY;for(let B=0;B<A.length;B+=1)!y[B]&&w[B]<F&&(F=w[B],D=B);if(D<0||!Number.isFinite(F)||(y[D]=!0,D===1))break;for(const B of C[D]){const $=F+B.cost;$<w[B.to]-sn&&(w[B.to]=$,M[B.to]=D)}}if(!Number.isFinite(w[1]))return Fn(e,"no-safe-route","No bounded safe route to the docking zone could be found.");const R=[];for(let L=1;L>=0&&(R.push(A[L].point),L!==0);L=M[L])if(M[L]<0)return Fn(e,"no-safe-route","The safe route graph is disconnected.");R.reverse();const N=R.filter((L,D)=>D===0||lr(L,R[D-1])>sn);return{ok:!0,islandId:e,points:N,target:x,distance:Yv(N),clearance:a}}const ud=.8,dd=12,$v=16,Kv=60,gh=1e-7,jv=.01;function oi(n){return typeof n=="number"&&Number.isFinite(n)}function Ar(n,e,t){return Math.min(t,Math.max(e,n))}function xs(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function Jv(n,e){return xs(e-n)}function tl(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Qv(n){let e=0;for(let t=1;t<n.length;t+=1)e+=tl(n[t-1],n[t]);return e}function yc(n){return{x:n.x,z:n.z}}function _h(n){return{x:oi(n?.x)?n.x:0,z:oi(n?.z)?n.z:0,heading:xs(oi(n?.heading)?n.heading:0)}}function eM(n){return{..._h(n),status:"idle",islandId:null,route:[],elapsed:0,duration:0,travelledDistance:0,totalDistance:0,velocityX:0,velocityZ:0,reason:null}}function sr(n={x:0,z:0,heading:0}){return eM(n)}function po(n,e,t){return{...n,status:e,reason:t,velocityX:0,velocityZ:0}}function tM(n,e){if(n.length===0)return{point:{x:0,z:0},heading:0};if(n.length===1)return{point:yc(n[0]),heading:0};let t=Math.max(0,e);for(let s=1;s<n.length;s+=1){const o=n[s-1],a=n[s],l=tl(o,a);if(t<=l||s===n.length-1){const c=l>gh?Ar(t/l,0,1):1;return{point:{x:o.x+(a.x-o.x)*c,z:o.z+(a.z-o.z)*c},heading:Math.atan2(a.x-o.x,a.z-o.z)}}t-=l}const i=n[n.length-1],r=n[n.length-2];return{point:yc(i),heading:Math.atan2(i.x-r.x,i.z-r.z)}}function nM(n){const e=Ar(n,0,1);return e*e*(3-2*e)}function iM(n,e,t={}){const i=n??sr(),r=e?.route,s=Array.isArray(r)&&r.every(f=>oi(f?.x)&&oi(f?.z)),o=s?r.map(yc):[];if(!e?.islandId||!s||o.length===0)return po({...i,islandId:e?.islandId??null,route:o},"failed","Scanner route is empty or invalid.");if(tl(i,o[0])>jv)return po({...i,islandId:e.islandId,route:o},"failed","Scanner route does not start at the vessel position.");const a=Qv(o);if(a<=gh)return po({...i,islandId:e.islandId,route:o,x:o[o.length-1].x,z:o[o.length-1].z},"arrived",null);const l=oi(t.maxSpeed)&&t.maxSpeed>0?t.maxSpeed:$v,c=Ar(a/l,ud,dd),u=oi(t.duration)&&t.duration>0?Ar(t.duration,ud,dd):c,d=_h(i);return{...i,...d,x:o[0].x,z:o[0].z,heading:xs(d.heading),status:"active",islandId:e.islandId,route:o,elapsed:0,duration:u,travelledDistance:0,totalDistance:a,velocityX:0,velocityZ:0,reason:null}}function rM(n,e="Scanner cancelled by user."){return po({...n},"cancelled",e)}function hd(n,e){if(!n||n.status!=="active")return n;const t=oi(e)?Ar(e,0,Kv):0,i=Math.min(n.duration,n.elapsed+t),r=n.duration>0?i/n.duration:1,s=nM(r),o=n.totalDistance*s,a=tM(n.route,o),l={x:n.x,z:n.z},c=t>0?(a.point.x-l.x)/t:0,u=t>0?(a.point.z-l.z)/t:0,d=r>=1?1:Ar(t*5.5,0,1),f=xs(n.heading+Jv(n.heading,a.heading)*d);return r>=1-Number.EPSILON?{...n,x:n.route[n.route.length-1].x,z:n.route[n.route.length-1].z,heading:xs(a.heading),elapsed:n.duration,travelledDistance:n.totalDistance,status:"arrived",velocityX:0,velocityZ:0,reason:null}:{...n,x:a.point.x,z:a.point.z,heading:f,elapsed:i,travelledDistance:o,velocityX:c,velocityZ:u}}function ti(n){return n.status==="active"}const tr=[.012,.16,.23],Ta=[.018,.31,.4],Ra=[.045,.43,.5],fd=[.34,.58,.56],pd=[.007,.02,.045],sM=[.016,.055,.085],oM=[.055,.12,.16],aM=[.28,.34,.36];function cM(n){const e=rh(),t=e.length*e.length,i=new Float32Array(t*3),r=new Float32Array(t*3),s=[],o=[];let a=0;for(let h=0;h<e.length;h+=1)for(let S=0;S<e.length;S+=1){const v=e[S],x=e[h];o.push([v,x]),i[a*3]=v,i[a*3+1]=0,i[a*3+2]=x,a+=1}const l=e.length;for(let h=0;h<l-1;h+=1)for(let S=0;S<l-1;S+=1){const v=h*l+S,x=v+1,A=v+l,E=A+1;sh(h,S)?s.push(v,A,x,x,A,E):s.push(v,A,E,v,E,x)}const c=new ht,u=new nt(i,3),d=new nt(r,3);u.setUsage(Ot),d.setUsage(Ot),c.setAttribute("position",u),c.setAttribute("color",d),c.setIndex(s),c.computeVertexNormals();const f=new rn({color:16777215,roughness:.5,metalness:.08,flatShading:!0,vertexColors:!0}),m=new Ve(c,f);m.name="phase-one-water-field",n.add(m);const g=lM(i);n.add(g.mesh);let _=!1;const p=h=>{if(_)return;const S=Number.isFinite(h)?h:0,v=c.getAttribute("position"),x=c.getAttribute("color");for(let A=0;A<o.length;A+=1){const[E,C]=o[A],w=gr(E,C,S);v.setY(A,w.height),dM(x,A,w.height,w.slopeX,w.slopeZ,w.stormIntensity)}v.needsUpdate=!0,x.needsUpdate=!0,g.update(S)};return p(0),{mesh:m,crestMesh:g.mesh,update:p,dispose:()=>{_||(_=!0,c.dispose(),f.dispose(),m.removeFromParent(),g.dispose())}}}function lM(n){const e=Nt.directionX,t=Nt.directionZ,i=-t,r=e,s=1/(e*e+t*t),o=1/(i*i+r*r),a=ln.outerLimit*(Math.abs(i)+Math.abs(r)),l=ln.outerLimit*(Math.abs(e)+Math.abs(t)),c=Math.PI*.5-Nt.phase,u=Math.ceil((-l*Nt.waveNumber-c)/(Math.PI*2))-1,d=Math.floor((l*Nt.waveNumber-c)/(Math.PI*2))+1,f=Math.PI*2/Nt.waveNumber,m=(c+u*Math.PI*2)/Nt.waveNumber,g=(d-u+1)*f,_=[];for(let L=u;L<=d;L+=1){let D=0,F=-a+nr(L+821,431)*44;for(;F<=a;)_.push({normalIndex:L,normalOffset:(nr(L*43+D*23+149,L*11+D*37+337)-.5)*f*.9,tangentCenter:F,activity:nr(L*31+D*17+401,L*13+D*7+911),halfLength:3+nr(L*37+D*13+211,L*7+D*31+263)*2.5,halfWidth:.18+nr(L*41+D*17+307,L*5+D*43+359)*.16}),F+=32+nr(L*19+D*29+71,L*23+D*11+173)*26,D+=1}const p=new Float32Array(_.length*4*3),h=new Float32Array(_.length*4),S=new Float32Array(_.length*4*2),v=[];for(let L=0;L<_.length;L+=1){const D=L*4;v.push(D,D+1,D+2,D,D+2,D+3),S[(D+0)*2]=0,S[(D+0)*2+1]=0,S[(D+1)*2]=1,S[(D+1)*2+1]=0,S[(D+2)*2]=1,S[(D+2)*2+1]=1,S[(D+3)*2]=0,S[(D+3)*2+1]=1}const x=new ht,A=new nt(p,3),E=new nt(h,1);A.setUsage(Ot),E.setUsage(Ot),x.setAttribute("position",A),x.setAttribute("crestOpacity",E),x.setAttribute("crestUv",new nt(S,2)),x.setIndex(v);const C=new Rn({transparent:!0,depthWrite:!1,side:yt,toneMapped:!1,uniforms:{},vertexShader:`
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
    `}),w=new Ve(x,C);w.name="phase-one-water-crest-ribbons";const M=new Float64Array(9),y={x:0,z:0,support:0};let R=!1;const N=L=>{if(R)return;const D=Number.isFinite(L)?L:0,F=D*Nt.angularSpeed/Nt.waveNumber;for(let B=0;B<_.length;B+=1){const $=_[B],H=(c+$.normalIndex*Math.PI*2)/Nt.waveNumber+$.normalOffset,ie=m+hM(H-F-m,g),Z=$.tangentCenter,pe=e*ie*s+i*Z*o,Ee=t*ie*s+r*Z*o,De=$.activity>.48;y.x=pe,y.z=Ee,y.support=0;const Ue=De?uM(pe,Ee,e,t,D,M,y):y,W=Ue.x,ce=Ue.z,le=xh(W,ce),xe=Ue.support*(.3+le*.18),Ae=i*$.halfLength,q=r*$.halfLength,me=e*$.halfWidth,ae=t*$.halfWidth,P=B*4;so(A,P,W-Ae-me,ce-q-ae,n),so(A,P+1,W+Ae-me,ce+q-ae,n),so(A,P+2,W+Ae+me,ce+q+ae,n),so(A,P+3,W-Ae+me,ce-q+ae,n),E.setX(P,xe),E.setX(P+1,xe),E.setX(P+2,xe),E.setX(P+3,xe)}A.needsUpdate=!0,E.needsUpdate=!0};return N(0),{mesh:w,update:N,dispose:()=>{R||(R=!0,x.dispose(),C.dispose(),w.removeFromParent())}}}function so(n,e,t,i,r){const s=xh(t,i);n.setXYZ(e,t,_s(t,i,r)+.045+s*.018,i)}function uM(n,e,t,i,r,s,o){let c=0;for(let p=0;p<s.length;p+=1){const h=p*1.5-6;s[p]=Lt(n+t*h,e+i*h,r),s[p]>s[c]&&(c=p)}let u=0;if(c>0&&c<s.length-1){const p=s[c-1]-2*s[c]+s[c+1];p<-1e-5&&(u=Math.max(-.5,Math.min(.5,.5*(s[c-1]-s[c+1])/p)))}const d=(c+u)*1.5-6;o.x=n+t*d,o.z=e+i*d;const f=Lt(o.x,o.z,r),m=Lt(o.x-t*3.5,o.z-i*3.5,r),g=Lt(o.x+t*3.5,o.z+i*3.5,r),_=f-Math.max(m,g);return o.support=si(.025,.19,_)*(1-si(3.5,6,Math.abs(d)))*si(0,.4,f),o}function dM(n,e,t,i,r,s=0){const o=Math.min(1,Math.max(0,s)),a=1+o*(Ft.maxWaveScale-1),l=(t+yo*a)/(yo*2*a),c=si(.1,.52,l),u=si(.6,.9,l)*.52,d=Math.min(1,Math.hypot(i,r)*2.8),f=si(.76,.96,l)*si(.24,.5,d)*.16,m=tr[0]+(Ta[0]-tr[0])*c,g=tr[1]+(Ta[1]-tr[1])*c,_=tr[2]+(Ta[2]-tr[2])*c,p=m+(Ra[0]-m)*u,h=g+(Ra[1]-g)*u,S=_+(Ra[2]-_)*u,v=Math.min(.3,f+o*si(.38,.78,d)*.06);for(let x=0;x<3;x+=1){const A=pd[x]+(sM[x]-pd[x])*c,E=A+(oM[x]-A)*u,C=x===0?p:x===1?h:S,w=C+(E-C)*o,M=fd[x]+(aM[x]-fd[x])*o;n.array[e*3+x]=w+(M-w)*v}}function xh(n,e){return Math.min(1,Math.max(0,Ro(n,e).intensity))}function si(n,e,t){const i=Math.min(1,Math.max(0,(t-n)/(e-n)));return i*i*(3-2*i)}function nr(n,e){const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function hM(n,e){return(n%e+e)%e}const md=1.75,ni=1/120,fM=.1,gd=12;function pM(n,e={}){const t=e.reducedMotion??(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches),i=new vp;i.background=new Ge(536381),i.fog=new Xc(536381,540,800);const r=Ux(),s=r.camera;let o={...e.framingInsets};r.setFramingInsets(o),r.setReducedMotion(!!t);const a=new gx({antialias:!0,powerPreference:"high-performance"});a.setPixelRatio(Math.min(window.devicePixelRatio||1,md)),a.setClearColor(536381,1),a.outputColorSpace=jt,a.toneMapping=Rd,a.toneMappingExposure=1.12,a.shadowMap.enabled=!1,a.domElement.setAttribute("aria-label","Animated isometric water field"),a.domElement.style.display="block",a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.style.touchAction="none",n.appendChild(a.domElement);const l=cM(i),c=e.islands??[],u=ir.filter(U=>c.some(z=>z.id===U.islandId));nf(u,c,Dc,Ke.collisionRadius,Ft.worldLimit);const d=bx(i,u,c),f=Tx(i,c),m=Vv(i,e.islands??[]),g=l.mesh.geometry.getAttribute("position").array,_=sv(i),p=gv(i),h=yv(i),S=Pv(i,_.group,f.windFlagAnchors);let v=!!t;_.setReducedMotion(v),p.setReducedMotion(v),h.setReducedMotion(v),S.setReducedMotion(v),m.setReducedMotion(v),m.update(0,g);let x=!1,E=Bu(or.x,or.z),C={throttle:0,rudder:0,brake:!1},w=Du(),M=yu(),y=null;const R=new k,N={worldLimit:Ft.worldLimit,obstacles:(e.islands??[]).map(U=>({x:U.position.x,z:U.position.z,radius:U.landCollisionRadius}))};let L=sr({x:E.x,z:E.z,heading:E.heading}),D={status:"idle",islandId:null};const F=()=>{const U=ti(L),z=C.brake||x,ee=pn(E,w.sailAngle,z?1:0),j=U?ee.suggestedAngle:w.sailAngle,ve=U?pn(E,j):ee,ue=pn(E,ee.suggestedAngle).power;return{sailAngle:j,suggestedAngle:ve.suggestedAngle,signedSailAngle:ve.signedAngle,relativeWindAngle:ve.relativeWindAngle,power:ve.power,noGo:ve.noGo,windSpeed:Qc(Er(),E.velocityX,E.velocityZ).speed,luffing:z,moored:x,assisted:U,trimMode:w.mode,trimEngaged:w.engaged,trimEfficiency:ue>1e-6?Ca(ve.power/ue,0,1):0,sweetSpot:!U&&!z&&!ve.noGo&&w.sweetSpot,trimBoost:U||z||ve.noGo?0:w.boost,boostSerial:w.boostSerial}},B=(U=!1)=>{const z=F();_.setSailLoad(z.power,z.relativeWindAngle),_.setSailAngle(z.signedSailAngle,U),e.onSailingUpdate?.(z)},$=(U,z,ee)=>{D=ee===void 0?{status:U,islandId:z}:{status:U,islandId:z,message:ee},e.onScanUpdate?.(D)},H=()=>{const{islandId:U,selectedHarbourId:z,nearbyHarbourId:ee}=M;if(y?.islandId===U&&y.selectedHarbourId===z&&y.nearbyHarbourId===ee)return;y={islandId:U,selectedHarbourId:z,nearbyHarbourId:ee};const j=u.find(ve=>ve.id===z&&ve.islandId===U);r.setLocalTarget(j?hs(j,c):null),e.onHarbourUpdate?.(y)},ie=()=>{const U=gM(n),z=_M(n);R.copy(_.group.position).project(s),e.onVesselProjection?.({x:(R.x*.5+.5)*U,y:(.5-R.y*.5)*z}),e.onLandmarkProjection?.(_d(s,U,z,f.anchors,o)),e.onHarbourProjection?.(M.islandId?_d(s,U,z,d.anchors,o):[])},Z=()=>C.targetHeading!==void 0||Math.abs(C.sheet??0)>1e-6||Math.abs(C.rudder)>1e-6||C.brake,pe=()=>{p.reset(),h.reset(),B(!0),_.resetPose(E,X),S.update(E,X,0),r.snapTo(E.x,E.z),l.update(X),m.update(X,g),e.onVesselUpdate?.(oo(E)),d.update(M,g),ie(),a.render(i,s)},Ee=U=>{L=U,U.status==="arrived"&&(x=!0),E={x:U.x,z:U.z,velocityX:U.velocityX,velocityZ:U.velocityZ,heading:U.heading,yawRate:0}},De=U=>{const z=U.status==="active"?"travelling":U.status;$(z,U.islandId,U.reason??void 0)},Ue=U=>{ti(L)&&(Ee(rM(L,U)),De(L))},W=U=>{if(!ti(L))return;const z=L.status;Ee(hd(L,U)),L.status!==z&&De(L)};i.add(new Cp(10999760,471872,1.65));const ce=new Zl(16769723,2.35);ce.position.set(-55,80,42),i.add(ce);const le=new Zl(6209481,.48);le.position.set(75,42,-65),i.add(le);let xe=!1,Ae=t,q=typeof document<"u"?document.hidden:!1,me=!0,ae=null,P=0,X=0,te=0;const Q=()=>Ae||q||!me,ne=U=>{if(xe)return;P||(P=U);const z=Math.min(Math.max(0,(U-P)/1e3),fM);if(P=U,!Q()){te=Math.min(te+z,ni*gd);let ee=0;for(;te+1e-9>=ni&&ee<gd;)ti(L)?W(ni):x||(w=Uu(w,E,{sheet:C.sheet??0,engage:C.targetHeading!==void 0||Math.abs(C.rudder)>1e-6,resumeAuto:!1,suppressed:C.brake},ni),E=Zx(E,{...C,sailAngle:w.sailAngle,trimBoost:w.boost},ni,N,v?void 0:X)),X+=ni,M=vx(M,{position:E,speed:Math.hypot(E.velocityX,E.velocityZ),deltaSeconds:ni,manualIntent:Z(),scannerActive:ti(L)},c,u),te=Math.max(0,te-ni),ee+=1;H(),r.update(E.x,E.z,z),B(),_.update(E,X,z),S.update(E,X,z),p.setTrimBoost(ti(L)||x?0:w.boost),p.update(E,X,z),ti(L)||x?h.reset():h.update(_.getWaterContact(),X,z),e.onVesselUpdate?.(oo(E))}if(l.update(X),m.update(X,g),d.update(M,g),ie(),a.render(i,s),Q()){ae=null;return}ae=window.requestAnimationFrame(ne)},se=()=>{xe||ae!==null||(P=0,ae=window.requestAnimationFrame(ne))},Y=()=>{ae!==null&&(window.cancelAnimationFrame(ae),ae=null)},oe=()=>{if(xe)return;const U=Math.max(1,n.clientWidth||window.innerWidth),z=Math.max(1,n.clientHeight||window.innerHeight);r.resize(U,z),a.setPixelRatio(Math.min(window.devicePixelRatio||1,md)),a.setSize(U,z,!1),ie(),Q()&&a.render(i,s)},qe=U=>{xe||(U&&Ue("Scanner navigation paused."),Ae=U,Q()?(Y(),te=0,P=0,C={throttle:0,rudder:0,brake:!1},w=Qn(w),p.setTrimBoost(0),h.reset(),a.render(i,s)):se(),e.onSailingUpdate?.(F()))},We=()=>{q=document.hidden,Q()?(Y(),te=0,P=0,C={throttle:0,rudder:0,brake:!1},w=Qn(w),p.setTrimBoost(0),h.reset(),a.render(i,s)):se()},I=typeof IntersectionObserver<"u"?new IntersectionObserver(U=>{me=U[0]?.isIntersecting??!0,Q()?(Y(),te=0,P=0,C={throttle:0,rudder:0,brake:!1},w=Qn(w),p.setTrimBoost(0),h.reset(),a.render(i,s)):se()},{threshold:.01}):null,b=typeof ResizeObserver<"u"?new ResizeObserver(oe):null;return H(),oe(),B(!0),_.resetPose(E,X),S.update(E,X,0),r.snapTo(E.x,E.z),e.onVesselUpdate?.(oo(E)),e.onScanUpdate?.(D),b?.observe(n),window.addEventListener("resize",oe),I?.observe(n),document.addEventListener("visibilitychange",We),Q()?a.render(i,s):se(),{setPaused:qe,setReducedMotion:U=>{xe||(v=U,r.setReducedMotion(U),_.setReducedMotion(U),p.setReducedMotion(U),h.setReducedMotion(U),S.setReducedMotion(U),m.setReducedMotion(U),m.update(X,g),S.update(E,X,0),ie(),Q()&&a.render(i,s))},setInput:U=>{if(xe)return;const z={throttle:0,sheet:Ca(U.sheet??0,-1,1),rudder:Ca(U.rudder,-1,1),brake:!!U.brake,targetHeading:Number.isFinite(U.targetHeading)?U.targetHeading:void 0};(z.targetHeading!==void 0||Math.abs(z.sheet)>1e-6||Math.abs(z.rudder)>1e-6||z.brake)&&(Q()||(M=bu(M)),x=!1,Ue("Scanner navigation cancelled by helm input."),L.status==="arrived"&&(L=sr({x:E.x,z:E.z,heading:E.heading}),De(L))),C=z,z.brake&&(w=Qn(w),p.setTrimBoost(0),h.reset()),e.onSailingUpdate?.(F())},setAutoTrim:()=>{xe||Q()||(M=bu(M),C={throttle:0,rudder:0,brake:!1},x=!1,Ue("Scanner navigation cancelled by helm input."),L.status==="arrived"&&(L=sr({x:E.x,z:E.z,heading:E.heading}),De(L)),w=Uu(Qn(w),E,{sheet:0,engage:!0,resumeAuto:!0,suppressed:!1},0),e.onSailingUpdate?.(F()))},resetVessel:()=>{xe||(p.reset(),h.reset(),S.reset(),m.reset(),M=yu(),H(),x=!1,E=Bu(or.x,or.z),L=sr({x:E.x,z:E.z,heading:E.heading}),De(L),C={throttle:0,rudder:0,brake:!1},w=Qn(w),p.setTrimBoost(0),te=0,P=0,X=0,w=Du(),B(!0),_.resetPose(E,X),S.update(E,X,0),r.snapTo(E.x,E.z),l.update(X),m.update(X,g),e.onVesselUpdate?.(oo(E)),d.update(M,g),ie(),a.render(i,s))},getVesselState:()=>({...E}),getSailingState:F,startScan:(U,z={})=>{if(xe)return;M=Mc(M),H(),d.update(M,g),ie();const ee=Zv({x:E.x,z:E.z},U,e.islands??[],{worldLimit:Ft.worldLimit,vesselClearance:Ke.collisionRadius});if(!ee.ok){Ue("Scanner navigation replaced by an invalid route."),C={throttle:0,rudder:0,brake:!1},w=Qn(w),p.setTrimBoost(0),h.reset(),$("failed",U,ee.message);return}C={throttle:0,rudder:0,brake:!1},w=Qn(w),p.setTrimBoost(0),h.reset(),x=!1;const j=sr({x:E.x,z:E.z,heading:E.heading});if(Ee(iM(j,{islandId:U,route:ee.points})),!!z.instant||Ae){ti(L)&&Ee(hd(L,L.duration)),te=0,P=0,pe(),De(L);return}De(L),se()},cancelScan:()=>{xe||Ue("Scanner navigation cancelled.")},selectHarbour:U=>{xe||(M=xx(M,U,u),H(),d.update(M,g),ie(),Q()&&a.render(i,s))},zoomOut:()=>{xe||(M=_x(M),H(),d.update(M,g),ie(),Q()&&a.render(i,s))},setFramingInsets:U=>{if(xe)return;let z=!1;for(const ee of["top","right","bottom","left"]){const j=U[ee];if(j===void 0||!Number.isFinite(j))continue;const ve=Math.max(0,j);o[ee]!==ve&&(o[ee]=ve,z=!0)}z&&(r.setFramingInsets(o),ie(),Q()&&a.render(i,s))},dispose:()=>{xe||(xe=!0,Y(),b?.disconnect(),window.removeEventListener("resize",oe),I?.disconnect(),document.removeEventListener("visibilitychange",We),d.dispose(),f.dispose(),_.dispose(),p.dispose(),h.dispose(),S.dispose(),m.dispose(),r.dispose(),l.dispose(),a.dispose(),a.domElement.remove(),i.clear())}}}function _d(n,e,t,i,r){const s=mM(e,t,r);return i.map(({id:o,position:a})=>{const l=a.clone().project(n),c=(l.x*.5+.5)*e,u=(1-(l.y*.5+.5))*t;return{id:o,x:c,y:u,visible:l.z>=-1&&l.z<=1&&c>=s.left&&c<=e-s.right&&u>=s.top&&u<=t-s.bottom}})}function mM(n,e,t){const i=e<=460,r=n<=600?{top:140,right:20,bottom:68,left:20}:{top:160,right:28,bottom:70,left:28};return i&&(r.top=112),{top:Math.max(0,t?.top??r.top),right:Math.max(0,t?.right??r.right),bottom:Math.max(0,t?.bottom??r.bottom),left:Math.max(0,t?.left??r.left)}}function gM(n){return Math.max(1,n.clientWidth||window.innerWidth)}function _M(n){return Math.max(1,n.clientHeight||window.innerHeight)}function Ca(n,e,t){return Math.min(t,Math.max(e,Number.isFinite(n)?n:0))}function oo(n){return{x:n.x,z:n.z,heading:n.heading,speed:Math.hypot(n.velocityX,n.velocityZ)}}const xd={boost:0,serial:0,paused:!1,reducedMotion:!1},xM=.75,vM=.075,MM=.012,SM=.05,yM=.16,vd=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0,bM=()=>{const n=globalThis;return typeof n.AudioContext=="function"?n.AudioContext:typeof n.webkitAudioContext=="function"?n.webkitAudioContext:null};function EM(){let n=null,e=null,t=null,i=null,r=!1,s=!1,o=!1,a=!1,l=null,c=0,u=xd.serial,d=xd;const f=typeof document>"u"?null:document;a=!!f?.hidden;const m=()=>{a=!!f?.hidden,p()};f?.addEventListener("visibilitychange",m);const g=()=>{try{e?.stop()}catch{}try{e?.disconnect()}catch{}try{t?.disconnect()}catch{}try{i?.disconnect()}catch{}e=null,t=null,i=null},_=async()=>{const v=n;if(n=null,g(),!!v)try{await v.close()}catch{}},p=()=>{if(!n||!i||!t||r)return;const v=n.currentTime,x=vd(d.boost),A=s&&!a&&!d.paused&&!d.reducedMotion&&x>0,E=v<c?1.35:1,C=A?Math.min(vM,(MM+SM*x)*E):0,w=560+x*980;i.gain.cancelScheduledValues(v),i.gain.setTargetAtTime(C,v,C>0?.065:.035),t.frequency.cancelScheduledValues(v),t.frequency.setTargetAtTime(w,v,.09)},h=v=>{const x=Number.isFinite(v.sampleRate)&&v.sampleRate>0?v.sampleRate:44100,A=Math.max(2048,Math.min(32768,Math.round(x*xM))),E=v.createBuffer(1,A,x),C=E.getChannelData(0);let w=99539473;for(let N=0;N<C.length;N+=1)w=Math.imul(w,1664525)+1013904223>>>0,C[N]=w/4294967295*2-1;const M=v.createBufferSource();e=M,M.buffer=E,M.loop=!0;const y=v.createBiquadFilter();t=y,y.type="lowpass",y.frequency.value=560,y.Q.value=.45;const R=v.createGain();i=R,R.gain.value=0,M.connect(y),y.connect(R),R.connect(v.destination);try{M.start()}catch(N){throw g(),N}},S=async()=>{if(r)return!1;const v=bM();if(!v)return!1;try{return n||(n=new v,h(n)),n.state==="suspended"&&await n.resume(),r||!o?(await _(),!1):(s=!0,p(),!0)}catch{return s=!1,await _(),!1}};return{setEnabled:v=>r?Promise.resolve(!1):v?(o=!0,l||(l=S().finally(()=>{l=null}),l)):(o=!1,s=!1,p(),Promise.resolve(!0)),update:v=>{if(r)return;const x=vd(v.boost),A=Number.isFinite(v.serial)?v.serial:0;d={boost:x,serial:A,paused:!!v.paused,reducedMotion:!!v.reducedMotion},A!==u&&x>0&&!d.paused&&!d.reducedMotion&&(c=(n?.currentTime??0)+yM),u=A,p()},dispose:()=>{r||(r=!0,o=!1,s=!1,f?.removeEventListener("visibilitychange",m),_())}}}const vh=document.querySelector("#app");if(!vh)throw new Error("The app mount point is missing.");const Ui=window.matchMedia("(prefers-reduced-motion: reduce)");let Xt=Ui.matches;const Ir=EM();let Ci=!1,xr=!0,Pa=0;vh.innerHTML=`
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
`;const Mh=document.querySelector("[data-scene-layer]"),nl=document.querySelector("[data-landmark-layer]"),wr=document.querySelector("[data-motion-toggle]"),Po=document.querySelector("[data-vessel-controls]"),Sn=document.querySelector("[data-sailing-hud]"),bc=document.querySelector("[data-wind-marker]"),Ec=document.querySelector("[data-wind-direction]"),Ac=document.querySelector("[data-wind-speed]"),wc=document.querySelector("[data-sail-angle]"),Tc=document.querySelector("[data-suggested-trim]"),Rc=document.querySelector("[data-trim-mode]"),Cc=document.querySelector("[data-trim-meter]"),Pc=document.querySelector("[data-trim-efficiency]"),Ic=document.querySelector("[data-trim-sweetspot]"),kn=document.querySelector("[data-sound-toggle]"),Vt=document.querySelector("[data-sailing-guidance]"),Md=document.querySelector(".vessel-model-note"),Sh=document.querySelector("[data-webgl-fallback]"),yh=document.querySelector("[data-island-summary]"),Lr=document.querySelector(".portfolio-shell");if(!Mh||!nl||!wr||!Po||!Sn||!bc||!Ec||!Ac||!wc||!Tc||!Rc||!Cc||!Pc||!Ic||!kn||!Vt||!Sh||!yh||!Lr)throw new Error("The portfolio shell is incomplete.");Wh(ds,Dc);let bt,Sd=null;const ur=rf({root:Lr,islands:ds,content:Dc,onScanRequest:n=>{qn.releaseAll(),bt?.startScan(n,{instant:Xt||Ui.matches})},onHarbourSelect:n=>bt?.selectHarbour(n),onZoomOut:()=>bt?.zoomOut(),onExploreRequest:()=>{qn.releaseAll()}}),bh=new Map,il=new Map,Wt={width:window.innerWidth,height:window.innerHeight};let ts={x:Wt.width/2,y:Wt.height/2},dr=Sn.getBoundingClientRect(),Eh=[],Ah={top:145,right:20,bottom:155,left:20},mo=0;function rl(){mo||(mo=requestAnimationFrame(()=>{mo=0,wh()}))}const wh=()=>{const e=[".site-header",".scanner-hud",".sailing-hud",".helm-panel",".content-drawer",".harbour-nav"].flatMap(i=>{const r=Lr.querySelector(i);if(!r||r.hidden||getComputedStyle(r).display==="none")return[];const s=r.getBoundingClientRect();return s.width&&s.height?[{selector:i,rect:s}]:[]});Eh=e.map(({rect:i})=>i);const t={top:16,right:16,bottom:16,left:16};for(const{selector:i,rect:r}of e)i===".content-drawer"?Wt.width<=900&&!(Wt.height<=460&&Wt.width>Wt.height)?t.bottom=Math.max(t.bottom,Wt.height-r.top+12):t.right=Math.max(t.right,Wt.width-r.left+12):i===".helm-panel"?t.bottom=Math.max(t.bottom,Wt.height-r.top+12):t.top=Math.max(t.top,r.bottom+12);Ah=t,dr=Sn.getBoundingClientRect(),bt?.setFramingInsets(t)},Th=typeof ResizeObserver<"u"?new ResizeObserver(rl):null;for(const n of Lr.querySelectorAll(".site-header, .scanner-hud, .sailing-hud, .helm-panel, .content-drawer, .harbour-nav"))Th?.observe(n);const sl=new MutationObserver(rl);sl.observe(Lr,{attributes:!0,attributeFilter:["class"]});for(const n of Lr.querySelectorAll(".sailing-hud, .helm-panel, .content-drawer, .harbour-nav"))sl.observe(n,{attributes:!0,attributeFilter:["class","hidden"]});const Rh=typeof ResizeObserver<"u"?new ResizeObserver(()=>{dr=Sn.getBoundingClientRect()}):null;Rh?.observe(Sn);const Ch=typeof ResizeObserver<"u"?new ResizeObserver(n=>{for(const e of n){const i=e.target.dataset.landmarkId;if(!i)continue;const r=Array.isArray(e.borderBoxSize)?e.borderBoxSize[0]:e.borderBoxSize,s=r?.inlineSize??e.contentRect.width,o=r?.blockSize??e.contentRect.height;s<=0||o<=0||il.set(i,{width:s,height:o})}}):null;for(const[n,e]of ds.entries()){const t=document.createElement("div");t.className="landmark-label",t.dataset.landmarkId=e.id,t.setAttribute("role","listitem"),t.innerHTML=`
    <span class="landmark-label__name"></span>
    <span class="landmark-label__category"></span>
  `;const i=t.querySelector(".landmark-label__name"),r=t.querySelector(".landmark-label__category");if(!i||!r)throw new Error("The landmark label is incomplete.");i.textContent=e.name,r.textContent=`${bd(e.category)} · ${String(n+1).padStart(2,"0")}`,nl.append(t),bh.set(e.id,t),il.set(e.id,{width:120,height:40}),Ch?.observe(t);const s=document.createElement("li");s.textContent=`${e.name} — ${bd(e.category)}`,yh.append(s)}const ol=()=>{wr.textContent=Xt?"Resume motion":"Pause motion",wr.setAttribute("aria-pressed",String(Xt)),Po.setAttribute("aria-disabled",String(!bt))};function AM(n){if(!bc||!Ec||!Ac||!wc||!Tc||!Rc||!Cc||!Pc||!Ic||!Sn||!Vt)return;const e=s=>Math.round(Math.abs(s)*180/Math.PI),t=14,i=-Math.sin(n.relativeWindAngle)*t,r=-Math.cos(n.relativeWindAngle)*t;bc.style.transform=`translate(calc(-50% + ${i}px), calc(-50% + ${r}px))`,Ec.textContent=yd(n.relativeWindAngle),Ac.textContent=`${n.windSpeed.toFixed(0)} m/s`,Sn.setAttribute("aria-label",`Wind from ${yd(n.relativeWindAngle)}, ${n.windSpeed.toFixed(0)} metres per second. Sail angle ${e(n.sailAngle)} degrees; suggested ${e(n.suggestedAngle)} degrees.`),wc.textContent=`${e(n.sailAngle)}°`,Tc.textContent=`${e(n.suggestedAngle)}°`,Rc.textContent=n.trimMode==="manual"?"Manual":"Auto",Cc.style.width=`${Math.round(Math.max(0,Math.min(1,n.trimEfficiency))*100)}%`,Pc.textContent=`${Math.round(n.trimEfficiency*100)}%`,Ic.textContent=n.sweetSpot?" · Sweet spot":"",Sn.toggleAttribute("data-manual-trim",n.trimMode==="manual"),Ir.update({boost:n.trimBoost,serial:n.boostSerial,paused:Xt,reducedMotion:Ui.matches}),Sn.toggleAttribute("data-no-go",n.noGo),Sn.toggleAttribute("data-luffing",n.luffing),n.assisted?Vt.textContent="Assisted passage: steer when you are ready to take the helm.":n.moored?Vt.textContent="Moored. Trim or steer to set sail.":n.luffing?Vt.textContent="Wind spilled. Release to catch the wind.":n.noGo?Vt.textContent="Into the wind. Turn left or right to tack.":n.trimMode==="auto"&&!n.trimEngaged?Vt.textContent="Auto trim ready. WASD or arrows to set sail.":n.trimMode==="auto"?Vt.textContent=`Auto trim ${Math.round(n.trimEfficiency*100)}% · Q/E for manual trim.`:n.trimBoost>.05?Vt.textContent="Sweet spot · speed surge!":n.sailAngle>n.suggestedAngle+.1?Vt.textContent="Trim in toward the suggested angle for more drive.":n.sailAngle<n.suggestedAngle-.1?Vt.textContent="Ease out toward the suggested angle for more drive.":n.power<.08?Vt.textContent="Turn across the wind to fill the sail.":n.sweetSpot?Vt.textContent="Sweet spot. Sail diagonally and tack to travel upwind.":Vt.textContent="Manual trim. Q/E adjusts the sail; M returns to auto."}function yd(n){const e=(n*180/Math.PI+360)%360;return e<22.5||e>=337.5?"ahead":e<67.5?"port bow":e<112.5?"port":e<157.5?"port quarter":e<202.5?"astern":e<247.5?"starboard quarter":e<292.5?"starboard":"starboard bow"}const qn=new $h({root:Po,onInput:n=>{bt?.setInput(n)},onReset:()=>{bt?.resetVessel(),ur.closeDrawer(!1),Ir.update({boost:0,serial:0,paused:Xt,reducedMotion:Ui.matches})},onAutoTrim:()=>bt?.setAutoTrim()}),Lc=()=>{kn&&(kn.textContent=xr?Ci?"♪ Sound on":"♪ Sound off":"♪ Sound unavailable",kn.setAttribute("aria-pressed",String(Ci)),kn.setAttribute("aria-label",xr?Ci?"Sound on":"Sound off":"Sound unavailable"),kn.disabled=!xr)},Ph=async()=>{if(!kn||!xr)return;const n=++Pa,e=!Ci;Ci=e,Lc();try{const t=await Ir.setEnabled(e);if(n!==Pa)return;Ci=e&&t,xr=t||!e}catch{if(n!==Pa)return;xr=!1,Ci=!1}Lc()};kn?.addEventListener("click",Ph);const wM=n=>{for(const[e,t]of bh){const i=n.find(r=>r.id===e);if(!i||!i.visible||!Ih(i,il.get(e))){t.hidden=!0;continue}t.hidden=!1,t.style.transform=`translate3d(${i.x}px, ${i.y}px, 0) translate(-50%, 8px)`}};function Ih(n,e){const t=e?.width??120,i=e?.height??40,r=n.x-t*.5,s=n.y+8,o=r+t,a=s+i,l=Math.min(48,Math.max(16,Wt.width*.04));if(r<dr.right+6&&o>dr.left-6&&s<dr.bottom+6&&a>dr.top-6||r<l||o>Wt.width-l||s<16||a>Wt.height-16||Eh.some(_=>r<_.right+6&&o>_.left-6&&s<_.bottom+6&&a>_.top-6))return!1;const c=32,u=ts.x-c,d=ts.y-c,f=ts.x+c,m=ts.y+c;return!(r<f&&o>u&&s<m&&a>d)}const Lh=()=>{Wt.width=window.innerWidth,Wt.height=window.innerHeight,rl()};window.addEventListener("resize",Lh);try{bt=pM(Mh,{reducedMotion:Ui.matches,islands:ds,framingInsets:Ah,onHarbourUpdate:n=>ur.setHarbourUpdate(n),onHarbourProjection:n=>ur.setHarbourProjection(n.filter(e=>Ih(e,{width:90,height:30}))),onVesselProjection:n=>{ts=n},onLandmarkProjection:wM,onVesselUpdate:n=>{const e=ef({x:n.x,z:n.z},ds,Sd);Sd=e?.id??null,ur.setProximity(e)},onSailingUpdate:AM,onScanUpdate:n=>ur.setScanUpdate(n)}),wh(),bt.setPaused(Xt),qn.setEnabled(!Xt,!!bt)}catch(n){console.warn("Unable to initialise the water scene.",n),nl.hidden=!0,Sh.classList.remove("is-hidden"),wr.disabled=!0,qn.setEnabled(!1,!1),Po.hidden=!0,Md&&(Md.hidden=!0)}const TM=()=>{Xt=!Xt,qn.setEnabled(!Xt&&!!bt,!!bt),bt?.setPaused(Xt),Ir.update({boost:0,serial:0,paused:Xt,reducedMotion:Ui.matches}),ol()};wr.addEventListener("click",TM);const RM=n=>{if(n.key.toLowerCase()==="p"&&n.target===document.body){wr.click();return}if(n.key.toLowerCase()!=="f"||n.repeat||n.altKey||n.ctrlKey||n.metaKey||n.target instanceof Element&&n.target.closest(".content-drawer, input, textarea, select, [contenteditable]"))return;const e=document.querySelector("[data-explore-action]");!document.querySelector(".content-drawer:not([hidden])")&&e&&!e.closest("[hidden]")&&(n.preventDefault(),e.click())};window.addEventListener("keydown",RM);const CM=n=>{bt?.setReducedMotion(n.matches),n.matches&&(Xt=!0,qn.setEnabled(!1,!!bt),bt?.setPaused(!0),Ir.update({boost:0,serial:0,paused:!0,reducedMotion:!0}),ol())};Ui.addEventListener("change",CM);const PM=n=>{qn.releaseAll(),n.persisted||(qn.dispose(),bt?.dispose(),ur.dispose(),Ir.dispose(),kn?.removeEventListener("click",Ph),Ch?.disconnect(),Rh?.disconnect(),Th?.disconnect(),sl.disconnect(),cancelAnimationFrame(mo),window.removeEventListener("resize",Lh))};window.addEventListener("pagehide",PM);const IM=()=>{bt&&qn.setEnabled(!Xt,!0)};window.addEventListener("pageshow",IM);function bd(n){return n.charAt(0).toUpperCase()+n.slice(1)}ol();Lc();
