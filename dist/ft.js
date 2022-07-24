(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ft = {}));
})(this, (function (exports) { 'use strict';

    const ft = (function(){
        function tagFactory(tagName) {
            return function(...args) {
                let element = document.createElement(tagName);
                function flatten(e) {
                    if(e !== null && e !== "") {
                        if(e.forEach) {
                            e.forEach(flatten);
                        } else {
                            if (e instanceof Node) {
                                element.append(e);
                            } else if(e instanceof Object) {
                                for(let k in e) {
                                    let v = e[k];
                                    if(v !== null) {
                                        let evname = (/^on(.+)$/.exec(k)||[])[1];
                                        if(evname) {
                                            element.addEventListener(evname,v);
                                        } else if(k === 'style') {
                                            for(let ks in v) {
                                                element.style[ks] = v[ks];
                                            }
                                        } else {
                                            element.setAttribute(k,v);
                                        }
                                    }
                                }
                            } else {
                                element.innerHTML=e;
                            }
                        }
                    }
                }
                flatten(args);        
                return element;
            }
        }
        return {
            html: new Proxy({}, {get:(target,name)=>(name in target)?target[name]:tagFactory(name)})
        }
    })();

    exports.ft = ft;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
