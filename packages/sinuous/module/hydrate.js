import n from"./htm.js";import{api as t,hs as e,h as o}from"./sinuous.js";let r={};let u;function f(n){return function(){if(u)return(n?e:o).apply(null,arguments);let t;function f(e){null==e||(e===r||"function"==typeof e?t?i(t,e):t={type:e,__c:[]}:Array.isArray(e)?(t=t||{__c:[]},e.forEach(f)):"object"==typeof e?e.__c?i(t,e):t.__p=e:t?i(t,{type:null,__p:e}):t={type:e,__c:[]}),n&&(t.t=n)}function i(n,t){n.__c.push(t),t.o=n}return Array.from(arguments).forEach(f),t}}function i(n,e){if(!n)return;"function"==typeof n.type&&(n=n.type.apply(null,[n.__p].concat(n.__c.map((n=>n())))));let o,f,c=void 0===n.type;return e||(e=document.querySelector(function n(t){let e,r="";if(t.__p&&(e=t.__p.id))r="#";else if(t.__p&&(e=t.__p.class))r=".";else if(!(e=t.type))return o=!0,t.__c&&n(t.__c[0]());return r+("function"==typeof e?e():e).split(" ").map((n=>n.replace(/([^\x80-\uFFFF\w-])/g,"\\$1"))).join(".")}(n))),[e,n.__p,n.__c||n].forEach((function e(p){if(p instanceof Node)f=p,f.u=f.u||0;else if(Array.isArray(p))p.forEach(e);else if(f){let e,s,y=l(f)[f.u];let d=n=>{f.u++,y.data.trim()!==n.trim()&&(p.o.__c.length!==l(f).length&&(y.splitText(y.data.indexOf(n)+n.length),e&&(s=e.match(/^\s*/)[0])),y.data.trim()!==n.trim()&&(y.data=n))};if(y&&(p===r?f.u++:"object"==typeof p&&(null===p.type&&3===y.nodeType?(y.i=!0,d(p.__p)):p.type&&(i(p,y),f.u++))),"function"==typeof p){let n,r,m;e=y?y.data:void 0,s="",t.subscribe((()=>{u=n;let a=p();a&&a.__c&&(a=a.type?a:a.__c);const A="string"==typeof a||"number"==typeof a;a=A?s+a:a,n||!y&&!c?e=t.insert(f,a,r,e,m):(A?d(a):(Array.isArray(a)&&(m=y,y=f),o&&(y=f),i(a,y),e=[]),r=!o&&y?t.add(f,"",l(f)[f.u]):t.add(f.parentNode,"",f.nextSibling)),u=!1,n=!0}))}else"object"==typeof p&&(p.__c||t.property(f,p,null,n.t))}})),f}function l(n){return Array.from(n.childNodes).filter((n=>3!==n.nodeType||n.data.trim()||n.i))}let c=f(),p=f(!0);function s(){return n.apply(c,arguments)}function y(){return n.apply(p,arguments)}export{r as _,c as d,s as dhtml,p as ds,y as dsvg,i as hydrate};
//# sourceMappingURL=hydrate.js.map