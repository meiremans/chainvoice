const chai = require('chai');
var assert = chai.assert;
const Invoice = require('./Invoice');

describe('Invoice', function() {
    it('should be initialized', function() {
        const invoice = new Invoice('1','MR. CLIENT','700','Chain');
        console.log(invoice);
    });
});
