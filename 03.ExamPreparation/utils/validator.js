var validator = {
    checkUsernameLength: function (value, min, max) {
        var usernameLength = value.length;
        return min <= usernameLength && usernameLength <= max;

    },

    checkPasswordLength: function (value, min, max) {
        var passwordLength = value.length;
        return min <= passwordLength && passwordLength <= max;

    }
};

export {validator}