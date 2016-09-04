var fs = require('fs');
var path = require('path');
var glob = require('glob');
var assert = require('chai').assert;
var treeStringify = require('..');

describe('tree-stringify', function() {

    it('leaves a plain string alone', function() {
        assert.strictEqual(treeStringify('test'), 'test');
    });

    it('works with an Array', function() {
        assert.strictEqual(treeStringify([1, 'two']), ' ├─ 1\n └─ two\n');
    });

    it('works with an Object', function() {
        assert.strictEqual(treeStringify({ key: 'value' }), ' └─ key: value\n');
    });

    var inputPaths = glob.sync(path.join(__dirname, 'fixtures') + '/**/*.input.*');
    inputPaths.forEach(function(inputPath) {
        var parsedInputPath = path.parse(inputPath);
        var name = parsedInputPath.name.replace(/\.input$/, '');

        var outputPath = path.join(parsedInputPath.dir, name + '.output.txt');
        it(name, function() {
            var inputText = fs.readFileSync(inputPath).toString();
            var outputExpected = fs.readFileSync(outputPath).toString();
            var outputActual = treeStringify(JSON.parse(inputText));
            assert.strictEqual(outputActual, outputExpected);
        });
    });

});
