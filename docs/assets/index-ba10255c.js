(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function l(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=l(r);fetch(r.href,n)}})();const m=document.getElementById("user-board"),f=document.getElementById("pc-board"),b=document.getElementById("bingo-board"),p=document.getElementById("button-start"),c=document.getElementById("button-restart"),i=document.getElementById("game-text");let s=Array(99).fill().map((e,t)=>t+1),a=!1,u;const E=()=>Math.floor(Math.random()*99+1),y=()=>{const e=[];for(;e.length<15;){const t=E();e.includes(t)||e.push(t)}return e},g=e=>{const t=y(),l=document.createDocumentFragment();for(const o of t){const r=document.createElement("span");r.classList.add("number"),r.textContent=o,r.dataset.number=o,l.append(r)}e.append(l)},L=()=>{s=Array(99).fill().map((e,t)=>t+1),a=!1,u=void 0,[...b.children].forEach(e=>e.classList.remove("number-appeared")),[...m.children].forEach(e=>e.classList.remove("number-user-correct")),[...f.children].forEach(e=>e.classList.remove("number-pc-correct")),c.classList.add("hide"),h()},N=()=>{const e=document.querySelectorAll(".number-user-correct"),t=document.querySelectorAll(".number-pc-correct");e.length===15?(a=!0,c.classList.remove("hide"),console.log("GANASTE")):t.length===15&&(a=!0,c.classList.remove("hide"),console.log("PERDISTE"))},v=()=>{const e=Math.floor(Math.random()*s.length),t=s[e];return s.splice(e,1),t},h=()=>{if(clearTimeout(u),i.classList.remove("hide"),s.length>0&&!a){const e=v();i.textContent=`Número: ${e}`,b.children[e-1].classList.add("number-appeared"),[...m.children].forEach(t=>{Number(t.dataset.number)===e&&t.classList.add("number-user-correct")}),[...f.children].forEach(t=>{Number(t.dataset.number)===e&&t.classList.add("number-pc-correct")}),p.classList.add("hide"),N(),u=setTimeout(h,200)}};g(m);g(f);c.classList.add("hide");i.classList.add("hide");p.addEventListener("click",h);c.addEventListener("click",L);