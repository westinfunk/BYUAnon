const utils = require('./utils.js');
const assert = require('assert');

assert.deepEqual(utils.encode('abcdef12345;?#'), 'YWJjZGVmMTIzNDU7PyM=');
assert.deepEqual(utils.decode('YWJjZGVmMTIzNDU7PyM='), 'abcdef12345;?#');

assert.equal(utils.fillZeros('123'), '00000123');

utils.getNewestListElements('fakeList', 0, 10);
