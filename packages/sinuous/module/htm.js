let t=(n,e,o,f)=>{let s={};for(let i=1;i<e.length;i++){let r=e[i],u="number"==typeof r?o[r]:r,l=e[++i];if(1===l)f[0]=u;else if(3===l)f[1]=Object.assign(f[1]||{},u);else if(5===l)(f[1]=f[1]||{})[e[++i]]=u;else if(6===l){let t=e[++i],n=(f[1]=f[1]||{})[t],o=s[t];o||"function"!=typeof u&&"function"!=typeof n||(o=n&&[n]||[],f[1][t]=function(){let t="";for(var n=0;n<o.length;n++)t+="function"==typeof o[n]?o[n].call(this):o[n];return t}),o?o.push(u):f[1][t]+=u+""}else if(l){let e=()=>n.apply(null,t(n,u,o,["",null]));f.push("function"==typeof f[0]?e:e())}else f.push(u)}return f},n=function(t){let n,e,o=1,f="",s="",i=[0];let r=t=>{1===o&&(t||(f=f.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?i.push(t||f,0):3===o&&(t||f)?(i.push(t||f,1),o=2):2===o&&"..."===f&&t?i.push(t,3):2===o&&f&&!t?i.push(!0,5,f):o>=5&&((f||!t&&5===o)&&(i.push(f,o,e),o=6),t&&(i.push(t,o,e),o=6)),f=""};for(let u=0;u<t.length;u++){u&&(1===o&&r(),r(u));for(let l=0;l<t[u].length;l++)n=t[u][l],1===o?"<"===n?(r(),i=[i],o=3):f+=n:4===o?"--"===f&&">"===n?(o=1,f=""):f=n+f[0]:s?n===s?s="":f+=n:'"'===n||"'"===n?s=n:">"===n?(r(),o=1):o&&("="===n?(o=5,e=f,f=""):"/"===n&&(o<5||">"===t[u][l+1])?(r(),3===o&&(i=i[0]),o=i,(i=i[0]).push(o,2),o=0):" "===n||"\t"===n||"\n"===n||"\r"===n?(r(),o=2):f+=n),3===o&&"!--"===f&&(o=4,i=i[0])}return r(),i},e=new Map,o=function(o){let f=e.get(this);return f||(f=new Map,e.set(this,f)),f=t(this,f.get(o)||(f.set(o,f=n(o)),f),arguments,[]),f.length>1?f:f[0]},f=function(){let t=o.apply(this,arguments);if(t)return Array.isArray(t)?this(t):"object"==typeof t?t:this([t])},s=function(){let t=f.bind(this);return(this.wrap||t).apply(t,arguments)};export{s as default};
//# sourceMappingURL=htm.js.map
