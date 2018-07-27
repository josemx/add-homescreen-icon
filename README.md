# add-homescreen-icon

A bookmarklet for iOS devices that allows adding a `apple-touch-icon` to websites that do not support the feature yet.

## Build
To build the bookmarklet download the source files and run
```
npm install && npm run build
```
This will produce a bookmarklet.txt file which contains the code to be pasted in a bookmark's `Address` field
```
npm run build:copy
```
This command will build and copy the output into your clipboard. *macOS only*

## Code
```
javascript:(()=>{"use strict";(new function(){let t,e,i,a,o,n,r,d,c=function(){i.src=this.value},p=()=>window.location.reload(!0),h=()=>{if(""!==a.value){{const t=document.createElement("link");t.setAttribute("rel","apple-touch-icon"),t.setAttribute("href",a.value),document.head.appendChild(t)}a.remove(),r.remove(),e.innerHTML="Use Share button to Add to Home Screen",t.classList.add("ahi-t1"),d.classList.add("ahi-t2")}else alert("Please enter URL")};this.create=(()=>{(()=>{const t=document.querySelector("meta[name=viewport]");null!==t&&t.remove()})();const s=document.createElement("meta");s.setAttribute("name","viewport"),s.setAttribute("content","width=device-width, initial-scale=1.0, user-scalable=0");const l=document.createElement("style");l.setAttribute("id","ahi-css"),l.innerHTML=".ahi-shdw{position:fixed;top:0;left:0;width:100%25;height:100%25;z-index:2147483647;background:rgba(50,50,50,.5)}.ahi-shdw,.ahi-shdw *{box-sizing:border-box!important;display:block!important;float:none!important;font-family:-apple-system!important;font-weight:300!important;font-size:16px!important;color:#000!important}.ahi-pop{width:300px;height:300px;position:relative;margin:15%25 auto 0;border-radius:20px;background:#fff;box-shadow:0 10px 30px 0 rgba(0,0,0,.5);transition:width .5s ease,height .5s ease}.ahi-t1{width:200px;height:220px}.ahi-con{width:100%25;height:255px}.ahi-con p{margin:0 auto;width:200px;padding:20px;text-align:center}.ahi-pop input{width:90%25!important;height:40px!important;margin:0 auto!important;padding:0 10px!important;border:none!important;border-radius:15px!important;background:#e8e8e8!important;color:#000!important;outline:0!important}.ahi-icon{width:100px;height:100px;margin:25px auto 0;border-radius:20px;box-shadow:0 5px 20px 0 rgba(0,0,0,.15);overflow:hidden;transition:margin .25s ease}.ahi-t2{margin:0 auto}.ahi-icon img{width:100%25;text-align:center}.ahi-icon img:not([src*=placeholder]){background:#000}.ahi-btns{position:absolute;bottom:0;left:0;width:100%25;border-top:1px solid #e8e8e8}.ahi-btns div{display:inline-block!important;width:50%25;padding:10px;text-align:center;color:#246BFC!important;-webkit-tap-highlight-color:transparent}.ahi-ok{font-weight:500!important}";const m=document.createElement("div");m.setAttribute("class","ahi-shdw"),m.innerHTML='<div class=ahi-pop><div class=ahi-con><p>Enter image URL</p><input type=text placeholder="ex: https://placehold.it/500"><div class=ahi-icon><img src=https://via.placeholder.com/500/e8e8e8 alt="icon error"></div></div><div class=ahi-btns><div class=ahi-cn>Cancel</div><div class=ahi-ok>Add</div></div></div>',document.head.appendChild(s),document.head.appendChild(l),document.body.appendChild(m),t=document.querySelector(".ahi-pop"),e=t.querySelector("p"),i=t.querySelector("img"),a=t.querySelector("input"),o=t.querySelector(".ahi-cn"),n=t.querySelector(".ahi-ok"),r=t.querySelector(".ahi-btns"),d=t.querySelector(".ahi-icon"),a.onchange=c,o.onclick=p,n.onclick=h})}).create()})();

```

## Example
Click for video walkthrough of the process
[![Video Example](ahi-0.png)](https://youtu.be/cxIMJ4O9wLM)
