#!/usr/bin/env node

var stdin = process.stdin;
var stdout = process.stdout;
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var treeStringify = require('./tree-stringify');

function writeTree(obj) {
    stdout.write(treeStringify(obj));
    stdout.write('\n');
}

if (!stdin.isTTY) {
    var chunks = [];
    stdin.on('data', function(chunk) {
        chunks.push(chunk);
    });
    stdin.on('end', function() {
        writeTree(JSON.parse(chunks.join('')));
    });
} else if (argv.path) {
    writeTree(JSON.parse(fs.readFileSync(argv.path).toString()));
} else if (argv.input) {
    writeTree(JSON.parse(argv.input));
} else {
    stdout.write('usage: try piping something in or using --input="{ your: \'json\' }"\n');
    process.exit();
}
