var Invoice = /** @class */ (function () {
    function Invoice(c, d, a) {
        this.client = c;
        this.details = d;
        this.amount = a;
    }
    //Method
    Invoice.prototype.format = function () {
        return "".concat(this.client, " owes \u00A3").concat(this.amount, " for ").concat(this.details);
    };
    return Invoice;
}());
export { Invoice };
