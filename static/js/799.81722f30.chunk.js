"use strict";(self.webpackChunkmovies_search=self.webpackChunkmovies_search||[]).push([[799],{799:(e,s,t)=>{t.r(s),t.d(s,{default:()=>o});var a=t(216),n=t(475),l=t(43),r=t(623),c=t(613),i=(t(818),t(579));const o=()=>{const e=(0,a.zy)(),[s,t]=(0,l.useState)([]),[o,h]=(0,l.useState)(!1),[m,u]=(0,l.useState)(null);return(0,l.useEffect)((()=>{const e=new AbortController;return async function(){try{h(!0);const s=await(0,r.$m)(e);t(s),u(null)}catch(m){if("canceled"===m.message)return;u("Something went wrong, try reloading page")}finally{h(!1)}}(),()=>{e.abort()}}),[]),(0,i.jsxs)("div",{className:"home__wrapper",children:[(0,i.jsx)("h1",{children:"HOME"}),(0,i.jsx)("h2",{className:"home__title",children:"Latest films: "}),o&&(0,i.jsx)(c.a,{className:"loader"}),m&&(0,i.jsx)("h2",{children:m}),(0,i.jsx)("ul",{children:s.length>0?s.map((s=>{let{id:t,title:a,name:l}=s;const r=`/movies/${t}`;return(0,i.jsx)("li",{children:(0,i.jsx)(n.N_,{to:r,state:{from:e},className:"home__link",children:a||l})},t)})):!o&&(0,i.jsx)(c.a,{})})]})}},818:()=>{}}]);
//# sourceMappingURL=799.81722f30.chunk.js.map