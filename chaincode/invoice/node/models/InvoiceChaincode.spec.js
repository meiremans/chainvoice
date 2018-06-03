const chai = require('chai');

const assert = chai.assert;
const expect = chai.expect;
const MyChainCode =  require('./InvoiceChaincode');
const ChaincodeMockStub =  require("@theledger/fabric-mock-stub").ChaincodeMockStub;
const Transform =  require("@theledger/fabric-mock-stub").Transform;

let stubWithInit;

// You always need your chaincode so it knows which chaincode to invoke on
const chaincode = new MyChainCode();

describe('Test MyChaincode', () => {
    it("Should init", async () => {
        const mockStub = new ChaincodeMockStub("MyMockStub", chaincode);
        const response = await mockStub.mockInit("tx1", []);
        expect(response.status).to.eql(200)
    });

    it("Should query the invoice", async () => {
        stubWithInit = new ChaincodeMockStub("MyMockStub", chaincode);
        const response = await stubWithInit.mockInvoke("tx1", ['initLedger']);

        expect(response.status).to.eql(200);
        const queryResponse = await stubWithInit.mockInvoke("tx1",['queryInvoice', `INVOICE0`]);
        console.log(Transform.bufferToObject(queryResponse.payload));
    });

    it("Should query all invoices", async () => {
        stubWithInit = new ChaincodeMockStub("MyMockStub", chaincode);
        const response = await stubWithInit.mockInvoke("txID1", ['initLedger']);

        expect(response.status).to.eql(200);
        const queryResponse = await stubWithInit.mockInvoke("txID2",['queryAllInvoices']);
        console.log(Transform.bufferToObject(queryResponse.payload));
    });
});
