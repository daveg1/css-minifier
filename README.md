# CSS Minifier
A humble CSS minifier written in TypeScript.

Some optimisations will be optional.

## Algorithm steps
### Interpret CSS
1. Tokenise file
1. Check syntax
1. Create syntax tree

### Perform optimisations (WIP)
1. Remove redundancies
    - `{ color: red; color: blue }` -> `{ color: blue }`
1. Shorten colour values
    - `#00ff00` -> `#0f0`
    - `'black'` -> `#000`
1. Remove unneeded quotes
    - `@import('')` -> `@import()`
    - `url('')` -> `url()`
1. Remove units on zero
    - `margin: 0px` -> `margin: 0`
1. Use shorthands (optional)
    - `{ margin-left: 10px; margin-bottom: 20px; }` -> `{ margin: 0 0 20px 10px }`
    - `{ margin-inline-start: 10px; margin-block-end: 20px; }` -><br>`{ margin-inline: 10px 0; margin-block: 0 20px; }`
    - etc

### Code output
1. Remove comments
    - `/* ... */` is removed
1. Remove whitespace
    - tabs, lines breaks, unneeded spaces
1. Remove final semicolon in style blocks
    - `{ color: red; font-size: 1rem; }` -> `{ color: red; font-size: 1rem }`
1. Group identical style blocks (optional)
    - `h1 { font-weight: bold } h2 { font-weight: bold }` -> `h1, h2 { font-weight: bold }`
