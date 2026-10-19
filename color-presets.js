'use strict';
function setWhiteForegroundBlackBackground(){
 $('color').value='#ffffff';bgColor='#000000';syncColors();
 textDefaults={...textDefaults,color:'#ffffff'};
 if(tool==='text'&&!inlineTextSession&&!current()?.textMeta)syncTextOptions();
 if(typeof syncPolygonOptions==='function')syncPolygonOptions();
}
for(const [container,id]of [[document.querySelector('.swatchDock'),'resetDockColors'],[document.querySelector('.colorPair'),'resetTopColors']]){
 if(!container)continue;
 const button=document.createElement('button');button.id=id;button.type='button';button.className='whiteBlackPreset';
 button.title='Frontal blanco y fondo/relleno negro';button.setAttribute('aria-label',button.title);
 button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="1" fill="#050505" stroke="#ddd"/><rect x="3" y="3" width="12" height="12" rx="1" fill="#fff" stroke="#555"/></svg>';
 button.onpointerdown=e=>e.preventDefault();button.onclick=setWhiteForegroundBlackBackground;container.append(button);
}
