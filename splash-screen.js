'use strict';
(()=>{
 window.vivaSplashPending=true;
 let visibleForFourSeconds=false,editorReady=false,finished=false;
 const splash=document.getElementById('vivaSplash'),picture=document.getElementById('vivaSplashImage');
 function release(){if(finished||!visibleForFourSeconds||!editorReady)return;finished=true;window.vivaSplashPending=false;if(typeof fit==='function')fit();document.documentElement.classList.remove('vivaSplashActive');splash.remove();window.removeEventListener('keydown',blockSplashKeys,true);if(window.vivaSplashShowStart&&typeof showStart==='function'){window.vivaSplashShowStart=false;showStart()}}
 function blockSplashKeys(e){if(window.vivaSplashPending){e.preventDefault();e.stopImmediatePropagation()}}
 window.addEventListener('keydown',blockSplashKeys,true);
 window.addEventListener('viva-editor-ready',()=>{editorReady=true;release()},{once:true});
 let imageHandled=false;
 function imageVisible(){if(imageHandled)return;imageHandled=true;requestAnimationFrame(()=>requestAnimationFrame(()=>{setTimeout(()=>{visibleForFourSeconds=true;release()},4000)}))}
 picture.addEventListener('load',imageVisible,{once:true});
 picture.addEventListener('error',()=>{if(imageHandled)return;imageHandled=true;visibleForFourSeconds=true;release()},{once:true});
 if(picture.complete){if(picture.naturalWidth>0)imageVisible();else{visibleForFourSeconds=true;imageHandled=true}}
})();
