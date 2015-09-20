import $ from 'jquery';
import Sammy from 'sammy';
import 'bootstrap';
import Cookies from '../bower_components/js.cookie/index.js';

import {smoothnessController} from '../js/controllers/smoothness-controller.js';
import {homeController} from '../js/controllers/home-controller.js';
import {logInController} from '../js/controllers/login-controller.js';
import {registerController} from '../js/controllers/register-controller.js';

import '../moment-tests.js';
import {pesho} from '../js/js.cookies-tests.js';

(function () {
    window.Cookies = Cookies;
    window.pesho = pesho;
    smoothnessController.manageHomePageUsernamePlaceholder();

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