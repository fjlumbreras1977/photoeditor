'use strict';
// Colour fills on editable type change its metadata, never its raster preview.
function applyEditableTextColor(color){
 const l=inlineTextSession?.layer||current();
 if(!l?.textMeta||maskMode)return false;
 if(liveScale){toast('Aplica o cancela la transformación antes de cambiar el color');return true}
 if(!canModifyLayer(l))return true;
 if(l.textMeta.color!==color)applyTextSettings({color});
 textDefaults={...textDefaults,color};
 return true;
}
const fillBeforeEditableTextColor=fillPixels;
fillPixels=function(color){if(applyEditableTextColor(color))return;return fillBeforeEditableTextColor(color)};
function useTextSwatch(background=false){
 const color=background?bgColor:$('color').value;
 if(!applyEditableTextColor(color)){textDefaults={...textDefaults,color};syncTextOptions()}
}
for(const [id,label,background,shortcut] of [['textUseForeground','Frontal',false,'Alt + Retroceso'],['textUseBackground','Fondo',true,'Ctrl / ⌘ + Retroceso']]){
 const button=document.createElement('button');button.id=id;button.type='button';button.className='textColorSource';
 button.title='Aplicar color '+label.toLowerCase()+' al texto · '+shortcut;
 button.setAttribute('aria-label',button.title);button.innerHTML='<i aria-hidden="true"></i>'+label;
 button.onpointerdown=e=>e.preventDefault();button.onclick=()=>useTextSwatch(background);
 textOptions.insertBefore(button,$('textColor').nextSibling);
}
function syncTextColorSwatches(){
 $('textUseForeground').querySelector('i').style.background=$('color').value;
 $('textUseBackground').querySelector('i').style.background=bgColor;
}
const colorsBeforeTextSwatches=syncColors;
syncColors=function(){colorsBeforeTextSwatches();syncTextColorSwatches()};
for(const id of ['color','fgSwatch'])$(id).addEventListener('input',()=>{
 // Foreground picking changes active type only when the Type tool is in use.
 if(tool==='text'||inlineTextSession)applyEditableTextColor($('color').value);
 syncColors();
});
// The type colour picker is independent of the painting foreground swatch.
$('textColor').oninput=()=>{let color=$('textColor').value;applyTextSettings({color});textDefaults={...textDefaults,color}};
window.addEventListener('keydown',e=>{
 if(e.key!=='Backspace'||(!e.altKey&&!e.ctrlKey&&!e.metaKey)||e.shiftKey)return;
 if(!inlineTextSession&&!current()?.textMeta)return;
 if(loading||starter.open||document.querySelector('dialog[open]'))return;
 if(editableTarget(e)&&!inlineTextSession)return;
 if(inlineTextSession&&editableTarget(e)&&e.target!==inlineEditor&&!inlineEditor.contains?.(e.target))return;
 if(maskMode)return;
 e.preventDefault();e.stopImmediatePropagation();useTextSwatch(!e.altKey);
},{capture:true});
syncTextColorSwatches();
