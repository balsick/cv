if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,l)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let c={};const v=e=>s(e,n),u={module:{uri:n},exports:c,require:v};i[n]=Promise.all(r.map((e=>u[e]||v(e)))).then((e=>(l(...e),c)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"cv"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/cv/css/app.c45986c8.css",revision:null},{url:"/cv/cv.pdf",revision:"1cd52766041138fded58d8e455b76cc7"},{url:"/cv/img/aws.b7f614b4.svg",revision:null},{url:"/cv/img/docker.a7326638.svg",revision:null},{url:"/cv/img/firebase.06c8e8ea.svg",revision:null},{url:"/cv/img/influx.ad4086e6.svg",revision:null},{url:"/cv/img/java.6c9e7e06.svg",revision:null},{url:"/cv/img/me.3a9d6359.png",revision:null},{url:"/cv/img/nodejs.4b85f7e1.svg",revision:null},{url:"/cv/img/npm.35b97456.svg",revision:null},{url:"/cv/img/postgresql.a4cd2d17.svg",revision:null},{url:"/cv/img/react.281839dc.svg",revision:null},{url:"/cv/img/redis.b58c5d99.svg",revision:null},{url:"/cv/img/spring.9c148684.svg",revision:null},{url:"/cv/img/vuejs.49680d92.svg",revision:null},{url:"/cv/index.html",revision:"f8830a359004719dcea888743ba93a68"},{url:"/cv/js/app.32761c75.js",revision:null},{url:"/cv/js/chunk-vendors.48f24b5d.js",revision:null},{url:"/cv/manifest.json",revision:"57ad5e9c4f3eaa6f30bc6bc92672b457"},{url:"/cv/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
