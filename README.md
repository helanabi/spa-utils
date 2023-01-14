# SPA-utils

Usefull procedures that assist in front-end web development using plain JavaScript.

This package currently provides three modules:
* `cons.js`: exposing a single procedure `cons(...)`, that makes it possible to create UIs from nested elements with their attributes, event handlers, and more in a declarative manner (see [Examples](#examples)).
* `router.js`: exposes few procedures that enable client-side routing.
* `dict.js`: makes multi-language support a breeze.

## Motivation

Front-end web development in plain JavaScript is known to be notoriously tedious, on the other hand font-end frameworks usually add structure and abstraction over native web APIs, that they start getting in the way.

SPA-utils are meant to make front-end web development as fun as it should be without getting in your way -- they do not impose a certain structure, ideology or programming paradigm, just basic building blocks to help you unleash you full computer programming potential.

## Examples

### Using `cons()` ###

``` javascript
// Syntactic sugar for 'document.createElement("div")'
cons("div");

// Adding attributes
cons("input", {
    name: "username",
    placeholder: "Enter your username",
    required: ""
});

// Composing elements
const navMenu = cons("ul",
                     cons("li", cons("a", { href: "/" }, "Home page")),
                     cons("li", cons("a", { href: "/about"}, "About us")));

// Adding Event handlers
navMenu.append(
    cons("li", cons("button", { onclick: () => setUser(null) }, "Log out"))
);
```

`TODO`

## API

`TODO`

## Copyright

Copyright 2022-2023 Hassan El anabi (al-annabi.tech)

Distributed under the terms of the MIT license.
