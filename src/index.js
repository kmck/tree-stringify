var createBeaf = require('beaf').createBeaf;

require('./reset.css');
require('./styles.css');

require('brace/mode/json');
require('brace/theme/monokai');

var throttle = require('lodash/throttle');
var pick = require('lodash/pick');

var JSON5 = require('json5');
var treeStringify = require('tree-stringify');

var throttledDispatch = throttle(function(resolve, reject, input) {
  try {
    resolve(treeStringify(JSON5.parse(input || '{}')));
  } catch (e) {
    // nope
  }
}, 100);

createBeaf({
  title: 'tree-stringify',
  titleUrl: 'https://github.com/kmck/tree-stringify',
  theme: 'monokai',
  inputTitle: 'JSON',
  inputMode: 'json',
  outputTitle: 'Output',
  menuItems: [{
    name: 'github',
    url: 'https://github.com/kmck/tree-stringify',
  }, {
    name: 'npm',
    url: 'https://www.npmjs.com/package/tree-stringify',
  }, {
    name: 'made with beaf',
    url: 'https://www.npmjs.com/package/beaf',
  }],
  input: JSON.stringify(pick(
    require('tree-stringify/package.json'), [
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
  ]), null, 2),
  transform: function(input) {
    return new Promise(function(resolve, reject) {
      throttledDispatch(resolve, reject, input);
    });
  },
});

window.treeStringify = treeStringify;
