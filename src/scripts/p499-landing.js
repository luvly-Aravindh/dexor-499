export function initPage(){

const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const inr=n=>"\u20b9"+Math.round(n).toLocaleString("en-IN");
// carry query params (name, score) across internal funnel links so personalisation flows end to end
(function(){const q=location.search;if(!q)return;document.querySelectorAll('a[href$=".html"]').forEach(a=>{const h=a.getAttribute("href");if(h&&h.indexOf("?")<0&&h.indexOf("://")<0)a.setAttribute("href",h+q);});})();
// reveal on scroll
const rio=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rio.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>rio.observe(el));
// count-up for [data-count]
function countUp(el){const to=+el.dataset.count;if(reduce){el.textContent=el.dataset.prefix?inr(to):to.toLocaleString("en-IN");return;}let s=null;const d=1100;const step=t=>{if(!s)s=t;const p=Math.min((t-s)/d,1);const e=1-Math.pow(1-p,3);const v=to*e;el.textContent=el.dataset.prefix?inr(v):Math.round(v).toLocaleString("en-IN");if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);}
const cio=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){countUp(e.target);cio.unobserve(e.target);}}),{threshold:.5});
document.querySelectorAll("[data-count]").forEach(el=>cio.observe(el));
// dismissers
function hide(id){const e=document.getElementById(id);if(e)e.style.display="none";}
["bandX","tickX","stickyX"].forEach(id=>{const b=document.getElementById(id);if(b)b.addEventListener("click",()=>{const map={bandX:"band",tickX:"ticker",stickyX:"sticky"};hide(map[id]);});});
// sticky note: reveal after scrolling past the hero (less clutter on load), respect dismissal
(function(){const s=document.getElementById("sticky");if(!s)return;s.dataset.dis="0";s.style.display="none";
 const sx=document.getElementById("stickyX");if(sx)sx.addEventListener("click",()=>{s.dataset.dis="1";});
 addEventListener("scroll",()=>{if(s.dataset.dis==="1")return;s.style.display=window.scrollY>560?"":"none";},{passive:true});})();
// PLACEHOLDER proof activity -- WIRE to a real feed (Proof/Fomo) before launch. Do not ship fabricated activity.
const TICK=[
 ["Karthik Reddy","Bengaluru, KA","Just booked a free WhatsApp audit","2 min ago"],
 ["Ananya Iyer","Chennai, TN","Just requested a product demo","just now"],
 ["Vikram Shah","Ahmedabad, GJ","Just switched off the AiSensy markup","6 min ago"],
 ["Sneha Menon","Kochi, KL","Just started the \u20b9499 month","11 min ago"],
 ["Aditya Rao","Hyderabad, TS","Just calculated their markup leak","4 min ago"],
 ["Meghna Joshi","Pune, MH","Just booked a free WhatsApp audit","9 min ago"],
 ["Harish Kumar","Coimbatore, TN","Just requested a product demo","just now"],
 ["Divya Pillai","Mumbai, MH","Just switched off the AiSensy markup","7 min ago"]
];
(function(){const t=document.getElementById("ticker");if(!t)return;let i=0;
 function showOne(){const[nm,city,ac,tm]=TICK[i%TICK.length];
  document.getElementById("tkName").innerHTML=nm+' <span class="frm">from</span> '+city;
  document.getElementById("tkAct").textContent=ac;document.getElementById("tkTime").textContent=tm;
  t.classList.add("show");setTimeout(()=>t.classList.remove("show"),6000);i++;}
 setTimeout(function loop(){if(t.style.display==="none")return;showOne();setTimeout(loop,11000);},4000);})();
// sticky countdown -- WIRE: set TARGET to your real festival/offer deadline
const TARGET=new Date(Date.now()+ 2*86400000 + 5*3600000); // placeholder: 2 days 5 hours out
(function(){const el=document.getElementById("stmr");if(!el)return;function tick(){let s=Math.max(0,Math.floor((TARGET-new Date())/1000));const d=Math.floor(s/86400);s%=86400;const h=String(Math.floor(s/3600)).padStart(2,"0");s%=3600;const m=String(Math.floor(s/60)).padStart(2,"0");const ss=String(s%60).padStart(2,"0");el.textContent=(d>0?d+"d ":"")+h+":"+m+":"+ss;}tick();setInterval(tick,1000);})();
// animated chat demo
(function(){const scr=document.getElementById("chatscr");if(!scr)return;const items=[...scr.children];items.forEach(x=>x.classList.remove("show"));
 function play(){let d=400;items.forEach((el,idx)=>{const isType=el.classList.contains("typing");setTimeout(()=>{el.classList.add("show");if(el.dataset.read)setTimeout(()=>el.classList.add("read"),700);},d);d+= isType?900: (reduce?250:850);});}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){play();io.disconnect();}}),{threshold:.4});io.observe(scr);})();
/* animated comparison bars: fill width when scrolled into view */
(function(){const els=document.querySelectorAll(".cbars");if(!els.length)return;const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll(".cf").forEach(f=>{f.style.width=f.dataset.w||"100%";});ob.unobserve(e.target);}}),{threshold:.35});els.forEach(el=>ob.observe(el));})();
/* book-a-call popup: auto-show once after a delay or at scroll depth */
(function(){const p=document.getElementById("bookPop");if(!p)return;let shown=false;
 function show(){if(shown||p.dataset.dis==="1")return;shown=true;p.classList.add("show");}
 function close(){p.classList.remove("show");p.dataset.dis="1";}
 const x=document.getElementById("popX");if(x)x.addEventListener("click",close);
 const c=document.getElementById("popCta");if(c)c.addEventListener("click",()=>p.classList.remove("show"));
 p.addEventListener("click",e=>{if(e.target===p)close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")p.classList.remove("show");});
 setTimeout(show,17000);
 addEventListener("scroll",()=>{if(window.scrollY>document.body.scrollHeight*0.42)show();},{passive:true});})();


(function(){
 const g=id=>document.getElementById(id);
 const q=new URLSearchParams(location.search);
 const m=Math.max(0,Math.min(99,parseInt(q.get("m"))||26));
 const leak=Math.max(0,parseInt(q.get("leak"))||31766);
 const plat=(q.get("p")||"your platform").slice(0,22);
 const personalised=q.has("m")||q.has("leak");
 const nm=(q.get("n")||"").trim();
 const nameEl=g("hName"); if(nameEl&&nm){nameEl.textContent=nm.charAt(0).toUpperCase()+nm.slice(1)+", you";}
 const ring=g("hring"),gnum=g("hgnum"),leakEl=g("hleak"),platEl=g("hplat"),noteEl=g("scNote"),keepEl=g("hkeep");
 if(ring){const frac=Math.min(m,40)/40;requestAnimationFrame(()=>{ring.style.strokeDashoffset=327*(1-frac);});ring.style.stroke=m>=20?"#FF6B4A":m>=10?"#FF9A5A":"#FFC53D";}
 if(gnum)gnum.textContent=m+"%";
 if(platEl)platEl.textContent=plat;
 if(noteEl)noteEl.textContent=personalised?"From your check just now":"Typical at festival volume";
 if(leakEl){leakEl.dataset.count=leak;leakEl.dataset.prefix="1";countUp(leakEl);}
 if(keepEl){keepEl.dataset.count=leak;keepEl.dataset.prefix="1";countUp(keepEl);}
})();


}
