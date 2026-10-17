'use strict';
// Reuse the live controls and their handlers inside menu dialogs.
const panelHome=document.querySelector('.panels');
const floatingPanels={
 adjustments:{node:document.querySelector('.adjustments'),title:'Ajustes de luz y color'},
 layerPanel:{node:document.querySelector('.layerPanel'),title:'Administrar capas'},
 navigator:{node:document.querySelector('.navigator'),title:'Navegador'}
};
let floatingSection=null;
function restoreFloatingPanel(){if(floatingSection){floatingSection.classList.remove('floatingPanel');panelHome.append(floatingSection);floatingSection=null}$('dialog').classList.remove('panelDialog')}
const menuBaseDialog=dialog;
dialog=function(title,body,action){restoreFloatingPanel();$('dialogForm').querySelector('.dialogActions button[value="cancel"]').textContent='Cancelar';menuBaseDialog(title,body,action)};
function showFloatingPanel(name,focusId){const entry=floatingPanels[name];if(!entry)return;sync();render();dialog(entry.title,'',null);floatingSection=entry.node;floatingSection.classList.add('floatingPanel');$('dialog').classList.add('panelDialog');$('dialogBody').append(floatingSection);let note=document.createElement('p');note.className='panelNote';note.textContent=name==='navigator'?'Puedes cambiar el zoom desde Vista o desde la barra superior.':'Los cambios se aplican al momento. Puedes deshacerlos desde Edición → Deshacer.';$('dialogBody').append(note);$('dialogForm').querySelector('.dialogActions button[value="cancel"]').textContent='Cerrar';if(focusId)requestAnimationFrame(() => $(focusId).focus())}
$('dialog').addEventListener('close',restoreFloatingPanel);
const panelShortcut=document.querySelector('.tools button[title="Mostrar paneles"]');if(panelShortcut){panelShortcut.title='Administrar capas';panelShortcut.setAttribute('aria-label','Administrar capas');panelShortcut.onclick=()=>showFloatingPanel('layerPanel')}
panelHome.hidden=true;
// Opening dialogs must not resize the document view.
requestAnimationFrame(fit);
