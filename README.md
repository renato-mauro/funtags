# <FunTags :)> - Functional Tags

Create DOM trees from plain vanilla javascript functions. No transpilation nor alien languages. Just a little bit of magic with Proxy Objects.

## How to Use

### Option 1 - From JSDeliver

```html
<script src="https://cdn.jsdelivr.net/gh/renato-mauro/funtags/dist/main.min.js"></script>
```

### Option 2 - From Repository

```html
<script src="dist/main.min.js"></script>
```

### Option 3 - From NPM

```
npm install funtags
```

### Option 4 - ObservableHQ

You can play (and use) FunTags in [ObservableHQ](https://observablehq.com/@rmauro/funtags). If you want to import in your own notebook, just create a import and have fun!

```javascript
import { ft } from "@rmauro/funtags"
```

### Option 5 - Copy and Paste entire library in your code

```javascript
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
```

## How it Works (Hello World!)

```javascript
function sayHello() {
    /* "desconstruct" from ft.html tags used by this template */
    const { div, h1, p } = ft.html;

    /* create dom hierarchy by composing function call */
    return div(
        h1("Hello World"),
        p("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
        p("Donec a nunc mi."),
        p("Vestibulum at felis tempus, suscipit nisi in, semper nisl.")
    );
}
```

Here we have a function to generate our DOM fragment. As we are going to use tags like *div*, *h1*, and *p*, we have to desconstruct them from the magic object *ft.html*. They are functions that create DOM elements with the same variable name.

The object ft.html is indeed a [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Any X property that is requested will be returned as a factory for creating an element of type X, regardless of whether X is a known element type or a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry).

The value returned from tag factories is a regular DOM tree so that they can be inserted into documents as usual. In this example, we replaced the content of body
element with [replaceChildren](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren) method.

```javascript
document.body.replaceChildren(sayHello());
```

See live code in [code pen](https://codepen.io/renatomauro/pen/wvmqvOv).

## More Examples

### List of Objects

```javascript
function fruitList(fruits) {
    /* "desconstruct" from ftags.html tags used by this template */
    const { div, h1, ul, li } = ft.html;

    /* create dom hierarchy by composing function call */
    return div(
        h1("Fruit List"),
        ul(
          ...fruits.map(fruit => li(fruit))
        )
    );
}

document.body.replaceChildren(fruitList(["apple","orange","lemon"]));
```

In this example we are using [array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method with [spread operator (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). Each
element in array is passed as argument to function.

See live code in [code pen](https://codepen.io/renatomauro/pen/poLrpPP).

### Attributes and Events

```javascript
function nameList() {
    const { div, h1, ul, li, input, button } = ft.html;
    let names = [];

    function addName() {
      names.push(nameInput.value);
      nameList.replaceChildren(...names.map(name=>li(name)));
      nameInput.value = "";
      nameInput.focus();
    }
  
    let nameList = ul();
    let nameInput = input({type:"text",placeholder:"new name"});
    let addButton = button({onclick:addName},"add");
  
    return div(
        h1("Name List"),
        div(nameInput, addButton),
        div(nameList)
    );
}

document.body.replaceChildren(nameList());
```

Attributes are defined as javascript objects. The line

```javascript
input({type:"text",placeholder:"new name"})
````

will produce

```html
<input type="text" placeholder="new name">
```

Attributes starting with the prefix "on" is treated as event handlers.

```javascript
button({onclick:addName},"add");
````

will produce

```html
<button>add</button>
```

with click event handler registered to function addName.

See live code in [code pen](https://codepen.io/renatomauro/pen/abYyYML).

### Table with async data

Function userTable creates a HTML table for an array of user objects. 

```javascript
function userTable(data) {
    const { table, thead, tbody, tr, th, td } = ft.html;

    return table(
      thead(
        tr(
          th("#"),th("Firts Name"),th("Last Name"),th("Gender"),th("Email"),th("Birth Date")
        )
      ),
      tbody(
        ...data.map(d=>tr(
          td(d.id),
          td(d.firstName),
          td(d.lastName),
          td(d.gender),
          td(d.email),
          td(d.birthDate)
        ))
      )
    );
}
```

Function page bellow creates a HTML fragment with a title and a placeHolder,
initially with "loading..." message. An API request is done by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) function and
once fullfilled the request, placeHolder content is replaced by data table.

```javascript
function page() {
  const { div, h1, p } = ft.html;  
  let placeHolder = div(p("Loading..."));
  
  fetch("https://dummyjson.com/users")
    .then(response=>response.json())
    .then(data=>{placeHolder.replaceChildren(userTable(data.users))})
  ;
  
  return div(
    h1("User Data"),
    placeHolder
  );
}

document.body.replaceChildren(page());
```

See live code in [code pen](https://codepen.io/renatomauro/pen/dymzKbb).
