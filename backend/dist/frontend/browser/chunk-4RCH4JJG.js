var q=Object.defineProperty,r=Object.defineProperties;var s=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var m=a=>{throw TypeError(a)};var j=(a,b,c)=>b in a?q(a,b,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[b]=c,t=(a,b)=>{for(var c in b||={})k.call(b,c)&&j(a,c,b[c]);if(f)for(var c of f(b))l.call(b,c)&&j(a,c,b[c]);return a},u=(a,b)=>r(a,s(b));var v=(a,b)=>{var c={};for(var d in a)k.call(a,d)&&b.indexOf(d)<0&&(c[d]=a[d]);if(a!=null&&f)for(var d of f(a))b.indexOf(d)<0&&l.call(a,d)&&(c[d]=a[d]);return c};var n=(a,b,c)=>b.has(a)||m("Cannot "+c);var w=(a,b,c)=>(n(a,b,"read from private field"),c?c.call(a):b.get(a)),x=(a,b,c)=>b.has(a)?m("Cannot add the same private member more than once"):b instanceof WeakSet?b.add(a):b.set(a,c),y=(a,b,c,d)=>(n(a,b,"write to private field"),d?d.call(a,c):b.set(a,c),c);var z=(a,b,c)=>new Promise((d,i)=>{var o=e=>{try{g(c.next(e))}catch(h){i(h)}},p=e=>{try{g(c.throw(e))}catch(h){i(h)}},g=e=>e.done?d(e.value):Promise.resolve(e.value).then(o,p);g((c=c.apply(a,b)).next())});export{t as a,u as b,v as c,w as d,x as e,y as f,z as g};