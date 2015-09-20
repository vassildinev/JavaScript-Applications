import moment from '../../bower_components/moment/moment.js';
import Cookies from '../../bower_components/js.cookie/index.js';

import {dataManager} from '../utils/data-manager.js';
import {templatesManager} from '../utils/templates-manager.js';

var myCookieController = (function () {
    function getRandomCookie(cookies) {
        var randomIndex = Math.floor(Math.random() * cookies.length);
        var randomCookie = cookies[randomIndex];
        return randomCookie;
    }

    var myCookieController = {
        getMyCookie: function (context) {
            $('#cookies-tools').hide();

            dataManager.cookies.getAll()
                .then(function (cookies) {
                    var myCookie = Cookies.get(localStorage.getItem('logged-in-user-username'));
                    if (!myCookie) {
                        myCookie = getRandomCookie(cookies);
                        var today = new Date(Date.now());
                        var thisYear = today.getFullYear();
                        var thisMonth = today.getMonth();
                        var thisDay = today.getDate();
                        var thisHour = new Date(Date.now()).getHours();
                        var expirationDate = new Date(thisYear, thisMonth, thisDay, thisHour + 1, 0, 0);
                        var lifetimeLeftInDays = (expirationDate - today) / 1000 / 60 / 60 / 24;
                        console.log(lifetimeLeftInDays);
                        Cookies.set(localStorage.getItem('logged-in-user-username'), myCookie, {
                            expires: lifetimeLeftInDays
                        })
                    }

                    try {
                        myCookie = JSON.parse(myCookie);
                    } catch (error) {
                        window.location.reload(true);
                    }

                    var myCookieId = myCookie.id;
                    myCookie = _.filter(cookies, function (cookie) {
                        return cookie.id = myCookieId;
                    })[0];

                    myCookie.userLoggedIn = localStorage.getItem('logged-in-user-username') !== null;
                    var compiledTemplate = templatesManager.load('my-cookie-template');
                    var myCookieHtml = compiledTemplate(myCookie || {});
                    context.$element().html(myCookieHtml);
                });
        }
    };

    return myCookieController;
}());

export {myCookieController}