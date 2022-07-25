const ft = (function(){
    const HTML_NS = "http://www.w3.org/1999/xhtml";
    const SVG_NS = "http://www.w3.org/2000/svg";
    function tagFactory(NStagName) {
        return function(...args) {
            let element = document.createElementNS(NS,tagName);
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
        html: new Proxy({}, {get:(target,name)=>(name in target)?target[name]:tagFactory(HTML_NS,name)}),
        svg: new Proxy({}, {get:(target,name)=>(name in target)?target[name]:tagFactory(SVG_NS,name)})
    }
})();

export { ft };
