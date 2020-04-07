!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.unocode={})}(this,function(e){var t,n=n||{};n.scope={},n.ASSUME_ES5=!1,n.ASSUME_NO_NATIVE_MAP=!1,n.ASSUME_NO_NATIVE_SET=!1,n.defineProperty=n.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){e!=Array.prototype&&e!=Object.prototype&&(e[t]=n.value)},n.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global&&null!=global?global:e},n.global=n.getGlobal(void 0),n.SYMBOL_PREFIX="jscomp_symbol_",n.initSymbol=function(){n.initSymbol=function(){},n.global.Symbol||(n.global.Symbol=n.Symbol)},n.Symbol=(t=0,function(e){return n.SYMBOL_PREFIX+(e||"")+t++}),n.initSymbolIterator=function(){n.initSymbol();var e=n.global.Symbol.iterator;e||(e=n.global.Symbol.iterator=n.global.Symbol("iterator")),"function"!=typeof Array.prototype[e]&&n.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return n.arrayIterator(this)}}),n.initSymbolIterator=function(){}},n.arrayIterator=function(e){var t=0;return n.iteratorPrototype(function(){return t<e.length?{done:!1,value:e[t++]}:{done:!0}})},n.iteratorPrototype=function(e){return n.initSymbolIterator(),(e={next:e})[n.global.Symbol.iterator]=function(){return this},e},n.makeIterator=function(e){n.initSymbolIterator();var t=e[Symbol.iterator];return t?t.call(e):n.arrayIterator(e)},n.polyfill=function(e,t,r,o){if(t){for(r=n.global,e=e.split("."),o=0;o<e.length-1;o++){var l=e[o];l in r||(r[l]={}),r=r[l]}(t=t(o=r[e=e[e.length-1]]))!=o&&null!=t&&n.defineProperty(r,e,{configurable:!0,writable:!0,value:t})}},n.FORCE_POLYFILL_PROMISE=!1,n.polyfill("Promise",function(e){function t(){this.batch_=null}function r(e){return e instanceof l?e:new l(function(t,n){t(e)})}if(e&&!n.FORCE_POLYFILL_PROMISE)return e;t.prototype.asyncExecute=function(e){return null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_()),this.batch_.push(e),this},t.prototype.asyncExecuteBatch_=function(){var e=this;this.asyncExecuteFunction(function(){e.executeBatch_()})};var o=n.global.setTimeout;t.prototype.asyncExecuteFunction=function(e){o(e,0)},t.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var e=this.batch_;this.batch_=[];for(var t=0;t<e.length;++t){var n=e[t];delete e[t];try{n()}catch(e){this.asyncThrow_(e)}}}this.batch_=null},t.prototype.asyncThrow_=function(e){this.asyncExecuteFunction(function(){throw e})};var l=function(e){this.state_=0,this.result_=void 0,this.onSettledCallbacks_=[];var t=this.createResolveAndReject_();try{e(t.resolve,t.reject)}catch(e){t.reject(e)}};l.prototype.createResolveAndReject_=function(){function e(e){return function(r){n||(n=!0,e.call(t,r))}}var t=this,n=!1;return{resolve:e(this.resolveTo_),reject:e(this.reject_)}},l.prototype.resolveTo_=function(e){if(e===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(e instanceof l)this.settleSameAsPromise_(e);else{e:switch(typeof e){case"object":var t=null!=e;break e;case"function":t=!0;break e;default:t=!1}t?this.resolveToNonPromiseObj_(e):this.fulfill_(e)}},l.prototype.resolveToNonPromiseObj_=function(e){var t=void 0;try{t=e.then}catch(e){return void this.reject_(e)}"function"==typeof t?this.settleSameAsThenable_(t,e):this.fulfill_(e)},l.prototype.reject_=function(e){this.settle_(2,e)},l.prototype.fulfill_=function(e){this.settle_(1,e)},l.prototype.settle_=function(e,t){if(0!=this.state_)throw Error("Cannot settle("+e+", "+t|"): Promise already settled in state"+this.state_);this.state_=e,this.result_=t,this.executeOnSettledCallbacks_()},l.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var e=this.onSettledCallbacks_,t=0;t<e.length;++t)e[t].call(),e[t]=null;this.onSettledCallbacks_=null}};var i=new t;return l.prototype.settleSameAsPromise_=function(e){var t=this.createResolveAndReject_();e.callWhenSettled_(t.resolve,t.reject)},l.prototype.settleSameAsThenable_=function(e,t){var n=this.createResolveAndReject_();try{e.call(t,n.resolve,n.reject)}catch(e){n.reject(e)}},l.prototype.then=function(e,t){function n(e,t){return"function"==typeof e?function(t){try{r(e(t))}catch(e){o(e)}}:t}var r,o,i=new l(function(e,t){r=e,o=t});return this.callWhenSettled_(n(e,r),n(t,o)),i},l.prototype.catch=function(e){return this.then(void 0,e)},l.prototype.callWhenSettled_=function(e,t){function n(){switch(r.state_){case 1:e(r.result_);break;case 2:t(r.result_);break;default:throw Error("Unexpected state: "+r.state_)}}var r=this;null==this.onSettledCallbacks_?i.asyncExecute(n):this.onSettledCallbacks_.push(function(){i.asyncExecute(n)})},l.resolve=r,l.reject=function(e){return new l(function(t,n){n(e)})},l.race=function(e){return new l(function(t,o){for(var l=n.makeIterator(e),i=l.next();!i.done;i=l.next())r(i.value).callWhenSettled_(t,o)})},l.all=function(e){var t=n.makeIterator(e),o=t.next();return o.done?r([]):new l(function(e,n){function l(t){return function(n){i[t]=n,0==--s&&e(i)}}var i=[],s=0;do{i.push(void 0),s++,r(o.value).callWhenSettled_(l(i.length-1),n),o=t.next()}while(!o.done)})},l},"es6","es3"),function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}([function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);e=function(){function e(){}return e.log=function(e){sessionStorage.getItem("UNO_ENV")===r.Environments.DEVELOPMENT&&console.log("%c UnoCode: %c"+e,'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA1xJREFUSA3Fl+9LU2EUx89ztzmdk635C9NhKmrpi6xIC19kRT/ofygNknpTLej/UCroxxsTBd8UWBCBgoog9LsJtdBQyzFNnOl0zta2ezrn6h1Ttrlf1Xlz73MeOJ/nfJ9znvtcARHmWPLaELBVADREuNN+RQC7hKLzQIGxWw1GDICZZTT7ZO9wpoEqRH3yAgyS8WTFHrEisZOgI38byhxmcILKO8sLgB08+FcmUFyWaE/bMg1cXQ9gxzMHKRvdZIE3tZT+wejTyXtDMuLI+A/oGp0GP4K4FSMES66NMZe027m4jndeTsLM0roAjQQoUfg4ljbY5w/gkzEnPLfPA2iofnQaQCEgJ1vHUsekpwV+O+HG+0NTsOoPCuRN28r0dF0xXmwsi5MvQErgxZUNfDA4BeMujwCJZNVSVxLUWpCL109UQlWRIWam6mqSAgeCMr5454K+V04ICaAsN/dSn6XF1uPlcKauEDTkV4PHeyYMnnB68O7AV1jw/hYyRd+UFaClpghbj1nBZGCtE7ddwdyTPaMzMDyxuFmtvI8ELrUY8EZLJVQX5yYFVJcWE0yq4uDHeeh7PQu+oKxUq0zVqiNZLzWVwdn6ItBJ5EjRooIdsyv4kKrV5fELpR+11CLUl01VFrzaXA5mgy5loLrOqGDBzc+wrWqVeUwSSzxOG7mJFo6ltahnKks98GkRej+46OtFp+sWXKuVsO1wKZyvtqQldUywKsnqRhC73s/B0LflMJwVsJpz0HZkL9RaslPSYFewugAHncUdb+ZgfiMguKpVBU5Zzdi+vwBMepYkcUsYzCEDIcT+6WXonnADVXhYAZ1OwvbaQrhQkpvwAZIUWM1nwUffW4cb7Mu/FDgrANRZ+4xZeLs2H2qMu1d9SmB1AWPuDeyc/AmeAB2gEXauJA+vVJjARI0e4d72mhaYI3lDIez9vgZPnavcaWGQgaq/v7ksPN5GpYFy2dvpTGZs1GjEtUqzeHS0BKry9OHWVE67OIHSBquxK+g0u3eoGGw1+ajXiPAC1PmdT7rswfhOZ6pjqjFBlS16GkuhudAQE85M2uP/c71VNv/z0pqdXjJ224ynGGdbn5/XoOwx/Va0ZFLyWGBmMIvnt5X7F7e3jT4Htkxnz8Ctn7bHDGX7AzZCSiEUEwn6AAAAAElFTkSuQmCC") no-repeat left top; background-size: 15px 15px; padding-left: 10px; color: #384d9c; font-weight: bold',"color: #777; font-weight: normal")},e}(),t.default=e},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),(e=t.Environments||(t.Environments={})).PRODUCTION="production",e.DEVELOPMENT="development"},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),e=function(){function e(){}return e.getElementByXpath=function(e){return document.evaluate(e,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue},e}(),t.Util=e},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(12),o=n(11),l=n(9),i=n(10),s=n(8),a=n(7),f=n(0),c=n(5);e=function(){function e(){}return e.runActions=function(e){if(e){f.default.log("Attempting to run actions...");for(var t=0;t<e.length;t++)this.maybeRunAction(e[t])}else f.default.log("No actions detected to run. UnoCode is injected but is doing nothing.")},e.maybeRunAction=function(e){var t=this,n=void 0===e.enabled||e.enabled();n instanceof Promise?n.then(function(n){n&&t.runAction(e)}).catch(function(){}):n&&this.runAction(e)},e.runActionById=function(e){if(this.actions)for(var t=0,n=this.actions;t<n.length;t++){var r=n[t];if(r.id===e){if(r.guard)for(var o=0,l=r.guard.conditions;o<l.length;o++)l[o].isChecked=!1;this.maybeRunAction(r)}}},e.runAction=function(e){var t=this;if(e.guard)var n=0,r=setInterval(function(){for(var o=0,l=e.guard.conditions;o<l.length;o++){var i=l[o];if(i.code&&!i.isChecked){var s=i.code();s instanceof Promise?(i.isChecked=!0,s.then(function(){t.maybeRunCommands(e,++n,+r)}).catch(function(){})):s&&(i.isChecked=!0,t.maybeRunCommands(e,++n,+r))}}},c.delayPolling);else this.runCommands(e.commands,e.nextActions)},e.maybeRunCommands=function(e,t,n){e.guard.conditions.length===t&&(clearInterval(n),this.runCommands(e.commands,e.nextActions))},e.runCommands=function(e,t){if(e)for(var n=0;n<e.length;n++)this.runCommand(e[n]);t&&this.runActions(t)},e.runCommand=function(t){switch(t.type.toString()){case r.CommandType[r.CommandType.JSImporter]:new o.JSCommand(r.CommandType.JSImporter,t.code).run();break;case r.CommandType[r.CommandType.ElementRemoval]:new l.ElementRemovalCommand(r.CommandType.ElementRemoval,t.path).run();break;case r.CommandType[r.CommandType.HTMLImporter]:new i.HTMLImporterCommand(r.CommandType.HTMLImporter,t.path,t.html,t.appendChild).run();break;case r.CommandType[r.CommandType.CSSImporter]:new s.CSSImporterCommand(r.CommandType.HTMLImporter,t.css).run();break;case r.CommandType[r.CommandType.ActionRunner]:new a.ActionRunnerCommand(r.CommandType.ActionRunner,t.id).run(),e.runActionById(t.id);break;default:f.default.log("======================================="),f.default.log("======================================="),f.default.log("Tried to run command ("+t.type.toString()+"), failed miserably. UnoCode don't have any command with that name."),f.default.log("======================================="),f.default.log("=======================================")}},e}(),t.Engine=e,window.flexibility=n(4),window.modernizr=n(6),window.UnoCode=e},function(e,t,n){e.exports=function e(t,n,r){function o(i,s){if(!n[i]){if(!t[i]){if(l)return l(i,!0);throw(s=Error("Cannot find module '"+i+"'")).code="MODULE_NOT_FOUND",s}s=n[i]={exports:{}},t[i][0].call(s.exports,function(e){var n=t[i][1][e];return o(n||e)},s,s.exports,e,t,n,r)}return n[i].exports}for(var l=!1,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,n){t.exports=function(e){var t,n,r=-1;if(1<e.lines.length&&"flex-start"===e.style.alignContent)for(t=0;n=e.lines[++r];)n.crossStart=t,t+=n.cross;else if(1<e.lines.length&&"flex-end"===e.style.alignContent)for(t=e.flexStyle.crossSpace;n=e.lines[++r];)n.crossStart=t,t+=n.cross;else if(1<e.lines.length&&"center"===e.style.alignContent)for(t=e.flexStyle.crossSpace/2;n=e.lines[++r];)n.crossStart=t,t+=n.cross;else if(1<e.lines.length&&"space-between"===e.style.alignContent){var o=e.flexStyle.crossSpace/(e.lines.length-1);for(t=0;n=e.lines[++r];)n.crossStart=t,t+=n.cross+o}else if(1<e.lines.length&&"space-around"===e.style.alignContent)for(t=(o=2*e.flexStyle.crossSpace/(2*e.lines.length))/2;n=e.lines[++r];)n.crossStart=t,t+=n.cross+o;else for(o=e.flexStyle.crossSpace/e.lines.length,t=e.flexStyle.crossInnerBefore;n=e.lines[++r];)n.crossStart=t,n.cross+=o,t+=n.cross}},{}],2:[function(e,t,n){t.exports=function(e){for(var t,n=-1;line=e.lines[++n];)for(t=-1;child=line.children[++t];){var r=child.style.alignSelf;"auto"===r&&(r=e.style.alignItems),"flex-start"===r?child.flexStyle.crossStart=line.crossStart:"flex-end"===r?child.flexStyle.crossStart=line.crossStart+line.cross-child.flexStyle.crossOuter:"center"===r?child.flexStyle.crossStart=line.crossStart+(line.cross-child.flexStyle.crossOuter)/2:(child.flexStyle.crossStart=line.crossStart,child.flexStyle.crossOuter=line.cross,child.flexStyle.cross=child.flexStyle.crossOuter-child.flexStyle.crossBefore-child.flexStyle.crossAfter)}}},{}],3:[function(e,t,n){t.exports=function(e,t){t="row"===t||"row-reverse"===t;var n=e.mainAxis;n?t&&"inline"===n||!t&&"block"===n||(e.flexStyle={main:e.flexStyle.cross,cross:e.flexStyle.main,mainOffset:e.flexStyle.crossOffset,crossOffset:e.flexStyle.mainOffset,mainBefore:e.flexStyle.crossBefore,mainAfter:e.flexStyle.crossAfter,crossBefore:e.flexStyle.mainBefore,crossAfter:e.flexStyle.mainAfter,mainInnerBefore:e.flexStyle.crossInnerBefore,mainInnerAfter:e.flexStyle.crossInnerAfter,crossInnerBefore:e.flexStyle.mainInnerBefore,crossInnerAfter:e.flexStyle.mainInnerAfter,mainBorderBefore:e.flexStyle.crossBorderBefore,mainBorderAfter:e.flexStyle.crossBorderAfter,crossBorderBefore:e.flexStyle.mainBorderBefore,crossBorderAfter:e.flexStyle.mainBorderAfter}):(e.flexStyle=t?{main:e.style.width,cross:e.style.height,mainOffset:e.style.offsetWidth,crossOffset:e.style.offsetHeight,mainBefore:e.style.marginLeft,mainAfter:e.style.marginRight,crossBefore:e.style.marginTop,crossAfter:e.style.marginBottom,mainInnerBefore:e.style.paddingLeft,mainInnerAfter:e.style.paddingRight,crossInnerBefore:e.style.paddingTop,crossInnerAfter:e.style.paddingBottom,mainBorderBefore:e.style.borderLeftWidth,mainBorderAfter:e.style.borderRightWidth,crossBorderBefore:e.style.borderTopWidth,crossBorderAfter:e.style.borderBottomWidth}:{main:e.style.height,cross:e.style.width,mainOffset:e.style.offsetHeight,crossOffset:e.style.offsetWidth,mainBefore:e.style.marginTop,mainAfter:e.style.marginBottom,crossBefore:e.style.marginLeft,crossAfter:e.style.marginRight,mainInnerBefore:e.style.paddingTop,mainInnerAfter:e.style.paddingBottom,crossInnerBefore:e.style.paddingLeft,crossInnerAfter:e.style.paddingRight,mainBorderBefore:e.style.borderTopWidth,mainBorderAfter:e.style.borderBottomWidth,crossBorderBefore:e.style.borderLeftWidth,crossBorderAfter:e.style.borderRightWidth},"content-box"===e.style.boxSizing&&("number"==typeof e.flexStyle.main&&(e.flexStyle.main+=e.flexStyle.mainInnerBefore+e.flexStyle.mainInnerAfter+e.flexStyle.mainBorderBefore+e.flexStyle.mainBorderAfter),"number"==typeof e.flexStyle.cross&&(e.flexStyle.cross+=e.flexStyle.crossInnerBefore+e.flexStyle.crossInnerAfter+e.flexStyle.crossBorderBefore+e.flexStyle.crossBorderAfter))),e.mainAxis=t?"inline":"block",e.crossAxis=t?"block":"inline","number"==typeof e.style.flexBasis&&(e.flexStyle.main=e.style.flexBasis+e.flexStyle.mainInnerBefore+e.flexStyle.mainInnerAfter+e.flexStyle.mainBorderBefore+e.flexStyle.mainBorderAfter),e.flexStyle.mainOuter=e.flexStyle.main,e.flexStyle.crossOuter=e.flexStyle.cross,"auto"===e.flexStyle.mainOuter&&(e.flexStyle.mainOuter=e.flexStyle.mainOffset),"auto"===e.flexStyle.crossOuter&&(e.flexStyle.crossOuter=e.flexStyle.crossOffset),"number"==typeof e.flexStyle.mainBefore&&(e.flexStyle.mainOuter+=e.flexStyle.mainBefore),"number"==typeof e.flexStyle.mainAfter&&(e.flexStyle.mainOuter+=e.flexStyle.mainAfter),"number"==typeof e.flexStyle.crossBefore&&(e.flexStyle.crossOuter+=e.flexStyle.crossBefore),"number"==typeof e.flexStyle.crossAfter&&(e.flexStyle.crossOuter+=e.flexStyle.crossAfter)}},{}],4:[function(e,t,n){var r=e("../reduce");t.exports=function(e){if(0<e.mainSpace){var t=r(e.children,function(e,t){return e+parseFloat(t.style.flexGrow)},0);0<t&&(e.main=r(e.children,function(n,r){return"auto"===r.flexStyle.main?r.flexStyle.main=r.flexStyle.mainOffset+parseFloat(r.style.flexGrow)/t*e.mainSpace:r.flexStyle.main+=parseFloat(r.style.flexGrow)/t*e.mainSpace,r.flexStyle.mainOuter=r.flexStyle.main+r.flexStyle.mainBefore+r.flexStyle.mainAfter,n+r.flexStyle.mainOuter},0),e.mainSpace=0)}}},{"../reduce":12}],5:[function(e,t,n){var r=e("../reduce");t.exports=function(e){if(0>e.mainSpace){var t=r(e.children,function(e,t){return e+parseFloat(t.style.flexShrink)},0);0<t&&(e.main=r(e.children,function(n,r){return r.flexStyle.main+=parseFloat(r.style.flexShrink)/t*e.mainSpace,r.flexStyle.mainOuter=r.flexStyle.main+r.flexStyle.mainBefore+r.flexStyle.mainAfter,n+r.flexStyle.mainOuter},0),e.mainSpace=0)}}},{"../reduce":12}],6:[function(e,t,n){var r=e("../reduce");t.exports=function(e){var t;e.lines=[t={main:0,cross:0,children:[]}];for(var n,o=-1;n=e.children[++o];)"nowrap"===e.style.flexWrap||0===t.children.length||"auto"===e.flexStyle.main||e.flexStyle.main-e.flexStyle.mainInnerBefore-e.flexStyle.mainInnerAfter-e.flexStyle.mainBorderBefore-e.flexStyle.mainBorderAfter>=t.main+n.flexStyle.mainOuter?(t.main+=n.flexStyle.mainOuter,t.cross=Math.max(t.cross,n.flexStyle.crossOuter)):e.lines.push(t={main:n.flexStyle.mainOuter,cross:n.flexStyle.crossOuter,children:[]}),t.children.push(n);e.flexStyle.mainLines=r(e.lines,function(e,t){return Math.max(e,t.main)},0),e.flexStyle.crossLines=r(e.lines,function(e,t){return e+t.cross},0),"auto"===e.flexStyle.main&&(e.flexStyle.main=Math.max(e.flexStyle.mainOffset,e.flexStyle.mainLines+e.flexStyle.mainInnerBefore+e.flexStyle.mainInnerAfter+e.flexStyle.mainBorderBefore+e.flexStyle.mainBorderAfter)),"auto"===e.flexStyle.cross&&(e.flexStyle.cross=Math.max(e.flexStyle.crossOffset,e.flexStyle.crossLines+e.flexStyle.crossInnerBefore+e.flexStyle.crossInnerAfter+e.flexStyle.crossBorderBefore+e.flexStyle.crossBorderAfter)),e.flexStyle.crossSpace=e.flexStyle.cross-e.flexStyle.crossInnerBefore-e.flexStyle.crossInnerAfter-e.flexStyle.crossBorderBefore-e.flexStyle.crossBorderAfter-e.flexStyle.crossLines,e.flexStyle.mainOuter=e.flexStyle.main+e.flexStyle.mainBefore+e.flexStyle.mainAfter,e.flexStyle.crossOuter=e.flexStyle.cross+e.flexStyle.crossBefore+e.flexStyle.crossAfter}},{"../reduce":12}],7:[function(e,t,n){t.exports=function(t){for(var n,r=-1;n=t.children[++r];)e("./flex-direction")(n,t.style.flexDirection);for(e("./flex-direction")(t,t.style.flexDirection),e("./order")(t),e("./flexbox-lines")(t),e("./align-content")(t),r=-1;n=t.lines[++r];)n.mainSpace=t.flexStyle.main-t.flexStyle.mainInnerBefore-t.flexStyle.mainInnerAfter-t.flexStyle.mainBorderBefore-t.flexStyle.mainBorderAfter-n.main,e("./flex-grow")(n),e("./flex-shrink")(n),e("./margin-main")(n),e("./margin-cross")(n),e("./justify-content")(n,t.style.justifyContent,t);e("./align-items")(t)}},{"./align-content":1,"./align-items":2,"./flex-direction":3,"./flex-grow":4,"./flex-shrink":5,"./flexbox-lines":6,"./justify-content":8,"./margin-cross":9,"./margin-main":10,"./order":11}],8:[function(e,t,n){t.exports=function(e,t,n){var r=n.flexStyle.mainInnerBefore;if(n=-1,"flex-end"===t)for(t=e.mainSpace,t+=r;r=e.children[++n];)r.flexStyle.mainStart=t,t+=r.flexStyle.mainOuter;else if("center"===t)for(t=e.mainSpace/2,t+=r;r=e.children[++n];)r.flexStyle.mainStart=t,t+=r.flexStyle.mainOuter;else if("space-between"===t){var o=e.mainSpace/(e.children.length-1);for(t=0+r;r=e.children[++n];)r.flexStyle.mainStart=t,t+=r.flexStyle.mainOuter+o}else if("space-around"===t)for(t=(o=2*e.mainSpace/(2*e.children.length))/2+r;r=e.children[++n];)r.flexStyle.mainStart=t,t+=r.flexStyle.mainOuter+o;else for(t=0+r;r=e.children[++n];)r.flexStyle.mainStart=t,t+=r.flexStyle.mainOuter}},{}],9:[function(e,t,n){t.exports=function(e){for(var t,n=-1;t=e.children[++n];){var r=0;"auto"===t.flexStyle.crossBefore&&++r,"auto"===t.flexStyle.crossAfter&&++r;var o=e.cross-t.flexStyle.crossOuter;"auto"===t.flexStyle.crossBefore&&(t.flexStyle.crossBefore=o/r),"auto"===t.flexStyle.crossAfter&&(t.flexStyle.crossAfter=o/r),t.flexStyle.crossOuter="auto"===t.flexStyle.cross?t.flexStyle.crossOffset+t.flexStyle.crossBefore+t.flexStyle.crossAfter:t.flexStyle.cross+t.flexStyle.crossBefore+t.flexStyle.crossAfter}}},{}],10:[function(e,t,n){t.exports=function(e){for(var t,n=0,r=-1;t=e.children[++r];)"auto"===t.flexStyle.mainBefore&&++n,"auto"===t.flexStyle.mainAfter&&++n;if(0<n){for(r=-1;t=e.children[++r];)"auto"===t.flexStyle.mainBefore&&(t.flexStyle.mainBefore=e.mainSpace/n),"auto"===t.flexStyle.mainAfter&&(t.flexStyle.mainAfter=e.mainSpace/n),t.flexStyle.mainOuter="auto"===t.flexStyle.main?t.flexStyle.mainOffset+t.flexStyle.mainBefore+t.flexStyle.mainAfter:t.flexStyle.main+t.flexStyle.mainBefore+t.flexStyle.mainAfter;e.mainSpace=0}}},{}],11:[function(e,t,n){var r=/^(column|row)-reverse$/;t.exports=function(e){e.children.sort(function(e,t){return e.style.order-t.style.order||e.index-t.index}),r.test(e.style.flexDirection)&&e.children.reverse()}},{}],12:[function(e,t,n){t.exports=function(e,t,n){for(var r=e.length,o=-1;++o<r;)o in e&&(n=t(n,e[o],o));return n}},{}],13:[function(e,t,n){n=e("./read");var r=e("./write"),o=e("./readAll"),l=e("./writeAll");t.exports=function(e){l(o(e))},t.exports.read=n,t.exports.write=r,t.exports.readAll=o,t.exports.writeAll=l},{"./read":15,"./readAll":16,"./write":17,"./writeAll":18}],14:[function(e,t,n){t.exports=function(e,t,n){var s=e[t],a=String(s).match(r);return a?(e=a[1],"px"===(a=a[2])?n=1*e:"cm"===a?n=37.7952*e:"in"===a?n=96*e:"mm"===a?n=37.7952*e/10:"pc"===a?n=1152*e/72:"pt"===a?n=96*e/72:"rem"===a?n=16*e:(o.style.cssText="border:none!important;clip:rect(0 0 0 0)!important;display:block!important;font-size:1em!important;height:0!important;margin:0!important;padding:0!important;position:relative!important;width:"+s+"!important",n.parentNode.insertBefore(o,n.nextSibling),s=o.offsetWidth,n.parentNode.removeChild(o),n=s),n):(n=t.match(i))?"none"===e["border"+n[1]+"Style"]?0:l[s]||0:s};var r=/^([-+]?\d*\.?\d+)(%|[a-z]+)$/,o=document.createElement("div"),l={medium:4,none:0,thick:6,thin:2},i=/^border(Bottom|Left|Right|Top)Width$/},{}],15:[function(e,t,n){function r(e,t){for(var n;n=o.exec(t);)e[n[1].toLowerCase().replace(/-[a-z]/g,function(e){return e.slice(1).toUpperCase()})]=n[2]}t.exports=function(e){var t={alignContent:"stretch",alignItems:"stretch",alignSelf:"auto",borderBottomStyle:"none",borderBottomWidth:0,borderLeftStyle:"none",borderLeftWidth:0,borderRightStyle:"none",borderRightWidth:0,borderTopStyle:"none",borderTopWidth:0,boxSizing:"content-box",display:"inline",flexBasis:"auto",flexDirection:"row",flexGrow:0,flexShrink:1,flexWrap:"nowrap",justifyContent:"flex-start",height:"auto",marginTop:0,marginRight:0,marginLeft:0,marginBottom:0,paddingTop:0,paddingRight:0,paddingLeft:0,paddingBottom:0,maxHeight:"none",maxWidth:"none",minHeight:0,minWidth:0,order:0,position:"static",width:"auto"};if(e instanceof Element){var n=e.hasAttribute("data-style"),o=n?e.getAttribute("data-style"):e.getAttribute("style")||"";for(var s in n||e.setAttribute("data-style",o),n=window.getComputedStyle&&getComputedStyle(e)||{},t)s in n&&!l.test(s)&&(t[s]=n[s]);for(var a in s=e.currentStyle||{},t)a in s?t[a]=s[a]:(n=a.replace(/[A-Z]/g,"-$&").toLowerCase())in s&&(t[a]=s[n]);for(var f in"-js-display"in s&&(t.display=s["-js-display"]),r(t,o),t)t[f]=i(t,f,e);o=e.getBoundingClientRect(),t.offsetHeight=o.height||e.offsetHeight,t.offsetWidth=o.width||e.offsetWidth}return{element:e,style:t}};var o=/([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g,l=/^(alignSelf|height|width)$/,i=e("./getComputedLength")},{"./getComputedLength":14}],16:[function(e,t,n){function r(e,t){var n,s=(n=e instanceof Element)&&e.getAttribute("data-style");n=n&&e.currentStyle&&e.currentStyle["-js-display"],s=l.test(s)||i.test(n);for(var a=[],f=-1;n=e.childNodes[++f];){var c=3===n.nodeType&&!/^\s*$/.test(n.nodeValue);if(s&&c&&(c=n,(n=e.insertBefore(document.createElement("flex-item"),c)).appendChild(c)),n instanceof Element&&(c=r(n,t),s)){var u=n.style;u.display="inline-block",u.position="absolute",c.style=o(n).style,a.push(c)}}return n={element:e,children:a},s&&(n.style=o(e).style,t.push(n)),n}t.exports=function(e){var t=[];return r(e,t),t};var o=e("../read"),l=/(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i,i=/^(inline-)?flex$/i},{"../read":15}],17:[function(e,t,n){function r(e){return"string"==typeof e?e:Math.max(e,0)+"px"}t.exports=function(e){o(e);var t=e.element.style,n="inline"===e.mainAxis?["main","cross"]:["cross","main"];for(t.boxSizing="content-box",t.display="block",t.position="relative",t.width=r(e.flexStyle[n[0]]-e.flexStyle[n[0]+"InnerBefore"]-e.flexStyle[n[0]+"InnerAfter"]-e.flexStyle[n[0]+"BorderBefore"]-e.flexStyle[n[0]+"BorderAfter"]),t.height=r(e.flexStyle[n[1]]-e.flexStyle[n[1]+"InnerBefore"]-e.flexStyle[n[1]+"InnerAfter"]-e.flexStyle[n[1]+"BorderBefore"]-e.flexStyle[n[1]+"BorderAfter"]),n=-1;t=e.children[++n];){var l=t.element.style,i="inline"===t.mainAxis?["main","cross"]:["cross","main"];l.boxSizing="content-box",l.display="block",l.position="absolute","auto"!==t.flexStyle[i[0]]&&(l.width=r(t.flexStyle[i[0]]-t.flexStyle[i[0]+"InnerBefore"]-t.flexStyle[i[0]+"InnerAfter"]-t.flexStyle[i[0]+"BorderBefore"]-t.flexStyle[i[0]+"BorderAfter"])),"auto"!==t.flexStyle[i[1]]&&(l.height=r(t.flexStyle[i[1]]-t.flexStyle[i[1]+"InnerBefore"]-t.flexStyle[i[1]+"InnerAfter"]-t.flexStyle[i[1]+"BorderBefore"]-t.flexStyle[i[1]+"BorderAfter"])),l.top=r(t.flexStyle[i[1]+"Start"]),l.left=r(t.flexStyle[i[0]+"Start"]),l.marginTop=r(t.flexStyle[i[1]+"Before"]),l.marginRight=r(t.flexStyle[i[0]+"After"]),l.marginBottom=r(t.flexStyle[i[1]+"After"]),l.marginLeft=r(t.flexStyle[i[0]+"Before"])}};var o=e("../flexbox")},{"../flexbox":7}],18:[function(e,t,n){t.exports=function(e){for(var t,n=-1;t=e[++n];)r(t)};var r=e("../write")},{"../write":17}]},{},[13])(13)},function(e,t){e.exports={delayPolling:"100"}},function(e,t){!function(t){var n="Modernizr"in t,r=t.Modernizr;!function(e,t,n){function r(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):h?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function o(e,n,o,l){var i,s,a,f=r("div"),c=t.body,u=(c||((c=r(h?"svg":"body")).fake=!0),c);if(parseInt(o,10))for(;o--;)(c=r("div")).id=l?l[o]:"modernizr"+(o+1),f.appendChild(c);return(i=r("style")).type="text/css",i.id="smodernizr",(u.fake?u:f).appendChild(i),u.appendChild(f),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),f.id="modernizr",u.fake&&(u.style.background="",u.style.overflow="hidden",a=S.style.overflow,S.style.overflow="hidden",S.appendChild(u)),s=n(f,e),u.fake?(u.parentNode.removeChild(u),S.style.overflow=a):f.parentNode.removeChild(f),!!s}function l(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function i(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(l(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];i--;)s.push("("+l(t[i])+":"+r+")");return o("@supports ("+(s=s.join(" or "))+") { #modernizr { position: absolute; } }",function(t){if("getComputedStyle"in e){t=getComputedStyle.call(e,t,null);var n=e.console;null!==t?t=t.getPropertyValue("position"):n&&n[n.error?"error":"log"].call(n,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}else t=t.currentStyle&&t.currentStyle.position;return"absolute"===t})}return n}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function a(e,t,o,l){function a(){d&&(delete v.style,delete v.modElem)}if(l=void 0!==l&&l,void 0!==o){var f=i(e,o);if(void 0!==f)return f}var c,u;for(f=["modernizr","tspan","samp"];!v.style&&f.length;){var d=!0;v.modElem=r(f.shift()),v.style=v.modElem.style}var m=e.length;for(f=0;f<m;f++)if(u=v.style[c=e[f]],!!~(""+c).indexOf("-")&&(c=s(c)),v.style[c]!==n){if(l||void 0===o)return a(),"pfx"!==t||c;try{v.style[c]=o}catch(e){}if(v.style[c]!==u)return a(),"pfx"!==t||c}return a(),!1}function f(e,t){return function(){return e.apply(t,arguments)}}function c(e,t,n,r,o){var l=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+x.join(l+" ")+l).split(" ");if("string"==typeof t||void 0===t)var s=a(i,t,r,o);else{i=(e+" "+A.join(l+" ")+l).split(" ");e:{for(var c in e=i)if(e[c]in t){t=!1===n?e[c]:"function"==typeof(s=t[e[c]])?f(s,n||t):s;break e}t=!1}s=t}return s}function u(e,t,r){return c(e,n,n,t,r)}var d=[],m={_version:"3.9.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){d.push({name:e,fn:t,options:n})},addAsyncTest:function(e){d.push({name:null,fn:e})}},y=function(){};y.prototype=m,y=new y;var p=[],S=t.documentElement,h="svg"===S.nodeName.toLowerCase(),x=m._config.usePrefixes?["Moz","O","ms","Webkit"]:[];m._cssomPrefixes=x;var g={elem:r("modernizr")};y._q.push(function(){delete g.elem});var v={style:g.elem.style};y._q.unshift(function(){delete v.style});var A=m._config.usePrefixes?["moz","o","ms","webkit"]:[];for(m._domPrefixes=A,m.testAllProps=c,m.testAllProps=u,y.addTest("flexbox",u("flexBasis","1px",!0)),function(){var e,t,n,r,o;for(o in d)if(d.hasOwnProperty(o)){if(e=[],(t=d[o]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(n="function"==typeof t.fn?t.fn():t.fn,r=0;r<e.length;r++){var l=e[r];1===(l=l.split(".")).length?y[l[0]]=n:(y[l[0]]&&(!y[l[0]]||y[l[0]]instanceof Boolean)||(y[l[0]]=new Boolean(y[l[0]])),y[l[0]][l[1]]=n),p.push((n?"":"no-")+l.join("-"))}}}(),function(e){var t=S.className,n=y._config.classPrefix||"";h&&(t=t.baseVal),y._config.enableJSClass&&(t=t.replace(new RegExp("(^|\\s)"+n+"no-js(\\s|$)"),"$1"+n+"js$2")),y._config.enableClasses&&(0<e.length&&(t+=" "+n+e.join(" "+n)),h?S.className.baseVal=t:S.className=t)}(p),delete m.addTest,delete m.addAsyncTest,m=0;m<y._q.length;m++)y._q[m]();e.Modernizr=y}(t,document),e.exports=t.Modernizr,n?t.Modernizr=r:delete t.Modernizr}(window)},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);e=function(){function e(e,t){this.type=e,this.id=t}return e.prototype.run=function(){r.default.log("Running ActionRunnerCommand with params (CSS): \n "+this.id)},e}(),t.ActionRunnerCommand=e},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);e=function(){function e(e,t){this.type=e,this.css=t}return e.prototype.run=function(){r.default.log("Running CSSImporterCommand with params (CSS): \n "+this.css);var e=document.createElement("style");e.appendChild(document.createTextNode(this.css)),document.body?document.body.appendChild(e):document.addEventListener("DOMContentLoaded",function(){return document.body.appendChild(e)})},e}(),t.CSSImporterCommand=e},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=n(0);e=function(){function e(e,t){this.type=e,this.path=t}return e.prototype.run=function(){o.default.log("Running ElementRemovalCommand with params (PATH): \n "+this.path);var e=r.Util.getElementByXpath(this.path);e.parentElement.removeChild(e)},e}(),t.ElementRemovalCommand=e},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=n(0);e=function(){function e(e,t,n,r){this.type=e,this.path=t,this.html=n,this.appendChild=r}return e.prototype.run=function(){o.default.log("Running HTMLImporterCommand with params (PATH, HTML): \n\n Path: \n "+this.path+" \n\n HTML: \n "+this.html);var e=r.Util.getElementByXpath(this.path),t=document.createElement("div");t.classList.add("UnoCode-HTMLImporter"),t.innerHTML=this.html,this.appendChild?e.appendChild(t):e.insertBefore(t,e.childNodes[0])},e}(),t.HTMLImporterCommand=e},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);e=function(){function e(e,t){this.type=e,this.code=t}return e.prototype.run=function(){r.default.log("Running JSCommand with params (JS): \n "+this.code),this.code()},e}(),t.JSCommand=e},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),(e=t.CommandType||(t.CommandType={}))[e.JSImporter=0]="JSImporter",e[e.HTMLImporter=1]="HTMLImporter",e[e.CSSImporter=2]="CSSImporter",e[e.ActionRunner=3]="ActionRunner",e[e.ElementRemoval=4]="ElementRemoval"},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),e=n(3),n=n(1).Environments.PRODUCTION,sessionStorage.setItem("UNO_ENV",n),t.default=e.Engine}]);var r,o={elem:function(e){return function(e){var t=document.querySelector(e);return{exist:null!==t,isNull:null===t,includesText:function(e){return t&&-1!==t.textContent.indexOf(e)}}}(e)},expect:require("chai").expect};!function(e){e.JSImporter="JSImporter",e.HTMLImporter="HTMLImporter",e.CSSImporter="CSSImporter",e.ActionRunner="ActionRunner",e.ElementRemoval="ElementRemoval"}(r||(r={}));var l=r.JSImporter,i=r.HTMLImporter,s=r.CSSImporter,a=r.ActionRunner,f=r.ElementRemoval,c={JSImporter:function(e){return{type:l,code:e}},HTMLImporter:function(e,t,n){return{type:i,path:e,html:t,appendChild:n}},CSSImporter:function(e){return{type:s,css:e}},ActionRunner:function(e){return{type:a,id:e}},ElementRemoval:function(e){return{type:f,path:e}}},u=function(){function e(){}return e.start=function(e){return window.UnoCode.runActions(e)},e}();e.Core=u,e.Action=function(e){var t=e.guard,n=e.commands,r=void 0===n?[]:n,o={commands:r};return 0===r.length&&console.warn("You have not implemented any command within your action."),t&&(o.guard=t),o},e.Guard=function(e){return e.conditions&&0!==e.conditions.length||console.warn("Invalid guard!"),e.conditions=e.conditions.map(function(e){var t=e.code;return{code:function(){return t(o)}}}),e},e.Command=c});
//# sourceMappingURL=index.umd.js.map
