# tree-stringify

Transforms an object into a beautiful tree.

Check out the [demo](https://kmck.github.io/tree-stringify/), if you like.

## Installation

    npm install -g tree-stringify

## Usage

Convert a JSON file to pretty readable tree format:

    $ tree-stringify --path=path/to/file.json

For example, converting this library's `package.json` to the tree-stringified format looks like this:

```
 ├─ name: tree-stringify
 ├─ version: 1.0.0
 ├─ description: Transforms an object into a beautiful tree
 ├─ main: ./lib/tree-stringify.js
 ├─ bin
 │   └─ tree-stringify: ./lib/cli.js
 ├─ scripts
 │   └─ test: echo "Error: no test specified" && exit 1
 ├─ repository
 │   ├─ type: git
 │   └─ url: http://www.github.com/kmck/tree-stringify
 ├─ keywords
 │   ├─ tree
 │   ├─ stringify
 │   ├─ box drawing
 │   └─ cli
 ├─ author: Keith McKnight
 ├─ license: MIT
 ├─ dependencies
 │   ├─ lodash: ^4.11.1
 │   └─ minimist: ^1.2.0
 └─ eslintConfig
     └─ env
         └─ node: true
```
