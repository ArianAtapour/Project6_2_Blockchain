var Payment = /** @class */ (function () {
    function Payment(recipient, details, amount) {
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
    }
    //Method
    Payment.prototype.format = function () {
        return "".concat(this.recipient, " owes \u00A3").concat(this.amount, " for ").concat(this.details);
    };
    return Payment;
}());
export { Payment };
