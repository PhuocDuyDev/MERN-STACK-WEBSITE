import{j as M,w as z,x as N,y as R,z as q,A as H,B as I,D as k,r as F,b as _,E as C,H as A,I as P}from"./index-6b6d889c.js";const G="/assets/logo-b17578be.jpg",B=({src:e,alt:g,classnames:d})=>M(z.LazyLoadImage,{src:e,alt:g,effect:"blur",placeholderSrc:G,wrapperClassName:d});function $(e,g,d,h){return e.params.createElements&&Object.keys(h).forEach(r=>{if(!d[r]&&d.auto===!0){let v=N(e.el,`.${h[r]}`)[0];v||(v=R("div",h[r]),v.className=h[r],e.el.append(v)),d[r]=v,g[r]=v}}),d}function D({swiper:e,extendParams:g,on:d,emit:h}){g({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,prevEl:null};const r=s=>(Array.isArray(s)||(s=[s].filter(a=>!!a)),s);function v(s){let a;return s&&typeof s=="string"&&e.isElement&&(a=e.el.shadowRoot.querySelector(s),a)?a:(s&&(typeof s=="string"&&(a=[...document.querySelectorAll(s)]),e.params.uniqueNavElements&&typeof s=="string"&&a.length>1&&e.el.querySelectorAll(s).length===1&&(a=e.el.querySelector(s))),s&&!a?s:a)}function T(s,a){const o=e.params.navigation;s=r(s),s.forEach(n=>{n&&(n.classList[a?"add":"remove"](...o.disabledClass.split(" ")),n.tagName==="BUTTON"&&(n.disabled=a),e.params.watchOverflow&&e.enabled&&n.classList[e.isLocked?"add":"remove"](o.lockClass))})}function f(){const{nextEl:s,prevEl:a}=e.navigation;if(e.params.loop){T(a,!1),T(s,!1);return}T(a,e.isBeginning&&!e.params.rewind),T(s,e.isEnd&&!e.params.rewind)}function t(s){s.preventDefault(),!(e.isBeginning&&!e.params.loop&&!e.params.rewind)&&(e.slidePrev(),h("navigationPrev"))}function i(s){s.preventDefault(),!(e.isEnd&&!e.params.loop&&!e.params.rewind)&&(e.slideNext(),h("navigationNext"))}function u(){const s=e.params.navigation;if(e.params.navigation=$(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(s.nextEl||s.prevEl))return;let a=v(s.nextEl),o=v(s.prevEl);Object.assign(e.navigation,{nextEl:a,prevEl:o}),a=r(a),o=r(o);const n=(m,b)=>{m&&m.addEventListener("click",b==="next"?i:t),!e.enabled&&m&&m.classList.add(...s.lockClass.split(" "))};a.forEach(m=>n(m,"next")),o.forEach(m=>n(m,"prev"))}function l(){let{nextEl:s,prevEl:a}=e.navigation;s=r(s),a=r(a);const o=(n,m)=>{n.removeEventListener("click",m==="next"?i:t),n.classList.remove(...e.params.navigation.disabledClass.split(" "))};s.forEach(n=>o(n,"next")),a.forEach(n=>o(n,"prev"))}d("init",()=>{e.params.navigation.enabled===!1?x():(u(),f())}),d("toEdge fromEdge lock unlock",()=>{f()}),d("destroy",()=>{l()}),d("enable disable",()=>{let{nextEl:s,prevEl:a}=e.navigation;s=r(s),a=r(a),[...s,...a].filter(o=>!!o).forEach(o=>o.classList[e.enabled?"remove":"add"](e.params.navigation.lockClass))}),d("click",(s,a)=>{let{nextEl:o,prevEl:n}=e.navigation;o=r(o),n=r(n);const m=a.target;if(e.params.navigation.hideOnClick&&!n.includes(m)&&!o.includes(m)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===m||e.pagination.el.contains(m)))return;let b;o.length?b=o[0].classList.contains(e.params.navigation.hiddenClass):n.length&&(b=n[0].classList.contains(e.params.navigation.hiddenClass)),h(b===!0?"navigationShow":"navigationHide"),[...o,...n].filter(y=>!!y).forEach(y=>y.classList.toggle(e.params.navigation.hiddenClass))}});const c=()=>{e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),u(),f()},x=()=>{e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),l()};Object.assign(e.navigation,{enable:c,disable:x,update:f,init:u,destroy:l})}function O({swiper:e,extendParams:g,on:d}){g({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let h=!1,r=!1;e.thumbs={swiper:null};function v(){const t=e.thumbs.swiper;if(!t||t.destroyed)return;const i=t.clickedIndex,u=t.clickedSlide;if(u&&u.classList.contains(e.params.thumbs.slideThumbActiveClass)||typeof i>"u"||i===null)return;let l;t.params.loop?l=parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"),10):l=i,e.params.loop?e.slideToLoop(l):e.slideTo(l)}function T(){const{thumbs:t}=e.params;if(h)return!1;h=!0;const i=e.constructor;if(t.swiper instanceof i)e.thumbs.swiper=t.swiper,Object.assign(e.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(e.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper.update();else if(H(t.swiper)){const u=Object.assign({},t.swiper);Object.assign(u,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper=new i(u),r=!0}return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),e.thumbs.swiper.on("tap",v),!0}function f(t){const i=e.thumbs.swiper;if(!i||i.destroyed)return;const u=i.params.slidesPerView==="auto"?i.slidesPerViewDynamic():i.params.slidesPerView;let l=1;const c=e.params.thumbs.slideThumbActiveClass;if(e.params.slidesPerView>1&&!e.params.centeredSlides&&(l=e.params.slidesPerView),e.params.thumbs.multipleActiveThumbs||(l=1),l=Math.floor(l),i.slides.forEach(a=>a.classList.remove(c)),i.params.loop||i.params.virtual&&i.params.virtual.enabled)for(let a=0;a<l;a+=1)N(i.slidesEl,`[data-swiper-slide-index="${e.realIndex+a}"]`).forEach(o=>{o.classList.add(c)});else for(let a=0;a<l;a+=1)i.slides[e.realIndex+a]&&i.slides[e.realIndex+a].classList.add(c);const x=e.params.thumbs.autoScrollOffset,s=x&&!i.params.loop;if(e.realIndex!==i.realIndex||s){const a=i.activeIndex;let o,n;if(i.params.loop){const m=i.slides.filter(b=>b.getAttribute("data-swiper-slide-index")===`${e.realIndex}`)[0];o=i.slides.indexOf(m),n=e.activeIndex>e.previousIndex?"next":"prev"}else o=e.realIndex,n=o>e.previousIndex?"next":"prev";s&&(o+=n==="next"?x:-1*x),i.visibleSlidesIndexes&&i.visibleSlidesIndexes.indexOf(o)<0&&(i.params.centeredSlides?o>a?o=o-Math.floor(u/2)+1:o=o+Math.floor(u/2)-1:o>a&&i.params.slidesPerGroup,i.slideTo(o,t?0:void 0))}}d("beforeInit",()=>{const{thumbs:t}=e.params;if(!(!t||!t.swiper))if(typeof t.swiper=="string"||t.swiper instanceof HTMLElement){const i=q(),u=()=>{const c=typeof t.swiper=="string"?i.querySelector(t.swiper):t.swiper;if(c&&c.swiper)t.swiper=c.swiper,T(),f(!0);else if(c){const x=s=>{t.swiper=s.detail[0],c.removeEventListener("init",x),T(),f(!0),t.swiper.update(),e.update()};c.addEventListener("init",x)}return c},l=()=>{if(e.destroyed)return;u()||requestAnimationFrame(l)};requestAnimationFrame(l)}else T(),f(!0)}),d("slideChange update resize observerUpdate",()=>{f()}),d("setTransition",(t,i)=>{const u=e.thumbs.swiper;!u||u.destroyed||u.setTransition(i)}),d("beforeDestroy",()=>{const t=e.thumbs.swiper;!t||t.destroyed||r&&t.destroy()}),Object.assign(e.thumbs,{init:T,update:f})}function j({swiper:e,extendParams:g,emit:d,once:h}){g({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}});function r(){const f=e.getTranslate();e.setTranslate(f),e.setTransition(0),e.touchEventsData.velocities.length=0,e.freeMode.onTouchEnd({currentPos:e.rtl?e.translate:-e.translate})}function v(){const{touchEventsData:f,touches:t}=e;f.velocities.length===0&&f.velocities.push({position:t[e.isHorizontal()?"startX":"startY"],time:f.touchStartTime}),f.velocities.push({position:t[e.isHorizontal()?"currentX":"currentY"],time:I()})}function T({currentPos:f}){const{params:t,wrapperEl:i,rtlTranslate:u,snapGrid:l,touchEventsData:c}=e,s=I()-c.touchStartTime;if(f<-e.minTranslate()){e.slideTo(e.activeIndex);return}if(f>-e.maxTranslate()){e.slides.length<l.length?e.slideTo(l.length-1):e.slideTo(e.slides.length-1);return}if(t.freeMode.momentum){if(c.velocities.length>1){const E=c.velocities.pop(),S=c.velocities.pop(),V=E.position-S.position,L=E.time-S.time;e.velocity=V/L,e.velocity/=2,Math.abs(e.velocity)<t.freeMode.minimumVelocity&&(e.velocity=0),(L>150||I()-E.time>300)&&(e.velocity=0)}else e.velocity=0;e.velocity*=t.freeMode.momentumVelocityRatio,c.velocities.length=0;let a=1e3*t.freeMode.momentumRatio;const o=e.velocity*a;let n=e.translate+o;u&&(n=-n);let m=!1,b;const y=Math.abs(e.velocity)*20*t.freeMode.momentumBounceRatio;let p;if(n<e.maxTranslate())t.freeMode.momentumBounce?(n+e.maxTranslate()<-y&&(n=e.maxTranslate()-y),b=e.maxTranslate(),m=!0,c.allowMomentumBounce=!0):n=e.maxTranslate(),t.loop&&t.centeredSlides&&(p=!0);else if(n>e.minTranslate())t.freeMode.momentumBounce?(n-e.minTranslate()>y&&(n=e.minTranslate()+y),b=e.minTranslate(),m=!0,c.allowMomentumBounce=!0):n=e.minTranslate(),t.loop&&t.centeredSlides&&(p=!0);else if(t.freeMode.sticky){let E;for(let S=0;S<l.length;S+=1)if(l[S]>-n){E=S;break}Math.abs(l[E]-n)<Math.abs(l[E-1]-n)||e.swipeDirection==="next"?n=l[E]:n=l[E-1],n=-n}if(p&&h("transitionEnd",()=>{e.loopFix()}),e.velocity!==0){if(u?a=Math.abs((-n-e.translate)/e.velocity):a=Math.abs((n-e.translate)/e.velocity),t.freeMode.sticky){const E=Math.abs((u?-n:n)-e.translate),S=e.slidesSizesGrid[e.activeIndex];E<S?a=t.speed:E<2*S?a=t.speed*1.5:a=t.speed*2.5}}else if(t.freeMode.sticky){e.slideToClosest();return}t.freeMode.momentumBounce&&m?(e.updateProgress(b),e.setTransition(a),e.setTranslate(n),e.transitionStart(!0,e.swipeDirection),e.animating=!0,k(i,()=>{!e||e.destroyed||!c.allowMomentumBounce||(d("momentumBounce"),e.setTransition(t.speed),setTimeout(()=>{e.setTranslate(b),k(i,()=>{!e||e.destroyed||e.transitionEnd()})},0))})):e.velocity?(d("_freeModeNoMomentumRelease"),e.updateProgress(n),e.setTransition(a),e.setTranslate(n),e.transitionStart(!0,e.swipeDirection),e.animating||(e.animating=!0,k(i,()=>{!e||e.destroyed||e.transitionEnd()}))):e.updateProgress(n),e.updateActiveIndex(),e.updateSlidesClasses()}else if(t.freeMode.sticky){e.slideToClosest();return}else t.freeMode&&d("_freeModeNoMomentumRelease");(!t.freeMode.momentum||s>=t.longSwipesMs)&&(e.updateProgress(),e.updateActiveIndex(),e.updateSlidesClasses())}Object.assign(e,{freeMode:{onTouchStart:r,onTouchMove:v,onTouchEnd:T}})}const X=({productImg:e,productName:g})=>{const[d,h]=F.useState(null);return _("div",{className:C["product-img"],children:[M(A,{style:{"--swiper-navigation-color":"#febd69","--swiper-navigation-size":"20px"},loop:!0,spaceBetween:10,navigation:!0,thumbs:{swiper:d},modules:[j,D,O],className:C["product-slider-main"],children:e.map((r,v)=>M(P,{children:M(B,{src:r,alt:g+" img "+v})},v))}),M(A,{onSwiper:h,loop:!0,spaceBetween:4,slidesPerView:4,freeMode:!0,watchSlidesProgress:!0,modules:[j,D,O],className:C["product-slider-sub"],children:e.map((r,v)=>M(P,{children:M(B,{src:r,alt:g+" img "+v,classnames:C["img-lazy"]})},v))})]})};export{B as M,X as S};