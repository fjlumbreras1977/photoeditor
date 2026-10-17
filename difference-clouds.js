'use strict';
let lastVivaCloudSeed=0;
function newVivaCloudSeed(){let value;if(typeof crypto!=='undefined'&&crypto.getRandomValues){let buffer=new Uint32Array(1);crypto.getRandomValues(buffer);value=(buffer[0]&0x7fffffff)||1}else value=Math.floor(Math.random()*2147483646)+1;if(value===lastVivaCloudSeed)value=value===2147483647?1:value+1;lastVivaCloudSeed=value;return value}
function cloudRenderParameters(p={},target=current()){return{...p,cloudScale:Number(p.cloudScale)||128,foreground:p.fixedSeed?p.foreground||$('color').value:$('color').value,background:p.fixedSeed?p.background||bgColor:bgColor,seed:p.fixedSeed?Number(p.seed)||17:newVivaCloudSeed(),originX:target?.x||0,originY:target?.y||0}}
const applyFilterBeforeClouds=applyVivaFilter;applyVivaFilter=function(id,p={},target=current(),docId=activeDocumentId){if(['clouds','differenceClouds'].includes(id))p=cloudRenderParameters(p,target);return applyFilterBeforeClouds(id,p,target,docId)};
function renderVivaClouds(id='differenceClouds'){finishLiveScale(true);finishInlineText(true);let target=filterTarget();if(!target)return;return applyVivaFilter(id,{},target,activeDocumentId).catch(e=>toast(e.message))}
