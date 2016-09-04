var INDENT_SPACE = '    ';
var INDENT_PIPE = ' │  ';
var INDENT_NODE = ' ├─ ';
var INDENT_NODE_LAST = ' └─ ';
var ARRAY_PLACEHOLDER = ' ├───┐  ';
var ARRAY_PLACEHOLDER_LAST = ' └───┐  ';

var size = require('lodash/size');
var toPairs = require('lodash/toPairs');
var isArray = require('lodash/isArray');
var isPlainObject = require('lodash/isPlainObject');

function firstKey(obj) {
    return Object.keys(obj)[0];
}

function isTreeTraversable(input) {
    return (typeof input === 'object');
}

function treeStringifyArray(arr, str, depth) {
    str || (str = '');
    depth || (depth = []);

    var arrLength = arr.length;

    arr.forEach(function(value, i) {
        var isLast = (i === arrLength - 1);
        var indentStr = isLast ? INDENT_SPACE : INDENT_PIPE;
        var nodeStr = isLast ? INDENT_NODE_LAST : INDENT_NODE;
        var placeholderStr = isLast  ? ARRAY_PLACEHOLDER_LAST : ARRAY_PLACEHOLDER;

        if (isArray(value)) {
            str += depth.concat(placeholderStr, '\n').join('');
            str += treeStringifyArray(value, '', depth.concat(indentStr));
        } else if (isTreeTraversable(value)) {
            str += depth.concat(placeholderStr, '\n').join('');
            str += treeStringifyObject(value, '', depth.concat(indentStr));
        } else {
            str += depth.concat(nodeStr, value, '\n').join('');
        }
    });

    return str;
}

function treeStringifyObject(obj, str, depth) {
    str || (str = '');
    depth || (depth = []);

    var objPairs = toPairs(obj);
    var objSize = objPairs.length;

    objPairs.forEach(function(keyValue, i) {
        var key = keyValue[0];
        var value = keyValue[1];
        var isLast = (i === objSize - 1);
        var indentStr = isLast ? INDENT_SPACE : INDENT_PIPE;
        var nodeStr = isLast ? INDENT_NODE_LAST : INDENT_NODE;

        if (isArray(value)) {
            str += depth.concat(nodeStr, key, '\n').join('');
            str += treeStringifyArray(value, '', depth.concat(indentStr));
        } else if (isTreeTraversable(value)) {
            str += depth.concat(nodeStr, key, '\n').join('');
            str += treeStringifyObject(value, '', depth.concat(indentStr));
        } else {
            if (value === '') {
                str += depth.concat(nodeStr, key, '\n').join('');
            } else {
                str += depth.concat(nodeStr, key, ': ', value, '\n').join('');
            }
        }
    });

    return str;
}

function treeStringify(input, noSizeCheck) {
    if (isArray(input)) {
        return treeStringifyArray(input);
    } else if (isPlainObject(input)) {
        if (!noSizeCheck && size(input) === 1) {
            var title = firstKey(input);
            if (isTreeTraversable(input[title])) {
                return title + '\n' + treeStringify(input[title], true);
            }
        }
        return treeStringifyObject(input);
    } else {
        return input.toString();
    }
}

module.exports = treeStringify;
