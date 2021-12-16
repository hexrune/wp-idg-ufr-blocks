"use strict";function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function _next(a){asyncGeneratorStep(f,d,e,_next,_throw,"next",a)}function _throw(a){asyncGeneratorStep(f,d,e,_next,_throw,"throw",a)}var f=a.apply(b,c);_next(void 0)})}}function ufrSetUpSliders(a){function getPosts(){return _getPosts.apply(this,arguments)}function _getPosts(){return _getPosts=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(a,b,c,d,e){var f;return regeneratorRuntime.wrap(function _callee$(g){for(;;)switch(g.prev=g.next){case 0:f=window.ufrGlobals.siteUrl+"/wp-json/wp/v2/".concat(e,"?_embed=&_locale=user&per_page=").concat(d),g.t0=a,g.next="most-recent"===g.t0?4:"most-seen"===g.t0?7:"category"===g.t0?10:"tag"===g.t0?13:16;break;case 4:return g.next=6,fetch(f);case 6:return g.abrupt("return",g.sent.json());case 7:return g.next=9,fetch(window.ufrGlobals.siteUrl+"/wp-json/ufr/most-seen-posts?quantity=".concat(d,"&type=").concat(e));case 9:return g.abrupt("return",g.sent.json());case 10:return g.next=12,fetch(f+"&categories=".concat(b));case 12:return g.abrupt("return",g.sent.json());case 13:return g.next=15,fetch(f+"&tags=".concat(c));case 15:return g.abrupt("return",g.sent.json());case 16:case"end":return g.stop();}},_callee)})),_getPosts.apply(this,arguments)}function holdRenderForPosts(){return _holdRenderForPosts.apply(this,arguments)}function _holdRenderForPosts(){return _holdRenderForPosts=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;return regeneratorRuntime.wrap(function _callee2$(s){for(;;)switch(s.prev=s.next){case 0:if(b=a.usePosts,c=a.postType,d=a.postCategory,e=a.sliderID,f=a.postsQuantity,g=a.duration,h=a.postTag,i=a.showExcerpt,j=a.showTitle,k=a.wpPostType,l=new Event("ufrLoadPosts"),b){s.next=4;break}return s.abrupt("return",window.dispatchEvent(l));case 4:return m=document.getElementById(e),n=m.querySelector(".splide-container"),o=document.getElementById("".concat(e,"-thumbnail")),p=m.querySelector(".splide__list"),q=o.querySelector(".splide__list"),s.next=11,getPosts(c,d,h,f,k);case 11:if(r=s.sent,r&&0!==r.length){s.next=15;break}return p.innerHTML="\n\t\t\t\t<li class=\"splide__slide\">\n\t\t\t\t\t<div class=\"not-found\">N\xE3o foram encontrados posts</div>\n\t\t\t\t</li>\n\t\t\t",s.abrupt("return",window.dispatchEvent(l));case 15:r.forEach(function(a){var b,d,e,f,h,k,l,m,n=a.link,o=a.title,r=a._embedded,s=a.thumbnail,t=a.excerpt,u=window.ufrGlobals.themeUrl+"/assets/img/logo/ufr-bg.png",v="",w=r?null===(b=r["wp:featuredmedia"])||void 0===b||null===(d=b[0])||void 0===d?void 0:d.alt_text:void 0,x=r?null===(e=r["wp:featuredmedia"])||void 0===e||null===(f=e[0])||void 0===f?void 0:f.source_url:void 0;x&&(u=x),w&&(v=w),s&&(u=s),"most-seen"===c||(o=null===(h=o)||void 0===h?void 0:h.rendered),"most-seen"===c||(t=null===(k=t)||void 0===k?void 0:k.rendered);var y=j||i,z=y?"\n\t\t\t\t<div class=\"description\">\n\t\t\t\t\t<span class=\"title\">".concat(null!==(l=o)&&void 0!==l?l:"","</span>\n\t\t\t\t\t<br/>\n\t\t\t\t\t").concat(null!==(m=t)&&void 0!==m?m:"","\n\t\t\t\t</div>\n\t\t\t"):"";p.innerHTML+="\n\t\t\t\t<li class=\"splide__slide\"\n\t\t\t\t\tdata-splide-interval=\"".concat(1e3*g,"\"\n\t\t\t\t\tstyle=\"cursor: pointer;\"\n\t\t\t\t\tonclick=\"location.href = '").concat(n,"'\"\n\t\t\t\t\tonauxclick=\"window.open('").concat(n,"', '_blank')\"\n\t\t\t\t>\n\t\t\t\t\t<img src=\"").concat(u,"\" alt=\"").concat(v,"\" />\n\n\t\t\t\t\t").concat(z,"\n\t\t\t\t</li>\n\t\t\t"),q.innerHTML+="\n\t\t\t\t<li class=\"splide__slide\">\n\t\t\t\t\t<img src=\"".concat(u,"\" alt=\"").concat(v,"\" />\n\t\t\t\t</li>\n\t\t\t")}),window.dispatchEvent(l);case 17:case"end":return s.stop();}},_callee2)})),_holdRenderForPosts.apply(this,arguments)}var b=a.autoplay,c=a.height,d=a.sliderID;window.addEventListener("ufrLoadPosts",function(){var a=document.getElementById(d),e=document.getElementById("".concat(d,"-thumbnail")),f=new Splide(a,{type:"fade",rewind:!0,pagination:!1,arrows:!0,cover:!0,height:c,autoplay:b}),g=new Splide(e,{fixedWidth:100,fixedHeight:60,gap:10,rewind:!0,pagination:!1,cover:!0,arrows:!1,isNavigation:!0,breakpoints:{600:{fixedWidth:60,fixedHeight:44}}});f.sync(g),f.mount(),g.mount()}),void holdRenderForPosts(a)}
