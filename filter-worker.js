'use strict';
importScripts('filter-engine.js?v=3.8');
onmessage=e=>{try{let d=e.data,result=vivaFilterPixels(new Uint8ClampedArray(d.buffer),d.w,d.h,d.id,d.p);postMessage({buffer:result.buffer},[result.buffer])}catch(err){postMessage({error:err.message})}};
