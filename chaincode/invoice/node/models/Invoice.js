'use strict';


class Invoice {
    /**
     *
     * @param invoiceNumber
     * @param clientName
     * @param total
     * @param product
     */
    constructor(invoiceNumber,clientName,total,product) {
        this._clientName = clientName;
        this._invoiceNumber = invoiceNumber;
        this._total = total;
        this._product = product;
    }

    get invoiceNumber() {
        return this._invoiceNumber;
    }

    set invoiceNumber(value) {
        this._invoiceNumber = value;
    }

    get clientName() {
        return this._clientName;
    }

    set clientName(value) {
        this._clientName = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get product() {
        return this._product;
    }

    set product(value) {
        this._product = value;
    }
}
module.exports = Invoice;
