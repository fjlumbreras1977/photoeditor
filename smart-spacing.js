'use strict';
const spacingOverlay=document.createElement('div');spacingOverlay.id='smartSpacingOverlay';spacingOverlay.setAttribute('aria-hidden','true');$('canvasWrap').append(spacingOverlay);
let spacingTargets=null;
function spacingRect(l){let b=scaleContentBounds(l);return{x:l.x+b.x,y:l.y+b.y,w:b.w,h:b.h}}
function captureSpacingTargets(){let l=current(),moving=new Set([l,...(linkedMove?.positions||[]).map(p=>layers.find(x=>x.id===p.id))]);spacingTargets=layers.filter(x=>!moving.has(x)&&x.type!=='group'&&x.type!=='adjustment'&&isVisibleLayer(x)&&(x.opacity??1)>0).map(x=>({layer:x,...spacingRect(x)}))}
function measureSmartSpacing(b,others){
 const nearest={};
 for(const o of others){
  let overlapY=Math.min(b.y+b.h,o.y+o.h)-Math.max(b.y,o.y),overlapX=Math.min(b.x+b.w,o.x+o.w)-Math.max(b.x,o.x);
  let entries=[];
  if(overlapY>0){let at=(Math.max(b.y,o.y)+Math.min(b.y+b.h,o.y+o.h))/2;if(o.x+o.w<=b.x)entries.push({side:'left',axis:'h',start:o.x+o.w,end:b.x,at});if(b.x+b.w<=o.x)entries.push({side:'right',axis:'h',start:b.x+b.w,end:o.x,at})}
  if(overlapX>0){let at=(Math.max(b.x,o.x)+Math.min(b.x+b.w,o.x+o.w))/2;if(o.y+o.h<=b.y)entries.push({side:'top',axis:'v',start:o.y+o.h,end:b.y,at});if(b.y+b.h<=o.y)entries.push({side:'bottom',axis:'v',start:b.y+b.h,end:o.y,at})}
  for(let e of entries){e.distance=e.end-e.start;if(!nearest[e.side]||e.distance<nearest[e.side].distance)nearest[e.side]=e}
 }
 for(const [a,c]of [['left','right'],['top','bottom']])if(nearest[a]&&nearest[c]&&Math.abs(nearest[a].distance-nearest[c].distance)<.05){nearest[a].equal=nearest[c].equal=true}
 return Object.values(nearest);
}
function drawSmartSpacing(bounds){
 spacingOverlay.replaceChildren();if(!viewSettings.extras||viewSettings.smartGuides===false||!bounds)return;
 if(!spacingTargets)captureSpacingTargets();
 for(const m of measureSmartSpacing(bounds,spacingTargets)){
  const line=document.createElement('div');line.className='smartSpacingMeasure '+(m.axis==='h'?'horizontal':'vertical')+(m.equal?' equal':'');
  Object.assign(line.style,m.axis==='h'?{left:m.start*zoom+'px',top:m.at*zoom+'px',width:m.distance*zoom+'px'}:{top:m.start*zoom+'px',left:m.at*zoom+'px',height:m.distance*zoom+'px'});
  const label=document.createElement('span');label.textContent=(m.equal?'= ':'')+Number(m.distance.toFixed(1))+' px';line.append(label);spacingOverlay.append(line);
 }
}
const clearBeforeSpacing=clearSmartCenters;clearSmartCenters=function(){clearBeforeSpacing();spacingTargets=null;spacingOverlay.replaceChildren()};
const moveBeforeSpacing=ov.onpointermove;ov.onpointermove=e=>{let result=moveBeforeSpacing(e);if(tool==='move'&&drag&&smartMoveBounds){let l=current(),b=smartMoveBounds.bounds;drawSmartSpacing({x:l.x+b.x,y:l.y+b.y,w:b.w,h:b.h})}return result};
const matrixBeforeSpacing=setAffineMatrix;setAffineMatrix=function(m){let result=matrixBeforeSpacing(m);if(result&&liveScale?.gesture?.kind==='move')drawSmartSpacing(liveScale.rect);return result};
// Clear on all gesture exits, including listeners registered by earlier modules.
for(const target of [ov,liveScaleBox])for(const name of ['pointerup','pointercancel','lostpointercapture'])target.addEventListener(name,()=>{spacingTargets=null;spacingOverlay.replaceChildren()});
window.addEventListener('blur',()=>{spacingTargets=null;spacingOverlay.replaceChildren()});
const viewBeforeSpacing=updateViewOverlays;updateViewOverlays=function(...args){let r=viewBeforeSpacing(...args);if(!viewSettings.extras||viewSettings.smartGuides===false)spacingOverlay.replaceChildren();return r};
