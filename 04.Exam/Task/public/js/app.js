import $ from 'jquery';
import Sammy from 'sammy';
import 'bootstrap';

import {smoothnessController} from '../js/controllers/smoothness-controller.js';
import {homeController} from '../js/controllers/home-controller.js';
import {logInController} from '../js/controllers/login-controller.js';
import {registerController} from '../js/controllers/register-controller.js';
import {myCookieController} from '../js/controllers/my-cookie-controller.js';
import {cookiesController} from '../js/controllers/cookies-controller.js';

(function () {
    smoothnessController.manageHomePageUsernamePlaceholder();

    var app = Sammy('#content', function () {
        this.get('#/', function (context) {
            context.redirect('#/home');
        });

        this.get('#/home', homeController.loadHomePage);
        this.get('#/login', logInController.loadLogInPage);
        this.get('#/register', registerController.loadRegisterPage);
        this.get('#/my-cookie', myCookieController.getMyCookie);
        this.get('#/cookies/:id', function (context) {
            window.history.back();
        });

        this.get('#/share-cookie', cookiesController.loadShareCookiePage);
    });

    $(function () {
        app.run('#/home');
    });
}());