require('./styles.scss');

var ace = require('brace');
require('brace/mode/json');
require('brace/theme/monokai');

var throttle = require('lodash/throttle');
var pick = require('lodash/pick');

var JSON5 = require('json5');
var treeStringify = require('tree-stringify');

var inputTextarea = document.getElementById('input');
var outputTextarea = document.getElementById('output');

var inputEditor = ace.edit(inputTextarea);
inputEditor.setTheme('ace/theme/monokai');
inputEditor.getSession().setMode('ace/mode/json');
inputEditor.setShowPrintMargin(false);
inputEditor.$blockScrolling = Infinity;

var outputEditor = ace.edit(outputTextarea);
outputEditor.setTheme('ace/theme/monokai');
outputEditor.setReadOnly(true);
outputEditor.setShowPrintMargin(false);
outputEditor.$blockScrolling = Infinity;

var hasLocalStorage = ('localStorage' in window);

function updateOutput() {
    var editorValue = inputEditor.getValue();

    try {
        var jsonValue = JSON5.parse(editorValue);
        outputEditor.setValue(treeStringify(jsonValue), -1);
    } catch (e) {
        console.error(e);
    }

    if (hasLocalStorage) {
        localStorage.setItem('treeStringifyInput', editorValue);
    }
}

var throttledUpdateOutput = throttle(updateOutput, 100);

inputEditor.on('change', throttledUpdateOutput);

// Initial value
var initialValue = hasLocalStorage ? localStorage.getItem('treeStringifyInput') : '';

if (!initialValue) {
    initialValue = JSON.stringify(pick(require('tree-stringify/package.json'), [
        'name',
        'version',
        'description',
        'main',
        'bin',
        'repository',
        'keywords',
        'author',
        'dependencies',
        'eslintConfig',
    ]), null, 2);
}

inputEditor.setValue(initialValue, 1);
updateOutput();

// Focus and reset undo manager
inputEditor.focus();
setTimeout(function() {
    inputEditor.getSession().getUndoManager().reset();
}, 0);

// Globals
window.treeStringify = treeStringify;
window.inputEditor = inputEditor;
window.outputEditor = outputEditor;
