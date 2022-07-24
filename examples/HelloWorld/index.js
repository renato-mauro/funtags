function sayHello() {
    /* "desconstruct" from ftags.html tags used by this template */
    const { div, h1, p } = ft.html;

    /* create dom hierarchy by composing function call */
    return div(
        h1("Hello World"),
        p("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
        p("Donec a nunc mi."),
        p("Vestibulum at felis tempus, suscipit nisi in, semper nisl.")
    );
}

window.addEventListener("load",ev=>{
    document.body.replaceChildren(sayHello());
});
