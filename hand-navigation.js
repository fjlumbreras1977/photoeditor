'use strict';
let handPan={x:0,y:0},handGesture=null,handSpace=false;
const handOptions=document.createElement('div');handOptions.id='handOptions';handOptions.hidden=true;handOptions.innerHTML='<strong>Mano</strong><button type="button" id="handFit">Encajar en pantalla</button><button type="button" id="handActual">100 %</button><span>Arrastra la vista · Espacio: mano temporal · Doble clic: encajar</span>';document.querySelector('.options').append(handOptions);$('handFit').onclick=()=>fit();$('handActual').onclick=()=>setZoom(1);

function updateHandPan(){ $('canvasWrap').style.translate=handPan.x+'px '+handPan.y+'px';updateViewOverlays() }
function stopHandGesture(){handGesture=null;stage.style.cursor=tool==='hand'||handSpace?'grab':'';ov.style.cursor=tool==='hand'||handSpace?'grab':vivaToolCursor(tool)}
function beginHandGesture(e){if(e.button!==0||(!handSpace&&tool!=='hand')||loading||starter.open||document.querySelector('dialog[open]'))return false;if(!(e.target===ov||e.target===stage||e.target===$('canvasWrap')||stage.contains?.(e.target)))return false;e.preventDefault();e.stopImmediatePropagation();if(typeof layerDeletionFocus!=='undefined')layerDeletionFocus=false;ov.tabIndex=0;ov.focus({preventScroll:true});handGesture={id:e.pointerId,cx:e.clientX,cy:e.clientY,x:handPan.x,y:handPan.y};stage.style.cursor=ov.style.cursor='grabbing';return true}
function moveHandGesture(e){if(!handGesture||e.pointerId!==handGesture.id)return false;e.preventDefault();e.stopImmediatePropagation();handPan={x:handGesture.x+e.clientX-handGesture.cx,y:handGesture.y+e.clientY-handGesture.cy};updateHandPan();return true}
window.addEventListener('pointerdown',beginHandGesture,{capture:true});window.addEventListener('pointermove',moveHandGesture,{capture:true});
for(const name of ['pointerup','pointercancel'])window.addEventListener(name,e=>{if(handGesture&&e.pointerId===handGesture.id){e.preventDefault();e.stopImmediatePropagation();stopHandGesture()}},{capture:true});
window.addEventListener('keydown',e=>{if(e.code!=='Space'&&e.key!==' ')return;if(editableTarget(e)||starter.open||document.querySelector('dialog[open]')||selectionToolGesture||extraSelectGesture||drag||activeAdvancedDrag)return;e.preventDefault();e.stopImmediatePropagation();handSpace=true;stage.style.cursor=ov.style.cursor=handGesture?'grabbing':'grab'},{capture:true});
window.addEventListener('keyup',e=>{if((e.code==='Space'||e.key===' ')&&handSpace){e.preventDefault();e.stopImmediatePropagation();handSpace=false;if(!handGesture)stopHandGesture()}},{capture:true});
window.addEventListener('blur',()=>{handSpace=false;stopHandGesture()});
const toolBeforeHandNavigation=setTool;setTool=function(id){stopHandGesture();let result=toolBeforeHandNavigation(id);stage.style.cursor=id==='hand'?'grab':'';handOptions.hidden=id!=='hand';document.body.classList.toggle('handToolActive',id==='hand');return result};
const fitBeforeHandNavigation=fit;fit=function(){handPan={x:0,y:0};updateHandPan();return fitBeforeHandNavigation()};$('fit').onclick=fit;
stage.addEventListener('dblclick',e=>{if(tool==='hand'){e.preventDefault();fit()}});
const applyBeforeHandNavigation=applyDocumentState;applyDocumentState=function(s){handPan={x:0,y:0};cancelExtraSelection();clearCloneStroke();cloneAnchor=null;stopHandGesture();let r=applyBeforeHandNavigation(s);updateHandPan();return r};

rebuildViewMenu();
