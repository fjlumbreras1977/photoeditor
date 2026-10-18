'use strict';
const smartGuideOverlay=document.createElement('div');smartGuideOverlay.id='smartGuideOverlay';smartGuideOverlay.setAttribute('aria-hidden','true');
const smartGuideV=document.createElement('div'),smartGuideH=document.createElement('div');smartGuideV.className='smartCenterGuide vertical';smartGuideH.className='smartCenterGuide horizontal';smartGuideOverlay.append(smartGuideV,smartGuideH);$('canvasWrap').append(smartGuideOverlay);
let smartMoveBounds=null,smartGuideBypass=false;
function showSmartCenters(x=false,y=false){const visible=viewSettings.extras&&viewSettings.smartGuides!==false;smartGuideV.hidden=!visible||!x;smartGuideH.hidden=!visible||!y}
function clearSmartCenters(){smartMoveBounds=null;showSmartCenters()}
function smartCenterDelta(bounds,bypass=false){let dx=W/2-(bounds.x+bounds.w/2),dy=H/2-(bounds.y+bounds.h/2),snap=viewSettings.snap&&viewSettings.smartGuides!==false&&!bypass,tolerance=6/zoom;return{dx:snap&&Math.abs(dx)<=tolerance?dx:0,dy:snap&&Math.abs(dy)<=tolerance?dy:0,x:Math.abs(dx)<=(snap?tolerance:.5/zoom),y:Math.abs(dy)<=(snap?tolerance:.5/zoom)}}
const snapBeforeSmartCenters=snapLayerPosition;
snapLayerPosition=function(){
 // Preserve ruler/grid snapping, using visible content for document centring.
 if(viewSettings.smartGuides===false||!smartMoveBounds||!drag||tool!=='move'||liveScale)return snapBeforeSmartCenters();
 let boundsSetting=viewSettings.snapBounds;viewSettings.snapBounds=false;
 try{snapBeforeSmartCenters()}finally{viewSettings.snapBounds=boundsSetting}
 let l=current();if(!l||l!==smartMoveBounds.layer)return clearSmartCenters();
 let b=smartMoveBounds.bounds,d=smartCenterDelta({x:l.x+b.x,y:l.y+b.y,w:b.w,h:b.h},smartGuideBypass);
 if(d.dx||d.dy){l.x+=d.dx;l.y+=d.dy;for(let item of linkedMove?.positions||[]){let other=layers.find(g=>g.id===item.id);if(other&&other!==l&&!other.locked&&!other.lockPosition){other.x+=d.dx;other.y+=d.dy}}render(false)}
 showSmartCenters(d.x,d.y);
};
const downBeforeSmartCenters=ov.onpointerdown;ov.onpointerdown=e=>{clearSmartCenters();downBeforeSmartCenters(e);let l=current();if(tool==='move'&&drag&&!liveScale&&l&&l.type!=='group'&&!l.locked&&!l.lockPosition)smartMoveBounds={layer:l,bounds:scaleContentBounds(l)}};
const moveBeforeSmartCenters=ov.onpointermove;ov.onpointermove=e=>{smartGuideBypass=Boolean(e.ctrlKey||e.metaKey);return moveBeforeSmartCenters(e)};
for(const name of ['onpointerup','onpointercancel']){const previous=ov[name];ov[name]=e=>{try{return previous?.(e)}finally{clearSmartCenters()}}}
const matrixBeforeSmartCenters=setAffineMatrix;setAffineMatrix=function(matrix){let s=liveScale,d=null;if(s?.affine&&s.gesture?.kind==='move'){d=smartCenterDelta(affineBounds(matrix,s.base),smartGuideBypass);matrix=[...matrix];matrix[4]+=d.dx;matrix[5]+=d.dy}let result=matrixBeforeSmartCenters(matrix);if(result&&d)showSmartCenters(d.x,d.y);return result};
for(const name of ['pointerup','pointercancel','lostpointercapture'])liveScaleBox.addEventListener(name,clearSmartCenters);
const toolBeforeSmartCenters=setTool;setTool=function(id){clearSmartCenters();return toolBeforeSmartCenters(id)};
const finishBeforeSmartCenters=finishLiveScale;finishLiveScale=function(...args){clearSmartCenters();return finishBeforeSmartCenters(...args)};
const viewBeforeSmartCenters=updateViewOverlays;updateViewOverlays=function(...args){let result=viewBeforeSmartCenters(...args);if(!viewSettings.extras||viewSettings.smartGuides===false)showSmartCenters();return result};
window.addEventListener('blur',clearSmartCenters);showSmartCenters();

ov.addEventListener('lostpointercapture',clearSmartCenters);for(const name of ['pointerdown','pointermove'])liveScaleBox.addEventListener(name,e=>{smartGuideBypass=Boolean(e.ctrlKey||e.metaKey)},{capture:true});
