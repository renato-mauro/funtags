# <FunTags :)> - Functional Tags

Create DOM trees from plain vanilla javascript functions. No transpilation nor alien languages. Just a little bit trick. 

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

Here we have a function to generate our DOM fragment. As we are going to
use tags *div*, *h1* and *p*, we have to desconstruct them from the 
magic object *ft.html*. They are functions that create DOM elements
with the same variable name. 

The object ft.html is indeed a [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Any X property that is requested will be returned as factory for creating an element of type X, regardless of whether X is a known element type or a [custom element](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry).

The value returned from tag factories is a regular DOM tree so that they can be inserted 
into document as usual:

```javascript
window.addEventListener("load",ev=>{
    document.body.replaceChildren(sayHello());
});
```

See live code in [code pen](https://codepen.io/renatomauro/pen/wvmqvOv).

## Examples

### Bullet List

### SVG

### Bootstrap Table + Fetch Data


## The Source

## Future Plans

