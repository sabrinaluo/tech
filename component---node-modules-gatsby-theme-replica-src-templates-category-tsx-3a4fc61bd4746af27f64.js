(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{IUCx:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return s}));var n=a("q1tI"),r=a.n(n),o=a("vMX5"),c=a("LmyF"),s="2384066338";t.default=function(e){var t=e.data,a=e.pageContext,n=t.allMdx,s=n.totalCount,i=n.nodes,l=a.category;return r.a.createElement(o.b,{mode:o.a.NavTab},r.a.createElement("div",{className:"text-sm border-b pb-4"},r.a.createElement("strong",null,s)," post",s>1?"s":""," in category ",r.a.createElement("strong",null,l||"Uncategorized")),r.a.createElement(c.a,{posts:i}))}},LmyF:function(e,t,a){"use strict";var n=a("Wbzz"),r=a("q1tI"),o=a.n(r),c=a("Tgqd"),s=a("Yncy"),i=a("ZYJM");t.a=function(e){var t=e.posts;return o.a.createElement("ul",null,null==t?void 0:t.map((function(e){var t,a;return o.a.createElement("li",{key:e.id,className:"py-6 border-b flex"},o.a.createElement("div",{className:"w-10/12"},o.a.createElement("h3",{className:"mb-1 font-semibold text-lg"},o.a.createElement(n.a,{to:e.fields.slug},e.frontmatter.title," ")),o.a.createElement("p",{className:"my-2 text-sm text-gray-main"},e.excerpt),o.a.createElement("div",{className:"py-1"},null===(t=e.frontmatter)||void 0===t||null===(a=t.tags)||void 0===a?void 0:a.map((function(e){return e&&o.a.createElement(i.a,{tag:e,key:e})}))),o.a.createElement("div",{className:"text-xs text-gray-main"},"Posted on"," ",o.a.createElement("time",{"data-date":e.frontmatter.date},Object(s.b)(e.frontmatter.date)))),o.a.createElement("div",{className:"w-2/12 flex items-center justify-end"},o.a.createElement("div",{className:"text-xs px-3 py-1 border bg-gray-100 rounded-md font-semibold flex items-center"},o.a.createElement(c.b,{size:16}),o.a.createElement("span",{className:"pl-1"},"star"))))})))}},Yncy:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"c",(function(){return o}));var n=a("u0rE").getDateString,r=function(e){return new Date(e).toLocaleDateString("en-US",{timeZone:{}.TZ||"UTC",month:"short",day:"numeric"})},o=function(e){for(var t=864e5,a=Date.now()-new Date(e).getTime(),n={min:6e4,hour:36e5,day:t,week:6048e5,month:2592e6,year:31536e6},r=["min","hour","day","week","month","year"],o=r[0],c=0;c<r.length;c++)if(a<n[o=r[c]]){if(0===c)return"Just now";o=r[c-1];break}var s=Math.ceil(a/n[o])-1;return s+" "+o+(s>1?"s":"")+" ago"}},ZYJM:function(e,t,a){"use strict";var n=a("Wbzz"),r=a("q1tI"),o=a.n(r),c=a("vY3R"),s=a("uOpC");t.a=function(e){var t=e.tag,a=e.count,r="/"+c.TAG_DIR+"/"+Object(s.slugify)(t);return o.a.createElement(n.a,{to:r,className:"topic-tag"},t," ",o.a.createElement("span",{className:"font-semibold"},a))}},u0rE:function(e,t){e.exports={getDateString:function(e){if(!e)return"";var t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString("fr-CA",{timeZone:{}.TZ||"UTC"})}}}}]);
//# sourceMappingURL=component---node-modules-gatsby-theme-replica-src-templates-category-tsx-3a4fc61bd4746af27f64.js.map