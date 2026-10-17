'use strict';
const textOverflowArea=document.createElement('div');textOverflowArea.id='textOverflowArea';textOverflowArea.setAttribute('aria-hidden','true');$('canvasWrap').append(textOverflowArea);
function textOverflowRegions(l,width=W,height=H){let x=l.x,y=l.y,w=l.c.width,h=l.c.height,parts=[];function add(sx,sy,sw,sh){sx=Math.max(0,sx);sy=Math.max(0,sy);sw=Math.min(w-sx,sw);sh=Math.min(h-sy,sh);if(sw>0&&sh>0)parts.push({sx,sy,sw,sh,x:x+sx,y:y+sy})}if(x<0)add(0,0,Math.min(w,-x),h);if(x+w>width){let sx=Math.max(0,width-x);add(sx,0,w-sx,h)}let sx=Math.max(0,-x),sw=Math.min(w,width-x)-sx;if(y<0)add(sx,0,sw,Math.min(h,-y));if(y+h>height){let sy=Math.max(0,height-y);add(sx,sy,sw,h-sy)}return parts}
// Clip only the editable DOM surface, retaining the full text layer and its pixels.
const inlineTextViewport=document.createElement('div');inlineTextViewport.id='inlineTextViewport';$('canvasWrap').append(inlineTextViewport);inlineTextViewport.append(inlineEditor);
function updateTextOverflow(){textOverflowArea.replaceChildren()}

const renderBeforeTextOverflow=render;render=function(...args){let result=renderBeforeTextOverflow(...args);updateTextOverflow();return result};
const zoomBeforeTextOverflow=setZoom;setZoom=function(z){zoomBeforeTextOverflow(z);updateTextOverflow()};
$('stage').addEventListener('pointerdown',e=>{if(e.target!==$('stage')||e.button!==0||tool!=='text'||starter.open||loading||$('dialog').open)return;e.preventDefault();beginInlineText(point(e))});
