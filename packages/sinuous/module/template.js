import{api as n}from"./sinuous.js";let t;function e(n){return r(n,!0)}function r(e,r,o){let u=function(){const{el:u,name:c,endMark:l}=this,i=(t,e,r,o)=>{if(null==r){let r=e||t;e&&void 0===e.t&&t.firstChild===t.lastChild&&t.firstChild===e&&(e.t=""),r.t=n.insert(t,o,e,r.t)}else n.property(t,o,r)};i.o=u,i.u=l,i.l=c,i.i=e,i.m=r,i.p=o,t.push(i)};return u.$o=2,u}function o(e,r){let o=t;t=[];let l=e(),i=t;t=o;let s=l.content||l.parentNode&&l;s||(s=document.createDocumentFragment(),s.appendChild(l));let f=s.cloneNode(!0);function a(t,e){!1!==e&&!0!==e||(r=e);let o={};let u;return r?(s.A&&s.A.forEach((n=>s.appendChild(n))),u=s):u=f.cloneNode(!0),u.firstChild&&(u.firstChild.props=t),i.forEach((n=>{n.g=r?n.o:c(u,n.h),n.j=r?n.u:n.k&&c(n.g,n.k)})),i.forEach((e=>{n.action(e,t,o)(e.i,e.l)})),s.A=Array.from(s.childNodes),u}return r||i.forEach((n=>{n.h=u(s,n.o),n.k=n.u&&u(n.o,n.u)})),a.$t=!0,a}function u(n,t){let e,r=[];for(;(e=t.parentNode)!==n.parentNode;)r.unshift(Array.from(e.childNodes).indexOf(t)),t=e;return r}function c(n,t){return t.forEach((t=>n=n.childNodes[t])),n}n.action=(n,t,e)=>{let r=n.g;return(o,u)=>{let c=t[o];null!=c&&n(r,n.j,u,c),n.m&&(e[o]||(e[o]=[],Object.defineProperty(t,o,{get:()=>n.p?u in r?r[u]:r:c,set(n){c=n,e[o].forEach((t=>t(n)))}})),e[o].push(n.bind(null,r,n.j,u)))}};export{e as o,r as t,o as template};
//# sourceMappingURL=template.js.map
