import $ from 'jquery';
import * as toastr from 'toastr';

import {smoothnessController} from '../controllers/smoothness-controller.js';
import {templatesManager} from '../utils/templates-manager.js';
import {dataManager} from '../utils/data-manager.js';

var logInController = {
    loadLogInPage: function (context) {
        var compiledTemplate = templatesManager.load('login-template');
        context.$element().html(compiledTemplate());

        $('#btn-login').on('click', function () {
            var username = $('#inputUsername').val();
            var password = $('#inputPassword').val();

            var user = {
                username: username,
                password: password
            };

            dataManager.users
                .logIn(user)
                .then(function (user) {
                    toastr.success('User ' + user.username + ' successfully logged in!');
                    context.redirect('#/');
                    smoothnessController.manageHomePageUsernamePlaceholder();
                }, function (error) {
                    toastr.error('The server responded with an almighty error! - ' + error.responseText);
                });
        });
    }
};

export {logInController}