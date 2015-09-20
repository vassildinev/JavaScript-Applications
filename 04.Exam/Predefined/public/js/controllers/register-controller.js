import $ from 'jquery';
import * as toastr from 'toastr';

import {smoothnessController} from '../controllers/smoothness-controller.js';
import {templatesManager} from '../utils/templates-manager.js';
import {dataManager} from '../utils/data-manager.js';

var registerController = {
    loadRegisterPage: function (context) {
        var compiledTemplate = templatesManager.load('register-template');
        context.$element().html(compiledTemplate());

        $('#btn-register').on('click', function () {
            var username = $('#inputUsername').val();
            var password = $('#inputPassword').val();

            var user = {
                username: username,
                password: password
            };

            dataManager.users
                .register(user)
                .then(function () {
                    toastr.success('User ' + user.username + ' successfully registered and logged in!');
                    context.redirect('#/');
                    smoothnessController.manageHomePageUsernamePlaceholder();
                }, function (error) {
                    toastr.error('The server responded with an almighty error! - ' + error.responseText);
                });
        });
    }
};

export {registerController}