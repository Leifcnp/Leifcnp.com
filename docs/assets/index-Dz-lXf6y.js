(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const id={resume:[{id:"resume-01",role:"Creative technologist",organisation:"Independent practice",period:"2024 — present",summary:"Placeholder for a role, practice, or collaboration."}],projects:[{id:"project-01",title:"A small digital shoreline",summary:"Placeholder for a project log and its short field note.",year:2025,link:"#"}],writing:[{id:"writing-01",title:"Notes from the weather line",publication:"Personal notebook",year:2025,excerpt:"Placeholder for a writing sample excerpt.",link:"#"}],media:[{id:"media-01",label:"Portfolio media placeholder",url:"#",kind:"image"}]},To=180,sr={x:0,z:0},rd=["resume","projects","writing","media"],sd=["ridge","mesa","mound","twin-peaks"],mh=/^#[0-9a-f]{6}$/i,os=[{id:"island-resume",name:"Chartroom",category:"resume",position:{x:-26,z:-18},landCollisionRadius:7,dockingTriggerRadius:11,landform:"ridge",palette:{sand:"#d8c28d",land:"#7e9a73",rock:"#465d5d"},contentIds:["resume-01"],description:"A quiet chartroom for the route so far and the work behind it."},{id:"island-projects",name:"Shipyard",category:"projects",position:{x:16,z:-24},landCollisionRadius:6,dockingTriggerRadius:10,landform:"mesa",palette:{sand:"#d8b878",land:"#b86f4c",rock:"#704b44"},contentIds:["project-01"],description:"A working shipyard for experiments, builds, and field notes."},{id:"island-writing",name:"Logbook",category:"writing",position:{x:-18,z:26},landCollisionRadius:8,dockingTriggerRadius:12,landform:"twin-peaks",palette:{sand:"#dfcfaa",land:"#8e806f",rock:"#555968"},contentIds:["writing-01"],description:"A windward logbook for essays, observations, and unfinished thoughts."},{id:"island-media",name:"Signal Cove",category:"media",position:{x:24,z:20},landCollisionRadius:7,dockingTriggerRadius:11,landform:"mound",palette:{sand:"#cbbd98",land:"#5d8c87",rock:"#3f5964"},contentIds:["media-01"],description:"A sheltered cove for images, moving pictures, and sound."}];function jr(n){return typeof n=="object"&&n!==null}function gh(n){return jr(n)}function _h(n){return jr(n)&&typeof n.id=="string"&&n.id.length>0}function vh(n){return typeof n=="string"&&rd.includes(n)}function xh(n){return typeof n=="string"&&sd.includes(n)}function _s(n){return typeof n=="number"&&Number.isFinite(n)}function vt(n,e){throw new Error(`Invalid island at index ${n}: ${e}`)}function Mh(n,e){if(!Array.isArray(n))throw new Error("Invalid island definitions: expected an array");if(!jr(e))throw new Error("Invalid portfolio content: expected an object");const t=new Set,i=[];n.forEach((r,s)=>{gh(r)||vt(s,"expected an object"),(typeof r.id!="string"||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))&&vt(s,"id must be a stable non-empty kebab-case string"),t.has(r.id)&&vt(s,`duplicate id "${r.id}"`),t.add(r.id),(typeof r.name!="string"||r.name.trim().length===0)&&vt(s,"name must be a non-empty string"),vh(r.category)||vt(s,`category must be one of ${rd.join(", ")}`),xh(r.landform)||vt(s,`landform must be one of ${sd.join(", ")}`),(!jr(r.position)||!_s(r.position.x)||!_s(r.position.z))&&vt(s,"position.x and position.z must be finite numbers"),(!_s(r.landCollisionRadius)||r.landCollisionRadius<=0)&&vt(s,"landCollisionRadius must be a finite positive number"),(!_s(r.dockingTriggerRadius)||r.dockingTriggerRadius<=0)&&vt(s,"dockingTriggerRadius must be a finite positive number"),(Math.abs(r.position.x)+r.dockingTriggerRadius>To||Math.abs(r.position.z)+r.dockingTriggerRadius>To)&&vt(s,`docking zone must remain within ±${To} world units`),r.landCollisionRadius>=r.dockingTriggerRadius&&vt(s,"dockingTriggerRadius must be greater than landCollisionRadius"),jr(r.palette)||vt(s,"palette must contain sand, land, and rock colors");for(const u of["sand","land","rock"])(typeof r.palette[u]!="string"||!mh.test(r.palette[u]))&&vt(s,`palette.${u} must be a six-digit hex color`);(!Array.isArray(r.contentIds)||r.contentIds.length===0)&&vt(s,"contentIds must contain at least one content ID"),(typeof r.description!="string"||r.description.trim().length===0)&&vt(s,"description must be a non-empty string");const o=e[r.category];Array.isArray(o)||vt(s,`portfolio content category "${r.category}" must be an array`);const a=new Set;o.forEach((u,d)=>{if(!_h(u))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: id must be a non-empty string`);if(a.has(u.id))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: duplicate id "${u.id}"`);a.add(u.id)});const l=new Set;r.contentIds.forEach(u=>{(typeof u!="string"||u.length===0)&&vt(s,"contentIds must contain non-empty strings"),l.has(u)&&vt(s,`duplicate content ID "${u}"`),a.has(u)||vt(s,`content ID "${u}" is missing from category "${r.category}"`),l.add(u)}),i.push({index:s,island:r}),Math.hypot(r.position.x-sr.x,r.position.z-sr.z)<=r.dockingTriggerRadius&&vt(s,"docking zone must leave the vessel spawn point clear")});for(let r=0;r<i.length;r+=1)for(let s=r+1;s<i.length;s+=1){const o=i[r],a=i[s];if(Math.hypot(o.island.position.x-a.island.position.x,o.island.position.z-a.island.position.z)<=o.island.dockingTriggerRadius+a.island.dockingTriggerRadius)throw new Error(`Invalid island definitions: docking zones overlap for "${o.island.id}" and "${a.island.id}"`)}}const Sh=["up","down","trimIn","trimOut","left","right","brake"],yh=new Map([["w","up"],["arrowup","up"],["s","down"],["arrowdown","down"],["a","left"],["arrowleft","left"],["d","right"],["arrowright","right"],["q","trimIn"],["e","trimOut"],[" ","brake"]]),Eh={throttle:0,sheet:0,rudder:0,brake:!1};function bh(n){const e=new Set(n),t=Number(e.has("right"))-Number(e.has("left")),i=Number(e.has("down"))-Number(e.has("up")),r=t||i?Math.atan2(t+i,i-t):void 0;return{throttle:0,sheet:e.has("trimIn")===e.has("trimOut")?0:e.has("trimIn")?-1:1,rudder:0,brake:e.has("brake"),...r===void 0?{}:{targetHeading:r}}}class Th{root;onInput;onReset;onAutoTrim;buttons=new Map;resetButton;autoTrimButton;pressedKeys=new Map;pressedButtons=new Map;pointers=new Map;buttonHandlers=[];enabled=!0;resetEnabled=!0;disposed=!1;resetHeld=!1;lastInput={...Eh};constructor(e){this.root=e.root,this.onInput=e.onInput,this.onReset=e.onReset,this.onAutoTrim=e.onAutoTrim;for(const r of Sh){const s=Array.from(this.root.querySelectorAll(`[data-vessel-control="${r}"]`));this.buttons.set(r,s);for(const o of s)this.bindButton(o,r)}this.root.addEventListener("pointerdown",this.onPointerDown),this.root.addEventListener("pointerup",this.onPointerUp),this.root.addEventListener("pointercancel",this.onPointerCancel),this.root.addEventListener("lostpointercapture",this.onLostPointerCapture),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),window.addEventListener("pagehide",this.onPageHide),document.addEventListener("visibilitychange",this.onVisibilityChange);const t=this.root.querySelector("[data-vessel-reset]");if(this.resetButton=t??void 0,t&&this.onReset){const r=()=>{this.releaseAll(),this.onReset?.()};t.addEventListener("click",r),this.buttonHandlers.push({button:t,type:"click",handler:r})}const i=this.root.querySelector("[data-vessel-auto-trim]");if(this.autoTrimButton=i??void 0,i&&this.onAutoTrim){const r=()=>{this.releaseAll(),this.onAutoTrim?.()};i.addEventListener("click",r),this.buttonHandlers.push({button:i,type:"click",handler:r})}this.emitIfChanged()}setEnabled(e,t=e){if(!this.disposed){this.enabled=e,this.resetEnabled=t,this.releaseAll();for(const i of this.buttons.values())for(const r of i)r.disabled=!e,r.setAttribute("aria-disabled",String(!e));this.resetButton&&(this.resetButton.disabled=!t,this.resetButton.setAttribute("aria-disabled",String(!t))),this.autoTrimButton&&(this.autoTrimButton.disabled=!e,this.autoTrimButton.setAttribute("aria-disabled",String(!e))),this.root.toggleAttribute("data-controls-disabled",!e)}}releaseAll(){this.pressedKeys.clear(),this.pressedButtons.clear(),this.resetHeld=!1;for(const{pointerId:e,button:t}of this.pointers.values())try{t.releasePointerCapture?.(e)}catch{}this.pointers.clear(),this.emitIfChanged(!0)}dispose(){if(!this.disposed){this.disposed=!0,this.releaseAll(),this.root.removeEventListener("pointerdown",this.onPointerDown),this.root.removeEventListener("pointerup",this.onPointerUp),this.root.removeEventListener("pointercancel",this.onPointerCancel),this.root.removeEventListener("lostpointercapture",this.onLostPointerCapture),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),window.removeEventListener("pagehide",this.onPageHide),document.removeEventListener("visibilitychange",this.onVisibilityChange);for(const{button:e,type:t,handler:i}of this.buttonHandlers)e.removeEventListener(t,i);this.buttonHandlers.length=0}}bindButton=(e,t)=>{e.dataset.vesselControl=t,e.addEventListener("keydown",this.onButtonKeyDown),e.addEventListener("keyup",this.onButtonKeyUp),e.addEventListener("focusout",this.onButtonFocusOut),this.buttonHandlers.push({button:e,type:"keydown",handler:this.onButtonKeyDown},{button:e,type:"keyup",handler:this.onButtonKeyUp},{button:e,type:"focusout",handler:this.onButtonFocusOut})};onButtonKeyDown=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||this.enabled&&(e.preventDefault(),this.pressedButtons.set(t,i),this.emitIfChanged())};onButtonKeyUp=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.pressedButtons.delete(t),this.emitIfChanged())};onButtonFocusOut=e=>{const t=e.currentTarget;!t||!this.pressedButtons.delete(t)||this.emitIfChanged()};onPointerDown=e=>{if(!this.enabled||this.disposed||e.pointerType==="mouse"&&e.button!==0)return;const t=e.target instanceof Element?e.target.closest("[data-vessel-control]"):null,i=t?.dataset.vesselControl;!t||!i||t.disabled||(e.preventDefault(),this.pointers.set(e.pointerId,{pointerId:e.pointerId,control:i,button:t}),t.setPointerCapture?.(e.pointerId),this.emitIfChanged())};onPointerUp=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onPointerCancel=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onLostPointerCapture=e=>{const t=e.pointerId;!Number.isFinite(t)||!this.pointers.delete(t)||this.emitIfChanged()};onKeyDown=e=>{if(this.disposed||Ah(e.target)||wh(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;const t=Qc(e.key);if(e.target instanceof HTMLElement&&e.target.matches("button, a")&&(t===" "||t==="enter"))return;if(t==="r"){if(!this.resetEnabled||this.resetHeld)return;e.preventDefault(),this.releaseAll(),this.resetHeld=!0,this.onReset?.();return}if(!this.enabled)return;if(t==="m"){if(e.repeat)return;e.preventDefault(),this.releaseAll(),this.onAutoTrim?.();return}const i=yh.get(t);i&&(e.preventDefault(),!this.pressedKeys.has(t)&&(this.pressedKeys.set(t,i),this.emitIfChanged()))};onKeyUp=e=>{const t=Qc(e.key);if(t==="r"){this.resetHeld=!1;return}this.pressedKeys.delete(t)&&(e.preventDefault(),this.emitIfChanged())};onBlur=()=>this.releaseAll();onPageHide=()=>this.releaseAll();onVisibilityChange=()=>{document.hidden&&this.releaseAll()};emitIfChanged(e=!1){const t=this.getInput();!e&&Rh(t,this.lastInput)||(this.lastInput=t,this.onInput({...t}))}getInput(){const e=new Set(this.pressedKeys.values());for(const i of this.pressedButtons.values())e.add(i);for(const{control:i}of this.pointers.values())e.add(i);const t=bh(e);for(const[i,r]of this.buttons){const s=e.has(i);for(const o of r)o.dataset.active=String(s),o.setAttribute("aria-pressed",String(s))}return t}}function Qc(n){return n.length===1,n.toLowerCase()}function Ah(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest("input, select, textarea"):!1}function wh(n){return n instanceof Element&&!!n.closest(".content-drawer")}function Rh(n,e){return n.throttle===e.throttle&&n.sheet===e.sheet&&n.rudder===e.rudder&&n.brake===e.brake&&n.sailAngle===e.sailAngle&&n.targetHeading===e.targetHeading}const Ch=1.25;function Ir(n){return typeof n=="number"&&Number.isFinite(n)}function el(n,e){return Math.hypot(n.x-e.position.x,n.z-e.position.z)}function Ph(n,e,t){if(!Ir(n?.x)||!Ir(n?.z))return null;if(t){const s=e.find(o=>o.id===t);if(s&&el(n,s)<=s.dockingTriggerRadius+Ch)return s}let i=null,r=Number.POSITIVE_INFINITY;for(const s of e){if(!Ir(s.position.x)||!Ir(s.position.z)||!Ir(s.dockingTriggerRadius))continue;const o=el(n,s);o<=s.dockingTriggerRadius&&o<r&&(i=s,r=o)}return i}const Ao={resume:"Resume",projects:"Projects",writing:"Writing",media:"Media"};function Ih(n){const{root:e,islands:t,content:i}=n,r=new Map(t.map(O=>[O.id,O])),s=document.createElement("nav");s.className="scanner-hud",s.setAttribute("aria-label","Portfolio scanner");const o=document.createElement("p");o.className="scanner-hud__label",o.textContent="Scan by category",s.append(o);const a=document.createElement("div");a.className="scanner-hud__links",a.setAttribute("role","list");for(const O of t){const ie=document.createElement("div");ie.setAttribute("role","listitem");const oe=document.createElement("button");oe.type="button",oe.className="scanner-hud__link",oe.dataset.scannerIsland=O.id,oe.setAttribute("aria-label",`Scan ${O.name}, ${Ao[O.category]}`),oe.setAttribute("aria-expanded","false"),oe.setAttribute("aria-controls","portfolio-content-drawer");const Ce=document.createElement("span");Ce.className="scanner-hud__number",Ce.setAttribute("aria-hidden","true"),Ce.textContent=String(a.children.length+1).padStart(2,"0");const Se=document.createElement("span");Se.className="scanner-hud__link-label",Se.textContent=Ao[O.category];const z=document.createElement("span");z.className="scanner-hud__link-name",z.textContent=O.name,oe.append(Ce,Se,z),oe.addEventListener("click",E),ie.append(oe),a.append(ie)}s.append(a);const l=document.createElement("p");l.className="scanner-hud__status",l.setAttribute("role","status"),l.setAttribute("aria-live","polite"),l.setAttribute("aria-atomic","true"),l.textContent="Under way · choose a category to scan",s.append(l);const c=document.createElement("p");c.className="visually-hidden",c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.setAttribute("aria-atomic","true"),s.append(c);const u=document.createElement("section");u.className="explore-prompt",u.hidden=!0,u.setAttribute("aria-label","Nearby island");const d=document.createElement("p");d.className="explore-prompt__kicker",d.textContent="Within range";const h=document.createElement("p");h.className="explore-prompt__text";const m=document.createElement("button");m.type="button",m.dataset.exploreAction="true",m.className="explore-prompt__button",m.textContent="Explore island",m.addEventListener("click",y),u.append(d,h,m);const g=document.createElement("aside");g.className="content-drawer",g.id="portfolio-content-drawer",g.hidden=!0,g.setAttribute("aria-label","Portfolio content"),g.setAttribute("aria-live","off");const v=document.createElement("div");v.className="content-drawer__header";const p=document.createElement("button");p.type="button",p.className="content-drawer__close",p.setAttribute("aria-label","Close portfolio drawer"),p.textContent="Close";const f=()=>L(!0);p.addEventListener("click",f);const x=document.createElement("h2");x.className="content-drawer__title",x.tabIndex=-1,x.id="portfolio-drawer-heading",v.append(x,p);const M=document.createElement("div");M.className="content-drawer__body",M.tabIndex=0,M.setAttribute("role","region"),M.setAttribute("aria-labelledby",x.id),g.setAttribute("aria-labelledby",x.id),g.append(v,M),e.append(s,u,g);let _=null,b=null,T=l.textContent??"",C=!1,R=0;function E(O){const ie=O.currentTarget;if(!(ie instanceof HTMLButtonElement))return;const oe=ie.dataset.scannerIsland;!oe||!r.has(oe)||(D(oe,ie),n.onScanRequest(oe))}function y(){_&&(D(_.id,m),n.onExploreRequest(_.id))}function w(O){O.key!=="Escape"||g.hidden||L(!0)}function D(O,ie=null){const oe=r.get(O);if(!oe||C)return;b=ie??B(O),x.textContent=oe.name,M.replaceChildren(Lh(oe,i)),M.scrollTop=0,g.hidden=!1,e.classList.add("is-reading"),u.hidden=!0;for(const Se of s.querySelectorAll("[data-scanner-island]")){const z=Se.dataset.scannerIsland===O;Se.setAttribute("aria-expanded",String(z)),Se.dataset.selected=String(z)}const Ce=++R;requestAnimationFrame(()=>{!g.hidden&&Ce===R&&x.focus({preventScroll:!0})})}function L(O=!0){if(g.hidden)return;const ie=Y();R+=1,g.hidden=!0,e.classList.remove("is-reading"),u.hidden=!_;for(const Ce of s.querySelectorAll("[data-scanner-island]"))Ce.setAttribute("aria-expanded","false"),Ce.dataset.selected="false";const oe=b&&document.contains(b)&&Dh(b)?b:ie;O&&oe&&oe.focus({preventScroll:!0}),b=null}function U(O){_?.id!==O?.id&&(_=O,u.hidden=!O||!g.hidden,c.textContent=O?`Docking range: ${O.name}. Explore prompt available.`:"Outside all docking zones.",O&&(h.textContent=`${O.name} · ${Ao[O.category]}`,m.setAttribute("aria-label",`Explore ${O.name}`)))}function F(O){if(C)return;const ie=O.status==="travelling"?`Assisted passage to ${r.get(O.islandId??"")?.name??"island"}`:O.status==="arrived"?`Arrived at ${r.get(O.islandId??"")?.name??"island"}`:O.status==="cancelled"?"Scanner cancelled · steer manually":O.status==="failed"?"Scanner route unavailable · steer manually":"Under way · choose a category to scan",oe=O.message??ie;oe!==T&&(T=oe,l.textContent=oe)}function B(O){return s.querySelector(`[data-scanner-island="${CSS.escape(O)}"]`)}function Y(){return k()?B(k()):null}function k(){return Array.from(s.querySelectorAll("[data-scanner-island]")).find(O=>O.dataset.selected==="true")?.dataset.scannerIsland??null}function se(){if(!C){C=!0,R+=1,e.classList.remove("is-reading"),window.removeEventListener("keydown",w);for(const O of s.querySelectorAll("[data-scanner-island]"))O.removeEventListener("click",E);m.removeEventListener("click",y),p.removeEventListener("click",f),s.remove(),u.remove(),g.remove()}}return window.addEventListener("keydown",w),{nav:s,drawer:g,setProximity:U,setScanUpdate:F,openIsland:D,closeDrawer:L,dispose:se}}function Lh(n,e){const t=document.createDocumentFragment(),i=document.createElement("p");i.className="content-drawer__description",i.textContent=n.description,t.append(i);const r=n.category;if(r==="resume")for(const s of e.resume.filter(o=>n.contentIds.includes(o.id))){const o=vs();xs(o,s.role),Ms(o,`${s.organisation} · ${s.period}`),wo(o,s.summary),t.append(o)}else if(r==="projects")for(const s of e.projects.filter(o=>n.contentIds.includes(o.id))){const o=vs();xs(o,s.title),Ms(o,String(s.year)),wo(o,s.summary),Ro(o,s.link),t.append(o)}else if(r==="writing")for(const s of e.writing.filter(o=>n.contentIds.includes(o.id))){const o=vs();xs(o,s.title),Ms(o,`${s.publication} · ${s.year}`),wo(o,s.excerpt),Ro(o,s.link),t.append(o)}else for(const s of e.media.filter(o=>n.contentIds.includes(o.id))){const o=vs();xs(o,s.label),Ms(o,s.kind),Ro(o,s.url),t.append(o)}return t}function vs(){const n=document.createElement("article");return n.className="content-card",n}function xs(n,e){const t=document.createElement("h3");t.textContent=e,n.append(t)}function Ms(n,e){const t=document.createElement("p");t.className="content-card__meta",t.textContent=e,n.append(t)}function wo(n,e){const t=document.createElement("p");t.textContent=e,n.append(t)}function Ro(n,e){if(!e||e==="#"){const i=document.createElement("p");i.className="content-card__placeholder",i.textContent="Link unavailable in placeholder data.",n.append(i);return}const t=document.createElement("a");t.href=e,t.target="_blank",t.rel="noreferrer",t.textContent="Open related material",n.append(t)}function Dh(n){if(n.hidden||n.closest("[hidden]"))return!1;const e=window.getComputedStyle(n);return e.display!=="none"&&e.visibility!=="hidden"}const bc="179",Uh=0,tl=1,Nh=2,od=1,Fh=2,On=3,oi=0,Xt=1,yt=2,ri=0,ur=1,nl=2,il=3,rl=4,Oh=5,Si=100,Bh=101,zh=102,kh=103,Hh=104,Vh=200,Gh=201,Wh=202,Xh=203,ya=204,Ea=205,qh=206,Yh=207,Zh=208,$h=209,Kh=210,jh=211,Jh=212,Qh=213,ef=214,ba=0,Ta=1,Aa=2,_r=3,wa=4,Ra=5,Ca=6,Pa=7,ad=0,tf=1,nf=2,si=0,rf=1,sf=2,of=3,cd=4,af=5,cf=6,lf=7,ld=300,vr=301,xr=302,Ia=303,La=304,go=306,Da=1e3,bi=1001,Ua=1002,Qt=1003,uf=1004,Ss=1005,yn=1006,Co=1007,Ti=1008,An=1009,ud=1010,dd=1011,as=1012,Tc=1013,Pi=1014,En=1015,hs=1016,Ac=1017,wc=1018,cs=1020,hd=35902,fd=1021,pd=1022,fn=1023,ls=1026,us=1027,Rc=1028,Cc=1029,md=1030,Pc=1031,Ic=1033,eo=33776,to=33777,no=33778,io=33779,Na=35840,Fa=35841,Oa=35842,Ba=35843,za=36196,ka=37492,Ha=37496,Va=37808,Ga=37809,Wa=37810,Xa=37811,qa=37812,Ya=37813,Za=37814,$a=37815,Ka=37816,ja=37817,Ja=37818,Qa=37819,ec=37820,tc=37821,ro=36492,nc=36494,ic=36495,gd=36283,rc=36284,sc=36285,oc=36286,df=3200,hf=3201,_d=0,ff=1,ei="",Kt="srgb",Mr="srgb-linear",ao="linear",it="srgb",Ni=7680,sl=519,pf=512,mf=513,gf=514,vd=515,_f=516,vf=517,xf=518,Mf=519,ol=35044,jt=35048,al="300 es",bn=2e3,co=2001;class Tr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Po=Math.PI/180,ac=180/Math.PI;function fs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]).toLowerCase()}function $e(n,e,t){return Math.max(e,Math.min(t,n))}function Sf(n,e){return(n%e+e)%e}function Io(n,e,t){return(1-t)*n+t*e}function Lr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ze{constructor(e=0,t=0){Ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ps{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const h=s[o+0],m=s[o+1],g=s[o+2],v=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(d!==v||l!==h||c!==m||u!==g){let p=1-a;const f=l*h+c*m+u*g+d*v,x=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const b=Math.sqrt(M),T=Math.atan2(b,f*x);p=Math.sin(p*T)/b,a=Math.sin(a*T)/b}const _=a*x;if(l=l*p+h*_,c=c*p+m*_,u=u*p+g*_,d=d*p+v*_,p===1-a){const b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*m-c*h,e[t+1]=l*g+u*h+c*d-a*m,e[t+2]=c*g+u*m+a*h-l*d,e[t+3]=u*g-a*d-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d-h*m*g;break;case"YXZ":this._x=h*u*d+c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d+h*m*g;break;case"ZXY":this._x=h*u*d-c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d-h*m*g;break;case"ZYX":this._x=h*u*d-c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d+h*m*g;break;case"YZX":this._x=h*u*d+c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d-h*m*g;break;case"XZY":this._x=h*u*d-c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d+h*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>d){const m=2*Math.sqrt(1+i-a-d);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-i-d);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+d-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Lo.copy(this).projectOnVector(e),this.sub(Lo)}reflect(e){return this.sub(Lo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lo=new V,cl=new ps;class Ge{constructor(e,t,i,r,s,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],m=i[5],g=i[8],v=r[0],p=r[3],f=r[6],x=r[1],M=r[4],_=r[7],b=r[2],T=r[5],C=r[8];return s[0]=o*v+a*x+l*b,s[3]=o*p+a*M+l*T,s[6]=o*f+a*_+l*C,s[1]=c*v+u*x+d*b,s[4]=c*p+u*M+d*T,s[7]=c*f+u*_+d*C,s[2]=h*v+m*x+g*b,s[5]=h*p+m*M+g*T,s[8]=h*f+m*_+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,m=c*s-o*l,g=t*d+i*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*c-u*i)*v,e[2]=(a*i-r*o)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-a*t)*v,e[6]=m*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Do.makeScale(e,t)),this}rotate(e){return this.premultiply(Do.makeRotation(-e)),this}translate(e,t){return this.premultiply(Do.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Do=new Ge;function xd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function lo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function yf(){const n=lo("canvas");return n.style.display="block",n}const ll={};function dr(n){n in ll||(ll[n]=!0,console.warn(n))}function Ef(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const ul=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dl=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bf(){const n={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===it&&(r.r=Wn(r.r),r.g=Wn(r.g),r.b=Wn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(r.r=hr(r.r),r.g=hr(r.g),r.b=hr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ei?ao:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return dr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return dr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Mr]:{primaries:e,whitePoint:i,transfer:ao,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:e,whitePoint:i,transfer:it,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}}),n}const et=bf();function Wn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function hr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Fi;class Tf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Fi===void 0&&(Fi=lo("canvas")),Fi.width=e.width,Fi.height=e.height;const r=Fi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Fi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=lo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Wn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Wn(t[i]/255)*255):t[i]=Wn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Af=0;class Lc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Uo(r[o].image)):s.push(Uo(r[o]))}else s=Uo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Uo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Tf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wf=0;const No=new V;class Ot extends Tr{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=bi,r=bi,s=yn,o=Ti,a=fn,l=An,c=Ot.DEFAULT_ANISOTROPY,u=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=fs(),this.name="",this.source=new Lc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(No).x}get height(){return this.source.getSize(No).y}get depth(){return this.source.getSize(No).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ld)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Da:e.x=e.x-Math.floor(e.x);break;case bi:e.x=e.x<0?0:1;break;case Ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Da:e.y=e.y-Math.floor(e.y);break;case bi:e.y=e.y<0?0:1;break;case Ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=ld;Ot.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,i=0,r=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],m=l[5],g=l[9],v=l[2],p=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,_=(m+1)/2,b=(f+1)/2,T=(u+h)/4,C=(d+v)/4,R=(g+p)/4;return M>_&&M>b?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=T/i,s=C/i):_>b?_<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),i=T/r,s=R/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=C/s,r=R/s),this.set(i,r,s,t),this}let x=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(d-v)/x,this.z=(h-u)/x,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rf extends Tr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Ot(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Lc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ii extends Rf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Md extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Cf extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ai{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,on):on.fromBufferAttribute(s,o),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ys.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ys.copy(i.boundingBox)),ys.applyMatrix4(e.matrixWorld),this.union(ys)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Dr),Es.subVectors(this.max,Dr),Oi.subVectors(e.a,Dr),Bi.subVectors(e.b,Dr),zi.subVectors(e.c,Dr),qn.subVectors(Bi,Oi),Yn.subVectors(zi,Bi),ui.subVectors(Oi,zi);let t=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-ui.z,ui.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,ui.z,0,-ui.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-ui.y,ui.x,0];return!Fo(t,Oi,Bi,zi,Es)||(t=[1,0,0,0,1,0,0,0,1],!Fo(t,Oi,Bi,zi,Es))?!1:(bs.crossVectors(qn,Yn),t=[bs.x,bs.y,bs.z],Fo(t,Oi,Bi,zi,Es))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pn=[new V,new V,new V,new V,new V,new V,new V,new V],on=new V,ys=new ai,Oi=new V,Bi=new V,zi=new V,qn=new V,Yn=new V,ui=new V,Dr=new V,Es=new V,bs=new V,di=new V;function Fo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){di.fromArray(n,s);const a=r.x*Math.abs(di.x)+r.y*Math.abs(di.y)+r.z*Math.abs(di.z),l=e.dot(di),c=t.dot(di),u=i.dot(di);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Pf=new ai,Ur=new V,Oo=new V;class Ar{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Pf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);const t=Ur.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ur,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(Oo)),this.expandByPoint(Ur.copy(e.center).sub(Oo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const In=new V,Bo=new V,Ts=new V,Zn=new V,zo=new V,As=new V,ko=new V;class Dc{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Bo.copy(e).add(t).multiplyScalar(.5),Ts.copy(t).sub(e).normalize(),Zn.copy(this.origin).sub(Bo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ts),a=Zn.dot(this.direction),l=-Zn.dot(Ts),c=Zn.lengthSq(),u=Math.abs(1-o*o);let d,h,m,g;if(u>0)if(d=o*l-a,h=o*a-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,m=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Bo).addScaledVector(Ts,h),m}intersectSphere(e,t){In.subVectors(e.center,this.origin);const i=In.dot(this.direction),r=In.dot(In)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,i,r,s){zo.subVectors(t,e),As.subVectors(i,e),ko.crossVectors(zo,As);let o=this.direction.dot(ko),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zn.subVectors(this.origin,e);const l=a*this.direction.dot(As.crossVectors(Zn,As));if(l<0)return null;const c=a*this.direction.dot(zo.cross(Zn));if(c<0||l+c>o)return null;const u=-a*Zn.dot(ko);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,r,s,o,a,l,c,u,d,h,m,g,v,p){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,h,m,g,v,p)}set(e,t,i,r,s,o,a,l,c,u,d,h,m,g,v,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=m,f[7]=g,f[11]=v,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ki.setFromMatrixColumn(e,0).length(),s=1/ki.setFromMatrixColumn(e,1).length(),o=1/ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,m=o*d,g=a*u,v=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=h-v*c,t[9]=-a*l,t[2]=v-h*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,m=l*d,g=c*u,v=c*d;t[0]=h+v*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=v+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,m=l*d,g=c*u,v=c*d;t[0]=h-v*a,t[4]=-o*d,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=v-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,m=o*d,g=a*u,v=a*d;t[0]=l*u,t[4]=g*c-m,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=v-h*d,t[8]=g*d+m,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*d+g,t[10]=h-v*d}else if(e.order==="XZY"){const h=o*l,m=o*c,g=a*l,v=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=o*u,t[9]=m*d-g,t[2]=g*d-m,t[6]=a*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(If,e,Lf)}lookAt(e,t,i){const r=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),$n.crossVectors(i,Zt),$n.lengthSq()===0&&(Math.abs(i.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),$n.crossVectors(i,Zt)),$n.normalize(),ws.crossVectors(Zt,$n),r[0]=$n.x,r[4]=ws.x,r[8]=Zt.x,r[1]=$n.y,r[5]=ws.y,r[9]=Zt.y,r[2]=$n.z,r[6]=ws.z,r[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],m=i[13],g=i[2],v=i[6],p=i[10],f=i[14],x=i[3],M=i[7],_=i[11],b=i[15],T=r[0],C=r[4],R=r[8],E=r[12],y=r[1],w=r[5],D=r[9],L=r[13],U=r[2],F=r[6],B=r[10],Y=r[14],k=r[3],se=r[7],O=r[11],ie=r[15];return s[0]=o*T+a*y+l*U+c*k,s[4]=o*C+a*w+l*F+c*se,s[8]=o*R+a*D+l*B+c*O,s[12]=o*E+a*L+l*Y+c*ie,s[1]=u*T+d*y+h*U+m*k,s[5]=u*C+d*w+h*F+m*se,s[9]=u*R+d*D+h*B+m*O,s[13]=u*E+d*L+h*Y+m*ie,s[2]=g*T+v*y+p*U+f*k,s[6]=g*C+v*w+p*F+f*se,s[10]=g*R+v*D+p*B+f*O,s[14]=g*E+v*L+p*Y+f*ie,s[3]=x*T+M*y+_*U+b*k,s[7]=x*C+M*w+_*F+b*se,s[11]=x*R+M*D+_*B+b*O,s[15]=x*E+M*L+_*Y+b*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],m=e[14],g=e[3],v=e[7],p=e[11],f=e[15];return g*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*m-i*l*m)+v*(+t*l*m-t*c*h+s*o*h-r*o*m+r*c*u-s*l*u)+p*(+t*c*d-t*a*m-s*o*d+i*o*m+s*a*u-i*c*u)+f*(-r*a*u-t*l*d+t*a*h+r*o*d-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],m=e[11],g=e[12],v=e[13],p=e[14],f=e[15],x=d*p*c-v*h*c+v*l*m-a*p*m-d*l*f+a*h*f,M=g*h*c-u*p*c-g*l*m+o*p*m+u*l*f-o*h*f,_=u*v*c-g*d*c+g*a*m-o*v*m-u*a*f+o*d*f,b=g*d*l-u*v*l-g*a*h+o*v*h+u*a*p-o*d*p,T=t*x+i*M+r*_+s*b;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return e[0]=x*C,e[1]=(v*h*s-d*p*s-v*r*m+i*p*m+d*r*f-i*h*f)*C,e[2]=(a*p*s-v*l*s+v*r*c-i*p*c-a*r*f+i*l*f)*C,e[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*m-i*l*m)*C,e[4]=M*C,e[5]=(u*p*s-g*h*s+g*r*m-t*p*m-u*r*f+t*h*f)*C,e[6]=(g*l*s-o*p*s-g*r*c+t*p*c+o*r*f-t*l*f)*C,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*m+t*l*m)*C,e[8]=_*C,e[9]=(g*d*s-u*v*s-g*i*m+t*v*m+u*i*f-t*d*f)*C,e[10]=(o*v*s-g*a*s+g*i*c-t*v*c-o*i*f+t*a*f)*C,e[11]=(u*a*s-o*d*s-u*i*c+t*d*c+o*i*m-t*a*m)*C,e[12]=b*C,e[13]=(u*v*r-g*d*r+g*i*h-t*v*h-u*i*p+t*d*p)*C,e[14]=(g*a*r-o*v*r-g*i*l+t*v*l+o*i*p-t*a*p)*C,e[15]=(o*d*r-u*a*r+u*i*l-t*d*l-o*i*h+t*a*h)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,m=s*u,g=s*d,v=o*u,p=o*d,f=a*d,x=l*c,M=l*u,_=l*d,b=i.x,T=i.y,C=i.z;return r[0]=(1-(v+f))*b,r[1]=(m+_)*b,r[2]=(g-M)*b,r[3]=0,r[4]=(m-_)*T,r[5]=(1-(h+f))*T,r[6]=(p+x)*T,r[7]=0,r[8]=(g+M)*C,r[9]=(p-x)*C,r[10]=(1-(h+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ki.set(r[0],r[1],r[2]).length();const o=ki.set(r[4],r[5],r[6]).length(),a=ki.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],an.copy(this);const c=1/s,u=1/o,d=1/a;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=u,an.elements[5]*=u,an.elements[6]*=u,an.elements[8]*=d,an.elements[9]*=d,an.elements[10]*=d,t.setFromRotationMatrix(an),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=bn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),m=(i+r)/(i-r);let g,v;if(l)g=s/(o-s),v=o*s/(o-s);else if(a===bn)g=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===co)g=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=bn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),m=-(i+r)/(i-r);let g,v;if(l)g=1/(o-s),v=o/(o-s);else if(a===bn)g=-2/(o-s),v=-(o+s)/(o-s);else if(a===co)g=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ki=new V,an=new ct,If=new V(0,0,0),Lf=new V(1,1,1),$n=new V,ws=new V,Zt=new V,hl=new ct,fl=new ps;class wn{constructor(e=0,t=0,i=0,r=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin($e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return hl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fl.setFromEuler(this),this.setFromQuaternion(fl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class Uc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Df=0;const pl=new V,Hi=new ps,Ln=new ct,Rs=new V,Nr=new V,Uf=new V,Nf=new ps,ml=new V(1,0,0),gl=new V(0,1,0),_l=new V(0,0,1),vl={type:"added"},Ff={type:"removed"},Vi={type:"childadded",child:null},Ho={type:"childremoved",child:null};class Mt extends Tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new V,t=new wn,i=new ps,r=new V(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ct},normalMatrix:{value:new Ge}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.premultiply(Hi),this}rotateX(e){return this.rotateOnAxis(ml,e)}rotateY(e){return this.rotateOnAxis(gl,e)}rotateZ(e){return this.rotateOnAxis(_l,e)}translateOnAxis(e,t){return pl.copy(e).applyQuaternion(this.quaternion),this.position.add(pl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ml,e)}translateY(e){return this.translateOnAxis(gl,e)}translateZ(e){return this.translateOnAxis(_l,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rs.copy(e):Rs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Nr,Rs,this.up):Ln.lookAt(Rs,Nr,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),Hi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vl),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ff),Ho.child=e,this.dispatchEvent(Ho),Ho.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vl),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,Uf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,Nf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Mt.DEFAULT_UP=new V(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new V,Dn=new V,Vo=new V,Un=new V,Gi=new V,Wi=new V,xl=new V,Go=new V,Wo=new V,Xo=new V,qo=new _t,Yo=new _t,Zo=new _t;class hn{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),cn.subVectors(e,t),r.cross(cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){cn.subVectors(r,t),Dn.subVectors(i,t),Vo.subVectors(e,t);const o=cn.dot(cn),a=cn.dot(Dn),l=cn.dot(Vo),c=Dn.dot(Dn),u=Dn.dot(Vo),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,m=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Un.x),l.addScaledVector(o,Un.y),l.addScaledVector(a,Un.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return qo.setScalar(0),Yo.setScalar(0),Zo.setScalar(0),qo.fromBufferAttribute(e,t),Yo.fromBufferAttribute(e,i),Zo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(qo,s.x),o.addScaledVector(Yo,s.y),o.addScaledVector(Zo,s.z),o}static isFrontFacing(e,t,i,r){return cn.subVectors(i,t),Dn.subVectors(e,t),cn.cross(Dn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),cn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Gi.subVectors(r,i),Wi.subVectors(s,i),Go.subVectors(e,i);const l=Gi.dot(Go),c=Wi.dot(Go);if(l<=0&&c<=0)return t.copy(i);Wo.subVectors(e,r);const u=Gi.dot(Wo),d=Wi.dot(Wo);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Gi,o);Xo.subVectors(e,s);const m=Gi.dot(Xo),g=Wi.dot(Xo);if(g>=0&&m<=g)return t.copy(s);const v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Wi,a);const p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return xl.subVectors(s,r),a=(d-u)/(d-u+(m-g)),t.copy(r).addScaledVector(xl,a);const f=1/(p+v+h);return o=v*f,a=h*f,t.copy(i).addScaledVector(Gi,o).addScaledVector(Wi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function $o(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=Sf(e,1),t=$e(t,0,1),i=$e(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=$o(o,s,e+1/3),this.g=$o(o,s,e),this.b=$o(o,s,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=Kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const i=Sd[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wn(e.r),this.g=Wn(e.g),this.b=Wn(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return et.workingToColorSpace(Pt.copy(this),e),Math.round($e(Pt.r*255,0,255))*65536+Math.round($e(Pt.g*255,0,255))*256+Math.round($e(Pt.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Pt.copy(this),t);const i=Pt.r,r=Pt.g,s=Pt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=Kt){et.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,r=Pt.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(Cs);const i=Io(Kn.h,Cs.h,t),r=Io(Kn.s,Cs.s,t),s=Io(Kn.l,Cs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new Xe;Xe.NAMES=Sd;let Of=0;class wr extends Tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=fs(),this.name="",this.type="Material",this.blending=ur,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ya,this.blendDst=Ea,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ya&&(i.blendSrc=this.blendSrc),this.blendDst!==Ea&&(i.blendDst=this.blendDst),this.blendEquation!==Si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_r&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Tn extends wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=ad,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new V,Ps=new Ze;let Bf=0;class ot{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ol,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ps.fromBufferAttribute(this,t),Ps.applyMatrix3(e),this.setXY(t,Ps.x,Ps.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Lr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Lr(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Lr(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Lr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Lr(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),i=zt(i,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ol&&(e.usage=this.usage),e}}class yd extends ot{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ed extends ot{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends ot{constructor(e,t,i){super(new Float32Array(e),t,i)}}let zf=0;const nn=new ct,Ko=new Mt,Xi=new V,$t=new ai,Fr=new ai,Tt=new V;class pt extends Tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xd(e)?Ed:yd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,i){return nn.makeTranslation(e,t,i),this.applyMatrix4(nn),this}scale(e,t,i){return nn.makeScale(e,t,i),this.applyMatrix4(nn),this}lookAt(e){return Ko.lookAt(e),Ko.updateMatrix(),this.applyMatrix4(Ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];$t.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ar);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Fr.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors($t.min,Fr.min),$t.expandByPoint(Tt),Tt.addVectors($t.max,Fr.max),$t.expandByPoint(Tt)):($t.expandByPoint(Fr.min),$t.expandByPoint(Fr.max))}$t.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Tt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Tt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Tt.fromBufferAttribute(a,c),l&&(Xi.fromBufferAttribute(e,c),Tt.add(Xi)),r=Math.max(r,i.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ot(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new V,l[R]=new V;const c=new V,u=new V,d=new V,h=new Ze,m=new Ze,g=new Ze,v=new V,p=new V;function f(R,E,y){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,y),h.fromBufferAttribute(s,R),m.fromBufferAttribute(s,E),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),m.sub(h),g.sub(h);const w=1/(m.x*g.y-g.x*m.y);isFinite(w)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(w),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(w),a[R].add(v),a[E].add(v),a[y].add(v),l[R].add(p),l[E].add(p),l[y].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let R=0,E=x.length;R<E;++R){const y=x[R],w=y.start,D=y.count;for(let L=w,U=w+D;L<U;L+=3)f(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const M=new V,_=new V,b=new V,T=new V;function C(R){b.fromBufferAttribute(r,R),T.copy(b);const E=a[R];M.copy(E),M.sub(b.multiplyScalar(b.dot(E))).normalize(),_.crossVectors(T,E);const w=_.dot(l[R])<0?-1:1;o.setXYZW(R,M.x,M.y,M.z,w)}for(let R=0,E=x.length;R<E;++R){const y=x[R],w=y.start,D=y.count;for(let L=w,U=w+D;L<U;L+=3)C(e.getX(L+0)),C(e.getX(L+1)),C(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ot(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,d=new V;if(e)for(let h=0,m=e.count;h<m;h+=3){const g=e.getX(h+0),v=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,m=t.count;h<m;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let m=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*u;for(let f=0;f<u;f++)h[g++]=c[m++]}return new ot(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],m=e(h,i);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const m=c[d];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ml=new ct,hi=new Dc,Is=new Ar,Sl=new V,Ls=new V,Ds=new V,Us=new V,jo=new V,Ns=new V,yl=new V,Fs=new V;class Ve extends Mt{constructor(e=new pt,t=new Tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ns.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(jo.fromBufferAttribute(d,e),o?Ns.addScaledVector(jo,u):Ns.addScaledVector(jo.sub(t),u))}t.add(Ns)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(s),hi.copy(e.ray).recast(e.near),!(Is.containsPoint(hi.origin)===!1&&(hi.intersectSphere(Is,Sl)===null||hi.origin.distanceToSquared(Sl)>(e.far-e.near)**2))&&(Ml.copy(s).invert(),hi.copy(e.ray).applyMatrix4(Ml),!(i.boundingBox!==null&&hi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){const p=h[g],f=o[p.materialIndex],x=Math.max(p.start,m.start),M=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let _=x,b=M;_<b;_+=3){const T=a.getX(_),C=a.getX(_+1),R=a.getX(_+2);r=Os(this,f,e,i,c,u,d,T,C,R),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){const x=a.getX(p),M=a.getX(p+1),_=a.getX(p+2);r=Os(this,o,e,i,c,u,d,x,M,_),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){const p=h[g],f=o[p.materialIndex],x=Math.max(p.start,m.start),M=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let _=x,b=M;_<b;_+=3){const T=_,C=_+1,R=_+2;r=Os(this,f,e,i,c,u,d,T,C,R),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,f=v;p<f;p+=3){const x=p,M=p+1,_=p+2;r=Os(this,o,e,i,c,u,d,x,M,_),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function kf(n,e,t,i,r,s,o,a){let l;if(e.side===Xt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===oi,a),l===null)return null;Fs.copy(a),Fs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Fs);return c<t.near||c>t.far?null:{distance:c,point:Fs.clone(),object:n}}function Os(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Ls),n.getVertexPosition(l,Ds),n.getVertexPosition(c,Us);const u=kf(n,e,t,i,Ls,Ds,Us,yl);if(u){const d=new V;hn.getBarycoord(yl,Ls,Ds,Us,d),r&&(u.uv=hn.getInterpolatedAttribute(r,a,l,c,d,new Ze)),s&&(u.uv1=hn.getInterpolatedAttribute(s,a,l,c,d,new Ze)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,l,c,d,new V),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new V,materialIndex:0};hn.getNormal(Ls,Ds,Us,h.normal),u.face=h,u.barycoord=d}return u}class Li extends pt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,m=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(d,2));function g(v,p,f,x,M,_,b,T,C,R,E){const y=_/C,w=b/R,D=_/2,L=b/2,U=T/2,F=C+1,B=R+1;let Y=0,k=0;const se=new V;for(let O=0;O<B;O++){const ie=O*w-L;for(let oe=0;oe<F;oe++){const Ce=oe*y-D;se[v]=Ce*x,se[p]=ie*M,se[f]=U,c.push(se.x,se.y,se.z),se[v]=0,se[p]=0,se[f]=T>0?1:-1,u.push(se.x,se.y,se.z),d.push(oe/C),d.push(1-O/R),Y+=1}}for(let O=0;O<R;O++)for(let ie=0;ie<C;ie++){const oe=h+ie+F*O,Ce=h+ie+F*(O+1),Se=h+(ie+1)+F*(O+1),z=h+(ie+1)+F*O;l.push(oe,Ce,z),l.push(Ce,Se,z),k+=6}a.addGroup(m,k,E),m+=k,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Sr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=Sr(n[t]);for(const r in i)e[r]=i[r]}return e}function Hf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function bd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Vf={clone:Sr,merge:Nt};var Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends wr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Wf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sr(e.uniforms),this.uniformsGroups=Hf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Td extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const jn=new V,El=new Ze,bl=new Ze;class un extends Td{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ac*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Po*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ac*2*Math.atan(Math.tan(Po*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jn.x,jn.y).multiplyScalar(-e/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(jn.x,jn.y).multiplyScalar(-e/jn.z)}getViewSize(e,t){return this.getViewBounds(e,El,bl),t.subVectors(bl,El)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Po*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qi=-90,Yi=1;class Xf extends Mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new un(qi,Yi,e,t);r.layers=this.layers,this.add(r);const s=new un(qi,Yi,e,t);s.layers=this.layers,this.add(s);const o=new un(qi,Yi,e,t);o.layers=this.layers,this.add(o);const a=new un(qi,Yi,e,t);a.layers=this.layers,this.add(a);const l=new un(qi,Yi,e,t);l.layers=this.layers,this.add(l);const c=new un(qi,Yi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===bn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===co)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ad extends Ot{constructor(e=[],t=vr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qf extends Ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ad(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Li(5,5,5),s=new Rn({name:"CubemapFromEquirect",uniforms:Sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:ri});s.uniforms.tEquirect.value=t;const o=new Ve(r,s),a=t.minFilter;return t.minFilter===Ti&&(t.minFilter=yn),new Xf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class ni extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yf={type:"move"};class Jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ni,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ni,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ni,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),f=this._getHandJoint(c,v);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&h>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Yf)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ni;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Nc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Xe(e),this.near=t,this.far=i}clone(){return new Nc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Zf extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class $f extends Ot{constructor(e=null,t=1,i=1,r,s,o,a,l,c=Qt,u=Qt,d,h){super(null,o,a,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cc extends ot{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zi=new ct,Tl=new ct,Bs=[],Al=new ai,Kf=new ct,Or=new Ve,Br=new Ar;class wd extends Ve{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Kf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ai),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Al.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(Al)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ar),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Br.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Br)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Or.geometry=this.geometry,Or.material=this.material,Or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Br.copy(this.boundingSphere),Br.applyMatrix4(i),e.ray.intersectsSphere(Br)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Zi),Tl.multiplyMatrices(i,Zi),Or.matrixWorld=Tl,Or.raycast(e,Bs);for(let o=0,a=Bs.length;o<a;o++){const l=Bs[o];l.instanceId=s,l.object=this,t.push(l)}Bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new cc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new $f(new Float32Array(r*this.count),r,this.count,Rc,En));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Qo=new V,jf=new V,Jf=new Ge;class xi{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Qo.subVectors(i,t).cross(jf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Qo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Jf.getNormalMatrix(e),r=this.coplanarPoint(Qo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new Ar,Qf=new Ze(.5,.5),zs=new V;class Fc{constructor(e=new xi,t=new xi,i=new xi,r=new xi,s=new xi,o=new xi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=bn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],m=s[7],g=s[8],v=s[9],p=s[10],f=s[11],x=s[12],M=s[13],_=s[14],b=s[15];if(r[0].setComponents(c-o,m-u,f-g,b-x).normalize(),r[1].setComponents(c+o,m+u,f+g,b+x).normalize(),r[2].setComponents(c+a,m+d,f+v,b+M).normalize(),r[3].setComponents(c-a,m-d,f-v,b-M).normalize(),i)r[4].setComponents(l,h,p,_).normalize(),r[5].setComponents(c-l,m-h,f-p,b-_).normalize();else if(r[4].setComponents(c-l,m-h,f-p,b-_).normalize(),t===bn)r[5].setComponents(c+l,m+h,f+p,b+_).normalize();else if(t===co)r[5].setComponents(l,h,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(e){fi.center.set(0,0,0);const t=Qf.distanceTo(e.center);return fi.radius=.7071067811865476+t,fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(zs.x=r.normal.x>0?e.max.x:e.min.x,zs.y=r.normal.y>0?e.max.y:e.min.y,zs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rd extends wr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const uo=new V,ho=new V,wl=new ct,zr=new Dc,ks=new Ar,ea=new V,Rl=new V;class ep extends Mt{constructor(e=new pt,t=new Rd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)uo.fromBufferAttribute(t,r-1),ho.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=uo.distanceTo(ho);e.setAttribute("lineDistance",new dt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(r),ks.radius+=s,e.ray.intersectsSphere(ks)===!1)return;wl.copy(r).invert(),zr.copy(e.ray).applyMatrix4(wl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=m,p=g-1;v<p;v+=c){const f=u.getX(v),x=u.getX(v+1),M=Hs(this,e,zr,l,f,x,v);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(g-1),p=u.getX(m),f=Hs(this,e,zr,l,v,p,g-1);f&&t.push(f)}}else{const m=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=m,p=g-1;v<p;v+=c){const f=Hs(this,e,zr,l,v,v+1,v);f&&t.push(f)}if(this.isLineLoop){const v=Hs(this,e,zr,l,g-1,m,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Hs(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(uo.fromBufferAttribute(a,r),ho.fromBufferAttribute(a,s),t.distanceSqToSegment(uo,ho,ea,Rl)>i)return;ea.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ea);if(!(c<e.near||c>e.far))return{distance:c,point:Rl.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class Cd extends Ot{constructor(e,t,i=Pi,r,s,o,a=Qt,l=Qt,c,u=ls,d=1){if(u!==ls&&u!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Oc extends pt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new V,u=new Ze;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const m=i+d/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(a,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Jt extends pt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],m=[];let g=0;const v=[],p=i/2;let f=0;x(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new dt(d,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(m,2));function x(){const _=new V,b=new V;let T=0;const C=(t-e)/i;for(let R=0;R<=s;R++){const E=[],y=R/s,w=y*(t-e)+e;for(let D=0;D<=r;D++){const L=D/r,U=L*l+a,F=Math.sin(U),B=Math.cos(U);b.x=w*F,b.y=-y*i+p,b.z=w*B,d.push(b.x,b.y,b.z),_.set(F,C,B).normalize(),h.push(_.x,_.y,_.z),m.push(L,1-y),E.push(g++)}v.push(E)}for(let R=0;R<r;R++)for(let E=0;E<s;E++){const y=v[E][R],w=v[E+1][R],D=v[E+1][R+1],L=v[E][R+1];(e>0||E!==0)&&(u.push(y,w,L),T+=3),(t>0||E!==s-1)&&(u.push(w,D,L),T+=3)}c.addGroup(f,T,0),f+=T}function M(_){const b=g,T=new Ze,C=new V;let R=0;const E=_===!0?e:t,y=_===!0?1:-1;for(let D=1;D<=r;D++)d.push(0,p*y,0),h.push(0,y,0),m.push(.5,.5),g++;const w=g;for(let D=0;D<=r;D++){const U=D/r*l+a,F=Math.cos(U),B=Math.sin(U);C.x=E*B,C.y=p*y,C.z=E*F,d.push(C.x,C.y,C.z),h.push(0,y,0),T.x=F*.5+.5,T.y=B*.5*y+.5,m.push(T.x,T.y),g++}for(let D=0;D<r;D++){const L=b+D,U=w+D;_===!0?u.push(U,U+1,L):u.push(U+1,U,L),R+=3}c.addGroup(f,R,_===!0?1:2),f+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ci extends Jt{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ci(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _o extends pt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(s.slice(),3)),this.setAttribute("uv",new dt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const M=new V,_=new V,b=new V;for(let T=0;T<t.length;T+=3)m(t[T+0],M),m(t[T+1],_),m(t[T+2],b),l(M,_,b,x)}function l(x,M,_,b){const T=b+1,C=[];for(let R=0;R<=T;R++){C[R]=[];const E=x.clone().lerp(_,R/T),y=M.clone().lerp(_,R/T),w=T-R;for(let D=0;D<=w;D++)D===0&&R===T?C[R][D]=E:C[R][D]=E.clone().lerp(y,D/w)}for(let R=0;R<T;R++)for(let E=0;E<2*(T-R)-1;E++){const y=Math.floor(E/2);E%2===0?(h(C[R][y+1]),h(C[R+1][y]),h(C[R][y])):(h(C[R][y+1]),h(C[R+1][y+1]),h(C[R+1][y]))}}function c(x){const M=new V;for(let _=0;_<s.length;_+=3)M.x=s[_+0],M.y=s[_+1],M.z=s[_+2],M.normalize().multiplyScalar(x),s[_+0]=M.x,s[_+1]=M.y,s[_+2]=M.z}function u(){const x=new V;for(let M=0;M<s.length;M+=3){x.x=s[M+0],x.y=s[M+1],x.z=s[M+2];const _=p(x)/2/Math.PI+.5,b=f(x)/Math.PI+.5;o.push(_,1-b)}g(),d()}function d(){for(let x=0;x<o.length;x+=6){const M=o[x+0],_=o[x+2],b=o[x+4],T=Math.max(M,_,b),C=Math.min(M,_,b);T>.9&&C<.1&&(M<.2&&(o[x+0]+=1),_<.2&&(o[x+2]+=1),b<.2&&(o[x+4]+=1))}}function h(x){s.push(x.x,x.y,x.z)}function m(x,M){const _=x*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function g(){const x=new V,M=new V,_=new V,b=new V,T=new Ze,C=new Ze,R=new Ze;for(let E=0,y=0;E<s.length;E+=9,y+=6){x.set(s[E+0],s[E+1],s[E+2]),M.set(s[E+3],s[E+4],s[E+5]),_.set(s[E+6],s[E+7],s[E+8]),T.set(o[y+0],o[y+1]),C.set(o[y+2],o[y+3]),R.set(o[y+4],o[y+5]),b.copy(x).add(M).add(_).divideScalar(3);const w=p(b);v(T,y+0,x,w),v(C,y+2,M,w),v(R,y+4,_,w)}}function v(x,M,_,b){b<0&&x.x===1&&(o[M]=x.x-1),_.x===0&&_.z===0&&(o[M]=b/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function f(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _o(e.vertices,e.indices,e.radius,e.details)}}class Bc extends _o{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Bc(e.radius,e.detail)}}class vo extends _o{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new vo(e.radius,e.detail)}}class xo extends pt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,h=t/l,m=[],g=[],v=[],p=[];for(let f=0;f<u;f++){const x=f*h-o;for(let M=0;M<c;M++){const _=M*d-s;g.push(_,-x,0),v.push(0,0,1),p.push(M/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<a;x++){const M=x+c*f,_=x+c*(f+1),b=x+1+c*(f+1),T=x+1+c*f;m.push(M,_,T),m.push(_,b,T)}this.setIndex(m),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xo(e.width,e.height,e.widthSegments,e.heightSegments)}}class zc extends pt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new V,h=new V,m=[],g=[],v=[],p=[];for(let f=0;f<=i;f++){const x=[],M=f/i;let _=0;f===0&&o===0?_=.5/t:f===i&&l===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){const T=b/t;d.x=-e*Math.cos(r+T*s)*Math.sin(o+M*a),d.y=e*Math.cos(o+M*a),d.z=e*Math.sin(r+T*s)*Math.sin(o+M*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),p.push(T+_,1-M),x.push(c++)}u.push(x)}for(let f=0;f<i;f++)for(let x=0;x<t;x++){const M=u[f][x+1],_=u[f][x],b=u[f+1][x],T=u[f+1][x+1];(f!==0||o>0)&&m.push(M,_,T),(f!==i-1||l<Math.PI)&&m.push(_,b,T)}this.setIndex(m),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(v,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class rn extends wr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_d,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class tp extends wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class np extends wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ip extends Rd{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Pd extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class rp extends Pd{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ta=new ct,Cl=new V,Pl=new V;class sp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fc,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Cl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cl),Pl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Pl),t.updateMatrixWorld(),ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ta,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class kc extends Td{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class op extends sp{constructor(){super(new kc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Il extends Pd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new op}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ap extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ll=new ct;class cp{constructor(e,t,i=0,r=1/0){this.ray=new Dc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Uc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ll.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ll),this}intersectObject(e,t=!0,i=[]){return lc(e,this,i,t),i.sort(Dl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)lc(e[r],this,i,t);return i.sort(Dl),i}}function Dl(n,e){return n.distance-e.distance}function lc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)lc(s[o],e,t,!0)}}function Ul(n,e,t,i){const r=lp(i);switch(t){case fd:return n*e;case Rc:return n*e/r.components*r.byteLength;case Cc:return n*e/r.components*r.byteLength;case md:return n*e*2/r.components*r.byteLength;case Pc:return n*e*2/r.components*r.byteLength;case pd:return n*e*3/r.components*r.byteLength;case fn:return n*e*4/r.components*r.byteLength;case Ic:return n*e*4/r.components*r.byteLength;case eo:case to:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case no:case io:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fa:case Ba:return Math.max(n,16)*Math.max(e,8)/4;case Na:case Oa:return Math.max(n,8)*Math.max(e,8)/2;case za:case ka:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Va:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case qa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Za:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case $a:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ja:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ec:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case tc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ro:case nc:case ic:return Math.ceil(n/4)*Math.ceil(e/4)*16;case gd:case rc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case sc:case oc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lp(n){switch(n){case An:case ud:return{byteLength:1,components:1};case as:case dd:case hs:return{byteLength:2,components:1};case Ac:case wc:return{byteLength:2,components:4};case Pi:case Tc:case En:return{byteLength:4,components:1};case hd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bc);function Id(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function up(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<d.length;m++){const g=d[h],v=d[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,d[h]=v)}d.length=h+1;for(let m=0,g=d.length;m<g;m++){const v=d[m];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var dp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hp=`#ifdef USE_ALPHAHASH
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
#endif`,fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_p=`#ifdef USE_AOMAP
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
#endif`,vp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xp=`#ifdef USE_BATCHING
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
#endif`,Mp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ep=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bp=`#ifdef USE_IRIDESCENCE
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
#endif`,Tp=`#ifdef USE_BUMPMAP
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
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Up=`#define PI 3.141592653589793
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
} // validated`,Np=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fp=`vec3 transformedNormal = objectNormal;
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
#endif`,Op=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xp=`#ifdef USE_ENVMAP
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
#endif`,qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yp=`#ifdef USE_ENVMAP
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
#endif`,Zp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$p=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jp=`#ifdef USE_GRADIENTMAP
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
}`,Qp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,em=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nm=`uniform bool receiveShadow;
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
#endif`,im=`#ifdef USE_ENVMAP
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
#endif`,rm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,om=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cm=`PhysicalMaterial material;
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
#endif`,lm=`struct PhysicalMaterial {
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
}`,um=`
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
#endif`,dm=`#if defined( RE_IndirectDiffuse )
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
#endif`,hm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_m=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mm=`#if defined( USE_POINTS_UV )
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
#endif`,Sm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ym=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Em=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Am=`#ifdef USE_MORPHTARGETS
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
#endif`,wm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dm=`#ifdef USE_NORMALMAP
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
#endif`,Um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Om=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,km=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ym=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$m=`float getShadowMask() {
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
}`,Km=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jm=`#ifdef USE_SKINNING
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
#endif`,Jm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qm=`#ifdef USE_SKINNING
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
#endif`,eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ng=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ig=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rg=`#ifdef USE_TRANSMISSION
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
#endif`,sg=`#ifdef USE_TRANSMISSION
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
#endif`,og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ug=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dg=`uniform sampler2D t2D;
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
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`#include <common>
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
}`,_g=`#if DEPTH_PACKING == 3200
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
}`,vg=`#define DISTANCE
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
}`,xg=`#define DISTANCE
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
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`uniform float scale;
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
}`,Eg=`uniform vec3 diffuse;
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
}`,bg=`#include <common>
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
}`,Tg=`uniform vec3 diffuse;
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
}`,Ag=`#define LAMBERT
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
}`,wg=`#define LAMBERT
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
}`,Rg=`#define MATCAP
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
}`,Cg=`#define MATCAP
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
}`,Pg=`#define NORMAL
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
}`,Ig=`#define NORMAL
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
}`,Lg=`#define PHONG
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
}`,Dg=`#define PHONG
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
}`,Ug=`#define STANDARD
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
}`,Ng=`#define STANDARD
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
}`,Fg=`#define TOON
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
}`,Og=`#define TOON
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
}`,Bg=`uniform float size;
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
}`,zg=`uniform vec3 diffuse;
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
}`,kg=`#include <common>
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
}`,Hg=`uniform vec3 color;
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
}`,Vg=`uniform float rotation;
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
}`,Gg=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:dp,alphahash_pars_fragment:hp,alphamap_fragment:fp,alphamap_pars_fragment:pp,alphatest_fragment:mp,alphatest_pars_fragment:gp,aomap_fragment:_p,aomap_pars_fragment:vp,batching_pars_vertex:xp,batching_vertex:Mp,begin_vertex:Sp,beginnormal_vertex:yp,bsdfs:Ep,iridescence_fragment:bp,bumpmap_pars_fragment:Tp,clipping_planes_fragment:Ap,clipping_planes_pars_fragment:wp,clipping_planes_pars_vertex:Rp,clipping_planes_vertex:Cp,color_fragment:Pp,color_pars_fragment:Ip,color_pars_vertex:Lp,color_vertex:Dp,common:Up,cube_uv_reflection_fragment:Np,defaultnormal_vertex:Fp,displacementmap_pars_vertex:Op,displacementmap_vertex:Bp,emissivemap_fragment:zp,emissivemap_pars_fragment:kp,colorspace_fragment:Hp,colorspace_pars_fragment:Vp,envmap_fragment:Gp,envmap_common_pars_fragment:Wp,envmap_pars_fragment:Xp,envmap_pars_vertex:qp,envmap_physical_pars_fragment:im,envmap_vertex:Yp,fog_vertex:Zp,fog_pars_vertex:$p,fog_fragment:Kp,fog_pars_fragment:jp,gradientmap_pars_fragment:Jp,lightmap_pars_fragment:Qp,lights_lambert_fragment:em,lights_lambert_pars_fragment:tm,lights_pars_begin:nm,lights_toon_fragment:rm,lights_toon_pars_fragment:sm,lights_phong_fragment:om,lights_phong_pars_fragment:am,lights_physical_fragment:cm,lights_physical_pars_fragment:lm,lights_fragment_begin:um,lights_fragment_maps:dm,lights_fragment_end:hm,logdepthbuf_fragment:fm,logdepthbuf_pars_fragment:pm,logdepthbuf_pars_vertex:mm,logdepthbuf_vertex:gm,map_fragment:_m,map_pars_fragment:vm,map_particle_fragment:xm,map_particle_pars_fragment:Mm,metalnessmap_fragment:Sm,metalnessmap_pars_fragment:ym,morphinstance_vertex:Em,morphcolor_vertex:bm,morphnormal_vertex:Tm,morphtarget_pars_vertex:Am,morphtarget_vertex:wm,normal_fragment_begin:Rm,normal_fragment_maps:Cm,normal_pars_fragment:Pm,normal_pars_vertex:Im,normal_vertex:Lm,normalmap_pars_fragment:Dm,clearcoat_normal_fragment_begin:Um,clearcoat_normal_fragment_maps:Nm,clearcoat_pars_fragment:Fm,iridescence_pars_fragment:Om,opaque_fragment:Bm,packing:zm,premultiplied_alpha_fragment:km,project_vertex:Hm,dithering_fragment:Vm,dithering_pars_fragment:Gm,roughnessmap_fragment:Wm,roughnessmap_pars_fragment:Xm,shadowmap_pars_fragment:qm,shadowmap_pars_vertex:Ym,shadowmap_vertex:Zm,shadowmask_pars_fragment:$m,skinbase_vertex:Km,skinning_pars_vertex:jm,skinning_vertex:Jm,skinnormal_vertex:Qm,specularmap_fragment:eg,specularmap_pars_fragment:tg,tonemapping_fragment:ng,tonemapping_pars_fragment:ig,transmission_fragment:rg,transmission_pars_fragment:sg,uv_pars_fragment:og,uv_pars_vertex:ag,uv_vertex:cg,worldpos_vertex:lg,background_vert:ug,background_frag:dg,backgroundCube_vert:hg,backgroundCube_frag:fg,cube_vert:pg,cube_frag:mg,depth_vert:gg,depth_frag:_g,distanceRGBA_vert:vg,distanceRGBA_frag:xg,equirect_vert:Mg,equirect_frag:Sg,linedashed_vert:yg,linedashed_frag:Eg,meshbasic_vert:bg,meshbasic_frag:Tg,meshlambert_vert:Ag,meshlambert_frag:wg,meshmatcap_vert:Rg,meshmatcap_frag:Cg,meshnormal_vert:Pg,meshnormal_frag:Ig,meshphong_vert:Lg,meshphong_frag:Dg,meshphysical_vert:Ug,meshphysical_frag:Ng,meshtoon_vert:Fg,meshtoon_frag:Og,points_vert:Bg,points_frag:zg,shadow_vert:kg,shadow_frag:Hg,sprite_vert:Vg,sprite_frag:Gg},Me={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Mn={basic:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Xe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Nt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Nt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Xe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Nt([Me.points,Me.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Nt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Nt([Me.common,Me.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Nt([Me.sprite,Me.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Nt([Me.common,Me.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Nt([Me.lights,Me.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Mn.physical={uniforms:Nt([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Vs={r:0,b:0,g:0},pi=new wn,Wg=new ct;function Xg(n,e,t,i,r,s,o){const a=new Xe(0);let l=s===!0?0:1,c,u,d=null,h=0,m=null;function g(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?t:e).get(_)),_}function v(M){let _=!1;const b=g(M);b===null?f(a,l):b&&b.isColor&&(f(b,1),_=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(M,_){const b=g(_);b&&(b.isCubeTexture||b.mapping===go)?(u===void 0&&(u=new Ve(new Li(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:Sr(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),pi.copy(_.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Wg.makeRotationFromEuler(pi)),u.material.toneMapped=et.getTransfer(b.colorSpace)!==it,(d!==b||h!==b.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,d=b,h=b.version,m=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Ve(new xo(2,2),new Rn({name:"BackgroundMaterial",uniforms:Sr(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=et.getTransfer(b.colorSpace)!==it,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=b,h=b.version,m=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,_){M.getRGB(Vs,bd(n)),i.buffers.color.setClear(Vs.r,Vs.g,Vs.b,_,o)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),l=_,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(a,l)},render:v,addToRenderList:p,dispose:x}}function qg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(y,w,D,L,U){let F=!1;const B=d(L,D,w);s!==B&&(s=B,c(s.object)),F=m(y,L,D,U),F&&g(y,L,D,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,_(y,w,D,L),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function d(y,w,D){const L=D.wireframe===!0;let U=i[y.id];U===void 0&&(U={},i[y.id]=U);let F=U[w.id];F===void 0&&(F={},U[w.id]=F);let B=F[L];return B===void 0&&(B=h(l()),F[L]=B),B}function h(y){const w=[],D=[],L=[];for(let U=0;U<t;U++)w[U]=0,D[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:D,attributeDivisors:L,object:y,attributes:{},index:null}}function m(y,w,D,L){const U=s.attributes,F=w.attributes;let B=0;const Y=D.getAttributes();for(const k in Y)if(Y[k].location>=0){const O=U[k];let ie=F[k];if(ie===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(ie=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(ie=y.instanceColor)),O===void 0||O.attribute!==ie||ie&&O.data!==ie.data)return!0;B++}return s.attributesNum!==B||s.index!==L}function g(y,w,D,L){const U={},F=w.attributes;let B=0;const Y=D.getAttributes();for(const k in Y)if(Y[k].location>=0){let O=F[k];O===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(O=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(O=y.instanceColor));const ie={};ie.attribute=O,O&&O.data&&(ie.data=O.data),U[k]=ie,B++}s.attributes=U,s.attributesNum=B,s.index=L}function v(){const y=s.newAttributes;for(let w=0,D=y.length;w<D;w++)y[w]=0}function p(y){f(y,0)}function f(y,w){const D=s.newAttributes,L=s.enabledAttributes,U=s.attributeDivisors;D[y]=1,L[y]===0&&(n.enableVertexAttribArray(y),L[y]=1),U[y]!==w&&(n.vertexAttribDivisor(y,w),U[y]=w)}function x(){const y=s.newAttributes,w=s.enabledAttributes;for(let D=0,L=w.length;D<L;D++)w[D]!==y[D]&&(n.disableVertexAttribArray(D),w[D]=0)}function M(y,w,D,L,U,F,B){B===!0?n.vertexAttribIPointer(y,w,D,U,F):n.vertexAttribPointer(y,w,D,L,U,F)}function _(y,w,D,L){v();const U=L.attributes,F=D.getAttributes(),B=w.defaultAttributeValues;for(const Y in F){const k=F[Y];if(k.location>=0){let se=U[Y];if(se===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),se!==void 0){const O=se.normalized,ie=se.itemSize,oe=e.get(se);if(oe===void 0)continue;const Ce=oe.buffer,Se=oe.type,z=oe.bytesPerElement,re=Se===n.INT||Se===n.UNSIGNED_INT||se.gpuType===Tc;if(se.isInterleavedBufferAttribute){const le=se.data,be=le.stride,Ae=se.offset;if(le.isInstancedInterleavedBuffer){for(let X=0;X<k.locationSize;X++)f(k.location+X,le.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let X=0;X<k.locationSize;X++)p(k.location+X);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let X=0;X<k.locationSize;X++)M(k.location+X,ie/k.locationSize,Se,O,be*z,(Ae+ie/k.locationSize*X)*z,re)}else{if(se.isInstancedBufferAttribute){for(let le=0;le<k.locationSize;le++)f(k.location+le,se.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let le=0;le<k.locationSize;le++)p(k.location+le);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let le=0;le<k.locationSize;le++)M(k.location+le,ie/k.locationSize,Se,O,ie*z,ie/k.locationSize*le*z,re)}}else if(B!==void 0){const O=B[Y];if(O!==void 0)switch(O.length){case 2:n.vertexAttrib2fv(k.location,O);break;case 3:n.vertexAttrib3fv(k.location,O);break;case 4:n.vertexAttrib4fv(k.location,O);break;default:n.vertexAttrib1fv(k.location,O)}}}}x()}function b(){R();for(const y in i){const w=i[y];for(const D in w){const L=w[D];for(const U in L)u(L[U].object),delete L[U];delete w[D]}delete i[y]}}function T(y){if(i[y.id]===void 0)return;const w=i[y.id];for(const D in w){const L=w[D];for(const U in L)u(L[U].object),delete L[U];delete w[D]}delete i[y.id]}function C(y){for(const w in i){const D=i[w];if(D[y.id]===void 0)continue;const L=D[y.id];for(const U in L)u(L[U].object),delete L[U];delete D[y.id]}}function R(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:E,dispose:b,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function Yg(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];t.update(m,i,1)}function l(c,u,d,h){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v]*h[v];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Zg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==fn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const R=C===hs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==An&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!R)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:b,maxSamples:T}}function $g(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new xi,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||r;return r=h,i=d.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,m){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,f=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{const x=s?0:i,M=x*4;let _=f.clippingState||null;l.value=_,_=u(g,h,M,m);for(let b=0;b!==M;++b)_[b]=t[b];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,m,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const f=m+v*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<f)&&(p=new Float32Array(f));for(let M=0,_=m;M!==v;++M,_+=4)o.copy(d[M]).applyMatrix4(x,a),o.normal.toArray(p,_),p[_+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function Kg(n){let e=new WeakMap;function t(o,a){return a===Ia?o.mapping=vr:a===La&&(o.mapping=xr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ia||a===La)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new qf(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const or=4,Nl=[.125,.215,.35,.446,.526,.582],yi=20,na=new kc,Fl=new Xe;let ia=null,ra=0,sa=0,oa=!1;const Mi=(1+Math.sqrt(5))/2,$i=1/Mi,Ol=[new V(-Mi,$i,0),new V(Mi,$i,0),new V(-$i,0,Mi),new V($i,0,Mi),new V(0,Mi,-$i),new V(0,Mi,$i),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],jg=new V;class Bl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=jg}=s;ia=this._renderer.getRenderTarget(),ra=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ia,ra,sa),this._renderer.xr.enabled=oa,e.scissorTest=!1,Gs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vr||e.mapping===xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ia=this._renderer.getRenderTarget(),ra=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:hs,format:fn,colorSpace:Mr,depthBuffer:!1},r=zl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jg(s)),this._blurMaterial=Qg(s,e,t)}return r}_compileMaterial(e){const t=new Ve(this._lodPlanes[0],e);this._renderer.compile(t,na)}_sceneToCubeUV(e,t,i,r,s){const l=new un(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(Fl),d.toneMapping=si,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null));const v=new Tn({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),p=new Ve(new Li,v);let f=!1;const x=e.background;x?x.isColor&&(v.color.copy(x),e.background=null,f=!0):(v.color.copy(Fl),f=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const b=this._cubeSize;Gs(r,_*b,M>2?b:0,b,b),d.setRenderTarget(r),f&&d.render(p,l),d.render(e,l)}p.geometry.dispose(),p.material.dispose(),d.toneMapping=m,d.autoClear=h,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===vr||e.mapping===xr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ve(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Gs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,na)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ol[(r-s-1)%Ol.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ve(this._lodPlanes[r],c),h=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*yi-1),v=s/g,p=isFinite(s)?1+Math.floor(u*v):yi;p>yi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${yi}`);const f=[];let x=0;for(let C=0;C<yi;++C){const R=C/v,E=Math.exp(-R*R/2);f.push(E),C===0?x+=E:C<p&&(x+=2*E)}for(let C=0;C<f.length;C++)f[C]=f[C]/x;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:M}=this;h.dTheta.value=g,h.mipInt.value=M-i;const _=this._sizeLods[r],b=3*_*(r>M-or?r-M+or:0),T=4*(this._cubeSize-_);Gs(t,b,T,3*_,2*_),l.setRenderTarget(t),l.render(d,na)}}function Jg(n){const e=[],t=[],i=[];let r=n;const s=n-or+1+Nl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-or?l=Nl[o-n+or-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,v=3,p=2,f=1,x=new Float32Array(v*g*m),M=new Float32Array(p*g*m),_=new Float32Array(f*g*m);for(let T=0;T<m;T++){const C=T%3*2/3-1,R=T>2?0:-1,E=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];x.set(E,v*g*T),M.set(h,p*g*T);const y=[T,T,T,T,T,T];_.set(y,f*g*T)}const b=new pt;b.setAttribute("position",new ot(x,v)),b.setAttribute("uv",new ot(M,p)),b.setAttribute("faceIndex",new ot(_,f)),e.push(b),r>or&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function zl(n,e,t){const i=new Ii(n,e,t);return i.texture.mapping=go,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Gs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Qg(n,e,t){const i=new Float32Array(yi),r=new V(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hc(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function kl(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hc(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Hl(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Hc(){return`

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
	`}function e0(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ia||l===La,u=l===vr||l===xr;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Bl(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return c&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new Bl(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function t0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&dr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function n0(n,e,t,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)e.update(h[m],n.ARRAY_BUFFER)}function c(d){const h=[],m=d.index,g=d.attributes.position;let v=0;if(m!==null){const x=m.array;v=m.version;for(let M=0,_=x.length;M<_;M+=3){const b=x[M+0],T=x[M+1],C=x[M+2];h.push(b,T,T,C,C,b)}}else if(g!==void 0){const x=g.array;v=g.version;for(let M=0,_=x.length/3-1;M<_;M+=3){const b=M+0,T=M+1,C=M+2;h.push(b,T,T,C,C,b)}}else return;const p=new(xd(h)?Ed:yd)(h,1);p.version=v;const f=s.get(d);f&&e.remove(f),s.set(d,p)}function u(d){const h=s.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function i0(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,m){n.drawElements(i,m,s,h*o),t.update(m,i,1)}function c(h,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,h*o,g),t.update(m,i,g))}function u(h,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,h,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];t.update(p,i,1)}function d(h,m,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<h.length;f++)c(h[f]/o,m[f],v[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,v,0,g);let f=0;for(let x=0;x<g;x++)f+=m[x]*v[x];t.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function r0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function s0(n,e,t){const i=new WeakMap,r=new _t;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let y=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var m=y;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),p===!0&&(_=3);let b=a.attributes.position.count*_,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const C=new Float32Array(b*T*4*d),R=new Md(C,b,T,d);R.type=En,R.needsUpdate=!0;const E=_*4;for(let w=0;w<d;w++){const D=f[w],L=x[w],U=M[w],F=b*T*4*w;for(let B=0;B<D.count;B++){const Y=B*E;g===!0&&(r.fromBufferAttribute(D,B),C[F+Y+0]=r.x,C[F+Y+1]=r.y,C[F+Y+2]=r.z,C[F+Y+3]=0),v===!0&&(r.fromBufferAttribute(L,B),C[F+Y+4]=r.x,C[F+Y+5]=r.y,C[F+Y+6]=r.z,C[F+Y+7]=0),p===!0&&(r.fromBufferAttribute(U,B),C[F+Y+8]=r.x,C[F+Y+9]=r.y,C[F+Y+10]=r.z,C[F+Y+11]=U.itemSize===4?r.w:1)}}h={count:d,texture:R,size:new Ze(b,T)},i.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function o0(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Ld=new Ot,Vl=new Cd(1,1),Dd=new Md,Ud=new Cf,Nd=new Ad,Gl=[],Wl=[],Xl=new Float32Array(16),ql=new Float32Array(9),Yl=new Float32Array(4);function Rr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Gl[r];if(s===void 0&&(s=new Float32Array(r),Gl[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Mo(n,e){let t=Wl[e];t===void 0&&(t=new Int32Array(e),Wl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function a0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function c0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),bt(t,e)}}function l0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),bt(t,e)}}function u0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),bt(t,e)}}function d0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,i))return;Yl.set(i),n.uniformMatrix2fv(this.addr,!1,Yl),bt(t,i)}}function h0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,i))return;ql.set(i),n.uniformMatrix3fv(this.addr,!1,ql),bt(t,i)}}function f0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,i))return;Xl.set(i),n.uniformMatrix4fv(this.addr,!1,Xl),bt(t,i)}}function p0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function m0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),bt(t,e)}}function g0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),bt(t,e)}}function _0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),bt(t,e)}}function v0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function x0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),bt(t,e)}}function M0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),bt(t,e)}}function S0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),bt(t,e)}}function y0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Vl.compareFunction=vd,s=Vl):s=Ld,t.setTexture2D(e||s,r)}function E0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ud,r)}function b0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Nd,r)}function T0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Dd,r)}function A0(n){switch(n){case 5126:return a0;case 35664:return c0;case 35665:return l0;case 35666:return u0;case 35674:return d0;case 35675:return h0;case 35676:return f0;case 5124:case 35670:return p0;case 35667:case 35671:return m0;case 35668:case 35672:return g0;case 35669:case 35673:return _0;case 5125:return v0;case 36294:return x0;case 36295:return M0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return y0;case 35679:case 36299:case 36307:return E0;case 35680:case 36300:case 36308:case 36293:return b0;case 36289:case 36303:case 36311:case 36292:return T0}}function w0(n,e){n.uniform1fv(this.addr,e)}function R0(n,e){const t=Rr(e,this.size,2);n.uniform2fv(this.addr,t)}function C0(n,e){const t=Rr(e,this.size,3);n.uniform3fv(this.addr,t)}function P0(n,e){const t=Rr(e,this.size,4);n.uniform4fv(this.addr,t)}function I0(n,e){const t=Rr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function L0(n,e){const t=Rr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function D0(n,e){const t=Rr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function U0(n,e){n.uniform1iv(this.addr,e)}function N0(n,e){n.uniform2iv(this.addr,e)}function F0(n,e){n.uniform3iv(this.addr,e)}function O0(n,e){n.uniform4iv(this.addr,e)}function B0(n,e){n.uniform1uiv(this.addr,e)}function z0(n,e){n.uniform2uiv(this.addr,e)}function k0(n,e){n.uniform3uiv(this.addr,e)}function H0(n,e){n.uniform4uiv(this.addr,e)}function V0(n,e,t){const i=this.cache,r=e.length,s=Mo(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Ld,s[o])}function G0(n,e,t){const i=this.cache,r=e.length,s=Mo(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Ud,s[o])}function W0(n,e,t){const i=this.cache,r=e.length,s=Mo(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Nd,s[o])}function X0(n,e,t){const i=this.cache,r=e.length,s=Mo(t,r);Et(i,s)||(n.uniform1iv(this.addr,s),bt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Dd,s[o])}function q0(n){switch(n){case 5126:return w0;case 35664:return R0;case 35665:return C0;case 35666:return P0;case 35674:return I0;case 35675:return L0;case 35676:return D0;case 5124:case 35670:return U0;case 35667:case 35671:return N0;case 35668:case 35672:return F0;case 35669:case 35673:return O0;case 5125:return B0;case 36294:return z0;case 36295:return k0;case 36296:return H0;case 35678:case 36198:case 36298:case 36306:case 35682:return V0;case 35679:case 36299:case 36307:return G0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return X0}}class Y0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=A0(t.type)}}class Z0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=q0(t.type)}}class $0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const aa=/(\w+)(\])?(\[|\.)?/g;function Zl(n,e){n.seq.push(e),n.map[e.id]=e}function K0(n,e,t){const i=n.name,r=i.length;for(aa.lastIndex=0;;){const s=aa.exec(i),o=aa.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Zl(t,c===void 0?new Y0(a,n,e):new Z0(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new $0(a),Zl(t,d)),t=d}}}class so{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);K0(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function $l(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const j0=37297;let J0=0;function Q0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Kl=new Ge;function e_(n){et._getMatrix(Kl,et.workingColorSpace,n);const e=`mat3( ${Kl.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case ao:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function jl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Q0(n.getShaderSource(e),a)}else return s}function t_(n,e){const t=e_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function n_(n,e){let t;switch(e){case rf:t="Linear";break;case sf:t="Reinhard";break;case of:t="Cineon";break;case cd:t="ACESFilmic";break;case cf:t="AgX";break;case lf:t="Neutral";break;case af:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ws=new V;function i_(){et.getLuminanceCoefficients(Ws);const n=Ws.x.toFixed(4),e=Ws.y.toFixed(4),t=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xr).join(`
`)}function s_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function o_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Xr(n){return n!==""}function Jl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ql(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const a_=/^[ \t]*#include +<([\w\d./]+)>/gm;function uc(n){return n.replace(a_,l_)}const c_=new Map;function l_(n,e){let t=We[e];if(t===void 0){const i=c_.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return uc(t)}const u_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eu(n){return n.replace(u_,d_)}function d_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function tu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function h_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===od?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Fh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function f_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case vr:case xr:e="ENVMAP_TYPE_CUBE";break;case go:e="ENVMAP_TYPE_CUBE_UV";break}return e}function p_(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===xr&&(e="ENVMAP_MODE_REFRACTION"),e}function m_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ad:e="ENVMAP_BLENDING_MULTIPLY";break;case tf:e="ENVMAP_BLENDING_MIX";break;case nf:e="ENVMAP_BLENDING_ADD";break}return e}function g_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function __(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=h_(t),c=f_(t),u=p_(t),d=m_(t),h=g_(t),m=r_(t),g=s_(s),v=r.createProgram();let p,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xr).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Xr).join(`
`),f.length>0&&(f+=`
`)):(p=[tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xr).join(`
`),f=[tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?We.tonemapping_pars_fragment:"",t.toneMapping!==si?n_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,t_("linearToOutputTexel",t.outputColorSpace),i_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xr).join(`
`)),o=uc(o),o=Jl(o,t),o=Ql(o,t),a=uc(a),a=Jl(a,t),a=Ql(a,t),o=eu(o),a=eu(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=x+p+o,_=x+f+a,b=$l(r,r.VERTEX_SHADER,M),T=$l(r,r.FRAGMENT_SHADER,_);r.attachShader(v,b),r.attachShader(v,T),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(w){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(v)||"",L=r.getShaderInfoLog(b)||"",U=r.getShaderInfoLog(T)||"",F=D.trim(),B=L.trim(),Y=U.trim();let k=!0,se=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,b,T);else{const O=jl(r,b,"vertex"),ie=jl(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+F+`
`+O+`
`+ie)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(B===""||Y==="")&&(se=!1);se&&(w.diagnostics={runnable:k,programLog:F,vertexShader:{log:B,prefix:p},fragmentShader:{log:Y,prefix:f}})}r.deleteShader(b),r.deleteShader(T),R=new so(r,v),E=o_(r,v)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(v,j0)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=J0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=T,this}let v_=0;class x_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new M_(e),t.set(e,i)),i}}class M_{constructor(e){this.id=v_++,this.code=e,this.usedTimes=0}}function S_(n,e,t,i,r,s,o){const a=new Uc,l=new x_,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return c.add(E),E===0?"uv":`uv${E}`}function p(E,y,w,D,L){const U=D.fog,F=L.geometry,B=E.isMeshStandardMaterial?D.environment:null,Y=(E.isMeshStandardMaterial?t:e).get(E.envMap||B),k=Y&&Y.mapping===go?Y.image.height:null,se=g[E.type];E.precision!==null&&(m=r.getMaxPrecision(E.precision),m!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",m,"instead."));const O=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ie=O!==void 0?O.length:0;let oe=0;F.morphAttributes.position!==void 0&&(oe=1),F.morphAttributes.normal!==void 0&&(oe=2),F.morphAttributes.color!==void 0&&(oe=3);let Ce,Se,z,re;if(se){const tt=Mn[se];Ce=tt.vertexShader,Se=tt.fragmentShader}else Ce=E.vertexShader,Se=E.fragmentShader,l.update(E),z=l.getVertexShaderID(E),re=l.getFragmentShaderID(E);const le=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Ae=L.isInstancedMesh===!0,X=L.isBatchedMesh===!0,me=!!E.map,ue=!!E.matcap,I=!!Y,ye=!!E.aoMap,q=!!E.lightMap,te=!!E.bumpMap,ee=!!E.normalMap,ge=!!E.displacementMap,Z=!!E.emissiveMap,he=!!E.metalnessMap,Ke=!!E.roughnessMap,qe=E.anisotropy>0,P=E.clearcoat>0,S=E.dispersion>0,W=E.iridescence>0,j=E.sheen>0,ne=E.transmission>0,J=qe&&!!E.anisotropyMap,we=P&&!!E.clearcoatMap,fe=P&&!!E.clearcoatNormalMap,Pe=P&&!!E.clearcoatRoughnessMap,De=W&&!!E.iridescenceMap,de=W&&!!E.iridescenceThicknessMap,ve=j&&!!E.sheenColorMap,Ne=j&&!!E.sheenRoughnessMap,Ie=!!E.specularMap,xe=!!E.specularColorMap,Be=!!E.specularIntensityMap,N=ne&&!!E.transmissionMap,ae=ne&&!!E.thicknessMap,_e=!!E.gradientMap,Te=!!E.alphaMap,ce=E.alphaTest>0,Q=!!E.alphaHash,Le=!!E.extensions;let ke=si;E.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ke=n.toneMapping);const at={shaderID:se,shaderType:E.type,shaderName:E.name,vertexShader:Ce,fragmentShader:Se,defines:E.defines,customVertexShaderID:z,customFragmentShaderID:re,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:m,batching:X,batchingColor:X&&L._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&L.instanceColor!==null,instancingMorph:Ae&&L.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:le===null?n.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Mr,alphaToCoverage:!!E.alphaToCoverage,map:me,matcap:ue,envMap:I,envMapMode:I&&Y.mapping,envMapCubeUVHeight:k,aoMap:ye,lightMap:q,bumpMap:te,normalMap:ee,displacementMap:h&&ge,emissiveMap:Z,normalMapObjectSpace:ee&&E.normalMapType===ff,normalMapTangentSpace:ee&&E.normalMapType===_d,metalnessMap:he,roughnessMap:Ke,anisotropy:qe,anisotropyMap:J,clearcoat:P,clearcoatMap:we,clearcoatNormalMap:fe,clearcoatRoughnessMap:Pe,dispersion:S,iridescence:W,iridescenceMap:De,iridescenceThicknessMap:de,sheen:j,sheenColorMap:ve,sheenRoughnessMap:Ne,specularMap:Ie,specularColorMap:xe,specularIntensityMap:Be,transmission:ne,transmissionMap:N,thicknessMap:ae,gradientMap:_e,opaque:E.transparent===!1&&E.blending===ur&&E.alphaToCoverage===!1,alphaMap:Te,alphaTest:ce,alphaHash:Q,combine:E.combine,mapUv:me&&v(E.map.channel),aoMapUv:ye&&v(E.aoMap.channel),lightMapUv:q&&v(E.lightMap.channel),bumpMapUv:te&&v(E.bumpMap.channel),normalMapUv:ee&&v(E.normalMap.channel),displacementMapUv:ge&&v(E.displacementMap.channel),emissiveMapUv:Z&&v(E.emissiveMap.channel),metalnessMapUv:he&&v(E.metalnessMap.channel),roughnessMapUv:Ke&&v(E.roughnessMap.channel),anisotropyMapUv:J&&v(E.anisotropyMap.channel),clearcoatMapUv:we&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:fe&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:de&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&v(E.sheenRoughnessMap.channel),specularMapUv:Ie&&v(E.specularMap.channel),specularColorMapUv:xe&&v(E.specularColorMap.channel),specularIntensityMapUv:Be&&v(E.specularIntensityMap.channel),transmissionMapUv:N&&v(E.transmissionMap.channel),thicknessMapUv:ae&&v(E.thicknessMap.channel),alphaMapUv:Te&&v(E.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ee||qe),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!F.attributes.uv&&(me||Te),fog:!!U,useFog:E.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:be,skinning:L.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:oe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&w.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:me&&E.map.isVideoTexture===!0&&et.getTransfer(E.map.colorSpace)===it,decodeVideoTextureEmissive:Z&&E.emissiveMap.isVideoTexture===!0&&et.getTransfer(E.emissiveMap.colorSpace)===it,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===yt,flipSided:E.side===Xt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Le&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&E.extensions.multiDraw===!0||X)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at}function f(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const w in E.defines)y.push(w),y.push(E.defines[w]);return E.isRawShaderMaterial===!1&&(x(y,E),M(y,E),y.push(n.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function x(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function M(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){const y=g[E.type];let w;if(y){const D=Mn[y];w=Vf.clone(D.uniforms)}else w=E.uniforms;return w}function b(E,y){let w;for(let D=0,L=u.length;D<L;D++){const U=u[D];if(U.cacheKey===y){w=U,++w.usedTimes;break}}return w===void 0&&(w=new __(n,y,E,s),u.push(w)),w}function T(E){if(--E.usedTimes===0){const y=u.indexOf(E);u[y]=u[u.length-1],u.pop(),E.destroy()}}function C(E){l.remove(E)}function R(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:_,acquireProgram:b,releaseProgram:T,releaseShaderCache:C,programs:u,dispose:R}}function y_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function E_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function nu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function iu(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,h,m,g,v,p){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:m,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=v,f.group=p),e++,f}function a(d,h,m,g,v,p){const f=o(d,h,m,g,v,p);m.transmission>0?i.push(f):m.transparent===!0?r.push(f):t.push(f)}function l(d,h,m,g,v,p){const f=o(d,h,m,g,v,p);m.transmission>0?i.unshift(f):m.transparent===!0?r.unshift(f):t.unshift(f)}function c(d,h){t.length>1&&t.sort(d||E_),i.length>1&&i.sort(h||nu),r.length>1&&r.sort(h||nu)}function u(){for(let d=e,h=n.length;d<h;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function b_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new iu,n.set(i,[o])):r>=s.length?(o=new iu,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function T_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new Xe};break;case"SpotLight":t={position:new V,direction:new V,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function A_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let w_=0;function R_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function C_(n){const e=new T_,t=A_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const r=new V,s=new ct,o=new ct;function a(c){let u=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,g=0,v=0,p=0,f=0,x=0,M=0,_=0,b=0,T=0,C=0;c.sort(R_);for(let E=0,y=c.length;E<y;E++){const w=c[E],D=w.color,L=w.intensity,U=w.distance,F=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)u+=D.r*L,d+=D.g*L,h+=D.b*L;else if(w.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(w.sh.coefficients[B],L);C++}else if(w.isDirectionalLight){const B=e.get(w);if(B.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const Y=w.shadow,k=t.get(w);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,i.directionalShadow[m]=k,i.directionalShadowMap[m]=F,i.directionalShadowMatrix[m]=w.shadow.matrix,x++}i.directional[m]=B,m++}else if(w.isSpotLight){const B=e.get(w);B.position.setFromMatrixPosition(w.matrixWorld),B.color.copy(D).multiplyScalar(L),B.distance=U,B.coneCos=Math.cos(w.angle),B.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),B.decay=w.decay,i.spot[v]=B;const Y=w.shadow;if(w.map&&(i.spotLightMap[b]=w.map,b++,Y.updateMatrices(w),w.castShadow&&T++),i.spotLightMatrix[v]=Y.matrix,w.castShadow){const k=t.get(w);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,i.spotShadow[v]=k,i.spotShadowMap[v]=F,_++}v++}else if(w.isRectAreaLight){const B=e.get(w);B.color.copy(D).multiplyScalar(L),B.halfWidth.set(w.width*.5,0,0),B.halfHeight.set(0,w.height*.5,0),i.rectArea[p]=B,p++}else if(w.isPointLight){const B=e.get(w);if(B.color.copy(w.color).multiplyScalar(w.intensity),B.distance=w.distance,B.decay=w.decay,w.castShadow){const Y=w.shadow,k=t.get(w);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,k.shadowCameraNear=Y.camera.near,k.shadowCameraFar=Y.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=F,i.pointShadowMatrix[g]=w.shadow.matrix,M++}i.point[g]=B,g++}else if(w.isHemisphereLight){const B=e.get(w);B.skyColor.copy(w.color).multiplyScalar(L),B.groundColor.copy(w.groundColor).multiplyScalar(L),i.hemi[f]=B,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const R=i.hash;(R.directionalLength!==m||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==p||R.hemiLength!==f||R.numDirectionalShadows!==x||R.numPointShadows!==M||R.numSpotShadows!==_||R.numSpotMaps!==b||R.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=_+b-T,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,R.directionalLength=m,R.pointLength=g,R.spotLength=v,R.rectAreaLength=p,R.hemiLength=f,R.numDirectionalShadows=x,R.numPointShadows=M,R.numSpotShadows=_,R.numSpotMaps=b,R.numLightProbes=C,i.version=w_++)}function l(c,u){let d=0,h=0,m=0,g=0,v=0;const p=u.matrixWorldInverse;for(let f=0,x=c.length;f<x;f++){const M=c[f];if(M.isDirectionalLight){const _=i.directional[d];_.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),d++}else if(M.isSpotLight){const _=i.spot[m];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(p),m++}else if(M.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),o.identity(),s.copy(M.matrixWorld),s.premultiply(p),o.extractRotation(s),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const _=i.point[h];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),h++}else if(M.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(p),v++}}}return{setup:a,setupView:l,state:i}}function ru(n){const e=new C_(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function P_(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ru(n),e.set(r,[a])):s>=o.length?(a=new ru(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,L_=`uniform sampler2D shadow_pass;
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
}`;function D_(n,e,t){let i=new Fc;const r=new Ze,s=new Ze,o=new _t,a=new tp({depthPacking:hf}),l=new np,c={},u=t.maxTextureSize,d={[oi]:Xt,[Xt]:oi,[yt]:yt},h=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:I_,fragmentShader:L_}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new pt;g.setAttribute("position",new ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ve(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=od;let f=this.type;this.render=function(T,C,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const E=n.getRenderTarget(),y=n.getActiveCubeFace(),w=n.getActiveMipmapLevel(),D=n.state;D.setBlending(ri),D.buffers.depth.getReversed()?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const L=f!==On&&this.type===On,U=f===On&&this.type!==On;for(let F=0,B=T.length;F<B;F++){const Y=T[F],k=Y.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const se=k.getFrameExtents();if(r.multiply(se),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/se.x),r.x=s.x*se.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/se.y),r.y=s.y*se.y,k.mapSize.y=s.y)),k.map===null||L===!0||U===!0){const ie=this.type!==On?{minFilter:Qt,magFilter:Qt}:{};k.map!==null&&k.map.dispose(),k.map=new Ii(r.x,r.y,ie),k.map.texture.name=Y.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const O=k.getViewportCount();for(let ie=0;ie<O;ie++){const oe=k.getViewport(ie);o.set(s.x*oe.x,s.y*oe.y,s.x*oe.z,s.y*oe.w),D.viewport(o),k.updateMatrices(Y,ie),i=k.getFrustum(),_(C,R,k.camera,Y,this.type)}k.isPointLightShadow!==!0&&this.type===On&&x(k,R),k.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(E,y,w)};function x(T,C){const R=e.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ii(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(C,null,R,h,v,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(C,null,R,m,v,null)}function M(T,C,R,E){let y=null;const w=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(w!==void 0)y=w;else if(y=R.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=y.uuid,L=C.uuid;let U=c[D];U===void 0&&(U={},c[D]=U);let F=U[L];F===void 0&&(F=y.clone(),U[L]=F,C.addEventListener("dispose",b)),y=F}if(y.visible=C.visible,y.wireframe=C.wireframe,E===On?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:d[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=n.properties.get(y);D.light=R}return y}function _(T,C,R,E,y){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===On)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const L=e.update(T),U=T.material;if(Array.isArray(U)){const F=L.groups;for(let B=0,Y=F.length;B<Y;B++){const k=F[B],se=U[k.materialIndex];if(se&&se.visible){const O=M(T,se,E,y);T.onBeforeShadow(n,T,C,R,L,O,k),n.renderBufferDirect(R,null,L,O,T,k),T.onAfterShadow(n,T,C,R,L,O,k)}}}else if(U.visible){const F=M(T,U,E,y);T.onBeforeShadow(n,T,C,R,L,F,null),n.renderBufferDirect(R,null,L,F,T,null),T.onAfterShadow(n,T,C,R,L,F,null)}}const D=T.children;for(let L=0,U=D.length;L<U;L++)_(D[L],C,R,E,y)}function b(T){T.target.removeEventListener("dispose",b);for(const R in c){const E=c[R],y=T.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const U_={[ba]:Ta,[Aa]:Ca,[wa]:Pa,[_r]:Ra,[Ta]:ba,[Ca]:Aa,[Pa]:wa,[Ra]:_r};function N_(n,e){function t(){let N=!1;const ae=new _t;let _e=null;const Te=new _t(0,0,0,0);return{setMask:function(ce){_e!==ce&&!N&&(n.colorMask(ce,ce,ce,ce),_e=ce)},setLocked:function(ce){N=ce},setClear:function(ce,Q,Le,ke,at){at===!0&&(ce*=ke,Q*=ke,Le*=ke),ae.set(ce,Q,Le,ke),Te.equals(ae)===!1&&(n.clearColor(ce,Q,Le,ke),Te.copy(ae))},reset:function(){N=!1,_e=null,Te.set(-1,0,0,0)}}}function i(){let N=!1,ae=!1,_e=null,Te=null,ce=null;return{setReversed:function(Q){if(ae!==Q){const Le=e.get("EXT_clip_control");Q?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ae=Q;const ke=ce;ce=null,this.setClear(ke)}},getReversed:function(){return ae},setTest:function(Q){Q?le(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(Q){_e!==Q&&!N&&(n.depthMask(Q),_e=Q)},setFunc:function(Q){if(ae&&(Q=U_[Q]),Te!==Q){switch(Q){case ba:n.depthFunc(n.NEVER);break;case Ta:n.depthFunc(n.ALWAYS);break;case Aa:n.depthFunc(n.LESS);break;case _r:n.depthFunc(n.LEQUAL);break;case wa:n.depthFunc(n.EQUAL);break;case Ra:n.depthFunc(n.GEQUAL);break;case Ca:n.depthFunc(n.GREATER);break;case Pa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Te=Q}},setLocked:function(Q){N=Q},setClear:function(Q){ce!==Q&&(ae&&(Q=1-Q),n.clearDepth(Q),ce=Q)},reset:function(){N=!1,_e=null,Te=null,ce=null,ae=!1}}}function r(){let N=!1,ae=null,_e=null,Te=null,ce=null,Q=null,Le=null,ke=null,at=null;return{setTest:function(tt){N||(tt?le(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(tt){ae!==tt&&!N&&(n.stencilMask(tt),ae=tt)},setFunc:function(tt,Cn,mn){(_e!==tt||Te!==Cn||ce!==mn)&&(n.stencilFunc(tt,Cn,mn),_e=tt,Te=Cn,ce=mn)},setOp:function(tt,Cn,mn){(Q!==tt||Le!==Cn||ke!==mn)&&(n.stencilOp(tt,Cn,mn),Q=tt,Le=Cn,ke=mn)},setLocked:function(tt){N=tt},setClear:function(tt){at!==tt&&(n.clearStencil(tt),at=tt)},reset:function(){N=!1,ae=null,_e=null,Te=null,ce=null,Q=null,Le=null,ke=null,at=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,m=[],g=null,v=!1,p=null,f=null,x=null,M=null,_=null,b=null,T=null,C=new Xe(0,0,0),R=0,E=!1,y=null,w=null,D=null,L=null,U=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Y=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(k)[1]),B=Y>=1):k.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),B=Y>=2);let se=null,O={};const ie=n.getParameter(n.SCISSOR_BOX),oe=n.getParameter(n.VIEWPORT),Ce=new _t().fromArray(ie),Se=new _t().fromArray(oe);function z(N,ae,_e,Te){const ce=new Uint8Array(4),Q=n.createTexture();n.bindTexture(N,Q),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<_e;Le++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(ae,0,n.RGBA,1,1,Te,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(ae+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return Q}const re={};re[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(n.DEPTH_TEST),o.setFunc(_r),te(!1),ee(tl),le(n.CULL_FACE),ye(ri);function le(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function be(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Ae(N,ae){return d[N]!==ae?(n.bindFramebuffer(N,ae),d[N]=ae,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ae),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ae),!0):!1}function X(N,ae){let _e=m,Te=!1;if(N){_e=h.get(ae),_e===void 0&&(_e=[],h.set(ae,_e));const ce=N.textures;if(_e.length!==ce.length||_e[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,Le=ce.length;Q<Le;Q++)_e[Q]=n.COLOR_ATTACHMENT0+Q;_e.length=ce.length,Te=!0}}else _e[0]!==n.BACK&&(_e[0]=n.BACK,Te=!0);Te&&n.drawBuffers(_e)}function me(N){return g!==N?(n.useProgram(N),g=N,!0):!1}const ue={[Si]:n.FUNC_ADD,[Bh]:n.FUNC_SUBTRACT,[zh]:n.FUNC_REVERSE_SUBTRACT};ue[kh]=n.MIN,ue[Hh]=n.MAX;const I={[Vh]:n.ZERO,[Gh]:n.ONE,[Wh]:n.SRC_COLOR,[ya]:n.SRC_ALPHA,[Kh]:n.SRC_ALPHA_SATURATE,[Zh]:n.DST_COLOR,[qh]:n.DST_ALPHA,[Xh]:n.ONE_MINUS_SRC_COLOR,[Ea]:n.ONE_MINUS_SRC_ALPHA,[$h]:n.ONE_MINUS_DST_COLOR,[Yh]:n.ONE_MINUS_DST_ALPHA,[jh]:n.CONSTANT_COLOR,[Jh]:n.ONE_MINUS_CONSTANT_COLOR,[Qh]:n.CONSTANT_ALPHA,[ef]:n.ONE_MINUS_CONSTANT_ALPHA};function ye(N,ae,_e,Te,ce,Q,Le,ke,at,tt){if(N===ri){v===!0&&(be(n.BLEND),v=!1);return}if(v===!1&&(le(n.BLEND),v=!0),N!==Oh){if(N!==p||tt!==E){if((f!==Si||_!==Si)&&(n.blendEquation(n.FUNC_ADD),f=Si,_=Si),tt)switch(N){case ur:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nl:n.blendFunc(n.ONE,n.ONE);break;case il:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case il:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}x=null,M=null,b=null,T=null,C.set(0,0,0),R=0,p=N,E=tt}return}ce=ce||ae,Q=Q||_e,Le=Le||Te,(ae!==f||ce!==_)&&(n.blendEquationSeparate(ue[ae],ue[ce]),f=ae,_=ce),(_e!==x||Te!==M||Q!==b||Le!==T)&&(n.blendFuncSeparate(I[_e],I[Te],I[Q],I[Le]),x=_e,M=Te,b=Q,T=Le),(ke.equals(C)===!1||at!==R)&&(n.blendColor(ke.r,ke.g,ke.b,at),C.copy(ke),R=at),p=N,E=!1}function q(N,ae){N.side===yt?be(n.CULL_FACE):le(n.CULL_FACE);let _e=N.side===Xt;ae&&(_e=!_e),te(_e),N.blending===ur&&N.transparent===!1?ye(ri):ye(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Te=N.stencilWrite;a.setTest(Te),Te&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Z(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?le(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(N){y!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),y=N)}function ee(N){N!==Uh?(le(n.CULL_FACE),N!==w&&(N===tl?n.cullFace(n.BACK):N===Nh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),w=N}function ge(N){N!==D&&(B&&n.lineWidth(N),D=N)}function Z(N,ae,_e){N?(le(n.POLYGON_OFFSET_FILL),(L!==ae||U!==_e)&&(n.polygonOffset(ae,_e),L=ae,U=_e)):be(n.POLYGON_OFFSET_FILL)}function he(N){N?le(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function Ke(N){N===void 0&&(N=n.TEXTURE0+F-1),se!==N&&(n.activeTexture(N),se=N)}function qe(N,ae,_e){_e===void 0&&(se===null?_e=n.TEXTURE0+F-1:_e=se);let Te=O[_e];Te===void 0&&(Te={type:void 0,texture:void 0},O[_e]=Te),(Te.type!==N||Te.texture!==ae)&&(se!==_e&&(n.activeTexture(_e),se=_e),n.bindTexture(N,ae||re[N]),Te.type=N,Te.texture=ae)}function P(){const N=O[se];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(N){Ce.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Ce.copy(N))}function Ne(N){Se.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Se.copy(N))}function Ie(N,ae){let _e=c.get(ae);_e===void 0&&(_e=new WeakMap,c.set(ae,_e));let Te=_e.get(N);Te===void 0&&(Te=n.getUniformBlockIndex(ae,N.name),_e.set(N,Te))}function xe(N,ae){const Te=c.get(ae).get(N);l.get(ae)!==Te&&(n.uniformBlockBinding(ae,Te,N.__bindingPointIndex),l.set(ae,Te))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},se=null,O={},d={},h=new WeakMap,m=[],g=null,v=!1,p=null,f=null,x=null,M=null,_=null,b=null,T=null,C=new Xe(0,0,0),R=0,E=!1,y=null,w=null,D=null,L=null,U=null,Ce.set(0,0,n.canvas.width,n.canvas.height),Se.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:le,disable:be,bindFramebuffer:Ae,drawBuffers:X,useProgram:me,setBlending:ye,setMaterial:q,setFlipSided:te,setCullFace:ee,setLineWidth:ge,setPolygonOffset:Z,setScissorTest:he,activeTexture:Ke,bindTexture:qe,unbindTexture:P,compressedTexImage2D:S,compressedTexImage3D:W,texImage2D:De,texImage3D:de,updateUBOMapping:Ie,uniformBlockBinding:xe,texStorage2D:fe,texStorage3D:Pe,texSubImage2D:j,texSubImage3D:ne,compressedTexSubImage2D:J,compressedTexSubImage3D:we,scissor:ve,viewport:Ne,reset:Be}}function F_(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ze,u=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return m?new OffscreenCanvas(P,S):lo("canvas")}function v(P,S,W){let j=1;const ne=qe(P);if((ne.width>W||ne.height>W)&&(j=W/Math.max(ne.width,ne.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const J=Math.floor(j*ne.width),we=Math.floor(j*ne.height);d===void 0&&(d=g(J,we));const fe=S?g(J,we):d;return fe.width=J,fe.height=we,fe.getContext("2d").drawImage(P,0,0,J,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+J+"x"+we+")."),fe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),P;return P}function p(P){return P.generateMipmaps}function f(P){n.generateMipmap(P)}function x(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(P,S,W,j,ne=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let J=S;if(S===n.RED&&(W===n.FLOAT&&(J=n.R32F),W===n.HALF_FLOAT&&(J=n.R16F),W===n.UNSIGNED_BYTE&&(J=n.R8)),S===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.R8UI),W===n.UNSIGNED_SHORT&&(J=n.R16UI),W===n.UNSIGNED_INT&&(J=n.R32UI),W===n.BYTE&&(J=n.R8I),W===n.SHORT&&(J=n.R16I),W===n.INT&&(J=n.R32I)),S===n.RG&&(W===n.FLOAT&&(J=n.RG32F),W===n.HALF_FLOAT&&(J=n.RG16F),W===n.UNSIGNED_BYTE&&(J=n.RG8)),S===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RG8UI),W===n.UNSIGNED_SHORT&&(J=n.RG16UI),W===n.UNSIGNED_INT&&(J=n.RG32UI),W===n.BYTE&&(J=n.RG8I),W===n.SHORT&&(J=n.RG16I),W===n.INT&&(J=n.RG32I)),S===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGB8UI),W===n.UNSIGNED_SHORT&&(J=n.RGB16UI),W===n.UNSIGNED_INT&&(J=n.RGB32UI),W===n.BYTE&&(J=n.RGB8I),W===n.SHORT&&(J=n.RGB16I),W===n.INT&&(J=n.RGB32I)),S===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),W===n.UNSIGNED_INT&&(J=n.RGBA32UI),W===n.BYTE&&(J=n.RGBA8I),W===n.SHORT&&(J=n.RGBA16I),W===n.INT&&(J=n.RGBA32I)),S===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),S===n.RGBA){const we=ne?ao:et.getTransfer(j);W===n.FLOAT&&(J=n.RGBA32F),W===n.HALF_FLOAT&&(J=n.RGBA16F),W===n.UNSIGNED_BYTE&&(J=we===it?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function _(P,S){let W;return P?S===null||S===Pi||S===cs?W=n.DEPTH24_STENCIL8:S===En?W=n.DEPTH32F_STENCIL8:S===as&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Pi||S===cs?W=n.DEPTH_COMPONENT24:S===En?W=n.DEPTH_COMPONENT32F:S===as&&(W=n.DEPTH_COMPONENT16),W}function b(P,S){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Qt&&P.minFilter!==yn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function T(P){const S=P.target;S.removeEventListener("dispose",T),R(S),S.isVideoTexture&&u.delete(S)}function C(P){const S=P.target;S.removeEventListener("dispose",C),y(S)}function R(P){const S=i.get(P);if(S.__webglInit===void 0)return;const W=P.source,j=h.get(W);if(j){const ne=j[S.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&E(P),Object.keys(j).length===0&&h.delete(W)}i.remove(P)}function E(P){const S=i.get(P);n.deleteTexture(S.__webglTexture);const W=P.source,j=h.get(W);delete j[S.__cacheKey],o.memory.textures--}function y(P){const S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let ne=0;ne<S.__webglFramebuffer[j].length;ne++)n.deleteFramebuffer(S.__webglFramebuffer[j][ne]);else n.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)n.deleteFramebuffer(S.__webglFramebuffer[j]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=P.textures;for(let j=0,ne=W.length;j<ne;j++){const J=i.get(W[j]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),o.memory.textures--),i.remove(W[j])}i.remove(P)}let w=0;function D(){w=0}function L(){const P=w;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),w+=1,P}function U(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function F(P,S){const W=i.get(P);if(P.isVideoTexture&&he(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&W.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(W,P,S);return}}else P.isExternalTexture&&(W.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+S)}function B(P,S){const W=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){re(W,P,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+S)}function Y(P,S){const W=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){re(W,P,S);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+S)}function k(P,S){const W=i.get(P);if(P.version>0&&W.__version!==P.version){le(W,P,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+S)}const se={[Da]:n.REPEAT,[bi]:n.CLAMP_TO_EDGE,[Ua]:n.MIRRORED_REPEAT},O={[Qt]:n.NEAREST,[uf]:n.NEAREST_MIPMAP_NEAREST,[Ss]:n.NEAREST_MIPMAP_LINEAR,[yn]:n.LINEAR,[Co]:n.LINEAR_MIPMAP_NEAREST,[Ti]:n.LINEAR_MIPMAP_LINEAR},ie={[pf]:n.NEVER,[Mf]:n.ALWAYS,[mf]:n.LESS,[vd]:n.LEQUAL,[gf]:n.EQUAL,[xf]:n.GEQUAL,[_f]:n.GREATER,[vf]:n.NOTEQUAL};function oe(P,S){if(S.type===En&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===yn||S.magFilter===Co||S.magFilter===Ss||S.magFilter===Ti||S.minFilter===yn||S.minFilter===Co||S.minFilter===Ss||S.minFilter===Ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,se[S.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,se[S.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,se[S.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,O[S.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,O[S.minFilter]),S.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,ie[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Qt||S.minFilter!==Ss&&S.minFilter!==Ti||S.type===En&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Ce(P,S){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",T));const j=S.source;let ne=h.get(j);ne===void 0&&(ne={},h.set(j,ne));const J=U(S);if(J!==P.__cacheKey){ne[J]===void 0&&(ne[J]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ne[J].usedTimes++;const we=ne[P.__cacheKey];we!==void 0&&(ne[P.__cacheKey].usedTimes--,we.usedTimes===0&&E(S)),P.__cacheKey=J,P.__webglTexture=ne[J].texture}return W}function Se(P,S,W){return Math.floor(Math.floor(P/W)/S)}function z(P,S,W,j){const J=P.updateRanges;if(J.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,W,j,S.data);else{J.sort((de,ve)=>de.start-ve.start);let we=0;for(let de=1;de<J.length;de++){const ve=J[we],Ne=J[de],Ie=ve.start+ve.count,xe=Se(Ne.start,S.width,4),Be=Se(ve.start,S.width,4);Ne.start<=Ie+1&&xe===Be&&Se(Ne.start+Ne.count-1,S.width,4)===xe?ve.count=Math.max(ve.count,Ne.start+Ne.count-ve.start):(++we,J[we]=Ne)}J.length=we+1;const fe=n.getParameter(n.UNPACK_ROW_LENGTH),Pe=n.getParameter(n.UNPACK_SKIP_PIXELS),De=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let de=0,ve=J.length;de<ve;de++){const Ne=J[de],Ie=Math.floor(Ne.start/4),xe=Math.ceil(Ne.count/4),Be=Ie%S.width,N=Math.floor(Ie/S.width),ae=xe,_e=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Be,N,ae,_e,W,j,S.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,fe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Pe),n.pixelStorei(n.UNPACK_SKIP_ROWS,De)}}function re(P,S,W){let j=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=n.TEXTURE_3D);const ne=Ce(P,S),J=S.source;t.bindTexture(j,P.__webglTexture,n.TEXTURE0+W);const we=i.get(J);if(J.version!==we.__version||ne===!0){t.activeTexture(n.TEXTURE0+W);const fe=et.getPrimaries(et.workingColorSpace),Pe=S.colorSpace===ei?null:et.getPrimaries(S.colorSpace),De=S.colorSpace===ei||fe===Pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let de=v(S.image,!1,r.maxTextureSize);de=Ke(S,de);const ve=s.convert(S.format,S.colorSpace),Ne=s.convert(S.type);let Ie=M(S.internalFormat,ve,Ne,S.colorSpace,S.isVideoTexture);oe(j,S);let xe;const Be=S.mipmaps,N=S.isVideoTexture!==!0,ae=we.__version===void 0||ne===!0,_e=J.dataReady,Te=b(S,de);if(S.isDepthTexture)Ie=_(S.format===us,S.type),ae&&(N?t.texStorage2D(n.TEXTURE_2D,1,Ie,de.width,de.height):t.texImage2D(n.TEXTURE_2D,0,Ie,de.width,de.height,0,ve,Ne,null));else if(S.isDataTexture)if(Be.length>0){N&&ae&&t.texStorage2D(n.TEXTURE_2D,Te,Ie,Be[0].width,Be[0].height);for(let ce=0,Q=Be.length;ce<Q;ce++)xe=Be[ce],N?_e&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,xe.width,xe.height,ve,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,ce,Ie,xe.width,xe.height,0,ve,Ne,xe.data);S.generateMipmaps=!1}else N?(ae&&t.texStorage2D(n.TEXTURE_2D,Te,Ie,de.width,de.height),_e&&z(S,de,ve,Ne)):t.texImage2D(n.TEXTURE_2D,0,Ie,de.width,de.height,0,ve,Ne,de.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){N&&ae&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,Ie,Be[0].width,Be[0].height,de.depth);for(let ce=0,Q=Be.length;ce<Q;ce++)if(xe=Be[ce],S.format!==fn)if(ve!==null)if(N){if(_e)if(S.layerUpdates.size>0){const Le=Ul(xe.width,xe.height,S.format,S.type);for(const ke of S.layerUpdates){const at=xe.data.subarray(ke*Le/xe.data.BYTES_PER_ELEMENT,(ke+1)*Le/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,ke,xe.width,xe.height,1,ve,at)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,xe.width,xe.height,de.depth,ve,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ce,Ie,xe.width,xe.height,de.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?_e&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,xe.width,xe.height,de.depth,ve,Ne,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ce,Ie,xe.width,xe.height,de.depth,0,ve,Ne,xe.data)}else{N&&ae&&t.texStorage2D(n.TEXTURE_2D,Te,Ie,Be[0].width,Be[0].height);for(let ce=0,Q=Be.length;ce<Q;ce++)xe=Be[ce],S.format!==fn?ve!==null?N?_e&&t.compressedTexSubImage2D(n.TEXTURE_2D,ce,0,0,xe.width,xe.height,ve,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,ce,Ie,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?_e&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,xe.width,xe.height,ve,Ne,xe.data):t.texImage2D(n.TEXTURE_2D,ce,Ie,xe.width,xe.height,0,ve,Ne,xe.data)}else if(S.isDataArrayTexture)if(N){if(ae&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,Ie,de.width,de.height,de.depth),_e)if(S.layerUpdates.size>0){const ce=Ul(de.width,de.height,S.format,S.type);for(const Q of S.layerUpdates){const Le=de.data.subarray(Q*ce/de.data.BYTES_PER_ELEMENT,(Q+1)*ce/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,de.width,de.height,1,ve,Ne,Le)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,ve,Ne,de.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ie,de.width,de.height,de.depth,0,ve,Ne,de.data);else if(S.isData3DTexture)N?(ae&&t.texStorage3D(n.TEXTURE_3D,Te,Ie,de.width,de.height,de.depth),_e&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,ve,Ne,de.data)):t.texImage3D(n.TEXTURE_3D,0,Ie,de.width,de.height,de.depth,0,ve,Ne,de.data);else if(S.isFramebufferTexture){if(ae)if(N)t.texStorage2D(n.TEXTURE_2D,Te,Ie,de.width,de.height);else{let ce=de.width,Q=de.height;for(let Le=0;Le<Te;Le++)t.texImage2D(n.TEXTURE_2D,Le,Ie,ce,Q,0,ve,Ne,null),ce>>=1,Q>>=1}}else if(Be.length>0){if(N&&ae){const ce=qe(Be[0]);t.texStorage2D(n.TEXTURE_2D,Te,Ie,ce.width,ce.height)}for(let ce=0,Q=Be.length;ce<Q;ce++)xe=Be[ce],N?_e&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,ve,Ne,xe):t.texImage2D(n.TEXTURE_2D,ce,Ie,ve,Ne,xe);S.generateMipmaps=!1}else if(N){if(ae){const ce=qe(de);t.texStorage2D(n.TEXTURE_2D,Te,Ie,ce.width,ce.height)}_e&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,Ne,de)}else t.texImage2D(n.TEXTURE_2D,0,Ie,ve,Ne,de);p(S)&&f(j),we.__version=J.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function le(P,S,W){if(S.image.length!==6)return;const j=Ce(P,S),ne=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+W);const J=i.get(ne);if(ne.version!==J.__version||j===!0){t.activeTexture(n.TEXTURE0+W);const we=et.getPrimaries(et.workingColorSpace),fe=S.colorSpace===ei?null:et.getPrimaries(S.colorSpace),Pe=S.colorSpace===ei||we===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const De=S.isCompressedTexture||S.image[0].isCompressedTexture,de=S.image[0]&&S.image[0].isDataTexture,ve=[];for(let Q=0;Q<6;Q++)!De&&!de?ve[Q]=v(S.image[Q],!0,r.maxCubemapSize):ve[Q]=de?S.image[Q].image:S.image[Q],ve[Q]=Ke(S,ve[Q]);const Ne=ve[0],Ie=s.convert(S.format,S.colorSpace),xe=s.convert(S.type),Be=M(S.internalFormat,Ie,xe,S.colorSpace),N=S.isVideoTexture!==!0,ae=J.__version===void 0||j===!0,_e=ne.dataReady;let Te=b(S,Ne);oe(n.TEXTURE_CUBE_MAP,S);let ce;if(De){N&&ae&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,Be,Ne.width,Ne.height);for(let Q=0;Q<6;Q++){ce=ve[Q].mipmaps;for(let Le=0;Le<ce.length;Le++){const ke=ce[Le];S.format!==fn?Ie!==null?N?_e&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,0,0,ke.width,ke.height,Ie,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,Be,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,0,0,ke.width,ke.height,Ie,xe,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,Be,ke.width,ke.height,0,Ie,xe,ke.data)}}}else{if(ce=S.mipmaps,N&&ae){ce.length>0&&Te++;const Q=qe(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,Be,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(de){N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ve[Q].width,ve[Q].height,Ie,xe,ve[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Be,ve[Q].width,ve[Q].height,0,Ie,xe,ve[Q].data);for(let Le=0;Le<ce.length;Le++){const at=ce[Le].image[Q].image;N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,0,0,at.width,at.height,Ie,xe,at.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,Be,at.width,at.height,0,Ie,xe,at.data)}}else{N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ie,xe,ve[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Be,Ie,xe,ve[Q]);for(let Le=0;Le<ce.length;Le++){const ke=ce[Le];N?_e&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,0,0,Ie,xe,ke.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,Be,Ie,xe,ke.image[Q])}}}p(S)&&f(n.TEXTURE_CUBE_MAP),J.__version=ne.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function be(P,S,W,j,ne,J){const we=s.convert(W.format,W.colorSpace),fe=s.convert(W.type),Pe=M(W.internalFormat,we,fe,W.colorSpace),De=i.get(S),de=i.get(W);if(de.__renderTarget=S,!De.__hasExternalTextures){const ve=Math.max(1,S.width>>J),Ne=Math.max(1,S.height>>J);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,J,Pe,ve,Ne,S.depth,0,we,fe,null):t.texImage2D(ne,J,Pe,ve,Ne,0,we,fe,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Z(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,ne,de.__webglTexture,0,ge(S)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,ne,de.__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(P,S,W){if(n.bindRenderbuffer(n.RENDERBUFFER,P),S.depthBuffer){const j=S.depthTexture,ne=j&&j.isDepthTexture?j.type:null,J=_(S.stencilBuffer,ne),we=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=ge(S);Z(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,fe,J,S.width,S.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,J,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,J,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,P)}else{const j=S.textures;for(let ne=0;ne<j.length;ne++){const J=j[ne],we=s.convert(J.format,J.colorSpace),fe=s.convert(J.type),Pe=M(J.internalFormat,we,fe,J.colorSpace),De=ge(S);W&&Z(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Pe,S.width,S.height):Z(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,De,Pe,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Pe,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function X(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),F(S.depthTexture,0);const ne=j.__webglTexture,J=ge(S);if(S.depthTexture.format===ls)Z(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(S.depthTexture.format===us)Z(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function me(P){const S=i.get(P),W=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const ne=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",ne)};j.addEventListener("dispose",ne),S.__depthDisposeCallback=ne}S.__boundDepthTexture=j}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const j=P.texture.mipmaps;j&&j.length>0?X(S.__webglFramebuffer[0],P):X(S.__webglFramebuffer,P)}else if(W){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=n.createRenderbuffer(),Ae(S.__webglDepthbuffer[j],P,!1);else{const ne=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,J)}}else{const j=P.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),Ae(S.__webglDepthbuffer,P,!1);else{const ne=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,J)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(P,S,W){const j=i.get(P);S!==void 0&&be(j.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&me(P)}function I(P){const S=P.texture,W=i.get(P),j=i.get(S);P.addEventListener("dispose",C);const ne=P.textures,J=P.isWebGLCubeRenderTarget===!0,we=ne.length>1;if(we||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=S.version,o.memory.textures++),J){W.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[fe]=[];for(let Pe=0;Pe<S.mipmaps.length;Pe++)W.__webglFramebuffer[fe][Pe]=n.createFramebuffer()}else W.__webglFramebuffer[fe]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let fe=0;fe<S.mipmaps.length;fe++)W.__webglFramebuffer[fe]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(we)for(let fe=0,Pe=ne.length;fe<Pe;fe++){const De=i.get(ne[fe]);De.__webglTexture===void 0&&(De.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&Z(P)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let fe=0;fe<ne.length;fe++){const Pe=ne[fe];W.__webglColorRenderbuffer[fe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[fe]);const De=s.convert(Pe.format,Pe.colorSpace),de=s.convert(Pe.type),ve=M(Pe.internalFormat,De,de,Pe.colorSpace,P.isXRRenderTarget===!0),Ne=ge(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,ve,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,W.__webglColorRenderbuffer[fe])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(W.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),oe(n.TEXTURE_CUBE_MAP,S);for(let fe=0;fe<6;fe++)if(S.mipmaps&&S.mipmaps.length>0)for(let Pe=0;Pe<S.mipmaps.length;Pe++)be(W.__webglFramebuffer[fe][Pe],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Pe);else be(W.__webglFramebuffer[fe],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);p(S)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let fe=0,Pe=ne.length;fe<Pe;fe++){const De=ne[fe],de=i.get(De);let ve=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ve=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,de.__webglTexture),oe(ve,De),be(W.__webglFramebuffer,P,De,n.COLOR_ATTACHMENT0+fe,ve,0),p(De)&&f(ve)}t.unbindTexture()}else{let fe=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(fe=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,j.__webglTexture),oe(fe,S),S.mipmaps&&S.mipmaps.length>0)for(let Pe=0;Pe<S.mipmaps.length;Pe++)be(W.__webglFramebuffer[Pe],P,S,n.COLOR_ATTACHMENT0,fe,Pe);else be(W.__webglFramebuffer,P,S,n.COLOR_ATTACHMENT0,fe,0);p(S)&&f(fe),t.unbindTexture()}P.depthBuffer&&me(P)}function ye(P){const S=P.textures;for(let W=0,j=S.length;W<j;W++){const ne=S[W];if(p(ne)){const J=x(P),we=i.get(ne).__webglTexture;t.bindTexture(J,we),f(J),t.unbindTexture()}}}const q=[],te=[];function ee(P){if(P.samples>0){if(Z(P)===!1){const S=P.textures,W=P.width,j=P.height;let ne=n.COLOR_BUFFER_BIT;const J=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=i.get(P),fe=S.length>1;if(fe)for(let De=0;De<S.length;De++)t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const Pe=P.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let De=0;De<S.length;De++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),fe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,we.__webglColorRenderbuffer[De]);const de=i.get(S[De]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,de,0)}n.blitFramebuffer(0,0,W,j,0,0,W,j,ne,n.NEAREST),l===!0&&(q.length=0,te.length=0,q.push(n.COLOR_ATTACHMENT0+De),P.depthBuffer&&P.resolveDepthBuffer===!1&&(q.push(J),te.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,te)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,q))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),fe)for(let De=0;De<S.length;De++){t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,we.__webglColorRenderbuffer[De]);const de=i.get(S[De]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,de,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const S=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function ge(P){return Math.min(r.maxSamples,P.samples)}function Z(P){const S=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function he(P){const S=o.render.frame;u.get(P)!==S&&(u.set(P,S),P.update())}function Ke(P,S){const W=P.colorSpace,j=P.format,ne=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==Mr&&W!==ei&&(et.getTransfer(W)===it?(j!==fn||ne!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}function qe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=D,this.setTexture2D=F,this.setTexture2DArray=B,this.setTexture3D=Y,this.setTextureCube=k,this.rebindTextures=ue,this.setupRenderTarget=I,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=ee,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Z}function O_(n,e){function t(i,r=ei){let s;const o=et.getTransfer(r);if(i===An)return n.UNSIGNED_BYTE;if(i===Ac)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===hd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ud)return n.BYTE;if(i===dd)return n.SHORT;if(i===as)return n.UNSIGNED_SHORT;if(i===Tc)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===hs)return n.HALF_FLOAT;if(i===fd)return n.ALPHA;if(i===pd)return n.RGB;if(i===fn)return n.RGBA;if(i===ls)return n.DEPTH_COMPONENT;if(i===us)return n.DEPTH_STENCIL;if(i===Rc)return n.RED;if(i===Cc)return n.RED_INTEGER;if(i===md)return n.RG;if(i===Pc)return n.RG_INTEGER;if(i===Ic)return n.RGBA_INTEGER;if(i===eo||i===to||i===no||i===io)if(o===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===eo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===to)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===no)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===eo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===to)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===no)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===io)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Na||i===Fa||i===Oa||i===Ba)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Na)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Oa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ba)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===za||i===ka||i===Ha)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===za||i===ka)return o===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ha)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Va||i===Ga||i===Wa||i===Xa||i===qa||i===Ya||i===Za||i===$a||i===Ka||i===ja||i===Ja||i===Qa||i===ec||i===tc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Va)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ga)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Wa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Xa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===qa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ya)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Za)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$a)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ka)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ja)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ja)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Qa)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ec)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===tc)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ro||i===nc||i===ic)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ro)return o===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===nc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ic)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===gd||i===rc||i===sc||i===oc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ro)return s.COMPRESSED_RED_RGTC1_EXT;if(i===rc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===sc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===oc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Fd extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const B_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z_=`
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

}`;class k_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Rn({vertexShader:B_,fragmentShader:z_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ve(new xo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class H_ extends Tr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,m=null,g=null;const v=new k_,p={},f=t.getContextAttributes();let x=null,M=null;const _=[],b=[],T=new Ze;let C=null;const R=new un;R.viewport=new _t;const E=new un;E.viewport=new _t;const y=[R,E],w=new ap;let D=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let re=_[z];return re===void 0&&(re=new Jo,_[z]=re),re.getTargetRaySpace()},this.getControllerGrip=function(z){let re=_[z];return re===void 0&&(re=new Jo,_[z]=re),re.getGripSpace()},this.getHand=function(z){let re=_[z];return re===void 0&&(re=new Jo,_[z]=re),re.getHandSpace()};function U(z){const re=b.indexOf(z.inputSource);if(re===-1)return;const le=_[re];le!==void 0&&(le.update(z.inputSource,z.frame,c||o),le.dispatchEvent({type:z.type,data:z.inputSource}))}function F(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",F),r.removeEventListener("inputsourceschange",B);for(let z=0;z<_.length;z++){const re=b[z];re!==null&&(b[z]=null,_[z].disconnect(re))}D=null,L=null,v.reset();for(const z in p)delete p[z];e.setRenderTarget(x),m=null,h=null,d=null,r=null,M=null,Se.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(x=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",F),r.addEventListener("inputsourceschange",B),f.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(T),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(r,t)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,be=null,Ae=null;f.depth&&(Ae=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=f.stencil?us:ls,be=f.stencil?cs:Pi);const X={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};h=d.createProjectionLayer(X),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new Ii(h.textureWidth,h.textureHeight,{format:fn,type:An,depthTexture:new Cd(h.textureWidth,h.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const le={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,le),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new Ii(m.framebufferWidth,m.framebufferHeight,{format:fn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Se.setContext(r),Se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function B(z){for(let re=0;re<z.removed.length;re++){const le=z.removed[re],be=b.indexOf(le);be>=0&&(b[be]=null,_[be].disconnect(le))}for(let re=0;re<z.added.length;re++){const le=z.added[re];let be=b.indexOf(le);if(be===-1){for(let X=0;X<_.length;X++)if(X>=b.length){b.push(le),be=X;break}else if(b[X]===null){b[X]=le,be=X;break}if(be===-1)break}const Ae=_[be];Ae&&Ae.connect(le)}}const Y=new V,k=new V;function se(z,re,le){Y.setFromMatrixPosition(re.matrixWorld),k.setFromMatrixPosition(le.matrixWorld);const be=Y.distanceTo(k),Ae=re.projectionMatrix.elements,X=le.projectionMatrix.elements,me=Ae[14]/(Ae[10]-1),ue=Ae[14]/(Ae[10]+1),I=(Ae[9]+1)/Ae[5],ye=(Ae[9]-1)/Ae[5],q=(Ae[8]-1)/Ae[0],te=(X[8]+1)/X[0],ee=me*q,ge=me*te,Z=be/(-q+te),he=Z*-q;if(re.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(he),z.translateZ(Z),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),Ae[10]===-1)z.projectionMatrix.copy(re.projectionMatrix),z.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Ke=me+Z,qe=ue+Z,P=ee-he,S=ge+(be-he),W=I*ue/qe*Ke,j=ye*ue/qe*Ke;z.projectionMatrix.makePerspective(P,S,W,j,Ke,qe),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function O(z,re){re===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(re.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let re=z.near,le=z.far;v.texture!==null&&(v.depthNear>0&&(re=v.depthNear),v.depthFar>0&&(le=v.depthFar)),w.near=E.near=R.near=re,w.far=E.far=R.far=le,(D!==w.near||L!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),D=w.near,L=w.far),w.layers.mask=z.layers.mask|6,R.layers.mask=w.layers.mask&3,E.layers.mask=w.layers.mask&5;const be=z.parent,Ae=w.cameras;O(w,be);for(let X=0;X<Ae.length;X++)O(Ae[X],be);Ae.length===2?se(w,R,E):w.projectionMatrix.copy(R.projectionMatrix),ie(z,w,be)};function ie(z,re,le){le===null?z.matrix.copy(re.matrixWorld):(z.matrix.copy(le.matrixWorld),z.matrix.invert(),z.matrix.multiply(re.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(re.projectionMatrix),z.projectionMatrixInverse.copy(re.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=ac*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(z){l=z,h!==null&&(h.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(w)},this.getCameraTexture=function(z){return p[z]};let oe=null;function Ce(z,re){if(u=re.getViewerPose(c||o),g=re,u!==null){const le=u.views;m!==null&&(e.setRenderTargetFramebuffer(M,m.framebuffer),e.setRenderTarget(M));let be=!1;le.length!==w.cameras.length&&(w.cameras.length=0,be=!0);for(let ue=0;ue<le.length;ue++){const I=le[ue];let ye=null;if(m!==null)ye=m.getViewport(I);else{const te=d.getViewSubImage(h,I);ye=te.viewport,ue===0&&(e.setRenderTargetTextures(M,te.colorTexture,te.depthStencilTexture),e.setRenderTarget(M))}let q=y[ue];q===void 0&&(q=new un,q.layers.enable(ue),q.viewport=new _t,y[ue]=q),q.matrix.fromArray(I.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray(I.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(ye.x,ye.y,ye.width,ye.height),ue===0&&(w.matrix.copy(q.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),be===!0&&w.cameras.push(q)}const Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const ue=d.getDepthInformation(le[0]);ue&&ue.isValid&&ue.texture&&v.init(ue,r.renderState)}if(Ae&&Ae.includes("camera-access")&&(e.state.unbindTexture(),d))for(let ue=0;ue<le.length;ue++){const I=le[ue].camera;if(I){let ye=p[I];ye||(ye=new Fd,p[I]=ye);const q=d.getCameraImage(I);ye.sourceTexture=q}}}for(let le=0;le<_.length;le++){const be=b[le],Ae=_[le];be!==null&&Ae!==void 0&&Ae.update(be,re,c||o)}oe&&oe(z,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),g=null}const Se=new Id;Se.setAnimationLoop(Ce),this.setAnimationLoop=function(z){oe=z},this.dispose=function(){}}}const mi=new wn,V_=new ct;function G_(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,bd(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,x,M,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),d(p,f)):f.isMeshPhongMaterial?(s(p,f),u(p,f)):f.isMeshStandardMaterial?(s(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,_)):f.isMeshMatcapMaterial?(s(p,f),g(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),v(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,x,M):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Xt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Xt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const x=e.get(f),M=x.envMap,_=x.envMapRotation;M&&(p.envMap.value=M,mi.copy(_),mi.x*=-1,mi.y*=-1,mi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),p.envMapRotation.value.setFromMatrix4(V_.makeRotationFromEuler(mi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,x,M){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*x,p.scale.value=M*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,x){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Xt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function v(p,f){const x=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function W_(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const _=M.program;i.uniformBlockBinding(x,_)}function c(x,M){let _=r[x.id];_===void 0&&(g(x),_=u(x),r[x.id]=_,x.addEventListener("dispose",p));const b=M.program;i.updateUBOMapping(x,b);const T=e.render.frame;s[x.id]!==T&&(h(x),s[x.id]=T)}function u(x){const M=d();x.__bindingPointIndex=M;const _=n.createBuffer(),b=x.__size,T=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,b,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,_),_}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const M=r[x.id],_=x.uniforms,b=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let T=0,C=_.length;T<C;T++){const R=Array.isArray(_[T])?_[T]:[_[T]];for(let E=0,y=R.length;E<y;E++){const w=R[E];if(m(w,T,E,b)===!0){const D=w.__offset,L=Array.isArray(w.value)?w.value:[w.value];let U=0;for(let F=0;F<L.length;F++){const B=L[F],Y=v(B);typeof B=="number"||typeof B=="boolean"?(w.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,D+U,w.__data)):B.isMatrix3?(w.__data[0]=B.elements[0],w.__data[1]=B.elements[1],w.__data[2]=B.elements[2],w.__data[3]=0,w.__data[4]=B.elements[3],w.__data[5]=B.elements[4],w.__data[6]=B.elements[5],w.__data[7]=0,w.__data[8]=B.elements[6],w.__data[9]=B.elements[7],w.__data[10]=B.elements[8],w.__data[11]=0):(B.toArray(w.__data,U),U+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(x,M,_,b){const T=x.value,C=M+"_"+_;if(b[C]===void 0)return typeof T=="number"||typeof T=="boolean"?b[C]=T:b[C]=T.clone(),!0;{const R=b[C];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return b[C]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(x){const M=x.uniforms;let _=0;const b=16;for(let C=0,R=M.length;C<R;C++){const E=Array.isArray(M[C])?M[C]:[M[C]];for(let y=0,w=E.length;y<w;y++){const D=E[y],L=Array.isArray(D.value)?D.value:[D.value];for(let U=0,F=L.length;U<F;U++){const B=L[U],Y=v(B),k=_%b,se=k%Y.boundary,O=k+se;_+=se,O!==0&&b-O<Y.storage&&(_+=b-O),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=_,_+=Y.storage}}}const T=_%b;return T>0&&(_+=b-T),x.__size=_,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){const M=x.target;M.removeEventListener("dispose",p);const _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function f(){for(const x in r)n.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class X_{constructor(e={}){const{canvas:t=yf(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),v=new Int32Array(4);let p=null,f=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let b=!1;this._outputColorSpace=Kt;let T=0,C=0,R=null,E=-1,y=null;const w=new _t,D=new _t;let L=null;const U=new Xe(0);let F=0,B=t.width,Y=t.height,k=1,se=null,O=null;const ie=new _t(0,0,B,Y),oe=new _t(0,0,B,Y);let Ce=!1;const Se=new Fc;let z=!1,re=!1;const le=new ct,be=new V,Ae=new _t,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function ue(){return R===null?k:1}let I=i;function ye(A,H){return t.getContext(A,H)}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bc}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",ce,!1),I===null){const H="webgl2";if(I=ye(H,A),I===null)throw ye(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let q,te,ee,ge,Z,he,Ke,qe,P,S,W,j,ne,J,we,fe,Pe,De,de,ve,Ne,Ie,xe,Be;function N(){q=new t0(I),q.init(),Ie=new O_(I,q),te=new Zg(I,q,e,Ie),ee=new N_(I,q),te.reversedDepthBuffer&&h&&ee.buffers.depth.setReversed(!0),ge=new r0(I),Z=new y_,he=new F_(I,q,ee,Z,te,Ie,ge),Ke=new Kg(_),qe=new e0(_),P=new up(I),xe=new qg(I,P),S=new n0(I,P,ge,xe),W=new o0(I,S,P,ge),de=new s0(I,te,he),fe=new $g(Z),j=new S_(_,Ke,qe,q,te,xe,fe),ne=new G_(_,Z),J=new b_,we=new P_(q),De=new Xg(_,Ke,qe,ee,W,m,l),Pe=new D_(_,W,te),Be=new W_(I,ge,te,ee),ve=new Yg(I,q,ge),Ne=new i0(I,q,ge),ge.programs=j.programs,_.capabilities=te,_.extensions=q,_.properties=Z,_.renderLists=J,_.shadowMap=Pe,_.state=ee,_.info=ge}N();const ae=new H_(_,I);this.xr=ae,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=q.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=q.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(A){A!==void 0&&(k=A,this.setSize(B,Y,!1))},this.getSize=function(A){return A.set(B,Y)},this.setSize=function(A,H,$=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=A,Y=H,t.width=Math.floor(A*k),t.height=Math.floor(H*k),$===!0&&(t.style.width=A+"px",t.style.height=H+"px"),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(B*k,Y*k).floor()},this.setDrawingBufferSize=function(A,H,$){B=A,Y=H,k=$,t.width=Math.floor(A*$),t.height=Math.floor(H*$),this.setViewport(0,0,A,H)},this.getCurrentViewport=function(A){return A.copy(w)},this.getViewport=function(A){return A.copy(ie)},this.setViewport=function(A,H,$,K){A.isVector4?ie.set(A.x,A.y,A.z,A.w):ie.set(A,H,$,K),ee.viewport(w.copy(ie).multiplyScalar(k).round())},this.getScissor=function(A){return A.copy(oe)},this.setScissor=function(A,H,$,K){A.isVector4?oe.set(A.x,A.y,A.z,A.w):oe.set(A,H,$,K),ee.scissor(D.copy(oe).multiplyScalar(k).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(A){ee.setScissorTest(Ce=A)},this.setOpaqueSort=function(A){se=A},this.setTransparentSort=function(A){O=A},this.getClearColor=function(A){return A.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,$=!0){let K=0;if(A){let G=!1;if(R!==null){const pe=R.texture.format;G=pe===Ic||pe===Pc||pe===Cc}if(G){const pe=R.texture.type,Ee=pe===An||pe===Pi||pe===as||pe===cs||pe===Ac||pe===wc,Ue=De.getClearColor(),Re=De.getClearAlpha(),ze=Ue.r,He=Ue.g,Fe=Ue.b;Ee?(g[0]=ze,g[1]=He,g[2]=Fe,g[3]=Re,I.clearBufferuiv(I.COLOR,0,g)):(v[0]=ze,v[1]=He,v[2]=Fe,v[3]=Re,I.clearBufferiv(I.COLOR,0,v))}else K|=I.COLOR_BUFFER_BIT}H&&(K|=I.DEPTH_BUFFER_BIT),$&&(K|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),De.dispose(),J.dispose(),we.dispose(),Z.dispose(),Ke.dispose(),qe.dispose(),W.dispose(),xe.dispose(),Be.dispose(),j.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",mn),ae.removeEventListener("sessionend",Yc),ci.stop()};function _e(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const A=ge.autoReset,H=Pe.enabled,$=Pe.autoUpdate,K=Pe.needsUpdate,G=Pe.type;N(),ge.autoReset=A,Pe.enabled=H,Pe.autoUpdate=$,Pe.needsUpdate=K,Pe.type=G}function ce(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Q(A){const H=A.target;H.removeEventListener("dispose",Q),Le(H)}function Le(A){ke(A),Z.remove(A)}function ke(A){const H=Z.get(A).programs;H!==void 0&&(H.forEach(function($){j.releaseProgram($)}),A.isShaderMaterial&&j.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,$,K,G,pe){H===null&&(H=X);const Ee=G.isMesh&&G.matrixWorld.determinant()<0,Ue=lh(A,H,$,K,G);ee.setMaterial(K,Ee);let Re=$.index,ze=1;if(K.wireframe===!0){if(Re=S.getWireframeAttribute($),Re===void 0)return;ze=2}const He=$.drawRange,Fe=$.attributes.position;let Ye=He.start*ze,nt=(He.start+He.count)*ze;pe!==null&&(Ye=Math.max(Ye,pe.start*ze),nt=Math.min(nt,(pe.start+pe.count)*ze)),Re!==null?(Ye=Math.max(Ye,0),nt=Math.min(nt,Re.count)):Fe!=null&&(Ye=Math.max(Ye,0),nt=Math.min(nt,Fe.count));const mt=nt-Ye;if(mt<0||mt===1/0)return;xe.setup(G,K,Ue,$,Re);let lt,rt=ve;if(Re!==null&&(lt=P.get(Re),rt=Ne,rt.setIndex(lt)),G.isMesh)K.wireframe===!0?(ee.setLineWidth(K.wireframeLinewidth*ue()),rt.setMode(I.LINES)):rt.setMode(I.TRIANGLES);else if(G.isLine){let Oe=K.linewidth;Oe===void 0&&(Oe=1),ee.setLineWidth(Oe*ue()),G.isLineSegments?rt.setMode(I.LINES):G.isLineLoop?rt.setMode(I.LINE_LOOP):rt.setMode(I.LINE_STRIP)}else G.isPoints?rt.setMode(I.POINTS):G.isSprite&&rt.setMode(I.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)dr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(q.get("WEBGL_multi_draw"))rt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Oe=G._multiDrawStarts,ht=G._multiDrawCounts,Je=G._multiDrawCount,qt=Re?P.get(Re).bytesPerElement:1,Ui=Z.get(K).currentProgram.getUniforms();for(let Yt=0;Yt<Je;Yt++)Ui.setValue(I,"_gl_DrawID",Yt),rt.render(Oe[Yt]/qt,ht[Yt])}else if(G.isInstancedMesh)rt.renderInstances(Ye,mt,G.count);else if($.isInstancedBufferGeometry){const Oe=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,ht=Math.min($.instanceCount,Oe);rt.renderInstances(Ye,mt,ht)}else rt.render(Ye,mt)};function at(A,H,$){A.transparent===!0&&A.side===yt&&A.forceSinglePass===!1?(A.side=Xt,A.needsUpdate=!0,gs(A,H,$),A.side=oi,A.needsUpdate=!0,gs(A,H,$),A.side=yt):gs(A,H,$)}this.compile=function(A,H,$=null){$===null&&($=A),f=we.get($),f.init(H),M.push(f),$.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),A!==$&&A.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),f.setupLights();const K=new Set;return A.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const pe=G.material;if(pe)if(Array.isArray(pe))for(let Ee=0;Ee<pe.length;Ee++){const Ue=pe[Ee];at(Ue,$,G),K.add(Ue)}else at(pe,$,G),K.add(pe)}),f=M.pop(),K},this.compileAsync=function(A,H,$=null){const K=this.compile(A,H,$);return new Promise(G=>{function pe(){if(K.forEach(function(Ee){Z.get(Ee).currentProgram.isReady()&&K.delete(Ee)}),K.size===0){G(A);return}setTimeout(pe,10)}q.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let tt=null;function Cn(A){tt&&tt(A)}function mn(){ci.stop()}function Yc(){ci.start()}const ci=new Id;ci.setAnimationLoop(Cn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(A){tt=A,ae.setAnimationLoop(A),A===null?ci.stop():ci.start()},ae.addEventListener("sessionstart",mn),ae.addEventListener("sessionend",Yc),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(H),H=ae.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,H,R),f=we.get(A,M.length),f.init(H),M.push(f),le.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Se.setFromProjectionMatrix(le,bn,H.reversedDepth),re=this.localClippingEnabled,z=fe.init(this.clippingPlanes,re),p=J.get(A,x.length),p.init(),x.push(p),ae.enabled===!0&&ae.isPresenting===!0){const pe=_.xr.getDepthSensingMesh();pe!==null&&Eo(pe,H,-1/0,_.sortObjects)}Eo(A,H,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(se,O),me=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,me&&De.addToRenderList(p,A),this.info.render.frame++,z===!0&&fe.beginShadows();const $=f.state.shadowsArray;Pe.render($,A,H),z===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=p.opaque,G=p.transmissive;if(f.setupLights(),H.isArrayCamera){const pe=H.cameras;if(G.length>0)for(let Ee=0,Ue=pe.length;Ee<Ue;Ee++){const Re=pe[Ee];$c(K,G,A,Re)}me&&De.render(A);for(let Ee=0,Ue=pe.length;Ee<Ue;Ee++){const Re=pe[Ee];Zc(p,A,Re,Re.viewport)}}else G.length>0&&$c(K,G,A,H),me&&De.render(A),Zc(p,A,H);R!==null&&C===0&&(he.updateMultisampleRenderTarget(R),he.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(_,A,H),xe.resetDefaultState(),E=-1,y=null,M.pop(),M.length>0?(f=M[M.length-1],z===!0&&fe.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,x.pop(),x.length>0?p=x[x.length-1]:p=null};function Eo(A,H,$,K){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Se.intersectsSprite(A)){K&&Ae.setFromMatrixPosition(A.matrixWorld).applyMatrix4(le);const Ee=W.update(A),Ue=A.material;Ue.visible&&p.push(A,Ee,Ue,$,Ae.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Se.intersectsObject(A))){const Ee=W.update(A),Ue=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ae.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Ae.copy(Ee.boundingSphere.center)),Ae.applyMatrix4(A.matrixWorld).applyMatrix4(le)),Array.isArray(Ue)){const Re=Ee.groups;for(let ze=0,He=Re.length;ze<He;ze++){const Fe=Re[ze],Ye=Ue[Fe.materialIndex];Ye&&Ye.visible&&p.push(A,Ee,Ye,$,Ae.z,Fe)}}else Ue.visible&&p.push(A,Ee,Ue,$,Ae.z,null)}}const pe=A.children;for(let Ee=0,Ue=pe.length;Ee<Ue;Ee++)Eo(pe[Ee],H,$,K)}function Zc(A,H,$,K){const G=A.opaque,pe=A.transmissive,Ee=A.transparent;f.setupLightsView($),z===!0&&fe.setGlobalState(_.clippingPlanes,$),K&&ee.viewport(w.copy(K)),G.length>0&&ms(G,H,$),pe.length>0&&ms(pe,H,$),Ee.length>0&&ms(Ee,H,$),ee.buffers.depth.setTest(!0),ee.buffers.depth.setMask(!0),ee.buffers.color.setMask(!0),ee.setPolygonOffset(!1)}function $c(A,H,$,K){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[K.id]===void 0&&(f.state.transmissionRenderTarget[K.id]=new Ii(1,1,{generateMipmaps:!0,type:q.has("EXT_color_buffer_half_float")||q.has("EXT_color_buffer_float")?hs:An,minFilter:Ti,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const pe=f.state.transmissionRenderTarget[K.id],Ee=K.viewport||w;pe.setSize(Ee.z*_.transmissionResolutionScale,Ee.w*_.transmissionResolutionScale);const Ue=_.getRenderTarget(),Re=_.getActiveCubeFace(),ze=_.getActiveMipmapLevel();_.setRenderTarget(pe),_.getClearColor(U),F=_.getClearAlpha(),F<1&&_.setClearColor(16777215,.5),_.clear(),me&&De.render($);const He=_.toneMapping;_.toneMapping=si;const Fe=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),f.setupLightsView(K),z===!0&&fe.setGlobalState(_.clippingPlanes,K),ms(A,$,K),he.updateMultisampleRenderTarget(pe),he.updateRenderTargetMipmap(pe),q.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let nt=0,mt=H.length;nt<mt;nt++){const lt=H[nt],rt=lt.object,Oe=lt.geometry,ht=lt.material,Je=lt.group;if(ht.side===yt&&rt.layers.test(K.layers)){const qt=ht.side;ht.side=Xt,ht.needsUpdate=!0,Kc(rt,$,K,Oe,ht,Je),ht.side=qt,ht.needsUpdate=!0,Ye=!0}}Ye===!0&&(he.updateMultisampleRenderTarget(pe),he.updateRenderTargetMipmap(pe))}_.setRenderTarget(Ue,Re,ze),_.setClearColor(U,F),Fe!==void 0&&(K.viewport=Fe),_.toneMapping=He}function ms(A,H,$){const K=H.isScene===!0?H.overrideMaterial:null;for(let G=0,pe=A.length;G<pe;G++){const Ee=A[G],Ue=Ee.object,Re=Ee.geometry,ze=Ee.group;let He=Ee.material;He.allowOverride===!0&&K!==null&&(He=K),Ue.layers.test($.layers)&&Kc(Ue,H,$,Re,He,ze)}}function Kc(A,H,$,K,G,pe){A.onBeforeRender(_,H,$,K,G,pe),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),G.onBeforeRender(_,H,$,K,A,pe),G.transparent===!0&&G.side===yt&&G.forceSinglePass===!1?(G.side=Xt,G.needsUpdate=!0,_.renderBufferDirect($,H,K,G,A,pe),G.side=oi,G.needsUpdate=!0,_.renderBufferDirect($,H,K,G,A,pe),G.side=yt):_.renderBufferDirect($,H,K,G,A,pe),A.onAfterRender(_,H,$,K,G,pe)}function gs(A,H,$){H.isScene!==!0&&(H=X);const K=Z.get(A),G=f.state.lights,pe=f.state.shadowsArray,Ee=G.state.version,Ue=j.getParameters(A,G.state,pe,H,$),Re=j.getProgramCacheKey(Ue);let ze=K.programs;K.environment=A.isMeshStandardMaterial?H.environment:null,K.fog=H.fog,K.envMap=(A.isMeshStandardMaterial?qe:Ke).get(A.envMap||K.environment),K.envMapRotation=K.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,ze===void 0&&(A.addEventListener("dispose",Q),ze=new Map,K.programs=ze);let He=ze.get(Re);if(He!==void 0){if(K.currentProgram===He&&K.lightsStateVersion===Ee)return Jc(A,Ue),He}else Ue.uniforms=j.getUniforms(A),A.onBeforeCompile(Ue,_),He=j.acquireProgram(Ue,Re),ze.set(Re,He),K.uniforms=Ue.uniforms;const Fe=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Fe.clippingPlanes=fe.uniform),Jc(A,Ue),K.needsLights=dh(A),K.lightsStateVersion=Ee,K.needsLights&&(Fe.ambientLightColor.value=G.state.ambient,Fe.lightProbe.value=G.state.probe,Fe.directionalLights.value=G.state.directional,Fe.directionalLightShadows.value=G.state.directionalShadow,Fe.spotLights.value=G.state.spot,Fe.spotLightShadows.value=G.state.spotShadow,Fe.rectAreaLights.value=G.state.rectArea,Fe.ltc_1.value=G.state.rectAreaLTC1,Fe.ltc_2.value=G.state.rectAreaLTC2,Fe.pointLights.value=G.state.point,Fe.pointLightShadows.value=G.state.pointShadow,Fe.hemisphereLights.value=G.state.hemi,Fe.directionalShadowMap.value=G.state.directionalShadowMap,Fe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Fe.spotShadowMap.value=G.state.spotShadowMap,Fe.spotLightMatrix.value=G.state.spotLightMatrix,Fe.spotLightMap.value=G.state.spotLightMap,Fe.pointShadowMap.value=G.state.pointShadowMap,Fe.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=He,K.uniformsList=null,He}function jc(A){if(A.uniformsList===null){const H=A.currentProgram.getUniforms();A.uniformsList=so.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function Jc(A,H){const $=Z.get(A);$.outputColorSpace=H.outputColorSpace,$.batching=H.batching,$.batchingColor=H.batchingColor,$.instancing=H.instancing,$.instancingColor=H.instancingColor,$.instancingMorph=H.instancingMorph,$.skinning=H.skinning,$.morphTargets=H.morphTargets,$.morphNormals=H.morphNormals,$.morphColors=H.morphColors,$.morphTargetsCount=H.morphTargetsCount,$.numClippingPlanes=H.numClippingPlanes,$.numIntersection=H.numClipIntersection,$.vertexAlphas=H.vertexAlphas,$.vertexTangents=H.vertexTangents,$.toneMapping=H.toneMapping}function lh(A,H,$,K,G){H.isScene!==!0&&(H=X),he.resetTextureUnits();const pe=H.fog,Ee=K.isMeshStandardMaterial?H.environment:null,Ue=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Mr,Re=(K.isMeshStandardMaterial?qe:Ke).get(K.envMap||Ee),ze=K.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,He=!!$.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Fe=!!$.morphAttributes.position,Ye=!!$.morphAttributes.normal,nt=!!$.morphAttributes.color;let mt=si;K.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(mt=_.toneMapping);const lt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,rt=lt!==void 0?lt.length:0,Oe=Z.get(K),ht=f.state.lights;if(z===!0&&(re===!0||A!==y)){const Ut=A===y&&K.id===E;fe.setState(K,A,Ut)}let Je=!1;K.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==ht.state.version||Oe.outputColorSpace!==Ue||G.isBatchedMesh&&Oe.batching===!1||!G.isBatchedMesh&&Oe.batching===!0||G.isBatchedMesh&&Oe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Oe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Oe.instancing===!1||!G.isInstancedMesh&&Oe.instancing===!0||G.isSkinnedMesh&&Oe.skinning===!1||!G.isSkinnedMesh&&Oe.skinning===!0||G.isInstancedMesh&&Oe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Oe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Oe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Oe.instancingMorph===!1&&G.morphTexture!==null||Oe.envMap!==Re||K.fog===!0&&Oe.fog!==pe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==fe.numPlanes||Oe.numIntersection!==fe.numIntersection)||Oe.vertexAlphas!==ze||Oe.vertexTangents!==He||Oe.morphTargets!==Fe||Oe.morphNormals!==Ye||Oe.morphColors!==nt||Oe.toneMapping!==mt||Oe.morphTargetsCount!==rt)&&(Je=!0):(Je=!0,Oe.__version=K.version);let qt=Oe.currentProgram;Je===!0&&(qt=gs(K,H,G));let Ui=!1,Yt=!1,Pr=!1;const ft=qt.getUniforms(),en=Oe.uniforms;if(ee.useProgram(qt.program)&&(Ui=!0,Yt=!0,Pr=!0),K.id!==E&&(E=K.id,Yt=!0),Ui||y!==A){ee.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ft.setValue(I,"projectionMatrix",A.projectionMatrix),ft.setValue(I,"viewMatrix",A.matrixWorldInverse);const Bt=ft.map.cameraPosition;Bt!==void 0&&Bt.setValue(I,be.setFromMatrixPosition(A.matrixWorld)),te.logarithmicDepthBuffer&&ft.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ft.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),y!==A&&(y=A,Yt=!0,Pr=!0)}if(G.isSkinnedMesh){ft.setOptional(I,G,"bindMatrix"),ft.setOptional(I,G,"bindMatrixInverse");const Ut=G.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),ft.setValue(I,"boneTexture",Ut.boneTexture,he))}G.isBatchedMesh&&(ft.setOptional(I,G,"batchingTexture"),ft.setValue(I,"batchingTexture",G._matricesTexture,he),ft.setOptional(I,G,"batchingIdTexture"),ft.setValue(I,"batchingIdTexture",G._indirectTexture,he),ft.setOptional(I,G,"batchingColorTexture"),G._colorsTexture!==null&&ft.setValue(I,"batchingColorTexture",G._colorsTexture,he));const tn=$.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&de.update(G,$,qt),(Yt||Oe.receiveShadow!==G.receiveShadow)&&(Oe.receiveShadow=G.receiveShadow,ft.setValue(I,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(en.envMap.value=Re,en.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&H.environment!==null&&(en.envMapIntensity.value=H.environmentIntensity),Yt&&(ft.setValue(I,"toneMappingExposure",_.toneMappingExposure),Oe.needsLights&&uh(en,Pr),pe&&K.fog===!0&&ne.refreshFogUniforms(en,pe),ne.refreshMaterialUniforms(en,K,k,Y,f.state.transmissionRenderTarget[A.id]),so.upload(I,jc(Oe),en,he)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(so.upload(I,jc(Oe),en,he),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ft.setValue(I,"center",G.center),ft.setValue(I,"modelViewMatrix",G.modelViewMatrix),ft.setValue(I,"normalMatrix",G.normalMatrix),ft.setValue(I,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Ut=K.uniformsGroups;for(let Bt=0,bo=Ut.length;Bt<bo;Bt++){const li=Ut[Bt];Be.update(li,qt),Be.bind(li,qt)}}return qt}function uh(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function dh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,H,$){const K=Z.get(A);K.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Z.get(A.texture).__webglTexture=H,Z.get(A.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:$,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){const $=Z.get(A);$.__webglFramebuffer=H,$.__useDefaultFramebuffer=H===void 0};const hh=I.createFramebuffer();this.setRenderTarget=function(A,H=0,$=0){R=A,T=H,C=$;let K=!0,G=null,pe=!1,Ee=!1;if(A){const Re=Z.get(A);if(Re.__useDefaultFramebuffer!==void 0)ee.bindFramebuffer(I.FRAMEBUFFER,null),K=!1;else if(Re.__webglFramebuffer===void 0)he.setupRenderTarget(A);else if(Re.__hasExternalTextures)he.rebindTextures(A,Z.get(A.texture).__webglTexture,Z.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Fe=A.depthTexture;if(Re.__boundDepthTexture!==Fe){if(Fe!==null&&Z.has(Fe)&&(A.width!==Fe.image.width||A.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(A)}}const ze=A.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ee=!0);const He=Z.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(He[H])?G=He[H][$]:G=He[H],pe=!0):A.samples>0&&he.useMultisampledRTT(A)===!1?G=Z.get(A).__webglMultisampledFramebuffer:Array.isArray(He)?G=He[$]:G=He,w.copy(A.viewport),D.copy(A.scissor),L=A.scissorTest}else w.copy(ie).multiplyScalar(k).floor(),D.copy(oe).multiplyScalar(k).floor(),L=Ce;if($!==0&&(G=hh),ee.bindFramebuffer(I.FRAMEBUFFER,G)&&K&&ee.drawBuffers(A,G),ee.viewport(w),ee.scissor(D),ee.setScissorTest(L),pe){const Re=Z.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+H,Re.__webglTexture,$)}else if(Ee){const Re=H;for(let ze=0;ze<A.textures.length;ze++){const He=Z.get(A.textures[ze]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+ze,He.__webglTexture,$,Re)}}else if(A!==null&&$!==0){const Re=Z.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Re.__webglTexture,$)}E=-1},this.readRenderTargetPixels=function(A,H,$,K,G,pe,Ee,Ue=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Z.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re){ee.bindFramebuffer(I.FRAMEBUFFER,Re);try{const ze=A.textures[Ue],He=ze.format,Fe=ze.type;if(!te.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-K&&$>=0&&$<=A.height-G&&(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ue),I.readPixels(H,$,K,G,Ie.convert(He),Ie.convert(Fe),pe))}finally{const ze=R!==null?Z.get(R).__webglFramebuffer:null;ee.bindFramebuffer(I.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(A,H,$,K,G,pe,Ee,Ue=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Z.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re)if(H>=0&&H<=A.width-K&&$>=0&&$<=A.height-G){ee.bindFramebuffer(I.FRAMEBUFFER,Re);const ze=A.textures[Ue],He=ze.format,Fe=ze.type;if(!te.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ye),I.bufferData(I.PIXEL_PACK_BUFFER,pe.byteLength,I.STREAM_READ),A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ue),I.readPixels(H,$,K,G,Ie.convert(He),Ie.convert(Fe),0);const nt=R!==null?Z.get(R).__webglFramebuffer:null;ee.bindFramebuffer(I.FRAMEBUFFER,nt);const mt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Ef(I,mt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ye),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,pe),I.deleteBuffer(Ye),I.deleteSync(mt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,H=null,$=0){const K=Math.pow(2,-$),G=Math.floor(A.image.width*K),pe=Math.floor(A.image.height*K),Ee=H!==null?H.x:0,Ue=H!==null?H.y:0;he.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,Ee,Ue,G,pe),ee.unbindTexture()};const fh=I.createFramebuffer(),ph=I.createFramebuffer();this.copyTextureToTexture=function(A,H,$=null,K=null,G=0,pe=null){pe===null&&(G!==0?(dr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=G,G=0):pe=0);let Ee,Ue,Re,ze,He,Fe,Ye,nt,mt;const lt=A.isCompressedTexture?A.mipmaps[pe]:A.image;if($!==null)Ee=$.max.x-$.min.x,Ue=$.max.y-$.min.y,Re=$.isBox3?$.max.z-$.min.z:1,ze=$.min.x,He=$.min.y,Fe=$.isBox3?$.min.z:0;else{const tn=Math.pow(2,-G);Ee=Math.floor(lt.width*tn),Ue=Math.floor(lt.height*tn),A.isDataArrayTexture?Re=lt.depth:A.isData3DTexture?Re=Math.floor(lt.depth*tn):Re=1,ze=0,He=0,Fe=0}K!==null?(Ye=K.x,nt=K.y,mt=K.z):(Ye=0,nt=0,mt=0);const rt=Ie.convert(H.format),Oe=Ie.convert(H.type);let ht;H.isData3DTexture?(he.setTexture3D(H,0),ht=I.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(he.setTexture2DArray(H,0),ht=I.TEXTURE_2D_ARRAY):(he.setTexture2D(H,0),ht=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,H.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,H.unpackAlignment);const Je=I.getParameter(I.UNPACK_ROW_LENGTH),qt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Ui=I.getParameter(I.UNPACK_SKIP_PIXELS),Yt=I.getParameter(I.UNPACK_SKIP_ROWS),Pr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,lt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,lt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ze),I.pixelStorei(I.UNPACK_SKIP_ROWS,He),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Fe);const ft=A.isDataArrayTexture||A.isData3DTexture,en=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){const tn=Z.get(A),Ut=Z.get(H),Bt=Z.get(tn.__renderTarget),bo=Z.get(Ut.__renderTarget);ee.bindFramebuffer(I.READ_FRAMEBUFFER,Bt.__webglFramebuffer),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,bo.__webglFramebuffer);for(let li=0;li<Re;li++)ft&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Z.get(A).__webglTexture,G,Fe+li),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Z.get(H).__webglTexture,pe,mt+li)),I.blitFramebuffer(ze,He,Ee,Ue,Ye,nt,Ee,Ue,I.DEPTH_BUFFER_BIT,I.NEAREST);ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(G!==0||A.isRenderTargetTexture||Z.has(A)){const tn=Z.get(A),Ut=Z.get(H);ee.bindFramebuffer(I.READ_FRAMEBUFFER,fh),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,ph);for(let Bt=0;Bt<Re;Bt++)ft?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,tn.__webglTexture,G,Fe+Bt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,tn.__webglTexture,G),en?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ut.__webglTexture,pe,mt+Bt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ut.__webglTexture,pe),G!==0?I.blitFramebuffer(ze,He,Ee,Ue,Ye,nt,Ee,Ue,I.COLOR_BUFFER_BIT,I.NEAREST):en?I.copyTexSubImage3D(ht,pe,Ye,nt,mt+Bt,ze,He,Ee,Ue):I.copyTexSubImage2D(ht,pe,Ye,nt,ze,He,Ee,Ue);ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else en?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(ht,pe,Ye,nt,mt,Ee,Ue,Re,rt,Oe,lt.data):H.isCompressedArrayTexture?I.compressedTexSubImage3D(ht,pe,Ye,nt,mt,Ee,Ue,Re,rt,lt.data):I.texSubImage3D(ht,pe,Ye,nt,mt,Ee,Ue,Re,rt,Oe,lt):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,pe,Ye,nt,Ee,Ue,rt,Oe,lt.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,pe,Ye,nt,lt.width,lt.height,rt,lt.data):I.texSubImage2D(I.TEXTURE_2D,pe,Ye,nt,Ee,Ue,rt,Oe,lt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Je),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,qt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ui),I.pixelStorei(I.UNPACK_SKIP_ROWS,Yt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Pr),pe===0&&H.generateMipmaps&&I.generateMipmap(ht),ee.unbindTexture()},this.copyTextureToTexture3D=function(A,H,$=null,K=null,G=0){return dr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,H,$,K,G)},this.initRenderTarget=function(A){Z.get(A).__webglFramebuffer===void 0&&he.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?he.setTextureCube(A,0):A.isData3DTexture?he.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?he.setTexture2DArray(A,0):he.setTexture2D(A,0),ee.unbindTexture()},this.resetState=function(){T=0,C=0,R=null,ee.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Gt={centerX:0,centerZ:0,calmRadius:142,fullRadius:172,worldLimit:220,maxWaveScale:1.4};function su(n,e){return Number.isFinite(n)?n:e}function q_(n,e,t){return Math.min(t,Math.max(e,n))}function So(n,e){const t=su(n,Gt.centerX)-Gt.centerX,i=su(e,Gt.centerZ)-Gt.centerZ,r=Math.hypot(t,i),s=Math.max(r,1e-9),o=t/s,a=i/s,l=-o,c=-a,u=Gt.fullRadius-Gt.calmRadius,d=q_((r-Gt.calmRadius)/u,0,1),h=d*d*(3-2*d),m=d>0&&d<1?6*d*(1-d)/u:0;return{intensity:h,inwardX:l,inwardZ:c,gradientX:o*m,gradientZ:a*m}}const ou={velocityX:-9,velocityZ:0};function ar(n,e){return Number.isFinite(n)?n:e}function yr(n=0){const e=ar(ou.velocityX,0),t=ar(ou.velocityZ,0);return{x:e,z:t,speed:Math.hypot(e,t)}}function Vc(n,e,t){const i=ar(n?.x??0,0)-ar(e,0),r=ar(n?.z??0,0)-ar(t,0);return{x:i,z:r,speed:Math.hypot(i,r)}}const st={minAngle:8*Math.PI/180,maxAngle:85*Math.PI/180,defaultAngle:85*Math.PI/180,trimRate:25*Math.PI/180,noGoAngle:40*Math.PI/180,trueWindNoGoSoftness:8*Math.PI/180,maxDriveAcceleration:5.8,maxLateralAcceleration:1.6,sailingMaxYawRate:1.1,stallYawRate:.55,manualBoostFraction:.45};function ca(n,e){return Number.isFinite(n)?n:e}function gi(n,e,t){return Math.min(t,Math.max(e,n))}function au(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function pn(n,e=st.defaultAngle,t=0){const i=ca(n?.heading??0,0),r=Vc(yr(),n?.velocityX??0,n?.velocityZ??0),s=r.speed,o=s>1e-7?-r.x/s:0,a=s>1e-7?-r.z/s:1,l=Math.sin(i),c=Math.cos(i),u=l,d=c,h=c,m=-l,g=o*h+a*m,v=o*u+a*d,p=Math.atan2(g,v),f=Math.sign(p)||1,x=Math.abs(p),M=yr(),_=M.speed||1,b=-M.x/_,T=-M.z/_,C=b*h+T*m,R=b*u+T*d,E=Math.abs(Math.atan2(C,R)),y=st.noGoAngle-st.trueWindNoGoSoftness,w=Math.min(E,x),D=w<st.noGoAngle,L=gi(ca(e,st.defaultAngle),st.minAngle,st.maxAngle),U=gi(x*.5,st.minAngle,st.maxAngle),F=Math.abs(L-U),B=Math.max(0,1-F/(35*Math.PI/180)),Y=.35+.65*Math.sin(gi(x,0,Math.PI)),k=gi((w-y)/(2*st.trueWindNoGoSoftness),0,1),se=k*k*(3-2*k),O=gi(s/9,0,1.35),ie=gi(1-Math.max(0,ca(t,0)),0,1),oe=gi(B*Y*O*ie*se,0,1),Ce=f*L,Se=oe*st.maxDriveAcceleration,z=D?0:-f*oe*st.maxLateralAcceleration*.5;return{driveAcceleration:Se,lateralAcceleration:z,power:oe,suggestedAngle:U,signedAngle:au(Ce),relativeWindAngle:au(p),noGo:D}}const gn={targetEfficiency:.75,assistRate:25*Math.PI/180,boostMinSpeed:1.5,boostStableSeconds:.35,boostDurationSeconds:1.4,boostCooldownSeconds:5,sweetSpotEnter:.9,sweetSpotExit:.78};function Bn(n,e){return Number.isFinite(n)?n:e}function qr(n,e,t){return Math.min(t,Math.max(e,n))}function Y_(n,e,t){return n<e?Math.min(n+t,e):Math.max(n-t,e)}function Jr(n){return qr(Bn(n,st.defaultAngle),st.minAngle,st.maxAngle)}function Od(n){const e=pn(n,st.defaultAngle).suggestedAngle,t=pn(n,e);return{idealAngle:Jr(e),peak:t.power}}function Z_(n){const e=Od(n);if(e.peak<=1e-6)return{angle:Jr(e.idealAngle),efficiency:0};const t=e.peak*gn.targetEfficiency;let i=e.idealAngle,r=st.maxAngle;const s=pn(n,r).power<=t;s||(i=st.minAngle,r=e.idealAngle);for(let l=0;l<8;l+=1){const c=(i+r)*.5,u=pn(n,c).power;s?u>t?i=c:r=c:u>t?r=c:i=c}const o=(i+r)*.5,a=pn(n,o).power;return{angle:o,efficiency:a/e.peak}}function cu(){return{sailAngle:st.defaultAngle,mode:"auto",engaged:!1,efficiency:0,sweetSpot:!1,boost:0,boostSerial:0,stableSeconds:0,cooldownSeconds:0,boostArmed:!0}}function Jn(n){return{...n,boost:0,sweetSpot:!1,stableSeconds:0,cooldownSeconds:Math.max(Bn(n?.cooldownSeconds??0,0),gn.boostCooldownSeconds),boostArmed:!1}}function lu(n,e,t,i){const r=Number.isFinite(i)&&i>0?Math.min(i,.25):0,s=qr(Bn(t?.sheet??0,0),-1,1),o=Math.abs(s)>1e-4;let a=n?.mode==="manual"?"manual":"auto",l=n?.engaged===!0,c=Jr(n?.sailAngle??st.defaultAngle),u=Math.max(0,Bn(n?.cooldownSeconds??0,0)-r),d=qr(Bn(n?.boost??0,0),0,1),h=Math.max(0,Math.floor(Bn(n?.boostSerial??0,0))),m=Math.max(0,Bn(n?.stableSeconds??0,0)),g=n?.boostArmed!==!1;o?(a="manual",l=!0,c=Jr(c+s*st.trimRate*r)):t?.resumeAuto===!0?(a="auto",l=!0,d=0,m=0):t?.engage===!0&&(l=!0);const v=pn(e,c);t?.suppressed===!0&&(d=0,m=0);const p=Od(e);let f=p.peak>1e-6?v.power/p.peak:0,x=n?.sweetSpot===!0;if(t?.resumeAuto===!0&&(x=!1),f<gn.sweetSpotExit?x=!1:f>=gn.sweetSpotEnter&&(x=!0),a==="auto"&&l&&t?.suppressed!==!0){const M=Z_(e);c=Y_(c,M.angle,gn.assistRate*r);const _=pn(e,c);f=p.peak>1e-6?_.power/p.peak:0,x=!1,d=0,m=0}else{f<gn.sweetSpotExit&&(x=!1,g=!0,m=0);const M=Bn(e.heading,0),_=e.velocityX*Math.sin(M)+e.velocityZ*Math.cos(M),b=a==="manual"&&!t?.suppressed&&!v.noGo&&_>=gn.boostMinSpeed&&x;m=b?m+r:0,d>0?(d=Math.max(0,d-r/gn.boostDurationSeconds),(!b||v.noGo||t?.suppressed)&&(d=0),d===0&&(u=gn.boostCooldownSeconds)):b&&g&&m>=gn.boostStableSeconds&&u<=0&&(d=1,h+=1,m=0,g=!1)}return{sailAngle:Jr(c),mode:a,engaged:l,efficiency:qr(Bn(f,0),0,1),sweetSpot:x,boost:qr(d,0,1),boostSerial:h,stableSeconds:m,cooldownSeconds:u,boostArmed:g}}const $_=.18,Qn=1.42;function K_(n,e){const t=new ni;t.name="phase-two-landmarks",n.add(t);const i=[],r=[],s=[],o=[];e.forEach((c,u)=>{const d=j_(c,u,i);if(t.add(d.group),o.push({id:c.id,group:d.group}),c.id==="island-projects"){const h=c.landCollisionRadius*.4666666666666666/Math.SQRT2;s.push({x:c.position.x+h,y:ir(d.group,h,h),z:c.position.z+h})}r.push({id:c.id,position:d.anchor.clone().add(new V(c.position.x,0,c.position.z))})}),t.updateMatrixWorld(!0);const a=o.map(({id:c,group:u})=>({id:c,bounds:new ai().setFromObject(u)}));let l=!1;return{group:t,anchors:r,windFlagAnchors:s,landmarkBounds:a,dispose:()=>{if(!l){l=!0;for(const c of i)c.dispose();t.removeFromParent(),t.clear()}}}}function j_(n,e,t){const i=n.landCollisionRadius,r=n.dockingTriggerRadius,s=new ni;s.name=n.id,s.userData={islandId:n.id,landCollisionRadius:n.landCollisionRadius,dockingTriggerRadius:n.dockingTriggerRadius},s.position.set(n.position.x,0,n.position.z);const o=fr(new rn({color:n.palette.sand,roughness:.9,metalness:0,flatShading:!0}),t),a=fr(new rn({color:n.palette.land,roughness:.92,metalness:0,flatShading:!0}),t),l=fr(new rn({color:n.palette.rock,roughness:.96,metalness:0,flatShading:!0}),t),c=Rt(new Jt(i*.78,i*.98,.48,10,1,!1),t),u=new Ve(c,o);if(u.name="sand-shelf",u.position.y=Qn+.24,s.add(u),n.id==="island-projects"){const p=Rt(new Jt(i*.98,i*.98,Qn- -2.65,10,1,!1),t),f=new Ve(p,l);f.name="shipyard-submerged-foundation",f.position.y=(Qn+-2.65)*.5,s.add(f)}const d=Qn+.48;Q_(s,n,e,d,i,a,t),ev(s,n,e,i,l,t),J_(s,n,i,o,a,l,t);const h=tv(r,t);h.position.y=Qn+$_,s.add(h);const m=i*.82,g=new V(m,Qn+.12,m);return{group:s,anchor:g}}function J_(n,e,t,i,r,s,o){if(e.id==="island-resume"){const a=-t*.22,l=t*.58,c=ir(n,a,l),u=Math.max(2.1,t*.29),d=Rt(new Jt(t*.13,t*.17,u,6,1,!1),o),h=new Ve(d,s);h.name="chartroom-tower",h.userData={detailRole:"tower",supportY:c},h.position.set(a,c+u*.5,l),n.add(h);const m=Rt(new Ci(t*.23,.34,6,1,!1),o),g=new Ve(m,i);g.name="chartroom-tower-roof",g.userData={detailRole:"tower-roof",supportY:c+u},g.position.set(h.position.x,c+u+.17,h.position.z),n.add(g);return}if(e.id==="island-projects"){const a=new V(1,0,1).normalize(),l=new V(-a.z,0,a.x),c=t*.26,u=t*.12,d=a.clone().multiplyScalar(t*.84),h=ir(n,d.x,d.z),m=Rt(new Li(u,.16,c),o),g=fr(new rn({color:7754044,roughness:.9,flatShading:!0}),o),v=new Ve(m,g);v.name="shipyard-dock",v.userData={detailRole:"dock",supportY:h},v.position.set(d.x,h+.08,d.z),v.rotation.y=Math.PI/4,n.add(v);const p=Rt(new Jt(t*.045,t*.055,.74,6,1,!1),o);for(const f of[t*.76,t*.93]){const x=a.clone().multiplyScalar(f).add(l.clone().multiplyScalar(t*.055)),M=new Ve(p,s);M.name="shipyard-dock-pile";const _=ir(n,x.x,x.z);M.userData={detailRole:"dock-pile",supportY:_},M.position.set(x.x,_+.37,x.z),n.add(M)}return}if(e.id==="island-writing"){const a=-t*.5,l=t*.55,c=ir(n,a,l),u=Math.max(1.65,t*.23),d=Rt(new Jt(t*.055,t*.075,u,6,1,!1),o),h=new Ve(d,s);h.name="logbook-marker",h.userData={detailRole:"marker",supportY:c},h.position.set(a,c+u*.5,l),n.add(h);const m=Rt(new Ci(t*.14,.24,5,1,!1),o),g=new Ve(m,i);g.name="logbook-marker-cap",g.userData={detailRole:"marker-cap",supportY:c+u},g.position.set(h.position.x,c+u+.12,h.position.z),n.add(g);return}if(e.id==="island-media"){const a=t*.58,l=t*.18,c=ir(n,a,l),u=Math.max(1.95,t*.27),d=Rt(new Jt(t*.13,t*.18,u,8,1,!1),o),h=new Ve(d,s);h.name="signal-cove-light",h.userData={detailRole:"lighthouse",supportY:c},h.position.set(a,c+u*.5,l),n.add(h);const m=Rt(new Ci(t*.2,.3,8,1,!1),o),g=new Ve(m,i);g.name="signal-cove-light-cap",g.userData={detailRole:"lighthouse-cap",supportY:c+u},g.position.set(h.position.x,c+u+.15,h.position.z),n.add(g);const v=Rt(new zc(t*.05,8,4),o),p=fr(new rn({color:16772522,emissive:16754984,emissiveIntensity:1.8,roughness:.35,metalness:0,flatShading:!0}),o),f=new Ve(v,p);f.name="signal-cove-lantern",f.userData={detailRole:"lighthouse-lantern",supportY:c+u},f.position.set(h.position.x,c+u+.4,h.position.z),n.add(f)}}function ir(n,e,t){n.updateMatrixWorld(!0);const i=new cp(new V(n.position.x+e,20,n.position.z+t),new V(0,-1,0)),r=n.children.filter(o=>o instanceof Ve&&(o.name==="sand-shelf"||o.name.startsWith("landform-")||o.name==="rock-facet")),s=i.intersectObjects(r,!1)[0];return s?s.point.y-n.position.y:Qn+.24}function Q_(n,e,t,i,r,s,o){const a=t*37%90*(Math.PI/180),l=Math.max(1.35,r*.34);if(e.landform==="twin-peaks"){const d=Rt(new Ci(r*.38,l*1.12,6,1,!1),o);for(const[h,m,g]of[[-r*.24,r*.05,.92],[r*.24,-r*.04,.78]]){const v=new Ve(d,s);v.name="landform-twin-peak",v.position.set(h,i+l*g/2,m),v.scale.set(g,g,g),v.rotation.y=a,n.add(v)}return}if(e.landform==="ridge"){const d=Rt(new Ci(r*.68,l*.86,7,1,!1),o),h=new Ve(d,s);h.name="landform-ridge",h.position.y=i+l*.43,h.scale.set(1.35,1,.58),h.rotation.y=a,n.add(h);return}if(e.landform==="mesa"){const d=Rt(new Jt(r*.54,r*.76,l*.9,7,1,!1),o),h=new Ve(d,s);h.name="landform-mesa",h.position.y=i+l*.45,h.rotation.y=a,n.add(h);return}const c=Rt(new vo(r*.63,1),o),u=new Ve(c,s);u.name="landform-mound",u.position.y=i+l*.42,u.scale.set(1.05,.58,.9),u.rotation.y=a,n.add(u)}function ev(n,e,t,i,r,s){const o=Rt(new Bc(i*.13,0),s),a=e.landform==="twin-peaks"?4:3;for(let l=0;l<a;l+=1){const c=(t*1.9+l*2.1)%(Math.PI*2),u=i*(.48+l*.08),d=new Ve(o,r);d.name="rock-facet",d.position.set(Math.cos(c)*u,Qn+.55+l%2*.14,Math.sin(c)*u),d.scale.set(1,.8+l%2*.25,.8),d.rotation.set(.2*l,c,.1*t),n.add(d)}}function tv(n,e){const t=[];for(let a=0;a<=96;a+=1){const l=a/96*Math.PI*2;t.push(new V(Math.cos(l)*n,0,Math.sin(l)*n))}const r=Rt(new pt().setFromPoints(t),e),s=fr(new ip({color:16052196,dashSize:.72,gapSize:.48,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1}),e),o=new ep(r,s);return o.name="docking-boundary",o.userData={dockingTriggerRadius:n},o.computeLineDistances(),o.renderOrder=4,o}function Rt(n,e){return e.push(n),n}function fr(n,e){return e.push(n),n}const Ki=220,nv=5.5,iv=60,rv=90,sv=60;function ov(){const n=new kc(-1,1,1,-1,.1,1200);n.position.set(Ki,Ki,Ki);let e=0,t=0,i=!1;const r=()=>{n.position.set(e+Ki,Ki,t+Ki),n.lookAt(e,0,t),n.updateMatrixWorld(!0)};return r(),{camera:n,resize:(s,o)=>{if(i)return;const a=Math.max(1,s),l=Math.max(1,o),c=a/l,u=l<=460?sv*.5:a<=600?iv/c*.5:rv*.5,d=u*c;n.left=-d,n.right=d,n.top=u,n.bottom=-u,n.updateProjectionMatrix(),r()},update:(s,o,a)=>{if(i)return;const l=1-Math.exp(-Math.max(0,a)*nv);e+=(s-e)*l,t+=(o-t)*l,r()},snapTo:(s,o)=>{i||(e=s,t=o,r())},dispose:()=>{i=!0}}}const dc=5370206;function Xs(n,e,t){let i=Math.imul(n|0,521288629)^Math.imul(e|0,1597334677)^Math.imul(t|0,668265261);return i=Math.imul(i^i>>>15,2246822507),i=Math.imul(i^i>>>13,3266489909),i^=i>>>16,(i>>>0)/4294967295*2-1}function uu(n){return n*n*n*(n*(n*6-15)+10)}function du(n){return 30*n*n*(n*(n-2)+1)}function qs(n,e,t=dc,i){const r=Number.isFinite(n)?n:0,s=Number.isFinite(e)?e:0,o=Number.isFinite(t)?t:dc,a=Math.floor(r),l=Math.floor(s),c=r-a,u=s-l,d=uu(c),h=uu(u),m=du(c),g=du(u),v=Xs(a,l,o),p=Xs(a+1,l,o),f=Xs(a,l+1,o),x=Xs(a+1,l+1,o),M=v+(p-v)*d,_=f+(x-f)*d,b=i??{value:0,derivativeU:0,derivativeV:0};return b.value=M+(_-M)*h,b.derivativeU=(p-v+(x-f-(p-v))*h)*m,b.derivativeV=(_-M)*g,b}const Ft={amplitude:.84,waveNumber:Math.PI*2/30,directionX:.92,directionZ:.39,angularSpeed:Math.PI*2/5.8,phase:0,kind:"sine",phaseWarp:3.2,amplitudeVariation:.06},av={amplitude:.4,waveNumber:Math.PI*2/24,directionX:-.38,directionZ:.925,angularSpeed:Math.PI*2/4.6,phase:0,kind:"cosine",phaseWarp:2.4,amplitudeVariation:-.08},fo=[Ft,av,{amplitude:.24,waveNumber:Math.PI*2/34,directionX:.74,directionZ:-.673,angularSpeed:Math.PI*2/6.8,phase:0,kind:"sine",phaseWarp:-2.3,amplitudeVariation:-.04},{amplitude:.06,waveNumber:Math.PI*2/11,directionX:.707,directionZ:.707,angularSpeed:Math.PI*2/3.5,phase:0,kind:"cosine",phaseWarp:1.1,amplitudeVariation:-.01},{amplitude:.11,waveNumber:Math.PI*2/52,directionX:.58,directionZ:-.815,angularSpeed:Math.PI*2/8.7,phase:1.7,kind:"sine",phaseWarp:.42,amplitudeVariation:.03},{amplitude:.07,waveNumber:Math.PI*2/67,directionX:-.7,directionZ:-.714,angularSpeed:Math.PI*2/10.9,phase:-.8,kind:"cosine",phaseWarp:-.31,amplitudeVariation:.02},{amplitude:.05,waveNumber:Math.PI*2/19,directionX:.22,directionZ:.975,angularSpeed:Math.PI*2/4.1,phase:2.3,kind:"sine",phaseWarp:.27,amplitudeVariation:.01},{amplitude:.03,waveNumber:Math.PI*2/43,directionX:-.91,directionZ:.414,angularSpeed:Math.PI*2/7.6,phase:-2.1,kind:"cosine",phaseWarp:.2,amplitudeVariation:.01}],Qe={seed:dc,phaseLength:44,phaseWidth:27,phaseSpeed:5.1,packetLength:72,packetWidth:48,packetSpeed:4.6,detailLength:23,detailWidth:41,detailSpeed:3.35,macroLength:137,macroWidth:91,macroSpeed:1.7},po=1.8,Qr={value:0,derivativeU:0,derivativeV:0},es={value:0,derivativeU:0,derivativeV:0},vn={value:0,derivativeU:0,derivativeV:0},xn={value:0,derivativeU:0,derivativeV:0},Yr=[1.2,-2.1,1.8,-.9,1.1,-.8,.9,-1.3],Zr=[.9,1.1,-.8,.5,-.9,1.2,-.6,.7],$r=[.11,-.07,-.025,-.025,.025,.018,-.022,-.011],Kr=[.07,-.045,-.015,-.01,-.014,.012,.008,-.006];function pr(n,e){return Number.isFinite(n)?n:e}function Bd(n,e,t,i){qs((n+t*Qe.phaseSpeed)/Qe.phaseLength+2.731,e/Qe.phaseWidth-4.193,i,Qr),qs((n+t*Qe.packetSpeed)/Qe.packetLength-7.217,e/Qe.packetWidth+9.431,i^1779033703,es),qs((n*.81-e*.59+t*Qe.detailSpeed)/Qe.detailLength+5.173,(n*.59+e*.81)/Qe.detailWidth-2.647,i^3144134277,vn),qs((n*.93+e*.37+t*Qe.macroSpeed)/Qe.macroLength-8.319,(-n*.37+e*.93)/Qe.macroWidth+1.427,i^1013904242,xn)}function Lt(n,e,t=0,i=Qe.seed){const r=pr(n,0),s=pr(e,0),o=pr(t,0);Bd(r,s,o,i);let a=0;for(let c=0;c<fo.length;c+=1){const u=fo[c],d=(r*u.directionX+s*u.directionZ)*u.waveNumber+o*u.angularSpeed+u.phase+u.phaseWarp*Qr.value+Yr[c]*vn.value+Zr[c]*xn.value,h=u.amplitude+u.amplitudeVariation*es.value+$r[c]*vn.value+Kr[c]*xn.value;a+=h*(u.kind==="sine"?Math.sin(d):Math.cos(d))}const l=So(r,s).intensity;return a*(1+l*(Gt.maxWaveScale-1))}function mr(n,e,t=0,i=0,r=Qe.seed){const s=pr(n,0),o=pr(e,0),a=pr(t,0);Bd(s,o,a,r);const l=Qr.derivativeU/Qe.phaseLength,c=Qr.derivativeV/Qe.phaseWidth,u=l*Qe.phaseSpeed,d=es.derivativeU/Qe.packetLength,h=es.derivativeV/Qe.packetWidth,m=d*Qe.packetSpeed,g=vn.derivativeU*.81/Qe.detailLength+vn.derivativeV*.59/Qe.detailWidth,v=vn.derivativeU*-.59/Qe.detailLength+vn.derivativeV*.81/Qe.detailWidth,p=vn.derivativeU*Qe.detailSpeed/Qe.detailLength,f=xn.derivativeU*.93/Qe.macroLength+xn.derivativeV*-.37/Qe.macroWidth,x=xn.derivativeU*.37/Qe.macroLength+xn.derivativeV*.93/Qe.macroWidth,M=xn.derivativeU*Qe.macroSpeed/Qe.macroLength;let _=0,b=0,T=0,C=0;for(let w=0;w<fo.length;w+=1){const D=fo[w],L=(s*D.directionX+o*D.directionZ)*D.waveNumber+a*D.angularSpeed+D.phase+D.phaseWarp*Qr.value+Yr[w]*vn.value+Zr[w]*xn.value,U=Math.sin(L),F=Math.cos(L),B=D.kind==="sine"?U:F,Y=D.kind==="sine"?F:-U,k=D.amplitude+D.amplitudeVariation*es.value+$r[w]*vn.value+Kr[w]*xn.value,se=D.amplitudeVariation*d+$r[w]*g+Kr[w]*f,O=D.amplitudeVariation*h+$r[w]*v+Kr[w]*x,ie=D.amplitudeVariation*m+$r[w]*p+Kr[w]*M;_+=k*B,b+=se*B+k*Y*(D.waveNumber*D.directionX+D.phaseWarp*l+Yr[w]*g+Zr[w]*f),T+=O*B+k*Y*(D.waveNumber*D.directionZ+D.phaseWarp*c+Yr[w]*v+Zr[w]*x),C+=ie*B+k*Y*(D.angularSpeed+D.phaseWarp*u+Yr[w]*p+Zr[w]*M)}const R=So(s,o),E=Gt.maxWaveScale-1,y=1+R.intensity*E;if(b=b*y+_*E*R.gradientX,T=T*y+_*E*R.gradientZ,C*=y,_*=y,Number.isFinite(i)&&i>0){const w=Math.max(1e-4,i);b=(Lt(s+w,o,a,r)-Lt(s-w,o,a,r))/(2*w),T=(Lt(s,o+w,a,r)-Lt(s,o-w,a,r))/(2*w)}return{height:_,slopeX:b,slopeZ:T,velocityY:C,stormIntensity:R.intensity}}const ln={centralLimit:180,outerLimit:360,centralStep:4,outerStep:12};function zd(){const n=[];for(let e=-360;e<-180;e+=ln.outerStep)n.push(e);for(let e=-180;e<=ln.centralLimit;e+=ln.centralStep)n.push(e);for(let e=ln.centralLimit+ln.outerStep;e<=ln.outerLimit;e+=ln.outerStep)n.push(e);return n}function hu(n,e,t){return Math.min(t,Math.max(e,n))}function fu(n,e){return Number.isFinite(n)?n:e}function pu(n,e){let t=0,i=n.length-1;for(;i-t>1;){const r=Math.floor((t+i)*.5);n[r]<=e?t=r:i=r}return t}const cv=zd();function kd(n,e){let t=Math.imul((e|0)^2135587861,73244475);return t=Math.imul(t^((n|0)^1779033703),73244475),t^=t>>>16,t=Math.imul(t,73244475),t^=t>>>16,(t&1)===0}function Vn(n,e,t=0){return Hd(n,e,t)}function hc(n,e,t){return Hd(n,e,0,t)}function Hd(n,e,t,i){const r=cv,s=hu(fu(n,0),-360,ln.outerLimit),o=hu(fu(e,0),-360,ln.outerLimit),a=pu(r,o),l=pu(r,s),c=r[l],u=r[l+1],d=r[a],h=r[a+1],m=u>c?(s-c)/(u-c):0,g=h>d?(o-d)/(h-d):0,v=a*r.length+l,p=i?i[v*3+1]:Lt(c,d,t),f=i?i[(v+1)*3+1]:Lt(u,d,t),x=i?i[(v+r.length)*3+1]:Lt(c,h,t),M=i?i[(v+r.length+1)*3+1]:Lt(u,h,t);return kd(a,l)?m+g<=1?p+g*(x-p)+m*(f-p):M+(1-m)*(x-M)+(1-g)*(f-M):g>=m?p+g*(x-p)+m*(M-x):p+g*(M-f)+m*(f-p)}const la={gain:2.5,yawDamping:1,deadband:.01};function kr(n,e){return Number.isFinite(n)?n:e}function lv(n,e,t){return Math.min(t,Math.max(e,n))}function uv(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function dv(n,e){const t=kr(n?.heading??0,0),i=uv(kr(e,t)-t);if(Math.abs(i)<=la.deadband)return 0;const r=i*la.gain-kr(n?.yawRate??0,0)*la.yawDamping,s=t,a=kr(n?.velocityX??0,0)*Math.sin(s)+kr(n?.velocityZ??0,0)*Math.cos(s)<-.6?-1:1;return lv(-r/a,-1,1)}const zn={maxSurgeAcceleration:.9,maxSwayAcceleration:.65,slopeAcceleration:2.8,maxInputSlope:8,uphillResistanceScale:12,maxUphillResistanceAcceleration:7.2};function hv(n,e,t,i){const r=wi(-Ai(n?.surgeAcceleration??0,0),0,zn.maxSurgeAcceleration),s=Math.max(.01,Ai(i,14)),o=wi(Ai(e,0)/s,0,1),a=wi(Ai(t,0),0,1);return-Math.min(r*zn.uphillResistanceScale*o*o*a,zn.maxUphillResistanceAcceleration)}function Ai(n,e){return Number.isFinite(n)?n:e}function wi(n,e,t){return Math.min(t,Math.max(e,n))}function fv(n,e){const t=Ai(e,0),i=wi(Ai(n?.slopeX??0,0),-8,zn.maxInputSlope),r=wi(Ai(n?.slopeZ??0,0),-8,zn.maxInputSlope),s=-i*zn.slopeAcceleration,o=-r*zn.slopeAcceleration,a=Math.sin(t),l=Math.cos(t),c=wi(s*l-o*a,-.65,zn.maxSwayAcceleration),u=wi(s*a+o*l,-.9,zn.maxSurgeAcceleration);return{accelerationX:u*a+c*l,accelerationZ:u*l-c*a,surgeAcceleration:u,swayAcceleration:c}}const je={length:5.2,width:2.6,collisionRadius:3.2,maxForwardSpeed:14,maxReverseSpeed:7,maxLateralSpeed:6,brakingAcceleration:15,maxYawRate:.6},ua=180,pv=.25,mv=1/120,mu=1e-7,gu=16,gv=2.4,Ys=100;function St(n,e){return Number.isFinite(n)?n:e}function dn(n,e,t){return Math.min(t,Math.max(e,n))}function _v(n){return{throttle:dn(St(n?.throttle??0,0),-1,1),rudder:dn(St(n?.rudder??0,0),-1,1),brake:n?.brake===!0,sheet:dn(St(n?.sheet??0,0),-1,1),sailAngle:St(n?.sailAngle??st.defaultAngle,st.defaultAngle),targetHeading:Number.isFinite(n?.targetHeading)?n.targetHeading:void 0,trimBoost:dn(St(n?.trimBoost??0,0),0,1)}}function Vd(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function vv(n){const e=Math.max(je.maxYawRate,st.sailingMaxYawRate);return{x:St(n?.x??0,0),z:St(n?.z??0,0),velocityX:St(n?.velocityX??0,0),velocityZ:St(n?.velocityZ??0,0),heading:Vd(St(n?.heading??0,0)),yawRate:dn(St(n?.yawRate??0,0),-e,e)}}function xv(n){const e=St(n?.worldLimit??ua,ua);return e>0?e:ua}function _u(n,e,t,i,r){const s=Math.max(0,r-je.collisionRadius);return n>s?(n=s,t>0&&(t=0)):n<-s&&(n=-s,t<0&&(t=0)),e>s?(e=s,i>0&&(i=0)):e<-s&&(e=-s,i<0&&(i=0)),[n,e,t,i]}function Mv(n,e,t,i,r){for(const s of r){const o=St(s?.x??0,0),a=St(s?.z??0,0),l=St(s?.radius??0,0);if(l<=0)continue;const c=je.collisionRadius+l,u=n-o,d=e-a,h=Math.hypot(u,d);if(h>=c)continue;let m,g;if(h>mu)m=u/h,g=d/h;else{const p=Math.hypot(t,i);p>mu?(m=-t/p,g=-i/p):(m=1,g=0)}n=o+m*c,e=a+g*c;const v=t*m+i*g;v<0&&(t-=v*m,i-=v*g)}return[n,e,t,i]}function Gd(n,e,t,i,r){const s=xv(r),o=Array.isArray(r?.obstacles)?r.obstacles:[];for(let a=0;a<2;a+=1)[n,e,t,i]=_u(n,e,t,i,s),[n,e,t,i]=Mv(n,e,t,i,o);return[n,e,t,i]=_u(n,e,t,i,s),[n,e,t,i]}function Sv(n,e,t,i,r){const s=Math.sin(n.heading),o=Math.cos(n.heading);let a=n.velocityX*s+n.velocityZ*o,l=n.velocityX*o-n.velocityZ*s;a*=Math.exp(-.35*t),l*=Math.exp(-3.5*t);const c=pn(n,e.sailAngle,e.brake?1:0),u=!e.brake&&c?.noGo!==!0?1+(e.trimBoost??0)*st.manualBoostFraction:1,d=e.brake?0:(c?.driveAcceleration??0)*u;if(a+=d*t,c!==void 0&&(l+=c.lateralAcceleration*t),r!==void 0&&Number.isFinite(r)){const D=fv(mr(n.x,n.z,r),n.heading);a+=D.surgeAcceleration*t,a+=hv(D,a,c?.power??0,je.maxForwardSpeed)*t,l+=D.swayAcceleration*t}{const D=So(n.x,n.z);if(D.intensity>0){const L=D.inwardX*gu*D.intensity,U=D.inwardZ*gu*D.intensity,F=dn(St(a*s+l*o,0),-Ys,Ys),B=dn(St(a*o-l*s,0),-Ys,Ys),Y=Math.max(0,F*-D.inwardX+B*-D.inwardZ),k=Math.max(0,Y)*gv*D.intensity,se=L+D.inwardX*k,O=U+D.inwardZ*k;a+=(se*s+O*o)*t,l+=(se*o-O*s)*t}}if(e.brake){const D=Math.sign(a)||Math.sign(d),L=je.brakingAcceleration*t;D!==0&&(a=Math.abs(a)<=L?0:a-D*L)}a=dn(a,-7,je.maxForwardSpeed),l=dn(l,-6,je.maxLateralSpeed);const h=a*s+l*o,m=a*o-l*s,g=a<-.6?-1:1,v=g<0?je.maxReverseSpeed:je.maxForwardSpeed,p=dn(Math.abs(a)/v,0,1),f=st.sailingMaxYawRate,x=Math.max(st.stallYawRate/f,.12+p*.88),_=-(e.targetHeading!==void 0?dv(n,e.targetHeading):e.rudder)*g*f*x,b=1-Math.exp(-6.5*t),T=dn(n.yawRate+(_-n.yawRate)*b,-f,f),C=Vd(n.heading+T*t);let[R,E,y,w]=Gd(n.x+h*t,n.z+m*t,h,m,i);return{x:R,z:E,velocityX:y,velocityZ:w,heading:C,yawRate:T}}function vu(n=0,e=0){return{x:St(n,0),z:St(e,0),velocityX:0,velocityZ:0,heading:0,yawRate:0}}function yv(n,e,t,i,r){const s=vv(n),o=_v(e),a=Number.isFinite(t)&&t>0?Math.min(t,pv):0;let l=Gd(s.x,s.z,s.velocityX,s.velocityZ,i),c={x:l[0],z:l[1],velocityX:l[2],velocityZ:l[3],heading:s.heading,yawRate:s.yawRate},u=a,d=0;for(;u>0;){const h=Math.min(u,mv),m=r!==void 0&&Number.isFinite(r)?r+d:void 0;c=Sv(c,o,h,i,m),u-=h,d+=h}return c}const Vt={maxHeave:po*Gt.maxWaveScale,maxWavePitch:.29,maxWaveRoll:.3,maxSpeedLift:.065,maxTurnHeel:.12,maxWindHeel:Math.PI/9,maxWindHeelLift:.1,heaveResponseRate:15,tiltResponseRate:9,maxForwardSpeed:je.maxForwardSpeed,maxYawRate:je.maxYawRate},xu=.01;function gt(n,e){return Number.isFinite(n)?n:e}function Nn(n,e,t){return Math.min(t,Math.max(e,n))}function Zs(n){const e=n.reduce((t,i)=>t+i,0);return gt(e/n.length,0)}function Ev(n){const e=n.reduce((i,[,r])=>i+r,0),t=n.reduce((i,[r,s])=>i+r*s,0);return e>0?gt(t/e,0):0}function Mu(n){return{height:gt(n,0)}}function bv(n,e,t){try{return Mu(n(e,t)?.height)}catch{return Mu(0)}}function Tv(n,e,t,i,r,s){const o=gt(n,0),a=gt(e,0),l=gt(t,0),c=Math.max(xu,Math.abs(gt(i,1))*.5),u=Math.max(xu,Math.abs(gt(r,1))*.5),d=Math.cos(l),h=Math.sin(l),m=(g,v)=>bv(s,o+g*d+v*h,a-g*h+v*d);return{bow:m(0,c),stern:m(0,-c),port:m(-u,0),starboard:m(u,0),bowPort:m(-u,c),bowStarboard:m(u,c),sternPort:m(-u,-c),sternStarboard:m(u,-c)}}function Av(n,e={},t=!1){const i=gt(n?.bow?.height,0),r=gt(n?.stern?.height,0),s=gt(n?.port?.height,0),o=gt(n?.starboard?.height,0),a=gt(n?.bowPort?.height,0),l=gt(n?.bowStarboard?.height,0),c=gt(n?.sternPort?.height,0),u=gt(n?.sternStarboard?.height,0),d=Zs([i,a,l]),h=Zs([r,c,u]),m=Zs([s,a,c]),g=Zs([o,l,u]),v=Nn(Ev([[i,1],[r,1],[s,1],[o,1],[a,.5],[l,.5],[c,.5],[u,.5]]),-2.52,Vt.maxHeave),p=Nn(-Math.atan2(gt(d-h,0),je.length),-.29,Vt.maxWavePitch),f=Nn(Math.atan2(gt(g-m,0),je.width),-.3,Vt.maxWaveRoll),x=gt(e?.forwardSpeed,0),M=gt(e?.yawRate,0),_=Nn(gt(e?.sailPower,0),0,1),b=gt(e?.relativeWindAngle,0),T=Nn(x/Vt.maxForwardSpeed,0,1),C=Nn(M/Vt.maxYawRate*Math.min(1,Math.abs(x)/Vt.maxForwardSpeed),-1,1),R=t?0:1,E=T*T*Vt.maxSpeedLift*R,y=-C*Vt.maxTurnHeel*R,w=Math.sin(b),D=Math.abs(w)<1e-6?0:w,L=Math.pow(_,.35),U=Math.sign(D)*Math.pow(Math.abs(D),.65)*L*Vt.maxWindHeel*R,F=Math.abs(U)/Vt.maxWindHeel*Vt.maxWindHeelLift;return{heave:Nn(v+F,-2.52,Vt.maxHeave),pitch:Nn(p-E,-.36,.36),roll:Nn(f+y+U,-.4,.4)}}const It={sternPort:{x:-1.3,z:-2.6},sternStarboard:{x:1.3,z:-2.6},shoulderPort:{x:-1.17,z:1.612},shoulderStarboard:{x:1.17,z:1.612},bowPort:{x:-.585,y:-.55,z:1.352},bowStarboard:{x:.585,y:-.55,z:1.352}},wv=[{x:-1.209,y:.47,z:-2.496},{x:1.209,y:.47,z:-2.496},{x:1.16064,y:.47,z:1.54752},{x:0,y:.47,z:2.496},{x:-1.16064,y:.47,z:1.54752}],Rv=[{x:0,y:.47,z:-.18},{x:0,y:.465,z:-.34},{x:-.51,y:.47,z:-1.24},{x:.51,y:.47,z:-1.24},{x:-.51,y:.47,z:-.4},{x:.51,y:.47,z:-.4}],Cv=[{x:-.884,y:-.55,z:-2.132},{x:.884,y:-.55,z:-2.132},It.bowPort,It.bowStarboard,{x:0,y:-.37,z:2.236},{x:0,y:-.63,z:-.312}];function Pv(n,e,t,i,r,s,o){const a=M=>{const _=Wd(M,r,s,o,e,t);let b=0;try{b=wt(i(_.x,_.z),0)}catch{}return _.y-b},l=Math.min(...wv.map(a)),c=Math.min(...Rv.map(a)),u=Math.min(...Cv.map(a)),d=wt(n.leewardRail.clearance,0),h=Math.max(-.06-l,.12-c,-.055-d),m=-.025-u,g=ts(n.heelLoad/.5,0,1),v=g*g*(3-2*g),p=-ts(d+.035,0,.6)*v,f=e.heave+h,x=Math.max(f,e.heave+m);return{minimumHeave:f,maximumHeave:x,targetHeave:ts(e.heave+p,f,x)}}function wt(n,e){return Number.isFinite(n)?n:e}function ts(n,e,t){return Math.min(t,Math.max(e,n))}function Wd(n,e,t,i,r,s){const o=wt(r?.roll,0),a=wt(r?.pitch,0),l=wt(i,0),c=Math.cos(o),u=Math.sin(o),d=Math.cos(a),h=Math.sin(a),m=Math.cos(l),g=Math.sin(l),v=c*n.x-u*n.y,p=u*n.x+c*n.y,f=n.z,x=v,M=d*p-h*f,_=h*p+d*f;return{x:wt(e,0)+m*x+g*_,y:wt(s,0)+wt(r?.heave,0)+M,z:wt(t,0)-g*x+m*_}}function Su(n,e,t,i,r,s,o,a,l,c,u,d=0,h=0){const m=Math.max(.01,Math.abs(wt(s,2.6))/2.6),g=Math.max(.01,Math.abs(wt(r,5.2))/5.2),v={},p=wt(l,0),f=u?Math.max(0,p-wt(u.timeSeconds,p)):0,x=(D,L)=>{const U=Wd(L,n,e,t,i,o);let F=0;try{F=wt(c(U.x,U.z),0)}catch{F=0}const B=u?.points[D],Y=B&&f>1e-6?(F-B.waterHeight-(U.y-B.y))/f:0,k={...U,waterHeight:F,clearance:U.y-F,closingSpeed:wt(Y,0)};return v[D]=k,k},M=x("bowPort",{x:It.bowPort.x*m,y:It.bowPort.y,z:It.bowPort.z*g}),_=x("bowStarboard",{x:It.bowStarboard.x*m,y:It.bowStarboard.y,z:It.bowStarboard.z*g}),b=x("portRail",{x:(It.sternPort.x+It.shoulderPort.x)*.5*m,y:.45,z:(It.sternPort.z+It.shoulderPort.z)*.5*g}),T=x("starboardRail",{x:(It.sternStarboard.x+It.shoulderStarboard.x)*.5*m,y:.45,z:(It.sternStarboard.z+It.shoulderStarboard.z)*.5*g}),C=ts(wt(d,0),0,1),R=wt(h,0),E=C*Math.abs(Math.sin(R)),y=Math.sin(R)>=0?"port":"starboard";return{contact:{bowPort:M,bowStarboard:_,leewardRail:y==="port"?b:T,leewardSide:y,heelLoad:ts(E,0,1),forwardSpeed:wt(a,0),sailPower:C,relativeWindAngle:R},history:{timeSeconds:p,points:v}}}const Hr=je.length,Vr=je.width,$s=.2,Iv=8*Math.PI/180,Ks=85*Math.PI/180,Lv=9,yu=-.34,Eu=3;function Dv(n){const e=new ni;e.name="portfolio-sailboat",e.rotation.order="YXZ";const t=[],i=[],r=O=>(t.push(O),O),s=O=>(i.push(O),O),o=s(new rn({color:14140835,roughness:.82,metalness:0,flatShading:!0})),a=new Ve(r(Uv(Vr,Hr)),o);a.name="vessel-faceted-hull",e.add(a);const l=s(new rn({color:12088134,roughness:.82,metalness:0,flatShading:!0})),c=new Ve(r(Nv(Vr,Hr)),l);c.name="vessel-warm-wood-deck",e.add(c);const u=s(new rn({color:7097150,roughness:.78,metalness:0,flatShading:!0})),d=new Ve(r(new Li(1.02,.32,.84)),u);d.name="vessel-cockpit-console",d.position.set(0,.63,-.82),e.add(d);const h=s(new rn({color:5131331,roughness:.7,metalness:.05,flatShading:!0})),m=new Ve(r(new Jt(.085,.12,5.45,6)),h);m.name="vessel-mast",m.position.set(0,3.19,-.34),e.add(m);const g=new ni;g.name="sail-rig",g.position.set(0,0,yu),e.add(g);const v=O=>{O.position.z-=yu,g.add(O)},p=new Ve(r(new Jt(.06,.075,3.1,6)),s(new rn({color:15757160,roughness:.64,metalness:0,flatShading:!0})));p.name="vessel-main-boom",p.rotation.x=Math.PI*.5,p.position.set(0,2.04,-1.895),v(p);const f=s(new Tn({color:16775142,side:yt,toneMapped:!1})),x=s(new Tn({color:14339507,side:yt,toneMapped:!1})),M=new Ve(r(Tu(.055,-.6,[[5.8,-.39],[2,-.39],[2.08,-3.4],[3.3,-1.52]])),f);M.name="vessel-cream-mainsail",v(M);const _=new Ve(r(Tu(.062,-.42,[[5.76,-.41],[2.02,-.41],[2.08,-2.74],[3.28,-1.28]])),x);_.name="vessel-mainsail-facet",v(_);const b=s(new rn({color:15757160,roughness:.64,metalness:0,side:yt,flatShading:!0})),T=new Ve(r(bu([.073,2.08,-.48,.073,2.12,-3.05,.073,2.38,-2.78])),b);T.name="vessel-coral-main-clew",v(T);const C=new Ve(r(bu([-.52,.7,.96,.52,.7,.96,0,.7,2.18])),b);C.name="vessel-coral-bow",e.add(C);const R={heave:0,pitch:0,roll:0};let E=!1,y=Ks,w=Ks,D=0,L=0,U={bowPort:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},bowStarboard:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardRail:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardSide:"starboard",heelLoad:0,sailPower:0,relativeWindAngle:0,forwardSpeed:0},F,B=!1;const Y=O=>{if(!Number.isFinite(O))return Ks;const ie=O<0?-1:1,oe=Math.min(Ks,Math.max(Iv,Math.abs(O)));return ie*oe},k=(O,ie)=>{const oe=Number.isFinite(O)&&O>0?Math.min(O,.25):0,Ce=ie||E?1:1-Math.exp(-oe*Lv);y=da(y,w,Ce),g.rotation.y=y,g.scale.x=y<0?-1:1},se=(O,ie,oe,Ce)=>{const Se=Number.isFinite(ie)?ie:0,z=Tv(O.x,O.z,O.heading,Hr,Vr,(ee,ge)=>({height:Vn(ee,ge,Se)})),re=O.velocityX*Math.sin(O.heading)+O.velocityZ*Math.cos(O.heading),le=Av(z,{forwardSpeed:re,yawRate:O.yawRate,sailPower:D,relativeWindAngle:L},E),be=Number.isFinite(oe)&&oe>0?Math.min(oe,.25):0,Ae=Ce?1:1-Math.exp(-be*Vt.heaveResponseRate),X=Ce?1:1-Math.exp(-be*Vt.tiltResponseRate),me=(ee,ge)=>{const Z=da(ee,ge,X);return Ce?Z:ee+Math.max(-Eu*be,Math.min(Eu*be,Z-ee))};R.pitch=me(R.pitch,le.pitch),R.roll=me(R.roll,le.roll);const ue={...R,heave:le.heave},I=E?0:D,ye=Su(O.x,O.z,O.heading,ue,Hr,Vr,$s,re,Se,(ee,ge)=>Vn(ee,ge,Se),Ce?void 0:F,I,L),q=Pv(ye.contact,ue,$s,(ee,ge)=>Vn(ee,ge,Se),O.x,O.z,O.heading);R.heave=Math.min(q.maximumHeave,Math.max(q.minimumHeave,da(R.heave,q.targetHeave,Ae)));const te=Su(O.x,O.z,O.heading,R,Hr,Vr,$s,re,Se,(ee,ge)=>Vn(ee,ge,Se),Ce?void 0:F,I,L);U=te.contact,F=te.history,e.position.set(Number.isFinite(O.x)?O.x:0,R.heave+$s,Number.isFinite(O.z)?O.z:0),e.rotation.y=Number.isFinite(O.heading)?O.heading:0,e.rotation.x=R.pitch,e.rotation.z=R.roll,k(oe,Ce)};return n.add(e),{group:e,update:(O,ie,oe)=>{B||se(O,ie,oe,!1)},resetPose:(O,ie=0)=>{B||(F=void 0,se(O,ie,0,!0))},setReducedMotion:O=>{B||(E=O===!0,E&&k(0,!0))},setSailAngle:(O,ie=!1)=>{B||(w=Y(O),k(0,ie))},setSailLoad:(O,ie)=>{B||(D=Number.isFinite(O)?Math.min(1,Math.max(0,O)):0,L=Number.isFinite(ie)?ie:0)},getSailAngle:()=>y,getWaterContact:()=>({...U,bowPort:{...U.bowPort},bowStarboard:{...U.bowStarboard},leewardRail:{...U.leewardRail}}),getPose:()=>({...R}),dispose:()=>{if(!B){B=!0;for(const O of t)O.dispose();for(const O of i)O.dispose();e.removeFromParent(),e.clear()}}}}function Uv(n,e){const t=n*.5,i=e*.5,r=.45,s=-.55,o=[[-t,r,-i],[t,r,-i],[t*.9,r,i*.62],[0,r,i],[-t*.9,r,i*.62]],a=[[-t*.68,s,-i*.82],[t*.68,s,-i*.82],[t*.45,s,i*.52],[0,s+.18,i*.86],[-t*.45,s,i*.52]],l=[];for(const h of o)l.push(...h);for(const h of a)l.push(...h);l.push(0,s-.08,-i*.12);const c=10,u=[];for(let h=0;h<5;h+=1){const m=(h+1)%5;u.push(h,m,5+m,h,5+m,5+h),u.push(c,5+m,5+h)}const d=new pt;return d.setAttribute("position",new dt(l,3)),d.setIndex(u),d.computeVertexNormals(),d}function Nv(n,e){const t=n*.5*.93,i=e*.5*.96,r=.47,s=[[-t,r,-i],[t,r,-i],[t*.96,r,i*.62],[0,r,i],[-t*.96,r,i*.62]],o=[0,r,-.18],a=[];for(const c of s)o.push(...c);for(let c=0;c<s.length;c+=1){const u=(c+1)%s.length;a.push(0,u+1,c+1)}const l=new pt;return l.setAttribute("position",new dt(o,3)),l.setIndex(a),l.computeVertexNormals(),Fv(l),l}function Fv(n){const e=n.getAttribute("position"),t=n.getIndex();if(!t||t.count<3)throw new Error("Vessel deck needs indexed faces");const i=t.getX(0),r=t.getX(1),s=t.getX(2),o=e.getX(r)-e.getX(i),a=e.getZ(r)-e.getZ(i),l=e.getX(s)-e.getX(i),c=e.getZ(s)-e.getZ(i);if(!(a*l-o*c>0))throw new Error("Vessel deck faces downward")}function bu(n){const e=new pt;return e.setAttribute("position",new dt([...n],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function Tu(n,e,t){const[i,r,s,o]=t,a=new pt;return a.setAttribute("position",new dt([n,i[0],i[1],n,r[0],r[1],n,s[0],s[1],e,o[0],o[1]],3)),a.setIndex([0,1,3,1,2,3,2,0,3]),a.computeVertexNormals(),a}function da(n,e,t){return n+(e-n)*Math.min(1,Math.max(0,t))}const Gr=96,Xd=80,Wr=Xd,Ov=[-1,1],Bv=1.45,Au=.34,wu=.055,Ru=.11,zv=.45,kv=.055,ut=32,Cu=.06,ji=2.2,Pu=.24,Ji=18,Hv=.27,Vv=.2,Gv=1;function Wv(n){const e=new Oc(1,7);e.rotateX(-Math.PI*.5);const t=new Tn({color:16052196,transparent:!0,opacity:.5,depthWrite:!1,side:yt}),i=new wd(e,t,Gr);i.name="phase-five-wake-foam",i.frustumCulled=!1,i.instanceMatrix.setUsage(jt),n.add(i);const r=new Float32Array(ut*2*2*3),s=new Float32Array(ut*2*2*4),o=new Uint16Array((ut-1)*2*6);let a=0;for(let X=0;X<2;X+=1){const me=X*ut*2;for(let ue=0;ue<ut-1;ue+=1){const I=me+ue*2,ye=I+2;o[a++]=I,o[a++]=ye,o[a++]=I+1,o[a++]=I+1,o[a++]=ye,o[a++]=ye+1}}const l=new pt,c=new ot(r,3),u=new ot(s,4);c.setUsage(jt),u.setUsage(jt),l.setAttribute("position",c),l.setAttribute("color",u),l.setIndex(new ot(o,1));const d=new Tn({color:16777215,vertexColors:!0,transparent:!0,opacity:.42,depthWrite:!1,side:yt}),h=new Ve(l,d);h.name="phase-five-wake-ribbon",h.frustumCulled=!1,n.add(h);const m=new Float32Array(Ji*2*3),g=new Float32Array(Ji*2*4),v=new Uint16Array((Ji-1)*6);let p=0;for(let X=0;X<Ji-1;X+=1){const me=X*2,ue=me+2;v[p++]=me,v[p++]=ue,v[p++]=me+1,v[p++]=me+1,v[p++]=ue,v[p++]=ue+1}const f=new pt,x=new ot(m,3),M=new ot(g,4);x.setUsage(jt),M.setUsage(jt),f.setAttribute("position",x),f.setAttribute("color",M),f.setIndex(new ot(v,1));const _=new Tn({color:16777215,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,side:yt}),b=new Ve(f,_);b.name="phase-five-bow-wave",b.frustumCulled=!1,n.add(b);const T=Array.from({length:Gr},()=>({age:Number.POSITIVE_INFINITY,life:0,x:0,z:0,heading:0,driftX:0,driftZ:0,size:0,elongation:1,kind:0,side:0,waveResponse:0,trimBoost:0,active:!1})),C=new Mt,R=Array.from({length:ut},()=>({age:Number.POSITIVE_INFINITY,x:0,z:0,heading:0,speed:0,yawRate:0,trimBoost:0,active:!1}));let E=0,y=Wr,w=0,D=0,L=0,U=0,F=0,B=0,Y=!1,k=!1;const se=(X,me,ue,I)=>{if(!me.active||me.age>=me.life){me.active=!1,C.scale.setScalar(0),C.updateMatrix(),i.setMatrixAt(X,C.matrix);return}const ye=Math.min(1,Math.max(0,me.age/me.life)),q=ye<.16?ye/.16:1-(ye-.16)/.84,te=I?Math.min(me.trimBoost,B):0,ee=me.size*(1+te*.85)*Math.max(0,q);let ge=Lt(me.x,me.z,ue),Z=0;if(me.kind!==0){const Ke=mr(me.x,me.z,ue);ge=Ke.height,Z=Math.min(.45,Math.hypot(Ke.slopeX,Ke.slopeZ))}const he=1+me.waveResponse*Z;C.position.set(me.x,ge+Vv,me.z),C.rotation.set(0,me.heading,0),C.scale.set(ee*me.elongation*(1+te*.24)*he,1,ee*(1+te*.12)*he),C.updateMatrix(),i.setMatrixAt(X,C.matrix)},O=X=>{X.active=!1,X.age=Number.POSITIVE_INFINITY,X.kind=0,X.side=0,X.waveResponse=0,X.trimBoost=0},ie=(X,me)=>{const ue=Math.sin(X.heading),I=Math.cos(X.heading),ye=Math.cos(X.heading),q=-Math.sin(X.heading),te=je.length*.52;for(const ee of Ov){const ge=E;E=(E+1)%Xd;const Z=T[ge],he=(ge*17%11/10-.5)*.12,Ke=je.width*.32+he,qe=.18+Math.min(.48,me*.035);Z.age=0,Z.heading=X.heading,Z.life=Bv*(.82+ge*13%7*.035),Z.x=X.x-ue*te+ye*ee*Ke,Z.z=X.z-I*te+q*ee*Ke,Z.driftX=-ue*(.12+me*.08)+ye*ee*qe,Z.driftZ=-I*(.12+me*.08)+q*ee*qe,Z.size=.13+Math.min(.2,me*.017),Z.elongation=1.1+Math.min(.45,me*.035),Z.kind=0,Z.side=ee,Z.waveResponse=.45,Z.trimBoost=B,Z.active=!0}},oe=()=>{const X=y;return y=Wr+(y-Wr+1)%(Gr-Wr),T[X]},Ce=(X,me,ue,I,ye)=>{const q=Math.sin(X.heading),te=Math.cos(X.heading),ee=Math.cos(X.heading),ge=-Math.sin(X.heading),Z=oe();Z.age=0,Z.life=Au*(.92+I*.35+ye*.22),Z.heading=X.heading+ue*.16,Z.x=X.x+q*(je.length*.48)+ee*ue*je.width*.28,Z.z=X.z+te*(je.length*.48)+ge*ue*je.width*.28,Z.driftX=q*(.08+me*.035)+ee*ue*(.2+I*.24+ye*.12),Z.driftZ=te*(.08+me*.035)+ge*ue*(.2+I*.24+ye*.12),Z.size=.13+Math.min(.12,me*.012)+I*.05+ye*.1,Z.elongation=1.35+Math.min(.4,me*.025)+ye*.18,Z.kind=1,Z.side=ue,Z.waveResponse=1.25,Z.active=!0},Se=(X,me,ue,I)=>{const ye=Math.sign(X.yawRate);if(ye===0)return;const q=Math.sin(X.heading),te=Math.cos(X.heading),ee=Math.cos(X.heading),ge=-Math.sin(X.heading),Z=oe(),he=Math.min(1,Math.abs(X.yawRate)/.6);Z.age=0,Z.life=Au*(1.05+he*.3+I*.18),Z.heading=X.heading+ye*.32,Z.x=X.x-q*(je.length*.08)+ee*ye*(je.width*.58),Z.z=X.z-te*(je.length*.08)+ge*ye*(je.width*.58),Z.driftX=ee*ye*(.22+me*.035)-q*.06,Z.driftZ=ge*ye*(.22+me*.035)-te*.06,Z.size=.13+he*.1+ue*.04+I*.08,Z.elongation=1.5+he*.45+I*.12,Z.kind=2,Z.side=ye,Z.waveResponse=1.1,Z.active=!0},z=(X,me,ue)=>{const I=X.x+Math.sin(X.heading)*je.length*.48,ye=X.z+Math.cos(X.heading)*je.length*.48,q=mr(I,ye,ue),te=Math.min(.45,Math.hypot(q.slopeX,q.slopeZ)),ee=Math.abs(q.velocityY+X.velocityX*q.slopeX+X.velocityZ*q.slopeZ),ge=Math.min(.9,ee*.26);Ce(X,me,-1,te,ge),Ce(X,me,1,te,ge),Math.abs(X.yawRate)>=kv&&Se(X,me,te,ge)},re=(X,me)=>{const ue=R[L];ue.age=0,ue.x=Number.isFinite(X.x)?X.x:0,ue.z=Number.isFinite(X.z)?X.z:0,ue.heading=Number.isFinite(X.heading)?X.heading:0,ue.speed=me,ue.yawRate=Number.isFinite(X.yawRate)?X.yawRate:0,ue.trimBoost=B,ue.active=!0,L=(L+1)%ut,U=Math.min(ut,U+1)},le=(X,me)=>{const ue=ut-U;for(let I=0;I<2;I+=1){const ye=I===0?-1:1,q=I*ut*2;let te=ut,ee=-1;for(let ge=0;ge<ut;ge+=1){const Z=ge>=ue,he=ge-ue,Ke=Z?(L-U+he+ut)%ut:0,qe=R[Ke];Z&&qe.active&&qe.age<ji&&(te===ut&&(te=ge),ee=ge)}for(let ge=0;ge<ut;ge+=1){const Z=(q+ge*2)*3,he=(q+ge*2)*4,Ke=ge>=ue,qe=ge-ue,P=Ke?(L-U+qe+ut)%ut:0,S=R[P];if(!Ke||!S.active||S.age>=ji){for(let ke=0;ke<8;ke+=1)s[he+ke]=0;continue}const W=Math.max(0,1-S.age/ji),j=me?Math.min(S.trimBoost,B):0,ne=Math.min(1,Math.max(0,S.speed/je.maxForwardSpeed)),J=U>1?qe/(U-1):1,we=.18+Math.min(1,Math.max(0,1-J)*5)*.82,fe=W*W*(.72+ne*.28)*(.55+we*.45)*(1+j*.16),Pe=Math.sin(S.heading),De=Math.cos(S.heading),de=Math.cos(S.heading),ve=-Math.sin(S.heading),Ne=je.length*(.52+ne*.08),Ie=S.x-Pe*Ne,xe=S.z-De*Ne,Be=je.width*(.34+ne*.1)*(1+j*.2)*we,N=Be+(.62+ne*1.05+Math.min(.45,Math.abs(S.yawRate)*.72))*(.32+W*.68)*(1+j*.82)*we,ae=Ie+de*ye*Be,_e=xe+ve*ye*Be,Te=Ie+de*ye*N,ce=xe+ve*ye*N,Q=Lt(ae,_e,X)+Pu,Le=Lt(Te,ce,X)+Pu;r[Z]=ae,r[Z+1]=Q,r[Z+2]=_e,r[Z+3]=Te,r[Z+4]=Le,r[Z+5]=ce,s[he]=1,s[he+1]=1,s[he+2]=1,s[he+3]=fe,s[he+4]=1,s[he+5]=1,s[he+6]=1,s[he+7]=fe}if(ee<0)for(let ge=0;ge<ut;ge+=1){const Z=(q+ge*2)*3;for(let he=0;he<6;he+=1)r[Z+he]=0}else for(let ge=0;ge<ut;ge+=1){const Z=ge>=ue,he=ge-ue,Ke=Z?(L-U+he+ut)%ut:0,qe=R[Ke];if(Z&&qe.active&&qe.age<ji)continue;let P=ge<=te?te:ge-1;for(;P>=te;){const j=P>=ue,ne=P-ue,J=j?(L-U+ne+ut)%ut:0,we=R[J];if(j&&we.active&&we.age<ji)break;P-=1}P<te&&(P=te);const S=(q+ge*2)*3,W=(q+P*2)*3;for(let j=0;j<6;j+=1)r[S+j]=r[W+j]}}l.getAttribute("position").needsUpdate=!0,l.getAttribute("color").needsUpdate=!0},be=(X,me,ue,I)=>{if(!I){m.fill(0),g.fill(0),x.needsUpdate=!0,M.needsUpdate=!0;return}const ye=Math.sin(X.heading),q=Math.cos(X.heading),te=Math.cos(X.heading),ee=-Math.sin(X.heading),ge=X.x+ye*je.length*.48,Z=X.z+q*je.length*.48,he=ge-ye*.78,Ke=Z-q*.78,qe=mr(ge,Z,ue),P=Math.min(.5,Math.hypot(qe.slopeX,qe.slopeZ)),S=Math.abs(qe.velocityY+X.velocityX*qe.slopeX+X.velocityZ*qe.slopeZ),W=Math.min(.9,S*.26),j=Math.min(1,Math.max(0,me/je.maxForwardSpeed)),ne=.9+j*.22+W*.14,J=.18+j*.12+P*.1+W*.08,we=Math.min(.92,.28+j*.48+W*.18);for(let fe=0;fe<Ji;fe+=1){const Pe=Math.PI-fe/(Ji-1)*Math.PI,De=Math.cos(Pe),de=Math.sin(Pe);for(let ve=0;ve<2;ve+=1){const Ne=ne+ve*J,Ie=De*Ne,xe=de*Ne,Be=(fe*2+ve)*3,N=(fe*2+ve)*4,ae=he+te*Ie+ye*xe,_e=Ke+ee*Ie+q*xe;m[Be]=ae,m[Be+1]=Lt(ae,_e,ue)+Hv,m[Be+2]=_e,g[N]=1,g[N+1]=1,g[N+2]=1,g[N+3]=we*(ve===0?1:.78)}}x.needsUpdate=!0,M.needsUpdate=!0},Ae=()=>{if(!k){w=0,D=0,E=0,y=Wr,L=0,U=0,F=0,B=0;for(const X of T)O(X);for(const X of R)X.trimBoost=0,X.active=!1;for(let X=0;X<Gr;X+=1)se(X,T[X],0,!1);le(0,!1),be({x:0,z:0,velocityX:0,velocityZ:0,heading:0},0,0,!1),i.instanceMatrix.needsUpdate=!0}};return Ae(),{update:(X,me,ue)=>{if(k||Y)return;const I=Number.isFinite(ue)?Math.min(.1,Math.max(0,ue)):0;if(I<=0)return;const ye=Number.isFinite(me)?me:0,q=X.velocityX*Math.sin(X.heading)+X.velocityZ*Math.cos(X.heading),te=Math.max(0,q),ee=te>=zv;for(const he of T)he.active&&(he.age+=I,he.x+=he.driftX*I,he.z+=he.driftZ*I,he.age>=he.life&&(he.active=!1));let ge=!1;for(const he of R)he.active&&(he.age+=I,he.age>=ji?he.active=!1:ge=!0);if(!ge&&U>0&&(U=0,L=0),ee){for(U===0&&re(X,te),F+=I;F>=Cu;)F-=Cu,re(X,te);for(w+=I;w>=wu;)w-=wu,ie(X,te);for(D+=I;D>=Ru;)D-=Ru,z(X,te,ye)}else w=0,D=0,F=0;const Z=ee&&B>0;for(let he=0;he<Gr;he+=1)se(he,T[he],ye,Z);le(ye,Z),be(X,te,ye,ee),i.instanceMatrix.needsUpdate=!0},reset:Ae,setTrimBoost:X=>{if(!k){if(B=Number.isFinite(X)?Math.min(Gv,Math.max(0,X)):0,B===0){for(const me of T)me.trimBoost=0;for(const me of R)me.trimBoost=0}Y&&(B=0)}},setReducedMotion:X=>{k||Y===X||(Y=X,X&&(B=0,Ae()))},dispose:()=>{k||(k=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),h.removeFromParent(),l.dispose(),d.dispose(),b.removeFromParent(),f.dispose(),_.dispose(),C.clear())}}}const Qi=48,Iu=.065,Lu=.09,Du=.65,Xv=.08,qv=.12,Yv=.3,Zv=.06,$v=.1,Uu=-7.5,ha=.035,Nu=3254217;function kt(n,e){return Number.isFinite(n)?n:e}function er(n,e,t){return Math.min(t,Math.max(e,n))}function fa(n){return n!=null}function Kv(n){const e=new vo(1,0),t=new Tn({color:16055287,vertexColors:!0,transparent:!0,opacity:.76,depthWrite:!1,side:yt}),i=new wd(e,t,Qi);i.name="phase-twelve-hull-spray",i.frustumCulled=!1,i.instanceMatrix.setUsage(jt),i.instanceColor=new cc(new Float32Array(Qi*3),3),i.instanceColor.setUsage(jt),n.add(i);const r=Array.from({length:Qi},()=>({active:!1,age:Number.POSITIVE_INFINITY,life:0,x:0,y:0,z:0,velocityX:0,velocityY:0,velocityZ:0,size:0,elongation:1,kind:0})),s=new Mt,o=new Xe(16318460),a=new Xe(12577250);let l=0,c=0,u=0,d=Nu,h=!1,m=!1;const g=()=>(d=Math.imul(d,1664525)+1013904223>>>0,d/4294967295),v=b=>{b.active=!1,b.age=Number.POSITIVE_INFINITY,b.life=0,b.size=0},p=(b,T)=>{if(!T.active||T.age>=T.life){v(T),s.scale.setScalar(0),s.position.set(0,0,0),s.updateMatrix(),i.setMatrixAt(b,s.matrix),i.setColorAt(b,T.kind===0?o:a);return}const C=er(T.age/T.life,0,1),R=C<.12?C/.12:Math.max(0,1-(C-.12)/.88),E=T.size*R;s.position.set(T.x,T.y,T.z),s.rotation.set(0,0,0),s.scale.set(E*T.elongation,E,E),s.updateMatrix(),i.setMatrixAt(b,s.matrix),i.setColorAt(b,T.kind===0?o:a)},f=b=>{const T=r[l];return l=(l+1)%Qi,T.active=!0,T.age=0,T.kind=b,T},x=(b,T,C,R,E,y,w,D)=>{const L=yr(D),U=er(kt(b.closingSpeed,0),0,4),F=f(0),B=.18+g()*.42;F.x=kt(b.x,0)+E*T*B,F.z=kt(b.z,0)+y*T*B;const Y=Vn(F.x,F.z,D)+ha;F.y=Math.max(kt(b.y,0),Y),F.velocityX=C*(.2+w*.035)+E*T*(.12+g()*.18)+L.x*.025,F.velocityZ=R*(.2+w*.035)+y*T*(.12+g()*.18)+L.z*.025,F.velocityY=.62+g()*.65+U*.22,F.life=.45+g()*.25,F.size=.07+g()*.055+Math.min(.035,w*.003),F.elongation=1.2+g()*.55},M=(b,T,C,R,E,y,w,D,L)=>{const U=yr(L),F=f(1);F.x=kt(b.x,0),F.z=kt(b.z,0);const B=Vn(F.x,F.z,L)+ha;F.y=Math.max(kt(b.y,0),B),F.velocityX=C*(.12+w*.018)+E*T*(.16+D*.18)+U.x*.018,F.velocityZ=R*(.12+w*.018)+y*T*(.16+D*.18)+U.z*.018,F.velocityY=.22+g()*.3+D*.25,F.life=.32+g()*.18,F.size=.065+g()*.045+D*.025,F.elongation=1.1+g()*.5},_=()=>{if(!m){l=0,c=0,u=0,d=Nu;for(let b=0;b<Qi;b+=1)v(r[b]),p(b,r[b]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}};return _(),{update:(b,T,C)=>{if(m||h)return;const R=Number.isFinite(C)?er(C,0,$v):0;if(R<=0)return;const E=Number.isFinite(T)?T:0,y=kt(b?.forwardSpeed,0),w=b?.bowPort,D=b?.bowStarboard,L=b?.leewardRail;let U=kt(w?.x,0)-kt(D?.x,0),F=kt(w?.z,0)-kt(D?.z,0);const B=Math.hypot(U,F);B<1e-6?(U=-1,F=0):(U/=B,F/=B);let Y=F,k=-U;const se=Math.hypot(Y,k);se<1e-6?(Y=0,k=1):(Y/=se,k/=se);const O=[[w,1],[D,-1]];let ie,oe=1;for(const[z,re]of O)fa(z)&&(z.clearance>Yv||z.closingSpeed<=Xv||(!ie||z.closingSpeed>ie.closingSpeed)&&(ie=z,oe=re));const Ce=y>=Du&&fa(ie),Se=y>=Du&&fa(L)&&L.clearance<=Zv&&kt(b?.heelLoad,0)>=qv;for(const z of r){if(!z.active)continue;z.age+=R,z.x+=z.velocityX*R,z.y+=z.velocityY*R+.5*Uu*R*R,z.z+=z.velocityZ*R,z.velocityY+=Uu*R;const re=Vn(z.x,z.z,E)+ha;if(z.y<=re){z.y=re,z.active=!1;continue}z.age>=z.life&&(z.active=!1)}if(Ce&&ie){c+=R;let z=0;for(;c>=Iu&&z<2;)c-=Iu,x(ie,oe,Y,k,U,F,er(y,0,20),E),z+=1}else c=0;if(Se&&L){u+=R;let z=0;for(;u>=Lu&&z<2;){u-=Lu;const re=b.leewardSide==="port"?1:-1;M(L,re,Y,k,U,F,er(y,0,20),er(kt(b?.heelLoad,0),0,1),E),z+=1}}else u=0;for(let z=0;z<Qi;z+=1)p(z,r[z]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)},reset:_,setReducedMotion:b=>{m||h===b||(h=b,b&&_())},dispose:()=>{m||(m=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),s.clear())}}}const jv=new V(0,5.87,-.34),qd=new V(1,0,0),Ei=5,Jv=2.25,Qv=1.42,ex=.42,tx=.28,nx=.25;function _n(n,e=0){return Number.isFinite(n)?n:e}function Fu(n,e){const t=new V(_n(n),0,_n(e));return t.lengthSq()<1e-12?qd.clone():t.normalize()}function ix(n,e){const t=new pt,i=new Float32Array((Ei+1)*2*3),r=new Float32Array((Ei+1)*2*3),s=new Xe(15757160),o=new Xe(16773590);for(let l=0;l<=Ei;l+=1){const c=l%2===0?s:o;for(let u=0;u<2;u+=1){const d=(l*2+u)*3;c.toArray(r,d)}}const a=[];for(let l=0;l<Ei;l+=1){const c=l*2,u=c+2;a.push(c,u,c+1,c+1,u,u+1)}return t.setAttribute("position",new ot(i,3)),t.setAttribute("color",new ot(r,3)),t.setIndex(a),t.userData={length:n,width:e,segments:Ei},t}function Ou(n,e,t,i){const r=ix(e,t),s=new Tn({vertexColors:!0,side:yt,transparent:!1,opacity:1,depthWrite:!0,forceSinglePass:!0,toneMapped:!1}),o=new Ve(r,s);return o.name=n,o.userData={length:e,width:t,phase:i,direction:new V},{mesh:o,origin:new V,length:e,width:t,phase:i,direction:qd.clone()}}function pa(n,e,t,i){const r=n.mesh.geometry.getAttribute("position");n.direction.copy(e),n.mesh.userData.direction.copy(n.direction);for(let o=0;o<=Ei;o+=1){const a=o/Ei,l=n.width*(1-a*.76),c=i?0:Math.sin(t*5.4+n.phase+a*3.2)*.055*a,u=i?0:Math.cos(t*4.1+n.phase+a)*.035*a,d=n.origin.x+e.x*n.length*a-e.z*c,h=n.origin.y+u,m=n.origin.z+e.z*n.length*a+e.x*c;r.setXYZ(o*2,d,h+l,m),r.setXYZ(o*2+1,d,h-l,m)}r.needsUpdate=!0,n.mesh.geometry.computeBoundingSphere()}function rx(n,e,t){const i=[],r=[],s=[],o=Array.isArray(t)?t:[];for(let p=0;p<o.length;p+=1){o[p];const f=new Jt(.035,.055,3,5),x=new Tn({color:5131331,toneMapped:!1}),M=new Ve(f,x);M.name=`wind-flag-land-mast-${p}`,n.add(M),s.push(M),i.push(f,x);const _=Ou(`wind-flag-land-${p}`,Jv,ex,p*1.7);n.add(_.mesh),r.push(_),i.push(_.mesh.geometry,_.mesh.material)}const a=Ou("wind-flag-vessel-masthead",Qv,tx,4.7);n.add(a.mesh),r.push(a),i.push(a.mesh.geometry,a.mesh.material);let l=0,c=!1,u=!1;const d=new V,h=new V,m=()=>{for(let p=0;p<o.length;p+=1){const f=o[p],x=s[p],M=r[p],_=_n(f?.x),b=_n(f?.y),T=_n(f?.z);x.position.set(_,b+1.5,T),M.origin.set(_,b+3,T)}},g=(p,f,x)=>{if(u)return;Math.min(nx,Math.max(0,_n(x)))>0&&(l=_n(f,l)),m();const _=yr(_n(f));d.set(_.x,0,_.z);const b=Fu(d.x,d.z);for(let R=0;R<o.length;R+=1)pa(r[R],b,l,c);e.updateMatrixWorld(!0),h.copy(jv),e.localToWorld(h),a.origin.copy(h);const T=Vc(_,_n(p?.velocityX),_n(p?.velocityZ)),C=Math.hypot(T.x,T.z)<1e-6?a.direction:Fu(T.x,T.z);pa(a,C,l,c)};return{update:g,reset:()=>{u||(l=0,m(),g({velocityX:0,velocityZ:0},0,0))},setReducedMotion:p=>{if(!u){c=p===!0;for(const f of r)pa(f,f.direction,l,c)}},dispose:()=>{if(!u){u=!0;for(const p of s)p.removeFromParent(),p.geometry.dispose(),p.material.dispose();for(const p of r)p.mesh.removeFromParent(),p.mesh.geometry.dispose(),p.mesh.material.dispose();i.length=0}}}}const kn=10,Yd=100,sx=80,ox=.98,Bu=.2,ns=5,Zd=ns*2,zu=.3,ax=1.1,cx=.04,ku=po*Gt.maxWaveScale,lx=Math.hypot(Ft.directionX,Ft.directionZ),ux=Yd*3,dx=Yd;function Gn(n,e){return Number.isFinite(n)?n:e}function is(n,e,t){return Math.min(t,Math.max(e,n))}function Hu(n,e,t){const i=is((t-n)/Math.max(e-n,1e-6),0,1);return i*i*(3-2*i)}function hx(n,e,t,i,r=0){if(!Number.isFinite(t))return 0;const s=is((Ft.directionX*Gn(n,0)+Ft.directionZ*Gn(e,0))/lx,0,1),o=Hu(-.15,.7,t),a=.6+.4*Hu(-.2,1,Gn(i,0)),l=1+.25*is(Gn(r,0),0,1);return is(o*a*s*l,0,1)}function $d(n){return Math.max(.1,Gn(n?.landCollisionRadius,1))*ox}function fx(n,e){const i=((e%kn+kn)%kn+.5)*Math.PI*2/kn,r=Math.sin(i),s=Math.cos(i),o=s,a=-r,c=$d(n)*Math.cos(Math.PI/kn),u=Gn(n.position?.x,0)+r*(c+Bu),d=Gn(n.position?.z,0)+s*(c+Bu);return{x:u,z:d,normalX:r,normalZ:s,tangentX:o,tangentZ:a}}function px(){const n=new Uint16Array(sx*3);let e=0;for(let t=0;t<kn;t+=1){const i=t*Zd;for(let r=0;r<ns-1;r+=1){const s=i+r*2,o=s+2;n[e++]=s,n[e++]=o,n[e++]=s+1,n[e++]=o,n[e++]=o+1,n[e++]=s+1}}return n}function mx(n,e){const t=new Float32Array(ux),i=new Float32Array(dx),r=new pt;r.setAttribute("position",new ot(t,3).setUsage(jt)),r.setAttribute("aAlpha",new ot(i,1).setUsage(jt)),r.setIndex(new ot(px(),1));const s=new Rn({uniforms:{color:{value:new Xe(16055287)}},vertexShader:"attribute float aAlpha; varying float vAlpha; void main(){vAlpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`uniform vec3 color; varying float vAlpha; void main(){gl_FragColor=vec4(color,vAlpha);
#include <tonemapping_fragment>
#include <colorspace_fragment>}`,transparent:!0,depthWrite:!1,depthTest:!0,side:yt,forceSinglePass:!0}),o=new Ve(r,s);o.name="phase-fifteen-shoreline-foam",o.frustumCulled=!1,n.add(o);const a=e[0];o.visible=!!a;const l=a?Array.from({length:kn},(v,p)=>fx(a,p)):[],c=a?Math.max(.04,$d(a)*Math.sin(Math.PI/kn)-.18):0;let u=!1,d=!1,h=0;const m=(v,p)=>{if(!(!a||u)){for(let f=0;f<kn;f+=1){const x=l[f]??null,M=x?mr(x.x,x.z,v):null,_=x?p?hc(x.x,x.z,p):Vn(x.x,x.z,v):0,b=x&&x.normalX*Math.SQRT1_2+x.normalZ*Math.SQRT1_2>.95?0:1,T=x&&M?hx(x.normalX,x.normalZ,_,M.velocityY,M.stormIntensity)*b:0,C=zu+(ax-zu)*T;for(let R=0;R<ns;R+=1){const E=(R/(ns-1)*2-1)*c,y=Math.sin(Math.PI*R/(ns-1));for(let w=0;w<2;w+=1){const D=f*Zd+R*2+w,L=w*C,U=x?x.x+x.tangentX*E+x.normalX*L:0,F=x?x.z+x.tangentZ*E+x.normalZ*L:0;t[D*3]=U,t[D*3+1]=x?is(Gn(p?hc(U,F,p):Vn(U,F,v),0),-ku,ku)+cx:0,t[D*3+2]=F,i[D]=Math.min(.6,T*y*(.76+w*.08))}}}r.getAttribute("position").needsUpdate=!0,r.getAttribute("aAlpha").needsUpdate=!0}},g=()=>{d||(h=0,m(0))};return g(),{mesh:o,update:(v,p)=>{d||(h=Gn(v,h),m(u?0:h,u?void 0:p))},reset:g,setReducedMotion:v=>{d||(u=v,o.visible=!!a&&!u,u?(i.fill(0),r.getAttribute("aAlpha").needsUpdate=!0):m(h))},dispose:()=>{d||(d=!0,n.remove(o),r.dispose(),s.dispose())}}}const sn=1e-7,ma=.28,Vu=20;function rs(n){return typeof n=="number"&&Number.isFinite(n)}function gx(n){return rs(n?.x)&&rs(n?.z)}function cr(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Fn(n,e,t){return{ok:!1,islandId:n,reason:e,message:t}}function _x(n,e,t){return Math.min(t,Math.max(e,n))}function vx(n,e,t){const i=t.x-e.x,r=t.z-e.z,s=i*i+r*r;if(s<=sn)return cr(n,e);const o=_x(((n.x-e.x)*i+(n.z-e.z)*r)/s,0,1);return Math.hypot(n.x-(e.x+i*o),n.z-(e.z+r*o))}function ss(n,e,t){const i=e-t;return n.x>=-i-sn&&n.x<=i+sn&&n.z>=-i-sn&&n.z<=i+sn}function xx(n,e,t,i,r){if(!ss(n,i,r)||!ss(e,i,r))return!1;for(const s of t){const o=s.radius+r;if(vx(s.center,n,e)<o-sn)return!1}return!0}function Mx(n){let e=0;for(let t=1;t<n.length;t+=1)e+=cr(n[t-1],n[t]);return e}function Gu(n){return`${n.x.toFixed(5)}:${n.z.toFixed(5)}`}function Sx(n,e,t,i,r=i?.vesselClearance){const s=t.find(L=>L.id===e);if(!s)return Fn(e,"unknown-island",`Unknown island "${e}".`);if(!gx(n))return Fn(e,"invalid-start","The vessel position is not finite.");const o=i?.worldLimit,a=r;if(!rs(o)||o<=0||!rs(a)||a<0||a>=o)return Fn(e,"invalid-bounds","Navigation bounds must be finite and leave room for the vessel.");if(!ss(n,o,a))return Fn(e,"invalid-start","The vessel is outside the navigable water bounds.");const l=t.map(L=>({center:{x:L.position.x,z:L.position.z},radius:L.landCollisionRadius})),c=t.findIndex(L=>L.id===e),u=s.landCollisionRadius+a,d=s.dockingTriggerRadius-u;if(!rs(d)||d<=ma*2)return Fn(e,"target-annulus-too-small","There is not enough safe water inside the docking zone.");if(cr(n,l[c].center)<u-sn)return Fn(e,"start-in-obstacle","The vessel starts inside an island clearance envelope.");const m=l[c].center,g=n.x-m.x,v=n.z-m.z,p=Math.hypot(g,v),f=u+Math.min(ma,d*.34),x=p>sn?g/p:1,M=p>sn?v/p:0,_={x:m.x+x*f,z:m.z+M*f};if(!ss(_,o,a))return Fn(e,"target-out-of-bounds","The docking point is outside the navigable water bounds.");const b=[{point:{x:n.x,z:n.z},obstacleIndex:null},{point:_,obstacleIndex:null}],T=new Set(b.map(L=>Gu(L.point)));t.forEach((L,U)=>{const F=L.landCollisionRadius+a+ma;for(let B=0;B<Vu;B+=1){const Y=B/Vu*Math.PI*2,k={x:L.position.x+Math.cos(Y)*F,z:L.position.z+Math.sin(Y)*F};if(!ss(k,o,a)||t.some((O,ie)=>ie===U?!1:cr(k,{x:O.position.x,z:O.position.z})<O.landCollisionRadius+a-sn))continue;const se=Gu(k);T.has(se)||(T.add(se),b.push({point:k,obstacleIndex:U}))}});const C=b.map(()=>[]);for(let L=0;L<b.length;L+=1)for(let U=L+1;U<b.length;U+=1){if(!xx(b[L].point,b[U].point,l,o,a))continue;const F=cr(b[L].point,b[U].point);C[L].push({to:U,cost:F}),C[U].push({to:L,cost:F})}const R=b.map(()=>Number.POSITIVE_INFINITY),E=b.map(()=>-1),y=b.map(()=>!1);R[0]=0;for(let L=0;L<b.length;L+=1){let U=-1,F=Number.POSITIVE_INFINITY;for(let B=0;B<b.length;B+=1)!y[B]&&R[B]<F&&(F=R[B],U=B);if(U<0||!Number.isFinite(F)||(y[U]=!0,U===1))break;for(const B of C[U]){const Y=F+B.cost;Y<R[B.to]-sn&&(R[B.to]=Y,E[B.to]=U)}}if(!Number.isFinite(R[1]))return Fn(e,"no-safe-route","No bounded safe route to the docking zone could be found.");const w=[];for(let L=1;L>=0&&(w.push(b[L].point),L!==0);L=E[L])if(E[L]<0)return Fn(e,"no-safe-route","The safe route graph is disconnected.");w.reverse();const D=w.filter((L,U)=>U===0||cr(L,w[U-1])>sn);return{ok:!0,islandId:e,points:D,target:_,distance:Mx(D),clearance:a}}const Wu=.8,Xu=12,yx=16,Ex=60,Kd=1e-7,bx=.01;function ii(n){return typeof n=="number"&&Number.isFinite(n)}function Er(n,e,t){return Math.min(t,Math.max(e,n))}function ds(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function Tx(n,e){return ds(e-n)}function Gc(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Ax(n){let e=0;for(let t=1;t<n.length;t+=1)e+=Gc(n[t-1],n[t]);return e}function fc(n){return{x:n.x,z:n.z}}function jd(n){return{x:ii(n?.x)?n.x:0,z:ii(n?.z)?n.z:0,heading:ds(ii(n?.heading)?n.heading:0)}}function wx(n){return{...jd(n),status:"idle",islandId:null,route:[],elapsed:0,duration:0,travelledDistance:0,totalDistance:0,velocityX:0,velocityZ:0,reason:null}}function rr(n={x:0,z:0,heading:0}){return wx(n)}function oo(n,e,t){return{...n,status:e,reason:t,velocityX:0,velocityZ:0}}function Rx(n,e){if(n.length===0)return{point:{x:0,z:0},heading:0};if(n.length===1)return{point:fc(n[0]),heading:0};let t=Math.max(0,e);for(let s=1;s<n.length;s+=1){const o=n[s-1],a=n[s],l=Gc(o,a);if(t<=l||s===n.length-1){const c=l>Kd?Er(t/l,0,1):1;return{point:{x:o.x+(a.x-o.x)*c,z:o.z+(a.z-o.z)*c},heading:Math.atan2(a.x-o.x,a.z-o.z)}}t-=l}const i=n[n.length-1],r=n[n.length-2];return{point:fc(i),heading:Math.atan2(i.x-r.x,i.z-r.z)}}function Cx(n){const e=Er(n,0,1);return e*e*(3-2*e)}function Px(n,e,t={}){const i=n??rr(),r=e?.route,s=Array.isArray(r)&&r.every(h=>ii(h?.x)&&ii(h?.z)),o=s?r.map(fc):[];if(!e?.islandId||!s||o.length===0)return oo({...i,islandId:e?.islandId??null,route:o},"failed","Scanner route is empty or invalid.");if(Gc(i,o[0])>bx)return oo({...i,islandId:e.islandId,route:o},"failed","Scanner route does not start at the vessel position.");const a=Ax(o);if(a<=Kd)return oo({...i,islandId:e.islandId,route:o,x:o[o.length-1].x,z:o[o.length-1].z},"arrived",null);const l=ii(t.maxSpeed)&&t.maxSpeed>0?t.maxSpeed:yx,c=Er(a/l,Wu,Xu),u=ii(t.duration)&&t.duration>0?Er(t.duration,Wu,Xu):c,d=jd(i);return{...i,...d,x:o[0].x,z:o[0].z,heading:ds(d.heading),status:"active",islandId:e.islandId,route:o,elapsed:0,duration:u,travelledDistance:0,totalDistance:a,velocityX:0,velocityZ:0,reason:null}}function Ix(n,e="Scanner cancelled by user."){return oo({...n},"cancelled",e)}function qu(n,e){if(!n||n.status!=="active")return n;const t=ii(e)?Er(e,0,Ex):0,i=Math.min(n.duration,n.elapsed+t),r=n.duration>0?i/n.duration:1,s=Cx(r),o=n.totalDistance*s,a=Rx(n.route,o),l={x:n.x,z:n.z},c=t>0?(a.point.x-l.x)/t:0,u=t>0?(a.point.z-l.z)/t:0,d=r>=1?1:Er(t*5.5,0,1),h=ds(n.heading+Tx(n.heading,a.heading)*d);return r>=1-Number.EPSILON?{...n,x:n.route[n.route.length-1].x,z:n.route[n.route.length-1].z,heading:ds(a.heading),elapsed:n.duration,travelledDistance:n.totalDistance,status:"arrived",velocityX:0,velocityZ:0,reason:null}:{...n,x:a.point.x,z:a.point.z,heading:h,elapsed:i,travelledDistance:o,velocityX:c,velocityZ:u}}function _i(n){return n.status==="active"}const tr=[.012,.16,.23],ga=[.018,.31,.4],_a=[.045,.43,.5],Yu=[.34,.58,.56],Zu=[.007,.02,.045],Lx=[.016,.055,.085],Dx=[.055,.12,.16],Ux=[.28,.34,.36];function Nx(n){const e=zd(),t=e.length*e.length,i=new Float32Array(t*3),r=new Float32Array(t*3),s=[],o=[];let a=0;for(let f=0;f<e.length;f+=1)for(let x=0;x<e.length;x+=1){const M=e[x],_=e[f];o.push([M,_]),i[a*3]=M,i[a*3+1]=0,i[a*3+2]=_,a+=1}const l=e.length;for(let f=0;f<l-1;f+=1)for(let x=0;x<l-1;x+=1){const M=f*l+x,_=M+1,b=M+l,T=b+1;kd(f,x)?s.push(M,b,_,_,b,T):s.push(M,b,T,M,T,_)}const c=new pt,u=new ot(i,3),d=new ot(r,3);u.setUsage(jt),d.setUsage(jt),c.setAttribute("position",u),c.setAttribute("color",d),c.setIndex(s),c.computeVertexNormals();const h=new rn({color:16777215,roughness:.5,metalness:.08,flatShading:!0,vertexColors:!0}),m=new Ve(c,h);m.name="phase-one-water-field",n.add(m);const g=Fx(i);n.add(g.mesh);let v=!1;const p=f=>{if(v)return;const x=Number.isFinite(f)?f:0,M=c.getAttribute("position"),_=c.getAttribute("color");for(let b=0;b<o.length;b+=1){const[T,C]=o[b],R=mr(T,C,x);M.setY(b,R.height),Bx(_,b,R.height,R.slopeX,R.slopeZ,R.stormIntensity)}M.needsUpdate=!0,_.needsUpdate=!0,g.update(x)};return p(0),{mesh:m,crestMesh:g.mesh,update:p,dispose:()=>{v||(v=!0,c.dispose(),h.dispose(),m.removeFromParent(),g.dispose())}}}function Fx(n){const e=Ft.directionX,t=Ft.directionZ,i=-t,r=e,s=1/(e*e+t*t),o=1/(i*i+r*r),a=ln.outerLimit*(Math.abs(i)+Math.abs(r)),l=ln.outerLimit*(Math.abs(e)+Math.abs(t)),c=Math.PI*.5-Ft.phase,u=Math.ceil((-l*Ft.waveNumber-c)/(Math.PI*2))-1,d=Math.floor((l*Ft.waveNumber-c)/(Math.PI*2))+1,h=Math.PI*2/Ft.waveNumber,m=(c+u*Math.PI*2)/Ft.waveNumber,g=(d-u+1)*h,v=[];for(let L=u;L<=d;L+=1){let U=0,F=-a+nr(L+821,431)*44;for(;F<=a;)v.push({normalIndex:L,normalOffset:(nr(L*43+U*23+149,L*11+U*37+337)-.5)*h*.9,tangentCenter:F,activity:nr(L*31+U*17+401,L*13+U*7+911),halfLength:3+nr(L*37+U*13+211,L*7+U*31+263)*2.5,halfWidth:.18+nr(L*41+U*17+307,L*5+U*43+359)*.16}),F+=32+nr(L*19+U*29+71,L*23+U*11+173)*26,U+=1}const p=new Float32Array(v.length*4*3),f=new Float32Array(v.length*4),x=new Float32Array(v.length*4*2),M=[];for(let L=0;L<v.length;L+=1){const U=L*4;M.push(U,U+1,U+2,U,U+2,U+3),x[(U+0)*2]=0,x[(U+0)*2+1]=0,x[(U+1)*2]=1,x[(U+1)*2+1]=0,x[(U+2)*2]=1,x[(U+2)*2+1]=1,x[(U+3)*2]=0,x[(U+3)*2+1]=1}const _=new pt,b=new ot(p,3),T=new ot(f,1);b.setUsage(jt),T.setUsage(jt),_.setAttribute("position",b),_.setAttribute("crestOpacity",T),_.setAttribute("crestUv",new ot(x,2)),_.setIndex(M);const C=new Rn({transparent:!0,depthWrite:!1,side:yt,toneMapped:!1,uniforms:{},vertexShader:`
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
    `}),R=new Ve(_,C);R.name="phase-one-water-crest-ribbons";const E=new Float64Array(9),y={x:0,z:0,support:0};let w=!1;const D=L=>{if(w)return;const U=Number.isFinite(L)?L:0,F=U*Ft.angularSpeed/Ft.waveNumber;for(let B=0;B<v.length;B+=1){const Y=v[B],k=(c+Y.normalIndex*Math.PI*2)/Ft.waveNumber+Y.normalOffset,se=m+zx(k-F-m,g),O=Y.tangentCenter,ie=e*se*s+i*O*o,oe=t*se*s+r*O*o,Ce=Y.activity>.48;y.x=ie,y.z=oe,y.support=0;const Se=Ce?Ox(ie,oe,e,t,U,E,y):y,z=Se.x,re=Se.z,le=Jd(z,re),be=Se.support*(.3+le*.18),Ae=i*Y.halfLength,X=r*Y.halfLength,me=e*Y.halfWidth,ue=t*Y.halfWidth,I=B*4;js(b,I,z-Ae-me,re-X-ue,n),js(b,I+1,z+Ae-me,re+X-ue,n),js(b,I+2,z+Ae+me,re+X+ue,n),js(b,I+3,z-Ae+me,re-X+ue,n),T.setX(I,be),T.setX(I+1,be),T.setX(I+2,be),T.setX(I+3,be)}b.needsUpdate=!0,T.needsUpdate=!0};return D(0),{mesh:R,update:D,dispose:()=>{w||(w=!0,_.dispose(),C.dispose(),R.removeFromParent())}}}function js(n,e,t,i,r){const s=Jd(t,i);n.setXYZ(e,t,hc(t,i,r)+.045+s*.018,i)}function Ox(n,e,t,i,r,s,o){let c=0;for(let p=0;p<s.length;p+=1){const f=p*1.5-6;s[p]=Lt(n+t*f,e+i*f,r),s[p]>s[c]&&(c=p)}let u=0;if(c>0&&c<s.length-1){const p=s[c-1]-2*s[c]+s[c+1];p<-1e-5&&(u=Math.max(-.5,Math.min(.5,.5*(s[c-1]-s[c+1])/p)))}const d=(c+u)*1.5-6;o.x=n+t*d,o.z=e+i*d;const h=Lt(o.x,o.z,r),m=Lt(o.x-t*3.5,o.z-i*3.5,r),g=Lt(o.x+t*3.5,o.z+i*3.5,r),v=h-Math.max(m,g);return o.support=ti(.025,.19,v)*(1-ti(3.5,6,Math.abs(d)))*ti(0,.4,h),o}function Bx(n,e,t,i,r,s=0){const o=Math.min(1,Math.max(0,s)),a=1+o*(Gt.maxWaveScale-1),l=(t+po*a)/(po*2*a),c=ti(.1,.52,l),u=ti(.6,.9,l)*.52,d=Math.min(1,Math.hypot(i,r)*2.8),h=ti(.76,.96,l)*ti(.24,.5,d)*.16,m=tr[0]+(ga[0]-tr[0])*c,g=tr[1]+(ga[1]-tr[1])*c,v=tr[2]+(ga[2]-tr[2])*c,p=m+(_a[0]-m)*u,f=g+(_a[1]-g)*u,x=v+(_a[2]-v)*u,M=Math.min(.3,h+o*ti(.38,.78,d)*.06);for(let _=0;_<3;_+=1){const b=Zu[_]+(Lx[_]-Zu[_])*c,T=b+(Dx[_]-b)*u,C=_===0?p:_===1?f:x,R=C+(T-C)*o,E=Yu[_]+(Ux[_]-Yu[_])*o;n.array[e*3+_]=R+(E-R)*M}}function Jd(n,e){return Math.min(1,Math.max(0,So(n,e).intensity))}function ti(n,e,t){const i=Math.min(1,Math.max(0,(t-n)/(e-n)));return i*i*(3-2*i)}function nr(n,e){const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function zx(n,e){return(n%e+e)%e}const $u=1.75,vi=1/120,kx=.1,Ku=12;function Hx(n,e={}){const t=e.reducedMotion??(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches),i=new Zf;i.background=new Xe(536381),i.fog=new Nc(536381,540,800);const r=ov(),s=r.camera,o=new X_({antialias:!0,powerPreference:"high-performance"});o.setPixelRatio(Math.min(window.devicePixelRatio||1,$u)),o.setClearColor(536381,1),o.outputColorSpace=Kt,o.toneMapping=cd,o.toneMappingExposure=1.12,o.shadowMap.enabled=!1,o.domElement.setAttribute("aria-label","Animated isometric water field"),o.domElement.style.display="block",o.domElement.style.width="100%",o.domElement.style.height="100%",o.domElement.style.touchAction="none",n.appendChild(o.domElement);const a=Nx(i),l=K_(i,e.islands??[]),c=mx(i,(e.islands??[]).filter(q=>q.id==="island-projects")),u=a.mesh.geometry.getAttribute("position").array,d=Dv(i),h=Wv(i),m=Kv(i),g=rx(i,d.group,l.windFlagAnchors);let v=!!t;d.setReducedMotion(v),h.setReducedMotion(v),m.setReducedMotion(v),g.setReducedMotion(v),c.setReducedMotion(v),c.update(0,u);let p=!1,x=vu(sr.x,sr.z),M={throttle:0,rudder:0,brake:!1},_=cu();const b={worldLimit:Gt.worldLimit,obstacles:(e.islands??[]).map(q=>({x:q.position.x,z:q.position.z,radius:q.landCollisionRadius}))};let T=rr({x:x.x,z:x.z,heading:x.heading}),C={status:"idle",islandId:null};const R=()=>{const q=_i(T),te=M.brake||p,ee=pn(x,_.sailAngle,te?1:0),ge=q?ee.suggestedAngle:_.sailAngle,Z=q?pn(x,ge):ee,he=pn(x,ee.suggestedAngle).power;return{sailAngle:ge,suggestedAngle:Z.suggestedAngle,signedSailAngle:Z.signedAngle,relativeWindAngle:Z.relativeWindAngle,power:Z.power,noGo:Z.noGo,windSpeed:Vc(yr(),x.velocityX,x.velocityZ).speed,luffing:te,moored:p,assisted:q,trimMode:_.mode,trimEngaged:_.engaged,trimEfficiency:he>1e-6?Ma(Z.power/he,0,1):0,sweetSpot:!q&&!te&&!Z.noGo&&_.sweetSpot,trimBoost:q||te||Z.noGo?0:_.boost,boostSerial:_.boostSerial}},E=(q=!1)=>{const te=R();d.setSailLoad(te.power,te.relativeWindAngle),d.setSailAngle(te.signedSailAngle,q),e.onSailingUpdate?.(te)},y=(q,te,ee)=>{C=ee===void 0?{status:q,islandId:te}:{status:q,islandId:te,message:ee},e.onScanUpdate?.(C)},w=()=>{h.reset(),m.reset(),E(!0),d.resetPose(x,Se),g.update(x,Se,0),r.snapTo(x.x,x.z),a.update(Se),c.update(Se,u),e.onVesselUpdate?.(Qs(x)),e.onLandmarkProjection?.(Js(s,va(n),xa(n),l.anchors,e.framingInsets)),o.render(i,s)},D=q=>{T=q,q.status==="arrived"&&(p=!0),x={x:q.x,z:q.z,velocityX:q.velocityX,velocityZ:q.velocityZ,heading:q.heading,yawRate:0}},L=q=>{const te=q.status==="active"?"travelling":q.status;y(te,q.islandId,q.reason??void 0)},U=q=>{_i(T)&&(D(Ix(T,q)),L(T))},F=q=>{if(!_i(T))return;const te=T.status;D(qu(T,q)),T.status!==te&&L(T)};i.add(new rp(10999760,471872,1.65));const B=new Il(16769723,2.35);B.position.set(-55,80,42),i.add(B);const Y=new Il(6209481,.48);Y.position.set(75,42,-65),i.add(Y);let k=!1,se=t,O=typeof document<"u"?document.hidden:!1,ie=!0,oe=null,Ce=0,Se=0,z=0;const re=()=>se||O||!ie,le=q=>{if(k)return;Ce||(Ce=q);const te=Math.min(Math.max(0,(q-Ce)/1e3),kx);if(Ce=q,!re()){z=Math.min(z+te,vi*Ku);let ee=0;for(;z+1e-9>=vi&&ee<Ku;)_i(T)?F(vi):p||(_=lu(_,x,{sheet:M.sheet??0,engage:M.targetHeading!==void 0||Math.abs(M.rudder)>1e-6,resumeAuto:!1,suppressed:M.brake},vi),x=yv(x,{...M,sailAngle:_.sailAngle,trimBoost:_.boost},vi,b,v?void 0:Se)),Se+=vi,z=Math.max(0,z-vi),ee+=1;r.update(x.x,x.z,te),E(),d.update(x,Se,te),g.update(x,Se,te),h.setTrimBoost(_i(T)||p?0:_.boost),h.update(x,Se,te),_i(T)||p?m.reset():m.update(d.getWaterContact(),Se,te),e.onVesselUpdate?.(Qs(x))}if(e.onLandmarkProjection?.(Js(s,va(n),xa(n),l.anchors,e.framingInsets)),a.update(Se),c.update(Se,u),o.render(i,s),re()){oe=null;return}oe=window.requestAnimationFrame(le)},be=()=>{k||oe!==null||(Ce=0,oe=window.requestAnimationFrame(le))},Ae=()=>{oe!==null&&(window.cancelAnimationFrame(oe),oe=null)},X=()=>{if(k)return;const q=Math.max(1,n.clientWidth||window.innerWidth),te=Math.max(1,n.clientHeight||window.innerHeight);r.resize(q,te),o.setPixelRatio(Math.min(window.devicePixelRatio||1,$u)),o.setSize(q,te,!1),e.onLandmarkProjection?.(Js(s,q,te,l.anchors,e.framingInsets)),re()&&o.render(i,s)},me=q=>{k||(q&&U("Scanner navigation paused."),se=q,re()?(Ae(),z=0,Ce=0,M={throttle:0,rudder:0,brake:!1},_=Jn(_),h.setTrimBoost(0),m.reset(),o.render(i,s)):be(),e.onSailingUpdate?.(R()))},ue=()=>{O=document.hidden,re()?(Ae(),z=0,Ce=0,M={throttle:0,rudder:0,brake:!1},_=Jn(_),h.setTrimBoost(0),m.reset(),o.render(i,s)):be()},I=typeof IntersectionObserver<"u"?new IntersectionObserver(q=>{ie=q[0]?.isIntersecting??!0,re()?(Ae(),z=0,Ce=0,M={throttle:0,rudder:0,brake:!1},_=Jn(_),h.setTrimBoost(0),m.reset(),o.render(i,s)):be()},{threshold:.01}):null,ye=typeof ResizeObserver<"u"?new ResizeObserver(X):null;return X(),E(!0),d.resetPose(x,Se),g.update(x,Se,0),r.snapTo(x.x,x.z),e.onVesselUpdate?.(Qs(x)),e.onScanUpdate?.(C),ye?.observe(n),window.addEventListener("resize",X),I?.observe(n),document.addEventListener("visibilitychange",ue),re()?o.render(i,s):be(),{setPaused:me,setReducedMotion:q=>{k||(v=q,d.setReducedMotion(q),h.setReducedMotion(q),m.setReducedMotion(q),g.setReducedMotion(q),c.setReducedMotion(q),c.update(Se,u),g.update(x,Se,0),re()&&o.render(i,s))},setInput:q=>{if(k)return;const te={throttle:0,sheet:Ma(q.sheet??0,-1,1),rudder:Ma(q.rudder,-1,1),brake:!!q.brake,targetHeading:Number.isFinite(q.targetHeading)?q.targetHeading:void 0};(te.targetHeading!==void 0||Math.abs(te.sheet)>1e-6||Math.abs(te.rudder)>1e-6||te.brake)&&(p=!1,U("Scanner navigation cancelled by helm input."),T.status==="arrived"&&(T=rr({x:x.x,z:x.z,heading:x.heading}),L(T))),M=te,te.brake&&(_=Jn(_),h.setTrimBoost(0),m.reset()),e.onSailingUpdate?.(R())},setAutoTrim:()=>{k||re()||(M={throttle:0,rudder:0,brake:!1},p=!1,U("Scanner navigation cancelled by helm input."),T.status==="arrived"&&(T=rr({x:x.x,z:x.z,heading:x.heading}),L(T)),_=lu(Jn(_),x,{sheet:0,engage:!0,resumeAuto:!0,suppressed:!1},0),e.onSailingUpdate?.(R()))},resetVessel:()=>{k||(h.reset(),m.reset(),g.reset(),c.reset(),p=!1,x=vu(sr.x,sr.z),T=rr({x:x.x,z:x.z,heading:x.heading}),L(T),M={throttle:0,rudder:0,brake:!1},_=Jn(_),h.setTrimBoost(0),z=0,Ce=0,Se=0,_=cu(),E(!0),d.resetPose(x,Se),g.update(x,Se,0),r.snapTo(x.x,x.z),a.update(Se),c.update(Se,u),e.onVesselUpdate?.(Qs(x)),e.onLandmarkProjection?.(Js(s,va(n),xa(n),l.anchors,e.framingInsets)),o.render(i,s))},getVesselState:()=>({...x}),getSailingState:R,startScan:(q,te={})=>{if(k)return;const ee=Sx({x:x.x,z:x.z},q,e.islands??[],{worldLimit:Gt.worldLimit,vesselClearance:je.collisionRadius});if(!ee.ok){U("Scanner navigation replaced by an invalid route."),M={throttle:0,rudder:0,brake:!1},_=Jn(_),h.setTrimBoost(0),m.reset(),y("failed",q,ee.message);return}M={throttle:0,rudder:0,brake:!1},_=Jn(_),h.setTrimBoost(0),m.reset(),p=!1;const ge=rr({x:x.x,z:x.z,heading:x.heading});if(D(Px(ge,{islandId:q,route:ee.points})),!!te.instant||se){_i(T)&&D(qu(T,T.duration)),z=0,Ce=0,w(),L(T);return}L(T),be()},cancelScan:()=>{k||U("Scanner navigation cancelled.")},dispose:()=>{k||(k=!0,Ae(),ye?.disconnect(),window.removeEventListener("resize",X),I?.disconnect(),document.removeEventListener("visibilitychange",ue),l.dispose(),d.dispose(),h.dispose(),m.dispose(),g.dispose(),c.dispose(),r.dispose(),a.dispose(),o.dispose(),o.domElement.remove(),i.clear())}}}function Js(n,e,t,i,r){const s=Vx(e,t,r);return i.map(({id:o,position:a})=>{const l=a.clone().project(n),c=(l.x*.5+.5)*e,u=(1-(l.y*.5+.5))*t;return{id:o,x:c,y:u,visible:l.z>=-1&&l.z<=1&&c>=s.left&&c<=e-s.right&&u>=s.top&&u<=t-s.bottom}})}function Vx(n,e,t){const i=e<=460,r=n<=600?{top:140,right:20,bottom:68,left:20}:{top:160,right:28,bottom:70,left:28};return i&&(r.top=112),{top:Math.max(0,t?.top??r.top),right:Math.max(0,t?.right??r.right),bottom:Math.max(0,t?.bottom??r.bottom),left:Math.max(0,t?.left??r.left)}}function va(n){return Math.max(1,n.clientWidth||window.innerWidth)}function xa(n){return Math.max(1,n.clientHeight||window.innerHeight)}function Ma(n,e,t){return Math.min(t,Math.max(e,Number.isFinite(n)?n:0))}function Qs(n){return{x:n.x,z:n.z,heading:n.heading,speed:Math.hypot(n.velocityX,n.velocityZ)}}const ju={boost:0,serial:0,paused:!1,reducedMotion:!1},Gx=.75,Wx=.075,Xx=.012,qx=.05,Yx=.16,Ju=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0,Zx=()=>{const n=globalThis;return typeof n.AudioContext=="function"?n.AudioContext:typeof n.webkitAudioContext=="function"?n.webkitAudioContext:null};function $x(){let n=null,e=null,t=null,i=null,r=!1,s=!1,o=!1,a=!1,l=null,c=0,u=ju.serial,d=ju;const h=typeof document>"u"?null:document;a=!!h?.hidden;const m=()=>{a=!!h?.hidden,p()};h?.addEventListener("visibilitychange",m);const g=()=>{try{e?.stop()}catch{}try{e?.disconnect()}catch{}try{t?.disconnect()}catch{}try{i?.disconnect()}catch{}e=null,t=null,i=null},v=async()=>{const M=n;if(n=null,g(),!!M)try{await M.close()}catch{}},p=()=>{if(!n||!i||!t||r)return;const M=n.currentTime,_=Ju(d.boost),b=s&&!a&&!d.paused&&!d.reducedMotion&&_>0,T=M<c?1.35:1,C=b?Math.min(Wx,(Xx+qx*_)*T):0,R=560+_*980;i.gain.cancelScheduledValues(M),i.gain.setTargetAtTime(C,M,C>0?.065:.035),t.frequency.cancelScheduledValues(M),t.frequency.setTargetAtTime(R,M,.09)},f=M=>{const _=Number.isFinite(M.sampleRate)&&M.sampleRate>0?M.sampleRate:44100,b=Math.max(2048,Math.min(32768,Math.round(_*Gx))),T=M.createBuffer(1,b,_),C=T.getChannelData(0);let R=99539473;for(let D=0;D<C.length;D+=1)R=Math.imul(R,1664525)+1013904223>>>0,C[D]=R/4294967295*2-1;const E=M.createBufferSource();e=E,E.buffer=T,E.loop=!0;const y=M.createBiquadFilter();t=y,y.type="lowpass",y.frequency.value=560,y.Q.value=.45;const w=M.createGain();i=w,w.gain.value=0,E.connect(y),y.connect(w),w.connect(M.destination);try{E.start()}catch(D){throw g(),D}},x=async()=>{if(r)return!1;const M=Zx();if(!M)return!1;try{return n||(n=new M,f(n)),n.state==="suspended"&&await n.resume(),r||!o?(await v(),!1):(s=!0,p(),!0)}catch{return s=!1,await v(),!1}};return{setEnabled:M=>r?Promise.resolve(!1):M?(o=!0,l||(l=x().finally(()=>{l=null}),l)):(o=!1,s=!1,p(),Promise.resolve(!0)),update:M=>{if(r)return;const _=Ju(M.boost),b=Number.isFinite(M.serial)?M.serial:0;d={boost:_,serial:b,paused:!!M.paused,reducedMotion:!!M.reducedMotion},b!==u&&_>0&&!d.paused&&!d.reducedMotion&&(c=(n?.currentTime??0)+Yx),u=b,p()},dispose:()=>{r||(r=!0,o=!1,s=!1,h?.removeEventListener("visibilitychange",m),v())}}}const Qd=document.querySelector("#app");if(!Qd)throw new Error("The app mount point is missing.");const Di=window.matchMedia("(prefers-reduced-motion: reduce)");let Wt=Di.matches;const Cr=$x();let Ri=!1,gr=!0,Sa=0;Qd.innerHTML=`
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
`;const eh=document.querySelector("[data-scene-layer]"),Wc=document.querySelector("[data-landmark-layer]"),br=document.querySelector("[data-motion-toggle]"),yo=document.querySelector("[data-vessel-controls]"),Sn=document.querySelector("[data-sailing-hud]"),pc=document.querySelector("[data-wind-marker]"),mc=document.querySelector("[data-wind-direction]"),gc=document.querySelector("[data-wind-speed]"),_c=document.querySelector("[data-sail-angle]"),vc=document.querySelector("[data-suggested-trim]"),xc=document.querySelector("[data-trim-mode]"),Mc=document.querySelector("[data-trim-meter]"),Sc=document.querySelector("[data-trim-efficiency]"),yc=document.querySelector("[data-trim-sweetspot]"),Hn=document.querySelector("[data-sound-toggle]"),Ht=document.querySelector("[data-sailing-guidance]"),Qu=document.querySelector(".vessel-model-note"),th=document.querySelector("[data-webgl-fallback]"),nh=document.querySelector("[data-island-summary]"),ih=document.querySelector(".portfolio-shell");if(!eh||!Wc||!br||!yo||!Sn||!pc||!mc||!gc||!_c||!vc||!xc||!Mc||!Sc||!yc||!Hn||!Ht||!th||!nh||!ih)throw new Error("The portfolio shell is incomplete.");Mh(os,id);let Dt,ed=null;const mo=Ih({root:ih,islands:os,content:id,onScanRequest:n=>{Xn.releaseAll(),Dt?.startScan(n,{instant:Wt||Di.matches})},onExploreRequest:()=>{Xn.releaseAll()}}),rh=new Map,Xc=new Map,At={width:window.innerWidth,height:window.innerHeight};let lr=Sn.getBoundingClientRect();const sh=typeof ResizeObserver<"u"?new ResizeObserver(()=>{lr=Sn.getBoundingClientRect()}):null;sh?.observe(Sn);const oh=typeof ResizeObserver<"u"?new ResizeObserver(n=>{for(const e of n){const i=e.target.dataset.landmarkId;if(!i)continue;const r=Array.isArray(e.borderBoxSize)?e.borderBoxSize[0]:e.borderBoxSize,s=r?.inlineSize??e.contentRect.width,o=r?.blockSize??e.contentRect.height;s<=0||o<=0||Xc.set(i,{width:s,height:o})}}):null;for(const[n,e]of os.entries()){const t=document.createElement("div");t.className="landmark-label",t.dataset.landmarkId=e.id,t.setAttribute("role","listitem"),t.innerHTML=`
    <span class="landmark-label__name"></span>
    <span class="landmark-label__category"></span>
  `;const i=t.querySelector(".landmark-label__name"),r=t.querySelector(".landmark-label__category");if(!i||!r)throw new Error("The landmark label is incomplete.");i.textContent=e.name,r.textContent=`${nd(e.category)} · ${String(n+1).padStart(2,"0")}`,Wc.append(t),rh.set(e.id,t),Xc.set(e.id,{width:120,height:40}),oh?.observe(t);const s=document.createElement("li");s.textContent=`${e.name} — ${nd(e.category)}`,nh.append(s)}const qc=()=>{br.textContent=Wt?"Resume motion":"Pause motion",br.setAttribute("aria-pressed",String(Wt)),yo.setAttribute("aria-disabled",String(!Dt))};function Kx(n){if(!pc||!mc||!gc||!_c||!vc||!xc||!Mc||!Sc||!yc||!Sn||!Ht)return;const e=s=>Math.round(Math.abs(s)*180/Math.PI),t=14,i=-Math.sin(n.relativeWindAngle)*t,r=-Math.cos(n.relativeWindAngle)*t;pc.style.transform=`translate(calc(-50% + ${i}px), calc(-50% + ${r}px))`,mc.textContent=td(n.relativeWindAngle),gc.textContent=`${n.windSpeed.toFixed(0)} m/s`,Sn.setAttribute("aria-label",`Wind from ${td(n.relativeWindAngle)}, ${n.windSpeed.toFixed(0)} metres per second. Sail angle ${e(n.sailAngle)} degrees; suggested ${e(n.suggestedAngle)} degrees.`),_c.textContent=`${e(n.sailAngle)}°`,vc.textContent=`${e(n.suggestedAngle)}°`,xc.textContent=n.trimMode==="manual"?"Manual":"Auto",Mc.style.width=`${Math.round(Math.max(0,Math.min(1,n.trimEfficiency))*100)}%`,Sc.textContent=`${Math.round(n.trimEfficiency*100)}%`,yc.textContent=n.sweetSpot?" · Sweet spot":"",Sn.toggleAttribute("data-manual-trim",n.trimMode==="manual"),Cr.update({boost:n.trimBoost,serial:n.boostSerial,paused:Wt,reducedMotion:Di.matches}),Sn.toggleAttribute("data-no-go",n.noGo),Sn.toggleAttribute("data-luffing",n.luffing),n.assisted?Ht.textContent="Assisted passage: steer when you are ready to take the helm.":n.moored?Ht.textContent="Moored. Trim or steer to set sail.":n.luffing?Ht.textContent="Wind spilled. Release to catch the wind.":n.noGo?Ht.textContent="Into the wind. Turn left or right to tack.":n.trimMode==="auto"&&!n.trimEngaged?Ht.textContent="Auto trim ready. WASD or arrows to set sail.":n.trimMode==="auto"?Ht.textContent=`Auto trim ${Math.round(n.trimEfficiency*100)}% · Q/E for manual trim.`:n.trimBoost>.05?Ht.textContent="Sweet spot · speed surge!":n.sailAngle>n.suggestedAngle+.1?Ht.textContent="Trim in toward the suggested angle for more drive.":n.sailAngle<n.suggestedAngle-.1?Ht.textContent="Ease out toward the suggested angle for more drive.":n.power<.08?Ht.textContent="Turn across the wind to fill the sail.":n.sweetSpot?Ht.textContent="Sweet spot. Sail diagonally and tack to travel upwind.":Ht.textContent="Manual trim. Q/E adjusts the sail; M returns to auto."}function td(n){const e=(n*180/Math.PI+360)%360;return e<22.5||e>=337.5?"ahead":e<67.5?"port bow":e<112.5?"port":e<157.5?"port quarter":e<202.5?"astern":e<247.5?"starboard quarter":e<292.5?"starboard":"starboard bow"}const Xn=new Th({root:yo,onInput:n=>{Dt?.setInput(n)},onReset:()=>{Dt?.resetVessel(),mo.closeDrawer(!1),Cr.update({boost:0,serial:0,paused:Wt,reducedMotion:Di.matches})},onAutoTrim:()=>Dt?.setAutoTrim()}),Ec=()=>{Hn&&(Hn.textContent=gr?Ri?"♪ Sound on":"♪ Sound off":"♪ Sound unavailable",Hn.setAttribute("aria-pressed",String(Ri)),Hn.setAttribute("aria-label",gr?Ri?"Sound on":"Sound off":"Sound unavailable"),Hn.disabled=!gr)},ah=async()=>{if(!Hn||!gr)return;const n=++Sa,e=!Ri;Ri=e,Ec();try{const t=await Cr.setEnabled(e);if(n!==Sa)return;Ri=e&&t,gr=t||!e}catch{if(n!==Sa)return;gr=!1,Ri=!1}Ec()};Hn?.addEventListener("click",ah);const jx=n=>{for(const[e,t]of rh){const i=n.find(r=>r.id===e);if(!i||!i.visible||!Jx(i,Xc.get(e))){t.hidden=!0;continue}t.hidden=!1,t.style.transform=`translate3d(${i.x}px, ${i.y}px, 0) translate(-50%, 8px)`}};function Jx(n,e){const t=e?.width??120,i=e?.height??40,r=n.x-t*.5,s=n.y+8,o=r+t,a=s+i,l=Math.min(48,Math.max(16,At.width*.04));if(r<lr.right+6&&o>lr.left-6&&s<lr.bottom+6&&a>lr.top-6)return!1;const c=At.height<=460?110:At.width<=900?200:160,u=At.height<=460?105:155,d=At.width<=540?l:Math.max(l,At.width-l-Math.min(480,At.width-l*2));if(r<l||o>At.width-l||s<c||a>At.height-u)return!1;const h=32,m=At.width*.5-h,g=At.height*.5-h,v=At.width*.5+h,p=At.height*.5+h;if(r<v&&o>m&&s<p&&a>g)return!1;const x=At.height-u;return!(r<At.width-l&&o>d&&s<At.height&&a>x)}const ch=()=>{At.width=window.innerWidth,At.height=window.innerHeight,lr=Sn.getBoundingClientRect()};window.addEventListener("resize",ch);try{Dt=Hx(eh,{reducedMotion:Di.matches,islands:os,framingInsets:{top:145,right:20,bottom:155,left:20},onLandmarkProjection:jx,onVesselUpdate:n=>{const e=Ph({x:n.x,z:n.z},os,ed);ed=e?.id??null,mo.setProximity(e)},onSailingUpdate:Kx,onScanUpdate:n=>mo.setScanUpdate(n)}),Dt.setPaused(Wt),Xn.setEnabled(!Wt,!!Dt)}catch(n){console.warn("Unable to initialise the water scene.",n),Wc.hidden=!0,th.classList.remove("is-hidden"),br.disabled=!0,Xn.setEnabled(!1,!1),yo.hidden=!0,Qu&&(Qu.hidden=!0)}const Qx=()=>{Wt=!Wt,Xn.setEnabled(!Wt&&!!Dt,!!Dt),Dt?.setPaused(Wt),Cr.update({boost:0,serial:0,paused:Wt,reducedMotion:Di.matches}),qc()};br.addEventListener("click",Qx);const eM=n=>{if(n.key.toLowerCase()==="p"&&n.target===document.body){br.click();return}if(n.key.toLowerCase()!=="f"||n.repeat||n.altKey||n.ctrlKey||n.metaKey||n.target instanceof Element&&n.target.closest(".content-drawer, input, textarea, select, [contenteditable]"))return;const e=document.querySelector("[data-explore-action]");!document.querySelector(".content-drawer:not([hidden])")&&e&&!e.closest("[hidden]")&&(n.preventDefault(),e.click())};window.addEventListener("keydown",eM);const tM=n=>{Dt?.setReducedMotion(n.matches),n.matches&&(Wt=!0,Xn.setEnabled(!1,!!Dt),Dt?.setPaused(!0),Cr.update({boost:0,serial:0,paused:!0,reducedMotion:!0}),qc())};Di.addEventListener("change",tM);const nM=n=>{Xn.releaseAll(),n.persisted||(Xn.dispose(),Dt?.dispose(),mo.dispose(),Cr.dispose(),Hn?.removeEventListener("click",ah),oh?.disconnect(),sh?.disconnect(),window.removeEventListener("resize",ch))};window.addEventListener("pagehide",nM);const iM=()=>{Dt&&Xn.setEnabled(!Wt,!0)};window.addEventListener("pageshow",iM);function nd(n){return n.charAt(0).toUpperCase()+n.slice(1)}qc();Ec();
