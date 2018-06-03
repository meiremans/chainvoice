/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const InvoiceChaincode = require('./models/InvoiceChaincode');

shim.start(new InvoiceChaincode());
