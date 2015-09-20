var validator = (function () {
    var validator = {
        isUsernameValid: function (username) {
            var i, len;

            if (typeof username !== 'string') {
                return false;
            }

            if (!(6 <= username.length && username.length <= 30)) {
                return false;
            }

            for (i = 0, len = username.length; i < len; i += 1) {
                var charCode = username.charCodeAt(i);
                if (!(charCode === 46 ||
                    charCode === 95 ||
                    (48 <= charCode && charCode <= 57) ||
                    (65 <= charCode && charCode <= 90) || (97 <= charCode && charCode <= 122))) {
                    return false;
                }
            }

            return true;
        },

        isCookiePropertyValid: function (property) {
            if (typeof property !== 'string') {
                return false;
            }

            if (!(6 <= property.length && property.length <= 30)) {
                return false;
            }

            return true;
        },

        isUrlValid: function (url) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i');
            if (!pattern.test(url)) {
                return false;
            }

            return true;
        }
    };

    return validator;
}());

export {validator};