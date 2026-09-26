(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const lu={resume:[{id:"resume-01",role:"Creative technologist",organisation:"Independent practice",period:"2024 — present",summary:"Placeholder for a role, practice, or collaboration."}],projects:[{id:"project-01",title:"A small digital shoreline",summary:"Placeholder for a project log and its short field note.",year:2025,link:"#"}],writing:[{id:"writing-01",title:"Notes from the weather line",publication:"Personal notebook",year:2025,excerpt:"Placeholder for a writing sample excerpt.",link:"#"}],media:[{id:"media-01",label:"Portfolio media placeholder",url:"#",kind:"image"}]},Ks=180,Gi={x:0,z:0},uu=["resume","projects","writing","media"],du=["ridge","mesa","mound","twin-peaks"],hd=/^#[0-9a-f]{6}$/i,Or=[{id:"island-resume",name:"Chartroom",category:"resume",position:{x:-26,z:-18},landCollisionRadius:7,dockingTriggerRadius:11,landform:"ridge",palette:{sand:"#d8c28d",land:"#7e9a73",rock:"#465d5d"},contentIds:["resume-01"],description:"A quiet chartroom for the route so far and the work behind it."},{id:"island-projects",name:"Shipyard",category:"projects",position:{x:16,z:-24},landCollisionRadius:6,dockingTriggerRadius:10,landform:"mesa",palette:{sand:"#d8b878",land:"#b86f4c",rock:"#704b44"},contentIds:["project-01"],description:"A working shipyard for experiments, builds, and field notes."},{id:"island-writing",name:"Logbook",category:"writing",position:{x:-18,z:26},landCollisionRadius:8,dockingTriggerRadius:12,landform:"twin-peaks",palette:{sand:"#dfcfaa",land:"#8e806f",rock:"#555968"},contentIds:["writing-01"],description:"A windward logbook for essays, observations, and unfinished thoughts."},{id:"island-media",name:"Signal Cove",category:"media",position:{x:24,z:20},landCollisionRadius:7,dockingTriggerRadius:11,landform:"mound",palette:{sand:"#cbbd98",land:"#5d8c87",rock:"#3f5964"},contentIds:["media-01"],description:"A sheltered cove for images, moving pictures, and sound."}];function Lr(n){return typeof n=="object"&&n!==null}function fd(n){return Lr(n)}function pd(n){return Lr(n)&&typeof n.id=="string"&&n.id.length>0}function md(n){return typeof n=="string"&&uu.includes(n)}function gd(n){return typeof n=="string"&&du.includes(n)}function Zr(n){return typeof n=="number"&&Number.isFinite(n)}function _t(n,e){throw new Error(`Invalid island at index ${n}: ${e}`)}function _d(n,e){if(!Array.isArray(n))throw new Error("Invalid island definitions: expected an array");if(!Lr(e))throw new Error("Invalid portfolio content: expected an object");const t=new Set,i=[];n.forEach((r,s)=>{fd(r)||_t(s,"expected an object"),(typeof r.id!="string"||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id))&&_t(s,"id must be a stable non-empty kebab-case string"),t.has(r.id)&&_t(s,`duplicate id "${r.id}"`),t.add(r.id),(typeof r.name!="string"||r.name.trim().length===0)&&_t(s,"name must be a non-empty string"),md(r.category)||_t(s,`category must be one of ${uu.join(", ")}`),gd(r.landform)||_t(s,`landform must be one of ${du.join(", ")}`),(!Lr(r.position)||!Zr(r.position.x)||!Zr(r.position.z))&&_t(s,"position.x and position.z must be finite numbers"),(!Zr(r.landCollisionRadius)||r.landCollisionRadius<=0)&&_t(s,"landCollisionRadius must be a finite positive number"),(!Zr(r.dockingTriggerRadius)||r.dockingTriggerRadius<=0)&&_t(s,"dockingTriggerRadius must be a finite positive number"),(Math.abs(r.position.x)+r.dockingTriggerRadius>Ks||Math.abs(r.position.z)+r.dockingTriggerRadius>Ks)&&_t(s,`docking zone must remain within ±${Ks} world units`),r.landCollisionRadius>=r.dockingTriggerRadius&&_t(s,"dockingTriggerRadius must be greater than landCollisionRadius"),Lr(r.palette)||_t(s,"palette must contain sand, land, and rock colors");for(const u of["sand","land","rock"])(typeof r.palette[u]!="string"||!hd.test(r.palette[u]))&&_t(s,`palette.${u} must be a six-digit hex color`);(!Array.isArray(r.contentIds)||r.contentIds.length===0)&&_t(s,"contentIds must contain at least one content ID"),(typeof r.description!="string"||r.description.trim().length===0)&&_t(s,"description must be a non-empty string");const o=e[r.category];Array.isArray(o)||_t(s,`portfolio content category "${r.category}" must be an array`);const a=new Set;o.forEach((u,d)=>{if(!pd(u))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: id must be a non-empty string`);if(a.has(u.id))throw new Error(`Invalid portfolio content at ${r.category}[${d}]: duplicate id "${u.id}"`);a.add(u.id)});const l=new Set;r.contentIds.forEach(u=>{(typeof u!="string"||u.length===0)&&_t(s,"contentIds must contain non-empty strings"),l.has(u)&&_t(s,`duplicate content ID "${u}"`),a.has(u)||_t(s,`content ID "${u}" is missing from category "${r.category}"`),l.add(u)}),i.push({index:s,island:r}),Math.hypot(r.position.x-Gi.x,r.position.z-Gi.z)<=r.dockingTriggerRadius&&_t(s,"docking zone must leave the vessel spawn point clear")});for(let r=0;r<i.length;r+=1)for(let s=r+1;s<i.length;s+=1){const o=i[r],a=i[s];if(Math.hypot(o.island.position.x-a.island.position.x,o.island.position.z-a.island.position.z)<=o.island.dockingTriggerRadius+a.island.dockingTriggerRadius)throw new Error(`Invalid island definitions: docking zones overlap for "${o.island.id}" and "${a.island.id}"`)}}const vd=["up","down","trimIn","trimOut","left","right","brake"],xd=new Map([["w","up"],["arrowup","up"],["s","down"],["arrowdown","down"],["a","left"],["arrowleft","left"],["d","right"],["arrowright","right"],["q","trimIn"],["e","trimOut"],[" ","brake"]]),Md={throttle:0,sheet:0,rudder:0,brake:!1};function Sd(n){const e=new Set(n),t=Number(e.has("right"))-Number(e.has("left")),i=Number(e.has("down"))-Number(e.has("up")),r=t||i?Math.atan2(t+i,i-t):void 0;return{throttle:0,sheet:e.has("trimIn")===e.has("trimOut")?0:e.has("trimIn")?-1:1,rudder:0,brake:e.has("brake"),...r===void 0?{}:{targetHeading:r}}}class yd{root;onInput;onReset;onAutoTrim;buttons=new Map;resetButton;autoTrimButton;pressedKeys=new Map;pressedButtons=new Map;pointers=new Map;buttonHandlers=[];enabled=!0;resetEnabled=!0;disposed=!1;resetHeld=!1;lastInput={...Md};constructor(e){this.root=e.root,this.onInput=e.onInput,this.onReset=e.onReset,this.onAutoTrim=e.onAutoTrim;for(const r of vd){const s=Array.from(this.root.querySelectorAll(`[data-vessel-control="${r}"]`));this.buttons.set(r,s);for(const o of s)this.bindButton(o,r)}this.root.addEventListener("pointerdown",this.onPointerDown),this.root.addEventListener("pointerup",this.onPointerUp),this.root.addEventListener("pointercancel",this.onPointerCancel),this.root.addEventListener("lostpointercapture",this.onLostPointerCapture),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),window.addEventListener("pagehide",this.onPageHide),document.addEventListener("visibilitychange",this.onVisibilityChange);const t=this.root.querySelector("[data-vessel-reset]");if(this.resetButton=t??void 0,t&&this.onReset){const r=()=>{this.releaseAll(),this.onReset?.()};t.addEventListener("click",r),this.buttonHandlers.push({button:t,type:"click",handler:r})}const i=this.root.querySelector("[data-vessel-auto-trim]");if(this.autoTrimButton=i??void 0,i&&this.onAutoTrim){const r=()=>{this.releaseAll(),this.onAutoTrim?.()};i.addEventListener("click",r),this.buttonHandlers.push({button:i,type:"click",handler:r})}this.emitIfChanged()}setEnabled(e,t=e){if(!this.disposed){this.enabled=e,this.resetEnabled=t,this.releaseAll();for(const i of this.buttons.values())for(const r of i)r.disabled=!e,r.setAttribute("aria-disabled",String(!e));this.resetButton&&(this.resetButton.disabled=!t,this.resetButton.setAttribute("aria-disabled",String(!t))),this.autoTrimButton&&(this.autoTrimButton.disabled=!e,this.autoTrimButton.setAttribute("aria-disabled",String(!e))),this.root.toggleAttribute("data-controls-disabled",!e)}}releaseAll(){this.pressedKeys.clear(),this.pressedButtons.clear(),this.resetHeld=!1;for(const{pointerId:e,button:t}of this.pointers.values())try{t.releasePointerCapture?.(e)}catch{}this.pointers.clear(),this.emitIfChanged(!0)}dispose(){if(!this.disposed){this.disposed=!0,this.releaseAll(),this.root.removeEventListener("pointerdown",this.onPointerDown),this.root.removeEventListener("pointerup",this.onPointerUp),this.root.removeEventListener("pointercancel",this.onPointerCancel),this.root.removeEventListener("lostpointercapture",this.onLostPointerCapture),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),window.removeEventListener("pagehide",this.onPageHide),document.removeEventListener("visibilitychange",this.onVisibilityChange);for(const{button:e,type:t,handler:i}of this.buttonHandlers)e.removeEventListener(t,i);this.buttonHandlers.length=0}}bindButton=(e,t)=>{e.dataset.vesselControl=t,e.addEventListener("keydown",this.onButtonKeyDown),e.addEventListener("keyup",this.onButtonKeyUp),e.addEventListener("focusout",this.onButtonFocusOut),this.buttonHandlers.push({button:e,type:"keydown",handler:this.onButtonKeyDown},{button:e,type:"keyup",handler:this.onButtonKeyUp},{button:e,type:"focusout",handler:this.onButtonFocusOut})};onButtonKeyDown=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||this.enabled&&(e.preventDefault(),this.pressedButtons.set(t,i),this.emitIfChanged())};onButtonKeyUp=e=>{if(!(e instanceof KeyboardEvent))return;const t=e.currentTarget,i=t?.dataset.vesselControl;!t||!i||e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.pressedButtons.delete(t),this.emitIfChanged())};onButtonFocusOut=e=>{const t=e.currentTarget;!t||!this.pressedButtons.delete(t)||this.emitIfChanged()};onPointerDown=e=>{if(!this.enabled||this.disposed||e.pointerType==="mouse"&&e.button!==0)return;const t=e.target instanceof Element?e.target.closest("[data-vessel-control]"):null,i=t?.dataset.vesselControl;!t||!i||t.disabled||(e.preventDefault(),this.pointers.set(e.pointerId,{pointerId:e.pointerId,control:i,button:t}),t.setPointerCapture?.(e.pointerId),this.emitIfChanged())};onPointerUp=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onPointerCancel=e=>{this.pointers.delete(e.pointerId)&&(e.preventDefault(),this.emitIfChanged())};onLostPointerCapture=e=>{const t=e.pointerId;!Number.isFinite(t)||!this.pointers.delete(t)||this.emitIfChanged()};onKeyDown=e=>{if(this.disposed||Ed(e.target)||bd(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;const t=yc(e.key);if(e.target instanceof HTMLElement&&e.target.matches("button, a")&&(t===" "||t==="enter"))return;if(t==="r"){if(!this.resetEnabled||this.resetHeld)return;e.preventDefault(),this.releaseAll(),this.resetHeld=!0,this.onReset?.();return}if(!this.enabled)return;if(t==="m"){if(e.repeat)return;e.preventDefault(),this.releaseAll(),this.onAutoTrim?.();return}const i=xd.get(t);i&&(e.preventDefault(),!this.pressedKeys.has(t)&&(this.pressedKeys.set(t,i),this.emitIfChanged()))};onKeyUp=e=>{const t=yc(e.key);if(t==="r"){this.resetHeld=!1;return}this.pressedKeys.delete(t)&&(e.preventDefault(),this.emitIfChanged())};onBlur=()=>this.releaseAll();onPageHide=()=>this.releaseAll();onVisibilityChange=()=>{document.hidden&&this.releaseAll()};emitIfChanged(e=!1){const t=this.getInput();!e&&Td(t,this.lastInput)||(this.lastInput=t,this.onInput({...t}))}getInput(){const e=new Set(this.pressedKeys.values());for(const i of this.pressedButtons.values())e.add(i);for(const{control:i}of this.pointers.values())e.add(i);const t=Sd(e);for(const[i,r]of this.buttons){const s=e.has(i);for(const o of r)o.dataset.active=String(s),o.setAttribute("aria-pressed",String(s))}return t}}function yc(n){return n.length===1,n.toLowerCase()}function Ed(n){return n instanceof HTMLElement?n.isContentEditable||!!n.closest("input, select, textarea"):!1}function bd(n){return n instanceof Element&&!!n.closest(".content-drawer")}function Td(n,e){return n.throttle===e.throttle&&n.sheet===e.sheet&&n.rudder===e.rudder&&n.brake===e.brake&&n.sailAngle===e.sailAngle&&n.targetHeading===e.targetHeading}const Ad=1.25;function gr(n){return typeof n=="number"&&Number.isFinite(n)}function Ec(n,e){return Math.hypot(n.x-e.position.x,n.z-e.position.z)}function wd(n,e,t){if(!gr(n?.x)||!gr(n?.z))return null;if(t){const s=e.find(o=>o.id===t);if(s&&Ec(n,s)<=s.dockingTriggerRadius+Ad)return s}let i=null,r=Number.POSITIVE_INFINITY;for(const s of e){if(!gr(s.position.x)||!gr(s.position.z)||!gr(s.dockingTriggerRadius))continue;const o=Ec(n,s);o<=s.dockingTriggerRadius&&o<r&&(i=s,r=o)}return i}const js={resume:"Resume",projects:"Projects",writing:"Writing",media:"Media"};function Rd(n){const{root:e,islands:t,content:i}=n,r=new Map(t.map(G=>[G.id,G])),s=document.createElement("nav");s.className="scanner-hud",s.setAttribute("aria-label","Portfolio scanner");const o=document.createElement("p");o.className="scanner-hud__label",o.textContent="Scan by category",s.append(o);const a=document.createElement("div");a.className="scanner-hud__links",a.setAttribute("role","list");for(const G of t){const ae=document.createElement("div");ae.setAttribute("role","listitem");const fe=document.createElement("button");fe.type="button",fe.className="scanner-hud__link",fe.dataset.scannerIsland=G.id,fe.setAttribute("aria-label",`Scan ${G.name}, ${js[G.category]}`),fe.setAttribute("aria-expanded","false"),fe.setAttribute("aria-controls","portfolio-content-drawer");const He=document.createElement("span");He.className="scanner-hud__number",He.setAttribute("aria-hidden","true"),He.textContent=String(a.children.length+1).padStart(2,"0");const Ue=document.createElement("span");Ue.className="scanner-hud__link-label",Ue.textContent=js[G.category];const W=document.createElement("span");W.className="scanner-hud__link-name",W.textContent=G.name,fe.append(He,Ue,W),fe.addEventListener("click",S),ae.append(fe),a.append(ae)}s.append(a);const l=document.createElement("p");l.className="scanner-hud__status",l.setAttribute("role","status"),l.setAttribute("aria-live","polite"),l.setAttribute("aria-atomic","true"),l.textContent="Under way · choose a category to scan",s.append(l);const c=document.createElement("p");c.className="visually-hidden",c.setAttribute("role","status"),c.setAttribute("aria-live","polite"),c.setAttribute("aria-atomic","true"),s.append(c);const u=document.createElement("section");u.className="explore-prompt",u.hidden=!0,u.setAttribute("aria-label","Nearby island");const d=document.createElement("p");d.className="explore-prompt__kicker",d.textContent="Within range";const h=document.createElement("p");h.className="explore-prompt__text";const m=document.createElement("button");m.type="button",m.dataset.exploreAction="true",m.className="explore-prompt__button",m.textContent="Explore island",m.addEventListener("click",y),u.append(d,h,m);const g=document.createElement("aside");g.className="content-drawer",g.id="portfolio-content-drawer",g.hidden=!0,g.setAttribute("aria-label","Portfolio content"),g.setAttribute("aria-live","off");const _=document.createElement("div");_.className="content-drawer__header";const p=document.createElement("button");p.type="button",p.className="content-drawer__close",p.setAttribute("aria-label","Close portfolio drawer"),p.textContent="Close";const f=()=>L(!0);p.addEventListener("click",f);const E=document.createElement("h2");E.className="content-drawer__title",E.tabIndex=-1,E.id="portfolio-drawer-heading",_.append(E,p);const x=document.createElement("div");x.className="content-drawer__body",x.tabIndex=0,x.setAttribute("role","region"),x.setAttribute("aria-labelledby",E.id),g.setAttribute("aria-labelledby",E.id),g.append(_,x),e.append(s,u,g);let v=null,T=null,w=l.textContent??"",R=!1,C=0;function S(G){const ae=G.currentTarget;if(!(ae instanceof HTMLButtonElement))return;const fe=ae.dataset.scannerIsland;!fe||!r.has(fe)||(N(fe,ae),n.onScanRequest(fe))}function y(){v&&(N(v.id,m),n.onExploreRequest(v.id))}function I(G){G.key!=="Escape"||g.hidden||L(!0)}function N(G,ae=null){const fe=r.get(G);if(!fe||R)return;T=ae??V(G),E.textContent=fe.name,x.replaceChildren(Cd(fe,i)),x.scrollTop=0,g.hidden=!1,e.classList.add("is-reading"),u.hidden=!0;for(const Ue of s.querySelectorAll("[data-scanner-island]")){const W=Ue.dataset.scannerIsland===G;Ue.setAttribute("aria-expanded",String(W)),Ue.dataset.selected=String(W)}const He=++C;requestAnimationFrame(()=>{!g.hidden&&He===C&&E.focus({preventScroll:!0})})}function L(G=!0){if(g.hidden)return;const ae=J();C+=1,g.hidden=!0,e.classList.remove("is-reading"),u.hidden=!v;for(const He of s.querySelectorAll("[data-scanner-island]"))He.setAttribute("aria-expanded","false"),He.dataset.selected="false";const fe=T&&document.contains(T)&&Pd(T)?T:ae;G&&fe&&fe.focus({preventScroll:!0}),T=null}function F(G){v?.id!==G?.id&&(v=G,u.hidden=!G||!g.hidden,c.textContent=G?`Docking range: ${G.name}. Explore prompt available.`:"Outside all docking zones.",G&&(h.textContent=`${G.name} · ${js[G.category]}`,m.setAttribute("aria-label",`Explore ${G.name}`)))}function q(G){if(R)return;const ae=G.status==="travelling"?`Assisted passage to ${r.get(G.islandId??"")?.name??"island"}`:G.status==="arrived"?`Arrived at ${r.get(G.islandId??"")?.name??"island"}`:G.status==="cancelled"?"Scanner cancelled · steer manually":G.status==="failed"?"Scanner route unavailable · steer manually":"Under way · choose a category to scan",fe=G.message??ae;fe!==w&&(w=fe,l.textContent=fe)}function V(G){return s.querySelector(`[data-scanner-island="${CSS.escape(G)}"]`)}function J(){return D()?V(D()):null}function D(){return Array.from(s.querySelectorAll("[data-scanner-island]")).find(G=>G.dataset.selected==="true")?.dataset.scannerIsland??null}function Q(){if(!R){R=!0,C+=1,e.classList.remove("is-reading"),window.removeEventListener("keydown",I);for(const G of s.querySelectorAll("[data-scanner-island]"))G.removeEventListener("click",S);m.removeEventListener("click",y),p.removeEventListener("click",f),s.remove(),u.remove(),g.remove()}}return window.addEventListener("keydown",I),{nav:s,drawer:g,setProximity:F,setScanUpdate:q,openIsland:N,closeDrawer:L,dispose:Q}}function Cd(n,e){const t=document.createDocumentFragment(),i=document.createElement("p");i.className="content-drawer__description",i.textContent=n.description,t.append(i);const r=n.category;if(r==="resume")for(const s of e.resume.filter(o=>n.contentIds.includes(o.id))){const o=$r();Kr(o,s.role),jr(o,`${s.organisation} · ${s.period}`),Js(o,s.summary),t.append(o)}else if(r==="projects")for(const s of e.projects.filter(o=>n.contentIds.includes(o.id))){const o=$r();Kr(o,s.title),jr(o,String(s.year)),Js(o,s.summary),Qs(o,s.link),t.append(o)}else if(r==="writing")for(const s of e.writing.filter(o=>n.contentIds.includes(o.id))){const o=$r();Kr(o,s.title),jr(o,`${s.publication} · ${s.year}`),Js(o,s.excerpt),Qs(o,s.link),t.append(o)}else for(const s of e.media.filter(o=>n.contentIds.includes(o.id))){const o=$r();Kr(o,s.label),jr(o,s.kind),Qs(o,s.url),t.append(o)}return t}function $r(){const n=document.createElement("article");return n.className="content-card",n}function Kr(n,e){const t=document.createElement("h3");t.textContent=e,n.append(t)}function jr(n,e){const t=document.createElement("p");t.className="content-card__meta",t.textContent=e,n.append(t)}function Js(n,e){const t=document.createElement("p");t.textContent=e,n.append(t)}function Qs(n,e){if(!e||e==="#"){const i=document.createElement("p");i.className="content-card__placeholder",i.textContent="Link unavailable in placeholder data.",n.append(i);return}const t=document.createElement("a");t.href=e,t.target="_blank",t.rel="noreferrer",t.textContent="Open related material",n.append(t)}function Pd(n){if(n.hidden||n.closest("[hidden]"))return!1;const e=window.getComputedStyle(n);return e.display!=="none"&&e.visibility!=="hidden"}const Ya="179",Id=0,bc=1,Ld=2,hu=1,Dd=2,An=3,Yn=0,Ht=1,Pt=2,Xn=0,Ki=1,Tc=2,Ac=3,wc=4,Ud=5,ai=100,Nd=101,Fd=102,Od=103,Bd=104,zd=200,kd=201,Hd=202,Vd=203,qo=204,Yo=205,Gd=206,Wd=207,Xd=208,qd=209,Yd=210,Zd=211,$d=212,Kd=213,jd=214,Zo=0,$o=1,Ko=2,tr=3,jo=4,Jo=5,Qo=6,ea=7,fu=0,Jd=1,Qd=2,qn=0,eh=1,th=2,nh=3,pu=4,ih=5,rh=6,sh=7,mu=300,nr=301,ir=302,ta=303,na=304,Vs=306,ia=1e3,li=1001,ra=1002,Yt=1003,oh=1004,Jr=1005,fn=1006,eo=1007,ui=1008,gn=1009,gu=1010,_u=1011,Br=1012,Za=1013,gi=1014,pn=1015,Gr=1016,$a=1017,Ka=1018,zr=1020,vu=35902,xu=1021,Mu=1022,on=1023,kr=1026,Hr=1027,ja=1028,Ja=1029,Su=1030,Qa=1031,ec=1033,Cs=33776,Ps=33777,Is=33778,Ls=33779,sa=35840,oa=35841,aa=35842,ca=35843,la=36196,ua=37492,da=37496,ha=37808,fa=37809,pa=37810,ma=37811,ga=37812,_a=37813,va=37814,xa=37815,Ma=37816,Sa=37817,ya=37818,Ea=37819,ba=37820,Ta=37821,Ds=36492,Aa=36494,wa=36495,yu=36283,Ra=36284,Ca=36285,Pa=36286,ah=3200,ch=3201,Eu=0,lh=1,Vn="",qt="srgb",rr="srgb-linear",Fs="linear",nt="srgb",Si=7680,Rc=519,uh=512,dh=513,hh=514,bu=515,fh=516,ph=517,mh=518,gh=519,Cc=35044,Pn=35048,Pc="300 es",mn=2e3,Os=2001;class ur{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],to=Math.PI/180,Ia=180/Math.PI;function Wr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function _h(n,e){return(n%e+e)%e}function no(n,e,t){return(1-t)*n+t*e}function _r(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,t=0){Ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const h=s[o+0],m=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==m||u!==g){let p=1-a;const f=l*h+c*m+u*g+d*_,E=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const T=Math.sqrt(x),w=Math.atan2(T,f*E);p=Math.sin(p*w)/T,a=Math.sin(a*w)/T}const v=a*E;if(l=l*p+h*v,c=c*p+m*v,u=u*p+g*v,d=d*p+_*v,p===1-a){const T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*m-c*h,e[t+1]=l*g+u*h+c*d-a*m,e[t+2]=c*g+u*m+a*h-l*d,e[t+3]=u*g-a*d-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d-h*m*g;break;case"YXZ":this._x=h*u*d+c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d+h*m*g;break;case"ZXY":this._x=h*u*d-c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d-h*m*g;break;case"ZYX":this._x=h*u*d-c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d+h*m*g;break;case"YZX":this._x=h*u*d+c*m*g,this._y=c*m*d+h*u*g,this._z=c*u*g-h*m*d,this._w=c*u*d-h*m*g;break;case"XZY":this._x=h*u*d-c*m*g,this._y=c*m*d-h*u*g,this._z=c*u*g+h*m*d,this._w=c*u*d+h*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>d){const m=2*Math.sqrt(1+i-a-d);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-i-d);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+d-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ic.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ic.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return io.copy(this).projectOnVector(e),this.sub(io)}reflect(e){return this.sub(io.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const io=new z,Ic=new Xr;class Ve{constructor(e,t,i,r,s,o,a,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],m=i[5],g=i[8],_=r[0],p=r[3],f=r[6],E=r[1],x=r[4],v=r[7],T=r[2],w=r[5],R=r[8];return s[0]=o*_+a*E+l*T,s[3]=o*p+a*x+l*w,s[6]=o*f+a*v+l*R,s[1]=c*_+u*E+d*T,s[4]=c*p+u*x+d*w,s[7]=c*f+u*v+d*R,s[2]=h*_+m*E+g*T,s[5]=h*p+m*x+g*w,s[8]=h*f+m*v+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,m=c*s-o*l,g=t*d+i*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=m*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ro.makeScale(e,t)),this}rotate(e){return this.premultiply(ro.makeRotation(-e)),this}translate(e,t){return this.premultiply(ro.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ro=new Ve;function Tu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Bs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vh(){const n=Bs("canvas");return n.style.display="block",n}const Lc={};function ji(n){n in Lc||(Lc[n]=!0,console.warn(n))}function xh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Dc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mh(){const n={enabled:!0,workingColorSpace:rr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===nt&&(r.r=Ln(r.r),r.g=Ln(r.g),r.b=Ln(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(r.r=Ji(r.r),r.g=Ji(r.g),r.b=Ji(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Vn?Fs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ji("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ji("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[rr]:{primaries:e,whitePoint:i,transfer:Fs,toXYZ:Dc,fromXYZ:Uc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:Dc,fromXYZ:Uc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),n}const Qe=Mh();function Ln(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ji(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let yi;class Sh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{yi===void 0&&(yi=Bs("canvas")),yi.width=e.width,yi.height=e.height;const r=yi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=yi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Bs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ln(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ln(t[i]/255)*255):t[i]=Ln(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yh=0;class tc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=Wr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(so(r[o].image)):s.push(so(r[o]))}else s=so(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function so(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Sh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Eh=0;const oo=new z;class Ut extends ur{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,i=li,r=li,s=fn,o=ui,a=on,l=gn,c=Ut.DEFAULT_ANISOTROPY,u=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=Wr(),this.name="",this.source=new tc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(oo).x}get height(){return this.source.getSize(oo).y}get depth(){return this.source.getSize(oo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ia:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case ra:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ia:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case ra:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=mu;Ut.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,i=0,r=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],m=l[5],g=l[9],_=l[2],p=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(m+1)/2,T=(f+1)/2,w=(u+h)/4,R=(d+_)/4,C=(g+p)/4;return x>v&&x>T?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=w/i,s=R/i):v>T?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=w/r,s=C/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=R/s,r=C/s),this.set(i,r,s,t),this}let E=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(d-_)/E,this.z=(h-u)/E,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bh extends ur{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Ut(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new tc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends bh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Au extends Ut{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Th extends Ut{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zn{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Qt):Qt.fromBufferAttribute(s,o),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qr.copy(i.boundingBox)),Qr.applyMatrix4(e.matrixWorld),this.union(Qr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vr),es.subVectors(this.max,vr),Ei.subVectors(e.a,vr),bi.subVectors(e.b,vr),Ti.subVectors(e.c,vr),Nn.subVectors(bi,Ei),Fn.subVectors(Ti,bi),jn.subVectors(Ei,Ti);let t=[0,-Nn.z,Nn.y,0,-Fn.z,Fn.y,0,-jn.z,jn.y,Nn.z,0,-Nn.x,Fn.z,0,-Fn.x,jn.z,0,-jn.x,-Nn.y,Nn.x,0,-Fn.y,Fn.x,0,-jn.y,jn.x,0];return!ao(t,Ei,bi,Ti,es)||(t=[1,0,0,0,1,0,0,0,1],!ao(t,Ei,bi,Ti,es))?!1:(ts.crossVectors(Nn,Fn),t=[ts.x,ts.y,ts.z],ao(t,Ei,bi,Ti,es))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xn=[new z,new z,new z,new z,new z,new z,new z,new z],Qt=new z,Qr=new Zn,Ei=new z,bi=new z,Ti=new z,Nn=new z,Fn=new z,jn=new z,vr=new z,es=new z,ts=new z,Jn=new z;function ao(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Jn.fromArray(n,s);const a=r.x*Math.abs(Jn.x)+r.y*Math.abs(Jn.y)+r.z*Math.abs(Jn.z),l=e.dot(Jn),c=t.dot(Jn),u=i.dot(Jn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ah=new Zn,xr=new z,co=new z;class dr{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ah.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xr.subVectors(e,this.center);const t=xr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(xr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(co.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xr.copy(e.center).add(co)),this.expandByPoint(xr.copy(e.center).sub(co))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Mn=new z,lo=new z,ns=new z,On=new z,uo=new z,is=new z,ho=new z;class nc{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){lo.copy(e).add(t).multiplyScalar(.5),ns.copy(t).sub(e).normalize(),On.copy(this.origin).sub(lo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ns),a=On.dot(this.direction),l=-On.dot(ns),c=On.lengthSq(),u=Math.abs(1-o*o);let d,h,m,g;if(u>0)if(d=o*l-a,h=o*a-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,m=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(lo).addScaledVector(ns,h),m}intersectSphere(e,t){Mn.subVectors(e.center,this.origin);const i=Mn.dot(this.direction),r=Mn.dot(Mn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,i,r,s){uo.subVectors(t,e),is.subVectors(i,e),ho.crossVectors(uo,is);let o=this.direction.dot(ho),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;On.subVectors(this.origin,e);const l=a*this.direction.dot(is.crossVectors(On,is));if(l<0)return null;const c=a*this.direction.dot(uo.cross(On));if(c<0||l+c>o)return null;const u=-a*On.dot(ho);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,i,r,s,o,a,l,c,u,d,h,m,g,_,p){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,h,m,g,_,p)}set(e,t,i,r,s,o,a,l,c,u,d,h,m,g,_,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=m,f[7]=g,f[11]=_,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ai.setFromMatrixColumn(e,0).length(),s=1/Ai.setFromMatrixColumn(e,1).length(),o=1/Ai.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,m=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,m=l*d,g=c*u,_=c*d;t[0]=h+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,m=l*d,g=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,m=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-m,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+m,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=m*d-g,t[2]=g*d-m,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wh,e,Rh)}lookAt(e,t,i){const r=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Bn.crossVectors(i,Wt),Bn.lengthSq()===0&&(Math.abs(i.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Bn.crossVectors(i,Wt)),Bn.normalize(),rs.crossVectors(Wt,Bn),r[0]=Bn.x,r[4]=rs.x,r[8]=Wt.x,r[1]=Bn.y,r[5]=rs.y,r[9]=Wt.y,r[2]=Bn.z,r[6]=rs.z,r[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],m=i[13],g=i[2],_=i[6],p=i[10],f=i[14],E=i[3],x=i[7],v=i[11],T=i[15],w=r[0],R=r[4],C=r[8],S=r[12],y=r[1],I=r[5],N=r[9],L=r[13],F=r[2],q=r[6],V=r[10],J=r[14],D=r[3],Q=r[7],G=r[11],ae=r[15];return s[0]=o*w+a*y+l*F+c*D,s[4]=o*R+a*I+l*q+c*Q,s[8]=o*C+a*N+l*V+c*G,s[12]=o*S+a*L+l*J+c*ae,s[1]=u*w+d*y+h*F+m*D,s[5]=u*R+d*I+h*q+m*Q,s[9]=u*C+d*N+h*V+m*G,s[13]=u*S+d*L+h*J+m*ae,s[2]=g*w+_*y+p*F+f*D,s[6]=g*R+_*I+p*q+f*Q,s[10]=g*C+_*N+p*V+f*G,s[14]=g*S+_*L+p*J+f*ae,s[3]=E*w+x*y+v*F+T*D,s[7]=E*R+x*I+v*q+T*Q,s[11]=E*C+x*N+v*V+T*G,s[15]=E*S+x*L+v*J+T*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],m=e[14],g=e[3],_=e[7],p=e[11],f=e[15];return g*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*m-i*l*m)+_*(+t*l*m-t*c*h+s*o*h-r*o*m+r*c*u-s*l*u)+p*(+t*c*d-t*a*m-s*o*d+i*o*m+s*a*u-i*c*u)+f*(-r*a*u-t*l*d+t*a*h+r*o*d-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],m=e[11],g=e[12],_=e[13],p=e[14],f=e[15],E=d*p*c-_*h*c+_*l*m-a*p*m-d*l*f+a*h*f,x=g*h*c-u*p*c-g*l*m+o*p*m+u*l*f-o*h*f,v=u*_*c-g*d*c+g*a*m-o*_*m-u*a*f+o*d*f,T=g*d*l-u*_*l-g*a*h+o*_*h+u*a*p-o*d*p,w=t*E+i*x+r*v+s*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return e[0]=E*R,e[1]=(_*h*s-d*p*s-_*r*m+i*p*m+d*r*f-i*h*f)*R,e[2]=(a*p*s-_*l*s+_*r*c-i*p*c-a*r*f+i*l*f)*R,e[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*m-i*l*m)*R,e[4]=x*R,e[5]=(u*p*s-g*h*s+g*r*m-t*p*m-u*r*f+t*h*f)*R,e[6]=(g*l*s-o*p*s-g*r*c+t*p*c+o*r*f-t*l*f)*R,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*m+t*l*m)*R,e[8]=v*R,e[9]=(g*d*s-u*_*s-g*i*m+t*_*m+u*i*f-t*d*f)*R,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*f+t*a*f)*R,e[11]=(u*a*s-o*d*s-u*i*c+t*d*c+o*i*m-t*a*m)*R,e[12]=T*R,e[13]=(u*_*r-g*d*r+g*i*h-t*_*h-u*i*p+t*d*p)*R,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*p-t*a*p)*R,e[15]=(o*d*r-u*a*r+u*i*l-t*d*l-o*i*h+t*a*h)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,m=s*u,g=s*d,_=o*u,p=o*d,f=a*d,E=l*c,x=l*u,v=l*d,T=i.x,w=i.y,R=i.z;return r[0]=(1-(_+f))*T,r[1]=(m+v)*T,r[2]=(g-x)*T,r[3]=0,r[4]=(m-v)*w,r[5]=(1-(h+f))*w,r[6]=(p+E)*w,r[7]=0,r[8]=(g+x)*R,r[9]=(p-E)*R,r[10]=(1-(h+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ai.set(r[0],r[1],r[2]).length();const o=Ai.set(r[4],r[5],r[6]).length(),a=Ai.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],en.copy(this);const c=1/s,u=1/o,d=1/a;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=u,en.elements[5]*=u,en.elements[6]*=u,en.elements[8]*=d,en.elements[9]*=d,en.elements[10]*=d,t.setFromRotationMatrix(en),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=mn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),m=(i+r)/(i-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===mn)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Os)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=mn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),m=-(i+r)/(i-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===mn)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Os)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ai=new z,en=new ot,wh=new z(0,0,0),Rh=new z(1,1,1),Bn=new z,rs=new z,Wt=new z,Nc=new ot,Fc=new Xr;class _n{constructor(e=0,t=0,i=0,r=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Nc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fc.setFromEuler(this),this.setFromQuaternion(Fc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class ic{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ch=0;const Oc=new z,wi=new Xr,Sn=new ot,ss=new z,Mr=new z,Ph=new z,Ih=new Xr,Bc=new z(1,0,0),zc=new z(0,1,0),kc=new z(0,0,1),Hc={type:"added"},Lh={type:"removed"},Ri={type:"childadded",child:null},fo={type:"childremoved",child:null};class Mt extends ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new z,t=new _n,i=new Xr,r=new z(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ve}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.multiply(wi),this}rotateOnWorldAxis(e,t){return wi.setFromAxisAngle(e,t),this.quaternion.premultiply(wi),this}rotateX(e){return this.rotateOnAxis(Bc,e)}rotateY(e){return this.rotateOnAxis(zc,e)}rotateZ(e){return this.rotateOnAxis(kc,e)}translateOnAxis(e,t){return Oc.copy(e).applyQuaternion(this.quaternion),this.position.add(Oc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bc,e)}translateY(e){return this.translateOnAxis(zc,e)}translateZ(e){return this.translateOnAxis(kc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ss.copy(e):ss.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(Mr,ss,this.up):Sn.lookAt(ss,Mr,this.up),this.quaternion.setFromRotationMatrix(Sn),r&&(Sn.extractRotation(r.matrixWorld),wi.setFromRotationMatrix(Sn),this.quaternion.premultiply(wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hc),Ri.child=e,this.dispatchEvent(Ri),Ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Lh),fo.child=e,this.dispatchEvent(fo),fo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hc),Ri.child=e,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,Ph),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Ih,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Mt.DEFAULT_UP=new z(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new z,yn=new z,po=new z,En=new z,Ci=new z,Pi=new z,Vc=new z,mo=new z,go=new z,_o=new z,vo=new mt,xo=new mt,Mo=new mt;class sn{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),tn.subVectors(e,t),r.cross(tn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){tn.subVectors(r,t),yn.subVectors(i,t),po.subVectors(e,t);const o=tn.dot(tn),a=tn.dot(yn),l=tn.dot(po),c=yn.dot(yn),u=yn.dot(po),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,m=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,En.x),l.addScaledVector(o,En.y),l.addScaledVector(a,En.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return vo.setScalar(0),xo.setScalar(0),Mo.setScalar(0),vo.fromBufferAttribute(e,t),xo.fromBufferAttribute(e,i),Mo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(vo,s.x),o.addScaledVector(xo,s.y),o.addScaledVector(Mo,s.z),o}static isFrontFacing(e,t,i,r){return tn.subVectors(i,t),yn.subVectors(e,t),tn.cross(yn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tn.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),tn.cross(yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return sn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Ci.subVectors(r,i),Pi.subVectors(s,i),mo.subVectors(e,i);const l=Ci.dot(mo),c=Pi.dot(mo);if(l<=0&&c<=0)return t.copy(i);go.subVectors(e,r);const u=Ci.dot(go),d=Pi.dot(go);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ci,o);_o.subVectors(e,s);const m=Ci.dot(_o),g=Pi.dot(_o);if(g>=0&&m<=g)return t.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Pi,a);const p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return Vc.subVectors(s,r),a=(d-u)/(d-u+(m-g)),t.copy(r).addScaledVector(Vc,a);const f=1/(p+_+h);return o=_*f,a=h*f,t.copy(i).addScaledVector(Ci,o).addScaledVector(Pi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},os={h:0,s:0,l:0};function So(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class $e{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=_h(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=So(o,s,e+1/3),this.g=So(o,s,e),this.b=So(o,s,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=qt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const i=wu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ln(e.r),this.g=Ln(e.g),this.b=Ln(e.b),this}copyLinearToSRGB(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Qe.workingToColorSpace(At.copy(this),e),Math.round(Ze(At.r*255,0,255))*65536+Math.round(Ze(At.g*255,0,255))*256+Math.round(Ze(At.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(At.copy(this),t);const i=At.r,r=At.g,s=At.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=qt){Qe.workingToColorSpace(At.copy(this),e);const t=At.r,i=At.g,r=At.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(os);const i=no(zn.h,os.h,t),r=no(zn.s,os.s,t),s=no(zn.l,os.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new $e;$e.NAMES=wu;let Dh=0;class hr extends ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=Wr(),this.name="",this.type="Material",this.blending=Ki,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qo,this.blendDst=Yo,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(i.blending=this.blending),this.side!==Yn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qo&&(i.blendSrc=this.blendSrc),this.blendDst!==Yo&&(i.blendDst=this.blendDst),this.blendEquation!==ai&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==tr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pi extends hr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=fu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new z,as=new Ye;let Uh=0;class pt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Uh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Cc,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)as.fromBufferAttribute(this,t),as.applyMatrix3(e),this.setXY(t,as.x,as.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=_r(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_r(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_r(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_r(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_r(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),i=Ft(i,this.array),r=Ft(r,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Cc&&(e.usage=this.usage),e}}class Ru extends pt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Cu extends pt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class lt extends pt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Nh=0;const Kt=new ot,yo=new Mt,Ii=new z,Xt=new Zn,Sr=new Zn,Et=new z;class gt extends ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=Wr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tu(e)?Cu:Ru)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,i){return Kt.makeTranslation(e,t,i),this.applyMatrix4(Kt),this}scale(e,t,i){return Kt.makeScale(e,t,i),this.applyMatrix4(Kt),this}lookAt(e){return yo.lookAt(e),yo.updateMatrix(),this.applyMatrix4(yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new lt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Sr.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(Xt.min,Sr.min),Xt.expandByPoint(Et),Et.addVectors(Xt.max,Sr.max),Xt.expandByPoint(Et)):(Xt.expandByPoint(Sr.min),Xt.expandByPoint(Sr.max))}Xt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Et));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Et.fromBufferAttribute(a,c),l&&(Ii.fromBufferAttribute(e,c),Et.add(Ii)),r=Math.max(r,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<i.count;C++)a[C]=new z,l[C]=new z;const c=new z,u=new z,d=new z,h=new Ye,m=new Ye,g=new Ye,_=new z,p=new z;function f(C,S,y){c.fromBufferAttribute(i,C),u.fromBufferAttribute(i,S),d.fromBufferAttribute(i,y),h.fromBufferAttribute(s,C),m.fromBufferAttribute(s,S),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),m.sub(h),g.sub(h);const I=1/(m.x*g.y-g.x*m.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(I),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(I),a[C].add(_),a[S].add(_),a[y].add(_),l[C].add(p),l[S].add(p),l[y].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let C=0,S=E.length;C<S;++C){const y=E[C],I=y.start,N=y.count;for(let L=I,F=I+N;L<F;L+=3)f(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const x=new z,v=new z,T=new z,w=new z;function R(C){T.fromBufferAttribute(r,C),w.copy(T);const S=a[C];x.copy(S),x.sub(T.multiplyScalar(T.dot(S))).normalize(),v.crossVectors(w,S);const I=v.dot(l[C])<0?-1:1;o.setXYZW(C,x.x,x.y,x.z,I)}for(let C=0,S=E.length;C<S;++C){const y=E[C],I=y.start,N=y.count;for(let L=I,F=I+N;L<F;L+=3)R(e.getX(L+0)),R(e.getX(L+1)),R(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new z,s=new z,o=new z,a=new z,l=new z,c=new z,u=new z,d=new z;if(e)for(let h=0,m=e.count;h<m;h+=3){const g=e.getX(h+0),_=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,m=t.count;h<m;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*u;for(let f=0;f<u;f++)h[g++]=c[m++]}return new pt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],m=e(h,i);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const m=c[d];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Gc=new ot,Qn=new nc,cs=new dr,Wc=new z,ls=new z,us=new z,ds=new z,Eo=new z,hs=new z,Xc=new z,fs=new z;class We extends Mt{constructor(e=new gt,t=new pi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){hs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Eo.fromBufferAttribute(d,e),o?hs.addScaledVector(Eo,u):hs.addScaledVector(Eo.sub(t),u))}t.add(hs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),cs.copy(i.boundingSphere),cs.applyMatrix4(s),Qn.copy(e.ray).recast(e.near),!(cs.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(cs,Wc)===null||Qn.origin.distanceToSquared(Wc)>(e.far-e.near)**2))&&(Gc.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(Gc),!(i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const p=h[g],f=o[p.materialIndex],E=Math.max(p.start,m.start),x=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let v=E,T=x;v<T;v+=3){const w=a.getX(v),R=a.getX(v+1),C=a.getX(v+2);r=ps(this,f,e,i,c,u,d,w,R,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const E=a.getX(p),x=a.getX(p+1),v=a.getX(p+2);r=ps(this,o,e,i,c,u,d,E,x,v),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const p=h[g],f=o[p.materialIndex],E=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let v=E,T=x;v<T;v+=3){const w=v,R=v+1,C=v+2;r=ps(this,f,e,i,c,u,d,w,R,C),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const E=p,x=p+1,v=p+2;r=ps(this,o,e,i,c,u,d,E,x,v),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Fh(n,e,t,i,r,s,o,a){let l;if(e.side===Ht?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Yn,a),l===null)return null;fs.copy(a),fs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(fs);return c<t.near||c>t.far?null:{distance:c,point:fs.clone(),object:n}}function ps(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,ls),n.getVertexPosition(l,us),n.getVertexPosition(c,ds);const u=Fh(n,e,t,i,ls,us,ds,Xc);if(u){const d=new z;sn.getBarycoord(Xc,ls,us,ds,d),r&&(u.uv=sn.getInterpolatedAttribute(r,a,l,c,d,new Ye)),s&&(u.uv1=sn.getInterpolatedAttribute(s,a,l,c,d,new Ye)),o&&(u.normal=sn.getInterpolatedAttribute(o,a,l,c,d,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new z,materialIndex:0};sn.getNormal(ls,us,ds,h.normal),u.face=h,u.barycoord=d}return u}class vi extends gt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,m=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(d,2));function g(_,p,f,E,x,v,T,w,R,C,S){const y=v/R,I=T/C,N=v/2,L=T/2,F=w/2,q=R+1,V=C+1;let J=0,D=0;const Q=new z;for(let G=0;G<V;G++){const ae=G*I-L;for(let fe=0;fe<q;fe++){const He=fe*y-N;Q[_]=He*E,Q[p]=ae*x,Q[f]=F,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[p]=0,Q[f]=w>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(fe/R),d.push(1-G/C),J+=1}}for(let G=0;G<C;G++)for(let ae=0;ae<R;ae++){const fe=h+ae+q*G,He=h+ae+q*(G+1),Ue=h+(ae+1)+q*(G+1),W=h+(ae+1)+q*G;l.push(fe,He,W),l.push(He,Ue,W),D+=6}a.addGroup(m,D,S),m+=D,h+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function sr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Dt(n){const e={};for(let t=0;t<n.length;t++){const i=sr(n[t]);for(const r in i)e[r]=i[r]}return e}function Oh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Pu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const Bh={clone:sr,merge:Dt};var zh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends hr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zh,this.fragmentShader=kh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=sr(e.uniforms),this.uniformsGroups=Oh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Iu extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new z,qc=new Ye,Yc=new Ye;class nn extends Iu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ia*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(to*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ia*2*Math.atan(Math.tan(to*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,qc,Yc),t.subVectors(Yc,qc)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(to*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Li=-90,Di=1;class Hh extends Mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new nn(Li,Di,e,t);r.layers=this.layers,this.add(r);const s=new nn(Li,Di,e,t);s.layers=this.layers,this.add(s);const o=new nn(Li,Di,e,t);o.layers=this.layers,this.add(o);const a=new nn(Li,Di,e,t);a.layers=this.layers,this.add(a);const l=new nn(Li,Di,e,t);l.layers=this.layers,this.add(l);const c=new nn(Li,Di,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Os)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Lu extends Ut{constructor(e=[],t=nr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vh extends _i{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Lu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new vi(5,5,5),s=new Dn({name:"CubemapFromEquirect",uniforms:sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Xn});s.uniforms.tEquirect.value=t;const o=new We(r,s),a=t.minFilter;return t.minFilter===ui&&(t.minFilter=fn),new Hh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class Gn extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gh={type:"move"};class bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),f=this._getHandJoint(c,_);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&h>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gh)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Gn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class rc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new $e(e),this.near=t,this.far=i}clone(){return new rc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wh extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Xh extends Ut{constructor(e=null,t=1,i=1,r,s,o,a,l,c=Yt,u=Yt,d,h){super(null,o,a,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zc extends pt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ui=new ot,$c=new ot,ms=[],Kc=new Zn,qh=new ot,yr=new We,Er=new dr;class Yh extends We{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,qh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ui),Kc.copy(e.boundingBox).applyMatrix4(Ui),this.boundingBox.union(Kc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ui),Er.copy(e.boundingSphere).applyMatrix4(Ui),this.boundingSphere.union(Er)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(yr.geometry=this.geometry,yr.material=this.material,yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Er.copy(this.boundingSphere),Er.applyMatrix4(i),e.ray.intersectsSphere(Er)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ui),$c.multiplyMatrices(i,Ui),yr.matrixWorld=$c,yr.raycast(e,ms);for(let o=0,a=ms.length;o<a;o++){const l=ms[o];l.instanceId=s,l.object=this,t.push(l)}ms.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Zc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Xh(new Float32Array(r*this.count),r,this.count,ja,pn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const To=new z,Zh=new z,$h=new Ve;class si{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=To.subVectors(i,t).cross(Zh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(To),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||$h.getNormalMatrix(e),r=this.coplanarPoint(To).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new dr,Kh=new Ye(.5,.5),gs=new z;class sc{constructor(e=new si,t=new si,i=new si,r=new si,s=new si,o=new si){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=mn,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],m=s[7],g=s[8],_=s[9],p=s[10],f=s[11],E=s[12],x=s[13],v=s[14],T=s[15];if(r[0].setComponents(c-o,m-u,f-g,T-E).normalize(),r[1].setComponents(c+o,m+u,f+g,T+E).normalize(),r[2].setComponents(c+a,m+d,f+_,T+x).normalize(),r[3].setComponents(c-a,m-d,f-_,T-x).normalize(),i)r[4].setComponents(l,h,p,v).normalize(),r[5].setComponents(c-l,m-h,f-p,T-v).normalize();else if(r[4].setComponents(c-l,m-h,f-p,T-v).normalize(),t===mn)r[5].setComponents(c+l,m+h,f+p,T+v).normalize();else if(t===Os)r[5].setComponents(l,h,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){ei.center.set(0,0,0);const t=Kh.distanceTo(e.center);return ei.radius=.7071067811865476+t,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(gs.x=r.normal.x>0?e.max.x:e.min.x,gs.y=r.normal.y>0?e.max.y:e.min.y,gs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(gs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Du extends hr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zs=new z,ks=new z,jc=new ot,br=new nc,_s=new dr,Ao=new z,Jc=new z;class jh extends Mt{constructor(e=new gt,t=new Du){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)zs.fromBufferAttribute(t,r-1),ks.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=zs.distanceTo(ks);e.setAttribute("lineDistance",new lt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),_s.copy(i.boundingSphere),_s.applyMatrix4(r),_s.radius+=s,e.ray.intersectsSphere(_s)===!1)return;jc.copy(r).invert(),br.copy(e.ray).applyMatrix4(jc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const f=u.getX(_),E=u.getX(_+1),x=vs(this,e,br,l,f,E,_);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(g-1),p=u.getX(m),f=vs(this,e,br,l,_,p,g-1);f&&t.push(f)}}else{const m=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const f=vs(this,e,br,l,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=vs(this,e,br,l,g-1,m,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function vs(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(zs.fromBufferAttribute(a,r),ks.fromBufferAttribute(a,s),t.distanceSqToSegment(zs,ks,Ao,Jc)>i)return;Ao.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Ao);if(!(c<e.near||c>e.far))return{distance:c,point:Jc.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}class Uu extends Ut{constructor(e,t,i=gi,r,s,o,a=Yt,l=Yt,c,u=kr,d=1){if(u!==kr&&u!==Hr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class oc extends gt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new z,u=new Ye;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const m=i+d/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new lt(o,3)),this.setAttribute("normal",new lt(a,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class an extends gt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],m=[];let g=0;const _=[],p=i/2;let f=0;E(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new lt(d,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(m,2));function E(){const v=new z,T=new z;let w=0;const R=(t-e)/i;for(let C=0;C<=s;C++){const S=[],y=C/s,I=y*(t-e)+e;for(let N=0;N<=r;N++){const L=N/r,F=L*l+a,q=Math.sin(F),V=Math.cos(F);T.x=I*q,T.y=-y*i+p,T.z=I*V,d.push(T.x,T.y,T.z),v.set(q,R,V).normalize(),h.push(v.x,v.y,v.z),m.push(L,1-y),S.push(g++)}_.push(S)}for(let C=0;C<r;C++)for(let S=0;S<s;S++){const y=_[S][C],I=_[S+1][C],N=_[S+1][C+1],L=_[S][C+1];(e>0||S!==0)&&(u.push(y,I,L),w+=3),(t>0||S!==s-1)&&(u.push(I,N,L),w+=3)}c.addGroup(f,w,0),f+=w}function x(v){const T=g,w=new Ye,R=new z;let C=0;const S=v===!0?e:t,y=v===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,p*y,0),h.push(0,y,0),m.push(.5,.5),g++;const I=g;for(let N=0;N<=r;N++){const F=N/r*l+a,q=Math.cos(F),V=Math.sin(F);R.x=S*V,R.y=p*y,R.z=S*q,d.push(R.x,R.y,R.z),h.push(0,y,0),w.x=q*.5+.5,w.y=V*.5*y+.5,m.push(w.x,w.y),g++}for(let N=0;N<r;N++){const L=T+N,F=I+N;v===!0?u.push(F,F+1,L):u.push(F+1,F,L),C+=3}c.addGroup(f,C,v===!0?1:2),f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mi extends an{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new mi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gs extends gt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(s.slice(),3)),this.setAttribute("uv",new lt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(E){const x=new z,v=new z,T=new z;for(let w=0;w<t.length;w+=3)m(t[w+0],x),m(t[w+1],v),m(t[w+2],T),l(x,v,T,E)}function l(E,x,v,T){const w=T+1,R=[];for(let C=0;C<=w;C++){R[C]=[];const S=E.clone().lerp(v,C/w),y=x.clone().lerp(v,C/w),I=w-C;for(let N=0;N<=I;N++)N===0&&C===w?R[C][N]=S:R[C][N]=S.clone().lerp(y,N/I)}for(let C=0;C<w;C++)for(let S=0;S<2*(w-C)-1;S++){const y=Math.floor(S/2);S%2===0?(h(R[C][y+1]),h(R[C+1][y]),h(R[C][y])):(h(R[C][y+1]),h(R[C+1][y+1]),h(R[C+1][y]))}}function c(E){const x=new z;for(let v=0;v<s.length;v+=3)x.x=s[v+0],x.y=s[v+1],x.z=s[v+2],x.normalize().multiplyScalar(E),s[v+0]=x.x,s[v+1]=x.y,s[v+2]=x.z}function u(){const E=new z;for(let x=0;x<s.length;x+=3){E.x=s[x+0],E.y=s[x+1],E.z=s[x+2];const v=p(E)/2/Math.PI+.5,T=f(E)/Math.PI+.5;o.push(v,1-T)}g(),d()}function d(){for(let E=0;E<o.length;E+=6){const x=o[E+0],v=o[E+2],T=o[E+4],w=Math.max(x,v,T),R=Math.min(x,v,T);w>.9&&R<.1&&(x<.2&&(o[E+0]+=1),v<.2&&(o[E+2]+=1),T<.2&&(o[E+4]+=1))}}function h(E){s.push(E.x,E.y,E.z)}function m(E,x){const v=E*3;x.x=e[v+0],x.y=e[v+1],x.z=e[v+2]}function g(){const E=new z,x=new z,v=new z,T=new z,w=new Ye,R=new Ye,C=new Ye;for(let S=0,y=0;S<s.length;S+=9,y+=6){E.set(s[S+0],s[S+1],s[S+2]),x.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),w.set(o[y+0],o[y+1]),R.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),T.copy(E).add(x).add(v).divideScalar(3);const I=p(T);_(w,y+0,E,I),_(R,y+2,x,I),_(C,y+4,v,I)}}function _(E,x,v,T){T<0&&E.x===1&&(o[x]=E.x-1),v.x===0&&v.z===0&&(o[x]=T/2/Math.PI+.5)}function p(E){return Math.atan2(E.z,-E.x)}function f(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.vertices,e.indices,e.radius,e.details)}}class ac extends Gs{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ac(e.radius,e.detail)}}class cc extends Gs{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new cc(e.radius,e.detail)}}class Ws extends gt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,h=t/l,m=[],g=[],_=[],p=[];for(let f=0;f<u;f++){const E=f*h-o;for(let x=0;x<c;x++){const v=x*d-s;g.push(v,-E,0),_.push(0,0,1),p.push(x/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<a;E++){const x=E+c*f,v=E+c*(f+1),T=E+1+c*(f+1),w=E+1+c*f;m.push(x,v,w),m.push(v,T,w)}this.setIndex(m),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.width,e.height,e.widthSegments,e.heightSegments)}}class lc extends gt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new z,h=new z,m=[],g=[],_=[],p=[];for(let f=0;f<=i;f++){const E=[],x=f/i;let v=0;f===0&&o===0?v=.5/t:f===i&&l===Math.PI&&(v=-.5/t);for(let T=0;T<=t;T++){const w=T/t;d.x=-e*Math.cos(r+w*s)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(r+w*s)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),p.push(w+v,1-x),E.push(c++)}u.push(E)}for(let f=0;f<i;f++)for(let E=0;E<t;E++){const x=u[f][E+1],v=u[f][E],T=u[f+1][E],w=u[f+1][E+1];(f!==0||o>0)&&m.push(x,v,w),(f!==i-1||l<Math.PI)&&m.push(v,T,w)}this.setIndex(m),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(_,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class jt extends hr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eu,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jh extends hr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Qh extends hr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ef extends Du{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Nu extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class tf extends Nu{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const wo=new ot,Qc=new z,el=new z;class nf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.mapType=gn,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sc,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Qc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qc),el.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(el),t.updateMatrixWorld(),wo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class uc extends Iu{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class rf extends nf{constructor(){super(new uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tl extends Nu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new rf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class sf extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const nl=new ot;class of{constructor(e,t,i=0,r=1/0){this.ray=new nc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new ic,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return nl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(nl),this}intersectObject(e,t=!0,i=[]){return La(e,this,i,t),i.sort(il),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)La(e[r],this,i,t);return i.sort(il),i}}function il(n,e){return n.distance-e.distance}function La(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)La(s[o],e,t,!0)}}function rl(n,e,t,i){const r=af(i);switch(t){case xu:return n*e;case ja:return n*e/r.components*r.byteLength;case Ja:return n*e/r.components*r.byteLength;case Su:return n*e*2/r.components*r.byteLength;case Qa:return n*e*2/r.components*r.byteLength;case Mu:return n*e*3/r.components*r.byteLength;case on:return n*e*4/r.components*r.byteLength;case ec:return n*e*4/r.components*r.byteLength;case Cs:case Ps:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Is:case Ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case oa:case ca:return Math.max(n,16)*Math.max(e,8)/4;case sa:case aa:return Math.max(n,8)*Math.max(e,8)/2;case la:case ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case da:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case pa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ma:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ga:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case _a:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case va:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case xa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ma:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ya:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ea:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ba:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ds:case Aa:case wa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case yu:case Ra:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ca:case Pa:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function af(n){switch(n){case gn:case gu:return{byteLength:1,components:1};case Br:case _u:case Gr:return{byteLength:2,components:1};case $a:case Ka:return{byteLength:2,components:4};case gi:case Za:case pn:return{byteLength:4,components:1};case vu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ya}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ya);function Fu(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function cf(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<d.length;m++){const g=d[h],_=d[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let m=0,g=d.length;m<g;m++){const _=d[m];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uf=`#ifdef USE_ALPHAHASH
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
#endif`,df=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ff=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mf=`#ifdef USE_AOMAP
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
#endif`,gf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_f=`#ifdef USE_BATCHING
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
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yf=`#ifdef USE_IRIDESCENCE
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
#endif`,Ef=`#ifdef USE_BUMPMAP
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
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Lf=`#define PI 3.141592653589793
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
} // validated`,Df=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Uf=`vec3 transformedNormal = objectNormal;
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
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",kf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hf=`#ifdef USE_ENVMAP
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
#endif`,Vf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gf=`#ifdef USE_ENVMAP
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
#endif`,Wf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
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
#endif`,qf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$f=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kf=`#ifdef USE_GRADIENTMAP
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
}`,jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ep=`uniform bool receiveShadow;
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
#endif`,tp=`#ifdef USE_ENVMAP
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
#endif`,np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,op=`PhysicalMaterial material;
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
#endif`,ap=`struct PhysicalMaterial {
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
}`,cp=`
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
#endif`,lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,up=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_p=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vp=`#if defined( USE_POINTS_UV )
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
#endif`,xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bp=`#ifdef USE_MORPHTARGETS
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
#endif`,Tp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,wp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ip=`#ifdef USE_NORMALMAP
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
#endif`,Lp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Up=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Np=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Op=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yp=`float getShadowMask() {
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
}`,Zp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$p=`#ifdef USE_SKINNING
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
#endif`,Kp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jp=`#ifdef USE_SKINNING
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
#endif`,Jp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,em=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nm=`#ifdef USE_TRANSMISSION
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
#endif`,im=`#ifdef USE_TRANSMISSION
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lm=`uniform sampler2D t2D;
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`#include <common>
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
}`,mm=`#if DEPTH_PACKING == 3200
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
}`,gm=`#define DISTANCE
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
}`,_m=`#define DISTANCE
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
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`uniform float scale;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,ym=`#include <common>
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
}`,Em=`uniform vec3 diffuse;
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
}`,bm=`#define LAMBERT
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
}`,Tm=`#define LAMBERT
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
}`,Am=`#define MATCAP
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
}`,wm=`#define MATCAP
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
}`,Rm=`#define NORMAL
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
}`,Cm=`#define NORMAL
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
}`,Pm=`#define PHONG
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
}`,Im=`#define PHONG
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
}`,Lm=`#define STANDARD
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
}`,Dm=`#define STANDARD
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
}`,Um=`#define TOON
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
}`,Nm=`#define TOON
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
}`,Fm=`uniform float size;
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
}`,Om=`uniform vec3 diffuse;
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
}`,Bm=`#include <common>
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
}`,zm=`uniform vec3 color;
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
}`,km=`uniform float rotation;
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
}`,Hm=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:lf,alphahash_pars_fragment:uf,alphamap_fragment:df,alphamap_pars_fragment:hf,alphatest_fragment:ff,alphatest_pars_fragment:pf,aomap_fragment:mf,aomap_pars_fragment:gf,batching_pars_vertex:_f,batching_vertex:vf,begin_vertex:xf,beginnormal_vertex:Mf,bsdfs:Sf,iridescence_fragment:yf,bumpmap_pars_fragment:Ef,clipping_planes_fragment:bf,clipping_planes_pars_fragment:Tf,clipping_planes_pars_vertex:Af,clipping_planes_vertex:wf,color_fragment:Rf,color_pars_fragment:Cf,color_pars_vertex:Pf,color_vertex:If,common:Lf,cube_uv_reflection_fragment:Df,defaultnormal_vertex:Uf,displacementmap_pars_vertex:Nf,displacementmap_vertex:Ff,emissivemap_fragment:Of,emissivemap_pars_fragment:Bf,colorspace_fragment:zf,colorspace_pars_fragment:kf,envmap_fragment:Hf,envmap_common_pars_fragment:Vf,envmap_pars_fragment:Gf,envmap_pars_vertex:Wf,envmap_physical_pars_fragment:tp,envmap_vertex:Xf,fog_vertex:qf,fog_pars_vertex:Yf,fog_fragment:Zf,fog_pars_fragment:$f,gradientmap_pars_fragment:Kf,lightmap_pars_fragment:jf,lights_lambert_fragment:Jf,lights_lambert_pars_fragment:Qf,lights_pars_begin:ep,lights_toon_fragment:np,lights_toon_pars_fragment:ip,lights_phong_fragment:rp,lights_phong_pars_fragment:sp,lights_physical_fragment:op,lights_physical_pars_fragment:ap,lights_fragment_begin:cp,lights_fragment_maps:lp,lights_fragment_end:up,logdepthbuf_fragment:dp,logdepthbuf_pars_fragment:hp,logdepthbuf_pars_vertex:fp,logdepthbuf_vertex:pp,map_fragment:mp,map_pars_fragment:gp,map_particle_fragment:_p,map_particle_pars_fragment:vp,metalnessmap_fragment:xp,metalnessmap_pars_fragment:Mp,morphinstance_vertex:Sp,morphcolor_vertex:yp,morphnormal_vertex:Ep,morphtarget_pars_vertex:bp,morphtarget_vertex:Tp,normal_fragment_begin:Ap,normal_fragment_maps:wp,normal_pars_fragment:Rp,normal_pars_vertex:Cp,normal_vertex:Pp,normalmap_pars_fragment:Ip,clearcoat_normal_fragment_begin:Lp,clearcoat_normal_fragment_maps:Dp,clearcoat_pars_fragment:Up,iridescence_pars_fragment:Np,opaque_fragment:Fp,packing:Op,premultiplied_alpha_fragment:Bp,project_vertex:zp,dithering_fragment:kp,dithering_pars_fragment:Hp,roughnessmap_fragment:Vp,roughnessmap_pars_fragment:Gp,shadowmap_pars_fragment:Wp,shadowmap_pars_vertex:Xp,shadowmap_vertex:qp,shadowmask_pars_fragment:Yp,skinbase_vertex:Zp,skinning_pars_vertex:$p,skinning_vertex:Kp,skinnormal_vertex:jp,specularmap_fragment:Jp,specularmap_pars_fragment:Qp,tonemapping_fragment:em,tonemapping_pars_fragment:tm,transmission_fragment:nm,transmission_pars_fragment:im,uv_pars_fragment:rm,uv_pars_vertex:sm,uv_vertex:om,worldpos_vertex:am,background_vert:cm,background_frag:lm,backgroundCube_vert:um,backgroundCube_frag:dm,cube_vert:hm,cube_frag:fm,depth_vert:pm,depth_frag:mm,distanceRGBA_vert:gm,distanceRGBA_frag:_m,equirect_vert:vm,equirect_frag:xm,linedashed_vert:Mm,linedashed_frag:Sm,meshbasic_vert:ym,meshbasic_frag:Em,meshlambert_vert:bm,meshlambert_frag:Tm,meshmatcap_vert:Am,meshmatcap_frag:wm,meshnormal_vert:Rm,meshnormal_frag:Cm,meshphong_vert:Pm,meshphong_frag:Im,meshphysical_vert:Lm,meshphysical_frag:Dm,meshtoon_vert:Um,meshtoon_frag:Nm,points_vert:Fm,points_frag:Om,shadow_vert:Bm,shadow_frag:zm,sprite_vert:km,sprite_frag:Hm},ve={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},dn={basic:{uniforms:Dt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Dt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Dt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Dt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Dt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Dt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Dt([ve.points,ve.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Dt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Dt([ve.common,ve.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Dt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Dt([ve.sprite,ve.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Dt([ve.common,ve.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Dt([ve.lights,ve.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};dn.physical={uniforms:Dt([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const xs={r:0,b:0,g:0},ti=new _n,Vm=new ot;function Gm(n,e,t,i,r,s,o){const a=new $e(0);let l=s===!0?0:1,c,u,d=null,h=0,m=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function _(x){let v=!1;const T=g(x);T===null?f(a,l):T&&T.isColor&&(f(T,1),v=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(x,v){const T=g(v);T&&(T.isCubeTexture||T.mapping===Vs)?(u===void 0&&(u=new We(new vi(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:sr(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ti.copy(v.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(ti)),u.material.toneMapped=Qe.getTransfer(T.colorSpace)!==nt,(d!==T||h!==T.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,d=T,h=T.version,m=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new We(new Ws(2,2),new Dn({name:"BackgroundMaterial",uniforms:sr(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(T.colorSpace)!==nt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||h!==T.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=T,h=T.version,m=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function f(x,v){x.getRGB(xs,Pu(n)),i.buffers.color.setClear(xs.r,xs.g,xs.b,v,o)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,f(a,l)},render:_,addToRenderList:p,dispose:E}}function Wm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(y,I,N,L,F){let q=!1;const V=d(L,N,I);s!==V&&(s=V,c(s.object)),q=m(y,L,N,F),q&&g(y,L,N,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(y,I,N,L),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function d(y,I,N){const L=N.wireframe===!0;let F=i[y.id];F===void 0&&(F={},i[y.id]=F);let q=F[I.id];q===void 0&&(q={},F[I.id]=q);let V=q[L];return V===void 0&&(V=h(l()),q[L]=V),V}function h(y){const I=[],N=[],L=[];for(let F=0;F<t;F++)I[F]=0,N[F]=0,L[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:L,object:y,attributes:{},index:null}}function m(y,I,N,L){const F=s.attributes,q=I.attributes;let V=0;const J=N.getAttributes();for(const D in J)if(J[D].location>=0){const G=F[D];let ae=q[D];if(ae===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor)),G===void 0||G.attribute!==ae||ae&&G.data!==ae.data)return!0;V++}return s.attributesNum!==V||s.index!==L}function g(y,I,N,L){const F={},q=I.attributes;let V=0;const J=N.getAttributes();for(const D in J)if(J[D].location>=0){let G=q[D];G===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(G=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(G=y.instanceColor));const ae={};ae.attribute=G,G&&G.data&&(ae.data=G.data),F[D]=ae,V++}s.attributes=F,s.attributesNum=V,s.index=L}function _(){const y=s.newAttributes;for(let I=0,N=y.length;I<N;I++)y[I]=0}function p(y){f(y,0)}function f(y,I){const N=s.newAttributes,L=s.enabledAttributes,F=s.attributeDivisors;N[y]=1,L[y]===0&&(n.enableVertexAttribArray(y),L[y]=1),F[y]!==I&&(n.vertexAttribDivisor(y,I),F[y]=I)}function E(){const y=s.newAttributes,I=s.enabledAttributes;for(let N=0,L=I.length;N<L;N++)I[N]!==y[N]&&(n.disableVertexAttribArray(N),I[N]=0)}function x(y,I,N,L,F,q,V){V===!0?n.vertexAttribIPointer(y,I,N,F,q):n.vertexAttribPointer(y,I,N,L,F,q)}function v(y,I,N,L){_();const F=L.attributes,q=N.getAttributes(),V=I.defaultAttributeValues;for(const J in q){const D=q[J];if(D.location>=0){let Q=F[J];if(Q===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(Q=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(Q=y.instanceColor)),Q!==void 0){const G=Q.normalized,ae=Q.itemSize,fe=e.get(Q);if(fe===void 0)continue;const He=fe.buffer,Ue=fe.type,W=fe.bytesPerElement,de=Ue===n.INT||Ue===n.UNSIGNED_INT||Q.gpuType===Za;if(Q.isInterleavedBufferAttribute){const se=Q.data,Ae=se.stride,we=Q.offset;if(se.isInstancedInterleavedBuffer){for(let H=0;H<D.locationSize;H++)f(D.location+H,se.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let H=0;H<D.locationSize;H++)p(D.location+H);n.bindBuffer(n.ARRAY_BUFFER,He);for(let H=0;H<D.locationSize;H++)x(D.location+H,ae/D.locationSize,Ue,G,Ae*W,(we+ae/D.locationSize*H)*W,de)}else{if(Q.isInstancedBufferAttribute){for(let se=0;se<D.locationSize;se++)f(D.location+se,Q.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let se=0;se<D.locationSize;se++)p(D.location+se);n.bindBuffer(n.ARRAY_BUFFER,He);for(let se=0;se<D.locationSize;se++)x(D.location+se,ae/D.locationSize,Ue,G,ae*W,ae/D.locationSize*se*W,de)}}else if(V!==void 0){const G=V[J];if(G!==void 0)switch(G.length){case 2:n.vertexAttrib2fv(D.location,G);break;case 3:n.vertexAttrib3fv(D.location,G);break;case 4:n.vertexAttrib4fv(D.location,G);break;default:n.vertexAttrib1fv(D.location,G)}}}}E()}function T(){C();for(const y in i){const I=i[y];for(const N in I){const L=I[N];for(const F in L)u(L[F].object),delete L[F];delete I[N]}delete i[y]}}function w(y){if(i[y.id]===void 0)return;const I=i[y.id];for(const N in I){const L=I[N];for(const F in L)u(L[F].object),delete L[F];delete I[N]}delete i[y.id]}function R(y){for(const I in i){const N=i[I];if(N[y.id]===void 0)continue;const L=N[y.id];for(const F in L)u(L[F].object),delete L[F];delete N[y.id]}}function C(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:p,disableUnusedAttributes:E}}function Xm(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];t.update(m,i,1)}function l(c,u,d,h){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function qm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==on&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const C=R===Gr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==gn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==pn&&!C)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:E,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:T,maxSamples:w}}function Ym(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new si,a=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||r;return r=h,i=d.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,f=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{const E=s?0:i,x=E*4;let v=f.clippingState||null;l.value=v,v=u(g,h,x,m);for(let T=0;T!==x;++T)v[T]=t[T];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const f=m+_*4,E=h.matrixWorldInverse;a.getNormalMatrix(E),(p===null||p.length<f)&&(p=new Float32Array(f));for(let x=0,v=m;x!==_;++x,v+=4)o.copy(d[x]).applyMatrix4(E,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Zm(n){let e=new WeakMap;function t(o,a){return a===ta?o.mapping=nr:a===na&&(o.mapping=ir),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ta||a===na)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vh(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const Wi=4,sl=[.125,.215,.35,.446,.526,.582],ci=20,Ro=new uc,ol=new $e;let Co=null,Po=0,Io=0,Lo=!1;const oi=(1+Math.sqrt(5))/2,Ni=1/oi,al=[new z(-oi,Ni,0),new z(oi,Ni,0),new z(-Ni,0,oi),new z(Ni,0,oi),new z(0,oi,-Ni),new z(0,oi,Ni),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],$m=new z;class cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=$m}=s;Co=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Co,Po,Io),this._renderer.xr.enabled=Lo,e.scissorTest=!1,Ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===nr||e.mapping===ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Co=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Gr,format:on,colorSpace:rr,depthBuffer:!1},r=ll(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ll(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Km(s)),this._blurMaterial=jm(s,e,t)}return r}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,Ro)}_sceneToCubeUV(e,t,i,r,s){const l=new nn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(ol),d.toneMapping=qn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null));const _=new pi({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),p=new We(new vi,_);let f=!1;const E=e.background;E?E.isColor&&(_.color.copy(E),e.background=null,f=!0):(_.color.copy(ol),f=!0);for(let x=0;x<6;x++){const v=x%3;v===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):v===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const T=this._cubeSize;Ms(r,v*T,x>2?T:0,T,T),d.setRenderTarget(r),f&&d.render(p,l),d.render(e,l)}p.geometry.dispose(),p.material.dispose(),d.toneMapping=m,d.autoClear=h,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===nr||e.mapping===ir;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=dl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ul());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new We(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ms(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Ro)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=al[(r-s-1)%al.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new We(this._lodPlanes[r],c),h=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ci-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):ci;p>ci&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ci}`);const f=[];let E=0;for(let R=0;R<ci;++R){const C=R/_,S=Math.exp(-C*C/2);f.push(S),R===0?E+=S:R<p&&(E+=2*S)}for(let R=0;R<f.length;R++)f[R]=f[R]/E;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const v=this._sizeLods[r],T=3*v*(r>x-Wi?r-x+Wi:0),w=4*(this._cubeSize-v);Ms(t,T,w,3*v,2*v),l.setRenderTarget(t),l.render(d,Ro)}}function Km(n){const e=[],t=[],i=[];let r=n;const s=n-Wi+1+sl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Wi?l=sl[o-n+Wi-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,_=3,p=2,f=1,E=new Float32Array(_*g*m),x=new Float32Array(p*g*m),v=new Float32Array(f*g*m);for(let w=0;w<m;w++){const R=w%3*2/3-1,C=w>2?0:-1,S=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];E.set(S,_*g*w),x.set(h,p*g*w);const y=[w,w,w,w,w,w];v.set(y,f*g*w)}const T=new gt;T.setAttribute("position",new pt(E,_)),T.setAttribute("uv",new pt(x,p)),T.setAttribute("faceIndex",new pt(v,f)),e.push(T),r>Wi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function ll(n,e,t){const i=new _i(n,e,t);return i.texture.mapping=Vs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ms(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function jm(n,e,t){const i=new Float32Array(ci),r=new z(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:dc(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function ul(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dc(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function dl(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function dc(){return`

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
	`}function Jm(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===ta||l===na,u=l===nr||l===ir;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new cl(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return c&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new cl(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Qm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&ji("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function eg(n,e,t,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)e.update(h[m],n.ARRAY_BUFFER)}function c(d){const h=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const E=m.array;_=m.version;for(let x=0,v=E.length;x<v;x+=3){const T=E[x+0],w=E[x+1],R=E[x+2];h.push(T,w,w,R,R,T)}}else if(g!==void 0){const E=g.array;_=g.version;for(let x=0,v=E.length/3-1;x<v;x+=3){const T=x+0,w=x+1,R=x+2;h.push(T,w,w,R,R,T)}}else return;const p=new(Tu(h)?Cu:Ru)(h,1);p.version=_;const f=s.get(d);f&&e.remove(f),s.set(d,p)}function u(d){const h=s.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function tg(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,m){n.drawElements(i,m,s,h*o),t.update(m,i,1)}function c(h,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,h*o,g),t.update(m,i,g))}function u(h,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,h,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];t.update(p,i,1)}function d(h,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<h.length;f++)c(h[f]/o,m[f],_[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,_,0,g);let f=0;for(let E=0;E<g;E++)f+=m[E]*_[E];t.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function ng(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function ig(n,e,t){const i=new WeakMap,r=new mt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let y=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var m=y;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),p===!0&&(v=3);let T=a.attributes.position.count*v,w=1;T>e.maxTextureSize&&(w=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const R=new Float32Array(T*w*4*d),C=new Au(R,T,w,d);C.type=pn,C.needsUpdate=!0;const S=v*4;for(let I=0;I<d;I++){const N=f[I],L=E[I],F=x[I],q=T*w*4*I;for(let V=0;V<N.count;V++){const J=V*S;g===!0&&(r.fromBufferAttribute(N,V),R[q+J+0]=r.x,R[q+J+1]=r.y,R[q+J+2]=r.z,R[q+J+3]=0),_===!0&&(r.fromBufferAttribute(L,V),R[q+J+4]=r.x,R[q+J+5]=r.y,R[q+J+6]=r.z,R[q+J+7]=0),p===!0&&(r.fromBufferAttribute(F,V),R[q+J+8]=r.x,R[q+J+9]=r.y,R[q+J+10]=r.z,R[q+J+11]=F.itemSize===4?r.w:1)}}h={count:d,texture:C,size:new Ye(T,w)},i.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function rg(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Ou=new Ut,hl=new Uu(1,1),Bu=new Au,zu=new Th,ku=new Lu,fl=[],pl=[],ml=new Float32Array(16),gl=new Float32Array(9),_l=new Float32Array(4);function fr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=fl[r];if(s===void 0&&(s=new Float32Array(r),fl[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Xs(n,e){let t=pl[e];t===void 0&&(t=new Int32Array(e),pl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function sg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function og(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function lg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;_l.set(i),n.uniformMatrix2fv(this.addr,!1,_l),yt(t,i)}}function ug(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;gl.set(i),n.uniformMatrix3fv(this.addr,!1,gl),yt(t,i)}}function dg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;ml.set(i),n.uniformMatrix4fv(this.addr,!1,ml),yt(t,i)}}function hg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function fg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function pg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function gg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function _g(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function xg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function Mg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(hl.compareFunction=bu,s=hl):s=Ou,t.setTexture2D(e||s,r)}function Sg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||zu,r)}function yg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ku,r)}function Eg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Bu,r)}function bg(n){switch(n){case 5126:return sg;case 35664:return og;case 35665:return ag;case 35666:return cg;case 35674:return lg;case 35675:return ug;case 35676:return dg;case 5124:case 35670:return hg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return _g;case 36295:return vg;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return Sg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return Eg}}function Tg(n,e){n.uniform1fv(this.addr,e)}function Ag(n,e){const t=fr(e,this.size,2);n.uniform2fv(this.addr,t)}function wg(n,e){const t=fr(e,this.size,3);n.uniform3fv(this.addr,t)}function Rg(n,e){const t=fr(e,this.size,4);n.uniform4fv(this.addr,t)}function Cg(n,e){const t=fr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Pg(n,e){const t=fr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ig(n,e){const t=fr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Lg(n,e){n.uniform1iv(this.addr,e)}function Dg(n,e){n.uniform2iv(this.addr,e)}function Ug(n,e){n.uniform3iv(this.addr,e)}function Ng(n,e){n.uniform4iv(this.addr,e)}function Fg(n,e){n.uniform1uiv(this.addr,e)}function Og(n,e){n.uniform2uiv(this.addr,e)}function Bg(n,e){n.uniform3uiv(this.addr,e)}function zg(n,e){n.uniform4uiv(this.addr,e)}function kg(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Ou,s[o])}function Hg(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||zu,s[o])}function Vg(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ku,s[o])}function Gg(n,e,t){const i=this.cache,r=e.length,s=Xs(t,r);St(i,s)||(n.uniform1iv(this.addr,s),yt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Bu,s[o])}function Wg(n){switch(n){case 5126:return Tg;case 35664:return Ag;case 35665:return wg;case 35666:return Rg;case 35674:return Cg;case 35675:return Pg;case 35676:return Ig;case 5124:case 35670:return Lg;case 35667:case 35671:return Dg;case 35668:case 35672:return Ug;case 35669:case 35673:return Ng;case 5125:return Fg;case 36294:return Og;case 36295:return Bg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return kg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Vg;case 36289:case 36303:case 36311:case 36292:return Gg}}class Xg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=bg(t.type)}}class qg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wg(t.type)}}class Yg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Do=/(\w+)(\])?(\[|\.)?/g;function vl(n,e){n.seq.push(e),n.map[e.id]=e}function Zg(n,e,t){const i=n.name,r=i.length;for(Do.lastIndex=0;;){const s=Do.exec(i),o=Do.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){vl(t,c===void 0?new Xg(a,n,e):new qg(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Yg(a),vl(t,d)),t=d}}}class Us{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Zg(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function xl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const $g=37297;let Kg=0;function jg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Ml=new Ve;function Jg(n){Qe._getMatrix(Ml,Qe.workingColorSpace,n);const e=`mat3( ${Ml.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case Fs:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Sl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+jg(n.getShaderSource(e),a)}else return s}function Qg(n,e){const t=Jg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function e0(n,e){let t;switch(e){case eh:t="Linear";break;case th:t="Reinhard";break;case nh:t="Cineon";break;case pu:t="ACESFilmic";break;case rh:t="AgX";break;case sh:t="Neutral";break;case ih:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ss=new z;function t0(){Qe.getLuminanceCoefficients(Ss);const n=Ss.x.toFixed(4),e=Ss.y.toFixed(4),t=Ss.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function i0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function r0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Cr(n){return n!==""}function yl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function El(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const s0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Da(n){return n.replace(s0,a0)}const o0=new Map;function a0(n,e){let t=Ge[e];if(t===void 0){const i=o0.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Da(t)}const c0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(n){return n.replace(c0,l0)}function l0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Tl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function u0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Dd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===An&&(e="SHADOWMAP_TYPE_VSM"),e}function d0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case nr:case ir:e="ENVMAP_TYPE_CUBE";break;case Vs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function h0(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===ir&&(e="ENVMAP_MODE_REFRACTION"),e}function f0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case fu:e="ENVMAP_BLENDING_MULTIPLY";break;case Jd:e="ENVMAP_BLENDING_MIX";break;case Qd:e="ENVMAP_BLENDING_ADD";break}return e}function p0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function m0(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=u0(t),c=d0(t),u=h0(t),d=f0(t),h=p0(t),m=n0(t),g=i0(s),_=r.createProgram();let p,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cr).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cr).join(`
`),f.length>0&&(f+=`
`)):(p=[Tl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),f=[Tl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==qn?e0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Qg("linearToOutputTexel",t.outputColorSpace),t0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),o=Da(o),o=yl(o,t),o=El(o,t),a=Da(a),a=yl(a,t),a=El(a,t),o=bl(o),a=bl(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=E+p+o,v=E+f+a,T=xl(r,r.VERTEX_SHADER,x),w=xl(r,r.FRAGMENT_SHADER,v);r.attachShader(_,T),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(I){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(_)||"",L=r.getShaderInfoLog(T)||"",F=r.getShaderInfoLog(w)||"",q=N.trim(),V=L.trim(),J=F.trim();let D=!0,Q=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(D=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,T,w);else{const G=Sl(r,T,"vertex"),ae=Sl(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+q+`
`+G+`
`+ae)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(V===""||J==="")&&(Q=!1);Q&&(I.diagnostics={runnable:D,programLog:q,vertexShader:{log:V,prefix:p},fragmentShader:{log:J,prefix:f}})}r.deleteShader(T),r.deleteShader(w),C=new Us(r,_),S=r0(r,_)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,$g)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Kg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}let g0=0;class _0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new v0(e),t.set(e,i)),i}}class v0{constructor(e){this.id=g0++,this.code=e,this.usedTimes=0}}function x0(n,e,t,i,r,s,o){const a=new ic,l=new _0,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,y,I,N,L){const F=N.fog,q=L.geometry,V=S.isMeshStandardMaterial?N.environment:null,J=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),D=J&&J.mapping===Vs?J.image.height:null,Q=g[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const G=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ae=G!==void 0?G.length:0;let fe=0;q.morphAttributes.position!==void 0&&(fe=1),q.morphAttributes.normal!==void 0&&(fe=2),q.morphAttributes.color!==void 0&&(fe=3);let He,Ue,W,de;if(Q){const et=dn[Q];He=et.vertexShader,Ue=et.fragmentShader}else He=S.vertexShader,Ue=S.fragmentShader,l.update(S),W=l.getVertexShaderID(S),de=l.getFragmentShaderID(S);const se=n.getRenderTarget(),Ae=n.state.buffers.depth.getReversed(),we=L.isInstancedMesh===!0,H=L.isBatchedMesh===!0,Z=!!S.map,ee=!!S.matcap,P=!!J,Me=!!S.aoMap,le=!!S.lightMap,ye=!!S.bumpMap,ge=!!S.normalMap,xe=!!S.displacementMap,K=!!S.emissiveMap,he=!!S.metalnessMap,Ke=!!S.roughnessMap,Xe=S.anisotropy>0,A=S.clearcoat>0,M=S.dispersion>0,k=S.iridescence>0,$=S.sheen>0,ne=S.transmission>0,j=Xe&&!!S.anisotropyMap,be=A&&!!S.clearcoatMap,ce=A&&!!S.clearcoatNormalMap,Re=A&&!!S.clearcoatRoughnessMap,Ie=k&&!!S.iridescenceMap,oe=k&&!!S.iridescenceThicknessMap,me=$&&!!S.sheenColorMap,De=$&&!!S.sheenRoughnessMap,Ce=!!S.specularMap,_e=!!S.specularColorMap,Oe=!!S.specularIntensityMap,U=ne&&!!S.transmissionMap,ie=ne&&!!S.thicknessMap,pe=!!S.gradientMap,Ee=!!S.alphaMap,re=S.alphaTest>0,te=!!S.alphaHash,Pe=!!S.extensions;let ze=qn;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ze=n.toneMapping);const st={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:He,fragmentShader:Ue,defines:S.defines,customVertexShaderID:W,customFragmentShaderID:de,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:H,batchingColor:H&&L._colorsTexture!==null,instancing:we,instancingColor:we&&L.instanceColor!==null,instancingMorph:we&&L.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:rr,alphaToCoverage:!!S.alphaToCoverage,map:Z,matcap:ee,envMap:P,envMapMode:P&&J.mapping,envMapCubeUVHeight:D,aoMap:Me,lightMap:le,bumpMap:ye,normalMap:ge,displacementMap:h&&xe,emissiveMap:K,normalMapObjectSpace:ge&&S.normalMapType===lh,normalMapTangentSpace:ge&&S.normalMapType===Eu,metalnessMap:he,roughnessMap:Ke,anisotropy:Xe,anisotropyMap:j,clearcoat:A,clearcoatMap:be,clearcoatNormalMap:ce,clearcoatRoughnessMap:Re,dispersion:M,iridescence:k,iridescenceMap:Ie,iridescenceThicknessMap:oe,sheen:$,sheenColorMap:me,sheenRoughnessMap:De,specularMap:Ce,specularColorMap:_e,specularIntensityMap:Oe,transmission:ne,transmissionMap:U,thicknessMap:ie,gradientMap:pe,opaque:S.transparent===!1&&S.blending===Ki&&S.alphaToCoverage===!1,alphaMap:Ee,alphaTest:re,alphaHash:te,combine:S.combine,mapUv:Z&&_(S.map.channel),aoMapUv:Me&&_(S.aoMap.channel),lightMapUv:le&&_(S.lightMap.channel),bumpMapUv:ye&&_(S.bumpMap.channel),normalMapUv:ge&&_(S.normalMap.channel),displacementMapUv:xe&&_(S.displacementMap.channel),emissiveMapUv:K&&_(S.emissiveMap.channel),metalnessMapUv:he&&_(S.metalnessMap.channel),roughnessMapUv:Ke&&_(S.roughnessMap.channel),anisotropyMapUv:j&&_(S.anisotropyMap.channel),clearcoatMapUv:be&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:ce&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:me&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:De&&_(S.sheenRoughnessMap.channel),specularMapUv:Ce&&_(S.specularMap.channel),specularColorMapUv:_e&&_(S.specularColorMap.channel),specularIntensityMapUv:Oe&&_(S.specularIntensityMap.channel),transmissionMapUv:U&&_(S.transmissionMap.channel),thicknessMapUv:ie&&_(S.thicknessMap.channel),alphaMapUv:Ee&&_(S.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(ge||Xe),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!q.attributes.uv&&(Z||Ee),fog:!!F,useFog:S.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ae,skinning:L.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:fe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:Z&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===nt,decodeVideoTextureEmissive:K&&S.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(S.emissiveMap.colorSpace)===nt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Pt,flipSided:S.side===Ht,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Pe&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&S.extensions.multiDraw===!0||H)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function f(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)y.push(I),y.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(E(y,S),x(y,S),y.push(n.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function E(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function x(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const y=g[S.type];let I;if(y){const N=dn[y];I=Bh.clone(N.uniforms)}else I=S.uniforms;return I}function T(S,y){let I;for(let N=0,L=u.length;N<L;N++){const F=u[N];if(F.cacheKey===y){I=F,++I.usedTimes;break}}return I===void 0&&(I=new m0(n,y,S,s),u.push(I)),I}function w(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function R(S){l.remove(S)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:v,acquireProgram:T,releaseProgram:w,releaseShaderCache:R,programs:u,dispose:C}}function M0(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function S0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Al(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function wl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,h,m,g,_,p){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=p),e++,f}function a(d,h,m,g,_,p){const f=o(d,h,m,g,_,p);m.transmission>0?i.push(f):m.transparent===!0?r.push(f):t.push(f)}function l(d,h,m,g,_,p){const f=o(d,h,m,g,_,p);m.transmission>0?i.unshift(f):m.transparent===!0?r.unshift(f):t.unshift(f)}function c(d,h){t.length>1&&t.sort(d||S0),i.length>1&&i.sort(h||Al),r.length>1&&r.sort(h||Al)}function u(){for(let d=e,h=n.length;d<h;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function y0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new wl,n.set(i,[o])):r>=s.length?(o=new wl,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function E0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new $e};break;case"SpotLight":t={position:new z,direction:new z,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function b0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let T0=0;function A0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function w0(n){const e=new E0,t=b0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const r=new z,s=new ot,o=new ot;function a(c){let u=0,d=0,h=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,g=0,_=0,p=0,f=0,E=0,x=0,v=0,T=0,w=0,R=0;c.sort(A0);for(let S=0,y=c.length;S<y;S++){const I=c[S],N=I.color,L=I.intensity,F=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=N.r*L,d+=N.g*L,h+=N.b*L;else if(I.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(I.sh.coefficients[V],L);R++}else if(I.isDirectionalLight){const V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,D=t.get(I);D.shadowIntensity=J.intensity,D.shadowBias=J.bias,D.shadowNormalBias=J.normalBias,D.shadowRadius=J.radius,D.shadowMapSize=J.mapSize,i.directionalShadow[m]=D,i.directionalShadowMap[m]=q,i.directionalShadowMatrix[m]=I.shadow.matrix,E++}i.directional[m]=V,m++}else if(I.isSpotLight){const V=e.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(N).multiplyScalar(L),V.distance=F,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,i.spot[_]=V;const J=I.shadow;if(I.map&&(i.spotLightMap[T]=I.map,T++,J.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[_]=J.matrix,I.castShadow){const D=t.get(I);D.shadowIntensity=J.intensity,D.shadowBias=J.bias,D.shadowNormalBias=J.normalBias,D.shadowRadius=J.radius,D.shadowMapSize=J.mapSize,i.spotShadow[_]=D,i.spotShadowMap[_]=q,v++}_++}else if(I.isRectAreaLight){const V=e.get(I);V.color.copy(N).multiplyScalar(L),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),i.rectArea[p]=V,p++}else if(I.isPointLight){const V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){const J=I.shadow,D=t.get(I);D.shadowIntensity=J.intensity,D.shadowBias=J.bias,D.shadowNormalBias=J.normalBias,D.shadowRadius=J.radius,D.shadowMapSize=J.mapSize,D.shadowCameraNear=J.camera.near,D.shadowCameraFar=J.camera.far,i.pointShadow[g]=D,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=I.shadow.matrix,x++}i.point[g]=V,g++}else if(I.isHemisphereLight){const V=e.get(I);V.skyColor.copy(I.color).multiplyScalar(L),V.groundColor.copy(I.groundColor).multiplyScalar(L),i.hemi[f]=V,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const C=i.hash;(C.directionalLength!==m||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==p||C.hemiLength!==f||C.numDirectionalShadows!==E||C.numPointShadows!==x||C.numSpotShadows!==v||C.numSpotMaps!==T||C.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=v+T-w,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,C.directionalLength=m,C.pointLength=g,C.spotLength=_,C.rectAreaLength=p,C.hemiLength=f,C.numDirectionalShadows=E,C.numPointShadows=x,C.numSpotShadows=v,C.numSpotMaps=T,C.numLightProbes=R,i.version=T0++)}function l(c,u){let d=0,h=0,m=0,g=0,_=0;const p=u.matrixWorldInverse;for(let f=0,E=c.length;f<E;f++){const x=c[f];if(x.isDirectionalLight){const v=i.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(p),d++}else if(x.isSpotLight){const v=i.spot[m];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(p),m++}else if(x.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const v=i.point[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),h++}else if(x.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:i}}function Rl(n){const e=new w0(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function R0(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Rl(n),e.set(r,[a])):s>=o.length?(a=new Rl(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const C0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P0=`uniform sampler2D shadow_pass;
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
}`;function I0(n,e,t){let i=new sc;const r=new Ye,s=new Ye,o=new mt,a=new Jh({depthPacking:ch}),l=new Qh,c={},u=t.maxTextureSize,d={[Yn]:Ht,[Ht]:Yn,[Pt]:Pt},h=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:C0,fragmentShader:P0}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new gt;g.setAttribute("position",new pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new We(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hu;let f=this.type;this.render=function(w,R,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const S=n.getRenderTarget(),y=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Xn),N.buffers.depth.getReversed()?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const L=f!==An&&this.type===An,F=f===An&&this.type!==An;for(let q=0,V=w.length;q<V;q++){const J=w[q],D=J.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const Q=D.getFrameExtents();if(r.multiply(Q),s.copy(D.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,D.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,D.mapSize.y=s.y)),D.map===null||L===!0||F===!0){const ae=this.type!==An?{minFilter:Yt,magFilter:Yt}:{};D.map!==null&&D.map.dispose(),D.map=new _i(r.x,r.y,ae),D.map.texture.name=J.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();const G=D.getViewportCount();for(let ae=0;ae<G;ae++){const fe=D.getViewport(ae);o.set(s.x*fe.x,s.y*fe.y,s.x*fe.z,s.y*fe.w),N.viewport(o),D.updateMatrices(J,ae),i=D.getFrustum(),v(R,C,D.camera,J,this.type)}D.isPointLightShadow!==!0&&this.type===An&&E(D,C),D.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(S,y,I)};function E(w,R){const C=e.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new _i(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,C,h,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,C,m,_,null)}function x(w,R,C,S){let y=null;const I=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)y=I;else if(y=C.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=y.uuid,L=R.uuid;let F=c[N];F===void 0&&(F={},c[N]=F);let q=F[L];q===void 0&&(q=y.clone(),F[L]=q,R.addEventListener("dispose",T)),y=q}if(y.visible=R.visible,y.wireframe=R.wireframe,S===An?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:d[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=n.properties.get(y);N.light=C}return y}function v(w,R,C,S,y){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===An)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const L=e.update(w),F=w.material;if(Array.isArray(F)){const q=L.groups;for(let V=0,J=q.length;V<J;V++){const D=q[V],Q=F[D.materialIndex];if(Q&&Q.visible){const G=x(w,Q,S,y);w.onBeforeShadow(n,w,R,C,L,G,D),n.renderBufferDirect(C,null,L,G,w,D),w.onAfterShadow(n,w,R,C,L,G,D)}}}else if(F.visible){const q=x(w,F,S,y);w.onBeforeShadow(n,w,R,C,L,q,null),n.renderBufferDirect(C,null,L,q,w,null),w.onAfterShadow(n,w,R,C,L,q,null)}}const N=w.children;for(let L=0,F=N.length;L<F;L++)v(N[L],R,C,S,y)}function T(w){w.target.removeEventListener("dispose",T);for(const C in c){const S=c[C],y=w.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const L0={[Zo]:$o,[Ko]:Qo,[jo]:ea,[tr]:Jo,[$o]:Zo,[Qo]:Ko,[ea]:jo,[Jo]:tr};function D0(n,e){function t(){let U=!1;const ie=new mt;let pe=null;const Ee=new mt(0,0,0,0);return{setMask:function(re){pe!==re&&!U&&(n.colorMask(re,re,re,re),pe=re)},setLocked:function(re){U=re},setClear:function(re,te,Pe,ze,st){st===!0&&(re*=ze,te*=ze,Pe*=ze),ie.set(re,te,Pe,ze),Ee.equals(ie)===!1&&(n.clearColor(re,te,Pe,ze),Ee.copy(ie))},reset:function(){U=!1,pe=null,Ee.set(-1,0,0,0)}}}function i(){let U=!1,ie=!1,pe=null,Ee=null,re=null;return{setReversed:function(te){if(ie!==te){const Pe=e.get("EXT_clip_control");te?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),ie=te;const ze=re;re=null,this.setClear(ze)}},getReversed:function(){return ie},setTest:function(te){te?se(n.DEPTH_TEST):Ae(n.DEPTH_TEST)},setMask:function(te){pe!==te&&!U&&(n.depthMask(te),pe=te)},setFunc:function(te){if(ie&&(te=L0[te]),Ee!==te){switch(te){case Zo:n.depthFunc(n.NEVER);break;case $o:n.depthFunc(n.ALWAYS);break;case Ko:n.depthFunc(n.LESS);break;case tr:n.depthFunc(n.LEQUAL);break;case jo:n.depthFunc(n.EQUAL);break;case Jo:n.depthFunc(n.GEQUAL);break;case Qo:n.depthFunc(n.GREATER);break;case ea:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=te}},setLocked:function(te){U=te},setClear:function(te){re!==te&&(ie&&(te=1-te),n.clearDepth(te),re=te)},reset:function(){U=!1,pe=null,Ee=null,re=null,ie=!1}}}function r(){let U=!1,ie=null,pe=null,Ee=null,re=null,te=null,Pe=null,ze=null,st=null;return{setTest:function(et){U||(et?se(n.STENCIL_TEST):Ae(n.STENCIL_TEST))},setMask:function(et){ie!==et&&!U&&(n.stencilMask(et),ie=et)},setFunc:function(et,vn,ln){(pe!==et||Ee!==vn||re!==ln)&&(n.stencilFunc(et,vn,ln),pe=et,Ee=vn,re=ln)},setOp:function(et,vn,ln){(te!==et||Pe!==vn||ze!==ln)&&(n.stencilOp(et,vn,ln),te=et,Pe=vn,ze=ln)},setLocked:function(et){U=et},setClear:function(et){st!==et&&(n.clearStencil(et),st=et)},reset:function(){U=!1,ie=null,pe=null,Ee=null,re=null,te=null,Pe=null,ze=null,st=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,m=[],g=null,_=!1,p=null,f=null,E=null,x=null,v=null,T=null,w=null,R=new $e(0,0,0),C=0,S=!1,y=null,I=null,N=null,L=null,F=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const D=n.getParameter(n.VERSION);D.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(D)[1]),V=J>=1):D.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),V=J>=2);let Q=null,G={};const ae=n.getParameter(n.SCISSOR_BOX),fe=n.getParameter(n.VIEWPORT),He=new mt().fromArray(ae),Ue=new mt().fromArray(fe);function W(U,ie,pe,Ee){const re=new Uint8Array(4),te=n.createTexture();n.bindTexture(U,te),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<pe;Pe++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(ie+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return te}const de={};de[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),de[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),de[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(n.DEPTH_TEST),o.setFunc(tr),ye(!1),ge(bc),se(n.CULL_FACE),Me(Xn);function se(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function Ae(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function we(U,ie){return d[U]!==ie?(n.bindFramebuffer(U,ie),d[U]=ie,U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ie),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function H(U,ie){let pe=m,Ee=!1;if(U){pe=h.get(ie),pe===void 0&&(pe=[],h.set(ie,pe));const re=U.textures;if(pe.length!==re.length||pe[0]!==n.COLOR_ATTACHMENT0){for(let te=0,Pe=re.length;te<Pe;te++)pe[te]=n.COLOR_ATTACHMENT0+te;pe.length=re.length,Ee=!0}}else pe[0]!==n.BACK&&(pe[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(pe)}function Z(U){return g!==U?(n.useProgram(U),g=U,!0):!1}const ee={[ai]:n.FUNC_ADD,[Nd]:n.FUNC_SUBTRACT,[Fd]:n.FUNC_REVERSE_SUBTRACT};ee[Od]=n.MIN,ee[Bd]=n.MAX;const P={[zd]:n.ZERO,[kd]:n.ONE,[Hd]:n.SRC_COLOR,[qo]:n.SRC_ALPHA,[Yd]:n.SRC_ALPHA_SATURATE,[Xd]:n.DST_COLOR,[Gd]:n.DST_ALPHA,[Vd]:n.ONE_MINUS_SRC_COLOR,[Yo]:n.ONE_MINUS_SRC_ALPHA,[qd]:n.ONE_MINUS_DST_COLOR,[Wd]:n.ONE_MINUS_DST_ALPHA,[Zd]:n.CONSTANT_COLOR,[$d]:n.ONE_MINUS_CONSTANT_COLOR,[Kd]:n.CONSTANT_ALPHA,[jd]:n.ONE_MINUS_CONSTANT_ALPHA};function Me(U,ie,pe,Ee,re,te,Pe,ze,st,et){if(U===Xn){_===!0&&(Ae(n.BLEND),_=!1);return}if(_===!1&&(se(n.BLEND),_=!0),U!==Ud){if(U!==p||et!==S){if((f!==ai||v!==ai)&&(n.blendEquation(n.FUNC_ADD),f=ai,v=ai),et)switch(U){case Ki:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tc:n.blendFunc(n.ONE,n.ONE);break;case Ac:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ac:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,x=null,T=null,w=null,R.set(0,0,0),C=0,p=U,S=et}return}re=re||ie,te=te||pe,Pe=Pe||Ee,(ie!==f||re!==v)&&(n.blendEquationSeparate(ee[ie],ee[re]),f=ie,v=re),(pe!==E||Ee!==x||te!==T||Pe!==w)&&(n.blendFuncSeparate(P[pe],P[Ee],P[te],P[Pe]),E=pe,x=Ee,T=te,w=Pe),(ze.equals(R)===!1||st!==C)&&(n.blendColor(ze.r,ze.g,ze.b,st),R.copy(ze),C=st),p=U,S=!1}function le(U,ie){U.side===Pt?Ae(n.CULL_FACE):se(n.CULL_FACE);let pe=U.side===Ht;ie&&(pe=!pe),ye(pe),U.blending===Ki&&U.transparent===!1?Me(Xn):Me(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Ee=U.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),K(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):Ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function ye(U){y!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),y=U)}function ge(U){U!==Id?(se(n.CULL_FACE),U!==I&&(U===bc?n.cullFace(n.BACK):U===Ld?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ae(n.CULL_FACE),I=U}function xe(U){U!==N&&(V&&n.lineWidth(U),N=U)}function K(U,ie,pe){U?(se(n.POLYGON_OFFSET_FILL),(L!==ie||F!==pe)&&(n.polygonOffset(ie,pe),L=ie,F=pe)):Ae(n.POLYGON_OFFSET_FILL)}function he(U){U?se(n.SCISSOR_TEST):Ae(n.SCISSOR_TEST)}function Ke(U){U===void 0&&(U=n.TEXTURE0+q-1),Q!==U&&(n.activeTexture(U),Q=U)}function Xe(U,ie,pe){pe===void 0&&(Q===null?pe=n.TEXTURE0+q-1:pe=Q);let Ee=G[pe];Ee===void 0&&(Ee={type:void 0,texture:void 0},G[pe]=Ee),(Ee.type!==U||Ee.texture!==ie)&&(Q!==pe&&(n.activeTexture(pe),Q=pe),n.bindTexture(U,ie||de[U]),Ee.type=U,Ee.texture=ie)}function A(){const U=G[Q];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function M(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function k(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Re(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ie(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(U){He.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),He.copy(U))}function De(U){Ue.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Ue.copy(U))}function Ce(U,ie){let pe=c.get(ie);pe===void 0&&(pe=new WeakMap,c.set(ie,pe));let Ee=pe.get(U);Ee===void 0&&(Ee=n.getUniformBlockIndex(ie,U.name),pe.set(U,Ee))}function _e(U,ie){const Ee=c.get(ie).get(U);l.get(ie)!==Ee&&(n.uniformBlockBinding(ie,Ee,U.__bindingPointIndex),l.set(ie,Ee))}function Oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Q=null,G={},d={},h=new WeakMap,m=[],g=null,_=!1,p=null,f=null,E=null,x=null,v=null,T=null,w=null,R=new $e(0,0,0),C=0,S=!1,y=null,I=null,N=null,L=null,F=null,He.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Ae,bindFramebuffer:we,drawBuffers:H,useProgram:Z,setBlending:Me,setMaterial:le,setFlipSided:ye,setCullFace:ge,setLineWidth:xe,setPolygonOffset:K,setScissorTest:he,activeTexture:Ke,bindTexture:Xe,unbindTexture:A,compressedTexImage2D:M,compressedTexImage3D:k,texImage2D:Ie,texImage3D:oe,updateUBOMapping:Ce,uniformBlockBinding:_e,texStorage2D:ce,texStorage3D:Re,texSubImage2D:$,texSubImage3D:ne,compressedTexSubImage2D:j,compressedTexSubImage3D:be,scissor:me,viewport:De,reset:Oe}}function U0(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,u=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return m?new OffscreenCanvas(A,M):Bs("canvas")}function _(A,M,k){let $=1;const ne=Xe(A);if((ne.width>k||ne.height>k)&&($=k/Math.max(ne.width,ne.height)),$<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor($*ne.width),be=Math.floor($*ne.height);d===void 0&&(d=g(j,be));const ce=M?g(j,be):d;return ce.width=j,ce.height=be,ce.getContext("2d").drawImage(A,0,0,j,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+j+"x"+be+")."),ce}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),A;return A}function p(A){return A.generateMipmaps}function f(A){n.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(A,M,k,$,ne=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=M;if(M===n.RED&&(k===n.FLOAT&&(j=n.R32F),k===n.HALF_FLOAT&&(j=n.R16F),k===n.UNSIGNED_BYTE&&(j=n.R8)),M===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.R8UI),k===n.UNSIGNED_SHORT&&(j=n.R16UI),k===n.UNSIGNED_INT&&(j=n.R32UI),k===n.BYTE&&(j=n.R8I),k===n.SHORT&&(j=n.R16I),k===n.INT&&(j=n.R32I)),M===n.RG&&(k===n.FLOAT&&(j=n.RG32F),k===n.HALF_FLOAT&&(j=n.RG16F),k===n.UNSIGNED_BYTE&&(j=n.RG8)),M===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.RG8UI),k===n.UNSIGNED_SHORT&&(j=n.RG16UI),k===n.UNSIGNED_INT&&(j=n.RG32UI),k===n.BYTE&&(j=n.RG8I),k===n.SHORT&&(j=n.RG16I),k===n.INT&&(j=n.RG32I)),M===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.RGB8UI),k===n.UNSIGNED_SHORT&&(j=n.RGB16UI),k===n.UNSIGNED_INT&&(j=n.RGB32UI),k===n.BYTE&&(j=n.RGB8I),k===n.SHORT&&(j=n.RGB16I),k===n.INT&&(j=n.RGB32I)),M===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),k===n.UNSIGNED_INT&&(j=n.RGBA32UI),k===n.BYTE&&(j=n.RGBA8I),k===n.SHORT&&(j=n.RGBA16I),k===n.INT&&(j=n.RGBA32I)),M===n.RGB&&k===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),M===n.RGBA){const be=ne?Fs:Qe.getTransfer($);k===n.FLOAT&&(j=n.RGBA32F),k===n.HALF_FLOAT&&(j=n.RGBA16F),k===n.UNSIGNED_BYTE&&(j=be===nt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function v(A,M){let k;return A?M===null||M===gi||M===zr?k=n.DEPTH24_STENCIL8:M===pn?k=n.DEPTH32F_STENCIL8:M===Br&&(k=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===gi||M===zr?k=n.DEPTH_COMPONENT24:M===pn?k=n.DEPTH_COMPONENT32F:M===Br&&(k=n.DEPTH_COMPONENT16),k}function T(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Yt&&A.minFilter!==fn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function w(A){const M=A.target;M.removeEventListener("dispose",w),C(M),M.isVideoTexture&&u.delete(M)}function R(A){const M=A.target;M.removeEventListener("dispose",R),y(M)}function C(A){const M=i.get(A);if(M.__webglInit===void 0)return;const k=A.source,$=h.get(k);if($){const ne=$[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&S(A),Object.keys($).length===0&&h.delete(k)}i.remove(A)}function S(A){const M=i.get(A);n.deleteTexture(M.__webglTexture);const k=A.source,$=h.get(k);delete $[M.__cacheKey],o.memory.textures--}function y(A){const M=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(M.__webglFramebuffer[$]))for(let ne=0;ne<M.__webglFramebuffer[$].length;ne++)n.deleteFramebuffer(M.__webglFramebuffer[$][ne]);else n.deleteFramebuffer(M.__webglFramebuffer[$]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[$])}else{if(Array.isArray(M.__webglFramebuffer))for(let $=0;$<M.__webglFramebuffer.length;$++)n.deleteFramebuffer(M.__webglFramebuffer[$]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let $=0;$<M.__webglColorRenderbuffer.length;$++)M.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[$]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=A.textures;for(let $=0,ne=k.length;$<ne;$++){const j=i.get(k[$]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(k[$])}i.remove(A)}let I=0;function N(){I=0}function L(){const A=I;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),I+=1,A}function F(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function q(A,M){const k=i.get(A);if(A.isVideoTexture&&he(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&k.__version!==A.version){const $=A.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(k,A,M);return}}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+M)}function V(A,M){const k=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){de(k,A,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+M)}function J(A,M){const k=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){de(k,A,M);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+M)}function D(A,M){const k=i.get(A);if(A.version>0&&k.__version!==A.version){se(k,A,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+M)}const Q={[ia]:n.REPEAT,[li]:n.CLAMP_TO_EDGE,[ra]:n.MIRRORED_REPEAT},G={[Yt]:n.NEAREST,[oh]:n.NEAREST_MIPMAP_NEAREST,[Jr]:n.NEAREST_MIPMAP_LINEAR,[fn]:n.LINEAR,[eo]:n.LINEAR_MIPMAP_NEAREST,[ui]:n.LINEAR_MIPMAP_LINEAR},ae={[uh]:n.NEVER,[gh]:n.ALWAYS,[dh]:n.LESS,[bu]:n.LEQUAL,[hh]:n.EQUAL,[mh]:n.GEQUAL,[fh]:n.GREATER,[ph]:n.NOTEQUAL};function fe(A,M){if(M.type===pn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===fn||M.magFilter===eo||M.magFilter===Jr||M.magFilter===ui||M.minFilter===fn||M.minFilter===eo||M.minFilter===Jr||M.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Q[M.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Q[M.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Q[M.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,G[M.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,G[M.minFilter]),M.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,ae[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Yt||M.minFilter!==Jr&&M.minFilter!==ui||M.type===pn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function He(A,M){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",w));const $=M.source;let ne=h.get($);ne===void 0&&(ne={},h.set($,ne));const j=F(M);if(j!==A.__cacheKey){ne[j]===void 0&&(ne[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ne[j].usedTimes++;const be=ne[A.__cacheKey];be!==void 0&&(ne[A.__cacheKey].usedTimes--,be.usedTimes===0&&S(M)),A.__cacheKey=j,A.__webglTexture=ne[j].texture}return k}function Ue(A,M,k){return Math.floor(Math.floor(A/k)/M)}function W(A,M,k,$){const j=A.updateRanges;if(j.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,k,$,M.data);else{j.sort((oe,me)=>oe.start-me.start);let be=0;for(let oe=1;oe<j.length;oe++){const me=j[be],De=j[oe],Ce=me.start+me.count,_e=Ue(De.start,M.width,4),Oe=Ue(me.start,M.width,4);De.start<=Ce+1&&_e===Oe&&Ue(De.start+De.count-1,M.width,4)===_e?me.count=Math.max(me.count,De.start+De.count-me.start):(++be,j[be]=De)}j.length=be+1;const ce=n.getParameter(n.UNPACK_ROW_LENGTH),Re=n.getParameter(n.UNPACK_SKIP_PIXELS),Ie=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let oe=0,me=j.length;oe<me;oe++){const De=j[oe],Ce=Math.floor(De.start/4),_e=Math.ceil(De.count/4),Oe=Ce%M.width,U=Math.floor(Ce/M.width),ie=_e,pe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Oe),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Oe,U,ie,pe,k,$,M.data)}A.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ce),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Re),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ie)}}function de(A,M,k){let $=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&($=n.TEXTURE_3D);const ne=He(A,M),j=M.source;t.bindTexture($,A.__webglTexture,n.TEXTURE0+k);const be=i.get(j);if(j.version!==be.__version||ne===!0){t.activeTexture(n.TEXTURE0+k);const ce=Qe.getPrimaries(Qe.workingColorSpace),Re=M.colorSpace===Vn?null:Qe.getPrimaries(M.colorSpace),Ie=M.colorSpace===Vn||ce===Re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let oe=_(M.image,!1,r.maxTextureSize);oe=Ke(M,oe);const me=s.convert(M.format,M.colorSpace),De=s.convert(M.type);let Ce=x(M.internalFormat,me,De,M.colorSpace,M.isVideoTexture);fe($,M);let _e;const Oe=M.mipmaps,U=M.isVideoTexture!==!0,ie=be.__version===void 0||ne===!0,pe=j.dataReady,Ee=T(M,oe);if(M.isDepthTexture)Ce=v(M.format===Hr,M.type),ie&&(U?t.texStorage2D(n.TEXTURE_2D,1,Ce,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,Ce,oe.width,oe.height,0,me,De,null));else if(M.isDataTexture)if(Oe.length>0){U&&ie&&t.texStorage2D(n.TEXTURE_2D,Ee,Ce,Oe[0].width,Oe[0].height);for(let re=0,te=Oe.length;re<te;re++)_e=Oe[re],U?pe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,_e.width,_e.height,me,De,_e.data):t.texImage2D(n.TEXTURE_2D,re,Ce,_e.width,_e.height,0,me,De,_e.data);M.generateMipmaps=!1}else U?(ie&&t.texStorage2D(n.TEXTURE_2D,Ee,Ce,oe.width,oe.height),pe&&W(M,oe,me,De)):t.texImage2D(n.TEXTURE_2D,0,Ce,oe.width,oe.height,0,me,De,oe.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){U&&ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Ce,Oe[0].width,Oe[0].height,oe.depth);for(let re=0,te=Oe.length;re<te;re++)if(_e=Oe[re],M.format!==on)if(me!==null)if(U){if(pe)if(M.layerUpdates.size>0){const Pe=rl(_e.width,_e.height,M.format,M.type);for(const ze of M.layerUpdates){const st=_e.data.subarray(ze*Pe/_e.data.BYTES_PER_ELEMENT,(ze+1)*Pe/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,ze,_e.width,_e.height,1,me,st)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,_e.width,_e.height,oe.depth,me,_e.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ce,_e.width,_e.height,oe.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?pe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,_e.width,_e.height,oe.depth,me,De,_e.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ce,_e.width,_e.height,oe.depth,0,me,De,_e.data)}else{U&&ie&&t.texStorage2D(n.TEXTURE_2D,Ee,Ce,Oe[0].width,Oe[0].height);for(let re=0,te=Oe.length;re<te;re++)_e=Oe[re],M.format!==on?me!==null?U?pe&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,_e.width,_e.height,me,_e.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ce,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?pe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,_e.width,_e.height,me,De,_e.data):t.texImage2D(n.TEXTURE_2D,re,Ce,_e.width,_e.height,0,me,De,_e.data)}else if(M.isDataArrayTexture)if(U){if(ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Ce,oe.width,oe.height,oe.depth),pe)if(M.layerUpdates.size>0){const re=rl(oe.width,oe.height,M.format,M.type);for(const te of M.layerUpdates){const Pe=oe.data.subarray(te*re/oe.data.BYTES_PER_ELEMENT,(te+1)*re/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,te,oe.width,oe.height,1,me,De,Pe)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,me,De,oe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,oe.width,oe.height,oe.depth,0,me,De,oe.data);else if(M.isData3DTexture)U?(ie&&t.texStorage3D(n.TEXTURE_3D,Ee,Ce,oe.width,oe.height,oe.depth),pe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,me,De,oe.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,oe.width,oe.height,oe.depth,0,me,De,oe.data);else if(M.isFramebufferTexture){if(ie)if(U)t.texStorage2D(n.TEXTURE_2D,Ee,Ce,oe.width,oe.height);else{let re=oe.width,te=oe.height;for(let Pe=0;Pe<Ee;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,Ce,re,te,0,me,De,null),re>>=1,te>>=1}}else if(Oe.length>0){if(U&&ie){const re=Xe(Oe[0]);t.texStorage2D(n.TEXTURE_2D,Ee,Ce,re.width,re.height)}for(let re=0,te=Oe.length;re<te;re++)_e=Oe[re],U?pe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,me,De,_e):t.texImage2D(n.TEXTURE_2D,re,Ce,me,De,_e);M.generateMipmaps=!1}else if(U){if(ie){const re=Xe(oe);t.texStorage2D(n.TEXTURE_2D,Ee,Ce,re.width,re.height)}pe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me,De,oe)}else t.texImage2D(n.TEXTURE_2D,0,Ce,me,De,oe);p(M)&&f($),be.__version=j.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function se(A,M,k){if(M.image.length!==6)return;const $=He(A,M),ne=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+k);const j=i.get(ne);if(ne.version!==j.__version||$===!0){t.activeTexture(n.TEXTURE0+k);const be=Qe.getPrimaries(Qe.workingColorSpace),ce=M.colorSpace===Vn?null:Qe.getPrimaries(M.colorSpace),Re=M.colorSpace===Vn||be===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Ie=M.isCompressedTexture||M.image[0].isCompressedTexture,oe=M.image[0]&&M.image[0].isDataTexture,me=[];for(let te=0;te<6;te++)!Ie&&!oe?me[te]=_(M.image[te],!0,r.maxCubemapSize):me[te]=oe?M.image[te].image:M.image[te],me[te]=Ke(M,me[te]);const De=me[0],Ce=s.convert(M.format,M.colorSpace),_e=s.convert(M.type),Oe=x(M.internalFormat,Ce,_e,M.colorSpace),U=M.isVideoTexture!==!0,ie=j.__version===void 0||$===!0,pe=ne.dataReady;let Ee=T(M,De);fe(n.TEXTURE_CUBE_MAP,M);let re;if(Ie){U&&ie&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Oe,De.width,De.height);for(let te=0;te<6;te++){re=me[te].mipmaps;for(let Pe=0;Pe<re.length;Pe++){const ze=re[Pe];M.format!==on?Ce!==null?U?pe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,0,0,ze.width,ze.height,Ce,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,Oe,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,0,0,ze.width,ze.height,Ce,_e,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe,Oe,ze.width,ze.height,0,Ce,_e,ze.data)}}}else{if(re=M.mipmaps,U&&ie){re.length>0&&Ee++;const te=Xe(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,Oe,te.width,te.height)}for(let te=0;te<6;te++)if(oe){U?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,me[te].width,me[te].height,Ce,_e,me[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Oe,me[te].width,me[te].height,0,Ce,_e,me[te].data);for(let Pe=0;Pe<re.length;Pe++){const st=re[Pe].image[te].image;U?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,0,0,st.width,st.height,Ce,_e,st.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,Oe,st.width,st.height,0,Ce,_e,st.data)}}else{U?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce,_e,me[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Oe,Ce,_e,me[te]);for(let Pe=0;Pe<re.length;Pe++){const ze=re[Pe];U?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,0,0,Ce,_e,ze.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Pe+1,Oe,Ce,_e,ze.image[te])}}}p(M)&&f(n.TEXTURE_CUBE_MAP),j.__version=ne.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Ae(A,M,k,$,ne,j){const be=s.convert(k.format,k.colorSpace),ce=s.convert(k.type),Re=x(k.internalFormat,be,ce,k.colorSpace),Ie=i.get(M),oe=i.get(k);if(oe.__renderTarget=M,!Ie.__hasExternalTextures){const me=Math.max(1,M.width>>j),De=Math.max(1,M.height>>j);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,j,Re,me,De,M.depth,0,be,ce,null):t.texImage2D(ne,j,Re,me,De,0,be,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),K(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,ne,oe.__webglTexture,0,xe(M)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,ne,oe.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function we(A,M,k){if(n.bindRenderbuffer(n.RENDERBUFFER,A),M.depthBuffer){const $=M.depthTexture,ne=$&&$.isDepthTexture?$.type:null,j=v(M.stencilBuffer,ne),be=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=xe(M);K(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce,j,M.width,M.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,j,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,j,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,A)}else{const $=M.textures;for(let ne=0;ne<$.length;ne++){const j=$[ne],be=s.convert(j.format,j.colorSpace),ce=s.convert(j.type),Re=x(j.internalFormat,be,ce,j.colorSpace),Ie=xe(M);k&&K(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie,Re,M.width,M.height):K(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ie,Re,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Re,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function H(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(M.depthTexture);$.__renderTarget=M,(!$.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const ne=$.__webglTexture,j=xe(M);if(M.depthTexture.format===kr)K(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(M.depthTexture.format===Hr)K(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Z(A){const M=i.get(A),k=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const $=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),$){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,$.removeEventListener("dispose",ne)};$.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=$}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const $=A.texture.mipmaps;$&&$.length>0?H(M.__webglFramebuffer[0],A):H(M.__webglFramebuffer,A)}else if(k){M.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[$]),M.__webglDepthbuffer[$]===void 0)M.__webglDepthbuffer[$]=n.createRenderbuffer(),we(M.__webglDepthbuffer[$],A,!1);else{const ne=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=M.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,j)}}else{const $=A.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),we(M.__webglDepthbuffer,A,!1);else{const ne=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,j)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ee(A,M,k){const $=i.get(A);M!==void 0&&Ae($.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Z(A)}function P(A){const M=A.texture,k=i.get(A),$=i.get(M);A.addEventListener("dispose",R);const ne=A.textures,j=A.isWebGLCubeRenderTarget===!0,be=ne.length>1;if(be||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=M.version,o.memory.textures++),j){k.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[ce]=[];for(let Re=0;Re<M.mipmaps.length;Re++)k.__webglFramebuffer[ce][Re]=n.createFramebuffer()}else k.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let ce=0;ce<M.mipmaps.length;ce++)k.__webglFramebuffer[ce]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(be)for(let ce=0,Re=ne.length;ce<Re;ce++){const Ie=i.get(ne[ce]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&K(A)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ce=0;ce<ne.length;ce++){const Re=ne[ce];k.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[ce]);const Ie=s.convert(Re.format,Re.colorSpace),oe=s.convert(Re.type),me=x(Re.internalFormat,Ie,oe,Re.colorSpace,A.isXRRenderTarget===!0),De=xe(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,me,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,k.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),we(k.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),fe(n.TEXTURE_CUBE_MAP,M);for(let ce=0;ce<6;ce++)if(M.mipmaps&&M.mipmaps.length>0)for(let Re=0;Re<M.mipmaps.length;Re++)Ae(k.__webglFramebuffer[ce][Re],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Re);else Ae(k.__webglFramebuffer[ce],A,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);p(M)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ce=0,Re=ne.length;ce<Re;ce++){const Ie=ne[ce],oe=i.get(Ie);let me=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(me=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,oe.__webglTexture),fe(me,Ie),Ae(k.__webglFramebuffer,A,Ie,n.COLOR_ATTACHMENT0+ce,me,0),p(Ie)&&f(me)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ce=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,$.__webglTexture),fe(ce,M),M.mipmaps&&M.mipmaps.length>0)for(let Re=0;Re<M.mipmaps.length;Re++)Ae(k.__webglFramebuffer[Re],A,M,n.COLOR_ATTACHMENT0,ce,Re);else Ae(k.__webglFramebuffer,A,M,n.COLOR_ATTACHMENT0,ce,0);p(M)&&f(ce),t.unbindTexture()}A.depthBuffer&&Z(A)}function Me(A){const M=A.textures;for(let k=0,$=M.length;k<$;k++){const ne=M[k];if(p(ne)){const j=E(A),be=i.get(ne).__webglTexture;t.bindTexture(j,be),f(j),t.unbindTexture()}}}const le=[],ye=[];function ge(A){if(A.samples>0){if(K(A)===!1){const M=A.textures,k=A.width,$=A.height;let ne=n.COLOR_BUFFER_BIT;const j=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(A),ce=M.length>1;if(ce)for(let Ie=0;Ie<M.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const Re=A.texture.mipmaps;Re&&Re.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ie=0;Ie<M.length;Ie++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ie]);const oe=i.get(M[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,k,$,0,0,k,$,ne,n.NEAREST),l===!0&&(le.length=0,ye.length=0,le.push(n.COLOR_ATTACHMENT0+Ie),A.depthBuffer&&A.resolveDepthBuffer===!1&&(le.push(j),ye.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ye)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,le))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Ie=0;Ie<M.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ie]);const oe=i.get(M[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function xe(A){return Math.min(r.maxSamples,A.samples)}function K(A){const M=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function he(A){const M=o.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function Ke(A,M){const k=A.colorSpace,$=A.format,ne=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==rr&&k!==Vn&&(Qe.getTransfer(k)===nt?($!==on||ne!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function Xe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=q,this.setTexture2DArray=V,this.setTexture3D=J,this.setTextureCube=D,this.rebindTextures=ee,this.setupRenderTarget=P,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=K}function N0(n,e){function t(i,r=Vn){let s;const o=Qe.getTransfer(r);if(i===gn)return n.UNSIGNED_BYTE;if(i===$a)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ka)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===gu)return n.BYTE;if(i===_u)return n.SHORT;if(i===Br)return n.UNSIGNED_SHORT;if(i===Za)return n.INT;if(i===gi)return n.UNSIGNED_INT;if(i===pn)return n.FLOAT;if(i===Gr)return n.HALF_FLOAT;if(i===xu)return n.ALPHA;if(i===Mu)return n.RGB;if(i===on)return n.RGBA;if(i===kr)return n.DEPTH_COMPONENT;if(i===Hr)return n.DEPTH_STENCIL;if(i===ja)return n.RED;if(i===Ja)return n.RED_INTEGER;if(i===Su)return n.RG;if(i===Qa)return n.RG_INTEGER;if(i===ec)return n.RGBA_INTEGER;if(i===Cs||i===Ps||i===Is||i===Ls)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Cs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Cs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ps)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Is)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ls)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sa||i===oa||i===aa||i===ca)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===sa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===oa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===aa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ca)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===la||i===ua||i===da)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===la||i===ua)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===da)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ha||i===fa||i===pa||i===ma||i===ga||i===_a||i===va||i===xa||i===Ma||i===Sa||i===ya||i===Ea||i===ba||i===Ta)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ha)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ma)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ga)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_a)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===va)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ma)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Sa)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ya)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ea)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ba)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ta)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ds||i===Aa||i===wa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ds)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Aa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===yu||i===Ra||i===Ca||i===Pa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ds)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ra)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ca)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Hu extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const F0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O0=`
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

}`;class B0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Hu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Dn({vertexShader:F0,fragmentShader:O0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new We(new Ws(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class z0 extends ur{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,m=null,g=null;const _=new B0,p={},f=t.getContextAttributes();let E=null,x=null;const v=[],T=[],w=new Ye;let R=null;const C=new nn;C.viewport=new mt;const S=new nn;S.viewport=new mt;const y=[C,S],I=new sf;let N=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let de=v[W];return de===void 0&&(de=new bo,v[W]=de),de.getTargetRaySpace()},this.getControllerGrip=function(W){let de=v[W];return de===void 0&&(de=new bo,v[W]=de),de.getGripSpace()},this.getHand=function(W){let de=v[W];return de===void 0&&(de=new bo,v[W]=de),de.getHandSpace()};function F(W){const de=T.indexOf(W.inputSource);if(de===-1)return;const se=v[de];se!==void 0&&(se.update(W.inputSource,W.frame,c||o),se.dispatchEvent({type:W.type,data:W.inputSource}))}function q(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",V);for(let W=0;W<v.length;W++){const de=T[W];de!==null&&(T[W]=null,v[W].disconnect(de))}N=null,L=null,_.reset();for(const W in p)delete p[W];e.setRenderTarget(E),m=null,h=null,d=null,r=null,x=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",q),r.addEventListener("inputsourceschange",V),f.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(w),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(r,t)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Ae=null,we=null;f.depth&&(we=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=f.stencil?Hr:kr,Ae=f.stencil?zr:gi);const H={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};h=d.createProjectionLayer(H),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new _i(h.textureWidth,h.textureHeight,{format:on,type:gn,depthTexture:new Uu(h.textureWidth,h.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const se={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new _i(m.framebufferWidth,m.framebufferHeight,{format:on,type:gn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ue.setContext(r),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function V(W){for(let de=0;de<W.removed.length;de++){const se=W.removed[de],Ae=T.indexOf(se);Ae>=0&&(T[Ae]=null,v[Ae].disconnect(se))}for(let de=0;de<W.added.length;de++){const se=W.added[de];let Ae=T.indexOf(se);if(Ae===-1){for(let H=0;H<v.length;H++)if(H>=T.length){T.push(se),Ae=H;break}else if(T[H]===null){T[H]=se,Ae=H;break}if(Ae===-1)break}const we=v[Ae];we&&we.connect(se)}}const J=new z,D=new z;function Q(W,de,se){J.setFromMatrixPosition(de.matrixWorld),D.setFromMatrixPosition(se.matrixWorld);const Ae=J.distanceTo(D),we=de.projectionMatrix.elements,H=se.projectionMatrix.elements,Z=we[14]/(we[10]-1),ee=we[14]/(we[10]+1),P=(we[9]+1)/we[5],Me=(we[9]-1)/we[5],le=(we[8]-1)/we[0],ye=(H[8]+1)/H[0],ge=Z*le,xe=Z*ye,K=Ae/(-le+ye),he=K*-le;if(de.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(he),W.translateZ(K),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),we[10]===-1)W.projectionMatrix.copy(de.projectionMatrix),W.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const Ke=Z+K,Xe=ee+K,A=ge-he,M=xe+(Ae-he),k=P*ee/Xe*Ke,$=Me*ee/Xe*Ke;W.projectionMatrix.makePerspective(A,M,k,$,Ke,Xe),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function G(W,de){de===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(de.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let de=W.near,se=W.far;_.texture!==null&&(_.depthNear>0&&(de=_.depthNear),_.depthFar>0&&(se=_.depthFar)),I.near=S.near=C.near=de,I.far=S.far=C.far=se,(N!==I.near||L!==I.far)&&(r.updateRenderState({depthNear:I.near,depthFar:I.far}),N=I.near,L=I.far),I.layers.mask=W.layers.mask|6,C.layers.mask=I.layers.mask&3,S.layers.mask=I.layers.mask&5;const Ae=W.parent,we=I.cameras;G(I,Ae);for(let H=0;H<we.length;H++)G(we[H],Ae);we.length===2?Q(I,C,S):I.projectionMatrix.copy(C.projectionMatrix),ae(W,I,Ae)};function ae(W,de,se){se===null?W.matrix.copy(de.matrixWorld):(W.matrix.copy(se.matrixWorld),W.matrix.invert(),W.matrix.multiply(de.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(de.projectionMatrix),W.projectionMatrixInverse.copy(de.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ia*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(I)},this.getCameraTexture=function(W){return p[W]};let fe=null;function He(W,de){if(u=de.getViewerPose(c||o),g=de,u!==null){const se=u.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let Ae=!1;se.length!==I.cameras.length&&(I.cameras.length=0,Ae=!0);for(let ee=0;ee<se.length;ee++){const P=se[ee];let Me=null;if(m!==null)Me=m.getViewport(P);else{const ye=d.getViewSubImage(h,P);Me=ye.viewport,ee===0&&(e.setRenderTargetTextures(x,ye.colorTexture,ye.depthStencilTexture),e.setRenderTarget(x))}let le=y[ee];le===void 0&&(le=new nn,le.layers.enable(ee),le.viewport=new mt,y[ee]=le),le.matrix.fromArray(P.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(P.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Me.x,Me.y,Me.width,Me.height),ee===0&&(I.matrix.copy(le.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ae===!0&&I.cameras.push(le)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const ee=d.getDepthInformation(se[0]);ee&&ee.isValid&&ee.texture&&_.init(ee,r.renderState)}if(we&&we.includes("camera-access")&&(e.state.unbindTexture(),d))for(let ee=0;ee<se.length;ee++){const P=se[ee].camera;if(P){let Me=p[P];Me||(Me=new Hu,p[P]=Me);const le=d.getCameraImage(P);Me.sourceTexture=le}}}for(let se=0;se<v.length;se++){const Ae=T[se],we=v[se];Ae!==null&&we!==void 0&&we.update(Ae,de,c||o)}fe&&fe(W,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),g=null}const Ue=new Fu;Ue.setAnimationLoop(He),this.setAnimationLoop=function(W){fe=W},this.dispose=function(){}}}const ni=new _n,k0=new ot;function H0(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Pu(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,E,x,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),d(p,f)):f.isMeshPhongMaterial?(s(p,f),u(p,f)):f.isMeshStandardMaterial?(s(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,v)):f.isMeshMatcapMaterial?(s(p,f),g(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),_(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,E,x):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ht&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ht&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const E=e.get(f),x=E.envMap,v=E.envMapRotation;x&&(p.envMap.value=x,ni.copy(v),ni.x*=-1,ni.y*=-1,ni.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),p.envMapRotation.value.setFromMatrix4(k0.makeRotationFromEuler(ni)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,E,x){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*E,p.scale.value=x*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,E){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ht&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function _(p,f){const E=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function V0(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,x){const v=x.program;i.uniformBlockBinding(E,v)}function c(E,x){let v=r[E.id];v===void 0&&(g(E),v=u(E),r[E.id]=v,E.addEventListener("dispose",p));const T=x.program;i.updateUBOMapping(E,T);const w=e.render.frame;s[E.id]!==w&&(h(E),s[E.id]=w)}function u(E){const x=d();E.__bindingPointIndex=x;const v=n.createBuffer(),T=E.__size,w=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,T,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,v),v}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const x=r[E.id],v=E.uniforms,T=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let w=0,R=v.length;w<R;w++){const C=Array.isArray(v[w])?v[w]:[v[w]];for(let S=0,y=C.length;S<y;S++){const I=C[S];if(m(I,w,S,T)===!0){const N=I.__offset,L=Array.isArray(I.value)?I.value:[I.value];let F=0;for(let q=0;q<L.length;q++){const V=L[q],J=_(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,N+F,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,F),F+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,x,v,T){const w=E.value,R=x+"_"+v;if(T[R]===void 0)return typeof w=="number"||typeof w=="boolean"?T[R]=w:T[R]=w.clone(),!0;{const C=T[R];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return T[R]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function g(E){const x=E.uniforms;let v=0;const T=16;for(let R=0,C=x.length;R<C;R++){const S=Array.isArray(x[R])?x[R]:[x[R]];for(let y=0,I=S.length;y<I;y++){const N=S[y],L=Array.isArray(N.value)?N.value:[N.value];for(let F=0,q=L.length;F<q;F++){const V=L[F],J=_(V),D=v%T,Q=D%J.boundary,G=D+Q;v+=Q,G!==0&&T-G<J.storage&&(v+=T-G),N.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=J.storage}}}const w=v%T;return w>0&&(v+=T-w),E.__size=v,E.__cache={},this}function _(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function p(E){const x=E.target;x.removeEventListener("dispose",p);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function f(){for(const E in r)n.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class G0{constructor(e={}){const{canvas:t=vh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,f=null;const E=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let T=!1;this._outputColorSpace=qt;let w=0,R=0,C=null,S=-1,y=null;const I=new mt,N=new mt;let L=null;const F=new $e(0);let q=0,V=t.width,J=t.height,D=1,Q=null,G=null;const ae=new mt(0,0,V,J),fe=new mt(0,0,V,J);let He=!1;const Ue=new sc;let W=!1,de=!1;const se=new ot,Ae=new z,we=new mt,H={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function ee(){return C===null?D:1}let P=i;function Me(b,O){return t.getContext(b,O)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ya}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",re,!1),P===null){const O="webgl2";if(P=Me(O,b),P===null)throw Me(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let le,ye,ge,xe,K,he,Ke,Xe,A,M,k,$,ne,j,be,ce,Re,Ie,oe,me,De,Ce,_e,Oe;function U(){le=new Qm(P),le.init(),Ce=new N0(P,le),ye=new qm(P,le,e,Ce),ge=new D0(P,le),ye.reversedDepthBuffer&&h&&ge.buffers.depth.setReversed(!0),xe=new ng(P),K=new M0,he=new U0(P,le,ge,K,ye,Ce,xe),Ke=new Zm(v),Xe=new Jm(v),A=new cf(P),_e=new Wm(P,A),M=new eg(P,A,xe,_e),k=new rg(P,M,A,xe),oe=new ig(P,ye,he),ce=new Ym(K),$=new x0(v,Ke,Xe,le,ye,_e,ce),ne=new H0(v,K),j=new y0,be=new R0(le),Ie=new Gm(v,Ke,Xe,ge,k,m,l),Re=new I0(v,k,ye),Oe=new V0(P,xe,ye,ge),me=new Xm(P,le,xe),De=new tg(P,le,xe),xe.programs=$.programs,v.capabilities=ye,v.extensions=le,v.properties=K,v.renderLists=j,v.shadowMap=Re,v.state=ge,v.info=xe}U();const ie=new z0(v,P);this.xr=ie,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=le.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=le.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(b){b!==void 0&&(D=b,this.setSize(V,J,!1))},this.getSize=function(b){return b.set(V,J)},this.setSize=function(b,O,X=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,J=O,t.width=Math.floor(b*D),t.height=Math.floor(O*D),X===!0&&(t.style.width=b+"px",t.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(V*D,J*D).floor()},this.setDrawingBufferSize=function(b,O,X){V=b,J=O,D=X,t.width=Math.floor(b*X),t.height=Math.floor(O*X),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(ae)},this.setViewport=function(b,O,X,Y){b.isVector4?ae.set(b.x,b.y,b.z,b.w):ae.set(b,O,X,Y),ge.viewport(I.copy(ae).multiplyScalar(D).round())},this.getScissor=function(b){return b.copy(fe)},this.setScissor=function(b,O,X,Y){b.isVector4?fe.set(b.x,b.y,b.z,b.w):fe.set(b,O,X,Y),ge.scissor(N.copy(fe).multiplyScalar(D).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(b){ge.setScissorTest(He=b)},this.setOpaqueSort=function(b){Q=b},this.setTransparentSort=function(b){G=b},this.getClearColor=function(b){return b.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,X=!0){let Y=0;if(b){let B=!1;if(C!==null){const ue=C.texture.format;B=ue===ec||ue===Qa||ue===Ja}if(B){const ue=C.texture.type,Se=ue===gn||ue===gi||ue===Br||ue===zr||ue===$a||ue===Ka,Le=Ie.getClearColor(),Te=Ie.getClearAlpha(),Be=Le.r,ke=Le.g,Ne=Le.b;Se?(g[0]=Be,g[1]=ke,g[2]=Ne,g[3]=Te,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=Be,_[1]=ke,_[2]=Ne,_[3]=Te,P.clearBufferiv(P.COLOR,0,_))}else Y|=P.COLOR_BUFFER_BIT}O&&(Y|=P.DEPTH_BUFFER_BIT),X&&(Y|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Ie.dispose(),j.dispose(),be.dispose(),K.dispose(),Ke.dispose(),Xe.dispose(),k.dispose(),_e.dispose(),Oe.dispose(),$.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",ln),ie.removeEventListener("sessionend",gc),$n.stop()};function pe(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const b=xe.autoReset,O=Re.enabled,X=Re.autoUpdate,Y=Re.needsUpdate,B=Re.type;U(),xe.autoReset=b,Re.enabled=O,Re.autoUpdate=X,Re.needsUpdate=Y,Re.type=B}function re(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function te(b){const O=b.target;O.removeEventListener("dispose",te),Pe(O)}function Pe(b){ze(b),K.remove(b)}function ze(b){const O=K.get(b).programs;O!==void 0&&(O.forEach(function(X){$.releaseProgram(X)}),b.isShaderMaterial&&$.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,X,Y,B,ue){O===null&&(O=H);const Se=B.isMesh&&B.matrixWorld.determinant()<0,Le=od(b,O,X,Y,B);ge.setMaterial(Y,Se);let Te=X.index,Be=1;if(Y.wireframe===!0){if(Te=M.getWireframeAttribute(X),Te===void 0)return;Be=2}const ke=X.drawRange,Ne=X.attributes.position;let qe=ke.start*Be,tt=(ke.start+ke.count)*Be;ue!==null&&(qe=Math.max(qe,ue.start*Be),tt=Math.min(tt,(ue.start+ue.count)*Be)),Te!==null?(qe=Math.max(qe,0),tt=Math.min(tt,Te.count)):Ne!=null&&(qe=Math.max(qe,0),tt=Math.min(tt,Ne.count));const ht=tt-qe;if(ht<0||ht===1/0)return;_e.setup(B,Y,Le,X,Te);let at,it=me;if(Te!==null&&(at=A.get(Te),it=De,it.setIndex(at)),B.isMesh)Y.wireframe===!0?(ge.setLineWidth(Y.wireframeLinewidth*ee()),it.setMode(P.LINES)):it.setMode(P.TRIANGLES);else if(B.isLine){let Fe=Y.linewidth;Fe===void 0&&(Fe=1),ge.setLineWidth(Fe*ee()),B.isLineSegments?it.setMode(P.LINES):B.isLineLoop?it.setMode(P.LINE_LOOP):it.setMode(P.LINE_STRIP)}else B.isPoints?it.setMode(P.POINTS):B.isSprite&&it.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ji("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),it.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(le.get("WEBGL_multi_draw"))it.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Fe=B._multiDrawStarts,ut=B._multiDrawCounts,Je=B._multiDrawCount,Vt=Te?A.get(Te).bytesPerElement:1,Mi=K.get(Y).currentProgram.getUniforms();for(let Gt=0;Gt<Je;Gt++)Mi.setValue(P,"_gl_DrawID",Gt),it.render(Fe[Gt]/Vt,ut[Gt])}else if(B.isInstancedMesh)it.renderInstances(qe,ht,B.count);else if(X.isInstancedBufferGeometry){const Fe=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ut=Math.min(X.instanceCount,Fe);it.renderInstances(qe,ht,ut)}else it.render(qe,ht)};function st(b,O,X){b.transparent===!0&&b.side===Pt&&b.forceSinglePass===!1?(b.side=Ht,b.needsUpdate=!0,Yr(b,O,X),b.side=Yn,b.needsUpdate=!0,Yr(b,O,X),b.side=Pt):Yr(b,O,X)}this.compile=function(b,O,X=null){X===null&&(X=b),f=be.get(X),f.init(O),x.push(f),X.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),b!==X&&b.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),f.setupLights();const Y=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ue=B.material;if(ue)if(Array.isArray(ue))for(let Se=0;Se<ue.length;Se++){const Le=ue[Se];st(Le,X,B),Y.add(Le)}else st(ue,X,B),Y.add(ue)}),f=x.pop(),Y},this.compileAsync=function(b,O,X=null){const Y=this.compile(b,O,X);return new Promise(B=>{function ue(){if(Y.forEach(function(Se){K.get(Se).currentProgram.isReady()&&Y.delete(Se)}),Y.size===0){B(b);return}setTimeout(ue,10)}le.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let et=null;function vn(b){et&&et(b)}function ln(){$n.stop()}function gc(){$n.start()}const $n=new Fu;$n.setAnimationLoop(vn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(b){et=b,ie.setAnimationLoop(b),b===null?$n.stop():$n.start()},ie.addEventListener("sessionstart",ln),ie.addEventListener("sessionend",gc),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(O),O=ie.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,O,C),f=be.get(b,x.length),f.init(O),x.push(f),se.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ue.setFromProjectionMatrix(se,mn,O.reversedDepth),de=this.localClippingEnabled,W=ce.init(this.clippingPlanes,de),p=j.get(b,E.length),p.init(),E.push(p),ie.enabled===!0&&ie.isPresenting===!0){const ue=v.xr.getDepthSensingMesh();ue!==null&&Zs(ue,O,-1/0,v.sortObjects)}Zs(b,O,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(Q,G),Z=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Z&&Ie.addToRenderList(p,b),this.info.render.frame++,W===!0&&ce.beginShadows();const X=f.state.shadowsArray;Re.render(X,b,O),W===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=p.opaque,B=p.transmissive;if(f.setupLights(),O.isArrayCamera){const ue=O.cameras;if(B.length>0)for(let Se=0,Le=ue.length;Se<Le;Se++){const Te=ue[Se];vc(Y,B,b,Te)}Z&&Ie.render(b);for(let Se=0,Le=ue.length;Se<Le;Se++){const Te=ue[Se];_c(p,b,Te,Te.viewport)}}else B.length>0&&vc(Y,B,b,O),Z&&Ie.render(b),_c(p,b,O);C!==null&&R===0&&(he.updateMultisampleRenderTarget(C),he.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(v,b,O),_e.resetDefaultState(),S=-1,y=null,x.pop(),x.length>0?(f=x[x.length-1],W===!0&&ce.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?p=E[E.length-1]:p=null};function Zs(b,O,X,Y){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Ue.intersectsSprite(b)){Y&&we.setFromMatrixPosition(b.matrixWorld).applyMatrix4(se);const Se=k.update(b),Le=b.material;Le.visible&&p.push(b,Se,Le,X,we.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Ue.intersectsObject(b))){const Se=k.update(b),Le=b.material;if(Y&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),we.copy(b.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),we.copy(Se.boundingSphere.center)),we.applyMatrix4(b.matrixWorld).applyMatrix4(se)),Array.isArray(Le)){const Te=Se.groups;for(let Be=0,ke=Te.length;Be<ke;Be++){const Ne=Te[Be],qe=Le[Ne.materialIndex];qe&&qe.visible&&p.push(b,Se,qe,X,we.z,Ne)}}else Le.visible&&p.push(b,Se,Le,X,we.z,null)}}const ue=b.children;for(let Se=0,Le=ue.length;Se<Le;Se++)Zs(ue[Se],O,X,Y)}function _c(b,O,X,Y){const B=b.opaque,ue=b.transmissive,Se=b.transparent;f.setupLightsView(X),W===!0&&ce.setGlobalState(v.clippingPlanes,X),Y&&ge.viewport(I.copy(Y)),B.length>0&&qr(B,O,X),ue.length>0&&qr(ue,O,X),Se.length>0&&qr(Se,O,X),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function vc(b,O,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[Y.id]===void 0&&(f.state.transmissionRenderTarget[Y.id]=new _i(1,1,{generateMipmaps:!0,type:le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float")?Gr:gn,minFilter:ui,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ue=f.state.transmissionRenderTarget[Y.id],Se=Y.viewport||I;ue.setSize(Se.z*v.transmissionResolutionScale,Se.w*v.transmissionResolutionScale);const Le=v.getRenderTarget(),Te=v.getActiveCubeFace(),Be=v.getActiveMipmapLevel();v.setRenderTarget(ue),v.getClearColor(F),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Z&&Ie.render(X);const ke=v.toneMapping;v.toneMapping=qn;const Ne=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),f.setupLightsView(Y),W===!0&&ce.setGlobalState(v.clippingPlanes,Y),qr(b,X,Y),he.updateMultisampleRenderTarget(ue),he.updateRenderTargetMipmap(ue),le.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let tt=0,ht=O.length;tt<ht;tt++){const at=O[tt],it=at.object,Fe=at.geometry,ut=at.material,Je=at.group;if(ut.side===Pt&&it.layers.test(Y.layers)){const Vt=ut.side;ut.side=Ht,ut.needsUpdate=!0,xc(it,X,Y,Fe,ut,Je),ut.side=Vt,ut.needsUpdate=!0,qe=!0}}qe===!0&&(he.updateMultisampleRenderTarget(ue),he.updateRenderTargetMipmap(ue))}v.setRenderTarget(Le,Te,Be),v.setClearColor(F,q),Ne!==void 0&&(Y.viewport=Ne),v.toneMapping=ke}function qr(b,O,X){const Y=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ue=b.length;B<ue;B++){const Se=b[B],Le=Se.object,Te=Se.geometry,Be=Se.group;let ke=Se.material;ke.allowOverride===!0&&Y!==null&&(ke=Y),Le.layers.test(X.layers)&&xc(Le,O,X,Te,ke,Be)}}function xc(b,O,X,Y,B,ue){b.onBeforeRender(v,O,X,Y,B,ue),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(v,O,X,Y,b,ue),B.transparent===!0&&B.side===Pt&&B.forceSinglePass===!1?(B.side=Ht,B.needsUpdate=!0,v.renderBufferDirect(X,O,Y,B,b,ue),B.side=Yn,B.needsUpdate=!0,v.renderBufferDirect(X,O,Y,B,b,ue),B.side=Pt):v.renderBufferDirect(X,O,Y,B,b,ue),b.onAfterRender(v,O,X,Y,B,ue)}function Yr(b,O,X){O.isScene!==!0&&(O=H);const Y=K.get(b),B=f.state.lights,ue=f.state.shadowsArray,Se=B.state.version,Le=$.getParameters(b,B.state,ue,O,X),Te=$.getProgramCacheKey(Le);let Be=Y.programs;Y.environment=b.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(b.isMeshStandardMaterial?Xe:Ke).get(b.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Be===void 0&&(b.addEventListener("dispose",te),Be=new Map,Y.programs=Be);let ke=Be.get(Te);if(ke!==void 0){if(Y.currentProgram===ke&&Y.lightsStateVersion===Se)return Sc(b,Le),ke}else Le.uniforms=$.getUniforms(b),b.onBeforeCompile(Le,v),ke=$.acquireProgram(Le,Te),Be.set(Te,ke),Y.uniforms=Le.uniforms;const Ne=Y.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ne.clippingPlanes=ce.uniform),Sc(b,Le),Y.needsLights=cd(b),Y.lightsStateVersion=Se,Y.needsLights&&(Ne.ambientLightColor.value=B.state.ambient,Ne.lightProbe.value=B.state.probe,Ne.directionalLights.value=B.state.directional,Ne.directionalLightShadows.value=B.state.directionalShadow,Ne.spotLights.value=B.state.spot,Ne.spotLightShadows.value=B.state.spotShadow,Ne.rectAreaLights.value=B.state.rectArea,Ne.ltc_1.value=B.state.rectAreaLTC1,Ne.ltc_2.value=B.state.rectAreaLTC2,Ne.pointLights.value=B.state.point,Ne.pointLightShadows.value=B.state.pointShadow,Ne.hemisphereLights.value=B.state.hemi,Ne.directionalShadowMap.value=B.state.directionalShadowMap,Ne.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ne.spotShadowMap.value=B.state.spotShadowMap,Ne.spotLightMatrix.value=B.state.spotLightMatrix,Ne.spotLightMap.value=B.state.spotLightMap,Ne.pointShadowMap.value=B.state.pointShadowMap,Ne.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=ke,Y.uniformsList=null,ke}function Mc(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Us.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function Sc(b,O){const X=K.get(b);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function od(b,O,X,Y,B){O.isScene!==!0&&(O=H),he.resetTextureUnits();const ue=O.fog,Se=Y.isMeshStandardMaterial?O.environment:null,Le=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:rr,Te=(Y.isMeshStandardMaterial?Xe:Ke).get(Y.envMap||Se),Be=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ke=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ne=!!X.morphAttributes.position,qe=!!X.morphAttributes.normal,tt=!!X.morphAttributes.color;let ht=qn;Y.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ht=v.toneMapping);const at=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,it=at!==void 0?at.length:0,Fe=K.get(Y),ut=f.state.lights;if(W===!0&&(de===!0||b!==y)){const Lt=b===y&&Y.id===S;ce.setState(Y,b,Lt)}let Je=!1;Y.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==ut.state.version||Fe.outputColorSpace!==Le||B.isBatchedMesh&&Fe.batching===!1||!B.isBatchedMesh&&Fe.batching===!0||B.isBatchedMesh&&Fe.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Fe.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Fe.instancing===!1||!B.isInstancedMesh&&Fe.instancing===!0||B.isSkinnedMesh&&Fe.skinning===!1||!B.isSkinnedMesh&&Fe.skinning===!0||B.isInstancedMesh&&Fe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Fe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Fe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Fe.instancingMorph===!1&&B.morphTexture!==null||Fe.envMap!==Te||Y.fog===!0&&Fe.fog!==ue||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==ce.numPlanes||Fe.numIntersection!==ce.numIntersection)||Fe.vertexAlphas!==Be||Fe.vertexTangents!==ke||Fe.morphTargets!==Ne||Fe.morphNormals!==qe||Fe.morphColors!==tt||Fe.toneMapping!==ht||Fe.morphTargetsCount!==it)&&(Je=!0):(Je=!0,Fe.__version=Y.version);let Vt=Fe.currentProgram;Je===!0&&(Vt=Yr(Y,O,B));let Mi=!1,Gt=!1,mr=!1;const dt=Vt.getUniforms(),Zt=Fe.uniforms;if(ge.useProgram(Vt.program)&&(Mi=!0,Gt=!0,mr=!0),Y.id!==S&&(S=Y.id,Gt=!0),Mi||y!==b){ge.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),dt.setValue(P,"projectionMatrix",b.projectionMatrix),dt.setValue(P,"viewMatrix",b.matrixWorldInverse);const Nt=dt.map.cameraPosition;Nt!==void 0&&Nt.setValue(P,Ae.setFromMatrixPosition(b.matrixWorld)),ye.logarithmicDepthBuffer&&dt.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&dt.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Gt=!0,mr=!0)}if(B.isSkinnedMesh){dt.setOptional(P,B,"bindMatrix"),dt.setOptional(P,B,"bindMatrixInverse");const Lt=B.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),dt.setValue(P,"boneTexture",Lt.boneTexture,he))}B.isBatchedMesh&&(dt.setOptional(P,B,"batchingTexture"),dt.setValue(P,"batchingTexture",B._matricesTexture,he),dt.setOptional(P,B,"batchingIdTexture"),dt.setValue(P,"batchingIdTexture",B._indirectTexture,he),dt.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&dt.setValue(P,"batchingColorTexture",B._colorsTexture,he));const $t=X.morphAttributes;if(($t.position!==void 0||$t.normal!==void 0||$t.color!==void 0)&&oe.update(B,X,Vt),(Gt||Fe.receiveShadow!==B.receiveShadow)&&(Fe.receiveShadow=B.receiveShadow,dt.setValue(P,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Zt.envMap.value=Te,Zt.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&O.environment!==null&&(Zt.envMapIntensity.value=O.environmentIntensity),Gt&&(dt.setValue(P,"toneMappingExposure",v.toneMappingExposure),Fe.needsLights&&ad(Zt,mr),ue&&Y.fog===!0&&ne.refreshFogUniforms(Zt,ue),ne.refreshMaterialUniforms(Zt,Y,D,J,f.state.transmissionRenderTarget[b.id]),Us.upload(P,Mc(Fe),Zt,he)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Us.upload(P,Mc(Fe),Zt,he),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&dt.setValue(P,"center",B.center),dt.setValue(P,"modelViewMatrix",B.modelViewMatrix),dt.setValue(P,"normalMatrix",B.normalMatrix),dt.setValue(P,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Lt=Y.uniformsGroups;for(let Nt=0,$s=Lt.length;Nt<$s;Nt++){const Kn=Lt[Nt];Oe.update(Kn,Vt),Oe.bind(Kn,Vt)}}return Vt}function ad(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function cd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,O,X){const Y=K.get(b);Y.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),K.get(b.texture).__webglTexture=O,K.get(b.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:X,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){const X=K.get(b);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0};const ld=P.createFramebuffer();this.setRenderTarget=function(b,O=0,X=0){C=b,w=O,R=X;let Y=!0,B=null,ue=!1,Se=!1;if(b){const Te=K.get(b);if(Te.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(P.FRAMEBUFFER,null),Y=!1;else if(Te.__webglFramebuffer===void 0)he.setupRenderTarget(b);else if(Te.__hasExternalTextures)he.rebindTextures(b,K.get(b.texture).__webglTexture,K.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ne=b.depthTexture;if(Te.__boundDepthTexture!==Ne){if(Ne!==null&&K.has(Ne)&&(b.width!==Ne.image.width||b.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(b)}}const Be=b.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(Se=!0);const ke=K.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[O])?B=ke[O][X]:B=ke[O],ue=!0):b.samples>0&&he.useMultisampledRTT(b)===!1?B=K.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?B=ke[X]:B=ke,I.copy(b.viewport),N.copy(b.scissor),L=b.scissorTest}else I.copy(ae).multiplyScalar(D).floor(),N.copy(fe).multiplyScalar(D).floor(),L=He;if(X!==0&&(B=ld),ge.bindFramebuffer(P.FRAMEBUFFER,B)&&Y&&ge.drawBuffers(b,B),ge.viewport(I),ge.scissor(N),ge.setScissorTest(L),ue){const Te=K.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,Te.__webglTexture,X)}else if(Se){const Te=O;for(let Be=0;Be<b.textures.length;Be++){const ke=K.get(b.textures[Be]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Be,ke.__webglTexture,X,Te)}}else if(b!==null&&X!==0){const Te=K.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Te.__webglTexture,X)}S=-1},this.readRenderTargetPixels=function(b,O,X,Y,B,ue,Se,Le=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=K.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te){ge.bindFramebuffer(P.FRAMEBUFFER,Te);try{const Be=b.textures[Le],ke=Be.format,Ne=Be.type;if(!ye.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ye.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-Y&&X>=0&&X<=b.height-B&&(b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Le),P.readPixels(O,X,Y,B,Ce.convert(ke),Ce.convert(Ne),ue))}finally{const Be=C!==null?K.get(C).__webglFramebuffer:null;ge.bindFramebuffer(P.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(b,O,X,Y,B,ue,Se,Le=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=K.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te)if(O>=0&&O<=b.width-Y&&X>=0&&X<=b.height-B){ge.bindFramebuffer(P.FRAMEBUFFER,Te);const Be=b.textures[Le],ke=Be.format,Ne=Be.type;if(!ye.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ye.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,qe),P.bufferData(P.PIXEL_PACK_BUFFER,ue.byteLength,P.STREAM_READ),b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Le),P.readPixels(O,X,Y,B,Ce.convert(ke),Ce.convert(Ne),0);const tt=C!==null?K.get(C).__webglFramebuffer:null;ge.bindFramebuffer(P.FRAMEBUFFER,tt);const ht=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await xh(P,ht,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,qe),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ue),P.deleteBuffer(qe),P.deleteSync(ht),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,X=0){const Y=Math.pow(2,-X),B=Math.floor(b.image.width*Y),ue=Math.floor(b.image.height*Y),Se=O!==null?O.x:0,Le=O!==null?O.y:0;he.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,X,0,0,Se,Le,B,ue),ge.unbindTexture()};const ud=P.createFramebuffer(),dd=P.createFramebuffer();this.copyTextureToTexture=function(b,O,X=null,Y=null,B=0,ue=null){ue===null&&(B!==0?(ji("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ue=B,B=0):ue=0);let Se,Le,Te,Be,ke,Ne,qe,tt,ht;const at=b.isCompressedTexture?b.mipmaps[ue]:b.image;if(X!==null)Se=X.max.x-X.min.x,Le=X.max.y-X.min.y,Te=X.isBox3?X.max.z-X.min.z:1,Be=X.min.x,ke=X.min.y,Ne=X.isBox3?X.min.z:0;else{const $t=Math.pow(2,-B);Se=Math.floor(at.width*$t),Le=Math.floor(at.height*$t),b.isDataArrayTexture?Te=at.depth:b.isData3DTexture?Te=Math.floor(at.depth*$t):Te=1,Be=0,ke=0,Ne=0}Y!==null?(qe=Y.x,tt=Y.y,ht=Y.z):(qe=0,tt=0,ht=0);const it=Ce.convert(O.format),Fe=Ce.convert(O.type);let ut;O.isData3DTexture?(he.setTexture3D(O,0),ut=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(he.setTexture2DArray(O,0),ut=P.TEXTURE_2D_ARRAY):(he.setTexture2D(O,0),ut=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);const Je=P.getParameter(P.UNPACK_ROW_LENGTH),Vt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Mi=P.getParameter(P.UNPACK_SKIP_PIXELS),Gt=P.getParameter(P.UNPACK_SKIP_ROWS),mr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,at.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,at.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Be),P.pixelStorei(P.UNPACK_SKIP_ROWS,ke),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ne);const dt=b.isDataArrayTexture||b.isData3DTexture,Zt=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){const $t=K.get(b),Lt=K.get(O),Nt=K.get($t.__renderTarget),$s=K.get(Lt.__renderTarget);ge.bindFramebuffer(P.READ_FRAMEBUFFER,Nt.__webglFramebuffer),ge.bindFramebuffer(P.DRAW_FRAMEBUFFER,$s.__webglFramebuffer);for(let Kn=0;Kn<Te;Kn++)dt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,K.get(b).__webglTexture,B,Ne+Kn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,K.get(O).__webglTexture,ue,ht+Kn)),P.blitFramebuffer(Be,ke,Se,Le,qe,tt,Se,Le,P.DEPTH_BUFFER_BIT,P.NEAREST);ge.bindFramebuffer(P.READ_FRAMEBUFFER,null),ge.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(B!==0||b.isRenderTargetTexture||K.has(b)){const $t=K.get(b),Lt=K.get(O);ge.bindFramebuffer(P.READ_FRAMEBUFFER,ud),ge.bindFramebuffer(P.DRAW_FRAMEBUFFER,dd);for(let Nt=0;Nt<Te;Nt++)dt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,$t.__webglTexture,B,Ne+Nt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,$t.__webglTexture,B),Zt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Lt.__webglTexture,ue,ht+Nt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Lt.__webglTexture,ue),B!==0?P.blitFramebuffer(Be,ke,Se,Le,qe,tt,Se,Le,P.COLOR_BUFFER_BIT,P.NEAREST):Zt?P.copyTexSubImage3D(ut,ue,qe,tt,ht+Nt,Be,ke,Se,Le):P.copyTexSubImage2D(ut,ue,qe,tt,Be,ke,Se,Le);ge.bindFramebuffer(P.READ_FRAMEBUFFER,null),ge.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Zt?b.isDataTexture||b.isData3DTexture?P.texSubImage3D(ut,ue,qe,tt,ht,Se,Le,Te,it,Fe,at.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(ut,ue,qe,tt,ht,Se,Le,Te,it,at.data):P.texSubImage3D(ut,ue,qe,tt,ht,Se,Le,Te,it,Fe,at):b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ue,qe,tt,Se,Le,it,Fe,at.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ue,qe,tt,at.width,at.height,it,at.data):P.texSubImage2D(P.TEXTURE_2D,ue,qe,tt,Se,Le,it,Fe,at);P.pixelStorei(P.UNPACK_ROW_LENGTH,Je),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Vt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Mi),P.pixelStorei(P.UNPACK_SKIP_ROWS,Gt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,mr),ue===0&&O.generateMipmaps&&P.generateMipmap(ut),ge.unbindTexture()},this.copyTextureToTexture3D=function(b,O,X=null,Y=null,B=0){return ji('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,O,X,Y,B)},this.initRenderTarget=function(b){K.get(b).__webglFramebuffer===void 0&&he.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?he.setTextureCube(b,0):b.isData3DTexture?he.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?he.setTexture2DArray(b,0):he.setTexture2D(b,0),ge.unbindTexture()},this.resetState=function(){w=0,R=0,C=null,ge.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const zt={centerX:0,centerZ:0,calmRadius:142,fullRadius:172,worldLimit:220,maxWaveScale:1.4};function Cl(n,e){return Number.isFinite(n)?n:e}function W0(n,e,t){return Math.min(t,Math.max(e,n))}function qs(n,e){const t=Cl(n,zt.centerX)-zt.centerX,i=Cl(e,zt.centerZ)-zt.centerZ,r=Math.hypot(t,i),s=Math.max(r,1e-9),o=t/s,a=i/s,l=-o,c=-a,u=zt.fullRadius-zt.calmRadius,d=W0((r-zt.calmRadius)/u,0,1),h=d*d*(3-2*d),m=d>0&&d<1?6*d*(1-d)/u:0;return{intensity:h,inwardX:l,inwardZ:c,gradientX:o*m,gradientZ:a*m}}const Pl={velocityX:-9,velocityZ:0};function Xi(n,e){return Number.isFinite(n)?n:e}function Ua(n=0){const e=Xi(Pl.velocityX,0),t=Xi(Pl.velocityZ,0);return{x:e,z:t,speed:Math.hypot(e,t)}}function Vu(n,e,t){const i=Xi(n?.x??0,0)-Xi(e,0),r=Xi(n?.z??0,0)-Xi(t,0);return{x:i,z:r,speed:Math.hypot(i,r)}}const rt={minAngle:8*Math.PI/180,maxAngle:85*Math.PI/180,defaultAngle:85*Math.PI/180,trimRate:25*Math.PI/180,noGoAngle:40*Math.PI/180,trueWindNoGoSoftness:8*Math.PI/180,maxDriveAcceleration:5.8,maxLateralAcceleration:1.6,sailingMaxYawRate:1.1,stallYawRate:.55,manualBoostFraction:.45};function Uo(n,e){return Number.isFinite(n)?n:e}function ii(n,e,t){return Math.min(t,Math.max(e,n))}function Il(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function cn(n,e=rt.defaultAngle,t=0){const i=Uo(n?.heading??0,0),r=Vu(Ua(),n?.velocityX??0,n?.velocityZ??0),s=r.speed,o=s>1e-7?-r.x/s:0,a=s>1e-7?-r.z/s:1,l=Math.sin(i),c=Math.cos(i),u=l,d=c,h=c,m=-l,g=o*h+a*m,_=o*u+a*d,p=Math.atan2(g,_),f=Math.sign(p)||1,E=Math.abs(p),x=Ua(),v=x.speed||1,T=-x.x/v,w=-x.z/v,R=T*h+w*m,C=T*u+w*d,S=Math.abs(Math.atan2(R,C)),y=rt.noGoAngle-rt.trueWindNoGoSoftness,I=Math.min(S,E),N=I<rt.noGoAngle,L=ii(Uo(e,rt.defaultAngle),rt.minAngle,rt.maxAngle),F=ii(E*.5,rt.minAngle,rt.maxAngle),q=Math.abs(L-F),V=Math.max(0,1-q/(35*Math.PI/180)),J=.35+.65*Math.sin(ii(E,0,Math.PI)),D=ii((I-y)/(2*rt.trueWindNoGoSoftness),0,1),Q=D*D*(3-2*D),G=ii(s/9,0,1.35),ae=ii(1-Math.max(0,Uo(t,0)),0,1),fe=ii(V*J*G*ae*Q,0,1),He=f*L,Ue=fe*rt.maxDriveAcceleration,W=N?0:-f*fe*rt.maxLateralAcceleration*.5;return{driveAcceleration:Ue,lateralAcceleration:W,power:fe,suggestedAngle:F,signedAngle:Il(He),relativeWindAngle:Il(p),noGo:N}}const un={targetEfficiency:.75,assistRate:25*Math.PI/180,boostMinSpeed:1.5,boostStableSeconds:.35,boostDurationSeconds:1.4,boostCooldownSeconds:5,sweetSpotEnter:.9,sweetSpotExit:.78};function wn(n,e){return Number.isFinite(n)?n:e}function Pr(n,e,t){return Math.min(t,Math.max(e,n))}function X0(n,e,t){return n<e?Math.min(n+t,e):Math.max(n-t,e)}function Dr(n){return Pr(wn(n,rt.defaultAngle),rt.minAngle,rt.maxAngle)}function Gu(n){const e=cn(n,rt.defaultAngle).suggestedAngle,t=cn(n,e);return{idealAngle:Dr(e),peak:t.power}}function q0(n){const e=Gu(n);if(e.peak<=1e-6)return{angle:Dr(e.idealAngle),efficiency:0};const t=e.peak*un.targetEfficiency;let i=e.idealAngle,r=rt.maxAngle;const s=cn(n,r).power<=t;s||(i=rt.minAngle,r=e.idealAngle);for(let l=0;l<8;l+=1){const c=(i+r)*.5,u=cn(n,c).power;s?u>t?i=c:r=c:u>t?r=c:i=c}const o=(i+r)*.5,a=cn(n,o).power;return{angle:o,efficiency:a/e.peak}}function Ll(){return{sailAngle:rt.defaultAngle,mode:"auto",engaged:!1,efficiency:0,sweetSpot:!1,boost:0,boostSerial:0,stableSeconds:0,cooldownSeconds:0,boostArmed:!0}}function Hn(n){return{...n,boost:0,sweetSpot:!1,stableSeconds:0,cooldownSeconds:Math.max(wn(n?.cooldownSeconds??0,0),un.boostCooldownSeconds),boostArmed:!1}}function Dl(n,e,t,i){const r=Number.isFinite(i)&&i>0?Math.min(i,.25):0,s=Pr(wn(t?.sheet??0,0),-1,1),o=Math.abs(s)>1e-4;let a=n?.mode==="manual"?"manual":"auto",l=n?.engaged===!0,c=Dr(n?.sailAngle??rt.defaultAngle),u=Math.max(0,wn(n?.cooldownSeconds??0,0)-r),d=Pr(wn(n?.boost??0,0),0,1),h=Math.max(0,Math.floor(wn(n?.boostSerial??0,0))),m=Math.max(0,wn(n?.stableSeconds??0,0)),g=n?.boostArmed!==!1;o?(a="manual",l=!0,c=Dr(c+s*rt.trimRate*r)):t?.resumeAuto===!0?(a="auto",l=!0,d=0,m=0):t?.engage===!0&&(l=!0);const _=cn(e,c);t?.suppressed===!0&&(d=0,m=0);const p=Gu(e);let f=p.peak>1e-6?_.power/p.peak:0,E=n?.sweetSpot===!0;if(t?.resumeAuto===!0&&(E=!1),f<un.sweetSpotExit?E=!1:f>=un.sweetSpotEnter&&(E=!0),a==="auto"&&l&&t?.suppressed!==!0){const x=q0(e);c=X0(c,x.angle,un.assistRate*r);const v=cn(e,c);f=p.peak>1e-6?v.power/p.peak:0,E=!1,d=0,m=0}else{f<un.sweetSpotExit&&(E=!1,g=!0,m=0);const x=wn(e.heading,0),v=e.velocityX*Math.sin(x)+e.velocityZ*Math.cos(x),T=a==="manual"&&!t?.suppressed&&!_.noGo&&v>=un.boostMinSpeed&&E;m=T?m+r:0,d>0?(d=Math.max(0,d-r/un.boostDurationSeconds),(!T||_.noGo||t?.suppressed)&&(d=0),d===0&&(u=un.boostCooldownSeconds)):T&&g&&m>=un.boostStableSeconds&&u<=0&&(d=1,h+=1,m=0,g=!1)}return{sailAngle:Dr(c),mode:a,engaged:l,efficiency:Pr(wn(f,0),0,1),sweetSpot:E,boost:Pr(d,0,1),boostSerial:h,stableSeconds:m,cooldownSeconds:u,boostArmed:g}}const Y0=.18,qi=1.42;function Z0(n,e){const t=new Gn;t.name="phase-two-landmarks",n.add(t);const i=[],r=[],s=[];e.forEach((l,c)=>{const u=$0(l,c,i);t.add(u.group),s.push({id:l.id,group:u.group}),r.push({id:l.id,position:u.anchor.clone().add(new z(l.position.x,0,l.position.z))})}),t.updateMatrixWorld(!0);const o=s.map(({id:l,group:c})=>({id:l,bounds:new Zn().setFromObject(c)}));let a=!1;return{group:t,anchors:r,landmarkBounds:o,dispose:()=>{if(!a){a=!0;for(const l of i)l.dispose();t.removeFromParent(),t.clear()}}}}function $0(n,e,t){const i=n.landCollisionRadius,r=n.dockingTriggerRadius,s=new Gn;s.name=n.id,s.userData={islandId:n.id,landCollisionRadius:n.landCollisionRadius,dockingTriggerRadius:n.dockingTriggerRadius},s.position.set(n.position.x,0,n.position.z);const o=Qi(new jt({color:n.palette.sand,roughness:.9,metalness:0,flatShading:!0}),t),a=Qi(new jt({color:n.palette.land,roughness:.92,metalness:0,flatShading:!0}),t),l=Qi(new jt({color:n.palette.rock,roughness:.96,metalness:0,flatShading:!0}),t),c=Rt(new an(i*.78,i*.98,.48,10,1,!1),t),u=new We(c,o);u.name="sand-shelf",u.position.y=qi+.24,s.add(u);const d=qi+.48;j0(s,n,e,d,i,a,t),J0(s,n,e,i,l,t),K0(s,n,i,o,a,l,t);const h=Q0(r,t);h.position.y=qi+Y0,s.add(h);const m=i*.82,g=new z(m,qi+.12,m);return{group:s,anchor:g}}function K0(n,e,t,i,r,s,o){if(e.id==="island-resume"){const a=-t*.22,l=t*.58,c=Tr(n,a,l),u=Math.max(2.1,t*.29),d=Rt(new an(t*.13,t*.17,u,6,1,!1),o),h=new We(d,s);h.name="chartroom-tower",h.userData={detailRole:"tower",supportY:c},h.position.set(a,c+u*.5,l),n.add(h);const m=Rt(new mi(t*.23,.34,6,1,!1),o),g=new We(m,i);g.name="chartroom-tower-roof",g.userData={detailRole:"tower-roof",supportY:c+u},g.position.set(h.position.x,c+u+.17,h.position.z),n.add(g);return}if(e.id==="island-projects"){const a=new z(1,0,1).normalize(),l=new z(-a.z,0,a.x),c=t*.26,u=t*.12,d=a.clone().multiplyScalar(t*.84),h=Tr(n,d.x,d.z),m=Rt(new vi(u,.16,c),o),g=Qi(new jt({color:7754044,roughness:.9,flatShading:!0}),o),_=new We(m,g);_.name="shipyard-dock",_.userData={detailRole:"dock",supportY:h},_.position.set(d.x,h+.08,d.z),_.rotation.y=Math.PI/4,n.add(_);const p=Rt(new an(t*.045,t*.055,.74,6,1,!1),o);for(const f of[t*.76,t*.93]){const E=a.clone().multiplyScalar(f).add(l.clone().multiplyScalar(t*.055)),x=new We(p,s);x.name="shipyard-dock-pile";const v=Tr(n,E.x,E.z);x.userData={detailRole:"dock-pile",supportY:v},x.position.set(E.x,v+.37,E.z),n.add(x)}return}if(e.id==="island-writing"){const a=-t*.5,l=t*.55,c=Tr(n,a,l),u=Math.max(1.65,t*.23),d=Rt(new an(t*.055,t*.075,u,6,1,!1),o),h=new We(d,s);h.name="logbook-marker",h.userData={detailRole:"marker",supportY:c},h.position.set(a,c+u*.5,l),n.add(h);const m=Rt(new mi(t*.14,.24,5,1,!1),o),g=new We(m,i);g.name="logbook-marker-cap",g.userData={detailRole:"marker-cap",supportY:c+u},g.position.set(h.position.x,c+u+.12,h.position.z),n.add(g);return}if(e.id==="island-media"){const a=t*.58,l=t*.18,c=Tr(n,a,l),u=Math.max(1.95,t*.27),d=Rt(new an(t*.13,t*.18,u,8,1,!1),o),h=new We(d,s);h.name="signal-cove-light",h.userData={detailRole:"lighthouse",supportY:c},h.position.set(a,c+u*.5,l),n.add(h);const m=Rt(new mi(t*.2,.3,8,1,!1),o),g=new We(m,i);g.name="signal-cove-light-cap",g.userData={detailRole:"lighthouse-cap",supportY:c+u},g.position.set(h.position.x,c+u+.15,h.position.z),n.add(g);const _=Rt(new lc(t*.05,8,4),o),p=Qi(new jt({color:16772522,emissive:16754984,emissiveIntensity:1.8,roughness:.35,metalness:0,flatShading:!0}),o),f=new We(_,p);f.name="signal-cove-lantern",f.userData={detailRole:"lighthouse-lantern",supportY:c+u},f.position.set(h.position.x,c+u+.4,h.position.z),n.add(f)}}function Tr(n,e,t){n.updateMatrixWorld(!0);const i=new of(new z(n.position.x+e,20,n.position.z+t),new z(0,-1,0)),r=n.children.filter(o=>o instanceof We&&(o.name==="sand-shelf"||o.name.startsWith("landform-")||o.name==="rock-facet")),s=i.intersectObjects(r,!1)[0];return s?s.point.y-n.position.y:qi+.24}function j0(n,e,t,i,r,s,o){const a=t*37%90*(Math.PI/180),l=Math.max(1.35,r*.34);if(e.landform==="twin-peaks"){const d=Rt(new mi(r*.38,l*1.12,6,1,!1),o);for(const[h,m,g]of[[-r*.24,r*.05,.92],[r*.24,-r*.04,.78]]){const _=new We(d,s);_.name="landform-twin-peak",_.position.set(h,i+l*g/2,m),_.scale.set(g,g,g),_.rotation.y=a,n.add(_)}return}if(e.landform==="ridge"){const d=Rt(new mi(r*.68,l*.86,7,1,!1),o),h=new We(d,s);h.name="landform-ridge",h.position.y=i+l*.43,h.scale.set(1.35,1,.58),h.rotation.y=a,n.add(h);return}if(e.landform==="mesa"){const d=Rt(new an(r*.54,r*.76,l*.9,7,1,!1),o),h=new We(d,s);h.name="landform-mesa",h.position.y=i+l*.45,h.rotation.y=a,n.add(h);return}const c=Rt(new cc(r*.63,1),o),u=new We(c,s);u.name="landform-mound",u.position.y=i+l*.42,u.scale.set(1.05,.58,.9),u.rotation.y=a,n.add(u)}function J0(n,e,t,i,r,s){const o=Rt(new ac(i*.13,0),s),a=e.landform==="twin-peaks"?4:3;for(let l=0;l<a;l+=1){const c=(t*1.9+l*2.1)%(Math.PI*2),u=i*(.48+l*.08),d=new We(o,r);d.name="rock-facet",d.position.set(Math.cos(c)*u,qi+.55+l%2*.14,Math.sin(c)*u),d.scale.set(1,.8+l%2*.25,.8),d.rotation.set(.2*l,c,.1*t),n.add(d)}}function Q0(n,e){const t=[];for(let a=0;a<=96;a+=1){const l=a/96*Math.PI*2;t.push(new z(Math.cos(l)*n,0,Math.sin(l)*n))}const r=Rt(new gt().setFromPoints(t),e),s=Qi(new ef({color:16052196,dashSize:.72,gapSize:.48,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1}),e),o=new jh(r,s);return o.name="docking-boundary",o.userData={dockingTriggerRadius:n},o.computeLineDistances(),o.renderOrder=4,o}function Rt(n,e){return e.push(n),n}function Qi(n,e){return e.push(n),n}const Fi=220,e_=5.5,t_=60,n_=90,i_=60;function r_(){const n=new uc(-1,1,1,-1,.1,1200);n.position.set(Fi,Fi,Fi);let e=0,t=0,i=!1;const r=()=>{n.position.set(e+Fi,Fi,t+Fi),n.lookAt(e,0,t),n.updateMatrixWorld(!0)};return r(),{camera:n,resize:(s,o)=>{if(i)return;const a=Math.max(1,s),l=Math.max(1,o),c=a/l,u=l<=460?i_*.5:a<=600?t_/c*.5:n_*.5,d=u*c;n.left=-d,n.right=d,n.top=u,n.bottom=-u,n.updateProjectionMatrix(),r()},update:(s,o,a)=>{if(i)return;const l=1-Math.exp(-Math.max(0,a)*e_);e+=(s-e)*l,t+=(o-t)*l,r()},snapTo:(s,o)=>{i||(e=s,t=o,r())},dispose:()=>{i=!0}}}const Bt={amplitude:.96,waveNumber:Math.PI*2/30,directionX:.92,directionZ:.39,angularSpeed:Math.PI*2/5.8,kind:"sine"},Ir={amplitude:.46,waveNumber:Math.PI*2/24,directionX:-.38,directionZ:.925,angularSpeed:Math.PI*2/4.6,kind:"cosine"},or=[Bt,Ir,{amplitude:.28,waveNumber:Math.PI*2/34,directionX:.74,directionZ:-.673,angularSpeed:Math.PI*2/6.8,kind:"sine"},{amplitude:.1,waveNumber:Math.PI*2/11,directionX:.707,directionZ:.707,angularSpeed:Math.PI*2/3.5,kind:"cosine"}],ar=.35,s_=or.map(n=>Math.sin(n.waveNumber*n.directionX*ar)/ar),o_=or.map(n=>Math.sin(n.waveNumber*n.directionZ*ar)/ar),Na=or.reduce((n,e)=>n+e.amplitude,0);function Ct(n,e){return Number.isFinite(n)?n:e}function a_(n,e,t=0){return(Ct(n,0)*Bt.directionX+Ct(e,0)*Bt.directionZ)*Bt.waveNumber+Ct(t,0)*Bt.angularSpeed}function c_(n,e,t=0){return(Ct(n,0)*Ir.directionX+Ct(e,0)*Ir.directionZ)*Ir.waveNumber+Ct(t,0)*Ir.angularSpeed}function Yi(n,e,t=0){const i=Ct(n,0),r=Ct(e,0),s=Ct(t,0);let o=0;for(const c of or){const u=(i*c.directionX+r*c.directionZ)*c.waveNumber+s*c.angularSpeed;o+=c.amplitude*(c.kind==="sine"?Math.sin(u):Math.cos(u))}const a=qs(i,r),l=Wu(Ct(a.intensity,0));return o*(1+l*(zt.maxWaveScale-1))}function Ur(n,e,t=0,i=.35){const r=Ct(n,0),s=Ct(e,0),o=Ct(t,0),a=Number.isFinite(i)?Math.max(.01,i):ar,l=a===ar;let c=0,u=0,d=0,h=0;for(let E=0;E<or.length;E+=1){const x=or[E],v=(r*x.directionX+s*x.directionZ)*x.waveNumber+o*x.angularSpeed,T=Math.sin(v),w=Math.cos(v),R=x.kind==="sine"?T:w,C=x.kind==="sine"?w:-T;c+=x.amplitude*R;const S=l?s_[E]:Math.sin(x.waveNumber*x.directionX*a)/a,y=l?o_[E]:Math.sin(x.waveNumber*x.directionZ*a)/a;u+=x.amplitude*C*S,d+=x.amplitude*C*y,h+=x.amplitude*x.angularSpeed*C}const m=qs(r,s),g=Wu(Ct(m.intensity,0)),_=1+g*(zt.maxWaveScale-1),p=c;c=p*_;const f=zt.maxWaveScale-1;return u=u*_+p*f*Ct(m.gradientX,0),d=d*_+p*f*Ct(m.gradientZ,0),h*=_,{height:c,slopeX:u,slopeZ:d,velocityY:h,stormIntensity:g}}function Wu(n){return Math.min(1,Math.max(0,n))}const No={gain:2.5,yawDamping:1,deadband:.01};function Ar(n,e){return Number.isFinite(n)?n:e}function l_(n,e,t){return Math.min(t,Math.max(e,n))}function u_(n){const e=(n+Math.PI)%(2*Math.PI);return e<0?e+2*Math.PI-Math.PI:e-Math.PI}function d_(n,e){const t=Ar(n?.heading??0,0),i=u_(Ar(e,t)-t);if(Math.abs(i)<=No.deadband)return 0;const r=i*No.gain-Ar(n?.yawRate??0,0)*No.yawDamping,s=t,a=Ar(n?.velocityX??0,0)*Math.sin(s)+Ar(n?.velocityZ??0,0)*Math.cos(s)<-.6?-1:1;return l_(-r/a,-1,1)}const Cn={maxSurgeAcceleration:.9,maxSwayAcceleration:.65,slopeAcceleration:2.8,maxInputSlope:8,uphillResistanceScale:12,maxUphillResistanceAcceleration:7.2};function h_(n,e,t,i){const r=hi(-di(n?.surgeAcceleration??0,0),0,Cn.maxSurgeAcceleration),s=Math.max(.01,di(i,14)),o=hi(di(e,0)/s,0,1),a=hi(di(t,0),0,1);return-Math.min(r*Cn.uphillResistanceScale*o*o*a,Cn.maxUphillResistanceAcceleration)}function di(n,e){return Number.isFinite(n)?n:e}function hi(n,e,t){return Math.min(t,Math.max(e,n))}function f_(n,e){const t=di(e,0),i=hi(di(n?.slopeX??0,0),-8,Cn.maxInputSlope),r=hi(di(n?.slopeZ??0,0),-8,Cn.maxInputSlope),s=-i*Cn.slopeAcceleration,o=-r*Cn.slopeAcceleration,a=Math.sin(t),l=Math.cos(t),c=hi(s*l-o*a,-.65,Cn.maxSwayAcceleration),u=hi(s*a+o*l,-.9,Cn.maxSurgeAcceleration);return{accelerationX:u*a+c*l,accelerationZ:u*l-c*a,surgeAcceleration:u,swayAcceleration:c}}const je={length:5.2,width:2.6,collisionRadius:3.2,maxForwardSpeed:14,maxReverseSpeed:7,maxLateralSpeed:6,brakingAcceleration:15,maxYawRate:.6},Fo=180,p_=.25,m_=1/120,Ul=1e-7,Nl=16,g_=2.4,ys=100;function xt(n,e){return Number.isFinite(n)?n:e}function rn(n,e,t){return Math.min(t,Math.max(e,n))}function __(n){return{throttle:rn(xt(n?.throttle??0,0),-1,1),rudder:rn(xt(n?.rudder??0,0),-1,1),brake:n?.brake===!0,sheet:rn(xt(n?.sheet??0,0),-1,1),sailAngle:xt(n?.sailAngle??rt.defaultAngle,rt.defaultAngle),targetHeading:Number.isFinite(n?.targetHeading)?n.targetHeading:void 0,trimBoost:rn(xt(n?.trimBoost??0,0),0,1)}}function Xu(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function v_(n){const e=Math.max(je.maxYawRate,rt.sailingMaxYawRate);return{x:xt(n?.x??0,0),z:xt(n?.z??0,0),velocityX:xt(n?.velocityX??0,0),velocityZ:xt(n?.velocityZ??0,0),heading:Xu(xt(n?.heading??0,0)),yawRate:rn(xt(n?.yawRate??0,0),-e,e)}}function x_(n){const e=xt(n?.worldLimit??Fo,Fo);return e>0?e:Fo}function Fl(n,e,t,i,r){const s=Math.max(0,r-je.collisionRadius);return n>s?(n=s,t>0&&(t=0)):n<-s&&(n=-s,t<0&&(t=0)),e>s?(e=s,i>0&&(i=0)):e<-s&&(e=-s,i<0&&(i=0)),[n,e,t,i]}function M_(n,e,t,i,r){for(const s of r){const o=xt(s?.x??0,0),a=xt(s?.z??0,0),l=xt(s?.radius??0,0);if(l<=0)continue;const c=je.collisionRadius+l,u=n-o,d=e-a,h=Math.hypot(u,d);if(h>=c)continue;let m,g;if(h>Ul)m=u/h,g=d/h;else{const p=Math.hypot(t,i);p>Ul?(m=-t/p,g=-i/p):(m=1,g=0)}n=o+m*c,e=a+g*c;const _=t*m+i*g;_<0&&(t-=_*m,i-=_*g)}return[n,e,t,i]}function qu(n,e,t,i,r){const s=x_(r),o=Array.isArray(r?.obstacles)?r.obstacles:[];for(let a=0;a<2;a+=1)[n,e,t,i]=Fl(n,e,t,i,s),[n,e,t,i]=M_(n,e,t,i,o);return[n,e,t,i]=Fl(n,e,t,i,s),[n,e,t,i]}function S_(n,e,t,i,r){const s=Math.sin(n.heading),o=Math.cos(n.heading);let a=n.velocityX*s+n.velocityZ*o,l=n.velocityX*o-n.velocityZ*s;a*=Math.exp(-.35*t),l*=Math.exp(-3.5*t);const c=cn(n,e.sailAngle,e.brake?1:0),u=!e.brake&&c?.noGo!==!0?1+(e.trimBoost??0)*rt.manualBoostFraction:1,d=e.brake?0:(c?.driveAcceleration??0)*u;if(a+=d*t,c!==void 0&&(l+=c.lateralAcceleration*t),r!==void 0&&Number.isFinite(r)){const N=f_(Ur(n.x,n.z,r),n.heading);a+=N.surgeAcceleration*t,a+=h_(N,a,c?.power??0,je.maxForwardSpeed)*t,l+=N.swayAcceleration*t}{const N=qs(n.x,n.z);if(N.intensity>0){const L=N.inwardX*Nl*N.intensity,F=N.inwardZ*Nl*N.intensity,q=rn(xt(a*s+l*o,0),-ys,ys),V=rn(xt(a*o-l*s,0),-ys,ys),J=Math.max(0,q*-N.inwardX+V*-N.inwardZ),D=Math.max(0,J)*g_*N.intensity,Q=L+N.inwardX*D,G=F+N.inwardZ*D;a+=(Q*s+G*o)*t,l+=(Q*o-G*s)*t}}if(e.brake){const N=Math.sign(a)||Math.sign(d),L=je.brakingAcceleration*t;N!==0&&(a=Math.abs(a)<=L?0:a-N*L)}a=rn(a,-7,je.maxForwardSpeed),l=rn(l,-6,je.maxLateralSpeed);const h=a*s+l*o,m=a*o-l*s,g=a<-.6?-1:1,_=g<0?je.maxReverseSpeed:je.maxForwardSpeed,p=rn(Math.abs(a)/_,0,1),f=rt.sailingMaxYawRate,E=Math.max(rt.stallYawRate/f,.12+p*.88),v=-(e.targetHeading!==void 0?d_(n,e.targetHeading):e.rudder)*g*f*E,T=1-Math.exp(-6.5*t),w=rn(n.yawRate+(v-n.yawRate)*T,-f,f),R=Xu(n.heading+w*t);let[C,S,y,I]=qu(n.x+h*t,n.z+m*t,h,m,i);return{x:C,z:S,velocityX:y,velocityZ:I,heading:R,yawRate:w}}function Ol(n=0,e=0){return{x:xt(n,0),z:xt(e,0),velocityX:0,velocityZ:0,heading:0,yawRate:0}}function y_(n,e,t,i,r){const s=v_(n),o=__(e),a=Number.isFinite(t)&&t>0?Math.min(t,p_):0;let l=qu(s.x,s.z,s.velocityX,s.velocityZ,i),c={x:l[0],z:l[1],velocityX:l[2],velocityZ:l[3],heading:s.heading,yawRate:s.yawRate},u=a,d=0;for(;u>0;){const h=Math.min(u,m_),m=r!==void 0&&Number.isFinite(r)?r+d:void 0;c=S_(c,o,h,i,m),u-=h,d+=h}return c}const wt={maxHeave:Na*zt.maxWaveScale,maxWavePitch:.29,maxWaveRoll:.3,maxSpeedLift:.065,maxTurnHeel:.12,maxWindHeel:.26,maxWindHeelLift:.1,heaveResponseRate:15,tiltResponseRate:9,maxForwardSpeed:je.maxForwardSpeed,maxYawRate:je.maxYawRate},Bl=.01;function ft(n,e){return Number.isFinite(n)?n:e}function bn(n,e,t){return Math.min(t,Math.max(e,n))}function Es(n){const e=n.reduce((t,i)=>t+i,0);return ft(e/n.length,0)}function E_(n){const e=n.reduce((i,[,r])=>i+r,0),t=n.reduce((i,[r,s])=>i+r*s,0);return e>0?ft(t/e,0):0}function zl(n){return{height:ft(n,0)}}function b_(n,e,t){try{return zl(n(e,t)?.height)}catch{return zl(0)}}function T_(n,e,t,i,r,s){const o=ft(n,0),a=ft(e,0),l=ft(t,0),c=Math.max(Bl,Math.abs(ft(i,1))*.5),u=Math.max(Bl,Math.abs(ft(r,1))*.5),d=Math.cos(l),h=Math.sin(l),m=(g,_)=>b_(s,o+g*d+_*h,a-g*h+_*d);return{bow:m(0,c),stern:m(0,-c),port:m(-u,0),starboard:m(u,0),bowPort:m(-u,c),bowStarboard:m(u,c),sternPort:m(-u,-c),sternStarboard:m(u,-c)}}function A_(n,e={},t=!1){const i=ft(n?.bow?.height,0),r=ft(n?.stern?.height,0),s=ft(n?.port?.height,0),o=ft(n?.starboard?.height,0),a=ft(n?.bowPort?.height,0),l=ft(n?.bowStarboard?.height,0),c=ft(n?.sternPort?.height,0),u=ft(n?.sternStarboard?.height,0),d=Es([i,a,l]),h=Es([r,c,u]),m=Es([s,a,c]),g=Es([o,l,u]),_=bn(E_([[i,1],[r,1],[s,1],[o,1],[a,.5],[l,.5],[c,.5],[u,.5]]),-wt.maxHeave,wt.maxHeave),p=bn(-Math.atan2(ft(d-h,0),je.length),-.29,wt.maxWavePitch),f=bn(Math.atan2(ft(g-m,0),je.width),-.3,wt.maxWaveRoll),E=ft(e?.forwardSpeed,0),x=ft(e?.yawRate,0),v=bn(ft(e?.sailPower,0),0,1),T=ft(e?.relativeWindAngle,0),w=bn(E/wt.maxForwardSpeed,0,1),R=bn(x/wt.maxYawRate*Math.min(1,Math.abs(E)/wt.maxForwardSpeed),-1,1),C=t?0:1,S=w*w*wt.maxSpeedLift*C,y=-R*wt.maxTurnHeel*C,I=Math.sin(T)*v*wt.maxWindHeel*C,N=Math.abs(I)/wt.maxWindHeel*wt.maxWindHeelLift;return{heave:bn(_+N,-wt.maxHeave,wt.maxHeave),pitch:bn(p-S,-.36,.36),roll:bn(f+y+I,-.4,.4)}}const Oo=je.length,Bo=je.width,w_=.2,R_=8*Math.PI/180,bs=85*Math.PI/180,C_=9,kl=-.34;function P_(n){const e=new Gn;e.name="portfolio-sailboat",e.rotation.order="YXZ";const t=[],i=[],r=D=>(t.push(D),D),s=D=>(i.push(D),D),o=s(new jt({color:14140835,roughness:.82,metalness:0,flatShading:!0})),a=new We(r(I_(Bo,Oo)),o);a.name="vessel-faceted-hull",e.add(a);const l=s(new jt({color:12088134,roughness:.82,metalness:0,flatShading:!0})),c=new We(r(L_(Bo,Oo)),l);c.name="vessel-warm-wood-deck",e.add(c);const u=s(new jt({color:7097150,roughness:.78,metalness:0,flatShading:!0})),d=new We(r(new vi(1.02,.32,.84)),u);d.name="vessel-cockpit-console",d.position.set(0,.63,-.82),e.add(d);const h=s(new jt({color:5131331,roughness:.7,metalness:.05,flatShading:!0})),m=new We(r(new an(.085,.12,5.45,6)),h);m.name="vessel-mast",m.position.set(0,3.19,-.34),e.add(m);const g=new Gn;g.name="sail-rig",g.position.set(0,0,kl),e.add(g);const _=D=>{D.position.z-=kl,g.add(D)},p=new We(r(new an(.06,.075,3.1,6)),s(new jt({color:15757160,roughness:.64,metalness:0,flatShading:!0})));p.name="vessel-main-boom",p.rotation.x=Math.PI*.5,p.position.set(0,2.04,-1.895),_(p);const f=s(new pi({color:16775142,side:Pt,toneMapped:!1})),E=s(new pi({color:14339507,side:Pt,toneMapped:!1})),x=new We(r(Vl(.055,-.6,[[5.8,-.39],[2,-.39],[2.08,-3.4],[3.3,-1.52]])),f);x.name="vessel-cream-mainsail",_(x);const v=new We(r(Vl(.062,-.42,[[5.76,-.41],[2.02,-.41],[2.08,-2.74],[3.28,-1.28]])),E);v.name="vessel-mainsail-facet",_(v);const T=s(new jt({color:15757160,roughness:.64,metalness:0,side:Pt,flatShading:!0})),w=new We(r(Hl([.073,2.08,-.48,.073,2.12,-3.05,.073,2.38,-2.78])),T);w.name="vessel-coral-main-clew",_(w);const R=new We(r(Hl([-.52,.7,.96,.52,.7,.96,0,.7,2.18])),T);R.name="vessel-coral-bow",e.add(R);const C={heave:0,pitch:0,roll:0};let S=!1,y=bs,I=bs,N=0,L=0,F=!1;const q=D=>{if(!Number.isFinite(D))return bs;const Q=D<0?-1:1,G=Math.min(bs,Math.max(R_,Math.abs(D)));return Q*G},V=(D,Q)=>{const G=Number.isFinite(D)&&D>0?Math.min(D,.25):0,ae=Q||S?1:1-Math.exp(-G*C_);y=Ts(y,I,ae),g.rotation.y=y,g.scale.x=y<0?-1:1},J=(D,Q,G,ae)=>{const fe=Number.isFinite(Q)?Q:0,He=T_(D.x,D.z,D.heading,Oo,Bo,(we,H)=>({height:Yi(we,H,fe)})),Ue=D.velocityX*Math.sin(D.heading)+D.velocityZ*Math.cos(D.heading),W=A_(He,{forwardSpeed:Ue,yawRate:D.yawRate,sailPower:N,relativeWindAngle:L},S),de=Number.isFinite(G)&&G>0?Math.min(G,.25):0,se=ae?1:1-Math.exp(-de*wt.heaveResponseRate),Ae=ae?1:1-Math.exp(-de*wt.tiltResponseRate);C.heave=Ts(C.heave,W.heave,se),C.pitch=Ts(C.pitch,W.pitch,Ae),C.roll=Ts(C.roll,W.roll,Ae),e.position.set(Number.isFinite(D.x)?D.x:0,C.heave+w_,Number.isFinite(D.z)?D.z:0),e.rotation.y=Number.isFinite(D.heading)?D.heading:0,e.rotation.x=C.pitch,e.rotation.z=C.roll,V(G,ae)};return n.add(e),{group:e,update:(D,Q,G)=>{F||J(D,Q,G,!1)},resetPose:(D,Q=0)=>{F||J(D,Q,0,!0)},setReducedMotion:D=>{F||(S=D===!0,S&&V(0,!0))},setSailAngle:(D,Q=!1)=>{F||(I=q(D),V(0,Q))},setSailLoad:(D,Q)=>{F||(N=Number.isFinite(D)?Math.min(1,Math.max(0,D)):0,L=Number.isFinite(Q)?Q:0)},getSailAngle:()=>y,getPose:()=>({...C}),dispose:()=>{if(!F){F=!0;for(const D of t)D.dispose();for(const D of i)D.dispose();e.removeFromParent(),e.clear()}}}}function I_(n,e){const t=n*.5,i=e*.5,r=.45,s=-.55,o=[[-t,r,-i],[t,r,-i],[t*.9,r,i*.62],[0,r,i],[-t*.9,r,i*.62]],a=[[-t*.68,s,-i*.82],[t*.68,s,-i*.82],[t*.45,s,i*.52],[0,s+.18,i*.86],[-t*.45,s,i*.52]],l=[];for(const h of o)l.push(...h);for(const h of a)l.push(...h);l.push(0,s-.08,-i*.12);const c=10,u=[];for(let h=0;h<5;h+=1){const m=(h+1)%5;u.push(h,m,5+m,h,5+m,5+h),u.push(c,5+m,5+h)}const d=new gt;return d.setAttribute("position",new lt(l,3)),d.setIndex(u),d.computeVertexNormals(),d}function L_(n,e){const t=n*.5*.93,i=e*.5*.96,r=.47,s=[[-t,r,-i],[t,r,-i],[t*.96,r,i*.62],[0,r,i],[-t*.96,r,i*.62]],o=[0,r,-.18],a=[];for(const c of s)o.push(...c);for(let c=0;c<s.length;c+=1){const u=(c+1)%s.length;a.push(0,u+1,c+1)}const l=new gt;return l.setAttribute("position",new lt(o,3)),l.setIndex(a),l.computeVertexNormals(),D_(l),l}function D_(n){const e=n.getAttribute("position"),t=n.getIndex();if(!t||t.count<3)throw new Error("Vessel deck needs indexed faces");const i=t.getX(0),r=t.getX(1),s=t.getX(2),o=e.getX(r)-e.getX(i),a=e.getZ(r)-e.getZ(i),l=e.getX(s)-e.getX(i),c=e.getZ(s)-e.getZ(i);if(!(a*l-o*c>0))throw new Error("Vessel deck faces downward")}function Hl(n){const e=new gt;return e.setAttribute("position",new lt([...n],3)),e.setIndex([0,1,2]),e.computeVertexNormals(),e}function Vl(n,e,t){const[i,r,s,o]=t,a=new gt;return a.setAttribute("position",new lt([n,i[0],i[1],n,r[0],r[1],n,s[0],s[1],e,o[0],o[1]],3)),a.setIndex([0,1,3,1,2,3,2,0,3]),a.computeVertexNormals(),a}function Ts(n,e,t){return n+(e-n)*Math.min(1,Math.max(0,t))}const wr=96,Yu=80,Rr=Yu,U_=[-1,1],N_=1.45,Gl=.34,Wl=.055,Xl=.11,F_=.45,O_=.055,ct=32,ql=.06,Oi=2.2,Yl=.24,Bi=18,B_=.27,z_=.2,k_=1;function H_(n){const e=new oc(1,7);e.rotateX(-Math.PI*.5);const t=new pi({color:16052196,transparent:!0,opacity:.5,depthWrite:!1,side:Pt}),i=new Yh(e,t,wr);i.name="phase-five-wake-foam",i.frustumCulled=!1,i.instanceMatrix.setUsage(Pn),n.add(i);const r=new Float32Array(ct*2*2*3),s=new Float32Array(ct*2*2*4),o=new Uint16Array((ct-1)*2*6);let a=0;for(let H=0;H<2;H+=1){const Z=H*ct*2;for(let ee=0;ee<ct-1;ee+=1){const P=Z+ee*2,Me=P+2;o[a++]=P,o[a++]=Me,o[a++]=P+1,o[a++]=P+1,o[a++]=Me,o[a++]=Me+1}}const l=new gt,c=new pt(r,3),u=new pt(s,4);c.setUsage(Pn),u.setUsage(Pn),l.setAttribute("position",c),l.setAttribute("color",u),l.setIndex(new pt(o,1));const d=new pi({color:16777215,vertexColors:!0,transparent:!0,opacity:.42,depthWrite:!1,side:Pt}),h=new We(l,d);h.name="phase-five-wake-ribbon",h.frustumCulled=!1,n.add(h);const m=new Float32Array(Bi*2*3),g=new Float32Array(Bi*2*4),_=new Uint16Array((Bi-1)*6);let p=0;for(let H=0;H<Bi-1;H+=1){const Z=H*2,ee=Z+2;_[p++]=Z,_[p++]=ee,_[p++]=Z+1,_[p++]=Z+1,_[p++]=ee,_[p++]=ee+1}const f=new gt,E=new pt(m,3),x=new pt(g,4);E.setUsage(Pn),x.setUsage(Pn),f.setAttribute("position",E),f.setAttribute("color",x),f.setIndex(new pt(_,1));const v=new pi({color:16777215,vertexColors:!0,transparent:!0,opacity:.78,depthWrite:!1,side:Pt}),T=new We(f,v);T.name="phase-five-bow-wave",T.frustumCulled=!1,n.add(T);const w=Array.from({length:wr},()=>({age:Number.POSITIVE_INFINITY,life:0,x:0,z:0,heading:0,driftX:0,driftZ:0,size:0,elongation:1,kind:0,side:0,waveResponse:0,trimBoost:0,active:!1})),R=new Mt,C=Array.from({length:ct},()=>({age:Number.POSITIVE_INFINITY,x:0,z:0,heading:0,speed:0,yawRate:0,trimBoost:0,active:!1}));let S=0,y=Rr,I=0,N=0,L=0,F=0,q=0,V=0,J=!1,D=!1;const Q=(H,Z,ee,P)=>{if(!Z.active||Z.age>=Z.life){Z.active=!1,R.scale.setScalar(0),R.updateMatrix(),i.setMatrixAt(H,R.matrix);return}const Me=Math.min(1,Math.max(0,Z.age/Z.life)),le=Me<.16?Me/.16:1-(Me-.16)/.84,ye=P?Math.min(Z.trimBoost,V):0,ge=Z.size*(1+ye*.85)*Math.max(0,le);let xe=Yi(Z.x,Z.z,ee),K=0;if(Z.kind!==0){const Ke=Ur(Z.x,Z.z,ee);xe=Ke.height,K=Math.min(.45,Math.hypot(Ke.slopeX,Ke.slopeZ))}const he=1+Z.waveResponse*K;R.position.set(Z.x,xe+z_,Z.z),R.rotation.set(0,Z.heading,0),R.scale.set(ge*Z.elongation*(1+ye*.24)*he,1,ge*(1+ye*.12)*he),R.updateMatrix(),i.setMatrixAt(H,R.matrix)},G=H=>{H.active=!1,H.age=Number.POSITIVE_INFINITY,H.kind=0,H.side=0,H.waveResponse=0,H.trimBoost=0},ae=(H,Z)=>{const ee=Math.sin(H.heading),P=Math.cos(H.heading),Me=Math.cos(H.heading),le=-Math.sin(H.heading),ye=je.length*.52;for(const ge of U_){const xe=S;S=(S+1)%Yu;const K=w[xe],he=(xe*17%11/10-.5)*.12,Ke=je.width*.32+he,Xe=.18+Math.min(.48,Z*.035);K.age=0,K.heading=H.heading,K.life=N_*(.82+xe*13%7*.035),K.x=H.x-ee*ye+Me*ge*Ke,K.z=H.z-P*ye+le*ge*Ke,K.driftX=-ee*(.12+Z*.08)+Me*ge*Xe,K.driftZ=-P*(.12+Z*.08)+le*ge*Xe,K.size=.13+Math.min(.2,Z*.017),K.elongation=1.1+Math.min(.45,Z*.035),K.kind=0,K.side=ge,K.waveResponse=.45,K.trimBoost=V,K.active=!0}},fe=()=>{const H=y;return y=Rr+(y-Rr+1)%(wr-Rr),w[H]},He=(H,Z,ee,P,Me)=>{const le=Math.sin(H.heading),ye=Math.cos(H.heading),ge=Math.cos(H.heading),xe=-Math.sin(H.heading),K=fe();K.age=0,K.life=Gl*(.92+P*.35+Me*.22),K.heading=H.heading+ee*.16,K.x=H.x+le*(je.length*.48)+ge*ee*je.width*.28,K.z=H.z+ye*(je.length*.48)+xe*ee*je.width*.28,K.driftX=le*(.08+Z*.035)+ge*ee*(.2+P*.24+Me*.12),K.driftZ=ye*(.08+Z*.035)+xe*ee*(.2+P*.24+Me*.12),K.size=.13+Math.min(.12,Z*.012)+P*.05+Me*.1,K.elongation=1.35+Math.min(.4,Z*.025)+Me*.18,K.kind=1,K.side=ee,K.waveResponse=1.25,K.active=!0},Ue=(H,Z,ee,P)=>{const Me=Math.sign(H.yawRate);if(Me===0)return;const le=Math.sin(H.heading),ye=Math.cos(H.heading),ge=Math.cos(H.heading),xe=-Math.sin(H.heading),K=fe(),he=Math.min(1,Math.abs(H.yawRate)/.6);K.age=0,K.life=Gl*(1.05+he*.3+P*.18),K.heading=H.heading+Me*.32,K.x=H.x-le*(je.length*.08)+ge*Me*(je.width*.58),K.z=H.z-ye*(je.length*.08)+xe*Me*(je.width*.58),K.driftX=ge*Me*(.22+Z*.035)-le*.06,K.driftZ=xe*Me*(.22+Z*.035)-ye*.06,K.size=.13+he*.1+ee*.04+P*.08,K.elongation=1.5+he*.45+P*.12,K.kind=2,K.side=Me,K.waveResponse=1.1,K.active=!0},W=(H,Z,ee)=>{const P=H.x+Math.sin(H.heading)*je.length*.48,Me=H.z+Math.cos(H.heading)*je.length*.48,le=Ur(P,Me,ee),ye=Math.min(.45,Math.hypot(le.slopeX,le.slopeZ)),ge=Math.abs(le.velocityY+H.velocityX*le.slopeX+H.velocityZ*le.slopeZ),xe=Math.min(.9,ge*.26);He(H,Z,-1,ye,xe),He(H,Z,1,ye,xe),Math.abs(H.yawRate)>=O_&&Ue(H,Z,ye,xe)},de=(H,Z)=>{const ee=C[L];ee.age=0,ee.x=Number.isFinite(H.x)?H.x:0,ee.z=Number.isFinite(H.z)?H.z:0,ee.heading=Number.isFinite(H.heading)?H.heading:0,ee.speed=Z,ee.yawRate=Number.isFinite(H.yawRate)?H.yawRate:0,ee.trimBoost=V,ee.active=!0,L=(L+1)%ct,F=Math.min(ct,F+1)},se=(H,Z)=>{const ee=ct-F;for(let P=0;P<2;P+=1){const Me=P===0?-1:1,le=P*ct*2;let ye=ct,ge=-1;for(let xe=0;xe<ct;xe+=1){const K=xe>=ee,he=xe-ee,Ke=K?(L-F+he+ct)%ct:0,Xe=C[Ke];K&&Xe.active&&Xe.age<Oi&&(ye===ct&&(ye=xe),ge=xe)}for(let xe=0;xe<ct;xe+=1){const K=(le+xe*2)*3,he=(le+xe*2)*4,Ke=xe>=ee,Xe=xe-ee,A=Ke?(L-F+Xe+ct)%ct:0,M=C[A];if(!Ke||!M.active||M.age>=Oi){for(let ze=0;ze<8;ze+=1)s[he+ze]=0;continue}const k=Math.max(0,1-M.age/Oi),$=Z?Math.min(M.trimBoost,V):0,ne=Math.min(1,Math.max(0,M.speed/je.maxForwardSpeed)),j=F>1?Xe/(F-1):1,be=.18+Math.min(1,Math.max(0,1-j)*5)*.82,ce=k*k*(.72+ne*.28)*(.55+be*.45)*(1+$*.16),Re=Math.sin(M.heading),Ie=Math.cos(M.heading),oe=Math.cos(M.heading),me=-Math.sin(M.heading),De=je.length*(.52+ne*.08),Ce=M.x-Re*De,_e=M.z-Ie*De,Oe=je.width*(.34+ne*.1)*(1+$*.2)*be,U=Oe+(.62+ne*1.05+Math.min(.45,Math.abs(M.yawRate)*.72))*(.32+k*.68)*(1+$*.82)*be,ie=Ce+oe*Me*Oe,pe=_e+me*Me*Oe,Ee=Ce+oe*Me*U,re=_e+me*Me*U,te=Yi(ie,pe,H)+Yl,Pe=Yi(Ee,re,H)+Yl;r[K]=ie,r[K+1]=te,r[K+2]=pe,r[K+3]=Ee,r[K+4]=Pe,r[K+5]=re,s[he]=1,s[he+1]=1,s[he+2]=1,s[he+3]=ce,s[he+4]=1,s[he+5]=1,s[he+6]=1,s[he+7]=ce}if(ge<0)for(let xe=0;xe<ct;xe+=1){const K=(le+xe*2)*3;for(let he=0;he<6;he+=1)r[K+he]=0}else for(let xe=0;xe<ct;xe+=1){const K=xe>=ee,he=xe-ee,Ke=K?(L-F+he+ct)%ct:0,Xe=C[Ke];if(K&&Xe.active&&Xe.age<Oi)continue;let A=xe<=ye?ye:xe-1;for(;A>=ye;){const $=A>=ee,ne=A-ee,j=$?(L-F+ne+ct)%ct:0,be=C[j];if($&&be.active&&be.age<Oi)break;A-=1}A<ye&&(A=ye);const M=(le+xe*2)*3,k=(le+A*2)*3;for(let $=0;$<6;$+=1)r[M+$]=r[k+$]}}l.getAttribute("position").needsUpdate=!0,l.getAttribute("color").needsUpdate=!0},Ae=(H,Z,ee,P)=>{if(!P){m.fill(0),g.fill(0),E.needsUpdate=!0,x.needsUpdate=!0;return}const Me=Math.sin(H.heading),le=Math.cos(H.heading),ye=Math.cos(H.heading),ge=-Math.sin(H.heading),xe=H.x+Me*je.length*.48,K=H.z+le*je.length*.48,he=xe-Me*.78,Ke=K-le*.78,Xe=Ur(xe,K,ee),A=Math.min(.5,Math.hypot(Xe.slopeX,Xe.slopeZ)),M=Math.abs(Xe.velocityY+H.velocityX*Xe.slopeX+H.velocityZ*Xe.slopeZ),k=Math.min(.9,M*.26),$=Math.min(1,Math.max(0,Z/je.maxForwardSpeed)),ne=.9+$*.22+k*.14,j=.18+$*.12+A*.1+k*.08,be=Math.min(.92,.28+$*.48+k*.18);for(let ce=0;ce<Bi;ce+=1){const Re=Math.PI-ce/(Bi-1)*Math.PI,Ie=Math.cos(Re),oe=Math.sin(Re);for(let me=0;me<2;me+=1){const De=ne+me*j,Ce=Ie*De,_e=oe*De,Oe=(ce*2+me)*3,U=(ce*2+me)*4,ie=he+ye*Ce+Me*_e,pe=Ke+ge*Ce+le*_e;m[Oe]=ie,m[Oe+1]=Yi(ie,pe,ee)+B_,m[Oe+2]=pe,g[U]=1,g[U+1]=1,g[U+2]=1,g[U+3]=be*(me===0?1:.78)}}E.needsUpdate=!0,x.needsUpdate=!0},we=()=>{if(!D){I=0,N=0,S=0,y=Rr,L=0,F=0,q=0,V=0;for(const H of w)G(H);for(const H of C)H.trimBoost=0,H.active=!1;for(let H=0;H<wr;H+=1)Q(H,w[H],0,!1);se(0,!1),Ae({x:0,z:0,velocityX:0,velocityZ:0,heading:0},0,0,!1),i.instanceMatrix.needsUpdate=!0}};return we(),{update:(H,Z,ee)=>{if(D||J)return;const P=Number.isFinite(ee)?Math.min(.1,Math.max(0,ee)):0;if(P<=0)return;const Me=Number.isFinite(Z)?Z:0,le=H.velocityX*Math.sin(H.heading)+H.velocityZ*Math.cos(H.heading),ye=Math.max(0,le),ge=ye>=F_;for(const he of w)he.active&&(he.age+=P,he.x+=he.driftX*P,he.z+=he.driftZ*P,he.age>=he.life&&(he.active=!1));let xe=!1;for(const he of C)he.active&&(he.age+=P,he.age>=Oi?he.active=!1:xe=!0);if(!xe&&F>0&&(F=0,L=0),ge){for(F===0&&de(H,ye),q+=P;q>=ql;)q-=ql,de(H,ye);for(I+=P;I>=Wl;)I-=Wl,ae(H,ye);for(N+=P;N>=Xl;)N-=Xl,W(H,ye,Me)}else I=0,N=0,q=0;const K=ge&&V>0;for(let he=0;he<wr;he+=1)Q(he,w[he],Me,K);se(Me,K),Ae(H,ye,Me,ge),i.instanceMatrix.needsUpdate=!0},reset:we,setTrimBoost:H=>{if(!D){if(V=Number.isFinite(H)?Math.min(k_,Math.max(0,H)):0,V===0){for(const Z of w)Z.trimBoost=0;for(const Z of C)Z.trimBoost=0}J&&(V=0)}},setReducedMotion:H=>{D||J===H||(J=H,H&&(V=0,we()))},dispose:()=>{D||(D=!0,i.removeFromParent(),i.dispose(),e.dispose(),t.dispose(),h.removeFromParent(),l.dispose(),d.dispose(),T.removeFromParent(),f.dispose(),v.dispose(),R.clear())}}}const Jt=1e-7,zo=.28,Zl=20;function Nr(n){return typeof n=="number"&&Number.isFinite(n)}function V_(n){return Nr(n?.x)&&Nr(n?.z)}function Zi(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function Tn(n,e,t){return{ok:!1,islandId:n,reason:e,message:t}}function G_(n,e,t){return Math.min(t,Math.max(e,n))}function W_(n,e,t){const i=t.x-e.x,r=t.z-e.z,s=i*i+r*r;if(s<=Jt)return Zi(n,e);const o=G_(((n.x-e.x)*i+(n.z-e.z)*r)/s,0,1);return Math.hypot(n.x-(e.x+i*o),n.z-(e.z+r*o))}function Fr(n,e,t){const i=e-t;return n.x>=-i-Jt&&n.x<=i+Jt&&n.z>=-i-Jt&&n.z<=i+Jt}function X_(n,e,t,i,r){if(!Fr(n,i,r)||!Fr(e,i,r))return!1;for(const s of t){const o=s.radius+r;if(W_(s.center,n,e)<o-Jt)return!1}return!0}function q_(n){let e=0;for(let t=1;t<n.length;t+=1)e+=Zi(n[t-1],n[t]);return e}function $l(n){return`${n.x.toFixed(5)}:${n.z.toFixed(5)}`}function Y_(n,e,t,i,r=i?.vesselClearance){const s=t.find(L=>L.id===e);if(!s)return Tn(e,"unknown-island",`Unknown island "${e}".`);if(!V_(n))return Tn(e,"invalid-start","The vessel position is not finite.");const o=i?.worldLimit,a=r;if(!Nr(o)||o<=0||!Nr(a)||a<0||a>=o)return Tn(e,"invalid-bounds","Navigation bounds must be finite and leave room for the vessel.");if(!Fr(n,o,a))return Tn(e,"invalid-start","The vessel is outside the navigable water bounds.");const l=t.map(L=>({center:{x:L.position.x,z:L.position.z},radius:L.landCollisionRadius})),c=t.findIndex(L=>L.id===e),u=s.landCollisionRadius+a,d=s.dockingTriggerRadius-u;if(!Nr(d)||d<=zo*2)return Tn(e,"target-annulus-too-small","There is not enough safe water inside the docking zone.");if(Zi(n,l[c].center)<u-Jt)return Tn(e,"start-in-obstacle","The vessel starts inside an island clearance envelope.");const m=l[c].center,g=n.x-m.x,_=n.z-m.z,p=Math.hypot(g,_),f=u+Math.min(zo,d*.34),E=p>Jt?g/p:1,x=p>Jt?_/p:0,v={x:m.x+E*f,z:m.z+x*f};if(!Fr(v,o,a))return Tn(e,"target-out-of-bounds","The docking point is outside the navigable water bounds.");const T=[{point:{x:n.x,z:n.z},obstacleIndex:null},{point:v,obstacleIndex:null}],w=new Set(T.map(L=>$l(L.point)));t.forEach((L,F)=>{const q=L.landCollisionRadius+a+zo;for(let V=0;V<Zl;V+=1){const J=V/Zl*Math.PI*2,D={x:L.position.x+Math.cos(J)*q,z:L.position.z+Math.sin(J)*q};if(!Fr(D,o,a)||t.some((G,ae)=>ae===F?!1:Zi(D,{x:G.position.x,z:G.position.z})<G.landCollisionRadius+a-Jt))continue;const Q=$l(D);w.has(Q)||(w.add(Q),T.push({point:D,obstacleIndex:F}))}});const R=T.map(()=>[]);for(let L=0;L<T.length;L+=1)for(let F=L+1;F<T.length;F+=1){if(!X_(T[L].point,T[F].point,l,o,a))continue;const q=Zi(T[L].point,T[F].point);R[L].push({to:F,cost:q}),R[F].push({to:L,cost:q})}const C=T.map(()=>Number.POSITIVE_INFINITY),S=T.map(()=>-1),y=T.map(()=>!1);C[0]=0;for(let L=0;L<T.length;L+=1){let F=-1,q=Number.POSITIVE_INFINITY;for(let V=0;V<T.length;V+=1)!y[V]&&C[V]<q&&(q=C[V],F=V);if(F<0||!Number.isFinite(q)||(y[F]=!0,F===1))break;for(const V of R[F]){const J=q+V.cost;J<C[V.to]-Jt&&(C[V.to]=J,S[V.to]=F)}}if(!Number.isFinite(C[1]))return Tn(e,"no-safe-route","No bounded safe route to the docking zone could be found.");const I=[];for(let L=1;L>=0&&(I.push(T[L].point),L!==0);L=S[L])if(S[L]<0)return Tn(e,"no-safe-route","The safe route graph is disconnected.");I.reverse();const N=I.filter((L,F)=>F===0||Zi(L,I[F-1])>Jt);return{ok:!0,islandId:e,points:N,target:v,distance:q_(N),clearance:a}}const Kl=.8,jl=12,Z_=16,$_=60,Zu=1e-7,K_=.01;function Wn(n){return typeof n=="number"&&Number.isFinite(n)}function cr(n,e,t){return Math.min(t,Math.max(e,n))}function Vr(n){const e=(n+Math.PI)%(Math.PI*2);return e<0?e+Math.PI*2-Math.PI:e-Math.PI}function j_(n,e){return Vr(e-n)}function hc(n,e){return Math.hypot(n.x-e.x,n.z-e.z)}function J_(n){let e=0;for(let t=1;t<n.length;t+=1)e+=hc(n[t-1],n[t]);return e}function Fa(n){return{x:n.x,z:n.z}}function $u(n){return{x:Wn(n?.x)?n.x:0,z:Wn(n?.z)?n.z:0,heading:Vr(Wn(n?.heading)?n.heading:0)}}function Q_(n){return{...$u(n),status:"idle",islandId:null,route:[],elapsed:0,duration:0,travelledDistance:0,totalDistance:0,velocityX:0,velocityZ:0,reason:null}}function Hi(n={x:0,z:0,heading:0}){return Q_(n)}function Ns(n,e,t){return{...n,status:e,reason:t,velocityX:0,velocityZ:0}}function ev(n,e){if(n.length===0)return{point:{x:0,z:0},heading:0};if(n.length===1)return{point:Fa(n[0]),heading:0};let t=Math.max(0,e);for(let s=1;s<n.length;s+=1){const o=n[s-1],a=n[s],l=hc(o,a);if(t<=l||s===n.length-1){const c=l>Zu?cr(t/l,0,1):1;return{point:{x:o.x+(a.x-o.x)*c,z:o.z+(a.z-o.z)*c},heading:Math.atan2(a.x-o.x,a.z-o.z)}}t-=l}const i=n[n.length-1],r=n[n.length-2];return{point:Fa(i),heading:Math.atan2(i.x-r.x,i.z-r.z)}}function tv(n){const e=cr(n,0,1);return e*e*(3-2*e)}function nv(n,e,t={}){const i=n??Hi(),r=e?.route,s=Array.isArray(r)&&r.every(h=>Wn(h?.x)&&Wn(h?.z)),o=s?r.map(Fa):[];if(!e?.islandId||!s||o.length===0)return Ns({...i,islandId:e?.islandId??null,route:o},"failed","Scanner route is empty or invalid.");if(hc(i,o[0])>K_)return Ns({...i,islandId:e.islandId,route:o},"failed","Scanner route does not start at the vessel position.");const a=J_(o);if(a<=Zu)return Ns({...i,islandId:e.islandId,route:o,x:o[o.length-1].x,z:o[o.length-1].z},"arrived",null);const l=Wn(t.maxSpeed)&&t.maxSpeed>0?t.maxSpeed:Z_,c=cr(a/l,Kl,jl),u=Wn(t.duration)&&t.duration>0?cr(t.duration,Kl,jl):c,d=$u(i);return{...i,...d,x:o[0].x,z:o[0].z,heading:Vr(d.heading),status:"active",islandId:e.islandId,route:o,elapsed:0,duration:u,travelledDistance:0,totalDistance:a,velocityX:0,velocityZ:0,reason:null}}function iv(n,e="Scanner cancelled by user."){return Ns({...n},"cancelled",e)}function Jl(n,e){if(!n||n.status!=="active")return n;const t=Wn(e)?cr(e,0,$_):0,i=Math.min(n.duration,n.elapsed+t),r=n.duration>0?i/n.duration:1,s=tv(r),o=n.totalDistance*s,a=ev(n.route,o),l={x:n.x,z:n.z},c=t>0?(a.point.x-l.x)/t:0,u=t>0?(a.point.z-l.z)/t:0,d=r>=1?1:cr(t*5.5,0,1),h=Vr(n.heading+j_(n.heading,a.heading)*d);return r>=1-Number.EPSILON?{...n,x:n.route[n.route.length-1].x,z:n.route[n.route.length-1].z,heading:Vr(a.heading),elapsed:n.duration,travelledDistance:n.totalDistance,status:"arrived",velocityX:0,velocityZ:0,reason:null}:{...n,x:a.point.x,z:a.point.z,heading:h,elapsed:i,travelledDistance:o,velocityX:c,velocityZ:u}}function zi(n){return n.status==="active"}const Rn={centralLimit:180,outerLimit:360,centralStep:4,outerStep:12},ki=[.012,.16,.23],ko=[.018,.31,.4],Ho=[.045,.43,.5],Ql=[.34,.58,.56],eu=[.007,.02,.045],rv=[.016,.055,.085],sv=[.055,.12,.16],ov=[.28,.34,.36];function av(n){const e=lv(),t=e.length*e.length,i=new Float32Array(t*3),r=new Float32Array(t*3),s=[],o=[];let a=0;for(let f=0;f<e.length;f+=1)for(let E=0;E<e.length;E+=1){const x=e[E],v=e[f];o.push([x,v]),i[a*3]=x,i[a*3+1]=0,i[a*3+2]=v,a+=1}const l=e.length;for(let f=0;f<l-1;f+=1)for(let E=0;E<l-1;E+=1){const x=f*l+E,v=x+1,T=x+l,w=T+1;(f+E)%2===0?s.push(x,T,v,v,T,w):s.push(x,T,w,x,w,v)}const c=new gt,u=new pt(i,3),d=new pt(r,3);u.setUsage(Pn),d.setUsage(Pn),c.setAttribute("position",u),c.setAttribute("color",d),c.setIndex(s),c.computeVertexNormals();const h=new jt({color:16777215,roughness:.5,metalness:.08,flatShading:!0,vertexColors:!0}),m=new We(c,h);m.name="phase-one-water-field",n.add(m);const g=cv();n.add(g.mesh);let _=!1;const p=f=>{if(_)return;const E=Number.isFinite(f)?f:0,x=c.getAttribute("position"),v=c.getAttribute("color");for(let T=0;T<o.length;T+=1){const[w,R]=o[T],C=Ur(w,R,E);x.setY(T,C.height),uv(v,T,C.height,C.slopeX,C.slopeZ,C.stormIntensity)}x.needsUpdate=!0,v.needsUpdate=!0,g.update(E)};return p(0),{mesh:m,crestMesh:g.mesh,update:p,dispose:()=>{_||(_=!0,c.dispose(),h.dispose(),m.removeFromParent(),g.dispose())}}}function cv(){const n=Bt.directionX,e=Bt.directionZ,t=-e,i=n,r=1/(n*n+e*e),s=1/(t*t+i*i),o=4,a=.24,l=44,c=Rn.outerLimit*(Math.abs(t)+Math.abs(i)),u=Rn.outerLimit*(Math.abs(n)+Math.abs(e)),d=Math.ceil((-u*Bt.waveNumber-Math.PI*.5)/(Math.PI*2))-1,h=Math.floor((u*Bt.waveNumber-Math.PI*.5)/(Math.PI*2))+1,m=Math.PI*2/Bt.waveNumber,g=(Math.PI*.5+d*Math.PI*2)/Bt.waveNumber,_=(h-d+1)*m,p=[];for(let N=d;N<=h;N+=1){let L=0;for(let F=-c;F<=c;F+=l)p.push({normalIndex:N,tangentCenter:F,activity:hv(N*31+L*17+401,N*13+L*7+911)}),L+=1}const f=new Float32Array(p.length*4*3),E=new Float32Array(p.length*4),x=new Float32Array(p.length*4*2),v=[];for(let N=0;N<p.length;N+=1){const L=N*4;v.push(L,L+1,L+2,L,L+2,L+3),x[(L+0)*2]=0,x[(L+0)*2+1]=0,x[(L+1)*2]=1,x[(L+1)*2+1]=0,x[(L+2)*2]=1,x[(L+2)*2+1]=1,x[(L+3)*2]=0,x[(L+3)*2+1]=1}const T=new gt,w=new pt(f,3),R=new pt(E,1);w.setUsage(Pn),R.setUsage(Pn),T.setAttribute("position",w),T.setAttribute("crestOpacity",R),T.setAttribute("crestUv",new pt(x,2)),T.setIndex(v);const C=new Dn({transparent:!0,depthWrite:!1,side:Pt,toneMapped:!1,uniforms:{},vertexShader:`
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
    `}),S=new We(T,C);S.name="phase-one-water-crest-ribbons";let y=!1;const I=N=>{if(y)return;const L=Number.isFinite(N)?N:0,F=L*Bt.angularSpeed/Bt.waveNumber;for(let q=0;q<p.length;q+=1){const V=p[q],J=(Math.PI*.5+V.normalIndex*Math.PI*2)/Bt.waveNumber,D=g+fv(J-F-g,_),Q=n*D*r+t*V.tangentCenter*s,G=e*D*r+i*V.tangentCenter*s,ae=Math.max(0,Math.sin(a_(Q,G,L))),fe=Vi(.42,.9,.5+.5*Math.cos(c_(Q,G,L))),He=V.activity>.48?1:0,Ue=dv(Q,G),W=He*ae*fe*(.3+Ue*.18),de=t*o,se=i*o,Ae=n*a,we=e*a,H=q*4;As(w,H,Q-de-Ae,G-se-we,L,Ue),As(w,H+1,Q+de-Ae,G+se-we,L,Ue),As(w,H+2,Q+de+Ae,G+se+we,L,Ue),As(w,H+3,Q-de+Ae,G-se+we,L,Ue),R.setX(H,W),R.setX(H+1,W),R.setX(H+2,W),R.setX(H+3,W)}w.needsUpdate=!0,R.needsUpdate=!0};return I(0),{mesh:S,update:I,dispose:()=>{y||(y=!0,T.dispose(),C.dispose(),S.removeFromParent())}}}function As(n,e,t,i,r,s=0){n.setXYZ(e,t,Yi(t,i,r)+.045+s*.018,i)}function lv(){const n=[];for(let e=-360;e<-180;e+=Rn.outerStep)n.push(e);for(let e=-180;e<=Rn.centralLimit;e+=Rn.centralStep)n.push(e);for(let e=Rn.centralLimit+Rn.outerStep;e<=Rn.outerLimit;e+=Rn.outerStep)n.push(e);return n}function uv(n,e,t,i,r,s=0){const o=Math.min(1,Math.max(0,s)),a=1+o*(zt.maxWaveScale-1),l=(t+Na*a)/(Na*2*a),c=Vi(.1,.52,l),u=Vi(.6,.9,l)*.52,d=Math.min(1,Math.hypot(i,r)*2.8),h=Vi(.76,.96,l)*Vi(.24,.5,d)*.16,m=ki[0]+(ko[0]-ki[0])*c,g=ki[1]+(ko[1]-ki[1])*c,_=ki[2]+(ko[2]-ki[2])*c,p=m+(Ho[0]-m)*u,f=g+(Ho[1]-g)*u,E=_+(Ho[2]-_)*u,x=Math.min(.3,h+o*Vi(.38,.78,d)*.06);for(let v=0;v<3;v+=1){const T=eu[v]+(rv[v]-eu[v])*c,w=T+(sv[v]-T)*u,R=v===0?p:v===1?f:E,C=R+(w-R)*o,S=Ql[v]+(ov[v]-Ql[v])*o;n.array[e*3+v]=C+(S-C)*x}}function dv(n,e){return Math.min(1,Math.max(0,qs(n,e).intensity))}function Vi(n,e,t){const i=Math.min(1,Math.max(0,(t-n)/(e-n)));return i*i*(3-2*i)}function hv(n,e){const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function fv(n,e){return(n%e+e)%e}const tu=1.75,ri=1/120,pv=.1,nu=12;function mv(n,e={}){const t=e.reducedMotion??(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches),i=new Wh;i.background=new $e(536381),i.fog=new rc(536381,540,800);const r=r_(),s=r.camera,o=new G0({antialias:!0,powerPreference:"high-performance"});o.setPixelRatio(Math.min(window.devicePixelRatio||1,tu)),o.setClearColor(536381,1),o.outputColorSpace=qt,o.toneMapping=pu,o.toneMappingExposure=1.12,o.shadowMap.enabled=!1,o.domElement.setAttribute("aria-label","Animated isometric water field"),o.domElement.style.display="block",o.domElement.style.width="100%",o.domElement.style.height="100%",o.domElement.style.touchAction="none",n.appendChild(o.domElement);const a=av(i),l=Z0(i,e.islands??[]),c=P_(i),u=H_(i);let d=!!t;c.setReducedMotion(d),u.setReducedMotion(d);let h=!1,g=Ol(Gi.x,Gi.z),_={throttle:0,rudder:0,brake:!1},p=Ll();const f={worldLimit:zt.worldLimit,obstacles:(e.islands??[]).map(Z=>({x:Z.position.x,z:Z.position.z,radius:Z.landCollisionRadius}))};let E=Hi({x:g.x,z:g.z,heading:g.heading}),x={status:"idle",islandId:null};const v=()=>{const Z=zi(E),ee=_.brake||h,P=cn(g,p.sailAngle,ee?1:0),Me=Z?P.suggestedAngle:p.sailAngle,le=Z?cn(g,Me):P,ye=cn(g,P.suggestedAngle).power;return{sailAngle:Me,suggestedAngle:le.suggestedAngle,signedSailAngle:le.signedAngle,relativeWindAngle:le.relativeWindAngle,power:le.power,noGo:le.noGo,windSpeed:Vu(Ua(),g.velocityX,g.velocityZ).speed,luffing:ee,moored:h,assisted:Z,trimMode:p.mode,trimEngaged:p.engaged,trimEfficiency:ye>1e-6?Wo(le.power/ye,0,1):0,sweetSpot:!Z&&!ee&&!le.noGo&&p.sweetSpot,trimBoost:Z||ee||le.noGo?0:p.boost,boostSerial:p.boostSerial}},T=(Z=!1)=>{const ee=v();c.setSailLoad(ee.power,ee.relativeWindAngle),c.setSailAngle(ee.signedSailAngle,Z),e.onSailingUpdate?.(ee)},w=(Z,ee,P)=>{x=P===void 0?{status:Z,islandId:ee}:{status:Z,islandId:ee,message:P},e.onScanUpdate?.(x)},R=()=>{u.reset(),T(!0),c.resetPose(g,G),r.snapTo(g.x,g.z),a.update(G),e.onVesselUpdate?.(Rs(g)),e.onLandmarkProjection?.(ws(s,Vo(n),Go(n),l.anchors,e.framingInsets)),o.render(i,s)},C=Z=>{E=Z,Z.status==="arrived"&&(h=!0),g={x:Z.x,z:Z.z,velocityX:Z.velocityX,velocityZ:Z.velocityZ,heading:Z.heading,yawRate:0}},S=Z=>{const ee=Z.status==="active"?"travelling":Z.status;w(ee,Z.islandId,Z.reason??void 0)},y=Z=>{zi(E)&&(C(iv(E,Z)),S(E))},I=Z=>{if(!zi(E))return;const ee=E.status;C(Jl(E,Z)),E.status!==ee&&S(E)};i.add(new tf(10999760,471872,1.65));const N=new tl(16769723,2.35);N.position.set(-55,80,42),i.add(N);const L=new tl(6209481,.48);L.position.set(75,42,-65),i.add(L);let F=!1,q=t,V=typeof document<"u"?document.hidden:!1,J=!0,D=null,Q=0,G=0,ae=0;const fe=()=>q||V||!J,He=Z=>{if(F)return;Q||(Q=Z);const ee=Math.min(Math.max(0,(Z-Q)/1e3),pv);if(Q=Z,!fe()){ae=Math.min(ae+ee,ri*nu);let P=0;for(;ae+1e-9>=ri&&P<nu;)zi(E)?I(ri):h||(p=Dl(p,g,{sheet:_.sheet??0,engage:_.targetHeading!==void 0||Math.abs(_.rudder)>1e-6,resumeAuto:!1,suppressed:_.brake},ri),g=y_(g,{..._,sailAngle:p.sailAngle,trimBoost:p.boost},ri,f,d?void 0:G)),G+=ri,ae=Math.max(0,ae-ri),P+=1;r.update(g.x,g.z,ee),T(),c.update(g,G,ee),u.setTrimBoost(zi(E)||h?0:p.boost),u.update(g,G,ee),e.onVesselUpdate?.(Rs(g))}if(e.onLandmarkProjection?.(ws(s,Vo(n),Go(n),l.anchors,e.framingInsets)),a.update(G),o.render(i,s),fe()){D=null;return}D=window.requestAnimationFrame(He)},Ue=()=>{F||D!==null||(Q=0,D=window.requestAnimationFrame(He))},W=()=>{D!==null&&(window.cancelAnimationFrame(D),D=null)},de=()=>{if(F)return;const Z=Math.max(1,n.clientWidth||window.innerWidth),ee=Math.max(1,n.clientHeight||window.innerHeight);r.resize(Z,ee),o.setPixelRatio(Math.min(window.devicePixelRatio||1,tu)),o.setSize(Z,ee,!1),e.onLandmarkProjection?.(ws(s,Z,ee,l.anchors,e.framingInsets)),fe()&&o.render(i,s)},se=Z=>{F||(Z&&y("Scanner navigation paused."),q=Z,fe()?(W(),ae=0,Q=0,_={throttle:0,rudder:0,brake:!1},p=Hn(p),u.setTrimBoost(0),o.render(i,s)):Ue(),e.onSailingUpdate?.(v()))},Ae=()=>{V=document.hidden,fe()?(W(),ae=0,Q=0,_={throttle:0,rudder:0,brake:!1},p=Hn(p),u.setTrimBoost(0),o.render(i,s)):Ue()},we=typeof IntersectionObserver<"u"?new IntersectionObserver(Z=>{J=Z[0]?.isIntersecting??!0,fe()?(W(),ae=0,Q=0,_={throttle:0,rudder:0,brake:!1},p=Hn(p),u.setTrimBoost(0),o.render(i,s)):Ue()},{threshold:.01}):null,H=typeof ResizeObserver<"u"?new ResizeObserver(de):null;return de(),T(!0),c.resetPose(g,G),r.snapTo(g.x,g.z),e.onVesselUpdate?.(Rs(g)),e.onScanUpdate?.(x),H?.observe(n),window.addEventListener("resize",de),we?.observe(n),document.addEventListener("visibilitychange",Ae),fe()?o.render(i,s):Ue(),{setPaused:se,setReducedMotion:Z=>{F||(d=Z,c.setReducedMotion(Z),u.setReducedMotion(Z),fe()&&o.render(i,s))},setInput:Z=>{if(F)return;const ee={throttle:0,sheet:Wo(Z.sheet??0,-1,1),rudder:Wo(Z.rudder,-1,1),brake:!!Z.brake,targetHeading:Number.isFinite(Z.targetHeading)?Z.targetHeading:void 0};(ee.targetHeading!==void 0||Math.abs(ee.sheet)>1e-6||Math.abs(ee.rudder)>1e-6||ee.brake)&&(h=!1,y("Scanner navigation cancelled by helm input."),E.status==="arrived"&&(E=Hi({x:g.x,z:g.z,heading:g.heading}),S(E))),_=ee,ee.brake&&(p=Hn(p),u.setTrimBoost(0)),e.onSailingUpdate?.(v())},setAutoTrim:()=>{F||fe()||(_={throttle:0,rudder:0,brake:!1},h=!1,y("Scanner navigation cancelled by helm input."),E.status==="arrived"&&(E=Hi({x:g.x,z:g.z,heading:g.heading}),S(E)),p=Dl(Hn(p),g,{sheet:0,engage:!0,resumeAuto:!0,suppressed:!1},0),e.onSailingUpdate?.(v()))},resetVessel:()=>{F||(u.reset(),h=!1,g=Ol(Gi.x,Gi.z),E=Hi({x:g.x,z:g.z,heading:g.heading}),S(E),_={throttle:0,rudder:0,brake:!1},p=Hn(p),u.setTrimBoost(0),ae=0,Q=0,G=0,p=Ll(),T(!0),c.resetPose(g,G),r.snapTo(g.x,g.z),a.update(G),e.onVesselUpdate?.(Rs(g)),e.onLandmarkProjection?.(ws(s,Vo(n),Go(n),l.anchors,e.framingInsets)),o.render(i,s))},getVesselState:()=>({...g}),getSailingState:v,startScan:(Z,ee={})=>{if(F)return;const P=Y_({x:g.x,z:g.z},Z,e.islands??[],{worldLimit:zt.worldLimit,vesselClearance:je.collisionRadius});if(!P.ok){y("Scanner navigation replaced by an invalid route."),_={throttle:0,rudder:0,brake:!1},p=Hn(p),u.setTrimBoost(0),w("failed",Z,P.message);return}_={throttle:0,rudder:0,brake:!1},p=Hn(p),u.setTrimBoost(0),h=!1;const Me=Hi({x:g.x,z:g.z,heading:g.heading});if(C(nv(Me,{islandId:Z,route:P.points})),!!ee.instant||q){zi(E)&&C(Jl(E,E.duration)),ae=0,Q=0,R(),S(E);return}S(E),Ue()},cancelScan:()=>{F||y("Scanner navigation cancelled.")},dispose:()=>{F||(F=!0,W(),H?.disconnect(),window.removeEventListener("resize",de),we?.disconnect(),document.removeEventListener("visibilitychange",Ae),l.dispose(),c.dispose(),u.dispose(),r.dispose(),a.dispose(),o.dispose(),o.domElement.remove(),i.clear())}}}function ws(n,e,t,i,r){const s=gv(e,t,r);return i.map(({id:o,position:a})=>{const l=a.clone().project(n),c=(l.x*.5+.5)*e,u=(1-(l.y*.5+.5))*t;return{id:o,x:c,y:u,visible:l.z>=-1&&l.z<=1&&c>=s.left&&c<=e-s.right&&u>=s.top&&u<=t-s.bottom}})}function gv(n,e,t){const i=e<=460,r=n<=600?{top:140,right:20,bottom:68,left:20}:{top:160,right:28,bottom:70,left:28};return i&&(r.top=112),{top:Math.max(0,t?.top??r.top),right:Math.max(0,t?.right??r.right),bottom:Math.max(0,t?.bottom??r.bottom),left:Math.max(0,t?.left??r.left)}}function Vo(n){return Math.max(1,n.clientWidth||window.innerWidth)}function Go(n){return Math.max(1,n.clientHeight||window.innerHeight)}function Wo(n,e,t){return Math.min(t,Math.max(e,Number.isFinite(n)?n:0))}function Rs(n){return{x:n.x,z:n.z,heading:n.heading,speed:Math.hypot(n.velocityX,n.velocityZ)}}const iu={boost:0,serial:0,paused:!1,reducedMotion:!1},_v=.75,vv=.075,xv=.012,Mv=.05,Sv=.16,ru=n=>Number.isFinite(n)?Math.min(1,Math.max(0,n)):0,yv=()=>{const n=globalThis;return typeof n.AudioContext=="function"?n.AudioContext:typeof n.webkitAudioContext=="function"?n.webkitAudioContext:null};function Ev(){let n=null,e=null,t=null,i=null,r=!1,s=!1,o=!1,a=!1,l=null,c=0,u=iu.serial,d=iu;const h=typeof document>"u"?null:document;a=!!h?.hidden;const m=()=>{a=!!h?.hidden,p()};h?.addEventListener("visibilitychange",m);const g=()=>{try{e?.stop()}catch{}try{e?.disconnect()}catch{}try{t?.disconnect()}catch{}try{i?.disconnect()}catch{}e=null,t=null,i=null},_=async()=>{const x=n;if(n=null,g(),!!x)try{await x.close()}catch{}},p=()=>{if(!n||!i||!t||r)return;const x=n.currentTime,v=ru(d.boost),T=s&&!a&&!d.paused&&!d.reducedMotion&&v>0,w=x<c?1.35:1,R=T?Math.min(vv,(xv+Mv*v)*w):0,C=560+v*980;i.gain.cancelScheduledValues(x),i.gain.setTargetAtTime(R,x,R>0?.065:.035),t.frequency.cancelScheduledValues(x),t.frequency.setTargetAtTime(C,x,.09)},f=x=>{const v=Number.isFinite(x.sampleRate)&&x.sampleRate>0?x.sampleRate:44100,T=Math.max(2048,Math.min(32768,Math.round(v*_v))),w=x.createBuffer(1,T,v),R=w.getChannelData(0);let C=99539473;for(let N=0;N<R.length;N+=1)C=Math.imul(C,1664525)+1013904223>>>0,R[N]=C/4294967295*2-1;const S=x.createBufferSource();e=S,S.buffer=w,S.loop=!0;const y=x.createBiquadFilter();t=y,y.type="lowpass",y.frequency.value=560,y.Q.value=.45;const I=x.createGain();i=I,I.gain.value=0,S.connect(y),y.connect(I),I.connect(x.destination);try{S.start()}catch(N){throw g(),N}},E=async()=>{if(r)return!1;const x=yv();if(!x)return!1;try{return n||(n=new x,f(n)),n.state==="suspended"&&await n.resume(),r||!o?(await _(),!1):(s=!0,p(),!0)}catch{return s=!1,await _(),!1}};return{setEnabled:x=>r?Promise.resolve(!1):x?(o=!0,l||(l=E().finally(()=>{l=null}),l)):(o=!1,s=!1,p(),Promise.resolve(!0)),update:x=>{if(r)return;const v=ru(x.boost),T=Number.isFinite(x.serial)?x.serial:0;d={boost:v,serial:T,paused:!!x.paused,reducedMotion:!!x.reducedMotion},T!==u&&v>0&&!d.paused&&!d.reducedMotion&&(c=(n?.currentTime??0)+Sv),u=T,p()},dispose:()=>{r||(r=!0,o=!1,s=!1,h?.removeEventListener("visibilitychange",m),_())}}}const Ku=document.querySelector("#app");if(!Ku)throw new Error("The app mount point is missing.");const xi=window.matchMedia("(prefers-reduced-motion: reduce)");let kt=xi.matches;const pr=Ev();let fi=!1,er=!0,Xo=0;Ku.innerHTML=`
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
`;const ju=document.querySelector("[data-scene-layer]"),fc=document.querySelector("[data-landmark-layer]"),lr=document.querySelector("[data-motion-toggle]"),Ys=document.querySelector("[data-vessel-controls]"),hn=document.querySelector("[data-sailing-hud]"),Oa=document.querySelector("[data-wind-marker]"),Ba=document.querySelector("[data-wind-direction]"),za=document.querySelector("[data-wind-speed]"),ka=document.querySelector("[data-sail-angle]"),Ha=document.querySelector("[data-suggested-trim]"),Va=document.querySelector("[data-trim-mode]"),Ga=document.querySelector("[data-trim-meter]"),Wa=document.querySelector("[data-trim-efficiency]"),Xa=document.querySelector("[data-trim-sweetspot]"),In=document.querySelector("[data-sound-toggle]"),Ot=document.querySelector("[data-sailing-guidance]"),su=document.querySelector(".vessel-model-note"),Ju=document.querySelector("[data-webgl-fallback]"),Qu=document.querySelector("[data-island-summary]"),ed=document.querySelector(".portfolio-shell");if(!ju||!fc||!lr||!Ys||!hn||!Oa||!Ba||!za||!ka||!Ha||!Va||!Ga||!Wa||!Xa||!In||!Ot||!Ju||!Qu||!ed)throw new Error("The portfolio shell is incomplete.");_d(Or,lu);let It,ou=null;const Hs=Rd({root:ed,islands:Or,content:lu,onScanRequest:n=>{Un.releaseAll(),It?.startScan(n,{instant:kt||xi.matches})},onExploreRequest:()=>{Un.releaseAll()}}),td=new Map,pc=new Map,bt={width:window.innerWidth,height:window.innerHeight};let $i=hn.getBoundingClientRect();const nd=typeof ResizeObserver<"u"?new ResizeObserver(()=>{$i=hn.getBoundingClientRect()}):null;nd?.observe(hn);const id=typeof ResizeObserver<"u"?new ResizeObserver(n=>{for(const e of n){const i=e.target.dataset.landmarkId;if(!i)continue;const r=Array.isArray(e.borderBoxSize)?e.borderBoxSize[0]:e.borderBoxSize,s=r?.inlineSize??e.contentRect.width,o=r?.blockSize??e.contentRect.height;s<=0||o<=0||pc.set(i,{width:s,height:o})}}):null;for(const[n,e]of Or.entries()){const t=document.createElement("div");t.className="landmark-label",t.dataset.landmarkId=e.id,t.setAttribute("role","listitem"),t.innerHTML=`
    <span class="landmark-label__name"></span>
    <span class="landmark-label__category"></span>
  `;const i=t.querySelector(".landmark-label__name"),r=t.querySelector(".landmark-label__category");if(!i||!r)throw new Error("The landmark label is incomplete.");i.textContent=e.name,r.textContent=`${cu(e.category)} · ${String(n+1).padStart(2,"0")}`,fc.append(t),td.set(e.id,t),pc.set(e.id,{width:120,height:40}),id?.observe(t);const s=document.createElement("li");s.textContent=`${e.name} — ${cu(e.category)}`,Qu.append(s)}const mc=()=>{lr.textContent=kt?"Resume motion":"Pause motion",lr.setAttribute("aria-pressed",String(kt)),Ys.setAttribute("aria-disabled",String(!It))};function bv(n){if(!Oa||!Ba||!za||!ka||!Ha||!Va||!Ga||!Wa||!Xa||!hn||!Ot)return;const e=s=>Math.round(Math.abs(s)*180/Math.PI),t=14,i=-Math.sin(n.relativeWindAngle)*t,r=-Math.cos(n.relativeWindAngle)*t;Oa.style.transform=`translate(calc(-50% + ${i}px), calc(-50% + ${r}px))`,Ba.textContent=au(n.relativeWindAngle),za.textContent=`${n.windSpeed.toFixed(0)} m/s`,hn.setAttribute("aria-label",`Wind from ${au(n.relativeWindAngle)}, ${n.windSpeed.toFixed(0)} metres per second. Sail angle ${e(n.sailAngle)} degrees; suggested ${e(n.suggestedAngle)} degrees.`),ka.textContent=`${e(n.sailAngle)}°`,Ha.textContent=`${e(n.suggestedAngle)}°`,Va.textContent=n.trimMode==="manual"?"Manual":"Auto",Ga.style.width=`${Math.round(Math.max(0,Math.min(1,n.trimEfficiency))*100)}%`,Wa.textContent=`${Math.round(n.trimEfficiency*100)}%`,Xa.textContent=n.sweetSpot?" · Sweet spot":"",hn.toggleAttribute("data-manual-trim",n.trimMode==="manual"),pr.update({boost:n.trimBoost,serial:n.boostSerial,paused:kt,reducedMotion:xi.matches}),hn.toggleAttribute("data-no-go",n.noGo),hn.toggleAttribute("data-luffing",n.luffing),n.assisted?Ot.textContent="Assisted passage: steer when you are ready to take the helm.":n.moored?Ot.textContent="Moored. Trim or steer to set sail.":n.luffing?Ot.textContent="Wind spilled. Release to catch the wind.":n.noGo?Ot.textContent="Into the wind. Turn left or right to tack.":n.trimMode==="auto"&&!n.trimEngaged?Ot.textContent="Auto trim ready. WASD or arrows to set sail.":n.trimMode==="auto"?Ot.textContent=`Auto trim ${Math.round(n.trimEfficiency*100)}% · Q/E for manual trim.`:n.trimBoost>.05?Ot.textContent="Sweet spot · speed surge!":n.sailAngle>n.suggestedAngle+.1?Ot.textContent="Trim in toward the suggested angle for more drive.":n.sailAngle<n.suggestedAngle-.1?Ot.textContent="Ease out toward the suggested angle for more drive.":n.power<.08?Ot.textContent="Turn across the wind to fill the sail.":n.sweetSpot?Ot.textContent="Sweet spot. Sail diagonally and tack to travel upwind.":Ot.textContent="Manual trim. Q/E adjusts the sail; M returns to auto."}function au(n){const e=(n*180/Math.PI+360)%360;return e<22.5||e>=337.5?"ahead":e<67.5?"port bow":e<112.5?"port":e<157.5?"port quarter":e<202.5?"astern":e<247.5?"starboard quarter":e<292.5?"starboard":"starboard bow"}const Un=new yd({root:Ys,onInput:n=>{It?.setInput(n)},onReset:()=>{It?.resetVessel(),Hs.closeDrawer(!1),pr.update({boost:0,serial:0,paused:kt,reducedMotion:xi.matches})},onAutoTrim:()=>It?.setAutoTrim()}),qa=()=>{In&&(In.textContent=er?fi?"♪ Sound on":"♪ Sound off":"♪ Sound unavailable",In.setAttribute("aria-pressed",String(fi)),In.setAttribute("aria-label",er?fi?"Sound on":"Sound off":"Sound unavailable"),In.disabled=!er)},rd=async()=>{if(!In||!er)return;const n=++Xo,e=!fi;fi=e,qa();try{const t=await pr.setEnabled(e);if(n!==Xo)return;fi=e&&t,er=t||!e}catch{if(n!==Xo)return;er=!1,fi=!1}qa()};In?.addEventListener("click",rd);const Tv=n=>{for(const[e,t]of td){const i=n.find(r=>r.id===e);if(!i||!i.visible||!Av(i,pc.get(e))){t.hidden=!0;continue}t.hidden=!1,t.style.transform=`translate3d(${i.x}px, ${i.y}px, 0) translate(-50%, 8px)`}};function Av(n,e){const t=e?.width??120,i=e?.height??40,r=n.x-t*.5,s=n.y+8,o=r+t,a=s+i,l=Math.min(48,Math.max(16,bt.width*.04));if(r<$i.right+6&&o>$i.left-6&&s<$i.bottom+6&&a>$i.top-6)return!1;const c=bt.height<=460?110:bt.width<=900?200:160,u=bt.height<=460?105:155,d=bt.width<=540?l:Math.max(l,bt.width-l-Math.min(480,bt.width-l*2));if(r<l||o>bt.width-l||s<c||a>bt.height-u)return!1;const h=32,m=bt.width*.5-h,g=bt.height*.5-h,_=bt.width*.5+h,p=bt.height*.5+h;if(r<_&&o>m&&s<p&&a>g)return!1;const E=bt.height-u;return!(r<bt.width-l&&o>d&&s<bt.height&&a>E)}const sd=()=>{bt.width=window.innerWidth,bt.height=window.innerHeight,$i=hn.getBoundingClientRect()};window.addEventListener("resize",sd);try{It=mv(ju,{reducedMotion:xi.matches,islands:Or,framingInsets:{top:145,right:20,bottom:155,left:20},onLandmarkProjection:Tv,onVesselUpdate:n=>{const e=wd({x:n.x,z:n.z},Or,ou);ou=e?.id??null,Hs.setProximity(e)},onSailingUpdate:bv,onScanUpdate:n=>Hs.setScanUpdate(n)}),It.setPaused(kt),Un.setEnabled(!kt,!!It)}catch(n){console.warn("Unable to initialise the water scene.",n),fc.hidden=!0,Ju.classList.remove("is-hidden"),lr.disabled=!0,Un.setEnabled(!1,!1),Ys.hidden=!0,su&&(su.hidden=!0)}const wv=()=>{kt=!kt,Un.setEnabled(!kt&&!!It,!!It),It?.setPaused(kt),pr.update({boost:0,serial:0,paused:kt,reducedMotion:xi.matches}),mc()};lr.addEventListener("click",wv);const Rv=n=>{if(n.key.toLowerCase()==="p"&&n.target===document.body){lr.click();return}if(n.key.toLowerCase()!=="f"||n.repeat||n.altKey||n.ctrlKey||n.metaKey||n.target instanceof Element&&n.target.closest(".content-drawer, input, textarea, select, [contenteditable]"))return;const e=document.querySelector("[data-explore-action]");!document.querySelector(".content-drawer:not([hidden])")&&e&&!e.closest("[hidden]")&&(n.preventDefault(),e.click())};window.addEventListener("keydown",Rv);const Cv=n=>{It?.setReducedMotion(n.matches),n.matches&&(kt=!0,Un.setEnabled(!1,!!It),It?.setPaused(!0),pr.update({boost:0,serial:0,paused:!0,reducedMotion:!0}),mc())};xi.addEventListener("change",Cv);const Pv=n=>{Un.releaseAll(),n.persisted||(Un.dispose(),It?.dispose(),Hs.dispose(),pr.dispose(),In?.removeEventListener("click",rd),id?.disconnect(),nd?.disconnect(),window.removeEventListener("resize",sd))};window.addEventListener("pagehide",Pv);const Iv=()=>{It&&Un.setEnabled(!kt,!0)};window.addEventListener("pageshow",Iv);function cu(n){return n.charAt(0).toUpperCase()+n.slice(1)}mc();qa();
