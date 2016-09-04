# tree-stringify

[![Build Status](https://travis-ci.org/kmck/tree-stringify.svg?branch=master)](https://travis-ci.org/kmck/tree-stringify)

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
 ├─ version: 1.1.0
 ├─ description: Transforms an object into a beautiful tree
 ├─ main: ./lib/tree-stringify.js
 ├─ bin
 │   └─ tree-stringify: ./lib/cli.js
 ├─ scripts
 │   └─ test: gulp
 ├─ repository
 │   ├─ type: git
 │   └─ url: https://github.com/kmck/tree-stringify.git
 ├─ keywords
 │   ├─ tree
 │   ├─ stringify
 │   ├─ box drawing
 │   └─ cli
 ├─ author: Keith McKnight
 ├─ license: MIT
 ├─ dependencies
 │   ├─ lodash: ^4.x
 │   └─ minimist: ^1.2.0
 ├─ devDependencies
 │   ├─ chai: ^3.5.0
 │   ├─ glob: ^7.0.6
 │   ├─ gulp: ^3.9.1
 │   ├─ gulp-eslint: ^3.0.1
 │   ├─ gulp-istanbul: ^1.1.1
 │   ├─ gulp-mocha: ^3.0.1
 │   └─ semver: ^5.3.0
 └─ files
     └─ /lib
```
