import $ from 'jquery';
import Sammy from 'sammy';
import 'bootstrap';

import {smoothnessController} from '../js/controllers/smoothness-controller.js';
import {homeController} from '../js/controllers/home-controller.js';
import {logInController} from '../js/controllers/login-controller.js';
import {registerController} from '../js/controllers/register-controller.js';

(function () {
    //smoothnessController.manageHomePageUsernamePlaceholder();

    var app = Sammy('#content', function () {
        this.get('#/', function (context) {
            context.redirect('#/home');
        });

        this.get('#/home', homeController.loadHomePage);
        this.get('#/login', logInController.loadLogInPage);
        this.get('#/register', registerController.loadRegisterPage);
    });

    $(function () {
        app.run('#/home');
    });
}());