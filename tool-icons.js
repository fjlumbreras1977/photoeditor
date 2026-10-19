'use strict';
Object.assign(paths,{
 hand:'M8 12V5a1.5 1.5 0 0 1 3 0v6-8a1.5 1.5 0 0 1 3 0v8-6a1.5 1.5 0 0 1 3 0v7-4a1.5 1.5 0 0 1 3 0v7c0 4-2 7-6 7h-2c-2 0-3-1-4-3l-4-6c-1-2 1-3 2-2l2 2Z',
 clone:'M9 3a3 3 0 0 1 6 0c0 3-2 4-2 7v3h4l3 4v3H4v-3l3-4h4v-3c0-3-2-4-2-7ZM4 17h16M6 23h12',
 lasso:'M6 16C-1 12 3 3 12 3c11 0 12 10 4 13-5 2-11 1-11-2 0-2 3-2 4 0 3 5-1 9-3 7',
 polygonLasso:'M3 5 16 2 22 13 11 20 3 5Zm8 15-4 3M3 5h1m12-3h1m5 11h-1',
 magneticLasso:'M3 5 9 2m10 2 3 8-6 8-6-1M5 9v5a4 4 0 0 0 8 0V9h-3v5a1 1 0 0 1-2 0V9H5Zm0 3h3m2 0h3',
 quickSelect:'M3 11V7l4-4h5m7 4 3 4-2 6-5 3H9l-3-2m4-3 8-9 3 3-8 9H9l1-3Z',
 wand:'m4 21 10-10 3 3L7 24l-3-3ZM12 13l3 3M17 2v5m-2.5-2.5h5M4 5v4M2 7h4m13 12v4m-2-2h4',
 picker:'m14 3 2-2 5 5-2 2-2-1-9 10-4 1 1-4 10-9-1-2Zm-1 2 6 6M4 18l-2 3',
 heal:'M12 2C10 6 5 12 5 16a7 7 0 0 0 14 0c0-4-5-10-7-14Zm-4 14c0 2 1 3 3 3',
 spot:'m3 14 11-11a4 4 0 0 1 6 6L9 20a4 4 0 0 1-6-6Zm4-4 7 7m-3-7h.1m2 2h.1m-4 0h.1m2 2h.1',
 healingClone:'M3 16 14 5a3 3 0 0 1 5 5L8 21H3Zm5-5 6 6M4 3v5M1.5 5.5h5',
 redEye:'M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Zm11-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2v4m-2-2h4',
 bucket:'m8 2 11 11-9 9-9-9L11 3M4 13h13m3 3c-3 4-3 6-1 6s3-2 1-6Z',
 patch:'M4 5 18 3l3 14-15 4L4 5Zm3 2 8-1m3 2 1 6m-2 3-8 2m-3-3-1-6'
});
function refreshToolIcons(){for(let [i,g]of toolGroups.entries()){let b=groupButtons[i];if(!b)continue;let item=g[1].find(v=>v[0]===b.dataset.tool)||g[1][0];b.innerHTML=icon(item[0],'')+(g[1].length>1?'<i class="groupArrow"></i>':'');b.title=item[1]+' ('+g[0]+')'+(g[1].length>1?' · Mantener pulsado para más herramientas · Mayús+'+g[0]:'');b.setAttribute('aria-label',item[1]);b.setAttribute('aria-pressed',String(tool===item[0]))}}
const toolBeforeNewIcons=setTool;setTool=function(id){let r=toolBeforeNewIcons(id);refreshToolIcons();return r};refreshToolIcons();

const iconBeforeClassicPicker=icon;icon=function(id,key){if(id!=='picker')return iconBeforeClassicPicker(id,key);return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3a3.5 3.5 0 1 1 5 5l-2 2-5-5 2-2Z" fill="currentColor" stroke="currentColor"/><path d="m9 6 9 9" stroke-width="2.5"/><path d="m11 9-7 7-.8 5 5-.8 7-7"/><path d="m6 17 3-1"/></svg><small>'+key+'</small>'};refreshToolIcons();
