"use strict";
var ErrorMessage = (function () {
    function ErrorMessage(title, message) {
        if (title === void 0) { title = 'Error'; }
        if (message === void 0) { message = 'There has been an error'; }
        this.title = title;
        this.message = message;
    }
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=error-message.js.map