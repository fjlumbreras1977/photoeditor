'use strict';
// Installed before the editor modules: cancel the browser menu without stopping
// contextmenu propagation, so the editor's delegated menus still receive it.
function isNativeTextContext(target){if(!target||typeof target.closest!=='function')return false;let field=target.closest('input,textarea,[contenteditable]');if(!field)return false;if(field.isContentEditable||field.getAttribute?.('contenteditable')==='true')return true;if(field.tagName==='TEXTAREA')return true;if(field.tagName!=='INPUT')return false;return ['text','search','url','tel','email','password','number'].includes((field.type||'text').toLowerCase())}
function suppressEditorBrowserMenu(event){if(!isNativeTextContext(event.target))event.preventDefault()}
function ignoreEditorSecondaryPointer(event){if(event.button===2&&!isNativeTextContext(event.target))event.stopPropagation()}
window.addEventListener('contextmenu',suppressEditorBrowserMenu,{capture:true,passive:false});
window.addEventListener('pointerdown',ignoreEditorSecondaryPointer,{capture:true});
window.addEventListener('pointerup',ignoreEditorSecondaryPointer,{capture:true});
