"use strict";function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function _next(a){asyncGeneratorStep(f,d,e,_next,_throw,"next",a)}function _throw(a){asyncGeneratorStep(f,d,e,_next,_throw,"throw",a)}var f=a.apply(b,c);_next(void 0)})}}function ufrSetUpSliders(a){function getPosts(){return _getPosts.apply(this,arguments)}function _getPosts(){return _getPosts=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(a,b,c,d,e){var f;return regeneratorRuntime.wrap(function _callee$(g){for(;;)switch(g.prev=g.next){case 0:f=window.ufrGlobals.siteUrl+"/wp-json/wp/v2/".concat(e,"?_embed=&_locale=user&per_page=").concat(d),g.t0=a,g.next="most-recent"===g.t0?4:"most-seen"===g.t0?7:"category"===g.t0?10:"tag"===g.t0?13:16;break;case 4:return g.next=6,fetch(f);case 6:return g.abrupt("return",g.sent.json());case 7:return g.next=9,fetch(window.ufrGlobals.siteUrl+"/wp-json/ufr/most-seen-posts?quantity=".concat(d,"&type=").concat(e));case 9:return g.abrupt("return",g.sent.json());case 10:return g.next=12,fetch(f+"&categories=".concat(b));case 12:return g.abrupt("return",g.sent.json());case 13:return g.next=15,fetch(f+"&tags=".concat(c));case 15:return g.abrupt("return",g.sent.json());case 16:case"end":return g.stop();}},_callee)})),_getPosts.apply(this,arguments)}function holdRenderForPosts(){return _holdRenderForPosts.apply(this,arguments)}function _holdRenderForPosts(){return _holdRenderForPosts=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;return regeneratorRuntime.wrap(function _callee2$(r){for(;;)switch(r.prev=r.next){case 0:if(b=a.usePosts,c=a.postType,d=a.postCategory,e=a.sliderID,f=a.postsQuantity,g=a.duration,h=a.postTag,i=a.showExcerpt,j=a.showTitle,k=a.wpPostType,l=new Event("ufrLoadPosts"),b){r.next=4;break}return r.abrupt("return",window.dispatchEvent(l));case 4:return m=document.getElementById(e),n=document.getElementById("".concat(e,"-thumbnail")),o=m.querySelector(".splide__list"),p=n.querySelector(".splide__list"),r.next=10,getPosts(c,d,h,f,k);case 10:if(q=r.sent,q&&0!==q.length){r.next=14;break}return o.innerHTML="\n\t\t\t\t<li class=\"splide__slide\">\n\t\t\t\t\t<div class=\"not-found\">N\xE3o foram encontrados posts</div>\n\t\t\t\t</li>\n\t\t\t",r.abrupt("return",window.dispatchEvent(l));case 14:q.forEach(function(a){var b,d,e,f,h,k,l=a.link,m=a.title,n=a._embedded,q=a.thumbnail,r=a.excerpt,s=window.ufrGlobals.themeUrl+"/assets/img/logo/ufr-bg.png",t="",u=n?null===(b=n["wp:featuredmedia"])||void 0===b||null===(d=b[0])||void 0===d?void 0:d.alt_text:void 0,v=n?null===(e=n["wp:featuredmedia"])||void 0===e||null===(f=e[0])||void 0===f?void 0:f.source_url:void 0;v&&(s=v),u&&(t=u),q&&(s=q),"most-seen"===c||(m=null===(h=m)||void 0===h?void 0:h.rendered),"most-seen"===c||(r=null===(k=r)||void 0===k?void 0:k.rendered);var w=j||i,x=w?"\n\t\t\t\t<div class=\"description\">\n\t\t\t\t\t<span class=\"title\">".concat(j?m:"","</span>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<span class=\"excerpt\">").concat(i?r:"","</span>\n\t\t\t\t</div>\n\t\t\t"):"";o.innerHTML+="\n\t\t\t\t<li class=\"splide__slide\"\n\t\t\t\t\tdata-splide-interval=\"".concat(1e3*g,"\"\n\t\t\t\t\tstyle=\"cursor: pointer;\"\n\t\t\t\t\tonclick=\"location.href = '").concat(l,"'\"\n\t\t\t\t\tonauxclick=\"window.open('").concat(l,"', '_blank')\"\n\t\t\t\t>\n\t\t\t\t\t<img src=\"").concat(s,"\" alt=\"").concat(t,"\" />\n\n\t\t\t\t\t").concat(x,"\n\t\t\t\t</li>\n\t\t\t"),window.ufrGlobals.isMobile||(p.innerHTML+="\n\t\t\t\t\t<li class=\"splide__slide\">\n\t\t\t\t\t\t<img src=\"".concat(s,"\" alt=\"").concat(t,"\" />\n\t\t\t\t\t</li>\n\t\t\t\t"))}),window.dispatchEvent(l);case 16:case"end":return r.stop();}},_callee2)})),_holdRenderForPosts.apply(this,arguments)}var b=a.autoplay,c=a.height,d=a.width,e=a.sliderID;window.addEventListener("ufrLoadPosts",function(){var a=document.getElementById(e),f=document.querySelector("div[data-slide-container=\"".concat(e,"-container\"]")),g=new Splide(a,{type:"fade",rewind:!0,pagination:!1,arrows:!0,cover:!0,width:d,height:c,autoplay:b,breakpoints:{640:{width:640,height:320}}});if(g.on("updated",function(a){f&&(f.style.width=a.width)}),g.on("mounted",function(){f&&(f.style.width=g.options.width),640>=(null===f||void 0===f?void 0:f.style.width)&&a.querySelectorAll(".description > .excerpt").forEach(function(a){return a.style.display="none"})}),!window.ufrGlobals.isMobile){var h=document.getElementById("".concat(e,"-thumbnail")),i=new Splide(h,{fixedWidth:100,fixedHeight:60,gap:10,rewind:!0,pagination:!1,cover:!0,arrows:!1,isNavigation:!0,breakpoints:{600:{fixedWidth:60,fixedHeight:44}}});g.sync(i),g.mount(),i.mount()}else g.mount()}),void holdRenderForPosts(a)}
