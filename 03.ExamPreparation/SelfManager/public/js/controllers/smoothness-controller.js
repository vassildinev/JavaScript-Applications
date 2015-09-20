import $ from 'jquery';

var smoothnessController = (function () {
    var smoothnessController = {
        manageHomePageUsernamePlaceholder: function () {
            var currentlyLoggedUserUsername = localStorage.getItem('logged-in-user-username');
            if (currentlyLoggedUserUsername) {
                $('#username-placeholder').html(currentlyLoggedUserUsername);
                $('#index-btn-login').hide();
                $('#index-btn-register').hide();
                $('#logout').show();
            }
        }
    };

    return smoothnessController;
}());

export {smoothnessController};