import { ft } from "../lib/funtags";
import { JSDOM } from "jsdom";


const {window} = new JSDOM();

globalThis.document = window.document;
globalThis.Node     = window.Node;
globalThis.Object   = window.Object;


test('render say hello', () => {
    
    const { div, h1} = ft.html;

    let funtagsElement = div(
        h1("Hello World")
    );
    
    let divElement  = document.createElement("div");
    let h1Element   = document.createElement("h1");
    h1Element.innerHTML = "Hello World";
    divElement.append(h1Element);

    expect(funtagsElement).toStrictEqual(divElement);

});

test('render h1 with hello world text', () => {
    
    const { div, h1, p} = ft.html;

    let funtagsElement = div(
        h1("Hello World"),
        p("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
        p("Donec a nunc mi."),
        p("Vestibulum at felis tempus, suscipit nisi in, semper nisl.")
    );
    
    let divElement  = document.createElement("div");
    let h1Element   = document.createElement("h1");
    h1Element.innerHTML = "Hello World";

    let p1Element   = document.createElement("p");
    p1Element.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    let p2Element   = document.createElement("p");
    p2Element.innerHTML = "Donec a nunc mi.";

    let p3Element   = document.createElement("p");
    p3Element.innerHTML = "Vestibulum at felis tempus, suscipit nisi in, semper nisl.";

    divElement.append(h1Element, p1Element, p2Element, p3Element);
    
    expect(funtagsElement).toStrictEqual(divElement);

});

test('render fruit list', () => {
    
    const { div, h1, ul, li} = ft.html;

    let funtagsElement = div(
        h1("Fruit List"),
        ul(
          ["apple","orange","lemon"].map(fruit => li(fruit))
        )
    )
    
    let divElement  = document.createElement("div");
    let h1Element   = document.createElement("h1");
    let ulElement   = document.createElement("ul");

    h1Element.innerHTML = "Fruit List";
    
    let liElement1   = document.createElement("li");
    liElement1.innerHTML = "apple";

    let liElement2   = document.createElement("li");
    liElement2.innerHTML = "orange";

    let liElement3   = document.createElement("li");
    liElement3.innerHTML = "lemon";

    ulElement.append(liElement1, liElement2, liElement3);
    
    divElement.append(h1Element,ulElement);

    expect(funtagsElement).toStrictEqual(divElement);

});

test('render attribute', () => {
    const { input, div} = ft.html;

    let funtagsElement = div(
        input({type:"text",placeholder:"new name"})
    );

    let divElement      = document.createElement("div");
    let inputElement    = document.createElement("input");

    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'new name');

    divElement.append(inputElement);


    expect(funtagsElement).toStrictEqual(divElement);
})