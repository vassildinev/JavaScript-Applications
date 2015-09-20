import $ from 'jquery';
import _ from 'underscore';
import 'jqueryui';

import {templatesManager} from '../utils/templates-manager.js';
import {dataManager} from '../utils/data-manager.js';
import {cookiesController} from '../controllers/cookies-controller.js';

function sortCookiesBy(cookies, value) {
    return _.sortBy(cookies, function (cookie) {
        if (value === 'shareDate') {
            return new Date(cookie[value]);
        }

        return cookie[value];
    });
}

var homeController = {
    loadHomePage: function (context) {
        var compiledTemplate = templatesManager.load('home-template');
        dataManager.cookies.getAll()
            .then(function (cookies) {
                var category = context.params.category;
                if (category) {
                    cookies = _.filter(cookies, function (cookie) {
                        return cookie.category === category;
                    })
                }

                var cookiesHtml = compiledTemplate({
                    cookies: cookies,
                    userLoggedIn: localStorage.getItem('logged-in-user-username') !== null
                });

                $('#cookies-tools').show();
                context.$element().html(cookiesHtml);

                $('#sort-by').on('change', function (e) {
                    var $target = $(e.target);
                    var value = $target.val();
                    if (value !== 'default') {
                        var sortedCookies = sortCookiesBy(cookies, value);
                        var newCookiesHtml = compiledTemplate({
                            cookies: sortedCookies,
                            userLoggedIn: localStorage.getItem('logged-in-user-username') !== null
                        });

                        context.$element().html(newCookiesHtml);
                        $target.val(value);
                    }
                });

                $('.like').on('click', function (e) {
                    var hrefComponents = $(e.target).attr('href').split('/');
                    var id = hrefComponents[hrefComponents.length - 1];
                    dataManager.cookies.likeOrDislike('like', id);
                });

                $('.dislike').on('click', function (e) {
                    var hrefComponents = $(e.target).attr('href').split('/');
                    var id = hrefComponents[hrefComponents.length - 1];
                    dataManager.cookies.likeOrDislike('dislike', id);
                });

                $('.share').on('click', function (e) {
                    var hrefComponents = $(e.target).attr('href').split('/');
                    var id = hrefComponents[hrefComponents.length - 1];
                    dataManager.cookies.getAll()
                        .then(function (cookies) {
                            cookies = _.filter(cookies, function (cookie) {
                                return cookie.id === id;
                            });

                            var cookieToShare = cookies[0];
                            cookieToShare.id = undefined;
                            dataManager.cookies.share(cookieToShare)
                                .then(homeController.loadHomePage(context));
                        })
                });

                dataManager.categories.getAll()
                    .then(function (categories) {
                        $('#tb-filter').autocomplete({
                            source: categories
                        });
                    });

                $('#btn-filter').on('click', function () {
                    var category = $('#tb-filter').val();
                    dataManager.cookies.getAll()
                        .then(function (cookies) {
                            cookies = _.filter(cookies, function (cookie) {
                                return category !== '' ? cookie.category === category : true;
                            });

                            var newCookiesHtml = compiledTemplate({
                                cookies: cookies,
                                userLoggedIn: localStorage.getItem('logged-in-user-username') !== null
                            });

                            context.$element().html(newCookiesHtml);
                        });
                })
            });

        $('#logout').on('click', function () {
            localStorage.removeItem('logged-in-user-username');
            localStorage.removeItem('logged-in-user-auth-key');
            window.location.hash = '#/';
            window.location.reload(true);
        });
    }
};

export {homeController}