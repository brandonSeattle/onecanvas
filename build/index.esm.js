import e,{createContext as t,useContext as n,useEffect as r,useState as i,forwardRef as a,useRef as o,useImperativeHandle as l}from"react";import s from"prop-types";import d from"scenejs";import{isString as c}from"@daybrush/utils";import{v4 as p}from"uuid";function y(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach(function(e){g(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t){return(w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function S(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");t=e;if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var e,t=v(n);return S(this,r?(e=v(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],o=!0,s=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);o=!0);}catch(e){s=!0,i=e}finally{try{o||null==n.return||n.return()}finally{if(s)throw i}}return a}}(e,t)||function(e,t){var n;if(e)return"string"==typeof e?j(e,t):"Map"===(n="Object"===(n=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}!function(e,t){var n,r,t=(t=void 0===t?{}:t).insertAt;"undefined"!=typeof document&&(n=document.head||document.getElementsByTagName("head")[0],(r=document.createElement("style")).type="text/css","top"===t&&n.firstChild?n.insertBefore(r,n.firstChild):n.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e)))}("\n:root {\n  --background: #fff;\n  --font-color: #494949;\n}\n\n#canvasContainer {\n  min-width: 100%;\n  min-height: 100%;\n  position: relative;\n}\n\n.Canvas {\n  font-size: 14px;\n  margin: auto;\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  background: #ebecf0;\n}\n\n.CanvasInner {\n  grid-area: canvas;\n  position: relative;\n  z-index: 0;\n  padding: 10px;\n}\n\n.Composition {\n  position: relative;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n  -webkit-box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);\n  -moz-box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);\n  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);\n  overflow: hidden;\n}\n\n.Layers {\n  pointer-events: none;\n}\n\n/*Player*/\n\n.playerWrapper {\n  position: absolute;\n  bottom: 20px;\n  margin: 0;\n  left: 0;\n  right: 0;\n  z-index: 99999999999;\n  display: flex;\n  justify-content: center;\n}\n\n.playerWrapperInline {\n  position: relative;\n  z-index: 99999999999;\n}\n\n.player {\n  position: relative;\n  align-items: center;\n  display: flex;\n}\n\n.circles .circle {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 200px;\n  height: 200px;\n  border: 100px solid black;\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.player .play, .player .pause, .player .progress {\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.player .play {\n  border-left: 14px solid #333;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n}\n\n.player .pause {\n  border-left: 4px solid #333;\n  border-right: 4px solid #333;\n  width: 14px;\n  height: 16px;\n  box-sizing: border-box;\n}\n\n.player input[type=range] {\n  flex: auto;\n}\n\n.player input[type=range] {\n  -webkit-appearance: none;\n  background: rgba(0, 0, 0, 0.2);\n  height: 3px;\n  margin-left: 10px;\n}\n\n.player input[type=range]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 14px;\n  height: 14px;\n  border-radius: 7px;\n  background: #333;\n}\n\n.player input[type=range]:focus {\n  outline: none;\n}\n");var E=t(null),I=function(t){var i=t.children,a=t.name,o=t.id,s=t.ratio,l=t.keyframes,d=t.style,p=t.playSpeed,c=t.delay,y=t.iteration,m=n(E),h=a.replaceAll(" ","_")+o;return r(function(){m.newItem(".Layer-".concat(h),{selector:!0,delay:c,playSpeed:p}).set(u(u({},l),{},{options:{delay:c,iteration:y,playSpeed:p}}))},[a,l,y]),e.createElement("div",{"data-testid":"Layer-".concat(h),className:"Layer-".concat(h),style:u({position:"absolute",width:s.width,height:s.height,left:0,right:0,top:0,bottom:0,margin:"auto"},d)},i)},O=(I.defaultProps={name:"animation",id:1,ratio:{width:1080,height:720},keyframes:{},style:{},playSpeed:1,delay:0,children:e.createElement("div",null),iteration:"infinite"},I.propTypes={name:s.string,id:s.oneOfType([s.string,s.number]),ratio:s.object,keyframes:s.object,style:s.object,layerStyle:s.object,playSpeed:s.number,delay:s.number||s.string,children:s.any,iteration:s.any},function(){b(r,d);var n=k(r);function r(e){var t;return m(this,r),(t=n.call(this)).isPlayMedia=!0,t.init(e),t}return h(r,[{key:"getMediaItem",value:function(){return this.mediaItem}},{key:"getVolume",value:function(){return this.mediaItem.get(0,"volume")}},{key:"setVolume",value:function(e){return this.mediaItem.set(0,"volume",e),this}},{key:"setPlaySpeed",value:function(e){return this.mediaItem.setPlaySpeed(e),this}},{key:"seek",value:function(e,t){var n=this.mediaItem;return n.set(0,"seek",e),n.set("100%","seek",t),n.setDuration(t-e),this}},{key:"setElement",value:function(e){return this.mediaItem.setElement(e),this}},{key:"getMediaElement",value:function(){return this.mediaItem.getElements()[0]}},{key:"getInfo",value:function(){var e=this.mediaItem,t=[e.get(0,"seek"),e.get("100%","seek")],e=e.getPlaySpeed(),n=this.getVolume(),r=this.getDelay();return{url:this.url,seek:t,playSpeed:e,delay:r,volume:n}}},{key:"init",value:function(e){var t,u=this,p=this.newItem("media"),y=(p.newFrame(0),p.newFrame(1),p.set(0,"volume",1),p.set(0,"seek",0),p.set("100%","seek",0),this.mediaItem=p,c(e)?((t=new Audio).src=e,this.setElement(t),this.url=e):(e.src?this.url=e.src:(t=e.querySelector("[src]"),this.url=t?t.src:""),this.setElement(e)),0);this.on("paused",function(e){var t;u.isPlayMedia=!1,null!=(t=u.getMediaElement())&&t.pause()}),this.on("animate",function(e){var t=u.getMediaElement(),n=(t.muted=!1,e.time),r=n<y,i="running"===u.getPlayState(),a=-1<u.getDirection().indexOf("reverse"),o=u.isPlayMedia,e=e.frames.media,s=p.getPlaySpeed(),l=u.getDuration(),d=u.getVolume(),e=e.get("seek");y=n,i&&o||(t.playbackRate=s*(a?-1:1),t.currentTime=e),r||n<=0||l<=n?i&&(u.isPlayMedia=!1,t.pause()):(t.volume=d,!o&&i&&(u.isPlayMedia=!0,(s=t.play())instanceof Promise)&&s.catch(function(){t.muted=!0,t.play()}))})}}]),r}()),P=function(){b(n,d);var t=k(n);function n(){var e;return m(this,n),(e=t.call(this)).playInfos={},e}return h(n,[{key:"addMedia",value:function(e){var t=new O(1<arguments.length&&void 0!==arguments[1]?arguments[1]:e);return this.setItem(e,t),t}},{key:"getInfo",value:function(){var t={duration:0,medias:[]};return this.forEach(function(e){t.medias.push(e.getInfo())}),t.duration=this.getDuration(),t}}]),n}(),L=function(t){var i=t.name,a=t.id,o=t.audio,s=t.volume,l=t.playSpeed,d=t.delay,u=t.seekStart,p=t.seekEnd,c=n(E);return r(function(){var e=new P,t=c.getDuration(),e=e.addMedia(i+a,o);e.setVolume(s).setPlaySpeed(l).setDelay(d),0<p?e.seek(u,p):e.seek(0,t),c.setItem("media",e)},[u,p]),e.createElement(e.Fragment,null)},C=(L.defaultProps={name:"audio",id:1,audio:"http://cld3097web.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/5.02.mp3",volume:1,playSpeed:1,delay:0,seekStart:0,seekEnd:0},L.propTypes={name:s.string,id:s.number,volume:s.number,audio:s.string,playSpeed:s.number,delay:s.number||s.string,seekStart:s.number,seekEnd:s.number},function(t){var i=t.name,a=t.id,o=(t.ratio,t.img),s=t.keyframes,l=t.style,d=t.playSpeed,p=t.delay,c=t.iteration,y=n(E),m=i.replaceAll(" ","_")+a;return r(function(){y.newItem(".ImageLayer-".concat(m),{selector:!0,delay:p,playSpeed:d}).set(u(u({},s),{},{options:{easing:"ease-in-out",delay:p,iteration:c,playSpeed:d}}))},[i,s,c]),e.createElement("div",{"data-testid":"ImageLayer-".concat(m),className:"ImageLayer-".concat(m),style:u(u({},l),{},{backgroundImage:"url("+o+")",backgroundRepeat:"no-repeat"})})}),T=(C.defaultProps={name:"imageAnimation",id:1,ratio:{width:1080,height:720},img:"https://assets2.razerzone.com/images/pnx.assets/618c0b65424070a1017a7168ea1b6337/razer-wallpapers-page-hero-mobile.jpg",keyframes:{},style:{},playSpeed:1,delay:0,iteration:"infinite"},C.propTypes={name:s.string,id:s.oneOfType([s.string,s.number]),ratio:s.object,img:s.string,keyframes:s.object,style:s.object,layerStyle:s.object,playSpeed:s.number,delay:s.number||s.string,iteration:s.any},function(t){var a=t.name,o=t.id,y=t.ratio,s=t.keyframes,l=t.style,d=t.playSpeed,m=t.delay,c=t.iteration,h=t.foreground,f=t.gridX,g=t.gridY,b=n(E),v=a.replaceAll(" ","_")+o,t=x(i([]),2),o=t[0],w=t[1],S=(r(function(){b.newItem(".Layer-".concat(v),{selector:!0,delay:m,playSpeed:d}).set(u(u({},s),{},{options:{delay:m,iteration:c,playSpeed:d}})),w(S(h))},[a,s,c]),function(t){for(var n=[],r=0;r<f;r++)for(var i=0;i<g;i++){var a=y.width/f*101/y.width+"%",o=y.height/g*100/y.height+"%",s=y.height/g*i*101/y.height+"%",l=y.width/f*r*100/y.width+"%",d=-y.width/f*r+"px",u=-y.height/g*i+"px",c=p().replaceAll("-","");n.push(e.createElement(C,{key:c,img:t,name:"foreground"+v+r+i,delay:m+r,id:r+i,keyframes:{0:{transform:"translate(0, -100%)"},.5:{transform:"translate(0, 0)"}},iteration:1,style:{top:s,left:l,width:a,height:o,position:"absolute",backgroundPosition:d+" "+u,backgroundSize:y.width+"px"},ratio:{width:a,height:o}}))}return n});return e.createElement("div",{"data-testid":"Layer-".concat(v),className:"Layer-".concat(v),id:"Layer-".concat(v),style:u({position:"absolute",width:y.width,height:y.height,left:0,right:0,top:0,bottom:0,margin:"auto"},l)},o)}),A=(T.defaultProps={name:"splitAnimation",id:1,ratio:{width:1080,height:720},keyframes:{},style:{},playSpeed:1,delay:0,iteration:"infinite",foreground:"",gridX:5,gridY:1},T.propTypes={name:s.string,id:s.oneOfType([s.string,s.number]),ratio:s.object,keyframes:s.object,style:s.object,layerStyle:s.object,playSpeed:s.number,delay:s.number||s.string,iteration:s.any,foreground:s.string,gridX:s.number,gridY:s.number},function(t){var a=t.name,o=t.id,w=t.ratio,s=t.keyframes,S=t.keyframesImage,k=t.keyframesText,l=t.style,j=t.textLayerStyle,O=t.text,d=t.playSpeed,c=t.delay,L=t.splitDelay,y=t.iteration,m=t.foreground,h=n(E),P=a.replaceAll(" ","_")+o,t=x(i([]),2),o=t[0],f=t[1],g=(r(function(){h.newItem(".Layer-".concat(P),{selector:!0,delay:c,playSpeed:d}).set(u(u({},s),{},{options:{delay:c,iteration:y,playSpeed:d}})),f(g(m))},[a,s,y]),function(t){for(var n=[],r=0,i=0,a=0,o=0,s=0;s<4;s++)for(var l=0;l<3;l++){var d=w.width/4*100/w.width+"%",c=w.height/3*100/w.height+"%",y=w.height/3*l*100/w.height+"%",m=w.width/4*s*100/w.width+"%",h=-w.width/4*s+"px",f=-w.height/3*l+"px",g=p().replaceAll("-",""),b=1===s&&1===l||2===s&&1===l?{2:{opacity:0}}:{};1===s&&1===l&&(r=y,i=m,o=c),2===s&&1===l&&(a=2*parseInt(d)+"%"),n.push(e.createElement(C,{key:g,img:t,name:"foreground"+P+s+l,delay:L,id:s+l,keyframes:u(u({},S),b),iteration:1,style:{top:y,left:m,width:d,height:c,position:"absolute",backgroundPosition:h+" "+f,backgroundSize:"center center"},ratio:{width:d,height:c}}))}var v=p().replaceAll("-","");return n.push(e.createElement(I,{key:v,ratio:w,id:v,name:"fade in text",delay:2*L,style:{margin:0,top:r,left:i,width:a,height:o,position:"absolute",transform:"scale(75%)"},keyframes:k,iteration:1},e.createElement("div",{style:u({fontSize:30,display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"},j)},O))),n});return e.createElement("div",{"data-testid":"Layer-".concat(P),className:"Layer-".concat(P),id:"Layer-".concat(P),style:u({position:"absolute",width:w.width,height:w.height,left:0,right:0,top:0,bottom:0,margin:"auto"},l)},o)}),D=(A.defaultProps={name:"splitOutAnimation",id:1,ratio:{width:1080,height:720},keyframes:{},keyframesImage:{},keyframesText:{},style:{},textLayerStyle:{},text:"Hello There .....",playSpeed:1,delay:0,splitDelay:0,iteration:"infinite",foreground:""},A.propTypes={name:s.string,id:s.oneOfType([s.string,s.number]),ratio:s.object,keyframes:s.object,keyframesImage:s.object,keyframesText:s.object,style:s.object,textLayerStyle:s.object,text:s.string,playSpeed:s.number,delay:s.oneOfType([s.string,s.number]),splitDelay:s.oneOfType([s.string,s.number]),iteration:s.any,foreground:s.string},function(t){var a=t.name,o=t.id,w=t.ratio,s=t.keyframes,l=t.style,S=t.textLayerStyle,k=t.text,d=t.playSpeed,j=t.delay,O=t.sliceDelay,c=t.iteration,y=t.foreground,L=t.gridX,P=t.gridY,m=n(E),T=a.replaceAll(" ","_")+o,t=x(i([]),2),o=t[0],h=t[1],f=(r(function(){m.newItem(".Layer-".concat(T),{selector:!0,delay:j,playSpeed:d}).set(u(u({},s),{},{options:{delay:j,iteration:c,playSpeed:d}})),h(f(y))},[a,s,c]),function(t){for(var n=[],r=0,i=0,a=0,o=0,s=0;s<L;s++)for(var l=s%2==0?98:100,d=0;d<P;d++){var c=w.width/L*l/w.width+"%",y=w.height/P*95/w.height+"%",m=w.height/P*d*100/w.height+"%",h=w.width/L*s*100/w.width+"%",f=-w.width/L*s+"px",g=-w.height/P*d+"px",b=p().replaceAll("-","");n.push(e.createElement(C,{key:b,img:t,name:"foreground"+T+s+d,delay:j*d,id:s+d,keyframes:{0:{opacity:1,transform:"translate(".concat(d%2==0?"200%":"-200%",", 0)")},2:{opacity:1,transform:"translate(0, 0)"},4:{opacity:1},4.5:{opacity:0}},iteration:1,style:{top:m,left:h,width:c,height:y,position:"absolute",backgroundPosition:f+" "+g,backgroundSize:w.width+"px"},ratio:{width:c,height:y}})),P-2===d&&(r=m,i=h,a=c,o=y)}var v=p().replaceAll("-","");return n.push(e.createElement(I,{key:v,ratio:w,id:v,name:"fade out text",delay:j+O,style:{margin:0,top:r,left:i,width:a,height:o,position:"absolute",backgroundColor:"#000"},keyframes:{0:{opacity:1,transform:"translate(200%, 0)"},1:{opacity:1,transform:"translate(0, 0)"},2.8:{opacity:1},3:{opacity:0}},iteration:1},e.createElement("div",{style:u({color:"#fff",fontSize:30,display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"},S)},k))),n});return e.createElement("div",{"data-testid":"Layer-".concat(T),className:"Layer-".concat(T),id:"Layer-".concat(T),style:u({position:"absolute",width:w.width,height:w.height,left:0,right:0,top:0,bottom:0,margin:"auto"},l)},o)}),z=(D.defaultProps={name:"splitInAnimation",id:1,ratio:{width:1080,height:720},keyframes:{},style:{},textLayerStyle:{},text:"Hello There .....",playSpeed:1,delay:0,sliceDelay:0,iteration:"infinite",foreground:"",gridX:5,gridY:1},D.propTypes={name:s.string,id:s.number,ratio:s.object,keyframes:s.object,style:s.object,textLayerStyle:s.object,text:s.string,layerStyle:s.object,playSpeed:s.number,delay:s.number||s.string,sliceDelay:s.number||s.string,iteration:s.any,foreground:s.string,gridX:s.number,gridY:s.number},function(t){var a=t.name,o=t.id,s=t.ratio,l=t.keyframes,d=t.style,p=t.playSpeed,c=t.delay,y=t.iteration,m=t.foreground,h=(t.background,t.gridX),f=n(E),g=a.replaceAll(" ","_")+o,t=x(i([]),2),o=t[0],b=t[1],v=(r(function(){f.newItem(".Layer-".concat(g),{selector:!0,delay:c,playSpeed:p}).set(u(u({},l),{},{options:{delay:c,iteration:y,playSpeed:p}})),b(v(m))},[a,l,y]),function(t){for(var n=[],r=0;r<h;r++){var i=s.width/h*100/s.width+"%",a=s.width/h*r*100/s.width+"%",o=-s.width/h*r+"px";n.push(e.createElement(C,{key:r,img:t,name:"foreground"+g+r,delay:c+r,id:r,keyframes:{0:{opacity:0,transform:"translate(-100%, 0)"},.5:{opacity:1,transform:"translate(0, 0)"}},iteration:1,style:{top:0,left:a,width:i,height:s.height,position:"absolute",zIndex:r,backgroundPosition:o+" 0",backgroundSize:s.width+"px"},ratio:s}))}return n});return e.createElement("div",{"data-testid":"Layer-".concat(g),className:"Layer-".concat(g),id:"Layer-".concat(g),style:u({position:"absolute",width:s.width,height:s.height,left:0,right:0,top:0,bottom:0,margin:"auto"},d)},o)}),N=(z.defaultProps={name:"splitSlideInAnimation",id:1,ratio:{width:1080,height:720},keyframes:{},style:{},playSpeed:1,delay:0,iteration:"infinite",foreground:"",gridX:5},z.propTypes={name:s.string,id:s.oneOfType([s.string,s.number]),ratio:s.object,keyframes:s.object,style:s.object,layerStyle:s.object,playSpeed:s.number,delay:s.number||s.string,iteration:s.any,foreground:s.string,gridX:s.number},function(t){var i=t.text,a=t.name,o=t.id,s=t.ratio,l=t.keyframes,d=t.style,p=t.textLayerStyle,c=t.playSpeed,y=t.delay,m=t.iteration,t=t.textColor,h=n(E),f=a.replaceAll(" ","_")+o;return r(function(){h.newItem(".Layer-".concat(f),{selector:!0,delay:y,playSpeed:c}).set(u(u({},l),{},{options:{delay:y,iteration:m,playSpeed:c}}))},[a,l,m]),e.createElement("div",{"data-testid":"Layer-".concat(f),className:"Layer-".concat(f),style:u({position:"absolute",width:s.width,height:s.height,left:0,right:0,top:0,bottom:0,margin:"auto",pointerEvents:"auto",cursor:"default"},d)},e.createElement("div",{style:u({fontSize:30,position:"absolute"},p)},e.createElement("div",{style:{color:t}},i)))});function _(){var e="undefined"!=typeof window?window:{};return{width:e.innerWidth,height:e.innerHeight}}N.defaultProps={name:"textAnimation",id:1,ratio:{width:1080,height:720},keyframes:{},style:{},playSpeed:1,delay:0,text:"Hello Text . . .",iteration:"infinite"},N.propTypes={name:s.string,id:s.oneOfType([s.string,s.number]),ratio:s.object,keyframes:s.object,style:s.object,layerStyle:s.object,textLayerStyle:s.object,playSpeed:s.number,delay:s.number||s.string,text:s.string,iteration:s.any,textColor:s.string};var W=a(function(t,a){var s,d,p,c=t.children,y=t.width,m=t.height,h=t.controls,f=t.playing,g=t.fullWidth,b=t.animationDuration,v=t.inline,w=t.CanvasInnerStyle,S=t.CompositionStyle,k=t.playerWrapperStyle,t=t.playerStyle,j=n(E),I=o(null),O=x(i(!1),2),L=O[0],P=O[1],O=x(i(0),2),C=O[0],T=O[1],O=(l(a,function(){return{play:function(){j.play()},pause:function(){j.pause()},finish:function(){j.finish()},duration:function(){return j.getDuration()}}}),s=y,d=m,O=x(i(_()),2),a=O[0],p=O[1],r(function(){function e(){var e={height:_().height/(16/9),width:_().width/(16/9)};e.scale=Math.min(e.width/s,e.height/d),p(e)}return e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}},[]),a),a=O.height,A=O.width,O=O.scale;return r(function(){var t=j.getDuration();b(t),j.on("play",function(e){P(!0)}),j.on("paused",function(e){P(!1)}),j.on("animate",function(e){T(100*e.time/t)}),f&&f({playing:L,progress:C})},[L,C]),e.createElement("div",{id:"canvasContainer"},e.createElement("div",{className:v?"":"Canvas",id:"recorderCanvas",ref:I},e.createElement("div",{className:"CanvasInner",style:u(g?{width:"100%",height:"100%"}:{width:A,height:a},w)},e.createElement("div",{id:"Composition",className:"Composition",style:u(g?{width:y,height:m}:{width:y,height:m,transform:"translate(-50%, -50%) scale(".concat(O||1,")")},S)},e.createElement("div",{className:"Layers",style:{width:y,height:m}},c)))),h&&e.createElement("div",{className:v?"playerWrapperInline":"playerWrapper",style:k},e.createElement("div",{className:"player",style:u({width:A},t)},e.createElement("div",{className:"".concat(L?"pause":"play"),onClick:function(){j.isPaused()?j.play():j.pause()}}),e.createElement("input",{className:"progress",type:"range",onChange:function(e){j.pause(),j.setTime(e.target.value+"%")},value:C.toString(),min:"0",max:"100"}))))}),M=a(function(t,n){var r=t.children,i=t.width,a=t.height,o=t.jsCanva,s=t.controls,l=t.playing,u=t.fullWidth,p=t.animationDuration,c=t.inline,y=t.CanvasInnerStyle,m=t.CompositionStyle,h=t.playerWrapperStyle,t=t.playerStyle;return e.createElement(E.Provider,{value:new d({},{easing:d.EASE_IN_OUT,iterationCount:1,selector:!0})},e.createElement(W,{ref:n,height:a,width:i,controls:s,playing:l,jsCanva:o,fullWidth:u,animationDuration:p,inline:c,CanvasInnerStyle:y,CompositionStyle:m,playerWrapperStyle:h,playerStyle:t},r))});M.defaultProps={width:1920,height:1080,children:[],controls:!0,playing:function(){},fullWidth:!1,animationDuration:function(){},inline:!1},M.propTypes={width:s.number,height:s.number,children:s.any,controls:s.bool,playing:s.func,fullWidth:s.bool,animationDuration:s.func,inline:s.bool,CanvasInnerStyle:s.object,CompositionStyle:s.object,playerWrapperStyle:s.object,playerStyle:s.object};export{L as AudioLayer,M as Canvas,I as Layer,T as SplitDownLayer,D as SplitInLayer,A as SplitOutLayer,z as SplitSlideInLayer,N as TextLayer};
//# sourceMappingURL=index.esm.js.map