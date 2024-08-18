"use strict";(self.webpackChunkmovies_search=self.webpackChunkmovies_search||[]).push([[245],{245:(e,s,t)=>{t.r(s),t.d(s,{default:()=>x});var i=t(43),l=t(216),n=t(475),o=t(204),r=t(623),a=t(613),c=t(855),d=t(968),h=t(579);const m="bg-opacity",g="isNight-theme";const u=e=>{let{closeModal:s,src:t}=e;const[l,n]=(0,i.useState)((()=>function(){const e=localStorage.getItem(m);return null!==e?[JSON.parse(e)]:[.6]}())),[o,r]=(0,i.useState)((()=>function(){const e=localStorage.getItem(g);return null!==e&&JSON.parse(e)}())),[u,x]=(0,i.useState)(!0);(0,i.useEffect)((()=>{document.body.classList.add("no-scroll");const e=e=>{"Escape"===e.code&&s()};return window.addEventListener("keydown",e),()=>{document.body.classList.remove("no-scroll"),window.removeEventListener("keydown",e)}}),[s]);(0,i.useEffect)((()=>{localStorage.setItem(m,JSON.stringify(l[0]))}),[l]),(0,i.useEffect)((()=>{localStorage.setItem(g,JSON.stringify(o))}),[o]);const v=o?"black":"white",j=o?"rgba(255, 255, 250, 0.4)":"black",p=o?"rgba(255, 255, 250, 0.7)":"black",b=o?`rgba(162, 162, 162, ${f=l[0],y=.3,k=1,w=.3,N=.7,w+(k-f)*(N-w)/(k-y)})`:`rgba(0, 0, 0, ${l[0]})`;var f,y,k,w,N;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{className:"overlay",onClick:()=>{s()},style:{backgroundColor:`rgba(0, 0, 0, ${l[0]})`}}),(0,h.jsxs)("div",{className:"modalWindow",style:{backgroundColor:v},children:[(0,h.jsx)("div",{style:{visibility:u?"visible":"hidden"},children:(0,h.jsx)(a.a,{isNight:o,height:"50",width:"50"})}),(0,h.jsx)("iframe",{width:"860",height:"415",onLoad:()=>{console.log("Loaded"),x(!1)},src:t,title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}),(0,h.jsxs)("div",{className:"settings",style:{color:j},children:[(0,h.jsx)(c.Range,{step:.009,min:.3,max:1,values:l,onChange:function(e){console.log(e),n(e)},renderTrack:e=>{let{props:s,children:t}=e;return(0,h.jsx)("div",{...s,style:{...s.style,height:"6px",width:"150px",backgroundColor:b},children:t})},renderThumb:e=>{let{props:s}=e;return(0,h.jsx)("div",{...s,style:{...s.style,height:"20px",width:"20px",backgroundColor:p}})}}),(0,h.jsx)("label",{htmlFor:"volume",className:"settings-range-label",children:"Make background darker"}),(0,h.jsx)("span",{children:"Switch theme"}),(0,h.jsx)(d.A,{onChange:r,checked:o,onColor:"#0e1112",offColor:"#ffcc33",checkedIcon:(0,h.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",fontSize:18,color:"white",paddingRight:2},children:"\ud83c\udf19"}),uncheckedIcon:(0,h.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",fontSize:18,color:"white",paddingRight:2},children:"\u2600\ufe0f"}),handleDiameter:28,height:40,width:70})]})]})]})};t(818);const x=e=>{var s,t;let{onSetSelected:c,onDeleteId:d,selectedFilms:m}=e;const[g,x]=(0,i.useState)(!1),[v,j]=(0,i.useState)(null),[p,b]=(0,i.useState)({}),[f,y]=(0,i.useState)(null),[k,w]=(0,i.useState)(!1),[N,S]=(0,i.useState)(!1),{movieId:C}=(0,l.g)(),I=(0,l.zy)(),O=(0,i.useRef)(null!==(s=null===(t=I.state)||void 0===t?void 0:t.from)&&void 0!==s?s:"/movies");(0,i.useEffect)((()=>{const e=new AbortController;return function(e,s){console.log("sel: ",e),e.find((e=>{let{id:t}=e;return t===Number(s)}))?S(!0):S(!1)}(m,C),async function(){try{x(!0);const{movieData:s,video:t}=await(0,r.xu)(C,e);b(s),y(t),j(null)}catch(v){if("canceled"===v.message)return;j("Something went wrong, try reloading page, if it doesnt help, there is no info about this film")}finally{x(!1)}}(),()=>{e.abort()}}),[C,m]);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(n.N_,{to:O.current,className:"go-back-link",children:"Go back"}),0!==Object.keys(p).length&&(0,h.jsx)("button",{className:"favorite-icon",onClick:()=>{if(S((e=>!e)),console.log("isfav: ",N),!0===N)return console.log("it works properly, the problem is in onDeleteId in app"),void d(C);c(C),console.log("adding movie")},children:N?(0,h.jsx)(o.Mbv,{className:"heart-icon active"}):(0,h.jsx)(o.sOK,{className:"heart-icon"})}),v&&0===Object.keys(p).length&&(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("h2",{className:"error",children:v})}),g&&!v&&(0,h.jsx)(a.a,{}),0!==Object.keys(p).length&&(0,h.jsxs)("div",{className:"movie-details",children:[(0,h.jsx)("img",{src:`https://image.tmdb.org/t/p/w500${p.poster_path}`,width:"200px",height:"300px",alt:"poster"}),(0,h.jsxs)("div",{className:"movie-info",children:[(0,h.jsx)("h1",{children:p.title}),(0,h.jsxs)("p",{className:"movie-stars",children:[p.vote_average.toFixed(1)>=7?(0,h.jsx)(o.gt3,{className:"star"},p.id):p.vote_average.toFixed(1)>=5?(0,h.jsx)(o.gVl,{className:"star"},p.id):(0,h.jsx)(o.wei,{className:"empty-star"},p.id),p.vote_average.toFixed(1)+"/10"]}),(0,h.jsx)("h3",{className:"movie-subtitle",children:"Overview: "}),(0,h.jsx)("p",{children:p.overview}),(0,h.jsx)("button",{onClick:function(){w(!0)},children:"Watch trailer"}),(0,h.jsx)("h4",{className:"movie-genres",children:"Genres:"}),p.genres.map((e=>{let{id:s,name:t}=e;const i=`/movies/${C}/${s}`;return(0,h.jsx)(n.N_,{to:i,state:{from:I},children:(0,h.jsxs)("span",{children:[t," "]})},s)}))]})]}),!g&&0===Object.keys(p).length&&!v&&(0,h.jsx)(a.a,{}),f&&k&&(0,h.jsx)(u,{closeModal:function(){w(!1)},src:f}),0!==Object.keys(p).length&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("p",{children:(0,h.jsx)(n.N_,{to:"cast",className:"sidebar-link",children:"Cast"})}),(0,h.jsx)("p",{children:(0,h.jsx)(n.N_,{to:"reviews",className:"sidebar-link",children:"Reviews"})}),(0,h.jsx)("p",{children:(0,h.jsx)(n.N_,{to:"similar",className:"sidebar-link",children:"Show similar movies"})}),(0,h.jsx)(i.Suspense,{children:(0,h.jsx)(l.sv,{})})]})]})}},818:()=>{}}]);
//# sourceMappingURL=245.fd3e707b.chunk.js.map