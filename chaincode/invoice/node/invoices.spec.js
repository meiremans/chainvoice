const chai = require('chai');
var assert = chai.assert;
const MyChainCode =  require('./invoices');
const ChaincodeMockStub =  require("@theledger/fabric-mock-stub").ChaincodeMockStub;
const Transform =  require("@theledger/fabric-mock-stub").Transform;
const mockStub = new ChaincodeMockStub("MyMockStub", chaincode);

// You always need your chaincode so it knows which chaincode to invoke on
const chaincode = MyChainCode();

describe('Test MyChaincode', () => {
    it("Should init without issues", async () => {
        const mockStub = new ChaincodeMockStub("MyMockStub", chaincode);
        // Your test code
    });
});
