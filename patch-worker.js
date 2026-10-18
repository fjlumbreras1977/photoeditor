'use strict';
importScripts('patch-engine.js?v=3.1');
self.onmessage=e=>{try{let p=e.data,result=solveVivaPatch(p.source,p.destination,p.mask,p.w,p.h,p.options);self.postMessage({data:result},[result.buffer])}catch(err){self.postMessage({error:err.message})}};
