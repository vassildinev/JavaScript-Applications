import $ from 'jquery';
import * as toastr from 'toastr';

import {smoothnessController} from '../controllers/smoothness-controller.js';
import {templatesManager} from '../utils/templates-manager.js';
import {dataManager} from '../utils/data-manager.js';
import {validator} from '../utils/validator.js';

var registerController = {
    loadRegisterPage: function (context) {
        $('#cookies-tools').hide();

        var compiledTemplate = templatesManager.load('register-template');
        context.$element().html(compiledTemplate());

        $('#btn-register').on('click', function () {
            var username = $('#inputUsername').val();
            var password = $('#inputPassword').val();

            var isUsernameValid = validator.isUsernameValid(username);

            if (isUsernameValid) {
                var user = {
                    username: username,
                    password: password
                };

                dataManager.users
                    .register(user)
                    .then(function () {
                        toastr.success('User ' + user.username + ' successfully registered! You can now log in!');
                        context.redirect('#/');
                        smoothnessController.manageHomePageUsernamePlaceholder();
                    }, function (error) {
                        toastr.error('The server responded with an almighty error! - ' + error.responseText);
                    });
            } else {
                toastr.error('An almighty error occurred! - "Username must be between 6 and 30 characters and must contain ' +
                    'Latin letters, digits, underscore and dot only"');
            }
        });
    }
};

export {registerController}