/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');
const Invoice = require('./Invoice');

let Chaincode = class {

    // The Init method is called when the Smart Contract 'invoices' is instantiated by the blockchain network
    // Best practice is to have any Ledger initialization in separate function -- see initLedger()
    async Init(stub) {
        console.info('=========== Instantiated invoices chaincode ===========');
        return shim.success();
    }

    // The Invoke method is called as a result of an application request to run the Smart Contract
    // 'invoices'. The calling application program has also specified the particular smart contract
    // function to be called, with arguments
    async Invoke(stub) {
        let ret = stub.getFunctionAndParameters();
        console.info(ret);

        let method = this[ret.fcn];
        if (!method) {
            console.error('no function of name:' + ret.fcn + ' found');
            throw new Error('Received unknown function ' + ret.fcn + ' invocation');
        }
        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.error(err);
        }
    }

    async queryInvoice(stub, args) {
        if (args.length != 1) {
            throw new Error('Incorrect number of arguments. Expecting CarNumber ex: CAR01');
        }
        let invoiceNumber = args[0];

        let invoiceAsBytes = await stub.getState(invoiceNumber); //get the invoice from chaincode state
        if (!invoiceAsBytes || invoiceAsBytes.toString().length <= 0) {
            throw new Error(invoiceNumber + ' does not exist: ');
        }
        console.log(invoiceAsBytes.toString());
        return invoiceAsBytes;
    }

    async initLedger(stub, args) {
        console.info('============= START : Initialize Ledger ===========');
        let invoices = [];
        const invoice1 = new Invoice('1','MR. CLIENT','700','Chain');
        const invoice = {sdfds:'1',sdfsf:'MR. CLIENT',sdfsdf:'700',zefzf:'Chain'};
        //console.log(invoice);
        invoices.push(invoice);

        for (let i = 0; i < invoices.length; i++) {
            invoices[i].docType = 'invoice';
            await stub.putState('INVOICE' + i, Buffer.from(JSON.stringify(invoices[i])));
            console.info('Added <--> ', invoices[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async createInvoice(stub, args) {
        console.info('============= START : Create Invoice ===========');
        if (args.length != 5) {
            throw new Error('Incorrect number of arguments. Expecting 5');
        }

        var invoice = {
            docType: 'invoice',
            make: args[1],
            model: args[2],
            color: args[3],
            owner: args[4]
        };

        await stub.putState(args[0], Buffer.from(JSON.stringify(invoice)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllInvoices(stub, args) {

        let startKey = 'INVOICE0';
        let endKey = 'INVOICE999';

        let iterator = await stub.getStateByRange(startKey, endKey);

        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));

                jsonRes.Key = res.value.key;
                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return Buffer.from(JSON.stringify(allResults));
            }
        }
    }

    async changeCarOwner(stub, args) {
        console.info('============= START : changeCarOwner ===========');
        if (args.length != 2) {
            throw new Error('Incorrect number of arguments. Expecting 2');
        }

        let carAsBytes = await stub.getState(args[0]);
        let car = JSON.parse(carAsBytes);
        car.owner = args[1];

        await stub.putState(args[0], Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
};

module.exports = Chaincode;
