!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Machete-Core-YouTube",[],e):"object"==typeof exports?exports["Machete-Core-YouTube"]=e():t["Machete-Core-YouTube"]=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var i="https://www.youtube.com",r=Object.freeze({slug:"youtube",urls:{iframeApiUrl:"".concat(i,"/iframe_api"),playlistUrl:"".concat(i,"/playlist?list="),thumbnailUrl:"https://img.youtube.com/vi/"},playlistIds:{mostPopular:"PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI"}}),a={parseLabel:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=(t=t.replace(/ (\(|\[)(?!feat|ft|Remix).+(\)|\])/g,"")).match(/^(.+) - (.+)/);return n&&(e=n[1],t=n[2]),{title:t=t.replace(/(^")|("$)/g,""),artist:e=(e=e.replace(/ - Topic$/,"")).replace(/(feat|ft)\.?/i,"ft.")}},parseTimestamp:function(t){return t}};var o={init:function(t){return this.injectable=t,Promise.resolve()},scrapePlaylist:function(t){return this.injectable.get(r.urls.playlistUrl+t).then(function(t){return t("tr").map(function(e,n){return function(t,e){var n=t(e).find(".pl-video-title-link").text(),i=t(e).find(".pl-video-owner a").text(),o=a.parseLabel(n.trim(),i.trim()),l=o.title,u=o.artist,s=t(e).data("video-id"),c=t(e).find("img").data("thumb"),p=t(e).find(".timestamp").text();return{id:"".concat(r.slug,"://").concat(s),title:l,artist:u,thumbnail:c,length:a.parseTimestamp(p)}}(t,n)}).get()})}};function l(){var t=this;return new Promise(function(e){var n=document.createElement("div");n.id="player",n.style="position: absolute",document.body.appendChild(n),t.player=new YT.Player("player",{height:"0",width:"0",events:{onReady:function(){return e()},onStateChange:function(e){return function(t){this.player.isMuted()&&this.player.unMute();var e=this.player.getVideoData(),n=this.player.getDuration(),i="".concat(r.slug,"://").concat(e.video_id),o=a.parseLabel(e.title,e.author),l=o.artist,u=o.title,s="".concat(r.urls.thumbnailUrl).concat(e.video_id,"/mqdefault.jpg");this.injectable.dispatch("metadata",{id:i,artist:l,artwork:s,duration:n,title:u});var c=1===t.data,p=this.player.getVolume();this.injectable.dispatch("status",{isPlaying:c,volume:p})}.call(t,e)}}})})}function u(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}var s={init:function(t){var e=this;return this.injectable=t,new Promise(function(t){var e=document.createElement("script");e.src=r.urls.iframeApiUrl,document.body.appendChild(e),window.onYouTubeIframeAPIReady=t}).then(function(){return l.call(e)})},play:function(t){t?this.player.loadVideoById(t):this.player.playVideo(),function(){var t=this;this.intervalId||(this.intervalId=setInterval(function(){t.injectable.dispatch("timestamp",t.player.getCurrentTime())},1e3))}.call(this)},pause:function(){this.player.pauseVideo(),u.call(this)},stop:function(){this.player.stopVideo(),u.call(this)},seekTo:function(t){this.player.seekTo(t)},setVolume:function(t){this.player.setVolume(t)}},c={init:function(t){return Promise.all([o.init(t),s.init(t)]).then(function(){return r.slug})},play:function(t){s.play(t)},pause:function(){s.pause()},stop:function(){s.stop()},seekTo:function(t){s.seekTo(t)},setVolume:function(t){s.setVolume(t)},getMostPopular:function(){return o.scrapePlaylist(r.playlistIds.mostPopular)}};e.default=c}])});