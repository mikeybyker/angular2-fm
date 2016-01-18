System.register([], function(exports_1) {
    var ErrorMessage;
    return {
        setters:[],
        execute: function() {
            ErrorMessage = (function () {
                function ErrorMessage(title, message) {
                    if (title === void 0) { title = 'Error'; }
                    if (message === void 0) { message = 'There has been an error'; }
                    this.title = title;
                    this.message = message;
                }
                return ErrorMessage;
            })();
            exports_1("ErrorMessage", ErrorMessage);
        }
    }
});
//# sourceMappingURL=error-message.js.map