(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Ru={resume:[{id:"resume-01",role:"Creative technologist",organisation:"Independent practice",period:"2024 — present",summary:"Placeholder for a role, practice, or collaboration."}],projects:[{id:"project-01",title:"A small digital shoreline",summary:"Placeholder for a project log and its short field note.",year:2025,link:"#"}],writing:[{id:"writing-01",title:"Notes from the weather line",publication:"Personal notebook",year:2025,excerpt:"Placeholder for a writing sample excerpt.",link:"#"}],media:[{id:"media-01",label:"Portfolio media placeholder",url:"#",kind:"image"}]},co=180,Ki={x:0,z:0},Cu=["resume","projects","writing","media"],Pu=["ridge","mesa","mound","twin-peaks"],Ud=/^#[0-9a-f]{6}$/i,qr=[{id:"island-resume",name:"Chartroom",category:"resume",position:{x:-26,z:-18},landCollisionRadius:7,dockingTriggerRadius:11,landform:"ridge",palette:{sand:"#d8c28d",land:"#7e9a73",rock:"#465d5d"},contentIds:["resume-01"],description:"A quiet chartroom for the route so far and the work behind it."},{id:"island-projects",name:"Shipyard",category:"projects",position:{x:16,z:-24},landCollisionRadius:6,dockingTriggerRadius:10,landform:"mesa",palette:{sand:"#d8b878",land:"#b86f4c",rock:"#704b44"},contentIds:["project-01"],description:"A working shipyard for experiments, builds, and field notes."},{id:"island-writing",name:"Logbook",category:"writing",position:{x:-18,z:26},landCollisionRadius:8,dockingTriggerRadius:12,landform:"twin-peaks",palette:{sand:"#dfcfaa",land:"#8e806f",rock:"#555968"},contentIds:["writing-01"],description:"A windward logbook for essays, observations, and unfinished thoughts."},{id:"island-media",name:"Signal Cove",category:"media",position:{x:24,z:20},landCollisionRadius:7,dockingTriggerRadius:11,landform:"mound",palette:{sand:"#cbbd98",land:"#5d8c87",rock:"#3f5964"},contentIds:["media-01"],description:"A sheltered cove for images, moving pictures, and sound."}];function kr(n){return typeof n=="object"&&n!==null}function Nd(n){return kr(n)}function Fd(n){return kr(n)&&typeof n.id=="string"&&n.id.length>0}function Od(n){return typeof n=="string"&&Cu.includes(n)}function Bd(n){return typeof n=="string"&&Pu.includes(n)}function rs(n){return typeof n=="number"&&Number.isFinite(n)}function _t(n,e){throw new Error(`Invalid island at index ${n}: ${e}`)}function zd(n,e){if(!Array.isArray(n))throw new Error("Invalid island definitions: expected an array");if(!kr(e))throw new Error("Invalid portfolio content: expected an object");const t=new Set,i=[];n.forEach((r,s)=>{Nd(r)||_t(s,"expected an object"),(typeof r.id!="string"||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))&&_t(s,"id must be a stable non-empty kebab-case string"),t.has(r.id)&&_t(s,`duplicate id "${r.id}"`),t.add(r.id),(typeof r.name!="string"||r.name.trim().length===0)&&_t(s,"name must be a non-empty string"),Od(r.category)||_t(s,`category must be one of ${Cu.join(", ")}`),Bd(r.landform)||_t(s,`landform must be one of ${Pu.join(", ")}`),(!kr(r.position)||!rs(r.position.x)||!rs(r.position.z))&&_t(s,"position.x and position.z must be finite numbers"),(!rs(r.landCollisionRadius)||r.landCollisionRadius<=0)&&_t(s,"landCollisionRadius must be a finite positive number"),(!rs(r.dockingTriggerRadius)||r.dockingTriggerRadius<=0)&&_t(s,"dockingTriggerRadius must be a finite positive number"),(Math.abs(r.position.x)+r.dockingTriggerRadius>co||Math.abs(r.position.z)+r.dockingTriggerRadius>co)&&_t(s,`docking zone must remain within ±${co} world units`),r.landCollisionRadius>=r.dockingTriggerRadius&&_t(s,"dockingTriggerRadius must be greater than landCollisionRadius"),kr(r.palette)||_t(s,"palette must contain sand, land, and rock colors");for(const u of["sand","land","rock"])(typeof r.palette[u]!="string"||!Ud.test(r.palette[u]))&&_t(s,`palette.${u} must be a six-digit hex color`);(!Array.isArray(r.contentIds)||r.contentIds.length===0)&&_t(s,"contentIds must contain at least one content ID"),(typeof r.description!="string"||r.description.trim().length===0)&&_t(s,"description must be a non-empty string");const o=e[r.category];Array.isArray(o)||_t(s,`portfolio content category "${r.category}" must be an array`);const a=new Set;o.forEach((u,h)=>{if(!Fd(u))throw new Error(`Invalid portfolio content at ${r.category}[${h}]: id must be a non-empty string`);if(a.has(u.id))throw new Error(`Invalid portfolio content at ${r.category}[${h}]: duplicate id "${u.id}"`);a.add(u.id)});const l=new Set;r.contentIds.forEach(u=>{(typeof u!="string"||u.length===0)&&_t(s,"contentIds must contain non-empty strings"),l.has(u)&&_t(s,`duplicate content ID "${u}"`),a.has(u)||_t(s,`content ID "${u}" is missing from category "${r.category}"`),l.add(u)}),i.push({index:s,island:r}),Math.hypot(r.position.x-Ki.x,r.position.z-Ki.z)<=r.dockingTriggerRadius&&_t(s,"docking zone must leave the vessel spawn point clear")});for(let r=0;r<i.length;r+=1)for(let s=r+1;s<i.length;s+=1){const o=i[r],a=i[s];if(Math.hypot(o.island.position.x-a.island.position.x,o.island.position.z-a.island.position.z)<=o.island.dockingTriggerRadius+a.island.dockingTriggerRadius)throw new Error(`Invalid island definitions: docking zones overlap for "${o.island.id}" and "${a.island.id}"`)}}const kd=["up","down","trimIn","trimOut","left","right","brake"],Hd=new Map([["w","up"],["arrowup","up"],["s","down"],["arrowdown","down"],["a","left"],["arrowleft","left"],["d","right"],["arrowright","right"],["q","trimIn"],["e","trimOut"],[" ","brake"]]),Vd={throttle:0,sheet:0,rudder:0,brake:!1};function Gd(n){const e=new Set(n),t=Number(e.has("right"))-Number(e.has("left")),i=Number(e.has("down"))-Number(e.has("up")),r=t||i?Math.atan2(t+i,i-t):void 0;return{throttle:0,sheet:e.has("trimIn")===e.has("trimOut")?0:e.has("trimIn")?-1:1,rudder:0,brake:e.has("brake"),...r===void 0?{}:{targetHeading:r}}}class Wd{root;onInput;onReset;onAutoTrim;buttons=new Map;resetButton;autoTrimButton;pressedKeys=new Map;pressedButtons=new Map;pointers=new Map;buttonHandlers=[];enabled=!0;resetEnabled=!0;disposed=!1;resetHeld=!1;lastInput={...Vd};constructor(e){this.root=e.root,this.onInput=e.onInput,this.onReset=e.onReset,this.onAutoTrim=e.onAutoTrim;for(const r of kd){const s=Array.from(this.root.querySelectorAll(`[data-vessel-control="${r}"]`));this.buttons.set(r,s);for(const o of s)this.bindButton(o,r)}this.root.addEventListener("pointerdown",this.onPointerDown),this.root.addEventListener("pointerup",this.onPointerUp),this.root.addEventListener("pointercancel",this.onPointerCancel),this.root.addEventListener("lostpointercapture",this.onLostPointerCapture),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),window.addEventListener("pagehide",this.onPageHide),document.addEventListener("visibilitychange",this.onVisibilityChange);const t=this.root.querySelector("[data-vessel-reset]");if(this.resetButton=t??void 0,t&&this.onReset){const r=()=>{this.releaseAll(),this.onReset?.()};t.addEventListener("click",r),this.buttonHandlers.push({button:t,type:"click",handler:r})}const i=this.root.querySelector("[data-vessel-auto-trim]");if(this.autoTrimButton=i??void 0,i&&this.onAutoTrim){const r=()=>{this.releaseAll(),this.onAutoTrim?.()};i.addEventListener("click",r),this.buttonHandlers.push({button:i,type:"click",handler:r})}this.emitIfChanged()}setEnabled(e,t=e){if(!this.disposed){this.enabled=e,this.resetEnabled=t,this.releaseAll();for(const i of this.buttons.values())for(const r of i)r.disabled=!e,r.setAttribute("aria-disabled",String(!e));this.resetButton&&(this.resetButton.disabled=!t,this.resetButton.setAttribute("aria-disabled",String(!t))),this.autoTrimButton&&(this.autoTrimButton.disabled=!e,this.autoTrimButton.setAttribute("aria-disabled",String(!e))),this.root.toggleAttribute("data-controls-disabled",!e)}}releaseAll(){this.pressedKeys.clear(),this.pressedButtons.clear(),this.resetHeld=!1;for(const{pointerId:e,button:t}of this.pointers.values())try{t.releasePointerCapture?.(e)}catch{}this.pointers.clear(),this.emitIfChanged(!0)}dispose(){if(!this.disposed){this.disposed=!0,this.releaseAll(),this.root.removeEventListener("pointerdown",this.onPointerDown),this.root.removeEventListener("pointerup",this.onPointerUp),this.root.removeEventListener("pointercancel",this.onPointerCancel),this.root.removeEventListener("lostpointercapture",this.onLostPointerCapture),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),window.removeEventListener("pagehide",this.onPageHide),document.removeEventListener("visibilitychange",this.onVisibilityChange);for(const{button:e,type:t,handler:i}of this.buttonHandlers)e.removeEventListener(t,i);this.buttonHandlers.length=0}}bindButton=(e,t)=>{e.dataset.vesselControl=t,e.addEventListener("keydown",this.onButtonKeyDown),e.addEventListener("keyup",this.onButtonKeyUp),e.addEventListener("focusout",this.onButtonFocusOut),this.buttonHandlers.push({button:e,type:"keydown",handler:this.onButtonKeyDown},{button:e,type:"keyup",handler:this.onButtonKeyUp},{button:e,type:"focusout",handler:this.onButtonFocusOut})};onButtonKeyDown=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||this.enabled&&(e.preventDefault(),this.pressedButtons.set(t,i),this.emitIfChanged())};onButtonKeyUp=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.pressedButtons.delete(t),this.emitIfChanged())};onButtonFocusOut=e=>{const t=e.currentTarget;!t||!this.pressedButtons.delete(t)||this.emitIfChanged()};onPointerDown=e=>{if(!this.enabled||this.disposed||e.pointerType==="mouse"&&e.button!==0)return;const t=e.target instanceof Element?e.target.closest("[data-vessel-control]"):null,i=t?.dataset.vesselControl;!t||!i||t.disabled||(e.preventDefault(),this.pointers.set(e.pointerId,{pointerId:e.pointerId,control:i,button:t}),t.setPointerCapture?.(e.pointerId),this.emitIfChanged())};onPointerUp=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onPointerCancel=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onLostPointerCapture=e=>{const t=e.pointerId;!Number.isFinite(t)||!this.pointers.delete(t)||this.emitIfChanged()};onKeyDown=e=>{if(this.disposed||Xd(e.target)||qd(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;const t=Dc(e.key);if(e.target instanceof HTMLElement&&e.target.matches("button, a")&&(t===" "||t==="enter"))return;if(t==="r"){if(!this.resetEnabled||this.resetHeld)return;e.preventDefault(),this.releaseAll(),this.resetHeld=!0,this.onReset?.();return}if(!this.enabled)return;if(t==="m"){if(e.repeat)return;e.preventDefault(),this.releaseAll(),this.onAutoTrim?.();return}const i=Hd.get(t);i&&(e.preventDefault(),!this.pressedKeys.has(t)&&(this.pressedKeys.set(t,i),this.emitIfChanged()))};onKeyUp=e=>{const t=Dc(e.key);if(t==="r"){this.resetHeld=!1;return}this.pressedKeys.delete(t)&&(e.preventDefault(),this.emitIfChanged())};onBlur=()=>this.releaseAll();onPageHide=()=>this.releaseAll();onVisibilityChange=()=>{document.hidden&&this.releaseAll()};emitIfChanged(e=!1){const t=this.getInput();!e&&Yd(t,this.lastInput)||(this.lastInput=t,this.onInput({...t}))}getInput(){const e=new Set(this.pressedKeys.values());for(const i of this.pressedButtons.values())e.add(i);for(const{control:i}of this.pointers.values())e.add(i);const t=Gd(e);for(const[i,r]of this.buttons){const s=e.has(i);for(const o of r)o.dataset.active=String(s),o.setAttribute("aria-pressed",String(s))}return t}}function Dc(n){return n.length===1,n.toLowerCase()}function Xd(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest("input, select, textarea"):!1}function qd(n){return n instanceof Element&&!!n.closest(".content-drawer")}function Yd(n,e){return n.throttle===e.throttle&&n.sheet===e.sheet&&n.rudder===e.rudder&&n.brake===e.brake&&n.sailAngle===e.sailAngle&&n.targetHeading===e.targetHeading}const Zd=1.25;function yr(n){return typeof n=="number"&&Number.isFinite(n)}function Uc(n,e){return Math.hypot(n.x-e.position.x,n.z-e.position.z)}function $d(n,e,t){if(!yr(n?.x)||!yr(n?.z))return null;if(t){const s=e.find(o=>o.id===t);if(s&&Uc(n,s)<=s.dockingTriggerRadius+Zd)return s}let i=null,r=Number.POSITIVE_INFINITY;for(const s of e){if(!yr(s.position.x)||!yr(s.position.z)||!yr(s.dockingTriggerRadius))continue;const o=Uc(n,s);o<=s.dockingTriggerRadius&&o<r&&(i=s,r=o)}return i}const lo={resume:"Resume",projects:"Projects",writing:"Writing",media:"Media"};function Kd(n){const{root:e,islands:t,content:i}=n,r=new Map(t.map(F=>[F.id,F])),s=document.createElement("nav");s.className="scanner-hud",s.setAttribute("aria-label","Portfolio scanner");const o=document.createElement("p");o.className="scanner-hud__label",o.textContent="Scan by category",s.append(o);const a=document.createElement("div");a.className="scanner-hud__links",a.setAttribute("role","list");for(const F of t){const Q=document.createElement("div");Q.setAttribute("role","listitem");const ie=document.createElement("button");ie.type="button",ie.className="scanner-hud__link",ie.dataset.scannerIsland=F.id,ie.setAttribute("aria-label",`Scan ${F.name}, ${lo[F.category]}`),ie.setAttribute("aria-expanded","false"),ie.setAttribute("aria-controls","portfolio-content-drawer");const Ie=document.createElement("span");Ie.className="scanner-hud__number",Ie.setAttribute("aria-hidden","true"),Ie.textContent=String(a.children.length+1).padStart(2,"0");const Ue=document.createElement("span");Ue.className="scanner-hud__link-label",Ue.textContent=lo[F.category];const z=document.createElement("span");z.className="scanner-hud__link-name",z.textContent=F.name,ie.append(Ie,Ue,z),ie.addEventListener("click",y),Q.append(ie),a.append(Q)}s.append(a);const l=document.createElement("p");l.className="scanner-hud__status",l.setAttribute("role","status"),l.setAttribute("aria-live","polite"),l.setAttribute("aria-atomic","true"),l.textContent="Under way · choose a category to scan",s.append(l);const c=document.createElement("p");c.className="visually-hidden",c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.setAttribute("aria-atomic","true"),s.append(c);const u=document.createElement("section");u.className="explore-prompt",u.hidden=!0,u.setAttribute("aria-label","Nearby island");const h=document.createElement("p");h.className="explore-prompt__kicker",h.textContent="Within range";const f=document.createElement("p");f.className="explore-prompt__text";const p=document.createElement("button");p.type="button",p.dataset.exploreAction="true",p.className="explore-prompt__button",p.textContent="Explore island",p.addEventListener("click",S),u.append(h,f,p);const g=document.createElement("aside");g.className="content-drawer",g.id="portfolio-content-drawer",g.hidden=!0,g.setAttribute("aria-label","Portfolio content"),g.setAttribute("aria-live","off");const _=document.createElement("div");_.className="content-drawer__header";const m=document.createElement("button");m.type="button",m.className="content-drawer__close",m.setAttribute("aria-label","Close portfolio drawer"),m.textContent="Close";const d=()=>L(!0);m.addEventListener("click",d);const b=document.createElement("h2");b.className="content-drawer__title",b.tabIndex=-1,b.id="portfolio-drawer-heading",_.append(b,m);const x=document.createElement("div");x.className="content-drawer__body",x.tabIndex=0,x.setAttribute("role","region"),x.setAttribute("aria-labelledby",b.id),g.setAttribute("aria-labelledby",b.id),g.append(_,x),e.append(s,u,g);let v=null,E=null,A=l.textContent??"",C=!1,R=0;function y(F){const Q=F.currentTarget;if(!(Q instanceof HTMLButtonElement))return;const ie=Q.dataset.scannerIsland;!ie||!r.has(ie)||(D(ie,Q),n.onScanRequest(ie))}function S(){v&&(D(v.id,p),n.onExploreRequest(v.id))}function P(F){F.key!=="Escape"||g.hidden||L(!0)}function D(F,Q=null){const ie=r.get(F);if(!ie||C)return;E=Q??B(F),b.textContent=ie.name,x.replaceChildren(jd(ie,i)),x.scrollTop=0,g.hidden=!1,e.classList.add("is-reading"),u.hidden=!0;for(const Ue of s.querySelectorAll("[data-scanner-island]")){const z=Ue.dataset.scannerIsland===F;Ue.setAttribute("aria-expanded",String(z)),Ue.dataset.selected=String(z)}const Ie=++R;requestAnimationFrame(()=>{!g.hidden&&Ie===R&&b.focus({preventScroll:!0})})}function L(F=!0){if(g.hidden)return;const Q=K();R+=1,g.hidden=!0,e.classList.remove("is-reading"),u.hidden=!v;for(const Ie of s.querySelectorAll("[data-scanner-island]"))Ie.setAttribute("aria-expanded","false"),Ie.dataset.selected="false";const ie=E&&document.contains(E)&&Jd(E)?E:Q;F&&ie&&ie.focus({preventScroll:!0}),E=null}function N(F){v?.id!==F?.id&&(v=F,u.hidden=!F||!g.hidden,c.textContent=F?`Docking range: ${F.name}. Explore prompt available.`:"Outside all docking zones.",F&&(f.textContent=`${F.name} · ${lo[F.category]}`,p.setAttribute("aria-label",`Explore ${F.name}`)))}function O(F){if(C)return;const Q=F.status==="travelling"?`Assisted passage to ${r.get(F.islandId??"")?.name??"island"}`:F.status==="arrived"?`Arrived at ${r.get(F.islandId??"")?.name??"island"}`:F.status==="cancelled"?"Scanner cancelled · steer manually":F.status==="failed"?"Scanner route unavailable · steer manually":"Under way · choose a category to scan",ie=F.message??Q;ie!==A&&(A=ie,l.textContent=ie)}function B(F){return s.querySelector(`[data-scanner-island="${CSS.escape(F)}"]`)}function K(){return V()?B(V()):null}function V(){return Array.from(s.querySelectorAll("[data-scanner-island]")).find(F=>F.dataset.selected==="true")?.dataset.scannerIsland??null}function te(){if(!C){C=!0,R+=1,e.classList.remove("is-reading"),window.removeEventListener("keydown",P);for(const F of s.querySelectorAll("[data-scanner-island]"))F.removeEventListener("click",y);p.removeEventListener("click",S),m.removeEventListener("click",d),s.remove(),u.remove(),g.remove()}}return window.addEventListener("keydown",P),{nav:s,drawer:g,setProximity:N,setScanUpdate:O,openIsland:D,closeDrawer:L,dispose:te}}function jd(n,e){const t=document.createDocumentFragment(),i=document.createElement("p");i.className="content-drawer__description",i.textContent=n.description,t.append(i);const r=n.category;if(r==="resume")for(const s of e.resume.filter(o=>n.contentIds.includes(o.id))){const o=ss();os(o,s.role),as(o,`${s.organisation} · ${s.period}`),uo(o,s.summary),t.append(o)}else if(r==="projects")for(const s of e.projects.filter(o=>n.contentIds.includes(o.id))){const o=ss();os(o,s.title),as(o,String(s.year)),uo(o,s.summary),ho(o,s.link),t.append(o)}else if(r==="writing")for(const s of e.writing.filter(o=>n.contentIds.includes(o.id))){const o=ss();os(o,s.title),as(o,`${s.publication} · ${s.year}`),uo(o,s.excerpt),ho(o,s.link),t.append(o)}else for(const s of e.media.filter(o=>n.contentIds.includes(o.id))){const o=ss();os(o,s.label),as(o,s.kind),ho(o,s.url),t.append(o)}return t}function ss(){const n=document.createElement("article");return n.className="content-card",n}function os(n,e){const t=document.createElement("h3");t.textContent=e,n.append(t)}function as(n,e){const t=document.createElement("p");t.className="content-card__meta",t.textContent=e,n.append(t)}function uo(n,e){const t=document.createElement("p");t.textContent=e,n.append(t)}function ho(n,e){if(!e||e==="#"){const i=document.createElement("p");i.className="content-card__placeholder",i.textContent="Link unavailable in placeholder data.",n.append(i);return}const t=document.createElement("a");t.href=e,t.target="_blank",t.rel="noreferrer",t.textContent="Open related material",n.append(t)}function Jd(n){if(n.hidden||n.closest("[hidden]"))return!1;const e=window.getComputedStyle(n);return e.display!=="none"&&e.visibility!=="hidden"}const sc="179",Qd=0,Nc=1,eh=2,Iu=1,th=2,In=3,Jn=0,Wt=1,At=2,$n=0,nr=1,Fc=2,Oc=3,Bc=4,nh=5,fi=100,ih=101,rh=102,sh=103,oh=104,ah=200,ch=201,lh=202,uh=203,ra=204,sa=205,dh=206,hh=207,fh=208,ph=209,mh=210,gh=211,_h=212,xh=213,vh=214,oa=0,aa=1,ca=2,ar=3,la=4,ua=5,da=6,ha=7,Lu=0,Mh=1,Sh=2,Kn=0,yh=1,Eh=2,bh=3,Du=4,Th=5,Ah=6,wh=7,Uu=300,cr=301,lr=302,fa=303,pa=304,Qs=306,ma=1e3,mi=1001,ga=1002,Kt=1003,Rh=1004,cs=1005,xn=1006,fo=1007,gi=1008,Sn=1009,Nu=1010,Fu=1011,Yr=1012,oc=1013,yi=1014,vn=1015,Qr=1016,ac=1017,cc=1018,Zr=1020,Ou=35902,Bu=1021,zu=1022,dn=1023,$r=1026,Kr=1027,lc=1028,uc=1029,ku=1030,dc=1031,hc=1033,ks=33776,Hs=33777,Vs=33778,Gs=33779,_a=35840,xa=35841,va=35842,Ma=35843,Sa=36196,ya=37492,Ea=37496,ba=37808,Ta=37809,Aa=37810,wa=37811,Ra=37812,Ca=37813,Pa=37814,Ia=37815,La=37816,Da=37817,Ua=37818,Na=37819,Fa=37820,Oa=37821,Ws=36492,Ba=36494,za=36495,Hu=36283,ka=36284,Ha=36285,Va=36286,Ch=3200,Ph=3201,Vu=0,Ih=1,qn="",$t="srgb",ur="srgb-linear",Ys="linear",nt="srgb",wi=7680,zc=519,Lh=512,Dh=513,Uh=514,Gu=515,Nh=516,Fh=517,Oh=518,Bh=519,kc=35044,ln=35048,Hc="300 es",Mn=2e3,Zs=2001;class gr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],po=Math.PI/180,Ga=180/Math.PI;function es(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function $e(n,e,t){return Math.max(e,Math.min(t,n))}function zh(n,e){return(n%e+e)%e}function mo(n,e,t){return(1-t)*n+t*e}function Er(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ze{constructor(e=0,t=0){Ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ts{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==p||u!==g){let m=1-a;const d=l*f+c*p+u*g+h*_,b=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const E=Math.sqrt(x),A=Math.atan2(E,d*b);m=Math.sin(m*A)/E,a=Math.sin(a*A)/E}const v=a*b;if(l=l*m+f*v,c=c*m+p*v,u=u*m+g*v,h=h*m+_*v,m===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=E,c*=E,u*=E,h*=E}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*p-c*f,e[t+1]=l*g+u*f+c*h-a*p,e[t+2]=c*g+u*p+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),f=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,i=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return go.copy(this).projectOnVector(e),this.sub(go)}reflect(e){return this.sub(go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const go=new G,Vc=new ts;class Ve{constructor(e,t,i,r,s,o,a,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],b=r[1],x=r[4],v=r[7],E=r[2],A=r[5],C=r[8];return s[0]=o*_+a*b+l*E,s[3]=o*m+a*x+l*A,s[6]=o*d+a*v+l*C,s[1]=c*_+u*b+h*E,s[4]=c*m+u*x+h*A,s[7]=c*d+u*v+h*C,s[2]=f*_+p*b+g*E,s[5]=f*m+p*x+g*A,s[8]=f*d+p*v+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,p=c*s-o*l,g=t*h+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(_o.makeScale(e,t)),this}rotate(e){return this.premultiply(_o.makeRotation(-e)),this}translate(e,t){return this.premultiply(_o.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _o=new Ve;function Wu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function $s(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function kh(){const n=$s("canvas");return n.style.display="block",n}const Gc={};function ir(n){n in Gc||(Gc[n]=!0,console.warn(n))}function Hh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Wc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vh(){const n={enabled:!0,workingColorSpace:ur,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===nt&&(r.r=Fn(r.r),r.g=Fn(r.g),r.b=Fn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(r.r=rr(r.r),r.g=rr(r.g),r.b=rr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===qn?Ys:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ir("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ir("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ur]:{primaries:e,whitePoint:i,transfer:Ys,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),n}const Qe=Vh();function Fn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function rr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ri;class Gh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ri===void 0&&(Ri=$s("canvas")),Ri.width=e.width,Ri.height=e.height;const r=Ri.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ri}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=$s("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Fn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Fn(t[i]/255)*255):t[i]=Fn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wh=0;class fc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=es(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(xo(r[o].image)):s.push(xo(r[o]))}else s=xo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function xo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Gh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xh=0;const vo=new G;class Ft extends gr{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,i=mi,r=mi,s=xn,o=gi,a=dn,l=Sn,c=Ft.DEFAULT_ANISOTROPY,u=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=es(),this.name="",this.source=new fc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ma:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ma:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=Uu;Ft.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,i=0,r=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(p+1)/2,E=(d+1)/2,A=(u+f)/4,C=(h+_)/4,R=(g+m)/4;return x>v&&x>E?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=A/i,s=C/i):v>E?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=A/r,s=R/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=C/s,r=R/s),this.set(i,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-_)/b,this.z=(f-u)/b,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qh extends gr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Ft(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new fc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ei extends qh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Xu extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yh extends Ft{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qn{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,nn):nn.fromBufferAttribute(s,o),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ls.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(e.matrixWorld),this.union(ls)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),us.subVectors(this.max,br),Ci.subVectors(e.a,br),Pi.subVectors(e.b,br),Ii.subVectors(e.c,br),zn.subVectors(Pi,Ci),kn.subVectors(Ii,Pi),ni.subVectors(Ci,Ii);let t=[0,-zn.z,zn.y,0,-kn.z,kn.y,0,-ni.z,ni.y,zn.z,0,-zn.x,kn.z,0,-kn.x,ni.z,0,-ni.x,-zn.y,zn.x,0,-kn.y,kn.x,0,-ni.y,ni.x,0];return!Mo(t,Ci,Pi,Ii,us)||(t=[1,0,0,0,1,0,0,0,1],!Mo(t,Ci,Pi,Ii,us))?!1:(ds.crossVectors(zn,kn),t=[ds.x,ds.y,ds.z],Mo(t,Ci,Pi,Ii,us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bn=[new G,new G,new G,new G,new G,new G,new G,new G],nn=new G,ls=new Qn,Ci=new G,Pi=new G,Ii=new G,zn=new G,kn=new G,ni=new G,br=new G,us=new G,ds=new G,ii=new G;function Mo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){ii.fromArray(n,s);const a=r.x*Math.abs(ii.x)+r.y*Math.abs(ii.y)+r.z*Math.abs(ii.z),l=e.dot(ii),c=t.dot(ii),u=i.dot(ii);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Zh=new Qn,Tr=new G,So=new G;class _r{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Zh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tr.subVectors(e,this.center);const t=Tr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Tr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(So.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tr.copy(e.center).add(So)),this.expandByPoint(Tr.copy(e.center).sub(So))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Tn=new G,yo=new G,hs=new G,Hn=new G,Eo=new G,fs=new G,bo=new G;class pc{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Tn.copy(this.origin).addScaledVector(this.direction,t),Tn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){yo.copy(e).add(t).multiplyScalar(.5),hs.copy(t).sub(e).normalize(),Hn.copy(this.origin).sub(yo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(hs),a=Hn.dot(this.direction),l=-Hn.dot(hs),c=Hn.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(yo).addScaledVector(hs,f),p}intersectSphere(e,t){Tn.subVectors(e.center,this.origin);const i=Tn.dot(this.direction),r=Tn.dot(Tn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Tn)!==null}intersectTriangle(e,t,i,r,s){Eo.subVectors(t,e),fs.subVectors(i,e),bo.crossVectors(Eo,fs);let o=this.direction.dot(bo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hn.subVectors(this.origin,e);const l=a*this.direction.dot(fs.crossVectors(Hn,fs));if(l<0)return null;const c=a*this.direction.dot(Eo.cross(Hn));if(c<0||l+c>o)return null;const u=-a*Hn.dot(bo);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,i,r,s,o,a,l,c,u,h,f,p,g,_,m){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,h,f,p,g,_,m)}set(e,t,i,r,s,o,a,l,c,u,h,f,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Li.setFromMatrixColumn(e,0).length(),s=1/Li.setFromMatrixColumn(e,1).length(),o=1/Li.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,g=c*u,_=c*h;t[0]=f+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,g=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-p,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($h,e,Kh)}lookAt(e,t,i){const r=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Vn.crossVectors(i,Yt),Vn.lengthSq()===0&&(Math.abs(i.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Vn.crossVectors(i,Yt)),Vn.normalize(),ps.crossVectors(Yt,Vn),r[0]=Vn.x,r[4]=ps.x,r[8]=Yt.x,r[1]=Vn.y,r[5]=ps.y,r[9]=Yt.y,r[2]=Vn.z,r[6]=ps.z,r[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],b=i[3],x=i[7],v=i[11],E=i[15],A=r[0],C=r[4],R=r[8],y=r[12],S=r[1],P=r[5],D=r[9],L=r[13],N=r[2],O=r[6],B=r[10],K=r[14],V=r[3],te=r[7],F=r[11],Q=r[15];return s[0]=o*A+a*S+l*N+c*V,s[4]=o*C+a*P+l*O+c*te,s[8]=o*R+a*D+l*B+c*F,s[12]=o*y+a*L+l*K+c*Q,s[1]=u*A+h*S+f*N+p*V,s[5]=u*C+h*P+f*O+p*te,s[9]=u*R+h*D+f*B+p*F,s[13]=u*y+h*L+f*K+p*Q,s[2]=g*A+_*S+m*N+d*V,s[6]=g*C+_*P+m*O+d*te,s[10]=g*R+_*D+m*B+d*F,s[14]=g*y+_*L+m*K+d*Q,s[3]=b*A+x*S+v*N+E*V,s[7]=b*C+x*P+v*O+E*te,s[11]=b*R+x*D+v*B+E*F,s[15]=b*y+x*L+v*K+E*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+s*l*h-r*c*h-s*a*f+i*c*f+r*a*p-i*l*p)+_*(+t*l*p-t*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+m*(+t*c*h-t*a*p-s*o*h+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-t*l*h+t*a*f+r*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],b=h*m*c-_*f*c+_*l*p-a*m*p-h*l*d+a*f*d,x=g*f*c-u*m*c-g*l*p+o*m*p+u*l*d-o*f*d,v=u*_*c-g*h*c+g*a*p-o*_*p-u*a*d+o*h*d,E=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,A=t*b+i*x+r*v+s*E;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=b*C,e[1]=(_*f*s-h*m*s-_*r*p+i*m*p+h*r*d-i*f*d)*C,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*d+i*l*d)*C,e[3]=(h*l*s-a*f*s-h*r*c+i*f*c+a*r*p-i*l*p)*C,e[4]=x*C,e[5]=(u*m*s-g*f*s+g*r*p-t*m*p-u*r*d+t*f*d)*C,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*d-t*l*d)*C,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*p+t*l*p)*C,e[8]=v*C,e[9]=(g*h*s-u*_*s-g*i*p+t*_*p+u*i*d-t*h*d)*C,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*d+t*a*d)*C,e[11]=(u*a*s-o*h*s-u*i*c+t*h*c+o*i*p-t*a*p)*C,e[12]=E*C,e[13]=(u*_*r-g*h*r+g*i*f-t*_*f-u*i*m+t*h*m)*C,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*m-t*a*m)*C,e[15]=(o*h*r-u*a*r+u*i*l-t*h*l-o*i*f+t*a*f)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,p=s*u,g=s*h,_=o*u,m=o*h,d=a*h,b=l*c,x=l*u,v=l*h,E=i.x,A=i.y,C=i.z;return r[0]=(1-(_+d))*E,r[1]=(p+v)*E,r[2]=(g-x)*E,r[3]=0,r[4]=(p-v)*A,r[5]=(1-(f+d))*A,r[6]=(m+b)*A,r[7]=0,r[8]=(g+x)*C,r[9]=(m-b)*C,r[10]=(1-(f+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Li.set(r[0],r[1],r[2]).length();const o=Li.set(r[4],r[5],r[6]).length(),a=Li.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],rn.copy(this);const c=1/s,u=1/o,h=1/a;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=h,rn.elements[9]*=h,rn.elements[10]*=h,t.setFromRotationMatrix(rn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Mn,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),p=(i+r)/(i-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===Mn)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Zs)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Mn,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-r),f=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===Mn)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Zs)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Li=new G,rn=new ot,$h=new G(0,0,0),Kh=new G(1,1,1),Vn=new G,ps=new G,Yt=new G,qc=new ot,Yc=new ts;class yn{constructor(e=0,t=0,i=0,r=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return qc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yc.setFromEuler(this),this.setFromQuaternion(Yc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class mc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jh=0;const Zc=new G,Di=new ts,An=new ot,ms=new G,Ar=new G,Jh=new G,Qh=new ts,$c=new G(1,0,0),Kc=new G(0,1,0),jc=new G(0,0,1),Jc={type:"added"},ef={type:"removed"},Ui={type:"childadded",child:null},To={type:"childremoved",child:null};class vt extends gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new G,t=new yn,i=new ts,r=new G(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ve}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.multiply(Di),this}rotateOnWorldAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.premultiply(Di),this}rotateX(e){return this.rotateOnAxis($c,e)}rotateY(e){return this.rotateOnAxis(Kc,e)}rotateZ(e){return this.rotateOnAxis(jc,e)}translateOnAxis(e,t){return Zc.copy(e).applyQuaternion(this.quaternion),this.position.add(Zc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($c,e)}translateY(e){return this.translateOnAxis(Kc,e)}translateZ(e){return this.translateOnAxis(jc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ms.copy(e):ms.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(Ar,ms,this.up):An.lookAt(ms,Ar,this.up),this.quaternion.setFromRotationMatrix(An),r&&(An.extractRotation(r.matrixWorld),Di.setFromRotationMatrix(An),this.quaternion.premultiply(Di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jc),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ef),To.child=e,this.dispatchEvent(To),To.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),An.multiply(e.parent.matrixWorld)),e.applyMatrix4(An),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jc),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,Jh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,Qh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}vt.DEFAULT_UP=new G(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new G,wn=new G,Ao=new G,Rn=new G,Ni=new G,Fi=new G,Qc=new G,wo=new G,Ro=new G,Co=new G,Po=new mt,Io=new mt,Lo=new mt;class un{constructor(e=new G,t=new G,i=new G){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),sn.subVectors(e,t),r.cross(sn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){sn.subVectors(r,t),wn.subVectors(i,t),Ao.subVectors(e,t);const o=sn.dot(sn),a=sn.dot(wn),l=sn.dot(Ao),c=wn.dot(wn),u=wn.dot(Ao),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Rn)===null?!1:Rn.x>=0&&Rn.y>=0&&Rn.x+Rn.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Rn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Rn.x),l.addScaledVector(o,Rn.y),l.addScaledVector(a,Rn.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Po.setScalar(0),Io.setScalar(0),Lo.setScalar(0),Po.fromBufferAttribute(e,t),Io.fromBufferAttribute(e,i),Lo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Po,s.x),o.addScaledVector(Io,s.y),o.addScaledVector(Lo,s.z),o}static isFrontFacing(e,t,i,r){return sn.subVectors(i,t),wn.subVectors(e,t),sn.cross(wn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),sn.cross(wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ni.subVectors(r,i),Fi.subVectors(s,i),wo.subVectors(e,i);const l=Ni.dot(wo),c=Fi.dot(wo);if(l<=0&&c<=0)return t.copy(i);Ro.subVectors(e,r);const u=Ni.dot(Ro),h=Fi.dot(Ro);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ni,o);Co.subVectors(e,s);const p=Ni.dot(Co),g=Fi.dot(Co);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Fi,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Qc.subVectors(s,r),a=(h-u)/(h-u+(p-g)),t.copy(r).addScaledVector(Qc,a);const d=1/(m+_+f);return o=_*d,a=f*d,t.copy(i).addScaledVector(Ni,o).addScaledVector(Fi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function Do(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=zh(e,1),t=$e(t,0,1),i=$e(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Do(o,s,e+1/3),this.g=Do(o,s,e),this.b=Do(o,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=$t){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const i=qu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fn(e.r),this.g=Fn(e.g),this.b=Fn(e.b),this}copyLinearToSRGB(e){return this.r=rr(e.r),this.g=rr(e.g),this.b=rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return Qe.workingToColorSpace(Rt.copy(this),e),Math.round($e(Rt.r*255,0,255))*65536+Math.round($e(Rt.g*255,0,255))*256+Math.round($e(Rt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Rt.copy(this),t);const i=Rt.r,r=Rt.g,s=Rt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=$t){Qe.workingToColorSpace(Rt.copy(this),e);const t=Rt.r,i=Rt.g,r=Rt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(gs);const i=mo(Gn.h,gs.h,t),r=mo(Gn.s,gs.s,t),s=mo(Gn.l,gs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new qe;qe.NAMES=qu;let tf=0;class xr extends gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=es(),this.name="",this.type="Material",this.blending=nr,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ra,this.blendDst=sa,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wi,this.stencilZFail=wi,this.stencilZPass=wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==nr&&(i.blending=this.blending),this.side!==Jn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ra&&(i.blendSrc=this.blendSrc),this.blendDst!==sa&&(i.blendDst=this.blendDst),this.blendEquation!==fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ar&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==wi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==wi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class jn extends xr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new G,_s=new Ze;let nf=0;class pt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=kc,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)_s.fromBufferAttribute(this,t),_s.applyMatrix3(e),this.setXY(t,_s.x,_s.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Er(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Er(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Er(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Er(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Er(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==kc&&(e.usage=this.usage),e}}class Yu extends pt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Zu extends pt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class lt extends pt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let rf=0;const Qt=new ot,Uo=new vt,Oi=new G,Zt=new Qn,wr=new Qn,Et=new G;class gt extends gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=es(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wu(e)?Zu:Yu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,i){return Qt.makeTranslation(e,t,i),this.applyMatrix4(Qt),this}scale(e,t,i){return Qt.makeScale(e,t,i),this.applyMatrix4(Qt),this}lookAt(e){return Uo.lookAt(e),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new lt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Zt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const i=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];wr.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(Zt.min,wr.min),Zt.expandByPoint(Et),Et.addVectors(Zt.max,wr.max),Zt.expandByPoint(Et)):(Zt.expandByPoint(wr.min),Zt.expandByPoint(wr.max))}Zt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Et));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Et.fromBufferAttribute(a,c),l&&(Oi.fromBufferAttribute(e,c),Et.add(Oi)),r=Math.max(r,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new G,l[R]=new G;const c=new G,u=new G,h=new G,f=new Ze,p=new Ze,g=new Ze,_=new G,m=new G;function d(R,y,S){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,y),h.fromBufferAttribute(i,S),f.fromBufferAttribute(s,R),p.fromBufferAttribute(s,y),g.fromBufferAttribute(s,S),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(P),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(P),a[R].add(_),a[y].add(_),a[S].add(_),l[R].add(m),l[y].add(m),l[S].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let R=0,y=b.length;R<y;++R){const S=b[R],P=S.start,D=S.count;for(let L=P,N=P+D;L<N;L+=3)d(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const x=new G,v=new G,E=new G,A=new G;function C(R){E.fromBufferAttribute(r,R),A.copy(E);const y=a[R];x.copy(y),x.sub(E.multiplyScalar(E.dot(y))).normalize(),v.crossVectors(A,y);const P=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,P)}for(let R=0,y=b.length;R<y;++R){const S=b[R],P=S.start,D=S.count;for(let L=P,N=P+D;L<N;L+=3)C(e.getX(L+0)),C(e.getX(L+1)),C(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new G,s=new G,o=new G,a=new G,l=new G,c=new G,u=new G,h=new G;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new pt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const el=new ot,ri=new pc,xs=new _r,tl=new G,vs=new G,Ms=new G,Ss=new G,No=new G,ys=new G,nl=new G,Es=new G;class We extends vt{constructor(e=new gt,t=new jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ys.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(No.fromBufferAttribute(h,e),o?ys.addScaledVector(No,u):ys.addScaledVector(No.sub(t),u))}t.add(ys)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(s),ri.copy(e.ray).recast(e.near),!(xs.containsPoint(ri.origin)===!1&&(ri.intersectSphere(xs,tl)===null||ri.origin.distanceToSquared(tl)>(e.far-e.near)**2))&&(el.copy(s).invert(),ri.copy(e.ray).applyMatrix4(el),!(i.boundingBox!==null&&ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ri)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],b=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,E=x;v<E;v+=3){const A=a.getX(v),C=a.getX(v+1),R=a.getX(v+2);r=bs(this,d,e,i,c,u,h,A,C,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);r=bs(this,o,e,i,c,u,h,b,x,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],b=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,E=x;v<E;v+=3){const A=v,C=v+1,R=v+2;r=bs(this,d,e,i,c,u,h,A,C,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=m,x=m+1,v=m+2;r=bs(this,o,e,i,c,u,h,b,x,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function sf(n,e,t,i,r,s,o,a){let l;if(e.side===Wt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Jn,a),l===null)return null;Es.copy(a),Es.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Es);return c<t.near||c>t.far?null:{distance:c,point:Es.clone(),object:n}}function bs(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,vs),n.getVertexPosition(l,Ms),n.getVertexPosition(c,Ss);const u=sf(n,e,t,i,vs,Ms,Ss,nl);if(u){const h=new G;un.getBarycoord(nl,vs,Ms,Ss,h),r&&(u.uv=un.getInterpolatedAttribute(r,a,l,c,h,new Ze)),s&&(u.uv1=un.getInterpolatedAttribute(s,a,l,c,h,new Ze)),o&&(u.normal=un.getInterpolatedAttribute(o,a,l,c,h,new G),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new G,materialIndex:0};un.getNormal(vs,Ms,Ss,f.normal),u.face=f,u.barycoord=h}return u}class bi extends gt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(h,2));function g(_,m,d,b,x,v,E,A,C,R,y){const S=v/C,P=E/R,D=v/2,L=E/2,N=A/2,O=C+1,B=R+1;let K=0,V=0;const te=new G;for(let F=0;F<B;F++){const Q=F*P-L;for(let ie=0;ie<O;ie++){const Ie=ie*S-D;te[_]=Ie*b,te[m]=Q*x,te[d]=N,c.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[d]=A>0?1:-1,u.push(te.x,te.y,te.z),h.push(ie/C),h.push(1-F/R),K+=1}}for(let F=0;F<R;F++)for(let Q=0;Q<C;Q++){const ie=f+Q+O*F,Ie=f+Q+O*(F+1),Ue=f+(Q+1)+O*(F+1),z=f+(Q+1)+O*F;l.push(ie,Ie,z),l.push(Ie,Ue,z),V+=6}a.addGroup(p,V,y),p+=V,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const r in i)e[r]=i[r]}return e}function of(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function $u(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const af={clone:dr,merge:Nt};var cf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class On extends xr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cf,this.fragmentShader=lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=of(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ku extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new G,il=new Ze,rl=new Ze;class an extends Ku{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ga*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(po*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ga*2*Math.atan(Math.tan(po*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z)}getViewSize(e,t){return this.getViewBounds(e,il,rl),t.subVectors(rl,il)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(po*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bi=-90,zi=1;class uf extends vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Bi,zi,e,t);r.layers=this.layers,this.add(r);const s=new an(Bi,zi,e,t);s.layers=this.layers,this.add(s);const o=new an(Bi,zi,e,t);o.layers=this.layers,this.add(o);const a=new an(Bi,zi,e,t);a.layers=this.layers,this.add(a);const l=new an(Bi,zi,e,t);l.layers=this.layers,this.add(l);const c=new an(Bi,zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class ju extends Ft{constructor(e=[],t=cr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class df extends Ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ju(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new bi(5,5,5),s=new On({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Wt,blending:$n});s.uniforms.tEquirect.value=t;const o=new We(r,s),a=t.minFilter;return t.minFilter===gi&&(t.minFilter=xn),new uf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class Yn extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hf={type:"move"};class Fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hf)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Yn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class gc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new qe(e),this.near=t,this.far=i}clone(){return new gc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ff extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class pf extends Ft{constructor(e=null,t=1,i=1,r,s,o,a,l,c=Kt,u=Kt,h,f){super(null,o,a,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wa extends pt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ki=new ot,sl=new ot,Ts=[],ol=new Qn,mf=new ot,Rr=new We,Cr=new _r;class Ju extends We{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wa(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,mf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ki),ol.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union(ol)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _r),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ki),Cr.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(i),e.ray.intersectsSphere(Cr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ki),sl.multiplyMatrices(i,ki),Rr.matrixWorld=sl,Rr.raycast(e,Ts);for(let o=0,a=Ts.length;o<a;o++){const l=Ts[o];l.instanceId=s,l.object=this,t.push(l)}Ts.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Wa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new pf(new Float32Array(r*this.count),r,this.count,lc,vn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Oo=new G,gf=new G,_f=new Ve;class di{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Oo.subVectors(i,t).cross(gf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Oo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||_f.getNormalMatrix(e),r=this.coplanarPoint(Oo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const si=new _r,xf=new Ze(.5,.5),As=new G;class _c{constructor(e=new di,t=new di,i=new di,r=new di,s=new di,o=new di){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],p=s[7],g=s[8],_=s[9],m=s[10],d=s[11],b=s[12],x=s[13],v=s[14],E=s[15];if(r[0].setComponents(c-o,p-u,d-g,E-b).normalize(),r[1].setComponents(c+o,p+u,d+g,E+b).normalize(),r[2].setComponents(c+a,p+h,d+_,E+x).normalize(),r[3].setComponents(c-a,p-h,d-_,E-x).normalize(),i)r[4].setComponents(l,f,m,v).normalize(),r[5].setComponents(c-l,p-f,d-m,E-v).normalize();else if(r[4].setComponents(c-l,p-f,d-m,E-v).normalize(),t===Mn)r[5].setComponents(c+l,p+f,d+m,E+v).normalize();else if(t===Zs)r[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(e){si.center.set(0,0,0);const t=xf.distanceTo(e.center);return si.radius=.7071067811865476+t,si.applyMatrix4(e.matrixWorld),this.intersectsSphere(si)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(As.x=r.normal.x>0?e.max.x:e.min.x,As.y=r.normal.y>0?e.max.y:e.min.y,As.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(As)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qu extends xr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ks=new G,js=new G,al=new ot,Pr=new pc,ws=new _r,Bo=new G,cl=new G;class vf extends vt{constructor(e=new gt,t=new Qu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Ks.fromBufferAttribute(t,r-1),js.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Ks.distanceTo(js);e.setAttribute("lineDistance",new lt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ws.copy(i.boundingSphere),ws.applyMatrix4(r),ws.radius+=s,e.ray.intersectsSphere(ws)===!1)return;al.copy(r).invert(),Pr.copy(e.ray).applyMatrix4(al);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=u.getX(_),b=u.getX(_+1),x=Rs(this,e,Pr,l,d,b,_);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),d=Rs(this,e,Pr,l,_,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=Rs(this,e,Pr,l,_,_+1,_);d&&t.push(d)}if(this.isLineLoop){const _=Rs(this,e,Pr,l,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Rs(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(Ks.fromBufferAttribute(a,r),js.fromBufferAttribute(a,s),t.distanceSqToSegment(Ks,js,Bo,cl)>i)return;Bo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Bo);if(!(c<e.near||c>e.far))return{distance:c,point:cl.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class ed extends Ft{constructor(e,t,i=yi,r,s,o,a=Kt,l=Kt,c,u=$r,h=1){if(u!==$r&&u!==Kr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xc extends gt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new G,u=new Ze;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const p=i+h/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new lt(o,3)),this.setAttribute("normal",new lt(a,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class hn extends gt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],p=[];let g=0;const _=[],m=i/2;let d=0;b(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new lt(h,3)),this.setAttribute("normal",new lt(f,3)),this.setAttribute("uv",new lt(p,2));function b(){const v=new G,E=new G;let A=0;const C=(t-e)/i;for(let R=0;R<=s;R++){const y=[],S=R/s,P=S*(t-e)+e;for(let D=0;D<=r;D++){const L=D/r,N=L*l+a,O=Math.sin(N),B=Math.cos(N);E.x=P*O,E.y=-S*i+m,E.z=P*B,h.push(E.x,E.y,E.z),v.set(O,C,B).normalize(),f.push(v.x,v.y,v.z),p.push(L,1-S),y.push(g++)}_.push(y)}for(let R=0;R<r;R++)for(let y=0;y<s;y++){const S=_[y][R],P=_[y+1][R],D=_[y+1][R+1],L=_[y][R+1];(e>0||y!==0)&&(u.push(S,P,L),A+=3),(t>0||y!==s-1)&&(u.push(P,D,L),A+=3)}c.addGroup(d,A,0),d+=A}function x(v){const E=g,A=new Ze,C=new G;let R=0;const y=v===!0?e:t,S=v===!0?1:-1;for(let D=1;D<=r;D++)h.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),g++;const P=g;for(let D=0;D<=r;D++){const N=D/r*l+a,O=Math.cos(N),B=Math.sin(N);C.x=y*B,C.y=m*S,C.z=y*O,h.push(C.x,C.y,C.z),f.push(0,S,0),A.x=O*.5+.5,A.y=B*.5*S+.5,p.push(A.x,A.y),g++}for(let D=0;D<r;D++){const L=E+D,N=P+D;v===!0?u.push(N,N+1,L):u.push(N+1,N,L),R+=3}c.addGroup(d,R,v===!0?1:2),d+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Si extends hn{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Si(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class eo extends gt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(s.slice(),3)),this.setAttribute("uv",new lt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const x=new G,v=new G,E=new G;for(let A=0;A<t.length;A+=3)p(t[A+0],x),p(t[A+1],v),p(t[A+2],E),l(x,v,E,b)}function l(b,x,v,E){const A=E+1,C=[];for(let R=0;R<=A;R++){C[R]=[];const y=b.clone().lerp(v,R/A),S=x.clone().lerp(v,R/A),P=A-R;for(let D=0;D<=P;D++)D===0&&R===A?C[R][D]=y:C[R][D]=y.clone().lerp(S,D/P)}for(let R=0;R<A;R++)for(let y=0;y<2*(A-R)-1;y++){const S=Math.floor(y/2);y%2===0?(f(C[R][S+1]),f(C[R+1][S]),f(C[R][S])):(f(C[R][S+1]),f(C[R+1][S+1]),f(C[R+1][S]))}}function c(b){const x=new G;for(let v=0;v<s.length;v+=3)x.x=s[v+0],x.y=s[v+1],x.z=s[v+2],x.normalize().multiplyScalar(b),s[v+0]=x.x,s[v+1]=x.y,s[v+2]=x.z}function u(){const b=new G;for(let x=0;x<s.length;x+=3){b.x=s[x+0],b.y=s[x+1],b.z=s[x+2];const v=m(b)/2/Math.PI+.5,E=d(b)/Math.PI+.5;o.push(v,1-E)}g(),h()}function h(){for(let b=0;b<o.length;b+=6){const x=o[b+0],v=o[b+2],E=o[b+4],A=Math.max(x,v,E),C=Math.min(x,v,E);A>.9&&C<.1&&(x<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),E<.2&&(o[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function p(b,x){const v=b*3;x.x=e[v+0],x.y=e[v+1],x.z=e[v+2]}function g(){const b=new G,x=new G,v=new G,E=new G,A=new Ze,C=new Ze,R=new Ze;for(let y=0,S=0;y<s.length;y+=9,S+=6){b.set(s[y+0],s[y+1],s[y+2]),x.set(s[y+3],s[y+4],s[y+5]),v.set(s[y+6],s[y+7],s[y+8]),A.set(o[S+0],o[S+1]),C.set(o[S+2],o[S+3]),R.set(o[S+4],o[S+5]),E.copy(b).add(x).add(v).divideScalar(3);const P=m(E);_(A,S+0,b,P),_(C,S+2,x,P),_(R,S+4,v,P)}}function _(b,x,v,E){E<0&&b.x===1&&(o[x]=b.x-1),v.x===0&&v.z===0&&(o[x]=E/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.vertices,e.indices,e.radius,e.details)}}class vc extends eo{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new vc(e.radius,e.detail)}}class to extends eo{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new to(e.radius,e.detail)}}class no extends gt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,f=t/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const b=d*f-o;for(let x=0;x<c;x++){const v=x*h-s;g.push(v,-b,0),_.push(0,0,1),m.push(x/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<a;b++){const x=b+c*d,v=b+c*(d+1),E=b+1+c*(d+1),A=b+1+c*d;p.push(x,v,A),p.push(v,E,A)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new no(e.width,e.height,e.widthSegments,e.heightSegments)}}class Mc extends gt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new G,f=new G,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const b=[],x=d/i;let v=0;d===0&&o===0?v=.5/t:d===i&&l===Math.PI&&(v=-.5/t);for(let E=0;E<=t;E++){const A=E/t;h.x=-e*Math.cos(r+A*s)*Math.sin(o+x*a),h.y=e*Math.cos(o+x*a),h.z=e*Math.sin(r+A*s)*Math.sin(o+x*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(A+v,1-x),b.push(c++)}u.push(b)}for(let d=0;d<i;d++)for(let b=0;b<t;b++){const x=u[d][b+1],v=u[d][b],E=u[d+1][b],A=u[d+1][b+1];(d!==0||o>0)&&p.push(x,v,A),(d!==i-1||l<Math.PI)&&p.push(v,E,A)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class en extends xr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vu,this.normalScale=new Ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mf extends xr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ch,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sf extends xr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class yf extends Qu{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class td extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ef extends td{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const zo=new ot,ll=new G,ul=new G;class bf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ze(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _c,this._frameExtents=new Ze(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ll.setFromMatrixPosition(e.matrixWorld),t.position.copy(ll),ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ul),t.updateMatrixWorld(),zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sc extends Ku{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Tf extends bf{constructor(){super(new Sc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dl extends td{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new Tf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Af extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const hl=new ot;class wf{constructor(e,t,i=0,r=1/0){this.ray=new pc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new mc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hl),this}intersectObject(e,t=!0,i=[]){return Xa(e,this,i,t),i.sort(fl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Xa(e[r],this,i,t);return i.sort(fl),i}}function fl(n,e){return n.distance-e.distance}function Xa(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Xa(s[o],e,t,!0)}}function pl(n,e,t,i){const r=Rf(i);switch(t){case Bu:return n*e;case lc:return n*e/r.components*r.byteLength;case uc:return n*e/r.components*r.byteLength;case ku:return n*e*2/r.components*r.byteLength;case dc:return n*e*2/r.components*r.byteLength;case zu:return n*e*3/r.components*r.byteLength;case dn:return n*e*4/r.components*r.byteLength;case hc:return n*e*4/r.components*r.byteLength;case ks:case Hs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Vs:case Gs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xa:case Ma:return Math.max(n,16)*Math.max(e,8)/4;case _a:case va:return Math.max(n,8)*Math.max(e,8)/2;case Sa:case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case wa:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ia:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Na:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Oa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ws:case Ba:case za:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Hu:case ka:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ha:case Va:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rf(n){switch(n){case Sn:case Nu:return{byteLength:1,components:1};case Yr:case Fu:case Qr:return{byteLength:2,components:1};case ac:case cc:return{byteLength:2,components:4};case yi:case oc:case vn:return{byteLength:4,components:1};case Ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sc);function nd(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Cf(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Pf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,If=`#ifdef USE_ALPHAHASH
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
#endif`,Lf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ff=`#ifdef USE_AOMAP
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
#endif`,Of=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bf=`#ifdef USE_BATCHING
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
#endif`,zf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gf=`#ifdef USE_IRIDESCENCE
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
#endif`,Wf=`#ifdef USE_BUMPMAP
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
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$f=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Qf=`#define PI 3.141592653589793
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
} // validated`,ep=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tp=`vec3 transformedNormal = objectNormal;
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
#endif`,np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ip=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,op="gl_FragColor = linearToOutputTexel( gl_FragColor );",ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cp=`#ifdef USE_ENVMAP
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
#endif`,lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,up=`#ifdef USE_ENVMAP
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
#endif`,dp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
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
#endif`,fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_p=`#ifdef USE_GRADIENTMAP
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
}`,xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sp=`uniform bool receiveShadow;
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
#endif`,yp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wp=`PhysicalMaterial material;
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
#endif`,Rp=`struct PhysicalMaterial {
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
}`,Cp=`
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
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ip=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Up=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Np=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Op=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zp=`#if defined( USE_POINTS_UV )
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
#endif`,kp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xp=`#ifdef USE_MORPHTARGETS
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
#endif`,qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jp=`#ifdef USE_NORMALMAP
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
#endif`,Qp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,im=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,om=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,am=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pm=`float getShadowMask() {
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
}`,mm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gm=`#ifdef USE_SKINNING
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
#endif`,_m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xm=`#ifdef USE_SKINNING
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
#endif`,vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ym=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Em=`#ifdef USE_TRANSMISSION
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
#endif`,bm=`#ifdef USE_TRANSMISSION
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
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pm=`uniform sampler2D t2D;
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
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nm=`#include <common>
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
}`,Fm=`#if DEPTH_PACKING == 3200
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
}`,Om=`#define DISTANCE
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
}`,Bm=`#define DISTANCE
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
}`,zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,km=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hm=`uniform float scale;
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
}`,Vm=`uniform vec3 diffuse;
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
}`,Gm=`#include <common>
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
}`,Wm=`uniform vec3 diffuse;
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
}`,Xm=`#define LAMBERT
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
}`,qm=`#define LAMBERT
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
}`,Ym=`#define MATCAP
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
}`,Zm=`#define MATCAP
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
}`,$m=`#define NORMAL
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
}`,Km=`#define NORMAL
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
}`,jm=`#define PHONG
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
}`,Jm=`#define PHONG
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
}`,Qm=`#define STANDARD
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
}`,eg=`#define STANDARD
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
}`,tg=`#define TOON
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
}`,ng=`#define TOON
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
}`,ig=`uniform float size;
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
}`,rg=`uniform vec3 diffuse;
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
}`,sg=`#include <common>
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
}`,og=`uniform vec3 color;
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
}`,ag=`uniform float rotation;
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
}`,cg=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Pf,alphahash_pars_fragment:If,alphamap_fragment:Lf,alphamap_pars_fragment:Df,alphatest_fragment:Uf,alphatest_pars_fragment:Nf,aomap_fragment:Ff,aomap_pars_fragment:Of,batching_pars_vertex:Bf,batching_vertex:zf,begin_vertex:kf,beginnormal_vertex:Hf,bsdfs:Vf,iridescence_fragment:Gf,bumpmap_pars_fragment:Wf,clipping_planes_fragment:Xf,clipping_planes_pars_fragment:qf,clipping_planes_pars_vertex:Yf,clipping_planes_vertex:Zf,color_fragment:$f,color_pars_fragment:Kf,color_pars_vertex:jf,color_vertex:Jf,common:Qf,cube_uv_reflection_fragment:ep,defaultnormal_vertex:tp,displacementmap_pars_vertex:np,displacementmap_vertex:ip,emissivemap_fragment:rp,emissivemap_pars_fragment:sp,colorspace_fragment:op,colorspace_pars_fragment:ap,envmap_fragment:cp,envmap_common_pars_fragment:lp,envmap_pars_fragment:up,envmap_pars_vertex:dp,envmap_physical_pars_fragment:yp,envmap_vertex:hp,fog_vertex:fp,fog_pars_vertex:pp,fog_fragment:mp,fog_pars_fragment:gp,gradientmap_pars_fragment:_p,lightmap_pars_fragment:xp,lights_lambert_fragment:vp,lights_lambert_pars_fragment:Mp,lights_pars_begin:Sp,lights_toon_fragment:Ep,lights_toon_pars_fragment:bp,lights_phong_fragment:Tp,lights_phong_pars_fragment:Ap,lights_physical_fragment:wp,lights_physical_pars_fragment:Rp,lights_fragment_begin:Cp,lights_fragment_maps:Pp,lights_fragment_end:Ip,logdepthbuf_fragment:Lp,logdepthbuf_pars_fragment:Dp,logdepthbuf_pars_vertex:Up,logdepthbuf_vertex:Np,map_fragment:Fp,map_pars_fragment:Op,map_particle_fragment:Bp,map_particle_pars_fragment:zp,metalnessmap_fragment:kp,metalnessmap_pars_fragment:Hp,morphinstance_vertex:Vp,morphcolor_vertex:Gp,morphnormal_vertex:Wp,morphtarget_pars_vertex:Xp,morphtarget_vertex:qp,normal_fragment_begin:Yp,normal_fragment_maps:Zp,normal_pars_fragment:$p,normal_pars_vertex:Kp,normal_vertex:jp,normalmap_pars_fragment:Jp,clearcoat_normal_fragment_begin:Qp,clearcoat_normal_fragment_maps:em,clearcoat_pars_fragment:tm,iridescence_pars_fragment:nm,opaque_fragment:im,packing:rm,premultiplied_alpha_fragment:sm,project_vertex:om,dithering_fragment:am,dithering_pars_fragment:cm,roughnessmap_fragment:lm,roughnessmap_pars_fragment:um,shadowmap_pars_fragment:dm,shadowmap_pars_vertex:hm,shadowmap_vertex:fm,shadowmask_pars_fragment:pm,skinbase_vertex:mm,skinning_pars_vertex:gm,skinning_vertex:_m,skinnormal_vertex:xm,specularmap_fragment:vm,specularmap_pars_fragment:Mm,tonemapping_fragment:Sm,tonemapping_pars_fragment:ym,transmission_fragment:Em,transmission_pars_fragment:bm,uv_pars_fragment:Tm,uv_pars_vertex:Am,uv_vertex:wm,worldpos_vertex:Rm,background_vert:Cm,background_frag:Pm,backgroundCube_vert:Im,backgroundCube_frag:Lm,cube_vert:Dm,cube_frag:Um,depth_vert:Nm,depth_frag:Fm,distanceRGBA_vert:Om,distanceRGBA_frag:Bm,equirect_vert:zm,equirect_frag:km,linedashed_vert:Hm,linedashed_frag:Vm,meshbasic_vert:Gm,meshbasic_frag:Wm,meshlambert_vert:Xm,meshlambert_frag:qm,meshmatcap_vert:Ym,meshmatcap_frag:Zm,meshnormal_vert:$m,meshnormal_frag:Km,meshphong_vert:jm,meshphong_frag:Jm,meshphysical_vert:Qm,meshphysical_frag:eg,meshtoon_vert:tg,meshtoon_frag:ng,points_vert:ig,points_frag:rg,shadow_vert:sg,shadow_frag:og,sprite_vert:ag,sprite_frag:cg},Me={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},gn={basic:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Nt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Nt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Nt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Nt([Me.points,Me.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Nt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Nt([Me.common,Me.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Nt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Nt([Me.sprite,Me.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Nt([Me.common,Me.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Nt([Me.lights,Me.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};gn.physical={uniforms:Nt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Cs={r:0,b:0,g:0},oi=new yn,lg=new ot;function ug(n,e,t,i,r,s,o){const a=new qe(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function _(x){let v=!1;const E=g(x);E===null?d(a,l):E&&E.isColor&&(d(E,1),v=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===Qs)?(u===void 0&&(u=new We(new bi(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:dr(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),oi.copy(v.backgroundRotation),oi.x*=-1,oi.y*=-1,oi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(lg.makeRotationFromEuler(oi)),u.material.toneMapped=Qe.getTransfer(E.colorSpace)!==nt,(h!==E||f!==E.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=E,f=E.version,p=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new We(new no(2,2),new On({name:"BackgroundMaterial",uniforms:dr(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(E.colorSpace)!==nt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=E,f=E.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function d(x,v){x.getRGB(Cs,$u(n)),i.buffers.color.setClear(Cs.r,Cs.g,Cs.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,d(a,l)},render:_,addToRenderList:m,dispose:b}}function dg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(S,P,D,L,N){let O=!1;const B=h(L,D,P);s!==B&&(s=B,c(s.object)),O=p(S,L,D,N),O&&g(S,L,D,N),N!==null&&e.update(N,n.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,v(S,P,D,L),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function h(S,P,D){const L=D.wireframe===!0;let N=i[S.id];N===void 0&&(N={},i[S.id]=N);let O=N[P.id];O===void 0&&(O={},N[P.id]=O);let B=O[L];return B===void 0&&(B=f(l()),O[L]=B),B}function f(S){const P=[],D=[],L=[];for(let N=0;N<t;N++)P[N]=0,D[N]=0,L[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:L,object:S,attributes:{},index:null}}function p(S,P,D,L){const N=s.attributes,O=P.attributes;let B=0;const K=D.getAttributes();for(const V in K)if(K[V].location>=0){const F=N[V];let Q=O[V];if(Q===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor)),F===void 0||F.attribute!==Q||Q&&F.data!==Q.data)return!0;B++}return s.attributesNum!==B||s.index!==L}function g(S,P,D,L){const N={},O=P.attributes;let B=0;const K=D.getAttributes();for(const V in K)if(K[V].location>=0){let F=O[V];F===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(F=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(F=S.instanceColor));const Q={};Q.attribute=F,F&&F.data&&(Q.data=F.data),N[V]=Q,B++}s.attributes=N,s.attributesNum=B,s.index=L}function _(){const S=s.newAttributes;for(let P=0,D=S.length;P<D;P++)S[P]=0}function m(S){d(S,0)}function d(S,P){const D=s.newAttributes,L=s.enabledAttributes,N=s.attributeDivisors;D[S]=1,L[S]===0&&(n.enableVertexAttribArray(S),L[S]=1),N[S]!==P&&(n.vertexAttribDivisor(S,P),N[S]=P)}function b(){const S=s.newAttributes,P=s.enabledAttributes;for(let D=0,L=P.length;D<L;D++)P[D]!==S[D]&&(n.disableVertexAttribArray(D),P[D]=0)}function x(S,P,D,L,N,O,B){B===!0?n.vertexAttribIPointer(S,P,D,N,O):n.vertexAttribPointer(S,P,D,L,N,O)}function v(S,P,D,L){_();const N=L.attributes,O=D.getAttributes(),B=P.defaultAttributeValues;for(const K in O){const V=O[K];if(V.location>=0){let te=N[K];if(te===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(te=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(te=S.instanceColor)),te!==void 0){const F=te.normalized,Q=te.itemSize,ie=e.get(te);if(ie===void 0)continue;const Ie=ie.buffer,Ue=ie.type,z=ie.bytesPerElement,se=Ue===n.INT||Ue===n.UNSIGNED_INT||te.gpuType===oc;if(te.isInterleavedBufferAttribute){const re=te.data,Ce=re.stride,Ae=te.offset;if(re.isInstancedInterleavedBuffer){for(let X=0;X<V.locationSize;X++)d(V.location+X,re.meshPerAttribute);S.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let X=0;X<V.locationSize;X++)m(V.location+X);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let X=0;X<V.locationSize;X++)x(V.location+X,Q/V.locationSize,Ue,F,Ce*z,(Ae+Q/V.locationSize*X)*z,se)}else{if(te.isInstancedBufferAttribute){for(let re=0;re<V.locationSize;re++)d(V.location+re,te.meshPerAttribute);S.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let re=0;re<V.locationSize;re++)m(V.location+re);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let re=0;re<V.locationSize;re++)x(V.location+re,Q/V.locationSize,Ue,F,Q*z,Q/V.locationSize*re*z,se)}}else if(B!==void 0){const F=B[K];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(V.location,F);break;case 3:n.vertexAttrib3fv(V.location,F);break;case 4:n.vertexAttrib4fv(V.location,F);break;default:n.vertexAttrib1fv(V.location,F)}}}}b()}function E(){R();for(const S in i){const P=i[S];for(const D in P){const L=P[D];for(const N in L)u(L[N].object),delete L[N];delete P[D]}delete i[S]}}function A(S){if(i[S.id]===void 0)return;const P=i[S.id];for(const D in P){const L=P[D];for(const N in L)u(L[N].object),delete L[N];delete P[D]}delete i[S.id]}function C(S){for(const P in i){const D=i[P];if(D[S.id]===void 0)continue;const L=D[S.id];for(const N in L)u(L[N].object),delete L[N];delete D[S.id]}}function R(){y(),o=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:y,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function hg(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function fg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==dn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const R=C===Qr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Sn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==vn&&!R)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:E,maxSamples:A}}function pg(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new di,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:i,x=b*4;let v=d.clippingState||null;l.value=v,v=u(g,f,x,p);for(let E=0;E!==x;++E)v[E]=t[E];d.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let x=0,v=p;x!==_;++x,v+=4)o.copy(h[x]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function mg(n){let e=new WeakMap;function t(o,a){return a===fa?o.mapping=cr:a===pa&&(o.mapping=lr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===fa||a===pa)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new df(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ji=4,ml=[.125,.215,.35,.446,.526,.582],pi=20,ko=new Sc,gl=new qe;let Ho=null,Vo=0,Go=0,Wo=!1;const hi=(1+Math.sqrt(5))/2,Hi=1/hi,_l=[new G(-hi,Hi,0),new G(hi,Hi,0),new G(-Hi,0,hi),new G(Hi,0,hi),new G(0,hi,-Hi),new G(0,hi,Hi),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)],gg=new G;class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=gg}=s;Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ho,Vo,Go),this._renderer.xr.enabled=Wo,e.scissorTest=!1,Ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cr||e.mapping===lr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Qr,format:dn,colorSpace:ur,depthBuffer:!1},r=vl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_g(s)),this._blurMaterial=xg(s,e,t)}return r}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,ko)}_sceneToCubeUV(e,t,i,r,s){const l=new an(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(gl),h.toneMapping=Kn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const _=new jn({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),m=new We(new bi,_);let d=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,d=!0):(_.color.copy(gl),d=!0);for(let x=0;x<6;x++){const v=x%3;v===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):v===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const E=this._cubeSize;Ps(r,v*E,x>2?E:0,E,E),h.setRenderTarget(r),d&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=p,h.autoClear=f,e.background=b}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===cr||e.mapping===lr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ml());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new We(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ps(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,ko)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=_l[(r-s-1)%_l.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new We(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*pi-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):pi;m>pi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${pi}`);const d=[];let b=0;for(let C=0;C<pi;++C){const R=C/_,y=Math.exp(-R*R/2);d.push(y),C===0?b+=y:C<m&&(b+=2*y)}for(let C=0;C<d.length;C++)d[C]=d[C]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-i;const v=this._sizeLods[r],E=3*v*(r>x-ji?r-x+ji:0),A=4*(this._cubeSize-v);Ps(t,E,A,3*v,2*v),l.setRenderTarget(t),l.render(h,ko)}}function _g(n){const e=[],t=[],i=[];let r=n;const s=n-ji+1+ml.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ji?l=ml[o-n+ji-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,b=new Float32Array(_*g*p),x=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let A=0;A<p;A++){const C=A%3*2/3-1,R=A>2?0:-1,y=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];b.set(y,_*g*A),x.set(f,m*g*A);const S=[A,A,A,A,A,A];v.set(S,d*g*A)}const E=new gt;E.setAttribute("position",new pt(b,_)),E.setAttribute("uv",new pt(x,m)),E.setAttribute("faceIndex",new pt(v,d)),e.push(E),r>ji&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function vl(n,e,t){const i=new Ei(n,e,t);return i.texture.mapping=Qs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ps(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function xg(n,e,t){const i=new Float32Array(pi),r=new G(0,1,0);return new On({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:yc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ml(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Sl(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function yc(){return`

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
	`}function vg(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===fa||l===pa,u=l===cr||l===lr;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new xl(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new xl(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Mg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ir("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Sg(n,e,t,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function c(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let x=0,v=b.length;x<v;x+=3){const E=b[x+0],A=b[x+1],C=b[x+2];f.push(E,A,A,C,C,E)}}else if(g!==void 0){const b=g.array;_=g.version;for(let x=0,v=b.length/3-1;x<v;x+=3){const E=x+0,A=x+1,C=x+2;f.push(E,A,A,C,C,E)}}else return;const m=new(Wu(f)?Zu:Yu)(f,1);m.version=_;const d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function yg(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,s,f*o),t.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,f*o,g),t.update(p,i,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,i,1)}function h(f,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,_,0,g);let d=0;for(let b=0;b<g;b++)d+=p[b]*_[b];t.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Eg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function bg(n,e,t){const i=new WeakMap,r=new mt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let S=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var p=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let E=a.attributes.position.count*v,A=1;E>e.maxTextureSize&&(A=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const C=new Float32Array(E*A*4*h),R=new Xu(C,E,A,h);R.type=vn,R.needsUpdate=!0;const y=v*4;for(let P=0;P<h;P++){const D=d[P],L=b[P],N=x[P],O=E*A*4*P;for(let B=0;B<D.count;B++){const K=B*y;g===!0&&(r.fromBufferAttribute(D,B),C[O+K+0]=r.x,C[O+K+1]=r.y,C[O+K+2]=r.z,C[O+K+3]=0),_===!0&&(r.fromBufferAttribute(L,B),C[O+K+4]=r.x,C[O+K+5]=r.y,C[O+K+6]=r.z,C[O+K+7]=0),m===!0&&(r.fromBufferAttribute(N,B),C[O+K+8]=r.x,C[O+K+9]=r.y,C[O+K+10]=r.z,C[O+K+11]=N.itemSize===4?r.w:1)}}f={count:h,texture:R,size:new Ze(E,A)},i.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Tg(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const id=new Ft,yl=new ed(1,1),rd=new Xu,sd=new Yh,od=new ju,El=[],bl=[],Tl=new Float32Array(16),Al=new Float32Array(9),wl=new Float32Array(4);function vr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=El[r];if(s===void 0&&(s=new Float32Array(r),El[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function io(n,e){let t=bl[e];t===void 0&&(t=new Int32Array(e),bl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ag(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function wg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function Rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function Cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function Pg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;wl.set(i),n.uniformMatrix2fv(this.addr,!1,wl),yt(t,i)}}function Ig(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Al.set(i),n.uniformMatrix3fv(this.addr,!1,Al),yt(t,i)}}function Lg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Tl.set(i),n.uniformMatrix4fv(this.addr,!1,Tl),yt(t,i)}}function Dg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ug(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function Ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function Fg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function Og(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function Hg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(yl.compareFunction=Gu,s=yl):s=id,t.setTexture2D(e||s,r)}function Vg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||sd,r)}function Gg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||od,r)}function Wg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||rd,r)}function Xg(n){switch(n){case 5126:return Ag;case 35664:return wg;case 35665:return Rg;case 35666:return Cg;case 35674:return Pg;case 35675:return Ig;case 35676:return Lg;case 5124:case 35670:return Dg;case 35667:case 35671:return Ug;case 35668:case 35672:return Ng;case 35669:case 35673:return Fg;case 5125:return Og;case 36294:return Bg;case 36295:return zg;case 36296:return kg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Vg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Wg}}function qg(n,e){n.uniform1fv(this.addr,e)}function Yg(n,e){const t=vr(e,this.size,2);n.uniform2fv(this.addr,t)}function Zg(n,e){const t=vr(e,this.size,3);n.uniform3fv(this.addr,t)}function $g(n,e){const t=vr(e,this.size,4);n.uniform4fv(this.addr,t)}function Kg(n,e){const t=vr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function jg(n,e){const t=vr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Jg(n,e){const t=vr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Qg(n,e){n.uniform1iv(this.addr,e)}function e0(n,e){n.uniform2iv(this.addr,e)}function t0(n,e){n.uniform3iv(this.addr,e)}function n0(n,e){n.uniform4iv(this.addr,e)}function i0(n,e){n.uniform1uiv(this.addr,e)}function r0(n,e){n.uniform2uiv(this.addr,e)}function s0(n,e){n.uniform3uiv(this.addr,e)}function o0(n,e){n.uniform4uiv(this.addr,e)}function a0(n,e,t){const i=this.cache,r=e.length,s=io(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||id,s[o])}function c0(n,e,t){const i=this.cache,r=e.length,s=io(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||sd,s[o])}function l0(n,e,t){const i=this.cache,r=e.length,s=io(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||od,s[o])}function u0(n,e,t){const i=this.cache,r=e.length,s=io(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||rd,s[o])}function d0(n){switch(n){case 5126:return qg;case 35664:return Yg;case 35665:return Zg;case 35666:return $g;case 35674:return Kg;case 35675:return jg;case 35676:return Jg;case 5124:case 35670:return Qg;case 35667:case 35671:return e0;case 35668:case 35672:return t0;case 35669:case 35673:return n0;case 5125:return i0;case 36294:return r0;case 36295:return s0;case 36296:return o0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return c0;case 35680:case 36300:case 36308:case 36293:return l0;case 36289:case 36303:case 36311:case 36292:return u0}}class h0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Xg(t.type)}}class f0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=d0(t.type)}}class p0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function Rl(n,e){n.seq.push(e),n.map[e.id]=e}function m0(n,e,t){const i=n.name,r=i.length;for(Xo.lastIndex=0;;){const s=Xo.exec(i),o=Xo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Rl(t,c===void 0?new h0(a,n,e):new f0(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new p0(a),Rl(t,h)),t=h}}}class Xs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);m0(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const g0=37297;let _0=0;function x0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Pl=new Ve;function v0(n){Qe._getMatrix(Pl,Qe.workingColorSpace,n);const e=`mat3( ${Pl.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case Ys:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Il(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+x0(n.getShaderSource(e),a)}else return s}function M0(n,e){const t=v0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function S0(n,e){let t;switch(e){case yh:t="Linear";break;case Eh:t="Reinhard";break;case bh:t="Cineon";break;case Du:t="ACESFilmic";break;case Ah:t="AgX";break;case wh:t="Neutral";break;case Th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Is=new G;function y0(){Qe.getLuminanceCoefficients(Is);const n=Is.x.toFixed(4),e=Is.y.toFixed(4),t=Is.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Or).join(`
`)}function b0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function T0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Or(n){return n!==""}function Ll(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const A0=/^[ \t]*#include +<([\w\d./]+)>/gm;function qa(n){return n.replace(A0,R0)}const w0=new Map;function R0(n,e){let t=Ge[e];if(t===void 0){const i=w0.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return qa(t)}const C0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ul(n){return n.replace(C0,P0)}function P0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Nl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function I0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Iu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===th?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===In&&(e="SHADOWMAP_TYPE_VSM"),e}function L0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case cr:case lr:e="ENVMAP_TYPE_CUBE";break;case Qs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function D0(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===lr&&(e="ENVMAP_MODE_REFRACTION"),e}function U0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Lu:e="ENVMAP_BLENDING_MULTIPLY";break;case Mh:e="ENVMAP_BLENDING_MIX";break;case Sh:e="ENVMAP_BLENDING_ADD";break}return e}function N0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function F0(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=I0(t),c=L0(t),u=D0(t),h=U0(t),f=N0(t),p=E0(t),g=b0(s),_=r.createProgram();let m,d,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Or).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Or).join(`
`),d.length>0&&(d+=`
`)):(m=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Or).join(`
`),d=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Kn?S0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,M0("linearToOutputTexel",t.outputColorSpace),y0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Or).join(`
`)),o=qa(o),o=Ll(o,t),o=Dl(o,t),a=qa(a),a=Ll(a,t),a=Dl(a,t),o=Ul(o),a=Ul(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Hc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const x=b+m+o,v=b+d+a,E=Cl(r,r.VERTEX_SHADER,x),A=Cl(r,r.FRAGMENT_SHADER,v);r.attachShader(_,E),r.attachShader(_,A),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){const D=r.getProgramInfoLog(_)||"",L=r.getShaderInfoLog(E)||"",N=r.getShaderInfoLog(A)||"",O=D.trim(),B=L.trim(),K=N.trim();let V=!0,te=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,E,A);else{const F=Il(r,E,"vertex"),Q=Il(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+F+`
`+Q)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||K==="")&&(te=!1);te&&(P.diagnostics={runnable:V,programLog:O,vertexShader:{log:B,prefix:m},fragmentShader:{log:K,prefix:d}})}r.deleteShader(E),r.deleteShader(A),R=new Xs(r,_),y=T0(r,_)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,g0)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=A,this}let O0=0;class B0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new z0(e),t.set(e,i)),i}}class z0{constructor(e){this.id=O0++,this.code=e,this.usedTimes=0}}function k0(n,e,t,i,r,s,o){const a=new mc,l=new B0,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,S,P,D,L){const N=D.fog,O=L.geometry,B=y.isMeshStandardMaterial?D.environment:null,K=(y.isMeshStandardMaterial?t:e).get(y.envMap||B),V=K&&K.mapping===Qs?K.image.height:null,te=g[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const F=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Q=F!==void 0?F.length:0;let ie=0;O.morphAttributes.position!==void 0&&(ie=1),O.morphAttributes.normal!==void 0&&(ie=2),O.morphAttributes.color!==void 0&&(ie=3);let Ie,Ue,z,se;if(te){const et=gn[te];Ie=et.vertexShader,Ue=et.fragmentShader}else Ie=y.vertexShader,Ue=y.fragmentShader,l.update(y),z=l.getVertexShaderID(y),se=l.getFragmentShaderID(y);const re=n.getRenderTarget(),Ce=n.state.buffers.depth.getReversed(),Ae=L.isInstancedMesh===!0,X=L.isBatchedMesh===!0,ge=!!y.map,q=!!y.matcap,w=!!K,pe=!!y.aoMap,he=!!y.lightMap,_e=!!y.bumpMap,le=!!y.normalMap,Se=!!y.displacementMap,j=!!y.emissiveMap,fe=!!y.metalnessMap,Ke=!!y.roughnessMap,Xe=y.anisotropy>0,I=y.clearcoat>0,M=y.dispersion>0,W=y.iridescence>0,$=y.sheen>0,ne=y.transmission>0,J=Xe&&!!y.anisotropyMap,be=I&&!!y.clearcoatMap,ue=I&&!!y.clearcoatNormalMap,we=I&&!!y.clearcoatRoughnessMap,Le=W&&!!y.iridescenceMap,ce=W&&!!y.iridescenceThicknessMap,xe=$&&!!y.sheenColorMap,Ne=$&&!!y.sheenRoughnessMap,Re=!!y.specularMap,ve=!!y.specularColorMap,Be=!!y.specularIntensityMap,U=ne&&!!y.transmissionMap,oe=ne&&!!y.thicknessMap,me=!!y.gradientMap,Ee=!!y.alphaMap,ae=y.alphaTest>0,ee=!!y.alphaHash,Pe=!!y.extensions;let ke=Kn;y.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ke=n.toneMapping);const st={shaderID:te,shaderType:y.type,shaderName:y.name,vertexShader:Ie,fragmentShader:Ue,defines:y.defines,customVertexShaderID:z,customFragmentShaderID:se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:X,batchingColor:X&&L._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&L.instanceColor!==null,instancingMorph:Ae&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ur,alphaToCoverage:!!y.alphaToCoverage,map:ge,matcap:q,envMap:w,envMapMode:w&&K.mapping,envMapCubeUVHeight:V,aoMap:pe,lightMap:he,bumpMap:_e,normalMap:le,displacementMap:f&&Se,emissiveMap:j,normalMapObjectSpace:le&&y.normalMapType===Ih,normalMapTangentSpace:le&&y.normalMapType===Vu,metalnessMap:fe,roughnessMap:Ke,anisotropy:Xe,anisotropyMap:J,clearcoat:I,clearcoatMap:be,clearcoatNormalMap:ue,clearcoatRoughnessMap:we,dispersion:M,iridescence:W,iridescenceMap:Le,iridescenceThicknessMap:ce,sheen:$,sheenColorMap:xe,sheenRoughnessMap:Ne,specularMap:Re,specularColorMap:ve,specularIntensityMap:Be,transmission:ne,transmissionMap:U,thicknessMap:oe,gradientMap:me,opaque:y.transparent===!1&&y.blending===nr&&y.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ae,alphaHash:ee,combine:y.combine,mapUv:ge&&_(y.map.channel),aoMapUv:pe&&_(y.aoMap.channel),lightMapUv:he&&_(y.lightMap.channel),bumpMapUv:_e&&_(y.bumpMap.channel),normalMapUv:le&&_(y.normalMap.channel),displacementMapUv:Se&&_(y.displacementMap.channel),emissiveMapUv:j&&_(y.emissiveMap.channel),metalnessMapUv:fe&&_(y.metalnessMap.channel),roughnessMapUv:Ke&&_(y.roughnessMap.channel),anisotropyMapUv:J&&_(y.anisotropyMap.channel),clearcoatMapUv:be&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ue&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&_(y.sheenRoughnessMap.channel),specularMapUv:Re&&_(y.specularMap.channel),specularColorMapUv:ve&&_(y.specularColorMap.channel),specularIntensityMapUv:Be&&_(y.specularIntensityMap.channel),transmissionMapUv:U&&_(y.transmissionMap.channel),thicknessMapUv:oe&&_(y.thicknessMap.channel),alphaMapUv:Ee&&_(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(le||Xe),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!O.attributes.uv&&(ge||Ee),fog:!!N,useFog:y.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ce,skinning:L.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ie,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:ge&&y.map.isVideoTexture===!0&&Qe.getTransfer(y.map.colorSpace)===nt,decodeVideoTextureEmissive:j&&y.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(y.emissiveMap.colorSpace)===nt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===At,flipSided:y.side===Wt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Pe&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&y.extensions.multiDraw===!0||X)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function d(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)S.push(P),S.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(b(S,y),x(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function b(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function x(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const S=g[y.type];let P;if(S){const D=gn[S];P=af.clone(D.uniforms)}else P=y.uniforms;return P}function E(y,S){let P;for(let D=0,L=u.length;D<L;D++){const N=u[D];if(N.cacheKey===S){P=N,++P.usedTimes;break}}return P===void 0&&(P=new F0(n,S,y,s),u.push(P)),P}function A(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function C(y){l.remove(y)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:E,releaseProgram:A,releaseShaderCache:C,programs:u,dispose:R}}function H0(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function V0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Fl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ol(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,f,p,g,_,m){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),e++,d}function a(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||V0),i.length>1&&i.sort(f||Fl),r.length>1&&r.sort(f||Fl)}function u(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function G0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Ol,n.set(i,[o])):r>=s.length?(o=new Ol,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function W0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new qe};break;case"SpotLight":t={position:new G,direction:new G,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new G,halfWidth:new G,halfHeight:new G};break}return n[e.id]=t,t}}}function X0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let q0=0;function Y0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Z0(n){const e=new W0,t=X0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);const r=new G,s=new ot,o=new ot;function a(c){let u=0,h=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,b=0,x=0,v=0,E=0,A=0,C=0;c.sort(Y0);for(let y=0,S=c.length;y<S;y++){const P=c[y],D=P.color,L=P.intensity,N=P.distance,O=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=D.r*L,h+=D.g*L,f+=D.b*L;else if(P.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(P.sh.coefficients[B],L);C++}else if(P.isDirectionalLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,V=t.get(P);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=O,i.directionalShadowMatrix[p]=P.shadow.matrix,b++}i.directional[p]=B,p++}else if(P.isSpotLight){const B=e.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(D).multiplyScalar(L),B.distance=N,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,i.spot[_]=B;const K=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,K.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[_]=K.matrix,P.castShadow){const V=t.get(P);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=O,v++}_++}else if(P.isRectAreaLight){const B=e.get(P);B.color.copy(D).multiplyScalar(L),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=B,m++}else if(P.isPointLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){const K=P.shadow,V=t.get(P);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=O,i.pointShadowMatrix[g]=P.shadow.matrix,x++}i.point[g]=B,g++}else if(P.isHemisphereLight){const B=e.get(P);B.skyColor.copy(P.color).multiplyScalar(L),B.groundColor.copy(P.groundColor).multiplyScalar(L),i.hemi[d]=B,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const R=i.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==d||R.numDirectionalShadows!==b||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==E||R.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=v+E-A,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,R.directionalLength=p,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=d,R.numDirectionalShadows=b,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=E,R.numLightProbes=C,i.version=q0++)}function l(c,u){let h=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let d=0,b=c.length;d<b;d++){const x=c[d];if(x.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(x.isSpotLight){const v=i.spot[p];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Bl(n){const e=new Z0(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function $0(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Bl(n),e.set(r,[a])):s>=o.length?(a=new Bl(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const K0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,j0=`uniform sampler2D shadow_pass;
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
}`;function J0(n,e,t){let i=new _c;const r=new Ze,s=new Ze,o=new mt,a=new Mf({depthPacking:Ph}),l=new Sf,c={},u=t.maxTextureSize,h={[Jn]:Wt,[Wt]:Jn,[At]:At},f=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:K0,fragmentShader:j0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new gt;g.setAttribute("position",new pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new We(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Iu;let d=this.type;this.render=function(A,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const y=n.getRenderTarget(),S=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),D=n.state;D.setBlending($n),D.buffers.depth.getReversed()?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const L=d!==In&&this.type===In,N=d===In&&this.type!==In;for(let O=0,B=A.length;O<B;O++){const K=A[O],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const te=V.getFrameExtents();if(r.multiply(te),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/te.x),r.x=s.x*te.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/te.y),r.y=s.y*te.y,V.mapSize.y=s.y)),V.map===null||L===!0||N===!0){const Q=this.type!==In?{minFilter:Kt,magFilter:Kt}:{};V.map!==null&&V.map.dispose(),V.map=new Ei(r.x,r.y,Q),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const F=V.getViewportCount();for(let Q=0;Q<F;Q++){const ie=V.getViewport(Q);o.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),D.viewport(o),V.updateMatrices(K,Q),i=V.getFrustum(),v(C,R,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===In&&b(V,R),V.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(y,S,P)};function b(A,C){const R=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ei(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(C,null,R,f,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(C,null,R,p,_,null)}function x(A,C,R,y){let S=null;const P=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)S=P;else if(S=R.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=S.uuid,L=C.uuid;let N=c[D];N===void 0&&(N={},c[D]=N);let O=N[L];O===void 0&&(O=S.clone(),N[L]=O,C.addEventListener("dispose",E)),S=O}if(S.visible=C.visible,S.wireframe=C.wireframe,y===In?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:h[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const D=n.properties.get(S);D.light=R}return S}function v(A,C,R,y,S){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===In)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const L=e.update(A),N=A.material;if(Array.isArray(N)){const O=L.groups;for(let B=0,K=O.length;B<K;B++){const V=O[B],te=N[V.materialIndex];if(te&&te.visible){const F=x(A,te,y,S);A.onBeforeShadow(n,A,C,R,L,F,V),n.renderBufferDirect(R,null,L,F,A,V),A.onAfterShadow(n,A,C,R,L,F,V)}}}else if(N.visible){const O=x(A,N,y,S);A.onBeforeShadow(n,A,C,R,L,O,null),n.renderBufferDirect(R,null,L,O,A,null),A.onAfterShadow(n,A,C,R,L,O,null)}}const D=A.children;for(let L=0,N=D.length;L<N;L++)v(D[L],C,R,y,S)}function E(A){A.target.removeEventListener("dispose",E);for(const R in c){const y=c[R],S=A.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const Q0={[oa]:aa,[ca]:da,[la]:ha,[ar]:ua,[aa]:oa,[da]:ca,[ha]:la,[ua]:ar};function e_(n,e){function t(){let U=!1;const oe=new mt;let me=null;const Ee=new mt(0,0,0,0);return{setMask:function(ae){me!==ae&&!U&&(n.colorMask(ae,ae,ae,ae),me=ae)},setLocked:function(ae){U=ae},setClear:function(ae,ee,Pe,ke,st){st===!0&&(ae*=ke,ee*=ke,Pe*=ke),oe.set(ae,ee,Pe,ke),Ee.equals(oe)===!1&&(n.clearColor(ae,ee,Pe,ke),Ee.copy(oe))},reset:function(){U=!1,me=null,Ee.set(-1,0,0,0)}}}function i(){let U=!1,oe=!1,me=null,Ee=null,ae=null;return{setReversed:function(ee){if(oe!==ee){const Pe=e.get("EXT_clip_control");ee?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),oe=ee;const ke=ae;ae=null,this.setClear(ke)}},getReversed:function(){return oe},setTest:function(ee){ee?re(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(ee){me!==ee&&!U&&(n.depthMask(ee),me=ee)},setFunc:function(ee){if(oe&&(ee=Q0[ee]),Ee!==ee){switch(ee){case oa:n.depthFunc(n.NEVER);break;case aa:n.depthFunc(n.ALWAYS);break;case ca:n.depthFunc(n.LESS);break;case ar:n.depthFunc(n.LEQUAL);break;case la:n.depthFunc(n.EQUAL);break;case ua:n.depthFunc(n.GEQUAL);break;case da:n.depthFunc(n.GREATER);break;case ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=ee}},setLocked:function(ee){U=ee},setClear:function(ee){ae!==ee&&(oe&&(ee=1-ee),n.clearDepth(ee),ae=ee)},reset:function(){U=!1,me=null,Ee=null,ae=null,oe=!1}}}function r(){let U=!1,oe=null,me=null,Ee=null,ae=null,ee=null,Pe=null,ke=null,st=null;return{setTest:function(et){U||(et?re(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(et){oe!==et&&!U&&(n.stencilMask(et),oe=et)},setFunc:function(et,En,pn){(me!==et||Ee!==En||ae!==pn)&&(n.stencilFunc(et,En,pn),me=et,Ee=En,ae=pn)},setOp:function(et,En,pn){(ee!==et||Pe!==En||ke!==pn)&&(n.stencilOp(et,En,pn),ee=et,Pe=En,ke=pn)},setLocked:function(et){U=et},setClear:function(et){st!==et&&(n.clearStencil(et),st=et)},reset:function(){U=!1,oe=null,me=null,Ee=null,ae=null,ee=null,Pe=null,ke=null,st=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,b=null,x=null,v=null,E=null,A=null,C=new qe(0,0,0),R=0,y=!1,S=null,P=null,D=null,L=null,N=null;const O=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,K=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),B=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),B=K>=2);let te=null,F={};const Q=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),Ie=new mt().fromArray(Q),Ue=new mt().fromArray(ie);function z(U,oe,me,Ee){const ae=new Uint8Array(4),ee=n.createTexture();n.bindTexture(U,ee),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<me;Pe++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,ae):n.texImage2D(oe+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ae);return ee}const se={};se[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(n.DEPTH_TEST),o.setFunc(ar),_e(!1),le(Nc),re(n.CULL_FACE),pe($n);function re(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function Ce(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Ae(U,oe){return h[U]!==oe?(n.bindFramebuffer(U,oe),h[U]=oe,U===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=oe),U===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function X(U,oe){let me=p,Ee=!1;if(U){me=f.get(oe),me===void 0&&(me=[],f.set(oe,me));const ae=U.textures;if(me.length!==ae.length||me[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,Pe=ae.length;ee<Pe;ee++)me[ee]=n.COLOR_ATTACHMENT0+ee;me.length=ae.length,Ee=!0}}else me[0]!==n.BACK&&(me[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(me)}function ge(U){return g!==U?(n.useProgram(U),g=U,!0):!1}const q={[fi]:n.FUNC_ADD,[ih]:n.FUNC_SUBTRACT,[rh]:n.FUNC_REVERSE_SUBTRACT};q[sh]=n.MIN,q[oh]=n.MAX;const w={[ah]:n.ZERO,[ch]:n.ONE,[lh]:n.SRC_COLOR,[ra]:n.SRC_ALPHA,[mh]:n.SRC_ALPHA_SATURATE,[fh]:n.DST_COLOR,[dh]:n.DST_ALPHA,[uh]:n.ONE_MINUS_SRC_COLOR,[sa]:n.ONE_MINUS_SRC_ALPHA,[ph]:n.ONE_MINUS_DST_COLOR,[hh]:n.ONE_MINUS_DST_ALPHA,[gh]:n.CONSTANT_COLOR,[_h]:n.ONE_MINUS_CONSTANT_COLOR,[xh]:n.CONSTANT_ALPHA,[vh]:n.ONE_MINUS_CONSTANT_ALPHA};function pe(U,oe,me,Ee,ae,ee,Pe,ke,st,et){if(U===$n){_===!0&&(Ce(n.BLEND),_=!1);return}if(_===!1&&(re(n.BLEND),_=!0),U!==nh){if(U!==m||et!==y){if((d!==fi||v!==fi)&&(n.blendEquation(n.FUNC_ADD),d=fi,v=fi),et)switch(U){case nr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fc:n.blendFunc(n.ONE,n.ONE);break;case Oc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case nr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Oc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,x=null,E=null,A=null,C.set(0,0,0),R=0,m=U,y=et}return}ae=ae||oe,ee=ee||me,Pe=Pe||Ee,(oe!==d||ae!==v)&&(n.blendEquationSeparate(q[oe],q[ae]),d=oe,v=ae),(me!==b||Ee!==x||ee!==E||Pe!==A)&&(n.blendFuncSeparate(w[me],w[Ee],w[ee],w[Pe]),b=me,x=Ee,E=ee,A=Pe),(ke.equals(C)===!1||st!==R)&&(n.blendColor(ke.r,ke.g,ke.b,st),C.copy(ke),R=st),m=U,y=!1}function he(U,oe){U.side===At?Ce(n.CULL_FACE):re(n.CULL_FACE);let me=U.side===Wt;oe&&(me=!me),_e(me),U.blending===nr&&U.transparent===!1?pe($n):pe(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Ee=U.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),j(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function _e(U){S!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),S=U)}function le(U){U!==Qd?(re(n.CULL_FACE),U!==P&&(U===Nc?n.cullFace(n.BACK):U===eh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),P=U}function Se(U){U!==D&&(B&&n.lineWidth(U),D=U)}function j(U,oe,me){U?(re(n.POLYGON_OFFSET_FILL),(L!==oe||N!==me)&&(n.polygonOffset(oe,me),L=oe,N=me)):Ce(n.POLYGON_OFFSET_FILL)}function fe(U){U?re(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function Ke(U){U===void 0&&(U=n.TEXTURE0+O-1),te!==U&&(n.activeTexture(U),te=U)}function Xe(U,oe,me){me===void 0&&(te===null?me=n.TEXTURE0+O-1:me=te);let Ee=F[me];Ee===void 0&&(Ee={type:void 0,texture:void 0},F[me]=Ee),(Ee.type!==U||Ee.texture!==oe)&&(te!==me&&(n.activeTexture(me),te=me),n.bindTexture(U,oe||se[U]),Ee.type=U,Ee.texture=oe)}function I(){const U=F[te];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function M(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ue(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Le(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(U){Ie.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),Ie.copy(U))}function Ne(U){Ue.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Ue.copy(U))}function Re(U,oe){let me=c.get(oe);me===void 0&&(me=new WeakMap,c.set(oe,me));let Ee=me.get(U);Ee===void 0&&(Ee=n.getUniformBlockIndex(oe,U.name),me.set(U,Ee))}function ve(U,oe){const Ee=c.get(oe).get(U);l.get(oe)!==Ee&&(n.uniformBlockBinding(oe,Ee,U.__bindingPointIndex),l.set(oe,Ee))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},te=null,F={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,b=null,x=null,v=null,E=null,A=null,C=new qe(0,0,0),R=0,y=!1,S=null,P=null,D=null,L=null,N=null,Ie.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Ce,bindFramebuffer:Ae,drawBuffers:X,useProgram:ge,setBlending:pe,setMaterial:he,setFlipSided:_e,setCullFace:le,setLineWidth:Se,setPolygonOffset:j,setScissorTest:fe,activeTexture:Ke,bindTexture:Xe,unbindTexture:I,compressedTexImage2D:M,compressedTexImage3D:W,texImage2D:Le,texImage3D:ce,updateUBOMapping:Re,uniformBlockBinding:ve,texStorage2D:ue,texStorage3D:we,texSubImage2D:$,texSubImage3D:ne,compressedTexSubImage2D:J,compressedTexSubImage3D:be,scissor:xe,viewport:Ne,reset:Be}}function t_(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ze,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,M){return p?new OffscreenCanvas(I,M):$s("canvas")}function _(I,M,W){let $=1;const ne=Xe(I);if((ne.width>W||ne.height>W)&&($=W/Math.max(ne.width,ne.height)),$<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const J=Math.floor($*ne.width),be=Math.floor($*ne.height);h===void 0&&(h=g(J,be));const ue=M?g(J,be):h;return ue.width=J,ue.height=be,ue.getContext("2d").drawImage(I,0,0,J,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+J+"x"+be+")."),ue}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),I;return I}function m(I){return I.generateMipmaps}function d(I){n.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(I,M,W,$,ne=!1){if(I!==null){if(n[I]!==void 0)return n[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let J=M;if(M===n.RED&&(W===n.FLOAT&&(J=n.R32F),W===n.HALF_FLOAT&&(J=n.R16F),W===n.UNSIGNED_BYTE&&(J=n.R8)),M===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.R8UI),W===n.UNSIGNED_SHORT&&(J=n.R16UI),W===n.UNSIGNED_INT&&(J=n.R32UI),W===n.BYTE&&(J=n.R8I),W===n.SHORT&&(J=n.R16I),W===n.INT&&(J=n.R32I)),M===n.RG&&(W===n.FLOAT&&(J=n.RG32F),W===n.HALF_FLOAT&&(J=n.RG16F),W===n.UNSIGNED_BYTE&&(J=n.RG8)),M===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RG8UI),W===n.UNSIGNED_SHORT&&(J=n.RG16UI),W===n.UNSIGNED_INT&&(J=n.RG32UI),W===n.BYTE&&(J=n.RG8I),W===n.SHORT&&(J=n.RG16I),W===n.INT&&(J=n.RG32I)),M===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGB8UI),W===n.UNSIGNED_SHORT&&(J=n.RGB16UI),W===n.UNSIGNED_INT&&(J=n.RGB32UI),W===n.BYTE&&(J=n.RGB8I),W===n.SHORT&&(J=n.RGB16I),W===n.INT&&(J=n.RGB32I)),M===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),W===n.UNSIGNED_INT&&(J=n.RGBA32UI),W===n.BYTE&&(J=n.RGBA8I),W===n.SHORT&&(J=n.RGBA16I),W===n.INT&&(J=n.RGBA32I)),M===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),M===n.RGBA){const be=ne?Ys:Qe.getTransfer($);W===n.FLOAT&&(J=n.RGBA32F),W===n.HALF_FLOAT&&(J=n.RGBA16F),W===n.UNSIGNED_BYTE&&(J=be===nt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function v(I,M){let W;return I?M===null||M===yi||M===Zr?W=n.DEPTH24_STENCIL8:M===vn?W=n.DEPTH32F_STENCIL8:M===Yr&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===yi||M===Zr?W=n.DEPTH_COMPONENT24:M===vn?W=n.DEPTH_COMPONENT32F:M===Yr&&(W=n.DEPTH_COMPONENT16),W}function E(I,M){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Kt&&I.minFilter!==xn?Math.log2(Math.max(M.width,M.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?M.mipmaps.length:1}function A(I){const M=I.target;M.removeEventListener("dispose",A),R(M),M.isVideoTexture&&u.delete(M)}function C(I){const M=I.target;M.removeEventListener("dispose",C),S(M)}function R(I){const M=i.get(I);if(M.__webglInit===void 0)return;const W=I.source,$=f.get(W);if($){const ne=$[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&y(I),Object.keys($).length===0&&f.delete(W)}i.remove(I)}function y(I){const M=i.get(I);n.deleteTexture(M.__webglTexture);const W=I.source,$=f.get(W);delete $[M.__cacheKey],o.memory.textures--}function S(I){const M=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(M.__webglFramebuffer[$]))for(let ne=0;ne<M.__webglFramebuffer[$].length;ne++)n.deleteFramebuffer(M.__webglFramebuffer[$][ne]);else n.deleteFramebuffer(M.__webglFramebuffer[$]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[$])}else{if(Array.isArray(M.__webglFramebuffer))for(let $=0;$<M.__webglFramebuffer.length;$++)n.deleteFramebuffer(M.__webglFramebuffer[$]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let $=0;$<M.__webglColorRenderbuffer.length;$++)M.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[$]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const W=I.textures;for(let $=0,ne=W.length;$<ne;$++){const J=i.get(W[$]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),o.memory.textures--),i.remove(W[$])}i.remove(I)}let P=0;function D(){P=0}function L(){const I=P;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),P+=1,I}function N(I){const M=[];return M.push(I.wrapS),M.push(I.wrapT),M.push(I.wrapR||0),M.push(I.magFilter),M.push(I.minFilter),M.push(I.anisotropy),M.push(I.internalFormat),M.push(I.format),M.push(I.type),M.push(I.generateMipmaps),M.push(I.premultiplyAlpha),M.push(I.flipY),M.push(I.unpackAlignment),M.push(I.colorSpace),M.join()}function O(I,M){const W=i.get(I);if(I.isVideoTexture&&fe(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&W.__version!==I.version){const $=I.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(W,I,M);return}}else I.isExternalTexture&&(W.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+M)}function B(I,M){const W=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){se(W,I,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+M)}function K(I,M){const W=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){se(W,I,M);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+M)}function V(I,M){const W=i.get(I);if(I.version>0&&W.__version!==I.version){re(W,I,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+M)}const te={[ma]:n.REPEAT,[mi]:n.CLAMP_TO_EDGE,[ga]:n.MIRRORED_REPEAT},F={[Kt]:n.NEAREST,[Rh]:n.NEAREST_MIPMAP_NEAREST,[cs]:n.NEAREST_MIPMAP_LINEAR,[xn]:n.LINEAR,[fo]:n.LINEAR_MIPMAP_NEAREST,[gi]:n.LINEAR_MIPMAP_LINEAR},Q={[Lh]:n.NEVER,[Bh]:n.ALWAYS,[Dh]:n.LESS,[Gu]:n.LEQUAL,[Uh]:n.EQUAL,[Oh]:n.GEQUAL,[Nh]:n.GREATER,[Fh]:n.NOTEQUAL};function ie(I,M){if(M.type===vn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===xn||M.magFilter===fo||M.magFilter===cs||M.magFilter===gi||M.minFilter===xn||M.minFilter===fo||M.minFilter===cs||M.minFilter===gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,te[M.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,te[M.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,te[M.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,F[M.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,F[M.minFilter]),M.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,Q[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Kt||M.minFilter!==cs&&M.minFilter!==gi||M.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Ie(I,M){let W=!1;I.__webglInit===void 0&&(I.__webglInit=!0,M.addEventListener("dispose",A));const $=M.source;let ne=f.get($);ne===void 0&&(ne={},f.set($,ne));const J=N(M);if(J!==I.__cacheKey){ne[J]===void 0&&(ne[J]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ne[J].usedTimes++;const be=ne[I.__cacheKey];be!==void 0&&(ne[I.__cacheKey].usedTimes--,be.usedTimes===0&&y(M)),I.__cacheKey=J,I.__webglTexture=ne[J].texture}return W}function Ue(I,M,W){return Math.floor(Math.floor(I/W)/M)}function z(I,M,W,$){const J=I.updateRanges;if(J.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,W,$,M.data);else{J.sort((ce,xe)=>ce.start-xe.start);let be=0;for(let ce=1;ce<J.length;ce++){const xe=J[be],Ne=J[ce],Re=xe.start+xe.count,ve=Ue(Ne.start,M.width,4),Be=Ue(xe.start,M.width,4);Ne.start<=Re+1&&ve===Be&&Ue(Ne.start+Ne.count-1,M.width,4)===ve?xe.count=Math.max(xe.count,Ne.start+Ne.count-xe.start):(++be,J[be]=Ne)}J.length=be+1;const ue=n.getParameter(n.UNPACK_ROW_LENGTH),we=n.getParameter(n.UNPACK_SKIP_PIXELS),Le=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let ce=0,xe=J.length;ce<xe;ce++){const Ne=J[ce],Re=Math.floor(Ne.start/4),ve=Math.ceil(Ne.count/4),Be=Re%M.width,U=Math.floor(Re/M.width),oe=ve,me=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Be,U,oe,me,W,$,M.data)}I.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ue),n.pixelStorei(n.UNPACK_SKIP_PIXELS,we),n.pixelStorei(n.UNPACK_SKIP_ROWS,Le)}}function se(I,M,W){let $=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&($=n.TEXTURE_3D);const ne=Ie(I,M),J=M.source;t.bindTexture($,I.__webglTexture,n.TEXTURE0+W);const be=i.get(J);if(J.version!==be.__version||ne===!0){t.activeTexture(n.TEXTURE0+W);const ue=Qe.getPrimaries(Qe.workingColorSpace),we=M.colorSpace===qn?null:Qe.getPrimaries(M.colorSpace),Le=M.colorSpace===qn||ue===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let ce=_(M.image,!1,r.maxTextureSize);ce=Ke(M,ce);const xe=s.convert(M.format,M.colorSpace),Ne=s.convert(M.type);let Re=x(M.internalFormat,xe,Ne,M.colorSpace,M.isVideoTexture);ie($,M);let ve;const Be=M.mipmaps,U=M.isVideoTexture!==!0,oe=be.__version===void 0||ne===!0,me=J.dataReady,Ee=E(M,ce);if(M.isDepthTexture)Re=v(M.format===Kr,M.type),oe&&(U?t.texStorage2D(n.TEXTURE_2D,1,Re,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Re,ce.width,ce.height,0,xe,Ne,null));else if(M.isDataTexture)if(Be.length>0){U&&oe&&t.texStorage2D(n.TEXTURE_2D,Ee,Re,Be[0].width,Be[0].height);for(let ae=0,ee=Be.length;ae<ee;ae++)ve=Be[ae],U?me&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ve.width,ve.height,xe,Ne,ve.data):t.texImage2D(n.TEXTURE_2D,ae,Re,ve.width,ve.height,0,xe,Ne,ve.data);M.generateMipmaps=!1}else U?(oe&&t.texStorage2D(n.TEXTURE_2D,Ee,Re,ce.width,ce.height),me&&z(M,ce,xe,Ne)):t.texImage2D(n.TEXTURE_2D,0,Re,ce.width,ce.height,0,xe,Ne,ce.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){U&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Re,Be[0].width,Be[0].height,ce.depth);for(let ae=0,ee=Be.length;ae<ee;ae++)if(ve=Be[ae],M.format!==dn)if(xe!==null)if(U){if(me)if(M.layerUpdates.size>0){const Pe=pl(ve.width,ve.height,M.format,M.type);for(const ke of M.layerUpdates){const st=ve.data.subarray(ke*Pe/ve.data.BYTES_PER_ELEMENT,(ke+1)*Pe/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,ke,ve.width,ve.height,1,xe,st)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ve.width,ve.height,ce.depth,xe,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,Re,ve.width,ve.height,ce.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?me&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ve.width,ve.height,ce.depth,xe,Ne,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,Re,ve.width,ve.height,ce.depth,0,xe,Ne,ve.data)}else{U&&oe&&t.texStorage2D(n.TEXTURE_2D,Ee,Re,Be[0].width,Be[0].height);for(let ae=0,ee=Be.length;ae<ee;ae++)ve=Be[ae],M.format!==dn?xe!==null?U?me&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,ve.width,ve.height,xe,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,Re,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?me&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ve.width,ve.height,xe,Ne,ve.data):t.texImage2D(n.TEXTURE_2D,ae,Re,ve.width,ve.height,0,xe,Ne,ve.data)}else if(M.isDataArrayTexture)if(U){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Re,ce.width,ce.height,ce.depth),me)if(M.layerUpdates.size>0){const ae=pl(ce.width,ce.height,M.format,M.type);for(const ee of M.layerUpdates){const Pe=ce.data.subarray(ee*ae/ce.data.BYTES_PER_ELEMENT,(ee+1)*ae/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ee,ce.width,ce.height,1,xe,Ne,Pe)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,xe,Ne,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ce.width,ce.height,ce.depth,0,xe,Ne,ce.data);else if(M.isData3DTexture)U?(oe&&t.texStorage3D(n.TEXTURE_3D,Ee,Re,ce.width,ce.height,ce.depth),me&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,xe,Ne,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ce.width,ce.height,ce.depth,0,xe,Ne,ce.data);else if(M.isFramebufferTexture){if(oe)if(U)t.texStorage2D(n.TEXTURE_2D,Ee,Re,ce.width,ce.height);else{let ae=ce.width,ee=ce.height;for(let Pe=0;Pe<Ee;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,Re,ae,ee,0,xe,Ne,null),ae>>=1,ee>>=1}}else if(Be.length>0){if(U&&oe){const ae=Xe(Be[0]);t.texStorage2D(n.TEXTURE_2D,Ee,Re,ae.width,ae.height)}for(let ae=0,ee=Be.length;ae<ee;ae++)ve=Be[ae],U?me&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,xe,Ne,ve):t.texImage2D(n.TEXTURE_2D,ae,Re,xe,Ne,ve);M.generateMipmaps=!1}else if(U){if(oe){const ae=Xe(ce);t.texStorage2D(n.TEXTURE_2D,Ee,Re,ae.width,ae.height)}me&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,xe,Ne,ce)}else t.texImage2D(n.TEXTURE_2D,0,Re,xe,Ne,ce);m(M)&&d($),be.__version=J.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function re(I,M,W){if(M.image.length!==6)return;const $=Ie(I,M),ne=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+W);const J=i.get(ne);if(ne.version!==J.__version||$===!0){t.activeTexture(n.TEXTURE0+W);const be=Qe.getPrimaries(Qe.workingColorSpace),ue=M.colorSpace===qn?null:Qe.getPrimaries(M.colorSpace),we=M.colorSpace===qn||be===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Le=M.isCompressedTexture||M.image[0].isCompressedTexture,ce=M.image[0]&&M.image[0].isDataTexture,xe=[];for(let ee=0;ee<6;ee++)!Le&&!ce?xe[ee]=_(M.image[ee],!0,r.maxCubemapSize):xe[ee]=ce?M.image[ee].image:M.image[ee],xe[ee]=Ke(M,xe[ee]);const Ne=xe[0],Re=s.convert(M.format,M.colorSpace),ve=s.convert(M.type),Be=x(M.internalFormat,Re,ve,M.colorSpace),U=M.isVideoTexture!==!0,oe=J.__version===void 0||$===!0,me=ne.dataReady;let Ee=E(M,Ne);ie(n.TEXTURE_CUBE_MAP,M);let ae;if(Le){U&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Be,Ne.width,Ne.height);for(let ee=0;ee<6;ee++){ae=xe[ee].mipmaps;for(let Pe=0;Pe<ae.length;Pe++){const ke=ae[Pe];M.format!==dn?Re!==null?U?me&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,0,0,ke.width,ke.height,Re,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,Be,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,0,0,ke.width,ke.height,Re,ve,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe,Be,ke.width,ke.height,0,Re,ve,ke.data)}}}else{if(ae=M.mipmaps,U&&oe){ae.length>0&&Ee++;const ee=Xe(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Be,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ce){U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,xe[ee].width,xe[ee].height,Re,ve,xe[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Be,xe[ee].width,xe[ee].height,0,Re,ve,xe[ee].data);for(let Pe=0;Pe<ae.length;Pe++){const st=ae[Pe].image[ee].image;U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,0,0,st.width,st.height,Re,ve,st.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,Be,st.width,st.height,0,Re,ve,st.data)}}else{U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Re,ve,xe[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Be,Re,ve,xe[ee]);for(let Pe=0;Pe<ae.length;Pe++){const ke=ae[Pe];U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,0,0,Re,ve,ke.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Pe+1,Be,Re,ve,ke.image[ee])}}}m(M)&&d(n.TEXTURE_CUBE_MAP),J.__version=ne.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function Ce(I,M,W,$,ne,J){const be=s.convert(W.format,W.colorSpace),ue=s.convert(W.type),we=x(W.internalFormat,be,ue,W.colorSpace),Le=i.get(M),ce=i.get(W);if(ce.__renderTarget=M,!Le.__hasExternalTextures){const xe=Math.max(1,M.width>>J),Ne=Math.max(1,M.height>>J);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,J,we,xe,Ne,M.depth,0,be,ue,null):t.texImage2D(ne,J,we,xe,Ne,0,be,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),j(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,ne,ce.__webglTexture,0,Se(M)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,ne,ce.__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(I,M,W){if(n.bindRenderbuffer(n.RENDERBUFFER,I),M.depthBuffer){const $=M.depthTexture,ne=$&&$.isDepthTexture?$.type:null,J=v(M.stencilBuffer,ne),be=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=Se(M);j(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,J,M.width,M.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,J,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,J,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,I)}else{const $=M.textures;for(let ne=0;ne<$.length;ne++){const J=$[ne],be=s.convert(J.format,J.colorSpace),ue=s.convert(J.type),we=x(J.internalFormat,be,ue,J.colorSpace),Le=Se(M);W&&j(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,we,M.width,M.height):j(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Le,we,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,we,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function X(I,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(M.depthTexture);$.__renderTarget=M,(!$.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),O(M.depthTexture,0);const ne=$.__webglTexture,J=Se(M);if(M.depthTexture.format===$r)j(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(M.depthTexture.format===Kr)j(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function ge(I){const M=i.get(I),W=I.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==I.depthTexture){const $=I.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),$){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,$.removeEventListener("dispose",ne)};$.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=$}if(I.depthTexture&&!M.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const $=I.texture.mipmaps;$&&$.length>0?X(M.__webglFramebuffer[0],I):X(M.__webglFramebuffer,I)}else if(W){M.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[$]),M.__webglDepthbuffer[$]===void 0)M.__webglDepthbuffer[$]=n.createRenderbuffer(),Ae(M.__webglDepthbuffer[$],I,!1);else{const ne=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,J)}}else{const $=I.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),Ae(M.__webglDepthbuffer,I,!1);else{const ne=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,J)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function q(I,M,W){const $=i.get(I);M!==void 0&&Ce($.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&ge(I)}function w(I){const M=I.texture,W=i.get(I),$=i.get(M);I.addEventListener("dispose",C);const ne=I.textures,J=I.isWebGLCubeRenderTarget===!0,be=ne.length>1;if(be||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=M.version,o.memory.textures++),J){W.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer[ue]=[];for(let we=0;we<M.mipmaps.length;we++)W.__webglFramebuffer[ue][we]=n.createFramebuffer()}else W.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer=[];for(let ue=0;ue<M.mipmaps.length;ue++)W.__webglFramebuffer[ue]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(be)for(let ue=0,we=ne.length;ue<we;ue++){const Le=i.get(ne[ue]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),o.memory.textures++)}if(I.samples>0&&j(I)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ue=0;ue<ne.length;ue++){const we=ne[ue];W.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[ue]);const Le=s.convert(we.format,we.colorSpace),ce=s.convert(we.type),xe=x(we.internalFormat,Le,ce,we.colorSpace,I.isXRRenderTarget===!0),Ne=Se(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,xe,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,W.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(W.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),ie(n.TEXTURE_CUBE_MAP,M);for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0)for(let we=0;we<M.mipmaps.length;we++)Ce(W.__webglFramebuffer[ue][we],I,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,we);else Ce(W.__webglFramebuffer[ue],I,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(M)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ue=0,we=ne.length;ue<we;ue++){const Le=ne[ue],ce=i.get(Le);let xe=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xe=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,ce.__webglTexture),ie(xe,Le),Ce(W.__webglFramebuffer,I,Le,n.COLOR_ATTACHMENT0+ue,xe,0),m(Le)&&d(xe)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ue=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,$.__webglTexture),ie(ue,M),M.mipmaps&&M.mipmaps.length>0)for(let we=0;we<M.mipmaps.length;we++)Ce(W.__webglFramebuffer[we],I,M,n.COLOR_ATTACHMENT0,ue,we);else Ce(W.__webglFramebuffer,I,M,n.COLOR_ATTACHMENT0,ue,0);m(M)&&d(ue),t.unbindTexture()}I.depthBuffer&&ge(I)}function pe(I){const M=I.textures;for(let W=0,$=M.length;W<$;W++){const ne=M[W];if(m(ne)){const J=b(I),be=i.get(ne).__webglTexture;t.bindTexture(J,be),d(J),t.unbindTexture()}}}const he=[],_e=[];function le(I){if(I.samples>0){if(j(I)===!1){const M=I.textures,W=I.width,$=I.height;let ne=n.COLOR_BUFFER_BIT;const J=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(I),ue=M.length>1;if(ue)for(let Le=0;Le<M.length;Le++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const we=I.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Le=0;Le<M.length;Le++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Le]);const ce=i.get(M[Le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ce,0)}n.blitFramebuffer(0,0,W,$,0,0,W,$,ne,n.NEAREST),l===!0&&(he.length=0,_e.length=0,he.push(n.COLOR_ATTACHMENT0+Le),I.depthBuffer&&I.resolveDepthBuffer===!1&&(he.push(J),_e.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,_e)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Le=0;Le<M.length;Le++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,be.__webglColorRenderbuffer[Le]);const ce=i.get(M[Le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,ce,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const M=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Se(I){return Math.min(r.maxSamples,I.samples)}function j(I){const M=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function fe(I){const M=o.render.frame;u.get(I)!==M&&(u.set(I,M),I.update())}function Ke(I,M){const W=I.colorSpace,$=I.format,ne=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||W!==ur&&W!==qn&&(Qe.getTransfer(W)===nt?($!==dn||ne!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),M}function Xe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=D,this.setTexture2D=O,this.setTexture2DArray=B,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=q,this.setupRenderTarget=w,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=j}function n_(n,e){function t(i,r=qn){let s;const o=Qe.getTransfer(r);if(i===Sn)return n.UNSIGNED_BYTE;if(i===ac)return n.UNSIGNED_SHORT_4_4_4_4;if(i===cc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ou)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Nu)return n.BYTE;if(i===Fu)return n.SHORT;if(i===Yr)return n.UNSIGNED_SHORT;if(i===oc)return n.INT;if(i===yi)return n.UNSIGNED_INT;if(i===vn)return n.FLOAT;if(i===Qr)return n.HALF_FLOAT;if(i===Bu)return n.ALPHA;if(i===zu)return n.RGB;if(i===dn)return n.RGBA;if(i===$r)return n.DEPTH_COMPONENT;if(i===Kr)return n.DEPTH_STENCIL;if(i===lc)return n.RED;if(i===uc)return n.RED_INTEGER;if(i===ku)return n.RG;if(i===dc)return n.RG_INTEGER;if(i===hc)return n.RGBA_INTEGER;if(i===ks||i===Hs||i===Vs||i===Gs)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ks)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ks)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Hs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_a||i===xa||i===va||i===Ma)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===_a)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===va)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ma)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Sa||i===ya||i===Ea)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Sa||i===ya)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ea)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ba||i===Ta||i===Aa||i===wa||i===Ra||i===Ca||i===Pa||i===Ia||i===La||i===Da||i===Ua||i===Na||i===Fa||i===Oa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ba)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ta)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Aa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===wa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ra)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ca)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ia)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===La)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Da)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ua)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Na)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Fa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Oa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ws||i===Ba||i===za)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ws)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ba)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===za)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Hu||i===ka||i===Ha||i===Va)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ws)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ka)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ha)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Va)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class ad extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const i_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,r_=`
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

}`;class s_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new ad(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new On({vertexShader:i_,fragmentShader:r_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new We(new no(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class o_ extends gr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const _=new s_,m={},d=t.getContextAttributes();let b=null,x=null;const v=[],E=[],A=new Ze;let C=null;const R=new an;R.viewport=new mt;const y=new an;y.viewport=new mt;const S=[R,y],P=new Af;let D=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let se=v[z];return se===void 0&&(se=new Fo,v[z]=se),se.getTargetRaySpace()},this.getControllerGrip=function(z){let se=v[z];return se===void 0&&(se=new Fo,v[z]=se),se.getGripSpace()},this.getHand=function(z){let se=v[z];return se===void 0&&(se=new Fo,v[z]=se),se.getHandSpace()};function N(z){const se=E.indexOf(z.inputSource);if(se===-1)return;const re=v[se];re!==void 0&&(re.update(z.inputSource,z.frame,c||o),re.dispatchEvent({type:z.type,data:z.inputSource}))}function O(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",O),r.removeEventListener("inputsourceschange",B);for(let z=0;z<v.length;z++){const se=E[z];se!==null&&(E[z]=null,v[z].disconnect(se))}D=null,L=null,_.reset();for(const z in m)delete m[z];e.setRenderTarget(b),p=null,f=null,h=null,r=null,x=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",O),r.addEventListener("inputsourceschange",B),d.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(A),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(r,t)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ce=null,Ae=null;d.depth&&(Ae=d.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=d.stencil?Kr:$r,Ce=d.stencil?Zr:yi);const X={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};f=h.createProjectionLayer(X),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Ei(f.textureWidth,f.textureHeight,{format:dn,type:Sn,depthTexture:new ed(f.textureWidth,f.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const re={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ei(p.framebufferWidth,p.framebufferHeight,{format:dn,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ue.setContext(r),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function B(z){for(let se=0;se<z.removed.length;se++){const re=z.removed[se],Ce=E.indexOf(re);Ce>=0&&(E[Ce]=null,v[Ce].disconnect(re))}for(let se=0;se<z.added.length;se++){const re=z.added[se];let Ce=E.indexOf(re);if(Ce===-1){for(let X=0;X<v.length;X++)if(X>=E.length){E.push(re),Ce=X;break}else if(E[X]===null){E[X]=re,Ce=X;break}if(Ce===-1)break}const Ae=v[Ce];Ae&&Ae.connect(re)}}const K=new G,V=new G;function te(z,se,re){K.setFromMatrixPosition(se.matrixWorld),V.setFromMatrixPosition(re.matrixWorld);const Ce=K.distanceTo(V),Ae=se.projectionMatrix.elements,X=re.projectionMatrix.elements,ge=Ae[14]/(Ae[10]-1),q=Ae[14]/(Ae[10]+1),w=(Ae[9]+1)/Ae[5],pe=(Ae[9]-1)/Ae[5],he=(Ae[8]-1)/Ae[0],_e=(X[8]+1)/X[0],le=ge*he,Se=ge*_e,j=Ce/(-he+_e),fe=j*-he;if(se.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(fe),z.translateZ(j),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),Ae[10]===-1)z.projectionMatrix.copy(se.projectionMatrix),z.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Ke=ge+j,Xe=q+j,I=le-fe,M=Se+(Ce-fe),W=w*q/Xe*Ke,$=pe*q/Xe*Ke;z.projectionMatrix.makePerspective(I,M,W,$,Ke,Xe),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function F(z,se){se===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(se.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let se=z.near,re=z.far;_.texture!==null&&(_.depthNear>0&&(se=_.depthNear),_.depthFar>0&&(re=_.depthFar)),P.near=y.near=R.near=se,P.far=y.far=R.far=re,(D!==P.near||L!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),D=P.near,L=P.far),P.layers.mask=z.layers.mask|6,R.layers.mask=P.layers.mask&3,y.layers.mask=P.layers.mask&5;const Ce=z.parent,Ae=P.cameras;F(P,Ce);for(let X=0;X<Ae.length;X++)F(Ae[X],Ce);Ae.length===2?te(P,R,y):P.projectionMatrix.copy(R.projectionMatrix),Q(z,P,Ce)};function Q(z,se,re){re===null?z.matrix.copy(se.matrixWorld):(z.matrix.copy(re.matrixWorld),z.matrix.invert(),z.matrix.multiply(se.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(se.projectionMatrix),z.projectionMatrixInverse.copy(se.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Ga*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(z){l=z,f!==null&&(f.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(z){return m[z]};let ie=null;function Ie(z,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const re=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let Ce=!1;re.length!==P.cameras.length&&(P.cameras.length=0,Ce=!0);for(let q=0;q<re.length;q++){const w=re[q];let pe=null;if(p!==null)pe=p.getViewport(w);else{const _e=h.getViewSubImage(f,w);pe=_e.viewport,q===0&&(e.setRenderTargetTextures(x,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(x))}let he=S[q];he===void 0&&(he=new an,he.layers.enable(q),he.viewport=new mt,S[q]=he),he.matrix.fromArray(w.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(w.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(pe.x,pe.y,pe.width,pe.height),q===0&&(P.matrix.copy(he.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ce===!0&&P.cameras.push(he)}const Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const q=h.getDepthInformation(re[0]);q&&q.isValid&&q.texture&&_.init(q,r.renderState)}if(Ae&&Ae.includes("camera-access")&&(e.state.unbindTexture(),h))for(let q=0;q<re.length;q++){const w=re[q].camera;if(w){let pe=m[w];pe||(pe=new ad,m[w]=pe);const he=h.getCameraImage(w);pe.sourceTexture=he}}}for(let re=0;re<v.length;re++){const Ce=E[re],Ae=v[re];Ce!==null&&Ae!==void 0&&Ae.update(Ce,se,c||o)}ie&&ie(z,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const Ue=new nd;Ue.setAnimationLoop(Ie),this.setAnimationLoop=function(z){ie=z},this.dispose=function(){}}}const ai=new yn,a_=new ot;function c_(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,$u(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,b,x,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,b,x):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Wt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Wt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=e.get(d),x=b.envMap,v=b.envMapRotation;x&&(m.envMap.value=x,ai.copy(v),ai.x*=-1,ai.y*=-1,ai.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),m.envMapRotation.value.setFromMatrix4(a_.makeRotationFromEuler(ai)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,b,x){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=x*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Wt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const b=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function l_(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const v=x.program;i.uniformBlockBinding(b,v)}function c(b,x){let v=r[b.id];v===void 0&&(g(b),v=u(b),r[b.id]=v,b.addEventListener("dispose",m));const E=x.program;i.updateUBOMapping(b,E);const A=e.render.frame;s[b.id]!==A&&(f(b),s[b.id]=A)}function u(b){const x=h();b.__bindingPointIndex=x;const v=n.createBuffer(),E=b.__size,A=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,E,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,v),v}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const x=r[b.id],v=b.uniforms,E=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let A=0,C=v.length;A<C;A++){const R=Array.isArray(v[A])?v[A]:[v[A]];for(let y=0,S=R.length;y<S;y++){const P=R[y];if(p(P,A,y,E)===!0){const D=P.__offset,L=Array.isArray(P.value)?P.value:[P.value];let N=0;for(let O=0;O<L.length;O++){const B=L[O],K=_(B);typeof B=="number"||typeof B=="boolean"?(P.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,D+N,P.__data)):B.isMatrix3?(P.__data[0]=B.elements[0],P.__data[1]=B.elements[1],P.__data[2]=B.elements[2],P.__data[3]=0,P.__data[4]=B.elements[3],P.__data[5]=B.elements[4],P.__data[6]=B.elements[5],P.__data[7]=0,P.__data[8]=B.elements[6],P.__data[9]=B.elements[7],P.__data[10]=B.elements[8],P.__data[11]=0):(B.toArray(P.__data,N),N+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,x,v,E){const A=b.value,C=x+"_"+v;if(E[C]===void 0)return typeof A=="number"||typeof A=="boolean"?E[C]=A:E[C]=A.clone(),!0;{const R=E[C];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return E[C]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function g(b){const x=b.uniforms;let v=0;const E=16;for(let C=0,R=x.length;C<R;C++){const y=Array.isArray(x[C])?x[C]:[x[C]];for(let S=0,P=y.length;S<P;S++){const D=y[S],L=Array.isArray(D.value)?D.value:[D.value];for(let N=0,O=L.length;N<O;N++){const B=L[N],K=_(B),V=v%E,te=V%K.boundary,F=V+te;v+=te,F!==0&&E-F<K.storage&&(v+=E-F),D.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=K.storage}}}const A=v%E;return A>0&&(v+=E-A),b.__size=v,b.__cache={},this}function _(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function d(){for(const b in r)n.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class u_{constructor(e={}){const{canvas:t=kh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=$t;let A=0,C=0,R=null,y=-1,S=null;const P=new mt,D=new mt;let L=null;const N=new qe(0);let O=0,B=t.width,K=t.height,V=1,te=null,F=null;const Q=new mt(0,0,B,K),ie=new mt(0,0,B,K);let Ie=!1;const Ue=new _c;let z=!1,se=!1;const re=new ot,Ce=new G,Ae=new mt,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function q(){return R===null?V:1}let w=i;function pe(T,k){return t.getContext(T,k)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${sc}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",ae,!1),w===null){const k="webgl2";if(w=pe(k,T),w===null)throw pe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let he,_e,le,Se,j,fe,Ke,Xe,I,M,W,$,ne,J,be,ue,we,Le,ce,xe,Ne,Re,ve,Be;function U(){he=new Mg(w),he.init(),Re=new n_(w,he),_e=new fg(w,he,e,Re),le=new e_(w,he),_e.reversedDepthBuffer&&f&&le.buffers.depth.setReversed(!0),Se=new Eg(w),j=new H0,fe=new t_(w,he,le,j,_e,Re,Se),Ke=new mg(v),Xe=new vg(v),I=new Cf(w),ve=new dg(w,I),M=new Sg(w,I,Se,ve),W=new Tg(w,M,I,Se),ce=new bg(w,_e,fe),ue=new pg(j),$=new k0(v,Ke,Xe,he,_e,ve,ue),ne=new c_(v,j),J=new G0,be=new $0(he),Le=new ug(v,Ke,Xe,le,W,p,l),we=new J0(v,W,_e),Be=new l_(w,Se,_e,le),xe=new hg(w,he,Se),Ne=new yg(w,he,Se),Se.programs=$.programs,v.capabilities=_e,v.extensions=he,v.properties=j,v.renderLists=J,v.shadowMap=we,v.state=le,v.info=Se}U();const oe=new o_(v,w);this.xr=oe,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const T=he.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=he.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(B,K,!1))},this.getSize=function(T){return T.set(B,K)},this.setSize=function(T,k,Y=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=T,K=k,t.width=Math.floor(T*V),t.height=Math.floor(k*V),Y===!0&&(t.style.width=T+"px",t.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(B*V,K*V).floor()},this.setDrawingBufferSize=function(T,k,Y){B=T,K=k,V=Y,t.width=Math.floor(T*Y),t.height=Math.floor(k*Y),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(Q)},this.setViewport=function(T,k,Y,Z){T.isVector4?Q.set(T.x,T.y,T.z,T.w):Q.set(T,k,Y,Z),le.viewport(P.copy(Q).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(ie)},this.setScissor=function(T,k,Y,Z){T.isVector4?ie.set(T.x,T.y,T.z,T.w):ie.set(T,k,Y,Z),le.scissor(D.copy(ie).multiplyScalar(V).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(T){le.setScissorTest(Ie=T)},this.setOpaqueSort=function(T){te=T},this.setTransparentSort=function(T){F=T},this.getClearColor=function(T){return T.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,Y=!0){let Z=0;if(T){let H=!1;if(R!==null){const de=R.texture.format;H=de===hc||de===dc||de===uc}if(H){const de=R.texture.type,ye=de===Sn||de===yi||de===Yr||de===Zr||de===ac||de===cc,De=Le.getClearColor(),Te=Le.getClearAlpha(),ze=De.r,He=De.g,Fe=De.b;ye?(g[0]=ze,g[1]=He,g[2]=Fe,g[3]=Te,w.clearBufferuiv(w.COLOR,0,g)):(_[0]=ze,_[1]=He,_[2]=Fe,_[3]=Te,w.clearBufferiv(w.COLOR,0,_))}else Z|=w.COLOR_BUFFER_BIT}k&&(Z|=w.DEPTH_BUFFER_BIT),Y&&(Z|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Le.dispose(),J.dispose(),be.dispose(),j.dispose(),Ke.dispose(),Xe.dispose(),W.dispose(),ve.dispose(),Be.dispose(),$.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",pn),oe.removeEventListener("sessionend",wc),ei.stop()};function me(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=Se.autoReset,k=we.enabled,Y=we.autoUpdate,Z=we.needsUpdate,H=we.type;U(),Se.autoReset=T,we.enabled=k,we.autoUpdate=Y,we.needsUpdate=Z,we.type=H}function ae(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ee(T){const k=T.target;k.removeEventListener("dispose",ee),Pe(k)}function Pe(T){ke(T),j.remove(T)}function ke(T){const k=j.get(T).programs;k!==void 0&&(k.forEach(function(Y){$.releaseProgram(Y)}),T.isShaderMaterial&&$.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,Y,Z,H,de){k===null&&(k=X);const ye=H.isMesh&&H.matrixWorld.determinant()<0,De=Rd(T,k,Y,Z,H);le.setMaterial(Z,ye);let Te=Y.index,ze=1;if(Z.wireframe===!0){if(Te=M.getWireframeAttribute(Y),Te===void 0)return;ze=2}const He=Y.drawRange,Fe=Y.attributes.position;let Ye=He.start*ze,tt=(He.start+He.count)*ze;de!==null&&(Ye=Math.max(Ye,de.start*ze),tt=Math.min(tt,(de.start+de.count)*ze)),Te!==null?(Ye=Math.max(Ye,0),tt=Math.min(tt,Te.count)):Fe!=null&&(Ye=Math.max(Ye,0),tt=Math.min(tt,Fe.count));const ht=tt-Ye;if(ht<0||ht===1/0)return;ve.setup(H,Z,De,Y,Te);let at,it=xe;if(Te!==null&&(at=I.get(Te),it=Ne,it.setIndex(at)),H.isMesh)Z.wireframe===!0?(le.setLineWidth(Z.wireframeLinewidth*q()),it.setMode(w.LINES)):it.setMode(w.TRIANGLES);else if(H.isLine){let Oe=Z.linewidth;Oe===void 0&&(Oe=1),le.setLineWidth(Oe*q()),H.isLineSegments?it.setMode(w.LINES):H.isLineLoop?it.setMode(w.LINE_LOOP):it.setMode(w.LINE_STRIP)}else H.isPoints?it.setMode(w.POINTS):H.isSprite&&it.setMode(w.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ir("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),it.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))it.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Oe=H._multiDrawStarts,ut=H._multiDrawCounts,Je=H._multiDrawCount,Xt=Te?I.get(Te).bytesPerElement:1,Ai=j.get(Z).currentProgram.getUniforms();for(let qt=0;qt<Je;qt++)Ai.setValue(w,"_gl_DrawID",qt),it.render(Oe[qt]/Xt,ut[qt])}else if(H.isInstancedMesh)it.renderInstances(Ye,ht,H.count);else if(Y.isInstancedBufferGeometry){const Oe=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,ut=Math.min(Y.instanceCount,Oe);it.renderInstances(Ye,ht,ut)}else it.render(Ye,ht)};function st(T,k,Y){T.transparent===!0&&T.side===At&&T.forceSinglePass===!1?(T.side=Wt,T.needsUpdate=!0,is(T,k,Y),T.side=Jn,T.needsUpdate=!0,is(T,k,Y),T.side=At):is(T,k,Y)}this.compile=function(T,k,Y=null){Y===null&&(Y=T),d=be.get(Y),d.init(k),x.push(d),Y.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),T!==Y&&T.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),d.setupLights();const Z=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const de=H.material;if(de)if(Array.isArray(de))for(let ye=0;ye<de.length;ye++){const De=de[ye];st(De,Y,H),Z.add(De)}else st(de,Y,H),Z.add(de)}),d=x.pop(),Z},this.compileAsync=function(T,k,Y=null){const Z=this.compile(T,k,Y);return new Promise(H=>{function de(){if(Z.forEach(function(ye){j.get(ye).currentProgram.isReady()&&Z.delete(ye)}),Z.size===0){H(T);return}setTimeout(de,10)}he.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let et=null;function En(T){et&&et(T)}function pn(){ei.stop()}function wc(){ei.start()}const ei=new nd;ei.setAnimationLoop(En),typeof self<"u"&&ei.setContext(self),this.setAnimationLoop=function(T){et=T,oe.setAnimationLoop(T),T===null?ei.stop():ei.start()},oe.addEventListener("sessionstart",pn),oe.addEventListener("sessionend",wc),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(k),k=oe.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,k,R),d=be.get(T,x.length),d.init(k),x.push(d),re.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ue.setFromProjectionMatrix(re,Mn,k.reversedDepth),se=this.localClippingEnabled,z=ue.init(this.clippingPlanes,se),m=J.get(T,b.length),m.init(),b.push(m),oe.enabled===!0&&oe.isPresenting===!0){const de=v.xr.getDepthSensingMesh();de!==null&&oo(de,k,-1/0,v.sortObjects)}oo(T,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(te,F),ge=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,ge&&Le.addToRenderList(m,T),this.info.render.frame++,z===!0&&ue.beginShadows();const Y=d.state.shadowsArray;we.render(Y,T,k),z===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=m.opaque,H=m.transmissive;if(d.setupLights(),k.isArrayCamera){const de=k.cameras;if(H.length>0)for(let ye=0,De=de.length;ye<De;ye++){const Te=de[ye];Cc(Z,H,T,Te)}ge&&Le.render(T);for(let ye=0,De=de.length;ye<De;ye++){const Te=de[ye];Rc(m,T,Te,Te.viewport)}}else H.length>0&&Cc(Z,H,T,k),ge&&Le.render(T),Rc(m,T,k);R!==null&&C===0&&(fe.updateMultisampleRenderTarget(R),fe.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(v,T,k),ve.resetDefaultState(),y=-1,S=null,x.pop(),x.length>0?(d=x[x.length-1],z===!0&&ue.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function oo(T,k,Y,Z){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)Y=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ue.intersectsSprite(T)){Z&&Ae.setFromMatrixPosition(T.matrixWorld).applyMatrix4(re);const ye=W.update(T),De=T.material;De.visible&&m.push(T,ye,De,Y,Ae.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ue.intersectsObject(T))){const ye=W.update(T),De=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ae.copy(T.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ae.copy(ye.boundingSphere.center)),Ae.applyMatrix4(T.matrixWorld).applyMatrix4(re)),Array.isArray(De)){const Te=ye.groups;for(let ze=0,He=Te.length;ze<He;ze++){const Fe=Te[ze],Ye=De[Fe.materialIndex];Ye&&Ye.visible&&m.push(T,ye,Ye,Y,Ae.z,Fe)}}else De.visible&&m.push(T,ye,De,Y,Ae.z,null)}}const de=T.children;for(let ye=0,De=de.length;ye<De;ye++)oo(de[ye],k,Y,Z)}function Rc(T,k,Y,Z){const H=T.opaque,de=T.transmissive,ye=T.transparent;d.setupLightsView(Y),z===!0&&ue.setGlobalState(v.clippingPlanes,Y),Z&&le.viewport(P.copy(Z)),H.length>0&&ns(H,k,Y),de.length>0&&ns(de,k,Y),ye.length>0&&ns(ye,k,Y),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Cc(T,k,Y,Z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Z.id]===void 0&&(d.state.transmissionRenderTarget[Z.id]=new Ei(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Qr:Sn,minFilter:gi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const de=d.state.transmissionRenderTarget[Z.id],ye=Z.viewport||P;de.setSize(ye.z*v.transmissionResolutionScale,ye.w*v.transmissionResolutionScale);const De=v.getRenderTarget(),Te=v.getActiveCubeFace(),ze=v.getActiveMipmapLevel();v.setRenderTarget(de),v.getClearColor(N),O=v.getClearAlpha(),O<1&&v.setClearColor(16777215,.5),v.clear(),ge&&Le.render(Y);const He=v.toneMapping;v.toneMapping=Kn;const Fe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),d.setupLightsView(Z),z===!0&&ue.setGlobalState(v.clippingPlanes,Z),ns(T,Y,Z),fe.updateMultisampleRenderTarget(de),fe.updateRenderTargetMipmap(de),he.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let tt=0,ht=k.length;tt<ht;tt++){const at=k[tt],it=at.object,Oe=at.geometry,ut=at.material,Je=at.group;if(ut.side===At&&it.layers.test(Z.layers)){const Xt=ut.side;ut.side=Wt,ut.needsUpdate=!0,Pc(it,Y,Z,Oe,ut,Je),ut.side=Xt,ut.needsUpdate=!0,Ye=!0}}Ye===!0&&(fe.updateMultisampleRenderTarget(de),fe.updateRenderTargetMipmap(de))}v.setRenderTarget(De,Te,ze),v.setClearColor(N,O),Fe!==void 0&&(Z.viewport=Fe),v.toneMapping=He}function ns(T,k,Y){const Z=k.isScene===!0?k.overrideMaterial:null;for(let H=0,de=T.length;H<de;H++){const ye=T[H],De=ye.object,Te=ye.geometry,ze=ye.group;let He=ye.material;He.allowOverride===!0&&Z!==null&&(He=Z),De.layers.test(Y.layers)&&Pc(De,k,Y,Te,He,ze)}}function Pc(T,k,Y,Z,H,de){T.onBeforeRender(v,k,Y,Z,H,de),T.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(v,k,Y,Z,T,de),H.transparent===!0&&H.side===At&&H.forceSinglePass===!1?(H.side=Wt,H.needsUpdate=!0,v.renderBufferDirect(Y,k,Z,H,T,de),H.side=Jn,H.needsUpdate=!0,v.renderBufferDirect(Y,k,Z,H,T,de),H.side=At):v.renderBufferDirect(Y,k,Z,H,T,de),T.onAfterRender(v,k,Y,Z,H,de)}function is(T,k,Y){k.isScene!==!0&&(k=X);const Z=j.get(T),H=d.state.lights,de=d.state.shadowsArray,ye=H.state.version,De=$.getParameters(T,H.state,de,k,Y),Te=$.getProgramCacheKey(De);let ze=Z.programs;Z.environment=T.isMeshStandardMaterial?k.environment:null,Z.fog=k.fog,Z.envMap=(T.isMeshStandardMaterial?Xe:Ke).get(T.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",ee),ze=new Map,Z.programs=ze);let He=ze.get(Te);if(He!==void 0){if(Z.currentProgram===He&&Z.lightsStateVersion===ye)return Lc(T,De),He}else De.uniforms=$.getUniforms(T),T.onBeforeCompile(De,v),He=$.acquireProgram(De,Te),ze.set(Te,He),Z.uniforms=De.uniforms;const Fe=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=ue.uniform),Lc(T,De),Z.needsLights=Pd(T),Z.lightsStateVersion=ye,Z.needsLights&&(Fe.ambientLightColor.value=H.state.ambient,Fe.lightProbe.value=H.state.probe,Fe.directionalLights.value=H.state.directional,Fe.directionalLightShadows.value=H.state.directionalShadow,Fe.spotLights.value=H.state.spot,Fe.spotLightShadows.value=H.state.spotShadow,Fe.rectAreaLights.value=H.state.rectArea,Fe.ltc_1.value=H.state.rectAreaLTC1,Fe.ltc_2.value=H.state.rectAreaLTC2,Fe.pointLights.value=H.state.point,Fe.pointLightShadows.value=H.state.pointShadow,Fe.hemisphereLights.value=H.state.hemi,Fe.directionalShadowMap.value=H.state.directionalShadowMap,Fe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Fe.spotShadowMap.value=H.state.spotShadowMap,Fe.spotLightMatrix.value=H.state.spotLightMatrix,Fe.spotLightMap.value=H.state.spotLightMap,Fe.pointShadowMap.value=H.state.pointShadowMap,Fe.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=He,Z.uniformsList=null,He}function Ic(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=Xs.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Lc(T,k){const Y=j.get(T);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.batchingColor=k.batchingColor,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.instancingMorph=k.instancingMorph,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function Rd(T,k,Y,Z,H){k.isScene!==!0&&(k=X),fe.resetTextureUnits();const de=k.fog,ye=Z.isMeshStandardMaterial?k.environment:null,De=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ur,Te=(Z.isMeshStandardMaterial?Xe:Ke).get(Z.envMap||ye),ze=Z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,He=!!Y.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Fe=!!Y.morphAttributes.position,Ye=!!Y.morphAttributes.normal,tt=!!Y.morphAttributes.color;let ht=Kn;Z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ht=v.toneMapping);const at=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,it=at!==void 0?at.length:0,Oe=j.get(Z),ut=d.state.lights;if(z===!0&&(se===!0||T!==S)){const Ut=T===S&&Z.id===y;ue.setState(Z,T,Ut)}let Je=!1;Z.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==ut.state.version||Oe.outputColorSpace!==De||H.isBatchedMesh&&Oe.batching===!1||!H.isBatchedMesh&&Oe.batching===!0||H.isBatchedMesh&&Oe.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Oe.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Oe.instancing===!1||!H.isInstancedMesh&&Oe.instancing===!0||H.isSkinnedMesh&&Oe.skinning===!1||!H.isSkinnedMesh&&Oe.skinning===!0||H.isInstancedMesh&&Oe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Oe.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Oe.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Oe.instancingMorph===!1&&H.morphTexture!==null||Oe.envMap!==Te||Z.fog===!0&&Oe.fog!==de||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ue.numPlanes||Oe.numIntersection!==ue.numIntersection)||Oe.vertexAlphas!==ze||Oe.vertexTangents!==He||Oe.morphTargets!==Fe||Oe.morphNormals!==Ye||Oe.morphColors!==tt||Oe.toneMapping!==ht||Oe.morphTargetsCount!==it)&&(Je=!0):(Je=!0,Oe.__version=Z.version);let Xt=Oe.currentProgram;Je===!0&&(Xt=is(Z,k,H));let Ai=!1,qt=!1,Sr=!1;const dt=Xt.getUniforms(),jt=Oe.uniforms;if(le.useProgram(Xt.program)&&(Ai=!0,qt=!0,Sr=!0),Z.id!==y&&(y=Z.id,qt=!0),Ai||S!==T){le.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),dt.setValue(w,"projectionMatrix",T.projectionMatrix),dt.setValue(w,"viewMatrix",T.matrixWorldInverse);const Ot=dt.map.cameraPosition;Ot!==void 0&&Ot.setValue(w,Ce.setFromMatrixPosition(T.matrixWorld)),_e.logarithmicDepthBuffer&&dt.setValue(w,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&dt.setValue(w,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,qt=!0,Sr=!0)}if(H.isSkinnedMesh){dt.setOptional(w,H,"bindMatrix"),dt.setOptional(w,H,"bindMatrixInverse");const Ut=H.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),dt.setValue(w,"boneTexture",Ut.boneTexture,fe))}H.isBatchedMesh&&(dt.setOptional(w,H,"batchingTexture"),dt.setValue(w,"batchingTexture",H._matricesTexture,fe),dt.setOptional(w,H,"batchingIdTexture"),dt.setValue(w,"batchingIdTexture",H._indirectTexture,fe),dt.setOptional(w,H,"batchingColorTexture"),H._colorsTexture!==null&&dt.setValue(w,"batchingColorTexture",H._colorsTexture,fe));const Jt=Y.morphAttributes;if((Jt.position!==void 0||Jt.normal!==void 0||Jt.color!==void 0)&&ce.update(H,Y,Xt),(qt||Oe.receiveShadow!==H.receiveShadow)&&(Oe.receiveShadow=H.receiveShadow,dt.setValue(w,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(jt.envMap.value=Te,jt.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&k.environment!==null&&(jt.envMapIntensity.value=k.environmentIntensity),qt&&(dt.setValue(w,"toneMappingExposure",v.toneMappingExposure),Oe.needsLights&&Cd(jt,Sr),de&&Z.fog===!0&&ne.refreshFogUniforms(jt,de),ne.refreshMaterialUniforms(jt,Z,V,K,d.state.transmissionRenderTarget[T.id]),Xs.upload(w,Ic(Oe),jt,fe)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Xs.upload(w,Ic(Oe),jt,fe),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&dt.setValue(w,"center",H.center),dt.setValue(w,"modelViewMatrix",H.modelViewMatrix),dt.setValue(w,"normalMatrix",H.normalMatrix),dt.setValue(w,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Ut=Z.uniformsGroups;for(let Ot=0,ao=Ut.length;Ot<ao;Ot++){const ti=Ut[Ot];Be.update(ti,Xt),Be.bind(ti,Xt)}}return Xt}function Cd(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Pd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,k,Y){const Z=j.get(T);Z.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),j.get(T.texture).__webglTexture=k,j.get(T.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:Y,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const Y=j.get(T);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0};const Id=w.createFramebuffer();this.setRenderTarget=function(T,k=0,Y=0){R=T,A=k,C=Y;let Z=!0,H=null,de=!1,ye=!1;if(T){const Te=j.get(T);if(Te.__useDefaultFramebuffer!==void 0)le.bindFramebuffer(w.FRAMEBUFFER,null),Z=!1;else if(Te.__webglFramebuffer===void 0)fe.setupRenderTarget(T);else if(Te.__hasExternalTextures)fe.rebindTextures(T,j.get(T.texture).__webglTexture,j.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Fe=T.depthTexture;if(Te.__boundDepthTexture!==Fe){if(Fe!==null&&j.has(Fe)&&(T.width!==Fe.image.width||T.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");fe.setupDepthRenderbuffer(T)}}const ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ye=!0);const He=j.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[k])?H=He[k][Y]:H=He[k],de=!0):T.samples>0&&fe.useMultisampledRTT(T)===!1?H=j.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?H=He[Y]:H=He,P.copy(T.viewport),D.copy(T.scissor),L=T.scissorTest}else P.copy(Q).multiplyScalar(V).floor(),D.copy(ie).multiplyScalar(V).floor(),L=Ie;if(Y!==0&&(H=Id),le.bindFramebuffer(w.FRAMEBUFFER,H)&&Z&&le.drawBuffers(T,H),le.viewport(P),le.scissor(D),le.setScissorTest(L),de){const Te=j.get(T.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+k,Te.__webglTexture,Y)}else if(ye){const Te=k;for(let ze=0;ze<T.textures.length;ze++){const He=j.get(T.textures[ze]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+ze,He.__webglTexture,Y,Te)}}else if(T!==null&&Y!==0){const Te=j.get(T.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Te.__webglTexture,Y)}y=-1},this.readRenderTargetPixels=function(T,k,Y,Z,H,de,ye,De=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=j.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Te=Te[ye]),Te){le.bindFramebuffer(w.FRAMEBUFFER,Te);try{const ze=T.textures[De],He=ze.format,Fe=ze.type;if(!_e.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-Z&&Y>=0&&Y<=T.height-H&&(T.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+De),w.readPixels(k,Y,Z,H,Re.convert(He),Re.convert(Fe),de))}finally{const ze=R!==null?j.get(R).__webglFramebuffer:null;le.bindFramebuffer(w.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(T,k,Y,Z,H,de,ye,De=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=j.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Te=Te[ye]),Te)if(k>=0&&k<=T.width-Z&&Y>=0&&Y<=T.height-H){le.bindFramebuffer(w.FRAMEBUFFER,Te);const ze=T.textures[De],He=ze.format,Fe=ze.type;if(!_e.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Ye),w.bufferData(w.PIXEL_PACK_BUFFER,de.byteLength,w.STREAM_READ),T.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+De),w.readPixels(k,Y,Z,H,Re.convert(He),Re.convert(Fe),0);const tt=R!==null?j.get(R).__webglFramebuffer:null;le.bindFramebuffer(w.FRAMEBUFFER,tt);const ht=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Hh(w,ht,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Ye),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,de),w.deleteBuffer(Ye),w.deleteSync(ht),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,Y=0){const Z=Math.pow(2,-Y),H=Math.floor(T.image.width*Z),de=Math.floor(T.image.height*Z),ye=k!==null?k.x:0,De=k!==null?k.y:0;fe.setTexture2D(T,0),w.copyTexSubImage2D(w.TEXTURE_2D,Y,0,0,ye,De,H,de),le.unbindTexture()};const Ld=w.createFramebuffer(),Dd=w.createFramebuffer();this.copyTextureToTexture=function(T,k,Y=null,Z=null,H=0,de=null){de===null&&(H!==0?(ir("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=H,H=0):de=0);let ye,De,Te,ze,He,Fe,Ye,tt,ht;const at=T.isCompressedTexture?T.mipmaps[de]:T.image;if(Y!==null)ye=Y.max.x-Y.min.x,De=Y.max.y-Y.min.y,Te=Y.isBox3?Y.max.z-Y.min.z:1,ze=Y.min.x,He=Y.min.y,Fe=Y.isBox3?Y.min.z:0;else{const Jt=Math.pow(2,-H);ye=Math.floor(at.width*Jt),De=Math.floor(at.height*Jt),T.isDataArrayTexture?Te=at.depth:T.isData3DTexture?Te=Math.floor(at.depth*Jt):Te=1,ze=0,He=0,Fe=0}Z!==null?(Ye=Z.x,tt=Z.y,ht=Z.z):(Ye=0,tt=0,ht=0);const it=Re.convert(k.format),Oe=Re.convert(k.type);let ut;k.isData3DTexture?(fe.setTexture3D(k,0),ut=w.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(fe.setTexture2DArray(k,0),ut=w.TEXTURE_2D_ARRAY):(fe.setTexture2D(k,0),ut=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,k.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,k.unpackAlignment);const Je=w.getParameter(w.UNPACK_ROW_LENGTH),Xt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Ai=w.getParameter(w.UNPACK_SKIP_PIXELS),qt=w.getParameter(w.UNPACK_SKIP_ROWS),Sr=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,at.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,at.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,ze),w.pixelStorei(w.UNPACK_SKIP_ROWS,He),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Fe);const dt=T.isDataArrayTexture||T.isData3DTexture,jt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Jt=j.get(T),Ut=j.get(k),Ot=j.get(Jt.__renderTarget),ao=j.get(Ut.__renderTarget);le.bindFramebuffer(w.READ_FRAMEBUFFER,Ot.__webglFramebuffer),le.bindFramebuffer(w.DRAW_FRAMEBUFFER,ao.__webglFramebuffer);for(let ti=0;ti<Te;ti++)dt&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,j.get(T).__webglTexture,H,Fe+ti),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,j.get(k).__webglTexture,de,ht+ti)),w.blitFramebuffer(ze,He,ye,De,Ye,tt,ye,De,w.DEPTH_BUFFER_BIT,w.NEAREST);le.bindFramebuffer(w.READ_FRAMEBUFFER,null),le.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(H!==0||T.isRenderTargetTexture||j.has(T)){const Jt=j.get(T),Ut=j.get(k);le.bindFramebuffer(w.READ_FRAMEBUFFER,Ld),le.bindFramebuffer(w.DRAW_FRAMEBUFFER,Dd);for(let Ot=0;Ot<Te;Ot++)dt?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Jt.__webglTexture,H,Fe+Ot):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Jt.__webglTexture,H),jt?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ut.__webglTexture,de,ht+Ot):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ut.__webglTexture,de),H!==0?w.blitFramebuffer(ze,He,ye,De,Ye,tt,ye,De,w.COLOR_BUFFER_BIT,w.NEAREST):jt?w.copyTexSubImage3D(ut,de,Ye,tt,ht+Ot,ze,He,ye,De):w.copyTexSubImage2D(ut,de,Ye,tt,ze,He,ye,De);le.bindFramebuffer(w.READ_FRAMEBUFFER,null),le.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else jt?T.isDataTexture||T.isData3DTexture?w.texSubImage3D(ut,de,Ye,tt,ht,ye,De,Te,it,Oe,at.data):k.isCompressedArrayTexture?w.compressedTexSubImage3D(ut,de,Ye,tt,ht,ye,De,Te,it,at.data):w.texSubImage3D(ut,de,Ye,tt,ht,ye,De,Te,it,Oe,at):T.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,de,Ye,tt,ye,De,it,Oe,at.data):T.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,de,Ye,tt,at.width,at.height,it,at.data):w.texSubImage2D(w.TEXTURE_2D,de,Ye,tt,ye,De,it,Oe,at);w.pixelStorei(w.UNPACK_ROW_LENGTH,Je),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Xt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ai),w.pixelStorei(w.UNPACK_SKIP_ROWS,qt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Sr),de===0&&k.generateMipmaps&&w.generateMipmap(ut),le.unbindTexture()},this.copyTextureToTexture3D=function(T,k,Y=null,Z=null,H=0){return ir('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,k,Y,Z,H)},this.initRenderTarget=function(T){j.get(T).__webglFramebuffer===void 0&&fe.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?fe.setTextureCube(T,0):T.isData3DTexture?fe.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?fe.setTexture2DArray(T,0):fe.setTexture2D(T,0),le.unbindTexture()},this.resetState=function(){A=0,C=0,R=null,le.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const Vt={centerX:0,centerZ:0,calmRadius:142,fullRadius:172,worldLimit:220,maxWaveScale:1.4};function zl(n,e){return Number.isFinite(n)?n:e}function d_(n,e,t){return Math.min(t,Math.max(e,n))}function ro(n,e){const t=zl(n,Vt.centerX)-Vt.centerX,i=zl(e,Vt.centerZ)-Vt.centerZ,r=Math.hypot(t,i),s=Math.max(r,1e-9),o=t/s,a=i/s,l=-o,c=-a,u=Vt.fullRadius-Vt.calmRadius,h=d_((r-Vt.calmRadius)/u,0,1),f=h*h*(3-2*h),p=h>0&&h<1?6*h*(1-h)/u:0;return{intensity:f,inwardX:l,inwardZ:c,gradientX:o*p,gradientZ:a*p}}const kl={velocityX:-9,velocityZ:0};function Ji(n,e){return Number.isFinite(n)?n:e}function jr(n=0){const e=Ji(kl.velocityX,0),t=Ji(kl.velocityZ,0);return{x:e,z:t,speed:Math.hypot(e,t)}}function cd(n,e,t){const i=Ji(n?.x??0,0)-Ji(e,0),r=Ji(n?.z??0,0)-Ji(t,0);return{x:i,z:r,speed:Math.hypot(i,r)}}const rt={minAngle:8*Math.PI/180,maxAngle:85*Math.PI/180,defaultAngle:85*Math.PI/180,trimRate:25*Math.PI/180,noGoAngle:40*Math.PI/180,trueWindNoGoSoftness:8*Math.PI/180,maxDriveAcceleration:5.8,maxLateralAcceleration:1.6,sailingMaxYawRate:1.1,stallYawRate:.55,manualBoostFraction:.45};function qo(n,e){return Number.isFinite(n)?n:e}function ci(n,e,t){return Math.min(t,Math.max(e,n))}function Hl(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function fn(n,e=rt.defaultAngle,t=0){const i=qo(n?.heading??0,0),r=cd(jr(),n?.velocityX??0,n?.velocityZ??0),s=r.speed,o=s>1e-7?-r.x/s:0,a=s>1e-7?-r.z/s:1,l=Math.sin(i),c=Math.cos(i),u=l,h=c,f=c,p=-l,g=o*f+a*p,_=o*u+a*h,m=Math.atan2(g,_),d=Math.sign(m)||1,b=Math.abs(m),x=jr(),v=x.speed||1,E=-x.x/v,A=-x.z/v,C=E*f+A*p,R=E*u+A*h,y=Math.abs(Math.atan2(C,R)),S=rt.noGoAngle-rt.trueWindNoGoSoftness,P=Math.min(y,b),D=P<rt.noGoAngle,L=ci(qo(e,rt.defaultAngle),rt.minAngle,rt.maxAngle),N=ci(b*.5,rt.minAngle,rt.maxAngle),O=Math.abs(L-N),B=Math.max(0,1-O/(35*Math.PI/180)),K=.35+.65*Math.sin(ci(b,0,Math.PI)),V=ci((P-S)/(2*rt.trueWindNoGoSoftness),0,1),te=V*V*(3-2*V),F=ci(s/9,0,1.35),Q=ci(1-Math.max(0,qo(t,0)),0,1),ie=ci(B*K*F*Q*te,0,1),Ie=d*L,Ue=ie*rt.maxDriveAcceleration,z=D?0:-d*ie*rt.maxLateralAcceleration*.5;return{driveAcceleration:Ue,lateralAcceleration:z,power:ie,suggestedAngle:N,signedAngle:Hl(Ie),relativeWindAngle:Hl(m),noGo:D}}const mn={targetEfficiency:.75,assistRate:25*Math.PI/180,boostMinSpeed:1.5,boostStableSeconds:.35,boostDurationSeconds:1.4,boostCooldownSeconds:5,sweetSpotEnter:.9,sweetSpotExit:.78};function Ln(n,e){return Number.isFinite(n)?n:e}function Br(n,e,t){return Math.min(t,Math.max(e,n))}function h_(n,e,t){return n<e?Math.min(n+t,e):Math.max(n-t,e)}function Hr(n){return Br(Ln(n,rt.defaultAngle),rt.minAngle,rt.maxAngle)}function ld(n){const e=fn(n,rt.defaultAngle).suggestedAngle,t=fn(n,e);return{idealAngle:Hr(e),peak:t.power}}function f_(n){const e=ld(n);if(e.peak<=1e-6)return{angle:Hr(e.idealAngle),efficiency:0};const t=e.peak*mn.targetEfficiency;let i=e.idealAngle,r=rt.maxAngle;const s=fn(n,r).power<=t;s||(i=rt.minAngle,r=e.idealAngle);for(let l=0;l<8;l+=1){const c=(i+r)*.5,u=fn(n,c).power;s?u>t?i=c:r=c:u>t?r=c:i=c}const o=(i+r)*.5,a=fn(n,o).power;return{angle:o,efficiency:a/e.peak}}function Vl(){return{sailAngle:rt.defaultAngle,mode:"auto",engaged:!1,efficiency:0,sweetSpot:!1,boost:0,boostSerial:0,stableSeconds:0,cooldownSeconds:0,boostArmed:!0}}function Xn(n){return{...n,boost:0,sweetSpot:!1,stableSeconds:0,cooldownSeconds:Math.max(Ln(n?.cooldownSeconds??0,0),mn.boostCooldownSeconds),boostArmed:!1}}function Gl(n,e,t,i){const r=Number.isFinite(i)&&i>0?Math.min(i,.25):0,s=Br(Ln(t?.sheet??0,0),-1,1),o=Math.abs(s)>1e-4;let a=n?.mode==="manual"?"manual":"auto",l=n?.engaged===!0,c=Hr(n?.sailAngle??rt.defaultAngle),u=Math.max(0,Ln(n?.cooldownSeconds??0,0)-r),h=Br(Ln(n?.boost??0,0),0,1),f=Math.max(0,Math.floor(Ln(n?.boostSerial??0,0))),p=Math.max(0,Ln(n?.stableSeconds??0,0)),g=n?.boostArmed!==!1;o?(a="manual",l=!0,c=Hr(c+s*rt.trimRate*r)):t?.resumeAuto===!0?(a="auto",l=!0,h=0,p=0):t?.engage===!0&&(l=!0);const _=fn(e,c);t?.suppressed===!0&&(h=0,p=0);const m=ld(e);let d=m.peak>1e-6?_.power/m.peak:0,b=n?.sweetSpot===!0;if(t?.resumeAuto===!0&&(b=!1),d<mn.sweetSpotExit?b=!1:d>=mn.sweetSpotEnter&&(b=!0),a==="auto"&&l&&t?.suppressed!==!0){const x=f_(e);c=h_(c,x.angle,mn.assistRate*r);const v=fn(e,c);d=m.peak>1e-6?v.power/m.peak:0,b=!1,h=0,p=0}else{d<mn.sweetSpotExit&&(b=!1,g=!0,p=0);const x=Ln(e.heading,0),v=e.velocityX*Math.sin(x)+e.velocityZ*Math.cos(x),E=a==="manual"&&!t?.suppressed&&!_.noGo&&v>=mn.boostMinSpeed&&b;p=E?p+r:0,h>0?(h=Math.max(0,h-r/mn.boostDurationSeconds),(!E||_.noGo||t?.suppressed)&&(h=0),h===0&&(u=mn.boostCooldownSeconds)):E&&g&&p>=mn.boostStableSeconds&&u<=0&&(h=1,f+=1,p=0,g=!1)}return{sailAngle:Hr(c),mode:a,engaged:l,efficiency:Br(Ln(d,0),0,1),sweetSpot:b,boost:Br(h,0,1),boostSerial:f,stableSeconds:p,cooldownSeconds:u,boostArmed:g}}const p_=.18,Qi=1.42;function m_(n,e){const t=new Yn;t.name="phase-two-landmarks",n.add(t);const i=[],r=[],s=[];e.forEach((l,c)=>{const u=g_(l,c,i);t.add(u.group),s.push({id:l.id,group:u.group}),r.push({id:l.id,position:u.anchor.clone().add(new G(l.position.x,0,l.position.z))})}),t.updateMatrixWorld(!0);const o=s.map(({id:l,group:c})=>({id:l,bounds:new Qn().setFromObject(c)}));let a=!1;return{group:t,anchors:r,landmarkBounds:o,dispose:()=>{if(!a){a=!0;for(const l of i)l.dispose();t.removeFromParent(),t.clear()}}}}function g_(n,e,t){const i=n.landCollisionRadius,r=n.dockingTriggerRadius,s=new Yn;s.name=n.id,s.userData={islandId:n.id,landCollisionRadius:n.landCollisionRadius,dockingTriggerRadius:n.dockingTriggerRadius},s.position.set(n.position.x,0,n.position.z);const o=sr(new en({color:n.palette.sand,roughness:.9,metalness:0,flatShading:!0}),t),a=sr(new en({color:n.palette.land,roughness:.92,metalness:0,flatShading:!0}),t),l=sr(new en({color:n.palette.rock,roughness:.96,metalness:0,flatShading:!0}),t),c=It(new hn(i*.78,i*.98,.48,10,1,!1),t),u=new We(c,o);u.name="sand-shelf",u.position.y=Qi+.24,s.add(u);const h=Qi+.48;x_(s,n,e,h,i,a,t),v_(s,n,e,i,l,t),__(s,n,i,o,a,l,t);const f=M_(r,t);f.position.y=Qi+p_,s.add(f);const p=i*.82,g=new G(p,Qi+.12,p);return{group:s,anchor:g}}function __(n,e,t,i,r,s,o){if(e.id==="island-resume"){const a=-t*.22,l=t*.58,c=Ir(n,a,l),u=Math.max(2.1,t*.29),h=It(new hn(t*.13,t*.17,u,6,1,!1),o),f=new We(h,s);f.name="chartroom-tower",f.userData={detailRole:"tower",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const p=It(new Si(t*.23,.34,6,1,!1),o),g=new We(p,i);g.name="chartroom-tower-roof",g.userData={detailRole:"tower-roof",supportY:c+u},g.position.set(f.position.x,c+u+.17,f.position.z),n.add(g);return}if(e.id==="island-projects"){const a=new G(1,0,1).normalize(),l=new G(-a.z,0,a.x),c=t*.26,u=t*.12,h=a.clone().multiplyScalar(t*.84),f=Ir(n,h.x,h.z),p=It(new bi(u,.16,c),o),g=sr(new en({color:7754044,roughness:.9,flatShading:!0}),o),_=new We(p,g);_.name="shipyard-dock",_.userData={detailRole:"dock",supportY:f},_.position.set(h.x,f+.08,h.z),_.rotation.y=Math.PI/4,n.add(_);const m=It(new hn(t*.045,t*.055,.74,6,1,!1),o);for(const d of[t*.76,t*.93]){const b=a.clone().multiplyScalar(d).add(l.clone().multiplyScalar(t*.055)),x=new We(m,s);x.name="shipyard-dock-pile";const v=Ir(n,b.x,b.z);x.userData={detailRole:"dock-pile",supportY:v},x.position.set(b.x,v+.37,b.z),n.add(x)}return}if(e.id==="island-writing"){const a=-t*.5,l=t*.55,c=Ir(n,a,l),u=Math.max(1.65,t*.23),h=It(new hn(t*.055,t*.075,u,6,1,!1),o),f=new We(h,s);f.name="logbook-marker",f.userData={detailRole:"marker",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const p=It(new Si(t*.14,.24,5,1,!1),o),g=new We(p,i);g.name="logbook-marker-cap",g.userData={detailRole:"marker-cap",supportY:c+u},g.position.set(f.position.x,c+u+.12,f.position.z),n.add(g);return}if(e.id==="island-media"){const a=t*.58,l=t*.18,c=Ir(n,a,l),u=Math.max(1.95,t*.27),h=It(new hn(t*.13,t*.18,u,8,1,!1),o),f=new We(h,s);f.name="signal-cove-light",f.userData={detailRole:"lighthouse",supportY:c},f.position.set(a,c+u*.5,l),n.add(f);const p=It(new Si(t*.2,.3,8,1,!1),o),g=new We(p,i);g.name="signal-cove-light-cap",g.userData={detailRole:"lighthouse-cap",supportY:c+u},g.position.set(f.position.x,c+u+.15,f.position.z),n.add(g);const _=It(new Mc(t*.05,8,4),o),m=sr(new en({color:16772522,emissive:16754984,emissiveIntensity:1.8,roughness:.35,metalness:0,flatShading:!0}),o),d=new We(_,m);d.name="signal-cove-lantern",d.userData={detailRole:"lighthouse-lantern",supportY:c+u},d.position.set(f.position.x,c+u+.4,f.position.z),n.add(d)}}function Ir(n,e,t){n.updateMatrixWorld(!0);const i=new wf(new G(n.position.x+e,20,n.position.z+t),new G(0,-1,0)),r=n.children.filter(o=>o instanceof We&&(o.name==="sand-shelf"||o.name.startsWith("landform-")||o.name==="rock-facet")),s=i.intersectObjects(r,!1)[0];return s?s.point.y-n.position.y:Qi+.24}function x_(n,e,t,i,r,s,o){const a=t*37%90*(Math.PI/180),l=Math.max(1.35,r*.34);if(e.landform==="twin-peaks"){const h=It(new Si(r*.38,l*1.12,6,1,!1),o);for(const[f,p,g]of[[-r*.24,r*.05,.92],[r*.24,-r*.04,.78]]){const _=new We(h,s);_.name="landform-twin-peak",_.position.set(f,i+l*g/2,p),_.scale.set(g,g,g),_.rotation.y=a,n.add(_)}return}if(e.landform==="ridge"){const h=It(new Si(r*.68,l*.86,7,1,!1),o),f=new We(h,s);f.name="landform-ridge",f.position.y=i+l*.43,f.scale.set(1.35,1,.58),f.rotation.y=a,n.add(f);return}if(e.landform==="mesa"){const h=It(new hn(r*.54,r*.76,l*.9,7,1,!1),o),f=new We(h,s);f.name="landform-mesa",f.position.y=i+l*.45,f.rotation.y=a,n.add(f);return}const c=It(new to(r*.63,1),o),u=new We(c,s);u.name="landform-mound",u.position.y=i+l*.42,u.scale.set(1.05,.58,.9),u.rotation.y=a,n.add(u)}function v_(n,e,t,i,r,s){const o=It(new vc(i*.13,0),s),a=e.landform==="twin-peaks"?4:3;for(let l=0;l<a;l+=1){const c=(t*1.9+l*2.1)%(Math.PI*2),u=i*(.48+l*.08),h=new We(o,r);h.name="rock-facet",h.position.set(Math.cos(c)*u,Qi+.55+l%2*.14,Math.sin(c)*u),h.scale.set(1,.8+l%2*.25,.8),h.rotation.set(.2*l,c,.1*t),n.add(h)}}function M_(n,e){const t=[];for(let a=0;a<=96;a+=1){const l=a/96*Math.PI*2;t.push(new G(Math.cos(l)*n,0,Math.sin(l)*n))}const r=It(new gt().setFromPoints(t),e),s=sr(new yf({color:16052196,dashSize:.72,gapSize:.48,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1}),e),o=new vf(r,s);return o.name="docking-boundary",o.userData={dockingTriggerRadius:n},o.computeLineDistances(),o.renderOrder=4,o}function It(n,e){return e.push(n),n}function sr(n,e){return e.push(n),n}const Vi=220,S_=5.5,y_=60,E_=90,b_=60;function T_(){const n=new Sc(-1,1,1,-1,.1,1200);n.position.set(Vi,Vi,Vi);let e=0,t=0,i=!1;const r=()=>{n.position.set(e+Vi,Vi,t+Vi),n.lookAt(e,0,t),n.updateMatrixWorld(!0)};return r(),{camera:n,resize:(s,o)=>{if(i)return;const a=Math.max(1,s),l=Math.max(1,o),c=a/l,u=l<=460?b_*.5:a<=600?y_/c*.5:E_*.5,h=u*c;n.left=-h,n.right=h,n.top=u,n.bottom=-u,n.updateProjectionMatrix(),r()},update:(s,o,a)=>{if(i)return;const l=1-Math.exp(-Math.max(0,a)*S_);e+=(s-e)*l,t+=(o-t)*l,r()},snapTo:(s,o)=>{i||(e=s,t=o,r())},dispose:()=>{i=!0}}}const Ht={amplitude:.96,waveNumber:Math.PI*2/30,directionX:.92,directionZ:.39,angularSpeed:Math.PI*2/5.8,kind:"sine"},zr={amplitude:.46,waveNumber:Math.PI*2/24,directionX:-.38,directionZ:.925,angularSpeed:Math.PI*2/4.6,kind:"cosine"},hr=[Ht,zr,{amplitude:.28,waveNumber:Math.PI*2/34,directionX:.74,directionZ:-.673,angularSpeed:Math.PI*2/6.8,kind:"sine"},{amplitude:.1,waveNumber:Math.PI*2/11,directionX:.707,directionZ:.707,angularSpeed:Math.PI*2/3.5,kind:"cosine"}],fr=.35,A_=hr.map(n=>Math.sin(n.waveNumber*n.directionX*fr)/fr),w_=hr.map(n=>Math.sin(n.waveNumber*n.directionZ*fr)/fr),Ya=hr.reduce((n,e)=>n+e.amplitude,0);function Lt(n,e){return Number.isFinite(n)?n:e}function R_(n,e,t=0){return(Lt(n,0)*Ht.directionX+Lt(e,0)*Ht.directionZ)*Ht.waveNumber+Lt(t,0)*Ht.angularSpeed}function C_(n,e,t=0){return(Lt(n,0)*zr.directionX+Lt(e,0)*zr.directionZ)*zr.waveNumber+Lt(t,0)*zr.angularSpeed}function Nn(n,e,t=0){const i=Lt(n,0),r=Lt(e,0),s=Lt(t,0);let o=0;for(const c of hr){const u=(i*c.directionX+r*c.directionZ)*c.waveNumber+s*c.angularSpeed;o+=c.amplitude*(c.kind==="sine"?Math.sin(u):Math.cos(u))}const a=ro(i,r),l=ud(Lt(a.intensity,0));return o*(1+l*(Vt.maxWaveScale-1))}function Vr(n,e,t=0,i=.35){const r=Lt(n,0),s=Lt(e,0),o=Lt(t,0),a=Number.isFinite(i)?Math.max(.01,i):fr,l=a===fr;let c=0,u=0,h=0,f=0;for(let b=0;b<hr.length;b+=1){const x=hr[b],v=(r*x.directionX+s*x.directionZ)*x.waveNumber+o*x.angularSpeed,E=Math.sin(v),A=Math.cos(v),C=x.kind==="sine"?E:A,R=x.kind==="sine"?A:-E;c+=x.amplitude*C;const y=l?A_[b]:Math.sin(x.waveNumber*x.directionX*a)/a,S=l?w_[b]:Math.sin(x.waveNumber*x.directionZ*a)/a;u+=x.amplitude*R*y,h+=x.amplitude*R*S,f+=x.amplitude*x.angularSpeed*R}const p=ro(r,s),g=ud(Lt(p.intensity,0)),_=1+g*(Vt.maxWaveScale-1),m=c;c=m*_;const d=Vt.maxWaveScale-1;return u=u*_+m*d*Lt(p.gradientX,0),h=h*_+m*d*Lt(p.gradientZ,0),f*=_,{height:c,slopeX:u,slopeZ:h,velocityY:f,stormIntensity:g}}function ud(n){return Math.min(1,Math.max(0,n))}const on={centralLimit:180,outerLimit:360,centralStep:4,outerStep:12};function dd(){const n=[];for(let e=-360;e<-180;e+=on.outerStep)n.push(e);for(let e=-180;e<=on.centralLimit;e+=on.centralStep)n.push(e);for(let e=on.centralLimit+on.outerStep;e<=on.outerLimit;e+=on.outerStep)n.push(e);return n}function Wl(n,e,t){return Math.min(t,Math.max(e,n))}function Xl(n,e){return Number.isFinite(n)?n:e}function ql(n,e){let t=0,i=n.length-1;for(;i-t>1;){const r=Math.floor((t+i)*.5);n[r]<=e?t=r:i=r}return t}const P_=dd();function _i(n,e,t=0){const i=P_,r=Wl(Xl(n,0),-360,on.outerLimit),s=Wl(Xl(e,0),-360,on.outerLimit),o=ql(i,s),a=ql(i,r),l=i[a],c=i[a+1],u=i[o],h=i[o+1],f=c>l?(r-l)/(c-l):0,p=h>u?(s-u)/(h-u):0,g=Nn(l,u,t),_=Nn(c,u,t),m=Nn(l,h,t),d=Nn(c,h,t);return(o+a)%2===0?f+p<=1?g+p*(m-g)+f*(_-g):d+(1-f)*(m-d)+(1-p)*(_-d):p>=f?g+p*(m-g)+f*(d-m):g+p*(d-_)+f*(_-g)}const Yo={gain:2.5,yawDamping:1,deadband:.01};function Lr(n,e){return Number.isFinite(n)?n:e}function I_(n,e,t){return Math.min(t,Math.max(e,n))}function L_(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function D_(n,e){const t=Lr(n?.heading??0,0),i=L_(Lr(e,t)-t);if(Math.abs(i)<=Yo.deadband)return 0;const r=i*Yo.gain-Lr(n?.yawRate??0,0)*Yo.yawDamping,s=t,a=Lr(n?.velocityX??0,0)*Math.sin(s)+Lr(n?.velocityZ??0,0)*Math.cos(s)<-.6?-1:1;return I_(-r/a,-1,1)}const Dn={maxSurgeAcceleration:.9,maxSwayAcceleration:.65,slopeAcceleration:2.8,maxInputSlope:8,uphillResistanceScale:12,maxUphillResistanceAcceleration:7.2};function U_(n,e,t,i){const r=vi(-xi(n?.surgeAcceleration??0,0),0,Dn.maxSurgeAcceleration),s=Math.max(.01,xi(i,14)),o=vi(xi(e,0)/s,0,1),a=vi(xi(t,0),0,1);return-Math.min(r*Dn.uphillResistanceScale*o*o*a,Dn.maxUphillResistanceAcceleration)}function xi(n,e){return Number.isFinite(n)?n:e}function vi(n,e,t){return Math.min(t,Math.max(e,n))}function N_(n,e){const t=xi(e,0),i=vi(xi(n?.slopeX??0,0),-8,Dn.maxInputSlope),r=vi(xi(n?.slopeZ??0,0),-8,Dn.maxInputSlope),s=-i*Dn.slopeAcceleration,o=-r*Dn.slopeAcceleration,a=Math.sin(t),l=Math.cos(t),c=vi(s*l-o*a,-.65,Dn.maxSwayAcceleration),u=vi(s*a+o*l,-.9,Dn.maxSurgeAcceleration);return{accelerationX:u*a+c*l,accelerationZ:u*l-c*a,surgeAcceleration:u,swayAcceleration:c}}const je={length:5.2,width:2.6,collisionRadius:3.2,maxForwardSpeed:14,maxReverseSpeed:7,maxLateralSpeed:6,brakingAcceleration:15,maxYawRate:.6},Zo=180,F_=.25,O_=1/120,Yl=1e-7,Zl=16,B_=2.4,Ls=100;function Mt(n,e){return Number.isFinite(n)?n:e}function cn(n,e,t){return Math.min(t,Math.max(e,n))}function z_(n){return{throttle:cn(Mt(n?.throttle??0,0),-1,1),rudder:cn(Mt(n?.rudder??0,0),-1,1),brake:n?.brake===!0,sheet:cn(Mt(n?.sheet??0,0),-1,1),sailAngle:Mt(n?.sailAngle??rt.defaultAngle,rt.defaultAngle),targetHeading:Number.isFinite(n?.targetHeading)?n.targetHeading:void 0,trimBoost:cn(Mt(n?.trimBoost??0,0),0,1)}}function hd(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function k_(n){const e=Math.max(je.maxYawRate,rt.sailingMaxYawRate);return{x:Mt(n?.x??0,0),z:Mt(n?.z??0,0),velocityX:Mt(n?.velocityX??0,0),velocityZ:Mt(n?.velocityZ??0,0),heading:hd(Mt(n?.heading??0,0)),yawRate:cn(Mt(n?.yawRate??0,0),-e,e)}}function H_(n){const e=Mt(n?.worldLimit??Zo,Zo);return e>0?e:Zo}function $l(n,e,t,i,r){const s=Math.max(0,r-je.collisionRadius);return n>s?(n=s,t>0&&(t=0)):n<-s&&(n=-s,t<0&&(t=0)),e>s?(e=s,i>0&&(i=0)):e<-s&&(e=-s,i<0&&(i=0)),[n,e,t,i]}function V_(n,e,t,i,r){for(const s of r){const o=Mt(s?.x??0,0),a=Mt(s?.z??0,0),l=Mt(s?.radius??0,0);if(l<=0)continue;const c=je.collisionRadius+l,u=n-o,h=e-a,f=Math.hypot(u,h);if(f>=c)continue;let p,g;if(f>Yl)p=u/f,g=h/f;else{const m=Math.hypot(t,i);m>Yl?(p=-t/m,g=-i/m):(p=1,g=0)}n=o+p*c,e=a+g*c;const _=t*p+i*g;_<0&&(t-=_*p,i-=_*g)}return[n,e,t,i]}function fd(n,e,t,i,r){const s=H_(r),o=Array.isArray(r?.obstacles)?r.obstacles:[];for(let a=0;a<2;a+=1)[n,e,t,i]=$l(n,e,t,i,s),[n,e,t,i]=V_(n,e,t,i,o);return[n,e,t,i]=$l(n,e,t,i,s),[n,e,t,i]}function G_(n,e,t,i,r){const s=Math.sin(n.heading),o=Math.cos(n.heading);let a=n.velocityX*s+n.velocityZ*o,l=n.velocityX*o-n.velocityZ*s;a*=Math.exp(-.35*t),l*=Math.exp(-3.5*t);const c=fn(n,e.sailAngle,e.brake?1:0),u=!e.brake&&c?.noGo!==!0?1+(e.trimBoost??0)*rt.manualBoostFraction:1,h=e.brake?0:(c?.driveAcceleration??0)*u;if(a+=h*t,c!==void 0&&(l+=c.lateralAcceleration*t),r!==void 0&&Number.isFinite(r)){const D=N_(Vr(n.x,n.z,r),n.heading);a+=D.surgeAcceleration*t,a+=U_(D,a,c?.power??0,je.maxForwardSpeed)*t,l+=D.swayAcceleration*t}{const D=ro(n.x,n.z);if(D.intensity>0){const L=D.inwardX*Zl*D.intensity,N=D.inwardZ*Zl*D.intensity,O=cn(Mt(a*s+l*o,0),-Ls,Ls),B=cn(Mt(a*o-l*s,0),-Ls,Ls),K=Math.max(0,O*-D.inwardX+B*-D.inwardZ),V=Math.max(0,K)*B_*D.intensity,te=L+D.inwardX*V,F=N+D.inwardZ*V;a+=(te*s+F*o)*t,l+=(te*o-F*s)*t}}if(e.brake){const D=Math.sign(a)||Math.sign(h),L=je.brakingAcceleration*t;D!==0&&(a=Math.abs(a)<=L?0:a-D*L)}a=cn(a,-7,je.maxForwardSpeed),l=cn(l,-6,je.maxLateralSpeed);const f=a*s+l*o,p=a*o-l*s,g=a<-.6?-1:1,_=g<0?je.maxReverseSpeed:je.maxForwardSpeed,m=cn(Math.abs(a)/_,0,1),d=rt.sailingMaxYawRate,b=Math.max(rt.stallYawRate/d,.12+m*.88),v=-(e.targetHeading!==void 0?D_(n,e.targetHeading):e.rudder)*g*d*b,E=1-Math.exp(-6.5*t),A=cn(n.yawRate+(v-n.yawRate)*E,-d,d),C=hd(n.heading+A*t);let[R,y,S,P]=fd(n.x+f*t,n.z+p*t,f,p,i);return{x:R,z:y,velocityX:S,velocityZ:P,heading:C,yawRate:A}}function Kl(n=0,e=0){return{x:Mt(n,0),z:Mt(e,0),velocityX:0,velocityZ:0,heading:0,yawRate:0}}function W_(n,e,t,i,r){const s=k_(n),o=z_(e),a=Number.isFinite(t)&&t>0?Math.min(t,F_):0;let l=fd(s.x,s.z,s.velocityX,s.velocityZ,i),c={x:l[0],z:l[1],velocityX:l[2],velocityZ:l[3],heading:s.heading,yawRate:s.yawRate},u=a,h=0;for(;u>0;){const f=Math.min(u,O_),p=r!==void 0&&Number.isFinite(r)?r+h:void 0;c=G_(c,o,f,i,p),u-=f,h+=f}return c}const Ct={maxHeave:Ya*Vt.maxWaveScale,maxWavePitch:.29,maxWaveRoll:.3,maxSpeedLift:.065,maxTurnHeel:.12,maxWindHeel:Math.PI/9,maxWindHeelLift:.1,heaveResponseRate:15,tiltResponseRate:9,maxForwardSpeed:je.maxForwardSpeed,maxYawRate:je.maxYawRate},jl=.01;function ft(n,e){return Number.isFinite(n)?n:e}function Cn(n,e,t){return Math.min(t,Math.max(e,n))}function Ds(n){const e=n.reduce((t,i)=>t+i,0);return ft(e/n.length,0)}function X_(n){const e=n.reduce((i,[,r])=>i+r,0),t=n.reduce((i,[r,s])=>i+r*s,0);return e>0?ft(t/e,0):0}function Jl(n){return{height:ft(n,0)}}function q_(n,e,t){try{return Jl(n(e,t)?.height)}catch{return Jl(0)}}function Y_(n,e,t,i,r,s){const o=ft(n,0),a=ft(e,0),l=ft(t,0),c=Math.max(jl,Math.abs(ft(i,1))*.5),u=Math.max(jl,Math.abs(ft(r,1))*.5),h=Math.cos(l),f=Math.sin(l),p=(g,_)=>q_(s,o+g*h+_*f,a-g*f+_*h);return{bow:p(0,c),stern:p(0,-c),port:p(-u,0),starboard:p(u,0),bowPort:p(-u,c),bowStarboard:p(u,c),sternPort:p(-u,-c),sternStarboard:p(u,-c)}}function Z_(n,e={},t=!1){const i=ft(n?.bow?.height,0),r=ft(n?.stern?.height,0),s=ft(n?.port?.height,0),o=ft(n?.starboard?.height,0),a=ft(n?.bowPort?.height,0),l=ft(n?.bowStarboard?.height,0),c=ft(n?.sternPort?.height,0),u=ft(n?.sternStarboard?.height,0),h=Ds([i,a,l]),f=Ds([r,c,u]),p=Ds([s,a,c]),g=Ds([o,l,u]),_=Cn(X_([[i,1],[r,1],[s,1],[o,1],[a,.5],[l,.5],[c,.5],[u,.5]]),-Ct.maxHeave,Ct.maxHeave),m=Cn(-Math.atan2(ft(h-f,0),je.length),-.29,Ct.maxWavePitch),d=Cn(Math.atan2(ft(g-p,0),je.width),-.3,Ct.maxWaveRoll),b=ft(e?.forwardSpeed,0),x=ft(e?.yawRate,0),v=Cn(ft(e?.sailPower,0),0,1),E=ft(e?.relativeWindAngle,0),A=Cn(b/Ct.maxForwardSpeed,0,1),C=Cn(x/Ct.maxYawRate*Math.min(1,Math.abs(b)/Ct.maxForwardSpeed),-1,1),R=t?0:1,y=A*A*Ct.maxSpeedLift*R,S=-C*Ct.maxTurnHeel*R,P=Math.sin(E),D=Math.abs(P)<1e-6?0:P,L=Math.pow(v,.35),N=Math.sign(D)*Math.pow(Math.abs(D),.65)*L*Ct.maxWindHeel*R,O=Math.abs(N)/Ct.maxWindHeel*Ct.maxWindHeelLift;return{heave:Cn(_+O,-Ct.maxHeave,Ct.maxHeave),pitch:Cn(m-y,-.36,.36),roll:Cn(d+S+N,-.4,.4)}}const Pt={sternPort:{x:-1.3,z:-2.6},sternStarboard:{x:1.3,z:-2.6},shoulderPort:{x:-1.17,z:1.612},shoulderStarboard:{x:1.17,z:1.612},bowPort:{x:-.585,y:-.55,z:1.352},bowStarboard:{x:.585,y:-.55,z:1.352}},$_=[{x:-1.209,y:.47,z:-2.496},{x:1.209,y:.47,z:-2.496},{x:1.16064,y:.47,z:1.54752},{x:0,y:.47,z:2.496},{x:-1.16064,y:.47,z:1.54752}],K_=[{x:0,y:.47,z:-.18},{x:0,y:.465,z:-.34},{x:-.51,y:.47,z:-1.24},{x:.51,y:.47,z:-1.24},{x:-.51,y:.47,z:-.4},{x:.51,y:.47,z:-.4}],j_=[{x:-.884,y:-.55,z:-2.132},{x:.884,y:-.55,z:-2.132},Pt.bowPort,Pt.bowStarboard,{x:0,y:-.37,z:2.236},{x:0,y:-.63,z:-.312}];function J_(n,e,t,i,r,s,o){const a=x=>{const v=pd(x,r,s,o,e,t);let E=0;try{E=Tt(i(v.x,v.z),0)}catch{}return v.y-E},l=Math.min(...$_.map(a)),c=Math.min(...K_.map(a)),u=Math.min(...j_.map(a)),h=Tt(n.leewardRail.clearance,0),f=Math.max(-.06-l,.12-c,-.055-h),p=-.025-u,g=Gr(n.heelLoad/.5,0,1),_=g*g*(3-2*g),m=-Gr(h+.035,0,.6)*_,d=e.heave+f,b=Math.max(d,e.heave+p);return{minimumHeave:d,maximumHeave:b,targetHeave:Gr(e.heave+m,d,b)}}function Tt(n,e){return Number.isFinite(n)?n:e}function Gr(n,e,t){return Math.min(t,Math.max(e,n))}function pd(n,e,t,i,r,s){const o=Tt(r?.roll,0),a=Tt(r?.pitch,0),l=Tt(i,0),c=Math.cos(o),u=Math.sin(o),h=Math.cos(a),f=Math.sin(a),p=Math.cos(l),g=Math.sin(l),_=c*n.x-u*n.y,m=u*n.x+c*n.y,d=n.z,b=_,x=h*m-f*d,v=f*m+h*d;return{x:Tt(e,0)+p*b+g*v,y:Tt(s,0)+Tt(r?.heave,0)+x,z:Tt(t,0)-g*b+p*v}}function Ql(n,e,t,i,r,s,o,a,l,c,u,h=0,f=0){const p=Math.max(.01,Math.abs(Tt(s,2.6))/2.6),g=Math.max(.01,Math.abs(Tt(r,5.2))/5.2),_={},m=Tt(l,0),d=u?Math.max(0,m-Tt(u.timeSeconds,m)):0,b=(D,L)=>{const N=pd(L,n,e,t,i,o);let O=0;try{O=Tt(c(N.x,N.z),0)}catch{O=0}const B=u?.points[D],K=B&&d>1e-6?(O-B.waterHeight-(N.y-B.y))/d:0,V={...N,waterHeight:O,clearance:N.y-O,closingSpeed:Tt(K,0)};return _[D]=V,V},x=b("bowPort",{x:Pt.bowPort.x*p,y:Pt.bowPort.y,z:Pt.bowPort.z*g}),v=b("bowStarboard",{x:Pt.bowStarboard.x*p,y:Pt.bowStarboard.y,z:Pt.bowStarboard.z*g}),E=b("portRail",{x:(Pt.sternPort.x+Pt.shoulderPort.x)*.5*p,y:.45,z:(Pt.sternPort.z+Pt.shoulderPort.z)*.5*g}),A=b("starboardRail",{x:(Pt.sternStarboard.x+Pt.shoulderStarboard.x)*.5*p,y:.45,z:(Pt.sternStarboard.z+Pt.shoulderStarboard.z)*.5*g}),C=Gr(Tt(h,0),0,1),R=Tt(f,0),y=C*Math.abs(Math.sin(R)),S=Math.sin(R)>=0?"port":"starboard";return{contact:{bowPort:x,bowStarboard:v,leewardRail:S==="port"?E:A,leewardSide:S,heelLoad:Gr(y,0,1),forwardSpeed:Tt(a,0),sailPower:C,relativeWindAngle:R},history:{timeSeconds:m,points:_}}}const Dr=je.length,Ur=je.width,Us=.2,Q_=8*Math.PI/180,Ns=85*Math.PI/180,ex=9,eu=-.34;function tx(n){const e=new Yn;e.name="portfolio-sailboat",e.rotation.order="YXZ";const t=[],i=[],r=F=>(t.push(F),F),s=F=>(i.push(F),F),o=s(new en({color:14140835,roughness:.82,metalness:0,flatShading:!0})),a=new We(r(nx(Ur,Dr)),o);a.name="vessel-faceted-hull",e.add(a);const l=s(new en({color:12088134,roughness:.82,metalness:0,flatShading:!0})),c=new We(r(ix(Ur,Dr)),l);c.name="vessel-warm-wood-deck",e.add(c);const u=s(new en({color:7097150,roughness:.78,metalness:0,flatShading:!0})),h=new We(r(new bi(1.02,.32,.84)),u);h.name="vessel-cockpit-console",h.position.set(0,.63,-.82),e.add(h);const f=s(new en({color:5131331,roughness:.7,metalness:.05,flatShading:!0})),p=new We(r(new hn(.085,.12,5.45,6)),f);p.name="vessel-mast",p.position.set(0,3.19,-.34),e.add(p);const g=new Yn;g.name="sail-rig",g.position.set(0,0,eu),e.add(g);const _=F=>{F.position.z-=eu,g.add(F)},m=new We(r(new hn(.06,.075,3.1,6)),s(new en({color:15757160,roughness:.64,metalness:0,flatShading:!0})));m.name="vessel-main-boom",m.rotation.x=Math.PI*.5,m.position.set(0,2.04,-1.895),_(m);const d=s(new jn({color:16775142,side:At,toneMapped:!1})),b=s(new jn({color:14339507,side:At,toneMapped:!1})),x=new We(r(nu(.055,-.6,[[5.8,-.39],[2,-.39],[2.08,-3.4],[3.3,-1.52]])),d);x.name="vessel-cream-mainsail",_(x);const v=new We(r(nu(.062,-.42,[[5.76,-.41],[2.02,-.41],[2.08,-2.74],[3.28,-1.28]])),b);v.name="vessel-mainsail-facet",_(v);const E=s(new en({color:15757160,roughness:.64,metalness:0,side:At,flatShading:!0})),A=new We(r(tu([.073,2.08,-.48,.073,2.12,-3.05,.073,2.38,-2.78])),E);A.name="vessel-coral-main-clew",_(A);const C=new We(r(tu([-.52,.7,.96,.52,.7,.96,0,.7,2.18])),E);C.name="vessel-coral-bow",e.add(C);const R={heave:0,pitch:0,roll:0};let y=!1,S=Ns,P=Ns,D=0,L=0,N={bowPort:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},bowStarboard:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardRail:{x:0,y:0,z:0,waterHeight:0,clearance:0,closingSpeed:0},leewardSide:"starboard",heelLoad:0,sailPower:0,relativeWindAngle:0,forwardSpeed:0},O,B=!1;const K=F=>{if(!Number.isFinite(F))return Ns;const Q=F<0?-1:1,ie=Math.min(Ns,Math.max(Q_,Math.abs(F)));return Q*ie},V=(F,Q)=>{const ie=Number.isFinite(F)&&F>0?Math.min(F,.25):0,Ie=Q||y?1:1-Math.exp(-ie*ex);S=Fs(S,P,Ie),g.rotation.y=S,g.scale.x=S<0?-1:1},te=(F,Q,ie,Ie)=>{const Ue=Number.isFinite(Q)?Q:0,z=Y_(F.x,F.z,F.heading,Dr,Ur,(_e,le)=>({height:_i(_e,le,Ue)})),se=F.velocityX*Math.sin(F.heading)+F.velocityZ*Math.cos(F.heading),re=Z_(z,{forwardSpeed:se,yawRate:F.yawRate,sailPower:D,relativeWindAngle:L},y),Ce=Number.isFinite(ie)&&ie>0?Math.min(ie,.25):0,Ae=Ie?1:1-Math.exp(-Ce*Ct.heaveResponseRate),X=Ie?1:1-Math.exp(-Ce*Ct.tiltResponseRate);R.pitch=Fs(R.pitch,re.pitch,X),R.roll=Fs(R.roll,re.roll,X);const ge={...R,heave:re.heave},q=y?0:D,w=Ql(F.x,F.z,F.heading,ge,Dr,Ur,Us,se,Ue,(_e,le)=>_i(_e,le,Ue),Ie?void 0:O,q,L),pe=J_(w.contact,ge,Us,(_e,le)=>_i(_e,le,Ue),F.x,F.z,F.heading);R.heave=Math.min(pe.maximumHeave,Math.max(pe.minimumHeave,Fs(R.heave,pe.targetHeave,Ae)));const he=Ql(F.x,F.z,F.heading,R,Dr,Ur,Us,se,Ue,(_e,le)=>_i(_e,le,Ue),Ie?void 0:O,q,L);N=he.contact,O=he.history,e.position.set(Number.isFinite(F.x)?F.x:0,R.heave+Us,Number.isFinite(F.z)?F.z:0),e.rotation.y=Number.isFinite(F.heading)?F.heading:0,e.rotation.x=R.pitch,e.rotation.z=R.roll,V(ie,Ie)};return n.add(e),{group:e,update:(F,Q,ie)=>{B||te(F,Q,ie,!1)},resetPose:(F,Q=0)=>{B||(O=void 0,te(F,Q,0,!0))},setReducedMotion:F=>{B||(y=F===!0,y&&V(0,!0))},setSailAngle:(F,Q=!1)=>{B||(P=K(F),V(0,Q))},setSailLoad:(F,Q)=>{B||(D=Number.isFinite(F)?Math.min(1,Math.max(0,F)):0,L=Number.isFinite(Q)?Q:0)},getSailAngle:()=>S,getWaterContact:()=>({...N,bowPort:{...N.bowPort},bowStarboard:{...N.bowStarboard},leewardRail:{...N.leewardRail}}),getPose:()=>({...R}),dispose:()=>{if(!B){B=!0;for(const F of t)F.dispose();for(const F of i)F.dispose();e.removeFromParent(),e.clear()}}}}function nx(n,e){const t=n*.5,i=e*.5,r=.45,s=-.55,o=[[-t,r,-i],[t,r,-i],[t*.9,r,i*.62],[0,r,i],[-t*.9,r,i*.62]],a=[[-t*.68,s,-i*.82],[t*.68,s,-i*.82],[t*.45,s,i*.52],[0,s+.18,i*.86],[-t*.45,s,i*.52]],l=[];for(const f of o)l.push(...f);for(const f of a)l.push(...f);l.push(0,s-.08,-i*.12);const c=10,u=[];for(let f=0;f<5;f+=1){const p=(f+1)%5;u.push(f,p,5+p,f,5+p,5+f),u.push(c,5+p,5+f)}const h=new gt;return h.setAttribute("position",new lt(l,3)),h.setIndex(u),h.computeVertexNormals(),h}function ix(n,e){const t=n*.5*.93,i=e*.5*.96,r=.47,s=[[-t,r,-i],[t,r,-i],[t*.96,r,i*.62],[0,r,i],[-t*.96,r,i*.62]],o=[0,r,-.18],a=[];for(const c of s)o.push(...c);for(let c=0;c<s.length;c+=1){const u=(c+1)%s.length;a.push(0,u+1,c+1)}const l=new gt;return l.setAttribute("position",new lt(o,3)),l.setIndex(a),l.computeVertexNormals(),rx(l),l}function rx(n){const e=n.getAttribute("position"),t=n.getIndex();if(!t||t.count<3)throw new Error("Vessel deck needs indexed faces");const i=t.getX(0),r=t.getX(1),s=t.getX(2),o=e.getX(r)-e.getX(i),a=e.getZ(r)-e.getZ(i),l=e.getX(s)-e.getX(i),c=e.getZ(s)-e.getZ(i);if(!(a*l-o*c>0))throw new Error("Vessel deck faces downward")}function tu(n){const e=new gt;return e.setAttribute("position",new lt([...n],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function nu(n,e,t){const[i,r,s,o]=t,a=new gt;return a.setAttribute("position",new lt([n,i[0],i[1],n,r[0],r[1],n,s[0],s[1],e,o[0],o[1]],3)),a.setIndex([0,1,3,1,2,3,2,0,3]),a.computeVertexNormals(),a}function Fs(n,e,t){return n+(e-n)*Math.min(1,Math.max(0,t))}const Nr=96,md=80,Fr=md,sx=[-1,1],ox=1.45,iu=.34,ru=.055,su=.11,ax=.45,cx=.055,ct=32,ou=.06,Gi=2.2,au=.24,Wi=18,lx=.27,ux=.2,dx=1;function hx(n){const e=new xc(1,7);e.rotateX(-Math.PI*.5);const t=new jn({color:16052196,transparent:!0,opacity:.5,depthWrite:!1,side:At}),i=new Ju(e,t,Nr);i.name="phase-five-wake-foam",i.frustumCulled=!1,i.instanceMatrix.setUsage(ln),n.add(i);const r=new Float32Array(ct*2*2*3),s=new Float32Array(ct*2*2*4),o=new Uint16Array((ct-1)*2*6);let a=0;for(let X=0;X<2;X+=1){const ge=X*ct*2;for(let q=0;q<ct-1;q+=1){const w=ge+q*2,pe=w+2;o[a++]=w,o[a++]=pe,o[a++]=w+1,o[a++]=w+1,o[a++]=pe,o[a++]=pe+1}}const l=new gt,c=new pt(r,3),u=new pt(s,4);c.setUsage(ln),u.setUsage(ln),l.setAttribute("position",c),l.setAttribute("color",u),l.setIndex(new pt(o,1));const h=new jn({color:16777215,vertexColors:!0,transparent:!0,opacity:.42,depthWrite:!1,side:At}),f=new We(l,h);f.name="phase-five-wake-ribbon",f.frustumCulled=!1,n.add(f);const p=new Float32Array(Wi*2*3),g=new Float32Array(Wi*2*4),_=new Uint16Array((Wi-1)*6);let m=0;for(let X=0;X<Wi-1;X+=1){const ge=X*2,q=ge+2;_[m++]=ge,_[m++]=q,_[m++]=ge+1,_[m++]=ge+1,_[m++]=q,_[m++]=q+1}const d=new gt,b=new pt(p,3),x=new pt(g,4);b.setUsage(ln),x.setUsage(ln),d.setAttribute("position",b),d.setAttribute("color",x),d.setIndex(new pt(_,1));const v=new jn({color:16777215,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,side:At}),E=new We(d,v);E.name="phase-five-bow-wave",E.frustumCulled=!1,n.add(E);const A=Array.from({length:Nr},()=>({age:Number.POSITIVE_INFINITY,life:0,x:0,z:0,heading:0,driftX:0,driftZ:0,size:0,elongation:1,kind:0,side:0,waveResponse:0,trimBoost:0,active:!1})),C=new vt,R=Array.from({length:ct},()=>({age:Number.POSITIVE_INFINITY,x:0,z:0,heading:0,speed:0,yawRate:0,trimBoost:0,active:!1}));let y=0,S=Fr,P=0,D=0,L=0,N=0,O=0,B=0,K=!1,V=!1;const te=(X,ge,q,w)=>{if(!ge.active||ge.age>=ge.life){ge.active=!1,C.scale.setScalar(0),C.updateMatrix(),i.setMatrixAt(X,C.matrix);return}const pe=Math.min(1,Math.max(0,ge.age/ge.life)),he=pe<.16?pe/.16:1-(pe-.16)/.84,_e=w?Math.min(ge.trimBoost,B):0,le=ge.size*(1+_e*.85)*Math.max(0,he);let Se=Nn(ge.x,ge.z,q),j=0;if(ge.kind!==0){const Ke=Vr(ge.x,ge.z,q);Se=Ke.height,j=Math.min(.45,Math.hypot(Ke.slopeX,Ke.slopeZ))}const fe=1+ge.waveResponse*j;C.position.set(ge.x,Se+ux,ge.z),C.rotation.set(0,ge.heading,0),C.scale.set(le*ge.elongation*(1+_e*.24)*fe,1,le*(1+_e*.12)*fe),C.updateMatrix(),i.setMatrixAt(X,C.matrix)},F=X=>{X.active=!1,X.age=Number.POSITIVE_INFINITY,X.kind=0,X.side=0,X.waveResponse=0,X.trimBoost=0},Q=(X,ge)=>{const q=Math.sin(X.heading),w=Math.cos(X.heading),pe=Math.cos(X.heading),he=-Math.sin(X.heading),_e=je.length*.52;for(const le of sx){const Se=y;y=(y+1)%md;const j=A[Se],fe=(Se*17%11/10-.5)*.12,Ke=je.width*.32+fe,Xe=.18+Math.min(.48,ge*.035);j.age=0,j.heading=X.heading,j.life=ox*(.82+Se*13%7*.035),j.x=X.x-q*_e+pe*le*Ke,j.z=X.z-w*_e+he*le*Ke,j.driftX=-q*(.12+ge*.08)+pe*le*Xe,j.driftZ=-w*(.12+ge*.08)+he*le*Xe,j.size=.13+Math.min(.2,ge*.017),j.elongation=1.1+Math.min(.45,ge*.035),j.kind=0,j.side=le,j.waveResponse=.45,j.trimBoost=B,j.active=!0}},ie=()=>{const X=S;return S=Fr+(S-Fr+1)%(Nr-Fr),A[X]},Ie=(X,ge,q,w,pe)=>{const he=Math.sin(X.heading),_e=Math.cos(X.heading),le=Math.cos(X.heading),Se=-Math.sin(X.heading),j=ie();j.age=0,j.life=iu*(.92+w*.35+pe*.22),j.heading=X.heading+q*.16,j.x=X.x+he*(je.length*.48)+le*q*je.width*.28,j.z=X.z+_e*(je.length*.48)+Se*q*je.width*.28,j.driftX=he*(.08+ge*.035)+le*q*(.2+w*.24+pe*.12),j.driftZ=_e*(.08+ge*.035)+Se*q*(.2+w*.24+pe*.12),j.size=.13+Math.min(.12,ge*.012)+w*.05+pe*.1,j.elongation=1.35+Math.min(.4,ge*.025)+pe*.18,j.kind=1,j.side=q,j.waveResponse=1.25,j.active=!0},Ue=(X,ge,q,w)=>{const pe=Math.sign(X.yawRate);if(pe===0)return;const he=Math.sin(X.heading),_e=Math.cos(X.heading),le=Math.cos(X.heading),Se=-Math.sin(X.heading),j=ie(),fe=Math.min(1,Math.abs(X.yawRate)/.6);j.age=0,j.life=iu*(1.05+fe*.3+w*.18),j.heading=X.heading+pe*.32,j.x=X.x-he*(je.length*.08)+le*pe*(je.width*.58),j.z=X.z-_e*(je.length*.08)+Se*pe*(je.width*.58),j.driftX=le*pe*(.22+ge*.035)-he*.06,j.driftZ=Se*pe*(.22+ge*.035)-_e*.06,j.size=.13+fe*.1+q*.04+w*.08,j.elongation=1.5+fe*.45+w*.12,j.kind=2,j.side=pe,j.waveResponse=1.1,j.active=!0},z=(X,ge,q)=>{const w=X.x+Math.sin(X.heading)*je.length*.48,pe=X.z+Math.cos(X.heading)*je.length*.48,he=Vr(w,pe,q),_e=Math.min(.45,Math.hypot(he.slopeX,he.slopeZ)),le=Math.abs(he.velocityY+X.velocityX*he.slopeX+X.velocityZ*he.slopeZ),Se=Math.min(.9,le*.26);Ie(X,ge,-1,_e,Se),Ie(X,ge,1,_e,Se),Math.abs(X.yawRate)>=cx&&Ue(X,ge,_e,Se)},se=(X,ge)=>{const q=R[L];q.age=0,q.x=Number.isFinite(X.x)?X.x:0,q.z=Number.isFinite(X.z)?X.z:0,q.heading=Number.isFinite(X.heading)?X.heading:0,q.speed=ge,q.yawRate=Number.isFinite(X.yawRate)?X.yawRate:0,q.trimBoost=B,q.active=!0,L=(L+1)%ct,N=Math.min(ct,N+1)},re=(X,ge)=>{const q=ct-N;for(let w=0;w<2;w+=1){const pe=w===0?-1:1,he=w*ct*2;let _e=ct,le=-1;for(let Se=0;Se<ct;Se+=1){const j=Se>=q,fe=Se-q,Ke=j?(L-N+fe+ct)%ct:0,Xe=R[Ke];j&&Xe.active&&Xe.age<Gi&&(_e===ct&&(_e=Se),le=Se)}for(let Se=0;Se<ct;Se+=1){const j=(he+Se*2)*3,fe=(he+Se*2)*4,Ke=Se>=q,Xe=Se-q,I=Ke?(L-N+Xe+ct)%ct:0,M=R[I];if(!Ke||!M.active||M.age>=Gi){for(let ke=0;ke<8;ke+=1)s[fe+ke]=0;continue}const W=Math.max(0,1-M.age/Gi),$=ge?Math.min(M.trimBoost,B):0,ne=Math.min(1,Math.max(0,M.speed/je.maxForwardSpeed)),J=N>1?Xe/(N-1):1,be=.18+Math.min(1,Math.max(0,1-J)*5)*.82,ue=W*W*(.72+ne*.28)*(.55+be*.45)*(1+$*.16),we=Math.sin(M.heading),Le=Math.cos(M.heading),ce=Math.cos(M.heading),xe=-Math.sin(M.heading),Ne=je.length*(.52+ne*.08),Re=M.x-we*Ne,ve=M.z-Le*Ne,Be=je.width*(.34+ne*.1)*(1+$*.2)*be,U=Be+(.62+ne*1.05+Math.min(.45,Math.abs(M.yawRate)*.72))*(.32+W*.68)*(1+$*.82)*be,oe=Re+ce*pe*Be,me=ve+xe*pe*Be,Ee=Re+ce*pe*U,ae=ve+xe*pe*U,ee=Nn(oe,me,X)+au,Pe=Nn(Ee,ae,X)+au;r[j]=oe,r[j+1]=ee,r[j+2]=me,r[j+3]=Ee,r[j+4]=Pe,r[j+5]=ae,s[fe]=1,s[fe+1]=1,s[fe+2]=1,s[fe+3]=ue,s[fe+4]=1,s[fe+5]=1,s[fe+6]=1,s[fe+7]=ue}if(le<0)for(let Se=0;Se<ct;Se+=1){const j=(he+Se*2)*3;for(let fe=0;fe<6;fe+=1)r[j+fe]=0}else for(let Se=0;Se<ct;Se+=1){const j=Se>=q,fe=Se-q,Ke=j?(L-N+fe+ct)%ct:0,Xe=R[Ke];if(j&&Xe.active&&Xe.age<Gi)continue;let I=Se<=_e?_e:Se-1;for(;I>=_e;){const $=I>=q,ne=I-q,J=$?(L-N+ne+ct)%ct:0,be=R[J];if($&&be.active&&be.age<Gi)break;I-=1}I<_e&&(I=_e);const M=(he+Se*2)*3,W=(he+I*2)*3;for(let $=0;$<6;$+=1)r[M+$]=r[W+$]}}l.getAttribute("position").needsUpdate=!0,l.getAttribute("color").needsUpdate=!0},Ce=(X,ge,q,w)=>{if(!w){p.fill(0),g.fill(0),b.needsUpdate=!0,x.needsUpdate=!0;return}const pe=Math.sin(X.heading),he=Math.cos(X.heading),_e=Math.cos(X.heading),le=-Math.sin(X.heading),Se=X.x+pe*je.length*.48,j=X.z+he*je.length*.48,fe=Se-pe*.78,Ke=j-he*.78,Xe=Vr(Se,j,q),I=Math.min(.5,Math.hypot(Xe.slopeX,Xe.slopeZ)),M=Math.abs(Xe.velocityY+X.velocityX*Xe.slopeX+X.velocityZ*Xe.slopeZ),W=Math.min(.9,M*.26),$=Math.min(1,Math.max(0,ge/je.maxForwardSpeed)),ne=.9+$*.22+W*.14,J=.18+$*.12+I*.1+W*.08,be=Math.min(.92,.28+$*.48+W*.18);for(let ue=0;ue<Wi;ue+=1){const we=Math.PI-ue/(Wi-1)*Math.PI,Le=Math.cos(we),ce=Math.sin(we);for(let xe=0;xe<2;xe+=1){const Ne=ne+xe*J,Re=Le*Ne,ve=ce*Ne,Be=(ue*2+xe)*3,U=(ue*2+xe)*4,oe=fe+_e*Re+pe*ve,me=Ke+le*Re+he*ve;p[Be]=oe,p[Be+1]=Nn(oe,me,q)+lx,p[Be+2]=me,g[U]=1,g[U+1]=1,g[U+2]=1,g[U+3]=be*(xe===0?1:.78)}}b.needsUpdate=!0,x.needsUpdate=!0},Ae=()=>{if(!V){P=0,D=0,y=0,S=Fr,L=0,N=0,O=0,B=0;for(const X of A)F(X);for(const X of R)X.trimBoost=0,X.active=!1;for(let X=0;X<Nr;X+=1)te(X,A[X],0,!1);re(0,!1),Ce({x:0,z:0,velocityX:0,velocityZ:0,heading:0},0,0,!1),i.instanceMatrix.needsUpdate=!0}};return Ae(),{update:(X,ge,q)=>{if(V||K)return;const w=Number.isFinite(q)?Math.min(.1,Math.max(0,q)):0;if(w<=0)return;const pe=Number.isFinite(ge)?ge:0,he=X.velocityX*Math.sin(X.heading)+X.velocityZ*Math.cos(X.heading),_e=Math.max(0,he),le=_e>=ax;for(const fe of A)fe.active&&(fe.age+=w,fe.x+=fe.driftX*w,fe.z+=fe.driftZ*w,fe.age>=fe.life&&(fe.active=!1));let Se=!1;for(const fe of R)fe.active&&(fe.age+=w,fe.age>=Gi?fe.active=!1:Se=!0);if(!Se&&N>0&&(N=0,L=0),le){for(N===0&&se(X,_e),O+=w;O>=ou;)O-=ou,se(X,_e);for(P+=w;P>=ru;)P-=ru,Q(X,_e);for(D+=w;D>=su;)D-=su,z(X,_e,pe)}else P=0,D=0,O=0;const j=le&&B>0;for(let fe=0;fe<Nr;fe+=1)te(fe,A[fe],pe,j);re(pe,j),Ce(X,_e,pe,le),i.instanceMatrix.needsUpdate=!0},reset:Ae,setTrimBoost:X=>{if(!V){if(B=Number.isFinite(X)?Math.min(dx,Math.max(0,X)):0,B===0){for(const ge of A)ge.trimBoost=0;for(const ge of R)ge.trimBoost=0}K&&(B=0)}},setReducedMotion:X=>{V||K===X||(K=X,X&&(B=0,Ae()))},dispose:()=>{V||(V=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),f.removeFromParent(),l.dispose(),h.dispose(),E.removeFromParent(),d.dispose(),v.dispose(),C.clear())}}}const Xi=48,cu=.065,lu=.09,uu=.65,fx=.08,px=.12,mx=.3,gx=.06,_x=.1,du=-7.5,$o=.035,hu=3254217;function zt(n,e){return Number.isFinite(n)?n:e}function qi(n,e,t){return Math.min(t,Math.max(e,n))}function Ko(n){return n!=null}function xx(n){const e=new to(1,0),t=new jn({color:16055287,vertexColors:!0,transparent:!0,opacity:.76,depthWrite:!1,side:At}),i=new Ju(e,t,Xi);i.name="phase-twelve-hull-spray",i.frustumCulled=!1,i.instanceMatrix.setUsage(ln),i.instanceColor=new Wa(new Float32Array(Xi*3),3),i.instanceColor.setUsage(ln),n.add(i);const r=Array.from({length:Xi},()=>({active:!1,age:Number.POSITIVE_INFINITY,life:0,x:0,y:0,z:0,velocityX:0,velocityY:0,velocityZ:0,size:0,elongation:1,kind:0})),s=new vt,o=new qe(16318460),a=new qe(12577250);let l=0,c=0,u=0,h=hu,f=!1,p=!1;const g=()=>(h=Math.imul(h,1664525)+1013904223>>>0,h/4294967295),_=E=>{E.active=!1,E.age=Number.POSITIVE_INFINITY,E.life=0,E.size=0},m=(E,A)=>{if(!A.active||A.age>=A.life){_(A),s.scale.setScalar(0),s.position.set(0,0,0),s.updateMatrix(),i.setMatrixAt(E,s.matrix),i.setColorAt(E,A.kind===0?o:a);return}const C=qi(A.age/A.life,0,1),R=C<.12?C/.12:Math.max(0,1-(C-.12)/.88),y=A.size*R;s.position.set(A.x,A.y,A.z),s.rotation.set(0,0,0),s.scale.set(y*A.elongation,y,y),s.updateMatrix(),i.setMatrixAt(E,s.matrix),i.setColorAt(E,A.kind===0?o:a)},d=E=>{const A=r[l];return l=(l+1)%Xi,A.active=!0,A.age=0,A.kind=E,A},b=(E,A,C,R,y,S,P,D)=>{const L=jr(D),N=qi(zt(E.closingSpeed,0),0,4),O=d(0),B=.18+g()*.42;O.x=zt(E.x,0)+y*A*B;const K=_i(O.x,O.z,D)+$o;O.y=Math.max(zt(E.y,0),K),O.z=zt(E.z,0)+S*A*B,O.velocityX=C*(.2+P*.035)+y*A*(.12+g()*.18)+L.x*.025,O.velocityZ=R*(.2+P*.035)+S*A*(.12+g()*.18)+L.z*.025,O.velocityY=.62+g()*.65+N*.22,O.life=.45+g()*.25,O.size=.07+g()*.055+Math.min(.035,P*.003),O.elongation=1.2+g()*.55},x=(E,A,C,R,y,S,P,D,L)=>{const N=jr(L),O=d(1);O.x=zt(E.x,0);const B=_i(O.x,O.z,L)+$o;O.y=Math.max(zt(E.y,0),B),O.z=zt(E.z,0),O.velocityX=C*(.12+P*.018)+y*A*(.16+D*.18)+N.x*.018,O.velocityZ=R*(.12+P*.018)+S*A*(.16+D*.18)+N.z*.018,O.velocityY=.22+g()*.3+D*.25,O.life=.32+g()*.18,O.size=.065+g()*.045+D*.025,O.elongation=1.1+g()*.5},v=()=>{if(!p){l=0,c=0,u=0,h=hu;for(let E=0;E<Xi;E+=1)_(r[E]),m(E,r[E]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}};return v(),{update:(E,A,C)=>{if(p||f)return;const R=Number.isFinite(C)?qi(C,0,_x):0;if(R<=0)return;const y=Number.isFinite(A)?A:0,S=zt(E?.forwardSpeed,0),P=E?.bowPort,D=E?.bowStarboard,L=E?.leewardRail;let N=zt(P?.x,0)-zt(D?.x,0),O=zt(P?.z,0)-zt(D?.z,0);const B=Math.hypot(N,O);B<1e-6?(N=-1,O=0):(N/=B,O/=B);let K=O,V=-N;const te=Math.hypot(K,V);te<1e-6?(K=0,V=1):(K/=te,V/=te);const F=[[P,1],[D,-1]];let Q,ie=1;for(const[z,se]of F)Ko(z)&&(z.clearance>mx||z.closingSpeed<=fx||(!Q||z.closingSpeed>Q.closingSpeed)&&(Q=z,ie=se));const Ie=S>=uu&&Ko(Q),Ue=S>=uu&&Ko(L)&&L.clearance<=gx&&zt(E?.heelLoad,0)>=px;for(const z of r){if(!z.active)continue;z.age+=R,z.x+=z.velocityX*R,z.y+=z.velocityY*R+.5*du*R*R,z.z+=z.velocityZ*R,z.velocityY+=du*R;const se=_i(z.x,z.z,y)+$o;if(z.y<=se){z.y=se,z.active=!1;continue}z.age>=z.life&&(z.active=!1)}if(Ie&&Q){c+=R;let z=0;for(;c>=cu&&z<2;)c-=cu,b(Q,ie,K,V,N,O,qi(S,0,20),y),z+=1}else c=0;if(Ue&&L){u+=R;let z=0;for(;u>=lu&&z<2;){u-=lu;const se=E.leewardSide==="port"?1:-1;x(L,se,K,V,N,O,qi(S,0,20),qi(zt(E?.heelLoad,0),0,1),y),z+=1}}else u=0;for(let z=0;z<Xi;z+=1)m(z,r[z]);i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)},reset:v,setReducedMotion:E=>{p||f===E||(f=E,E&&v())},dispose:()=>{p||(p=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),s.clear())}}}const tn=1e-7,jo=.28,fu=20;function Wr(n){return typeof n=="number"&&Number.isFinite(n)}function vx(n){return Wr(n?.x)&&Wr(n?.z)}function er(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Pn(n,e,t){return{ok:!1,islandId:n,reason:e,message:t}}function Mx(n,e,t){return Math.min(t,Math.max(e,n))}function Sx(n,e,t){const i=t.x-e.x,r=t.z-e.z,s=i*i+r*r;if(s<=tn)return er(n,e);const o=Mx(((n.x-e.x)*i+(n.z-e.z)*r)/s,0,1);return Math.hypot(n.x-(e.x+i*o),n.z-(e.z+r*o))}function Xr(n,e,t){const i=e-t;return n.x>=-i-tn&&n.x<=i+tn&&n.z>=-i-tn&&n.z<=i+tn}function yx(n,e,t,i,r){if(!Xr(n,i,r)||!Xr(e,i,r))return!1;for(const s of t){const o=s.radius+r;if(Sx(s.center,n,e)<o-tn)return!1}return!0}function Ex(n){let e=0;for(let t=1;t<n.length;t+=1)e+=er(n[t-1],n[t]);return e}function pu(n){return`${n.x.toFixed(5)}:${n.z.toFixed(5)}`}function bx(n,e,t,i,r=i?.vesselClearance){const s=t.find(L=>L.id===e);if(!s)return Pn(e,"unknown-island",`Unknown island "${e}".`);if(!vx(n))return Pn(e,"invalid-start","The vessel position is not finite.");const o=i?.worldLimit,a=r;if(!Wr(o)||o<=0||!Wr(a)||a<0||a>=o)return Pn(e,"invalid-bounds","Navigation bounds must be finite and leave room for the vessel.");if(!Xr(n,o,a))return Pn(e,"invalid-start","The vessel is outside the navigable water bounds.");const l=t.map(L=>({center:{x:L.position.x,z:L.position.z},radius:L.landCollisionRadius})),c=t.findIndex(L=>L.id===e),u=s.landCollisionRadius+a,h=s.dockingTriggerRadius-u;if(!Wr(h)||h<=jo*2)return Pn(e,"target-annulus-too-small","There is not enough safe water inside the docking zone.");if(er(n,l[c].center)<u-tn)return Pn(e,"start-in-obstacle","The vessel starts inside an island clearance envelope.");const p=l[c].center,g=n.x-p.x,_=n.z-p.z,m=Math.hypot(g,_),d=u+Math.min(jo,h*.34),b=m>tn?g/m:1,x=m>tn?_/m:0,v={x:p.x+b*d,z:p.z+x*d};if(!Xr(v,o,a))return Pn(e,"target-out-of-bounds","The docking point is outside the navigable water bounds.");const E=[{point:{x:n.x,z:n.z},obstacleIndex:null},{point:v,obstacleIndex:null}],A=new Set(E.map(L=>pu(L.point)));t.forEach((L,N)=>{const O=L.landCollisionRadius+a+jo;for(let B=0;B<fu;B+=1){const K=B/fu*Math.PI*2,V={x:L.position.x+Math.cos(K)*O,z:L.position.z+Math.sin(K)*O};if(!Xr(V,o,a)||t.some((F,Q)=>Q===N?!1:er(V,{x:F.position.x,z:F.position.z})<F.landCollisionRadius+a-tn))continue;const te=pu(V);A.has(te)||(A.add(te),E.push({point:V,obstacleIndex:N}))}});const C=E.map(()=>[]);for(let L=0;L<E.length;L+=1)for(let N=L+1;N<E.length;N+=1){if(!yx(E[L].point,E[N].point,l,o,a))continue;const O=er(E[L].point,E[N].point);C[L].push({to:N,cost:O}),C[N].push({to:L,cost:O})}const R=E.map(()=>Number.POSITIVE_INFINITY),y=E.map(()=>-1),S=E.map(()=>!1);R[0]=0;for(let L=0;L<E.length;L+=1){let N=-1,O=Number.POSITIVE_INFINITY;for(let B=0;B<E.length;B+=1)!S[B]&&R[B]<O&&(O=R[B],N=B);if(N<0||!Number.isFinite(O)||(S[N]=!0,N===1))break;for(const B of C[N]){const K=O+B.cost;K<R[B.to]-tn&&(R[B.to]=K,y[B.to]=N)}}if(!Number.isFinite(R[1]))return Pn(e,"no-safe-route","No bounded safe route to the docking zone could be found.");const P=[];for(let L=1;L>=0&&(P.push(E[L].point),L!==0);L=y[L])if(y[L]<0)return Pn(e,"no-safe-route","The safe route graph is disconnected.");P.reverse();const D=P.filter((L,N)=>N===0||er(L,P[N-1])>tn);return{ok:!0,islandId:e,points:D,target:v,distance:Ex(D),clearance:a}}const mu=.8,gu=12,Tx=16,Ax=60,gd=1e-7,wx=.01;function Zn(n){return typeof n=="number"&&Number.isFinite(n)}function pr(n,e,t){return Math.min(t,Math.max(e,n))}function Jr(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function Rx(n,e){return Jr(e-n)}function Ec(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Cx(n){let e=0;for(let t=1;t<n.length;t+=1)e+=Ec(n[t-1],n[t]);return e}function Za(n){return{x:n.x,z:n.z}}function _d(n){return{x:Zn(n?.x)?n.x:0,z:Zn(n?.z)?n.z:0,heading:Jr(Zn(n?.heading)?n.heading:0)}}function Px(n){return{..._d(n),status:"idle",islandId:null,route:[],elapsed:0,duration:0,travelledDistance:0,totalDistance:0,velocityX:0,velocityZ:0,reason:null}}function Zi(n={x:0,z:0,heading:0}){return Px(n)}function qs(n,e,t){return{...n,status:e,reason:t,velocityX:0,velocityZ:0}}function Ix(n,e){if(n.length===0)return{point:{x:0,z:0},heading:0};if(n.length===1)return{point:Za(n[0]),heading:0};let t=Math.max(0,e);for(let s=1;s<n.length;s+=1){const o=n[s-1],a=n[s],l=Ec(o,a);if(t<=l||s===n.length-1){const c=l>gd?pr(t/l,0,1):1;return{point:{x:o.x+(a.x-o.x)*c,z:o.z+(a.z-o.z)*c},heading:Math.atan2(a.x-o.x,a.z-o.z)}}t-=l}const i=n[n.length-1],r=n[n.length-2];return{point:Za(i),heading:Math.atan2(i.x-r.x,i.z-r.z)}}function Lx(n){const e=pr(n,0,1);return e*e*(3-2*e)}function Dx(n,e,t={}){const i=n??Zi(),r=e?.route,s=Array.isArray(r)&&r.every(f=>Zn(f?.x)&&Zn(f?.z)),o=s?r.map(Za):[];if(!e?.islandId||!s||o.length===0)return qs({...i,islandId:e?.islandId??null,route:o},"failed","Scanner route is empty or invalid.");if(Ec(i,o[0])>wx)return qs({...i,islandId:e.islandId,route:o},"failed","Scanner route does not start at the vessel position.");const a=Cx(o);if(a<=gd)return qs({...i,islandId:e.islandId,route:o,x:o[o.length-1].x,z:o[o.length-1].z},"arrived",null);const l=Zn(t.maxSpeed)&&t.maxSpeed>0?t.maxSpeed:Tx,c=pr(a/l,mu,gu),u=Zn(t.duration)&&t.duration>0?pr(t.duration,mu,gu):c,h=_d(i);return{...i,...h,x:o[0].x,z:o[0].z,heading:Jr(h.heading),status:"active",islandId:e.islandId,route:o,elapsed:0,duration:u,travelledDistance:0,totalDistance:a,velocityX:0,velocityZ:0,reason:null}}function Ux(n,e="Scanner cancelled by user."){return qs({...n},"cancelled",e)}function _u(n,e){if(!n||n.status!=="active")return n;const t=Zn(e)?pr(e,0,Ax):0,i=Math.min(n.duration,n.elapsed+t),r=n.duration>0?i/n.duration:1,s=Lx(r),o=n.totalDistance*s,a=Ix(n.route,o),l={x:n.x,z:n.z},c=t>0?(a.point.x-l.x)/t:0,u=t>0?(a.point.z-l.z)/t:0,h=r>=1?1:pr(t*5.5,0,1),f=Jr(n.heading+Rx(n.heading,a.heading)*h);return r>=1-Number.EPSILON?{...n,x:n.route[n.route.length-1].x,z:n.route[n.route.length-1].z,heading:Jr(a.heading),elapsed:n.duration,travelledDistance:n.totalDistance,status:"arrived",velocityX:0,velocityZ:0,reason:null}:{...n,x:a.point.x,z:a.point.z,heading:f,elapsed:i,travelledDistance:o,velocityX:c,velocityZ:u}}function li(n){return n.status==="active"}const Yi=[.012,.16,.23],Jo=[.018,.31,.4],Qo=[.045,.43,.5],xu=[.34,.58,.56],vu=[.007,.02,.045],Nx=[.016,.055,.085],Fx=[.055,.12,.16],Ox=[.28,.34,.36];function Bx(n){const e=dd(),t=e.length*e.length,i=new Float32Array(t*3),r=new Float32Array(t*3),s=[],o=[];let a=0;for(let d=0;d<e.length;d+=1)for(let b=0;b<e.length;b+=1){const x=e[b],v=e[d];o.push([x,v]),i[a*3]=x,i[a*3+1]=0,i[a*3+2]=v,a+=1}const l=e.length;for(let d=0;d<l-1;d+=1)for(let b=0;b<l-1;b+=1){const x=d*l+b,v=x+1,E=x+l,A=E+1;(d+b)%2===0?s.push(x,E,v,v,E,A):s.push(x,E,A,x,A,v)}const c=new gt,u=new pt(i,3),h=new pt(r,3);u.setUsage(ln),h.setUsage(ln),c.setAttribute("position",u),c.setAttribute("color",h),c.setIndex(s),c.computeVertexNormals();const f=new en({color:16777215,roughness:.5,metalness:.08,flatShading:!0,vertexColors:!0}),p=new We(c,f);p.name="phase-one-water-field",n.add(p);const g=zx();n.add(g.mesh);let _=!1;const m=d=>{if(_)return;const b=Number.isFinite(d)?d:0,x=c.getAttribute("position"),v=c.getAttribute("color");for(let E=0;E<o.length;E+=1){const[A,C]=o[E],R=Vr(A,C,b);x.setY(E,R.height),kx(v,E,R.height,R.slopeX,R.slopeZ,R.stormIntensity)}x.needsUpdate=!0,v.needsUpdate=!0,g.update(b)};return m(0),{mesh:p,crestMesh:g.mesh,update:m,dispose:()=>{_||(_=!0,c.dispose(),f.dispose(),p.removeFromParent(),g.dispose())}}}function zx(){const n=Ht.directionX,e=Ht.directionZ,t=-e,i=n,r=1/(n*n+e*e),s=1/(t*t+i*i),o=4,a=.24,l=44,c=on.outerLimit*(Math.abs(t)+Math.abs(i)),u=on.outerLimit*(Math.abs(n)+Math.abs(e)),h=Math.ceil((-u*Ht.waveNumber-Math.PI*.5)/(Math.PI*2))-1,f=Math.floor((u*Ht.waveNumber-Math.PI*.5)/(Math.PI*2))+1,p=Math.PI*2/Ht.waveNumber,g=(Math.PI*.5+h*Math.PI*2)/Ht.waveNumber,_=(f-h+1)*p,m=[];for(let D=h;D<=f;D+=1){let L=0;for(let N=-c;N<=c;N+=l)m.push({normalIndex:D,tangentCenter:N,activity:Vx(D*31+L*17+401,D*13+L*7+911)}),L+=1}const d=new Float32Array(m.length*4*3),b=new Float32Array(m.length*4),x=new Float32Array(m.length*4*2),v=[];for(let D=0;D<m.length;D+=1){const L=D*4;v.push(L,L+1,L+2,L,L+2,L+3),x[(L+0)*2]=0,x[(L+0)*2+1]=0,x[(L+1)*2]=1,x[(L+1)*2+1]=0,x[(L+2)*2]=1,x[(L+2)*2+1]=1,x[(L+3)*2]=0,x[(L+3)*2+1]=1}const E=new gt,A=new pt(d,3),C=new pt(b,1);A.setUsage(ln),C.setUsage(ln),E.setAttribute("position",A),E.setAttribute("crestOpacity",C),E.setAttribute("crestUv",new pt(x,2)),E.setIndex(v);const R=new On({transparent:!0,depthWrite:!1,side:At,toneMapped:!1,uniforms:{},vertexShader:`
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
    `}),y=new We(E,R);y.name="phase-one-water-crest-ribbons";let S=!1;const P=D=>{if(S)return;const L=Number.isFinite(D)?D:0,N=L*Ht.angularSpeed/Ht.waveNumber;for(let O=0;O<m.length;O+=1){const B=m[O],K=(Math.PI*.5+B.normalIndex*Math.PI*2)/Ht.waveNumber,V=g+Gx(K-N-g,_),te=n*V*r+t*B.tangentCenter*s,F=e*V*r+i*B.tangentCenter*s,Q=Math.max(0,Math.sin(R_(te,F,L))),ie=$i(.42,.9,.5+.5*Math.cos(C_(te,F,L))),Ie=B.activity>.48?1:0,Ue=Hx(te,F),z=Ie*Q*ie*(.3+Ue*.18),se=t*o,re=i*o,Ce=n*a,Ae=e*a,X=O*4;Os(A,X,te-se-Ce,F-re-Ae,L,Ue),Os(A,X+1,te+se-Ce,F+re-Ae,L,Ue),Os(A,X+2,te+se+Ce,F+re+Ae,L,Ue),Os(A,X+3,te-se+Ce,F-re+Ae,L,Ue),C.setX(X,z),C.setX(X+1,z),C.setX(X+2,z),C.setX(X+3,z)}A.needsUpdate=!0,C.needsUpdate=!0};return P(0),{mesh:y,update:P,dispose:()=>{S||(S=!0,E.dispose(),R.dispose(),y.removeFromParent())}}}function Os(n,e,t,i,r,s=0){n.setXYZ(e,t,Nn(t,i,r)+.045+s*.018,i)}function kx(n,e,t,i,r,s=0){const o=Math.min(1,Math.max(0,s)),a=1+o*(Vt.maxWaveScale-1),l=(t+Ya*a)/(Ya*2*a),c=$i(.1,.52,l),u=$i(.6,.9,l)*.52,h=Math.min(1,Math.hypot(i,r)*2.8),f=$i(.76,.96,l)*$i(.24,.5,h)*.16,p=Yi[0]+(Jo[0]-Yi[0])*c,g=Yi[1]+(Jo[1]-Yi[1])*c,_=Yi[2]+(Jo[2]-Yi[2])*c,m=p+(Qo[0]-p)*u,d=g+(Qo[1]-g)*u,b=_+(Qo[2]-_)*u,x=Math.min(.3,f+o*$i(.38,.78,h)*.06);for(let v=0;v<3;v+=1){const E=vu[v]+(Nx[v]-vu[v])*c,A=E+(Fx[v]-E)*u,C=v===0?m:v===1?d:b,R=C+(A-C)*o,y=xu[v]+(Ox[v]-xu[v])*o;n.array[e*3+v]=R+(y-R)*x}}function Hx(n,e){return Math.min(1,Math.max(0,ro(n,e).intensity))}function $i(n,e,t){const i=Math.min(1,Math.max(0,(t-n)/(e-n)));return i*i*(3-2*i)}function Vx(n,e){const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function Gx(n,e){return(n%e+e)%e}const Mu=1.75,ui=1/120,Wx=.1,Su=12;function Xx(n,e={}){const t=e.reducedMotion??(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches),i=new ff;i.background=new qe(536381),i.fog=new gc(536381,540,800);const r=T_(),s=r.camera,o=new u_({antialias:!0,powerPreference:"high-performance"});o.setPixelRatio(Math.min(window.devicePixelRatio||1,Mu)),o.setClearColor(536381,1),o.outputColorSpace=$t,o.toneMapping=Du,o.toneMappingExposure=1.12,o.shadowMap.enabled=!1,o.domElement.setAttribute("aria-label","Animated isometric water field"),o.domElement.style.display="block",o.domElement.style.width="100%",o.domElement.style.height="100%",o.domElement.style.touchAction="none",n.appendChild(o.domElement);const a=Bx(i),l=m_(i,e.islands??[]),c=tx(i),u=hx(i),h=xx(i);let f=!!t;c.setReducedMotion(f),u.setReducedMotion(f),h.setReducedMotion(f);let p=!1,_=Kl(Ki.x,Ki.z),m={throttle:0,rudder:0,brake:!1},d=Vl();const b={worldLimit:Vt.worldLimit,obstacles:(e.islands??[]).map(q=>({x:q.position.x,z:q.position.z,radius:q.landCollisionRadius}))};let x=Zi({x:_.x,z:_.z,heading:_.heading}),v={status:"idle",islandId:null};const E=()=>{const q=li(x),w=m.brake||p,pe=fn(_,d.sailAngle,w?1:0),he=q?pe.suggestedAngle:d.sailAngle,_e=q?fn(_,he):pe,le=fn(_,pe.suggestedAngle).power;return{sailAngle:he,suggestedAngle:_e.suggestedAngle,signedSailAngle:_e.signedAngle,relativeWindAngle:_e.relativeWindAngle,power:_e.power,noGo:_e.noGo,windSpeed:cd(jr(),_.velocityX,_.velocityZ).speed,luffing:w,moored:p,assisted:q,trimMode:d.mode,trimEngaged:d.engaged,trimEfficiency:le>1e-6?na(_e.power/le,0,1):0,sweetSpot:!q&&!w&&!_e.noGo&&d.sweetSpot,trimBoost:q||w||_e.noGo?0:d.boost,boostSerial:d.boostSerial}},A=(q=!1)=>{const w=E();c.setSailLoad(w.power,w.relativeWindAngle),c.setSailAngle(w.signedSailAngle,q),e.onSailingUpdate?.(w)},C=(q,w,pe)=>{v=pe===void 0?{status:q,islandId:w}:{status:q,islandId:w,message:pe},e.onScanUpdate?.(v)},R=()=>{u.reset(),h.reset(),A(!0),c.resetPose(_,Q),r.snapTo(_.x,_.z),a.update(Q),e.onVesselUpdate?.(zs(_)),e.onLandmarkProjection?.(Bs(s,ea(n),ta(n),l.anchors,e.framingInsets)),o.render(i,s)},y=q=>{x=q,q.status==="arrived"&&(p=!0),_={x:q.x,z:q.z,velocityX:q.velocityX,velocityZ:q.velocityZ,heading:q.heading,yawRate:0}},S=q=>{const w=q.status==="active"?"travelling":q.status;C(w,q.islandId,q.reason??void 0)},P=q=>{li(x)&&(y(Ux(x,q)),S(x))},D=q=>{if(!li(x))return;const w=x.status;y(_u(x,q)),x.status!==w&&S(x)};i.add(new Ef(10999760,471872,1.65));const L=new dl(16769723,2.35);L.position.set(-55,80,42),i.add(L);const N=new dl(6209481,.48);N.position.set(75,42,-65),i.add(N);let O=!1,B=t,K=typeof document<"u"?document.hidden:!1,V=!0,te=null,F=0,Q=0,ie=0;const Ie=()=>B||K||!V,Ue=q=>{if(O)return;F||(F=q);const w=Math.min(Math.max(0,(q-F)/1e3),Wx);if(F=q,!Ie()){ie=Math.min(ie+w,ui*Su);let pe=0;for(;ie+1e-9>=ui&&pe<Su;)li(x)?D(ui):p||(d=Gl(d,_,{sheet:m.sheet??0,engage:m.targetHeading!==void 0||Math.abs(m.rudder)>1e-6,resumeAuto:!1,suppressed:m.brake},ui),_=W_(_,{...m,sailAngle:d.sailAngle,trimBoost:d.boost},ui,b,f?void 0:Q)),Q+=ui,ie=Math.max(0,ie-ui),pe+=1;r.update(_.x,_.z,w),A(),c.update(_,Q,w),u.setTrimBoost(li(x)||p?0:d.boost),u.update(_,Q,w),li(x)||p?h.reset():h.update(c.getWaterContact(),Q,w),e.onVesselUpdate?.(zs(_))}if(e.onLandmarkProjection?.(Bs(s,ea(n),ta(n),l.anchors,e.framingInsets)),a.update(Q),o.render(i,s),Ie()){te=null;return}te=window.requestAnimationFrame(Ue)},z=()=>{O||te!==null||(F=0,te=window.requestAnimationFrame(Ue))},se=()=>{te!==null&&(window.cancelAnimationFrame(te),te=null)},re=()=>{if(O)return;const q=Math.max(1,n.clientWidth||window.innerWidth),w=Math.max(1,n.clientHeight||window.innerHeight);r.resize(q,w),o.setPixelRatio(Math.min(window.devicePixelRatio||1,Mu)),o.setSize(q,w,!1),e.onLandmarkProjection?.(Bs(s,q,w,l.anchors,e.framingInsets)),Ie()&&o.render(i,s)},Ce=q=>{O||(q&&P("Scanner navigation paused."),B=q,Ie()?(se(),ie=0,F=0,m={throttle:0,rudder:0,brake:!1},d=Xn(d),u.setTrimBoost(0),h.reset(),o.render(i,s)):z(),e.onSailingUpdate?.(E()))},Ae=()=>{K=document.hidden,Ie()?(se(),ie=0,F=0,m={throttle:0,rudder:0,brake:!1},d=Xn(d),u.setTrimBoost(0),h.reset(),o.render(i,s)):z()},X=typeof IntersectionObserver<"u"?new IntersectionObserver(q=>{V=q[0]?.isIntersecting??!0,Ie()?(se(),ie=0,F=0,m={throttle:0,rudder:0,brake:!1},d=Xn(d),u.setTrimBoost(0),h.reset(),o.render(i,s)):z()},{threshold:.01}):null,ge=typeof ResizeObserver<"u"?new ResizeObserver(re):null;return re(),A(!0),c.resetPose(_,Q),r.snapTo(_.x,_.z),e.onVesselUpdate?.(zs(_)),e.onScanUpdate?.(v),ge?.observe(n),window.addEventListener("resize",re),X?.observe(n),document.addEventListener("visibilitychange",Ae),Ie()?o.render(i,s):z(),{setPaused:Ce,setReducedMotion:q=>{O||(f=q,c.setReducedMotion(q),u.setReducedMotion(q),h.setReducedMotion(q),Ie()&&o.render(i,s))},setInput:q=>{if(O)return;const w={throttle:0,sheet:na(q.sheet??0,-1,1),rudder:na(q.rudder,-1,1),brake:!!q.brake,targetHeading:Number.isFinite(q.targetHeading)?q.targetHeading:void 0};(w.targetHeading!==void 0||Math.abs(w.sheet)>1e-6||Math.abs(w.rudder)>1e-6||w.brake)&&(p=!1,P("Scanner navigation cancelled by helm input."),x.status==="arrived"&&(x=Zi({x:_.x,z:_.z,heading:_.heading}),S(x))),m=w,w.brake&&(d=Xn(d),u.setTrimBoost(0),h.reset()),e.onSailingUpdate?.(E())},setAutoTrim:()=>{O||Ie()||(m={throttle:0,rudder:0,brake:!1},p=!1,P("Scanner navigation cancelled by helm input."),x.status==="arrived"&&(x=Zi({x:_.x,z:_.z,heading:_.heading}),S(x)),d=Gl(Xn(d),_,{sheet:0,engage:!0,resumeAuto:!0,suppressed:!1},0),e.onSailingUpdate?.(E()))},resetVessel:()=>{O||(u.reset(),h.reset(),p=!1,_=Kl(Ki.x,Ki.z),x=Zi({x:_.x,z:_.z,heading:_.heading}),S(x),m={throttle:0,rudder:0,brake:!1},d=Xn(d),u.setTrimBoost(0),ie=0,F=0,Q=0,d=Vl(),A(!0),c.resetPose(_,Q),r.snapTo(_.x,_.z),a.update(Q),e.onVesselUpdate?.(zs(_)),e.onLandmarkProjection?.(Bs(s,ea(n),ta(n),l.anchors,e.framingInsets)),o.render(i,s))},getVesselState:()=>({..._}),getSailingState:E,startScan:(q,w={})=>{if(O)return;const pe=bx({x:_.x,z:_.z},q,e.islands??[],{worldLimit:Vt.worldLimit,vesselClearance:je.collisionRadius});if(!pe.ok){P("Scanner navigation replaced by an invalid route."),m={throttle:0,rudder:0,brake:!1},d=Xn(d),u.setTrimBoost(0),h.reset(),C("failed",q,pe.message);return}m={throttle:0,rudder:0,brake:!1},d=Xn(d),u.setTrimBoost(0),h.reset(),p=!1;const he=Zi({x:_.x,z:_.z,heading:_.heading});if(y(Dx(he,{islandId:q,route:pe.points})),!!w.instant||B){li(x)&&y(_u(x,x.duration)),ie=0,F=0,R(),S(x);return}S(x),z()},cancelScan:()=>{O||P("Scanner navigation cancelled.")},dispose:()=>{O||(O=!0,se(),ge?.disconnect(),window.removeEventListener("resize",re),X?.disconnect(),document.removeEventListener("visibilitychange",Ae),l.dispose(),c.dispose(),u.dispose(),h.dispose(),r.dispose(),a.dispose(),o.dispose(),o.domElement.remove(),i.clear())}}}function Bs(n,e,t,i,r){const s=qx(e,t,r);return i.map(({id:o,position:a})=>{const l=a.clone().project(n),c=(l.x*.5+.5)*e,u=(1-(l.y*.5+.5))*t;return{id:o,x:c,y:u,visible:l.z>=-1&&l.z<=1&&c>=s.left&&c<=e-s.right&&u>=s.top&&u<=t-s.bottom}})}function qx(n,e,t){const i=e<=460,r=n<=600?{top:140,right:20,bottom:68,left:20}:{top:160,right:28,bottom:70,left:28};return i&&(r.top=112),{top:Math.max(0,t?.top??r.top),right:Math.max(0,t?.right??r.right),bottom:Math.max(0,t?.bottom??r.bottom),left:Math.max(0,t?.left??r.left)}}function ea(n){return Math.max(1,n.clientWidth||window.innerWidth)}function ta(n){return Math.max(1,n.clientHeight||window.innerHeight)}function na(n,e,t){return Math.min(t,Math.max(e,Number.isFinite(n)?n:0))}function zs(n){return{x:n.x,z:n.z,heading:n.heading,speed:Math.hypot(n.velocityX,n.velocityZ)}}const yu={boost:0,serial:0,paused:!1,reducedMotion:!1},Yx=.75,Zx=.075,$x=.012,Kx=.05,jx=.16,Eu=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0,Jx=()=>{const n=globalThis;return typeof n.AudioContext=="function"?n.AudioContext:typeof n.webkitAudioContext=="function"?n.webkitAudioContext:null};function Qx(){let n=null,e=null,t=null,i=null,r=!1,s=!1,o=!1,a=!1,l=null,c=0,u=yu.serial,h=yu;const f=typeof document>"u"?null:document;a=!!f?.hidden;const p=()=>{a=!!f?.hidden,m()};f?.addEventListener("visibilitychange",p);const g=()=>{try{e?.stop()}catch{}try{e?.disconnect()}catch{}try{t?.disconnect()}catch{}try{i?.disconnect()}catch{}e=null,t=null,i=null},_=async()=>{const x=n;if(n=null,g(),!!x)try{await x.close()}catch{}},m=()=>{if(!n||!i||!t||r)return;const x=n.currentTime,v=Eu(h.boost),E=s&&!a&&!h.paused&&!h.reducedMotion&&v>0,A=x<c?1.35:1,C=E?Math.min(Zx,($x+Kx*v)*A):0,R=560+v*980;i.gain.cancelScheduledValues(x),i.gain.setTargetAtTime(C,x,C>0?.065:.035),t.frequency.cancelScheduledValues(x),t.frequency.setTargetAtTime(R,x,.09)},d=x=>{const v=Number.isFinite(x.sampleRate)&&x.sampleRate>0?x.sampleRate:44100,E=Math.max(2048,Math.min(32768,Math.round(v*Yx))),A=x.createBuffer(1,E,v),C=A.getChannelData(0);let R=99539473;for(let D=0;D<C.length;D+=1)R=Math.imul(R,1664525)+1013904223>>>0,C[D]=R/4294967295*2-1;const y=x.createBufferSource();e=y,y.buffer=A,y.loop=!0;const S=x.createBiquadFilter();t=S,S.type="lowpass",S.frequency.value=560,S.Q.value=.45;const P=x.createGain();i=P,P.gain.value=0,y.connect(S),S.connect(P),P.connect(x.destination);try{y.start()}catch(D){throw g(),D}},b=async()=>{if(r)return!1;const x=Jx();if(!x)return!1;try{return n||(n=new x,d(n)),n.state==="suspended"&&await n.resume(),r||!o?(await _(),!1):(s=!0,m(),!0)}catch{return s=!1,await _(),!1}};return{setEnabled:x=>r?Promise.resolve(!1):x?(o=!0,l||(l=b().finally(()=>{l=null}),l)):(o=!1,s=!1,m(),Promise.resolve(!0)),update:x=>{if(r)return;const v=Eu(x.boost),E=Number.isFinite(x.serial)?x.serial:0;h={boost:v,serial:E,paused:!!x.paused,reducedMotion:!!x.reducedMotion},E!==u&&v>0&&!h.paused&&!h.reducedMotion&&(c=(n?.currentTime??0)+jx),u=E,m()},dispose:()=>{r||(r=!0,o=!1,s=!1,f?.removeEventListener("visibilitychange",p),_())}}}const xd=document.querySelector("#app");if(!xd)throw new Error("The app mount point is missing.");const Ti=window.matchMedia("(prefers-reduced-motion: reduce)");let Gt=Ti.matches;const Mr=Qx();let Mi=!1,or=!0,ia=0;xd.innerHTML=`
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
      <span>Coral boom shows sail trim.</span>
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
`;const vd=document.querySelector("[data-scene-layer]"),bc=document.querySelector("[data-landmark-layer]"),mr=document.querySelector("[data-motion-toggle]"),so=document.querySelector("[data-vessel-controls]"),_n=document.querySelector("[data-sailing-hud]"),$a=document.querySelector("[data-wind-marker]"),Ka=document.querySelector("[data-wind-direction]"),ja=document.querySelector("[data-wind-speed]"),Ja=document.querySelector("[data-sail-angle]"),Qa=document.querySelector("[data-suggested-trim]"),ec=document.querySelector("[data-trim-mode]"),tc=document.querySelector("[data-trim-meter]"),nc=document.querySelector("[data-trim-efficiency]"),ic=document.querySelector("[data-trim-sweetspot]"),Un=document.querySelector("[data-sound-toggle]"),kt=document.querySelector("[data-sailing-guidance]"),bu=document.querySelector(".vessel-model-note"),Md=document.querySelector("[data-webgl-fallback]"),Sd=document.querySelector("[data-island-summary]"),yd=document.querySelector(".portfolio-shell");if(!vd||!bc||!mr||!so||!_n||!$a||!Ka||!ja||!Ja||!Qa||!ec||!tc||!nc||!ic||!Un||!kt||!Md||!Sd||!yd)throw new Error("The portfolio shell is incomplete.");zd(qr,Ru);let Dt,Tu=null;const Js=Kd({root:yd,islands:qr,content:Ru,onScanRequest:n=>{Bn.releaseAll(),Dt?.startScan(n,{instant:Gt||Ti.matches})},onExploreRequest:()=>{Bn.releaseAll()}}),Ed=new Map,Tc=new Map,bt={width:window.innerWidth,height:window.innerHeight};let tr=_n.getBoundingClientRect();const bd=typeof ResizeObserver<"u"?new ResizeObserver(()=>{tr=_n.getBoundingClientRect()}):null;bd?.observe(_n);const Td=typeof ResizeObserver<"u"?new ResizeObserver(n=>{for(const e of n){const i=e.target.dataset.landmarkId;if(!i)continue;const r=Array.isArray(e.borderBoxSize)?e.borderBoxSize[0]:e.borderBoxSize,s=r?.inlineSize??e.contentRect.width,o=r?.blockSize??e.contentRect.height;s<=0||o<=0||Tc.set(i,{width:s,height:o})}}):null;for(const[n,e]of qr.entries()){const t=document.createElement("div");t.className="landmark-label",t.dataset.landmarkId=e.id,t.setAttribute("role","listitem"),t.innerHTML=`
    <span class="landmark-label__name"></span>
    <span class="landmark-label__category"></span>
  `;const i=t.querySelector(".landmark-label__name"),r=t.querySelector(".landmark-label__category");if(!i||!r)throw new Error("The landmark label is incomplete.");i.textContent=e.name,r.textContent=`${wu(e.category)} · ${String(n+1).padStart(2,"0")}`,bc.append(t),Ed.set(e.id,t),Tc.set(e.id,{width:120,height:40}),Td?.observe(t);const s=document.createElement("li");s.textContent=`${e.name} — ${wu(e.category)}`,Sd.append(s)}const Ac=()=>{mr.textContent=Gt?"Resume motion":"Pause motion",mr.setAttribute("aria-pressed",String(Gt)),so.setAttribute("aria-disabled",String(!Dt))};function ev(n){if(!$a||!Ka||!ja||!Ja||!Qa||!ec||!tc||!nc||!ic||!_n||!kt)return;const e=s=>Math.round(Math.abs(s)*180/Math.PI),t=14,i=-Math.sin(n.relativeWindAngle)*t,r=-Math.cos(n.relativeWindAngle)*t;$a.style.transform=`translate(calc(-50% + ${i}px), calc(-50% + ${r}px))`,Ka.textContent=Au(n.relativeWindAngle),ja.textContent=`${n.windSpeed.toFixed(0)} m/s`,_n.setAttribute("aria-label",`Wind from ${Au(n.relativeWindAngle)}, ${n.windSpeed.toFixed(0)} metres per second. Sail angle ${e(n.sailAngle)} degrees; suggested ${e(n.suggestedAngle)} degrees.`),Ja.textContent=`${e(n.sailAngle)}°`,Qa.textContent=`${e(n.suggestedAngle)}°`,ec.textContent=n.trimMode==="manual"?"Manual":"Auto",tc.style.width=`${Math.round(Math.max(0,Math.min(1,n.trimEfficiency))*100)}%`,nc.textContent=`${Math.round(n.trimEfficiency*100)}%`,ic.textContent=n.sweetSpot?" · Sweet spot":"",_n.toggleAttribute("data-manual-trim",n.trimMode==="manual"),Mr.update({boost:n.trimBoost,serial:n.boostSerial,paused:Gt,reducedMotion:Ti.matches}),_n.toggleAttribute("data-no-go",n.noGo),_n.toggleAttribute("data-luffing",n.luffing),n.assisted?kt.textContent="Assisted passage: steer when you are ready to take the helm.":n.moored?kt.textContent="Moored. Trim or steer to set sail.":n.luffing?kt.textContent="Wind spilled. Release to catch the wind.":n.noGo?kt.textContent="Into the wind. Turn left or right to tack.":n.trimMode==="auto"&&!n.trimEngaged?kt.textContent="Auto trim ready. WASD or arrows to set sail.":n.trimMode==="auto"?kt.textContent=`Auto trim ${Math.round(n.trimEfficiency*100)}% · Q/E for manual trim.`:n.trimBoost>.05?kt.textContent="Sweet spot · speed surge!":n.sailAngle>n.suggestedAngle+.1?kt.textContent="Trim in toward the suggested angle for more drive.":n.sailAngle<n.suggestedAngle-.1?kt.textContent="Ease out toward the suggested angle for more drive.":n.power<.08?kt.textContent="Turn across the wind to fill the sail.":n.sweetSpot?kt.textContent="Sweet spot. Sail diagonally and tack to travel upwind.":kt.textContent="Manual trim. Q/E adjusts the sail; M returns to auto."}function Au(n){const e=(n*180/Math.PI+360)%360;return e<22.5||e>=337.5?"ahead":e<67.5?"port bow":e<112.5?"port":e<157.5?"port quarter":e<202.5?"astern":e<247.5?"starboard quarter":e<292.5?"starboard":"starboard bow"}const Bn=new Wd({root:so,onInput:n=>{Dt?.setInput(n)},onReset:()=>{Dt?.resetVessel(),Js.closeDrawer(!1),Mr.update({boost:0,serial:0,paused:Gt,reducedMotion:Ti.matches})},onAutoTrim:()=>Dt?.setAutoTrim()}),rc=()=>{Un&&(Un.textContent=or?Mi?"♪ Sound on":"♪ Sound off":"♪ Sound unavailable",Un.setAttribute("aria-pressed",String(Mi)),Un.setAttribute("aria-label",or?Mi?"Sound on":"Sound off":"Sound unavailable"),Un.disabled=!or)},Ad=async()=>{if(!Un||!or)return;const n=++ia,e=!Mi;Mi=e,rc();try{const t=await Mr.setEnabled(e);if(n!==ia)return;Mi=e&&t,or=t||!e}catch{if(n!==ia)return;or=!1,Mi=!1}rc()};Un?.addEventListener("click",Ad);const tv=n=>{for(const[e,t]of Ed){const i=n.find(r=>r.id===e);if(!i||!i.visible||!nv(i,Tc.get(e))){t.hidden=!0;continue}t.hidden=!1,t.style.transform=`translate3d(${i.x}px, ${i.y}px, 0) translate(-50%, 8px)`}};function nv(n,e){const t=e?.width??120,i=e?.height??40,r=n.x-t*.5,s=n.y+8,o=r+t,a=s+i,l=Math.min(48,Math.max(16,bt.width*.04));if(r<tr.right+6&&o>tr.left-6&&s<tr.bottom+6&&a>tr.top-6)return!1;const c=bt.height<=460?110:bt.width<=900?200:160,u=bt.height<=460?105:155,h=bt.width<=540?l:Math.max(l,bt.width-l-Math.min(480,bt.width-l*2));if(r<l||o>bt.width-l||s<c||a>bt.height-u)return!1;const f=32,p=bt.width*.5-f,g=bt.height*.5-f,_=bt.width*.5+f,m=bt.height*.5+f;if(r<_&&o>p&&s<m&&a>g)return!1;const b=bt.height-u;return!(r<bt.width-l&&o>h&&s<bt.height&&a>b)}const wd=()=>{bt.width=window.innerWidth,bt.height=window.innerHeight,tr=_n.getBoundingClientRect()};window.addEventListener("resize",wd);try{Dt=Xx(vd,{reducedMotion:Ti.matches,islands:qr,framingInsets:{top:145,right:20,bottom:155,left:20},onLandmarkProjection:tv,onVesselUpdate:n=>{const e=$d({x:n.x,z:n.z},qr,Tu);Tu=e?.id??null,Js.setProximity(e)},onSailingUpdate:ev,onScanUpdate:n=>Js.setScanUpdate(n)}),Dt.setPaused(Gt),Bn.setEnabled(!Gt,!!Dt)}catch(n){console.warn("Unable to initialise the water scene.",n),bc.hidden=!0,Md.classList.remove("is-hidden"),mr.disabled=!0,Bn.setEnabled(!1,!1),so.hidden=!0,bu&&(bu.hidden=!0)}const iv=()=>{Gt=!Gt,Bn.setEnabled(!Gt&&!!Dt,!!Dt),Dt?.setPaused(Gt),Mr.update({boost:0,serial:0,paused:Gt,reducedMotion:Ti.matches}),Ac()};mr.addEventListener("click",iv);const rv=n=>{if(n.key.toLowerCase()==="p"&&n.target===document.body){mr.click();return}if(n.key.toLowerCase()!=="f"||n.repeat||n.altKey||n.ctrlKey||n.metaKey||n.target instanceof Element&&n.target.closest(".content-drawer, input, textarea, select, [contenteditable]"))return;const e=document.querySelector("[data-explore-action]");!document.querySelector(".content-drawer:not([hidden])")&&e&&!e.closest("[hidden]")&&(n.preventDefault(),e.click())};window.addEventListener("keydown",rv);const sv=n=>{Dt?.setReducedMotion(n.matches),n.matches&&(Gt=!0,Bn.setEnabled(!1,!!Dt),Dt?.setPaused(!0),Mr.update({boost:0,serial:0,paused:!0,reducedMotion:!0}),Ac())};Ti.addEventListener("change",sv);const ov=n=>{Bn.releaseAll(),n.persisted||(Bn.dispose(),Dt?.dispose(),Js.dispose(),Mr.dispose(),Un?.removeEventListener("click",Ad),Td?.disconnect(),bd?.disconnect(),window.removeEventListener("resize",wd))};window.addEventListener("pagehide",ov);const av=()=>{Dt&&Bn.setEnabled(!Gt,!0)};window.addEventListener("pageshow",av);function wu(n){return n.charAt(0).toUpperCase()+n.slice(1)}Ac();rc();
