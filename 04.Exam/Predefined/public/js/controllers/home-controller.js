import $ from 'jquery';

import {templatesManager} from '../utils/templates-manager.js';

var homeController = {
    loadHomePage: function (context) {
        var peshoValue = context.params.pesho;
        console.log(peshoValue);
        var compiledTemplate = templatesManager.load('home-template');
        context.$element().html(compiledTemplate());

        $('#logout').on('click', function () {
            localStorage.removeItem('logged-in-user-username');
            localStorage.removeItem('logged-in-user-auth-key');
            window.location.hash = '#/';
            window.location.reload(true);
        });
    }
};

export {homeController}