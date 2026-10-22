(function(){
var cards=[].slice.call(document.querySelectorAll("#projects .card"));
var stage=document.getElementById("stage"),panel=document.getElementById("panel"),pbody=document.getElementById("pbody"),world=document.getElementById("world"),root=document.documentElement;
var cur=0,last=null,busy=false;
function fill(i){pbody.innerHTML=cards[i].innerHTML;document.getElementById("pcount").textContent=(i+1)+" of "+cards.length}
function open(i){cur=i;last=cards[i];fill(i);world.style.setProperty("--sy",window.scrollY+"px");stage.hidden=false;panel.className="panel out";void panel.offsetWidth;root.classList.add("shifted");world.inert=true;panel.className="panel in";document.getElementById("pclose").focus()}
function close(){root.classList.remove("shifted");world.inert=false;panel.className="panel out";setTimeout(function(){stage.hidden=true;if(last)last.focus({preventScroll:true})},460)}
function go(d){if(busy)return;busy=true;panel.className="panel "+(d>0?"leave-l":"leave-r");setTimeout(function(){cur=(cur+d+cards.length)%cards.length;fill(cur);panel.className="panel "+(d>0?"enter-r":"enter-l");void panel.offsetWidth;panel.className="panel in";busy=false},270)}
cards.forEach(function(c,i){
c.tabIndex=0;c.setAttribute("role","button");c.setAttribute("aria-haspopup","dialog");
c.addEventListener("click",function(){open(i)});
c.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open(i)}});
function tilt(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.rotate=(-y)+" "+x+" 0 "+(Math.hypot(x,y)*16)+"deg"}
c.addEventListener("pointermove",tilt);c.addEventListener("pointerdown",tilt);
["pointerleave","pointerup","pointercancel"].forEach(function(n){c.addEventListener(n,function(){c.style.rotate=""})});
});
document.getElementById("pclose").addEventListener("click",close);
document.getElementById("pprev").addEventListener("click",function(){go(-1)});
document.getElementById("pnext").addEventListener("click",function(){go(1)});
stage.addEventListener("click",function(e){if(e.target===stage)close()});
document.addEventListener("keydown",function(e){if(stage.hidden)return;if(e.key==="Escape")close();if(e.key==="ArrowRight")go(1);if(e.key==="ArrowLeft")go(-1)});
})();
