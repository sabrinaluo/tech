(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"4M6O":function(e,t,n){"use strict";var r=n("TqRt");t.__esModule=!0,t.insertScript=function(e,t,n){var r=window.document.createElement("script");return r.async=!0,r.src=e,r.id=t,n.appendChild(r),r},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var r;return function(){var a=this,o=arguments,i=function(){r=null,n||e.apply(a,o)},l=n&&!r;window.clearTimeout(r),r=setTimeout(i,t),l&&e.apply(a,o)}},t.isReactElement=i,t.shallowComparison=function e(t,n){var r,o=new Set(Object.keys(t).concat(Object.keys(n)));return 0!==(r=[]).concat.apply(r,(0,a.default)(o)).filter((function(r){if("object"==typeof t[r]){if(e(t[r],n[r]))return!0}else if(t[r]!==n[r]&&!i(t[r]))return!0})).length};var a=r(n("RIqP")),o=r(n("q1tI"));function i(e){return!!o.default.isValidElement(e)||!!Array.isArray(e)&&e.some((function(e){return o.default.isValidElement(e)}))}},"8YQ3":function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n.n(r),o=n("Wbzz"),i=n("Yncy"),l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],s=function(e){void 0===e&&(e=new Date);var t=e.getDay();return new Date(e.getTime()-864e5*(364+t))},u=function(e){for(var t=[],n=s(e),r=0;r<=52;r++){var a=new Date(n.getTime()+7*r*864e5),o=a.getMonth(),i=new Date(a.getTime()+6048e5).getMonth();if(0!==r||o===i){var l=new Date(a.getTime()-6048e5).getMonth();0!==r&&o===l||t.push({month:o,text:c[o],x:14+13*r})}}return t},d=function(e){for(var t=[],n=s(e),r=0;r<=52;r++){for(var a=[],o=0;o<7;o++){var l=n.getTime()+864e5*(7*r+o),c=new Date(l);if(e.getTime()<l)break;a.push({x:14-r,y:13*o,date:Object(i.b)(c)})}t.push({translateX:14*r,week:a})}return t},m=function(){return Object(o.c)("1838818630")},f=function(){var e=m().posts;return Object(r.useRef)(function(e){var t={};return null==e||e.forEach((function(e){var n=Object(i.b)(e.frontmatter.date);t[n]||(t[n]=[]),t[n].push({id:e.id,slug:e.fields.slug,title:e.frontmatter.title,date:e.frontmatter.date,relativeDate:Object(i.c)(e.frontmatter.date)})})),t}(null==e?void 0:e.nodes)).current},p=n("vgSQ"),g=n("vOnD"),h=n("6RC3"),b=g.a.ul.withConfig({componentId:"sc-1tmn672-0"})(["display:block;li:not(:last-child){border-bottom:1px solid ",";}"],h.a.gray.light),y=function(e){var t=e.posts;return(null==t?void 0:t.length)?a.a.createElement(b,{className:"text-sm"},t.map((function(e){return a.a.createElement("li",{className:"py-2 flex justify-between",key:e.id},a.a.createElement(o.a,{to:e.slug,key:e.id},e.title),a.a.createElement("time",{className:"text-gray-main text-xs","date-time":e.date,title:e.date},Object(i.a)(e.date)))}))):null},v=n("rePB");function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){Object(v.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E=new Date,S={year:E.getFullYear(),endDate:E,date:""},O=Object(r.createContext)({state:S,dispatch:function(){}}),D=function(e,t){switch(t.type){case"year":var n=t.payload,r=E.getFullYear()===n?E:new Date(n+"-12-31");return x(x({},e),{},{date:"",year:n,endDate:r});case"date":return x(x({},e),{},{date:t.payload});default:return e}},N=[h.a.gray[120],h.a.green.superlight,h.a.green.light,h.a.green.medium,h.a.green.dark],j=function(){return a.a.createElement("ul",{className:"calendar-legend"},a.a.createElement("li",{className:"bg-gray-120"}),a.a.createElement("li",{className:"bg-green-superlight"}),a.a.createElement("li",{className:"bg-green-light"}),a.a.createElement("li",{className:"bg-green-medium"}),a.a.createElement("li",{className:"bg-green-dark"}))},I=g.a.svg.withConfig({componentId:"sc-1ywtwu-0"})(["text{fill:#767676;font-size:9px;}rect{shape-rendering:geometricPrecision;outline:1px solid rgba(27,31,35,0.04);outline-offset:-1px;rx:2;ry:2;}"]),T=function(){return a.a.createElement(a.a.Fragment,null,l.map((function(e,t){return a.a.createElement("text",{key:e,className:t%2==0?"hidden":void 0,dx:"-9",dy:8+13*t},e)})))},_=function(){var e,t=Object(r.useContext)(O),n=t.state,o=t.dispatch,i=f(),l=(void 0===(e=n.endDate)&&(e=new Date),{monthData:u(e),data:d(e)}),c=l.data,s=l.monthData,m=Object(r.useState)({style:{display:"none"}}),p=m[0],g=m[1],h=function(e){var t=e.currentTarget,n=t.dataset.date,r=Number(t.dataset.count),a=Number(t.getAttribute("x")),o=Number(t.getAttribute("y"));g({text:(r>0?r:"No")+" contribution"+(1===r?" ":"s "),date:new Date(n).toLocaleDateString("en",{month:"short",year:"numeric",day:"numeric"}),style:{top:o-15+"px",left:150-11*a+"px"}})},b=function(){g({style:{display:"none"}})},y=function(e){var t=e.currentTarget.dataset.date;o({type:"date",payload:t})};return a.a.createElement("div",{className:"relative border-b px-4 pb-2 pt-1"},a.a.createElement("div",{className:"overflow-hidden flex flex-col items-end xl:items-center"},a.a.createElement(I,{width:722,height:112},a.a.createElement("g",{transform:"translate(10, 20)"},c.map((function(e){return a.a.createElement("g",{key:e.translateX,transform:"translate("+e.translateX+",0)"},e.week.map((function(e){var t,r,o,l,c=null!==(t=null===(r=i[e.date])||void 0===r?void 0:r.length)&&void 0!==t?t:0,s=null!==(o=N[c])&&void 0!==o?o:N.slice(-1);return a.a.createElement("rect",{className:(l=e.date,n.date?n.date===l?"":"opacity-50":""),key:e.date,width:"10",height:"10",x:e.x,y:e.y,fill:s,"data-date":e.date,"data-count":c,onMouseEnter:h,onMouseLeave:b,onClick:y})})))})),s.map((function(e,t){return a.a.createElement("text",{key:e.text+"_"+t,x:e.x,y:-7},e.text)})),a.a.createElement(T,null)))),a.a.createElement("div",{className:"flex flex-col md:flex-row md:justify-between md:items-center flex-wrap text-11px mt-1 md:mx-4"},a.a.createElement("a",null,"Learn how we count contributions."),a.a.createElement("div",{className:"self-end text-gray-main items-center flex"},"Less",a.a.createElement(j,null),"More")),a.a.createElement("div",{className:"absolute bg-gray-dark text-gray-light text-xs opacity-75 rounded-md p-2 whitespace-no-wrap",style:p.style},a.a.createElement("strong",null,p.text),"on ",p.date))},k=function(){var e,t,n,i=Object(r.useContext)(O),l=i.state,c=i.dispatch,s=Object(o.c)("939827896"),u=(new Date).getFullYear(),d=l.year,m=new Date(null===(e=s.allMdx.nodes)||void 0===e||null===(t=e[0])||void 0===t||null===(n=t.frontmatter)||void 0===n?void 0:n.date).getFullYear()||u,f=u-m+1;return a.a.createElement("div",{className:"flex-col flex w-24 sticky top-74px"},new Array(f).fill(0).map((function(e,t){return a.a.createElement("div",{key:t,onClick:function(){c({type:"year",payload:u-t})},className:(d===u-t?"bg-blue text-white hover:bg-blue":"hover:bg-gray-100 text-gray-200")+" cursor-pointer rounded-md px-4 py-2 text-xs mb-2 no-underline"},u-t)})))},C=function(){var e=Object(r.useReducer)(D,S),t=e[0],n=e[1],o=(new Date).getFullYear()===t.year,i=Object(p.a)().yearly,l=f()[t.date];return a.a.createElement(O.Provider,{value:{state:t,dispatch:n}},a.a.createElement("div",{className:"w-full flex"},a.a.createElement("div",{className:"w-full md:w-10/12"},a.a.createElement("div",{className:"mb-2 font-medium"},i[t.year]," contributions in"," ",o?"the last year":t.year),a.a.createElement("div",{className:"border rounded-md py-2"},a.a.createElement(_,null),a.a.createElement("div",{className:"w-full mt-7 text-sm p-4 flex flex-col md:flex-row"},a.a.createElement("div",{className:"md:w-1/2"},a.a.createElement("div",{className:"pb-2"},"Activity overview")),a.a.createElement("div",{className:"md:w-1/2 md:border-l md:pl-4"},"@svg"))),a.a.createElement("div",null,a.a.createElement("div",{className:"mt-8 mb-2 font-medium"},"Contribution activity"),a.a.createElement(y,{posts:l}))),a.a.createElement("div",{className:"hidden md:block md:w-2/12 pl-8"},a.a.createElement(k,null))))},q=n("vMX5"),A=n("ORnI"),M=n("33Fu"),P=n("ma3e"),R=n("iNdW"),U=n("h1kF"),B=n("vY3R"),Q=n("B7N+"),F=n("uOpC"),Y=Object(g.a)(o.a).withConfig({componentId:"bf012c-0"})(["color:",";margin-right:16px;height:21px;display:flex;align-items:center;&:hover{color:",";text-decoration:none;}> svg{margin-right:4px;}> span{word-break:break-word;display:block;width:50px;overflow:hidden;}"],h.a.gray.main,h.a.blue),X=function(e){var t=e.id,n=e.slug,r=e.title,i=e.excerpt,l=e.category,c=e.tags,s=e.date,u=Object(Q.a)({title:r,date:s,slug:n});return a.a.createElement("div",{className:"border rounded-md p-4 flex flex-col text-sm",key:t},a.a.createElement("div",{className:"flex items-center"},a.a.createElement(R.a,{size:16,className:"mr-2"}),a.a.createElement(o.a,{to:n,className:"flex-grow"},r),a.a.createElement(R.b,{size:16,className:"cursor-pointer"})),a.a.createElement("div",{className:"flex-grow mt-2 mb-4 text-gray-main"},i),a.a.createElement("div",{className:"flex items-center"},l&&a.a.createElement(Y,{to:"/"+B.CATEGORY_DIR+"/"+Object(F.slugify)(l)},a.a.createElement(P.b,{size:16})," ",l),c&&c.length>0&&a.a.createElement(Y,{to:"/"+B.TAG_DIR},a.a.createElement(M.c,{size:16}),c.length),u&&a.a.createElement(Y,{to:n},a.a.createElement(U.a,{size:16}),a.a.createElement(A.CommentCount,{config:u,placeholder:"0"}))))},W=function(){var e=function(e){return e.map((function(e){var t=e.id,n=e.excerpt,r=e.frontmatter,a=e.fields;return{id:t,excerpt:n,title:r.title,tags:r.tags,category:r.category,slug:a.slug,relativeDate:Object(i.c)(r.date),date:r.date}}))}(Object(o.c)("3665258449").allMdx.nodes);return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"mb-2"},"Recent posts"),a.a.createElement("div",{className:"grid gap-4 grid-cols-1 md:grid-cols-2 mb-8"},null==e?void 0:e.map((function(e){return a.a.createElement(X,Object.assign({},e,{key:e.id}))}))))},z=n("A2+M"),G=n("8v1V"),L=function(){var e,t=null===(e=Object(o.c)("3350369686").mdx)||void 0===e?void 0:e.body,n=Object(G.a)();return t?a.a.createElement("div",{className:"border rounded-md p-6 mb-6 w-full"},a.a.createElement("div",{className:"flex items-center text-xs mb-4 text-mono"},a.a.createElement(U.c,{size:18}),a.a.createElement(o.a,{to:"/",className:"ml-1 text-gray-dark no-underscore hover:text-blue"},n.author),a.a.createElement("span",{className:"px-2px"},"/"),"README.",a.a.createElement("span",{className:"text-gray-main"},"md")),a.a.createElement(z.MDXRenderer,null,t)):null};t.default=function(){return a.a.createElement(q.b,{mode:q.a.NavTab},a.a.createElement(L,null),a.a.createElement(W,null),a.a.createElement(C,null))}},"A2+M":function(e,t,n){var r=n("X8hv");e.exports={MDXRenderer:r}},"B7N+":function(e,t,n){"use strict";var r=n("Wbzz"),a=n("8v1V");t.a=function(e){var t=e.date,n=e.title,o=e.slug,i=Object(r.c)("822196256"),l=Object(a.a)();return 1===i.allSitePlugin.totalCount?{url:""+l.siteUrl+o,identifier:String(new Date(t).getTime()/1e3),title:n}:null}},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},Ijbi:function(e,t,n){var r=n("WkPL");e.exports=function(e){if(Array.isArray(e))return r(e)}},ORnI:function(e,t,n){"use strict";var r=n("TqRt");t.__esModule=!0,t.default=void 0;var a=r(n("VUT9"));t.Disqus=a.default;var o=r(n("qASQ"));t.CommentCount=o.default;var i=r(n("vAJ3"));t.CommentEmbed=i.default;var l=a.default;t.default=l},RIqP:function(e,t,n){var r=n("Ijbi"),a=n("EbDI"),o=n("ZhPi"),i=n("Bnag");e.exports=function(e){return r(e)||a(e)||o(e)||i()}},SksO:function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},VUT9:function(e,t,n){"use strict";var r=n("TqRt");t.__esModule=!0,t.default=void 0;var a=r(n("pVnL")),o=r(n("8OQS")),i=r(n("VbXa")),l=r(n("q1tI")),c=r(n("17x9")),s=n("4M6O"),u=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="undefined"!=typeof GATSBY_DISQUS_SHORTNAME&&""!==GATSBY_DISQUS_SHORTNAME?GATSBY_DISQUS_SHORTNAME:"",n.embedUrl="https://"+n.shortname+".disqus.com/embed.js",n}(0,i.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,s.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.getDisqusConfig=function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.page.remote_auth_s3=e.remoteAuthS3,this.page.api_key=e.apiKey,this.language=e.language}},n.loadInstance=function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById("dsq-embed-scr")?this.reloadInstance():(0,s.insertScript)(this.embedUrl,"dsq-embed-scr",window.document.body))},n.reloadInstance=function(){window&&window.DISQUS&&window.DISQUS.reset({reload:!0})},n.cleanInstance=function(){(0,s.removeScript)("dsq-embed-scr",window.document.body);try{delete window.DISQUS}catch(n){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild);if(window.document.querySelector('[id^="dsq-app"]')){var t=window.document.getElementById(window.document.querySelector('[id^="dsq-app"]').id);t.parentNode.removeChild(t)}},n.render=function(){var e=this.props,t=(e.config,(0,o.default)(e,["config"]));return l.default.createElement("div",(0,a.default)({id:"disqus_thread"},t,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:86,columnNumber:7}}))},t}(l.default.Component);t.default=u,u.propTypes={config:c.default.shape({identifier:c.default.string,title:c.default.string,url:c.default.string,language:c.default.string,remoteAuthS3:c.default.string,apiKey:c.default.string})}},WkPL:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},X8hv:function(e,t,n){var r=n("sXyB"),a=n("RIqP"),o=n("lSNA"),i=n("8OQS");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s=n("q1tI"),u=n("7ljp").mdx,d=n("BfwJ").useMDXScope;e.exports=function(e){var t=e.scope,n=e.children,o=i(e,["scope","children"]),l=d(t),m=s.useMemo((function(){if(!n)return null;var e=c({React:s,mdx:u},l),t=Object.keys(e),o=t.map((function(t){return e[t]}));return r(Function,["_fn"].concat(a(t),[""+n])).apply(void 0,[{}].concat(a(o)))}),[n,t]);return s.createElement(m,c({},o))}},Yncy:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return o}));var r=n("u0rE").getDateString,a=function(e){return new Date(e).toLocaleDateString("en-US",{timeZone:{}.TZ||"UTC",month:"short",day:"numeric"})},o=function(e){for(var t=864e5,n=Date.now()-new Date(e).getTime(),r={min:6e4,hour:36e5,day:t,week:6048e5,month:2592e6,year:31536e6},a=["min","hour","day","week","month","year"],o=a[0],i=0;i<a.length;i++)if(n<r[o=a[i]]){if(0===i)return"Just now";o=a[i-1];break}var l=Math.ceil(n/r[o])-1;return l+" "+o+(l>1?"s":"")+" ago"}},ZhPi:function(e,t,n){var r=n("WkPL");e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},b48C:function(e,t){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}},qASQ:function(e,t,n){"use strict";var r=n("TqRt");t.__esModule=!0,t.default=void 0;var a=r(n("pVnL")),o=r(n("8OQS")),i=r(n("VbXa")),l=r(n("q1tI")),c=r(n("17x9")),s=n("4M6O"),u=(0,s.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),d=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="undefined"!=typeof GATSBY_DISQUS_SHORTNAME&&""!==GATSBY_DISQUS_SHORTNAME?GATSBY_DISQUS_SHORTNAME:"",n}(0,i.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,s.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?u():(0,s.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,s.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var e=this.props,t=e.config,n=e.placeholder,r=(0,o.default)(e,["config","placeholder"]);return l.default.createElement("span",(0,a.default)({className:"disqus-comment-count","data-disqus-identifier":t.identifier,"data-disqus-url":t.url},r,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:53,columnNumber:7}}),n)},t}(l.default.Component);t.default=d,d.defaultProps={placeholder:"..."},d.propTypes={config:c.default.shape({identifier:c.default.string,title:c.default.string,url:c.default.string}),placeholder:c.default.string}},sXyB:function(e,t,n){var r=n("SksO"),a=n("b48C");function o(t,n,i){return a()?e.exports=o=Reflect.construct:e.exports=o=function(e,t,n){var a=[null];a.push.apply(a,t);var o=new(Function.bind.apply(e,a));return n&&r(o,n.prototype),o},o.apply(null,arguments)}e.exports=o},u0rE:function(e,t){e.exports={getDateString:function(e){if(!e)return"";var t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString("fr-CA",{timeZone:{}.TZ||"UTC"})}}},vAJ3:function(e,t,n){"use strict";var r=n("TqRt");t.__esModule=!0,t.default=void 0;var a=r(n("VbXa")),o=r(n("q1tI")),i=r(n("17x9")),l=function(e){function t(){return e.apply(this,arguments)||this}(0,a.default)(t,e);var n=t.prototype;return n.getSrc=function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")},n.render=function(){return o.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0",__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentEmbed.jsx",lineNumber:17,columnNumber:13}})},t}(o.default.Component);t.default=l,l.defaultProps={width:420,height:320,showMedia:!0,showParentComment:!0},l.propTypes={commentId:i.default.string.isRequired,width:i.default.number,height:i.default.number,showMedia:i.default.bool,showParentComment:i.default.bool}}}]);
//# sourceMappingURL=component---node-modules-gatsby-theme-replica-src-templates-home-tsx-8efc8c10ad800298cf9c.js.map